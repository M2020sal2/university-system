export const asyncHandler = (controller) => {
  return (req, res, next) => {
    controller(req, res, next).catch(async (error) => {
      return res
        .status(error.cause || 500)
        .json({ message: error.message, stack: error.stack });
    });
  };
};

export const GlobalErrorHandling = (error, req, res, next) => {
  return res
    .status(error.cause || 500)
    .json({ message: error.message, stack: error.stack });
};
