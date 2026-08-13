import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, CameraType, FlashMode, useCameraPermissions } from 'expo-camera';

import { FilterOverlay } from './FilterOverlay';
import { FilterSelectorBar } from './FilterSelectorBar';
import { GalleryModal } from './GalleryModal';
import { PhotoPreviewModal } from './PhotoPreviewModal';
import { CapturedPhoto, FilterId } from '@/types/camera';

export const CameraViewComponent: React.FC = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState<FlashMode>('off');
  const [zoom, setZoom] = useState<number>(0);
  const [selectedFilter, setSelectedFilter] = useState<FilterId>('normal');
  const [isCapturing, setIsCapturing] = useState<boolean>(false);

  const [photos, setPhotos] = useState<CapturedPhoto[]>([]);
  const [activePreviewPhoto, setActivePreviewPhoto] = useState<CapturedPhoto | null>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState<boolean>(false);
  const [isGalleryVisible, setIsGalleryVisible] = useState<boolean>(false);

  const cameraRef = useRef<any>(null);

  // Toggle Facing (Front / Back)
  const toggleFacing = () => {
    setFacing((prev) => (prev === 'back' ? 'front' : 'back'));
  };

  // Cycle Flash Mode (Off -> On -> Auto -> Off)
  const cycleFlash = () => {
    setFlash((prev) => {
      if (prev === 'off') return 'on';
      if (prev === 'on') return 'auto';
      return 'off';
    });
  };

  // Cycle Zoom level (0 -> 0.05 -> 0.1 -> 0)
  const cycleZoom = () => {
    setZoom((prev) => {
      if (prev === 0) return 0.05;
      if (prev === 0.05) return 0.1;
      return 0;
    });
  };

  // Take Picture
  const handleTakePicture = async () => {
    if (!cameraRef.current || isCapturing) return;
    try {
      setIsCapturing(true);
      const options = { quality: 0.95, base64: false, skipProcessing: false };
      const photoData = await cameraRef.current.takePictureAsync(options);

      if (photoData) {
        const newPhoto: CapturedPhoto = {
          id: Date.now().toString(),
          uri: photoData.uri,
          width: photoData.width,
          height: photoData.height,
          filter: selectedFilter,
          timestamp: Date.now(),
        };

        setPhotos((prev) => [newPhoto, ...prev]);
        setActivePreviewPhoto(newPhoto);
        setIsPreviewVisible(true);
      }
    } catch (error) {
      console.error('Failed to take picture:', error);
    } finally {
      setIsCapturing(false);
    }
  };

  const handleUpdatePhotoFilter = (photoId: string, newFilter: FilterId) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === photoId ? { ...p, filter: newFilter } : p))
    );
    if (activePreviewPhoto && activePreviewPhoto.id === photoId) {
      setActivePreviewPhoto({ ...activePreviewPhoto, filter: newFilter });
    }
  };

  const handleDeletePhoto = (photoId: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== photoId));
    if (activePreviewPhoto?.id === photoId) {
      setIsPreviewVisible(false);
      setActivePreviewPhoto(null);
    }
  };

  if (!permission) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>กำลังโหลดข้อมูลกล้อง...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <View style={styles.permissionCard}>
          <View style={styles.iconCircle}>
            <Ionicons name="camera" size={42} color="#3B82F6" />
          </View>
          <Text style={styles.permissionTitle}>แอปกล้องถ่ายรูปพร้อมฟิลเตอร์</Text>
          <Text style={styles.permissionDesc}>
            โปรดอนุญาตสิทธิ์เข้าถึงกล้องถ่ายรูป เพื่อเริ่มต้นใช้งาน ถ่ายภาพ และใส่ฟิลเตอร์แต่งรูปสวยงาม
          </Text>
          <TouchableOpacity style={styles.permissionBtn} onPress={requestPermission}>
            <Ionicons name="checkmark-circle-outline" size={20} color="#FFF" />
            <Text style={styles.permissionBtnText}>อนุญาตใช้งานกล้อง</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const recentPhoto = photos[0];

  return (
    <View style={styles.container}>
      {/* 1. Camera View - SDK 57 strictly requires no children inside CameraView */}
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        facing={facing}
        flash={flash}
        zoom={zoom}
      />

      {/* 2. Filter Live Overlay Layer (Sibling of CameraView) */}
      <FilterOverlay filter={selectedFilter} />

      {/* 3. Controls & UI Overlay (Sibling of CameraView) */}
      <SafeAreaView style={styles.overlayContainer} pointerEvents="box-none">
        {/* Top Navigation / Controls Bar */}
        <View style={styles.topBar}>
          <View style={styles.badgeTag}>
            <Ionicons name="sparkles" size={14} color="#F59E0B" />
            <Text style={styles.badgeTagText}>Expo Cam v1.0</Text>
          </View>

          <View style={styles.topActions}>
            {/* Flash Mode Switcher */}
            <TouchableOpacity style={styles.topBtn} onPress={cycleFlash}>
              <Ionicons
                name={
                  flash === 'on'
                    ? 'flash'
                    : flash === 'auto'
                    ? 'flash-outline'
                    : 'flash-off-outline'
                }
                size={20}
                color={flash !== 'off' ? '#F59E0B' : '#FFFFFF'}
              />
              <Text style={styles.topBtnText}>
                {flash === 'on' ? 'เปิด' : flash === 'auto' ? 'ออโต้' : 'ปิด'}
              </Text>
            </TouchableOpacity>

            {/* Zoom Switcher */}
            <TouchableOpacity style={styles.topBtn} onPress={cycleZoom}>
              <Ionicons name="search-outline" size={18} color="#FFFFFF" />
              <Text style={styles.topBtnText}>
                {zoom === 0 ? '1x' : zoom === 0.05 ? '2x' : '3x'}
              </Text>
            </TouchableOpacity>

            {/* Camera Flip Switcher */}
            <TouchableOpacity style={styles.topBtn} onPress={toggleFacing}>
              <Ionicons name="camera-reverse-outline" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Control Section */}
        <View style={styles.bottomSection}>
          {/* Filter Selector Bar */}
          <FilterSelectorBar
            selectedFilter={selectedFilter}
            onSelectFilter={(id) => setSelectedFilter(id)}
          />

          {/* Shutter Button & Controls Row */}
          <View style={styles.shutterRow}>
            {/* Gallery Thumbnail Preview Button */}
            <TouchableOpacity
              style={styles.galleryThumbBtn}
              onPress={() => setIsGalleryVisible(true)}
            >
              {recentPhoto ? (
                <View style={styles.thumbWrapper}>
                  <Image source={{ uri: recentPhoto.uri }} style={styles.thumbImg} />
                  <View style={styles.thumbBadge}>
                    <Text style={styles.thumbBadgeText}>{photos.length}</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.thumbPlaceholder}>
                  <Ionicons name="images-outline" size={24} color="#A1A1AA" />
                </View>
              )}
            </TouchableOpacity>

            {/* Main Shutter Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.shutterOuterRing}
              onPress={handleTakePicture}
              disabled={isCapturing}
            >
              <View
                style={[
                  styles.shutterInnerCircle,
                  isCapturing && styles.shutterCapturing,
                ]}
              >
                {isCapturing ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <View style={styles.shutterCore} />
                )}
              </View>
            </TouchableOpacity>

            {/* Quick Filter Info / Flip Shortcut */}
            <TouchableOpacity style={styles.secondaryActionBtn} onPress={toggleFacing}>
              <Ionicons name="sync-outline" size={24} color="#FFFFFF" />
              <Text style={styles.secondaryActionText}>สลับกล้อง</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {/* 4. Photo Preview Modal */}
      <PhotoPreviewModal
        visible={isPreviewVisible}
        photo={activePreviewPhoto}
        onClose={() => setIsPreviewVisible(false)}
        onUpdatePhotoFilter={handleUpdatePhotoFilter}
      />

      {/* 5. Gallery Modal */}
      <GalleryModal
        visible={isGalleryVisible}
        photos={photos}
        onClose={() => setIsGalleryVisible(false)}
        onSelectPhoto={(photo) => {
          setActivePreviewPhoto(photo);
          setIsPreviewVisible(true);
        }}
        onDeletePhoto={handleDeletePhoto}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  centerContainer: {
    flex: 1,
    backgroundColor: '#09090B',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    color: '#A1A1AA',
    fontSize: 14,
    marginTop: 12,
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: '#09090B',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  permissionCard: {
    backgroundColor: '#18181B',
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    maxWidth: 380,
    width: '100%',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  permissionDesc: {
    fontSize: 14,
    color: '#A1A1AA',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  permissionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    gap: 8,
    elevation: 4,
  },
  permissionBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  badgeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  badgeTagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  topBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  topBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  bottomSection: {
    paddingBottom: 24,
  },
  shutterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    marginTop: 8,
  },
  galleryThumbBtn: {
    width: 56,
    height: 56,
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    position: 'relative',
  },
  thumbImg: {
    width: '100%',
    height: '100%',
  },
  thumbBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  thumbBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
  },
  thumbPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    backgroundColor: 'rgba(24, 24, 27, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterOuterRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  shutterInnerCircle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterCapturing: {
    backgroundColor: '#EF4444',
  },
  shutterCore: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
  },
  secondaryActionBtn: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(24, 24, 27, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryActionText: {
    color: '#D4D4D8',
    fontSize: 9,
    fontWeight: '600',
    marginTop: 2,
  },
});
