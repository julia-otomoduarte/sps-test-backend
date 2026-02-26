const bcrypt = require("bcryptjs");
const UserRepository = require("../repositories/UserRepository");

async function changePassword(requestingUser, id, existingUser, data) {
  if (requestingUser.type !== "admin" && String(requestingUser.id) !== String(id)) {
    throw new Error("Você não tem permissão para alterar a senha deste usuário");
  }

  if (!data.oldPassword || !data.newPassword) {
    throw new Error("Senha antiga e nova senha são obrigatórias");
  }

  const passwordMatch = await bcrypt.compare(data.oldPassword, existingUser.password);

  if (!passwordMatch) {
    throw new Error("Senha antiga incorreta");
  }

  const updatedUser = {
    ...existingUser,
    password: await bcrypt.hash(data.newPassword, 10),
  };

  UserRepository.updateUser(updatedUser);
}

module.exports = { changePassword };
