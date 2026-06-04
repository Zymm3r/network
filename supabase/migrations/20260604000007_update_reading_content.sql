-- Migration: Update reading lesson content

UPDATE lessons 
SET content_th = '## TCP/IP Protocol Suite

**บทนำ**
TCP/IP Protocol Suite เป็นรากฐานของการสื่อสารในเครือข่ายคอมพิวเตอร์และอินเทอร์เน็ต ถูกออกแบบมาเพื่อให้ระบบต่างๆ สามารถสื่อสารกันได้แม้จะต่างแพลตฟอร์ม

**โครงสร้างเลเยอร์ (Layer Architecture)**
ประกอบด้วย 4 เลเยอร์หลัก:
- **Application Layer:** เทียบเท่ากับ Layer 5-7 ของ OSI Model จัดการกับโปรโตคอลระดับผู้ใช้งาน เช่น HTTP, FTP
- **Transport Layer:** จัดการการเชื่อมต่อระหว่าง Host มี 2 โปรโตคอลหลักคือ TCP (เชื่อถือได้) และ UDP (รวดเร็ว)
- **Internet Layer:** เทียบเท่า Network Layer ทำหน้าที่ค้นหาเส้นทางและระบุ IP Address
- **Network Access Layer:** จัดการกับฮาร์ดแวร์และการส่งข้อมูลบนสื่อกายภาพ

**สรุป**
TCP/IP คือโมเดลที่ใช้งานจริงในปัจจุบัน ซึ่งมีความเรียบง่ายและยืดหยุ่นกว่า OSI Model ทำให้กลายมาเป็นมาตรฐานสากลของระบบเครือข่าย', 
    content_en = '## TCP/IP Protocol Suite

**Introduction**
The TCP/IP Protocol Suite is the foundation of computer networking and the Internet. It is designed to enable communication between disparate systems across the globe.

**Layer Architecture**
It consists of 4 primary layers:
- **Application Layer:** Corresponds to OSI Layers 5-7. Handles high-level protocols like HTTP, DNS, and FTP.
- **Transport Layer:** Manages host-to-host communication. The main protocols are TCP (reliable connection-oriented) and UDP (fast connectionless).
- **Internet Layer:** Equivalent to the OSI Network layer. Handles logical addressing (IP) and routing.
- **Network Access Layer:** Deals with physical hardware and MAC addressing.

**Summary**
TCP/IP is the practical, real-world model used today. Its simplicity and flexibility compared to the OSI model have made it the universal standard for networking.', 
    duration_minutes = 2 
WHERE id = 'lesson-ccna001-03' AND lesson_type = 'reading';

UPDATE lessons 
SET content_th = '## Spanning Tree Protocol (STP)

**บทนำ**
Spanning Tree Protocol (STP) คือโปรโตคอลใน Layer 2 ที่ออกแบบมาเพื่อป้องกันปัญหา Loop ที่เกิดขึ้นในสวิตช์เครือข่าย เมื่อมีการเชื่อมต่อสายแลนซ้ำซ้อน (Redundancy)

**หลักการทำงานของ STP**
- **การเลือก Root Bridge:** สวิตช์ที่มีค่า Bridge ID ต่ำที่สุดจะถูกเลือกเป็นศูนย์กลาง (Root Bridge)
- **Port Roles:** พอร์ตต่างๆ จะถูกกำหนดบทบาท เช่น Root Port (เส้นทางที่ดีที่สุดไป Root), Designated Port (พอร์ตส่งข้อมูล) และ Blocking Port (พอร์ตที่ถูกบล็อกเพื่อกัน Loop)
- **BPDU:** สวิตช์จะส่งข้อความ BPDU หากันเพื่อแลกเปลี่ยนข้อมูลและปรับเปลี่ยนโครงสร้าง Spanning Tree เมื่อมีสายขาด

**สรุป**
STP เป็นกลไกสำคัญที่ขาดไม่ได้ในเครือข่ายแบบสวิตชิ่ง ช่วยให้เครือข่ายมี Redundancy ได้โดยไม่เกิดปัญหา Broadcast Storm ที่อาจทำให้ระบบล่ม', 
    content_en = '## Spanning Tree Protocol (STP)

