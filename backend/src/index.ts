import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import { version } from "../package.json"
import socket from "./socket"

const port = process.env.PORT || 4000
const corsOrigin = ("http://localhost:3000")

const app = express()

const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors:{
        origin: corsOrigin,
        credentials: true
    }
})

app.get('/', (req, res) => res.send(`Server is up! Version: ${version}`))

httpServer.listen(port, () => {
    socket({ io })
})