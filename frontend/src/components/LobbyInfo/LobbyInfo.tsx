import EVENTS from "@/config/events";
import { useSockets } from "@/context/socket.context";
import { useEffect, useState } from "react";
import CountdownTimer from "./CountdownTimer";
import LookingForUsers from "./LookingForUsers";

function LobbyInfo() {
    const [confirm, setConfirm] = useState(true)
    const [fiveMinAhead, setFiveMinAhead] = useState(new Date().getTime() + 10000)

    const { socket, lobbyId, username, users } = useSockets()
    const usersInLobby = []
    //const fiveMinAhead: number = new Date().getTime() + 300000;

    function handleLeaveLobby() {
        socket.emit(EVENTS.CLIENT.LEAVE_LOBBY, { lobbyId, username })
        socket.emit(EVENTS.CLIENT.GET_LOBBY_INFO)
    }

    const setUsersInLobby = Object.keys(users!).map((user) => {
        if (lobbyId === users![user].userLobby) {
            if (usersInLobby.length <= 6) {
                usersInLobby.push(users![user].userId)
            }
        }
    })

    return (
        <div>
            <button onClick={handleLeaveLobby}>
                Leave Lobby
            </button>

            {
                usersInLobby.length >= 6 ? (
                    <CountdownTimer 
                        timeStampMS={fiveMinAhead}
                        setTimeStampMS={setFiveMinAhead}
                        confirm={confirm}
                        setConfirm={setConfirm}
                        socket={socket}
                        eventString={EVENTS.CLIENT.LEAVE_LOBBY}
                        lobbyId={lobbyId!}
                        username={username!}
                         />
                ) : (
                <LookingForUsers 
                    usersInLobby={usersInLobby.length} /> 
            )}

            <ul>
                {Object.keys(users!).map((user) => {

                    if (lobbyId !== users![user].userLobby) return

                    return (
                        <li key={users![user].userId}>
                            {users![user].name}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default LobbyInfo;