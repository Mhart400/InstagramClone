import React, { useEffect } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { logout } from "../../Redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPosts } from "../../Redux/userSlice";

export default function Settings() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.user.posts);

  useEffect(() => {
    console.log("Fetching user posts");
    dispatch(fetchUserPosts());
  }, []);

  console.log(`Returned ${posts.length} posts`);

  return (
    <View style={{ flex: 1 }}>
      <Text variant="headlineLarge" style={{ margin: 50, alignSelf: "center" }}>
        Settings
      </Text>
      {posts.length > 0 &&
        posts.map((post) => {
          return <Text>{post.data.caption}</Text>;
        })}
      <View style={{ flex: 1, justifyContent: "center", padding: 25 }}>
        <Button mode="contained" onPress={() => dispatch(logout())}>
          Logout
        </Button>
      </View>
    </View>
  );
}
