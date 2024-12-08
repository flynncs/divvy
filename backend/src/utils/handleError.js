const handleError = (res, error, message) => {
  console.error(message, JSON.stringify(error, null, 2));

  if (error.response) {
    console.error("Response error:", error.response.body);
  }

  res.status(500).json({
    message: message || "An internal error has occurred.",
    error: error.message || error,
  });
};

module.exports = {
  handleError,
};
