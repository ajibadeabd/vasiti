 const multer = require("multer");

 const storage = multer.diskStorage({
   destination: (req, file, cb) => {
     cb(null, "./public/upload/");
   },
   filename: (req, file, cb) => {
     const fileExt = file.originalname.split(".").pop();
     const filename = `${new Date().getTime()}.${fileExt}`;
     cb(null, filename);
   },
 });
 
 const fileFilter = (req, file, cb) => {
   if (
     file.mimetype === "image/jpg" ||
     file.mimetype === "image/png" ||
     file.mimetype === "image/jpeg"
   ) {
     cb(null, true);
   } else {
    //    throw new CustomError(
    //    console.log('mnbvcx')
     cb(
       {
         message: "Unsupported File Format",
       },
       false
    //    throw new CustomError(

     )
    //    )
   }
 };
 const upload = multer({
   storage,
   limits: {
     fieldNameSize: 200,
     fileSize: 50 * 1024 * 1024,
   },
   fileFilter,
 });
 
 module.exports = upload;
 