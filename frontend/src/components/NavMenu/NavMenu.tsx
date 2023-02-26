import { useSockets } from "@/context/socket.context";
import { useState, useRef, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import Lobbys from "../Lobby/Lobby";

function NavMenu() {
    const { username, active, setActive } = useSockets()

    const menuRef = useRef<HTMLDivElement>(null)

    const handleClickOutside = (e: MouseEvent) => {
        if (!menuRef?.current?.contains(e.target as HTMLElement)) {
            setActive!(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
    }, [])

    return (
        <>
            <button
                className="text-gray-100 mt-6 cursor-pointer"
                onClick={() => setActive!(!active)} >
                <BsThreeDotsVertical size={25} />
            </button>

            <div className={`${active ? 'block' : 'hidden'} fixed right-0 left-1/4 inset-y-0 bg-slate-600 z-20`}
                ref={menuRef}>
                <div className="flex justify-end">
                    <button
                        className="text-gray-100 mt-7 mr-6 cursor-pointer"
                        onClick={() => setActive!(!active)} >
                        <AiOutlineClose size={25} />
                    </button>
                </div>

                {username ? (
                    <nav className="">
                        <Lobbys />
                    </nav>
                ) : (
                    <div>

                    </div>
                )}

            </div>
        </>
    );
}

export default NavMenu;