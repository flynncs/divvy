const express = require("express");
const router = express.Router();

const { upload, uploadReceipt } = require("../controllers/receiptsController");

router.post("/upload", upload.single("receipt"), uploadReceipt);

module.exports = router;
