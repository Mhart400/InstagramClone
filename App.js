import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import AuthLanding from "./src/Components/auth/AuthLanding";
import Register from "./src/Components/auth/Register";
import Login from "./src/Components/auth/Login";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKSA5nN9tkCNL6-oAgAsT4GDyww-b8DGQ",
  authDomain: "instagramclone-42c2c.firebaseapp.com",
  projectId: "instagramclone-42c2c",
  storageBucket: "instagramclone-42c2c.appspot.com",
  messagingSenderId: "138511774575",
  appId: "1:138511774575:web:7cf1fe85725c998f596e9a",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth.OnAuthStateChanged((user) => {
      if (!user) {
        setLoggedIn(false);
        setLoaded(false);
      } else {
        setLoaded(true);
        setLoggedIn(true);
      }
    });
  }, []);

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>Loading</Text>
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Landing"
          component={AuthLanding}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();
