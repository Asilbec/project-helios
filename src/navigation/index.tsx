import React, { useContext } from "react";
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { AuthContext } from "../provider/AuthProvider";

import { NavigationContainer } from "@react-navigation/native";

import Main from "./MainStack";
import Auth from "./AuthStack";
import Loading from "../screens/utils/Loading";

// Better put your these secret keys in .env file
const firebaseConfig = {
  apiKey: "AIzaSyB3Ad7LhQyPpp2BVYUs9lMPJMN04jUdEoo",
  authDomain: "project-helios-c86d2.firebaseapp.com",
  projectId: "project-helios-c86d2",
  storageBucket: "project-helios-c86d2.appspot.com",
  messagingSenderId: "775925572954",
  appId: "1:775925572954:web:4f680459c521525f167f63",
  measurementId: "G-FF580XV76S"
};

const app = initializeApp(firebaseConfig);


export default () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  auth.declareFireStoreInstence(app)

  return (
    <NavigationContainer>
      {user == null && <Loading />}
      {user == false && <Auth />}
      {user == true && <Main />}
    </NavigationContainer>
  );
};
