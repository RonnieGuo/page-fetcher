const request = require("request");
const fs = require("fs");

const url = process.argv[2];
const filePath = process.argv[3];

const fetcher = (url, filePath) => {
  request(url, (error, response, body) => {
    if (error) {
      console.log("Error:", error);
      return;
    }

    if (response.statusCode !== 200) {
      console.log("Request failed. Status code:", response.statusCode);
      return;
    }

    fs.writeFile(filePath, body, (error) => {
      if (error) {
        console.log("Error writing file:", error);
        return;
      }

      const fileSize = Buffer.byteLength(body);
      console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}`);
    });
  });
};

fetcher(url, filePath);
