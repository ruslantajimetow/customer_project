const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { verifyAccessToken } = require('../../middlewares/verifyToken');
const { Housing, Category } = require('../../db/models');

const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
  try {
    const housings = await Housing.findAll({
      include: Category,
    });
    const data = housings.map((item) => item.get({ plain: true }));
    res.json(data);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.post(
  '/',
  verifyAccessToken,
  upload.single('image'),
  async (req, res) => {
    const { title, desc, address, price, categoryId } = req.body;
    let image = null;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }
    try {
      const newHousing = await Housing.create({
        title,
        desc,
        address,
        price,
        categoryId,
        image,
      });
      res.json(newHousing);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  }
);

router.put(
  '/:id',
  verifyAccessToken,
  upload.single('image'),
  async (req, res) => {
    const { title, desc, address, price, categoryId } = req.body;
    const { id } = req.params;
    let image = null;

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    try {
      const editItem = await Housing.findOne({ where: { id } });

      if (editItem) {
        await editItem.update({
          title: title || editItem.title,
          desc: desc || editItem.desc,
          address: address || editItem.address,
          price: price || editItem.price,
          categoryId: categoryId || categoryId.title,
          image: image || editItem.image,
        });
        res.json(editItem);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  }
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletingItem = await Housing.findOne({ where: { id } });
    if (deletingItem) {
      await deletingItem.destroy();
      res.json(deletingItem);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

module.exports = router;
