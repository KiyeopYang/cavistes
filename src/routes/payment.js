import express from 'express';
import passport from 'passport';
import mongoose from 'mongoose';
import { Payment } from '../models';
import { fromMongo } from '../lib/dbConnector';

const router = express.Router();

router.get(
  '/',
  (req, res) => {
    Payment.find({})
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
export default router;
