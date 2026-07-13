-- Migration: Backfill content_th (and set content_en = content_th) for lessons with missing/short content
-- Topics: IP SLA, Stateful Inspection, Firewall Basics, Python Basics,
--         Resolving Merge Conflict, Git Commands Quiz,
--         NAT & PAT, PPP & HDLC, VTP & Inter-VLAN Routing,
--         OSPF Route Summarization, OSPF Areas and LSA Types

-- ═══════════════════════════════════════════
-- 1. IP SLA (lesson-ts005-01)
-- ═══════════════════════════════════════════
UPDATE public.lessons SET
  content_th = '## ทำความรู้จักและคอนฟิก IP SLA เบื้องต้น

**สิ่งที่จะได้เรียนในคลิปนี้**
ในคลิปนี้เราจะเรียนรู้เกี่ยวกับ Cisco IP SLA (Service Level Agreement) ซึ่งเป็นเครื่องมือตรวจสอบเครือข่ายแบบ Proactive ที่ช่วยให้ Router สามารถทดสอบและวัดประสิทธิภาพของเส้นทางเครือข่ายได้อย่างต่อเนื่องตลอด 24 ชั่วโมง และนำผลลัพธ์ที่ได้มาเป็นเงื่อนไขในการเปลี่ยนเส้นทาง (Routing) โดยอัตโนมัติ

**เนื้อหาหลัก**
- **IP SLA คืออะไร:** เป็น Feature ของ Cisco IOS ที่ใช้ส่ง Probe Packet ไปทดสอบเส้นทางเครือข่ายอย่างสม่ำเสมอ โดยไม่ต้องรอให้เกิดปัญหาก่อน (Proactive Monitoring)
- **Operation แบบ ICMP Echo:** ใช้ส่ง Ping ไปยัง IP ปลายทาง เหมาะสำหรับตรวจสอบว่าปลายทางสามารถเข้าถึงได้หรือไม่ (Reachability Check) ง่ายที่สุดและไม่ต้องการ Responder ที่ปลายทาง
- **Operation แบบ UDP Jitter:** ใช้วัด Latency, Jitter (ความผันผวนของ Delay) และ Packet Loss เหมาะสำหรับแอปพลิเคชันที่ไวต่อความหน่วงเช่น VoIP โดยต้องมี Cisco IP SLA Responder ที่ปลายทาง
- **การเชื่อมกับ Floating Static Route:** ใช้ร่วมกับ Enhanced Object Tracking เพื่อให้ Router ถอด Primary Route ออกจาก Routing Table โดยอัตโนมัติเมื่อ Probe ล้มเหลว และสลับไปใช้ Backup Route ที่มี AD สูงกว่า
- **คำสั่งสำคัญ:**
```text
ip sla <id>
  icmp-echo <dst-ip> source-interface <intf>
  frequency <วินาที>
ip sla schedule <id> life forever start-time now
track <obj-id> ip sla <id> reachability
ip route 0.0.0.0 0.0.0.0 <next-hop> track <obj-id>
ip route 0.0.0.0 0.0.0.0 <backup-next-hop> 5
```
- **Delay ใน Tracking:** ใช้คำสั่ง `delay down 10 up 10` ป้องกัน Route Flapping เมื่อสัญญาณไม่เสถียร

**สรุป**
IP SLA เป็นเครื่องมืออันทรงพลังของ Cisco ที่ทำให้เครือข่ายมีความ Resilient โดยการตรวจสอบเส้นทางอย่างต่อเนื่องและสั่งเปลี่ยนเส้นทางได้โดยอัตโนมัติเมื่อเกิดปัญหา ช่วยลดเวลา Downtime และทำให้ระบบ Failover ทำงานได้อย่างชาญฉลาดโดยไม่ต้องพึ่งพาการแจ้งเตือนจาก Routing Protocol',
  content_en = '## ทำความรู้จักและคอนฟิก IP SLA เบื้องต้น

**สิ่งที่จะได้เรียนในคลิปนี้**
ในคลิปนี้เราจะเรียนรู้เกี่ยวกับ Cisco IP SLA (Service Level Agreement) ซึ่งเป็นเครื่องมือตรวจสอบเครือข่ายแบบ Proactive ที่ช่วยให้ Router สามารถทดสอบและวัดประสิทธิภาพของเส้นทางเครือข่ายได้อย่างต่อเนื่องตลอด 24 ชั่วโมง และนำผลลัพธ์ที่ได้มาเป็นเงื่อนไขในการเปลี่ยนเส้นทาง (Routing) โดยอัตโนมัติ

**เนื้อหาหลัก**
- **IP SLA คืออะไร:** เป็น Feature ของ Cisco IOS ที่ใช้ส่ง Probe Packet ไปทดสอบเส้นทางเครือข่ายอย่างสม่ำเสมอ โดยไม่ต้องรอให้เกิดปัญหาก่อน (Proactive Monitoring)
- **Operation แบบ ICMP Echo:** ใช้ส่ง Ping ไปยัง IP ปลายทาง เหมาะสำหรับตรวจสอบว่าปลายทางสามารถเข้าถึงได้หรือไม่ (Reachability Check) ง่ายที่สุดและไม่ต้องการ Responder ที่ปลายทาง
- **Operation แบบ UDP Jitter:** ใช้วัด Latency, Jitter (ความผันผวนของ Delay) และ Packet Loss เหมาะสำหรับแอปพลิเคชันที่ไวต่อความหน่วงเช่น VoIP โดยต้องมี Cisco IP SLA Responder ที่ปลายทาง
- **การเชื่อมกับ Floating Static Route:** ใช้ร่วมกับ Enhanced Object Tracking เพื่อให้ Router ถอด Primary Route ออกจาก Routing Table โดยอัตโนมัติเมื่อ Probe ล้มเหลว และสลับไปใช้ Backup Route ที่มี AD สูงกว่า
- **คำสั่งสำคัญ:**
```text
ip sla <id>
  icmp-echo <dst-ip> source-interface <intf>
  frequency <วินาที>
ip sla schedule <id> life forever start-time now
track <obj-id> ip sla <id> reachability
ip route 0.0.0.0 0.0.0.0 <next-hop> track <obj-id>
ip route 0.0.0.0 0.0.0.0 <backup-next-hop> 5
```
- **Delay ใน Tracking:** ใช้คำสั่ง `delay down 10 up 10` ป้องกัน Route Flapping เมื่อสัญญาณไม่เสถียร

**สรุป**
IP SLA เป็นเครื่องมืออันทรงพลังของ Cisco ที่ทำให้เครือข่ายมีความ Resilient โดยการตรวจสอบเส้นทางอย่างต่อเนื่องและสั่งเปลี่ยนเส้นทางได้โดยอัตโนมัติเมื่อเกิดปัญหา ช่วยลดเวลา Downtime และทำให้ระบบ Failover ทำงานได้อย่างชาญฉลาดโดยไม่ต้องพึ่งพาการแจ้งเตือนจาก Routing Protocol'
WHERE id = 'lesson-ts005-01';

-- ═══════════════════════════════════════════
-- 2. Stateful Inspection (lesson-sec-02)
-- ═══════════════════════════════════════════
UPDATE public.lessons SET
  content_th = '## Stateful Inspection Firewall

**สิ่งที่จะได้เรียนในคลิปนี้**
ในคลิปนี้เราจะเปรียบเทียบ Stateful Inspection Firewall กับ Packet Filtering แบบเดิม และทำความเข้าใจว่า Firewall ยุคใหม่ติดตาม Session ของ TCP และ UDP ได้อย่างไร พร้อมทั้งเข้าใจว่าทำไม Stateful Inspection จึงปลอดภัยและฉลาดกว่ามาก

**เนื้อหาหลัก**
- **Packet Filtering (Stateless):** ตรวจสอบแต่ละ Packet แบบแยกส่วน โดยเปรียบเทียบ Header (IP, Port, Protocol) กับ ACL ที่กำหนดไว้ ไม่มีความจำเกี่ยวกับ Packet ก่อนหน้า — เปรียบได้กับ "ยามที่จำอะไรไม่ได้"
- **Stateful Inspection:** ติดตาม Context ของการเชื่อมต่อโดยใช้ **State Table** (ตารางสถานะ) ซึ่งเก็บข้อมูล 5-tuple: Source IP, Source Port, Destination IP, Destination Port, Protocol — เปรียบได้กับ "ยามที่จดบันทึกผู้เข้าออกทุกคน"
- **TCP Session Tracking — Three-Way Handshake:**
  - **SYN:** Firewall รับ Packet แรก ตรวจสอบ Policy หากอนุญาตจะสร้าง Entry ในตารางสถานะ (state: NEW)
  - **SYN-ACK:** Firewall รู้จัก Packet นี้ว่าเป็น Response ที่ถูกต้อง อัปเดตสถานะเป็น ESTABLISHED
  - **ACK:** Handshake สมบูรณ์ Firewall เก็บ Entry ไว้ อนุญาต Data Packets ที่ตามมาโดยอัตโนมัติ
  - **FIN/RST:** เมื่อ Session จบ Firewall ลบ Entry ออกจากตาราง
