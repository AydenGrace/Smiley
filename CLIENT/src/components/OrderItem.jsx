import React from "react";
import StatusItem from "./StatusItem";
import Button from "./Button";
import {IoChevronForward} from "react-icons/io5";
import {Link} from "react-router-dom";

export default function OrderItem({order}) {
  console.log(order);

  return (
    <article className="w-full p-4 flex gap-4 items-center">
      <div className="flex flex-col w-full">
        <h2 className="font-medium">Commande #{order.code}</h2>
        <p className="opacity-60">
          {new Date(order.createdAt).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="flex flex-col w-full items-end">
        <StatusItem status={order.status} />
        <p className="opacity-60">
          Total :{" "}
          {order.articles.reduce(
            (acc, cur) => Number(acc + cur.unit_price * cur.amount),
            0
          )}
          €
        </p>
      </div>
      <div>
        <Link to={`/order-details/${order._id}`}>
          <Button icon={<IoChevronForward size={24} />} isSquare text="" />
        </Link>
      </div>
    </article>
  );
}
