import React from "react";
import Title from "../components/Title";
import SubTitle from "../components/SubTitle";
import Button from "../components/Button";
import {HiOutlineChartPie} from "react-icons/hi2";
import ImagesRow from "../components/ImagesRow";

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
      <section className="flex flex-col overflow-x-hidden py-[112px] items-center gap-[80px] justify-center">
        <div className="flex flex-col items-center gap-8 max-w-1/2">
          <div className="flex flex-col items-center gap-6 self-stretch text-center">
            <Title>
              Découvrez la joie avec{" "}
              <span className="text-primary">Smiley</span>
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
            <Button
              icon={<HiOutlineChartPie size={"24px"} />}
              text="En savoir plus"
            />
          </div>
        </div>
        <div className="w-full max-w-screen overflow-hidden flex flex-col gap-4 ">
          <div className="relative flex flex-col gap-4 w-full min-h-[205px]md:min-h-[300px] lg:min-h-[415px]">
            <ImagesRow images={FirstRow} left="-250px" />
          </div>
          <div className="relative flex flex-col gap-4 w-full min-h-[205px]md:min-h-[300px] lg:min-h-[415px]">
            <ImagesRow images={SecondRow} left="-50px" />
          </div>
        </div>
      </section>
    </div>
  );
}
