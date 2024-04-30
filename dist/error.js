"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TooManyRequestsError = exports.InvalidLanguageError = exports.InvalidVideoUrlError = exports.VideoUnavailableError = exports.TranscriptionDisabledError = void 0;
class TranscriptionDisabledError extends Error {
    constructor() {
        super('Transcription is disabled for this video');
    }
}
exports.TranscriptionDisabledError = TranscriptionDisabledError;
class VideoUnavailableError extends Error {
    constructor() {
        super('Video is unavailable');
    }
}
exports.VideoUnavailableError = VideoUnavailableError;
class InvalidVideoUrlError extends Error {
    constructor() {
        super('Invalid video url');
    }
}
exports.InvalidVideoUrlError = InvalidVideoUrlError;
class InvalidLanguageError extends Error {
    constructor() {
        super('Invalid language');
    }
}
exports.InvalidLanguageError = InvalidLanguageError;
class TooManyRequestsError extends Error {
    constructor() {
        super('Too many requests');
    }
}
exports.TooManyRequestsError = TooManyRequestsError;
//# sourceMappingURL=error.js.map