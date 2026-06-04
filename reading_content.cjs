const fs = require('fs');

// All 12 reading articles with full Thai and English content
const articles = [
  {
    id: 'lesson-ccna001-03',
    content_th: `## TCP/IP Protocol Suite คืออะไร?

**TCP/IP Protocol Suite** เป็นชุดของโปรโตคอลที่ใช้ในการสื่อสารข้อมูลผ่านเครือข่ายอินเทอร์เน็ตและเครือข่ายคอมพิวเตอร์ทั่วโลก ถือเป็นพื้นฐานสำคัญที่สุดของการสื่อสารข้อมูลในปัจจุบัน

## โครงสร้าง 4 ชั้นของ TCP/IP Model

### Application Layer
ชั้นบนสุดที่ผู้ใช้โต้ตอบโดยตรง ประกอบด้วยโปรโตคอลสำคัญ เช่น:
- **HTTP/HTTPS** — สำหรับเว็บบราวเซอร์ (Port 80/443)
- **DNS** — แปลงชื่อโดเมนเป็น IP Address (Port 53)
- **DHCP** — แจก IP Address อัตโนมัติ (Port 67/68)
- **FTP** — ถ่ายโอนไฟล์ (Port 20/21)
- **SSH** — เข้าถึงอุปกรณ์แบบเข้ารหัส (Port 22)
- **SMTP** — ส่งอีเมล (Port 25)

### Transport Layer
รับผิดชอบการส่งข้อมูลแบบ end-to-end ระหว่างแอปพลิเคชัน

**TCP (Transmission Control Protocol)** — Connection-oriented, reliable delivery
- ใช้ 3-Way Handshake: \`SYN → SYN-ACK → ACK\`
- มีการตรวจสอบข้อผิดพลาดและส่งใหม่หากข้อมูลสูญหาย
- เหมาะสำหรับ: เว็บ, อีเมล, การถ่ายโอนไฟล์

**UDP (User Datagram Protocol)** — Connectionless, best-effort delivery
- ไม่มีการยืนยันการรับข้อมูล ทำให้เร็วกว่า TCP
- เหมาะสำหรับ: Video streaming, VoIP, DNS queries

### Internet Layer
รับผิดชอบการกำหนดเส้นทาง (Routing) ของแพ็กเก็ตข้ามเครือข่าย

- **IP (Internet Protocol)** — กำหนด source/destination address
- **ICMP** — ใช้ในคำสั่ง \`ping\` และ \`traceroute\`
- **ARP** — แปลง IP Address เป็น MAC Address

ตัวอย่าง IP Header ประกอบด้วย:
\`\`\`
Source IP: 192.168.1.100
Destination IP: 10.0.0.1
TTL: 128
Protocol: TCP (6) / UDP (17)
\`\`\`

### Network Access Layer
ชั้นล่างสุด จัดการการส่งข้อมูลในระดับฟิสิคัล:
- **Ethernet (802.3)** — LAN
- **Wi-Fi (802.11)** — Wireless LAN
- ใช้ **MAC Address** ในการระบุอุปกรณ์ในเครือข่ายท้องถิ่น

## กระบวนการ Encapsulation

เมื่อข้อมูลถูกส่งออกไป แต่ละชั้นจะเพิ่ม Header ของตัวเอง:

1. **Application** → สร้าง Data
2. **Transport** → เพิ่ม TCP/UDP Header → เรียกว่า **Segment**
3. **Internet** → เพิ่ม IP Header → เรียกว่า **Packet**
4. **Network Access** → เพิ่ม Frame Header + Trailer → เรียกว่า **Frame**

ฝั่งรับจะทำกระบวนการ **De-encapsulation** ย้อนกลับจากล่างขึ้นบน

## เปรียบเทียบ TCP/IP กับ OSI Model

| TCP/IP (4 ชั้น) | OSI Model (7 ชั้น) |
|---|---|
| Application | Application + Presentation + Session |
| Transport | Transport |
| Internet | Network |
| Network Access | Data Link + Physical |

## ตัวอย่างจริง: เมื่อคุณเปิดเว็บไซต์

1. เบราว์เซอร์สร้าง HTTP Request (Application Layer)
2. TCP สร้าง connection ด้วย 3-Way Handshake (Transport Layer)
3. IP กำหนดเส้นทางผ่าน Router หลายตัว (Internet Layer)
4. Ethernet Frame ส่งผ่านสาย LAN/Wi-Fi (Network Access Layer)

## สรุปสำคัญ

- TCP/IP เป็นโปรโตคอลมาตรฐานของอินเทอร์เน็ต
- มี 4 ชั้น แต่ละชั้นมีหน้าที่เฉพาะ
- TCP ให้ความน่าเชื่อถือ ส่วน UDP ให้ความเร็ว
- กระบวนการ Encapsulation/De-encapsulation ทำให้ข้อมูลเดินทางข้ามเครือข่ายได้
- ความเข้าใจ TCP/IP เป็นพื้นฐานสำคัญสำหรับทุกสาขาในด้าน Networking`,
    content_en: `## What is the TCP/IP Protocol Suite?

The **TCP/IP Protocol Suite** is the fundamental set of communication protocols used to interconnect network devices on the Internet and virtually all modern computer networks. Understanding TCP/IP is essential for any networking professional.

## The 4-Layer TCP/IP Model

### Application Layer
The topmost layer where users interact directly. Key protocols include:
- **HTTP/HTTPS** — Web browsing (Port 80/443)
- **DNS** — Domain name resolution (Port 53)
- **DHCP** — Automatic IP address assignment (Port 67/68)
- **FTP** — File transfer (Port 20/21)
- **SSH** — Encrypted remote access (Port 22)
- **SMTP** — Email sending (Port 25)

### Transport Layer
Responsible for end-to-end data delivery between applications.

**TCP (Transmission Control Protocol)** — Connection-oriented, reliable delivery
- Uses 3-Way Handshake: \`SYN → SYN-ACK → ACK\`
- Error checking and retransmission of lost data
- Best for: Web, email, file transfers

**UDP (User Datagram Protocol)** — Connectionless, best-effort delivery
- No delivery confirmation, making it faster than TCP
- Best for: Video streaming, VoIP, DNS queries

### Internet Layer
Responsible for routing packets across networks.

- **IP (Internet Protocol)** — Defines source and destination addressing
- **ICMP** — Used by \`ping\` and \`traceroute\` commands
- **ARP** — Resolves IP addresses to MAC addresses

Example IP Header fields:
\`\`\`
Source IP: 192.168.1.100
Destination IP: 10.0.0.1
TTL: 128
Protocol: TCP (6) / UDP (17)
\`\`\`

### Network Access Layer
The lowest layer handling physical data transmission:
- **Ethernet (802.3)** — Wired LAN
- **Wi-Fi (802.11)** — Wireless LAN
- Uses **MAC Addresses** to identify devices on the local network

## The Encapsulation Process

As data travels down the stack, each layer adds its own header:

1. **Application** → Creates Data
2. **Transport** → Adds TCP/UDP Header → called a **Segment**
3. **Internet** → Adds IP Header → called a **Packet**
4. **Network Access** → Adds Frame Header + Trailer → called a **Frame**

The receiving side performs **De-encapsulation** in reverse order.

## TCP/IP vs OSI Model Comparison

| TCP/IP (4 Layers) | OSI Model (7 Layers) |
|---|---|
| Application | Application + Presentation + Session |
| Transport | Transport |
| Internet | Network |
| Network Access | Data Link + Physical |

## Real-World Example: Opening a Website

1. Browser creates an HTTP Request (Application Layer)
2. TCP establishes connection via 3-Way Handshake (Transport Layer)
3. IP routes packets through multiple routers (Internet Layer)
4. Ethernet Frame transmitted over LAN/Wi-Fi (Network Access Layer)

## Key Takeaways

- TCP/IP is the standard protocol suite of the Internet
- It has 4 layers, each with specific responsibilities
- TCP provides reliability while UDP provides speed
- Encapsulation/De-encapsulation enables data to travel across networks
- Understanding TCP/IP is the foundation for all networking disciplines`,
    reading_time_minutes: 8
  },
  {
    id: 'lesson-ccna002-04',
    content_th: `## ทำไมต้องมี Spanning Tree Protocol?

ในเครือข่ายที่มี Switch หลายตัวเชื่อมต่อกันแบบ redundant (มีเส้นทางสำรอง) อาจเกิดปัญหาร้ายแรงที่เรียกว่า **Layer 2 Loop** ซึ่งทำให้:
- **Broadcast Storm** — แพ็กเก็ตวนซ้ำไม่สิ้นสุด กิน bandwidth จนเครือข่ายล่ม
- **MAC Address Table Instability** — ตาราง MAC สับสนเพราะเห็น MAC เดียวกันจากหลายพอร์ต
- **Multiple Frame Copies** — ผู้รับได้รับสำเนาข้อมูลซ้ำหลายชุด

**STP (Spanning Tree Protocol - IEEE 802.1D)** แก้ปัญหานี้โดยการ block พอร์ตบางตัวเพื่อสร้างโทโพโลยีแบบ loop-free

## Root Bridge Election

ขั้นตอนแรกของ STP คือการเลือก **Root Bridge** ซึ่งเป็น Switch ศูนย์กลาง:

- ทุก Switch มี **Bridge ID** = Priority (default 32768) + MAC Address
- Switch ที่มี Bridge ID ต่ำสุดจะเป็น Root Bridge
- สามารถกำหนด Priority เพื่อบังคับให้ Switch ที่ต้องการเป็น Root Bridge:

\`\`\`cisco
! ตั้ง Priority เป็น 4096 เพื่อให้เป็น Root Bridge
Switch(config)# spanning-tree vlan 1 priority 4096

! หรือใช้คำสั่งลัด
Switch(config)# spanning-tree vlan 1 root primary
\`\`\`

## Port Roles (บทบาทของพอร์ต)

หลังเลือก Root Bridge แล้ว STP จะกำหนดบทบาทให้แต่ละพอร์ต:

- **Root Port (RP)** — พอร์ตที่มีค่าใช้จ่าย (cost) ต่ำสุดไปยัง Root Bridge, มีได้ 1 ตัวต่อ Switch (ยกเว้น Root Bridge)
- **Designated Port (DP)** — พอร์ตที่ส่ง traffic ไปยัง segment นั้นได้ดีที่สุด, ทุก segment ต้องมี 1 DP
- **Blocked Port** — พอร์ตที่ถูก block เพื่อป้องกัน loop, ไม่ส่งหรือรับ data frames

### การคำนวณ Path Cost

| Speed | STP Cost (802.1D) |
|---|---|
| 10 Mbps | 100 |
| 100 Mbps | 19 |
| 1 Gbps | 4 |
| 10 Gbps | 2 |

## Port States (สถานะของพอร์ต)

STP 802.1D มี 5 สถานะ:

1. **Blocking** — ไม่ส่ง data, รับ BPDUs เท่านั้น (default เมื่อเปิดเครื่อง)
2. **Listening** — ประมวลผล BPDUs, เรียนรู้โทโพโลยี (15 วินาที)
3. **Learning** — เริ่มเรียนรู้ MAC Address แต่ยังไม่ส่ง data (15 วินาที)
4. **Forwarding** — ส่งและรับ data frames ได้ปกติ
5. **Disabled** — พอร์ตถูกปิดโดย admin

**Forward Delay Timer** = 15 วินาที × 2 = รวม 30 วินาที ก่อนพอร์ตจะเริ่มส่ง data ได้

## RSTP (802.1w) — Rapid STP

RSTP เป็นเวอร์ชันปรับปรุงที่ convergence เร็วขึ้นมาก:
- ลดเวลา convergence จาก 30-50 วินาที เหลือเพียง 1-2 วินาที
- เปลี่ยนชื่อ Port States: Blocking + Listening → **Discarding**
- เพิ่ม Port Roles ใหม่: **Alternate Port** และ **Backup Port**
- ใช้ **Proposal/Agreement** mechanism แทนการรอ timer

\`\`\`cisco
! เปิดใช้ RSTP (Rapid PVST+)
Switch(config)# spanning-tree mode rapid-pvst
\`\`\`

## สรุปสำคัญ

- STP ป้องกัน Layer 2 Loop ในเครือข่ายที่มี redundancy
- Root Bridge คือศูนย์กลาง เลือกจาก Bridge ID ต่ำสุด
- Port Roles: Root Port, Designated Port, Blocked Port
- RSTP ลดเวลา convergence จาก 30+ วินาที เหลือ 1-2 วินาที
- ควรกำหนด Root Bridge อย่างชัดเจนด้วย priority เสมอ`,
    content_en: `## Why Do We Need Spanning Tree Protocol?

In networks where multiple switches are connected with redundant links (backup paths), a serious problem called **Layer 2 Loop** can occur, causing:
- **Broadcast Storm** — Packets circulate endlessly, consuming all bandwidth
- **MAC Address Table Instability** — MAC tables become confused seeing the same MAC from multiple ports
- **Multiple Frame Copies** — Recipients receive duplicate copies of data

**STP (Spanning Tree Protocol - IEEE 802.1D)** solves this by blocking certain ports to create a loop-free topology.

## Root Bridge Election

The first step in STP is electing the **Root Bridge**, the central switch:

- Every switch has a **Bridge ID** = Priority (default 32768) + MAC Address
- The switch with the lowest Bridge ID becomes Root Bridge
- You can set Priority to force a specific switch to become Root Bridge:

\`\`\`cisco
! Set Priority to 4096 to become Root Bridge
Switch(config)# spanning-tree vlan 1 priority 4096

! Or use the shortcut command
Switch(config)# spanning-tree vlan 1 root primary
\`\`\`

## Port Roles

After Root Bridge election, STP assigns roles to each port:

- **Root Port (RP)** — Port with lowest cost path to Root Bridge; one per non-root switch
- **Designated Port (DP)** — Best port to forward traffic on each segment; one per segment
- **Blocked Port** — Port blocked to prevent loops; does not send or receive data frames

### Path Cost Calculation

| Speed | STP Cost (802.1D) |
|---|---|
| 10 Mbps | 100 |
| 100 Mbps | 19 |
| 1 Gbps | 4 |
| 10 Gbps | 2 |

## Port States

STP 802.1D has 5 states:

1. **Blocking** — No data forwarding, only receives BPDUs (default at startup)
2. **Listening** — Processes BPDUs, learns topology (15 seconds)
3. **Learning** — Begins learning MAC addresses but still no data forwarding (15 seconds)
4. **Forwarding** — Normal data forwarding and receiving
5. **Disabled** — Port administratively shut down

**Forward Delay Timer** = 15 seconds × 2 = 30 seconds total before a port can forward data

## RSTP (802.1w) — Rapid STP

RSTP is an improved version with much faster convergence:
- Reduces convergence from 30-50 seconds to just 1-2 seconds
- Renames Port States: Blocking + Listening → **Discarding**
- Adds new Port Roles: **Alternate Port** and **Backup Port**
- Uses **Proposal/Agreement** mechanism instead of waiting for timers

\`\`\`cisco
! Enable RSTP (Rapid PVST+)
Switch(config)# spanning-tree mode rapid-pvst
\`\`\`

## Key Takeaways

- STP prevents Layer 2 Loops in networks with redundancy
- Root Bridge is the center, elected by lowest Bridge ID
- Port Roles: Root Port, Designated Port, Blocked Port
- RSTP reduces convergence from 30+ seconds to 1-2 seconds
- Always explicitly configure Root Bridge with priority`,
    reading_time_minutes: 7
  },
  {
    id: 'lesson-ccna003-03',
    content_th: `## RIP คืออะไร?

**RIP (Routing Information Protocol)** เป็นหนึ่งในโปรโตคอลเราติ้งที่เก่าแก่ที่สุด จัดอยู่ในกลุ่ม **Distance Vector** ใช้ **Hop Count** เป็น metric ในการตัดสินใจเลือกเส้นทาง

## Distance Vector Algorithm

Router ที่ใช้ Distance Vector จะ:
- ส่ง routing table ทั้งหมดให้เพื่อนบ้าน (neighbors) เป็นระยะ
- ไม่เห็นภาพรวมของเครือข่ายทั้งหมด รู้แค่ทิศทาง (vector) และระยะทาง (distance)
- เรียกว่า **Routing by Rumor** — เชื่อข้อมูลจากเพื่อนบ้าน

## RIPv1 vs RIPv2

| คุณสมบัติ | RIPv1 | RIPv2 |
|---|---|---|
| Addressing | **Classful** (ไม่ส่ง subnet mask) | **Classless** (ส่ง subnet mask) |
| Updates | Broadcast (255.255.255.255) | Multicast (224.0.0.9) |
| Authentication | ไม่รองรับ | รองรับ (MD5) |
| VLSM | ไม่รองรับ | รองรับ |

## Hop Count Metric

- RIP ใช้ **Hop Count** เป็น metric เดียว — นับจำนวน Router ที่ต้องผ่าน
- **Maximum = 15 hops** — เกิน 15 ถือว่า unreachable
- ข้อจำกัด: ไม่คำนึงถึง bandwidth หรือ delay ของลิงก์

## Loop Prevention Mechanisms

### Split Horizon
ห้ามส่งข้อมูล route กลับไปยังพอร์ตที่เรียนรู้ route นั้นมา ป้องกัน routing loop พื้นฐาน

### Route Poisoning
เมื่อ route ตาย จะประกาศ metric เป็น 16 (unreachable) ทันที แทนที่จะรอ timeout

### Poison Reverse
เมื่อได้รับ route ที่มี metric 16 จะส่ง route นั้นกลับไปด้วย metric 16 เพื่อยืนยันว่า route ตายแล้วจริง

### Triggered Updates
ส่ง update ทันทีเมื่อมีการเปลี่ยนแปลง ไม่ต้องรอ timer ปกติ

## RIP Timers

- **Update Timer** — 30 วินาที (ส่ง routing table)
- **Invalid Timer** — 180 วินาที (ถ้าไม่ได้ยิน route ภายในเวลานี้ ถือว่าอาจตาย)
- **Hold-down Timer** — 180 วินาที (ห้ามรับข้อมูลใหม่เกี่ยวกับ route ที่กำลังจะตาย)
- **Flush Timer** — 240 วินาที (ลบ route ออกจากตารางถาวร)

## การตั้งค่า RIPv2 บน Cisco Router

\`\`\`cisco
Router(config)# router rip
Router(config-router)# version 2
Router(config-router)# network 192.168.1.0
Router(config-router)# network 10.0.0.0
Router(config-router)# no auto-summary
\`\`\`

คำสั่งตรวจสอบ:
\`\`\`cisco
Router# show ip route rip
Router# show ip rip database
Router# show ip protocols
\`\`\`

## สรุปสำคัญ

- RIP เป็น Distance Vector protocol ใช้ Hop Count เป็น metric
- RIPv2 ดีกว่า RIPv1 เพราะรองรับ VLSM และ authentication
- Maximum hop count = 15 จำกัดขนาดเครือข่าย
- มีกลไกป้องกัน loop หลายแบบ: Split Horizon, Route Poisoning, Triggered Updates
- ปัจจุบันนิยมใช้ OSPF หรือ EIGRP มากกว่า RIP ในเครือข่ายขนาดใหญ่`,
    content_en: `## What is RIP?

**RIP (Routing Information Protocol)** is one of the oldest routing protocols, classified as a **Distance Vector** protocol. It uses **Hop Count** as its sole metric for path selection.

## Distance Vector Algorithm

Routers using Distance Vector:
- Periodically send their entire routing table to neighbors
- Do not see the complete network topology — only know direction (vector) and distance
- Known as **Routing by Rumor** — they trust information from neighbors

## RIPv1 vs RIPv2

| Feature | RIPv1 | RIPv2 |
|---|---|---|
| Addressing | **Classful** (no subnet mask) | **Classless** (includes subnet mask) |
| Updates | Broadcast (255.255.255.255) | Multicast (224.0.0.9) |
| Authentication | Not supported | Supported (MD5) |
| VLSM | Not supported | Supported |

## Hop Count Metric

- RIP uses **Hop Count** as its only metric — counts the number of routers to traverse
- **Maximum = 15 hops** — anything beyond 15 is considered unreachable
- Limitation: Does not consider link bandwidth or delay

## Loop Prevention Mechanisms

### Split Horizon
Prevents a router from advertising a route back through the interface from which it was learned. This prevents basic routing loops.

### Route Poisoning
When a route fails, it is immediately advertised with a metric of 16 (unreachable) instead of waiting for timeout.

### Poison Reverse
When a router receives a route with metric 16, it sends that route back with metric 16 to confirm the route is truly dead.

### Triggered Updates
Sends updates immediately when changes occur, without waiting for the regular timer.

## RIP Timers

- **Update Timer** — 30 seconds (sends routing table)
- **Invalid Timer** — 180 seconds (if no update heard, route may be dead)
- **Hold-down Timer** — 180 seconds (prevents accepting new info about a failing route)
- **Flush Timer** — 240 seconds (permanently removes route from table)

## Configuring RIPv2 on Cisco Routers

\`\`\`cisco
Router(config)# router rip
Router(config-router)# version 2
Router(config-router)# network 192.168.1.0
Router(config-router)# network 10.0.0.0
Router(config-router)# no auto-summary
\`\`\`

Verification commands:
\`\`\`cisco
Router# show ip route rip
Router# show ip rip database
Router# show ip protocols
\`\`\`

## Key Takeaways

- RIP is a Distance Vector protocol using Hop Count as its metric
- RIPv2 improves on RIPv1 with VLSM support and authentication
- Maximum hop count of 15 limits network size
- Multiple loop prevention mechanisms: Split Horizon, Route Poisoning, Triggered Updates
- OSPF or EIGRP are preferred over RIP in modern large-scale networks`,
    reading_time_minutes: 6
  },
  {
    id: 'lesson-ccna004-04',
    content_th: `## หลักการออกแบบ WAN

**Wide Area Network (WAN)** เชื่อมต่อสำนักงานและสาขาที่อยู่ห่างไกลเข้าด้วยกัน การออกแบบที่ดีต้องคำนึงถึง **ความเสถียร, ประสิทธิภาพ, และต้นทุน**

## WAN Topologies

### Hub-and-Spoke (Star)
- สำนักงานใหญ่ (Hub) เชื่อมกับทุกสาขา (Spoke)
- ต้นทุนต่ำ, จัดการง่าย
- ข้อเสีย: ถ้า Hub ล่ม ทุกสาขาขาดการเชื่อมต่อ

### Full Mesh
- ทุกไซต์เชื่อมตรงถึงกันหมด
- ความเสถียรสูงสุด, ไม่มี single point of failure
- ข้อเสีย: ต้นทุนสูงมาก จำนวนลิงก์ = n(n-1)/2

### Partial Mesh
- เชื่อมบางไซต์ตรงถึงกัน ไม่ใช่ทั้งหมด
- สมดุลระหว่างต้นทุนและ redundancy
- เป็นรูปแบบที่นิยมใช้มากที่สุดในทางปฏิบัติ

## Dual-Homing Strategies

**Dual-Homing** คือการเชื่อมต่อกับ ISP หรือ WAN provider มากกว่า 1 ราย:

- **Single-Homed** — เชื่อม ISP 1 ราย, ลิงก์ 1 เส้น (ไม่มี backup)
- **Dual-Homed** — เชื่อม ISP 1 ราย, ลิงก์ 2 เส้น
- **Multi-Homed** — เชื่อม ISP 2 ราย, ลิงก์ 2+ เส้น (ดีที่สุด)

## First Hop Redundancy Protocols

### HSRP (Hot Standby Router Protocol)
- Cisco proprietary
- Router Active/Standby ใช้ Virtual IP เดียวกัน
- Failover time: ~3-10 วินาที

### VRRP (Virtual Router Redundancy Protocol)
- Open standard (RFC 5798)
- คล้าย HSRP แต่ใช้ได้กับทุกยี่ห้อ
- Router Master/Backup

### GLBP (Gateway Load Balancing Protocol)
- Cisco proprietary
- load balance traffic ข้าม gateway หลายตัวได้
- ใช้ Virtual MAC หลายตัว

\`\`\`cisco
! ตั้งค่า HSRP
Router(config)# interface GigabitEthernet0/0
Router(config-if)# standby 1 ip 192.168.1.1
Router(config-if)# standby 1 priority 110
Router(config-if)# standby 1 preempt
\`\`\`

## SD-WAN Concepts

**Software-Defined WAN (SD-WAN)** เป็นเทคโนโลยีใหม่ที่เปลี่ยนการจัดการ WAN:

- **Centralized Management** — จัดการทุกสาขาจากจุดเดียว
- **Transport Independent** — ใช้ MPLS, Internet, 4G/5G ร่วมกันได้
- **Application-Aware Routing** — เลือกเส้นทางตามประเภทแอปพลิเคชัน
- **Zero-Touch Provisioning** — ติดตั้งอุปกรณ์ใหม่ง่าย

## สรุปสำคัญ

- เลือก topology ตามความต้องการ redundancy และงบประมาณ
- Dual-homing กับ ISP หลายรายให้ความเสถียรสูงสุด
- FHRP (HSRP/VRRP/GLBP) ป้องกัน gateway single point of failure
- SD-WAN เป็นอนาคตของ WAN management`,
    content_en: `## WAN Design Principles

**Wide Area Network (WAN)** connects remote offices and branches together. Good design must consider **reliability, performance, and cost**.

## WAN Topologies

### Hub-and-Spoke (Star)
- Headquarters (Hub) connects to every branch (Spoke)
- Low cost, easy to manage
- Downside: If the Hub fails, all branches lose connectivity

### Full Mesh
- Every site connects directly to every other site
- Maximum reliability, no single point of failure
- Downside: Very expensive; number of links = n(n-1)/2

### Partial Mesh
- Some sites connect directly, but not all
- Balance between cost and redundancy
- Most commonly used topology in practice

## Dual-Homing Strategies

**Dual-Homing** means connecting to more than one ISP or WAN provider:

- **Single-Homed** — 1 ISP, 1 link (no backup)
- **Dual-Homed** — 1 ISP, 2 links
- **Multi-Homed** — 2+ ISPs, 2+ links (best redundancy)

## First Hop Redundancy Protocols

### HSRP (Hot Standby Router Protocol)
- Cisco proprietary
- Active/Standby routers share a Virtual IP
- Failover time: ~3-10 seconds

### VRRP (Virtual Router Redundancy Protocol)
- Open standard (RFC 5798)
- Similar to HSRP but vendor-agnostic
- Master/Backup routers

### GLBP (Gateway Load Balancing Protocol)
- Cisco proprietary
- Load balances traffic across multiple gateways
- Uses multiple Virtual MACs

\`\`\`cisco
! Configure HSRP
Router(config)# interface GigabitEthernet0/0
Router(config-if)# standby 1 ip 192.168.1.1
Router(config-if)# standby 1 priority 110
Router(config-if)# standby 1 preempt
\`\`\`

## SD-WAN Concepts

**Software-Defined WAN (SD-WAN)** is a modern technology transforming WAN management:

- **Centralized Management** — Manage all branches from a single point
- **Transport Independent** — Combine MPLS, Internet, 4G/5G
- **Application-Aware Routing** — Select paths based on application type
- **Zero-Touch Provisioning** — Easy new device deployment

## Key Takeaways

- Choose topology based on redundancy needs and budget
- Multi-homing with multiple ISPs provides maximum reliability
- FHRP (HSRP/VRRP/GLBP) prevents gateway single point of failure
- SD-WAN represents the future of WAN management`,
    reading_time_minutes: 6
  },
  {
    id: 'lesson-ccna005-05',
    content_th: `## ทำไม Time Synchronization ถึงสำคัญ?

ในเครือข่ายที่มีอุปกรณ์หลายร้อยตัว การมีเวลาตรงกันเป็นสิ่งจำเป็น:
- **Log Correlation** — เปรียบเทียบ log จากหลายอุปกรณ์ต้องใช้เวลาตรงกัน
- **Security** — Certificate validation, Kerberos authentication ต้องการเวลาที่แม่นยำ
- **Troubleshooting** — ลำดับเหตุการณ์ที่ถูกต้องช่วยวิเคราะห์ปัญหาได้เร็วขึ้น

## NTP (Network Time Protocol)

### Stratum Levels
- **Stratum 0** — แหล่งเวลาที่แม่นยำที่สุด (Atomic clock, GPS)
- **Stratum 1** — เซิร์ฟเวอร์ที่เชื่อมต่อโดยตรงกับ Stratum 0
- **Stratum 2-15** — เซิร์ฟเวอร์ที่ sync เวลาจาก stratum ที่สูงกว่า
- **Stratum 16** — ถือว่า unsynchronized

### การตั้งค่า NTP บน Cisco

\`\`\`cisco
! ตั้งค่าเป็น NTP Client
Router(config)# ntp server 10.1.1.1

! ตั้งค่า timezone
Router(config)# clock timezone ICT 7

! ตรวจสอบ NTP status
Router# show ntp status
Router# show ntp associations
Router# show clock
\`\`\`

## Syslog

### Severity Levels (0-7)

| Level | Keyword | คำอธิบาย |
|---|---|---|
| 0 | Emergency | ระบบไม่สามารถใช้งานได้ |
| 1 | Alert | ต้องดำเนินการทันที |
| 2 | Critical | สภาวะวิกฤต |
| 3 | Error | ข้อผิดพลาด |
| 4 | Warning | เงื่อนไขเตือน |
| 5 | Notice | ปกติแต่สำคัญ |
| 6 | Informational | ข้อมูลทั่วไป |
| 7 | Debug | ข้อมูลสำหรับ debug |

จำง่ายๆ: **"Every Awesome Cisco Engineer Will Need Ice-cream Daily"**

### การตั้งค่า Syslog บน Cisco

\`\`\`cisco
! ส่ง log ไปยัง Syslog Server
Router(config)# logging host 10.1.1.100
Router(config)# logging trap informational
Router(config)# logging source-interface Loopback0

! เพิ่ม timestamp ใน log messages
Router(config)# service timestamps log datetime msec

! ตรวจสอบ logging
Router# show logging
\`\`\`

### รูปแบบ Syslog Message

\`\`\`
*Mar 1 00:00:00.000: %SYS-5-CONFIG_I: Configured from console
  |         |          |   |    |
  Timestamp            Facility-Severity-Mnemonic
\`\`\`

## Best Practices

- ใช้ NTP server ภายในองค์กรเป็น stratum 2-3
- ตั้ง logging severity เป็น **informational (6)** สำหรับ production
- เก็บ log ไว้ที่ Syslog Server กลาง ไม่ใช่เฉพาะบนอุปกรณ์
- ใส่ timestamp ที่มี millisecond ทุกครั้ง
- ใช้ Loopback interface เป็น source ของทั้ง NTP และ Syslog

## สรุปสำคัญ

- NTP ทำให้เวลาของอุปกรณ์ทุกตัวตรงกัน
- Syslog มี 8 severity levels (0 = วิกฤตที่สุด, 7 = debug)
- ทั้ง NTP และ Syslog เป็นพื้นฐานของ network monitoring ที่ดี`,
    content_en: `## Why Is Time Synchronization Important?

In networks with hundreds of devices, having synchronized time is essential:
- **Log Correlation** — Comparing logs from multiple devices requires matching timestamps
- **Security** — Certificate validation and Kerberos authentication require accurate time
- **Troubleshooting** — Correct event sequencing speeds up problem analysis

## NTP (Network Time Protocol)

### Stratum Levels
- **Stratum 0** — Most accurate time source (Atomic clock, GPS)
- **Stratum 1** — Servers directly connected to Stratum 0
- **Stratum 2-15** — Servers syncing from higher stratum
- **Stratum 16** — Considered unsynchronized

### Configuring NTP on Cisco

\`\`\`cisco
! Configure as NTP Client
Router(config)# ntp server 10.1.1.1

! Set timezone
Router(config)# clock timezone ICT 7

! Verify NTP status
Router# show ntp status
Router# show ntp associations
Router# show clock
\`\`\`

## Syslog

### Severity Levels (0-7)

| Level | Keyword | Description |
|---|---|---|
| 0 | Emergency | System unusable |
| 1 | Alert | Immediate action needed |
| 2 | Critical | Critical condition |
| 3 | Error | Error condition |
| 4 | Warning | Warning condition |
| 5 | Notice | Normal but significant |
| 6 | Informational | General information |
| 7 | Debug | Debug messages |

Mnemonic: **"Every Awesome Cisco Engineer Will Need Ice-cream Daily"**

### Configuring Syslog on Cisco

\`\`\`cisco
! Send logs to Syslog Server
Router(config)# logging host 10.1.1.100
Router(config)# logging trap informational
Router(config)# logging source-interface Loopback0

! Add timestamps to log messages
Router(config)# service timestamps log datetime msec

! Verify logging
Router# show logging
\`\`\`

### Syslog Message Format

\`\`\`
*Mar 1 00:00:00.000: %SYS-5-CONFIG_I: Configured from console
  |         |          |   |    |
  Timestamp            Facility-Severity-Mnemonic
\`\`\`

## Best Practices

- Use internal NTP servers at stratum 2-3
- Set logging severity to **informational (6)** for production
- Store logs on a central Syslog Server, not just on devices
- Always include millisecond timestamps
- Use Loopback interface as source for both NTP and Syslog

## Key Takeaways

- NTP keeps all device clocks synchronized
- Syslog has 8 severity levels (0 = most critical, 7 = debug)
- Both NTP and Syslog are fundamentals of good network monitoring`,
    reading_time_minutes: 6
  },
  {
    id: 'lesson-ccna006-04',
    content_th: `## AAA Framework คืออะไร?

**AAA** ย่อมาจาก **Authentication, Authorization, Accounting** — เป็นกรอบแนวคิดสำหรับการจัดการการเข้าถึงอุปกรณ์เครือข่ายอย่างปลอดภัย

## สามเสาหลักของ AAA

### Authentication (ตรวจสอบตัวตน)
"คุณคือใคร?" — ยืนยันตัวตนผู้ใช้ด้วย username/password, certificate, หรือ biometrics

### Authorization (อนุญาตสิทธิ์)
"คุณทำอะไรได้บ้าง?" — กำหนดว่าผู้ใช้สามารถเข้าถึง command หรือ resource ใดได้บ้าง

### Accounting (บันทึกกิจกรรม)
"คุณทำอะไรไปแล้ว?" — บันทึกทุกกิจกรรมเพื่อ audit trail

## RADIUS vs TACACS+

| คุณสมบัติ | RADIUS | TACACS+ |
|---|---|---|
| Developer | Open Standard | Cisco Proprietary |
| Port | UDP 1812/1813 | TCP 49 |
| Encryption | เฉพาะ password | **ทั้ง packet** |
| AAA Support | รวม Authentication + Authorization | **แยกกันทั้ง 3 ส่วน** |
| Best For | Network Access (Wi-Fi, VPN) | Device Administration |

### เมื่อไหร่ใช้อะไร?
- **RADIUS** — เหมาะสำหรับ 802.1X, Wi-Fi authentication, VPN access
- **TACACS+** — เหมาะสำหรับ router/switch admin access, command authorization

## การตั้งค่า AAA บน Cisco Router

\`\`\`cisco
! เปิดใช้ AAA
Router(config)# aaa new-model

! กำหนด TACACS+ server
Router(config)# tacacs server MAIN-SERVER
Router(config-server-tacacs)# address ipv4 10.1.1.100
Router(config-server-tacacs)# key MySecretKey123

! สร้าง Authentication method list
Router(config)# aaa authentication login default group tacacs+ local

! สร้าง Authorization method list
Router(config)# aaa authorization exec default group tacacs+ local

! สร้าง Accounting method list
Router(config)# aaa accounting exec default start-stop group tacacs+
\`\`\`

### Method Lists คืออะไร?
Method List กำหนดลำดับการตรวจสอบ เช่น:
- \`group tacacs+ local\` หมายถึง: ลอง TACACS+ ก่อน, ถ้าเซิร์ฟเวอร์ไม่ตอบ ใช้ local database

## Local AAA vs Server-Based AAA

### Local AAA
\`\`\`cisco
Router(config)# username admin privilege 15 secret Str0ngP@ss!
\`\`\`
- เก็บ username/password บนตัวอุปกรณ์
- จัดการยากเมื่อมีอุปกรณ์หลายร้อยตัว

### Server-Based AAA
- ใช้ RADIUS หรือ TACACS+ server กลาง
- จัดการง่าย, เปลี่ยน password ที่เดียว
- มี centralized logging

## สรุปสำคัญ

- AAA = Authentication + Authorization + Accounting
- RADIUS เข้ารหัสเฉพาะ password, TACACS+ เข้ารหัสทั้ง packet
- TACACS+ แยก AAA ทั้ง 3 ส่วน ทำให้ยืดหยุ่นกว่า
- ควรใช้ Server-Based AAA ในเครือข่ายจริง พร้อม local fallback`,
    content_en: `## What is the AAA Framework?

**AAA** stands for **Authentication, Authorization, and Accounting** — a framework for securely managing access to network devices.

## The Three Pillars of AAA

### Authentication (Identity Verification)
"Who are you?" — Verify user identity via username/password, certificate, or biometrics

### Authorization (Permission Control)
"What can you do?" — Define which commands or resources a user can access

### Accounting (Activity Logging)
"What did you do?" — Record all activities for audit trails

## RADIUS vs TACACS+

| Feature | RADIUS | TACACS+ |
|---|---|---|
| Developer | Open Standard | Cisco Proprietary |
| Port | UDP 1812/1813 | TCP 49 |
| Encryption | Password only | **Entire packet** |
| AAA Support | Combined Auth + Authz | **Separates all 3** |
| Best For | Network Access (Wi-Fi, VPN) | Device Administration |

### When to Use Which?
- **RADIUS** — Best for 802.1X, Wi-Fi authentication, VPN access
- **TACACS+** — Best for router/switch admin access, command authorization

## Configuring AAA on Cisco Routers

\`\`\`cisco
! Enable AAA
Router(config)# aaa new-model

! Define TACACS+ server
Router(config)# tacacs server MAIN-SERVER
Router(config-server-tacacs)# address ipv4 10.1.1.100
Router(config-server-tacacs)# key MySecretKey123

! Create Authentication method list
Router(config)# aaa authentication login default group tacacs+ local

! Create Authorization method list
Router(config)# aaa authorization exec default group tacacs+ local

! Create Accounting method list
Router(config)# aaa accounting exec default start-stop group tacacs+
\`\`\`

### What Are Method Lists?
Method Lists define the order of verification, e.g.:
- \`group tacacs+ local\` means: Try TACACS+ first; if server unreachable, use local database

## Local AAA vs Server-Based AAA

### Local AAA
\`\`\`cisco
Router(config)# username admin privilege 15 secret Str0ngP@ss!
\`\`\`
- Stores username/password on each device
- Difficult to manage with hundreds of devices

### Server-Based AAA
- Uses centralized RADIUS or TACACS+ server
- Easy management, change password in one place
- Centralized logging capability

## Key Takeaways

- AAA = Authentication + Authorization + Accounting
- RADIUS encrypts only password; TACACS+ encrypts the entire packet
- TACACS+ separates all 3 AAA functions for greater flexibility
- Use Server-Based AAA in production with local fallback`,
    reading_time_minutes: 6
  },
  {
    id: 'lesson-adv002-04',
    content_th: `## EIGRP Route Filtering คืออะไร?

**Route Filtering** คือการควบคุมว่า route ใดจะถูกรับเข้าหรือส่งออกจาก routing table ของ EIGRP เป็นเครื่องมือสำคัญในการจัดการและรักษาความปลอดภัยของเครือข่าย

## Distribute Lists

Distribute List ใช้ ACL, Prefix List หรือ Route Map เป็นตัวกรอง:

\`\`\`cisco
! กรอง route ขาเข้า
Router(config)# router eigrp 100
Router(config-router)# distribute-list prefix FILTER-IN in

! กรอง route ขาออก เฉพาะ interface
Router(config-router)# distribute-list prefix FILTER-OUT out GigabitEthernet0/1
\`\`\`

## Prefix Lists

Prefix List เป็นวิธีที่ดีกว่า ACL ในการกรอง route:

- ใช้ \`ge\` (greater than or equal) และ \`le\` (less than or equal) กำหนดช่วง prefix length
- ประมวลผลเร็วกว่า ACL

\`\`\`cisco
! อนุญาตเฉพาะ 10.0.0.0/8 ถึง /24
ip prefix-list FILTER-IN seq 10 permit 10.0.0.0/8 le 24

! ปฏิเสธ default route
ip prefix-list FILTER-IN seq 5 deny 0.0.0.0/0

! อนุญาตทุก route อื่น
ip prefix-list FILTER-IN seq 100 permit 0.0.0.0/0 le 32
\`\`\`

## Route Maps

Route Map เป็นเครื่องมือที่ยืดหยุ่นที่สุด ใช้ \`match\` และ \`set\` clauses:

\`\`\`cisco
! สร้าง Route Map
route-map EIGRP-POLICY permit 10
 match ip address prefix-list IMPORTANT-ROUTES
 set metric 1000 100 255 1 1500

route-map EIGRP-POLICY deny 20
 match ip address prefix-list BLOCKED-ROUTES
\`\`\`

## EIGRP Manual Summarization

การรวม route ช่วยลดขนาด routing table และเพิ่มเสถียรภาพ:

\`\`\`cisco
! Manual Summarization บน interface
Router(config)# interface GigabitEthernet0/0
Router(config-if)# ip summary-address eigrp 100 192.168.0.0 255.255.252.0

! ตัวอย่าง: รวม 4 subnets
! 192.168.0.0/24 + 192.168.1.0/24 + 192.168.2.0/24 + 192.168.3.0/24
! = 192.168.0.0/22
\`\`\`

### Leak Maps
ใช้เมื่อต้องการ summary route แต่ยังต้องการส่ง specific route บางตัว:

\`\`\`cisco
Router(config-if)# ip summary-address eigrp 100 10.0.0.0 255.0.0.0 leak-map LEAK-SPECIFIC
\`\`\`

## สรุปสำคัญ

- Prefix Lists ดีกว่า ACL สำหรับการกรอง route
- Route Maps ยืดหยุ่นที่สุด ใช้ match/set ได้หลากหลาย
- Manual Summarization ลดขนาด routing table และปรับปรุง stability
- Leak Maps ช่วยให้ส่ง specific route ผ่าน summary ได้`,
    content_en: `## What is EIGRP Route Filtering?

**Route Filtering** controls which routes are accepted into or advertised from the EIGRP routing table. It is an essential tool for network management and security.

## Distribute Lists

Distribute Lists use ACLs, Prefix Lists, or Route Maps as filters:

\`\`\`cisco
! Filter inbound routes
Router(config)# router eigrp 100
Router(config-router)# distribute-list prefix FILTER-IN in

! Filter outbound routes on a specific interface
Router(config-router)# distribute-list prefix FILTER-OUT out GigabitEthernet0/1
\`\`\`

## Prefix Lists

Prefix Lists are superior to ACLs for route filtering:

- Use \`ge\` (greater than or equal) and \`le\` (less than or equal) to specify prefix length ranges
- Process faster than ACLs

\`\`\`cisco
! Permit only 10.0.0.0/8 through /24
ip prefix-list FILTER-IN seq 10 permit 10.0.0.0/8 le 24

! Deny default route
ip prefix-list FILTER-IN seq 5 deny 0.0.0.0/0

! Permit all other routes
ip prefix-list FILTER-IN seq 100 permit 0.0.0.0/0 le 32
\`\`\`

## Route Maps

Route Maps are the most flexible tool, using \`match\` and \`set\` clauses:

\`\`\`cisco
! Create Route Map
route-map EIGRP-POLICY permit 10
 match ip address prefix-list IMPORTANT-ROUTES
 set metric 1000 100 255 1 1500

route-map EIGRP-POLICY deny 20
 match ip address prefix-list BLOCKED-ROUTES
\`\`\`

## EIGRP Manual Summarization

Route summarization reduces routing table size and improves stability:

\`\`\`cisco
! Manual Summarization on interface
Router(config)# interface GigabitEthernet0/0
Router(config-if)# ip summary-address eigrp 100 192.168.0.0 255.255.252.0

! Example: Summarize 4 subnets
! 192.168.0.0/24 + 192.168.1.0/24 + 192.168.2.0/24 + 192.168.3.0/24
! = 192.168.0.0/22
\`\`\`

### Leak Maps
Use when you want a summary route but also need to advertise specific routes:

\`\`\`cisco
Router(config-if)# ip summary-address eigrp 100 10.0.0.0 255.0.0.0 leak-map LEAK-SPECIFIC
\`\`\`

## Key Takeaways

- Prefix Lists are better than ACLs for route filtering
- Route Maps are the most flexible, supporting various match/set combinations
- Manual Summarization reduces routing table size and improves stability
- Leak Maps allow specific routes through a summary`,
    reading_time_minutes: 6
  },
  {
    id: 'lesson-adv003-05',
    content_th: `## BGP Route Filtering

**BGP (Border Gateway Protocol)** เป็นโปรโตคอลที่ใช้แลกเปลี่ยน routing information ระหว่าง Autonomous Systems (AS) การกรอง route ใน BGP เป็นสิ่งสำคัญอย่างยิ่งเพราะส่งผลต่อการไหลของ traffic ทั้งอินเทอร์เน็ต

## วิธีการกรอง BGP Route

### Prefix Lists
\`\`\`cisco
! อนุญาตเฉพาะ route ที่เฉพาะเจาะจง
ip prefix-list FROM-ISP seq 10 permit 203.0.113.0/24
ip prefix-list FROM-ISP seq 20 deny 0.0.0.0/0 le 32

router bgp 65001
 neighbor 10.0.0.1 prefix-list FROM-ISP in
\`\`\`

### AS-Path ACLs
ใช้ Regular Expression กรองตาม AS-Path:
\`\`\`cisco
! อนุญาตเฉพาะ route ที่มาจาก AS 65002
ip as-path access-list 10 permit ^65002$

! ปฏิเสธ route ที่ผ่าน AS 65099
ip as-path access-list 20 deny _65099_

router bgp 65001
 neighbor 10.0.0.1 filter-list 10 in
\`\`\`

## Route Maps สำหรับ BGP Policy

Route Maps ใน BGP ใช้เปลี่ยน attributes ของ route:

\`\`\`cisco
route-map SET-LOCAL-PREF permit 10
 match ip address prefix-list PREFERRED-ROUTES
 set local-preference 200

route-map SET-LOCAL-PREF permit 20
 set local-preference 100

router bgp 65001
 neighbor 10.0.0.1 route-map SET-LOCAL-PREF in
\`\`\`

## BGP Path Attributes ที่สำคัญ

### Weight (Cisco only, สูงสุดชนะ)
- ใช้เฉพาะ local, ไม่ส่งต่อให้ neighbor
- Default: 0 (32768 สำหรับ locally originated)

### Local Preference (สูงสุดชนะ)
- ส่งต่อให้ iBGP neighbors ทุกตัว
- Default: 100
- ใช้เลือก exit point ใน AS

### MED - Multi-Exit Discriminator (ต่ำสุดชนะ)
- ส่งให้ eBGP neighbor เพื่อแนะนำ entry point
- Default: 0

## Community-Based Filtering

BGP Communities ใช้ tag route เพื่อจัดกลุ่ม:

\`\`\`cisco
! ตั้ง community
route-map TAG-ROUTES permit 10
 match ip address prefix-list CUSTOMER-ROUTES
 set community 65001:100

! กรองตาม community
ip community-list standard CUST-COMM permit 65001:100

route-map FILTER-BY-COMM permit 10
 match community CUST-COMM
\`\`\`

### Well-Known Communities
- \`no-export\` — ห้ามส่งออกนอก AS
- \`no-advertise\` — ห้ามประกาศให้ neighbor ใดเลย
- \`internet\` — ประกาศให้ทุก neighbor

## สรุปสำคัญ

- ใช้ Prefix Lists สำหรับกรอง route ตาม network/prefix length
- ใช้ AS-Path ACLs สำหรับกรองตามเส้นทาง AS
- Route Maps ปรับ attributes ได้ยืดหยุ่นที่สุด
- Communities ช่วยจัดกลุ่มและกรอง route ในระดับ policy`,
    content_en: `## BGP Route Filtering

**BGP (Border Gateway Protocol)** exchanges routing information between Autonomous Systems (AS). Route filtering in BGP is critically important as it affects Internet-wide traffic flow.

## BGP Route Filtering Methods

### Prefix Lists
\`\`\`cisco
! Permit only specific routes
ip prefix-list FROM-ISP seq 10 permit 203.0.113.0/24
ip prefix-list FROM-ISP seq 20 deny 0.0.0.0/0 le 32

router bgp 65001
 neighbor 10.0.0.1 prefix-list FROM-ISP in
\`\`\`

### AS-Path ACLs
Use Regular Expressions to filter by AS-Path:
\`\`\`cisco
! Permit only routes originating from AS 65002
ip as-path access-list 10 permit ^65002$

! Deny routes traversing AS 65099
ip as-path access-list 20 deny _65099_

router bgp 65001
 neighbor 10.0.0.1 filter-list 10 in
\`\`\`

## Route Maps for BGP Policy

Route Maps in BGP modify route attributes:

\`\`\`cisco
route-map SET-LOCAL-PREF permit 10
 match ip address prefix-list PREFERRED-ROUTES
 set local-preference 200

route-map SET-LOCAL-PREF permit 20
 set local-preference 100

router bgp 65001
 neighbor 10.0.0.1 route-map SET-LOCAL-PREF in
\`\`\`

## Key BGP Path Attributes

### Weight (Cisco only, highest wins)
- Used locally only, not advertised to neighbors
- Default: 0 (32768 for locally originated routes)

### Local Preference (highest wins)
- Advertised to all iBGP neighbors
- Default: 100
- Used to select exit point within an AS

### MED - Multi-Exit Discriminator (lowest wins)
- Sent to eBGP neighbor to suggest entry point
- Default: 0

## Community-Based Filtering

BGP Communities tag routes for grouping:

\`\`\`cisco
! Set community
route-map TAG-ROUTES permit 10
 match ip address prefix-list CUSTOMER-ROUTES
 set community 65001:100

! Filter by community
ip community-list standard CUST-COMM permit 65001:100

route-map FILTER-BY-COMM permit 10
 match community CUST-COMM
\`\`\`

### Well-Known Communities
- \`no-export\` — Do not advertise outside the AS
- \`no-advertise\` — Do not advertise to any neighbor
- \`internet\` — Advertise to all neighbors

## Key Takeaways

- Use Prefix Lists to filter routes by network/prefix length
- Use AS-Path ACLs to filter by AS path
- Route Maps provide the most flexible attribute modification
- Communities enable policy-level route grouping and filtering`,
    reading_time_minutes: 6
  },
  {
    id: 'lesson-dev002-04',
    content_th: `## ทำไมต้อง Ansible สำหรับ Network Automation?

**Ansible** เป็นเครื่องมือ automation ยอดนิยมที่ใช้จัดการอุปกรณ์เครือข่ายได้อย่างมีประสิทธิภาพ:

- **Agentless** — ไม่ต้องติดตั้งซอฟต์แวร์บนอุปกรณ์เป้าหมาย
- **YAML-Based** — เขียน Playbook ด้วย YAML ที่อ่านง่าย
- **Idempotent** — รันซ้ำกี่ครั้งก็ได้ผลลัพธ์เหมือนกัน
- **Push Model** — ควบคุมจากเครื่อง Control Node

## สถาปัตยกรรมของ Ansible

- **Control Node** — เครื่องที่รัน Ansible (Linux/macOS)
- **Managed Nodes** — อุปกรณ์ที่ถูกจัดการ (Routers, Switches)
- **Inventory** — รายการอุปกรณ์เป้าหมาย
- **Playbooks** — ไฟล์ YAML ที่กำหนด tasks
- **Modules** — ฟังก์ชันที่ทำงานเฉพาะ (เช่น \`ios_command\`)

## Inventory File

\`\`\`yaml
# inventory.yml
all:
  children:
    routers:
      hosts:
        R1:
          ansible_host: 192.168.1.1
        R2:
          ansible_host: 192.168.1.2
      vars:
        ansible_network_os: ios
        ansible_connection: network_cli
        ansible_user: admin
        ansible_password: cisco123
    switches:
      hosts:
        SW1:
          ansible_host: 192.168.1.10
\`\`\`

## Network Modules ที่สำคัญ

### ios_command — รันคำสั่ง show
\`\`\`yaml
- name: Show running config
  cisco.ios.ios_command:
    commands:
      - show running-config
      - show ip interface brief
  register: output
\`\`\`

### ios_config — Push configuration
\`\`\`yaml
- name: Configure interface
  cisco.ios.ios_config:
    lines:
      - description WAN Link
      - ip address 10.0.0.1 255.255.255.252
      - no shutdown
    parents: interface GigabitEthernet0/1
\`\`\`

### ios_facts — เก็บข้อมูลอุปกรณ์
\`\`\`yaml
- name: Gather facts
  cisco.ios.ios_facts:
    gather_subset:
      - hardware
      - interfaces
\`\`\`

## ตัวอย่าง Playbook: Backup Configuration

\`\`\`yaml
---
- name: Backup All Router Configurations
  hosts: routers
  gather_facts: no
  tasks:
    - name: Get running config
      cisco.ios.ios_command:
        commands: show running-config
      register: config

    - name: Save to file
      copy:
        content: "{{ config.stdout[0] }}"
        dest: "./backups/{{ inventory_hostname }}_backup.cfg"
\`\`\`

## Jinja2 Templates

ใช้ template สร้าง configuration แบบ dynamic:

\`\`\`jinja2
! templates/interface.j2
{% for intf in interfaces %}
interface {{ intf.name }}
 description {{ intf.description }}
 ip address {{ intf.ip }} {{ intf.mask }}
 no shutdown
{% endfor %}
\`\`\`

## สรุปสำคัญ

- Ansible เป็น agentless automation tool ที่เหมาะกับ network devices
- Playbook เขียนด้วย YAML ที่อ่านเข้าใจง่าย
- Modules สำคัญ: \`ios_command\`, \`ios_config\`, \`ios_facts\`
- Jinja2 Templates ช่วยสร้าง config แบบ dynamic
- ใช้ Ansible ได้ทั้ง backup, deploy, compliance check`,
    content_en: `## Why Ansible for Network Automation?

**Ansible** is a popular automation tool for efficiently managing network devices:

- **Agentless** — No software installation required on target devices
- **YAML-Based** — Playbooks written in human-readable YAML
- **Idempotent** — Running multiple times produces the same result
- **Push Model** — Controlled from a central Control Node

## Ansible Architecture

- **Control Node** — Machine running Ansible (Linux/macOS)
- **Managed Nodes** — Devices being managed (Routers, Switches)
- **Inventory** — List of target devices
- **Playbooks** — YAML files defining tasks
- **Modules** — Functions performing specific actions (e.g., \`ios_command\`)

## Inventory File

\`\`\`yaml
# inventory.yml
all:
  children:
    routers:
      hosts:
        R1:
          ansible_host: 192.168.1.1
        R2:
          ansible_host: 192.168.1.2
      vars:
        ansible_network_os: ios
        ansible_connection: network_cli
        ansible_user: admin
        ansible_password: cisco123
    switches:
      hosts:
        SW1:
          ansible_host: 192.168.1.10
\`\`\`

## Key Network Modules

### ios_command — Run show commands
\`\`\`yaml
- name: Show running config
  cisco.ios.ios_command:
    commands:
      - show running-config
      - show ip interface brief
  register: output
\`\`\`

### ios_config — Push configuration
\`\`\`yaml
- name: Configure interface
  cisco.ios.ios_config:
    lines:
      - description WAN Link
      - ip address 10.0.0.1 255.255.255.252
      - no shutdown
    parents: interface GigabitEthernet0/1
\`\`\`

### ios_facts — Gather device information
\`\`\`yaml
- name: Gather facts
  cisco.ios.ios_facts:
    gather_subset:
      - hardware
      - interfaces
\`\`\`

## Example Playbook: Backup Configuration

\`\`\`yaml
---
- name: Backup All Router Configurations
  hosts: routers
  gather_facts: no
  tasks:
    - name: Get running config
      cisco.ios.ios_command:
        commands: show running-config
      register: config

    - name: Save to file
      copy:
        content: "{{ config.stdout[0] }}"
        dest: "./backups/{{ inventory_hostname }}_backup.cfg"
\`\`\`

## Jinja2 Templates

Use templates to generate dynamic configurations:

\`\`\`jinja2
! templates/interface.j2
{% for intf in interfaces %}
interface {{ intf.name }}
 description {{ intf.description }}
 ip address {{ intf.ip }} {{ intf.mask }}
 no shutdown
{% endfor %}
\`\`\`

## Key Takeaways

- Ansible is an agentless automation tool ideal for network devices
- Playbooks are written in human-readable YAML
- Key modules: \`ios_command\`, \`ios_config\`, \`ios_facts\`
- Jinja2 Templates enable dynamic config generation
- Use Ansible for backup, deployment, and compliance checking`,
    reading_time_minutes: 7
  },
  {
    id: 'lesson-git-02',
    content_th: `## Git Workflows สำหรับ Network Engineers

**Git** ไม่ใช่แค่เครื่องมือสำหรับ developer เท่านั้น แต่ Network Engineers ก็ใช้ Git ในการจัดการ network configurations, automation scripts, และ infrastructure as code ได้อย่างมีประสิทธิภาพ

## Branching Strategies

### Feature Branch Workflow
วิธีที่นิยมที่สุด — สร้าง branch ใหม่สำหรับทุกการเปลี่ยนแปลง:

\`\`\`bash
# สร้าง branch ใหม่สำหรับ feature
git checkout -b feature/add-ospf-config

# ทำงานและ commit
git add ospf_config.yml
git commit -m "Add OSPF configuration for site Bangkok"

# Push ขึ้น remote
git push origin feature/add-ospf-config
\`\`\`

### GitFlow
โครงสร้างที่เข้มงวดกว่า เหมาะสำหรับ production environments:
- \`main\` — production code เท่านั้น
- \`develop\` — development code
- \`feature/*\` — features ใหม่
- \`hotfix/*\` — แก้ bug เร่งด่วน
- \`release/*\` — เตรียม release ใหม่

## Pull Requests / Merge Requests

Pull Request (GitHub) หรือ Merge Request (GitLab) เป็นกระบวนการขอให้ review code ก่อน merge:

1. สร้าง branch ใหม่และทำการเปลี่ยนแปลง
2. Push branch ขึ้น remote repository
3. สร้าง Pull Request พร้อมคำอธิบายการเปลี่ยนแปลง
4. ทีมงาน review code และให้ feedback
5. แก้ไขตาม feedback (ถ้ามี)
6. Approve และ Merge เข้า main branch

### Code Review Best Practices
- ตรวจสอบ **syntax errors** ใน config files
- ยืนยันว่า **IP addresses ไม่ชนกัน**
- ตรวจว่ามี **rollback plan** สำหรับ network changes
- ใช้ **automated linting** (เช่น yamllint, ansible-lint)

## Branch Protection Rules

ป้องกัน main branch จากการ push โดยตรง:
- **Require pull request reviews** — ต้องมีคน approve ก่อน merge
- **Require status checks** — CI/CD tests ต้องผ่านก่อน
- **Restrict force pushes** — ห้าม force push
- **Require linear history** — ป้องกัน merge commits ที่ซับซ้อน

## CI/CD สำหรับ Network

\`\`\`yaml
# .gitlab-ci.yml
stages:
  - lint
  - test
  - deploy

lint-configs:
  stage: lint
  script:
    - yamllint ansible/
    - ansible-lint ansible/playbooks/

test-configs:
  stage: test
  script:
    - ansible-playbook --check ansible/playbooks/deploy.yml

deploy-to-network:
  stage: deploy
  script:
    - ansible-playbook ansible/playbooks/deploy.yml
  only:
    - main
  when: manual
\`\`\`

## Git สำหรับ Network Config Management

\`\`\`bash
# โครงสร้าง repo สำหรับ network
network-configs/
├── backups/
│   ├── R1_20240101.cfg
│   └── SW1_20240101.cfg
├── templates/
│   ├── router_base.j2
│   └── switch_base.j2
├── ansible/
│   ├── inventory.yml
│   └── playbooks/
└── README.md
\`\`\`

## สรุปสำคัญ

- ใช้ Feature Branch workflow สำหรับทุกการเปลี่ยนแปลง
- Pull Request + Code Review ป้องกัน human error
- Branch Protection Rules บังคับกระบวนการที่ปลอดภัย
- CI/CD ช่วย lint, test และ deploy อัตโนมัติ
- เก็บ network configs ใน Git เพื่อ version control และ audit trail`,
    content_en: `## Git Workflows for Network Engineers

**Git** isn't just for developers — Network Engineers use Git to manage network configurations, automation scripts, and infrastructure as code effectively.

## Branching Strategies

### Feature Branch Workflow
The most popular approach — create a new branch for every change:

\`\`\`bash
# Create a new feature branch
git checkout -b feature/add-ospf-config

# Work and commit
git add ospf_config.yml
git commit -m "Add OSPF configuration for site Bangkok"

# Push to remote
git push origin feature/add-ospf-config
\`\`\`

### GitFlow
A stricter structure suited for production environments:
- \`main\` — production code only
- \`develop\` — development code
- \`feature/*\` — new features
- \`hotfix/*\` — urgent bug fixes
- \`release/*\` — preparing new releases

## Pull Requests / Merge Requests

Pull Requests (GitHub) or Merge Requests (GitLab) are the process of requesting code review before merging:

1. Create a new branch and make changes
2. Push the branch to the remote repository
3. Create a Pull Request with a description of changes
4. Team reviews code and provides feedback
5. Address feedback if needed
6. Approve and merge into main branch

### Code Review Best Practices
- Check for **syntax errors** in config files
- Verify **IP addresses don't conflict**
- Ensure a **rollback plan** exists for network changes
- Use **automated linting** (e.g., yamllint, ansible-lint)

## Branch Protection Rules

Protect the main branch from direct pushes:
- **Require pull request reviews** — Must have approvals before merge
- **Require status checks** — CI/CD tests must pass first
- **Restrict force pushes** — Prevent force pushing
- **Require linear history** — Prevent complex merge commits

## CI/CD for Networks

\`\`\`yaml
# .gitlab-ci.yml
stages:
  - lint
  - test
  - deploy

lint-configs:
  stage: lint
  script:
    - yamllint ansible/
    - ansible-lint ansible/playbooks/

test-configs:
  stage: test
  script:
    - ansible-playbook --check ansible/playbooks/deploy.yml

deploy-to-network:
  stage: deploy
  script:
    - ansible-playbook ansible/playbooks/deploy.yml
  only:
    - main
  when: manual
\`\`\`

## Git for Network Config Management

\`\`\`bash
# Repository structure for networking
network-configs/
├── backups/
│   ├── R1_20240101.cfg
│   └── SW1_20240101.cfg
├── templates/
│   ├── router_base.j2
│   └── switch_base.j2
├── ansible/
│   ├── inventory.yml
│   └── playbooks/
└── README.md
\`\`\`

## Key Takeaways

- Use Feature Branch workflow for every change
- Pull Request + Code Review prevents human error
- Branch Protection Rules enforce safe processes
- CI/CD automates linting, testing, and deployment
- Store network configs in Git for version control and audit trails`,
    reading_time_minutes: 7
  },
  {
    id: 'lesson-sec002-04',
    content_th: `## SSL VPN คืออะไร?

**SSL VPN** ใช้โปรโตคอล **SSL/TLS** (พอร์ต 443) ในการสร้าง encrypted tunnel ข้อดีคือผ่าน firewall ได้ง่ายเพราะใช้พอร์ตเดียวกับ HTTPS

## SSL VPN vs IPsec VPN

| คุณสมบัติ | SSL VPN | IPsec VPN |
|---|---|---|
| Layer | Layer 4-7 (TLS) | Layer 3 (IP) |
| Port | TCP 443 | UDP 500, ESP |
| Firewall Friendly | ใช่ (HTTPS port) | อาจถูก block |
| Client Required | Optional (Clientless mode) | ต้องติดตั้ง client |
| Access Granularity | Application-level | Network-level |

## Cisco AnyConnect Client

**AnyConnect** เป็น VPN client ของ Cisco ที่รองรับทั้ง SSL และ IPsec:

### การตั้งค่าบน ASA

\`\`\`cisco
! เปิดใช้ WebVPN
ciscoasa(config)# webvpn
ciscoasa(config-webvpn)# enable outside
ciscoasa(config-webvpn)# anyconnect enable
ciscoasa(config-webvpn)# anyconnect image disk0:/anyconnect-win.pkg

! สร้าง Group Policy
ciscoasa(config)# group-policy EMPLOYEE internal
ciscoasa(config-group-policy)# vpn-tunnel-protocol ssl-client
ciscoasa(config-group-policy)# split-tunnel-policy tunnelspecified
ciscoasa(config-group-policy)# split-tunnel-network-list value SPLIT-ACL

! สร้าง Connection Profile
ciscoasa(config)# tunnel-group EMPLOYEE-VPN type remote-access
ciscoasa(config-tunnel-general)# default-group-policy EMPLOYEE
ciscoasa(config-tunnel-general)# address-pool VPN-POOL
\`\`\`

## Clientless WebVPN

ผู้ใช้เข้าถึงทรัพยากรผ่าน web browser โดยไม่ต้องติดตั้ง client:

- เข้าถึง web applications ผ่าน SSL portal
- ใช้ bookmarks สำหรับ internal URLs
- รองรับ file browsing (CIFS/FTP)
- เหมาะสำหรับ partners หรือ contractors ที่ไม่สามารถติดตั้ง client ได้

## Split Tunneling vs Full Tunneling

### Full Tunneling
- **ทุก traffic** ผ่าน VPN tunnel
- ปลอดภัยกว่า เพราะ traffic ทั้งหมดถูกตรวจสอบ
- ใช้ bandwidth ของ VPN concentrator มากกว่า

### Split Tunneling
- เฉพาะ traffic ไปยัง corporate network เท่านั้นที่ผ่าน VPN
- Internet traffic ออกโดยตรงจากเครื่อง client
- ลดภาระ VPN concentrator แต่มีความเสี่ยงด้าน security

\`\`\`cisco
! กำหนด Split Tunnel ACL
ciscoasa(config)# access-list SPLIT-ACL standard permit 10.0.0.0 255.0.0.0
ciscoasa(config)# access-list SPLIT-ACL standard permit 172.16.0.0 255.240.0.0
\`\`\`

## Security Considerations

- ใช้ **Multi-Factor Authentication (MFA)** เสมอ
- กำหนด **idle timeout** และ **max session length**
- ใช้ **endpoint posture assessment** ตรวจสอบอุปกรณ์
- เปิด **logging** สำหรับทุก VPN session
- อัปเดต AnyConnect client เป็นเวอร์ชันล่าสุดเสมอ

## สรุปสำคัญ

- SSL VPN ใช้พอร์ต 443 ผ่าน firewall ได้ง่าย
- AnyConnect รองรับทั้ง SSL และ IPsec
- Split Tunneling ลดภาระ VPN แต่มีข้อควรระวังด้าน security
- ควรใช้ MFA และ posture assessment เสมอ`,
    content_en: `## What is SSL VPN?

**SSL VPN** uses the **SSL/TLS** protocol (port 443) to create an encrypted tunnel. Its advantage is easy firewall traversal since it uses the same port as HTTPS.

## SSL VPN vs IPsec VPN

| Feature | SSL VPN | IPsec VPN |
|---|---|---|
| Layer | Layer 4-7 (TLS) | Layer 3 (IP) |
| Port | TCP 443 | UDP 500, ESP |
| Firewall Friendly | Yes (HTTPS port) | May be blocked |
| Client Required | Optional (Clientless mode) | Client required |
| Access Granularity | Application-level | Network-level |

## Cisco AnyConnect Client

**AnyConnect** is Cisco's VPN client supporting both SSL and IPsec:

### ASA Configuration

\`\`\`cisco
! Enable WebVPN
ciscoasa(config)# webvpn
ciscoasa(config-webvpn)# enable outside
ciscoasa(config-webvpn)# anyconnect enable
ciscoasa(config-webvpn)# anyconnect image disk0:/anyconnect-win.pkg

! Create Group Policy
ciscoasa(config)# group-policy EMPLOYEE internal
ciscoasa(config-group-policy)# vpn-tunnel-protocol ssl-client
ciscoasa(config-group-policy)# split-tunnel-policy tunnelspecified
ciscoasa(config-group-policy)# split-tunnel-network-list value SPLIT-ACL

! Create Connection Profile
ciscoasa(config)# tunnel-group EMPLOYEE-VPN type remote-access
ciscoasa(config-tunnel-general)# default-group-policy EMPLOYEE
ciscoasa(config-tunnel-general)# address-pool VPN-POOL
\`\`\`

## Clientless WebVPN

Users access resources through a web browser without installing a client:

- Access web applications through SSL portal
- Use bookmarks for internal URLs
- Supports file browsing (CIFS/FTP)
- Ideal for partners or contractors who cannot install a client

## Split Tunneling vs Full Tunneling

### Full Tunneling
- **All traffic** goes through the VPN tunnel
- More secure as all traffic is inspected
- Uses more VPN concentrator bandwidth

### Split Tunneling
- Only corporate network traffic goes through VPN
- Internet traffic exits directly from the client
- Reduces VPN concentrator load but has security risks

\`\`\`cisco
! Define Split Tunnel ACL
ciscoasa(config)# access-list SPLIT-ACL standard permit 10.0.0.0 255.0.0.0
ciscoasa(config)# access-list SPLIT-ACL standard permit 172.16.0.0 255.240.0.0
\`\`\`

## Security Considerations

- Always use **Multi-Factor Authentication (MFA)**
- Set **idle timeout** and **max session length**
- Use **endpoint posture assessment** to verify devices
- Enable **logging** for all VPN sessions
- Keep AnyConnect client updated to the latest version

## Key Takeaways

- SSL VPN uses port 443 for easy firewall traversal
- AnyConnect supports both SSL and IPsec
- Split Tunneling reduces VPN load but requires security precautions
- Always implement MFA and posture assessment`,
    reading_time_minutes: 7
  },
  {
    id: 'lesson-ts002-04',
    content_th: `## EEM (Embedded Event Manager)

**EEM** เป็นเครื่องมือ automation ที่ฝังอยู่ใน Cisco IOS ช่วยให้ router ตอบสนองต่อเหตุการณ์ต่างๆ โดยอัตโนมัติ

## EEM Applet

EEM Applet เป็นสคริปต์ที่เขียนใน CLI ประกอบด้วย:
- **Event Detector** — ตรวจจับเหตุการณ์ที่ต้องการ
- **Action** — สิ่งที่ต้องทำเมื่อเหตุการณ์เกิดขึ้น

### ตัวอย่าง: แจ้งเตือนเมื่อ Interface Down

\`\`\`cisco
event manager applet INTF-DOWN
 event syslog pattern "Interface GigabitEthernet0/0, changed state to down"
 action 1.0 syslog msg "ALERT: GigabitEthernet0/0 is DOWN! Investigating..."
 action 2.0 cli command "enable"
 action 3.0 cli command "show interface GigabitEthernet0/0"
 action 4.0 mail server "10.1.1.100" to "admin@company.com" from "router@company.com" subject "Interface Down Alert" body "GigabitEthernet0/0 went down. Please check."
\`\`\`

### ตัวอย่าง: Auto-Recovery

\`\`\`cisco
event manager applet AUTO-RECOVER
 event syslog pattern "LINK-3-UPDOWN.*GigabitEthernet0/1.*down"
 action 1.0 cli command "enable"
 action 2.0 cli command "configure terminal"
 action 3.0 cli command "interface GigabitEthernet0/1"
 action 4.0 cli command "shutdown"
 action 5.0 wait 5
 action 6.0 cli command "no shutdown"
 action 7.0 syslog msg "EEM: Auto-recovery attempted on Gi0/1"
\`\`\`

### ตัวอย่าง: Scheduled Backup

\`\`\`cisco
event manager applet DAILY-BACKUP
 event timer cron cron-entry "0 2 * * *"
 action 1.0 cli command "enable"
 action 2.0 cli command "copy running-config tftp://10.1.1.100/backup.cfg"
\`\`\`

## Event Detectors ที่สำคัญ

- **syslog** — ตรวจจับ syslog message ที่ตรงกับ pattern
- **timer** — ตั้งเวลา (watchdog, countdown, cron)
- **interface** — ตรวจจับ interface counter changes
- **track** — ตรวจจับ object tracking state changes
- **none** — รัน manual ด้วย \`event manager run\`

## SPAN (Switched Port Analyzer)

**SPAN** ใช้ mirror traffic จากพอร์ตหนึ่งไปยังอีกพอร์ตหนึ่ง เพื่อการวิเคราะห์ด้วย packet analyzer เช่น Wireshark

### Local SPAN

\`\`\`cisco
! Mirror traffic จาก Gi0/1 ไปยัง Gi0/24
Switch(config)# monitor session 1 source interface GigabitEthernet0/1 both
Switch(config)# monitor session 1 destination interface GigabitEthernet0/24

! ตรวจสอบ SPAN session
Switch# show monitor session 1
\`\`\`

### RSPAN (Remote SPAN)
ส่ง mirrored traffic ข้าม switch โดยใช้ RSPAN VLAN:

\`\`\`cisco
! บน Source Switch
Switch-A(config)# vlan 999
Switch-A(config-vlan)# remote-span
Switch-A(config)# monitor session 1 source interface Gi0/1
Switch-A(config)# monitor session 1 destination remote vlan 999

! บน Destination Switch
Switch-B(config)# monitor session 1 source remote vlan 999
Switch-B(config)# monitor session 1 destination interface Gi0/24
\`\`\`

### ERSPAN (Encapsulated Remote SPAN)
ส่ง mirrored traffic ข้าม Layer 3 network โดยใช้ GRE encapsulation เหมาะสำหรับ data center ที่อุปกรณ์อยู่คนละ site

## Use Cases

- **Security Monitoring** — ส่ง traffic ไปยัง IDS/IPS
- **Troubleshooting** — จับ packet เพื่อวิเคราะห์ปัญหา
- **Compliance** — บันทึก traffic เพื่อ audit
- **Performance Analysis** — วิเคราะห์ traffic patterns

## สรุปสำคัญ

- EEM ช่วย automate การตอบสนองต่อเหตุการณ์บน Cisco devices
- EEM Applet ใช้ event detector + action commands
- SPAN mirror traffic สำหรับ analysis
- RSPAN ข้าม switch, ERSPAN ข้าม Layer 3 network
- ทั้ง EEM และ SPAN เป็นเครื่องมือสำคัญสำหรับ Network Operations`,
    content_en: `## EEM (Embedded Event Manager)

**EEM** is an automation tool embedded in Cisco IOS that enables routers to automatically respond to various events.

## EEM Applets

EEM Applets are CLI-based scripts consisting of:
- **Event Detector** — Detects the desired event
- **Action** — What to do when the event occurs

### Example: Alert on Interface Down

\`\`\`cisco
event manager applet INTF-DOWN
 event syslog pattern "Interface GigabitEthernet0/0, changed state to down"
 action 1.0 syslog msg "ALERT: GigabitEthernet0/0 is DOWN! Investigating..."
 action 2.0 cli command "enable"
 action 3.0 cli command "show interface GigabitEthernet0/0"
 action 4.0 mail server "10.1.1.100" to "admin@company.com" from "router@company.com" subject "Interface Down Alert" body "GigabitEthernet0/0 went down. Please check."
\`\`\`

### Example: Auto-Recovery

\`\`\`cisco
event manager applet AUTO-RECOVER
 event syslog pattern "LINK-3-UPDOWN.*GigabitEthernet0/1.*down"
 action 1.0 cli command "enable"
 action 2.0 cli command "configure terminal"
 action 3.0 cli command "interface GigabitEthernet0/1"
 action 4.0 cli command "shutdown"
 action 5.0 wait 5
 action 6.0 cli command "no shutdown"
 action 7.0 syslog msg "EEM: Auto-recovery attempted on Gi0/1"
\`\`\`

### Example: Scheduled Backup

\`\`\`cisco
event manager applet DAILY-BACKUP
 event timer cron cron-entry "0 2 * * *"
 action 1.0 cli command "enable"
 action 2.0 cli command "copy running-config tftp://10.1.1.100/backup.cfg"
\`\`\`

## Key Event Detectors

- **syslog** — Detects syslog messages matching a pattern
- **timer** — Time-based (watchdog, countdown, cron)
- **interface** — Detects interface counter changes
- **track** — Detects object tracking state changes
- **none** — Manual trigger via \`event manager run\`

## SPAN (Switched Port Analyzer)

**SPAN** mirrors traffic from one port to another for analysis with packet analyzers like Wireshark.

### Local SPAN

\`\`\`cisco
! Mirror traffic from Gi0/1 to Gi0/24
Switch(config)# monitor session 1 source interface GigabitEthernet0/1 both
Switch(config)# monitor session 1 destination interface GigabitEthernet0/24

! Verify SPAN session
Switch# show monitor session 1
\`\`\`

### RSPAN (Remote SPAN)
Sends mirrored traffic across switches using an RSPAN VLAN:

\`\`\`cisco
! On Source Switch
Switch-A(config)# vlan 999
Switch-A(config-vlan)# remote-span
Switch-A(config)# monitor session 1 source interface Gi0/1
Switch-A(config)# monitor session 1 destination remote vlan 999

! On Destination Switch
Switch-B(config)# monitor session 1 source remote vlan 999
Switch-B(config)# monitor session 1 destination interface Gi0/24
\`\`\`

### ERSPAN (Encapsulated Remote SPAN)
Sends mirrored traffic across Layer 3 networks using GRE encapsulation. Ideal for data centers with devices at different sites.

## Use Cases

- **Security Monitoring** — Send traffic to IDS/IPS
- **Troubleshooting** — Capture packets for problem analysis
- **Compliance** — Record traffic for auditing
- **Performance Analysis** — Analyze traffic patterns

## Key Takeaways

- EEM automates event response on Cisco devices
- EEM Applets use event detectors + action commands
- SPAN mirrors traffic for analysis
- RSPAN spans across switches; ERSPAN across Layer 3 networks
- Both EEM and SPAN are essential Network Operations tools`,
    reading_time_minutes: 7
  }
];

module.exports = articles;
