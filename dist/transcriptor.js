"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transcriptor = void 0;
const constant_1 = require("./constant");
const error_1 = require("./error");
class Transcriptor {
    async getTranscript(url, languages) {
        if (typeof languages === 'string') {
            languages = [languages];
        }
        const videoId = this.getVideoId(url);
        if (videoId.startsWith('http')) {
            throw new Error('Invalid video url');
        }
        const video = await this.fetchVideo(videoId);
        const transcripts = await this.parseTranscript(video);
        console.log(transcripts);
    }
    async getTranscripts(urls, languages) {
        if (typeof urls === 'string') {
            urls = [urls];
        }
        for (const url of urls) {
            const videoId = this.getVideoId(url);
            if (!videoId) {
                throw new Error('Invalid video url');
            }
        }
    }
    async fetchVideo(videoId) {
        return await this.fetchHtml(videoId);
    }
    async fetchHtml(videoId) {
        const headers = { 'User-Agent': constant_1.UserAgent, 'Accept-Language': 'en-US' };
        const response = await fetch(`${constant_1.YoutubeUrl}?v=${videoId}`, { credentials: 'include', headers });
        return await response.text();
    }
    async parseTranscript(page) {
        var _a;
        const raw = page.split('"captions":');
        if (raw.length > 1) {
            const { captionTracks } = (_a = (() => { try {
                return JSON.parse(raw[1].split(',"videoDetails')[0].replace('\n', ''));
            }
            catch (e) {
                return undefined;
            } })()) === null || _a === void 0 ? void 0 : _a['playerCaptionsTracklistRenderer'];
            return this.buildTranscript(captionTracks);
        }
        if (page.includes('class="g-recaptcha')) {
            throw new error_1.TooManyRequestsError();
        }
        if (!page.includes("playabilityStatus")) {
            throw new error_1.VideoUnavailableError();
        }
        throw new error_1.TranscriptionDisabledError();
    }
    async fetchXmlTranscript(url) {
        const headers = { 'User-Agent': constant_1.UserAgent, 'Accept-Language': 'en-US' };
        const response = await fetch(url, { headers });
        return await response.text();
    }
    async buildTranscript(captionsTracks) {
        const transcripts = [];
        for (const track of captionsTracks) {
            const { baseUrl, languageCode, kind } = track;
            const page = await this.fetchXmlTranscript(baseUrl);
            const data = [...page.matchAll(constant_1.RegexExtractFromXml)].map(([, start, duration, text]) => ({ start: parseFloat(start), duration: parseFloat(duration), text }));
            transcripts.push({ language: languageCode, type: kind == 'asr' ? 'auto' : 'manual', data });
        }
        return transcripts;
    }
    getVideoId(url) {
        if (url.length == 11) {
            return url;
        }
        const [baseUrl, videoId] = url.match(constant_1.RegexExtractYoutubeVideoId);
        if (videoId) {
            return videoId;
        }
        return url;
    }
}
exports.Transcriptor = Transcriptor;
//# sourceMappingURL=transcriptor.js.map