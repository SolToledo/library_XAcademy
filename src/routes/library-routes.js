//importar express
const express = require("express");

//importar controlodores
const libraryController = require("../controllers/library-controller");
const { getLibraryWithBooks } = require("../controllers/library-controller");

//importar middleware
const { isAuthenticated } = require("../middlewares/authentication");

//creo un objeto de la clase router que brinda express.
const router = express.Router();

//peticion para crear librerias. POST
router.post("/crear", isAuthenticated, libraryController.createLibrary);

//peticion para obtener todas las librerias.
router.get("/obtener-todos", libraryController.getAllLibraries);

//peticion para obtener librerias por su id
router.get("/obtener-por-id/:id", libraryController.getLibraryById);

//peticion para editar una libreria-PUT
router.put("/editar/:id", isAuthenticated, libraryController.editLibrary);

//peticion para eliminar una libreria-DELETE
router.delete(
  "/eliminar/:id",
  isAuthenticated,
  libraryController.deleteLibrary
);

// Obtener una librería con todos sus libros
router.get("/:libraryId", libraryController.getLibraryWithBooks);

//Exportar
module.exports = router;
