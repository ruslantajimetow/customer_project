const router = require('express').Router();
const authRouter = require('./auth.router');
const tokenRouter = require('./token.router');
const userRouter = require('./user.router');
const housingRouter = require('./housing.router');

router.use('/auth', authRouter);
router.use('/token', tokenRouter);
router.use('/users', userRouter);
router.use('/housings', housingRouter);

module.exports = router;
