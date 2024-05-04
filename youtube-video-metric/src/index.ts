import { Inspector } from "./inspector";
import { Metric } from "./metric";
import { TranscriptionDisabledError, VideoUnavailableError, InvalidVideoUrlError, InvalidLanguageError, TooManyRequestsError, LanguageNotAvailableError } from "@youtube-video-core/errors";
export default new Inspector();
export { Inspector, Metric, TranscriptionDisabledError, VideoUnavailableError, InvalidVideoUrlError, InvalidLanguageError, TooManyRequestsError, LanguageNotAvailableError };