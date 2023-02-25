import LButton from '@/components/LButton/LButton'
import Lobbys from '@/components/Lobby/Lobby'
import EVENTS from '@/config/events'
import { Inter } from '@next/font/google'
import { useEffect, useRef } from 'react'
import { useSockets } from "../context/socket.context"
import { GiShieldBash, GiSwordsEmblem, GiSwordwoman } from "react-icons/gi";


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { socket, username, setUsername } = useSockets()
  const usernameRef = useRef<HTMLInputElement>(null)

  function handleSetUsername() {
    const value = usernameRef?.current?.value
    if (!value) {
      return
    }

    setUsername(value.trim())
    socket.emit(EVENTS.CLIENT.GET_LOBBY_INFO)
    localStorage.setItem("username", value.trim())
  }

  useEffect(() => {
    if (usernameRef)
      usernameRef!.current!.value = localStorage.getItem('username') || ""
  }, [])

  function backToHome () {
    setUsername('')
  }

  return (
    <div className="font-[Fira-Code] bg-slate-800 h-screen relative z-10">
      <h1
        onClick={backToHome} 
        className='font-bold text-3xl	text-gray-100 flex justify-center p-6 cursor-pointer '>
        Lobby Simulator
        
        <div className='flex group'>
        < GiShieldBash className='animate-bash' />
        <GiSwordwoman className=' rotate-45'/>
        </div>
      </h1>

      {!username ? (
        <div className='mt-6 p-4 '>
          <p className='mb-3 text-center text-xl text-gray-300'>Tired of playing games, losing and getting trashed for it?</p>
          <p className='mb-5 text-center text-xl text-gray-300'>Join lobby simulator, where you can just chill and talk on the lobby, without any gameplay to disturb you.</p>
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

      ) : (

        <div>
          <Lobbys />
        </div>

      )}

    </div>
  )
}