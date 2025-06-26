import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import Button from "./Button";
import {AiOutlineShopping} from "react-icons/ai";
import {HiOutlineChartPie} from "react-icons/hi2";
import {LuUserRound} from "react-icons/lu";
import {UserContext} from "../context/UserContext";
import Burger from "./Burger";

export default function Header() {
  const {user, isAdmin} = useContext(UserContext);
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
          <Link to={"/"}>
            <Button text="Accueil" isEmpty />
          </Link>
          <Link to={"/shop"}>
            <Button text="Boutique" isEmpty />
          </Link>
          <Link to={"/about"}>
            <Button text="À Propos" isEmpty />
          </Link>
          <Link to={"/contact"}>
            <Button text="Contactez Nous" isEmpty />
          </Link>
          <Link to={"/cart"}>
            <Button text="Panier" icon={<AiOutlineShopping size={"24px"} />} />
          </Link>
          {isAdmin && (
            <Link to={"/admin"}>
              <Button
                text="Administrateur"
                icon={<HiOutlineChartPie size={"24px"} />}
              />
            </Link>
          )}

          {user && (
            <Link to={"/profile"}>
              <Button icon={<LuUserRound size={"24px"} />} isRounded />
            </Link>
          )}
          {!user && (
            <Link to={"/login"}>
              <Button text="Connexion" isFull />
            </Link>
          )}
        </nav>
        <div className="flex lg:hidden">
          <Burger closeTrigger={opened}>
            <Link
              to={"/"}
              onClick={() => setOpened(Math.random())}
              className={"mb-4"}
            >
              Accueil
            </Link>
            <Link
              to={"/shop"}
              onClick={() => setOpened(Math.random())}
              className={"mb-4"}
            >
              Boutique
            </Link>
            <Link
              to={"/about"}
              onClick={() => setOpened(Math.random())}
              className={"mb-4"}
            >
              À Propos
            </Link>
            <Link
              to={"/contact"}
              onClick={() => setOpened(Math.random())}
              className={"mb-4"}
            >
              Contactez Nous
            </Link>
            <Link
              to={"/cart"}
              onClick={() => setOpened(Math.random())}
              className={"mb-4 w-full"}
            >
              <Button
                text="Panier"
                icon={<AiOutlineShopping size={"24px"} />}
                isWidthFull
              />
            </Link>
            {isAdmin && (
              <Link to={"/admin"} className={"mb-4 w-full"}>
                <Button
                  text="Administrateur"
                  icon={<HiOutlineChartPie size={"24px"} />}
                  isWidthFull
                />
              </Link>
            )}

            {user && (
              <Link to={"/profile"} className={"mb-4 w-full"}>
                <Button
                  text="Profil"
                  icon={<HiOutlineChartPie size={"24px"} />}
                  isWidthFull
                />
              </Link>
            )}
            {!user && (
              <>
                <div className="flex-1 flex w-full"></div>
                <Link to={"/login"} className={"w-full flex justify-center"}>
                  <Button text="Connexion" isFull isWidthFull />
                </Link>
              </>
            )}
          </Burger>
        </div>
      </div>
    </header>
  );
}
