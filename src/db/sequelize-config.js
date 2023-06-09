const { Sequelize } = require("sequelize");

const dbInstance = new Sequelize({
  host: "localhost",
  database: "xAcademySequelize",
  username: "root",
  password: "root",
  port: 3306,
  dialect: "mysql",
});

module.exports = { dbInstance };
