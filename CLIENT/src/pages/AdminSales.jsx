import React from "react";
import {Link, useLoaderData} from "react-router-dom";
import {IoChevronDown} from "react-icons/io5";

export default function AdminSales() {
  const sales = useLoaderData();
  console.log(sales);

  return (
    <div className="flex w-full p-4 flex-col gap-4">
      <div className="w-full flex justify-between items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Gestion des commandes
        </h2>
      </div>
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
              <div className="flex itmes-center gap-1 cursor-pointer">
                Commande
                {/* <IoChevronDown
                  size={14}
                  id="chevron_name"
                  className="transition delay-150 duration-300 ease-in-out"
                /> */}
              </div>
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
              <div className="flex itmes-center gap-1">Client</div>
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
              <div className="flex itmes-center gap-1">Date</div>
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
              <div className="flex itmes-center gap-1">Total</div>
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
              Status
            </th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sales.map((sale) => (
            <tr key={sale._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {sale?.code}
              </td>
              <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                {sale?.client.fullname}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(sale?.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {sale?.articles
                  ?.reduce(
                    (acc, cur) => Number(acc + cur.unit_price * cur.amount),
                    0
                  )
                  .toFixed(2)}{" "}
                €
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    sale.status.title === "Livré"
                      ? "bg-green-100 text-green-800"
                      : sale.status.title === "En attente" ||
                        sale.status.title === "En préparation"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {sale.status.title}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                <Link
                  to={`/manage-sales/${sale._id}`}
                  className="text-[#0C9619] hover:text-[#0A7F14] font-medium"
                >
                  Voir les détails
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
