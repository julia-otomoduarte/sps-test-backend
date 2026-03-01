const { Router } = require("express");
const AuthController = require("../controllers/AuthController");
const CreateUserController = require("../controllers/CreateUserController");
const UpdateUserController = require("../controllers/UpdateUserController");
const DeleteUserController = require("../controllers/DeleteUserController");
const GetUserController = require("../controllers/GetUserController");
const ChangePasswordController = require("../controllers/ChangePasswordController");
const ListAllUsersController = require("../controllers/ListAllUsersController");
const { verifyRepeatedUserEmail, verifyUserExists, verifyEmailAvailable, verifyIsAdmin } = require("../middlewares/userMiddlewares");
const authMiddleware = require("../middlewares/authMiddleware");

const routes = Router();

routes.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

routes.post("/login", AuthController.login);

routes.post("/users", authMiddleware, verifyIsAdmin, verifyRepeatedUserEmail, CreateUserController.createUser);

routes.patch("/users/:id", authMiddleware, verifyUserExists, verifyEmailAvailable, UpdateUserController.updateUser);

routes.patch("/users/:id/password", authMiddleware, verifyUserExists, ChangePasswordController.changePassword);

routes.delete("/users/:id", authMiddleware, verifyUserExists, DeleteUserController.deleteUser);

routes.get("/users/:id", authMiddleware, verifyUserExists, GetUserController.getUser);
routes.get("/users", authMiddleware, ListAllUsersController.listAllUsers);

module.exports = routes;
