const { handleError } = require("../utils/handleError");

const errorHandler = (err, req, res, next) => {
  // Pass to the enhanced handleError function
  handleError(res, err, err.message || "Internal server error");
};

module.exports = errorHandler;
