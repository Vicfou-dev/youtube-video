import { Downloader } from "./downloader";
import { TranscriptionDisabledError, VideoUnavailableError, InvalidVideoUrlError, InvalidLanguageError, TooManyRequestsError, LanguageNotAvailableError } from "@youtube-video-core/errors";
export default new Downloader();
export { Downloader, TranscriptionDisabledError, VideoUnavailableError, InvalidVideoUrlError, InvalidLanguageError, TooManyRequestsError, LanguageNotAvailableError };