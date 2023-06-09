//importar de la libreria de sequelize algunas clases.
const { Model, DataTypes } = require("sequelize");

//importar instancia de base de datos.(que ya lo tenía hecho)
const { dbInstance } = require("../db/sequelize-config");
const Libreria = require("./library");

//crear una clase Book y se extiende de la clase Model
class Book extends Model {}

//se inicializa el metodo .init y se definen los atributos que corresponden al mapeo.
Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    isbn: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    autor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    libraryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: dbInstance,
    modelName: "Book",
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = { Book };
