import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { AiOutlineShopping } from "react-icons/ai";
import { HiOutlineChartPie } from "react-icons/hi2";
import { LuUserRound } from "react-icons/lu";

export default function Header() {
  return (
    <div
      className={`flex w-full items-center justify-between py-4 px-16 bg-white`}
    >
      <Link to={"/"}>
        <img
          src="https://gahtfyaqzgunbhepuitf.supabase.co/storage/v1/object/public/smiley//Smiley_logo.webp"
          className="h-10"
          alt="Smiley Logo"
        />
      </Link>

      <nav className="flex gap-1">
        <Link to={"/"}>
          <Button text="Accueil" isEmpty />
        </Link>
        <Link to={"/"}>
          <Button text="Boutique" isEmpty />
        </Link>
        <Link to={"/"}>
          <Button text="À Propos" isEmpty />
        </Link>
        <Link to={"/"}>
          <Button text="Contactez Nous" isEmpty />
        </Link>
        <Link to={"/"}>
          <Button text="Panier" icon={<AiOutlineShopping size={"24px"} />} />
        </Link>
        <Link to={"/"}>
          <Button
            text="Administrateur"
            icon={<HiOutlineChartPie size={"24px"} />}
          />
        </Link>
        <Link to={"/"}>
          <Button icon={<LuUserRound size={"24px"} />} isRounded />
        </Link>
        <Link to={"/"}>
          <Button text="Connexion" isFull />
        </Link>
      </nav>
    </div>
  );
}
