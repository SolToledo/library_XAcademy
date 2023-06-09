const libraryService = require("../services/library-service");
const bookService = require("../services/book-service");
const Library = require("../models/library");
const Book = require("../models/book");

//funcion para obtener todas las librerias
async function getAllLibraries(req, res) {
  const libraries = await libraryService.getAllLibraries();
  res.status(200).send(libraries);
}

//funcion para obtener librerias por id con middleware y manejo de errores cuando no encuentra la libreria por su id
async function getLibraryById(req, res, next) {
  const { id } = req.params;

  try {
    const libraries = await libraryService.getById(id);
    res.status(200).send(libraries);
  } catch (error) {
    next(error);
  }
}

//funcion para crear una libreria- POST
async function createLibrary(req, res) {
  const { name, location, phone } = req.body;

  const libraries = await libraryService.createLibrary(name, location, phone);

  res.status(201).send(libraries);
}

//funcion para editar una libreria
async function editLibrary(req, res) {
  const { id } = req.params;
  const { name, location, phone } = req.body;

  const libraries = await libraryService.editLibrary(id, name, location, phone);

  res.status(201).send(libraries);
}

//funcion para eliminar una libreria
async function deleteLibrary(req, res) {
  const { id } = req.params;

  await libraryService.deleteLibrary(id);

  res
    .status(201)
    .send(`La Librería con el id ${id} fue eliminada correctamente`);
}
// Obtener una librería con todos sus libros
const getLibraryWithBooks = async (req, res) => {
  try {
    const libraryId = parseInt(req.params.libraryId);
    console.log("Library ID:", libraryId);

    const library = await Library.findByPk(libraryId, {
      include: { model: Book },
    });
    console.log("Library:", library);

    if (!library) {
      return res.status(404).json({ message: "Librería no encontrada" });
    }

    return res.json({ library });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener la librería" });
  }
};

//Exportar
module.exports = {
  getLibraryWithBooks,
  getAllLibraries,
  getLibraryById,
  createLibrary,
  editLibrary,
  deleteLibrary,
};
