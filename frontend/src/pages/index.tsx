import Lobbys from '@/components/Lobby/Lobby'
import EVENTS from '@/config/events'
import { Inter } from '@next/font/google'
import { useEffect, useRef } from 'react'
import { useSockets } from "../context/socket.context"


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { socket, username, setUsername } = useSockets()
  const usernameRef = useRef<HTMLInputElement>(null)

  function handleSetUsername() {
    const value = usernameRef?.current?.value
    if (!value) {
      return
    }

      setUsername(value)
      socket.emit(EVENTS.CLIENT.GET_LOBBY_INFO)
      localStorage.setItem("username", value)
  }

  useEffect(() => {
    if (usernameRef)
    usernameRef!.current!.value = localStorage.getItem('username') || ""
  }, [])

  return (
    <div>
      {!username ? (

        <div>
          <h1>Lobby Simulator</h1>
          <p>Tired of playing games, losing and getting trashed for it?</p>
          <p>Join lobby simulator, where you can just chill and talk on the lobby without any gameplay to disturb you.</p>
          <input
            placeholder='Enter a username'
            ref={usernameRef} />

          <button onClick={handleSetUsername} >
            Find Lobby
          </button>
        </div>

      ) : (

        <div>
          <Lobbys />
        </div>

      )}

    </div>
  )
}