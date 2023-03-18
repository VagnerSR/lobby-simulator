import EVENTS from "@/config/events";
import { useRouter } from "next/router";
import lobby from "../../assets/LOBBY.png"
import simulator from "../../assets/SIMULATOR.png"
import { useSockets } from "../../context/socket.context"
import Image from 'next/image';


function HeaderLoad() {
    const { socket, lobbyId, username, setUsername } = useSockets()
    const router = useRouter();

    function backToHome() {
        socket.emit(EVENTS.CLIENT.LEAVE_LOBBY, { lobbyId, username })
        socket.emit(EVENTS.CLIENT.GET_LOBBY_INFO)
        router.push('/')
        setUsername('')
    }

    return (
        <header className="pl-4 pr-4 flex justify-between">
            <div
                className='cursor-pointer'
                onClick={backToHome}>
                <Image
                    height={63}
                    width={105}
                    className='relative ml-8 z-10'
                    src={lobby.src}
                    alt="Lobby logo" />

                <Image
                    height={90}
                    width={150}
                    className='absolute top-8 left-6 '
                    src={simulator.src}
                    alt="Simulator logo" />
            </div>
            
        </header>
    );
}

export default HeaderLoad;