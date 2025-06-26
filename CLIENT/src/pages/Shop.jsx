import React from "react";
import ShopCard from "../components/ShopCard";
import {Link, useLoaderData} from "react-router-dom";
import TitleTwo from "../components/TitleTwo";
import Button from "../components/Button";
import {BiRun} from "react-icons/bi";

export default function Shop() {
  const articles = useLoaderData();
  const featured = articles?.filter((art) => art.is_featured === true);

  return (
    <div className="flex flex-col p-4 w-full min-h-screen">
      <div className="w-full h-[70px]"></div>
      <h1 className="hidden">Boutique en ligne</h1>
      <section className="text-white rounded-[10px] w-full flex flex-col p-4 bg-gradient-to-r from-primary to-primary-dark ">
        <TitleTwo>Collection d'automne 2025</TitleTwo>
        <p>
          Découvrez nos derniers articles en dates pour cette magnifique saison
          !
        </p>
        <Link to={"/shop"} className="mt-4">
          <Button
            colored
            text="Découvrez nos articles"
            icon={<BiRun size={24} />}
          />
        </Link>
      </section>
      {featured.length && (
        <section className="w-full flex flex-col gap-2.5 my-4">
          <TitleTwo>
            Articles en{" "}
            <span className="text-primary font-semibold">Vedette</span>
          </TitleTwo>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {featured.map((article, idx) => (
              <ShopCard product={article} key={`Featured_${idx}`} />
            ))}
          </div>
        </section>
      )}
      <section className="w-full flex flex-col gap-2.5">
        <TitleTwo>
          Nos{" "}
          <span className="text-primary font-semibold">Produits Uniques</span>
        </TitleTwo>
        <p className="opacity-75">
          Voir <strong>{articles.length}</strong> articles
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {articles.map((article, idx) => (
            <ShopCard product={article} key={`Article_${idx}`} staticSize />
          ))}
        </div>
      </section>
    </div>
  );
}
