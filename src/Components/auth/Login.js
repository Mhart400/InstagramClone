import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, resetError } from "../../Redux/authSlice";

export default function Login() {
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Update Redux store - authSlice
  async function logIn() {
    dispatch(login(loginData));
  }

  const authError = useSelector((state) => state.auth.error);

  // When the page loads 1st time, reset the error
  useEffect(() => {
    dispatch(resetError());
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <TextInput
        label="Email"
        onChangeText={(email) => setLoginData({ ...loginData, email: email })}
      />
      <TextInput
        label="Password"
        onChangeText={(pw) => setLoginData({ ...loginData, password: pw })}
        secureTextEntry={true}
      />
      <Button
        onPress={() => logIn()}
        mode="contained"
        textColor="white"
        style={{
          width: 200,
          alignSelf: "center",
          margin: 10,
        }}
      >
        Login
      </Button>
      {authError && (
        <Text style={{ alignSelf: "center" }}>
          Incorrect username / password!
        </Text>
      )}
    </View>
  );
}
