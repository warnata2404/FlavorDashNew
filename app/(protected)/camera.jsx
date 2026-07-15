import { CameraView } from "expo-camera";
import { useRef, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import AppButton from "../../components/AppButton";
import Loading from "../../components/Loading";
import useCameraPermission from "../../hooks/useCameraPermission";
import { Colors, Spacing, Typography } from "../../styles";

export default function CameraScreen() {
  const cameraRef = useRef(null);

  const { loading, granted, requestPermission } = useCameraPermission();

  const [photoUri, setPhotoUri] = useState(null);
  const [capturing, setCapturing] = useState(false);

  async function handleTakePhoto() {
    if (!cameraRef.current || capturing) {
      return;
    }

    try {
      setCapturing(true);

      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        skipProcessing: false,
      });

      setPhotoUri(photo.uri);
    } catch (error) {
      console.error(error);
    } finally {
      setCapturing(false);
    }
  }

  if (loading) {
    return <Loading message="Checking camera permission..." />;
  }

  if (!granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          FlavorDash memerlukan izin kamera untuk mengambil foto.
        </Text>

        <AppButton title="Izinkan Kamera" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="back" />

      <View style={styles.actionContainer}>
        <AppButton
          title={capturing ? "Mengambil Foto..." : "Ambil Foto"}
          onPress={handleTakePhoto}
          disabled={capturing}
        />
      </View>

      {photoUri ? (
        <Image
          source={{ uri: photoUri }}
          style={styles.preview}
          resizeMode="cover"
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  camera: {
    flex: 1,
  },

  actionContainer: {
    padding: Spacing.screenPadding,
  },

  preview: {
    width: "100%",
    height: 220,
    backgroundColor: Colors.surface,
  },

  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.screenPadding,
    backgroundColor: Colors.background,
  },

  permissionText: {
    ...Typography.body,
    color: Colors.text,
    textAlign: "center",
    marginBottom: Spacing.lg,
  },
});