**Introduction**
Spanning Tree Protocol (STP) is a Layer 2 network protocol designed to prevent loops in switched networks while allowing for physical path redundancy.

**How STP Works**
- **Root Bridge Election:** The switch with the lowest Bridge ID becomes the logical center of the network.
- **Port Roles:** Ports are assigned specific roles: Root Port (best path to the root), Designated Port (forwarding traffic), and Blocking Port (blocks traffic to prevent loops).
- **BPDU:** Switches exchange Bridge Protocol Data Units (BPDUs) to monitor the network state and automatically adapt if a link fails.

**Summary**
STP is critical for maintaining a stable Layer 2 environment. It allows network engineers to build redundant topologies without the fear of broadcast storms taking down the network.', 
    duration_minutes = 2 
WHERE id = 'lesson-ccna002-04' AND lesson_type = 'reading';

UPDATE lessons 
SET content_th = '## RIP (Routing Information Protocol)

**บทนำ**
RIP เป็นหนึ่งใน Routing Protocol แบบ Distance Vector ที่เก่าแก่ที่สุด ออกแบบมาสำหรับเครือข่ายขนาดเล็กถึงขนาดกลาง

**คุณสมบัติหลัก**
- **Metric:** ใช้จำนวน Hop (Hop Count) เป็นเกณฑ์ในการเลือกเส้นทาง โดยเส้นทางที่มีจำนวน Hop น้อยที่สุดจะถือว่าดีที่สุด
- **ข้อจำกัด:** รองรับสูงสุดเพียง 15 Hop (16 ถือว่า Unreachable)
- **RIPv1 vs RIPv2:** RIPv1 เป็นแบบ Classful (ไม่ส่ง Subnet mask) ส่วน RIPv2 รองรับ Classless Inter-Domain Routing (CIDR) และการทำ Authentication

**ตัวอย่างการตั้งค่าเบื้องต้น**
```text
Router(config)# router rip
Router(config-router)# version 2
Router(config-router)# network 192.168.1.0
```

**สรุป**
แม้ในปัจจุบันองค์กรใหญ่ๆ จะหันไปใช้ OSPF หรือ EIGRP แต่ RIP ยังคงเป็นโปรโตคอลพื้นฐานที่สำคัญในการศึกษาทำความเข้าใจหลักการทำงานของ Dynamic Routing', 
    content_en = '## RIP (Routing Information Protocol)

**Introduction**
RIP is one of the oldest Distance Vector routing protocols, primarily designed for small to medium-sized networks.

**Key Features**
- **Metric:** It uses Hop Count as its routing metric. The path with the fewest routers (hops) to cross is considered the best.
- **Limitation:** The maximum allowable hop count is 15. A hop count of 16 is considered infinite (unreachable).
- **RIPv1 vs RIPv2:** RIPv1 is classful (does not send subnet masks in updates). RIPv2 is classless, supports VLSM/CIDR, and allows for authentication.

**Basic Configuration Example**
```text
Router(config)# router rip
Router(config-router)# version 2
Router(config-router)# network 192.168.1.0
```

**Summary**
While large enterprises favor OSPF or EIGRP, RIP remains a fundamental protocol for understanding the core concepts of dynamic routing and distance vector algorithms.', 
    duration_minutes = 2 
WHERE id = 'lesson-ccna003-03' AND lesson_type = 'reading';

UPDATE lessons 
SET content_th = '## WAN Design and Redundancy

**บทนำ**
เครือข่ายบริเวณกว้าง (WAN) คือระบบที่เชื่อมต่อสาขาต่างๆ ขององค์กรเข้าด้วยกัน การออกแบบ WAN ต้องคำนึงถึงความเสถียรและความพร้อมใช้งานสูง

**รูปแบบการออกแบบ (Topologies)**
- **Hub and Spoke:** สำนักงานใหญ่เป็นศูนย์กลาง (Hub) และสาขา (Spoke) เชื่อมเข้ามา จัดการง่ายแต่มี Single Point of Failure
- **Full Mesh:** ทุกสาขาเชื่อมถึงกันหมด เสถียรที่สุดแต่มีค่าใช้จ่ายสูง
- **Partial Mesh:** ผสมผสานเพื่อลดต้นทุน โดยเชื่อมเฉพาะสาขาสำคัญเข้าด้วยกัน

