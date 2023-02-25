import EVENTS from "@/config/events";
import { useSockets } from "@/context/socket.context";
import { addZeros } from "@/utils/addZeros";
import { useEffect, useRef } from "react";
import LobbyInfo from "../LobbyInfo/LobbyInfo";
import { FaUserCircle } from "react-icons/fa";
import LButton from "../LButton/LButton";

function MessagesContainer() {
    const { socket, messages, lobbyId, username, setMessages } = useSockets()

    const newMessageRef = useRef<HTMLTextAreaElement>(null)
    const messageEndRef = useRef<HTMLDivElement>(null)

    
    useEffect(() => {
        if(messageEndRef.current) {
            messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;

        }
    }, [messages])
    

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
                message: `- ${message}`,
                hours: `${date.getHours()}`,
                minutes: `${date.getMinutes()}`
            }
        ])

        newMessageRef!.current!.value = ""
    }

    return (
        <div className="h-4/5">
            <LobbyInfo />
            <div className="">
                <div
                    ref={messageEndRef} 
                    className="bg-slate-900 m-4 h-80 rounded break-words overflow-y-auto">
                {messages?.map(({ message, username, hours, minutes }, index) => (
                    <div 
                        className="p-2 text-gray-300 text-lg flex flex-col"
                        key={index} >
                        <span className=" pl-10 relative">
                            <FaUserCircle className="absolute bottom-1 left-3" /> {`${username} - ${addZeros(hours, 2 )}:${addZeros(minutes, 2 )}`}
                        </span>
                        <span className="pl-10">
                            {message}
                        </span>
                    </div>
                ))}
                </div>

                <div  />

                <div className="w-full flex items-center justify-center">
                    <textarea
                        className="bg-slate-900 w-3/4 rounded h-20 resize-none p-3 text-gray-300 text-lg"
                        rows={1}
                        placeholder="Say something"
                        ref={newMessageRef} />

                    <LButton 
                        text="Send"
                        onClickFunc={handleSendMessage} />
                </div>
            </div>
        </div>
    );
}

export default MessagesContainer;