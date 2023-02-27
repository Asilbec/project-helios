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
  const firestoreauth = useContext(AuthContext);
  const db = firestoreauth.firestore;




  async function register() {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password).then(
      async function (result: any) {
        try {
          const docRef = await addDoc(collection(db, "users"), {
            first: "Ada",
            last: "Lovelace",
            born: 1815
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
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
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        </View>
        <View
          style={{
            flex: 3,
            paddingHorizontal: 20,
            paddingBottom: 20,
            backgroundColor: isDarkmode ? 'black' : '#ededed'
          }}
        >
          <Text
            style={{
              color: isDarkmode ? themeColor.white100 : themeColor.black,
              fontSize: 50,
              marginTop: 50,
              fontFamily: 'Inter_900Black'
            }}
          >
            Register
          </Text>
          <Text
            style={{
              color: isDarkmode ? themeColor.white100 : themeColor.gray100,
              fontSize: 20,
              paddingBottom: 20,
              paddingTop: 5,
              fontFamily: 'Inter_200ExtraLight'
            }}
          >
            Create an account to continue
          </Text>
          <Text style={{
            color: isDarkmode ? themeColor.white : themeColor.black, fontSize: 20, fontFamily: 'Inter_600SemiBold'
          }}>Email</Text>
          <TextInput
            placeholder="Enter your email"
            value={email}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor={isDarkmode ? themeColor.white200 : themeColor.gray100}
            style={{
              height: 60,
              borderRadius: 2,
              marginTop: 10,
              paddingHorizontal: 10,
              color: isDarkmode ? themeColor.white : themeColor.black,
              backgroundColor: isDarkmode ? themeColor.dark : '#ffffff'

            }}
          />

          <Text style={{
            color: isDarkmode ? themeColor.white : themeColor.black, fontSize: 20, marginTop: 30, fontFamily: 'Inter_600SemiBold'
          }}>Password</Text>
          <TextInput
            placeholder="Enter your password"
            value={password}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor={isDarkmode ? themeColor.white200 : themeColor.gray100}
            style={{
              height: 60,
              borderRadius: 2,
              marginTop: 10,
              paddingHorizontal: 10,
              color: isDarkmode ? themeColor.white : themeColor.black,
              backgroundColor: isDarkmode ? themeColor.dark : '#ffffff'

            }}
          />
          <Text style={{
            color: isDarkmode ? themeColor.white : themeColor.black, fontSize: 20, marginTop: 30, fontFamily: 'Inter_600SemiBold'
          }}>Confirm Password</Text>
          <TextInput
            placeholder="Confirm your password"
            value={password}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor={isDarkmode ? themeColor.white200 : themeColor.gray100}
            style={{
              height: 60,
              borderRadius: 2,
              marginTop: 10,
              paddingHorizontal: 10,
              color: isDarkmode ? themeColor.white : themeColor.black,
              backgroundColor: isDarkmode ? themeColor.dark : '#ffffff'

            }}
          />

          <Text style={{
            color: isDarkmode ? themeColor.white : themeColor.black, fontSize: 20, marginTop: 30, fontFamily: 'Inter_600SemiBold'
          }}>Enter your phone number</Text>

          <PhoneInput
            containerStyle={{
              width: '100%',
              backgroundColor: isDarkmode ? themeColor.dark : '#ffffff',
              marginTop: 10,

            }}

            textContainerStyle={{
              backgroundColor: isDarkmode ? themeColor.dark : '#ffffff',
            }}
            textInputStyle={{
              color: isDarkmode ? themeColor.white : themeColor.black,
            }}

            codeTextStyle={{
              color: isDarkmode ? themeColor.white : themeColor.black,
            }}


            defaultCode="US"
            layout="second"
            withDarkTheme

          />

          <TouchableOpacity
            onPress={() => {
              register();
            }}
            disabled={loading}
            style={{
              backgroundColor: '#1a77f2',
              height: 60,
              width: '100%',
              marginTop: 40,
              borderRadius: 2,
            }}
          >
            <Text style={{
              color: 'white', fontSize: 25, marginTop: 15, fontFamily: 'Inter_600SemiBold'
              , textAlign: 'center',
            }}>Register</Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 15,
              justifyContent: "center",
            }}
          >
            <Text>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text
                style={{
                  marginLeft: 5,
                }}
              >
                Login here
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 30,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                isDarkmode ? setTheme("light") : setTheme("dark");
              }}
            >
              <Text

                style={{
                  marginLeft: 5,
                }}
              >
                {isDarkmode ? "☀️ light theme" : "🌑 dark theme"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
