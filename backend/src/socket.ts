import { nanoid } from "nanoid";
import { Server, Socket } from "socket.io";
import { addUser, getUsers, removeUser } from "./db/lobbysDb";
import { IUser } from "./interface/IUser";
import logger from "./utils/logger";
import { getUsersList, userJoin, userLeave } from "./utils/users";

const EVENTS = {
  connection: "connection",
  disconnect: "disconnect",
  CLIENT: {
    CREATE_LOBBY: "CREATE_LOBBY",
    SEND_LOBBY_MESSAGE: "SEND_LOBBY_MESSAGE",
    JOIN_LOBBY: "JOIN_LOBBY",
    LEAVE_LOBBY: "LEAVE_LOBBY",
    GET_LOBBY_INFO: "GET_LOBBY_INFO"
  },
  SERVER: {
    LOBBYS: "LOBBYS",
    JOINED_LOBBY: "JOINED_LOBBY",
    LOBBY_MESSAGE: "LOBBY_MESSAGE",
    JOINED_LOBBY_USER: "JOINED_LOBBY_USER",
    LEAVE_LOBBY: "LEAVE_LOBBY",
    QUEUE: "QUEUE",
    LOBBY_FULL: "LOBBY_FULL",
    LOBBY_USERS_LIST: "LOBBY_USERS_LIST"
  },
};

const users: Record<string, IUser> = {

};

function socket({ io }: { io: Server }) {
  logger.info(`Sockets enabled`)

  io.on(EVENTS.connection, (socket: Socket) => {
    logger.info(`User connected ${socket.id}`)
    

    /**
     * When a lobby is created
     * For now creating a lobby is disabled, only pre-defined lobbys
     
    socket.on(EVENTS.CLIENT.CREATE_LOBBY, ({ lobbyName }) => {
      // Create lobby Id
      const lobbyId = nanoid()
      // add a new lobby to the rooms object
      lobbys[lobbyId] = {
        name: lobbyName,
      }
      socket.join(lobbyId)

      socket.broadcast.emit(EVENTS.SERVER.LOBBYS, lobbys)

      socket.emit(EVENTS.SERVER.LOBBYS, lobbys)
      socket.emit(EVENTS.SERVER.JOINED_LOBBY, lobbyId)
    })
    */

    // socket.on(EVENTS.CLIENT.GET_LOBBY_INFO, async () => {
    //   io.emit(EVENTS.SERVER.LOBBY_USERS_LIST, await getUsers())
    // })

    socket.on(EVENTS.CLIENT.GET_LOBBY_INFO, async () => {
      io.emit(EVENTS.SERVER.LOBBY_USERS_LIST, getUsersList())
    })

    /**
     * When a user joins lobby
     */
    socket.on(EVENTS.CLIENT.JOIN_LOBBY, async (value: { key: string, username: string }) => {
      const rooms = io.sockets.adapter.rooms
      const room = rooms.get(value.key)
      const userId = socket.id


      //empty room
      if (room == undefined) {
        socket.join(value.key)
        socket.emit(EVENTS.SERVER.JOINED_LOBBY, value.key);

        users[userId] = {
          userId: userId,
          name: value.username,
          userLobby: value.key
        }

        await addUser(value.key, value.username, userId)
        userJoin(userId, value.username, value.key)
        
       // io.emit(EVENTS.SERVER.LOBBY_USERS_LIST, await getUsers())
        io.emit(EVENTS.SERVER.LOBBY_USERS_LIST, getUsersList())

        socket.emit(EVENTS.SERVER.JOINED_LOBBY_USER, users)
        socket.to(value.key).emit(EVENTS.SERVER.JOINED_LOBBY_USER, users)

      } 
      //when room already has someone on it
      else if (room!.size <= 5) {

        socket.join(value.key)
        socket.emit(EVENTS.SERVER.JOINED_LOBBY, value.key);

        users[userId] = {
          userId: userId,
          name: value.username,
          userLobby: value.key
        }

        await addUser(value.key, value.username, userId)
        userJoin(userId, value.username, value.key)

       // io.emit(EVENTS.SERVER.LOBBY_USERS_LIST, await getUsers())
        io.emit(EVENTS.SERVER.LOBBY_USERS_LIST, getUsersList())
        socket.emit(EVENTS.SERVER.JOINED_LOBBY_USER, users)
        socket.to(value.key).emit(EVENTS.SERVER.JOINED_LOBBY_USER, users)

        const date = new Date()
        socket.to(value.key).emit(EVENTS.SERVER.LOBBY_MESSAGE, {
          message: ``,
          username: `${value.username} has joined the lobby`,
          hours: `${date.getHours()}`,
          minutes: `${date.getMinutes()}`
        })
      } else {
        socket.emit(EVENTS.SERVER.LOBBY_FULL)
      }
    })

    /**
     * When a user leaves lobby
    */
    socket.on(EVENTS.CLIENT.LEAVE_LOBBY, async ({ lobbyId, username }) => {
      const userId = socket.id

      socket.leave(lobbyId)
      delete users[userId]
      await removeUser(userId)
      userLeave(userId)
      // Refresh db data on frontend
      //io.emit(EVENTS.SERVER.LOBBY_USERS_LIST, await getUsers())
      io.emit(EVENTS.SERVER.LOBBY_USERS_LIST, getUsersList())
      // Refresh users list in frontend
      socket.emit(EVENTS.SERVER.JOINED_LOBBY_USER, users)
      socket.to(lobbyId).emit(EVENTS.SERVER.JOINED_LOBBY_USER, users)
      //clear lobbyId
      socket.emit(EVENTS.SERVER.LEAVE_LOBBY)
      // Message user left the lobby
      const date = new Date()
      socket.to(lobbyId).emit(EVENTS.SERVER.LOBBY_MESSAGE, {
        message: ``,
        username: `${username} has left the lobby`,
        hours: `${date.getHours()}`,
        minutes: `${date.getMinutes()}`
      })
    })

    /**
     * When a user sends a message
     */
    socket.on(EVENTS.CLIENT.SEND_LOBBY_MESSAGE, ({ lobbyId, message, username }) => {
      const date = new Date()

      socket.to(lobbyId).emit(EVENTS.SERVER.LOBBY_MESSAGE, {
        message,
        username,
        hours: `${date.getHours()}`,
        minutes: `${date.getMinutes()}`
      })
    })

    /**
     * Disconecting
     */
    socket.on(EVENTS.disconnect, async () => {
      const userId = socket.id
      if (!users[userId]) return

      const lobbyId = users[userId].userLobby
      const username = users[userId].name

      delete users[userId]
      await removeUser(userId)
      userLeave(userId)
      // Refresh db data on frontend
     // io.emit(EVENTS.SERVER.LOBBY_USERS_LIST, await getUsers())
      io.emit(EVENTS.SERVER.LOBBY_USERS_LIST, getUsersList())
      // Refresh users list in frontend
      socket.to(lobbyId).emit(EVENTS.SERVER.JOINED_LOBBY_USER, users)
      // Message user left the lobby
      const date = new Date()
      socket.to(lobbyId).emit(EVENTS.SERVER.LOBBY_MESSAGE, {
        message: ``,
        username: `${username} has left the lobby`,
        hours: `${date.getHours()}`,
        minutes: `${date.getMinutes()}`
      })
    });
  })

}

export default socket