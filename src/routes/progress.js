import express from 'express';
import passport from 'passport';
import { Progress } from '../models';

const router = express.Router();

router.get(
  '/',
  (req, res) => {
    res.json({
      now: new Date(),
    });
  },
);
router.get(
  '/:accountId',
  (req, res) => {
    const { accountId } = req.params;
    const query = Progress
      .find({ account: accountId })
      .sord({ date: -1 })
      .exec();
    query
      .then((progresses) => {
        res.json({
          progresses,
        });
      })
      .catch((error) => {
        res.status(500).json({ message: 'ERROR' });
        throw error;
      });
  },
);
router.get(
  '/:progressId',
  (req, res) => {
    const { progressId } = req.params;
    const query = Progress
      .findOne({ _id: progressId })
      .exec();
    query
      .then((progress) => {
        res.json({
          progress,
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
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    const { date, size, routine } = req.body;
    const query = new Progress({
      account: req.user._id,
      date,
      size,
      routine,
    })
      .save();
    query
      .then(progress => res.json({
        progress,
      }))
      .catch((error) => {
        res.status(500).json({ message: 'ERROR' });
        throw error;
      });
  },
);
router.put(
  '/',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    const { id, size, routine } = req.body;
    const query = Progress.updateOne(
      {
        _id: id,
        account: req.user._id,
      },
      {
        $set: { size, routine },
      },
    ).exec();
    query
      .then(() => res.json({
        success: true,
      }))
      .catch((error) => {
        res.status(500).json({ message: 'ERROR' });
        throw error;
      });
  },
);
export default router;
