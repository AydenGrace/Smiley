import React from "react";
import Title from "../components/Title";
import TitleTwo from "../components/TitleTwo";

export default function Privacy() {
  return (
    <div className="w-full flex flex-col p-4 pt-[112px] items-center gap-8">
      <Title>
        <span className="text-primary">Politique de confidentialité</span>
      </Title>

      <section className="w-full flex flex-col gap-4">
        <TitleTwo>
          <span className="text-primary">Identité du site Web</span>
        </TitleTwo>
        <div className="flex flex-col w-full">
          <p>
            <strong>Nom :</strong>  Smiley by Risus
          </p>
          <p>
            <strong>Adresse :</strong>   Rue de l’université, Verquigneul,
            France
          </p>
          <p>
            <strong>Adresse en ligne :</strong>  www.smiley-by-risus.fr
          </p>
          <p>
            <strong>Catégorie de site web :</strong>  E-Commerce
          </p>
        </div>
      </section>

      <section className="w-full flex flex-col gap-4">
        <TitleTwo>
          <span className="text-primary">
            Le but de cette politique de confidentialité
          </span>
        </TitleTwo>
        <div className="flex flex-col w-full">
          <p>
            Le but de cette politique de confidentialité est d’informer les
            utilisateurs de notre site des données personnelles que nous
            recueillerons ainsi que les informations suivantes, le cas échéant :
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>Les données personnelles que nous recueillerons</li>
            <li>L’utilisation des données recueillies</li>
            <li>Qui a accès aux données recueillies</li>
            <li>Les droits des utilisateurs du site</li>
            <li>La politique de cookies du site</li>
          </ul>
          <p>
            Cette politique de confidentialité fonctionne parallèlement aux
            conditions générales d’utilisation de notre site.
          </p>
        </div>
      </section>

      <section className="w-full flex flex-col gap-4">
        <TitleTwo>
          <span className="text-primary">Lois applicables</span>
        </TitleTwo>
        <div className="flex flex-col w-full">
          <p>
            Conformément aux Règlement Général sur la{" "}
            <span className="italic">Protection des Données</span>(RGPD), cette
            politique de confidentialité est conforme aux règlements suivants.
            Les données à caractère personnel doivent être :
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>
              Traités de manière licite, loyale et transparente au regard de la
              personne concernée (licéité, loyauté, transparence) ;
            </li>
            <li>
              Collectées pour finalités déterminées, explicites et légitimes, et
              ne pas être traitées ultérieurement d’une manière incompatible
              avec ces finalités ; le traitement ultérieur à des fins
              archivistiques dans l’intérêt public, à des fins de recherche
              scientifique ou historique ou à des fins statistiques n’est pas
              considéré, conformément à l’article 89, paragraphe 1, comme
              incompatible avec les finalités initiales (limitation des
              finalités) ;
            </li>
            <li>
              Adéquates, pertinentes et limitées à ce qui est nécessaire au
              regard des finalités pour lesquelles elles sont traitées
              (minimisation des données) ;
            </li>
            <li>
              Exactes et, si nécessaire, tenues à jour ; toutes les mesures
              raisonnables doivent être prises pour que les données à caractère
              personnel qui sont inexactes, eu égard aux finalités pour
              lesquelles elles sont traitées, soient effacées ou rectifiées sans
              tarder (exactitude) ;
            </li>
            <li>
              Conservées sous une forme permettant l’identification des
              personnes concernées pendant une durée n’excédant pas celle
              nécessaire au regard des finalités pour lesquelles elles sont
              traitées ; les données à caractère personnel peuvent être
              conservées pour des durées plus longues dans la mesure où elles
              seront traitées exclusivement à des fins archivistiques dans
              l’intérêt public, à des fins de recherche scientifique ou
              historique ou à des fins statistiques conformément à l’article 89,
              paragraphe 1, pour autant que soient mises en œuvre les mesures
              techniques et organisationnelles appropriées requises par le
              règlement afin de garantir les droits et libertés de la personne
              concernée (limitation de la conservation) ;
            </li>
            <li>
              Traitées de façon à garantir une sécurité appropriée des données à
              caractère personnel, y compris la protection contre le traitement
              non autorisé ou illicite et contre la perte, la destruction ou les
              dégâts d’origine accidentelle, à l’aide de mesures techniques ou
              organisationnelles appropriées (intégrité et confidentialité).
            </li>
          </ul>{" "}
          <p>
            Le traitement n’est licite que si, et dans la mesure où, au moins
            une des conditions suivantes est remplie :
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>
              La personne concernée à consenti au traitement de ses données à
              caractère personnel pour une ou plusieurs finalités spécifiques ;
            </li>
            <li>
              Le traitement est nécessaire à l’exécution d’un contrat auquel la
              personne concernée est partie ou à l’exécution de mesures
              précontractuelles prises à la demande de celle-ci ;
            </li>
            <li>
              Le traitement est nécessaire au respect d’une obligation légale à
              laquelle le responsable du traitement est soumis ;
            </li>
            <li>
              Le traitement est nécessaire à la sauvegarde des intérêts vitaux
              de la personne concernée ou d’une autre personne physique ;
            </li>
            <li>
              Le traitement est nécessaire à l’exécution d’une mission d’intérêt
              public ou relevant de l’exercice de l’autorité publique dont est
              investi le responsable du traitement ;
            </li>
            <li>
              Le traitement est nécessaire aux fins des intérêts légitimes
              poursuivis par le responsable de traitement ou par un tiers, à
              moins que ne prévalent les intérêts ou les libertés et droits
              fondamentaux de la personne concernée qui exigent une protection
              des données à caractère personnel, notamment lorsque la personne
              concernée est un enfant.
            </li>
          </ul>
          <p>
            Pour les résidents de l’État de Californie, cette politique de
            confidentialité vise à se conformer à la{" "}
            <span className="italic">California Consumer Privacy Act</span>
             (CCPA). S’il y a des incohérences entre ce document et la CCPA, la
            législation de l’État s’appliquera. Si nous constatons des
            incohérences, nous modifierons notre politique pour nous conformer à
            la loi pertinente.
          </p>
        </div>
      </section>

      <section className="w-full flex flex-col gap-4">
        <TitleTwo>
          <span className="text-primary">Consentement</span>
        </TitleTwo>
        <p>
          Les utilisateurs conviennent qu’en utilisant notre site, ils
          consentent à :
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>
            Les conditions énoncées dans la présente politique de
            confidentialité et
          </li>
          <li>
            La collecte, l’utilisation et la conservation des données énumérées
            dans la présente politique.
          </li>
        </ul>
      </section>

      <section className="w-full flex flex-col gap-4">
        <TitleTwo>
          <span className="text-primary">
            Données personnelles que nous collectons
          </span>
        </TitleTwo>
        <p>
          <strong>Données collectées automatiquement</strong>
          <br />
          Nous ne collectons aucune donnée automatiquement sur notre site.
          <br />
          <br />
          <strong>Données recueillies de façon non automatique</strong>
          <br />
          Nous pouvons également collecter les données suivantes lorsque vous
          effectuez certaines fonctions sur notre site :
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>Email</li>
          <li>Nom et prénom</li>
          <li>Adresse de livraison</li>
          <li>Informations de paiement</li>
          <li>Données de remplissage automatique</li>
        </ul>
        Ces données peuvent être recueillies au moyen de méthodes suivantes :
        <ul className="list-disc pl-5 mb-4">
          <li>Enregistrement d’un compte</li>
          <li>Achat en ligne</li>
        </ul>
        <p>
          Veuillez noter que nous ne collectons que les données qui nous aident
          à atteindre l’objectif énoncé dans cette politique de confidentialité.
          Nous ne recueillerons pas les données supplémentaires sans vous en
          informer au préalable.
        </p>
      </section>

      <section className="w-full flex flex-col gap-4">
        <TitleTwo>
          <span className="text-primary">
            Comment nous utilisons les données personnelles
          </span>
        </TitleTwo>
        <p>
          Les données personnelles recueillies sur notre site seront utilisées
          uniquement aux fins précisées dans la présente politique ou indiquées
          sur les pages pertinentes de notre site. Nous n’utiliserons pas vos
          données au-delà de ce que nous divulguerons. <br />
          <br />
          Les données que nous recueillons lorsque l’utilisateur exécute
          certaines fonctions peuvent être utilisées aux fins suivantes :
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>Communication</li>
          <li>Paiement en ligne</li>
          <li>Support technique</li>
        </ul>
      </section>

      <section className="w-full flex flex-col gap-4">
        <TitleTwo>
          <span className="text-primary">
            Avec qui nous partageons les données personnelles
          </span>
        </TitleTwo>
        <p>
          <strong>Employés</strong>
          <br />
          Nous pouvons divulguer à tout membre de notre organisation les données
          utilisateur dont il a raisonnablement besoin pour réaliser les
          objectifs énoncés dans la présente politique. <br /> <br />
          <strong>Tierces parties</strong>
          <br />
          Nous pouvons partager les données utilisateur avec les tiers suivants
          : Stripe API
          <br />
          Nous pouvons partager les données utilisateur avec des tiers aux fins
          suivantes : Paiement en ligne sécurisé
          <br />
          Les tiers ne seront pas en mesure d’accéder aux données des
          utilisateurs au-delà de ce qui est raisonnablement nécessaire pour
          atteindre l’objectif donné.
          <br /> <br />
          <strong>Autre divulgations</strong>
          <br /> Nous nous engageons à ne pas vendre ou partager vos données
          avec des tiers, sauf dans les cas suivants :
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>Si la loi l’exige</li>
          <li>Si elle est requise pour toute procédure judiciaire</li>
          <li>Pour prouver ou protéger nos droits légaux</li>
          <li>
            A des acheteurs ou des acheteurs potentiels de cette société dans le
            cas où nous cherchons à la vendre
          </li>
        </ul>
        <p>
          Si vous suivez des hyperliens de notre site vers un autre site,
          veuillez noter que nous ne sommes pas responsables et n’avons pas de
          contrôle sur leurs politiques et pratiques de confidentialité.
        </p>
      </section>

      <section className="w-full flex flex-col gap-4">
        <TitleTwo>
          <span className="text-primary">
            Combien de temps nous stockons les données personnelles
          </span>
        </TitleTwo>
        <p>
          Nous ne conservons pas les données des utilisateurs au-delà de ce qui
          est nécessaire pour atteindre les fins pour lesquelles elles sont
          recueillies.
        </p>
      </section>

      <section className="w-full flex flex-col gap-4">
        <TitleTwo>
          <span className="text-primary">
            Comment nous protégeons vos données personnelles
          </span>
        </TitleTwo>
        <p>
          Afin d’assurer la protection de vos données, nous utilisons le
          protocole de sécurité de la couche transport pour transmettre des
          renseignements personnels dans notre système.
          <br />
          <br />
          Toutes les données stockées dans notre système sont bien sécurisées et
          ne sont accessibles qu’à nos employés. Nos employés sont liés par des
          accords de confidentialité stricts et une violation de cet accord
          entraînerait le licenciement de l’employé.
          <br />
          <br />
          Alors que nous prenons toutes les précautions raisonnables pour nous
          assurer que nos données d’utilisateur sont sécurisées et que les
          utilisateurs sont protégés, il reste toujours du risque de préjudice.
          L’Internet en sa totalité peut être, parfois, peu sûr et donc nous
          sommes incapables de garantir la sécurité des données des utilisateurs
          au-delà de ce qui est raisonnablement pratique.
        </p>
      </section>

      <section className="w-full flex flex-col gap-4">
        <TitleTwo>
          <span className="text-primary">Mineurs</span>
        </TitleTwo>
        <p>
          Le RGPD précise que les personnes de moins de 15 ans sont considérées
          comme des mineurs aux fins de la collecte de données. Les mineurs
          doivent avoir le consentement d’un représentant l’gal pour que leurs
          données soient recueillies, traitées et utilisées.
        </p>
      </section>

      <section className="w-full flex flex-col gap-4">
        <TitleTwo>
          <span className="text-primary">
            Vos droits en tant qu’utilisateur
          </span>
        </TitleTwo>
        <p>
          En vertu du RGPD, les utilisateurs ont les droits suivants en tant que
          personnes concernées :
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>Droit d’accès</li>
          <li>Droit de rectification</li>
          <li>Droit à l’effacement</li>
          <li>Droit de restreindre le traitement</li>
          <li>Droit à la portabilité des données</li>
          <li>Droit d’objection</li>
        </ul>
        <p>
          Vous trouverez de plus amples informations sur ces droits au chapitre
          3 (art 12-23) du RGPD.
        </p>
      </section>

      <section className="w-full flex flex-col gap-4">
        <TitleTwo>
          <span className="text-primary">
            Comment modifier, supprimer ou contester les données recueillies
          </span>
        </TitleTwo>
        <p>
          Si vous souhaitez que vos renseignements soient supprimés ou modifiés
          d’une façon ou d’une autre, veuillez communiquer avec notre agent de
          protection de la vie privée ici : <br />
          Crabbé Pierre-Alexandre
          <br />
          Rue de l’université, Verquigneul, France
          <br />
          confidentialite@risus.fr{" "}
        </p>
      </section>

      <section className="w-full flex flex-col gap-4">
        <TitleTwo>
          <span className="text-primary">Politique sur les cookies </span>
        </TitleTwo>
        <p>
          Un cookie est un petit fichier, stocké sur le disque dur d’un
          utilisateur par le site Web. Son but est de recueillir des données
          relatives aux habitudes de navigation de l‘utilisateur. <br />
          Nous utilisons les types de cookies suivants sur notre site :
        </p>
        <ul className="list-disc pl-5 my-2">
          <li>
            <strong>Cookies fonctionnels</strong>
          </li>
        </ul>
        <p>
          Nous les utilisons pour mémoriser toutes les sélections que vous
          faites sur notre site afin qu’elles soient sauvegardées pour vos
          prochaines visites.{" "}
        </p>
        <ul className="list-disc pl-5 my-2">
          <li>
            <strong> Cookies analytiques</strong>
          </li>
        </ul>
        <p>
          Cela nous permet d’améliorer la conception et la fonctionnalité de
          notre site en recueillant des données sur le contenu auquel vous
          accédez et sur lequel vous vous accrochez en utilisant notre site.
          <br />
          <br />
          Vous pouvez choisir d’être averti chaque fois qu’un cookie est
          transmis. Vous pouvez également choisir de désactiver les cookies
          entièrement dans votre navigateur Internet, mais cela peut diminuer la
          qualité de votre expérience d’utilisation.
        </p>
      </section>

      <section className="w-full flex flex-col gap-4">
        <TitleTwo>
          <span className="text-primary">Modifications</span>
        </TitleTwo>
        <p>
          Cette politique de confidentialité peut être modifiée à l’occasion
          afin de maintenir la conformité avec la loi et de tenir compte de tout
          changement à notre processus de collecte de données. Nous recommandons
          à nos utilisateurs de vérifier notre politique de temps à autre pour
          s’assurer qu’ils soient informés de toute mise à jour. Au besoin, nous
          pouvons informer les utilisateurs par courriel des changements
          apportés à cette politique.
        </p>
      </section>

      <section className="w-full flex flex-col gap-4">
        <TitleTwo>
          <span className="text-primary">Contact</span>
        </TitleTwo>
        <p>
          Si vous avez des questions à nous poser, n’hésitez pas à communiquer
          avec nous en utilisant ce qui suit :<br />
          06 44 80 21 65
          <br />
          contact@risus.fr
          <br />
          Rue de l’université, Verquigneul, France
          <br />
          <strong>Date d’entrée en vigueur :</strong> le 01 octobre 2025
          <br />
        </p>
      </section>
    </div>
  );
}
