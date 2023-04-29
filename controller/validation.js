const catchAsync = require("../utility/catchAsync");

function validate(schema) {
  return catchAsync(async (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ errors });
    }

    next();
  });
}
module.exports = { validate };
