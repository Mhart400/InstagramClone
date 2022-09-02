import React, { useState } from "react";
import { View, Image, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useFirebase } from "../../../useFirebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { fetchUserPosts } from "../../Redux/userSlice";

export default function Save(props) {
  // Create the file metadata
  /** @type {any} */
  const metadata = {
    contentType: "image/jpeg",
  };

  const dispatch = useDispatch();
  const [caption, setCaption] = useState("");
  const [progressPercent, setProgressPercent] = useState(0);
  const { auth, db, storage } = useFirebase();

  const savePostData = (downloadURL, caption) => {
    try {
      addDoc(collection(db, "posts", auth.currentUser.uid, "userPosts"), {
        downloadURL,
        caption,
        creationDate: serverTimestamp(),
      });
      dispatch(fetchUserPosts()); //update user posts in redux store
    } catch (e) {
      console.log(e);
    }
  };

  const uploadImage = async () => {
    const uri = props.route.params.image;
    const path = `posts/${auth.currentUser.uid}/${Math.random().toString(30)}`;
    const imageRef = ref(storage, path); // create ref to where I want it uploaded

    // Create blob from image uri
    const response = await fetch(uri);
    const blob = await response.blob();

    console.log("attempting upload");

    const uploadTask = uploadBytesResumable(imageRef, blob, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgressPercent(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(`Error: ${error}`);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          savePostData(downloadURL, caption);
        });
        // Return to the Feed
        props.navigation.navigate("Feed");
      }
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{ uri: props.route.params.image }}
        style={{ flex: 1, width: "100%" }}
      />
      <TextInput
        placeholder="Write a caption"
        onChangeText={(caption) => setCaption(caption)}
      />
      <Button icon="check-bold" onPress={() => uploadImage()}>
        Save
      </Button>
      {progressPercent > 0 && (
        <View>
          <Text>{progressPercent}%</Text>
        </View>
      )}
    </View>
  );
}
