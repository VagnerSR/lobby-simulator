import { countdownCalc } from "@/utils/countdownCalc";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface CountdownTimerProps {
    timeStampMS: number
    confirm: boolean
    setConfirm: Function
    socket: Socket
    eventString: string
    lobbyId: string
    username: string
    setTimeStampMS: Function
}

interface IRemaningTime {
    seconds: string
    minutes: string
}

const defaultRemaningTime: IRemaningTime = {
    seconds: "59",
    minutes: "04"
}

function CountdownTimer({ 
    timeStampMS, confirm, setConfirm, socket, 
    eventString, lobbyId, username, setTimeStampMS }: CountdownTimerProps) {

    const [remaningTime, setRemaningTime] = useState(defaultRemaningTime)

    useEffect(() => {
        const intervalId = setInterval(() => {
            upadteRemaningTime(timeStampMS.toString())
        }, 1000)
        return () => clearInterval(intervalId)
    }, [timeStampMS])

    useEffect(() => {
        remainOnLobbyOrLeave()
    }, [remaningTime])

    function upadteRemaningTime(countdown: string) {
        setRemaningTime(countdownCalc(countdown))
    }

    function remainOnLobbyOrLeave () {
        if(remaningTime.seconds === '00' && remaningTime.minutes === '00') {
            const getConfirm = window.confirm(`No game was found! \nClick Ok to reset the queue or cancel to leave the lobby`)
            setConfirm(getConfirm)
            if(confirm === true) {
                setTimeStampMS(new Date().getTime() + 10000)
            } else {
                socket.emit(eventString, { lobbyId, username })
            }
        }
    }

    return (
        <div>
            <span>
                Finding game
            </span>
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