"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAgent = exports.RegexExtractFromXml = exports.RegexExtractYoutubeVideoId = exports.YoutubeConsentUrl = exports.YoutubeUrl = void 0;
exports.YoutubeUrl = 'https://www.youtube.com/watch';
exports.YoutubeConsentUrl = 'https://consent.youtube.com/s';
exports.RegexExtractYoutubeVideoId = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
exports.RegexExtractFromXml = /<text start="([^"]*)" dur="([^"]*)">([^<]*)<\/text>/g;
exports.UserAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36,gzip(gfe)';
//# sourceMappingURL=constant.js.map