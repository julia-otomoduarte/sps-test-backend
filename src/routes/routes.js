const { Router } = require("express");
const AuthController = require("../controllers/AuthController");
const CreateUserController = require("../controllers/CreateUserController");
const verifyRepeatedUserEmailMiddleware = require("../middlewares/verifyRepeatedUserEmail");
const authMiddleware = require("../middlewares/authMiddleware");

const routes = Router();

routes.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

routes.post("/login", AuthController.login);

routes.post("/users", verifyRepeatedUserEmailMiddleware, CreateUserController.createUser);

module.exports = routes;
