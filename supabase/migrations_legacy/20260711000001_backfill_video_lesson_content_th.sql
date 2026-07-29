-- Migration: Populate content_th for all video lessons (lesson summary for each clip)
-- Based on title_en as the primary key for research
-- All video lessons get a Thai-language markdown summary card

-- ═══════════════════════════════════════════
-- CCNA 001: Network Fundamentals
-- ═══════════════════════════════════════════

-- lesson-ccna001-01 | OSI Model & Network Fundamentals
UPDATE public.lessons SET content_th = '## OSI Model และพื้นฐานเครือข่าย

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้แนะนำ OSI Model 7 ชั้น (Layer) ซึ่งเป็นกรอบมาตรฐานสำหรับทำความเข้าใจว่าข้อมูลเดินทางผ่านเครือข่ายอย่างไร

**เนื้อหาหลัก**
- **Layer 7 – Application:** ส่วนติดต่อกับผู้ใช้งาน เช่น HTTP, DNS, FTP
- **Layer 4 – Transport:** TCP (เชื่อถือได้) และ UDP (รวดเร็ว) จัดการการส่งข้อมูลระหว่างปลายทาง
- **Layer 3 – Network:** IP Addressing และ Routing หาเส้นทางข้ามเครือข่าย
- **Layer 2 – Data Link:** MAC Address และ Switching ส่งข้อมูลในวง LAN
- **Layer 1 – Physical:** สายไฟ, คลื่นวิทยุ, สัญญาณดิจิทัล

**สรุป**
OSI Model คือพื้นฐานที่วิศวกรเครือข่ายต้องรู้จักก่อนเรียนหัวข้ออื่นทุกอย่าง เพราะใช้เป็นกรอบในการ Troubleshoot ปัญหาเครือข่ายได้อย่างเป็นระบบ'
WHERE id = 'lesson-ccna001-01' AND lesson_type = 'video';

-- lesson-ccna001-02 | IP Addressing & Subnetting
UPDATE public.lessons SET content_th = '## IP Addressing และ Subnetting

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนวิธีการจัดสรร IP Address และการแบ่งย่อยเครือข่าย (Subnetting) ซึ่งเป็นทักษะที่ขาดไม่ได้สำหรับวิศวกรเครือข่าย

**เนื้อหาหลัก**
- โครงสร้างของ IPv4 Address (32 บิต แบ่งเป็น Network + Host portion)
- ค่า Subnet Mask และ CIDR Notation เช่น /24, /25, /26
- การคำนวณหา Network Address, Broadcast Address และจำนวน Host ที่ใช้ได้
- การแบ่ง Subnet ด้วย VLSM (Variable Length Subnet Masking)

**ตัวอย่าง**
`192.168.1.0/26` → มี 64 IP ใช้งานได้ 62 Host (ลบ Network + Broadcast)

**สรุป**
Subnetting เป็นทักษะที่ต้องฝึกจนคล่องมือ เพราะเป็นพื้นฐานของการออกแบบและบริหาร IP ในเครือข่ายจริงทุกขนาด'
WHERE id = 'lesson-ccna001-02' AND lesson_type = 'video';

-- lesson-ccna001-04 | Ethernet & LAN Fundamentals
UPDATE public.lessons SET content_th = '## Ethernet และพื้นฐาน LAN

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้อธิบายการทำงานของ Ethernet ซึ่งเป็นเทคโนโลยี LAN ที่ใช้งานแพร่หลายที่สุดในโลก

**เนื้อหาหลัก**
- โครงสร้าง Ethernet Frame และ MAC Address (48 บิต ไม่ซ้ำกันในโลก)
- วิธีการส่งข้อมูลแบบ Half-duplex และ Full-duplex
- ความแตกต่างระหว่าง Hub, Switch และ Bridge
- มาตรฐาน Ethernet ต่างๆ เช่น 10/100/1000 Mbps (Fast/Gigabit Ethernet)
- การทำงานของ ARP (Address Resolution Protocol) เพื่อแปลง IP → MAC

**สรุป**
ความเข้าใจ Ethernet และ MAC Address เป็นรากฐานของการทำงานบน Layer 2 ทั้งหมด ก่อนที่จะเรียน VLAN และ Switching ขั้นสูงต่อไป'
WHERE id = 'lesson-ccna001-04' AND lesson_type = 'video';

-- lesson-ccna001-05 | Network Services (DHCP, DNS, NAT)
UPDATE public.lessons SET content_th = '## Network Services: DHCP, DNS, NAT

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้ครอบคลุมบริการเครือข่ายที่จำเป็นซึ่งอุปกรณ์ทุกเครื่องในออฟฟิศใช้งานอยู่ทุกวัน

**เนื้อหาหลัก**
- **DHCP:** จ่าย IP Address ให้อุปกรณ์อัตโนมัติ ทำงานด้วย 4 ขั้นตอน (DORA: Discover, Offer, Request, Acknowledge)
- **DNS:** แปลงชื่อโดเมน เช่น `google.com` ให้เป็น IP Address โดยมี Hierarchy เป็นชั้น (Root → TLD → Authoritative)
- **NAT:** แปลง Private IP ให้เป็น Public IP เพื่อออกอินเทอร์เน็ต มีทั้ง Static NAT, Dynamic NAT และ PAT (Overload)

**สรุป**
บริการเหล่านี้ทำให้เครือข่ายใช้งานได้สะดวกโดยผู้ใช้ไม่ต้องตั้งค่าอะไรเอง และเป็นสิ่งที่วิศวกรต้องเข้าใจเพื่อ Troubleshoot ปัญหาการเชื่อมต่อพื้นฐาน'
WHERE id = 'lesson-ccna001-05' AND lesson_type = 'video';

-- ═══════════════════════════════════════════
-- CCNA 002: Switching & VLANs
-- ═══════════════════════════════════════════

-- lesson-ccna002-01 | Switching Basics
UPDATE public.lessons SET content_th = '## พื้นฐานการทำงานของ Switch

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้อธิบายกลไกภายในของ Network Switch ซึ่งเป็นหัวใจของเครือข่าย LAN ทุกแห่ง

**เนื้อหาหลัก**
- Switch เรียนรู้ MAC Address ของอุปกรณ์ที่เชื่อมต่อและเก็บไว้ใน **MAC Address Table (CAM Table)**
- กระบวนการตัดสินใจส่งข้อมูล: Unicast, Multicast, Broadcast
- **Flooding:** เมื่อ Switch ไม่รู้ว่า MAC อยู่ที่พอร์ตไหน จะ Flood ออกทุกพอร์ต
- การจัดการ **STP (Spanning Tree Protocol)** เพื่อป้องกัน Loop
- **Port States:** Blocking → Listening → Learning → Forwarding

**สรุป**
การเข้าใจว่า Switch ทำงานอย่างไร ช่วยให้ Troubleshoot ปัญหา LAN ได้ เช่น Loop, Broadcast Storm หรือ MAC Flooding Attack'
WHERE id = 'lesson-ccna002-01' AND lesson_type = 'video';

-- lesson-ccna002-02 | VLAN Configuration
UPDATE public.lessons SET content_th = '## การตั้งค่า VLAN

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการสร้างและตั้งค่า VLAN (Virtual Local Area Network) บน Cisco Switch พร้อม Lab จริง

