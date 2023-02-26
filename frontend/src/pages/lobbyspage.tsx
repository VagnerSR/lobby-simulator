import LButton from "@/components/LButton/LButton";
import Lobbys from "@/components/Lobby/Lobby";
import SomethingWentWrong from "@/components/SomethingWentWrong/SomethingWentWrong";
import { useSockets } from "@/context/socket.context";
import { useRouter } from "next/router";

function LobbysPage() {
    const { setUsername, username } = useSockets()
    const router = useRouter();

    function backToHome() {
        router.push('/')
        setUsername('')
    }
    return (
        <div>
            {username ? (
                <div className='mt-10'>
                    <LButton
                        text="Go back"
                        onClickFunc={backToHome} />
                    <Lobbys />
                </div>
            ) : (
                <SomethingWentWrong />
            )}

        </div>
    );
}

export default LobbysPage;