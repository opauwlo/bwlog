const imgbbUploader = require("imgbb-uploader");

// Your barebone async function
const myUrl = async (base64) => {
  return await imgbbUploader({
    apiKey: process.env.IMGBB_API_KEY,
    base64string: base64,
  })
    .then((res) => {
      console.log(`Handle success: ${res.url}`);
      return res.url;
    })
    .catch((e) => {
      console.error(`Handle error: ${e}`);
    });
};

module.exports = myUrl;