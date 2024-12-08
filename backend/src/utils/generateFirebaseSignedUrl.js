const { admin } = require("../config/firebase");

const generateSignedFirebaseUrl = async (filePath) => {
  try {
    const bucket = admin.storage().bucket();
    const file = bucket.file(filePath);

    const [url] = await file.getSignedUrl({
      action: "read",
      expires: Date.now() + 5 * 60 * 1000, // 5 minutes
    });

    return url;
  } catch (error) {
    throw new Error("Failed to generate signed URL");
  }
};

module.exports = {
  generateSignedFirebaseUrl,
};
