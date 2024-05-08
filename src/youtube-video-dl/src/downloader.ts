import { Core } from "@youtube-video-core/index";
import ufd from "universal-file-downloader";

export class Downloader extends Core {

    constructor() {
        super();
    }

    public async download(url: string, quality: string = '', name: string = '') {
        const { player } = await this.fetchMetadata(url);
        const formats = [...player.streamingData.formats, ...player.streamingData.adaptiveFormats];

        var streamingData = quality == '' ? formats : formats.filter((data: any) => data.qualityLabel === quality);
    
        if (streamingData.length === 0) {
            throw new Error('Invalid quality');
        }

        streamingData = this.sortByStreamingQuality(streamingData);
        if(name === '') {
            name = player.videoDetails.title + '.mp4';
        }
        
        const Ufd = new ufd(name, {});

        await Ufd.downloadFile(streamingData[0].url);
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