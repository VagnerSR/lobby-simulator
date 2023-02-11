import EVENTS from "@/config/events";
import { useSockets } from "@/context/socket.context";
import { getLength } from "@/utils/getLength";
import { useEffect, useState } from "react";
import CountdownTimer from "./CountdownTimer";
import LookingForUsers from "./LookingForUsers";

function LobbyInfo() {
    

    const { socket, lobbyId, username, lobbyInfo } = useSockets()
    //const fiveMinAhead: number = new Date().getTime() + 300000;

    function handleLeaveLobby() {
        socket.emit(EVENTS.CLIENT.LEAVE_LOBBY, { lobbyId, username })
        socket.emit(EVENTS.CLIENT.GET_LOBBY_INFO)
    }

    return (
        <div>
            <button onClick={handleLeaveLobby}>
                Leave Lobby
            </button>

            {
                getLength(lobbyInfo!, lobbyId!) >= 6 ? (
                    <CountdownTimer                     
                         />
                ) : (
                <LookingForUsers 
                    usersInLobby={getLength(lobbyInfo!, lobbyId!)} /> 
            )}

            <ul>
                {lobbyInfo!.map((info) => {

                    if (lobbyId !== info.lobby) return

                    return (
                        <li key={info.id}>
                            {info.username}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default LobbyInfo;