const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/png"];

    if (!allowedMimes.includes(file.mimetype)) {
      cb(new Error("Invalid file type - please use JPEG or PNG."), false);
    }
    cb(null, true);
  },
});

module.exports = { upload };
