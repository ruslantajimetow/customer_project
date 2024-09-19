const router = require('express').Router();
const { Category } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    const data = categories.map((item) => item.get());
    res.json(data);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

module.exports = router;
