import { CameraView } from "expo-camera";
import { useRef, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

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
        <Text style={styles.permissionIcon}>📷</Text>

        <Text style={styles.permissionTitle}>Camera Permission</Text>

        <Text style={styles.permissionText}>
          FlavorDash needs access to your camera to capture food photos.
        </Text>

        <AppButton title="Allow Camera Access" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Food Camera</Text>

      <Text style={styles.subtitle}>Capture your favorite meal.</Text>

      <View style={styles.cameraCard}>
        <CameraView ref={cameraRef} style={styles.camera} facing="back" />
      </View>

      <View style={styles.buttonContainer}>
        <AppButton
          title={capturing ? "Capturing..." : "Capture Photo"}
          onPress={handleTakePhoto}
          disabled={capturing}
        />
      </View>

      {photoUri ? (
        <View style={styles.previewCard}>
          <Text style={styles.previewTitle}>Preview</Text>

          <Image
            source={{ uri: photoUri }}
            style={styles.preview}
            resizeMode="cover"
          />
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  scrollContent: {
    padding: Spacing.screenPadding,
    paddingBottom: Spacing.xxl,
  },

  title: {
    ...Typography.heading2,
    color: Colors.text,
  },

  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
  },

  cameraCard: {
    overflow: "hidden",

    borderRadius: Spacing.borderRadius,

    borderWidth: 1,
    borderColor: Colors.border,

    backgroundColor: Colors.white,

    shadowColor: Colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },

  camera: {
    width: "100%",
    aspectRatio: 3 / 4,
  },

  buttonContainer: {
    marginTop: Spacing.lg,
  },

  previewCard: {
    marginTop: Spacing.xl,

    backgroundColor: Colors.white,

    borderRadius: Spacing.borderRadius,

    padding: Spacing.lg,

    borderWidth: 1,
    borderColor: Colors.border,

    shadowColor: Colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },

  previewTitle: {
    ...Typography.title,
    color: Colors.text,
    marginBottom: Spacing.md,
  },

  preview: {
    width: "100%",
    height: 220,
    borderRadius: Spacing.inputRadius,
    backgroundColor: Colors.surface,
  },

  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    padding: Spacing.screenPadding,

    backgroundColor: Colors.background,
  },

  permissionIcon: {
    fontSize: 64,
    marginBottom: Spacing.lg,
  },

  permissionTitle: {
    ...Typography.heading3,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },

  permissionText: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: Spacing.xl,
    lineHeight: 24,
  },
});
