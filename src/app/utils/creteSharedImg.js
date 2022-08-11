const { Canvas, resolveImage, FontLibrary} = require("canvas-constructor/skia");
const { fillTextWithTwemoji, measureText } = require('skia-canvas-twemoji');

FontLibrary.use("Nerd", ["./src/app/utils/fonts/NerdFont.ttf"]);

async function createImg(str, imgProfile, nameProfile) {

  const img = await resolveImage("https://res.cloudinary.com/bwlog/image/upload/v1660172635/essencials/Design_sem_nome_5_somyir.png");
  imgProfile = await resolveImage(imgProfile);
  
  let image = new Canvas(1280, 720);
  let ctx = image.canvas.getContext("2d");

  ctx.drawImage(img, 0, 0, 1280, 720)
  image.setColor("#000000")
  image.setTextFont("bold 52px Nerd")
  image.setTextAlign("center")
  image.printCircularImage(imgProfile, 131, 550, 57, 57)
  // image.printWrappedText(str, 640, 340, 1020, 35)
  async function breakStr() {
    let words = str.split(" ");
    let line = "";
    let lines = [];
    for (let i = 0; i < words.length; i++) {
      let testLine = line + words[i] + " ";
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > 1020) {
        lines.push(line);
        line = words[i] + " ";
      } else {
        line = testLine;
      }
    }
    lines.push(line);
    return lines.join("\n");

  }
  let lines = await breakStr();
  lines = lines.split("\n");
  let lineheight = 55;
  for (var i = 0; i<lines.length; i++) {
    await fillTextWithTwemoji(ctx, lines[i], 650, 340 + (i*lineheight), options = {maxWidth: 1070});
  };
  image.setTextFont("bold 22px Nerd")
  image.setTextBaseline("middle")
  image.printText(nameProfile, 250, 590)
  image.toDataURL();
    
  return image.toDataURL();
} 

module.exports = createImg