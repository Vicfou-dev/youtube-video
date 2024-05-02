interface thumbnail {
    url: string,
    width: number,
    height: number
}

export interface Metric {
    videoId: string,
    title: string,
    lengthSeconds: string,
    keywords: string[],
    category : string,
    channelId: string,
    isOwnerViewing: boolean,
    shortDescription: string,
    isCrawlable: boolean,
    thumbnail: { thumbnails: Array<thumbnail> },
    allowRatings: boolean,
    viewCount: BigInteger,
    loudness: number,
    author: string,
    isPrivate: boolean,
    isUnpluggedCorpus: boolean,
    isLiveContent: boolean,
    isVideoMonetized: boolean,
    isFamilySafe: boolean,
    uploadDate: string,
    publishDate : string,
}

