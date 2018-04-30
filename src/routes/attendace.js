import express from 'express';
import passport from 'passport';
import mongoose from 'mongoose';
import { Event, Account, Attendance } from '../models';
import { fromMongo } from '../lib/dbConnector';

const router = express.Router();

router.post(
  '/',
  (req, res) => {
    const {
      accountId,
      eventId,
      price,
      status,
      orderMethod,
    } = req.body;
    new Attendance({
      accountId,
      eventId,
      price,
      status: status || '신청',
      orderMethod,
      datetime: new Date(),
    })
      .save()
      .then((result) => {
        return Event.updateOne({
          _id: eventId,
        }, {
          $push: {
            attendees: result,
          },
        })
          .exec()
          .then(() => {
            res.json({
              data: fromMongo(result),
            });
          });
      })
      .catch((error) => {
        res.status(400).json({ success: false });
        throw error;
      });
  },
);
router.get(
  '/accountId/:id',
  (req, res) => {
    const { id } = req.params;
    Attendance.find({
      accountId: mongoose.Types.ObjectId(id),
    })
      .populate('eventId')
      .sort({ _id: -1 })
      .exec()
      .then((result) => {
        return res.json({
          data: result.map(o => fromMongo(o.toObject())),
        });
      })
      .catch((error) => {
        res.status(400).json({ success: false });
        throw error;
      });
    },
);
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
