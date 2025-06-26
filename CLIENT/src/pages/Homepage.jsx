import React from "react";
import Title from "../components/Title";
import SubTitle from "../components/SubTitle";
import Button from "../components/Button";
import {HiOutlineChartPie} from "react-icons/hi2";
import {BiRun} from "react-icons/bi";

import ImagesRow from "../components/ImagesRow";
import TitleTwo from "../components/TitleTwo";
import BlogData from "../data/homepage/Blog.json";
import BlogCard from "../components/BlogCard";
import {FaChevronRight, FaCube} from "react-icons/fa";
import {Link} from "react-router-dom";

export default function Homepage() {
  const FirstRow = [
    {
      url: "https://gahtfyaqzgunbhepuitf.supabase.co/storage/v1/object/public/base//404-1.webp",
      alt: "Test",
    },
    {
      url: "https://gahtfyaqzgunbhepuitf.supabase.co/storage/v1/object/public/base//aurores.webp",
      alt: "Test",
    },
    {
      url: "https://gahtfyaqzgunbhepuitf.supabase.co/storage/v1/object/public/base//aventure.webp",
      alt: "Test",
    },
    {
      url: "https://gahtfyaqzgunbhepuitf.supabase.co/storage/v1/object/public/base//404-2.webp",
      alt: "Test",
    },
    {
      url: "https://gahtfyaqzgunbhepuitf.supabase.co/storage/v1/object/public/base//fun.webp",
      alt: "Test",
    },
    {
      url: "https://gahtfyaqzgunbhepuitf.supabase.co/storage/v1/object/public/base//famille.webp",
      alt: "Test",
    },
    {
      url: "https://gahtfyaqzgunbhepuitf.supabase.co/storage/v1/object/public/base//couple.webp",
      alt: "Test",
    },
    {
      url: "https://gahtfyaqzgunbhepuitf.supabase.co/storage/v1/object/public/base//event-about.webp",
      alt: "Test",
    },
  ];
  const SecondRow = [
    {
      url: "https://gahtfyaqzgunbhepuitf.supabase.co/storage/v1/object/public/base//famille.webp",
      alt: "Test",
    },
    {
      url: "https://gahtfyaqzgunbhepuitf.supabase.co/storage/v1/object/public/base//couple.webp",
      alt: "Test",
    },
    {
      url: "https://gahtfyaqzgunbhepuitf.supabase.co/storage/v1/object/public/base//event-about.webp",
      alt: "Test",
    },
    {
      url: "https://gahtfyaqzgunbhepuitf.supabase.co/storage/v1/object/public/base//genealogie.webp",
      alt: "Test",
    },
    {
      url: "https://gahtfyaqzgunbhepuitf.supabase.co/storage/v1/object/public/base//couple.webp",
      alt: "Test",
    },
    {
      url: "https://gahtfyaqzgunbhepuitf.supabase.co/storage/v1/object/public/base//aventure.webp",
      alt: "Test",
    },
    {
      url: "https://gahtfyaqzgunbhepuitf.supabase.co/storage/v1/object/public/base//404-2.webp",
      alt: "Test",
    },
    {
      url: "https://gahtfyaqzgunbhepuitf.supabase.co/storage/v1/object/public/base//fun.webp",
      alt: "Test",
    },
  ];
  return (
    <div className="flex flex-col w-full min-h-screen bg-bg">
      {/* LANDING SECTION */}
      <section className="flex flex-col overflow-x-hidden py-8 md:pt-[112px]  items-center gap-12 md:gap-[80px] justify-center">
        <div className="flex flex-col items-center gap-5 md:gap-8 md:max-w-1/2 px-5">
          <div className="flex flex-col items-center gap-5 md:gap-6 self-stretch text-center">
            <Title>
              Découvrez la joie avec{" "}
              <span className="text-primary font-semibold">Smiley</span>
            </Title>
            <SubTitle>
              Chez Smiley, nous croyons que chaque message compte. Explorez
              notre collection de cartes et d'emballages, tous fabriqués à
              partir de papier recyclé pour apporter bonheur et
              écoresponsabilité.
            </SubTitle>
          </div>
          <div className="flex w-full justify-center items-center gap-4">
            <Button isFull text="Explorer" />
            <Link to={"/about"}>
              <Button
                icon={<HiOutlineChartPie size={"24px"} />}
                text="En savoir plus"
              />
            </Link>
          </div>
        </div>
        <div className="w-full max-w-screen overflow-hidden flex flex-col gap-4 ">
          <div className="relative flex flex-col gap-4 w-full min-h-[205px] md:min-h-[300px] lg:min-h-[415px]">
            <ImagesRow images={FirstRow} left="-250px" />
          </div>
          <div className="relative flex flex-col gap-4 w-full min-h-[205px] md:min-h-[300px] lg:min-h-[415px]">
            <ImagesRow images={SecondRow} left="-50px" />
          </div>
        </div>
      </section>
      {/* END LANDING SECTION */}
      {/* BLOG SECTION */}
      <section className="w-full px-5 lg:px-16 py-8 md:py-14 flex flex-col items-start gap-[80px]">
        <div className="flex md:max-w-1/2">
          <TitleTwo>
            Des impressions{" "}
            <span className="text-primary font-semibold">écoresponsables</span>{" "}
            qui apportent joie et bonheur à chaque occasion.
          </TitleTwo>
        </div>
        <div className="flex flex-wrap w-full gap-12 justify-center">
          {BlogData.map((data, idx) => (
            <BlogCard
              btnText={data.btnText}
              desc={data.desc}
              img={data.img}
              key={`blog_${idx}`}
              title={data.title}
              url={data.url}
            />
          ))}
        </div>
      </section>
      <section className="w-full px-5 lg:px-16 py-8 md:py-14 flex flex-col md:flex-row items-center gap-[80px]">
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col w-full gap-6">
            <TitleTwo>
              Découvrez les avantages d'acheter chez{" "}
              <span className="text-primary font-semibold">Smiley </span> pour
              un monde meilleur.
            </TitleTwo>
            <p>
              En choisissant Smiley, vous soutenez des pratiques écologiques
              tout en répandant la joie. Nos produits en papier recyclé sont
              conçus pour apporter un sourire à chaque occasion.
            </p>
          </div>
          <div className="flex gap-6 w-full flex-col sm:flex-row">
            <article className="flex flex-col gap-4">
              <FaCube size={48} />
              <h3 className="text-xl">
                <strong>Écologique et Joyeux</strong>
              </h3>
              <p>
                Chaque achat contribue à un avenir durable et à la diffusion du
                bonheur.
              </p>
            </article>
            <article className="flex flex-col gap-4">
              <FaCube size={48} />
              <h3 className="text-xl">
                <strong>Soutenez la joie</strong>
              </h3>
              <p>
                Faites partie du changement en choisissant des produits qui font
                sourire.
              </p>
            </article>
          </div>
        </div>
        <div className="flex w-full h-[335px] md:h-[540px]">
          <img
            alt="Avantages avec Smiley"
            src="https://gahtfyaqzgunbhepuitf.supabase.co/storage/v1/object/public/smiley//avantages.webp"
            className="object-center object-cover"
          />
        </div>
      </section>
      <section className="w-full px-5 lg:px-16 py-8 md:py-14 flex flex-col md:flex-row items-center gap-[80px]">
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <p className="font-semibold">The joy of little attentions</p>
            <div className="flex flex-col w-full gap-6">
              <TitleTwo>
                Découvrez nos produits qui apportent de la{" "}
                <span className="text-primary font-semibold">joie</span>
              </TitleTwo>
              <p>
                Explorez notre sélection de cartes et d'emballages uniques,
                conçus pour transmettre des messages de bonheur. Chaque produit
                est fabriqué à partir de papier recyclé, alliant style et
                durabilité.
              </p>
            </div>
          </div>
          <div className="flex gap-6 w-full">
            <Link to={"/shop"}>
              <Button text="Acheter" colored icon={<BiRun size={"24px"} />} />
            </Link>
            <Link className="w-full flex gap-2 items-center" to={"/about"}>
              <p className="font-medium">En savoir plus</p>
              <FaChevronRight size={16} />
            </Link>
          </div>
        </div>
        <div className="flex w-full h-[335px] md:h-[540px]">
          <img
            alt="Avantages avec Smiley"
            src="https://gahtfyaqzgunbhepuitf.supabase.co/storage/v1/object/public/smiley//produits_gifts.webp"
            className="object-center object-cover"
          />
        </div>
      </section>
      <section className="w-full px-5 lg:px-16 py-8 md:py-14 flex flex-col md:flex-row items-center gap-[80px]">
        <article className="w-full flex flex-col gap-6">
          <TitleTwo>
            Restez informé avec{" "}
            <span className="text-primary font-semibold">Smiley</span>
          </TitleTwo>
          <p>Recevez des nouvelles et des offres exclusives.</p>
        </article>
        <article className="w-full flex flex-col gap-6">
          <div className="w-full flex gap-4">
            <input
              type="text"
              className="w-full max-w-[335px]"
              placeholder="Votre adresse email"
            />
            <Button isFull text="S'inscrire" />
          </div>
          <p>
            En cliquant sur S'inscrire, vous acceptez nos{" "}
            <Link
              className="text-primary cursor-pointer underline"
              to={"/privacy"}
            >
              Conditions Générales
            </Link>
            .
          </p>
        </article>
      </section>
      <section className="w-full bg-cover bg-center bg-no-repeat bg-[url('https://gahtfyaqzgunbhepuitf.supabase.co/storage/v1/object/public/smiley//discover.webp')]">
        <div className="w-full px-5 lg:px-16 py-8 md:py-14 flex flex-col md:flex-row items-center gap-[80px] bg-[rgba(0,0,0,0.5)]">
          <div className="w-full md:w-1/2 flex flex-col gap-8">
            <div className="w-full flex flex-col gap-6">
              <TitleTwo>
                <span className="text-white">
                  Découvrez nos produits joyeux
                </span>
              </TitleTwo>
              <p className="text-white">
                Visitez notre page pour explorer des impressions qui apportent
                joie et bonheur à votre quotidien.
              </p>
            </div>
            <div className="w-full gap-4 flex">
              <Link to={"/shop"}>
                <Button text="Acheter" icon={<BiRun size={"24px"} />} isFull />
              </Link>
              <Link to={"/shop"}>
                <Button text="Explorer" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
