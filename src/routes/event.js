import express from 'express';
import passport from 'passport';
import { Event } from '../models';
import { fromMongo } from '../lib/dbConnector';

const router = express.Router();

router.get(
  '/id/:id',
  (req, res) => {
    const { id } = req.params;
    Event.findById(id)
      .lean()
      .exec()
      .then((result) => {
        res.json({
          data: fromMongo(result),
        });
      })
      .catch((error) => {
        res.status(500).json({ message: 'ERROR' });
        throw error;
      });
  },
);
router.get(
  '/:page',
  (req, res) => {
    Event.find({})
      .limit(10)
      .skip(10 * req.params.page)
      .sort({ _id: -1 })
      .lean()
      .exec()
      .then((results) => {
        res.json({
          data: fromMongo(results.filter(r => r.isConfirmed)),
        });
      })
      .catch((error) => {
        res.status(500).json({ message: 'ERROR' });
        throw error;
      });
  },
);
router.post(
  '/',
  (req, res) => {
    const query = new Event(req.body).save();
    query
      .then(data => res.json({
        data: fromMongo(data),
      }))
      .catch((error) => {
        res.status(400).json({ success: false });
        throw error;
      });
  },
);
router.put(
  `/:id`,
  (req, res) => {
    const { id } = req.params;
    const query = Event.updateOne(
      {
        _id: id,
      },
      { $set: req.body },
    ).exec();
    query
      .then(() => res.json({
        success: true,
      }))
      .catch((error) => {
        res.status(400).json({ success: false });
        throw error;
      });
  },
);
router.delete(
  '/',
  (req, res) => {
    const { id } = req.body;
    const query = Event.deleteOne({
      _id: id,
    }).exec();
    query
      .then(() => res.json({
        success: true,
      }))
      .catch((error) => {
        res.status(400).json({ success: false });
        throw error;
      });
  },
);
export default router;
