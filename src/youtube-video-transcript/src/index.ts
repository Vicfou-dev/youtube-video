import { Transcriptor } from "./transcriptor";
import { TranscriptionList, Transcription } from "./transcription";
import { TranscriptionDisabledError, VideoUnavailableError, InvalidVideoUrlError, InvalidLanguageError, TooManyRequestsError, LanguageNotAvailableError } from "@youtube-video-core/errors";
export default new Transcriptor;
export { Transcriptor, TranscriptionList, Transcription, TranscriptionDisabledError, VideoUnavailableError, InvalidVideoUrlError, InvalidLanguageError, TooManyRequestsError, LanguageNotAvailableError };