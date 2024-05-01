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

Quickly import and translate the video of your choice !
```js
import Transcriptor from 'youtube-transcript-api';
await Transcriptor.getTranscript('url or video id', ['en'])
```

You will receive something like that

```json
    {
        "language" : "en",
        "type" : "auto",
        "data" : [
            {
                "start": 0,
                "duration": 6.339,
                "text": "Hello everyone thanks you so much for the last video"
            }
        ]
    }
```

It's also possible to fetch transcripts in multiple language
```js
import Transcriptor from 'youtube-transcript-api';
await Transcriptor.getTranscript('url or video id', ['en', 'es'])
```

You will receive something like that

```json
    {
        "language" : "en",
        "type" : "auto",
        "data" : [
            {
                "start": 0,
                "duration": 6.339,
                "text": "Hello everyone thanks you so much for the last video"
            }
        ]
    },
    {
        "language" : "es",
        "type" : "manual",
        "data" : [
            {
                "start": 0,
                "duration": 5.439,
                "text": "¡Hola a todos, muchas gracias por el último video!"
            }
        ]
    }
```

If you want you can download multiple transcripts from different videos

```js
import Transcriptor from 'youtube-transcript-api';
await Transcriptor.getTranscript(['url video 1', 'url video 2'], ['en'])
```

You will receive something like that
```json
    [
        {
            "language" : "en",
            "type" : "auto",
            "data" : [
                {
                    "start": 0,
                    "duration": 6.339,
                    "text": "Hello everyone thanks you so much for the last video"
                }
            ]
        },
        {
            "language" : "en",
            "type" : "auto",
            "data" : [
                {
                    "start": 0,
                    "duration": 1.219,
                    "text": "Welcome everybody !"
                }
            ]
        }
    ]
```

If you want you can fetch all the transcripts for a video by doing this

```js
import Transcriptor from 'youtube-transcript-api';
const listTranscripts = await Transcriptor.listTranscripts('video url')
```
Then use this function to get all the transcripts as an array
```js
listTranscripts.list()
```
Also you can filter this list to have only the transcripts who are generated
```js
listTranscripts.getAuto()
```
Or who are created manually
```js
listTranscripts.getManual()
```
In different languages
```js
listTranscripts.getMultipleLanguages(['en', 'fr', 'es'])
```

## License
[MIT](license.md) : Feel free to use to this plugin for any of your projects