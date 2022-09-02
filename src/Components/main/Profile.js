import React, { useEffect, useState } from "react";
import { ScrollView, View, Image, FlatList } from "react-native";
import { Button, Text } from "react-native-paper";
import { logout } from "../../Redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPosts, fetchUser } from "../../Redux/userSlice";
import { useFirebase } from "../../../useFirebase";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  orderBy,
  query,
} from "firebase/firestore";

export default function Profile(props) {
  const dispatch = useDispatch();

  const posts_store = useSelector((state) => state.user.posts);
  const userData_store = useSelector((state) => state.user.userData);

  const [posts, setPosts] = useState(posts_store);
  const [userData, setUserData] = useState(userData_store);

  const { auth, db } = useFirebase();

  // Decide which profile we are rendering... either the currentUser or a user from "Search" page
  useEffect(() => {
    console.log("Running useEffect");
    // 1 .If props.uid is the current user, fetch as normal
    if (props.route.params.uid === auth.currentUser.uid) {
      console.log("Fetching posts for currentUser");

      dispatch(fetchUser());
      dispatch(fetchUserPosts());

      setPosts(posts_store);
      setUserData(userData_store);

      // 2. Else fetch details for the props.uid user
    } else {
      console.log("Fetching posts for props.uid = " + props.uid);
      // 2a. Getting userData
      getDoc(doc(db, "users", props.route.params.uid)).then((snapshot) => {
        setUserData(snapshot.data());
      });

      // 2b. Getting posts
      const q = query(
        collection(db, "posts", props.route.params.uid, "userPosts"),
        orderBy("creationDate", "desc")
      );
      getDocs(q).then((snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, data };
        });
        setPosts(posts);
      });
    }
  }, [props.route.params.uid]);

  // Follow functionality
  const [following, setFollowing] = useState(false);

  console.log(posts);
  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: 10 }}>
      <Text variant="headlineLarge" style={{ margin: 50, alignSelf: "center" }}>
        Profile
      </Text>
      {userData && (
        <View style={{ marginBottom: 15 }}>
          <Text variant="bodyMedium">Name: {userData.name}</Text>
          <Text variant="bodyMedium">Email: {userData.email}</Text>
          <Text variant="bodyMedium">Post Count: {posts.length}</Text>
        </View>
      )}

      {props.route.params.uid !== auth.currentUser.uid && (
        <Button
          icon={following ? "account-check" : "account-check-outline"}
          mode={following ? "contained" : "outlined"}
          uppercase
          onPress={() => setFollowing(!following)}
        >
          {following ? "Following" : "Follow"}
        </Button>
      )}

      {posts.length > 0 && (
        <View>
          <Text variant="headlineSmall">Posts:</Text>
          <FlatList
            numColumns={3}
            horizontal={false}
            data={posts}
            style={{ alignSelf: "center", height: 350 }}
            renderItem={({ item }) => (
              <View style={{ margin: 5 }}>
                <Image
                  source={{ uri: item.data.downloadURL }}
                  style={{ aspectRatio: "1", flex: 1, width: 100 }}
                />
                <Text>{item.data.caption}</Text>
              </View>
            )}
          />
        </View>
      )}
      <View style={{ flex: 1, justifyContent: "center", padding: 25 }}>
        {props.route.params.uid === auth.currentUser.uid && (
          <Button mode="contained" onPress={() => dispatch(logout())}>
            Logout
          </Button>
        )}
      </View>
    </ScrollView>
  );
}