- **UDP Pseudo-State Tracking:** UDP ไม่มี Handshake จึงไม่มีสถานะจริง แต่ Firewall สร้าง "Virtual Session" โดยบันทึก Flow เมื่อมี Packet ขาออก และอนุญาต Return Traffic ที่ตรงกัน โดยใช้ **Timeout Value** (เช่น 2 นาที) แทนสัญญาณ Close
- **ข้อดีด้านความปลอดภัย:**
  - บล็อก Unsolicited Inbound Traffic โดยอัตโนมัติ (ไม่มีใครถามก็ไม่อนุญาต)
  - ป้องกัน SYN Flood, Port Scanning, IP Spoofing
  - ประสิทธิภาพสูงกว่า Packet Filter เพราะ Packet ใน Established Session ไม่ต้องตรวจ ACL ทุกครั้ง

**สรุป**
Stateful Inspection Firewall เป็นการยกระดับความปลอดภัยที่สำคัญจาก Packet Filtering ด้วยการ "จำ" สถานะของแต่ละ Session ไว้ใน State Table ทำให้ตัดสินใจได้อย่างชาญฉลาดว่า Packet ใดเป็น Traffic ที่ถูกกฎหมายและ Packet ใดเป็นภัยคุกคาม ซึ่งเป็นพื้นฐานสำคัญของ Firewall ในยุคปัจจุบัน',
  content_en = '## Stateful Inspection Firewall

**สิ่งที่จะได้เรียนในคลิปนี้**
ในคลิปนี้เราจะเปรียบเทียบ Stateful Inspection Firewall กับ Packet Filtering แบบเดิม และทำความเข้าใจว่า Firewall ยุคใหม่ติดตาม Session ของ TCP และ UDP ได้อย่างไร พร้อมทั้งเข้าใจว่าทำไม Stateful Inspection จึงปลอดภัยและฉลาดกว่ามาก

**เนื้อหาหลัก**
- **Packet Filtering (Stateless):** ตรวจสอบแต่ละ Packet แบบแยกส่วน โดยเปรียบเทียบ Header (IP, Port, Protocol) กับ ACL ที่กำหนดไว้ ไม่มีความจำเกี่ยวกับ Packet ก่อนหน้า — เปรียบได้กับ "ยามที่จำอะไรไม่ได้"
- **Stateful Inspection:** ติดตาม Context ของการเชื่อมต่อโดยใช้ **State Table** (ตารางสถานะ) ซึ่งเก็บข้อมูล 5-tuple: Source IP, Source Port, Destination IP, Destination Port, Protocol — เปรียบได้กับ "ยามที่จดบันทึกผู้เข้าออกทุกคน"
- **TCP Session Tracking — Three-Way Handshake:**
  - **SYN:** Firewall รับ Packet แรก ตรวจสอบ Policy หากอนุญาตจะสร้าง Entry ในตารางสถานะ (state: NEW)
  - **SYN-ACK:** Firewall รู้จัก Packet นี้ว่าเป็น Response ที่ถูกต้อง อัปเดตสถานะเป็น ESTABLISHED
  - **ACK:** Handshake สมบูรณ์ Firewall เก็บ Entry ไว้ อนุญาต Data Packets ที่ตามมาโดยอัตโนมัติ
  - **FIN/RST:** เมื่อ Session จบ Firewall ลบ Entry ออกจากตาราง
- **UDP Pseudo-State Tracking:** UDP ไม่มี Handshake จึงไม่มีสถานะจริง แต่ Firewall สร้าง "Virtual Session" โดยบันทึก Flow เมื่อมี Packet ขาออก และอนุญาต Return Traffic ที่ตรงกัน โดยใช้ **Timeout Value** (เช่น 2 นาที) แทนสัญญาณ Close
- **ข้อดีด้านความปลอดภัย:**
  - บล็อก Unsolicited Inbound Traffic โดยอัตโนมัติ (ไม่มีใครถามก็ไม่อนุญาต)
  - ป้องกัน SYN Flood, Port Scanning, IP Spoofing
  - ประสิทธิภาพสูงกว่า Packet Filter เพราะ Packet ใน Established Session ไม่ต้องตรวจ ACL ทุกครั้ง

**สรุป**
Stateful Inspection Firewall เป็นการยกระดับความปลอดภัยที่สำคัญจาก Packet Filtering ด้วยการ "จำ" สถานะของแต่ละ Session ไว้ใน State Table ทำให้ตัดสินใจได้อย่างชาญฉลาดว่า Packet ใดเป็น Traffic ที่ถูกกฎหมายและ Packet ใดเป็นภัยคุกคาม ซึ่งเป็นพื้นฐานสำคัญของ Firewall ในยุคปัจจุบัน'
WHERE id = 'lesson-sec-02';

-- ═══════════════════════════════════════════
-- 3. Firewall Basics (lesson-sec-01)
-- ═══════════════════════════════════════════
UPDATE public.lessons SET
  content_th = '## Firewall Basics

**สิ่งที่จะได้เรียนในคลิปนี้**
ในคลิปนี้เราจะปูพื้นฐานความเข้าใจเรื่อง Firewall ตั้งแต่ประเภทของ Firewall แต่ละชนิด การแบ่ง Security Zone, DMZ รวมถึงการทำงานของ Cisco ASA ที่ใช้ Security Level เป็นตัวกำหนดนโยบายการจราจร

**เนื้อหาหลัก**
- **ประเภทของ Firewall:**
  - **Packet Filter Firewall:** ทำงานที่ Layer 3/4 ตรวจสอบ Header ของ Packet เทียบกับ Rule List เป็นแบบ Stateless ง่ายและเร็วแต่ไม่ฉลาด
  - **Stateful Inspection Firewall:** ติดตาม State ของ Connection ผ่าน State Table อนุญาต Return Traffic โดยอัตโนมัติ ปลอดภัยกว่า Packet Filter มาก
  - **Proxy Firewall (Application-Level Gateway):** ทำตัวเป็นตัวกลางในการรับส่งข้อมูล ตรวจสอบ Traffic ที่ Layer 7 มองเห็น Application Data ได้ แต่มี Latency สูงกว่า
  - **Next-Generation Firewall (NGFW):** รวมทุกคุณสมบัติข้างต้นพร้อม Deep Packet Inspection (DPI), App-ID, User-ID, IPS/IDS และ SSL Inspection
- **Security Zones:**
  - **Inside (Trusted):** เครือข่ายภายในองค์กร มีความน่าเชื่อถือสูงสุด
  - **Outside (Untrusted):** อินเทอร์เน็ต หรือเครือข่ายภายนอกที่ไม่น่าเชื่อถือ
  - **DMZ (Demilitarized Zone):** โซนกลางสำหรับวาง Server สาธารณะ (Web, Mail, DNS) แยกออกจากเครือข่ายภายใน หากถูกโจมตีก็จะไม่กระทบ Inside
- **Cisco ASA Security Levels:**
  - ค่าตัวเลขระหว่าง **0 ถึง 100** กำหนดให้กับแต่ละ Interface
  - **Security Level 100** = Inside (เชื่อถือสูงสุด)
  - **Security Level 0** = Outside (ไม่เชื่อถือ)
  - **Security Level 50** (ตัวอย่าง) = DMZ (ระดับกลาง)
  - **กฎพื้นฐาน:** Traffic ไหลจาก Level สูงไปต่ำ → อนุญาตโดยค่าเริ่มต้น; Level ต่ำไปสูง → บล็อกโดยค่าเริ่มต้น (ต้องมี ACL อนุญาตเพิ่ม)
- **Inbound vs. Outbound Policy:**
  - **Inbound:** Traffic จากอินเทอร์เน็ตเข้าสู่ภายใน — ควบคุมเข้มงวดมาก
  - **Outbound:** Traffic จากภายในออกสู่อินเทอร์เน็ต — ใช้ควบคุมเนื้อหาหรือป้องกัน C&C Traffic

