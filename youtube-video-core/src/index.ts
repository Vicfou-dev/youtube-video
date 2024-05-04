import { TranscriptionDisabledError, VideoUnavailableError, InvalidVideoUrlError, InvalidLanguageError, TooManyRequestsError, LanguageNotAvailableError } from "./errors";
import { Core } from "./core";
import { isBrowser } from "./utils";
let Server = isBrowser() ? null : require("tiny-cors-proxy");
export default new Core();
export { Core, Server, TranscriptionDisabledError, VideoUnavailableError, InvalidVideoUrlError, InvalidLanguageError, TooManyRequestsError, LanguageNotAvailableError };