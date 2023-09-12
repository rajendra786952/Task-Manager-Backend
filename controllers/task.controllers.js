const taskModel = require('../models/Task');
const { validateTask } = require('../payload-validator/task-validator');
const { validateParams } = require('../utils/validate-params');

const taskList = async (req,res) => {
    try{
        const { _id } = req.user; 
        if(_id){
          const taskList = await taskModel.find({user:_id})
          res.status(200).send({message:'Task List',data:taskList})
        }
    }
    catch(error){
        res.status(500).send({ error: error.toString()});
    }
}

const createTask = async (req,res) => {
    try {
        const { error } = validateTask(req.body);
        if(error)
         throw error.details[0].message;
        req.body.user=req.user._id;
        const task = await taskModel(req.body).save();
        res.status(200).send({ message: "Task created successfully." });
      } catch (error) {
        res.status(500).send({ error: error.toString()});
    }
}

const editTask = async (req,res) => {
    try {
        const _id  = req.params.id;
        if(!validateParams(_id))
         throw 'Invalid Task Id.';
        const { error } = validateTask(req.body,true);
        if(error)
         throw error.details[0].message;
        const task = await taskModel.findOne({ _id });
         if(!task){
          throw 'Task does not exist.';
         }
        const updateTask = await taskModel.updateOne({_id},{$set : req.body });
        res.status(200).send({ message: "Task update successfully." });
      } catch (error) {
        res.status(500).send({ error: error.toString()});
    }
}

const deleteTask = async (req,res) => {
    try{
        const _id  = req.params.id;
        if(!validateParams(_id))
         throw 'Invalid Task Id.';
        const task = await taskModel.findOne({ _id });
        if(!task){
         throw 'Task Id does not exist.';
        }
        await taskModel.deleteOne({ _id })
        res.status(200).send({message:'Delete task successfully'})
    }
    catch(error){
        res.status(500).send({ error: error.toString()});
    }
}

module.exports = {
    taskList,
    createTask,
    editTask,
    deleteTask
}