**สรุป**
Firewall เป็นแนวป้องกันแรกและสำคัญที่สุดของเครือข่าย การเลือกใช้ Firewall ประเภทที่เหมาะสมและการออกแบบ Security Zone ที่ดีเป็นพื้นฐานสำคัญของ Network Security Architecture โดยเฉพาะในองค์กรที่มีบริการสาธารณะ การแบ่ง DMZ ช่วยป้องกันความเสียหายแบบ Cascading ได้อย่างมีประสิทธิภาพ',
  content_en = '## Firewall Basics

**สิ่งที่จะได้เรียนในคลิปนี้**
ในคลิปนี้เราจะปูพื้นฐานความเข้าใจเรื่อง Firewall ตั้งแต่ประเภทของ Firewall แต่ละชนิด การแบ่ง Security Zone, DMZ รวมถึงการทำงานของ Cisco ASA ที่ใช้ Security Level เป็นตัวกำหนดนโยบายการจราจร

**เนื้อหาหลัก**
- **ประเภทของ Firewall:**
  - **Packet Filter Firewall:** ทำงานที่ Layer 3/4 ตรวจสอบ Header ของ Packet เทียบกับ Rule List เป็นแบบ Stateless ง่ายและเร็วแต่ไม่ฉลาด
  - **Stateful Inspection Firewall:** ติดตาม State ของ Connection ผ่าน State Table อนุญาต Return Traffic โดยอัตโนมัติ ปลอดภัยกว่า Packet Filter มาก
  - **Proxy Firewall (Application-Level Gateway):** ทำตัวเป็นตัวกลางในการรับส่งข้อมูล ตรวจสอบ Traffic ที่ Layer 7 มองเห็น Application Data ได้ แต่มี Latency สูงกว่า
  - **Next-Generation Firewall (NGFW):** รวมทุกคุณสมบัติข้างต้นพร้อม Deep Packet Inspection (DPI), App-ID, User-ID, IPS/IDS และ SSL Inspection
- **Security Zones:**
  - **Inside (Trusted):** เครือข่ายภายในองค์กร มีความน่าเชื่อถือสูงสุด
  - **Outside (Untrusted):** อินเทอร์เน็ต หรือเครือข่ายภายนอกที่ไม่น่าเชื่อถือ
  - **DMZ (Demilitarized Zone):** โซนกลางสำหรับวาง Server สาธารณะ (Web, Mail, DNS) แยกออกจากเครือข่ายภายใน หากถูกโจมตีก็จะไม่กระทบ Inside
- **Cisco ASA Security Levels:**
  - ค่าตัวเลขระหว่าง **0 ถึง 100** กำหนดให้กับแต่ละ Interface
  - **Security Level 100** = Inside (เชื่อถือสูงสุด)
  - **Security Level 0** = Outside (ไม่เชื่อถือ)
  - **Security Level 50** (ตัวอย่าง) = DMZ (ระดับกลาง)
  - **กฎพื้นฐาน:** Traffic ไหลจาก Level สูงไปต่ำ → อนุญาตโดยค่าเริ่มต้น; Level ต่ำไปสูง → บล็อกโดยค่าเริ่มต้น (ต้องมี ACL อนุญาตเพิ่ม)
- **Inbound vs. Outbound Policy:**
  - **Inbound:** Traffic จากอินเทอร์เน็ตเข้าสู่ภายใน — ควบคุมเข้มงวดมาก
  - **Outbound:** Traffic จากภายในออกสู่อินเทอร์เน็ต — ใช้ควบคุมเนื้อหาหรือป้องกัน C&C Traffic

**สรุป**
Firewall เป็นแนวป้องกันแรกและสำคัญที่สุดของเครือข่าย การเลือกใช้ Firewall ประเภทที่เหมาะสมและการออกแบบ Security Zone ที่ดีเป็นพื้นฐานสำคัญของ Network Security Architecture โดยเฉพาะในองค์กรที่มีบริการสาธารณะ การแบ่ง DMZ ช่วยป้องกันความเสียหายแบบ Cascading ได้อย่างมีประสิทธิภาพ'
WHERE id = 'lesson-sec-01';

-- ═══════════════════════════════════════════
-- 4. Python Basics (lesson-python-01)
-- ═══════════════════════════════════════════
UPDATE public.lessons SET
  content_th = '## พื้นฐาน Python สำหรับ Network Engineer

**สิ่งที่จะได้เรียนในคลิปนี้**
ในคลิปนี้เราจะเรียนรู้พื้นฐานของภาษา Python ที่จำเป็นสำหรับ Network Engineer โดยเน้นที่การนำไปใช้งานจริงเพื่อ Automate งานที่ทำซ้ำๆ เช่น การ Backup Config การตรวจสอบ Interface Status หรือการส่งคำสั่งไปยัง Router/Switch พร้อมกันหลายตัวในคราวเดียว

**เนื้อหาหลัก**
- **ทำไมต้องใช้ Python สำหรับ Network Engineer:**
  - ลด Human Error จากการพิมพ์คำสั่งซ้ำๆ ด้วยมือ
  - Automate งานที่ต้องทำกับอุปกรณ์หลายสิบหรือหลายร้อยตัวพร้อมกัน
  - Syntax เรียบง่าย อ่านง่าย เหมาะกับผู้ที่ไม่มีพื้นฐาน Programming มาก่อน
  - รองรับ Multi-vendor (Cisco, Juniper, Arista) ด้วย Library เดียวกัน
- **Data Types ที่สำคัญ:**
  - `str` — เก็บชื่อ Interface, IP Address เช่น `''192.168.1.1''`
  - `int` / `float` — เก็บค่าตัวเลข เช่น VLAN ID, Bandwidth
  - `bool` — `True`/`False` เช่น สถานะ Interface (up/down)
  - `list` — รายการอุปกรณ์ เช่น `[''sw1'', ''sw2'', ''r1'']`
  - `dict` — ข้อมูลแบบ Key-Value เช่น `{''interface'': ''Gi0/1'', ''vlan'': 10}`
- **Control Flow:**
  - `if / elif / else` — เช่น "ถ้า Interface Down ให้ส่ง Alert"
  - `for` loop — วนทำซ้ำกับรายการอุปกรณ์ทั้งหมด
  - `while` loop — ทำซ้ำจนกว่าเงื่อนไขจะเป็นเท็จ
- **Functions:** ห่อโค้ดที่ใช้ซ้ำบ่อยไว้ในฟังก์ชัน เช่น `def connect_to_device(host, user, password):`
- **Modules และ Libraries ที่สำคัญ:**
  - **Netmiko** — SSH เข้าถึง CLI ของ Router/Switch (Cisco, Juniper, Arista ฯลฯ)
  - **NAPALM / Scrapli** — ดึงข้อมูลจากอุปกรณ์แบบ Structured Data
  - **Requests** — เรียก REST API ของ Controller เช่น Cisco DNA Center
  - **json / yaml** — อ่าน/เขียนข้อมูล Config ในรูปแบบ JSON หรือ YAML
- **ตัวอย่างโค้ดเบื้องต้น:**
```python
from netmiko import ConnectHandler
device = {
    ''device_type'': ''cisco_ios'',
    ''host'': ''10.0.0.1'',
    ''username'': ''admin'',
    ''password'': ''cisco''
}
with ConnectHandler(**device) as net_connect:
    output = net_connect.send_command(''show ip interface brief'')
    print(output)
```

**สรุป**
Python เป็นทักษะที่ขาดไม่ได้สำหรับ Network Engineer ยุคใหม่ การเรียนรู้ Data Types, Control Flow, Functions และ Modules พื้นฐานจะทำให้คุณสามารถเขียน Script อย่างง่ายสำหรับการ Automate งาน Network ได้ทันที และเป็นรากฐานที่แข็งแกร่งสำหรับการเรียนรู้ Network Automation ขั้นสูงต่อไป',
  content_en = '## พื้นฐาน Python สำหรับ Network Engineer

**สิ่งที่จะได้เรียนในคลิปนี้**
ในคลิปนี้เราจะเรียนรู้พื้นฐานของภาษา Python ที่จำเป็นสำหรับ Network Engineer โดยเน้นที่การนำไปใช้งานจริงเพื่อ Automate งานที่ทำซ้ำๆ เช่น การ Backup Config การตรวจสอบ Interface Status หรือการส่งคำสั่งไปยัง Router/Switch พร้อมกันหลายตัวในคราวเดียว

