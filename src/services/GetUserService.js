
const UserRepository = require("../repositories/UserRepository");

async function getUser (requestingUser, id) {
    if (requestingUser.type !== "admin" && String(requestingUser.id) !== String(id)) {
        throw new Error("Você não tem permissão para acessar este usuário");
    }
    const user = await UserRepository.findById(id);

    return {id: user.id, name: user.name, email: user.email, type: user.type};
}

module.exports = { getUser };