**เนื้อหาหลัก**
- VLAN แบ่งเครือข่ายออกเป็นส่วนๆ เสมือนเป็น Switch คนละตัว โดยไม่ต้องใช้ฮาร์ดแวร์แยก
- คำสั่งสร้าง VLAN: `vlan 10`, `name SALES`
- กำหนดพอร์ตให้เป็น Access Port: `switchport mode access`, `switchport access vlan 10`
- ตรวจสอบด้วย: `show vlan brief`
- **Inter-VLAN Routing:** VLAN ต่างกันจะสื่อสารกันไม่ได้ ต้องผ่าน Router หรือ Layer 3 Switch

**สรุป**
VLAN คือเครื่องมือสำคัญในการแยก Traffic ระหว่างแผนกต่างๆ เช่น IT, HR, Sales เพื่อความปลอดภัยและประสิทธิภาพ'
WHERE id = 'lesson-ccna002-02' AND lesson_type = 'video';

-- lesson-ccna002-03 | Trunking (802.1Q)
UPDATE public.lessons SET content_th = '## Trunking และ 802.1Q

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการส่ง Traffic หลาย VLAN พร้อมกันบนสายเคเบิลเส้นเดียวด้วย Trunk Port

**เนื้อหาหลัก**
- **Trunk Port:** พอร์ตที่ส่ง Traffic จากหลาย VLAN พร้อมกัน ใช้เชื่อมระหว่าง Switch ↔ Switch หรือ Switch ↔ Router
- **802.1Q Tag:** Header ขนาด 4 ไบต์ที่แทรกเข้าไปใน Ethernet Frame เพื่อบอกว่าแพ็กเก็ตนั้นเป็นของ VLAN ไหน
- **Native VLAN:** VLAN ที่ไม่มีการ Tag (Default คือ VLAN 1) ต้องตั้งให้ตรงกันทั้งสองฝั่ง
- คำสั่ง: `switchport mode trunk`, `switchport trunk allowed vlan 10,20,30`

**สรุป**
Trunking เป็นสิ่งที่ขาดไม่ได้ในเครือข่ายองค์กรที่มีหลาย VLAN เพราะถ้าไม่มี Trunk จะต้องต่อสายแยกสำหรับแต่ละ VLAN'
WHERE id = 'lesson-ccna002-03' AND lesson_type = 'video';

-- lesson-ccna002-05 | VTP & Inter-VLAN Routing
UPDATE public.lessons SET content_th = '## VTP และ Inter-VLAN Routing

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอน 2 หัวข้อสำคัญ: การจัดการ VLAN ด้วย VTP และการทำให้ VLAN ต่างๆ คุยกันได้

**เนื้อหาหลัก**

**VTP (VLAN Trunking Protocol)**
- ซิงค์ข้อมูล VLAN Database อัตโนมัติระหว่าง Switch
- มี 3 Mode: **Server** (สร้าง/แก้ไข VLAN), **Client** (รับข้อมูลอย่างเดียว), **Transparent** (ไม่เข้าร่วม)
- ⚠️ ระวัง: การนำ Switch ใหม่ที่มี VTP Revision สูงเข้าวงจะลบ VLAN ทั้งหมดได้!

**Inter-VLAN Routing**
- **Router-on-a-Stick:** ใช้ Router 1 ตัวกับ Sub-interface เพื่อ Route ระหว่าง VLAN
- **Layer 3 Switch (SVI):** วิธีที่นิยมในองค์กร ใช้คำสั่ง `ip routing` และสร้าง `interface vlan X`

**สรุป**
VTP ช่วยลดงาน Admin แต่ต้องระวังความเสี่ยง Inter-VLAN Routing ช่วยให้ทุก VLAN สามารถสื่อสารข้ามกันได้ตามที่กำหนด Policy'
WHERE id = 'lesson-ccna002-05' AND lesson_type = 'video';

-- ═══════════════════════════════════════════
-- CCNA 003: Routing
-- ═══════════════════════════════════════════

-- lesson-ccna003-01 | Routing Basics
UPDATE public.lessons SET content_th = '## พื้นฐาน Routing

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้อธิบายหลักการทำงานของ Router และการตัดสินใจส่งข้อมูลข้ามเครือข่าย

**เนื้อหาหลัก**
- Router ทำงานที่ Layer 3 ส่งข้อมูลระหว่างเครือข่าย (Network) ต่างๆ โดยอ้างอิง Routing Table
- **Routing Table:** ตารางที่เก็บเส้นทางไปยัง Network ต่างๆ ประกอบด้วย Destination, Next-Hop, Interface, Metric
- **Administrative Distance (AD):** ค่าความน่าเชื่อถือของแหล่งข้อมูล เช่น Connected=0, Static=1, OSPF=110, RIP=120
- **Metric:** ค่าที่ Routing Protocol ใช้วัดความดีของเส้นทาง เช่น Hop Count, Bandwidth, Delay

**สรุป**
ทุกครั้งที่แพ็กเก็ตมาถึง Router มันจะค้นหาใน Routing Table หาก Match กับ Entry ไหน ก็จะส่งออกไปยัง Next-Hop ของ Entry นั้น'
WHERE id = 'lesson-ccna003-01' AND lesson_type = 'video';

-- lesson-ccna003-02 | Static Routing
UPDATE public.lessons SET content_th = '## Static Routing

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการตั้งค่าเส้นทางแบบ Manual (Static Route) ซึ่งเหมาะสำหรับเครือข่ายขนาดเล็กหรือการกำหนดเส้นทางพิเศษ

**เนื้อหาหลัก**
- คำสั่ง: `ip route <Destination Network> <Subnet Mask> <Next-Hop IP หรือ Exit Interface>`
- **Default Route:** `ip route 0.0.0.0 0.0.0.0 <Next-Hop>` ส่งทุก Traffic ที่ไม่รู้จะไปไหนออก Gateway
- **Floating Static Route:** ตั้ง AD สูงกว่า Dynamic Protocol เพื่อทำ Backup Route
- ข้อดี: คาดเดาได้, ปลอดภัย, ไม่กิน CPU/Bandwidth
- ข้อเสีย: ต้องตั้งค่า Manual ทุกเส้นทาง ไม่ Scale ได้ในเครือข่ายใหญ่

**สรุป**
Static Route เหมาะสำหรับ Edge Router ที่ต่อออก ISP หรือ Stub Network ที่มีทางออกทางเดียว'
WHERE id = 'lesson-ccna003-02' AND lesson_type = 'video';

-- lesson-ccna003-04 | OSPF Basics
UPDATE public.lessons SET content_th = '## OSPF Basics

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้แนะนำ OSPF (Open Shortest Path First) ซึ่งเป็น Dynamic Routing Protocol แบบ Link-State ที่ใช้งานมากที่สุดในองค์กร

**เนื้อหาหลัก**
- OSPF ใช้ Algorithm Dijkstra (SPF) คำนวณเส้นทางที่สั้นที่สุดโดยอิงจาก Bandwidth (Cost)
- **DR/BDR Election:** ในเครือข่ายแบบ Multi-access (Ethernet) จะเลือก Designated Router เพื่อลด Overhead
- **LSA (Link-State Advertisement):** ข้อมูลที่ OSPF Router แลกเปลี่ยนกันเพื่อสร้าง Topology Map
- **Area:** OSPF แบ่งเป็น Area เพื่อลดขนาด LSDB ทุก Area ต้องเชื่อมกับ Area 0 (Backbone)
- คำสั่งพื้นฐาน: `router ospf 1`, `network 192.168.1.0 0.0.0.255 area 0`

**สรุป**
OSPF มีความ Scalable สูง Converge เร็ว และเป็น Standard เปิด ทำให้เป็น Protocol ยอดนิยมสำหรับ Enterprise Network'
WHERE id = 'lesson-ccna003-04' AND lesson_type = 'video';

