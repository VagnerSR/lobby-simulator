import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Socket } from "socket.io-client";
import LButton from "../LButton/LButton";

function Queue() {
    const [queueCheck, setQueueCheck] = useState(false)
    const [time, setTime] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prevTime => prevTime + 10)
        }, 10)
        if(queueCheck) setTime(0)
        return () => clearInterval(interval)
    }, [time])


    useEffect(() => {
        countdownZero()
    }, [time])

    function countdownZero() {
        if (time === 5000) {
            setQueueCheck(true)
        }
    }

    function restartQueue() {
        setTime(0)
        setQueueCheck(false)
    }

    return (
        <div className="text-gray-300 flex justify-center items-center flex-col mt-8 mb-6">
            {
                queueCheck === false ? (
                    <span className="text-xl relative">
                        Finding game <AiOutlineLoading3Quarters className="absolute bottom-1 left-[120px] animate-spin-slow" />
                    </span>
                ) : (
                    <div className="flex flex-col justify-center items-center gap-2 mb-2">
                        <span className="text-xl">
                            Something went wrong!
                        </span>
                        <LButton
                            text="Restart Queue"
                            onClickFunc={restartQueue} />

                    </div>
                )
            }

            <div>
                <span>
                    {("0" + Math.floor((time / 60000) % 60)).slice(-2)}
                </span>
                <span>
                    :{("0" + Math.floor((time / 1000) % 60)).slice(-2)}
                </span>
            </div>
        </div>
    );
}

export default Queue;