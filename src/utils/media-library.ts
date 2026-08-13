import * as MediaLibrary from 'expo-media-library';

export const useMediaPermissions = MediaLibrary.usePermissions;

export const saveToLibraryAsync = async (uri: string) => {
  return await MediaLibrary.saveToLibraryAsync(uri);
};
