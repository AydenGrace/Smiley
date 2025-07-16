import React, {useEffect, useState} from "react";
import {
  FiBarChart2,
  FiShoppingBag,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import {getAllStats} from "../apis/stats.api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    const getDatas = async () => {
      setStats(await getAllStats());
    };
    getDatas();
  }, []);

  const getDifference = (oldData, newData) => {
    if (oldData > newData)
      return `-${Number(100 - (newData / oldData) * 100).toFixed(
        0
      )}% depuis le mois dernier`;
    if (oldData < newData)
      return `+${Number(((newData - oldData) / oldData) * 100).toFixed(
        0
      )}% depuis le mois dernier`;
  };
  return (
    <div className="flex w-full p-4 flex-col">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Statistiques</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <FiTrendingUp className="w-8 h-8 text-blue-600 mb-2" />
          <h3 className="text-lg font-semibold text-gray-800">Revenus</h3>
          <p className="text-2xl font-bold text-blue-600">
            {stats ? `${Number(stats.this_month.revenue).toFixed(2)} €` : "-"}
          </p>
          <p className="text-sm text-blue-600">
            {stats?.last_month.revenue
              ? getDifference(
                  Number(stats.last_month.revenue),
                  Number(stats.this_month.revenue)
                )
              : "Aucune donnée du mois précédent"}
          </p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <FiUsers className="w-8 h-8 text-green-600 mb-2" />
          <h3 className="text-lg font-semibold text-gray-800">Utilisateurs</h3>
          <p className="text-2xl font-bold text-green-600">
            {stats ? `${stats.this_month.nb_users}` : "-"}
          </p>
          <p className="text-sm text-green-600">
            {stats?.last_month.nb_users
              ? getDifference(
                  Number(stats.last_month.nb_users),
                  Number(stats.this_month.nb_users)
                )
              : "Aucune donnée du mois précédent"}
          </p>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg">
          <FiShoppingBag className="w-8 h-8 text-purple-600 mb-2" />
          <h3 className="text-lg font-semibold text-gray-800">Ventes</h3>
          <p className="text-2xl font-bold text-purple-600">
            {stats ? `${stats.this_month.nb_orders}` : "-"}
          </p>
          <p className="text-sm text-purple-600">
            {stats?.last_month.nb_orders
              ? getDifference(
                  Number(stats.last_month.nb_orders),
                  Number(stats.this_month.nb_orders)
                )
              : "Aucune donnée du mois précédent"}
          </p>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg">
          <FiBarChart2 className="w-8 h-8 text-yellow-600 mb-2" />
          <h3 className="text-lg font-semibold text-gray-800">
            Moy. du prix de vente
          </h3>
          <p className="text-2xl font-bold text-yellow-600">
            {stats
              ? `${Number(
                  stats.this_month.revenue / stats.this_month.nb_orders
                ).toFixed(2)} €`
              : "-"}
          </p>
          <p className="text-sm text-yellow-600">
            {stats?.last_month.nb_orders
              ? getDifference(
                  Number(stats.last_month.revenue / stats.last_month.nb_orders),
                  Number(stats.this_month.revenue / stats.this_month.nb_orders)
                )
              : "Aucune donnée du mois précédent"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Top Selling Products
          </h3>
          <div className="space-y-4">
            {[
              {name: "Wireless Earbuds", sales: 145, revenue: 21749.55},
              {name: "Classic White T-Shirt", sales: 125, revenue: 3123.75},
              {name: "Leather Crossbody Bag", sales: 98, revenue: 7839.02},
              {name: "Running Shoes", sales: 89, revenue: 10679.11},
              {name: "Analog Watch", sales: 76, revenue: 15199.24},
            ].map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-800">{product.name}</h4>
                  <p className="text-sm text-gray-500">{product.sales} sales</p>
                </div>
                <p className="font-medium text-gray-800">
                  ${product.revenue.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div> */}

        {/* <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Customer Demographics
          </h3>
          <div className="space-y-4">
            {[
              {age: "18-24", percentage: 15},
              {age: "25-34", percentage: 35},
              {age: "35-44", percentage: 25},
              {age: "45-54", percentage: 15},
              {age: "55+", percentage: 10},
            ].map((demographic, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{demographic.age}</span>
                  <span>{demographic.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#0C9619] h-2 rounded-full"
                    style={{width: `${demographic.percentage}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}
