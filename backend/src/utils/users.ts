import { IUser } from "../interface/IUser";

const users: IUser[] = [];

export function getUsersList() {
  return users;
}

// Join user to chat
export function userJoin(id: string, username: string, lobby: string) {
  const user = { id, username, lobby };
  users.push(user);
  return user;
}

// Get current user
export function checkUserNameExists(username: string) {
  const ckeckingUsername = users.some(user => user.username === username)

  return ckeckingUsername
}

// User leaves chat
export function userLeave(id: string) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get lobby users
export function getLobbyUsers(lobby: string) {
  return users.filter(user => user.lobby === lobby);
}