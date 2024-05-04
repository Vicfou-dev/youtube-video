const httpLibs = { 'http:': null, 'https:': null };
var PassThrough = null;

import { isBrowser } from '@youtube-video-core/utils';

(async () => {
  if(isBrowser() === true) return;
  httpLibs['http:'] = await import('http');
  httpLibs['https:'] = await import('https');
  PassThrough = (await (import('stream'))).PassThrough;
})();

interface DownloadOptions {
    headers?: { [key: string]: string },
    maxReconnects: number,
    maxRetries: number,
    backoff: { inc: number, max: number },
    debug?: boolean
}

export default (url: string, options: DownloadOptions = { maxReconnects: 3, maxRetries: 6, backoff: { inc: 500, max: 10000 }, debug : true }) => {
  const stream = new PassThrough();
  stream.destroyed = false;
  let activeRequest;
  let reconnects = 0;
  let retries = 0;
  let downloaded = 0;
  let total = 0;
  let startTime = Date.now();
  const maxReconnects = options.maxReconnects || 0;
  const maxRetries = options.maxRetries || 0;
  const backoff = options.backoff || { inc: 100, max: 10000 };
  const headers = options.headers || {};
  const debug = options.debug || false;

  const promise = new Promise((resolve, reject) => {
    const doDownload = () => {
      let parsed:any = {};
      let httpLib;
      try {
        let urlObj = new URL(url);
        parsed = {
          host: urlObj.host,
          hostname: urlObj.hostname,
          path: urlObj.pathname + urlObj.search + urlObj.hash,
          port: urlObj.port,
          protocol: urlObj.protocol,
          headers: headers,
        };
        httpLib = httpLibs[String(parsed.protocol)];
      } catch (err) {
        reject(new Error(`Invalid URL: ${url}`));
        return;
      }

      activeRequest = httpLib.request(parsed, (res) => {
        if (stream.destroyed) { return; }
        total = parseInt(res.headers['content-length'], 10);
        res.on('data', (chunk) => {
          downloaded += chunk.length;
          if (debug) {
            const percent = (downloaded / total * 100).toFixed(2);
            const speed = downloaded / ((Date.now() - startTime) / 1000); // bytes per second
            const remaining = (total - downloaded) / speed; // seconds remaining
            console.log(`Downloaded ${percent}% (${downloaded} bytes out of ${total}), ${remaining.toFixed(2)} seconds remaining.`);
          }
        });
        res.pipe(stream);
        stream.emit('response', res);
      });

      activeRequest.on('error', (err) => {
        if (!stream.destroyed) {
          if (reconnects < maxReconnects) {
            reconnects++;
            setTimeout(doDownload, Math.min(reconnects * backoff.inc, backoff.max));
          } else if (retries < maxRetries) {
            retries++;
            setTimeout(doDownload, Math.min(retries * backoff.inc, backoff.max));
          } else {
            reject(err);
          }
        }
      });

      activeRequest.end();
    };

    stream._destroy = (err) => {
      stream.destroyed = true;
      if (activeRequest) {
        activeRequest.destroy(err);
      }
    };

    stream.on('end', resolve);
    stream.on('error', reject);

    process.nextTick(doDownload);
  });

  return {
    pipe: (destination, options = {}) => {
      stream.pipe(destination, options);
      return promise;
    },
  };
}