**ความสำคัญของ Redundancy**
การออกแบบเครือข่ายสำรอง (Dual-homed หรือ Dual-WAN) ช่วยรับประกันว่าระบบจะทำงานได้ต่อเนื่องหากลิงก์หลักเกิดปัญหา โดยมักใช้ร่วมกับโปรโตคอลเช่น BGP หรือการทำ SD-WAN ในปัจจุบัน

**สรุป**
การออกแบบ WAN ที่ดีต้องรักษาสมดุลระหว่างประสิทธิภาพ ค่าใช้จ่าย และความน่าเชื่อถือ โดยการวางแผน Redundancy ถือเป็นหัวใจสำคัญ', 
    content_en = '## WAN Design and Redundancy

**Introduction**
Wide Area Networks (WANs) connect dispersed organizational sites. Designing an effective WAN requires a focus on high availability, performance, and redundancy.

**Design Topologies**
- **Hub and Spoke:** The headquarters acts as a central hub for remote spoke branches. It is cost-effective but creates a single point of failure.
- **Full Mesh:** Every site connects to every other site. It provides maximum redundancy but is extremely expensive and complex to scale.
- **Partial Mesh:** A hybrid approach where only critical sites have multiple direct connections, balancing cost and reliability.

**Importance of Redundancy**
Implementing redundant paths (like Dual-homed or Dual-router setups) ensures network survivability if a primary link fails. Modern architectures heavily leverage SD-WAN to manage these links dynamically.

**Summary**
A robust WAN design strikes a balance between performance, budget, and reliability. Integrating proper redundancy mechanisms is critical to maintaining continuous business operations.', 
    duration_minutes = 2 
WHERE id = 'lesson-ccna004-04' AND lesson_type = 'reading';

UPDATE lessons 
SET content_th = '## NTP and Syslog

**บทนำ**
Network Time Protocol (NTP) และ Syslog เป็นสองบริการเครือข่ายพื้นฐานที่ทำงานร่วมกันเพื่อการดูแลและตรวจสอบระบบอย่างมีประสิทธิภาพ

**Network Time Protocol (NTP)**
- ทำหน้าที่ซิงโครไนซ์เวลาของอุปกรณ์ทุกชิ้นในเครือข่ายให้ตรงกัน
- ใช้สถาปัตยกรรมแบบ Stratum (Stratum 0 คือนาฬิกาอ้างอิง, Stratum 1 คือเซิร์ฟเวอร์ที่รับเวลามา)
- สำคัญมากสำหรับการยืนยันตัวตนและการแก้ปัญหา (Troubleshooting)

**Syslog**
- เป็นมาตรฐานการเก็บและส่ง Log ของระบบไปยังเซิร์ฟเวอร์ส่วนกลาง
- มีระดับความรุนแรง (Severity Levels) 8 ระดับ (0 ถึง 7) เช่น Level 0 (Emergencies), Level 3 (Errors), และ Level 7 (Debugging)

**สรุป**
หากไม่มี NTP เวลาใน Log จะคลาดเคลื่อน ทำให้ไม่สามารถนำข้อมูลจาก Syslog ของอุปกรณ์หลายๆ ตัวมาหาความสัมพันธ์ (Correlation) เพื่อวิเคราะห์หาสาเหตุของปัญหาในเครือข่ายได้', 
    content_en = '## NTP and Syslog

**Introduction**
Network Time Protocol (NTP) and Syslog are two foundational network services that work hand-in-hand for effective network management, monitoring, and troubleshooting.

**Network Time Protocol (NTP)**
- Synchronizes the clocks of all networking devices to a highly accurate time source.
- Operates on a hierarchical system called Stratum levels (Stratum 1 servers get time directly from hardware clocks, Stratum 2 gets it from Stratum 1, etc.).
- Critical for time-sensitive protocols and log accuracy.

