const express = require("express");
const userController = require("../controllers/user-controller");
const { isAuthenticated } = require("../middlewares/authentication");

const router = express.Router();

router.post("/crear", userController.createUser);
router.post("/login", userController.login);
router.get("/obtener-todos", isAuthenticated, userController.getAllUsers);
router.get("/obtener-por-id/:id", isAuthenticated, userController.getUserById);
router.put("/editar/:id", isAuthenticated, userController.editUser);
router.delete("/eliminar/:id", isAuthenticated, userController.deleteUser);

module.exports = router;
