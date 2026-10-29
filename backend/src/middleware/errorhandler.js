const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Duplicate email
  if (err.code === "23505") {
    return res.status(409).json({
      message: "A student with this email already exists",
    });
  }

  // Invalid database value
  if (err.code === "22P02") {
    return res.status(400).json({
      message: "Invalid data provided",
    });
  }

  // General server error
  res.status(500).json({
    message: "Internal server error",
  });
};

module.exports = errorHandler;