**Syslog**
- A standard for message logging that allows devices to send event messages to a centralized logging server.
- Uses Severity Levels ranging from 0 (Emergencies) to 7 (Debugging).

**Summary**
Without NTP, the timestamps on Syslog messages will be incorrect or mismatched across devices, making it nearly impossible to correlate events and perform accurate root-cause analysis during outages.', 
    duration_minutes = 2 
WHERE id = 'lesson-ccna005-05' AND lesson_type = 'reading';

UPDATE lessons 
SET content_th = '## AAA Framework

**บทนำ**
AAA ย่อมาจาก Authentication, Authorization และ Accounting เป็นเฟรมเวิร์กมาตรฐานสำหรับการควบคุมการเข้าถึงระบบเครือข่ายและการรักษาความปลอดภัย

**องค์ประกอบของ AAA**
- **Authentication (การยืนยันตัวตน):** ตรวจสอบว่าผู้ใช้คือใคร (เช่น การใช้ Username/Password, OTP หรือ Certificate)
- **Authorization (การมอบสิทธิ์):** กำหนดว่าผู้ใช้สามารถทำอะไรได้บ้างหลังจากยืนยันตัวตนสำเร็จ (เช่น สิทธิ์ในการตั้งค่า หรือแค่สิทธิ์ในการอ่าน)
- **Accounting (การเก็บบันทึก):** บันทึกการกระทำของผู้ใช้ เช่น ล็อกอินเมื่อไหร่ พิมพ์คำสั่งอะไรไปบ้าง และใช้เวลานานเท่าไร

**RADIUS vs TACACS+**
- **RADIUS:** เป็นมาตรฐานเปิด นิยมใช้กับการเข้าถึงเครือข่าย (Network Access) เช่น Wi-Fi 802.1x
- **TACACS+:** เป็นโปรโตคอลของ Cisco ที่แยก A-A-A ออกจากกันอย่างชัดเจน นิยมใช้ควบคุมสิทธิ์การเข้าบริหารจัดการอุปกรณ์ (Device Administration)

**สรุป**
AAA เป็นหัวใจสำคัญของ Security Policyในองค์กร ช่วยให้ผู้ดูแลระบบควบคุมและตรวจสอบทุกการกระทำในเครือข่ายได้อย่างรัดกุม', 
    content_en = '## AAA Framework

**Introduction**
The AAA Framework stands for Authentication, Authorization, and Accounting. It is the core architectural framework used for access control and network security.

**Components of AAA**
- **Authentication:** Verifies ''Who you are'' (using credentials like passwords, biometrics, or certificates).
- **Authorization:** Determines ''What you can do.'' It restricts the commands or resources a user can access after authenticating.
- **Accounting:** Tracks ''What you did.'' It records login/logout times, commands executed, and resources consumed for auditing purposes.

**RADIUS vs TACACS+**
- **RADIUS:** An open standard primarily used for network access control (like Wi-Fi 802.1X). It combines authentication and authorization.
- **TACACS+:** A Cisco-proprietary protocol that separates the three AAA functions completely. It is heavily preferred for device administration.

**Summary**
The AAA framework is essential for enterprise security. It ensures only authorized personnel can access infrastructure, restricts their privileges appropriately, and provides a full audit trail of their actions.', 
    duration_minutes = 2 
WHERE id = 'lesson-ccna006-04' AND lesson_type = 'reading';

UPDATE lessons 
SET content_th = '## EIGRP Route Filtering and Summarization

**บทนำ**
EIGRP เป็น Routing Protocol แบบ Advanced Distance Vector การจัดการตารางเส้นทาง (Routing Table) ให้มีขนาดเล็กและมีประสิทธิภาพถือเป็นทักษะระดับสูงใน EIGRP

**Route Filtering**
- ใช้เพื่อบล็อกหรือไม่ยอมรับบางเส้นทางเข้ามาในระบบ
- ทำได้ผ่านการใช้ `Prefix-list`, `Access-list`, หรือ `Route-map` ร่วมกับคำสั่ง `distribute-list`
- ช่วยเพิ่มความปลอดภัยและควบคุมทิศทางของทราฟฟิก

