const { handleError } = require("../utils/handleError");

const errorHandler = (err, req, res, next) => {
  if (err) {
    handleError(res, err, err.message || "Internal server error.");
  }

  next();
};

module.exports = errorHandler;
