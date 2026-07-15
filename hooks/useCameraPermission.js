import { useCameraPermissions } from "expo-camera";

export default function useCameraPermission() {
  const [permission, requestPermission] = useCameraPermissions();

  return {
    permission,
    loading: permission === null,
    granted: permission?.granted ?? false,
    canAskAgain: permission?.canAskAgain ?? true,
    requestPermission,
  };
}
