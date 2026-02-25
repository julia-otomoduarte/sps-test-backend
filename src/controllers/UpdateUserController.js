const UpdateUserService = require("../services/UpdateUserService");

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const result = await UpdateUserService.updateUser(req.user, id, req.targetUser, req.body);
    return res.status(200).json(result);
  } catch (error) {
    const status = error.message === "Você não tem permissão para atualizar este usuário" ? 403 : 400;
    return res.status(status).json({ message: error.message });
  }
}

module.exports = { updateUser };