-- lesson-ccna003-05 | EIGRP Basics
UPDATE public.lessons SET content_th = '## EIGRP Basics

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้แนะนำ EIGRP (Enhanced Interior Gateway Routing Protocol) ซึ่งเป็น Protocol ขั้นสูงของ Cisco

**เนื้อหาหลัก**
- EIGRP เป็น Advanced Distance Vector ใช้ Algorithm DUAL (Diffusing Update Algorithm) รับประกันว่าไม่มี Loop
- **Metric:** คำนวณจาก Bandwidth และ Delay เป็นหลัก (ค่า K-values)
- **Successor & Feasible Successor:** เก็บ Backup Route ไว้ล่วงหน้า ทำให้ Failover เร็วมาก (Sub-second)
- **Neighbor Relationship:** ใช้ Hello Packets สร้าง Neighbor ก่อนแลกเปลี่ยนข้อมูล
- คำสั่ง: `router eigrp 100`, `network 10.0.0.0 0.255.255.255`

**สรุป**
EIGRP Converge เร็วกว่า OSPF มาก เหมาะสำหรับ Network ที่ต้องการ Failover ที่รวดเร็ว แต่ข้อเสียคือใช้ได้เฉพาะอุปกรณ์ Cisco'
WHERE id = 'lesson-ccna003-05' AND lesson_type = 'video';

-- ═══════════════════════════════════════════
-- CCNA 004: WAN Technologies
-- ═══════════════════════════════════════════

-- lesson-ccna004-01 | WAN Overview
UPDATE public.lessons SET content_th = '## WAN Overview (ภาพรวม WAN)

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้อธิบายประเภทต่างๆ ของการเชื่อมต่อ WAN ที่องค์กรใช้เชื่อมสำนักงานสาขา

**เนื้อหาหลัก**
- **Leased Line:** วงจรเช่าส่วนตัว เสถียรแต่แพง (T1/E1, DS3)
- **MPLS (Multi-Protocol Label Switching):** เทคโนโลยี ISP ที่ส่งข้อมูลด้วย Label แทน IP เพื่อความเร็วและ QoS
- **Internet-based VPN:** เชื่อมสาขาผ่านอินเทอร์เน็ตด้วยการเข้ารหัส ราคาถูกแต่ไม่ Guarantee SLA
- **SD-WAN:** เทคโนโลยีใหม่ที่บริหาร WAN links หลายเส้นพร้อมกันอัจฉริยะ

**สรุป**
การเลือก WAN Technology ต้องพิจารณา Budget, Bandwidth, Latency และ SLA ขององค์กร MPLS ยังนิยมสำหรับองค์กรใหญ่ แต่ SD-WAN กำลังมาแรงในปัจจุบัน'
WHERE id = 'lesson-ccna004-01' AND lesson_type = 'video';

-- lesson-ccna004-02 | PPP & HDLC
UPDATE public.lessons SET content_th = '## PPP และ HDLC

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอน Protocol ระดับ Data Link ที่ใช้บน Serial/WAN Links แบบ Point-to-Point

**เนื้อหาหลัก**
- **HDLC (High-Level Data Link Control):** Protocol Default ของ Cisco บน Serial Interface เรียบง่ายแต่ใช้ได้เฉพาะ Cisco
- **PPP (Point-to-Point Protocol):** Protocol มาตรฐานเปิด รองรับ Authentication (PAP/CHAP), Compression, Multilink
- **PPPoE:** ใช้ PPP บน Ethernet พบเห็นในการเชื่อมต่ออินเทอร์เน็ตผ่าน ADSL/Fiber
- การตั้งค่า PPP: `encapsulation ppp`, `ppp authentication chap`

**สรุป**
แม้ HDLC และ PPP จะเป็นเทคโนโลยีเก่า แต่ยังปรากฏในข้อสอบ CCNA และระบบ Legacy WAN ขององค์กรบางแห่ง'
WHERE id = 'lesson-ccna004-02' AND lesson_type = 'video';

-- lesson-ccna004-03 | MPLS & VPN
UPDATE public.lessons SET content_th = '## MPLS และ VPN

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้อธิบายหลักการทำงานของ MPLS ซึ่งเป็นกระดูกสันหลังของเครือข่าย ISP ระดับโลก

**เนื้อหาหลัก**
- **MPLS Labels:** แทนที่การค้นหาตาม IP ด้วย Label เพื่อความเร็วสูงสุด
- **LSR (Label Switching Router):** Router ที่ส่งข้อมูลด้วย Label แทน Routing Table
- **MPLS VPN (L3VPN):** ให้ลูกค้าหลายรายใช้โครงสร้าง MPLS เดียวกัน โดยแยก Traffic ด้วย VRF (Virtual Routing and Forwarding)
- ข้อดี: Low Latency, QoS ที่แน่นอน, รองรับ Traffic Engineering

**สรุป**
MPLS เป็นเทคโนโลยีเบื้องหลังของ Enterprise WAN ระดับสูง ช่วยให้ ISP ให้บริการ Guaranteed SLA ในด้าน Latency และ Bandwidth ได้'
WHERE id = 'lesson-ccna004-03' AND lesson_type = 'video';

-- ═══════════════════════════════════════════
-- CCNA 005: Network Services
-- ═══════════════════════════════════════════

-- lesson-ccna005-01 | DHCP
UPDATE public.lessons SET content_th = '## DHCP (Dynamic Host Configuration Protocol)

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการตั้งค่า DHCP Server บน Cisco Router เพื่อจ่าย IP อัตโนมัติให้อุปกรณ์ในเครือข่าย

**เนื้อหาหลัก**
- กระบวนการ DORA: **Discover** → **Offer** → **Request** → **Acknowledge**
- การตั้งค่า DHCP Pool บน Cisco: `ip dhcp pool LAN`, `network 192.168.1.0 /24`, `default-router`, `dns-server`
- **DHCP Exclusion:** กันช่วง IP ไม่ให้จ่ายออก เช่น `ip dhcp excluded-address 192.168.1.1 192.168.1.10`
- **DHCP Relay Agent:** ใช้เมื่อ DHCP Server อยู่คนละ Subnet กับ Client ตั้งด้วย `ip helper-address`

**สรุป**
DHCP ลดงาน Admin อย่างมาก ทุกองค์กรใช้งาน การเข้าใจ DHCP Relay เป็นสิ่งสำคัญสำหรับเครือข่ายขนาดใหญ่'
WHERE id = 'lesson-ccna005-01' AND lesson_type = 'video';

-- lesson-ccna005-02 | DNS
UPDATE public.lessons SET content_th = '## DNS (Domain Name System)

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้อธิบายกลไกของ DNS ที่แปลงชื่อโดเมนเป็น IP Address ซึ่งเป็นกระบวนการเบื้องหลังทุกครั้งที่เราพิมพ์ URL

**เนื้อหาหลัก**
- **DNS Hierarchy:** Root (.) → TLD (.com, .th) → Second-Level (google.com) → Subdomain (mail.google.com)
- **DNS Records:** A (IPv4), AAAA (IPv6), MX (Mail), CNAME (Alias), PTR (Reverse Lookup)
- **Recursive vs Iterative Query:** Client ถาม DNS Resolver ซึ่งจะไปถามต่อจนได้คำตอบ
- **DNS Caching & TTL:** คำตอบจะถูก Cache ไว้ตามค่า TTL เพื่อลด Traffic

