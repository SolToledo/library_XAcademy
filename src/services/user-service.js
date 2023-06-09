const { NotAuthorized, NotFound } = require("../exceptions/user-exceptions");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

async function getAll() {
  const listUsers = await User.findAll();

  return listUsers;
}

async function getById(id) {
  const user = await User.findByPk(id);

  if (user == null) {
    throw new NotFound("Usuario no encontrado");
  }

  return user;
}

async function createUser(username, email, password) {
  const user = User.build();

  user.username = username;
  user.email = email;
  user.password = password;

  const userCreated = await user.save();
  return userCreated;
}

async function editUser(id, username, email) {
  const user = await getById(id);

  if (username) {
    user.username = username;
  }

  if (email) {
    user.email = email;
  }

  const userEdited = await user.save();

  return userEdited;
}

async function deleteUser(id) {
  const user = await getById(id);

  await user.destroy();
}

async function login(email, password) {
  const user = await User.findOne({
    where: {
      email: email,
      password: password,
    },
  });

  if (!user) {
    throw new NotAuthorized("Email y/o password incorrectos");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    "ClaveUltraSecreta"
  );

  return {
    accessToken: token,
  };
}

module.exports = { getAll, getById, createUser, editUser, deleteUser, login };
