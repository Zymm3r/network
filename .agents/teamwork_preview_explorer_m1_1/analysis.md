# UI Translation Coverage Requirements Analysis (R1)

## Executive Summary
This report presents a comprehensive analysis of the UI translation coverage for the UTech Network 101 learning platform. The investigation identified extensive hardcoded strings in the Equipment feature components, multiple pages using inline language ternaries, and critical translation gaps in the Sidebar component and LessonDetail page. Currently, the system uses a custom `useI18n` hook and defined translations in `src/app/i18n/th.ts` and `src/app/i18n/en.ts`. This analysis outlines the exact locations requiring translation keys and proposes a comprehensive mapping to support a seamless multi-language implementation.

---

## 1. Equipment Features (Hardcoded Strings Extraction)

The following 6 files in `src/features/equipment/` contain hardcoded Thai and English strings that must be extracted into the translation files.

### 1.1 `src/features/equipment/components/EquipmentDetailTabs.tsx`
- **Line 28**: `'Overview'` (Tab label)
- **Line 29**: `'Wiring Simulator'` (Tab label)
- **Line 30**: `'Documents'` (Tab label)
- **Line 31**: `'FAQ'` (Tab label)
- **Line 32**: `'Troubleshooting'` (Tab label)
- **Line 33**: `'Training'` (Tab label)
- **Line 44**: `สื่อการสอน (Training Media)` (Modal header title)
- **Line 57**: `[Training] Video completed!` (Console log / feedback)
- **Line 58**: `[Training] Progress: ${p}%` (Console log / feedback)
- **Line 100**: `กำลังโหลดข้อมูล...` (Loading state text)
- **Line 106**: `ไม่สามารถโหลดข้อมูลได้` (Error state title)
- **Line 114**: `รายละเอียดสินค้า` (Section header)
- **Line 126**: `'ไม่มีรายละเอียดระบุไว้'` (Description fallback)
- **Line 133**: `หมวดหมู่ (Category)` (Field label)
- **Line 134**: `"-"` (Fallback value)
- **Line 137**: `แหล่งอ้างอิง (Source)` (Field label)
- **Line 140**: `คลิกดูรายละเอียดจากตัวแทนจำหน่าย` (External link anchor text)
- **Line 143**: `"-"` (Fallback value)
- **Line 152**: `"อุปกรณ์เครือข่าย"` (Default productName fallback)
- **Line 175**: `ดาวน์โหลดเอกสาร (Download)` (Download link text)
- **Line 179**: `ไม่มีไฟล์เอกสาร (No file available)` (No document fallback)
- **Line 191**: `ไม่มีเอกสาร (No Documents)` (Empty state title)
- **Line 192**: `ยังไม่มีเอกสารคู่มือหรือ Datasheet สำหรับอุปกรณ์นี้ในระบบ` (Empty state description)
- **Line 221**: `ไม่มีคำถามที่พบบ่อย (No FAQs)` (Empty state title)
- **Line 222**: `ยังไม่มีข้อมูลคำถาม-ตอบสำหรับอุปกรณ์นี้ในระบบ` (Empty state description)
- **Line 236**: `ปัญหา: ` (Guide prefix)
- **Line 240**: `อาการที่พบ (Symptoms)` (Column title)
- **Line 244**: `วิธีแก้ไข (Solution)` (Column title)
- **Line 256**: `ไม่มีคู่มือแก้ปัญหา (No Troubleshooting)` (Empty state title)
- **Line 257**: `ยังไม่มีข้อมูลการแก้ไขปัญหาเบื้องต้นสำหรับอุปกรณ์นี้ในระบบ` (Empty state description)
- **Line 274**: `'Beginner'` (Difficulty default fallback)
- **Line 281**: `บทเรียน ` (Subtopic list header)
- **Line 289**: `'ไม่มีลิงก์วิดีโอสำหรับบทเรียนนี้'` (Error message alert)
- **Line 306**: `เริ่มดูสื่อการสอน (Watch Lesson)` (Video start button)
- **Line 313**: `ไม่มีสื่อวิดีโอ (No video available)` (No video fallback)
- **Line 326**: `ไม่มีสื่อการสอน (No Training Media)` (Empty state title)
- **Line 327**: `ยังไม่มีหลักสูตรวิดีโอหรือสื่อการสอนสำหรับอุปกรณ์นี้ในระบบ` (Empty state description)

### 1.2 `src/features/equipment/pages/EquipmentDetailPage.tsx`
- **Line 52**: `error ? 'เกิดข้อผิดพลาดในการโหลดข้อมูล' : 'ไม่พบอุปกรณ์'` (Error vs not found header)
- **Line 55**: `error?.message || 'อุปกรณ์ที่คุณกำลังค้นหาไม่มีอยู่ในระบบ หรืออาจถูกลบไปแล้ว'` (Detail description fallback)
- **Line 61**: `กลับไปหน้าแคตตาล็อก` (Back button text)
- **Line 78**: `แคตตาล็อกอุปกรณ์` (Breadcrumb link text)
- **Line 96**: `ไม่มีรูปภาพ` (No image fallback)

### 1.3 `src/features/equipment/pages/EquipmentPage.tsx`
- **Line 49**: `เกิดข้อผิดพลาดในการโหลดข้อมูล` (Error state header)
- **Line 55**: `ลองใหม่อีกครั้ง` (Retry button text)
- **Line 69**: `แคตตาล็อกอุปกรณ์` (Main page header)
- **Line 70**: `ค้นหาและดูรายละเอียดอุปกรณ์ทั้งหมดในระบบ` (Sub-header description)

### 1.4 `src/features/equipment/components/EquipmentCard.tsx`
- **Line 22**: `ไม่มีรูปภาพ` (No image fallback)
- **Line 39**: `ดูรายละเอียด` (Button link text)

### 1.5 `src/features/equipment/components/EquipmentGrid.tsx`
- **Line 34**: `ไม่มีข้อมูลอุปกรณ์` (Empty state header)
- **Line 35**: `ไม่พบข้อมูลสินค้าในระบบ` (Empty state description)
- **Line 48**: `placeholder="ค้นหาอุปกรณ์..."` (Search input placeholder)
- **Line 65**: `'All' ? 'ทั้งหมด' : cat` (Category filter all tab)
- **Line 83**: `ไม่พบอุปกรณ์ที่ค้นหา` (No search results header)
- **Line 84**: `ลองเปลี่ยนคำค้นหาหรือเลือกหมวดหมู่ใหม่` (No search results description)
- **Line 89**: `ล้างการค้นหา` (Clear search filter button)

### 1.6 `src/features/equipment/components/WiringSimulator.tsx`
- **Lines 27-61 (Scenarios)**: Cable Names and Port Names inside scenarios:
  - CCTV scenario: `Power In`, `Power Supply`, `LAN Cable`
  - Network/AP scenario: `LAN Port`, `LAN Cable`, `Power Adapter`
  - IP Camera/NVR scenario: `NVR LAN Port`, `LAN Cable`, `Signal Wire`
  - Default scenario: `12V DC Power In`, `RJ45 Network / PoE`, `Alarm I/O`, `Cat6 LAN Cable`, `12V Adapter`, `Signal Wire`, `24V AC Adapter`