**สรุป**
DNS คือ "สมุดโทรศัพท์" ของอินเทอร์เน็ต หาก DNS ล่มทุก Service จะใช้งานไม่ได้แม้เชื่อมต่ออินเทอร์เน็ตได้ปกติ'
WHERE id = 'lesson-ccna005-02' AND lesson_type = 'video';

-- lesson-ccna005-03 | NAT & PAT
UPDATE public.lessons SET content_th = '## NAT และ PAT

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการแปลง IP Address เพื่อให้อุปกรณ์ Private IP สามารถออกอินเทอร์เน็ตได้

**เนื้อหาหลัก**
- **Static NAT:** IP Private 1 ตัว ↔ IP Public 1 ตัว (ใช้สำหรับ Server ที่ต้องการ IP คงที่)
- **Dynamic NAT:** Pool ของ IP Private ↔ Pool ของ IP Public (First-come first-served)
- **PAT (Port Address Translation / NAT Overload):** หลาย IP Private → 1 IP Public โดยแยกด้วย Port Number (ที่บ้านทุกหลังใช้นี้)
- การตั้งค่า: `ip nat inside`, `ip nat outside`, `ip nat inside source list <ACL> interface <int> overload`

**สรุป**
PAT คือสิ่งที่ทำให้ IPv4 ยังใช้งานได้ถึงทุกวันนี้แม้ Address จะหมด เพราะบ้านแต่ละหลังใช้ IP สาธารณะแค่ 1 ตัวสำหรับอุปกรณ์ทุกชิ้น'
WHERE id = 'lesson-ccna005-03' AND lesson_type = 'video';

-- lesson-ccna005-04 | ACL (Access Control Lists)
UPDATE public.lessons SET content_th = '## ACL (Access Control Lists)

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการใช้ ACL เพื่อกรอง Traffic บน Router ซึ่งเป็นเครื่องมือ Security ระดับ L3/L4 พื้นฐาน

**เนื้อหาหลัก**
- **Standard ACL (1-99):** กรองตาม Source IP เท่านั้น → ใช้ใกล้ Destination
- **Extended ACL (100-199):** กรองตาม Source IP, Destination IP, Protocol, Port → ใช้ใกล้ Source
- Wildcard Mask: ตรงข้ามกับ Subnet Mask เช่น /24 = Wildcard 0.0.0.255
- ACL ประมวลผลจากบนลงล่าง หยุดเมื่อ Match และมี **Implicit Deny** ที่ท้ายเสมอ
- การผูก ACL กับ Interface: `ip access-group <ACL> in/out`

**สรุป**
ACL คือ Firewall เบื้องต้นที่ฝังมาใน Router เหมาะสำหรับควบคุม Traffic ง่ายๆ แต่ไม่สามารถแทน Stateful Firewall ได้'
WHERE id = 'lesson-ccna005-04' AND lesson_type = 'video';

-- ═══════════════════════════════════════════
-- CCNA 006: Security
-- ═══════════════════════════════════════════

-- lesson-ccna006-01 | Security Concepts
UPDATE public.lessons SET content_th = '## Security Concepts (แนวคิดความปลอดภัยเครือข่าย)

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้แนะนำแนวคิดพื้นฐานด้านความปลอดภัยเครือข่าย และภัยคุกคามที่พบบ่อยในปัจจุบัน

**เนื้อหาหลัก**
- **CIA Triad:** Confidentiality (ข้อมูลไม่รั่วไหล), Integrity (ข้อมูลไม่ถูกดัดแปลง), Availability (ระบบพร้อมใช้เสมอ)
- **ประเภทภัยคุกคาม:** Malware, Phishing, DoS/DDoS, Man-in-the-Middle, SQL Injection
- **Defense in Depth:** ป้องกันหลายชั้น ไม่พึ่ง Single Point of Defense
- **Firewall Types:** Packet Filter, Stateful Inspection, NGFW (Next-Gen)
- **IDS vs IPS:** IDS ตรวจจับและแจ้งเตือน, IPS ตรวจจับและบล็อกอัตโนมัติ

**สรุป**
ความปลอดภัยไม่ใช่ผลิตภัณฑ์ แต่เป็นกระบวนการต่อเนื่อง วิศวกรเครือข่ายต้องเข้าใจภัยคุกคามเพื่อออกแบบระบบป้องกันที่ครอบคลุม'
WHERE id = 'lesson-ccna006-01' AND lesson_type = 'video';

-- lesson-ccna006-02 | Switch Security
UPDATE public.lessons SET content_th = '## Switch Security

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการรักษาความปลอดภัยระดับ Layer 2 บน Cisco Switch เพื่อป้องกันการโจมตีในวง LAN

**เนื้อหาหลัก**
- **Port Security:** จำกัด MAC Address บนพอร์ต ป้องกัน MAC Flooding Attack
  - `switchport port-security maximum 2`
  - `switchport port-security violation shutdown`
- **DHCP Snooping:** กรอง DHCP Response จาก Server ปลอม ป้องกัน Rogue DHCP
- **Dynamic ARP Inspection (DAI):** ป้องกัน ARP Spoofing/Poisoning ด้วยการ Validate ARP
- **BPDU Guard:** ป้องกันไม่ให้อุปกรณ์ภายนอกส่ง STP BPDU เข้ามา

**สรุป**
Layer 2 Security เป็นสิ่งที่มักถูกละเลยแต่มีความสำคัญสูงมาก เพราะการโจมตี LAN สามารถทำให้ระบบทั้งหมดล่มได้'
WHERE id = 'lesson-ccna006-02' AND lesson_type = 'video';

-- lesson-ccna006-03 | ACL for Security
UPDATE public.lessons SET content_th = '## ACL สำหรับความปลอดภัยเครือข่าย

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการประยุกต์ใช้ ACL ในเชิง Security เพื่อควบคุม Traffic ในเครือข่ายองค์กร

**เนื้อหาหลัก**
- **Time-based ACL:** เปิด/ปิด Access ตามเวลา เช่น อนุญาต Internet เฉพาะเวลาทำการ
- **Named ACL:** ตั้งชื่อ ACL เพื่อให้แก้ไขได้ง่ายกว่า Numbered ACL
- **Reflexive ACL:** ACL อัตโนมัติที่อนุญาต Return Traffic ของ Session ที่เริ่มจากภายใน (คล้าย Stateful)
- **ตัวอย่าง Use Case:**
  - บล็อก Telnet (port 23) ทั้งหมด อนุญาตเฉพาะ SSH (port 22)
  - จำกัดให้เฉพาะ IP ของ Admin เข้าถึง Management Interface ได้

**สรุป**
ACL ที่ออกแบบดีเป็นชั้นป้องกันที่สำคัญบน Router และ Layer 3 Switch ก่อนที่ Traffic จะถึง Firewall'
WHERE id = 'lesson-ccna006-03' AND lesson_type = 'video';

-- ═══════════════════════════════════════════
-- Security Course (SEC)
-- ═══════════════════════════════════════════

-- lesson-sec002-01 | VPN Concepts
UPDATE public.lessons SET content_th = '## VPN Concepts (แนวคิด VPN)

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้อธิบายพื้นฐานของ VPN และเหตุผลว่าทำไมองค์กรทุกแห่งจึงต้องใช้

**เนื้อหาหลัก**
- **VPN (Virtual Private Network):** สร้าง Tunnel เข้ารหัสเสมือนสายเชื่อมต่อส่วนตัวบนเครือข่ายสาธารณะ
- **ทำไมต้องใช้ VPN:** ปลอดภัย, ประหยัดกว่า Leased Line, รองรับ Remote Work
- **ประเภท VPN:**
  - **Site-to-Site VPN:** เชื่อมสำนักงาน 2 แห่งเข้าด้วยกันถาวร
  - **Remote Access VPN:** พนักงานที่บ้านเชื่อมเข้าออฟฟิศ
