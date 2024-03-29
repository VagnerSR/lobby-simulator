import { AiFillCloseCircle } from "react-icons/ai";
import LButton from "../LButton/LButton";
import { useEffect, useRef } from "react";

interface ModalProps {
    visible: boolean
    onClose: () => void
}

function Modal({ visible, onClose }: ModalProps) {
    const handleOnClose = (e: any) => {
        if (e.target.id === "container") onClose()
    }

    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        buttonRef.current?.focus();
      }, [visible]);

    if (!visible) return null;

    return (
        <div
        
            id="container"
            onClick={handleOnClose}
            className="fixed inset-0 bg-black bg-opacity-30 
            backdrop-blur-sm flex justify-center items-center z-20">

            <div className="bg-slate-700 rounded p-2">
                <div className="flex justify-end">
                    <button 
                    ref={buttonRef}
                        className="text-gray-200"
                        onClick={onClose} >
                        <AiFillCloseCircle size={30}/>
                    </button>
                </div>

                <div className="flex flex-col m-5">
                    <span className="text-gray-200 text-xl pb-6">
                        {`Username already exists in this lobby :(`}
                    </span>
                    <LButton
                        text="Ok"
                        onClickFunc={onClose} />
                </div>
            </div>
        </div>
    );
}

export default Modal;