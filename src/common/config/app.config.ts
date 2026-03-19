const PORT = 3000;
const HOST = '127.0.0.1';
const BCRYPT_SALT = 10;
const JWT_ACCESS_EXPIRES_IN = '15m';
const JWT_REFRESH_EXPIRES_IN = '7d';

export default () => {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error('Змінна середовища JWT_ACCESS_SECRET не встановлена');
  }

  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error('Змінна середовища JWT_REFRESH_SECRET не встановлена');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('Змінна середовища MONGO_URI не встановлена');
  }

  if (!process.env.CORS_ORIGIN) {
    throw new Error('Змінна середовища CORS_ORIGIN не встановлена');
  }

  return {
    HOST: process.env.HOST || HOST,
    PORT: parseInt(process.env.PORT || '', 10) || PORT,
    MONGO_URI: process.env.MONGO_URI,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    BCRYPT_SALT: parseInt(process.env.BCRYPT_SALT || '', 10) || BCRYPT_SALT,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN ?? JWT_ACCESS_EXPIRES_IN,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN ?? JWT_REFRESH_EXPIRES_IN
  };
};
