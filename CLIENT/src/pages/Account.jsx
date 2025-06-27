import {useContext} from "react";
import {UserContext} from "../context/UserContext";
import {FiUser} from "react-icons/fi";
import {NavLink, Outlet} from "react-router-dom";
import {IoBagOutline} from "react-icons/io5";
import {IoHeartOutline} from "react-icons/io5";
import {IoSettingsOutline} from "react-icons/io5";

export default function Account() {
  const {user} = useContext(UserContext);
  return (
    <div className="w-full min-h-screen flex items-center justify-center mt-[70px]">
      <section className="flex flex-col shadow-xl bg-white rounded-[10px] w-[66%] overflow-hidden">
        <div className="flex p-4 items-center gap-4 border-b-[1px] border-b-black/20">
          <div className="bg-primary w-[60px] h-[60px] rounded-[100px] items-center justify-center flex text-white">
            <FiUser size={36} />
          </div>
          <div className="flex flex-col ">
            <p className="font-semibold">{user.fullname}</p>
            <p>
              Membre depuis le {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex border-b-[1px] border-b-black/20">
          <NavLink
            to={"/profile"}
            className={"p-4 flex gap-1 items-center"}
            end
          >
            <IoBagOutline size={24} />
            Commandes
          </NavLink>
          {/* <NavLink
            to={"/profile/favorites"}
            className={"p-4 flex gap-1  items-center"}
          >
            <IoHeartOutline size={24} />
            Favoris
          </NavLink> */}
          <NavLink
            to={"/profile/settings"}
            className={"p-4 flex gap-1  items-center"}
          >
            <IoSettingsOutline size={24} />
            Paramètres
          </NavLink>
        </div>
        <div className="w-full flex">
          <Outlet />
        </div>
      </section>
    </div>
  );
}
