import express from 'express';
import passport from 'passport';
import mongoose from 'mongoose';
import { Account } from '../models';

const router = express.Router();

router.get(
  '/',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    if (!req.user) {
      res.clearCookie('account');
      return res.status(400).json({ message: 'LOGIN AGAIN' });
    }
    return res.json({ account: req.user });
  },
);
router.post(
  '/login',
  (req, res) => {
    const { email, password } = req.body;
    const query = Account.findOne({
      email,
    }).exec();
    query.then(async (result) => {
      if (!result) {
        res.status(400).json({ message: 'not good' });
      } else {
        const valid = await result.passwordIsValid(password);
        if (valid) {
          const account = result.toObject();
          delete account.password;
          res.cookie('account', account.token);
          res.json(account);
        } else {
          res.status(400).json({ message: 'not good' });
        }
      }
    })
      .catch((error) => {
        res.status(400).json({ message: 'no User' });
        throw error;
      });
  },
);
router.post(
  '/',
  (req, res) => {
    const { email, password } = req.body;
    const query = new Account({
      email,
      password,
      token: new mongoose.Types.ObjectId(),
    }).save();
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
router.put(
  '/name',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    const { name } = req.body;
    const query = Account.updateOne(
      { _id: req.user._id },
      { $set: { name } },
    ).exec();
    query
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.status(400).json({ success: false });
        throw error;
      });
  },
);
router.put(
  '/size',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    const { start, now, goal } = req.body;
    const query = Account.updateOne(
      { _id: req.user._id },
      {
        $set: {
          'sizes.start': start,
          'sizes.now': now,
          'sizes.goal': goal,
        },
      },
    ).exec();
    query
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.status(400).json({ success: false });
        throw error;
      });
  },
);
router.put(
  '/routine',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    const { routines } = req.body;
    const query = Account.updateOne(
      { _id: req.user._id },
      {
        $set: {
          routines,
        },
      },
    ).exec();
    query
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.status(400).json({ success: false });
        throw error;
      });
  },
);
router.delete(
  '/',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    const query = Account.deleteOne({
      _id: req.user._id,
    }).exec();
    query
      .then(() => {
        res.json({
          success: true,
        });
      })
      .catch((error) => {
        res.status(400).json({ success: false });
        throw error;
      });
  },
);

export default router;
