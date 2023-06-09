const userService = require("../services/user-service");

async function getAllUsers(req, res) {
  const users = await userService.getAll();
  res.status(200).send(users);
}

async function getUserById(req, res, next) {
  const { id } = req.params;

  try {
    const user = await userService.getById(id);
    user.password = atob(user.password);
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
}

async function createUser(req, res) {
  const { username, email, password } = req.body;
  // Codificar la contraseña en Base64
  const encodedPassword = btoa(password);
  const user = await userService.createUser(username, email, encodedPassword);
  const decodedPassword = atob(encodedPassword);
  user.password = decodedPassword;
  res.status(201).send(user);
}

async function editUser(req, res) {
  const { id } = req.params;
  const { username, email } = req.body;

  const user = await userService.editUser(id, username, email);
  user.password = atob(user.password);
  res.status(201).send(user);
}

async function deleteUser(req, res) {
  const { id } = req.params;

  await userService.deleteUser(id);

  res
    .status(200)
    .send(`Usuario con el id ${id} ha sido eliminado exitosamente!`);
}

async function login(req, res, next) {
  const { email, password } = req.body;
  const encodedPassword = btoa(password);
  try {
    const result = await userService.login(email, encodedPassword);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser,
  login,
};
