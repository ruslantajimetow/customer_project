const router = require('express').Router();
const { User } = require('../../db/models');
const bcrypt = require('bcrypt');
const generateToken = require('../../utils/generateToken');
const cookieConfig = require('../../configs/cookieConfig');

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);
  try {
    const [user, isCreated] = await User.findOrCreate({
      where: {
        email,
      },
      defaults: {
        username,
        email,
        password: await bcrypt.hash(password, 10),
      },
    });

    if (!isCreated) {
      res.status(400).json({ message: 'User already exist' });
    } else {
      const plainUser = user.get();
      delete plainUser.password;

      const { accessToken, refreshToken } = generateToken({ user: plainUser });

      res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json({ user: plainUser, accessToken });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    res.status(400).json({ message: 'All fields are required' });
  }

  const user = await User.findOne({ where: { email } });

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (!isCorrectPassword) {
    res.status(401).json({ message: 'Incorrect email or password' });
  } else {
    const plainUser = user.get();
    delete plainUser.password;

    const { accessToken, refreshToken } = generateToken({ user: plainUser });

    res
      .cookie('refreshToken', refreshToken, cookieConfig.refresh)
      .json({ user: plainUser, accessToken });
  }

  try {
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.get('/logout', (req, res) => {
  try {
    res.clearCookie('refreshToken').sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

module.exports = router;
