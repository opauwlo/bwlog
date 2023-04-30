require('dotenv').config();

module.exports = {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: process.env.POSTGRES_SSL,
      rejectUnauthorized: false
    }
  },
  charset: 'utf8mb4',
  collate: 'utf8mb4_bin',
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  logging: false,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  define: {
    timestamps: true,
    underscored: true,
  },
};