import React, {useContext, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import Button from "./Button";
import {AiOutlineShopping} from "react-icons/ai";
import {HiOutlineChartPie} from "react-icons/hi2";
import {LuUserRound} from "react-icons/lu";
import {UserContext} from "../context/UserContext";
import Burger from "./Burger";

export default function Header() {
  const {user} = useContext(UserContext);
  const [opened, setOpened] = useState(null);

  return (
    <header
      className={`fixed flex w-full max-w-screen items-center justify-between py-4 px-4 lg:px-16 bg-white z-50`}
    >
      <Link to={"/"}>
        <img
          src="https://gahtfyaqzgunbhepuitf.supabase.co/storage/v1/object/public/smiley//Smiley_logo.webp"
          className="h-10"
          alt="Smiley Logo"
        />
      </Link>

      <div className="flex">
        <nav className="gap-1 hidden lg:flex">
          <NavLink to={"/"}>
            <Button text="Accueil" isEmpty />
          </NavLink>
          <NavLink to={"/shop"}>
            <Button text="Boutique" isEmpty />
          </NavLink>
          <NavLink to={"/about"}>
            <Button text="À Propos" isEmpty />
          </NavLink>
          <NavLink to={"/contact"}>
            <Button text="Contactez Nous" isEmpty />
          </NavLink>
          <NavLink to={"/cart"}>
            <Button text="Panier" icon={<AiOutlineShopping size={"24px"} />} />
          </NavLink>
          {user?.role?.name?.toUpperCase() === "ADMIN" && (
            <NavLink to={"/admin"}>
              <Button
                text="Administrateur"
                icon={<HiOutlineChartPie size={"24px"} />}
              />
            </NavLink>
          )}

          {user && (
            <NavLink to={"/profile"}>
              <Button icon={<LuUserRound size={"24px"} />} isRounded />
            </NavLink>
          )}
          {!user && (
            <NavLink to={"/login"}>
              <Button text="Connexion" isFull />
            </NavLink>
          )}
        </nav>
        <div className="flex lg:hidden">
          <Burger closeTrigger={opened}>
            <NavLink
              to={"/"}
              onClick={() => setOpened(Math.random())}
              className={"mb-4"}
            >
              Accueil
            </NavLink>
            <NavLink
              to={"/shop"}
              onClick={() => setOpened(Math.random())}
              className={"mb-4"}
            >
              Boutique
            </NavLink>
            <NavLink
              to={"/about"}
              onClick={() => setOpened(Math.random())}
              className={"mb-4"}
            >
              À Propos
            </NavLink>
            <NavLink
              to={"/contact"}
              onClick={() => setOpened(Math.random())}
              className={"mb-4"}
            >
              Contactez Nous
            </NavLink>
            <NavLink
              to={"/cart"}
              onClick={() => setOpened(Math.random())}
              className={"mb-4 w-full"}
            >
              <Button
                text="Panier"
                icon={<AiOutlineShopping size={"24px"} />}
                isWidthFull
              />
            </NavLink>
            {user?.role?.name?.toUpperCase() === "ADMIN" && (
              <NavLink to={"/admin"} className={"mb-4 w-full"}>
                <Button
                  text="Administrateur"
                  icon={<HiOutlineChartPie size={"24px"} />}
                  isWidthFull
                />
              </NavLink>
            )}

            {user && (
              <NavLink to={"/profile"} className={"mb-4 w-full"}>
                <Button
                  text="Profil"
                  icon={<HiOutlineChartPie size={"24px"} isWidthFull />}
                />
              </NavLink>
            )}
            {!user && (
              <>
                <div className="flex-1 flex w-full"></div>
                <NavLink to={"/login"} className={"w-full flex justify-center"}>
                  <Button text="Connexion" isFull isWidthFull />
                </NavLink>
              </>
            )}
          </Burger>
        </div>
      </div>
    </header>
  );
}
