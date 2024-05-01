import { RegexExtractYoutubeVideoId, YoutubeUrl, UserAgent } from "./constants";
import { VideoUnavailableError, TooManyRequestsError } from "./errors";

export class Core {
    /**
     * Fetch video page
     * @param videoId Video id
     */
    public async fetchVideo(videoId: string): Promise<string> {
        return await this.fetchHtml(videoId);
    }

    private async fetchHtml(videoId: string): Promise<string> {
        const headers = { 'User-Agent' : UserAgent, 'Accept-Language': 'en-US' }

        const response = await fetch(`${YoutubeUrl}?v=${videoId}`, { credentials: 'include', headers });
        const page = await response.text();

        if(page.includes('class="g-recaptcha')) {
            throw new TooManyRequestsError();
        }

        if(!page.includes("playabilityStatus")) {
            throw new VideoUnavailableError();
        }

        return page;
    }

    /**
     * Get video id of the video for the given url
     * @param url 
     */
    public getVideoId(url: string): string {
        if(url.length == 11) {
            return url;
        }

        const [baseUrl, videoId] = url.match(RegexExtractYoutubeVideoId);
        if(videoId) {
            return videoId;
        }

        return url
    }
}
