const { NotAuthorized, NotFound } = require("../exceptions/user-exceptions");
const Library = require("../models/library");
const bookService = require("../services/book-service");

async function getAllLibraries() {
  const listLibraries = await Library.findAll();
  return listLibraries;
}

async function getById(id) {
  const library = await Library.findByPk(id);

  if (library == null) {
    throw new NotFound("Libreria no encontrada");
  }

  return library;
}

async function createLibrary(name, location, phone) {
  const library = new Library();

  library.name = name;
  library.location = location;
  library.phone = phone;

  const libraryCreated = await library.save();
  return libraryCreated;
}

async function editLibrary(id, name, location, phone) {
  const library = await getById(id);

  if (name) {
    library.name = name;
  }

  if (location) {
    library.location = location;
  }

  if (phone) {
    library.phone = phone;
  }

  const libraryEdited = await library.save();
  return libraryEdited;
}

async function deleteLibrary(id) {
  const library = await getById(id);
  await library.destroy();
}

async function getAllLibrariesWithBooks() {
  try {
    const libraries = await getAllLibraries();

    for (const library of libraries) {
      const books = await bookService.getBooksByLibraryId(library.id);
      library.books = books;
    }
    return libraries;
  } catch (error) {
    throw new Error("Error al obtener las librerías y sus libros asociados");
  }
}

module.exports = {
  getAllLibrariesWithBooks,
  getAllLibraries,
  getById,
  createLibrary,
  editLibrary,
  deleteLibrary,
};
