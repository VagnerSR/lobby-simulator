import EVENTS from "@/config/events";
import { useSockets } from "@/context/socket.context";
import { getLength } from "@/utils/getLength";
import LButton from "../LButton/LButton";
import LiUser from "../LiUser/LiUser";
import Queue from "./Queue";
import LookingForUsers from "./LookingForUsers";

function LobbyInfo() {
    const { socket, lobbyId, username, lobbyInfo } = useSockets()

    function handleLeaveLobby() {
        socket.emit(EVENTS.CLIENT.LEAVE_LOBBY, { lobbyId, username })
        socket.emit(EVENTS.CLIENT.GET_LOBBY_INFO)
    }

    return (
        <div className="flex justify-center flex-col">
            <div className="flex items-center justify-center">
                <LButton
                    text="Leave Lobby"
                    height="h-16"
                    onClickFunc={handleLeaveLobby} />

                <ul className="w-3/4 h-24 flex flex-col flex-wrap">
                    {lobbyInfo!.map((info) => {

                        if (lobbyId !== info.lobby) return

                        return (
                            <LiUser
                                text={info.username}
                                key={info.id} />

                        )
                    })}
                </ul>
            </div>

            {
                getLength(lobbyInfo!, lobbyId!) >= 6 ? (
                    <Queue />
                ) : (
                    <LookingForUsers
                        usersInLobby={getLength(lobbyInfo!, lobbyId!)} />
                )}


        </div>
    );
}

export default LobbyInfo;