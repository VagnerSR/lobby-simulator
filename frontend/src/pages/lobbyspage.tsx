import Lobbys from "@/components/Lobby/Lobby";
import { useSockets } from "@/context/socket.context";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const LButton = dynamic(() => import("../components/LButton/LButton"), {
  ssr: false,
});

const SomethingWentWrong = dynamic(
  () => import("../components/SomethingWentWrong/SomethingWentWrong"),
  {
    ssr: false,
  }
);

function LobbysPage() {
  const { setUsername, username } = useSockets();
  const router = useRouter();

  function backToHome() {
    router.push("/");
    setUsername("");
  }
  return (
    <div>
      {username ? (
        <div className="mt-10">
          <div className="lg:flex lg:justify-center lg:items-center lg:mt-20">
            <div className="lg:flex lg:flex-col lg:justify-center lg:items-start  lg:w-4/5 pt-6 rounded">
              <LButton text="Go back" onClickFunc={backToHome} />

              <div className="lg:w-full  rounded pb-5">
                <Lobbys transparent={true} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SomethingWentWrong />
      )}
    </div>
  );
}

export default LobbysPage;