**Manual Summarization**
- เป็นการรวมหลายซับเน็ตให้เป็นเส้นทางเดียว (Summary Route) ก่อนประกาศออกไป
- ทำได้โดยใช้คำสั่งระดับอินเตอร์เฟส เช่น `ip summary-address eigrp <AS> <IP> <Mask>`
- **ข้อดี:** ลดขนาด Routing table, ช่วยจำกัดขอบเขตของ EIGRP Query เมื่อมีเส้นทางดาวน์ลง (ลดอาการ Stuck-in-Active)

**สรุป**
การประยุกต์ใช้ Filtering และ Summarization ร่วมกันใน EIGRP ช่วยเพิ่มความเสถียรของเครือข่าย ลดภาระของ CPU บนเร้าเตอร์ และควบคุมเส้นทางการเชื่อมต่อได้อย่างสมบูรณ์แบบ', 
    content_en = '## EIGRP Route Filtering and Summarization

**Introduction**
EIGRP is an Advanced Distance Vector routing protocol. Managing the size and efficiency of the routing table is a crucial advanced skill in EIGRP networks.

**Route Filtering**
- Used to permit or deny specific routes from being installed or advertised.
- Typically implemented using `Prefix-lists`, `Access-lists`, or `Route-maps` applied via a `distribute-list` command.
- Improves security and enforces traffic engineering policies.

**Manual Summarization**
- The process of consolidating multiple specific subnets into a single larger aggregate route.
- In EIGRP, this is configured at the interface level using `ip summary-address eigrp <AS> <IP> <Mask>`.
- **Benefits:** Shrinks the routing table, hides topology changes, and restricts the boundary of EIGRP Queries, significantly reducing the chance of Stuck-in-Active (SIA) errors.

**Summary**
Combining route filtering and manual summarization optimizes EIGRP domains. It minimizes router CPU overhead, limits fault domains, and provides precise control over path selection.', 
    duration_minutes = 2 
WHERE id = 'lesson-adv002-04' AND lesson_type = 'reading';

UPDATE lessons 
SET content_th = '## BGP Filtering and Route Maps

**บทนำ**
Border Gateway Protocol (BGP) คือโปรโตคอลหลักที่ขับเคลื่อนอินเทอร์เน็ต เนื่องจากตารางเส้นทางอินเทอร์เน็ตมีขนาดใหญ่มาก (Full Route หลักล้านเส้นทาง) การควบคุมเส้นทางด้วย Filtering จึงเป็นสิ่งที่ขาดไม่ได้

**เครื่องมือสำหรับ BGP Filtering**
- **Prefix-lists:** นิยมใช้คัดกรองตาม IP Prefix และ Subnet mask ได้อย่างแม่นยำ
- **AS-Path ACLs:** ใช้คัดกรองจากหมายเลข AS Number ด้วย Regular Expression (Regex) เช่น ยอมรับเฉพาะเส้นทางที่มาจาก AS ถัดไปเท่านั้น
- **Route Maps:** เป็นเครื่องมือที่ทรงพลังที่สุด ทำหน้าที่เหมือนชุดคำสั่ง IF-THEN

**การประยุกต์ใช้ Route Maps**
Route Maps สามารถจับคู่ (Match) เส้นทางด้วย Prefix-list จากนั้นจึงกระทำ (Set) การเปลี่ยนแปลงค่า BGP Attributes เช่น Local Preference, MED หรือ AS-Path Prepending เพื่อจัดการเส้นทาง (Traffic Engineering)

**สรุป**
BGP Filtering และ Route Maps เป็นเครื่องมือระดับผู้เชี่ยวชาญที่ช่วยให้องค์กรควบคุมได้อย่างเต็มที่ว่า จะรับข้อมูลจากที่ไหน และจะส่งทราฟฟิกออกไปยังผู้ให้บริการ (ISP) รายใด', 
    content_en = '## BGP Filtering and Route Maps

**Introduction**
Border Gateway Protocol (BGP) is the protocol that runs the Internet. Because the global Internet routing table contains over a million routes, route filtering is an absolute necessity to conserve resources and enforce policies.

