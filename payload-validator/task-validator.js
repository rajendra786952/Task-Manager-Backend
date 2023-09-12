const Joi = require('joi');
let obj = {
  title: Joi.string().min(3).required(),
  attachment:Joi.string().required()
}

const taskSchema = Joi.object({...obj,dueDate: Joi.date().iso().greater('now').message('Date must be greater than or equal to today').required()});
const editTaskSchema = Joi.object({...obj,dueDate: Joi.date().iso().required()});

 function validateTask(data,edit=false){
     if(edit){
       console.log(edit);
       return editTaskSchema.validate(data);
     }
     return taskSchema.validate(data);
  }
  module.exports = {
    validateTask
  }