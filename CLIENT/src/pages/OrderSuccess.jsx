import React from "react";
import {GrValidate} from "react-icons/gr";
import TitleTwo from "../components/TitleTwo";
import {Link, useNavigate, useParams} from "react-router-dom";
import Button from "../components/Button";
import {useEffect} from "react";
import {useState} from "react";
import {AiOutlineLoading} from "react-icons/ai";
import {validateOrder} from "../apis/order.api";
import toast from "react-hot-toast";
import {useContext} from "react";
import {CartContext} from "../context/CartContext";

export default function OrderSuccess() {
  const {reset} = useContext(CartContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {id} = useParams();

  useEffect(() => {
    const validate = async () => {
      setIsLoading(true);
      const response = await validateOrder(id);
      if (response?.message) {
        console.log(response.message);
        toast.error(response.message);
        navigate(`/order-failed/${id}`);
      }
      reset();
      setIsLoading(false);
    };
    validate();
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
            <div className="text-primary">
              <GrValidate size={56} />
            </div>
            <TitleTwo>
              Commande <span className="font-medium text-primary">Validée</span>{" "}
              !
            </TitleTwo>
            <p>
              Votre commande est en cours de traitement par nos services. Nous
              vous remercions de nous faire confiance !
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
