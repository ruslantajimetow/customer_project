const router = require('express').Router();
const authRouter = require('./auth.router');
const tokenRouter = require('./token.router');
const userRouter = require('./user.router');
const housingRouter = require('./housing.router');
const categoryRouter = require('./category.router');

router.use('/auth', authRouter);
router.use('/token', tokenRouter);
router.use('/users', userRouter);
router.use('/housings', housingRouter);
router.use('/categories', categoryRouter);

module.exports = router;
