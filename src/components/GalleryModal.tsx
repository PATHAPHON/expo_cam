import React from 'react';
import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FilterOverlay } from './FilterOverlay';
import { CapturedPhoto } from '@/types/camera';

interface GalleryModalProps {
  visible: boolean;
  photos: CapturedPhoto[];
  onClose: () => void;
  onSelectPhoto: (photo: CapturedPhoto) => void;
  onDeletePhoto: (photoId: string) => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  visible,
  photos,
  onClose,
  onSelectPhoto,
  onDeletePhoto,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtn} onPress={onClose}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.titleGroup}>
            <Text style={styles.title}>คลังรูปถ่ายในแอป ({photos.length})</Text>
            <Text style={styles.subtitle}>รูปภาพที่ถ่ายในเซสชันนี้</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        {photos.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="images-outline" size={64} color="#52525B" />
            <Text style={styles.emptyTitle}>ยังไม่มีรูปถ่าย</Text>
            <Text style={styles.emptySubtitle}>
              กดปุ่มชัตเตอร์บนหน้าแอปกล้องถ่ายรูปเพื่อเริ่มถ่ายภาพ
            </Text>
          </View>
        ) : (
          <FlatList
            data={photos}
            keyExtractor={(item) => item.id}
            numColumns={3}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.photoGridCell}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.photoCard}
                  onPress={() => onSelectPhoto(item)}
                >
                  <Image source={{ uri: item.uri }} style={styles.thumbImage} />
                  <FilterOverlay filter={item.filter} />
                  <View style={styles.filterBadge}>
                    <Text style={styles.filterBadgeText}>
                      {item.filter === 'normal'
                        ? 'ปกติ'
                        : item.filter === 'bw'
                        ? 'ขาวดำ'
                        : 'สดใส'}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => onDeletePhoto(item.id)}
                >
                  <Ionicons name="trash-outline" size={14} color="#EF4444" />
                </TouchableOpacity>
              </View>
            )}
          />
        )}
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
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  titleGroup: {
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    color: '#A1A1AA',
    fontSize: 11,
    marginTop: 2,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubtitle: {
    color: '#A1A1AA',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 8,
  },
  listContent: {
    padding: 8,
  },
  photoGridCell: {
    flex: 1 / 3,
    aspectRatio: 1,
    padding: 4,
    position: 'relative',
  },
  photoCard: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#1F1F23',
    position: 'relative',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  filterBadge: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  filterBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '600',
  },
  deleteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.75)',
    padding: 6,
    borderRadius: 12,
  },
});
