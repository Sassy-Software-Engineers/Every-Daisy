const Sequelize = require('sequelize');
const pkg = require('../../package.json');

const databaseName =
  pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '');

const config = {
  logging: false,
};

if (process.env.LOGGING === 'true') {
  delete config.logging;
}

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
if (process.env.DATABASE_URL) {
  config.database = process.env.POSTGRES_DB,
    config.username = process.env.POSTGRES_USER,
    config.password = process.env.POSTGRES_PASSWORD,
    config.host = process.env.POSTGRES_HOST,
    config.port = process.env.POSTGRES_PORT,
    config.dialect = "postgres",
    config.dialectOptions = {
      ssl: {
        require: true,
        rejectUnauthorized: false
      },
    };
}

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  config
);
module.exports = db;
