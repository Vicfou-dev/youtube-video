import { RegexExtractYoutubeVideoId, RegexExtractYoutubeVideoIdFromShortUrl, YoutubeUrl, UserAgent, RegexExtractMetadata, RegexExtractMetadataPlayer } from "./constants";
import { VideoUnavailableError, TooManyRequestsError, MetricNotAvaible } from "./errors";
import { match, isBrowser } from "./utils";
import proxy, {ProxyOptions} from "./proxy";

export class Core {

    private proxy: proxy

    constructor() {
        this.proxy = new proxy();
    }
    /**
     * Fetch video page
     * @param videoId Video id
     */
    protected async fetchVideo(videoId: string): Promise<string> {
        return await this.fetchHtml(videoId);
    }

    public setProxy(options : ProxyOptions) {
        this.proxy.setProxy(options);
        return this;
    }

    protected async fetchHtml(videoId: string): Promise<string> {
        const headers = { 'User-Agent' : UserAgent, 'Accept-Language': 'en-US' }

        var url = `${YoutubeUrl}?v=${videoId}`;
        const response = await this.proxy.fetchThroughtProxy(`${url}`, { headers }, isBrowser());
        const page = await response.text();

        if(page.includes('class="g-recaptcha')) {
            throw new TooManyRequestsError();
        }

        if(!page.includes("playabilityStatus")) {
            throw new VideoUnavailableError();
        }

        return page;
    }

    protected async fetchMetadata(url: string): Promise<any> {
        const videoId = this.getVideoId(url);

        const page = await this.fetchVideo(videoId);

        const player = match(page, RegexExtractMetadataPlayer);
        const data = match(page, RegexExtractMetadata);
        if(!player || !data) {
            throw new MetricNotAvaible()
        }

        const metadata = { player : JSON.parse(player), data : JSON.parse(data) };
        return metadata;
    }

    /**
     * Get video id of the video for the given url
     * @param url 
     */
    protected getVideoId(url: string): string {
        if(url.length == 11) {
            return url;
        }

        const rules = [RegexExtractYoutubeVideoIdFromShortUrl, RegexExtractYoutubeVideoId];
        for(const rule of rules) {
            const videoId = match(url, rule);
            if(!videoId) {
                continue;
            }

            return videoId;
        }

        return url;
    }
}
