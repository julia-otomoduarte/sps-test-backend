const DeleteUserService = require("../services/DeleteUserService");

async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    await DeleteUserService.deleteUser(req.user, id);
    return res.status(204).send();
  } catch (error) {
    const status = error.message === "Você não tem permissão para deletar este usuário" ? 403 : 400;
    return res.status(status).json({ message: error.message });
  }
}

module.exports = { deleteUser };