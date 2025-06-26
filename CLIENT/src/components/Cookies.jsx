import React, {useState} from "react";
import {BsCookie} from "react-icons/bs";
import {RxCross2} from "react-icons/rx";
import {Link} from "react-router-dom";

export default function Cookies() {
  const [open, setOpen] = useState(false);
  return !open ? (
    <div
      className="fixed rounded-[100px] left-4 bottom-4 z-40 bg-white flex items-center justify-center p-1 group border-primary-dark border-2 transition-all duration-750 ease-in-out cursor-pointer"
      onClick={() => setOpen(true)}
    >
      <div className="text-primary-dark">
        <BsCookie size={50} />
      </div>
      <div className="flex font-bold w-0 group-hover:px-2 group-hover:w-[90px] transition-all duration-500 ease-in overflow-hidden">
        <p className="whitespace-nowrap">COOKIES</p>
      </div>
    </div>
  ) : (
    <div className="fixed left-4 bottom-4 z-40 flex flex-col bg-white border-primary-dark border-2 rounded-2xl gap-2.5 w-[300px] p-4 items-center text-black">
      <div className="flex w-full justify-end text-primary-dark">
        <RxCross2
          size={20}
          onClick={() => setOpen(false)}
          className="cursor-pointer"
        />
      </div>
      <p className="font-semibold text-primary-dark">
        Ce site utilise des cookies
      </p>
      <p className="text-xs">
        Nous utilisons des cookies pour améliorer votre expérience. Choisissez
        les cookies que vous nous permettez d'utiliser. Vous pouvez en savoir
        plus sur notre politique des cookies dans notre{" "}
        <Link
          to={"/privacy/#cookies"}
          className="underline font-semibold text-primary"
          onClick={() => setOpen(false)}
        >
          Politique de Confidentialité
        </Link>
      </p>
    </div>
  );
}
