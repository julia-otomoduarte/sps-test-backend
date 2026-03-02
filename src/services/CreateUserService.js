async function createUser(name, email, password, type) {
  const bcrypt = require("bcryptjs");
  const UserRepository = require("../repositories/UserRepository");
  const { generateId } = require("../utils");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: generateId(),
    name,
    email,
    password: hashedPassword,
    type: type || "user",
  };

  UserRepository.createUser(newUser);
}

module.exports = { createUser };