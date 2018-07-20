import express from 'express';
import passport from 'passport';
import mongoose from 'mongoose';
import { Event, Account, Attendance, Payment } from '../models';
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
      name,
      nameForPayment,
      phone,
    } = req.body;
    new Attendance({
      accountId,
      eventId,
      price,
      status: status || '입금대기',
      orderMethod,
      datetime: new Date(),
      name,
      nameForPayment,
      phone,
    })
      .save()
      .then((result) => {
        return Event.updateOne({
          _id: eventId,
        }, {
          $push: { attendees: result._id },
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
  '/eventId/:id',
  (req, res) => {
    const { id } = req.params;
    Attendance.find({
      eventId: mongoose.Types.ObjectId(id),
    })
      .populate('eventId')
      .populate('accountId')
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
router.put(
  '/eventId/:id',
  (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    Attendance.updateOne({
      _id: id,
    }, {
      $set: { status },
    }).exec()
      .then((result) => {
        console.log(result);
        console.log(id, status);
        return Event.updateOne({
          _id: result.eventId,
        }, status === '취소' ? {
          $pull: { attendees: mongoose.Types.ObjectId(id) },
        }:{
          $push: { attendees: mongoose.Types.ObjectId(id) },
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
    // Attendance.find({
    //   eventId: mongoose.Types.ObjectId(id),
    // })
    //   .populate('eventId')
    //   .populate('accountId')
    //   .exec()
    //   .then((result) => {
    //     return res.json({
    //       data: result.map(o => fromMongo(o.toObject())),
    //     });
    //   })
    //   .catch((error) => {
    //     res.status(400).json({ success: false });
    //     throw error;
    //   });
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
router.delete(
  '/:id',
  (req, res) => {
    const { id } = req.params;
    Attendance.findOneAndUpdate({
      _id: id,
    }, {
      $set: { status: '취소' },
    }).exec()
      .then((result) => {
        return Event.updateOne({
          _id: result.eventId,
        }, {
          $pull: { attendees: mongoose.Types.ObjectId(id) },
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
// router.post(
//   '/attend',
//   (req, res) => {
//     // const {
//     //   accountId,
//     //   eventId,
//     //   email,
//     //   phone,
//     //   name,
//     //   status,
//     // } = req.body;
//     // Event.updateOne({
//     //   _id: eventId,
//     // }, {
//     //   $push: {
//     //     attendees: {
//     //       id: mongoose.Types.ObjectId(),
//     //       status: status || '신청완료',
//     //       accountId,
//     //       email,
//     //       phone,
//     //       name,
//     //       datetime: new Date(),
//     //     },
//     //   },
//     // }).exec()
//     const {
//       eventId,
//       ...rest,
//     } = req.body;
//     Event.updateOne({
//       _id: eventId,
//     }, {
//       $push: {
//         attendees: {
//           id: mongoose.Types.ObjectId(),
//           status: rest.status || '입금대기',
//           ...rest,
//           datetime: new Date(),
//         },
//       },
//     }).exec()
//       .then(() => res.json({
//         success: true,
//       }))
//       .catch((error) => {
//         res.status(400).json({ success: false });
//         throw error;
//       });
//   },
// );
// router.delete(
//   '/attend',
//   (req, res) => {
//     const {
//       eventId,
//       attendId,
//     } = req.body;
//     Event.updateOne({
//       _id: eventId,
//     }, {
//       $pull: {
//         attendees: {
//           id: mongoose.Types.ObjectId(attendId),
//         },
//       },
//     }).exec()
//       .then(() => res.json({
//         success: true,
//       }))
//       .catch((error) => {
//         res.status(400).json({ success: false });
//         throw error;
//       });
//   },
// );
const BANKS = [
  { name: '국민은행', code: 4 },
  { name: '신한은행', code: 88 },
  { name: '기업은행', code: 3 },
  { name: '우리은행', code: 20 },
  { name: '농협', code: 11 },
  { name: 'SC제일', code: 23 },
  { name: '하나은행', code: 81 },
];
router.get(
  '/payment/bank',
  (req, res) => {
    const { query } = req;
    const { bankcode, account, price, name, paydt } = query;
    const datetime = new Date(paydt);
    Payment.findOne({
      bankAccount: account,
      price,
      nameForPayment: name,
      datetime,
    })
      .then((result) => {
        if (!result) {
          new Payment({
            bankCode: bankcode,
            bankName: BANKS.find(o => parseInt(bankcode) === o.code).name,
            bankAccount: account,
            price,
            nameForPayment: name,
            datetime: new Date(paydt),
          })
            .save()
            .then((result) => {
              return Attendance.updateOne({
                nameForPayment: name,
                price,
                status: '입금대기',
              }, {
                $set: {
                  status: '입금완료',
                  paymentId: result._id,
                },
              })
                .exec()
                .then(() => {
                  res.send('OK').end();
                });
            })
            .catch((error) => {
              console.error(error);
              res.send('OK').end();
            });
        } else {
          res.send('OK').end();
        }
      })
      .catch((error) => {
        console.error(error);
        res.send('OK').end();
      });
  },
);
export default router;
