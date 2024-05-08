# Youtube-Video-Metric

[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)](http://opensource.org/licenses/MIT) [![image](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)](https://pypi.org/project/youtube-transcript-api/) 

A TypeScript Version of Youtube Video Metric

If you want to use it in node js without typescript you need to specify "type" : "module" in your package.json 

## Table Of Contents

1. [Description](#description)
2. [Installation](#installation)
2.1 [Server Side](#server-side)
2.2 [Client Side](#client-side)
2.3 [Setup Proxy](#setup-proxy)
2.4 [Setup CDN](#setup-cdn)
3. [Example](#example)
3.1 [Download a video](#download-a-video)
3.1.1 [Server Side](#server-side-1)
3.1.2 [Client Side](#client-side-1)
4. [License](#license)

## Description
This repository provides a downloader who will help you to download a youtube video

## Installation

### Server Side
Run this command to install it
```
npm i youtube-video-dl
```

### Client Side
Or import it in your browser

```html
<script type="module">
    import Downloader from '../dist/index.mjs';
</script>
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
    import Transcriptor from 'https://cdn.jsdelivr.net/npm/youtube-video-dl/dist/index.mjs';
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

### Download a video 

#### Server Side
Quickly import and translate the video of your choice !
```js
import Inspector from 'youtube-video-dl';
await Downloader.download('https://www.youtube.com/watch?v=et9gw5xbtoY', '144p', 'toto.mp4')
```

#### Client Side

If you are working directly in your browser (you must setup a proxy server)
```html
<!DOCTYPE html>
<html>
<head>
    <title>Download a video</title>
</head>
<body>
    <button>Download a video</button>
</body>
<script type="module">
    import Downloader from '../dist/index.mjs';
    document.querySelector('button').addEventListener('click', () => {
        await Downloader.setProxy('http://localhost:8080').download('https://www.youtube.com/watch?v=et9gw5xbtoY');
    });
</script>
</html>
```

## License
[This project is licensed under the MIT license](license.md) 
