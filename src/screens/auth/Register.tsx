import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { AuthStackParamList } from "../../types/navigation";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Layout,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import PhoneInput from "react-native-phone-number-input";
import { AntDesign } from '@expo/vector-icons';



import { collection, addDoc, } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { AuthContext } from "../../provider/AuthProvider";
import { Text, TextInput, Button, TouchableOpacity } from "react-native";




export default function ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, "Register">, props: any) {
  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const firestoreauth = useContext(AuthContext);
  const db = firestoreauth.firestore;
  const [name, setName] = useState<string>("");




  async function register() {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      async function addToFireStore() {
        try {
          const docRef = await addDoc(collection(db, "users"), {
            email: userCredential.user.email,
            name: name,
            phone: phone,
            uid: userCredential.user.uid,
          });
          console.log("Document written with ID: ", docRef.id);
          firestoreauth.updateUserdata(userCredential.user.uid, name, email, phone)

        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
      addToFireStore();
    }


    ).catch(function (
      error: any
    ) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      setLoading(false);
      alert(errorMessage);
    });
  }



  return (
    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, backgroundColor: isDarkmode ? 'black' : '#ededed' }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: isDarkmode ? 'black' : '#ededed'
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >

          <View style={{
            height: '50%',
            alignItems: "center",
            width: '100%',
            justifyContent: "center",

          }}>
            <Text
              style={{
                fontSize: 80,
                fontWeight: "bold",
                color: isDarkmode ? 'white' : 'black',
              }}
            >
              HELIOS
            </Text>
          </View>
          <View style={
            {
              height: '60%',
              alignItems: "center",
              width: '100%',
              borderRadius: 10,
              borderColor: isDarkmode ? '#bac4c8' : 'black',
              backgroundColor: isDarkmode ? '#1e1e1e' : 'white',
              padding: 20

            }
          }>
            <TextInput
              style={{
                width: "100%",
                height: 60,
                borderColor: isDarkmode ? '#bac4c8' : 'black',
                borderRadius: 5,
                paddingLeft: 10,
                marginBottom: 10,
                color: isDarkmode ? 'white' : 'black',
                backgroundColor: isDarkmode ? 'black' : 'white'
              }}
              placeholder="Username"
              onChangeText={(text) => setName(text)}
              value={name}
            />

            <TextInput
              style={{
                width: "100%",
                height: 60,
                borderColor: isDarkmode ? '#bac4c8' : 'black',
                borderRadius: 5,
                paddingLeft: 10,
                marginTop: 20,
                marginBottom: 10,
                color: isDarkmode ? 'white' : 'black',
                backgroundColor: isDarkmode ? 'black' : 'white'
              }}
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />

            <TextInput
              style={{
                width: "100%",
                height: 60,
                borderColor: isDarkmode ? '#bac4c8' : 'black',
                borderRadius: 5,
                paddingLeft: 10,
                marginTop: 20,
                marginBottom: 10,
                color: isDarkmode ? 'white' : 'black',
                backgroundColor: isDarkmode ? 'black' : 'white'
              }}
              placeholder="Username"
              onChangeText={(text) => setPassword(text)}
              value={password}
            />


            <TouchableOpacity
              style={{
                width: "100%",
                height: 60,
                marginTop: 20,
                backgroundColor: isDarkmode ? 'black' : 'white',
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
              }}
              onPress={() => register()}
            >
              <Text style={{
                color: isDarkmode ? 'white' : 'black',
                fontSize: 14,
                fontFamily: 'Inter_400Regular',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}>Sign up</Text>
            </TouchableOpacity>

            <View
              style={{
                width: "100%",
                height: 60,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 20,
                borderTopWidth: 1,
                borderTopColor: isDarkmode ? '#bac4c8' : 'black',
              }}
            >
              <TouchableOpacity style={{
                width: "48%",
                height: 60,
                marginTop: 20,
                backgroundColor: isDarkmode ? 'black' : 'white',
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
              }}>
                <AntDesign name="google" size={20} style={{
                  marginRight: 10,
                  color: isDarkmode ? 'white' : 'black'
                }} color="black" />
                <Text style={{
                  color: isDarkmode ? 'white' : 'black',
                  fontSize: 14,
                  fontFamily: 'Inter_400Regular'

                }}>Sign up with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{
                width: "48%",
                height: 60,
                marginTop: 20,
                backgroundColor: isDarkmode ? 'black' : 'white',
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,

              }}>
                <AntDesign name="apple1" size={20} style={{
                  marginRight: 10,
                  color: isDarkmode ? 'white' : 'black'
                }} color="black" />
                <Text style={{
                  color: isDarkmode ? 'white' : 'black',
                  fontSize: 14,
                  fontFamily: 'Inter_400Regular'

                }}>Sign up with Apple</Text>
              </TouchableOpacity>


            </View>






          </View>
        </View>


      </ScrollView>
    </KeyboardAvoidingView>
  );
}
