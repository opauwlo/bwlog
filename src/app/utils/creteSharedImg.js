const { Canvas, resolveImage } = require("canvas-constructor/skia");


async function createImg(str, imgProfile, nameProfile) {

  const img = await resolveImage("https://res.cloudinary.com/bwlog/image/upload/v1651956912/essencials/bwlog-7_i8xnt6.png");
  imgProfile = await resolveImage(imgProfile);
  let image = await new Canvas(600, 300)
    .printImage(img, 0, 0, 600, 300)
    .setTextFont("bold 28px Cinzel")
    .setTextAlign("center")
    .printCircularImage(imgProfile, 55, 225, 27, 27)
    .printWrappedText(str, 300, 135, 555, 30)
    .setTextFont("bold 13px Cinzel")
    .setTextBaseline("middle")
    .printText(nameProfile, 119, 225)
    .toDataURL();
    return image
}

module.exports = createImg