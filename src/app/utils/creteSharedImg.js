const { Canvas, resolveImage, FontLibrary} = require("canvas-constructor/skia");
FontLibrary.use("Nerd", ["./src/app/utils/fonts/NerdFont.ttf"]);

async function createImg(str, imgProfile, nameProfile) {

  const img = await resolveImage("https://res.cloudinary.com/bwlog/image/upload/v1660094074/essencials/back_shared_lwspwa.png");
  imgProfile = await resolveImage(imgProfile);
  let image = await new Canvas(1280, 720)
    .printImage(img, 0, 0, 1280, 720)
    // set text color whitesmoke
    .setColor("whitesmoke")
    .setTextFont("bold 50px Nerd")
    .setTextAlign("center")
    .printCircularImage(imgProfile, 71, 620, 51, 51)
    .printWrappedText(str, 640, 350, 1020, 35)
    .setTextFont("bold 22px Nerd")
    .setTextBaseline("middle")
    .printText(nameProfile, 200, 637)
    .toDataURL();
    return image
} 

module.exports = createImg