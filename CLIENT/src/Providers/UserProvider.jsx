import {useEffect, useState} from "react";
import {UserContext} from "../context/UserContext";
import {useLoaderData} from "react-router-dom";
import {signin, signOut} from "../apis/auth.api";
import toast from "react-hot-toast";

export default function UserProvider({children}) {
  const initialUser = useLoaderData();
  const [user, setUser] = useState(initialUser);

  const login = async (credentials) => {
    const response = await signin(credentials);
    if (response.message) {
      console.log(response.message);
      return false;
    } else {
      console.log("Success");
      setUser(response);
      return true;
    }
  };

  const logout = async () => {
    await signOut();
    setUser(null);
    toast("Au-revoir !", {
      icon: "👏",
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