**เนื้อหาหลัก**
- **ทำไมต้องใช้ Python สำหรับ Network Engineer:**
  - ลด Human Error จากการพิมพ์คำสั่งซ้ำๆ ด้วยมือ
  - Automate งานที่ต้องทำกับอุปกรณ์หลายสิบหรือหลายร้อยตัวพร้อมกัน
  - Syntax เรียบง่าย อ่านง่าย เหมาะกับผู้ที่ไม่มีพื้นฐาน Programming มาก่อน
  - รองรับ Multi-vendor (Cisco, Juniper, Arista) ด้วย Library เดียวกัน
- **Data Types ที่สำคัญ:**
  - `str` — เก็บชื่อ Interface, IP Address เช่น `''192.168.1.1''`
  - `int` / `float` — เก็บค่าตัวเลข เช่น VLAN ID, Bandwidth
  - `bool` — `True`/`False` เช่น สถานะ Interface (up/down)
  - `list` — รายการอุปกรณ์ เช่น `[''sw1'', ''sw2'', ''r1'']`
  - `dict` — ข้อมูลแบบ Key-Value เช่น `{''interface'': ''Gi0/1'', ''vlan'': 10}`
- **Control Flow:**
  - `if / elif / else` — เช่น "ถ้า Interface Down ให้ส่ง Alert"
  - `for` loop — วนทำซ้ำกับรายการอุปกรณ์ทั้งหมด
  - `while` loop — ทำซ้ำจนกว่าเงื่อนไขจะเป็นเท็จ
- **Functions:** ห่อโค้ดที่ใช้ซ้ำบ่อยไว้ในฟังก์ชัน เช่น `def connect_to_device(host, user, password):`
- **Modules และ Libraries ที่สำคัญ:**
  - **Netmiko** — SSH เข้าถึง CLI ของ Router/Switch (Cisco, Juniper, Arista ฯลฯ)
  - **NAPALM / Scrapli** — ดึงข้อมูลจากอุปกรณ์แบบ Structured Data
  - **Requests** — เรียก REST API ของ Controller เช่น Cisco DNA Center
  - **json / yaml** — อ่าน/เขียนข้อมูล Config ในรูปแบบ JSON หรือ YAML
- **ตัวอย่างโค้ดเบื้องต้น:**
```python
from netmiko import ConnectHandler
device = {
    ''device_type'': ''cisco_ios'',
    ''host'': ''10.0.0.1'',
    ''username'': ''admin'',
    ''password'': ''cisco''
}
with ConnectHandler(**device) as net_connect:
    output = net_connect.send_command(''show ip interface brief'')
    print(output)
```

**สรุป**
Python เป็นทักษะที่ขาดไม่ได้สำหรับ Network Engineer ยุคใหม่ การเรียนรู้ Data Types, Control Flow, Functions และ Modules พื้นฐานจะทำให้คุณสามารถเขียน Script อย่างง่ายสำหรับการ Automate งาน Network ได้ทันที และเป็นรากฐานที่แข็งแกร่งสำหรับการเรียนรู้ Network Automation ขั้นสูงต่อไป'
WHERE id = 'lesson-python-01';

-- ═══════════════════════════════════════════
-- 5. Resolving a Merge Conflict (lesson-git-04)
-- ═══════════════════════════════════════════
UPDATE public.lessons SET
  content_th = '## Resolving a Merge Conflict

**สิ่งที่จะได้เรียนในคลิปนี้**
ในคลิปนี้เราจะเรียนรู้ว่า Merge Conflict ใน Git เกิดขึ้นได้อย่างไร และจะแก้ไขได้อย่างถูกต้องตามขั้นตอน ตั้งแต่การระบุไฟล์ที่มีความขัดแย้ง การอ่าน Conflict Markers และวิธีเลือกโค้ดที่ถูกต้อง จนถึงการ Commit ผลลัพธ์สุดท้าย

**เนื้อหาหลัก**
- **สาเหตุของ Merge Conflict:** เกิดขึ้นเมื่อ Developer 2 คนขึ้นไปแก้ไขไฟล์เดิมบรรทัดเดิมบน Branch คนละ Branch แล้ว Merge เข้าหากัน Git ไม่สามารถตัดสินใจได้เองว่าจะเก็บโค้ดของใคร
- **ขั้นตอนที่ 1 — ระบุไฟล์ที่มีความขัดแย้ง:**
```bash
git status
# ไฟล์ที่มีปัญหาจะแสดงอยู่ใต้ "Unmerged paths"
```
- **ขั้นตอนที่ 2 — อ่าน Conflict Markers ในไฟล์:**
  Git จะแทรก Marker พิเศษเข้าไปในไฟล์:
```
<<<<<<< HEAD
โค้ดของ Branch ปัจจุบัน (ของเรา)
=======
โค้ดของ Branch ที่กำลัง Merge เข้ามา (ของอีกฝ่าย)
>>>>>>> feature-branch
```
  - `<<<<<<< HEAD` = โค้ดเวอร์ชันเรา
  - `=======` = ตัวคั่นระหว่างสองฝั่ง
  - `>>>>>>> [branch]` = โค้ดอีกฝ่าย
- **ขั้นตอนที่ 3 — แก้ไขด้วยตนเอง:** เปิดไฟล์ใน Text Editor เลือกโค้ดที่ต้องการ แล้วลบ Marker ทั้งหมดออก
- **ขั้นตอนที่ 3 (ทางเลือก) — ใช้ git mergetool:** เครื่องมือ GUI เช่น VS Code, KDiff3, Meld จะช่วยแสดงทั้งสองเวอร์ชันพร้อมกัน
- **ขั้นตอนที่ 4 — Stage และ Commit:**
```bash
git add <filename>    # บอก Git ว่าแก้ไขแล้ว
git status            # ตรวจสอบว่าไม่มี Conflict เหลืออยู่
git commit            # สร้าง Merge Commit
```
- **ยกเลิกได้เสมอ:** หากแก้ไขแล้วไม่พอใจสามารถยกเลิกด้วย `git merge --abort` เพื่อกลับไปสถานะก่อน Merge

**สรุป**
Merge Conflict เป็นเรื่องปกติที่เกิดขึ้นในทุก Team ที่ทำงานร่วมกันด้วย Git สิ่งสำคัญคือต้องเข้าใจ Conflict Markers และแก้ไขอย่างระมัดระวัง จากนั้น Stage และ Commit ให้ถูกต้อง การฝึกแก้ Conflict บ่อยๆ จะทำให้ชำนาญและมั่นใจในการทำงานแบบ Collaborative มากขึ้น',
  content_en = '## Resolving a Merge Conflict

**สิ่งที่จะได้เรียนในคลิปนี้**
ในคลิปนี้เราจะเรียนรู้ว่า Merge Conflict ใน Git เกิดขึ้นได้อย่างไร และจะแก้ไขได้อย่างถูกต้องตามขั้นตอน ตั้งแต่การระบุไฟล์ที่มีความขัดแย้ง การอ่าน Conflict Markers และวิธีเลือกโค้ดที่ถูกต้อง จนถึงการ Commit ผลลัพธ์สุดท้าย

**เนื้อหาหลัก**
- **สาเหตุของ Merge Conflict:** เกิดขึ้นเมื่อ Developer 2 คนขึ้นไปแก้ไขไฟล์เดิมบรรทัดเดิมบน Branch คนละ Branch แล้ว Merge เข้าหากัน Git ไม่สามารถตัดสินใจได้เองว่าจะเก็บโค้ดของใคร
- **ขั้นตอนที่ 1 — ระบุไฟล์ที่มีความขัดแย้ง:**
```bash
git status
# ไฟล์ที่มีปัญหาจะแสดงอยู่ใต้ "Unmerged paths"
```
- **ขั้นตอนที่ 2 — อ่าน Conflict Markers ในไฟล์:**
  Git จะแทรก Marker พิเศษเข้าไปในไฟล์:
```
<<<<<<< HEAD
โค้ดของ Branch ปัจจุบัน (ของเรา)
=======
โค้ดของ Branch ที่กำลัง Merge เข้ามา (ของอีกฝ่าย)
>>>>>>> feature-branch
```
  - `<<<<<<< HEAD` = โค้ดเวอร์ชันเรา
  - `=======` = ตัวคั่นระหว่างสองฝั่ง
  - `>>>>>>> [branch]` = โค้ดอีกฝ่าย
