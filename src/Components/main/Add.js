import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button, IconButton } from "react-native-paper";

export default function Add({ navigation }) {
  const [type, setType] = useState(CameraType.back);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View></View>;
  }

  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return (
      <View>
        <Text>You do not have permission to use the camera/media library</Text>
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  async function takePicture() {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          type={type}
          ratio={"1:1"}
          ref={(ref) => setCamera(ref)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <IconButton
          icon="rotate-3d-variant"
          style={styles.button}
          onPress={() => toggleCameraType()}
          buttonColor="grey"
          mode="contained"
        />
        <Button
          onPress={() => takePicture()}
          style={styles.button}
          mode="contained"
        >
          Take Picture
        </Button>
        <Button
          onPress={() => pickImage()}
          style={styles.button}
          mode="contained"
        >
          Select Picture
        </Button>
      </View>
      {image && (
        <Image source={{ uri: image }} style={{ flex: 1, width: "100%" }} />
      )}
      <Button
        icon="check-bold"
        mode="contained"
        buttonColor="green"
        style={{ padding: 5, margin: 3, marginHorizontal: 10 }}
        onPress={() => navigation.navigate("Save", { image })}
      >
        Save
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  cameraContainer: { flex: 1, flexDirection: "row" },
  camera: { flex: 1, aspectRatio: 1 },
  buttonContainer: {
    minHeight: 70,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  button: {
    margin: 5,
  },
});
