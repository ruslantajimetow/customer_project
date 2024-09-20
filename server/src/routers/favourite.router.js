const router = require('express').Router();

const { Housing, Favourite } = require('../../db/models');

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const favourites = await Favourite.findAll({
      where: { userId: id },
      include: { model: Housing },
    });
    const data = favourites.map((item) => item.get({ plain: true }));
    res.json(data);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.post('/', async (req, res) => {
  const { userId, housingId } = req.body;
  try {
    const existingItem = await Favourite.findOne({
      where: { userId, housingId },
    });
    if (!existingItem) {
      await Favourite.create({
        userId,
        housingId,
      });
      res.status(201).json({ message: 'Объявление добавлено' });
    } else {
      res.status(401).json({ message: 'Вы уже добавили это объявление' });
      console.log('Already exists');
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletingItem = await Favourite.findOne({ where: { id } });
    if (deletingItem) {
      await deletingItem.destroy();
      res.status(201).json(deletingItem);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

module.exports = router;
