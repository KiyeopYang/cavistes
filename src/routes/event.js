import express from 'express';
import passport from 'passport';
import mongoose from 'mongoose';
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
router.post(
  '/reply',
  (req, res) => {
    const {
      accountId,
      eventId,
      name,
      email,
      text,
    } = req.body;
    Event.updateOne({
      _id: eventId,
    }, {
      $push: {
        reply: {
          id: mongoose.Types.ObjectId(),
          accountId,
          email,
          name,
          text,
          datetime: new Date(),
        },
      },
    }).exec()
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
  '/reply',
  (req, res) => {
    const {
      eventId,
      replyId,
    } = req.body;
    Event.updateOne({
      _id: eventId,
    }, {
      $pull: {
        reply: {
          id: mongoose.Types.ObjectId(replyId),
        },
      },
    }).exec()
      .then(() => res.json({
        success: true,
      }))
      .catch((error) => {
        res.status(400).json({ success: false });
        throw error;
      });
  },
);
//
router.post(
  '/attend',
  (req, res) => {
    // const {
    //   accountId,
    //   eventId,
    //   email,
    //   phone,
    //   name,
    //   status,
    // } = req.body;
    // Event.updateOne({
    //   _id: eventId,
    // }, {
    //   $push: {
    //     attendees: {
    //       id: mongoose.Types.ObjectId(),
    //       status: status || '신청완료',
    //       accountId,
    //       email,
    //       phone,
    //       name,
    //       datetime: new Date(),
    //     },
    //   },
    // }).exec()
    const {
      eventId,
      ...rest,
    } = req.body;
    Event.updateOne({
      _id: eventId,
    }, {
      $push: {
        attendees: {
          id: mongoose.Types.ObjectId(),
          status: rest.status || '신청 완료',
          ...rest,
          datetime: new Date(),
        },
      },
    }).exec()
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
  '/attend',
  (req, res) => {
    const {
      eventId,
      attendId,
    } = req.body;
    Event.updateOne({
      _id: eventId,
    }, {
      $pull: {
        attendees: {
          id: mongoose.Types.ObjectId(attendId),
        },
      },
    }).exec()
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
