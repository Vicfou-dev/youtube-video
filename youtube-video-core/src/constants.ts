export const YoutubeUrl = 'https://www.youtube.com/watch';
export const YoutubeConsentUrl = 'https://consent.youtube.com/s';
export const RegexExtractYoutubeVideoId = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
export const RegexExtractFromXml = /<text start="([^"]*)" dur="([^"]*)">([^<]*)<\/text>/g;
export const RegexExtractMetadataPlayer = /var\s+ytInitialPlayerResponse\s*=\s*({.*?});/s;
export const RegexExtractMetadata = /var\s+ytInitialData\s*=\s*({.*?});/s;
export const RegexExtractYoutubeVideoIdFromShortUrl = /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]+)/;
export const UserAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36,gzip(gfe)';