**BGP Filtering Tools**
- **Prefix-lists:** Highly efficient and widely used for filtering exact IPs and subnet lengths.
- **AS-Path ACLs:** Uses Regular Expressions (Regex) to filter routes based on the AS-Path attribute (e.g., matching only routes originated by a direct peer).
- **Route Maps:** The most powerful tool for BGP policy implementation, functioning like complex IF-THEN scripting.

**Using Route Maps**
Route Maps can match specific routes (using prefix-lists) and then set or manipulate BGP Attributes like Local Preference, MED, or perform AS-Path Prepending. This is the foundation of BGP Traffic Engineering.

**Summary**
BGP Filtering combined with Route Maps gives engineers granular control over outbound and inbound traffic flows, ensuring optimal path selection and enforcing peering agreements with ISPs.', 
    duration_minutes = 2 
WHERE id = 'lesson-adv003-05' AND lesson_type = 'reading';

UPDATE lessons 
SET content_th = '## Ansible for Network Automation

**บทนำ**
Ansible เป็นเครื่องมือโอเพนซอร์สจาก Red Hat ที่ได้รับความนิยมสูงสุดในสายงาน Network Automation เนื่องจากใช้งานง่าย ไม่ต้องเขียนโค้ดซับซ้อน และที่สำคัญคือเป็นแบบ Agentless

**สถาปัตยกรรมและการทำงาน**
- **Agentless:** ไม่ต้องติดตั้งซอฟต์แวร์บนเร้าเตอร์หรือสวิตช์ Ansible ใช้ SSH เข้าไปสั่งงานโดยตรง
- **Playbooks:** เขียนเป็นภาษา YAML ที่อ่านง่ายเหมือนภาษาคน
- **Inventory:** ไฟล์ระบุรายชื่อและกลุ่มของอุปกรณ์ที่ต้องการจัดการ
- **Modules:** มีโมดูลสำหรับอุปกรณ์เครือข่ายโดยเฉพาะ เช่น `ios_config`, `nxos_command`, `eos_facts`

**ตัวอย่างการใช้งาน**
การใช้ Ansible เพื่อคอนฟิก VLAN, สำรองข้อมูลคอนฟิก (Backup), หรือการตรวจสอบสถานะ (Show commands) บนอุปกรณ์นับร้อยตัวได้พร้อมๆ กันในเวลาไม่กี่นาที

**สรุป**
Ansible ช่วยลดข้อผิดพลาดจากมนุษย์ (Human Error) และลดระยะเวลาในการทำงานแบบซ้ำซาก ทำให้วิศวกรเครือข่ายมีเวลาโฟกัสกับการออกแบบระบบมากขึ้น', 
    content_en = '## Ansible for Network Automation

**Introduction**
Ansible, developed by Red Hat, is arguably the most popular open-source tool for Network Automation. Its widespread adoption is due to its simplicity, human-readable syntax, and Agentless architecture.

**Architecture and Components**
- **Agentless:** Requires no software installation on target routers or switches. It connects via standard SSH or API.
- **Playbooks:** Automation scripts written in YAML (Yet Another Markup Language), making them extremely easy to read and write.
- **Inventory:** A file that defines the host devices and groups them logically.
- **Modules:** Pre-built code blocks for specific tasks. Networking heavily uses modules like `ios_config`, `nxos_command`, and `junos_facts`.

**Use Cases**
Deploying global config changes (like Syslog/NTP), performing automated configuration backups, and gathering network state across hundreds of devices simultaneously.

**Summary**
Ansible empowers network engineers to shift from manual CLI configuration to Infrastructure as Code (IaC). It drastically reduces human error, ensures consistency, and accelerates deployment times.', 
    duration_minutes = 2 
WHERE id = 'lesson-dev002-04' AND lesson_type = 'reading';

UPDATE lessons 
SET content_th = '## GitHub & GitLab Workflows

**บทนำ**
เมื่อวงการเครือข่ายก้าวเข้าสู่ยุค NetDevOps (Network + DevOps) การจัดการซอร์สโค้ด (Source Control) จึงเข้ามามีบทบาท GitHub และ GitLab เป็นแพลตฟอร์มหลักที่ใช้หลักการของ Git

