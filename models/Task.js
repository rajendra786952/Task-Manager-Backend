const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const schema = mongoose.Schema;
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  dueDate: {
    type: Date,
    required:true
  },
  attachment: { type: String, required: true },
  user: { type: schema.Types.ObjectId, required: true , ref:'User'},
},{
  timestamps: true 
});



module.exports = mongoose.model("Task", taskSchema);
