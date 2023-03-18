import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import config from "config"
import { version } from "../package.json"
import socket from "./socket"

const port = process.env.PORT || config.get<number>("port")
const host = process.env.HEROKU_APP_NAME ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com` : config.get<string>("host")
const corsOrigin = config.get<string>("corsOrigin")

const app = express()

const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors:{
        origin: corsOrigin,
        credentials: true
    }
})

app.get('/', (req, res) => res.send(`Server is up! Version: ${version}`))

httpServer.listen(port, host, () => {
    socket({ io })
})