const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../database/database.json");

function getDatabase() {
  const raw = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(raw);
}

function findByEmail(email) {
  const db = getDatabase();
  return db.users.find((user) => user.email === email) || null;
}

function findById(id) {
  const db = getDatabase();
  return db.users.find((user) => String(user.id) === String(id)) || null;
}

function createUser(user) {
  const db = getDatabase();
  db.users.push(user);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

function getLastUserId() {
  const db = getDatabase();
  if (db.users.length === 0) return 0;
  return db.users[db.users.length - 1].id || 0;
}

function updateUser(updatedUser) {
  const db = getDatabase();
  const index = db.users.findIndex((user) => String(user.id) === String(updatedUser.id));
  if (index !== -1) {
    db.users[index] = { ...db.users[index], ...updatedUser };
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  }
}

function deleteUser(id) {
  const db = getDatabase();
  const index = db.users.findIndex((user) => String(user.id) === String(id));
  if (index !== -1) {
    db.users.splice(index, 1);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  }
}

function getAllUsers() {
  const db = getDatabase();
  return db.users;
}

module.exports = { findByEmail, findById, createUser, getLastUserId, updateUser, deleteUser, getAllUsers };

