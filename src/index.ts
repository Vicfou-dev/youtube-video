import { Downloader } from "./youtube-video-dl/src/downloader";
import { Inspector } from "./youtube-video-metric/src/inspector";
import { Transcriptor } from "./youtube-video-transcript/src/transcriptor";
import { Core, Server } from "./youtube-video-core/src";

export default { Downloader : new Downloader, Inspector: new Inspector, Transcriptor: new Transcriptor, Core : new Core, Server };
export { Downloader, Inspector, Transcriptor, Core, Server };