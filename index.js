const express = require("express");
const userRoutes = require("./src/routes/user-routes");
const libraryRoutes = require("./src/routes/library-routes");
const bookRoutes = require("./src/routes/book-routes");
const User = require("./src/models/user");
const { errorHandlerMiddleware } = require("./src/middlewares/error-handler");
const { initializeAuthentication } = require("./src/auth/auth");

const app = express();
const port = 5000;
async function createInitialUsers() {
  try {
    // Crear usuarios de ejemplo
    await User.createWithHashedPassword("admin", "admin", "admin@example.com");
    console.log("Usuarios creados exitosamente");
  } catch (error) {
    console.error("Error al crear usuarios", error);
  }
}

// Llamar a la función para crear usuarios al iniciar la aplicación
// createInitialUsers();
initializeAuthentication();

app.use(express.json());
app.use("/users", userRoutes);
app.use("/library", libraryRoutes);
app.use("/book", bookRoutes);
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log("API con express corriendo en el puerto " + port);
});
