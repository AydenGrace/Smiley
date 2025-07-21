import React, {useEffect, useState} from "react";
import {GoTrash} from "react-icons/go";
import {FaArrowLeft} from "react-icons/fa6";
import Button from "../components/Button";
import {useNavigate} from "react-router-dom";
import {
  getArticleById,
  getTypes,
  postArticle,
  updateArticle,
} from "../apis/article.api";
import {useParams} from "react-router-dom";
import {FaPlus, FaStar} from "react-icons/fa6";
import {RxCross2} from "react-icons/rx";
import {CiSaveDown2} from "react-icons/ci";
import toast from "react-hot-toast";

export default function AdminArticleDetails() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [types, setTypes] = useState([]);

  const [product, setProduct] = useState({
    title: "Titre de l'article",
    desc: "Ceci est une description",
    price: 0,
    stock: 0,
    is_show: true,
    type: !id && types.length ? types[0] : null,
    is_featured: false,
    medias: [],
  });

  useEffect(() => {
    const getDatas = async () => {
      setTypes(await getTypes());
      if (!id) return;

      let response = await getArticleById(id);
      console.log(response);
      if (response) setProduct(response);
    };
    getDatas();
  }, [id]);

  useEffect(() => {
    if (!types.length) return;
    if (!product.type) setProduct((prev) => ({...prev, type: types[0]}));
  }, [types]);

  const [newImageUrl, setNewImageUrl] = useState("");

  const handleInputChange = (e) => {
    const {name, value} = e.target;

    if (name === "name") return setProduct((prev) => ({...prev, title: value}));
    if (name === "description")
      return setProduct((prev) => ({...prev, desc: value}));
    if (name === "price")
      return setProduct((prev) => ({...prev, price: Number(value)}));
    if (name === "stock")
      return setProduct((prev) => ({...prev, stock: Number(value)}));
    if (name === "featured")
      return setProduct((prev) => ({
        ...prev,
        is_featured: Number(e.target.checked),
      }));
    if (name === "category")
      return setProduct((prev) => ({
        ...prev,
        type: types.find((type) => type.name === value),
      }));
  };

  const handleAddImage = () => {
    setProduct((prev) => ({
      ...prev,
      medias: [...prev.medias, {url: newImageUrl, is_main: false}],
    }));
    setNewImageUrl("");
  };

  const handleRemoveImage = (image) => {
    console.log(image);
    let tmpMedias = product.medias.filter((item) => item !== image);
    if (image.is_main && tmpMedias.length) {
      tmpMedias[0].is_main = true;
    }

    setProduct((prev) => ({
      ...prev,
      medias: tmpMedias,
    }));
  };

  const handleSetMainImage = (image) => {
    let imagesTmp = [...product.medias];
    console.log(imagesTmp);
    imagesTmp.map((img) => {
      if (img === image) img.is_main = true;
      else img.is_main = false;
    });
    console.log(imagesTmp);
    setProduct((prev) => ({...prev, medias: imagesTmp}));
  };

  const handleDelete = () => {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!id) {
        const response = await postArticle(product);
        if (response.message) {
          toast.error(response.message);
        } else {
          toast.success("Article enregistré.");
          navigate(`${response._id}`);
        }
      } else {
        await updateArticle(product);
        toast.success("Article mit à jour.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full min-h-screen pt-[77px]">
      <div className="p-4 flex flex-col w-full">
        <section className="flex p-4 flex-col shadow-xl bg-white rounded-[10px] w-full overflow-hidden">
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate("/admin/articles")}
              className="text-gray-600 hover:text-[#0C9619] flex items-center gap-2 cursor-pointer"
            >
              <FaArrowLeft size={16} />
              Revenir aux articles
            </button>
            {id && (
              <Button
                onClick={handleDelete}
                colored
                defaultColor={"#dc2626"}
                text="Supprimer l'article"
                icon={<GoTrash size={20} />}
              />
            )}
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Modifications de l'article
            </h2>

            {product && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Nom de l'article
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={product?.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0C9619] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Prix</label>
                    <input
                      type="number"
                      name="price"
                      value={product?.price}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0C9619] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">
                      Catégorie
                    </label>
                    <select
                      name="category"
                      value={product?.type?.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0C9619] focus:border-transparent"
                      required
                    >
                      {types.map((type, idx) => (
                        <option value={type.name} key={type.name}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Stock</label>
                    <input
                      type="number"
                      name="stock"
                      value={product?.stock}
                      onChange={handleInputChange}
                      step="1"
                      min="0"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0C9619] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">
                      Ajouter une image
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0C9619] focus:border-transparent"
                        placeholder="Lien de l'image"
                      />
                      <button
                        type="button"
                        onClick={handleAddImage}
                        className="bg-[#0C9619] text-white px-4 py-2 rounded-lg hover:bg-[#0A7F14] transition-colors duration-300"
                      >
                        <FaPlus size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2">
                      Images de l'article
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                      {product?.medias?.map((imageUrl, index) => (
                        <div key={index} className="group relative group">
                          <img
                            src={imageUrl?.url}
                            alt={`Product ${index + 1}`}
                            className={`w-full h-32 object-cover rounded-lg ${
                              imageUrl?.is_main ? "ring-2 ring-primary" : ""
                            }`}
                          />
                          {imageUrl?.is_main && (
                            <>
                              <div className="absolute flex flex-1 p-2 justify-end w-full h-full z-10 bg-radial from-primary/0 from-70% to-primary top-0 rounded-lg group-hover:hidden">
                                <div className="bg-white text-primary p-1 rounded-full transition-colors h-fit w-fit cursor-pointer">
                                  <FaStar size={16} />
                                </div>
                              </div>
                            </>
                          )}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center space-x-2">
                            <button
                              type="button"
                              onClick={() => handleSetMainImage(imageUrl)}
                              className="bg-white text-[#0C9619] p-1 rounded-full hover:bg-[#0C9619] hover:text-white transition-colors duration-300 cursor-pointer"
                            >
                              <FaStar size={16} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(imageUrl)}
                              className="bg-white text-red-600 p-1 rounded-full hover:bg-red-600 hover:text-white transition-colors duration-300 cursor-pointer"
                            >
                              <RxCross2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={product?.desc}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0C9619] focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="md:col-span-2 ">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={product?.is_featured}
                        onChange={handleInputChange}
                        className="rounded text-[#0C9619] focus:ring-[#0C9619] cursor-pointer"
                      />
                      <span className="text-gray-700">Mise en avant</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#0C9619] text-white px-6 py-2 rounded-lg hover:bg-[#0A7F14] transition-colors duration-300 flex items-center gap-2 cursor-pointer"
                  >
                    <CiSaveDown2 size={20} />
                    Enregistrer les modifications
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Preview
            </h3>
            <div className="flex items-center space-x-6">
              <img
                src={
                  product?.medias.find((im) => im.is_main === true)?.url ||
                  "https://citygem.app/wp-content/uploads/2024/08/placeholder-1-1.png"
                }
                alt={product?.title}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div>
                <h4 className="text-lg font-medium text-gray-800">
                  {product?.title}
                </h4>
                <p className="text-[#0C9619] font-semibold">
                  {product?.price.toFixed(2)} €
                </p>
                <p className="text-gray-600 mt-2">{product?.desc}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
