import { PermissionResponse, PermissionStatus } from 'expo-modules-core';

const defaultPermission: PermissionResponse = {
  granted: true,
  canAskAgain: false,
  expires: 'never',
  status: PermissionStatus.GRANTED,
};

export const useMediaPermissions = () => {
  return [
    defaultPermission,
    async () => defaultPermission,
    async () => defaultPermission,
  ] as const;
};

export const saveToLibraryAsync = async (uri: string) => {
  if (typeof document !== 'undefined') {
    const link = document.createElement('a');
    link.href = uri;
    link.download = `expo_cam_${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
