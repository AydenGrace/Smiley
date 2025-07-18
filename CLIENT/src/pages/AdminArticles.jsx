import React, {useState} from "react";
import {Link, useLoaderData} from "react-router-dom";
import Button from "../components/Button";
import {FaPlus} from "react-icons/fa6";
import {CiSearch} from "react-icons/ci";
import {GoPencil, GoTrash} from "react-icons/go";
import {IoChevronDown} from "react-icons/io5";

export default function AdminArticles() {
  const products = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortName, setSortName] = useState(false);

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.type.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = filteredProducts.sort((a, b) =>
    sortName ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title)
  );

  const sortClick = () => {
    if (!sortName) {
      document.getElementById("chevron_name").style.transform =
        "rotate(180deg)";
    } else {
      document.getElementById("chevron_name").style.transform = "rotate(0deg)";
    }
    setSortName((current) => !current);
  };

  return (
    <div className="flex w-full p-4 flex-col gap-4">
      <div className="w-full flex justify-between items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Gestion des articles
        </h2>
        <Button
          colored
          isFull
          text="Ajouter un article"
          icon={<FaPlus size={24} />}
        />
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="!w-full !pl-10 !pr-4 !py-2 !border !border-gray-300 !rounded-lg !focus:ring-2 !focus:ring-[#0C9619] !focus:border-transparent"
        />
        <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className=" px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div
                  className="flex itmes-center gap-1 cursor-pointer"
                  onClick={sortClick}
                >
                  Article{" "}
                  <IoChevronDown
                    size={14}
                    id="chevron_name"
                    className="transition delay-150 duration-300 ease-in-out"
                  />
                </div>
              </th>
              <th className=" px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex itmes-center gap-1">
                  Catégorie
                  {/* <IoChevronDown size={14} /> */}
                </div>
              </th>
              <th className=" px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex itmes-center gap-1">
                  Prix
                  {/* <IoChevronDown size={14} /> */}
                </div>
              </th>
              <th className=" px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex itmes-center gap-1">
                  Mise en avant
                  {/* <IoChevronDown size={14} /> */}
                </div>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedProducts.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={product.medias.find((im) => im.is_main === true).url}
                      alt={product.title}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {product.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {product.desc.substring(0, 50)}...
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {product.type.name}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.price.toFixed(2)} €
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.is_featured ? (
                    <span className="text-green-600">Oui</span>
                  ) : (
                    <span className="text-gray-400">Non</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link to={`/manage-article/${product._id}`}>
                    <button
                      // onClick={() => handleEdit(product)}
                      className="text-indigo-600 hover:text-primary mr-4 cursor-pointer"
                    >
                      <GoPencil size={18} />
                    </button>
                  </Link>
                  <button
                    // onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-900 cursor-pointer"
                  >
                    <GoTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
