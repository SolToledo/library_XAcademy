const bookService = require("../services/book-service");

//funcion para obtener  todos los libros
async function getAllBooks(req, res) {
  const books = await bookService.getAllBooks();

  res.status(200).send(books);
}

//funcion para obtener libros por id- con middleware y manejo de errores
async function getBookById(req, res, next) {
  const { id } = req.params;

  try {
    const books = await bookService.getById(id);
    res.status(200).send(books);
  } catch (error) {
    next(error);
  }
}

//funcion para crear un Libro- POST
async function createBook(req, res) {
  const { isbn, titulo, autor, year, libraryId } = req.body;

  const books = await bookService.createBook(
    isbn,
    titulo,
    autor,
    year,
    libraryId
  );

  res.status(201).send(books);
}

//funcion para editar un libro-PUT
async function editBook(req, res) {
  const { id } = req.params;
  const { isbn, titulo, autor, year, libraryId } = req.body;

  const books = await bookService.editBook(
    id,
    isbn,
    titulo,
    autor,
    year,
    libraryId
  );

  res.status(201).send(books);
}

//funcion para eliminar un libro-DELETE
async function deleteBook(req, res) {
  const { id } = req.params;

  await bookService.deleteBook(id);

  res.status(201).send(`El libro con el id ${id} fue eliminado correctamente`);
}

//Exportar
module.exports = { getAllBooks, getBookById, createBook, editBook, deleteBook };