- **ขั้นตอนที่ 3 — แก้ไขด้วยตนเอง:** เปิดไฟล์ใน Text Editor เลือกโค้ดที่ต้องการ แล้วลบ Marker ทั้งหมดออก
- **ขั้นตอนที่ 3 (ทางเลือก) — ใช้ git mergetool:** เครื่องมือ GUI เช่น VS Code, KDiff3, Meld จะช่วยแสดงทั้งสองเวอร์ชันพร้อมกัน
- **ขั้นตอนที่ 4 — Stage และ Commit:**
```bash
git add <filename>    # บอก Git ว่าแก้ไขแล้ว
git status            # ตรวจสอบว่าไม่มี Conflict เหลืออยู่
git commit            # สร้าง Merge Commit
```
- **ยกเลิกได้เสมอ:** หากแก้ไขแล้วไม่พอใจสามารถยกเลิกด้วย `git merge --abort` เพื่อกลับไปสถานะก่อน Merge

**สรุป**
Merge Conflict เป็นเรื่องปกติที่เกิดขึ้นในทุก Team ที่ทำงานร่วมกันด้วย Git สิ่งสำคัญคือต้องเข้าใจ Conflict Markers และแก้ไขอย่างระมัดระวัง จากนั้น Stage และ Commit ให้ถูกต้อง การฝึกแก้ Conflict บ่อยๆ จะทำให้ชำนาญและมั่นใจในการทำงานแบบ Collaborative มากขึ้น'
WHERE id = 'lesson-git-04';

-- ═══════════════════════════════════════════
-- 6. Git Commands Knowledge Check (lesson-git-03)
-- ═══════════════════════════════════════════
UPDATE public.lessons SET
  content_th = '## Git Commands Knowledge Check

**สิ่งที่จะได้เรียนในคลิปนี้**
ในคลิปนี้เราจะทบทวนและทดสอบความเข้าใจคำสั่ง Git พื้นฐานที่ใช้บ่อยที่สุดในการทำงานประจำวัน ตั้งแต่การสร้าง Repository การบันทึกการเปลี่ยนแปลง การทำงานร่วมกับทีม จนถึงการดูประวัติและจัดการ Branch

**เนื้อหาหลัก**
- **`git init`** — เริ่มต้น Git Repository ใหม่ในโฟลเดอร์ปัจจุบัน สร้างโฟลเดอร์ `.git` ที่เก็บประวัติทั้งหมด
- **`git clone <url>`** — คัดลอก Repository จากที่อื่น (เช่น GitHub) มายังเครื่องตัวเอง พร้อมประวัติทั้งหมด
- **`git add <file>`** — เพิ่มไฟล์ลงใน Staging Area เตรียมพร้อมสำหรับ Commit (`git add .` เพื่อเพิ่มทุกไฟล์)
- **`git commit -m "message"`** — บันทึก Snapshot ของการเปลี่ยนแปลงที่ Stage ไว้เข้าสู่ประวัติ
- **`git push`** — ส่ง Commit จาก Local Branch ขึ้นสู่ Remote Repository
- **`git pull`** — ดึงการเปลี่ยนแปลงจาก Remote และ Merge เข้ากับ Branch ปัจจุบันทันที
- **`git branch`** — แสดงรายการ Branch ทั้งหมด (`*` คือ Branch ที่ใช้งานอยู่); `git branch <name>` สร้าง Branch ใหม่
- **`git merge <branch>`** — รวมประวัติของ Branch ที่ระบุเข้ากับ Branch ปัจจุบัน
- **`git log`** — แสดงประวัติ Commit; ใช้ `--oneline` เพื่อดูแบบสั้น หรือ `--graph` เพื่อดูเป็น Visual Tree
- **`git status`** — แสดงสถานะของ Working Directory ว่าไฟล์ไหน Modified, Staged, หรือ Untracked
- **`git diff`** — เปรียบเทียบความต่างระหว่าง Working Directory กับ Commit ล่าสุด
- **`git stash`** — เก็บการเปลี่ยนแปลงที่ยังไม่ Commit ไว้ชั่วคราว เพื่อสลับไปทำงานอื่นก่อน; `git stash apply` เพื่อนำกลับมา

**สรุป**
การเข้าใจคำสั่ง Git พื้นฐานเหล่านี้เป็นทักษะที่จำเป็นสำหรับ Developer และ Network Engineer ยุคใหม่ทุกคน การฝึกใช้คำสั่งเหล่านี้ในชีวิตประจำวันจะทำให้การทำงานเป็นทีมมีประสิทธิภาพ ลดข้อผิดพลาด และสามารถย้อนกลับไปแก้ไขได้เสมอเมื่อเกิดปัญหา',
  content_en = '## Git Commands Knowledge Check

**สิ่งที่จะได้เรียนในคลิปนี้**
ในคลิปนี้เราจะทบทวนและทดสอบความเข้าใจคำสั่ง Git พื้นฐานที่ใช้บ่อยที่สุดในการทำงานประจำวัน ตั้งแต่การสร้าง Repository การบันทึกการเปลี่ยนแปลง การทำงานร่วมกับทีม จนถึงการดูประวัติและจัดการ Branch

**เนื้อหาหลัก**
- **`git init`** — เริ่มต้น Git Repository ใหม่ในโฟลเดอร์ปัจจุบัน สร้างโฟลเดอร์ `.git` ที่เก็บประวัติทั้งหมด
- **`git clone <url>`** — คัดลอก Repository จากที่อื่น (เช่น GitHub) มายังเครื่องตัวเอง พร้อมประวัติทั้งหมด
- **`git add <file>`** — เพิ่มไฟล์ลงใน Staging Area เตรียมพร้อมสำหรับ Commit (`git add .` เพื่อเพิ่มทุกไฟล์)
- **`git commit -m "message"`** — บันทึก Snapshot ของการเปลี่ยนแปลงที่ Stage ไว้เข้าสู่ประวัติ
- **`git push`** — ส่ง Commit จาก Local Branch ขึ้นสู่ Remote Repository
- **`git pull`** — ดึงการเปลี่ยนแปลงจาก Remote และ Merge เข้ากับ Branch ปัจจุบันทันที
- **`git branch`** — แสดงรายการ Branch ทั้งหมด (`*` คือ Branch ที่ใช้งานอยู่); `git branch <name>` สร้าง Branch ใหม่
- **`git merge <branch>`** — รวมประวัติของ Branch ที่ระบุเข้ากับ Branch ปัจจุบัน
- **`git log`** — แสดงประวัติ Commit; ใช้ `--oneline` เพื่อดูแบบสั้น หรือ `--graph` เพื่อดูเป็น Visual Tree
- **`git status`** — แสดงสถานะของ Working Directory ว่าไฟล์ไหน Modified, Staged, หรือ Untracked
- **`git diff`** — เปรียบเทียบความต่างระหว่าง Working Directory กับ Commit ล่าสุด
- **`git stash`** — เก็บการเปลี่ยนแปลงที่ยังไม่ Commit ไว้ชั่วคราว เพื่อสลับไปทำงานอื่นก่อน; `git stash apply` เพื่อนำกลับมา

**สรุป**
การเข้าใจคำสั่ง Git พื้นฐานเหล่านี้เป็นทักษะที่จำเป็นสำหรับ Developer และ Network Engineer ยุคใหม่ทุกคน การฝึกใช้คำสั่งเหล่านี้ในชีวิตประจำวันจะทำให้การทำงานเป็นทีมมีประสิทธิภาพ ลดข้อผิดพลาด และสามารถย้อนกลับไปแก้ไขได้เสมอเมื่อเกิดปัญหา'
WHERE id = 'lesson-git-03';

-- ═══════════════════════════════════════════
-- 7. NAT (lesson-ccna005-07) — short content → full markdown
-- ═══════════════════════════════════════════
UPDATE public.lessons SET
  content_th = '## NAT และ PAT

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการแปลง IP Address เพื่อให้อุปกรณ์ Private IP สามารถออกอินเทอร์เน็ตได้ พร้อม Lab ตั้งค่าบน Cisco Router

**เนื้อหาหลัก**
- **Static NAT:** IP Private 1 ตัว ↔ IP Public 1 ตัว เหมาะสำหรับ Server ที่ต้องการ IP คงที่
- **Dynamic NAT:** Pool ของ IP Private ↔ Pool ของ IP Public แบบ First-come first-served
- **PAT (Port Address Translation / NAT Overload):** หลาย IP Private → 1 IP Public โดยแยกด้วย Port Number ที่แตกต่างกัน นี่คือสิ่งที่บ้านทุกหลังใช้งานอยู่
- **การตั้งค่า:**
```text
interface GigabitEthernet0/0
  ip nat inside
interface GigabitEthernet0/1
  ip nat outside
ip nat inside source list 1 interface Gi0/1 overload
access-list 1 permit 192.168.1.0 0.0.0.255
```
- **ตรวจสอบ:** `show ip nat translations`, `show ip nat statistics`
- **NAT ทำลาย End-to-End Transparency:** อุปกรณ์ภายนอกไม่เห็น IP จริงของอุปกรณ์ภายใน ซึ่งเป็นทั้งข้อดี (ความปลอดภัย) และข้อเสีย (Application บางตัวมีปัญหา)

