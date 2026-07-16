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
        <View style={styles.permissionIconContainer}>
          <Text style={styles.permissionIcon}>📷</Text>
        </View>

        <Text style={styles.permissionTitle}>Camera Permission Required</Text>

        <Text style={styles.permissionText}>
          Allow camera access to capture food photos and complete your order
          experience.
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
      <View style={styles.headerCard}>
        <Text style={styles.title}>Food Camera</Text>

        <Text style={styles.subtitle}>
          Capture your delicious meal before enjoying it.
        </Text>
      </View>

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

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Tips</Text>

        <Text style={styles.infoText}>
          • Keep the camera steady.
          {"\n"}• Ensure good lighting.
          {"\n"}• Center the food before capturing.
        </Text>
      </View>

      <View style={styles.previewCard}>
        <Text style={styles.previewTitle}>Latest Photo</Text>

        {photoUri ? (
          <Image
            source={{ uri: photoUri }}
            style={styles.preview}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.emptyPreview}>
            <Text style={styles.emptyIcon}>🖼️</Text>

            <Text style={styles.emptyText}>No photo captured yet.</Text>
          </View>
        )}
      </View>
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

  headerCard: {
    marginBottom: Spacing.lg,
  },

  title: {
    ...Typography.heading2,
    color: Colors.text,
  },

  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
    lineHeight: 22,
  },

  cameraCard: {
    overflow: "hidden",

    borderRadius: 20,

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

  infoCard: {
    marginTop: Spacing.xl,

    backgroundColor: Colors.white,

    borderRadius: 20,

    borderWidth: 1,
    borderColor: Colors.border,

    padding: Spacing.xl,

    shadowColor: Colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },

  infoTitle: {
    ...Typography.title,
    color: Colors.text,
    marginBottom: Spacing.md,
  },

  infoText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 24,
  },

  previewCard: {
    marginTop: Spacing.xl,

    backgroundColor: Colors.white,

    borderRadius: 20,

    borderWidth: 1,
    borderColor: Colors.border,

    padding: Spacing.lg,

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

    borderRadius: 14,

    backgroundColor: Colors.surface,
  },

  emptyPreview: {
    height: 220,

    borderRadius: 14,

    backgroundColor: Colors.surface,

    justifyContent: "center",
    alignItems: "center",
  },

  emptyIcon: {
    fontSize: 40,
    marginBottom: Spacing.md,
  },

  emptyText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },

  permissionContainer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",

    padding: Spacing.screenPadding,

    backgroundColor: Colors.background,
  },

  permissionIconContainer: {
    width: 100,
    height: 100,

    borderRadius: 50,

    backgroundColor: Colors.surface,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: Spacing.xl,
  },

  permissionIcon: {
    fontSize: 50,
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

    lineHeight: 24,

    marginBottom: Spacing.xl,
  },
});
