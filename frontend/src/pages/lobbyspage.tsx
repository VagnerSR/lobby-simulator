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
                    <div className="lg:flex lg:justify-center lg:items-center lg:mt-20">
                        <div className="lg:flex lg:flex-col lg:justify-center lg:items-start bg-slate-800 lg:w-4/5">
                            <LButton
                                text="Go back"
                                onClickFunc={backToHome} />

                            <div className="lg:w-full bg-slate-800 ">
                                <Lobbys />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <SomethingWentWrong />
            )}
        </div>
    );
}

export default LobbysPage;