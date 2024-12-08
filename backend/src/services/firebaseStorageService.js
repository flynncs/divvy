const { admin } = require("../config/firebase");
const {
  generateSignedFirebaseUrl,
} = require("../utils/generateFirebaseSignedUrl");

const uploadToFirebaseStorage = async (file, userId) => {
  const fileName = `${Date.now()}-${file.originalname}`;
  const filePath = `receipts/${userId}/${fileName}`;
  const bucket = admin.storage().bucket();

  return new Promise((resolve, reject) => {
    const fileUpload = bucket.file(filePath);
    const fileStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    fileStream.on("error", (error) => reject(error));

    fileStream.on("finish", async () => {
      try {
        const publicUrl = await generateSignedFirebaseUrl(filePath);
        resolve({ filePath, publicUrl });
      } catch (urlError) {
        reject(urlError);
      }
    });

    fileStream.end(file.buffer);
  });
};

module.exports = {
  uploadToFirebaseStorage,
};
