import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticleById } from "../apis/article.api";
import Spinner from "../components/Spinner";
import { FaArrowLeft } from "react-icons/fa6";
import { TbFlameFilled } from "react-icons/tb";
import Title from "../components/Title";
import TitleThree from "../components/TitleThree";
import Button from "../components/Button";
import Stars from "../components/Stars";
import { AiOutlineShopping } from "react-icons/ai";
import Counter from "../components/Counter";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ArticleDetails() {
  const { addToCart } = useContext(CartContext);
  const [article, setArticle] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [nbArticle, setNbArticle] = useState(1);

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    const getDatas = async () => {
      const response = await getArticleById(id);
      if (response) setArticle(response);
      console.log(response);
    };
    getDatas();
  }, [id]);

  useEffect(() => {
    if (!article) return;
    const url = article.medias.find((im) => im.is_main === true).url;
    const idx = article.medias.indexOf(
      article.medias.find((im) => im.is_main === true)
    );
    setSelectedImg({ url, idx });
    console.log(idx);
  }, [article]);

  const changeImageIdx = (idx) => {
    setSelectedImg({ url: article.medias[idx].url, idx });
  };

  const addCarthandler = () => {
    addToCart(article, nbArticle);
  };
  return (
    <div className="min-h-screen w-full flex flex-col pt-[70px]">
      {article ? (
        <div className="w-full py-8 flex flex-col gap-8">
          {/* BACK */}
          <Link
            className="flex gap-2 opacity-70 items-center ml-[15%]"
            to={"/shop"}
          >
            <FaArrowLeft size={16} />
            <p>Revenir à la boutique</p>
          </Link>
          {/* DESC / IMAGE */}
          <div className="flex w-full flex-col lg:flex-row justify-center gap-8 px-[20%]">
            {/* IMG */}
            <div className="flex aspect-square min-w-[320px] rounded-2xl overflow-hidden relative">
              <img
                src={selectedImg?.url}
                alt={article.title}
                className="object-cover object-center"
              />
              {article.is_featured && (
                <div className="absolute top-4 left-4 bg-primary rounded flex gap-1 px-2 py-0.5 items-center text-white cursor-default z-20">
                  <TbFlameFilled size={18} />
                  <p className="font-semibold">En Vedette</p>
                </div>
              )}
              {selectedImg && article.medias.length > 1 && (
                <div className="absolute bottom-2 left-0 w-full  rounded flex gap-1 px-2 py-0.5 items-center justify-center text-white cursor-default z-20">
                  {article.medias.map((item, idx) => (
                    <figure
                      key={idx}
                      className={`w-3 h-3 rounded-[100%] cursor-pointer ${
                        selectedImg.idx === idx
                          ? "bg-primary border-primary-dark"
                          : "bg-gray-200 border-gray-400"
                      }  border-1  shadow-2xl`}
                      onClick={() => changeImageIdx(idx)}
                    ></figure>
                  ))}
                </div>
              )}
            </div>
            {/* DESC */}
            <div className="flex w-full full flex-col gap-2">
              <Title>{article.title}</Title>
              <Stars nb={article.stars} />
              <TitleThree>
                <span className="text-primary font-semibold">
                  {article.price} €
                </span>
              </TitleThree>
              <div className="w-full p-2.5">
                <p>{article.desc}</p>
              </div>
              <div className="flex gap-4">
                <Counter
                  value={nbArticle}
                  addToValue={() => setNbArticle((current) => current + 1)}
                  minusToValue={() => setNbArticle((current) => current - 1)}
                  setValue={setNbArticle}
                />
                <Button
                  isFull
                  colored
                  text="Ajouter au panier"
                  isWidthFull
                  icon={<AiOutlineShopping size={24} />}
                  stopPropagation
                  onClick={addCarthandler}
                />
              </div>
              <div className="w-full flex py-8">
                <hr className="w-full border-b-1 border-b-black/10 opacity-20" />
              </div>
              <div className="w-full flex-1 flex flex-col gap-2.5">
                <TitleThree>Détails du produit</TitleThree>
                <p className="opacity-80">Identifiant : {article._id}</p>
                <p className="opacity-80">Cartegorie : {article.type.name}</p>
                <p className="opacity-80">
                  En Stock : {article.stock > 0 ? "Oui" : "Rupture"}
                </p>
                <p className="opacity-80">
                  Livraison gratuite : Achat supérieur à 100€
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen w-full flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
}
