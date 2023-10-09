import got from "got";

const getPlaybackAccessToken = (options) => {
  return new Promise(async (resolve, reject) => {
    let playbackAccessToken;
    try {
      playbackAccessToken = await got
        .post("https://gql.twitch.tv/gql", options)
        .json();
    } catch (error) {
      reject(error);
    }
    if (!playbackAccessToken.data.streamPlaybackAccessToken)
      reject(reject(new Error("User does not exist")));
    resolve(playbackAccessToken.data.streamPlaybackAccessToken);
  });
};

export default getPlaybackAccessToken;
