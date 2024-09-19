const router = require('express').Router();
const { User } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    const data = users.map((user) => user.get());
    res.json(data);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

module.exports = router;
