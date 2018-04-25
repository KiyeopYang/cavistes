import express from 'express';
import { Service } from '../models';
import {
  remove,
} from '../lib/fileManager';

const router = express.Router();

router.get(
  '/',
  (req, res) => {
    Service.findOne({})
      .exec()
      .then((s) => {
        let v = s;
        if (!v) {
          new Service({})
            .save()
            .then(() => {
              res.json({
                data: v,
              });
            })
        } else {
          res.json({
            data: s,
          });
        }
      });
  },
);
router.put(
  '/',
  (req, res) => {
    Service.findOneAndUpdate(
      {},
      { $set: req.body },
      (err, r) => {
        if (err) {
          res.status(500).json({ message: '에러가 있습니다.' });
        } else {
          remove(r.titleImages.map(img => img.uuid))
            .then(() => {
              res.json({ data: r });
            })
            .catch((error) => {
              console.error(error);
              res.status(500).json({ message: '에러가 있습니다.' });
            });
        }
    });
  }
);

export default router;
