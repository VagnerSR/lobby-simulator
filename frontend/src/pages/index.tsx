import EVENTS from "@/config/events";
import { Inter } from "@next/font/google";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useSockets } from "../context/socket.context";

const LButton = dynamic(() => import("../components/LButton/LButton"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { socket, setUsername } = useSockets();
  const router = useRouter();
  const usernameRef = useRef<HTMLInputElement>(null);

  function handleSetUsername() {
    const value = usernameRef?.current?.value;
    if (!value) {
      return;
    }
    setUsername(value.trim());
    socket.emit(EVENTS.CLIENT.GET_LOBBY_INFO);
    localStorage.setItem("username", value.trim());
    router.push("/lobbyspage");
  }

  useEffect(() => {
    if (usernameRef)
      usernameRef!.current!.value = localStorage.getItem("username") || "";
  }, []);

  return (
    <>
      <div className="mt-16 p-4 z-20">
        <p className="mb-8 pl-6 pr-6 text-center text-3xl text-vivid font-bold">
          Tired of playing games, losing and getting trashed for it?
        </p>
        <p className="mb-5 pl-6 pr-6 text-center text-xl text-primary">
          Join lobby simulator, where you can just chill and talk on the lobby,
          without any gameplay to disturb you.
        </p>
        <hr />

        <div className="mt-10 flex justify-center">
          <input
            className="bg-gray-700 rounded pt-1 pb-1 pl-3 text-gray-200"
            placeholder="Enter a username"
            ref={usernameRef}
          />

          <LButton text="Find Lobby" onClickFunc={handleSetUsername} />
        </div>
      </div>
    </>
  );
}
