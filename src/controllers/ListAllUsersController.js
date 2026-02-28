const ListAllUsersService = require("../services/ListAllUsersService");

async function listAllUsers(req, res) {
  try {
    const result = await ListAllUsersService.listAllUsers(req.user);
    return res.status(200).json(result);
  } catch (error) {
    const status = error.message === "Usuário não autenticado" ? 401 : 400;
    return res.status(status).json({ message: error.message });
  }
}

module.exports = { listAllUsers };