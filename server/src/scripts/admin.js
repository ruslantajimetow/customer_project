const { User } = require('../../db/models');
const generateToken = require('../../utils/generateToken');
const cookieConfig = require('../../configs/cookieConfig');
const bcrypt = require('bcrypt');

const createAdmin = async () => {
  try {
    const admin = await User.findOne({ where: { email: 'admin@admin.com' } });
    if (!admin) {
      const createdAdmin = await User.create({
        username: 'admin',
        email: 'admin@admin.com',
        password: await bcrypt.hash('admin123', 10),
        role: 'admin',
      });
      const plainUser = createdAdmin.get();
      delete plainUser.password;

      const { accessToken, refreshToken } = generateToken({ user: plainUser });

      // res
      //   .cookie('refreshToken', refreshToken, cookieConfig.refresh)
      //   .json({ user: plainUser, accessToken });
    } else {
      console.log('Admin already exists!');
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = createAdmin;
