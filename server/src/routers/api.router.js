const router = require('express').Router();
const authRouter = require('./auth.router');
const tokenRouter = require('./token.router');
const channelRouter = require('./channel.router');
const userChannelRouter = require('./userChannel.router');

router.use('/auth', authRouter);
router.use('/token', tokenRouter);
router.use('/channels', channelRouter);
router.use('/profile', userChannelRouter);

module.exports = router;
