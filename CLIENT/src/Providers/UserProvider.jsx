import {useEffect, useMemo, useState} from "react";
import {UserContext} from "../context/UserContext";
import {useLoaderData} from "react-router-dom";
import {signin, signOut} from "../apis/auth.api";
import toast from "react-hot-toast";

export default function UserProvider({children}) {
  const initialUser = useLoaderData();
  const [user, setUser] = useState(initialUser);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!user) return;
    console.log(user);
    if (user.role._id === import.meta.env.VITE_ADMIN_UUID) {
      setIsAdmin(true);
    } else setIsAdmin(false);
  }, [user]);

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
        isAdmin,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
