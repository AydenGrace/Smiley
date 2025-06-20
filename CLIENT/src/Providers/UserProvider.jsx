import {useEffect, useState} from "react";
import {UserContext} from "../context/UserContext";
import {useLoaderData} from "react-router-dom";

export default function UserProvider({children}) {
  const initialUser = useLoaderData();
  const [user, setUser] = useState(initialUser);
  const login = (credentials) => {
    setUser(credentials);
  };

  const logout = async () => {
    await signOut();
    setUser(null);
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
