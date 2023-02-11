import { useSockets } from "@/context/socket.context";
import { getLength } from "@/utils/getLength";
import EVENTS from "../../config/events"
import MessagesContainer from "../Messages/MessagesContainer";
import lobbysJson from "./lobby.json"

function Lobbys() {
    const { socket, lobbyId, username, setUsername, lobbyInfo } = useSockets()

    /*
    * * For now creating a lobby is disabled, only pre-defined lobbys
    const newLobbyRef = useRef<HTMLInputElement>(null)
    
    function handleCreateLobby() {
         const lobbyName = newLobbyRef?.current?.value || ''

        if (!String(lobbyName).trim()) return

        socket.emit(EVENTS.CLIENT.CREATE_LOBBY, { lobbyName })

         newLobbyRef!.current!.value = ""
    }
    */

    function handleJoinLobby(key: string) {
        if (key === lobbyId) return

        socket.emit(EVENTS.CLIENT.JOIN_LOBBY, { key, username })
        socket.emit(EVENTS.CLIENT.GET_LOBBY_INFO)
    }

    function goBackToHome() {
        setUsername('')
    }

    return (
        <>
            {lobbyId! ? <MessagesContainer /> :
                <>
                    <button onClick={goBackToHome}>
                        Back
                    </button>

                    <nav>


                        {/* 
        * For now creating a lobby is disabled, only pre-defined lobbys
        <div>
            <input
                ref={newLobbyRef}
                placeholder="Lobby name" />

            <button onClick={handleCreateLobby} >
                Create Lobby
            </button>
        </div> 
        */}
                        <ul>
                            {lobbysJson.map((lobby) => {
                                return (
                                    <div key={lobby.id} >
                                        <button
                                            disabled={lobby.id === lobbyId}
                                            title={`Join ${lobby.name}`}
                                            onClick={() => handleJoinLobby(lobby.id)} >
                                            { `${lobby.name} - ${getLength(lobbyInfo!, lobby.id)} / 6` }
                                        </button>

                                        <ul>
                                            {lobbyInfo!.map((info) => {

                                                if (lobby.id === info.lobby) {
                                                    return (
                                                        <li key={info.id}>
                                                            {info.username}
                                                        </li>
                                                    )
                                                }
                                            })}
                                        </ul>
                                    </div>
                                )
                            })}
                        </ul>
                    </nav>
                </>}
        </>
    );
}

export default Lobbys;
