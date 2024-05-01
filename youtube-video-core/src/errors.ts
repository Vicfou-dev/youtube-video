export class TranscriptionDisabledError extends Error {
    constructor() {
        super('Transcription is disabled for this video');
    }
}

export class MetricNotAvaible extends Error {
    constructor() {
        super('Metric is not available for this video');
    }
}

export class VideoUnavailableError extends Error {
    constructor() {
        super('Video is unavailable');
    }
}

export class InvalidVideoUrlError extends Error {
    constructor() {
        super('Invalid video url');
    }
}

export class InvalidLanguageError extends Error {
    constructor() {
        super('Invalid language');
    }
}

export class TooManyRequestsError extends Error {
    constructor() {
        super('Too many requests');
    }
}

export class LanguageNotAvailableError extends Error {
    constructor() {
        super('Language not available');
    }
}