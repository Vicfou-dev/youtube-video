interface thumbnail {
    url: string,
    width: number,
    height: number
}

export interface Metric {
    videoId: string,
    title: string,
    lengthSeconds: number,
    keywords: string[],
    category : string,
    channelId: string,
    isOwnerViewing: boolean,
    shortDescription: string,
    isCrawlable: boolean,
    thumbnail: { thumbnails: Array<thumbnail> },
    allowRatings: boolean,
    viewCount: number,
    loudness: number,
    author: string,
    isPrivate: boolean,
    isLiveContent: boolean,
    isVideoMonetized: boolean,
    isFamilySafe: boolean,
    uploadDate: string,
    publishDate : string,
    likeCount: number,
    isManualCaptionsAvailable: boolean,
    defaultLanguage: string,
    numberOfSubscriber: number,
    commentCount: number,
}

