# Youtube-Video-Api

[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)](http://opensource.org/licenses/MIT) [![image](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)](https://pypi.org/project/youtube-transcript-api/) 

A TypeScript Version of Youtube Transcript Api

## Description
This repository provides a simple and efficient way to interact with the YouTube Transcript API. It is designed to fetch transcripts from YouTube videos, with support for both single and multiple video transcripts.

## Installation
Run this command to install it
```
npm i youtube-transcript-api
```

## Example
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
averageRating	|double	| The like:dislike ratio
allowRatings	|boolean|	Did the creator choose to disable ratings for this video?
viewCount	|integer	|The amount of views the video has
author	|string	|The name of the channel the video was uploaded to
isPrivate	| boolean	|Is the video private?
isUnpluggedCorpus	|boolean	| No information
isLiveContent	|boolean	|Is the video requested currently live/premiering?