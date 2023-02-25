import { useSockets } from "@/context/socket.context";
import { getLength } from "@/utils/getLength";
import EVENTS from "../../config/events"
import LButton from "../LButton/LButton";
import MessagesContainer from "../Messages/MessagesContainer";
import lobbysJson from "./lobby.json"
import LiUser from "../LiUser/LiUser";
import Modal from "../Modal/Modal";
import { useState } from "react";


function Lobbys() {
    const { socket, lobbyId, username, setUsername, lobbyInfo, showMyModal, setShowMyModal } = useSockets()

    const handleOnClose = () => setShowMyModal!(false)

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
                    <LButton
                        text="Go back"
                        onClickFunc={goBackToHome} />


                    <nav className="m-4 rounded bg-slate-900">



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
                        <ul >
                            {lobbysJson.map((lobby) => {
                                return (
                                    <div className="p-4"
                                        key={lobby.id} >
                                        <button
                                            className="w-full rounded p-2 bg-slate-700 hover:bg-slate-600 text-gray-200"
                                            disabled={lobby.id === lobbyId}
                                            title={`Join ${lobby.name}`}
                                            onClick={() => handleJoinLobby(lobby.id)} >
                                            {`${lobby.name} - ${getLength(lobbyInfo!, lobby.id)} / 6`}
                                        </button>

                                        <ul>
                                            {lobbyInfo!.map((info) => {

                                                if (lobby.id === info.lobby) {
                                                    return (
                                                        <LiUser
                                                            text={info.username}
                                                            key={info.id} />
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

            <Modal
                visible={showMyModal!}
                onClose={handleOnClose} />
        </>
    );
}

export default Lobbys;
