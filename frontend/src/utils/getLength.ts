import { IUser } from "@/interface/IUser"

export function getLength (array: IUser[], compare: string) {
    const arrayLength = array.filter(value => compare === value.lobby)
    return arrayLength.length
}