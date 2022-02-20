const { Canvas } = require("canvas-constructor/cairo");
const canvas = require("canvas");
const registerFont = require("canvas").registerFont;
registerFont("./src/app/utils/Cinzel-Medium.ttf", {
  family: "Cinzel"
});

async function createImg(str) {
  const img = await canvas.loadImage(
    "https://i.ibb.co/M6fVzjm/banner-placeholder.png"
  );

  let image = new Canvas(600, 300)
    .printImage(img, 0, 0, 600, 300)
    .setColor("#000")
    .setTextFont("30px Cinzel")
    .setTextAlign("center")
    .printText(str, 300, 150)
    .toDataURL();


  return image
}

module.exports = createImg