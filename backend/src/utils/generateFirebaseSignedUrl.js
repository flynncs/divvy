const { admin } = require("../config/firebase");

const generateSignedFirebaseUrl = async (filePath, expireTime) => {
  try {
    const bucket = admin.storage().bucket();
    const file = bucket.file(filePath);

    const [url] = await file.getSignedUrl({
      action: "read",
      expires: Date.now() + expireTime,
    });

    return url;
  } catch (error) {
    throw new Error("Failed to generate signed URL");
  }
};

module.exports = {
  generateSignedFirebaseUrl,
};
