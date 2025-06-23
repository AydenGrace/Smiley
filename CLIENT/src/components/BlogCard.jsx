import React from "react";
import {FaChevronRight} from "react-icons/fa";
import {Link} from "react-router-dom";

export default function BlogCard({
  img = "https://gahtfyaqzgunbhepuitf.supabase.co/storage/v1/object/public/smiley//blog_1.webp",
  title = "Des designs uniques qui font sourire et illuminent votre quotidien.",
  desc = "Chaque produit est fabriqué à partir de papier recyclé, respectueux de l'environnement.",
  btnText = "Découvrir",
  url = "/",
}) {
  return (
    <article className="w-full min-w-[335px] sm:w-1/3 max-w-[405px] flex flex-col">
      <div className="w-full flex h-[240px]">
        <img src={img} alt={title} className="object-center object-cover" />
      </div>
      <div className="w-full flex flex-col gap-6">
        <div className="flex flex-col gap-3 w-full">
          <h3 className="text-xl">
            <strong>{title}</strong>
          </h3>
          <p>{desc}</p>
        </div>
        <Link className="w-full flex gap-2 items-center" to={url}>
          <p className="font-medium">{btnText}</p>
          <FaChevronRight size={16} />
        </Link>
      </div>
    </article>
  );
}
