const multer = require("multer");

const { Receipt } = require("../models");
const { admin } = require("../config/firebase");
const { analyzeReceipt } = require("../services/azureReceiptAnalysis");

const upload = multer({ storage: multer.memoryStorage() });

const generateSignedUrl = async (filePath) => {
  try {
    const bucket = admin.storage().bucket();
    const file = bucket.file(filePath);

    const [url] = await file.getSignedUrl({
      action: "read",
      expires: Date.now() + 5 * 60 * 1000, // 5 minutes
    });

    return url;
  } catch (error) {
    console.log("Error generating signed URL:", error);
    throw new Error("Failed to generate signed URL");
  }
};

const uploadReceipt = async (req, res) => {
  console.log("Uploading receipt...");

  try {
    const userId = req.user.id;
    const file = req.file;

    // Ensure the file is present
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Generate a unique filename with userId and timestamp to avoid overwriting
    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = `receipts/${userId}/${fileName}`;

    // Upload the file to Firebase Storage
    const bucket = admin.storage().bucket();
    const fileUpload = bucket.file(filePath);
    const fileStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype, // Set the file type (mimetype)
      },
    });

    // Upload process
    fileStream.on("error", (error) => {
      console.log("Error uploading file:", error);
      return res.status(500).json({ message: "Error uploading file", error });
    });

    fileStream.on("finish", async () => {
      // Generate a public URL for the uploaded file
      const publicUrl = await generateSignedUrl(filePath);

      // Call the Azure receipt analysis service
      const analysis = await analyzeReceipt(publicUrl);

      // Here, you can also save the receipt and analysis in your database
      // const receipt = new Receipt({
      //   userId,
      //   fileUrl: publicUrl,
      //   analysis: analysis,
      // });
      // await receipt.save();

      // Respond with the file URL and analysis
      res.status(201).json({
        message: "File uploaded and analyzed successfully",
        url: publicUrl,
        analysis,
      });
    });

    // Start uploading the file buffer to Firebase Storage
    fileStream.end(file.buffer);
  } catch (error) {
    console.log("Error during receipt upload:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = { upload, uploadReceipt };
