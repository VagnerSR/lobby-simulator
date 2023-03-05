import EVENTS from "@/config/events";
import { useSockets } from "@/context/socket.context";
import { getLength } from "@/utils/getLength";
import LButton from "../LButton/LButton";
import lobbysJson from "../Lobby/lobby.json"
import Queue from "./Queue";
import LookingForUsers from "./LookingForUsers";
import { useRouter } from "next/router";

function LobbyInfo() {
    const { socket, lobbyId, username, lobbyInfo } = useSockets()
    const router = useRouter();

    function handleLeaveLobby() {
        socket.emit(EVENTS.CLIENT.LEAVE_LOBBY, { lobbyId, username })
        socket.emit(EVENTS.CLIENT.GET_LOBBY_INFO)
        router.push("/lobbyspage")
    }

    return (
        <div className="flex justify-center flex-col">
            <div className="mt-10">

                <div className="flex justify-start md:justify-between gap-12">
                    <LButton
                        text="Leave Lobby"
                        onClickFunc={handleLeaveLobby} />

                    {lobbysJson.map((lobby) => {
                        if (lobby.id !== lobbyId) return
                        return (
                            <h2 
                                className="text-gray-300 text-xl pt-1"
                                key={lobby.id}>
                                {lobby.name}
                            </h2>
                        )
                    })}

                    <div className="hidden md:block w-[120px]">

                    </div>
                </div>

                {/* <ul className="w-3/4 h-24 flex flex-col flex-wrap">
                    {lobbyInfo!.map((info) => {

                        if (lobbyId !== info.lobby) return

                        return (
                            <LiUser
                                text={info.username}
                                key={info.id} />

                        )
                    })}
                </ul> */}
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