**สรุป**
PAT คือสิ่งที่ทำให้ IPv4 ยังใช้งานได้ถึงทุกวันนี้แม้ Address จะหมด เพราะบ้านแต่ละหลังใช้ IP สาธารณะแค่ 1 ตัวสำหรับอุปกรณ์ทุกชิ้น และเป็น Feature ที่ Engineer ต้องตั้งค่าเป็นในทุก Site',
  content_en = '## NAT และ PAT

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการแปลง IP Address เพื่อให้อุปกรณ์ Private IP สามารถออกอินเทอร์เน็ตได้ พร้อม Lab ตั้งค่าบน Cisco Router

**เนื้อหาหลัก**
- **Static NAT:** IP Private 1 ตัว ↔ IP Public 1 ตัว เหมาะสำหรับ Server ที่ต้องการ IP คงที่
- **Dynamic NAT:** Pool ของ IP Private ↔ Pool ของ IP Public แบบ First-come first-served
- **PAT (Port Address Translation / NAT Overload):** หลาย IP Private → 1 IP Public โดยแยกด้วย Port Number ที่แตกต่างกัน นี่คือสิ่งที่บ้านทุกหลังใช้งานอยู่
- **การตั้งค่า:**
```text
interface GigabitEthernet0/0
  ip nat inside
interface GigabitEthernet0/1
  ip nat outside
ip nat inside source list 1 interface Gi0/1 overload
access-list 1 permit 192.168.1.0 0.0.0.255
```
- **ตรวจสอบ:** `show ip nat translations`, `show ip nat statistics`
- **NAT ทำลาย End-to-End Transparency:** อุปกรณ์ภายนอกไม่เห็น IP จริงของอุปกรณ์ภายใน ซึ่งเป็นทั้งข้อดี (ความปลอดภัย) และข้อเสีย (Application บางตัวมีปัญหา)

**สรุป**
PAT คือสิ่งที่ทำให้ IPv4 ยังใช้งานได้ถึงทุกวันนี้แม้ Address จะหมด เพราะบ้านแต่ละหลังใช้ IP สาธารณะแค่ 1 ตัวสำหรับอุปกรณ์ทุกชิ้น และเป็น Feature ที่ Engineer ต้องตั้งค่าเป็นในทุก Site'
WHERE id = 'lesson-ccna005-07';

-- ═══════════════════════════════════════════
-- 8. HDLC (lesson-ccna004-07) — short content → full markdown
-- ═══════════════════════════════════════════
UPDATE public.lessons SET
  content_th = '## PPP และ HDLC

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอน Protocol ระดับ Data Link ที่ใช้บน Serial/WAN Links แบบ Point-to-Point ทั้ง HDLC และ PPP พร้อม Lab Config

**เนื้อหาหลัก**
- **HDLC (High-Level Data Link Control):** Protocol Default ของ Cisco บน Serial Interface เรียบง่ายแต่ใช้ได้เฉพาะ Cisco เท่านั้น (`encapsulation hdlc`)
- **PPP (Point-to-Point Protocol):** Protocol มาตรฐานเปิดที่ใช้งานได้กับทุก Vendor รองรับ:
  - **Authentication:** PAP (ส่ง Password แบบ Cleartext) หรือ CHAP (ใช้ Challenge-Response ปลอดภัยกว่า)
  - **Compression:** ลดขนาดข้อมูลที่ส่ง
  - **Multilink PPP:** รวมหลาย Link เข้าด้วยกันเพื่อเพิ่ม Bandwidth
- **การตั้งค่า PPP:**
```text
interface Serial0/0
  encapsulation ppp
  ppp authentication chap
username PEER password SECRET
```
- **PPPoE:** ใช้ PPP บน Ethernet พบเห็นในการเชื่อมต่ออินเทอร์เน็ตผ่าน ADSL/Fiber ตามบ้าน
- **ตรวจสอบ:** `show interfaces serial 0/0`, `debug ppp authentication`

**สรุป**
แม้ HDLC และ PPP จะเป็นเทคโนโลยีเก่า แต่ยังปรากฏในข้อสอบ CCNA และระบบ Legacy WAN ขององค์กรบางแห่ง โดยเฉพาะ PPPoE ที่ยังใช้งานอยู่ทั่วไปบน Broadband Connection',
  content_en = '## PPP และ HDLC

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอน Protocol ระดับ Data Link ที่ใช้บน Serial/WAN Links แบบ Point-to-Point ทั้ง HDLC และ PPP พร้อม Lab Config

**เนื้อหาหลัก**
- **HDLC (High-Level Data Link Control):** Protocol Default ของ Cisco บน Serial Interface เรียบง่ายแต่ใช้ได้เฉพาะ Cisco เท่านั้น (`encapsulation hdlc`)
- **PPP (Point-to-Point Protocol):** Protocol มาตรฐานเปิดที่ใช้งานได้กับทุก Vendor รองรับ:
  - **Authentication:** PAP (ส่ง Password แบบ Cleartext) หรือ CHAP (ใช้ Challenge-Response ปลอดภัยกว่า)
  - **Compression:** ลดขนาดข้อมูลที่ส่ง
  - **Multilink PPP:** รวมหลาย Link เข้าด้วยกันเพื่อเพิ่ม Bandwidth
- **การตั้งค่า PPP:**
```text
interface Serial0/0
  encapsulation ppp
  ppp authentication chap
username PEER password SECRET
```
- **PPPoE:** ใช้ PPP บน Ethernet พบเห็นในการเชื่อมต่ออินเทอร์เน็ตผ่าน ADSL/Fiber ตามบ้าน
- **ตรวจสอบ:** `show interfaces serial 0/0`, `debug ppp authentication`

**สรุป**
แม้ HDLC และ PPP จะเป็นเทคโนโลยีเก่า แต่ยังปรากฏในข้อสอบ CCNA และระบบ Legacy WAN ขององค์กรบางแห่ง โดยเฉพาะ PPPoE ที่ยังใช้งานอยู่ทั่วไปบน Broadband Connection'
WHERE id = 'lesson-ccna004-07';

-- ═══════════════════════════════════════════
-- 9. Inter-VLAN Routing (lesson-ccna002-07) — short content → full markdown
-- ═══════════════════════════════════════════
UPDATE public.lessons SET
  content_th = '## VTP และ Inter-VLAN Routing

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอน 2 หัวข้อสำคัญ: การจัดการ VLAN ด้วย VTP และการทำให้ VLAN ต่างๆ สื่อสารกันได้ พร้อม Lab ครบถ้วน

**เนื้อหาหลัก**

**VTP (VLAN Trunking Protocol)**
- ซิงค์ข้อมูล VLAN Database อัตโนมัติระหว่าง Switch บน Trunk Links
- มี 3 Mode:
  - **Server:** สร้าง/แก้ไข/ลบ VLAN ได้ และซิงค์ออกไปให้ Switch อื่น
  - **Client:** รับข้อมูลจาก Server อย่างเดียว ไม่สามารถแก้ไข VLAN ได้
  - **Transparent:** ไม่เข้าร่วม VTP Domain แต่ส่งต่อ VTP Advertisements
- ⚠️ **ความเสี่ยง:** นำ Switch ใหม่ที่มี VTP Revision Number สูงกว่าเข้าวง จะ Overwrite VLAN Database ทั้งหมด!

**Inter-VLAN Routing**
- **Router-on-a-Stick:** ใช้ Router 1 ตัวกับ Sub-interface บน Trunk Link
```text
interface Gi0/0.10
  encapsulation dot1Q 10
  ip address 192.168.10.1 255.255.255.0
interface Gi0/0.20
  encapsulation dot1Q 20
  ip address 192.168.20.1 255.255.255.0
```
- **Layer 3 Switch (SVI):** วิธีที่นิยมในองค์กร ประสิทธิภาพสูงกว่า
```text
ip routing
interface vlan 10
  ip address 192.168.10.1 255.255.255.0
interface vlan 20
  ip address 192.168.20.1 255.255.255.0
```

