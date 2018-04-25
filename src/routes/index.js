import express from 'express';
import account from './account';
import post from './post';
import uploads from './uploads';
import service from './service';
import event from './event';

const router = express.Router();

router.use('/account', account);
router.use('/post', post);
router.use('/uploads', uploads);
router.use('/service', service);
router.use('/event', event);

export default router;
