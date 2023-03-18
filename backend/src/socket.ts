import { Server, Socket } from "socket.io";
import { getUsersList, userJoin, userLeave } from "./utils/users";

const EVENTS = {
  connection: "connection",
  disconnect: "disconnect",
  CLIENT: {
    CREATE_LOBBY: "CREATE_LOBBY",
    SEND_LOBBY_MESSAGE: "SEND_LOBBY_MESSAGE",
    JOIN_LOBBY: "JOIN_LOBBY",
    LEAVE_LOBBY: "LEAVE_LOBBY",
    GET_LOBBY_INFO: "GET_LOBBY_INFO",
    CHECK_USERNAME: "CHECK_USERNAME"
  },
  SERVER: {
    LOBBYS: "LOBBYS",
    JOINED_LOBBY: "JOINED_LOBBY",
    LOBBY_MESSAGE: "LOBBY_MESSAGE",
    JOINED_LOBBY_USER: "JOINED_LOBBY_USER",
    LEAVE_LOBBY: "LEAVE_LOBBY",
    QUEUE: "QUEUE",
    LOBBY_FULL: "LOBBY_FULL",
    LOBBY_USERS_LIST: "LOBBY_USERS_LIST",
    CHECK_USERNAME: "CHECK_USERNAME"
  },
};


function socket({ io }: { io: Server }) {

  io.on(EVENTS.connection, (socket: Socket) => {

    socket.on(EVENTS.CLIENT.GET_LOBBY_INFO, () => {
      io.emit(EVENTS.SERVER.LOBBY_USERS_LIST, getUsersList())
    })

    socket.on(EVENTS.CLIENT.CHECK_USERNAME, ({ username, key }) => {
      const lobbysInfo = getUsersList()
      const userList = lobbysInfo.map((lobbyMapped) => {
        if(lobbyMapped.lobby === key) {
          return lobbyMapped.username
        }
      })
      if (userList.includes(username)) {
        socket.emit(EVENTS.SERVER.CHECK_USERNAME, true)
      } else {
        socket.emit(EVENTS.SERVER.CHECK_USERNAME, false)
      }

    })


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


    /**
     * When a user joins lobby
     */
    socket.on(EVENTS.CLIENT.JOIN_LOBBY, (value: { key: string, username: string }) => {
      const rooms = io.sockets.adapter.rooms
      const room = rooms.get(value.key)
      const userId = socket.id


      //empty room
      if (room == undefined) {
        socket.join(value.key)
        socket.emit(EVENTS.SERVER.JOINED_LOBBY, value.key);

        userJoin(userId, value.username, value.key)

        // Refresh userlist on frontend
        io.emit(EVENTS.SERVER.LOBBY_USERS_LIST, getUsersList())

      }
      //when room already has someone on it
      else if (room!.size <= 5) {

        socket.join(value.key)
        socket.emit(EVENTS.SERVER.JOINED_LOBBY, value.key);

        userJoin(userId, value.username, value.key)

        // Refresh userlist on frontend
        io.emit(EVENTS.SERVER.LOBBY_USERS_LIST, getUsersList())

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
    socket.on(EVENTS.CLIENT.LEAVE_LOBBY, ({ lobbyId, username }) => {
      const userId = socket.id

      socket.leave(lobbyId)
      userLeave(userId)
      // Refresh userlist on frontend
      io.emit(EVENTS.SERVER.LOBBY_USERS_LIST, getUsersList())
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
        message: `- ${message}`,
        username,
        hours: `${date.getHours()}`,
        minutes: `${date.getMinutes()}`
      })
    })

    /**
     * Disconecting
     */
    socket.on(EVENTS.disconnect, () => {
      const userId = socket.id
      const usersList = getUsersList()
      usersList.map((user) => {
        if (userId === user.id) {
          const lobbyId = user.lobby
          const username = user.username

          // Message user left the lobby
          const date = new Date()
          socket.to(lobbyId).emit(EVENTS.SERVER.LOBBY_MESSAGE, {
            message: ``,
            username: `${username} has left the lobby`,
            hours: `${date.getHours()}`,
            minutes: `${date.getMinutes()}`
          })

          // Refresh userlist on frontend
          userLeave(userId)
          io.emit(EVENTS.SERVER.LOBBY_USERS_LIST, getUsersList())

        }
      })

    });
  })

}

export default socket