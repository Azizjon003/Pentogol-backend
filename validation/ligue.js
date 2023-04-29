const Joi = require("joi");
const addLigueValdiation = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().required(),
  countTeams: Joi.number().default(20),
  tittle: Joi.string(),
});

exports.addLigueValdiation = addLigueValdiation;
