import EVENTS from "@/config/events";
import { useSockets } from "@/context/socket.context";
import { addZeros } from "@/utils/addZeros";
import React, { useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import dynamic from "next/dynamic";
import LobbyInfo from "../LobbyInfo/LobbyInfo";
import LButton from "../LButton/LButton";

const NavMenuMessage = dynamic(() => import("../NavMenu/NavMenuMessage"), {
  ssr: false,
});

function MessagesContainer() {
  const { socket, messages, lobbyId, username, setMessages } = useSockets();

  const newMessageRef = useRef<HTMLTextAreaElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const date = new Date();

  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      handleSendMessage();
    }
  }
  

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
    }
  }, [messages]);

  function handleSendMessage() {
    const message = newMessageRef?.current?.value;

    if (!String(message).trim()) {
      return;
    }

    socket.emit(EVENTS.CLIENT.SEND_LOBBY_MESSAGE, {
      lobbyId,
      message,
      username,
    });

    setMessages([
      ...messages!,
      {
        username: "You",
        message: `- ${message}`,
        hours: `${addZeros(date.getHours(), 2)}`,
        minutes: `${addZeros(date.getMinutes(), 2)}`,
        
      },
    ]);

    newMessageRef!.current!.value = "";
    newMessageRef?.current?.focus();
  }

  return (
    <div className="">
      <NavMenuMessage />
      <div className="lg:w-2/3 2xl:w-3/4 ">
        <LobbyInfo />

        <div className="m-4">
          <div
            ref={messageEndRef}
            className="bg-slate-800 h-96 lg:h-[450px] rounded break-words overflow-y-auto"
          >
            {messages?.map(({ message, username, hours, minutes }, index) => (
              <div
                className="p-2 text-gray-300 text-lg flex flex-col"
                key={index}
              >
                <span className=" pl-10 relative">
                  <FaUserCircle className="absolute bottom-1 left-3" />{" "}
                  {`${username} - ${hours}:${minutes}`}
                </span>
                <span className="pl-10 pr-3">{message}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center mt-4 ">
            <textarea
              onKeyDown={onEnterPress}
              className="bg-slate-800 w-full rounded h-20 p-3 text-gray-300 text-lg"
              rows={1}
              placeholder="Say something"
              ref={newMessageRef}
            />

          
              <LButton text="Send" onClickFunc={handleSendMessage} />
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessagesContainer;
