import { RegexExtractYoutubeVideoId, YoutubeUrl, UserAgent, RegexExtractFromXml } from "./constant";
import { TranscriptionDisabledError, VideoUnavailableError, TooManyRequestsError } from "./error";
import { TranscriptionList, Transcription } from "./transcription";

export class Transcriptor {
    /**
     * Fetch transcript from multiple Youtube Video
     * @param url Video url
     * @param languages Languages to fetch
     */
    public async getTranscript(url: string, languages : Array<string>|string = ['en']): Promise<Transcription[]|Transcription> {
        if (typeof languages === 'string') {
            languages = [languages];
        }

        const transcripts = await this.listTranscripts(url);

        const filteredTranscriptions = transcripts.getMultiple(languages);
        
        if(filteredTranscriptions.length == 1) {
            return filteredTranscriptions[0];
        }

        return filteredTranscriptions;
    }

    /**
     * Fetch transcript from one Youtube Video
     * @param urls Video(s) url
     * @param languages Languages to fetch
     */
    public async getTranscripts(urls: Array<string>|string, languages: Array<string>|string = ['en']): Promise<Transcription[]>  {

        if (typeof urls === 'string') {
            urls = [urls]
        }

        const transcriptions: Transcription[] = [];
        for (const url of urls) {
            var transcripts = await this.getTranscript(url, languages);
            if(Array.isArray(transcripts) === false) {
                transcripts = [transcripts];
            }

            for(const transcript of transcripts) {
                transcriptions.push(transcript);
            }
        }

        return transcriptions;
    }

    /**
     * List all transcripts from a Youtube Video
     * @param url Url of the video
     */
    public async listTranscripts(url : string): Promise<TranscriptionList> {
        const videoId = this.getVideoId(url);
        if(videoId.startsWith('http')) {
            throw new Error('Invalid video url');
        }

        const video = await this.fetchVideo(videoId);
        const transcripts = await this.parseTranscript(video);
        return transcripts;
    }

    /**
     * Fetch video page
     * @param videoId Video id
     */
    private async fetchVideo(videoId: string): Promise<string> {
        return await this.fetchHtml(videoId);
    }

    private async fetchHtml(videoId: string): Promise<string> {
        const headers = { 'User-Agent' : UserAgent, 'Accept-Language': 'en-US' }

        const response = await fetch(`${YoutubeUrl}?v=${videoId}`, { credentials: 'include', headers });
        return await response.text();
    }

    /**
     * Parse transcript from an Html page
     * @param page Html page
     */
    private async parseTranscript(page: string): Promise<TranscriptionList>  {
        const raw = page.split('"captions":');
        if(raw.length > 1) {
            const { captionTracks } = (() => { try { return JSON.parse(raw[1].split(',"videoDetails')[0].replace('\n', '')); } catch (e) { return undefined; } })()?.['playerCaptionsTracklistRenderer'];
            return this.buildTranscript(captionTracks);
        }

        if(page.includes('class="g-recaptcha')) {
            throw new TooManyRequestsError();
        }

        if(!page.includes("playabilityStatus")) {
            throw new VideoUnavailableError();
        }
        
        throw new TranscriptionDisabledError()
    }

    private async fetchXmlTranscript(url: string): Promise<string> {
        const headers = { 'User-Agent' : UserAgent, 'Accept-Language': 'en-US' }

        const response = await fetch(url, { headers });
        return await response.text();
    }

    private async buildTranscript(captionsTracks: Array<any>): Promise<TranscriptionList> {
        const transcripts: Transcription[] = [];

        for(const track of captionsTracks) {
            const { baseUrl, languageCode, kind } = track;
            const page = await this.fetchXmlTranscript(baseUrl);
            const data = [...page.matchAll(RegexExtractFromXml)].map(([, start, duration, text]) => ({ start: parseFloat(start), duration: parseFloat(duration), text }));
            transcripts.push({ language: languageCode, type: kind == 'asr' ? 'auto' : 'manual', data });
        }

        return new TranscriptionList(transcripts);
    }

    /**
     * Get video id of the video for the given url
     * @param url 
     */
    private getVideoId(url: string): string {
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
