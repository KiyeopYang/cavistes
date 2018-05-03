import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import {
  IMAGE_PATH,
  remove,
} from '../lib/fileManager';

const MAX_FILE_SIZE = 1024 * 1024 * 10; // 10MB
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `${IMAGE_PATH}`);
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});
// const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: function (req, file, callback) {
    const ext = path.extname(file.originalname).toLowerCase();
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new Error('Only images are allowed'))
    }
    callback(null, true)
  },
}).single('qqfile');
const router = express.Router();

// 이미지를 업로드
router.post('/img', (req, res) => {
  const responseData = {
    success: false
  };
  upload(req, res, (err) => {
    if (err) {
      failWithTooBigFile(responseData, res);
    } else {
      const { qqfilename, qquuid } = req.body;
      const src = `${IMAGE_PATH}${req.file.filename}`;
      const destDir = `${IMAGE_PATH}${qquuid}`;
      const dest = `${destDir}/${qqfilename}`;
      fs.mkdir(destDir, () => {
        const sourceStream = fs.createReadStream(src);
        const destStream = fs.createWriteStream(dest);
        responseData.path = `/${qquuid}/${qqfilename}`;
        responseData.uuid = qquuid;
        responseData.filename = req.file.filename;
        responseData.mimetype = req.file.mimetype;
        responseData.size = req.file.size;
        sourceStream
          .on("error", function (error) {
            console.error("Problem copying file: " + error.stack);
            destStream.end();
            responseData.error = "Problem copying the file!";
            fs.unlink(src, () => {
              res.send(responseData);
            });
          })
          .on("end", function () {
            destStream.end();
            responseData.success = true;
            fs.unlink(src, () => {
              res.send(responseData);
            });
          })
          .pipe(destStream);
      });
    }
  });
});
router.delete('/img/:uuid', onDeleteFile);

function onDeleteFile(req, res) {
  remove(req.params.uuid)
    .then(() => {
      res.send();
    })
    .catch((error) => {
      console.error("Problem deleting file! " + error);
      res.status(500);
    });
}
function failWithTooBigFile(responseData, res) {
  responseData.error = "Too big!";
  responseData.preventRetry = true;
  res.send(responseData);
}

export default router;
