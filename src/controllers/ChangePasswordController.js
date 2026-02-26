const ChangePasswordService = require("../services/ChangePasswordService");

async function changePassword(req, res) {
  try {
    const { id } = req.params;
    await ChangePasswordService.changePassword(req.user, id, req.targetUser, req.body);
    return res.status(204).send();
  } catch (error) {
    const status = error.message.includes("permissão") ? 403 : 400;
    return res.status(status).json({ message: error.message });
  }
}

module.exports = { changePassword };
