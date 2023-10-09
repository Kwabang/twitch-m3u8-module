import got from "got";

const getIntegrity = (options) => {
  return new Promise(async (resolve, reject) => {
    let integrity;
    try {
      integrity = await got
        .post("https://gql.twitch.tv/integrity", options)
        .json();
    } catch (error) {
      reject(error);
    }
    resolve(integrity);
  });
};

export default getIntegrity;