**สรุป**
VTP ช่วยลดงาน Admin แต่ต้องระวังความเสี่ยงจาก VTP Revision สูง Inter-VLAN Routing ช่วยให้ทุก VLAN สามารถสื่อสารข้ามกันได้ตาม Policy ที่กำหนด',
  content_en = '## VTP และ Inter-VLAN Routing

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอน 2 หัวข้อสำคัญ: การจัดการ VLAN ด้วย VTP และการทำให้ VLAN ต่างๆ สื่อสารกันได้ พร้อม Lab ครบถ้วน

**เนื้อหาหลัก**

**VTP (VLAN Trunking Protocol)**
- ซิงค์ข้อมูล VLAN Database อัตโนมัติระหว่าง Switch บน Trunk Links
- มี 3 Mode:
  - **Server:** สร้าง/แก้ไข/ลบ VLAN ได้ และซิงค์ออกไปให้ Switch อื่น
  - **Client:** รับข้อมูลจาก Server อย่างเดียว ไม่สามารถแก้ไข VLAN ได้
  - **Transparent:** ไม่เข้าร่วม VTP Domain แต่ส่งต่อ VTP Advertisements
- ⚠️ **ความเสี่ยง:** นำ Switch ใหม่ที่มี VTP Revision Number สูงกว่าเข้าวง จะ Overwrite VLAN Database ทั้งหมด!

**Inter-VLAN Routing**
- **Router-on-a-Stick:** ใช้ Router 1 ตัวกับ Sub-interface บน Trunk Link
```text
interface Gi0/0.10
  encapsulation dot1Q 10
  ip address 192.168.10.1 255.255.255.0
interface Gi0/0.20
  encapsulation dot1Q 20
  ip address 192.168.20.1 255.255.255.0
```
- **Layer 3 Switch (SVI):** วิธีที่นิยมในองค์กร ประสิทธิภาพสูงกว่า
```text
ip routing
interface vlan 10
  ip address 192.168.10.1 255.255.255.0
interface vlan 20
  ip address 192.168.20.1 255.255.255.0
```

**สรุป**
VTP ช่วยลดงาน Admin แต่ต้องระวังความเสี่ยงจาก VTP Revision สูง Inter-VLAN Routing ช่วยให้ทุก VLAN สามารถสื่อสารข้ามกันได้ตาม Policy ที่กำหนด'
WHERE id = 'lesson-ccna002-07';

-- ═══════════════════════════════════════════
-- 10. OSPF Route Summarization (lesson-adv-002)
-- ═══════════════════════════════════════════
UPDATE public.lessons SET
  content_th = '## OSPF Route Summarization

**สิ่งที่จะได้เรียนในคลิปนี้**
ในคลิปนี้เราจะเรียนรู้เทคนิค Route Summarization ใน OSPF ซึ่งเป็นวิธีที่ช่วยลดขนาด Routing Table และลดภาระของ Router โดยเราจะเรียนรู้ทั้งการสรุปเส้นทางระหว่าง Area ด้วยคำสั่ง `area range` และการสรุปเส้นทางภายนอกด้วย `summary-address`

**เนื้อหาหลัก**
- **ทำไมต้อง Summarize:** OSPF ไม่มี Auto-Summary จึงต้อง Config ด้วยตนเอง หากไม่ทำ ABR จะโฆษณา Subnet ย่อยทุกตัวออกไป ทำให้ Routing Table ใหญ่โดยไม่จำเป็น
- **`area range` — Inter-Area Summarization:**
  - ใช้บน **ABR (Area Border Router)**
  - รวม Type 1/2 LSA ภายใน Area ให้เหลือ Type 3 LSA เดียวก่อนส่งออก Area อื่น
  - คำสั่ง: `area <area-id> range <network> <mask>`
  - ตัวอย่าง: `area 1 range 172.16.0.0 255.255.252.0` รวม Subnet ใน Area 1 ให้เหลือ /22 เดียว
- **`summary-address` — External Summarization:**
  - ใช้บน **ASBR (Autonomous System Boundary Router)**
  - รวม External Routes (Type 5 LSA) ที่ Redistribute เข้ามาจากภายนอก
  - คำสั่ง: `summary-address <network> <mask>` ภายใต้ OSPF Process
- **การคำนวณ Summary Address:**
  1. แปลง Subnet ทั้งหมดเป็น Binary
  2. หา Common Bits ที่เหมือนกันจากซ้ายไปขวา
  3. จำนวน Common Bits = Prefix Length ของ Summary
  4. ตั้ง Host Bits ที่เหลือเป็น 0
  - ตัวอย่าง: `172.16.0.0/24` + `172.16.1.0/24` มี 23 Bit เหมือนกัน → Summary: `172.16.0.0/23`
- **ประโยชน์:**
  - ลดขนาด Routing Table ประหยัด Memory
  - ลด CPU ที่ใช้ในการคำนวณ SPF
  - ซ่อน Topology เปลี่ยนแปลงภายใน Area ไม่ให้ Trigger SPF ใน Area อื่น
  - ลด LSA Traffic บนเครือข่าย ช่วยประหยัด Bandwidth
- **Discard Route (Null0):** เมื่อ Config Summarization Router จะสร้าง Route ชี้ไป `Null0` อัตโนมัติเพื่อป้องกัน Routing Loop

**สรุป**
OSPF Route Summarization เป็นเทคนิคที่จำเป็นสำหรับเครือข่ายขนาดใหญ่ การเลือกใช้ `area range` บน ABR สำหรับ Inter-area Routes และ `summary-address` บน ASBR สำหรับ External Routes อย่างถูกต้องจะทำให้เครือข่ายมีประสิทธิภาพ เสถียร และ Scale ได้ดียิ่งขึ้น',
  content_en = '## OSPF Route Summarization

**สิ่งที่จะได้เรียนในคลิปนี้**
ในคลิปนี้เราจะเรียนรู้เทคนิค Route Summarization ใน OSPF ซึ่งเป็นวิธีที่ช่วยลดขนาด Routing Table และลดภาระของ Router โดยเราจะเรียนรู้ทั้งการสรุปเส้นทางระหว่าง Area ด้วยคำสั่ง `area range` และการสรุปเส้นทางภายนอกด้วย `summary-address`

**เนื้อหาหลัก**
- **ทำไมต้อง Summarize:** OSPF ไม่มี Auto-Summary จึงต้อง Config ด้วยตนเอง หากไม่ทำ ABR จะโฆษณา Subnet ย่อยทุกตัวออกไป ทำให้ Routing Table ใหญ่โดยไม่จำเป็น
- **`area range` — Inter-Area Summarization:**
  - ใช้บน **ABR (Area Border Router)**
  - รวม Type 1/2 LSA ภายใน Area ให้เหลือ Type 3 LSA เดียวก่อนส่งออก Area อื่น
  - คำสั่ง: `area <area-id> range <network> <mask>`
  - ตัวอย่าง: `area 1 range 172.16.0.0 255.255.252.0` รวม Subnet ใน Area 1 ให้เหลือ /22 เดียว
- **`summary-address` — External Summarization:**
  - ใช้บน **ASBR (Autonomous System Boundary Router)**
  - รวม External Routes (Type 5 LSA) ที่ Redistribute เข้ามาจากภายนอก
  - คำสั่ง: `summary-address <network> <mask>` ภายใต้ OSPF Process
- **การคำนวณ Summary Address:**
  1. แปลง Subnet ทั้งหมดเป็น Binary
  2. หา Common Bits ที่เหมือนกันจากซ้ายไปขวา
  3. จำนวน Common Bits = Prefix Length ของ Summary
  4. ตั้ง Host Bits ที่เหลือเป็น 0
  - ตัวอย่าง: `172.16.0.0/24` + `172.16.1.0/24` มี 23 Bit เหมือนกัน → Summary: `172.16.0.0/23`
- **ประโยชน์:**
  - ลดขนาด Routing Table ประหยัด Memory
  - ลด CPU ที่ใช้ในการคำนวณ SPF
  - ซ่อน Topology เปลี่ยนแปลงภายใน Area ไม่ให้ Trigger SPF ใน Area อื่น
  - ลด LSA Traffic บนเครือข่าย ช่วยประหยัด Bandwidth
- **Discard Route (Null0):** เมื่อ Config Summarization Router จะสร้าง Route ชี้ไป `Null0` อัตโนมัติเพื่อป้องกัน Routing Loop

