const UserRepository = require("../repositories/UserRepository");

async function deleteUser(requestingUser, id) {
  if (requestingUser.type !== "admin" && String(requestingUser.id) !== String(id)) {
    throw new Error("Você não tem permissão para deletar este usuário");
  }
  
    UserRepository.deleteUser(id);
}

module.exports = { deleteUser };