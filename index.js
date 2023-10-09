import got from "got";
import getIntegrity from "./src/getIntegrity.js";
import getPlaybackAccessToken from "./src/getPlaybackAccessToken.js";

const getM3u8 = (streamerID, clientToken) => {
  const clientID = "kimne78kx3ncx6brgo4mv6wki5h1ko";
  let options = {
    headers: {
      "client-id": clientID,
    },
    throwHttpErrors: false,
  };
  if (clientToken) options.headers.authorization = "OAuth " + clientToken;

  return new Promise(async (resolve, reject) => {
    try {
      const integrity = await getIntegrity(options);
      options.headers["Client-Integrity"] = integrity.token;
      options.body = JSON.stringify({
        operationName: "PlaybackAccessToken",
        variables: {
          isLive: true,
          login: streamerID,
          isVod: false,
          vodID: "",
          playerType: "frontpage",
        },
        extensions: {
          persistedQuery: {
            version: 1,
            sha256Hash:
              "f51c71103d886ee77e4ff84bfc92352acf66a120413f8e99cfcea092e600936f",
          },
        },
      });
      const playbackAccessToken = await getPlaybackAccessToken(options);
      const randomNumber = parseInt(Math.random() * 999999);
      const signature = playbackAccessToken.signature;
      const tokenValue = encodeURI(playbackAccessToken.value);
      const url = `https://usher.ttvnw.net/api/channel/hls/${streamerID}.m3u8?acmb=e30%3D&allow_source=true&fast_bread=true&p=${randomNumber}&player_backend=mediaplayer&playlist_include_framerate=true&reassignments_supported=true&sig=${signature}&supported_codecs=avc1&token=${tokenValue}&transcode_mode=cbr_v1&cdm=wv&player_version=1.22.0`;
      let hls = await got.get(url, {
        throwHttpErrors: false,
      });
      if (hls.ok) {
        hls = hls.body.replace(/.*#.*\n?/gm, "");
        resolve(hls.split("\n"));
      } else if (hls.statusCode === 404) {
        reject(new Error("Stream does not exist"));
      }
    } catch (error) {
      reject(error);
    }
  });
};

export default getM3u8;
