import { AiFillGithub } from "react-icons/ai";

function ContactInfo() {
    return (
        <div className="flex flex-col gap-6 text-gray-100 text-xl m-6 text-center">
            <span>
                App developed by Vagner Rosnoski
            </span>

            <a
                className="hover:text-blue-400 hover:underline"
                href="https://github.com/VagnerSR"
                aria-label="link to my github" >
                <span className=" flex justify-center gap-2">
                    My GitHub
                    <AiFillGithub size={30} />
                </span>
            </a>
            <span>
                {`You can check the git repository `}
                <a
                    className="text-blue-400 hover:underline"
                    href="https://github.com/VagnerSR/lobby-simulator"
                    aria-label="link to github repository">
                    {`here`}
                </a>
                .
            </span>
        </div>
    );
}

export default ContactInfo;