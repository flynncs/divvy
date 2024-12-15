const { getStorage } = require("firebase-admin/storage");

const {
  generateSignedFirebaseUrl,
} = require("../utils/generateFirebaseSignedUrl");

const uploadToFirebaseStorage = async (file, userId) => {
  if (!file?.buffer || !userId) {
    throw new Error("Invalid file or userId");
  }

  const storage = getStorage();
  const bucket = storage.bucket();
  const timestamp = Date.now();
  const safeFileName = encodeURIComponent(
    file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_")
  );
  const filePath = `receipts/${userId}/${timestamp}-${safeFileName}`;
  const fileRef = bucket.file(filePath);

  return new Promise((resolve, reject) => {
    const stream = fileRef.createWriteStream({
      contentType: file.mimetype,
      metadata: {
        userId,
        uploadedAt: timestamp,
        originalName: file.originalname,
      },
      validation: "crc32c",
    });

    stream.on("error", (error) => {
      reject(new Error(`Upload failed: ${error.message}`));
    });

    stream.on("finish", async () => {
      try {
        const previewUrl = `https://firebasestorage.googleapis.com/v0/b/${
          bucket.name
        }/o/${encodeURIComponent(filePath)}?alt=media`;
        const downloadUrl = await generateSignedFirebaseUrl(
          filePath,
          365 * 24 * 60 * 60 * 1000
        );

        resolve({
          filePath,
          previewUrl,
          downloadUrl,
        });
      } catch (error) {
        reject(new Error(`Failed to generate URLs: ${error.message}`));
      }
    });

    stream.end(file.buffer);
  });
};

module.exports = { uploadToFirebaseStorage };
