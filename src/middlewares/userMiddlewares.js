const UserRepository = require("../repositories/UserRepository");

const verifyRepeatedUserEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email é obrigatório" });
  }

  const user = UserRepository.findByEmail(email);

  if (user) {
    return res.status(409).json({ message: "Email já cadastrado" });
  }

  next();
};

const verifyUserExists = (req, res, next) => {
  const { id } = req.params;

  const user = UserRepository.findById(id);

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  req.targetUser = user;
  next();
};

const verifyEmailAvailable = (req, res, next) => {
  const { email } = req.body;

  if (!email) return next();

  const existing = UserRepository.findByEmail(email);

  if (existing && existing.id !== req.user?.id) {
    return res.status(409).json({ message: "Email já cadastrado" });
  }

  next();
};

module.exports = { verifyRepeatedUserEmail, verifyUserExists, verifyEmailAvailable };
