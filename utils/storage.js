const multer = require('multer');
const fs = require('fs');
const { isImageFile } = require('./ImageFile');

const multerStorage = (directory,validation,key='image') => {
 return multer.diskStorage({
    destination: (req, file, cb) => {
      if(key !== 'image')
       directory+=`/${req.user._id}`;
      const { originalname } = file ;
      req.body[key] =  originalname ;
      //const { error } = validateRegister(req.body);
      const { error } = validation(req.body);
      //const directory = `public/images`
      if (error) {
        cb(error.details[0].message,directory);
      }
      else{
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true })
          }
          cb(key === 'image' ? ( isImageFile(originalname) ? null : "Image file is invalid." ) : null , directory)
      }
    },
    filename: (req, file, cb) => {
      cb( null , file.originalname);
    },
  });
};

module.exports = { multerStorage  }