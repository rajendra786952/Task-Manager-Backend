const mongoose = require('mongoose');

const validateParams = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
}

module.exports = { validateParams };