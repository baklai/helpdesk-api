const PORT = 3000;
const HOST = 'localhost';
const MONGO_URI = 'mongodb://localhost:27017/helpdesk';
const BCRYPT_SALT = 10;
const HD_PUBLIC_TOKEN = 'HELPDESK-PUBLIC-TOKEN';
const JWT_ACCESS_SECRET = 'HELPDESK-JWT-ACCESS-SECRET';
const JWT_ACCESS_EXPIRES_IN = '15m';
const JWT_REFRESH_SECRET = 'HELPDESK-JWT-REFRESH-SECRET';
const JWT_REFRESH_EXPIRES_IN = '7d';

const SMTP_HOST = null;
const SMTP_PORT = 587;
const SMTP_USERNAME = null;
const SMTP_PASSWORD = null;
const SMTP_SENDER = null;

const FTP_HOST = 'localhost';
const FTP_PORT = 21;
const FTP_USER = '';
const FTP_PASSWORD = '';
const FTP_SECURE = false;

export default () => ({
  HOST: process.env.HOST || HOST,
  PORT: parseInt(process.env.PORT, 10) || PORT,
  MONGO_URI: process.env.MONGO_URI || MONGO_URI,
  BCRYPT_SALT: parseInt(process.env.BCRYPT_SALT, 10) || BCRYPT_SALT,
  HD_PUBLIC_TOKEN: process.env.HD_PUBLIC_TOKEN || HD_PUBLIC_TOKEN,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || JWT_REFRESH_EXPIRES_IN,

  FTP_HOST: process.env.FTP_HOST || FTP_HOST,
  FTP_PORT: parseInt(process.env.FTP_PORT, 10) || FTP_PORT,
  FTP_USER: process.env.FTP_USER || FTP_USER,
  FTP_PASSWORD: process.env.FTP_PASSWORD || FTP_PASSWORD,
  FTP_SECURE: process.env.FTP_SECURE === 'true' ? true : FTP_SECURE,

  SMTP_HOST: process.env.SMTP_HOST || SMTP_HOST,
  SMTP_PORT: parseInt(process.env.SMTP_PORT, 10) || SMTP_PORT,
  SMTP_USERNAME: process.env.SMTP_USERNAME || SMTP_USERNAME,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD || SMTP_PASSWORD,
  SMTP_SENDER: process.env.SMTP_SENDER || SMTP_SENDER
});
