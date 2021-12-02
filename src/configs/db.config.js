require('dotenv').config();

module.exports = {
  dialect: 'mysql',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  define: {
    timestamps: true,
    underscored: true,
  },
};