- **Encryption Basics:** Symmetric (AES), Asymmetric (RSA), Hashing (SHA) ที่ VPN ใช้

**สรุป**
VPN เป็นพื้นฐานความรู้ที่จำเป็นก่อนเรียน IPsec และ SSL VPN ในหัวข้อต่อไป'
WHERE id = 'lesson-sec002-01' AND lesson_type = 'video';

-- lesson-sec002-02 | IPsec Deep Dive
UPDATE public.lessons SET content_th = '## IPsec Deep Dive

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้เจาะลึก IPsec Framework ซึ่งเป็นมาตรฐานการเข้ารหัสที่ใช้สร้าง VPN ระดับองค์กร

**เนื้อหาหลัก**
- **IPsec Protocols:** AH (Authentication Header) ตรวจสอบความสมบูรณ์, ESP (Encapsulating Security Payload) เข้ารหัสข้อมูล
- **Modes:** Tunnel Mode (เข้ารหัสทั้ง Packet เดิม ใช้กับ VPN), Transport Mode (เข้ารหัสเฉพาะ Payload)
- **IKE (Internet Key Exchange):** กระบวนการแลกเปลี่ยน Key อย่างปลอดภัย มี 2 เฟส
  - **Phase 1:** สร้าง Secure Channel สำหรับ Negotiate (ISAKMP SA)
  - **Phase 2:** ตกลง Parameter สำหรับ Data Encryption (IPsec SA)
- **Diffie-Hellman:** ใช้แลกเปลี่ยน Symmetric Key บน Channel ที่ไม่ปลอดภัย

**สรุป**
IPsec เป็นรากฐานของ VPN ที่ปลอดภัยระดับองค์กร การเข้าใจ IKE Phase 1 & 2 เป็นสิ่งจำเป็นสำหรับการ Debug VPN ที่ไม่ขึ้น'
WHERE id = 'lesson-sec002-02' AND lesson_type = 'video';

-- lesson-sec002-03 | Site-to-Site VPN Config
UPDATE public.lessons SET content_th = '## Site-to-Site VPN Configuration

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนขั้นตอนการตั้งค่า IPsec Site-to-Site VPN บน Cisco Router ทีละขั้นตอน

**เนื้อหาหลัก**
- **5 ขั้นตอนการตั้งค่า:**
  1. กำหนด IKE Policy (Encryption, Hashing, DH Group, Lifetime)
  2. ตั้ง Pre-shared Key: `crypto isakmp key <password> address <peer-IP>`
  3. สร้าง IPsec Transform Set: `crypto ipsec transform-set`
  4. กำหนด Traffic ที่จะเข้ารหัสด้วย Crypto ACL
  5. สร้างและผูก Crypto Map กับ Interface
- **Verification:** `show crypto isakmp sa`, `show crypto ipsec sa`

**สรุป**
Lab นี้ช่วยให้เห็นภาพรวมการทำงานของ IPsec VPN จริงๆ ซึ่งเป็นสิ่งที่ออกข้อสอบ CCNA เสมอและใช้งานจริงในทุกองค์กร'
WHERE id = 'lesson-sec002-03' AND lesson_type = 'video';

-- ═══════════════════════════════════════════
-- Advanced Routing (ADV)
-- ═══════════════════════════════════════════

-- lesson-adv002-01 | EIGRP Architecture
UPDATE public.lessons SET content_th = '## EIGRP Architecture (สถาปัตยกรรม EIGRP)

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้เจาะลึกสถาปัตยกรรมภายในของ EIGRP และวิธีที่ DUAL Algorithm รับประกันว่าเครือข่าย Loop-free

**เนื้อหาหลัก**
- **DUAL Algorithm:** คำนวณเส้นทางสำรอง (Feasible Successor) ไว้ล่วงหน้า เมื่อเส้นทางหลักล้มเหลวจะ Failover ทันที
- **Feasibility Condition:** เงื่อนไขสำคัญที่ใช้ตรวจสอบว่า Backup Route นั้นไม่ทำให้เกิด Loop
- **EIGRP Tables:** Neighbor Table, Topology Table, Routing Table
- **Packet Types:** Hello, Update, Query, Reply, Acknowledgment
- **Named EIGRP Mode:** รูปแบบการตั้งค่าใหม่ที่รวมทุก Address Family ไว้ที่เดียว

**สรุป**
EIGRP เป็น Protocol ที่ซับซ้อนแต่ทรงพลัง การเข้าใจ DUAL และ Feasibility Condition ช่วยให้ Debug ปัญหาเส้นทางได้อย่างแม่นยำ'
WHERE id = 'lesson-adv002-01' AND lesson_type = 'video';

-- lesson-adv002-02 | EIGRP Metric & Tuning
UPDATE public.lessons SET content_th = '## EIGRP Metric และการ Tuning

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการคำนวณ EIGRP Metric และวิธีปรับแต่งค่าต่างๆ เพื่อควบคุม Traffic Path

**เนื้อหาหลัก**
- **EIGRP Composite Metric:** คำนวณจาก Bandwidth, Delay, Reliability, Load ด้วยสูตร K-values
- **K-values (Default):** K1=1 (BW), K2=0, K3=1 (Delay), K4=0, K5=0 (ใช้แค่ BW + Delay)
- **Bandwidth & Delay Tuning:**
  - `bandwidth <kbps>` เปลี่ยนค่า Bandwidth ที่ EIGRP ใช้คำนวณ (ไม่กระทบ Actual BW)
  - `delay <tens-of-microseconds>` ปรับค่า Delay ของ Interface
- **EIGRP Wide Metrics:** ใน IPv6/Named Mode ขยาย Metric ให้แม่นยำขึ้นกับ Interface ความเร็วสูง (>10Gbps)

**สรุป**
การ Tune EIGRP Metric อย่างถูกต้องช่วยให้ Traffic ไหลผ่านเส้นทางที่เหมาะสมที่สุด และช่วยป้องกันปัญหา Suboptimal Routing'
WHERE id = 'lesson-adv002-02' AND lesson_type = 'video';

-- lesson-adv002-03 | EIGRP Load Balancing
UPDATE public.lessons SET content_th = '## EIGRP Load Balancing

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการกระจายโหลด Traffic บน EIGRP ซึ่งเป็นหนึ่งในความสามารถพิเศษที่ทำให้ EIGRP โดดเด่น

**เนื้อหาหลัก**
- **Equal-Cost Load Balancing (ECMP):** เมื่อมีหลายเส้นทาง Metric เท่ากัน จะกระจาย Traffic ได้เลย (สูงสุด 4 เส้น Default)
- **Unequal-Cost Load Balancing:** ความสามารถพิเศษของ EIGRP ใช้คำสั่ง `variance <multiplier>`
  - `variance 2` หมายถึง อนุญาตเส้นทางที่ Metric ไม่เกิน 2 เท่าของ Successor เข้าร่วม Load Balance
- **Maximum Paths:** เพิ่มจำนวนเส้นทางสูงสุดด้วย `maximum-paths <N>` (สูงสุด 16)

**สรุป**
Unequal-cost Load Balancing ของ EIGRP เป็นคุณสมบัติที่ไม่มีใน OSPF ทำให้ใช้ประโยชน์จาก Link ความเร็วต่างกันได้อย่างเต็มประสิทธิภาพ'
WHERE id = 'lesson-adv002-03' AND lesson_type = 'video';

