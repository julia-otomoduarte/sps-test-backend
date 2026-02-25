const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/UserRepository");

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h";

async function login(email, password) {
  const user = UserRepository.findByEmail(email);

  if (!user) {
    throw new Error("Credenciais inválidas");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Credenciais inválidas");
  }

  const token = jwt.sign(
    { email: user.email, type: user.type },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type,
    },
  };
}

module.exports = { login };
