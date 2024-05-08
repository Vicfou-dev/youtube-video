import { Core } from "@youtube-video-core/index";
import { YoutubeDislikeUrl, YoutubeApiUrl } from "@youtube-video-core/constants";
import { convertToNumber } from "@youtube-video-core/utils";
import { Metric } from "./metric";

export class Inspector extends Core {

    constructor() {
        super();
    }

    /**
     * Fetch metric from video youtube
     * @param url Video url
     * @param languages Languages to fetch
     */
    public async getMetric(url: string): Promise<Metric> {

        const [metadata, analytics, ratings] = await Promise.all([this.fetchMetadata(url), this.getAnalytics(url), this.getRatings(url)])

        delete metadata.player.videoDetails.isUnpluggedCorpus;
        metadata.player.videoDetails.lengthSeconds = parseInt(metadata.player.videoDetails.lengthSeconds, 10);
        metadata.player.videoDetails.viewCount = parseInt(metadata.player.videoDetails.viewCount, 10);
        var videoDetails = {...metadata.player.videoDetails} as Metric;


        videoDetails.loudness = metadata.player.playerConfig.audioConfig.loudnessDb;

        const playerResponse = metadata.player.microformat.playerMicroformatRenderer
        const { publishDate, uploadDate, isFamilySafe, category } = playerResponse;
        videoDetails = {...videoDetails, ...ratings, commentCount : analytics.commentCount, publishDate, uploadDate, isFamilySafe, category}; 

        const numberOfSubscriberAsText = metadata.data.contents.twoColumnWatchNextResults.results.results.contents[1].videoSecondaryInfoRenderer.owner.videoOwnerRenderer.subscriberCountText.simpleText;
        const numberOfSubscriber = convertToNumber(numberOfSubscriberAsText.split(" ")[0]);
        videoDetails.numberOfSubscriber = numberOfSubscriber;

        const csi = metadata.player.responseContext.serviceTrackingParams[1];
        videoDetails.isVideoMonetized = analytics.licensedContent && numberOfSubscriber >= 1000 && (url.includes('shorts') ? true : Boolean(csi.params.filter(({key, value}) => key === "yt_ad" && value === "1").pop()))

        const captions = metadata.player.captions.playerCaptionsTracklistRenderer.captionTracks;
        videoDetails.isManualCaptionsAvailable = captions.filter( ({ kind }) => kind != 'asr') > 0;
        videoDetails.defaultLanguage = captions[0].languageCode;
        
        return videoDetails;

    }

    private async getAnalytics(url) {
        const videoId = this.getVideoId(url);
        const key = Buffer.from("QUl6YVN5Q25jbnJxeVlLcGg3cnhFQUhqRVQ2am5hVU1UaEpZQTdN", 'base64');
        const response = await fetch(`${YoutubeApiUrl}/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${key}`);
        const analytics = await response.json();
        const commentCount = parseInt(analytics.items[0].statistics.commentCount, 10);
        const licensedContent = analytics.items[0].contentDetails.licensedContent;
        
        return { commentCount , licensedContent }
    }

    private async getRatings(url) {
        const videoId = this.getVideoId(url);
        const response = await fetch(`${YoutubeDislikeUrl}/votes?videoId=${videoId}`);
        const ratings = await response.json();
        const { dislikes, likes, rating } = ratings;

        return { dislikeCount : dislikes, likeCount : likes, rating }
    }

}