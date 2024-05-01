import { Youtube } from "./youtube";

export class Analytics {

    private youtube: Youtube;

    constructor() {
        this.youtube = new Youtube();
    }

    /**
     * Fetch transcript from multiple Youtube Video
     * @param url Video url
     * @param languages Languages to fetch
     */
    public async getAnalytics(url: string): Promise<Transcription[]|Transcription> {

        const transcripts = await this.listTranscripts(url);

        const filteredTranscriptions = transcripts.getMultiple(languages);

        if(filteredTranscriptions.length == 1) {
            return filteredTranscriptions[0];
        }

        return filteredTranscriptions;
    }

    public async getMultipleAnalytics(urls: Array<string>|string): Promise<Transcription[]>  {
        
    }
}