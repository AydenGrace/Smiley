import {useContext} from "react";
import {Link} from "react-router-dom";
import {UserContext} from "../context/UserContext";
import Button from "./Button";

export default function Footer() {
  const {user} = useContext(UserContext);
  return (
    <footer className="flex flex-col w-full items-center justify-center bg-white px-16 py-10 gap-20">
      <div className="w-full flex flex-col gap-8 justify-center items-center">
        <Link to={"/"}>
          <img
            src="https://gahtfyaqzgunbhepuitf.supabase.co/storage/v1/object/public/smiley//Smiley_logo.webp"
            className="h-10"
            alt="Smiley Logo"
          />
        </Link>
        <nav className="w-full flex flex-col items-center sm:flex-row justify-center">
          <Link to={"/"}>
            <Button text="Accueil" isEmpty />
          </Link>
          <Link to={"/"}>
            <Button text="Boutique" isEmpty />
          </Link>
          <Link to={"/about"}>
            <Button text="À Propos" isEmpty />
          </Link>
          <Link to={"/"}>
            <Button text="Contactez Nous" isEmpty />
          </Link>
          {user ? (
            <Link to={"/"}>
              <Button text="Paramètres" isEmpty />
            </Link>
          ) : (
            <Link to={"/"}>
              <Button text="Connexion" isEmpty />
            </Link>
          )}
        </nav>
      </div>
      <div className="pt-8 gap-4 flex flex-col items-center sm:flex-row w-full border-t-1 border-t-black/20 text-sm justify-between">
        <p>© 2025 Risus. Tous droits réservés.</p>
        <nav className="flex gap-4 flex-col items-center sm:flex-row">
          <Link className="underline hover:text-primary" to={"/privacy"}>
            Politique de Confidentialité
          </Link>
          <Link className="underline hover:text-primary" to={"/terms"}>
            Conditions Générales de Vente{" "}
          </Link>{" "}
          <Link className="underline hover:text-primary" to={"/legals"}>
            Mentions Légales{" "}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
