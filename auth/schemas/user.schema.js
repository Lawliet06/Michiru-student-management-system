const Joi = require("joi");

const createUserSchema = Joi.object({
  body: Joi.object({
    usrEmail: Joi.string().email().required(),
    usrName: Joi.string().required(),
    usrPass: Joi.string().required(),
    confPass: Joi.string().valid(Joi.ref("usrPass")).required(),
  }),
});

const validUserSchema = Joi.object({
  body: Joi.object({
    usrEmail: Joi.string().email().required(),
    usrPass: Joi.string().required(),
  }),
});

module.exports = { createUserSchema, validUserSchema };
