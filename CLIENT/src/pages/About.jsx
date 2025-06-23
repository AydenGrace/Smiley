import React from "react";
import {
  LuLeaf,
  LuRecycle,
  LuShield,
  LuTruck,
  LuUsers,
  LuHeart,
} from "react-icons/lu";
import {Link} from "react-router-dom";
import Button from "../components/Button";

export default function About() {
  const values = [
    {
      icon: <LuLeaf className="w-6 h-6 text-primary" />,
      title: "Produits Durables",
      description:
        "Nous sélectionnons soigneusement des produits écologiques qui minimisent l’impact environnemental.",
    },
    {
      icon: <LuRecycle className="w-6 h-6 text-primary" />,
      title: "Économie Circulaire",
      description:
        "Soutenir les marques qui adoptent des pratiques de recyclage et de fabrication durables.",
    },
    {
      icon: <LuShield className="w-6 h-6 text-primary" />,
      title: "Assurance Qualité",
      description:
        "Chaque produit répond à nos normes strictes de qualité et de durabilité.",
    },
    {
      icon: <LuTruck className="w-6 h-6 text-primary" />,
      title: "Expédition faible en Carbone",
      description:
        "Nous compensons nos émissions de livraison grâce à des programmes de compensation carbone vérifiés.",
    },
    {
      icon: <LuUsers className="w-6 h-6 text-primary" />,
      title: "Focus sur la Communauté",
      description:
        "Soutenir les artisans locaux et les fabricants durables du monde entier.",
    },
    {
      icon: <LuHeart className="w-6 h-6 text-primary" />,
      title: "Service Client",
      description:
        "Assistance 24h/24 et 7j/7 et retours sans tracas pour votre tranquillité d'esprit.",
    },
  ];

  const stats = [
    {value: "50K+", label: "Clients heureux"},
    {value: "1000+", label: "Articles différents"},
    {value: "25+", label: "Pays livrables"},
    {value: "100%", label: "Recyclé"},
  ];
  return (
    <div className="flex-grow pt-[70px]">
      {/* Hero Section */}
      <div className="relative bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Notre Mission
            </h1>
            <p className="text-xl opacity-90">
              Offrir une boutique du sourire accessible à tous tout en
              protégeant notre planète pour les générations futures.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Notre Histoire{" "}
            </h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p className="mb-4">
                Au fur et à mesure des années, les membres de Risus ont remarqué
                un constat assez triste : le peuple ne sourit presque plus.
                C’est avec cette idée en tête qu’ils ont lancé le projet{" "}
                <span className="text-primary  font-semibold">Smiley </span>
                en 2025 avec pour but de redonner un peu de couleur dans cette
                société en clair obscur.
              </p>
              <p className="mb-4">
                L’idée est posée : Trouver un moyen de redonner le{" "}
                <span className="text-primary  font-semibold">sourire </span>
                aux personnes.. Mais comment ? Après plusieurs mois de
                réflexions, une proposition est ressortie du lot. Pourquoi ne
                pas juste créer des éléments à partager avec un message
                attendrissant ? Le premier article de{" "}
                <span className="text-primary font-semibold">Smiley </span>
                était sur les rails.
              </p>
              <p>
                En plus de vouloir ensoleiller le quotidien, les membres de
                Smiley ont une autre valeur à coeur : l’écologie. Produire des
                cartes ou d’autres articles polluent notre atmosphère, mais
                stocker des articles numériques dans des serveurs n’est pas
                spécialement mieux. C’est pourquoi nous avons revu notre idée de
                base afin de la faire évoluer. Maintenant ce ne seront plus que
                de simples cartes ou packagings, mais des cartes entièrement
                <span className="text-primary  font-semibold">
                  recyclées{" "}
                </span>{" "}
                et des emballages{" "}
                <span className="text-primary  font-semibold">
                  réutilisables{" "}
                </span>{" "}
                !
              </p>
              <p>
                Notre planète est notre foyer et c’est à nous de lui offrir un{" "}
                <span className="text-primary  font-semibold">sourire </span>{" "}
                sincère.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Nos Valeurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="inline-block p-3 bg-primary/10 bg-opacity-10 rounded-full mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center justify-center items-center flex flex-col">
          <h2 className="text-3xl font-bold mb-6">Rejoignez notre combat</h2>
          <p className="text-xl mb-8 opacity-90">
            Faites partie de la révolution du shopping durable.
          </p>
          <Link to={"/shop"}>
            <Button text="Voir la Boutique" />
          </Link>
        </div>
      </div>
    </div>
  );
}
