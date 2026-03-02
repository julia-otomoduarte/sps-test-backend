const CreateUserService = require("../services/CreateUserService");

async function createUser(req, res) {
  try {
    const { name, email, password, type } = req.body;

    if (!name || !email || !password ) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    const result = await CreateUserService.createUser(name, email, password, type);

    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

module.exports = { createUser };