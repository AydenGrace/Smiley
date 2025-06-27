import {IoHeartOutline} from "react-icons/io5";

export default function AccountFavorites() {
  const favorites = useLoaderData();
  return (
    <div className="w-full">
      {favorites && favorites.length ? (
        <></>
      ) : (
        <div className="w-full flex flex-col items-center justify-center py-10">
          <div className=" opacity-40">
            <IoHeartOutline size={50} />
          </div>
          <p className=" opacity-60">Votre liste de favoris est vide.</p>
        </div>
      )}
    </div>
  );
}
