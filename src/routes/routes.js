const { Router } = require("express");
const AuthController = require("../controllers/AuthController");
const CreateUserController = require("../controllers/CreateUserController");
const UpdateUserController = require("../controllers/UpdateUserController");
const { verifyRepeatedUserEmail, verifyUserExists, verifyEmailAvailable } = require("../middlewares/userMiddlewares");
const authMiddleware = require("../middlewares/authMiddleware");

const routes = Router();

routes.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

routes.post("/login", AuthController.login);

routes.post("/users", verifyRepeatedUserEmail, CreateUserController.createUser);

routes.patch("/users/:id", authMiddleware, verifyUserExists, verifyEmailAvailable, UpdateUserController.updateUser);

module.exports = routes;
