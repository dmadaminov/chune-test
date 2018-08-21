const dotenv = require('dotenv');
dotenv.config();

console.log("Loading config.js", process.env.DB_PORT);

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": "chune_development",
    "host": "127.0.0.1",
    "port": process.env.DB_PORT,
    "dialect": "postgres",
    "logging": true,
  },
  "test": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": "chune_test",
    "host": "127.0.0.1",
    "port": process.env.DB_PORT,
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "DATABASE_URL"
  }
}
