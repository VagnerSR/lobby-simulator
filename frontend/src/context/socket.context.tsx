import EVENTS from "@/config/events";
import { IMessage } from "@/interface/IMessage";
import { IUser } from "@/interface/IUser";
import { createContext, useContext, useEffect, useState } from "react"
import io, { Socket } from "socket.io-client"
import { SOCKET_URL } from "../config/default"

interface Context {
    socket: Socket;
    username?: string
    setUsername: Function
    lobbyId?: string
    messages?: IMessage[]
    setMessages: Function
    lobbyInfo?: IUser[]
    showMyModal?: boolean
    setShowMyModal?: Function
}

const socket = io(SOCKET_URL)

const SocketContext = createContext<Context>({
    socket,
    setUsername: () => false,
    messages: [],
    setMessages: () => false
})
//
function SocketsProvider(props: any) {
    const [username, setUsername] = useState("")
    const [lobbyId, setLobbyId] = useState("")
    const [messages, setMessages] = useState<IMessage[]>([])
    const [lobbyInfo, setLobbyInfo] = useState<IUser[]>([])
    const [showMyModal, setShowMyModal] = useState(false)

    useEffect(() => {
        window.onfocus = function () {
            document.title = "Lobby Simulator"
        }
    }, [])

    socket.on(EVENTS.SERVER.JOINED_LOBBY, (value) => {
        setLobbyId(value)
        setMessages([])
    })

    socket.on(EVENTS.SERVER.LOBBY_USERS_LIST, (value) => {
        setLobbyInfo!(value)
    })

    socket.on(EVENTS.SERVER.LOBBY_FULL, () => {
        setShowMyModal(true)
    })

    socket.on(EVENTS.SERVER.LEAVE_LOBBY, () => {
        setLobbyId("")
    })

    socket.on(EVENTS.SERVER.LOBBY_MESSAGE, ({ message, username, hours, minutes }) => {
        if (!document.hasFocus()) {
            document.title = "New message"
        }
        setMessages([
            ...messages,
            {
                message,
                username,
                hours,
                minutes
            }
        ])
    })

    return (
        <SocketContext.Provider
            value={{
                socket,
                username,
                setUsername,
                lobbyId,
                messages,
                setMessages,
                lobbyInfo,
                showMyModal,
                setShowMyModal
            }}
            {...props}
        />
    )
}

export const useSockets = () => useContext(SocketContext)

export default SocketsProvider