const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password:  Joi.string()
    .min(8) // Minimum length of 8 characters
    .max(30) // Maximum length of 30 characters
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
    .message(
      'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*)'
    )
    .required(),
    image:Joi.string().required()
  });
const loginSchema =Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

 function validateRegister(data){
      return registerSchema.validate(data);
  }
  function validateLogin(data){
    return loginSchema.validate(data);
  }
  module.exports = {
    validateRegister,
    validateLogin
  }