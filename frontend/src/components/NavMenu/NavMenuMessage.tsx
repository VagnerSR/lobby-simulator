import ContactInfo from "../ContactInfo/Contactinfor";
import Lobbys from "../Lobby/Lobby";

function NavMenuMessage() {
  return (
    <>
      <div
        className={`hidden lg:block fixed right-0 left-1/4 md:left-2/4 lg:left-2/3 2xl:left-3/4
                 inset-y-0 bg-slate-600 z-20 overflow-y-auto `}
      >
        <div className="flex justify-end"></div>

        <Lobbys transparent={false} />
        <ContactInfo />
      </div>
    </>
  );
}

export default NavMenuMessage;
