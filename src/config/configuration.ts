const PORT = 3000;
const HOST = 'localhost';
const MONGO_URI = 'mongodb://localhost:27017/helpdesk';
const BCRYPT_SALT = 10;
const HD_PUBLIC_TOKEN = 'HELPDESK-PUBLIC-TOKEN';
const JWT_ACCESS_SECRET = 'HELPDESK-JWT-ACCESS-SECRET';
const JWT_ACCESS_EXPIRES_IN = '15m';
const JWT_REFRESH_SECRET = 'HELPDESK-JWT-REFRESH-SECRET';
const JWT_REFRESH_EXPIRES_IN = '7d';

const FTP_HOST = 'localhost';
const FTP_PORT = 21;
const FTP_USER = 'support';
const FTP_PASSWORD = 'support';
const FTP_SECURE = false;

export default () => ({
  host: process.env.HOST || HOST,
  port: parseInt(process.env.PORT, 10) || PORT,
  mongoURI: process.env.MONGO_URI || MONGO_URI,
  bcryptSalt: parseInt(process.env.BCRYPT_SALT, 10) || BCRYPT_SALT,
  HDPublicToken: process.env.HD_PUBLIC_TOKEN || HD_PUBLIC_TOKEN,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || JWT_ACCESS_SECRET,
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || JWT_ACCESS_EXPIRES_IN,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || JWT_REFRESH_SECRET,
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || JWT_REFRESH_EXPIRES_IN,

  ftpHost: process.env.FTP_HOST || FTP_HOST,
  ftpPort: parseInt(process.env.FTP_PORT) || FTP_PORT,
  ftpUser: process.env.FTP_USER || FTP_USER,
  ftpPassword: process.env.FTP_PASSWORD || FTP_PASSWORD,
  ftpSecure: process.env.FTP_SECURE === 'true' ? true : FTP_SECURE
});
