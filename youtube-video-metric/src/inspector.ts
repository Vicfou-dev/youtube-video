import { Core } from "@youtube-video-core/index";
import { RegexExtractMetadata } from "@youtube-video-core/constants";
import { MetricNotAvaible } from "@youtube-video-core/errors";
import { Metric } from "./metric";
import { writeFileSync } from 'fs';

export class Inspector {

    private youtube: Core;

    constructor() {
        this.youtube = new Core();
    }

    /**
     * Fetch metric from video youtube
     * @param url Video url
     * @param languages Languages to fetch
     */
    public async getMetric(url: string): Promise<Metric> {
        const metadata = await this.youtube.fetchMetadata(url)

        var videoDetails = {...metadata.player.videoDetails} as Metric;

        videoDetails.loudness = metadata.player.playerConfig.audioConfig.loudnessDb;

        const csi = metadata.player.responseContext.serviceTrackingParams[1];
        videoDetails.isVideoMonetized = Boolean(csi.params.filter(({key, value}) => key === "yt_ad" && value === "1").pop())

        const playerResponse = metadata.player.microformat.playerMicroformatRenderer
        const { publishDate, uploadDate, isFamilySafe, category } = playerResponse;
        videoDetails = {...videoDetails, publishDate, uploadDate, isFamilySafe, category } 

        writeFileSync('debug.json', JSON.stringify(metadata, null, 2));

        return videoDetails;

    }


}