-- ═══════════════════════════════════════════
-- BGP (ADV003)
-- ═══════════════════════════════════════════

-- lesson-adv003-01 | BGP Overview
UPDATE public.lessons SET content_th = '## BGP Overview (ภาพรวม BGP)

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้แนะนำ BGP (Border Gateway Protocol) ซึ่งเป็น Routing Protocol ที่ขับเคลื่อนอินเทอร์เน็ตทั้งหมด

**เนื้อหาหลัก**
- BGP เป็น **EGP (Exterior Gateway Protocol)** ใช้เชื่อมระหว่าง AS (Autonomous System) ต่างๆ
- **AS Number:** หมายเลขประจำตัวของแต่ละองค์กรบนอินเทอร์เน็ต (เช่น AS7470 = TOT, AS9335 = AIS)
- **iBGP vs eBGP:** iBGP เชื่อม Router ภายใน AS เดียวกัน, eBGP เชื่อมระหว่าง AS ต่างกัน
- BGP ไม่ใช่ Protocol เร็ว แต่เป็น Protocol ที่ **ควบคุมได้และยืดหยุ่นมากที่สุด**
- ใช้ TCP Port 179 ไม่ใช้ Multicast แต่ต้อง Configure Neighbor แบบ Manual

**สรุป**
BGP เป็น Protocol ระดับ ISP ที่วิศวกรเครือข่ายขั้นสูงต้องรู้จัก เป็นพื้นฐานสำหรับ CCNP/CCIE และการทำงานจริงกับ ISP'
WHERE id = 'lesson-adv003-01' AND lesson_type = 'video';

-- lesson-adv003-02 | BGP Neighbors & Sessions
UPDATE public.lessons SET content_th = '## BGP Neighbors และ Sessions

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการสร้าง BGP Neighbor Relationship และการ Troubleshoot เมื่อ Session ไม่ขึ้น

**เนื้อหาหลัก**
- **BGP FSM (Finite State Machine):** BGP ผ่าน State ต่างๆ ก่อนจะ Established
  - Idle → Connect → Active → OpenSent → OpenConfirm → **Established**
- คำสั่งพื้นฐาน: `router bgp 65001`, `neighbor 10.0.0.2 remote-as 65002`
- **BGP Timers:** Keepalive (60 วินาที) และ Hold Time (180 วินาที) Default
- **eBGP Multihop:** ใช้เมื่อ eBGP Peer ไม่ได้อยู่ติดกันโดยตรง
- Verification: `show bgp summary`, `show bgp neighbors`

**สรุป**
BGP Session ที่ไม่ขึ้นมักเกิดจาก AS Number ผิด, ไม่มี Connectivity ถึง Peer IP, หรือปัญหา Firewall บน TCP 179'
WHERE id = 'lesson-adv003-02' AND lesson_type = 'video';

-- lesson-adv003-03 | BGP Attributes
UPDATE public.lessons SET content_th = '## BGP Attributes (คุณสมบัติของ BGP)

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้อธิบาย BGP Attributes ที่ใช้ในการตัดสินใจเลือกเส้นทางที่ดีที่สุด

**เนื้อหาหลัก**
- **Well-Known Mandatory:** ทุก Router ต้องรู้และส่งต่อ → AS-Path, Next-Hop, Origin
- **Well-Known Discretionary:** ทุก Router รู้แต่อาจไม่ส่ง → Local Preference (ค่า Default 100, สูงกว่า = ดีกว่า)
- **Optional Transitive:** ส่งต่อแม้ไม่รู้จัก → Community
- **Optional Non-Transitive:** ไม่ส่งต่อ → MED (Multi-Exit Discriminator)
- **BGP Best Path Selection Process:** 14 ขั้นตอนในการเลือกเส้นทาง เรียงตาม Weight → Local Pref → AS Path Length → ...

**สรุป**
BGP Attributes คือเครื่องมือหลักของ BGP Traffic Engineering การเข้าใจ Local Preference, AS-Path และ MED ช่วยควบคุมได้ว่า Traffic จะไปทิศทางไหน'
WHERE id = 'lesson-adv003-03' AND lesson_type = 'video';

-- lesson-adv003-04 | BGP Path Selection
UPDATE public.lessons SET content_th = '## BGP Path Selection (การเลือกเส้นทางของ BGP)

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอน Algorithm การเลือกเส้นทางของ BGP และการใช้ Attributes เพื่อ Influence Path Selection

**เนื้อหาหลัก**
- **BGP Decision Process (ย่อ):**
  1. Weight (สูงกว่า = ดีกว่า) → Cisco-only
  2. Local Preference (สูงกว่า = ดีกว่า) → ควบคุม Outbound ภายใน AS
  3. Locally originated routes
  4. Shortest AS-Path → ควบคุม Outbound จาก ISP ฝั่งนอก
  5. Lowest Origin type (IGP > EGP > Incomplete)
  6. Lowest MED → ควบคุม Inbound จาก ISP
- **AS-Path Prepending:** เติม AS Number ซ้ำๆ ใน AS-Path เพื่อทำให้เส้นทางดู "ยาวขึ้น" และไม่เป็นที่นิยม

**สรุป**
BGP Traffic Engineering เป็นทักษะระดับสูงที่ ISP Engineer ใช้ทุกวัน เพื่อควบคุมว่า Traffic จะเข้า/ออกผ่าน ISP รายไหน'
WHERE id = 'lesson-adv003-04' AND lesson_type = 'video';

-- ═══════════════════════════════════════════
-- Troubleshooting (TS)
-- ═══════════════════════════════════════════

-- lesson-ts002-01 | Troubleshooting Methodology
UPDATE public.lessons SET content_th = '## Troubleshooting Methodology (วิธีการแก้ปัญหาเครือข่าย)

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนกระบวนการ Troubleshoot ปัญหาเครือข่ายอย่างเป็นระบบ ซึ่งเป็นทักษะที่แยกแยะวิศวกรมือใหม่กับมือโปรออกจากกัน

**เนื้อหาหลัก**
- **Structured Approach:** แก้ปัญหาจาก Layer ล่างขึ้นบน (Bottom-Up) หรือจากระดับบริการลงล่าง (Top-Down)
- **OSI Model as Framework:** ทดสอบทีละชั้น เช่น Layer 1 (สายหลุดไหม?) → Layer 2 (MAC ตรงไหม?) → Layer 3 (IP ถึงไหม?)
- **เครื่องมือพื้นฐาน:**
  - `ping` / `traceroute` ตรวจสอบ Connectivity
  - `show ip interface brief` ดูสถานะ Interface
  - `show ip route` ตรวจสอบ Routing Table
- **Documentation:** บันทึกสิ่งที่ทดสอบและผลลัพธ์ทุกครั้ง

**สรุป**
Troubleshooting ที่ดีต้องมีระบบ ไม่ใช่การสุ่มลองไปเรื่อยๆ วิศวกรที่ดีสามารถแก้ปัญหาในนาทีแทนที่จะใช้ชั่วโมง'
WHERE id = 'lesson-ts002-01' AND lesson_type = 'video';

-- lesson-ts002-02 | Debug Commands
UPDATE public.lessons SET content_th = '## Debug Commands (คำสั่ง Debug บน Cisco)

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการใช้คำสั่ง `debug` บน Cisco IOS อย่างปลอดภัยและมีประสิทธิภาพ

