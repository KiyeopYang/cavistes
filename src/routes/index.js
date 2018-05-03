import express from 'express';
import account from './account';
import post from './post';
import uploads from './uploads';
import service from './service';
import event from './event';
import payment from './payment';
import attendance from './attendance';
import notice from './notice';
import location from './location';
import sponsor from './sponsor';

const router = express.Router();

router.use('/account', account);
router.use('/post', post);
router.use('/uploads', uploads);
router.use('/service', service);
router.use('/event', event);
router.use('/payment', payment);
router.use('/attendance', attendance);
router.use('/location', location);
router.use('/notice', notice);
router.use('/sponsor', sponsor);

export default router;
