import { BiDotsHorizontalRounded } from "react-icons/bi";

interface LookingForUsersProps {
    usersInLobby: number
}

function LookingForUsers({ usersInLobby }: LookingForUsersProps) {
    return (
        <div className="mt-6 mb-3 flex flex-col items-center pb-3 text-xl">

                <span className="text-gray-300 flex relative ">
                    Looking for users <BiDotsHorizontalRounded className="absolute bottom-0 left-36 animate-pulse" />
                </span>

            <span className="text-gray-300 animate-pulse">
                {`${usersInLobby} / 6`}
            </span>
        </div>
    );
}

export default LookingForUsers;