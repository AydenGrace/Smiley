import React, {useEffect, useState} from "react";

import {useNavigate} from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa6";
import {GoPencil, GoTrash} from "react-icons/go";

import {useParams} from "react-router-dom";
import {getOrderDetails} from "../apis/order.api";
import Input from "../components/Input";
import {CiSaveDown1} from "react-icons/ci";
import {getAllStatus} from "../apis/status.api";
import CartItem from "../components/CartItem";
import OrderTracking from "../components/OrderTracking";

export default function AdminSaleDetails() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState([]);
  const [cmd, setCmd] = useState({});

  useEffect(() => {
    const getDatas = async () => {
      if (!id) return;

      const response = await getOrderDetails(id);
      console.log(response);
      setCmd(response);
      const responseStatus = await getAllStatus();
      console.log(responseStatus);
      setStatus(responseStatus);
    };
    getDatas();
  }, [id]);

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleChange = (elem, value) => {
    if (elem === "status")
      return setCmd((prev) => ({
        ...prev,
        status: status.find((stat) => stat.title === value),
      }));
    if (elem === "delivery_code")
      return setCmd((prev) => ({
        ...prev,
        delivery_code: value,
      }));
  };

  return (
    <div className="w-full min-h-screen pt-[77px]">
      <div className="p-4 flex flex-col w-full">
        <section className="flex p-4 flex-col shadow-xl bg-white rounded-[10px] w-full overflow-hidden">
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate("/admin/sales")}
              className="text-gray-600 hover:text-[#0C9619] flex items-center gap-2 cursor-pointer"
            >
              <FaArrowLeft size={16} />
              Revenir aux commandes
            </button>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center bg-[#0C9619] text-white px-4 py-2 rounded-lg hover:bg-[#0A7F14]"
              >
                <GoPencil className="w-4 h-4 mr-2" />
                Modifier
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="flex items-center bg-[#0C9619] text-white px-4 py-2 rounded-lg hover:bg-[#0A7F14]"
              >
                <CiSaveDown1 className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            )}
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between">
              <h1 className="text-2xl font-semibold text-gray-800 ">
                Commande #{cmd.code}
              </h1>
              <div className="text-right">
                {isEditing ? (
                  <select
                    value={cmd.status?.title}
                    onChange={(e) => handleChange("status", e.target.value)}
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#0C9619] focus:border-transparent"
                  >
                    {status?.map((item) => (
                      <option value={item.title} key={item._id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      cmd?.status?.title === "Livré"
                        ? "bg-green-100 text-green-800"
                        : cmd?.status?.title === "En attente" ||
                          cmd?.status?.title === "En préparation"
                        ? "bg-yellow-100 text-yellow-800"
                        : cmd?.status?.title === "Annulée"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {cmd.status?.title}
                  </span>
                )}
              </div>
            </div>

            <p className="text-gray-600">
              Réalisée le {new Date(cmd.createdAt).toLocaleDateString()} à{" "}
              {new Date(cmd.createdAt).toLocaleTimeString()}
            </p>
            <div className="w-full text-right">
              <p className="text-lg font-semibold text-gray-800">
                Total:{" "}
                {cmd?.articles
                  ?.reduce(
                    (acc, cur) => Number(acc + cur.unit_price * cur.amount),
                    0
                  )
                  .toFixed(2)}{" "}
                €
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Informations du Client
                </h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium text-gray-800">
                    {cmd?.client?.fullname}
                  </p>
                  <p className="text-gray-600">{cmd?.client?.email}</p>
                </div>
              </div>

              <div></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Addresse de facturation
                </h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-600">
                    {cmd?.address_billing?.street}
                  </p>
                  <p className="text-gray-600">
                    {cmd?.address_billing?.city},{" "}
                    {cmd?.address_billing?.zipCode}
                  </p>
                  <p className="text-gray-600">
                    {cmd?.address_billing?.country}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Addresse de livraison
                </h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-600">
                    {cmd?.address_delivery?.street}
                  </p>
                  <p className="text-gray-600">
                    {cmd?.address_delivery?.city},{" "}
                    {cmd?.address_delivery?.zipCode}
                  </p>
                  <p className="text-gray-600">
                    {cmd?.address_delivery?.country}
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <Input
                label={"Code de livraison"}
                defautlValue={cmd?.delivery_code ? cmd.delivery_code : ""}
                getValueOnChange={(e) => handleChange("delivery_code", e)}
                type="text"
              />
            </div>

            <div className="w-full flex flex-col bg-white ">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Contenu de la Commande
              </h2>
              {cmd?.articles?.map((article, idx) => (
                <CartItem
                  cartItem={article}
                  key={`Cart_${idx}`}
                  isAlreadyOrdered
                />
              ))}
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mt-4">
              Historique
            </h2>
            <OrderTracking histories={cmd?.histories} />
          </div>
        </section>
      </div>
    </div>
  );
}
