import {
    db,
} from "./dbConnect"

async function addUser (lobby: string, user: string, userId: string) {
    const collection = db.collection("lobbys")
    const result = await collection.insertOne({
        nome: user,
        lobby: lobby,
        userId: userId
    })

    return result
}

async function getUsers() {
    const collection = db.collection("lobbys")
    const users = await collection.find().toArray()
    return users
}

async function removeUser (userId: string) {
    const collection = db.collection("lobbys")
    const result = collection.deleteOne({
        userId: userId
    })

    return result
}

export {
    addUser,
    getUsers,
    removeUser
  };