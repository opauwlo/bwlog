require('dotenv').config();

module.exports = {
  dialect: 'mysql',
  charset: 'utf8mb4',
  collate: 'utf8mb4_bin',
  username: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  logging: false,
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  define: {
    timestamps: true,
    underscored: true,
  },
};