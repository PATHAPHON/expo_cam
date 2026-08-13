import React from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ExploreScreen() {
  const openClassroomUrl = () => {
    Linking.openURL('https://tanapattara.github.io/react_native/week-09');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="camera-outline" size={36} color="#3B82F6" />
          <Text style={styles.headerTitle}>คู่มือใช้งาน & การส่งงาน</Text>
          <Text style={styles.headerSubtitle}>
            แอปพลิเคชันกล้องถ่ายรูปพร้อมระบบเลือกฟิลเตอร์แต่งรูป 3 รูปแบบ
          </Text>
        </View>

        {/* Section 1: Features */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="sparkles" size={20} color="#F59E0B" />
            <Text style={styles.cardTitle}>ฟิลเตอร์แต่งรูป (3 รูปแบบ)</Text>
          </View>

          <View style={styles.filterItem}>
            <View style={[styles.filterBadge, { backgroundColor: '#2563EB' }]}>
              <Text style={styles.filterBadgeText}>1. ปกติ (Normal)</Text>
            </View>
            <Text style={styles.filterDesc}>แสดงภาพสดจากกล้องตามธรรมชาติ ไม่มีการปรับแต่งสี</Text>
          </View>

          <View style={styles.filterItem}>
            <View style={[styles.filterBadge, { backgroundColor: '#4B5563' }]}>
              <Text style={styles.filterBadgeText}>2. ขาวดำ (Black & White)</Text>
            </View>
            <Text style={styles.filterDesc}>ปรับโทนภาพเป็นขาวดำคลาสสิก คอนทราสต์สูง มีเสน่ห์</Text>
          </View>

          <View style={styles.filterItem}>
            <View style={[styles.filterBadge, { backgroundColor: '#D97706' }]}>
              <Text style={styles.filterBadgeText}>3. สดใส (Vivid Warm)</Text>
            </View>
            <Text style={styles.filterDesc}>เพิ่มความอุ่นและสว่างสดใสของสีภาพ ถ่ายคนหรือวิวได้อย่างสวยงาม</Text>
          </View>
        </View>

        {/* Section 2: How to submit to GitHub */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="logo-github" size={20} color="#FFFFFF" />
            <Text style={styles.cardTitle}>ขั้นตอนการอัปโหลดงานขึ้น GitHub</Text>
          </View>

          <View style={styles.stepBox}>
            <Text style={styles.stepNum}>1</Text>
            <View style={styles.stepInfo}>
              <Text style={styles.stepTitle}>สร้าง Git Repository</Text>
              <Text style={styles.stepCode}>git init</Text>
              <Text style={styles.stepCode}>git add .</Text>
              <Text style={styles.stepCode}>git commit -m &quot;Complete camera app with filters&quot;</Text>
            </View>
          </View>

          <View style={styles.stepBox}>
            <Text style={styles.stepNum}>2</Text>
            <View style={styles.stepInfo}>
              <Text style={styles.stepTitle}>สร้าง Repo บน GitHub แล้ว Push ขึ้นไป</Text>
              <Text style={styles.stepCode}>git remote add origin https://github.com/USERNAME/expo_cam.git</Text>
              <Text style={styles.stepCode}>git branch -M main</Text>
              <Text style={styles.stepCode}>git push -u origin main</Text>
            </View>
          </View>

          <View style={styles.stepBox}>
            <Text style={styles.stepNum}>3</Text>
            <View style={styles.stepInfo}>
              <Text style={styles.stepTitle}>คัดลอก URL ของ Repository ไปส่งในเว็บ Classroom</Text>
              <TouchableOpacity style={styles.linkBtn} onPress={openClassroomUrl}>
                <Ionicons name="open-outline" size={16} color="#FFFFFF" />
                <Text style={styles.linkBtnText}>ไปยังหน้าส่งงาน (Week 09)</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={styles.footerText}>Expo SDK 57 • Camera & Filters Project</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090B',
  },
  scrollContent: {
    padding: 20,
    gap: 16,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 8,
  },
  headerSubtitle: {
    color: '#A1A1AA',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#18181B',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    paddingBottom: 10,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  filterItem: {
    gap: 4,
    marginTop: 4,
  },
  filterBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  filterBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  filterDesc: {
    color: '#D4D4D8',
    fontSize: 13,
    lineHeight: 18,
  },
  stepBox: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  stepNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 28,
  },
  stepInfo: {
    flex: 1,
    gap: 4,
  },
  stepTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  stepCode: {
    color: '#6EE7B7',
    backgroundColor: '#09090B',
    padding: 6,
    borderRadius: 6,
    fontFamily: 'monospace',
    fontSize: 11,
  },
  linkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#059669',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    gap: 6,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  linkBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  footerText: {
    color: '#52525B',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 12,
  },
});
