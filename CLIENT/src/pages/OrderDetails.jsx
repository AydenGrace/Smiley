import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {getMyOrderDetails} from "../apis/order.api";
import {FaArrowLeft} from "react-icons/fa6";
import TitleThree from "../components/TitleThree";
import {AiOutlineLoading} from "react-icons/ai";
import Button from "../components/Button";
import {CiWarning} from "react-icons/ci";
import CartItem from "../components/CartItem";
import OrderTracking from "../components/OrderTracking";

export default function OrderDetails() {
  const {id} = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getDatas = async () => {
      const response = await getMyOrderDetails(id);
      console.log(response.order);
      setOrder(response.order);
      setIsLoading(false);
    };
    getDatas();
  }, []);
  return (
    <div className="w-full min-h-screen flex px-4 md:px-[10%] lg:px-[20%]">
      {isLoading ? (
        <div className="flex w-full min-h-screen justify-center items-center">
          <div className="text-primary ">
            <AiOutlineLoading size={56} className="animate-spin" />
          </div>
        </div>
      ) : (
        <div className=" flex flex-col w-full gap-4 pt-[109px] pb-[32px]">
          {/* BACK TO PROFILE */}
          <Link
            to={"/profile"}
            className="gap-2 opacity-70 w-fit flex items-center"
          >
            <FaArrowLeft size={16} />
            <p>Revenir aux commandes</p>
          </Link>
          {/* CART */}
          <section className="bg-white shadow-xl rounded-2xl flex flex-col w-full overflow-hidden">
            {/* TITLE & BTN */}
            <div className="flex p-4 w-full justify-center sm:justify-between items-center border-b-2 border-b-black/20 flex-wrap">
              <div className="flex flex-col">
                <h1 className="text-xl sm:text-2xl font-medium">
                  <span className="font-semibold text-primary">Commande</span> #
                  {order.code}
                </h1>
                <p className="opacity-60">
                  {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <Link to={"/contact"}>
                <Button
                  colored
                  defaultColor={"#dc2626"}
                  text="Signaler un problème"
                  icon={<CiWarning size={24} />}
                />
              </Link>
            </div>
            {/* CART */}
            <div className="w-full flex flex-col bg-white border-b-2 border-b-black/20">
              {order.articles.map((article, idx) => (
                <CartItem
                  cartItem={article}
                  key={`Cart_${idx}`}
                  isAlreadyOrdered
                />
              ))}
            </div>
            {/* TOTAL */}
            <div className="w-full p-4 justify-between flex">
              <p className="font-semibold text-xl">Total</p>
              <p className="text-primary font-semibold text-xl">
                {order.articles.reduce(
                  (acc, cur) => Number(acc + cur.article.price * cur.amount),
                  0
                )}{" "}
                €
              </p>
            </div>
          </section>
          {/* ADDRESSES */}
          <section className="flex w-full justify-between flex-wrap">
            <div className="flex flex-col gap-2.5 w-fit">
              <h2 className=" text-2xl ">
                Adresse de{" "}
                <span className="text-primary font-semibold">Livraison</span>
              </h2>
              <div className="flex flex-col opacity-70">
                <p>{order.address_delivery.street}</p>
                <p>
                  {order.address_delivery.city},{" "}
                  {order.address_delivery.zip_code}
                </p>
                <p>{order.address_delivery.country}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2.5 w-fit">
              <h2 className=" text-2xl ">
                Adresse de{" "}
                <span className="text-primary font-semibold">Facturation</span>
              </h2>
              <div className="flex flex-col opacity-70">
                <p>{order.address_billing.street}</p>
                <p>
                  {order.address_billing.city}, {order.address_billing.zip_code}
                </p>
                <p>{order.address_billing.country}</p>
              </div>
            </div>
          </section>
          {/* TRACKING */}
          <section className="w-full flex flex-col gap-1">
            <h2 className=" text-2xl ">
              <span className="text-primary font-semibold">Suivi</span> de
              Commande
            </h2>
            {order.delivery_code ? (
              <>
                {" "}
                <div className="flex gap-2.5">
                  <p className="font-medium">Numéro de colis</p>
                </div>
              </>
            ) : (
              <></>
            )}
            <OrderTracking histories={order.histories} />
          </section>
        </div>
      )}
    </div>
  );
}
