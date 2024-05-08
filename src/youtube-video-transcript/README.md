# Youtube-Video-Transcript

[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)](http://opensource.org/licenses/MIT) [![image](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)](https://github.com/Vicfou-dev/youtube-video/tree/master/youtube-video-transcript) 

A TypeScript Version of Youtube Transcript Api

If you want to use it in node js without typescript you need to specify "type" : "module" in your package.json

# Table of Contents

1. [Description](#description)
2. [Installation](#installation)
2.1 [Server Side](#server-side)
2.2 [Client Side](#client-side)
2.3 [Setup Proxy](#setup-proxy)
2.4 [Setup Cdn](#setup-cdn)
3. [Example](#example)
3.1 [Fetch Transcript of a video](#fetch-transcript-of-a-video-in-one-language)
3.1.1 [Server Side](#server-side-1)
3.1.2 [Client Side](#client-side-1)
3.1.3 [Data](#data)
3.2 [Fetech Transcript in multiple language](#fetch-transcript-of-a-video-in-multiple-language)
3.2.1 [Server Side](#server-side-2)
3.2.2 [Client Side](#client-side-2)
3.2.3 [Data](#data-1)
3.3 [Fetch Transcript of multiple video](#fetch-transcript-of-multiple-video-in-a-specific-language)
3.3.1 [Server Side](#server-side-3)
3.3.2 [Client Side](#client-side-3)
3.3.3 [Data](#data-2)
3.4 [Useful Ressource](#useful-ressources)
3.4.1 [Server Side](#server-side-4)
3.4.2 [Client Side](#client-side-4)
3.4.3 [Other Functions](#other-functions)
4. [License](#license)

## Description 
This repository provides a simple and efficient way to interact with the YouTube Transcript API. It is designed to fetch transcripts from YouTube videos, with support for both single and multiple video transcripts. 

## Installation
Run this command to install it
```
npm i youtube-video-transcript 
```


### Server Side
Import it in node js / deno like this
```js
import Transcriptor from 'youtube-video-transcript';
```

### Client Side
If you want to use it in your browser

```html
<!DOCTYPE html>
<html>
<head>
    <title>Import Inspector</title>
</head>
<body></body>
<script type="module">
    import Inspector from '../dist/index.mjs';
</script>
</html>
```
### Setup Proxy
You also need to setup a proxy (Hello Cors), but don't worry i provide you a small handler to do it

Create a new file **server.js**
Copy / Paste the following code
```js
import { Server } from 'youtube-video-transcript';
Server.default.listen(8080);
```
Then run node server.js

### Setup Cdn
All the following exemple will use the file mjs in local assuming that you have run the npm install command but if you don't want to it you can use the following

```html
<script type="module">
    import Transcriptor from 'https://cdn.jsdelivr.net/npm/youtube-video-transcript/dist/index.mjs';
</script>
```

But you will need to install a proxy like **tiny-cors-proxy** to bypass the cors option

You can install this package via npm:
```shell
npm install tiny-cors-proxy
```

Then create a new file **server.js** and paste the following snipset :

```js
import Server from 'tiny-cors-proxy';
Server.listen(8080);
```

Then run node server.js

## Example

### Fetch Transcript of a video in one language

#### Server Side
Quickly import and translate the video of your choice !
```js
import Transcriptor from 'youtube-video-transcript';
await Transcriptor.getTranscript('url or video id', ['en'])
```

#### Client Side
If you are working directly in your browser (you must setup a proxy server)
```html
<!DOCTYPE html>
<html>
<head>
    <title>Fetch Transcript of a video in specific language</title>
</head>
<body>
    <button>Fetch Transcripts</button>
</body>
<script type="module">
    import Inspector from '../dist/index.mjs';
    document.querySelector('button').addEventListener('click', async () => {
        const transcriptions = await Transcriptor.setProxy({url : 'http://localhost:8080/'}).getTranscript('url or video id', ['en']);
    });
</script>
</html>
```

#### Data

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

### Fetch Transcript of a video in multiple language

#### Server Side
It's also possible to fetch transcripts in multiple language
```js
import Transcriptor from 'youtube-video-transcript';
await Transcriptor.getTranscript('url or video id', ['en', 'es'])
```

#### Client Side
If you are working directly in your browser (you must setup a proxy server)
```html
<!DOCTYPE html>
<html>
<head>
    <title>Fetch Transcript of a video in specific language</title>
</head>
<body>
    <button>Fetch Transcripts</button>
</body>
<script type="module">
    import Inspector from '../dist/index.mjs';
    document.querySelector('button').addEventListener('click', async () => {
        const transcriptions = await Transcriptor.setProxy({url : 'http://localhost:8080/'}).getTranscript('url or video id', ['en', 'fr']);
    });
</script>
</html>
```

#### Data
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
]
```


### Fetch Transcript of multiple video in a specific language

#### Server Side
If you want you can download multiple transcripts from different videos

```js
import Transcriptor from 'youtube-video-transcript';
await Transcriptor.getTranscript(['url video 1', 'url video 2'], ['en'])
```

#### Client Side
If you are working directly in your browser (you must setup a proxy server)
```html
<!DOCTYPE html>
<html>
<head>
    <title>Fetch Transcript of a video in specific language</title>
</head>
<body>
    <button>Fetch Transcripts</button>
</body>
<script type="module">
    import Inspector from '../dist/index.mjs';
    document.querySelector('button').addEventListener('click', async () => {
        const transcriptions = await Transcriptor.setProxy({url : 'http://localhost:8080/'}).getTranscript(['url or video id 1', 'url of video id 2'], ['en']);
    });
</script>
</html>
```

#### Data
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


### Useful ressources

Sometimes you just wan to fetch all the transcripts available

#### Server Side
If you want you can download multiple transcripts from different videos

```js
import Transcriptor from 'youtube-video-transcript';
const listTranscripts = await Transcriptor.listTranscripts('video url')
```

#### Client Side
If you are working directly in your browser (you must setup a proxy server)
```html
<!DOCTYPE html>
<html>
<head>
    <title>Fetch Transcript of a video in specific language</title>
</head>
<body>
    <button>Fetch Transcripts</button>
</body>
<script type="module">
    import Inspector from '../dist/index.mjs';
    document.querySelector('button').addEventListener('click', async () => {
        const transcriptions = await Transcriptor.setProxy({url : 'http://localhost:8080/'}).listTranscripts('video url')
    });
</script>
</html>
```

#### Other functions
To get all the transcripts as an array
```js
listTranscripts.list()
```

Filter to only have the transcriptions who are generated by AI form youtube
```js
listTranscripts.getAuto()
```

Filter to only have the transcriptions who are manually add by youtube creator
```js
listTranscripts.getManual()
```

Filter to only have the transcriptions in some specific languages
```js
listTranscripts.getMultipleLanguages(['en', 'fr', 'es'])
```

## License
[This project is licensed under the MIT license](license.md) 