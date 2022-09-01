import React from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useState } from "react";
import { useFirebase } from "../../../useFirebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Register({ navigation }) {
  const { auth, db } = useFirebase();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    name: "",
  });

  function signUp() {
    const { email, password, name } = loginData;
    // First save to Firebase Auth
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // Then save user details in firestore
        const docId = auth.currentUser.uid;
        setDoc(doc(db, "users", docId), {
          email: email,
          name: name,
        });

        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <TextInput
        label="Name"
        onChangeText={(name) => setLoginData({ ...loginData, name: name })}
      />
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
        onPress={() => signUp()}
        mode="contained"
        textColor="white"
        style={{
          width: 200,
          alignSelf: "center",
          margin: 10,
        }}
      >
        Sign-up
      </Button>
    </View>
  );
}
