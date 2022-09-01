import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
//PAGES
import AuthLanding from "./src/Components/auth/AuthLanding";
import MainScreen from "./src/Components/Main";
import Register from "./src/Components/auth/Register";
import Login from "./src/Components/auth/Login";
import Add from "./src/Components/main/Add";
import Save from "./src/Components/main/Save";

//FIREBASE
import { useFirebase } from "./useFirebase";
import { onAuthStateChanged } from "firebase/auth";
//REDUX
import { Provider } from "react-redux";
import { store } from "./src/Redux/store";

// =============== APP ======================
export default function App() {
  const { auth } = useFirebase();

  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoggedIn(false);
        setLoaded(true);
      } else {
        setLoaded(true);
        setLoggedIn(true);
      }
    });
  }, []);

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ alignSelf: "center", fontSize: 30 }}>Loading</Text>
      </View>
    );
  }

  const Stack = createNativeStackNavigator();

  if (loaded && !loggedIn) {
    return (
      <Provider store={store}>
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
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Add"
            component={Add}
            option={{ headerShown: true }}
            // navigation={navigation}
          />
          <Stack.Screen
            name="Save"
            component={Save}
            option={{ headerShown: true }}
            // navigation={navigation}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
