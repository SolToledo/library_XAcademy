//importar de la libreria de sequelize algunas clases.
const { Model, DataTypes } = require("sequelize");

//importar instancia de base de datos.(que ya lo tenía hecho)
const { dbInstance } = require("../db/sequelize-config");
const { Book } = require("../models/book");

//crear una clase Library y se extiende de la clase Model
class Library extends Model {
  static async findByPk(id) {
    return this.findOne({ where: { id } });
  }
}

//se inicializa el metodo .init y se definen los atributos que corresponden al mapeo.
Library.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: dbInstance,
    modelName: "Library",
    createdAt: false,
    updatedAt: false,
  }
);
Library.hasMany(Book, { foreignKey: "libraryId" });
Book.belongsTo(Library, { foreignKey: "libraryId" });

module.exports = Library;
