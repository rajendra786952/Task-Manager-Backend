const userModel = require("../models/User");
const { validateLogin, validateRegister } = require('../payload-validator/auth-validator');
const { getToken } = require ('../utils/token');
const bcrypt = require("bcrypt");

async function register(req, res) {
          try {
            const { error } = validateRegister(req.body);
            if(error)
             throw error.details[0].message;
            const user = await userModel(req.body).save();
            res.status(200).send({ message: "User register successfully" });
          } catch (error) {
            res.status(500).send({ error: error.toString()});
        }
}

async function login(req, res) {
  try {
    const { error } = validateLogin(req.body);
    if(error)
     throw error.details[0].message;
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }); 
    if (!user)
       throw 'User not found.';
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
       throw 'Invalid credentials.';
    const token = getToken(user.toObject());
    let userData = {...user.toObject(),token};
    delete userData.password;
    res.status(200).send({data: userData ,message:"User login successfully." });
  } catch (error) {
    res.status(500).send({ error: error.toString()});
  }
}

module.exports = {
  register,
  login
};
