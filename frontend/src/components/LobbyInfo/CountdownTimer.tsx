import { countdownCalc } from "@/utils/countdownCalc";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface CountdownTimerProps {

}

interface IRemaningTime {
    seconds: string
    minutes: string
}

const defaultRemaningTime: IRemaningTime = {
    seconds: "59",
    minutes: "04"
}

function CountdownTimer({}: CountdownTimerProps) {

    const [timeStamp, setTimeStamp] = useState(new Date().getTime() + 10000)
    const [remaningTime, setRemaningTime] = useState(defaultRemaningTime)
    const [countdownCheck, setCountdownCheck] = useState(false)

    useEffect(() => {
        const intervalId = setInterval(() => {
            upadteRemaningTime(timeStamp.toString())
        }, 1000)
        return () => clearInterval(intervalId)
    }, [timeStamp])

    useEffect(() => {
        countdownZero()
    }, [remaningTime])

    function upadteRemaningTime(countdown: string) {
        setRemaningTime(countdownCalc(countdown))
    }

    function countdownZero() {
        if (remaningTime.seconds === '00' && remaningTime.minutes === '00') {
            setCountdownCheck(true)
        }
    }

    function restartQueue() {
        setTimeStamp(new Date().getTime() + 10000)
        setCountdownCheck(false)
    }

    return (
        <div>
            {
                countdownCheck === false ? (
                    <span>
                        Finding game
                    </span>
                ) : (
                    <div>
                        <span>
                            Something went wrong!
                        </span>
                        <button onClick={restartQueue}>
                            Restart Queue
                        </button>
                    </div>
                )
            }

            <span>
                {`${remaningTime.minutes}:`}
            </span>
            <span>
                {remaningTime.seconds}
            </span>
        </div>
    );
}

export default CountdownTimer;