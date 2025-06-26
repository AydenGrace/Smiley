import React from "react";
import ShopCard from "../components/ShopCard";

export default function Shop() {
  return (
    <div className="flex flex-col p-4 w-full min-h-screen">
      <div className="w-full h-[70px]"></div>
      <ShopCard />
    </div>
  );
}