**สรุป**
OSPF Route Summarization เป็นเทคนิคที่จำเป็นสำหรับเครือข่ายขนาดใหญ่ การเลือกใช้ `area range` บน ABR สำหรับ Inter-area Routes และ `summary-address` บน ASBR สำหรับ External Routes อย่างถูกต้องจะทำให้เครือข่ายมีประสิทธิภาพ เสถียร และ Scale ได้ดียิ่งขึ้น'
WHERE id = 'lesson-adv-002';

-- ═══════════════════════════════════════════
-- 11. OSPF Areas and LSA Types (lesson-adv-001)
-- ═══════════════════════════════════════════
UPDATE public.lessons SET
  content_th = '## OSPF Areas and LSA Types

**สิ่งที่จะได้เรียนในคลิปนี้**
ในคลิปนี้เราจะทำความเข้าใจโครงสร้างของ OSPF ในระดับลึก ทั้งประเภทของ Area ต่างๆ ได้แก่ Backbone, Stub, Totally Stubby, และ NSSA รวมถึง LSA Types 1 ถึง 7 ที่ OSPF ใช้แลกเปลี่ยนข้อมูล Routing และบทบาทของ ABR กับ ASBR

**เนื้อหาหลัก**
- **Area 0 — Backbone Area:** หัวใจหลักของ OSPF ทุก Area ต้องเชื่อมต่อกับ Area 0 โดยตรง (หรือผ่าน Virtual Link) Traffic ระหว่าง Non-Backbone Areas ต้องผ่าน Area 0 เสมอ
- **ประเภทของ OSPF Area:**
  - **Standard Area:** รับ LSA ทุกประเภท (Type 1–5)
  - **Stub Area:** บล็อก External LSA (Type 5); ABR ส่ง Default Route แทน เหมาะเมื่อ Area ไม่ต้องการข้อมูล External Route
  - **Totally Stubby Area (Cisco Proprietary):** บล็อกทั้ง External (Type 5) และ Inter-Area (Type 3); เหลือเพียง Default Route จาก ABR เหมาะกับ Branch Office ที่ Router specs ต่ำ
  - **NSSA (Not-So-Stubby Area):** คล้าย Stub แต่ยอมให้มี ASBR ภายใน Area ได้ โดย External Routes โฆษณาเป็น Type 7 LSA ภายใน NSSA และ ABR แปลงเป็น Type 5 ก่อนส่งออก Area อื่น
- **LSA Types 1–7:**

| LSA Type | ชื่อ | สร้างโดย | ขอบเขต |
|---|---|---|---|
| Type 1 | Router LSA | ทุก Router | ภายใน Area เดียวกัน |
| Type 2 | Network LSA | DR บน Multi-Access | ภายใน Area เดียวกัน |
| Type 3 | Summary LSA | ABR | ระหว่าง Area |
| Type 4 | ASBR Summary LSA | ABR | แจ้งตำแหน่งของ ASBR |
| Type 5 | AS External LSA | ASBR | ทั่วทั้ง OSPF Domain |
| Type 6 | Group Membership LSA | — | Multicast OSPF (ไม่ค่อยพบ) |
| Type 7 | NSSA External LSA | ASBR ใน NSSA | ภายใน NSSA เท่านั้น |

- **บทบาทของ Router ใน OSPF:**
  - **ABR:** มี Interface อย่างน้อย 1 ตัวใน Area 0 และอีก 1 ตัวใน Area อื่น สร้าง Type 3, 4 LSA
  - **ASBR:** Redistribute Route จากภายนอก (BGP, EIGRP, Static) เข้า OSPF สร้าง Type 5 LSA
  - **Internal Router:** มี Interface อยู่ใน Area เดียวกันทั้งหมด
  - หมายเหตุ: Router 1 ตัวสามารถมีได้หลายบทบาทพร้อมกัน

**สรุป**
ความเข้าใจเรื่อง OSPF Area และ LSA Types เป็นพื้นฐานสำคัญสำหรับการออกแบบและ Troubleshoot เครือข่าย OSPF ขนาดใหญ่ การเลือก Area Type ที่เหมาะสม เช่น Stub สำหรับ Branch Office เล็กๆ หรือ NSSA สำหรับ Branch ที่ต้องการ Redistribute Route จะช่วยให้ OSPF ทำงานได้อย่างมีประสิทธิภาพ ประหยัด Resource และง่ายต่อการบำรุงรักษา',
  content_en = '## OSPF Areas and LSA Types

**สิ่งที่จะได้เรียนในคลิปนี้**
ในคลิปนี้เราจะทำความเข้าใจโครงสร้างของ OSPF ในระดับลึก ทั้งประเภทของ Area ต่างๆ ได้แก่ Backbone, Stub, Totally Stubby, และ NSSA รวมถึง LSA Types 1 ถึง 7 ที่ OSPF ใช้แลกเปลี่ยนข้อมูล Routing และบทบาทของ ABR กับ ASBR

**เนื้อหาหลัก**
- **Area 0 — Backbone Area:** หัวใจหลักของ OSPF ทุก Area ต้องเชื่อมต่อกับ Area 0 โดยตรง (หรือผ่าน Virtual Link) Traffic ระหว่าง Non-Backbone Areas ต้องผ่าน Area 0 เสมอ
- **ประเภทของ OSPF Area:**
  - **Standard Area:** รับ LSA ทุกประเภท (Type 1–5)
  - **Stub Area:** บล็อก External LSA (Type 5); ABR ส่ง Default Route แทน เหมาะเมื่อ Area ไม่ต้องการข้อมูล External Route
  - **Totally Stubby Area (Cisco Proprietary):** บล็อกทั้ง External (Type 5) และ Inter-Area (Type 3); เหลือเพียง Default Route จาก ABR เหมาะกับ Branch Office ที่ Router specs ต่ำ
  - **NSSA (Not-So-Stubby Area):** คล้าย Stub แต่ยอมให้มี ASBR ภายใน Area ได้ โดย External Routes โฆษณาเป็น Type 7 LSA ภายใน NSSA และ ABR แปลงเป็น Type 5 ก่อนส่งออก Area อื่น
- **LSA Types 1–7:**

| LSA Type | ชื่อ | สร้างโดย | ขอบเขต |
|---|---|---|---|
| Type 1 | Router LSA | ทุก Router | ภายใน Area เดียวกัน |
| Type 2 | Network LSA | DR บน Multi-Access | ภายใน Area เดียวกัน |
| Type 3 | Summary LSA | ABR | ระหว่าง Area |
| Type 4 | ASBR Summary LSA | ABR | แจ้งตำแหน่งของ ASBR |
| Type 5 | AS External LSA | ASBR | ทั่วทั้ง OSPF Domain |
| Type 6 | Group Membership LSA | — | Multicast OSPF (ไม่ค่อยพบ) |
| Type 7 | NSSA External LSA | ASBR ใน NSSA | ภายใน NSSA เท่านั้น |

- **บทบาทของ Router ใน OSPF:**
  - **ABR:** มี Interface อย่างน้อย 1 ตัวใน Area 0 และอีก 1 ตัวใน Area อื่น สร้าง Type 3, 4 LSA
  - **ASBR:** Redistribute Route จากภายนอก (BGP, EIGRP, Static) เข้า OSPF สร้าง Type 5 LSA
  - **Internal Router:** มี Interface อยู่ใน Area เดียวกันทั้งหมด
  - หมายเหตุ: Router 1 ตัวสามารถมีได้หลายบทบาทพร้อมกัน

**สรุป**
ความเข้าใจเรื่อง OSPF Area และ LSA Types เป็นพื้นฐานสำคัญสำหรับการออกแบบและ Troubleshoot เครือข่าย OSPF ขนาดใหญ่ การเลือก Area Type ที่เหมาะสม เช่น Stub สำหรับ Branch Office เล็กๆ หรือ NSSA สำหรับ Branch ที่ต้องการ Redistribute Route จะช่วยให้ OSPF ทำงานได้อย่างมีประสิทธิภาพ ประหยัด Resource และง่ายต่อการบำรุงรักษา'
WHERE id = 'lesson-adv-001';

-- ═══════════════════════════════════════════
-- Also sync content_en = content_th for lessons that already have proper
-- markdown content_th but content_en was not yet updated
-- ═══════════════════════════════════════════
UPDATE public.lessons SET content_en = content_th
WHERE id IN (
  'lesson-ccna002-05',  -- VTP and Inter-VLAN Routing (already has markdown content_th)
  'lesson-ccna004-02',  -- PPP and HDLC (already has markdown content_th)
  'lesson-ccna005-03'   -- NAT and PAT (already has markdown content_th)
) AND content_th IS NOT NULL AND content_th LIKE '## %';
