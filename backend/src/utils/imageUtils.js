const sharp = require("sharp");

const compressImage = async (buffer) => {
  try {
    const compressedImage = await sharp(buffer)
      .resize(1500, 2000, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({
        quality: 80,
        chromaSubsampling: "4:4:4",
      })
      .toBuffer();

    return compressedImage;
  } catch (error) {
    throw new Error(`Image compression failed: ${error.message}`);
  }
};

module.exports = { compressImage };
