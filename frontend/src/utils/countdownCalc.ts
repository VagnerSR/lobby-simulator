import dayjs from "dayjs";
import { addZeros } from "./addZeros";

export function countdownCalc(timestampMS: string) {
    const timestampDayJS = dayjs(Number(timestampMS))
    const nowDayJS = dayjs()
    if (timestampDayJS.isBefore(nowDayJS)) {
        return {
            seconds: "00",
            minutes: "00"
        }
    }
    return {
        seconds: getRemainingSeconds(nowDayJS, timestampDayJS),
        minutes: getRemainingMinutes(nowDayJS, timestampDayJS)
    }
}

function getRemainingSeconds(nowDayJS: dayjs.Dayjs, timestampDayJS: dayjs.Dayjs) {
    const seconds = timestampDayJS.diff(nowDayJS, 'seconds') % 60
    return addZeros(seconds, 2)
}

function getRemainingMinutes(nowDayJS: dayjs.Dayjs, timestampDayJS: dayjs.Dayjs) {
    const minutes = timestampDayJS.diff(nowDayJS, 'minutes') % 60
    return addZeros(minutes, 2)
}