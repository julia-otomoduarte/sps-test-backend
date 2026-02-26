const GetUserService = require("../services/GetUserService");

async function getUser(req, res) {
  try {
    const { id } = req.params;
    const result = await GetUserService.getUser(req.user, id);
    return res.status(200).json(result);
  } catch (error) {
    const status = error.message === "Você não tem permissão para acessar este usuário" ? 403 : 400;
    return res.status(status).json({ message: error.message });
  }
}

module.exports = { getUser };