**การจัดการด้วย Git Workflow**
- **Branching:** เมื่อต้องการเปลี่ยนคอนฟิก วิศวกรจะไม่แก้ไขในระบบจริง แต่จะแตก Branch ใหม่ขึ้นมา
- **Pull Requests (PR) / Merge Requests (MR):** หลังจากแก้ไฟล์เสร็จ จะเปิดการขอรวมโค้ด (PR/MR) เพื่อให้เพื่อนร่วมทีมช่วยตรวจสอบ (Code Review) ก่อนนำไปใช้จริง
- **CI/CD Pipeline:** สามารถผูกเข้ากับ GitLab CI หรือ GitHub Actions เพื่อให้เมื่อมีการผ่าน PR ระบบจะรัน Ansible หรือ Python สคริปต์ไปตั้งค่าบนอุปกรณ์จริงอัตโนมัติ

**สรุป**
GitHub และ GitLab workflows เปลี่ยนวิธีการทำงานของวิศวกรเครือข่ายให้มีมาตรฐาน มีประวัติการแก้ไขชัดเจน และมีความปลอดภัยเทียบเท่ากับการพัฒนาซอฟต์แวร์ระดับองค์กร', 
    content_en = '## GitHub & GitLab Workflows

**Introduction**
As the networking industry evolves into NetDevOps, version control systems have become fundamental. GitHub and GitLab are the leading platforms utilizing Git to manage network configurations as code.

**The Git Workflow for Networks**
- **Branching:** Instead of making live CLI changes, engineers create a separate branch to update configuration templates.
- **Pull Requests (PR) / Merge Requests (MR):** Once changes are drafted, a PR/MR is opened. This triggers a Code Review process where peers validate the proposed configuration changes.
- **CI/CD Pipelines:** Integrated tools like GitLab CI or GitHub Actions can automatically test configurations (using tools like Batfish) and deploy them to production routers upon merge approval.

**Summary**
Adopting GitHub/GitLab workflows brings software engineering discipline to network management. It provides full audit trails, peer reviews, and automated testing, greatly enhancing network reliability and security.', 
    duration_minutes = 2 
WHERE id = 'lesson-git-02' AND lesson_type = 'reading';

UPDATE lessons 
SET content_th = '## SSL VPN and AnyConnect

**บทนำ**
ในยุคการทำงานทางไกล (Remote Work) VPN เป็นเครื่องมือที่สำคัญ SSL VPN เป็นเทคโนโลยีที่ช่วยให้ผู้ใช้งานภายนอกเชื่อมต่อเข้ามายังเครือข่ายองค์กรได้อย่างปลอดภัยผ่านโปรโตคอล TLS/SSL

**รูปแบบของ SSL VPN**
- **Clientless SSL VPN:** เข้าถึงผ่านเว็บเบราว์เซอร์ ไม่ต้องติดตั้งโปรแกรม เหมาะสำหรับการเข้าถึงเว็บแอปพลิเคชันภายใน
- **Client-based SSL VPN:** ต้องใช้ซอฟต์แวร์เช่น **Cisco AnyConnect Secure Mobility Client** ซึ่งจะจำลองการเชื่อมต่อเสมือนว่าคอมพิวเตอร์นั้นนั่งอยู่ในออฟฟิศจริงๆ (ได้ IP จากวงภายใน)

**จุดเด่นของ Cisco AnyConnect**
นอกจากฟังก์ชัน VPN แล้ว AnyConnect ยังสามารถตรวจสอบความปลอดภัยของเครื่องไคลเอนต์ (Posture Assessment) เช่น ต้องมีแอนตี้ไวรัส หรืออัปเดต Windows ล่าสุดก่อน ถึงจะยอมให้เชื่อมต่อ

**สรุป**
SSL VPN ใช้งานง่ายกว่า IPsec VPN แบบดั้งเดิมมาก เนื่องจากไม่ต้องกังวลเรื่องการตั้งค่าพอร์ตบนฝั่งผู้ใช้งาน และ AnyConnect ช่วยยกระดับความปลอดภัยให้องค์กรได้อย่างดีเยี่ยม', 
    content_en = '## SSL VPN and AnyConnect

