import { Core } from "@youtube-video-core/index";
import { RegexExtractMetadata } from "@youtube-video-core/constants";
import { MetricNotAvaible } from "@youtube-video-core/errors";

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
    public async getMetric(url: string): Promise<string> {

        const videoId = this.youtube.getVideoId(url);

        const page = await this.youtube.fetchVideo(videoId);

        return this.buildMetric(page);
        return '';
    }

    private async buildMetric(page: string): Promise<string> {
        const [group, ytInitialPlayerResponse ] = page.match(RegexExtractMetadata);
        if(!ytInitialPlayerResponse) {
            throw new MetricNotAvaible()
        }

        const metadata = JSON.parse(ytInitialPlayerResponse);
        console.log(metadata);
        return '';
    }

}