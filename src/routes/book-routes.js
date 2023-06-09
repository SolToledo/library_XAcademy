//importar express
const express = require("express");

//importar controlodores
const bookController = require("../controllers/book-controller");

//importar middleware
const { isAuthenticated } = require("../middlewares/authentication");

//creo un objeto de la clase router que brinda express.
const router = express.Router();

//peticion para crear libro. POST
router.post("/crear", isAuthenticated, bookController.createBook);

//peticion para obtener todos los libros
router.get("/obtener-todos", bookController.getAllBooks);

//peticion para obtener libros por su id
router.get("/obtener-por-id/:id", bookController.getBookById);

//peticion para editar un libro-PUT
router.put("/editar/:id", isAuthenticated, bookController.editBook);

//peticion para eliminar un libro-DELETE
router.delete("/eliminar/:id", isAuthenticated, bookController.deleteBook);

//Exportar
module.exports = router;
