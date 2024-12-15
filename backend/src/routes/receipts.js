const express = require("express");
const router = express.Router();

const {
  upload,
  uploadReceipt,
  createManualReceipt,
} = require("../controllers/receiptController");

router.post("/upload", upload.single("receipt"), uploadReceipt);
router.post("/manual", createManualReceipt);

module.exports = router;
