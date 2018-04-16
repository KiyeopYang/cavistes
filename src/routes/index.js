import express from 'express';
import account from './account';
import post from './post';

const router = express.Router();
router.use('/account', account);
router.use('/post', post);

export default router;
