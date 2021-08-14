const upload = require("./multerConfig");

async function addPathToBody(req, res, next) {
  if (req.files && req.files.length > 0) {
    if (req.files.length && req.files[0].fieldname === "image") {
      req.images = req.files;
    }
  }
  next();
}

function fileUpload(field) {
  return function (req, res, next) {
    const uploader = upload.array(field, 12);
    // eslint-disable-next-line prefer-arrow-callback
    return uploader(req, res, function (err) {
      if (err && err.name === "MulterError") {
        res.status(400).send({ message: err.message });
      } else if (err) {
        res.status(400).send({ Error: err.message });
      }
      next();
    });
  };
}
module.exports = (field) => [fileUpload(field), addPathToBody];
