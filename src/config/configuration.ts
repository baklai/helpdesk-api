const PORT = 3000;
const HOST = 'localhost';
const MONGO_URI = 'mongodb://localhost:27017/helpdesk';
const BCRYPT_SALT = 10;
const HD_PUBLIC_TOKEN = 'HELPDESK-PUBLIC-TOKEN';
const JWT_ACCESS_SECRET = 'HELPDESK-JWT-ACCESS-SECRET';
const JWT_ACCESS_EXPIRES_IN = '15m';
const JWT_REFRESH_SECRET = 'HELPDESK-JWT-REFRESH-SECRET';
const JWT_REFRESH_EXPIRES_IN = '7d';

export default () => ({
  host: process.env.HOST || HOST,
  port: parseInt(process.env.PORT, 10) || PORT,
  mongoURI: process.env.MONGO_URI || MONGO_URI,
  bcryptSalt: parseInt(process.env.BCRYPT_SALT, 10) || BCRYPT_SALT,
  HDPublicToken: process.env.HD_PUBLIC_TOKEN || HD_PUBLIC_TOKEN,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || JWT_ACCESS_SECRET,
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || JWT_ACCESS_EXPIRES_IN,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || JWT_REFRESH_SECRET,
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || JWT_REFRESH_EXPIRES_IN
});
