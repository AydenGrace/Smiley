import React from "react";
import {useEffect} from "react";
import {useState} from "react";
import {MdOutlineErrorOutline} from "react-icons/md";
import {Link, useParams} from "react-router-dom";
import {cancelOrder} from "../apis/order.api";
import TitleTwo from "../components/TitleTwo";
import Button from "../components/Button";
import {AiOutlineLoading} from "react-icons/ai";

export default function OrderCancel() {
  const [isLoading, setIsLoading] = useState(false);
  const {id} = useParams();

  useEffect(() => {
    const cancel = async () => {
      setIsLoading(true);
      const response = await cancelOrder(id);
      if (response?.message) {
        console.log(response.message);
        toast.error(response.message);
      }
      setIsLoading(false);
    };
    cancel();
  }, []);
  return (
    <div className="w-full min-h-screen flex justify-center items-center px-[20%]">
      <div className="flex flex-col items-center justify-center p-4 rounded-2xl shadow-2xl bg-white gap-4 w-full max-w-[600px] text-center">
        {isLoading ? (
          <div className="text-primary animate-spin">
            <AiOutlineLoading size={56} />
          </div>
        ) : (
          <>
            <div className="text-red-700">
              <MdOutlineErrorOutline size={56} />
            </div>
            <TitleTwo>
              Commande <span className="font-medium text-red-600">Annulée</span>{" "}
              !
            </TitleTwo>
            <p>
              Une erreur est malheureusement survenue. Votre commande a été
              annulée et votre compte n'a pas été débité. Nous nous excusons de
              la gêne occasionnée !
            </p>
            <Link to={"/"}>
              <Button colored isFull text="Revenir à l'accueil" />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
