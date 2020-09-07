const request = require("request");
const downloadChunk = require("./liveDownloader");

//dynamic url
const url = "";

//chunk url
const chunkUrl = "";

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
