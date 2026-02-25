const bcrypt = require("bcryptjs");
const UserRepository = require("../repositories/UserRepository");

async function updateUser(requestingUser, id, existingUser, data) {
  if (requestingUser.type !== "admin" && requestingUser.id !== id) {
    throw new Error("Sem permissão");
  }

  const updatedUser = {
    ...existingUser,
    name: data.name ?? existingUser.name,
    email: data.email ?? existingUser.email,
    password: data.password
      ? await bcrypt.hash(data.password, 10)
      : existingUser.password,
  };

  UserRepository.updateUser(updatedUser);

  const { password, ...userWithoutPassword } = updatedUser;
  return userWithoutPassword;
}

module.exports = { updateUser };
