import { TranscriptionDisabledError, VideoUnavailableError, InvalidVideoUrlError, InvalidLanguageError, TooManyRequestsError, LanguageNotAvailableError } from "./errors";
import { Core } from "./core";
export default new Core();
export { Core, TranscriptionDisabledError, VideoUnavailableError, InvalidVideoUrlError, InvalidLanguageError, TooManyRequestsError, LanguageNotAvailableError };