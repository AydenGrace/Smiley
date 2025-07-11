import React from "react";
import {CartContext} from "../context/CartContext";
import {useState} from "react";
import {useEffect} from "react";
import {useContext} from "react";
import {UserContext} from "../context/UserContext";

export default function CartProvider({children}) {
  const [firstRender, setFirstRender] = useState(false);
  const [cart, setCart] = useState([]);
  const {user} = useContext(UserContext);
  useEffect(() => {
    reset();
    getLocalCart();
  }, [user]);

  useEffect(() => {
    if (!firstRender) return setFirstRender(true);
    saveLocalCart();
  }, [cart]);

  async function getLocalCart() {
    const cartStorage = await JSON.parse(
      localStorage.getItem(`cart_${user?._id}`)
    );
    if (cartStorage) {
      const {cart, userId} = cartStorage;
      if (user._id === userId) setCart(cart);
    }
  }

  const saveLocalCart = () => {
    localStorage.setItem(
      `cart_${user?._id}`,
      JSON.stringify({cart, userId: user?._id})
    );
  };

  const reset = () => {
    setCart([]);
  };

  const addToCart = (article, nb) => {
    const elem = cart.find((item) => item.article._id === article._id);
    if (elem) {
      const idx = cart.indexOf(elem);

      changeNbOfAnArticle(article, nb + cart[idx].nb);
    } else setCart((current) => [...current, {article, nb}]);
  };

  const removeToCart = (article) => {
    setCart((current) =>
      current.filter((item) => item.article._id !== article._id)
    );
  };

  const changeNbOfAnArticle = (article, newNb) => {
    if (newNb <= 0) return removeToCart(article);
    let copyCart = [...cart];
    for (let i = 0; i < copyCart.length; i++) {
      if (copyCart[i].article._id === article._id) {
        copyCart[i].nb =
          newNb >= copyCart[i].article.stock
            ? copyCart[i].article.stock
            : newNb;
        break;
      }
    }
    setCart([...copyCart]);
  };

  const getNbArticles = () => {
    return cart.reduce((acc, cur) => Number(acc + cur.nb), 0);
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (acc, cur) => Number(acc + cur.article.price * cur.nb),
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        reset,
        removeToCart,
        addToCart,
        changeNbOfAnArticle,
        getNbArticles,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
