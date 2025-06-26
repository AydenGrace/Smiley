import React from "react";

export default function FormPage({
  image = "https://gahtfyaqzgunbhepuitf.supabase.co/storage/v1/object/public/smiley//login.webp",
  children,
}) {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <section className="flex w-full items-center justify-center">
        {children}
      </section>
      <section
        className={`hidden sm:flex w-full items-center justify-center bg-cover bg-center min-h-screen`}
        style={{backgroundImage: `url("${image}")`}}
      ></section>
    </div>
  );
}
