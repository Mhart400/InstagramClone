import React from "react";
import { Text, View, Button } from "react-native";

export default function AuthLanding({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text
        style={{
          alignSelf: "center",
          fontWeight: "bold",
          fontSize: 25,
          margin: 20,
        }}
      >
        Register or Login
      </Text>
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      ></Button>
      <Button
        title="Login"
        onPress={() => navigation.navigate("Login")}
      ></Button>
    </View>
  );
}
