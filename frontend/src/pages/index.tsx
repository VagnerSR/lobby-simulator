import MessagesContainer from '@/components/Messages/MessagesContainer'
import Rooms from '@/components/Rooms/Rooms'
import { Inter } from '@next/font/google'
import { useRef } from 'react'
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

    localStorage.setItem("username", value)
  }

  return (
    <div>
      {!username ? (
        <div>
          <input
            placeholder='Enter a username'
            ref={usernameRef} />

          <button onClick={handleSetUsername} >
            Find Lobby
          </button>
        </div>
      ) : (
        <>
          <Rooms />
          <MessagesContainer />
        </>
      )}

    </div>
  )
}
