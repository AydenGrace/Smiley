import React from "react";
import {IoBagOutline, IoSettingsOutline} from "react-icons/io5";
import {NavLink, Outlet} from "react-router-dom";
import {TfiStatsUp} from "react-icons/tfi";
import {FiDollarSign} from "react-icons/fi";

export default function AdminPanel() {
  return (
    <div className="w-full flex flex-col min-h-screen pt-[77px]">
      <div className="flex w-full p-4">
        <section className="flex flex-col shadow-xl bg-white rounded-[10px] w-full overflow-hidden">
          <div className="flex p-4 items-center gap-4 border-b-[1px] border-b-black/20">
            <h1 className="text-2xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex border-b-[1px] border-b-black/20">
            <NavLink
              to={"/admin"}
              className={"p-4 flex gap-1 items-center"}
              end
            >
              <TfiStatsUp size={24} />
              Dashboard
            </NavLink>
            <NavLink
              to={"/admin/articles"}
              className={"p-4 flex gap-1 items-center"}
              end
            >
              <IoBagOutline size={24} />
              Articles
            </NavLink>
            <NavLink
              to={"/admin/sales"}
              className={"p-4 flex gap-1 items-center"}
              end
            >
              <FiDollarSign size={24} />
              Ventes
            </NavLink>
          </div>
          <div className="w-full flex">
            <Outlet />
          </div>
        </section>
      </div>
    </div>
  );
}
