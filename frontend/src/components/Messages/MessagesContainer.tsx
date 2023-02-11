import EVENTS from "@/config/events";
import { useSockets } from "@/context/socket.context";
import { addZeros } from "@/utils/addZeros";
import { useEffect, useRef } from "react";
import LobbyInfo from "../LobbyInfo/LobbyInfo";

function MessagesContainer() {
    const { socket, messages, lobbyId, username, setMessages } = useSockets()

    const newMessageRef = useRef<HTMLTextAreaElement>(null)
    const messageEndRef = useRef(null)

    /*
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])
    */

    function handleSendMessage() {
        const message = newMessageRef?.current?.value

        if (!String(message).trim()) {
            return
        }

        socket.emit(EVENTS.CLIENT.SEND_LOBBY_MESSAGE, { lobbyId, message, username })

        const date = new Date()
        setMessages([
            ...messages!,
            {
                username: 'You',
                message,
                hours: `${date.getHours()}`,
                minutes: `${date.getMinutes()}`
            }
        ])

        newMessageRef!.current!.value = ""
    }

    return (
        <div>
            <LobbyInfo />
            <div>
                {messages?.map(({ message, username, hours, minutes }, index) => (
                    <div key={index} >
                        <span>
                            {`${username} - ${addZeros(hours, 2 )}:${addZeros(minutes, 2 )}`}
                        </span>
                        <span>
                            {message}
                        </span>
                    </div>
                ))}

                <div ref={messageEndRef} />

                <div>
                    <textarea
                        rows={1}
                        placeholder="Say something"
                        ref={newMessageRef} />

                    <button onClick={handleSendMessage}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MessagesContainer;