import express from 'express';
import passport from 'passport';
import { Post } from '../models';

const router = express.Router();

router.get(
  '/',
  (req, res) => {
    const count = Post.count({
      community: 'freedom',
    }).exec();
    count
      .then((count) => {
        res.json({
          count,
        });
      })
      .catch((error) => {
        res.status(500).json({ message: 'ERROR' });
        throw error;
      });
  },
);
router.get(
  '/:community/:numOfPage/:page',
  (req, res) => {
    const { community, numOfPage, page } = req.params;
    const query = Post
      .find({ community })
      .limit(numOfPage)
      .skip(page * numOfPage)
      .sort({ date: -1 })
      .exec();
    query
      .then((posts) => {
        res.json({
          posts,
        });
      })
      .catch((error) => {
        res.status(500).json({ message: 'ERROR' });
        throw error;
      });
  },
);
router.get(
  '/:id',
  (req, res) => {
    const query = Post
      .findById(req.params.id)
      .populate('account.link')
      .exec();
    query
      .then((post) => {
        res.json(post);
      })
      .catch((error) => {
        res.status(500).json({ message: 'ERROR' });
        throw error;
      });
  },
);
router.post(
  '/post',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    const {
      community,
      title,
      text,
    } = req.body;
    const query = new Post({
      account: {
        name: req.user.name,
        link: req.user._id,
      },
      community,
      title,
      text,
    }).save();
    query
      .then(post => res.json({
        post,
      }))
      .catch((error) => {
        res.status(400).json({ success: false });
        throw error;
      });
  },
);
router.put(
  '/post',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    const { id, title, text } = req.body;
    const query = Post.updateOne(
      {
        _id: id,
        'account.link': req.user._id,
      },
      { $set: { title, text } },
    ).exec();
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
router.post(
  '/subpost',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    const { postId, text } = req.body;
    const query = Post.updateOne(
      { _id: postId },
      {
        $push: {
          subPosts: {
            account: {
              name: req.user.name,
              link: req.user._id,
            },
            text,
          },
        },
      },
    ).exec();
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
router.delete(
  '/post',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    const { id } = req.body;
    const query = Post.deleteOne({
      _id: id,
      'account.link': req.user._id,
    }).exec();
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
router.delete(
  '/subpost',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    const { postId, subPostId } = req.body;
    const query = Post.updateOne(
      { _id: postId },
      {
        $pull: {
          subPosts: {
            _id: subPostId,
            'account.link': req.user._id,
          },
        },
      },
    ).exec();
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

export default router;
