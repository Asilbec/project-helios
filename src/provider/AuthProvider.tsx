import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

type ContextProps = {
  user: null | boolean;
};

const AuthContext = createContext<Partial<ContextProps>>({});

interface Props {
  children: React.ReactNode;
}

const AuthProvider = (props: Props) => {
  const auth = getAuth();
  // user null = loading
  const [user, setUser] = useState<null | boolean>(null);
  const [firestore, setFirestore] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    checkLogin();
  }, []);

  function checkLogin() {
    onAuthStateChanged(auth, function (u) {
      if (u) {
        console.log("user is logged in");
        setUser(true);
        // getUserData();
      } else {
        setUser(false);
        // setUserData(null);
      }
    });
  }

  const updateUserdata = (e: any) => {
    setUserData(e);
  }


  const declareFireStoreInstence = (e: any) => {
    const db = getFirestore(e);
    setFirestore(db);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        declareFireStoreInstence,
        updateUserdata,
        userData,
        firestore
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
