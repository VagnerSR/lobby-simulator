import { FaUserCircle } from "react-icons/fa";

interface LLiProps {
    text: string
}

function LiUser({ text }: LLiProps) {
    return (
        <li
            className="text-gray-300 pl-12 text-lg flex relative" >
            <FaUserCircle className="absolute bottom-1 left-5" />
            {text}
        </li>
    );
}

export default LiUser;