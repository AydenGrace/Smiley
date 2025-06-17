import React, {useEffect, useState} from "react";

export default function Burger({children, closeTrigger}) {
  const [open, setOpen] = useState(false);

  const topLine = document.getElementById("burger-BurgerTopLine");
  const middleLine = document.getElementById("burger-BurgerMiddleLine");
  const bottomLine = document.getElementById("burger-BurgerBottomLine");
  const overlay = document.getElementById("burger-Overlay");
  const mobileNav = document.getElementById("burger-MobileNav");

  const toggleBurger = async () => {
    setOpen((current) => !current);
  };

  useEffect(() => {
    if (!closeTrigger) return;
    toggleBurger();
  }, [closeTrigger]);

  useEffect(() => {
    if (!topLine || !middleLine || !bottomLine || !overlay || !mobileNav)
      return;
    if (open) {
      topLine.style.transform = "translateY(6.5px) rotate(45deg)";
      middleLine.style.height = "0px";
      middleLine.style.width = "0px";
      bottomLine.style.transform = "translateY(-6px) rotate(-45deg)";
      overlay.style.opacity = "1";
      mobileNav.style.transform = "translateX(0%)";
    } else {
      topLine.style.transform = "translateY(0px) rotate(0deg)";
      middleLine.style.height = "4px";
      middleLine.style.width = "28px";
      bottomLine.style.transform = "translateY(0px) rotate(0deg)";
      overlay.style.opacity = "0";
      mobileNav.style.transform = "translateX(100%)";
    }
  }, [open]);

  return (
    <>
      <div
        className={`flex flex-col gap-1 z-50 cursor-pointer`}
        onClick={toggleBurger}
      >
        <figure
          id="burger-BurgerTopLine"
          className="transition-all duration-750 ease-in-out w-7 h-1 rounded-2xl bg-secondary"
        ></figure>
        <figure
          id="burger-BurgerMiddleLine"
          className="transition-all duration-750 ease-in-out w-7 h-1 rounded-2xl bg-secondary"
        ></figure>
        <figure
          id="burger-BurgerBottomLine"
          className="transition-all duration-750 ease-in-out w-7 h-1 rounded-2xl bg-secondary"
        ></figure>
      </div>
      <div
        id="burger-Overlay"
        className={`flex opacity-0 animated absolute top-0 left-0 w-screen h-screen bg-black/40 z-20 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onClick={toggleBurger}
      ></div>
      <nav
        id="burger-MobileNav"
        className={`transition-all duration-750 ease-in-out z-30 bg-antracite absolute flex h-screen top-0 right-0 max-w-[75%] min-w-[250px] p-4 items-end flex-col pt-20 ${
          !open && "translate-x-[100%]"
        }`}
      >
        {children}
      </nav>
    </>
  );
}
