class AppError extends Error {
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    Error.captureStackTrace(this, this.constructor);
  }
}

// For expected operational errors that are safe to show to users
const createOperationalError = (message, statusCode = 400) => {
  return new AppError(message, statusCode, true);
};

// For unexpected errors that shouldn't be exposed to users
const createInternalError = (message, statusCode = 500) => {
  return new AppError(message, statusCode, false);
};

// Main error handling function
const handleError = (res, error, customMessage) => {
  // Always log the full error for debugging
  console.error("Error details:", {
    message: error.message,
    stack: error.stack,
    details: error,
  });

  if (error.response) {
    console.error("Response error:", error.response.body);
  }

  const isDevelopment = process.env.NODE_ENV === "development";

  // Handle known AppErrors
  if (error instanceof AppError) {
    // For operational errors, we can show the actual error message
    if (error.isOperational) {
      return res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    }
  }

  // For non-operational errors or unknown errors
  if (isDevelopment) {
    // In development, send detailed error information
    return res.status(500).json({
      status: "error",
      message: customMessage || error.message,
      error: error,
      stack: error.stack,
    });
  }

  // In production, send a generic message for non-operational errors
  return res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};

module.exports = {
  AppError,
  handleError,
  createOperationalError,
  createInternalError,
};
