import MessagesContainer from "@/components/Messages/MessagesContainer";
import SomethingWentWrong from "@/components/SomethingWentWrong/SomethingWentWrong";
import { useSockets } from "@/context/socket.context";

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