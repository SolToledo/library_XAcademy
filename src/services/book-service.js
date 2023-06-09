//importo el modelo con el que quiero interactuar.
const { Book } = require("../models/book");

async function getAllBooks() {
  const listBooks = await Book.findAll();

  return listBooks;
}

//funcion que busca las librerias por su id
async function getById(id) {
  const book = await Book.findByPk(id);

  if (book == null) {
    throw new Error("libro no encontrado");
  }

  return book;
}

//funcion para crear libro
async function createBook(isbn, titulo, autor, year, library) {
  const book = new Book();

  book.isbn = isbn;
  book.titulo = titulo;
  book.autor = autor;
  book.year = year;
  book.libraryId = parseInt(library);

  const bookCreated = await book.save();
  return bookCreated;
}

//funcion para editar un libro
async function editBook(id, isbn, titulo, autor, year, library) {
  const book = await getById(id);

  if (isbn) {
    book.isbn = isbn;
  }

  if (titulo) {
    book.titulo = titulo;
  }

  if (autor) {
    book.autor = autor;
  }

  if (library) {
    book.libraryId = parseInt(library);
  }

  const bookEdited = await book.save();
  return bookEdited;
}

async function deleteBook(id) {
  const book = await getById(id);

  await book.destroy();
}

function getBooksByLibraryId(id) {
  return Book.findAll({
    where: {
      libraryId: id,
    },
  });
}
module.exports = {
  getBooksByLibraryId,
  getAllBooks,
  getById,
  createBook,
  editBook,
  deleteBook,
};
