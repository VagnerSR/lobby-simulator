import LButton from '@/components/LButton/LButton'
import EVENTS from '@/config/events'
import { Inter } from '@next/font/google'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { useSockets } from "../context/socket.context"


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { socket, setUsername } = useSockets()
  const router = useRouter();
  const usernameRef = useRef<HTMLInputElement>(null)

  function handleSetUsername() {
    const value = usernameRef?.current?.value
    if (!value) {
      return
    }
    setUsername(value.trim())
    socket.emit(EVENTS.CLIENT.GET_LOBBY_INFO)
    localStorage.setItem("username", value.trim())
    router.push('/lobbyspage')
  }

  useEffect(() => {
    if (usernameRef)
      usernameRef!.current!.value = localStorage.getItem('username') || ""
  }, [])

  return (
    <>
      <div className='mt-16 p-4 '>
        <p className='mb-8 pl-6 pr-6 text-center text-3xl text-gray-200'>Tired of playing games, losing and getting trashed for it?</p>
        <p className='mb-5 pl-6 pr-6 text-center text-xl text-gray-400'>Join lobby simulator, where you can just chill and talk on the lobby, without any gameplay to disturb you.</p>
        <hr />

        <div className='mt-10 flex justify-center'>
          <input
            className='bg-gray-700 rounded pt-1 pb-1 pl-3 text-gray-200'
            placeholder='Enter a username'
            ref={usernameRef} />

          <LButton
            text='Find Lobby'
            onClickFunc={handleSetUsername}
          />
        </div>
      </div>
    </>
  )
}