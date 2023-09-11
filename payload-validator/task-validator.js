const Joi = require('joi');

const taskSchema = Joi.object({
    title: Joi.string().min(3).required(),
    dueDate: Joi.date().iso().greater('now').message('Date must be greater than or equal to today').required(),
    attachment:Joi.string().required()
  });

 function validateTask(data){
      return taskSchema.validate(data);
  }
  module.exports = {
    validateTask
  }