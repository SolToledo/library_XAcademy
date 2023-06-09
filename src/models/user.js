const { Model, DataTypes } = require("sequelize");
const { dbInstance } = require("../db/sequelize-config");
const bcrypt = require("bcrypt");

class User extends Model {
  static async hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  static async createWithHashedPassword(username, password, email) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.create({ username, password: hashedPassword, email });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize: dbInstance,
    modelName: "User",
  }
);

module.exports = User;
