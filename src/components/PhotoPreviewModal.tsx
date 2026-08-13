import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import { FilterOverlay } from './FilterOverlay';
import { FILTER_OPTIONS, CapturedPhoto, FilterId } from '@/types/camera';

interface PhotoPreviewModalProps {
  visible: boolean;
  photo: CapturedPhoto | null;
  onClose: () => void;
  onUpdatePhotoFilter?: (photoId: string, newFilter: FilterId) => void;
}

export const PhotoPreviewModal: React.FC<PhotoPreviewModalProps> = ({
  visible,
  photo,
  onClose,
  onUpdatePhotoFilter,
}) => {
  const [overrideFilter, setOverrideFilter] = useState<FilterId | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();

  const handleClose = () => {
    setOverrideFilter(null);
    setSavedSuccess(false);
    onClose();
  };

  if (!photo) return null;

  const currentFilter = overrideFilter ?? photo.filter;

  const handleFilterChange = (filterId: FilterId) => {
    setOverrideFilter(filterId);
    if (onUpdatePhotoFilter && photo) {
      onUpdatePhotoFilter(photo.id, filterId);
    }
  };

  const handleSavePhoto = async () => {
    try {
      setSaving(true);
      if (Platform.OS !== 'web') {
        if (!mediaPermission?.granted) {
          const permission = await requestMediaPermission();
          if (!permission.granted) {
            Alert.alert(
              'ต้องการสิทธิ์เข้าถึงคลังภาพ',
              'กรุณายินยอมให้เข้าถึงคลังภาพเพื่อบันทึกรูปถ่ายลงในเครื่อง'
            );
            setSaving(false);
            return;
          }
        }
        await MediaLibrary.saveToLibraryAsync(photo.uri);
      }
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (error) {
      console.error('Save photo error:', error);
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถบันทึกรูปภาพได้');
    } finally {
      setSaving(false);
    }
  };

  const formattedDate = new Date(photo.timestamp).toLocaleString('th-TH', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <SafeAreaView style={styles.container}>
        {/* Header Bar */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtn} onPress={handleClose}>
            <Ionicons name="close-outline" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>ตัวอย่างรูปถ่าย</Text>
            <Text style={styles.headerSubtitle}>{formattedDate}</Text>
          </View>
          <TouchableOpacity
            style={[styles.saveBtn, savedSuccess && styles.saveBtnSuccess]}
            onPress={handleSavePhoto}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : savedSuccess ? (
              <>
                <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
                <Text style={styles.saveBtnText}>บันทึกแล้ว</Text>
              </>
            ) : (
              <>
                <Ionicons name="download-outline" size={18} color="#FFFFFF" />
                <Text style={styles.saveBtnText}>บันทึกรูป</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Image Preview Canvas */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: photo.uri }} style={styles.image} resizeMode="contain" />
          <FilterOverlay filter={currentFilter} />
          {savedSuccess && (
            <View style={styles.toastContainer}>
              <Ionicons name="checkmark-circle" size={24} color="#10B981" />
              <Text style={styles.toastText}>บันทึกรูปภาพลงในคลังภาพเรียบร้อยแล้ว!</Text>
            </View>
          )}
        </View>

        {/* Filter Switcher Panel */}
        <View style={styles.filterPanel}>
          <Text style={styles.filterTitle}>ปรับเปลี่ยนฟิลเตอร์รูปถ่าย:</Text>
          <View style={styles.filterRow}>
            {FILTER_OPTIONS.map((opt) => {
              const isSelected = currentFilter === opt.id;
              return (
                <TouchableOpacity
                  key={opt.id}
                  style={[
                    styles.filterChip,
                    isSelected && { borderColor: opt.color, backgroundColor: 'rgba(50,50,60,0.9)' },
                  ]}
                  onPress={() => handleFilterChange(opt.id)}
                >
                  <Ionicons
                    name={opt.iconName as any}
                    size={16}
                    color={isSelected ? opt.color : '#888'}
                  />
                  <Text style={[styles.filterChipText, isSelected && { color: '#FFF', fontWeight: '700' }]}>
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090B',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#121215',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: '#A1A1AA',
    fontSize: 11,
    marginTop: 2,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    gap: 6,
  },
  saveBtnSuccess: {
    backgroundColor: '#059669',
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  toastContainer: {
    position: 'absolute',
    bottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.95)',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
    gap: 8,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  toastText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  filterPanel: {
    padding: 16,
    backgroundColor: '#121215',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  filterTitle: {
    color: '#A1A1AA',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 10,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 8,
  },
  filterChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    gap: 6,
  },
  filterChipText: {
    color: '#A1A1AA',
    fontSize: 13,
    fontWeight: '500',
  },
});
