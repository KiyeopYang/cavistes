import express from 'express';
import passport from 'passport';
import mongoose from 'mongoose';
import random from 'randomstring';
import bcrypt from 'bcrypt';
import { Account } from '../models';
import { fromMongo } from '../lib/dbConnector';
import sendEmail from '../lib/sendEmail';

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
    const query = new Account({
      ...body,
      level: body.type !== 'default' ? 3 : 1,
    }).save();
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
  '/:id',
  async (req, res) => {
    const { password, ...rest } = req.body;

    const set = rest;
    if (password && password.length >= 8 ) {
      set.password = await bcrypt.hash(password, 8);
    }
    Account.updateOne({
      _id: req.params.id,
    }, {
      $set: set,
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
  '/:id',
  (req, res) => {
    const { user } = req;
    Account.deleteOne({
      _id: req.params.id,
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
router.get(
  '/:id',
  (req, res) => {
    Account
      .findById(req.params.id)
      .select({ password: 0 })
      .lean()
      .exec()
      .then((account) => res.json({
        account: fromMongo(account),
      }))
      .catch((error) => {
        res.status(400).json({
          message: '에러가 있습니다.',
        });
        throw error;
      });
  },
);
router.post('/isPasswordCorrect', async (req, res) => {
  const { email, password } = req.body;
  Account.findOne({
    email,
  }).exec()
    .then(async (result) => {
    if (!result) {
      res.status(400).json({ message: '이메일 정보가 없습니다.' });
    } else {
      const valid = await result.passwordIsValid(password);
      if (valid) {
        res.json({ success: true });
      } else {
        res.status(400).json({ message: '패스워드가 맞지 않습니다.' });
      }
    }
  })
    .catch((error) => {
      res.status(400).json({ message: '오류가 있습니다.' });
      throw error;
    });
});
router.post('/passwordFind', async (req, res) => {
  const { email } = req.body;
  const ori = random.generate(8);
  const ran =  await bcrypt.hash(ori, 8);
  Account.findOne({ email })
    .exec()
    .then((account) => {
      if (!account) {
        res.status(500).json({
          message: '에러가 있습니다.',
        });
      } else {
        Account.updateOne({
          email,
        }, {
          $set: { password: ran },
        })
          .then(async () => {
            await sendEmail({
              to: email,
              title: '카비스트 임시 비밀번호입니다.',
              content: `임시 비밀번호 : ${ori}`,
            });
            res.json({
              success: true,
            });
          })
          .catch((error) => {
            res.status(400).json({
              message: '에러가 있습니다.',
            });
            throw error;
          });
      }
    })
});

export default router;
