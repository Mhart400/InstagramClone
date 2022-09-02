import React, { useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { useFirebase } from "../../../useFirebase";
import { getDocs, collection, query, where } from "firebase/firestore";

export default function Search(props) {
  const [users, setUsers] = useState([]);
  const { db } = useFirebase();

  const fetchUsers = async (searchString) => {
    const reference = collection(db, "users");
    const q = query(reference, where("name", ">=", searchString));
    getDocs(q).then((snapshot) => {
      let userList = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setUsers(userList);
      console.log(userList);
    });
  };

  return (
    <View style={{ flex: 1, paddingTop: 50, paddingHorizontal: 10 }}>
      <Text
        variant="headlineMedium"
        style={{ alignSelf: "center", marginBottom: 20 }}
      >
        SEARCH
      </Text>
      <TextInput
        onChangeText={(searchString) => fetchUsers(searchString)}
        label="Type Here"
      />
      <FlatList
        style={{ flex: 1, height: 300 }}
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              console.log("Sending " + item.id + " to Profile");
              props.navigation.navigate("Profile", { uid: item.id });
            }}
          >
            <Text variant="bodyMedium">{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