**Introduction**
With the rise of remote work, VPNs are indispensable. SSL VPN technology allows remote users to securely access corporate network resources over the internet using TLS/SSL encryption.

**Types of SSL VPNs**
- **Clientless SSL VPN:** Accessed via a standard web browser. No software installation is required, making it perfect for accessing internal web apps securely.
- **Client-based SSL VPN:** Requires a dedicated application like the **Cisco AnyConnect Secure Mobility Client**. It provides full network access by assigning an internal IP address to the remote machine.

**Features of Cisco AnyConnect**
Beyond basic VPN capabilities, AnyConnect offers advanced endpoint security features like Posture Assessment. It can verify that a client machine has an active antivirus and updated OS before granting network access.

**Summary**
SSL VPNs are much easier to deploy and traverse firewalls more reliably than traditional IPsec client VPNs. Cisco AnyConnect provides a seamless, highly secure remote access solution for modern enterprises.', 
    duration_minutes = 2 
WHERE id = 'lesson-sec002-04' AND lesson_type = 'reading';

UPDATE lessons 
SET content_th = '## EEM and SPAN

**บทนำ**
ในกระบวนการ Troubleshooting และการมอนิเตอร์บนอุปกรณ์ Cisco เครื่องมืออย่าง EEM และ SPAN ถือเป็นตัวช่วยที่มีประสิทธิภาพสูงมาก

**Embedded Event Manager (EEM)**
- เป็นระบบรันสคริปต์อัตโนมัติที่ฝังมาใน Cisco IOS
- ทำงานแบบ Trigger-Action เช่น หากพบว่าอินเทอร์เฟสดาวน์ (Trigger) ให้ทำการสั่งเปิดพอร์ตสำรองและส่งอีเมลแจ้งเตือน (Action)
- ช่วยลดเวลา Downtime ได้อย่างรวดเร็วโดยไม่ต้องรอแอดมิน

**Switch Port Analyzer (SPAN)**
- หรือที่เรียกว่า Port Mirroring คือการทำสำเนาข้อมูล (Traffic) จากพอร์ตหนึ่งไปยังอีกพอร์ตหนึ่งที่เสียบเครื่องมือวิเคราะห์ (เช่น Wireshark)
- มีทั้งแบบ Local SPAN (อยู่ในสวิตช์เดียวกัน) และ RSPAN (ส่งข้ามสวิตช์ผ่านทาง VLAN)

**สรุป**
EEM ให้ความสามารถในการตอบสนองปัญหาอัตโนมัติบนตัวอุปกรณ์เอง ในขณะที่ SPAN เปิดโอกาสให้วิศวกรสามารถดักจับแพ็กเก็ตเพื่อวิเคราะห์ปัญหาเชิงลึก ทั้งสองอย่างเป็นเครื่องมือสำคัญสำหรับผู้ดูแลระบบเครือข่ายชั้นสูง', 
    content_en = '## EEM and SPAN

**Introduction**
For advanced troubleshooting and network monitoring on Cisco devices, Embedded Event Manager (EEM) and Switch Port Analyzer (SPAN) are incredibly powerful tools.

**Embedded Event Manager (EEM)**
- A feature embedded directly into Cisco IOS that enables on-device automation.
- It operates on an Event-Action model. For example, if a specific Syslog message appears (Trigger), EEM can automatically execute CLI commands to clear an interface or send an alert (Action).
- Greatly reduces MTTR (Mean Time To Repair) without requiring an external automation server.

**Switch Port Analyzer (SPAN)**
- Commonly known as Port Mirroring. It copies traffic passing through a specific port or VLAN and sends it to a destination port connected to a packet analyzer (like Wireshark).
- Exists as Local SPAN (within a single switch) and RSPAN (mirrored across the network via a dedicated VLAN).

**Summary**
EEM provides intelligent, automated reaction capabilities right on the hardware. SPAN grants deep visibility into packet-level traffic. Together, they form a robust toolkit for proactive network defense and deep-dive troubleshooting.', 
    duration_minutes = 2 
WHERE id = 'lesson-ts002-04' AND lesson_type = 'reading';

