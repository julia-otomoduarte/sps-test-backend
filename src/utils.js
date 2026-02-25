

function generateId() {
    const UserRepository = require("./repositories/UserRepository");
    const last_user_id = UserRepository.getLastUserId();
    return last_user_id + 1; 
}

module.exports = { generateId };