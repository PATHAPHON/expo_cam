# คู่มืออัปโหลดงานขึ้น GitHub และส่งลิงก์ใน Classroom

## 📌 ขั้นตอนที่ 1: เตรียม Git Repository บนเครื่องของคุณ

เปิด Terminal หรือ Command Line ในโฟลเดอร์โครงการ `/Users/pat/Project/expo_cam` แล้วพิมพ์คำสั่งดังนี้:

```bash
git init
git add .
git commit -m "Complete camera app with 3 filter modes and modern UI"
```

---

## 📌 ขั้นตอนที่ 2: สร้าง Repository บน GitHub และ Push โค้ด

1. เข้าไปที่ [GitHub.com](https://github.com) และกดสร้าง **New Repository**
2. ตั้งชื่อ Repository เช่น `expo_cam` (ตั้งเป็น Public)
3. คัดลอก URL ของ Repository (เช่น `https://github.com/YOUR_USERNAME/expo_cam.git`)
4. รันคำสั่งต่อไปนี้ใน Terminal:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/expo_cam.git
git push -u origin main
```

---

## 📌 ขั้นตอนที่ 3: ส่งลิงก์เข้า Classroom (Week 09)

1. คัดลอกลิงก์ GitHub Repository ของคุณ (เช่น `https://github.com/YOUR_USERNAME/expo_cam`)
2. เปิดลิงก์หน้าส่งงาน: [https://tanapattara.github.io/react_native/week-09](https://tanapattara.github.io/react_native/week-09)
3. วางลิงก์ GitHub Repository และกดยืนยันการส่งงานก่อนถึงกำหนดเวลา

---

### ✨ สรุปฟีเจอร์เด่นในแอปกล้องถ่ายรูปนี้
- 📷 **ฟิลเตอร์ 3 รูปแบบ**:
  1. `ปกติ` (Normal) - โทนธรรมชาติ
  2. `ขาวดำ` (Black & White) - ขาวดำคลาสสิก คอนทราสต์สูง
  3. `สดใส` (Vivid Warm) - โทนสีสว่างสดใส อบอุ่น
- ⚡ **การควบคุมกล้องครบครัน**: สลับกล้องหน้า-หลัง, เปิด-ปิดแฟลช/ออโต้, ปรับซูม 1x/2x/3x
- 🖼️ **ระบบพรีวิว & คลังภาพ**: กดดูรูปภาพย้อนหลังในเซสชัน บันทึกลงเครื่อง (`expo-media-library`) ปรับเปลี่ยนฟิลเตอร์หลังถ่ายรูปได้
- 🎨 **ดีไซน์ส่วนติดต่อผู้ใช้ (UI)**: Glassmorphic Dark Mode หรูหรา สะอาดตา ปุ่มชัตเตอร์ตอบสนองได้ดี
