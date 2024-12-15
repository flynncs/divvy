const { analyzeReceipt } = require("../services/azureReceiptAnalysis");
const {
  uploadToFirebaseStorage,
} = require("../services/firebaseStorageService");
const { createReceipt } = require("../services/receiptService");
const { extractReceiptData } = require("../utils/analysisUtils");
const { compressImage } = require("../utils/imageUtils");
const { upload } = require("../middlewares/uploadMiddleware");
const {
  createOperationalError,
  createInternalError,
} = require("../utils/handleError");

const uploadReceipt = async (req, res, next) => {
  try {
    if (!req.file) {
      throw createOperationalError("No file uploaded", 400);
    }

    const compressedFile = await compressImage(req.file.buffer);
    const { filePath, previewUrl, downloadUrl } = await uploadToFirebaseStorage(
      { ...req.file, buffer: compressedFile },
      req.user.id
    );

    const analysis = await analyzeReceipt(downloadUrl);
    const receipt = await createReceipt({
      ...extractReceiptData(analysis),
      previewUrl: previewUrl,
      downloadUrl: downloadUrl,
      createdBy: req.user.id,
      analysis: analysis,
    });

    res.status(201).json({ receipt });
  } catch (error) {
    // If it's already an AppError (operational or internal), pass it through
    if (error.isOperational !== undefined) {
      next(error);
      return;
    }

    // For unexpected errors, create an internal error that won't expose details to users
    next(createInternalError("Error processing receipt"));
  }
};

const createManualReceipt = async (req, res, next) => {
  console.log("req.body", req.body);
  try {
    const receiptData = {
      ...req.body.receipt,
      createdBy: req.user.id,
    };

    const receipt = await createReceipt(receiptData);
    res.status(201).json({ receipt });
  } catch (error) {
    next(createInternalError("Error creating receipt"));
  }
};

module.exports = { upload, uploadReceipt, createManualReceipt };
