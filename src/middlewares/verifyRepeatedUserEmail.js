const verifyRepeatedUserEmailMiddleware = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email é obrigatório" });
  }

  const UserRepository = require("../repositories/UserRepository");
  const user = UserRepository.findByEmail(email);

  if (user) {
    return res.status(409).json({ message: "Email já cadastrado" });
  }

  next();
};

module.exports = verifyRepeatedUserEmailMiddleware;