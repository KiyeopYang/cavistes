import express from 'express';
import passport from 'passport';
import mongoose from 'mongoose';
import { Account } from '../models';
import { fromMongo } from '../lib/dbConnector';

const router = express.Router();

router.get(
  '/',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    if (!req.user) {
      res.clearCookie('account');
      return res.status(400).json({ message: '다시 로그인하십시요.' });
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
        res.status(400).json({ message: '이메일 정보가 없습니다.' });
      } else {
        const valid = await result.passwordIsValid(password);
        if (valid) {
          const account = result.toObject();
          delete account.password;
          res.json({
            token: account.token,
          });
        } else {
          res.status(400).json({ message: '패스워드가 맞지 않습니다.' });
        }
      }
    })
      .catch((error) => {
        res.status(400).json({ message: '오류가 있습니다.' });
        throw error;
      });
  },
);
router.post(
  '/',
  (req, res) => {
    const { body } = req;
    body.token = new mongoose.Types.ObjectId();
    const query = new Account(body).save();
    query
      .then(() => res.json({
        token: body.token,
        success: true,
      }))
      .catch((error) => {
        res.status(400).json({
          message: '중복된 계정이 있거나 에러가 있습니다.',
        });
        throw error;
      });
  },
);
router.put(
  '/',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    const { body, user } = req;
    Account.updateOne({
      token: user.token,
    }, {
      $set: body,
    }).exec()
      .then(() => res.json({
        success: true,
      }))
      .catch((error) => {
        res.status(400).json({
          message: '중복된 계정이 있거나 에러가 있습니다.',
        });
        throw error;
      });
  },
);
router.delete(
  '/',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    const { user } = req;
    Account.deleteOne({
      token: user.token,
    }).exec()
      .then(() => res.json({
        success: true,
      }))
      .catch((error) => {
        res.status(400).json({
          message: '중복된 계정이 있거나 에러가 있습니다.',
        });
        throw error;
      });
    },
);
router.get(
  '/list',
  (req, res) => {
    Account
      .find({})
      .select({ password: 0 })
      .lean()
      .exec()
      .then((accounts) => res.json({
        accounts: fromMongo(accounts),
      }))
      .catch((error) => {
        res.status(400).json({
          message: '에러가 있습니다.',
        });
        throw error;
      });
    },
);

export default router;
