import express from 'express';
import { Location } from '../models';
import { fromMongo } from '../lib/dbConnector';
import mongoose from 'mongoose';

const router = express.Router();

router.get(
  '/',
  (req, res) => {
    Location.find({})
      .sort({ _id: -1 })
      .lean()
      .exec()
      .then((result) => {
        res.json({
          data: fromMongo(result),
        });
      })
      .catch((error) => {
        res.status(400).json({ success: false });
        throw error;
      });
  },
);
router.post(
  '/',
  (req, res) => {
    new Location({
      ...req.body,
      datetime: new Date(),
    })
      .save()
      .then((result) => {
        res.json({
          data: fromMongo(result),
        });
      })
      .catch((error) => {
        res.status(400).json({ success: false });
        throw error;
      });
  },
);
router.put(
  '/:id',
  (req, res) => {
    Location.updateOne({
      _id: mongoose.Types.ObjectId(req.params.id),
    }, {
      $set: req.body,
    })
      .exec()
      .then((result) => {
        res.json({
          data: fromMongo(result),
        });
      })
      .catch((error) => {
        res.status(400).json({ success: false });
        throw error;
      });
  },
);
router.delete(
  '/:id',
  (req, res) => {
    Location.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) })
      .exec()
      .then((result) => {
        res.json({
          data: fromMongo(result),
        });
      })
      .catch((error) => {
        res.status(400).json({ success: false });
        throw error;
      });
  },
);
export default router;