- **Line 73**: `'กรุณาเลือกสายไฟที่ต้องการเชื่อมต่อก่อน (Please select a cable first)'` (Error alert message)
- **Line 80**: `การเชื่อมต่อสายไฟไม่ถูกต้อง! สายนี้ไม่สามารถเสียบเข้ากับ ${port?.name} ได้` (Error message)
- **Line 100**: `Wiring Simulator: ` (Header title prefix)
- **Line 101**: `จำลองการต่อสายอุปกรณ์ กรุณาเลือกสายไฟที่ถูกต้องและคลิกที่พอร์ตเพื่อเชื่อมต่อ` (Description text)
- **Line 105**: `Completed` (Completion percentage suffix)
- **Line 120**: `การเชื่อมต่อเสร็จสมบูรณ์!` (Success alert title)
- **Line 121**: `อุปกรณ์พร้อมใช้งานและจ่ายไฟได้ตามปกติ` (Success alert description)
- **Line 129**: `สายไฟที่มีให้เลือก (Cables)` (Section title)
- **Line 157**: `Selected` (Selection badge text)
- **Line 158**: ` Connected` (Connection badge text)
- **Line 167**: `พอร์ตบนอุปกรณ์ (Device Ports)` (Section title)
- **Line 188**: `Port` (Badge small label)
- **Line 224**: `รีเซ็ตการเชื่อมต่อ (Reset)` (Reset button text)

---

## 2. Pages with Inline Language Ternaries

The following 5 pages contain occurrences of `language === 'th' ? ... : ...` that need to be replaced with standard translation keys.

### 2.1 `src/app/pages/Dashboard.tsx`
- **Line 73**: `{language === 'th' ? 'แดชบอร์ด Analytics' : 'Analytics Dashboard'}`
- **Lines 76-78**:
  ```typescript
  {isAdmin 
    ? (language === 'th' ? 'ภาพรวมการเรียนการสอนของนักเรียนทั้งหมด' : 'Platform wide learning analytics and overview.')
    : (language === 'th' ? 'ข้อมูลสรุปการเรียนรู้ของคุณ' : 'Your personal learning analytics overview.')}
  ```
- **Line 93**: `{language === 'th' ? 'กำลังปรับปรุงข้อมูล' : 'Data Sync Pending'}`
- **Lines 95-97**:
  ```typescript
  {language === 'th' 
    ? 'ระบบกำลังเตรียมฐานข้อมูล Analytics โปรดลองใหม่อีกครั้งในภายหลัง' 
    : 'Analytics views are being prepared in the database. Please try again later.'}
  ```
- **Line 107**: `{language === 'th' ? 'หลักสูตรที่ลงทะเบียน' : 'Enrolled Courses'}`
- **Line 114**: `{language === 'th' ? 'หลักสูตร' : 'courses'}`
- **Line 122**: `{language === 'th' ? 'บทเรียนที่ผ่านแล้ว' : 'Completed Lessons'}`
- **Line 129**: `{language === 'th' ? 'บทเรียน' : 'lessons'}`
- **Line 137**: `{language === 'th' ? 'อัตราความสำเร็จในแบบฝึกหัด' : 'Completed Exercises'}`
- **Line 144**: `{language === 'th' ? 'คะแนนเฉลี่ย:' : 'Avg Score:'}`
- **Line 152**: `{language === 'th' ? 'เวลาที่ใช้เรียน' : 'Study Time'}`
- **Line 159**: `{language === 'th' ? 'ชั่วโมง' : 'hours'}`
- **Line 167**: `{language === 'th' ? 'ความคืบหน้าภาพรวม' : 'Completion Rate'}`
- **Line 174**: `{language === 'th' ? 'อัตราเรียนจบ' : 'courses completed'}`
- **Line 187**: `{language === 'th' ? 'ผู้ใช้งาน Active (30 วัน)' : 'Active Users (30d)'}`
- **Line 199**: `{language === 'th' ? 'คอร์สที่เรียนจบ' : 'Course Completions'}`
- **Line 211**: `{language === 'th' ? 'อัตราผ่านแบบฝึกหัด' : 'Exercise Success Rate'}`
- **Line 223**: `{language === 'th' ? 'การพยายามเฉลี่ย' : 'Average Attempts'}`
- **Line 230**: `{language === 'th' ? 'ครั้งต่อแบบฝึกหัด' : 'per exercise'}`
- **Line 238**: `{language === 'th' ? 'ผ่านตั้งแต่ครั้งแรก' : 'First-pass Success'}`
- **Line 249**: `{language === 'th' ? 'แบบฝึกหัดที่ยากที่สุด' : 'Hardest Exercises'}`

### 2.2 `src/app/pages/Profile.tsx`
- **Lines 179-181**:
  ```typescript
  language === 'th'
    ? courseObj?.name_th || enrollment.course_id
    : courseObj?.name_en || enrollment.course_id
  ```
- **Lines 184-189**:
  ```typescript
  let statusText = language === 'th' ? 'เริ่มต้น' : 'Enrolled';
  if (progressPercent === 100) {
    statusText = language === 'th' ? 'เสร็จสิ้น' : 'Completed';
  } else if (progressPercent > 0) {
    statusText = language === 'th' ? 'กำลังเรียน' : 'In Progress';
  }
  ```
- **Lines 218-232 (Default Courses array when empty)**:
  ```typescript
  name: language === 'th' ? 'พื้นฐานเครือข่ายคอมพิวเตอร์' : 'Computer Networking Fundamentals',
  status: language === 'th' ? 'ยังไม่เริ่ม' : 'Not Started',
  // ... repeated for 3 default courses
  ```
- **Line 243**: `label: language === 'th' ? 'เริ่มต้น' : 'Starter'`
- **Line 246**: `label: language === 'th' ? 'หลักสูตรแรก' : 'First Course'`
- **Line 249**: `label: language === 'th' ? '5 วันติด' : '5 Days Streak'`
- **Line 252**: `label: language === 'th' ? '10 คะแนน' : '10 Points'`
- **Line 257**: `label: language === 'th' ? 'เสร็จหลักสูตร' : 'Course Completed'`
- **Line 262**: `label: language === 'th' ? 'Pro User' : 'Pro User'`
- **Line 272**: `language === 'th' ? 'กำลังโหลดข้อมูลโปรไฟล์...' : 'Loading profile details...'`
- **Line 283**: `language === 'th' ? 'โปรไฟล์ของฉัน' : 'My Profile'`
- **Lines 286-288**:
  ```typescript
  language === 'th'
    ? 'ติดตามความก้าวหน้าการเรียนรู้ของคุณ'
    : 'Track your learning progress and achievements'
  ```
- **Line 305**: `language === 'th' ? 'นักเรียน' : 'Student'`
- **Line 315**: `language === 'th' ? 'เข้าสู่ระบบ' : 'Sign In'`
- **Line 320**: `language === 'th' ? 'ออกจากระบบ' : 'Sign Out'`
- **Line 336**: `language === 'th' ? 'หลักสูตร' : 'Courses'`
- **Line 348**: `language === 'th' ? 'เสร็จสิ้น' : 'Completed'`
- **Line 360**: `language === 'th' ? 'ชั่วโมง' : 'Hours'`
- **Line 372**: `language === 'th' ? 'วันติดต่อ' : 'Streak Days'`
- **Line 389**: `language === 'th' ? 'เรียนต่อจากที่ค้างไว้' : 'Resume Learning'`
- **Line 392**: `language === 'th' ? latestLessonObj.title_th : latestLessonObj.title_en`
- **Line 395**: `language === 'th' ? latestCourseObj?.name_th : latestCourseObj?.name_en`
- **Line 403**: `language === 'th' ? 'เรียนต่อเลย' : 'Continue'`
- **Line 415**: `language === 'th' ? 'ความก้าวหน้า' : 'Learning Progress'`
- **Line 423**: `language === 'th' ? 'ภาพรวม' : 'Overall Completion'`
- **Line 452**: `language === 'th' ? 'ความสำเร็จ' : 'Achievements'`
- **Line 482**: `language === 'th' ? 'ใบรับรอง' : 'Certificates'`
- **Line 503**: `language === 'th' ? 'ออกเมื่อ: ' : 'Issued: '`
- **Line 512**: `language === 'th' ? 'ดูใบรับรอง' : 'View'`
- **Line 526**: `language === 'th' ? 'หลักสูตรของฉัน' : 'My Enrolled Courses'`
- **Line 533**: `language === 'th' ? 'กรุณาเข้าสู่ระบบเพื่อบันทึกและจัดการหลักสูตร' : 'Please sign in to save and manage courses'`
- **Line 540**: `language === 'th' ? 'ไปหน้าเข้าสู่ระบบ' : 'Go to Login'`
- **Line 546**: `language === 'th' ? 'ยังไม่มีหลักสูตรที่ลงทะเบียน' : 'You are not enrolled in any courses yet'`
- **Line 553**: `language === 'th' ? 'ค้นหาหลักสูตร' : 'Explore Courses'`
- **Line 569**: `language === 'th' ? 'ลงทะเบียนเมื่อ: ' : 'Enrolled: '`

