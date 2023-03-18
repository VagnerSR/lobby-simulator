import MessagesContainer from "@/components/Messages/MessagesContainer";
import { useSockets } from "@/context/socket.context";
import dynamic from "next/dynamic";

  const SomethingWentWrong = dynamic(() => import('../components/SomethingWentWrong/SomethingWentWrong'), {
    ssr: false
  })


function lobbymessage() {
    const { username } = useSockets()
    return (
        <div>
            {username ? (
                <MessagesContainer />
            ) : (
                <SomethingWentWrong />
            )}

        </div>
    );
}

export default lobbymessage;