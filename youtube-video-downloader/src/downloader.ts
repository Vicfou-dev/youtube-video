import { Core } from "@youtube-video-core/index";
import { isBrowser } from "@youtube-video-core/utils";
import getMacroStream from "./macro-stream";
import proxy from "@youtube-video-core/proxy";

export class Downloader {

    private youtube: Core;

    constructor() {
        this.youtube = new Core();
    }

    public setProxy(url: string) {
        this.youtube.setProxy(url);
        return this;
    }

    public async download(url: string, quality: string = '', name: string = '') {
        const { player } = await this.youtube.fetchMetadata(url);
        const formats = [...player.streamingData.formats, ...player.streamingData.adaptiveFormats];

        var streamingData = quality == '' ? formats : formats.filter((data: any) => data.qualityLabel === quality);
    
        if (streamingData.length === 0) {
            throw new Error('Invalid quality');
        }

        streamingData = this.sortByStreamingQuality(streamingData);

        if(name === '') {
            name = player.videoDetails.title + '.mp4';
        }

        await this.processDownload(streamingData[0], name);
    }

    private async processDownload(streamingData: any, name: string) {
        return isBrowser() === false ? this.downloadForNode(streamingData, name) : this.downloadForBrowser(streamingData, name);
    }

    private async downloadForNode(data : any, name: string) {
        const fs = await import('fs');
        const stream = getMacroStream(data.url);
        await stream.pipe(fs.createWriteStream(name));
    }

    private async downloadForBrowser(data : any, name: string) {
        const response = await proxy.fetchProxy(data.url, {}, isBrowser());
        const fileStream = window['streamSaver'].createWriteStream(`${name}.mp4`);
        const writer = fileStream.getWriter();
        const reader = response.body.getReader();
        const download = async () => {
            const { done, value } = await reader.read();
            if (done) writer.close();
            else writer.write(value);
            if(!done) download();
        };
        download();
    }

    private sortByStreamingQuality(streamingData: Array<any>) {
        return streamingData.sort((a, b) => {

            const qualityA = a.qualityLabel ? parseFloat(a.qualityLabel.replace(/\D/g, '')) : 0;
            const qualityB = a.qualityLabel ? parseFloat(b.qualityLabel.replace(/\D/g, '')) : 0;

            
            if (qualityA === qualityB) {
                const bitrateA = parseInt(a.bitrate, 10);
                const bitrateB = parseInt(b.bitrate, 10);
                return bitrateB - bitrateA;
            }

            return qualityB - qualityA;
        });
    }
}