interface IUser {
    id: string;
    username: string;
    lobby: string;
}

const users: IUser[] = [];
console.log(users)

// Join user to chat
export function userJoin(id: string, username: string, lobby: string) {
  const user = { id, username, lobby };

  users.push(user);

  return user;
}

// Get current user
export function getCurrentUser(id: string) {
  return users.find(user => user.id === id);
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