# Youtube-Video-Metric

[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)](http://opensource.org/licenses/MIT) [![image](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)](https://pypi.org/project/youtube-transcript-api/) 

A TypeScript Version of Youtube Video Metric

## Description
This repository provides an inspector who will gather a lot information about a youtube video

## Installation
Run this command to install it
```
npm i youtube-video-metric
```

## Example

Quickly import and translate the video of your choice !
```js
import Inspector from 'youtube-video-metric';
await Inspector.getTranscript('url or video id')
```

You will receive something like that

```js
{
      videoId: 'gd6PWtUCPCk',
      title: 'On a tous eu des frissons devant cette réplique #shorts #Gladiator #PrimeVideo',
      lengthSeconds: 23,
      keywords: [ 'Shorts', 'Prime video', 'Gladiator' ],
      channelId: 'UC4YtyYW5RpGBgQqChMyjfIg',
      isOwnerViewing: false,
      shortDescription: '',
      isCrawlable: true,
      thumbnail: {
        thumbnails: [
          {
            url: 'https://i.ytimg.com/vi/gd6PWtUCPCk/hq2.jpg?sqp=-oaymwE1CKgBEF5IVfKriqkDKAgBFQAAiEIYAHABwAEG8AEB-AHOBYACgAqKAgwIABABGEEgVShyMA8=&rs=AOn4CLD-rY9qmtjn7GLOkjQ_dpJkvRWduw',
            width: 168,
            height: 94
          },
          {
            url: 'https://i.ytimg.com/vi/gd6PWtUCPCk/hq2.jpg?sqp=-oaymwE1CMQBEG5IVfKriqkDKAgBFQAAiEIYAHABwAEG8AEB-AHOBYACgAqKAgwIABABGEEgVShyMA8=&rs=AOn4CLBhpwB1crXxYBbILSBC0ndOdXzSBw',
            width: 196,
            height: 110
          },
          {
            url: 'https://i.ytimg.com/vi/gd6PWtUCPCk/hq2.jpg?sqp=-oaymwE2CPYBEIoBSFXyq4qpAygIARUAAIhCGABwAcABBvABAfgBzgWAAoAKigIMCAAQARhBIFUocjAP&rs=AOn4CLDDyLMqKIpl-LkLaxRYW2ecY0OvXw',
            width: 246,
            height: 138
          },
          {
            url: 'https://i.ytimg.com/vi/gd6PWtUCPCk/hq2.jpg?sqp=-oaymwE2CNACELwBSFXyq4qpAygIARUAAIhCGABwAcABBvABAfgBzgWAAoAKigIMCAAQARhBIFUocjAP&rs=AOn4CLBQPDCg9pe5ZEvWUSFU8TzSNSbfwQ',
            width: 336,
            height: 188
          },
          {
            url: 'https://i.ytimg.com/vi/gd6PWtUCPCk/maxres2.jpg?sqp=-oaymwEoCIAKENAF8quKqQMcGADwAQH4Ac4FgAKACooCDAgAEAEYQSBVKHIwDw==&rs=AOn4CLCZgPje_c-_dNH9fiiEzJzAHr4yJA',     
            width: 1920,
            height: 1080
          }
        ]
      },
      allowRatings: true,
      viewCount: 223123,
      author: 'Amazon Prime Video France',
      isPrivate: false,
      isLiveContent: false,
      loudness: -13,
      dislikeCount: 194,
      likeCount: 9804,
      rating: 4.922384476895379,
      commentCount: 145,
      publishDate: '2022-09-23T08:52:29-07:00',
      uploadDate: '2022-09-23T08:52:29-07:00',
      isFamilySafe: true,
      category: 'Film & Animation',
      numberOfSubscriber: 729000,
      isVideoMonetized: true,
      isManualCaptionsAvailable: false,
      defaultLanguage: 'fr'
    }
```

Name | Type | Description
|----------|----------|---------|
videoId	|string	|The id of the video requested
title	|string	|The title of the video requested
lengthSeconds |string	|The amount of seconds in the video requested
keywords[]	|list	|A list of keywords defined by the creator of the video
channelId	|string	|The id of the channel the video is on
isOwnerViewing	|boolean	|Is the owner the one who requested this video? (only possible with cookies)
shortDescription  |string	|The description of the video requested
isCrawlable	|boolean	|Can search engines see this video? (only true for public videos)
thumbnail	|object	| An object containing the thumbnail of the video
thumbnail.thumbnails[]	|list	|A list of thumbnails with different resolutions
thumbnail.thumbnails[].url	|string	|The url to download the thumbnail from
thumbnail.thumbnails[].width	|integer	|The width of the thumbnail
thumbnail.thumbnails[].height	|integer	|The height of the thumbnail
allowRatings	|boolean|	Did the creator choose to disable ratings for this video?
viewCount	|integer	|The amount of views the video has
author	|string	|The name of the channel the video was uploaded to
isPrivate	| boolean	|Is the video private
isLiveContent	|boolean	|Is the video requested currently live/premiering
loudness | number | Loudness of the video (quality audio)
isVideoMonetized | boolean | Is the video monetized
isFamilySafe | boolean | Is the video can be show to a chil
uploadDate | string | Upload date of the video
publishDate | string | Published date of the video
likeCount | number | Number of like in the video
dislikeCount | number | Number of dislike of the video
rating | number | Rating of the video beetween 1 and 5
isManualCaptionsAvailable | boolean | Is some manual captions available on the video
defaultLanguage | string | default language of the video
numberOfSubscriber | number | Number of subscribers for the channel who uploaded this video(rounded)
commentCount | number | Number of comment for the video