### 2.3 `src/app/pages/Auth.tsx`
- **Lines 40-42**:
  ```typescript
  language === 'th'
    ? 'ส่งลิงก์ไม่สำเร็จ กรุณาลองใหม่'
    : 'Failed to send link. Please try again.'
  ```
- **Line 62**: `language === 'th' ? 'การสร้างเครือข่ายพื้นฐาน' : 'Network Fundamentals'`
- **Line 69**: `language === 'th' ? 'ยินดีต้อนรับ' : 'Welcome'`
- **Lines 72-74**:
  ```typescript
  language === 'th'
    ? 'กรอกอีเมลเพื่อรับลิงก์เข้าสู่ระบบ ไม่ต้องใช้รหัสผ่าน'
    : 'Enter your email to receive a sign-in link. No password needed.'
  ```
- **Line 86**: `language === 'th' ? 'ส่งลิงก์แล้ว!' : 'Link Sent!'`
- **Lines 89-91**:
  ```typescript
  language === 'th'
    ? `เราส่งลิงก์เข้าสู่ระบบไปที่`
    : `We sent a sign-in link to`
  ```
- **Lines 95-97**:
  ```typescript
  language === 'th'
    ? 'กรุณาตรวจสอบอีเมลและคลิกลิงก์เพื่อเข้าสู่ระบบ'
    : 'Please check your email and click the link to sign in.'
  ```
- **Line 110**: `language === 'th' ? 'ใช้อีเมลอื่น' : 'Use a different email'`
- **Lines 118-124**:
  ```typescript
  language === 'th'
    ? `ส่งลิงก์อีกครั้งใน ${cooldownRemaining} วินาที`
    : `Resend link in ${cooldownRemaining}s`
  // ... and for the button fallback:
  language === 'th' ? 'ส่งลิงก์อีกครั้ง' : 'Resend link'
  ```
- **Line 133**: `language === 'th' ? 'ที่อยู่อีเมล' : 'Email address'`
- **Line 161**: `language === 'th' ? 'กำลังส่ง...' : 'Sending...'`
- **Lines 165-167**:
  ```typescript
  language === 'th'
    ? `กรุณารออีก ${cooldownRemaining} วินาที`
    : `Please wait ${cooldownRemaining}s`
  ```
- **Line 172**: `language === 'th' ? 'ส่งลิงก์เข้าสู่ระบบ' : 'Send Magic Link'`
- **Lines 179-181**:
  ```typescript
  language === 'th'
    ? 'ไม่ต้องสร้างรหัสผ่าน — เราจะส่งลิงก์ไปยังอีเมลของคุณเพื่อเข้าสู่ระบบทุกครั้ง เซสชันจะคงอยู่ 3 วัน'
    : 'No password required — we\'ll email you a secure link to sign in. Sessions last 3 days.'
  ```
- **Line 194**: `language === 'th' ? 'หรือดำเนินการต่อด้วย' : 'Or continue with'`
- **Line 207**: `language === 'th' ? 'เกิดข้อผิดพลาดในการเชื่อมต่อ Google' : 'Failed to connect to Google'`
- **Line 221**: `language === 'th' ? 'เข้าสู่ระบบด้วย Google' : 'Sign in with Google'`
- **Line 235**: `language === 'th' ? 'English' : 'ภาษาไทย'`

### 2.4 `src/app/pages/VerifyCertificate.tsx`
- **Line 37**: `language === 'th' ? 'กำลังตรวจสอบใบรับรอง...' : 'Verifying certificate...'`
- **Line 49**: `language === 'th' ? 'กลับหน้าหลัก' : 'Back to Home'`
- **Lines 67-69**:
  ```typescript
  isVerified 
    ? (language === 'th' ? 'ใบรับรองถูกต้อง' : 'Certificate Verified')
    : (language === 'th' ? 'ไม่พบใบรับรอง' : 'Certificate Not Found')
  ```
- **Lines 72-78**:
  ```typescript
  isVerified 
    ? (language === 'th' 
      ? 'ใบรับรองนี้ออกโดยระบบของเราและมีผลสมบูรณ์' 
      : 'This certificate was issued by our system and is valid.')
    : (language === 'th'
      ? 'หมายเลขใบรับรองนี้ไม่มีอยู่ในระบบ โปรดตรวจสอบความถูกต้องอีกครั้ง'
      : 'This certificate number does not exist in our system. Please check the number and try again.')
  ```
- **Line 93**: `language === 'th' ? 'หมายเลขใบรับรอง' : 'Certificate Number'`
- **Line 103**: `language === 'th' ? 'วันที่ออก' : 'Issue Date'`
- **Line 106**: `language === 'th' ? 'th-TH' : 'en-US'` (Locale format key)
- **Line 114**: `language === 'th' ? 'มอบให้แด่' : 'Awarded To'`
- **Line 123**: `language === 'th' ? 'สำหรับการสำเร็จหลักสูตร' : 'For Completing'`
- **Line 126**: `language === 'th' ? certificate.courses.name_th : certificate.courses.name_en`
- **Line 127**: `language === 'th' ? certificate.learning_paths.name_th : certificate.learning_paths.name_en`
- **Line 136**: `language === 'th' ? 'ดาวน์โหลด PDF (เร็วๆ นี้)' : 'Download PDF (Coming Soon)'`

