# Twitch-M3u8-Module <img src="https://img.shields.io/static/v1?label=code&message=Node.js&color=green" alt="">

## Install

```sh
npm install twitch-m3u8-module
```

## Features

### HLS (without auth)

```javascript
import getM3u8 from "twitch-m3u8-module";

const m3u8 = await getM3u8("twitch"))

console.log(m3u8)
//=> ["http://video-weaver.....m3u8", "http://video-weaver.....m3u8", "http://video-weaver.....m3u8"]
```

| Arguments    | Type     | Description        |
| :----------- | :------- | :----------------- |
| `StreamerID` | `string` | Twitch Streamer ID |

### HLS (with auth)

```javascript
import getM3u8 from "twitch-m3u8-module";

const m3u8 = await getM3u8("twitch","1b31jzoa3bjlasd546d6ksrsall8g"))

console.log(m3u8)
//=> ["http://video-weaver.....m3u8", "http://video-weaver.....m3u8", "http://video-weaver.....m3u8"]
```

| Arguments     | Type     | Description          |
| :------------ | :------- | :------------------- |
| `StreamerID`  | `string` | Twitch Streamer ID   |
| `ClientToken` | `string` | Twitch Account Token |

## Output

ex) [0] = 1080p60, [1] = 720p60 ....

```javascript
[
  "http://video-weaver.....m3u8",
  "http://video-weaver.....m3u8",
  "http://video-weaver.....m3u8",
];
```