**เนื้อหาหลัก**
- **คำสั่ง Debug ที่สำคัญ:**
  - `debug ip routing` ดูการเปลี่ยนแปลง Routing Table แบบ Real-time
  - `debug ip ospf events` ดู OSPF Neighbor Events
  - `debug ip icmp` ดู ICMP Packet แบบ Real-time (ระวัง! กิน CPU มาก)
  - `debug crypto isakmp` Debug VPN Phase 1
- **⚠️ ข้อควรระวัง:** Debug บน Production Router ต้องระมัดระวัง อาจทำให้ CPU 100% และ Router ค้างได้
- **ปิด Debug:** `undebug all` หรือ `no debug all`
- **Conditional Debug:** `debug ip packet detail access-list <ACL>` กรองเฉพาะ Traffic ที่ต้องการ

**สรุป**
Debug เป็นเครื่องมือ Troubleshoot ที่ทรงพลังแต่อันตราย ควรใช้นอกเวลาทำการหรือบน Lab Environment เท่านั้น'
WHERE id = 'lesson-ts002-02' AND lesson_type = 'video';

-- lesson-ts002-03 | Syslog Analysis
UPDATE public.lessons SET content_th = '## Syslog Analysis (การวิเคราะห์ Log เครือข่าย)

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการอ่านและวิเคราะห์ Syslog Messages จากอุปกรณ์ Cisco เพื่อหาต้นเหตุของปัญหา

**เนื้อหาหลัก**
- **Syslog Message Format:** `%Facility-Severity-Mnemonic: Description`
  - ตัวอย่าง: `%LINK-3-UPDOWN: Interface GigabitEthernet0/0, changed state to down`
- **Severity Levels ที่สำคัญ:**
  - Level 0 (Emergency), Level 2 (Critical), Level 3 (Error), Level 4 (Warning), Level 7 (Debug)
- **Log Destinations:** Console, VTY (Terminal), Buffer (RAM), Syslog Server
- การตั้งค่า: `logging host 192.168.1.100`, `logging trap informational`
- **Log Correlation:** นำ Log จากหลายอุปกรณ์มาหาความสัมพันธ์เวลาเดียวกัน (ต้องใช้ NTP!)

**สรุป**
Syslog คือ "กล่องดำ" ของเครือข่าย หากไม่มีการ Log ที่ดี การหาต้นเหตุของปัญหาหลังเกิดเหตุจะเป็นไปไม่ได้เลย'
WHERE id = 'lesson-ts002-03' AND lesson_type = 'video';

-- ═══════════════════════════════════════════
-- Network DevOps (DEV)
-- ═══════════════════════════════════════════

-- lesson-dev002-01 | DNA Center API
UPDATE public.lessons SET content_th = '## Cisco DNA Center API

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการใช้ REST API ของ Cisco DNA Center เพื่อจัดการเครือข่ายผ่านโปรแกรม

**เนื้อหาหลัก**
- **Cisco DNA Center:** Controller สำหรับ Campus Network ที่รองรับ Intent-Based Networking
- **REST API:** สื่อสารด้วย HTTP Methods (GET, POST, PUT, DELETE) และรับ/ส่งข้อมูลแบบ JSON
- **Authentication:** ใช้ Token-based Auth ด้วย `POST /dna/system/api/v1/auth/token`
- **ตัวอย่าง API Calls:**
  - `GET /dna/intent/api/v1/network-device` → ดูรายการอุปกรณ์ทั้งหมด
  - `GET /dna/intent/api/v1/topology/site-topology` → ดู Network Topology

**สรุป**
DNA Center API ช่วยให้ Automate การจัดการ Campus Network ได้อย่างรวดเร็ว และเป็นพื้นฐานสำหรับ Network DevOps สมัยใหม่'
WHERE id = 'lesson-dev002-01' AND lesson_type = 'video';

-- lesson-dev002-02 | SD-WAN API
UPDATE public.lessons SET content_th = '## Cisco SD-WAN API (vManage)

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการใช้ vManage REST API เพื่อบริหาร SD-WAN Edge Devices ผ่านโปรแกรม

**เนื้อหาหลัก**
- **Cisco SD-WAN Architecture:** vManage (Management), vSmart (Control), vBond (Orchestration), vEdge/cEdge (Data Plane)
- **vManage API:** REST API สำหรับดึงข้อมูลและตั้งค่า SD-WAN ทั้งหมด
- **ตัวอย่าง Use Cases:**
  - ดูสถานะ Tunnel ทั้งหมด: `GET /dataservice/device/tunnel/statistics`
  - ดู Device Inventory: `GET /dataservice/device`
  - Push Policy: สร้างและ Activate Policy ผ่าน API

**สรุป**
SD-WAN API ช่วยให้ Network Engineer สามารถสร้าง Dashboard แบบ Custom และ Automate การตอบสนองต่อเหตุการณ์ต่างๆ ในเครือข่ายได้'
WHERE id = 'lesson-dev002-02' AND lesson_type = 'video';

-- lesson-dev002-03 | Meraki API
UPDATE public.lessons SET content_th = '## Cisco Meraki API

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการใช้ Meraki Dashboard API ซึ่งเป็นหนึ่งใน Cloud-managed Network API ที่ใช้งานง่ายที่สุด

**เนื้อหาหลัก**
- **Meraki:** Cloud-managed Network (WiFi, Switch, Security) บริหารผ่าน Dashboard Online
- **Meraki API Key:** Authentication แบบง่าย ใส่ใน Header `X-Cisco-Meraki-API-Key`
- **ตัวอย่าง API ที่ใช้บ่อย:**
  - `GET /organizations` → ดูรายชื่อ Organization
  - `GET /networks/{networkId}/devices` → ดูอุปกรณ์ในเครือข่าย
  - `GET /devices/{serial}/clients` → ดูรายการ Client ที่เชื่อมต่ออยู่
- **Webhook:** รับ Real-time Alert เมื่อมีเหตุการณ์เกิดขึ้นในเครือข่าย

**สรุป**
Meraki API เป็นจุดเริ่มต้นที่ดีสำหรับการเรียน Network Automation เพราะ Documentation ชัดเจนและมี Interactive API Docs ให้ทดลองได้เลย'
WHERE id = 'lesson-dev002-03' AND lesson_type = 'video';

-- ═══════════════════════════════════════════
-- Wireshark & Packet Analysis
-- ═══════════════════════════════════════════

-- lesson-wireshark-01 | Wireshark Basics
UPDATE public.lessons SET content_th = '## Wireshark เบื้องต้น

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการใช้ Wireshark ซึ่งเป็นเครื่องมือ Packet Analysis ยอดนิยมสำหรับ Troubleshoot และวิเคราะห์ Protocol

**เนื้อหาหลัก**
- **Capture Filters:** กรอง Packet ระหว่างการ Capture เช่น `host 192.168.1.1`, `port 80`
- **Display Filters:** กรอง Packet ที่ Capture แล้ว เช่น `ip.addr == 192.168.1.1`, `tcp.port == 443`, `http`
- **Packet Dissection:** อ่าน Packet Detail ทีละ Layer (Frame → Ethernet → IP → TCP → Application)
- **Follow TCP Stream:** ดูข้อมูลการสื่อสารทั้ง Session ของ TCP Connection
- **Statistics:** I/O Graph, Protocol Hierarchy, Conversations

**สรุป**
Wireshark เป็นเครื่องมือที่วิศวกรเครือข่ายและ Security ต้องรู้จักใช้ เพราะช่วยให้เห็น "ความจริง" ของ Network Traffic ได้โดยตรง'
WHERE id = 'lesson-wireshark-01' AND lesson_type = 'video';