### 2.5 `src/app/pages/Courses.tsx`
- **Lines 16-36 (formatStudyTime helper)**:
  - Line 16: `lang === 'th' ? `${seconds} วินาที` : `${seconds} secs``
  - Lines 24-26: `lang === 'th' ? `${days} วัน ${hours} ชั่วโมง` : `${days} days ${hours} hrs``
  - Lines 28-30: `lang === 'th' ? `${hours} ชม. ${minutes} นาที` : `${hours} hrs ${minutes} mins``
  - Lines 33-35: `lang === 'th' ? `${minutes} นาที ${remainingSeconds} วินาที` : `${minutes} mins ${remainingSeconds} secs`
- **Line 94**: `language === 'th' ? 'หลักสูตร' : 'Courses'`
- **Line 94**: `courseCount !== null ? `${courseCount} ${language === 'th' ? 'หลักสูตร' : 'Courses'}``
- **Line 95**: `language === 'th' ? 'ผู้เรียน' : 'Students'`
- **Line 95**: `studentCount !== null ? `${studentCount} ${language === 'th' ? 'คน' : 'Students'}``
- **Line 96**: `language === 'th' ? 'เวลาเรียนทั้งหมด' : 'Total Study Time'`

---

## 3. Other Identified Translation Gaps

### 3.1 `src/app/components/layout/Sidebar.tsx` Branding Strings
The Sidebar component contains hardcoded Thai and English strings for platform branding and layout metadata:
- **Line 83**: `Network 101` (Brand Name)
- **Line 84**: `การสร้างเครือข่าย` (Sub-branding subtitle under logo)
- **Line 126**: `สถานะ:` (Role badge label prefix)
- **Line 139**: `Guest` (Unauthenticated fallback user email display)
- **Line 140**: `เรียนรู้การสร้างเครือข่าย` (Static user meta description)

### 3.2 `src/app/pages/LessonDetail.tsx` Lesson Type Labels & Layout Strings
Lesson type labels, checkpoint states, and progress warnings are currently hardcoded to Thai (with some having English alternates, but many lacking them completely):
- **Lines 24-29**: `lessonTypeLabels` lookup table maps keys directly to Thai strings:
  ```typescript
  const lessonTypeLabels: Record<string, string> = {
    video: 'วิดีโอ',
    reading: 'บทความ',
    quiz: 'แบบทดสอบ',
    exercise: 'แบบฝึกหัด',
  };
  ```
- **Line 912**: `'เครือข่ายขัดข้อง ระบบบันทึกข้อมูลแบบออฟไลน์และจะซิงค์ใหม่อัตโนมัติเมื่อออนไลน์'` (Warning message)
- **Line 923**: `'เกิดข้อผิดพลาดในการบันทึกการเรียนรู้ กรุณาลองใหม่อีกครั้ง'` (Error alert)
- **Line 947**: `ไม่พบบทเรียน` (Error state header)
- **Line 948**: `บทเรียนที่คุณกำลังค้นหาอาจถูกลบหรือย้ายไปแล้ว` (Error state description)
- **Line 951**: `กลับไปหน้าบทเรียน` (Back button)
- **Line 979**: `กลับไปหลักสูตร` (Back to course link)
- **Line 997**: `🐍 35 หัวข้อย่อย` (Subtopics count badge)
- **Line 1005**: `ความก้าวหน้าโดยรวม` (Overall progress title)
- **Line 1006**: `{completed} / {total} หัวข้อ` (Checkpoint progress label)
- **Line 1017**: `เรียนครบ 35 หัวข้อแล้ว! ยอดเยี่ยมมาก 🎉` (Congratulatory text)
- **Line 1027**: `อ่านประมาณ ${durationMinutes} นาที` (Reading time estimate)
- **Line 1034**: `${count} คำ` (Word count label)
- **Line 1070**: `วิดีโอจะแสดงเมื่อพร้อมใช้งาน` (Video player fallback)
- **Line 1081**: `เนื้อหา` (Section title)
- **Line 1114**: `บทความ` (Reading tab title)
- **Line 1152**: `เนื้อหาบทความกำลังจัดเตรียม` (Empty article content fallback)
- **Line 1183**: `ต้องสะสม {duration}` (Checkpoint requirement text)
- **Line 1206**: `🎉 เรียนครบทั้ง 35 หัวข้อแล้ว!` (Completion banner title)
- **Line 1208**: `✅ หัวข้อ "${title}" เสร็จสิ้นแล้ว` (Checkpoint done banner title)
- **Line 1209**: `📚 กำลังสะสมเวลา: {title}` (Accumulating time banner title)
- **Line 1214**: `ยินดีด้วย! คุณเรียนจบบทเรียน Python Basics ครบถ้วนสมบูรณ์แล้ว` (Congratulations description)
- **Line 1216**: `คลิกหัวข้ออื่นด้านบนเพื่อเริ่มสะสมเวลาหัวข้อถัดไป` (Help helper text)
- **Line 1217**: `กรุณาเปิดและรับชมวิดีโอในหัวข้อนี้เพื่อสะสมเวลาและบันทึกความก้าวหน้า` (Instruction helper text)
- **Line 1228**: `เวลาที่ต้องสะสม` (Timer badge label)
- **Line 1230**: `✅ สะสมเวลาครบแล้ว!` (Timer completed label)
- **Line 1232**: `เหลืออีก` (Timer remaining prefix)
- **Line 1251**: `กำลังบันทึก...` (Loading submission label)
- **Line 1254**: `เสร็จสิ้นแล้ว` (Checkpoint button done label)
- **Line 1255**: `ทำเครื่องหมายเสร็จ` (Checkpoint button submit label)
- **Line 1258**: `รอสะสมเวลา...` (Checkpoint button disabled label)
- **Line 1269**: `เวลาสะสม` (Progress bar label)
- **Line 1284**: `ภาพรวมความก้าวหน้า` (Footer progress title)
- **Line 1317**: `เรียนรู้บทเรียนนี้เสร็จสิ้นแล้ว` / `ทำเครื่องหมายว่าเสร็จสิ้น` (Standard card title)
- **Line 1320**: `ยินดีด้วย! คุณเรียนบทเรียนนี้ครบถ้วนแล้ว` (Standard completion description)
- **Line 1322**: `กรุณาใช้เวลาศึกษาเนื้อหาบทเรียนนี้ให้ครบถ้วนเพื่อบันทึกความก้าวหน้าของคุณ` (Standard study description)
- **Line 1331**: `เวลาที่ต้องศึกษา` (Standard study timer badge label)
- **Line 1333**: `สะสมเวลาครบถ้วนแล้ว!` / `เหลืออีก {minutes} นาที {seconds} วินาที` (Standard timer status)
- **Line 1379**: `หัวข้อย่อยทั้งหมด` (Subtopics card title)
- **Line 1383**: `เสร็จสิ้น` (Subtopics status count suffix)
- **Line 1408**: `แสดงน้อยลง` (Toggle collapse button label)
- **Line 1410**: `ดูหัวข้ออีก {count} รายการ` (Toggle expand button label)

---

## 4. Review of Existing Translation Files

The existing files `src/app/i18n/th.ts` and `src/app/i18n/en.ts` define a robust core structure, but lack mappings for Dashboard Analytics, Profile achievements/streaks, Verification page details, and Equipment features.

### Current Translation Structure:
- `common`: Generic elements (loading, error, save, cancel, etc.)
- `nav`: Sidebar navigation links (matches Sidebar list keys)
- `auth`: General login fields (does not cover magic links or Google Auth details)
- `courses`: General course catalogs, level translation mappings
- `lessons`: Lesson control actions (video, quiz, exercise, reading, start, continue, complete)
- `schedule`: Calendar schedule labels
- `resources`: Resource categorizations (tools, libraries, documentation)
- `profile`: Profile page section titles
- `levels` & `difficulty`: Localization for course attributes

### Mappings to Keep/Extend:
We will reuse:
- `common.error` and `common.loading`
- `levels` & `difficulty` tags
- `lessons.video`, `lessons.quiz`, `lessons.exercise`, `lessons.reading` to replace `lessonTypeLabels` in `LessonDetail.tsx`.

---

## 5. Proposed Mapping of New Translation Keys

The following keys are proposed to be added to `src/app/i18n/th.ts` and `src/app/i18n/en.ts`.

### 5.1 Proposed Additions to `src/app/i18n/th.ts` (Thai Keys)
```typescript
export const th = {
  // ... existing keys
  brand: {
    name: 'Network 101',
    subtitle: 'การสร้างเครือข่าย',
    learnNetworking: 'เรียนรู้การสร้างเครือข่าย',
  },
  authMagic: {
    failedLink: 'ส่งลิงก์ไม่สำเร็จ กรุณาลองใหม่',
    fundamentals: 'การสร้างเครือข่ายพื้นฐาน',
    welcome: 'ยินดีต้อนรับ',
    welcomeDesc: 'กรอกอีเมลเพื่อรับลิงก์เข้าสู่ระบบ ไม่ต้องใช้รหัสผ่าน',
    linkSent: 'ส่งลิงก์แล้ว!',
    linkSentDesc: 'เราส่งลิงก์เข้าสู่ระบบไปที่',
    checkEmail: 'กรุณาตรวจสอบอีเมลและคลิกลิงก์เพื่อเข้าสู่ระบบ',
    useDifferentEmail: 'ใช้อีเมลอื่น',
    resendCooldown: 'ส่งลิงก์อีกครั้งใน {cooldown} วินาที',
    resend: 'ส่งลิงก์อีกครั้ง',
    emailLabel: 'ที่อยู่อีเมล',
    sending: 'กำลังส่ง...',
    waitCooldown: 'กรุณารออีก {cooldown} วินาที',
    sendLinkBtn: 'ส่งลิงก์เข้าสู่ระบบ',
    disclaimer: 'ไม่ต้องสร้างรหัสผ่าน — เราจะส่งลิงก์ไปยังอีเมลของคุณเพื่อเข้าสู่ระบบทุกครั้ง เซสชันจะคงอยู่ 3 วัน',
    orContinue: 'หรือดำเนินการต่อด้วย',
    googleError: 'เกิดข้อผิดพลาดในการเชื่อมต่อ Google',
    googleSignIn: 'เข้าสู่ระบบด้วย Google',
  },
  dashboardAnalytics: {
    title: 'แดชบอร์ด Analytics',
    adminDesc: 'ภาพรวมการเรียนการสอนของนักเรียนทั้งหมด',
    studentDesc: 'ข้อมูลสรุปการเรียนรู้ของคุณ',
    syncPending: 'กำลังปรับปรุงข้อมูล',
    syncPendingDesc: 'ระบบกำลังเตรียมฐานข้อมูล Analytics โปรดลองใหม่อีกครั้งในภายหลัง',
    enrolledCourses: 'หลักสูตรที่ลงทะเบียน',
    coursesUnit: 'หลักสูตร',
    completedLessons: 'บทเรียนที่ผ่านแล้ว',
    lessonsUnit: 'บทเรียน',
    exerciseSuccess: 'อัตราความสำเร็จในแบบฝึกหัด',
    avgScore: 'คะแนนเฉลี่ย:',
    studyTime: 'เวลาที่ใช้เรียน',
    hoursUnit: 'ชั่วโมง',
    completionRate: 'ความคืบหน้าภาพรวม',
    completedRateDesc: 'อัตราเรียนจบ',
    activeUsers: 'ผู้ใช้งาน Active (30 วัน)',
    courseCompletions: 'คอร์สที่เรียนจบ',
    exerciseSuccessRate: 'อัตราผ่านแบบฝึกหัด',
    avgAttempts: 'การพยายามเฉลี่ย',
    attemptsUnit: 'ครั้งต่อแบบฝึกหัด',
    firstPassRate: 'ผ่านตั้งแต่ครั้งแรก',
    hardestExercises: 'แบบฝึกหัดที่ยากที่สุด',
    noData: 'ยังไม่มีข้อมูล',
    unknownExercise: 'ไม่พบแบบฝึกหัด',
    attemptsCount: '{count} การพยายามทั้งหมด',
    successRate: 'อัตราความสำเร็จ',
  },
  profileStats: {
    starter: 'เริ่มต้น',
    statusEnrolled: 'เริ่มต้น',
    statusCompleted: 'เสร็จสิ้น',
    statusInProgress: 'กำลังเรียน',
    statusNotStarted: 'ยังไม่เริ่ม',
    defaultCcna: 'พื้นฐานเครือข่ายคอมพิวเตอร์',
    defaultDevNet: 'Python สำหรับ Network Engineer',
    defaultSec: 'พื้นฐาน Firewall',
    achFirstCourse: 'หลักสูตรแรก',
    achStreak5: '5 วันติด',
    achPoints10: '10 คะแนน',
    achCourseComp: 'เสร็จหลักสูตร',
    achPro: 'Pro User',
    loading: 'กำลังโหลดข้อมูลโปรไฟล์...',
    myProfile: 'โปรไฟล์ของฉัน',
    desc: 'ติดตามความก้าวหน้าการเรียนรู้ของคุณ',
    roleStudent: 'นักเรียน',
    roleLabel: 'สถานะ:',
    signIn: 'เข้าสู่ระบบ',
    signOut: 'ออกจากระบบ',
    courses: 'หลักสูตร',
    completed: 'เสร็จสิ้น',
    hours: 'ชั่วโมง',
    streakDays: 'วันติดต่อ',
    resumeTitle: 'เรียนต่อจากที่ค้างไว้',
    continueBtn: 'เรียนต่อเลย',
    progressTitle: 'ความก้าวหน้า',
    overallProgress: 'ภาพรวม',
    achTitle: 'ความสำเร็จ',
    certTitle: 'ใบรับรอง',
    issuedAt: 'ออกเมื่อ: ',
    viewCert: 'ดูใบรับรอง',
    myCoursesTitle: 'หลักสูตรของฉัน',
    loginPrompt: 'กรุณาเข้าสู่ระบบเพื่อบันทึกและจัดการหลักสูตร',
    goToLoginBtn: 'ไปหน้าเข้าสู่ระบบ',
    noEnrolledCourses: 'ยังไม่มีหลักสูตรที่ลงทะเบียน',
    exploreCoursesBtn: 'ค้นหาหลักสูตร',
    enrolledAt: 'ลงทะเบียนเมื่อ: ',
    guestUser: 'ผู้ใช้งานทั่วไป',
  },
  verifyCert: {
    verifying: 'กำลังตรวจสอบใบรับรอง...',
    backToHome: 'กลับหน้าหลัก',
    validTitle: 'ใบรับรองถูกต้อง',
    invalidTitle: 'ไม่พบใบรับรอง',
    validDesc: 'ใบรับรองนี้ออกโดยระบบของเราและมีผลสมบูรณ์',
    invalidDesc: 'หมายเลขใบรับรองนี้ไม่มีอยู่ในระบบ โปรดตรวจสอบความถูกต้องอีกครั้ง',
    certNumber: 'หมายเลขใบรับรอง',
    issueDate: 'วันที่ออก',
    awardedTo: 'มอบให้แด่',
    forCompleting: 'สำหรับการสำเร็จหลักสูตร',
    downloadPdf: 'ดาวน์โหลด PDF (เร็วๆ นี้)',
  },
  coursesList: {
    studySec: '{seconds} วินาที',
    studyDaysHours: '{days} วัน {hours} ชั่วโมง',
    studyHoursMins: '{hours} ชม. {minutes} นาที',
    studyMinsSec: '{minutes} นาที {remainingSeconds} วินาที',
    countText: '{count} หลักสูตร',
    studentCountText: '{count} คน',
    totalStudyTime: 'เวลาเรียนทั้งหมด',
    heroTitle: 'Network Fundamentals 101',
    heroDesc: 'เรียนรู้การสร้างเครือข่ายตั้งแต่พื้นฐานสู่การปฏิบัติ',
    tagFundamentals: '🔌 พื้นฐานเครือข่าย',
    tagProtocols: '🌐 Internet Protocols',
    tagSecurity: '🔒 Network Security',
    allCourses: 'หลักสูตรทั้งหมด',
    noCourses: 'ยังไม่มีหลักสูตร',
    noCoursesDesc: 'กรองหรือล้างตัวกรองเพื่อดูหลักสูตรอื่น',
    coursesLabel: 'หลักสูตร',
    studentsLabel: 'ผู้เรียน',
    somethingWrong: 'เกิดข้อผิดพลาดในการโหลดระบบ',
    unexpectedError: 'เกิดข้อผิดพลาดในการดึงข้อมูลหลักสูตร',
    reloadPage: 'โหลดหน้านี้ใหม่',
  },
  equipmentCatalog: {
    loading: 'กำลังโหลดข้อมูล...',
    errorLoading: 'ไม่สามารถโหลดข้อมูลได้',
    overviewTab: 'Overview',
    wiringTab: 'Wiring Simulator',
    documentsTab: 'Documents',
    faqTab: 'FAQ',
    troubleTab: 'Troubleshooting',
    trainingTab: 'Training',
    trainingMediaModal: 'สื่อการสอน (Training Media)',
    categoryLabel: 'หมวดหมู่ (Category)',
    sourceLabel: 'แหล่งอ้างอิง (Source)',
    dealerLink: 'คลิกดูรายละเอียดจากตัวแทนจำหน่าย',
    defaultDeviceName: 'อุปกรณ์เครือข่าย',
    downloadDoc: 'ดาวน์โหลดเอกสาร (Download)',
    noFileAvailable: 'ไม่มีไฟล์เอกสาร (No file available)',
    noDocs: 'ไม่มีเอกสาร (No Documents)',
    noDocsDesc: 'ยังไม่มีเอกสารคู่มือหรือ Datasheet สำหรับอุปกรณ์นี้ในระบบ',
    noFaq: 'ไม่มีคำถามที่พบบ่อย (No FAQs)',
    noFaqDesc: 'ยังไม่มีข้อมูลคำถาม-ตอบสำหรับอุปกรณ์นี้ในระบบ',
    problemPrefix: 'ปัญหา: ',
    symptomsTitle: 'อาการที่พบ (Symptoms)',
    solutionTitle: 'วิธีแก้ไข (Solution)',
    noTroubleshooting: 'ไม่มีคู่มือแก้ปัญหา (No Troubleshooting)',
    noTroubleshootingDesc: 'ยังไม่มีข้อมูลการแก้ไขปัญหาเบื้องต้นสำหรับอุปกรณ์นี้ในระบบ',
    lessonsTitle: 'บทเรียน ({count})',
    noVideoAlert: 'ไม่มีลิงก์วิดีโอสำหรับบทเรียนนี้',
    watchLessonBtn: 'เริ่มดูสื่อการสอน (Watch Lesson)',
    noVideoAvailable: 'ไม่มีสื่อวิดีโอ (No video available)',
    noTrainingMedia: 'ไม่มีสื่อการสอน (No Training Media)',
    noTrainingMediaDesc: 'ยังไม่มีหลักสูตรวิดีโอหรือสื่อการสอนสำหรับอุปกรณ์นี้ในระบบ',
    deviceNotFound: 'ไม่พบอุปกรณ์',
    deviceNotFoundDesc: 'อุปกรณ์ที่คุณกำลังค้นหาไม่มีอยู่ในระบบ หรืออาจถูกลบไปแล้ว',
    backBtn: 'กลับไปหน้าแคตตาล็อก',
    breadcrumbLink: 'แคตตาล็อกอุปกรณ์',
    noImageFallback: 'ไม่มีรูปภาพ',
    retryBtn: 'ลองใหม่อีกครั้ง',
    catalogTitle: 'แคตตาล็อกอุปกรณ์',
    catalogDesc: 'ค้นหาและดูรายละเอียดอุปกรณ์ทั้งหมดในระบบ',
    viewDetailsBtn: 'ดูรายละเอียด',
    noEquipmentData: 'ไม่มีข้อมูลอุปกรณ์',
    noEquipmentDataDesc: 'ไม่พบข้อมูลสินค้าในระบบ',
    searchPlaceholder: 'ค้นหาอุปกรณ์...',
    noSearchResults: 'ไม่พบอุปกรณ์ที่ค้นหา',
    noSearchResultsDesc: 'ลองเปลี่ยนคำค้นหาหรือเลือกหมวดหมู่ใหม่',
    clearSearchBtn: 'ล้างการค้นหา',
    allCategories: 'ทั้งหมด',
  },
  wiringSimulator: {
    selectCableError: 'กรุณาเลือกสายไฟที่ต้องการเชื่อมต่อก่อน (Please select a cable first)',
    incorrectConnectionError: 'การเชื่อมต่อสายไฟไม่ถูกต้อง! สายนี้ไม่สามารถเสียบเข้ากับ {port} ได้',
    title: 'Wiring Simulator: {productName}',
    subtitle: 'จำลองการต่อสายอุปกรณ์ กรุณาเลือกสายไฟที่ถูกต้องและคลิกที่พอร์ตเพื่อเชื่อมต่อ',
    percentCompleted: 'Completed',
    connectionSuccess: 'การเชื่อมต่อเสร็จสมบูรณ์!',
    readyForUse: 'อุปกรณ์พร้อมใช้งานและจ่ายไฟได้ตามปกติ',
    cablesHeader: 'สายไฟที่มีให้เลือก (Cables)',
    cableSelectedBadge: 'Selected',
    cableConnectedBadge: 'Connected',
    portsHeader: 'พอร์ตบนอุปกรณ์ (Device Ports)',
    portSmallLabel: 'Port',
    resetBtn: 'รีเซ็ตการเชื่อมต่อ (Reset)',
    cablePowerSupply: 'Power Supply',
    cableLan: 'LAN Cable',
    cablePowerAdapter: 'Power Adapter',
    cableSignalWire: 'Signal Wire',
    cable12vAdapter: '12V Adapter',
    cable24vAcAdapter: '24V AC Adapter',
    cableCat6Lan: 'Cat6 LAN Cable',
    portPowerIn: 'Power In',
    portLan: 'LAN Port',
    portNvrLan: 'NVR LAN Port',
    port12vDcPowerIn: '12V DC Power In',
    portRj45Network: 'RJ45 Network / PoE',
    portAlarmIo: 'Alarm I/O',
  },
  lessonDetail: {
    offlineSyncSuccess: 'ซิงค์ข้อมูลความก้าวหน้าที่ค้างอยู่เสร็จสิ้น ({count} รายการ)',
    offlineQueueWarning: 'เครือข่ายขัดข้อง ระบบบันทึกข้อมูลแบบออฟไลน์และจะซิงค์ใหม่อัตโนมัติเมื่อออนไลน์',
    saveProgressError: 'เกิดข้อผิดพลาดในการบันทึกการเรียนรู้ กรุณาลองใหม่อีกครั้ง',
    notFound: 'ไม่พบบทเรียน',
    notFoundDesc: 'บทเรียนที่คุณกำลังค้นหาอาจถูกลบหรือย้ายไปแล้ว',
    backToLessonsBtn: 'กลับไปหน้าบทเรียน',
    backToCourseBtn: 'กลับไปหลักสูตร',
    pythonSubTopicsCount: '🐍 35 หัวข้อย่อย',
    overallProgressLabel: 'ความก้าวหน้าโดยรวม',
    pythonProgressText: '{completed} / {total} หัวข้อ ({percent}%)',
    pythonAllCompleted: 'เรียนครบ 35 หัวข้อแล้ว! ยอดเยี่ยมมาก 🎉',
    estReadingTime: 'อ่านประมาณ {minutes} นาที',
    readingTime: '{minutes} นาที',
    wordCountText: '{count} คำ',
    videoPlaceholderText: 'วิดีโอจะแสดงเมื่อพร้อมใช้งาน',
    contentHeader: 'เนื้อหา',
    articleHeader: 'บทความ',
    articleNotAvailable: 'เนื้อหาบทความกำลังจัดเตรียม',
    pythonRequiredTime: 'ต้องสะสม {duration}',
    pythonFullyCompletedTitle: '🎉 เรียนครบทั้ง 35 หัวข้อแล้ว!',
    pythonCheckpointDoneTitle: '✅ หัวข้อ "{title}" เสร็จสิ้นแล้ว',
    pythonAccumulatingTitle: '📚 กำลังสะสมเวลา: {title}',
    pythonFullyCompletedDesc: 'ยินดีด้วย! คุณเรียนจบบทเรียน Python Basics ครบถ้วนสมบูรณ์แล้ว {completedAt}',
    pythonCheckpointDoneDesc: 'คลิกหัวข้ออื่นด้านบนเพื่อเริ่มสะสมเวลาหัวข้อถัดไป',
    pythonAccumulatingDesc: 'กรุณาเปิดและรับชมวิดีโอในหัวข้อนี้เพื่อสะสมเวลาและบันทึกความก้าวหน้า',
    requiredAccumulatedTime: 'เวลาที่ต้องสะสม',
    timeAccumulatedDone: '✅ สะสมเวลาครบแล้ว!',
    timeRemainingText: 'เหลืออีก {time}',
    savingProgress: 'กำลังบันทึก...',
    completedLabel: 'เสร็จสิ้นแล้ว',
    markAsCompletedLabel: 'ทำเครื่องหมายเสร็จ',
    waitingForTime: 'รอสะสมเวลา...',
    accumulatedTimeHeader: 'เวลาสะสม',
    progressOverviewHeader: 'ภาพรวมความก้าวหน้า',
    standardCompletedTitle: 'เรียนรู้บทเรียนนี้เสร็จสิ้นแล้ว',
    standardMarkCompleteTitle: 'ทำเครื่องหมายว่าเสร็จสิ้น',
    standardCompletedDesc: 'ยินดีด้วย! คุณเรียนบทเรียนนี้ครบถ้วนแล้ว {completedAt}',
    standardAccumulateTimeDesc: 'กรุณาใช้เวลาศึกษาเนื้อหาบทเรียนนี้ให้ครบถ้วนเพื่อบันทึกความก้าวหน้าของคุณ',
    requiredStudyTimeLabel: 'เวลาที่ต้องศึกษา',
    studyTimeAccumulatedDone: 'สะสมเวลาครบถ้วนแล้ว!',
    studyTimeRemainingText: 'เหลืออีก {minutes} นาที {seconds} วินาที',
    allSubtopicsTitle: 'หัวข้อย่อยทั้งหมด',
    subtopicsCompletedStatus: '{completed}/{total} เสร็จสิ้น',
    showLessBtn: 'แสดงน้อยลง',
    showMoreSubtopicsBtn: 'ดูหัวข้ออีก {count} รายการ',
    guestUser: 'Guest',
  }
};
```

### 5.2 Proposed Additions to `src/app/i18n/en.ts` (English Keys)
```typescript
export const en: TranslationKeys = {
  // ... existing keys
  brand: {
    name: 'Network 101',
    subtitle: 'Networking',
    learnNetworking: 'Learn Networking',
  },
  authMagic: {
    failedLink: 'Failed to send link. Please try again.',
    fundamentals: 'Network Fundamentals',
    welcome: 'Welcome',
    welcomeDesc: 'Enter your email to receive a sign-in link. No password needed.',
    linkSent: 'Link Sent!',
    linkSentDesc: 'We sent a sign-in link to',
    checkEmail: 'Please check your email and click the link to sign in.',
    useDifferentEmail: 'Use a different email',
    resendCooldown: 'Resend link in {cooldown}s',
    resend: 'Resend link',
    emailLabel: 'Email address',
    sending: 'Sending...',
    waitCooldown: 'Please wait {cooldown}s',
    sendLinkBtn: 'Send Magic Link',
    disclaimer: 'No password required — we\'ll email you a secure link to sign in. Sessions last 3 days.',
    orContinue: 'Or continue with',
    googleError: 'Failed to connect to Google',
    googleSignIn: 'Sign in with Google',
  },
  dashboardAnalytics: {
    title: 'Analytics Dashboard',
    adminDesc: 'Platform wide learning analytics and overview.',
    studentDesc: 'Your personal learning analytics overview.',
    syncPending: 'Data Sync Pending',
    syncPendingDesc: 'Analytics views are being prepared in the database. Please try again later.',
    enrolledCourses: 'Enrolled Courses',
    coursesUnit: 'courses',
    completedLessons: 'Completed Lessons',
    lessonsUnit: 'lessons',
    exerciseSuccess: 'Completed Exercises',
    avgScore: 'Avg Score:',
    studyTime: 'Study Time',
    hoursUnit: 'hours',
    completionRate: 'Completion Rate',
    completedRateDesc: 'courses completed',
    activeUsers: 'Active Users (30d)',
    courseCompletions: 'Course Completions',
    exerciseSuccessRate: 'Exercise Success Rate',
    avgAttempts: 'Average Attempts',
    attemptsUnit: 'per exercise',
    firstPassRate: 'First-pass Success',
    hardestExercises: 'Hardest Exercises',
    noData: 'No data available yet.',
    unknownExercise: 'Unknown Exercise',
    attemptsCount: '{count} attempts total',
    successRate: 'success rate',
  },
  profileStats: {
    starter: 'Starter',
    statusEnrolled: 'Enrolled',
    statusCompleted: 'Completed',
    statusInProgress: 'In Progress',
    statusNotStarted: 'Not Started',
    defaultCcna: 'Computer Networking Fundamentals',
    defaultDevNet: 'Python for Network Engineers',
    defaultSec: 'Firewall Fundamentals',
    achFirstCourse: 'First Course',
    achStreak5: '5 Days Streak',
    achPoints10: '10 Points',
    achCourseComp: 'Course Completed',
    achPro: 'Pro User',
    loading: 'Loading profile details...',
    myProfile: 'My Profile',
    desc: 'Track your learning progress and achievements',
    roleStudent: 'Student',
    roleLabel: 'Role:',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    courses: 'Courses',
    completed: 'Completed',
    hours: 'Hours',
    streakDays: 'Streak Days',
    resumeTitle: 'Resume Learning',
    continueBtn: 'Continue',
    progressTitle: 'Learning Progress',
    overallProgress: 'Overall Completion',
    achTitle: 'Achievements',
    certTitle: 'Certificates',
    issuedAt: 'Issued: ',
    viewCert: 'View',
    myCoursesTitle: 'My Enrolled Courses',
    loginPrompt: 'Please sign in to save and manage courses',
    goToLoginBtn: 'Go to Login',
    noEnrolledCourses: 'You are not enrolled in any courses yet',
    exploreCoursesBtn: 'Explore Courses',
    enrolledAt: 'Enrolled: ',
    guestUser: 'Guest User',
  },
  verifyCert: {
    verifying: 'Verifying certificate...',
    backToHome: 'Back to Home',
    validTitle: 'Certificate Verified',
    invalidTitle: 'Certificate Not Found',
    validDesc: 'This certificate was issued by our system and is valid.',
    invalidDesc: 'This certificate number does not exist in our system. Please check the number and try again.',
    certNumber: 'Certificate Number',
    issueDate: 'Issue Date',
    awardedTo: 'Awarded To',
    forCompleting: 'For Completing',
    downloadPdf: 'Download PDF (Coming Soon)',
  },
  coursesList: {
    studySec: '{seconds} secs',
    studyDaysHours: '{days} days {hours} hrs',
    studyHoursMins: '{hours} hrs {minutes} mins',
    studyMinsSec: '{minutes} mins {remainingSeconds} secs',
    countText: '{count} Courses',
    studentCountText: '{count} Students',
    totalStudyTime: 'Total Study Time',
    heroTitle: 'Network Fundamentals 101',
    heroDesc: 'Learn networking from fundamentals to practice',
    tagFundamentals: '🔌 Network Fundamentals',
    tagProtocols: '🌐 Internet Protocols',
    tagSecurity: '🔒 Network Security',
    allCourses: 'All Courses',
    noCourses: 'No courses yet',
    noCoursesDesc: 'Filter or clear filters to see other courses',
    coursesLabel: 'Courses',
    studentsLabel: 'Students',
    somethingWrong: 'Something went wrong',
    unexpectedError: 'An unexpected error occurred while loading the courses.',
    reloadPage: 'Reload Page',
  },
  equipmentCatalog: {
    loading: 'Loading data...',
    errorLoading: 'An error occurred while loading data',
    overviewTab: 'Overview',
    wiringTab: 'Wiring Simulator',
    documentsTab: 'Documents',
    faqTab: 'FAQ',
    troubleTab: 'Troubleshooting',
    trainingTab: 'Training',
    trainingMediaModal: 'Training Media',
    categoryLabel: 'Category',
    sourceLabel: 'Source',
    dealerLink: 'Click to view details from dealer',
    defaultDeviceName: 'Network Device',
    downloadDoc: 'Download',
    noFileAvailable: 'No file available',
    noDocs: 'No Documents',
    noDocsDesc: 'No manuals or datasheets available for this device yet.',
    noFaq: 'No FAQs',
    noFaqDesc: 'No FAQ data available for this device yet.',
    problemPrefix: 'Issue: ',
    symptomsTitle: 'Symptoms',
    solutionTitle: 'Solution',
    noTroubleshooting: 'No Troubleshooting',
    noTroubleshootingDesc: 'No troubleshooting guide available for this device yet.',
    lessonsTitle: 'Lessons ({count})',
    noVideoAlert: 'No video link available for this lesson',
    watchLessonBtn: 'Watch Lesson',
    noVideoAvailable: 'No video available',
    noTrainingMedia: 'No Training Media',
    noTrainingMediaDesc: 'No training media available for this device yet.',
    deviceNotFound: 'Device Not Found',
    deviceNotFoundDesc: 'The device you are looking for does not exist in the system, or may have been deleted.',
    backBtn: 'Back to Catalog',
    breadcrumbLink: 'Equipment Catalog',
    noImageFallback: 'No Image',
    retryBtn: 'Try Again',
    catalogTitle: 'Equipment Catalog',
    catalogDesc: 'Search and view details of all devices in the system.',
    viewDetailsBtn: 'View Details',
    noEquipmentData: 'No Equipment Data',
    noEquipmentDataDesc: 'No product data found in the system.',
    searchPlaceholder: 'Search equipment...',
    noSearchResults: 'No matching equipment found',
    noSearchResultsDesc: 'Try changing search query or selecting a new category.',
    clearSearchBtn: 'Clear Search',
    allCategories: 'All',
  },
  wiringSimulator: {
    selectCableError: 'Please select a cable first',
    incorrectConnectionError: 'Incorrect connection! This cable cannot be plugged into {port}.',
    title: 'Wiring Simulator: {productName}',
    subtitle: 'Simulate device wiring. Please select the correct cable and click the port to connect.',
    percentCompleted: 'Completed',
    connectionSuccess: 'Connection completed!',
    readyForUse: 'The device is ready and powered normally.',
    cablesHeader: 'Available Cables',
    cableSelectedBadge: 'Selected',
    cableConnectedBadge: 'Connected',
    portsHeader: 'Device Ports',
    portSmallLabel: 'Port',
    resetBtn: 'Reset Connection',
    cablePowerSupply: 'Power Supply',
    cableLan: 'LAN Cable',
    cablePowerAdapter: 'Power Adapter',
    cableSignalWire: 'Signal Wire',
    cable12vAdapter: '12V Adapter',
    cable24vAcAdapter: '24V AC Adapter',
    cableCat6Lan: 'Cat6 LAN Cable',
    portPowerIn: 'Power In',
    portLan: 'LAN Port',
    portNvrLan: 'NVR LAN Port',
    port12vDcPowerIn: '12V DC Power In',
    portRj45Network: 'RJ45 Network / PoE',
    portAlarmIo: 'Alarm I/O',
  },
  lessonDetail: {
    offlineSyncSuccess: 'Synced offline progress ({count} items)',
    offlineQueueWarning: 'Network error. Lesson completed offline. Will sync when back online.',
    saveProgressError: 'Failed to save lesson progress. Please try again.',
    notFound: 'Lesson Not Found',
    notFoundDesc: 'The lesson you are looking for does not exist or may have been deleted.',
    backToLessonsBtn: 'Back to Lessons',
    backToCourseBtn: 'Back to Course',
    pythonSubTopicsCount: '🐍 35 Subtopics',
    overallProgressLabel: 'Overall Progress',
    pythonProgressText: '{completed} / {total} topics ({percent}%)',
    pythonAllCompleted: 'Completed all 35 topics! Excellent job! 🎉',
    estReadingTime: 'Est. read time: {minutes} mins',
    readingTime: '{minutes} minutes',
    wordCountText: '{count} words',
    videoPlaceholderText: 'Video will be shown when available',
    contentHeader: 'Content',
    articleHeader: 'Article',
    articleNotAvailable: 'Article content is being prepared',
    pythonRequiredTime: 'Requires {duration}',
    pythonFullyCompletedTitle: '🎉 Completed all 35 topics!',
    pythonCheckpointDoneTitle: '✅ Topic "{title}" completed',
    pythonAccumulatingTitle: '📚 Accumulating time: {title}',
    pythonFullyCompletedDesc: 'Congratulations! You have completed Python Basics lessons. {completedAt}',
    pythonCheckpointDoneDesc: 'Click other topics above to start accumulating time for the next topic.',
    pythonAccumulatingDesc: 'Please watch the video for this topic to accumulate time and record progress.',
    requiredAccumulatedTime: 'Time required',
    timeAccumulatedDone: '✅ Time accumulated!',
    timeRemainingText: '{time} remaining',
    savingProgress: 'Saving...',
    completedLabel: 'Completed',
    markAsCompletedLabel: 'Mark Complete',
    waitingForTime: 'Waiting for time...',
    accumulatedTimeHeader: 'Accumulated Time',
    progressOverviewHeader: 'Progress Overview',
    standardCompletedTitle: 'Completed learning this lesson',
    standardMarkCompleteTitle: 'Mark as complete',
    standardCompletedDesc: 'Congratulations! You have completed this lesson. {completedAt}',
    standardAccumulateTimeDesc: 'Please study the content of this lesson to record your progress.',
    requiredStudyTimeLabel: 'Study time required',
    studyTimeAccumulatedDone: 'Study time accumulated!',
    studyTimeRemainingText: '{minutes} mins {seconds} secs remaining',
    allSubtopicsTitle: 'All Subtopics',
    subtopicsCompletedStatus: '{completed}/{total} Completed',
    showLessBtn: 'Show less',
    showMoreSubtopicsBtn: 'View {count} more topics',
    guestUser: 'Guest',
  }
};
```
