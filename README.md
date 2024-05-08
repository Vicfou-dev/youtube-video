# Youtube Video
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)](http://opensource.org/licenses/MIT) [![image](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)](https://pypi.org/project/youtube-transcript-api/) 


This repository contains four main projects, all related to interacting with the YouTube API. Each project is written in TypeScript and can be built and tested independently.

## Example

For more example of each project you can take a look about them on npm
- [youtube-video-dl](https://www.npmjs.com/package/youtube-video-dl)
- [youtube-video-metric](https://www.npmjs.com/package/youtube-video-metric)
- [youtube-video-transcript](https://www.npmjs.com/package/youtube-video-transcript)


## Youtube-video-core
- The **youtube-video-core** project contains the core code for interacting with the YouTube API. 
- It defines several custom errors such as **VideoUnavailableError** and **TooManyRequestsError**, as well as a Core class that appears to be the basis of interaction with the YouTube API.

This plugin can be downloaded with the following command
`` npm install youtube-video-core ``

## Youtube-video-dl
- The **youtube-video-dl** project apperas to be designed to download youtube videos or shorts. 
 that appears to be the basis of interaction with the YouTube API.
 - It uses the core code from youtube-video-core and defines an Downloader class that appears to be responsible for downloading a video.

This plugin can be downloaded with the following command
`` npm install youtube-video-dl ``

## Youtube-video-metric
- The **youtube-video-metric** project appears to be designed to extract specific metrics from YouTube videos.
 - It uses the core code from youtube-video-core and defines an Inspector class that appears to be responsible for extracting the metrics.

 This plugin can be downloaded with the following command
`` npm install youtube-video-metric ``

## Youtube-video-transcript
- The **youtube-video-transcript** project is designed to
interact with the YouTube transcript API. 
- It allows for retrieving transcripts of YouTube videos in one or more languages. 
- It defines a Transcriptor class that appears to be responsible for interacting with the transcript API.

This plugin can be downloaded with the following command
`` npm install youtube-video-transcript ``

## Installation
Each project can be installed independently by moving into the project directory and running ``npm install``.

## Building
Each project can be built independently by moving into the project directory and running ``npm run build``.

## Testing
Each project can be tested independently by moving into the project directory and running ``npm run test``.

## License
[This project is licensed under the MIT license](license.md) 