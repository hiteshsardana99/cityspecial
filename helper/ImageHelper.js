
//default libraries
const multer  =   require('multer');
const path    =   require('path');


//set storage engine
const storage = multer.diskStorage({
  destination : 'public/images',
  filename : function(req,file,callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});


//check file mimeType
function checkFileType(file,callback) {
  //allowed extension
  const fileTypes = /jpeg|jpg|png|gif/;
  //check extension
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  //check mineType
  const mimeType = fileTypes.test(file.mimetype);

  if(extname && mimeType) {
    return callback(null,'true');
  } else {
    callback('Invalid image received');
  }
}

//Init upload
exports.uploadImage = multer({
  storage : storage,
  limits :  {fileSize : 6*1000*1000},
  fileFilter : function(req,file,callback) {
    checkFileType(file,callback);
  }
}).single('newsImage');