-- lesson-wireshark-02 | Protocol Analysis
UPDATE public.lessons SET content_th = '## Protocol Analysis with Wireshark

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการวิเคราะห์ Protocol ต่างๆ เช่น TCP Handshake, HTTP, DNS ผ่าน Wireshark

**เนื้อหาหลัก**
- **TCP Three-Way Handshake:** วิเคราะห์ SYN → SYN-ACK → ACK ใน Packet
- **HTTP Analysis:** ดู Request/Response Headers, Status Codes (200, 404, 503)
- **DNS Query/Response:** ดูกระบวนการแปลง Domain Name เป็น IP แบบ Real-time
- **TLS/SSL Handshake:** ดูขั้นตอนการสร้าง Encrypted Session (ClientHello, ServerHello, Certificate)
- **TCP Retransmissions:** หา Performance Issue จาก Retransmit ใน Stream

**สรุป**
การอ่าน Packet ได้คล่องช่วยให้ Troubleshoot ปัญหาเครือข่ายและ Application ได้ลึกกว่าการดูแค่ Show Commands บน Router/Switch'
WHERE id = 'lesson-wireshark-02' AND lesson_type = 'video';

-- lesson-wireshark-03 | Security Analysis
UPDATE public.lessons SET content_th = '## Security Analysis with Wireshark

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการใช้ Wireshark เพื่อตรวจสอบ Network Attack และพฤติกรรมผิดปกติ

**เนื้อหาหลัก**
- **Port Scanning Detection:** เห็น Pattern ของ SYN Flood หรือ Nmap Scan ในรูปแบบ Packet
- **ARP Spoofing Detection:** พบ Gratuitous ARP ที่ผิดปกติ (IP เดียวกันมี MAC ต่างกัน)
- **Cleartext Credentials:** ตรวจจับ Username/Password ที่ส่งแบบไม่เข้ารหัสบน Telnet, FTP, HTTP
- **DNS Tunneling:** วิเคราะห์ DNS Query ที่มี Payload ผิดปกติ (ใช้ส่งข้อมูลหนีออก Firewall)
- **Malware C2 Traffic:** สังเกต Beacon Pattern ของ Malware ที่ติดต่อ Command & Control Server

**สรุป**
Wireshark ในมือ Security Analyst ช่วยหาพฤติกรรมผิดปกติในเครือข่ายได้อย่างที่ Security Tool อื่นอาจพลาด'
WHERE id = 'lesson-wireshark-03' AND lesson_type = 'video';

-- ═══════════════════════════════════════════
-- Python & Git
-- ═══════════════════════════════════════════

-- lesson-python-02 | Python for Network Automation
UPDATE public.lessons SET content_th = '## Python สำหรับ Network Automation

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการเขียน Python Script สำหรับ Automate งาน Network เช่น Login อุปกรณ์และดึงข้อมูล

**เนื้อหาหลัก**
- **Library สำคัญ:**
  - `netmiko`: SSH เข้าอุปกรณ์เครือข่าย Cisco, Juniper, etc.
  - `napalm`: ดึงข้อมูลจากอุปกรณ์แบบ Vendor-agnostic
  - `requests`: เรียก REST API
  - `paramiko`: SSH Library พื้นฐาน
- **ตัวอย่าง Netmiko Script:**
  ```python
  from netmiko import ConnectHandler
  device = ConnectHandler(device_type="cisco_ios", host="10.0.0.1", username="admin", password="cisco")
  output = device.send_command("show ip interface brief")
  print(output)
  ```

**สรุป**
Python + Netmiko ช่วยให้เข้าไปดึงข้อมูลจาก Router 100 ตัวได้ในเวลาไม่กี่วินาที แทนที่จะต้อง Login ทีละเครื่อง'
WHERE id = 'lesson-python-02' AND lesson_type = 'video';

-- lesson-python-03 | Python REST API & JSON
UPDATE public.lessons SET content_th = '## Python REST API และ JSON

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการใช้ Python เรียก REST API ของ Network Controller (เช่น DNA Center, Meraki) และจัดการข้อมูล JSON

**เนื้อหาหลัก**
- **HTTP Requests ด้วย Python:** GET, POST, PUT, DELETE ผ่าน Library `requests`
- **JSON Parsing:** แปลง JSON Response เป็น Python Dictionary และ List เพื่อประมวลผล
- **Authentication:** Basic Auth, Token, API Key ใน Header
- **ตัวอย่าง:**
  ```python
  import requests
  url = "https://sandboxdnac.cisco.com/dna/system/api/v1/auth/token"
  response = requests.post(url, auth=("devnetuser", "Cisco123!"))
  token = response.json()["Token"]
  ```
- **Error Handling:** ตรวจสอบ HTTP Status Code ก่อนใช้ข้อมูล

**สรุป**
ทักษะ Python + REST API เป็นหัวใจของ Network Automation สมัยใหม่ ช่วยให้สร้าง Dashboard, Chatbot แจ้งเตือน หรือ Auto-remediation ได้'
WHERE id = 'lesson-python-03' AND lesson_type = 'video';

-- lesson-git-01 | Introduction to Git
UPDATE public.lessons SET content_th = '## Git เบื้องต้น

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการใช้ Git ซึ่งเป็นระบบ Version Control ที่วิศวกรเครือข่ายยุคใหม่ต้องรู้จัก

**เนื้อหาหลัก**
- **ทำไมต้องใช้ Git:** เก็บประวัติการแก้ไข Config/Script ทุก Version ย้อนกลับได้เมื่อพลาด
- **คำสั่งพื้นฐาน:**
  - `git init` สร้าง Repository ใหม่
  - `git add .` เพิ่มไฟล์ที่แก้ไขเข้า Staging
  - `git commit -m "message"` บันทึก Snapshot
  - `git log` ดูประวัติทั้งหมด
  - `git diff` เปรียบเทียบการเปลี่ยนแปลง
- **ไฟล์ .gitignore:** กำหนดไฟล์ที่ไม่ต้องการ Track เช่น Password file

**สรุป**
Git เป็นเครื่องมือที่ทุก Developer และ Network Engineer ใช้ร่วมกัน เมื่อเริ่มต้นใช้แล้วจะขาดไม่ได้'
WHERE id = 'lesson-git-01' AND lesson_type = 'video';

-- lesson-git-05 | CI/CD for Network
UPDATE public.lessons SET content_th = '## CI/CD Pipeline สำหรับ Network Code

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สาธิต CI/CD Pipeline ที่ใช้ GitHub Actions ทดสอบและ Deploy Network Configuration อัตโนมัติ

**เนื้อหาหลัก**
- **CI/CD คืออะไร:** Continuous Integration (ทดสอบทุกครั้งที่มีการ Commit) และ Continuous Delivery (Deploy อัตโนมัติ)
- **GitHub Actions Workflow:** ไฟล์ `.github/workflows/network-test.yml` กำหนดขั้นตอนการทำงาน
- **ตัวอย่าง Pipeline:**
  1. Developer Push โค้ดหรือ Config ขึ้น GitHub
  2. GitHub Actions รัน Python Script ตรวจสอบ Syntax ของ Config
  3. รัน Network Simulation (เช่น Batfish) ตรวจสอบว่า Policy ถูกต้อง
  4. หากผ่านทุก Test → Ansible Deploy Config ลง Production Router อัตโนมัติ

**สรุป**
CI/CD ทำให้การเปลี่ยนแปลง Network Configuration มีความปลอดภัยสูงขึ้น ลด Human Error และมีประวัติการแก้ไขที่ตรวจสอบได้'
WHERE id = 'lesson-git-05' AND lesson_type = 'video';
