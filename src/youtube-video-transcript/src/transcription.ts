export interface Transcription {
    language: string;
    type: string;
    data : Array<{ text: string, start: number, duration : number }>;
}

export class TranscriptionList {
    private transcriptions: Array<Transcription> = [];

    constructor(transcriptions: Array<Transcription>) {
        this.transcriptions = transcriptions;
    }

    public list(): Array<Transcription> {
        return this.transcriptions;
    }

    public getManual(): Transcription | undefined { 
        return this.transcriptions.find(t => t.type == 'manual');
    }

    public getAuto(): Transcription | undefined {
        return this.transcriptions.find(t => t.type == 'auto');
    }

    public get(language: string): Transcription | undefined {
        return this.transcriptions.find(t => t.language == language);
    }

    public getMultiple(languages: Array<string>): Array<Transcription> {
        return this.transcriptions.filter(t => languages.includes(t.language));
    }
}