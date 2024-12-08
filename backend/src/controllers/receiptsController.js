const multer = require("multer");

const { analyzeReceipt } = require("../services/azureReceiptAnalysis");
const {
  uploadToFirebaseStorage,
} = require("../services/firebaseStorageService");
const { createReceipt } = require("../services/receiptService");
const {
  extractReceiptName,
  extractReceiptTotal,
  extractReceiptDate,
} = require("../utils/analysisUtils");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

const uploadReceipt = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error("No file uploaded");
    }

    const userId = req.user.id;
    const file = req.file;

    const { filePath, publicUrl } = await uploadToFirebaseStorage(file, userId);

    const analysis = await analyzeReceipt(publicUrl);

    const receiptName = extractReceiptName(analysis);
    const receiptTotal = extractReceiptTotal(analysis);
    const receiptDate = extractReceiptDate(analysis);

    const receiptData = {
      name: receiptName,
      total: receiptTotal,
      date: receiptDate,
      url: publicUrl,
      createdBy: userId,
      groupId: req.body.groupId || null,
      analysis: analysis,
    };

    // TODO: Save receipt to database
    //const receipt = await createReceipt(receiptData);

    res.status(201).json({ receiptData });
  } catch (error) {
    console.error("Error uploading receipt:", error);
    next(error);
  }
};

module.exports = { upload, uploadReceipt };
