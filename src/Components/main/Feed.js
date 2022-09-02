import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPosts } from "../../Redux/userSlice";

export default function Feed() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.user.posts);

  useEffect(() => {
    console.log("Fetching user posts");
    dispatch(fetchUserPosts());
    console.log(posts);
  }, []);

  if (posts.length) {
    console.log(`Returned ${posts.length} posts`);
  }

  return (
    <View style={{ flex: 1 }}>
      <Text variant="headlineLarge" style={{ margin: 50, alignSelf: "center" }}>
        Feed1
      </Text>

      <View style={{ flex: 1, justifyContent: "center", padding: 25 }}></View>
    </View>
  );
}
