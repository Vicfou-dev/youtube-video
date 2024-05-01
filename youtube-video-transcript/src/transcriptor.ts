import { UserAgent, RegexExtractFromXml } from "@youtube-video-core/constants";
import { TranscriptionDisabledError } from "@youtube-video-core/errors";
import { TranscriptionList, Transcription } from "./transcription";
import { Core } from "@youtube-video-core/index";

export class Transcriptor {

    private youtube: Core;

    constructor() {
        this.youtube = new Core();
    }

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
        const videoId = this.youtube.getVideoId(url);
        if(videoId.startsWith('http')) {
            throw new Error('Invalid video url');
        }

        const video = await this.youtube.fetchVideo(videoId);
        const transcripts = await this.parseTranscript(video);
        return transcripts;
    }

    /**
     * Parse transcript from an Html page
     * @param page Html page
     */
    private async parseTranscript(page: string): Promise<TranscriptionList>  {
        const raw = page.split('"captions":');
        if(raw.length < 2) {
            throw new TranscriptionDisabledError();
        }

        const { captionTracks } = (() => { try { return JSON.parse(raw[1].split(',"videoDetails')[0].replace('\n', '')); } catch (e) { return undefined; } })()?.['playerCaptionsTracklistRenderer'];
        return this.buildTranscript(captionTracks);
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
}
