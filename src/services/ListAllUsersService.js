const UserRepository = require("../repositories/UserRepository");

async function listAllUsers(requestingUser) {
    if (!requestingUser){
        throw new Error("Usuário não autenticado");
    }

    const listAllUsers = await UserRepository.getAllUsers();

    return listAllUsers.map(user => ({id: user.id, name: user.name, email: user.email, type: user.type}));
}

module.exports = { listAllUsers };