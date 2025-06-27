import React from "react";
import {IoBagOutline} from "react-icons/io5";
import {useLoaderData} from "react-router-dom";

export default function AccountOrders() {
  const orders = useLoaderData();
  return (
    <div className="w-full">
      {orders && orders.length ? (
        <></>
      ) : (
        <div className="w-full flex flex-col items-center justify-center py-10">
          <div className=" opacity-40">
            <IoBagOutline size={50} />
          </div>
          <p className=" opacity-60">Votre liste de commandes est vide.</p>
        </div>
      )}
    </div>
  );
}
