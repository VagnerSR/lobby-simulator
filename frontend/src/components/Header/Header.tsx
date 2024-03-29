import EVENTS from "@/config/events";
import { useRouter } from "next/router";
import { GiPortal, GiShieldBash, GiSwordwoman } from "react-icons/gi";
import lobby from "../../assets/LOBBY.png"
import simulator from "../../assets/SIMULATOR.png"
import { useSockets } from "../../context/socket.context"
import NavMenu from "../NavMenu/NavMenu";
import Image from 'next/image';


function Header() {
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

                <div className='flex group absolute top-4 left-0'>
                    < GiShieldBash size={30} className='animate-bash text-gray-100' />
                </div>
                <div className='flex group absolute top-4 left-8'>
                    <GiPortal size={30} className='text-orange-400 animate-spin' />
                </div>
                <div className='flex group absolute top-4 left-[135px]'>
                    <GiPortal size={30} className='text-blue-400 animate-spin' />
                </div>
                <div className='flex group absolute top-4 left-32'>
                    < GiShieldBash size={30} className='animate-bashtwo text-gray-100' />
                </div>
                <div className='flex group absolute top-4 left-44'>
                    <GiSwordwoman size={30} className='animate-tilt text-gray-100' />
                </div>
                <Image
                    height={90}
                    width={150}
                    className='absolute top-8 left-6 '
                    src={simulator.src}
                    alt="Simulator logo" />
            </div>

            <div className="">
                <NavMenu />
            </div>
        </header>
    );
}

export default Header;