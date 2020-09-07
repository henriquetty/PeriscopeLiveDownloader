const request = require("request");
const downloadChunk = require("./liveDownloader");

//dynamic url
const url =
  "https://prod-fastly-eu-central-1.video.pscp.tv/Transcoding/v1/hls/w_ClYb0w9m4KYpvY33XcgkApwltGsYfC0IY2T5wFJkCP3Ds7Bc3nKITj46O8R8OBAo739ycd0vLkr9tnJm2nMQ/non_transcode/eu-central-1/periscope-replay-direct-prod-eu-central-1-public/dynamic_playlist.m3u8?type=live";

//chunk url
const chunkUrl =
  "https://prod-fastly-eu-central-1.video.pscp.tv/Transcoding/v1/hls/w_ClYb0w9m4KYpvY33XcgkApwltGsYfC0IY2T5wFJkCP3Ds7Bc3nKITj46O8R8OBAo739ycd0vLkr9tnJm2nMQ/non_transcode/eu-central-1/periscope-replay-direct-prod-eu-central-1-public/";

let arrChunk = [];

setInterval(() => {
  request.get(url, (error, response) => {
    let chunk = response.body.split(",");
    let lastIndexChunk = chunk.length - 1;

    if (
      arrChunk.includes(chunk[lastIndexChunk]) ||
      chunk[lastIndexChunk] == "Not Found\n"
    ) {
      console.log("Not pushing due because item is already in.");
    } else {
      if (arrChunk.length >= 5) {
        downloadChunk(chunkUrl, arrChunk);
        arrChunk = [];
      }
      arrChunk.push(chunk[lastIndexChunk]);
    }

    console.log(arrChunk);
  });
}, 1500);
