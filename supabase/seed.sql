-- Generated from the verified production export on 2026-07-29.
-- Contains public course and lesson content only; no Auth or user progress data.
BEGIN;

INSERT INTO "public"."courses" ("id", "name_th", "name_en", "description_th", "description_en", "level", "minutes_per_lesson", "min_modules", "availability", "includes", "highlights", "image_url", "rating", "review_count", "tags", "modules_left", "estimated_hours", "prerequisites", "created_at", "updated_at") VALUES
	('ccna-002', 'การสลับสัญญาณและ VLAN', 'LAN Switching and VLANs', 'เรียนรู้การทำงานของ Switch ในเครือข่าย LAN, VLAN configuration, Trunking, และ STP protocols', 'Learn how LAN switches operate, VLAN configuration, trunking protocols, and Spanning Tree Protocol for enterprise networks.', 'intermediate', 8, 5, 'available', '{"Video lessons","Packet Tracer labs",Quizzes,Certificate}', '{"VLAN configuration","STP deep dive","Switch troubleshooting"}', 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80&auto=format', 4.7, 218, '{CCNA,VLAN,Switching,STP}', 120, 50, '{ccna-001}', '2026-05-18 10:02:06.461001+00', '2026-05-19 09:08:34.096355+00'),
	('ccna-003', 'เทคโนโลยีการ routing', 'Routing Technologies', 'เข้าใจหลักการ routing, static routes, dynamic routing protocols (RIP, OSPF, EIGRP) และการ config routers', 'Understand routing principles, static routes, and dynamic routing protocols including RIP, OSPF, and EIGRP configuration.', 'intermediate', 18, 6, 'available', '{"Video lessons","Router labs","Practice exams",Certificate}', '{"RIP, OSPF, EIGRP","Route redistribution",Troubleshooting}', 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=800&q=80&auto=format', 4.9, 289, '{CCNA,Routing,OSPF,EIGRP}', 100, 60, '{ccna-001}', '2026-05-18 10:02:06.461001+00', '2026-05-19 09:08:34.096355+00'),
	('ccna-001', 'พื้นฐานเครือข่ายคอมพิวเตอร์', 'Computer Networking Fundamentals', 'เรียนรู้พื้นฐานการทำงานของเครือข่ายคอมพิวเตอร์ รวมถึงโมเดล OSI และ TCP/IP การระบุตำแหน่งอุปกรณ์เครือข่าย และหลักการส่งข้อมูล', 'Master the fundamentals of computer networking including the OSI model, TCP/IP protocol suite, network devices, and data transmission principles.', 'beginner', 13, 4, 'available', '{"Video lessons","Hands-on labs",Quizzes,Certificate}', '{"CCNA 200-301 aligned","Packet Tracer labs","Exam prep"}', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&auto=format', 4.8, 342, '{CCNA,"Networking Basics","OSI Model",TCP/IP}', 150, 40, '{}', '2026-05-18 10:02:06.461001+00', '2026-05-19 09:08:34.096355+00'),
	('sec-001', 'พื้นฐาน Firewall', 'Firewall Fundamentals', 'เรียนรู้หลักการทำงานของ Firewall, Stateful inspection, และ Zone-based policy configuration', 'Learn firewall operation principles, stateful inspection, and zone-based policy configuration.', 'intermediate', 11, 5, 'available', '{"Video lessons","Firewall labs",Certificate}', '{"Zone-based firewall","Policy configuration","NAT traversal"}', 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80&auto=format', 4.7, 189, '{Security,Firewall,"Palo Alto","Cisco ASA"}', 70, 45, '{ccna-006}', '2026-05-18 10:02:06.461001+00', '2026-05-19 09:08:34.096355+00'),
	('ccna-004', 'เทคโนโลยี WAN', 'WAN Technologies', 'เรียนรู้เทคโนโลยี WAN ต่างๆ เช่น PPP, HDLC, Frame Relay, MPLS, และ VPN configurations', 'Learn WAN technologies including PPP, HDLC, Frame Relay, MPLS, and VPN configurations for enterprise connectivity.', 'intermediate', 30, 4, 'available', '{"Video lessons","WAN labs","Case studies",Certificate}', '{PPP/HDLC,"MPLS basics","VPN setup"}', 'https://images.unsplash.com/photo-1560732488-6b0df240254a?w=800&q=80&auto=format', 4.6, 156, '{CCNA,WAN,MPLS,VPN}', 80, 35, '{ccna-003}', '2026-05-18 10:02:06.461001+00', '2026-05-19 09:08:34.096355+00'),
	('ccna-005', 'บริการพื้นฐานโครงสร้างเครือข่าย', 'Infrastructure Services', 'เรียนรู้บริการเครือข่ายที่จำเป็น ได้แก่ DHCP, DNS, NAT, PAT, และ ACLs', 'Essential network services including DHCP, DNS, NAT, PAT, and Access Control Lists configuration.', 'intermediate', 13, 4, 'available', '{"Video lessons","Configuration labs",Certificate}', '{DHCP/DNS,"NAT configuration","ACL fundamentals"}', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80&auto=format', 4.7, 201, '{CCNA,DHCP,DNS,NAT,ACL}', 90, 38, '{ccna-001}', '2026-05-18 10:02:06.461001+00', '2026-05-19 09:08:34.096355+00'),
	('troubleshoot-001', 'การวิเคราะห์ด้วย Wireshark', 'Wireshark Analysis', 'เรียนรู้การใช้ Wireshark สำหรับ packet analysis, protocol debugging, และ network troubleshooting', 'Master Wireshark for packet analysis, protocol debugging, and network troubleshooting.', 'intermediate', 13, 5, 'available', '{"Video lessons","Capture files",Certificate}', '{"Protocol analysis","Troubleshooting scenarios","Expert info"}', 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80&auto=format', 4.9, 312, '{Troubleshooting,Wireshark,"Packet Analysis"}', 110, 48, '{ccna-001}', '2026-05-18 10:02:06.461001+00', '2026-05-19 09:08:34.096355+00'),
	('troubleshoot-002', 'การแก้ไขปัญหา Cisco IOS', 'Cisco IOS Troubleshooting', 'เรียนรู้ Cisco IOS troubleshooting methodology, debug commands, และ logging analysis', 'Cisco IOS troubleshooting methodology, debug commands, and logging analysis.', 'intermediate', 11, 4, 'available', '{"Video lessons","Troubleshooting scenarios",Certificate}', '{"Debug commands","Syslog analysis",SPAN}', 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80&auto=format', 4.7, 178, '{Troubleshooting,"Cisco IOS",Debugging}', 70, 38, '{ccna-003}', '2026-05-18 10:02:06.461001+00', '2026-05-19 09:08:34.096355+00'),
	('ccna-006', 'ความปลอดภัยของโครงสร้างเครือข่าย', 'Infrastructure Security', 'เรียนรู้หลักการความปลอดภัยเครือข่าย การ configure security devices, และ threat mitigation', 'Network security fundamentals including security device configuration, threat mitigation, and access control.', 'intermediate', 17, 5, 'available', '{"Video lessons","Security labs",Certificate}', '{"Port security","Switch security","Threat prevention"}', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80&auto=format', 4.8, 178, '{CCNA,Security,"Network Security"}', 75, 45, '{ccna-002}', '2026-05-18 10:02:06.461001+00', '2026-05-19 09:08:34.096355+00'),
	('ccna-007', 'การจัดการโครงสร้างเครือข่าย', 'Infrastructure Management', 'เรียนรู้การจัดการและ monitor เครือข่าย รวมถึง SNMP, Syslog, และ network management tools', 'Network management and monitoring including SNMP, Syslog, and network management tools.', 'advanced', 50, 4, 'available', '{"Video lessons","Management labs",Certificate}', '{"SNMP configuration","Syslog analysis","Network monitoring"}', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format', 4.6, 134, '{CCNA,"Network Management",SNMP}', 60, 36, '{ccna-003}', '2026-05-18 10:02:06.461001+00', '2026-05-19 09:08:34.096355+00'),
	('ccna-008', 'พื้นฐานการทำงานอัตโนมัติของเครือข่าย', 'Network Automation Basics', 'บทนำสู่ network automation และ programmability ด้วย Python, APIs, และ configuration management tools', 'Introduction to network automation and programmability using Python, APIs, and configuration management tools.', 'advanced', 65, 5, 'available', '{"Video lessons","Python labs","API exercises",Certificate}', '{"Python for networking","REST APIs","Automation scripts"}', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80&auto=format', 4.9, 267, '{CCNA,Automation,Python,API}', 85, 48, '{ccna-007}', '2026-05-18 10:02:06.461001+00', '2026-05-19 09:08:34.096355+00'),
	('adv-001', 'OSPF แบบลึก', 'OSPF Deep Dive', 'เรียนรู้ OSPF advanced features, LSA types, area types, และ route optimization', 'Advanced OSPF features, LSA types, area types, and route optimization techniques.', 'advanced', 10, 5, 'available', '{"Video lessons","OSPF labs",Certificate}', '{"LSA types","Stub areas","Route summarization"}', 'https://images.unsplash.com/photo-1521542464131-cb30f7398bc6?w=800&q=80&auto=format', 4.8, 198, '{Routing,OSPF,CCNP}', 75, 50, '{ccna-003}', '2026-05-18 10:02:06.461001+00', '2026-05-19 09:08:34.096355+00'),
	('adv-002', 'การ configure EIGRP', 'EIGRP Configuration', 'เรียนรู้ EIGRP advanced configuration, load balancing, และ route filtering', 'Advanced EIGRP configuration, load balancing, and route filtering techniques.', 'advanced', 12, 4, 'available', '{"Video lessons","EIGRP labs",Certificate}', '{"Unequal-cost load balancing","Route filtering","Stuck in active"}', 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80&auto=format', 4.6, 145, '{Routing,EIGRP,CCNP}', 60, 40, '{ccna-003}', '2026-05-18 10:02:06.461001+00', '2026-05-19 09:08:34.096355+00'),
	('adv-003', 'พื้นฐาน BGP', 'BGP Fundamentals', 'เรียนรู้ BGP basics, neighbor relationships, route propagation, และ basic configuration', 'BGP basics, neighbor relationships, route propagation, and basic configuration.', 'advanced', 13, 6, 'available', '{"Video lessons","BGP labs",Certificate}', '{"Neighbor adjacency","Route attributes","AS path"}', 'https://images.unsplash.com/photo-1562813733-b31f71025d54?w=800&q=80&auto=format', 4.9, 234, '{Routing,BGP,ISP,CCNP}', 45, 55, '{adv-001,ccna-003}', '2026-05-18 10:02:06.461001+00', '2026-05-19 09:08:34.096355+00'),
	('adv-004', 'VLAN และ STP ขั้นสูง', 'Advanced VLAN and STP', 'เรียนรู้ VLAN advanced features, MSTP, EtherChannel, และ inter-VLAN routing', 'Advanced VLAN features, MSTP, EtherChannel, and inter-VLAN routing configuration.', 'advanced', 45, 4, 'available', '{"Video lessons","Advanced switching labs",Certificate}', '{MSTP,"Link Aggregation",VTP}', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&auto=format', 4.7, 167, '{Switching,VLAN,STP,CCNP}', 55, 38, '{ccna-002}', '2026-05-18 10:02:06.461001+00', '2026-05-19 09:08:34.096355+00'),
	('adv-005', 'Multicast Routing', 'Multicast Routing', 'เรียนรู้ IP multicast, IGMP, PIM protocols, และ multicast routing configuration', 'IP multicast, IGMP, PIM protocols, and multicast routing configuration.', 'advanced', 55, 4, 'available', '{"Video lessons","Multicast labs",Certificate}', '{"PIM Sparse-Dense","IGMP Snooping","RP selection"}', 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80&auto=format', 4.5, 89, '{Routing,Multicast,PIM}', 35, 36, '{adv-001}', '2026-05-18 10:02:06.461001+00', '2026-05-19 09:08:34.096355+00'),
	('adv-006', 'การ implement QoS', 'QoS Implementation', 'เรียนรู้ Quality of Service, traffic classification, queuing mechanisms, และ QoS configuration', 'Quality of Service, traffic classification, queuing mechanisms, and QoS configuration.', 'advanced', 65, 5, 'available', '{"Video lessons","QoS labs",Certificate}', '{"Weighted Fair Queuing",CBWFQ,"Policing and shaping"}', 'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=800&q=80&auto=format', 4.6, 112, '{QoS,"Traffic Management",CCNP}', 40, 45, '{adv-001,ccna-003}', '2026-05-18 10:02:06.461001+00', '2026-05-19 09:08:34.096355+00'),
	('sec-002', 'เทคโนโลยี VPN', 'VPN Technologies', 'เรียนรู้การ configure VPN ทั้ง site-to-site, remote access, และ SSL VPN ด้วย various protocols', 'Configure VPN connections including site-to-site, remote access, and SSL VPN with various protocols.', 'intermediate', 11, 5, 'available', '{"Video lessons","VPN labs",Certificate}', '{IPSec,"SSL VPN","GRE tunnels"}', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80&auto=format', 4.8, 223, '{Security,VPN,IPSec,SSL}', 95, 50, '{sec-001}', '2026-05-18 10:02:06.461001+00', '2026-05-19 09:08:34.096355+00'),
	('sec-003', 'การตรวจจับและป้องกันการบุกรุก', 'Intrusion Detection and Prevention', 'เรียนรู้การ deploy และ configure IDS/IPS systems, signature-based และ anomaly-based detection', 'Deploy and configure IDS/IPS systems with signature-based and anomaly-based detection.', 'advanced', 55, 4, 'available', '{"Video lessons","IPS labs",Certificate}', '{"Snort rules","Tuning strategies","Alert analysis"}', 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&q=80&auto=format', 4.6, 145, '{Security,IDS,IPS,Snort}', 55, 38, '{sec-001}', '2026-05-18 10:02:06.461001+00', '2026-05-19 09:08:34.096355+00'),
	('sec-004', 'การควบคุมการเข้าถึงเครือข่าย', 'Network Access Control', 'เรียนรู้ NAC solutions, 802.1X authentication, และ endpoint security compliance', 'NAC solutions, 802.1X authentication, and endpoint security compliance implementation.', 'advanced', 45, 4, 'available', '{"Video lessons","NAC labs",Certificate}', '{802.1X,RADIUS,"Endpoint compliance"}', 'https://images.unsplash.com/photo-1544890225-2f3faec4cd60?w=800&q=80&auto=format', 4.5, 98, '{Security,NAC,802.1X,RADIUS}', 40, 35, '{sec-001,ccna-006}', '2026-05-18 10:02:06.461001+00', '2026-05-19 09:08:34.096355+00'),
	('sec-005', 'การตรวจสอบความปลอดภัยเครือข่าย', 'Network Security Auditing', 'เรียนรู้การ conduct security audits, vulnerability assessments, และ penetration testing basics', 'Conduct security audits, vulnerability assessments, and penetration testing fundamentals.', 'advanced', 60, 5, 'available', '{"Video lessons","Audit tools",Certificate}', '{"Vulnerability scanning","Penetration testing",Compliance}', 'https://images.unsplash.com/photo-1633265486064-086b219458ec?w=800&q=80&auto=format', 4.8, 167, '{Security,Audit,Pentest,Compliance}', 65, 48, '{sec-003,sec-004}', '2026-05-18 10:02:06.461001+00', '2026-05-19 09:08:34.096355+00'),
	('sec-006', 'การตอบสนองต่อเหตุการณ์', 'Incident Response', 'เรียนรู้กระบวนการ incident response, forensic analysis, และ malware detection', 'Incident response procedures, forensic analysis, and malware detection techniques.', 'advanced', 60, 5, 'available', '{"Video lessons","IR labs",Certificate}', '{"Incident handling",Forensics,"Malware analysis"}', 'https://images.unsplash.com/photo-1551808525-51a94da548ce?w=800&q=80&auto=format', 4.7, 134, '{Security,"Incident Response",Forensics}', 50, 45, '{sec-003}', '2026-05-18 10:02:06.461001+00', '2026-05-19 09:08:34.096355+00'),
	('devnet-002', 'พื้นฐาน Ansible', 'Ansible Fundamentals', 'เรียนรู้ Ansible สำหรับ network configuration management, playbooks, และ roles', 'Ansible for network configuration management, playbooks, and roles.', 'intermediate', 10, 5, 'available', '{"Video lessons","Ansible labs",Certificate}', '{Playbooks,"Network modules","Tower basics"}', 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80&auto=format', 4.8, 198, '{Automation,Ansible,"Configuration Management"}', 75, 45, '{devnet-001}', '2026-05-18 10:02:06.461001+00', '2026-05-19 09:08:34.096355+00'),
	('devnet-003', 'Cisco DNA Center', 'Cisco DNA Center', 'เรียนรู้ Cisco DNA Center features, intent-based networking, automation, และ analytics', 'Cisco DNA Center features, intent-based networking, automation, and analytics.', 'advanced', 60, 5, 'available', '{"Video lessons","DNA Center labs",Certificate}', '{Intent-based,Assurance,"Automation workflows"}', 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80&auto=format', 4.7, 145, '{Cisco,"DNA Center",Intent-Based}', 50, 48, '{devnet-002}', '2026-05-18 10:02:06.461001+00', '2026-05-19 09:08:34.096355+00'),
	('devnet-004', 'REST APIs สำหรับ Networking', 'REST APIs for Networking', 'เรียนรู้ REST API concepts, JSON, และการ integrate network devices ผ่าน APIs', 'REST API concepts, JSON, and network device integration through APIs.', 'intermediate', 45, 4, 'available', '{"Video lessons","API labs",Certificate}', '{"REST concepts",Postman,"API authentication"}', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80&auto=format', 4.8, 178, '{API,REST,JSON,DevNet}', 65, 38, '{devnet-001}', '2026-05-18 10:02:06.461001+00', '2026-05-19 09:08:34.096355+00'),
	('devnet-005', 'Git สำหรับ Network Automation', 'Git for Network Automation', 'เรียนรู้ Git version control, GitHub/GitLab workflows, และ CI/CD pipelines สำหรับ network code', 'Git version control, GitHub/GitLab workflows, and CI/CD pipelines for network code.', 'beginner', 25, 3, 'available', '{"Video lessons","Git exercises",Certificate}', '{"Version control",Branching,"Pull requests"}', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80&auto=format', 4.6, 134, '{Git,DevOps,CI/CD,Automation}', 90, 25, '{devnet-005}', '2026-05-18 10:02:06.461001+00', '2026-05-19 09:08:34.096355+00'),
	('troubleshoot-003', 'การวินิจฉัยเครือข่าย', 'Network Diagnostics', 'เรียนรู้การใช้ diagnostic tools เช่น ping, traceroute, NetFlow, และ SNMP troubleshooting', 'Use diagnostic tools including ping, traceroute, NetFlow, and SNMP troubleshooting.', 'intermediate', 50, 4, 'available', '{"Video lessons","Diagnostic labs",Certificate}', '{Ping/Traceroute,NetFlow,"SNMP walk"}', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80&auto=format', 4.6, 145, '{Troubleshooting,Diagnostics,"Network Tools"}', 80, 35, '{ccna-001}', '2026-05-18 10:02:06.461001+00', '2026-05-19 09:08:34.096355+00'),
	('troubleshoot-004', 'การ optimize ประสิทธิภาพเครือข่าย', 'Network Performance Optimization', 'เรียนรู้การ analyze และ optimize network performance, bottleneck identification', 'Analyze and optimize network performance, identify bottlenecks, and improve efficiency.', 'advanced', 55, 4, 'available', '{"Video lessons","Optimization labs",Certificate}', '{"Performance metrics","Load analysis","Tuning strategies"}', 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=800&q=80&auto=format', 4.7, 123, '{Performance,Optimization,Monitoring}', 55, 40, '{troubleshoot-002,troubleshoot-003}', '2026-05-18 10:02:06.461001+00', '2026-05-19 09:08:34.096355+00'),
	('devnet-001', 'Python สำหรับ Network Engineer', 'Python for Network Engineers', 'เรียนรู้ Python programming สำหรับ network automation, libraries like Netmiko, Paramiko', 'Python programming for network automation with libraries like Netmiko and Paramiko.', 'intermediate', 96, 6, 'available', '{"Video lessons","Code exercises",Certificate}', '{Netmiko,NAPALM,"Network scripts"}', 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80&auto=format', 4.9, 287, '{Automation,Python,DevNet,Scripting}', 100, 55, '{ccna-001}', '2026-05-18 10:02:06.461001+00', '2026-05-19 09:08:34.096355+00'),
	('troubleshoot-005', 'การ monitor ด้วย SLA', 'SLA Monitoring', 'เรียนรู้การ configure IP SLA, service level agreements, และ performance monitoring', 'Configure IP SLA, service level agreements, and performance monitoring.', 'advanced', 25, 3, 'available', '{"Video lessons","SLA labs",Certificate}', '{"IP SLA operations","Tracking objects","Response time"}', 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=800&q=80&auto=format', 4.5, 78, '{Monitoring,SLA,"IP SLA"}', 35, 28, '{troubleshoot-003}', '2026-05-18 10:02:06.461001+00', '2026-05-19 09:08:34.096355+00');

INSERT INTO "public"."lessons" ("id", "course_id", "title_th", "title_en", "content_th", "content_en", "lesson_type", "duration_minutes", "order_index", "video_url", "thumbnail_url", "difficulty", "created_at", "updated_at", "quiz_data", "exercise_data") VALUES
	('lesson-adv002-01', 'adv-002', 'EIGRP Architecture', 'EIGRP Architecture', '## EIGRP Architecture (สถาปัตยกรรม EIGRP)

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้เจาะลึกสถาปัตยกรรมภายในของ EIGRP และวิธีที่ DUAL Algorithm รับประกันว่าเครือข่าย Loop-free

**เนื้อหาหลัก**
- **DUAL Algorithm:** คำนวณเส้นทางสำรอง (Feasible Successor) ไว้ล่วงหน้า เมื่อเส้นทางหลักล้มเหลวจะ Failover ทันที
- **Feasibility Condition:** เงื่อนไขสำคัญที่ใช้ตรวจสอบว่า Backup Route นั้นไม่ทำให้เกิด Loop
- **EIGRP Tables:** Neighbor Table, Topology Table, Routing Table
- **Packet Types:** Hello, Update, Query, Reply, Acknowledgment
- **Named EIGRP Mode:** รูปแบบการตั้งค่าใหม่ที่รวมทุก Address Family ไว้ที่เดียว

**สรุป**
EIGRP เป็น Protocol ที่ซับซ้อนแต่ทรงพลัง การเข้าใจ DUAL และ Feasibility Condition ช่วยให้ Debug ปัญหาเส้นทางได้อย่างแม่นยำ', '## EIGRP Architecture

**What you will learn in this video**
This video delves into the internal architecture of EIGRP and how the DUAL Algorithm guarantees a loop-free network.

**Core Content**
- **DUAL Algorithm:** Pre-calculates backup routes (Feasible Successors). When the primary route fails, it fails over immediately.
- **Feasibility Condition:** A crucial condition used to verify that the backup route will not cause a routing loop.
- **EIGRP Tables:** Neighbor Table, Topology Table, Routing Table.
- **Packet Types:** Hello, Update, Query, Reply, Acknowledgment.
- **Named EIGRP Mode:** A modern configuration mode that unifies all Address Families in one place.

**Conclusion**
EIGRP is a complex but powerful protocol. Understanding DUAL and the Feasibility Condition helps accurately debug routing issues.', 'video', 24, 1, 'https://www.youtube.com/watch?v=CHONDJ5Dgi4', '/images/thumbnails/lesson-adv002-01.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["Dijkstra SPF","Bellman-Ford","DUAL (Diffusing Update Algorithm)","Path Vector"],"question_en":"What is the primary routing algorithm used by EIGRP?","question_th":"อัลกอริทึมหลักที่ใช้ในการหาเส้นทางของ EIGRP คืออะไร?","correct_index":2,"explanation_en":"EIGRP uses the DUAL (Diffusing Update Algorithm) to calculate shortest path and maintain loop-free topology.","explanation_th":"EIGRP ใช้อัลกอริทึม DUAL (Diffusing Update Algorithm) ในการคำนวณหาเส้นทางที่สั้นที่สุดและรับประกันโครงสร้างที่ปลอดลูป","options_th":["Dijkstra SPF","Bellman-Ford","DUAL","Path Vector"]},{"options":["Neighbor Table","Routing Table","Topology Table","ARP Table"],"question_en":"Which EIGRP table holds the list of all backup routes (Feasible Successors)?","question_th":"ตาราง EIGRP ใดที่เก็บรายการของเส้นทางสำรองทั้งหมด (Feasible Successors)?","correct_index":2,"explanation_en":"The EIGRP Topology Table contains all Successors and Feasible Successors (backup routes) discovered.","explanation_th":"ตาราง Topology ของ EIGRP จะบันทึกข้อมูล Successor และ Feasible Successor (เส้นทางสำรอง) ทั้งหมดที่ค้นพบ","options_th":["Neighbor Table (ตารางเพื่อนบ้าน)","Routing Table (ตารางเส้นทาง)","Topology Table (ตารางโทโพโลยี)","ARP Table (ตาราง ARP)"]},{"options":["Its Feasible Distance must be less than the Successor''s Reported Distance.","Its Reported Distance (RD) must be less than the Feasible Distance (FD) of the current Successor.","Its metric must be equal to the primary route metric.","Its hop count must be less than 15."],"question_en":"What condition must a backup route meet to be classified as a Feasible Successor?","question_th":"เงื่อนไขใดที่เส้นทางสำรองต้องผ่านเกณฑ์เพื่อจัดเป็น Feasible Successor?","correct_index":1,"explanation_en":"The Feasibility Condition states that a neighbor''s Reported Distance (RD) must be strictly less than the current Successor''s Feasible Distance (FD).","explanation_th":"เงื่อนไขการทำงานเสมือนจริง (Feasibility Condition) ระบุว่า Reported Distance (RD) ของเพื่อนบ้านต้องน้อยกว่า Feasible Distance (FD) ของ Successor ปัจจุบัน","options_th":["Feasible Distance ต้องน้อยกว่า Reported Distance ของ Successor","RD ต้องน้อยกว่า FD ของ Successor ปัจจุบัน","เมตริกจะต้องเท่ากับเมตริกเส้นทางหลัก","จำนวนฮ็อปต้องน้อยกว่า 15"]},{"options":["Hello","Update","Query","Reply"],"question_en":"Which EIGRP packet type is sent to neighbors to request alternative routing information when a route fails and has no backup?","question_th":"แพ็กเก็ต EIGRP ประเภทใดที่ส่งไปยังเพื่อนบ้านเพื่อขอข้อมูลเส้นทางอื่น เมื่อเส้นทางเดิมล้มเหลวและไม่มีเส้นทางสำรอง?","correct_index":2,"explanation_en":"A Query packet is sent by EIGRP when a route fails and no Feasible Successor exists, asking neighbors for paths.","explanation_th":"แพ็กเก็ต Query จะถูกส่งโดย EIGRP เมื่อเส้นทางเสียหายและไม่มี Feasible Successor โดยถามเพื่อนบ้านว่ามีเส้นทางอื่นหรือไม่","options_th":["Hello (ทักทาย)","Update (อัปเดต)","Query (สอบถาม)","Reply (ตอบกลับ)"]},{"options":["Classic Mode","Named EIGRP Mode","Autonomous System Mode","Global Config Mode"],"question_en":"What configuration mode in EIGRP unifies all IPv4 and IPv6 Address Families in a single configuration block?","question_th":"โหมดการตั้งค่าใดใน EIGRP ที่รวบรวม Address Family ของทั้ง IPv4 และ IPv6 ไว้ในบล็อกเดียวกัน?","correct_index":1,"explanation_en":"Named EIGRP Mode unifies address-families configuration for IPv4 and IPv6 under a single virtual instance name.","explanation_th":"Named EIGRP Mode จะรวมการกำหนดค่า address-family ของ IPv4 และ IPv6 ไว้ภายใต้ชื่อ virtual instance เดียวกัน","options_th":["Classic Mode","Named EIGRP Mode","Autonomous System Mode","Global Configuration Mode"]}]}', NULL),
	('lesson-ccna004-02', 'ccna-004', 'PPP และ HDLC', 'PPP ', '## PPP และ HDLC

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอน Protocol ระดับ Data Link ที่ใช้บน Serial/WAN Links แบบ Point-to-Point

**เนื้อหาหลัก**
- **HDLC (High-Level Data Link Control):** Protocol Default ของ Cisco บน Serial Interface เรียบง่ายแต่ใช้ได้เฉพาะ Cisco
- **PPP (Point-to-Point Protocol):** Protocol มาตรฐานเปิด รองรับ Authentication (PAP/CHAP), Compression, Multilink
- **PPPoE:** ใช้ PPP บน Ethernet พบเห็นในการเชื่อมต่ออินเทอร์เน็ตผ่าน ADSL/Fiber
- การตั้งค่า PPP: `encapsulation ppp`, `ppp authentication chap`

**สรุป**
แม้ HDLC และ PPP จะเป็นเทคโนโลยีเก่า แต่ยังปรากฏในข้อสอบ CCNA และระบบ Legacy WAN ขององค์กรบางแห่ง', '## PPP and HDLC

**What you will learn in this video**
This video teaches Data Link layer protocols used on Point-to-Point Serial/WAN Links.

**Core Content**
- **HDLC (High-Level Data Link Control):** Cisco''s default protocol on serial interfaces. Simple but Cisco-proprietary.
- **PPP (Point-to-Point Protocol):** Open standard protocol. Supports Authentication (PAP/CHAP), Compression, and Multilink.
- **PPPoE:** PPP over Ethernet. Commonly seen in home broadband ADSL/Fiber connections.
- PPP Configuration: `encapsulation ppp`, `ppp authentication chap`

**Conclusion**
Although HDLC and PPP are older technologies, they still appear in CCNA exams and some legacy enterprise WAN systems.', 'video', 7, 2, 'https://www.youtube.com/watch?v=kKCwkRT_U8I', '/images/thumbnails/lesson-ccna004-02.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["HDLC","PPP (Point-to-Point Protocol)","Frame Relay","Ethernet"],"question_en":"Which Layer 2 protocol is commonly used on point-to-point serial links and supports both PAP and CHAP authentication?","question_th":"โปรโตคอล Layer 2 ใดนิยมใช้งานอย่างแพร่หลายบนลิงก์เชื่อมต่อแบบ Serial และรองรับการตรวจสอบสิทธิ์แบบ PAP/CHAP?","correct_index":1,"explanation_en":"PPP is a robust WAN protocol that provides link quality monitoring, multilink bonding, and authentication via PAP or CHAP.","explanation_th":"Point-to-Point Protocol (PPP) เป็นมาตรฐานการสื่อสารแบบสองจุดที่มีฟังก์ชันตรวจสอบคุณภาพสาย และระบบระบุตัวตน PAP/CHAP","options_th":["HDLC","PPP","เฟรมรีเลย์","อีเทอร์เน็ต"]},{"options":["PAP sends passwords in cleartext; CHAP uses a secure three-way handshake with MD5 hashing to hide passwords.","PAP is secure; CHAP is insecure.","PAP is developed by Cisco; CHAP is open standard.","PAP is used on fiber links; CHAP is used on copper cables."],"question_en":"What is the primary difference between PAP and CHAP authentication in PPP?","question_th":"ข้อแตกต่างที่สำคัญยิ่งระหว่างระบบตรวจสอบสิทธิ์ PAP และ CHAP ในโปรโตคอล PPP คืออะไร?","correct_index":0,"explanation_en":"PAP transmits credentials in plaintext, making it vulnerable. CHAP uses a challenge-response handshake with MD5 hashing, never transmitting the password directly.","explanation_th":"PAP จะส่งรหัสผ่านผ่านสายเป็นแบบข้อความดิบอ่านออกได้ทันที ส่วน CHAP จะเข้ารหัสแฮชด้วย MD5 คุยแบบสามด่านย่อย","options_th":["PAP ส่งรหัสผ่านตรง ส่วน CHAP ใช้ Challenge-Response","PAP มีความปลอดภัย CHAP ไม่ปลอดภัย","PAP ได้รับการพัฒนาโดย Cisco; CHAP เป็นมาตรฐานเปิด","PAP ใช้กับลิงก์ไฟเบอร์ CHAP ใช้กับสายทองแดง"]},{"options":["LCP (Link Control Protocol)","NCP (Network Control Protocol)","PAP","HDLC encapsulation"],"question_en":"Which component of PPP is responsible for negotiating and configuring the network layer protocols (e.g., IPv4 or IPv6)?","question_th":"ส่วนประกอบย่อยใดของ PPP ที่ทำหน้าที่เจรจาต่อรองเพื่อจัดระเบียบตกลงโหมดกับระดับเลเยอร์เครือข่าย (เช่น IPv4/IPv6)?","correct_index":1,"explanation_en":"Network Control Protocol (NCP) is used to establish and configure different network layer protocols over a PPP link.","explanation_th":"Network Control Protocol (NCP) ทำหน้าที่ตกลงและเลือกชนิดโปรโตคอลในระดับเน็ตเวิร์กเลเยอร์ขี่บนสายสัญญาณ PPP","options_th":["LCP (โปรโตคอลควบคุมลิงก์)","NCP (โปรโตคอลควบคุมเครือข่าย)","PAP","การห่อหุ้ม HDLC"]},{"options":["NCP","LCP (Link Control Protocol)","CHAP","SDLC"],"question_en":"Which component of PPP is responsible for establishing, configuring, and testing the Layer 2 physical connection?","question_th":"ส่วนประกอบย่อยใดของ PPP ที่คอยดูแลเรื่องการสร้าง คอนฟิก และทดสอบสถานะการเชื่อมต่อทางกายภาพในระดับ Layer 2?","correct_index":1,"explanation_en":"Link Control Protocol (LCP) handles link establishment, configuration options negotiation, and link termination.","explanation_th":"Link Control Protocol (LCP) ดูแลการตกลงเจรจาเงื่อนไขเบื้องต้นของเฟรมและตรวจสอบคุณภาพสายสัญญาณ Layer 2","options_th":["NCP","LCP","CHAP","SDLC"]},{"options":["Error detection only.","Authentication (PAP/CHAP) and Multilink bonding.","IP addressing support.","Speed limits definition."],"question_en":"What features does PPP offer that standard HDLC does not?","question_th":"ฟีเจอร์เด่นใดที่โปรโตคอล PPP มีให้ใช้งานแต่ใน HDLC มาตรฐานทั่วไปไม่รองรับ?","correct_index":1,"explanation_en":"PPP supports authentication (PAP/CHAP) and multilink grouping for load balancing, which standard HDLC does not support.","explanation_th":"PPP รองรับการทำยืนยันตัวตนและการรวมลิงก์ (Multilink) เพื่อกระจายทราฟฟิก ซึ่งคุณสมบัติเหล่านี้ไม่มีอยู่ใน HDLC ดั้งเดิม","options_th":["การตรวจจับข้อผิดพลาดเท่านั้น","PAP/CHAP และ Multilink","รองรับการกำหนดที่อยู่ IP","คำจำกัดความของการจำกัดความเร็ว"]}]}', NULL),
	('lesson-adv-002', 'adv-001', 'OSPF Route Summarization', 'OSPF Route Summarization', '## OSPF Route Summarization

**สิ่งที่จะได้เรียนในคลิปนี้**
ในคลิปนี้เราจะเรียนรู้เทคนิค Route Summarization ใน OSPF ซึ่งช่วยลดขนาด Routing Table และลดภาระของ Router โดยเรียนรู้ทั้ง area range และ summary-address

**เนื้อหาหลัก**
- **ทำไมต้อง Summarize:** OSPF ไม่มี Auto-Summary จึงต้อง Config ด้วยตนเอง หากไม่ทำ ABR จะโฆษณา Subnet ย่อยทุกตัวออกไป
- **area range — Inter-Area Summarization:**
  - ใช้บน **ABR (Area Border Router)**
  - รวม Type 1/2 LSA ให้เหลือ Type 3 LSA เดียวก่อนส่งออก Area อื่น
  - คำสั่ง: area 1 range 172.16.0.0 255.255.252.0
- **summary-address — External Summarization:**
  - ใช้บน **ASBR** รวม External Routes (Type 5 LSA)
- **การคำนวณ Summary Address:**
  1. แปลง Subnet เป็น Binary
  2. หา Common Bits จากซ้ายไปขวา
  3. จำนวน Common Bits = Prefix Length
  4. ตั้ง Host Bits ที่เหลือเป็น 0
  - ตัวอย่าง: 172.16.0.0/24 + 172.16.1.0/24 → Summary: 172.16.0.0/23
- **ประโยชน์:** ลดขนาด Routing Table, ลด CPU สำหรับ SPF, ซ่อน Topology Changes, ลด LSA Traffic
- **Discard Route (Null0):** สร้างอัตโนมัติเพื่อป้องกัน Routing Loop

**สรุป**
OSPF Route Summarization เป็นเทคนิคที่จำเป็นสำหรับเครือข่ายขนาดใหญ่ การเลือกใช้ area range บน ABR สำหรับ Inter-area Routes และ summary-address บน ASBR สำหรับ External Routes จะทำให้เครือข่ายมีประสิทธิภาพ เสถียร และ Scale ได้ดียิ่งขึ้น', '## OSPF Route Summarization

**What you will learn in this video**
In this video, we will learn Route Summarization techniques in OSPF, which helps reduce the size of the routing table and router processing load. We will cover both `area range` and `summary-address`.

**Core Content**
- **Why Summarize:** OSPF does not have Auto-Summary, so it must be configured manually. Otherwise, ABRs will advertise every specific subnet.
- **area range — Inter-Area Summarization:**
  - Used on **ABR (Area Border Router)**
  - Combines Type 1/2 LSAs into a single Type 3 LSA before sending to other areas
  - Command: `area 1 range 172.16.0.0 255.255.252.0`
- **summary-address — External Summarization:**
  - Used on **ASBR**. Summarizes External Routes (Type 5 LSAs).
- **Summary Address Calculation:**
  1. Convert subnets to Binary
  2. Find common bits from left to right
  3. Number of common bits = Prefix Length
  4. Set remaining host bits to 0
  - Example: `172.16.0.0/24` + `172.16.1.0/24` → Summary: `172.16.0.0/23`
- **Benefits:** Reduces routing table size, reduces CPU usage for SPF, hides topology changes, reduces LSA traffic.
- **Discard Route (Null0):** Automatically created to prevent routing loops.

**Conclusion**
OSPF Route Summarization is an essential technique for large networks. Properly using `area range` on ABRs and `summary-address` on ASBRs makes the network more efficient, stable, and scalable.', 'video', 10, 2, 'https://www.youtube.com/watch?v=XcbkNMX6tCk', '/images/thumbnails/lesson-adv-002.jpg', NULL, '2026-05-18 10:02:06.461001+00', '2026-05-19 10:29:10.623729+00', '{"questions":[{"options":["summary-address","area range","ip summary-address ospf","ip route summary"],"question_en":"What OSPF command is used to configure inter-area route summarization on an ABR?","question_th":"คำสั่ง OSPF ใดที่ใช้กำหนดค่าการย่อเส้นทางระหว่างพื้นที่ (Inter-area route summarization) บน ABR?","correct_index":1,"explanation_en":"The ''area <area-id> range <network> <mask>'' command is used on ABRs to summarize routes between OSPF areas.","explanation_th":"คำสั่ง ''area <area-id> range <network> <mask>'' ใช้บน ABR เพื่อรวบรวมและย่อเส้นทางระหว่างพื้นที่ OSPF","options_th":["summary-address","area range","ip summary-address ospf","ip route summary"]},{"options":["area range","summary-address","redistribute summary","ip route-summary"],"question_en":"Which command is used on an ASBR to summarize external routes redistributed into OSPF?","question_th":"คำสั่งใดใช้กำหนดค่าบน ASBR เพื่อย่อเส้นทางภายนอก (External routes) ที่ถูกดึงเข้ามาใน OSPF?","correct_index":1,"explanation_en":"The ''summary-address <network> <mask>'' command is used on OSPF ASBRs to summarize external routes (Type 5 LSAs).","explanation_th":"คำสั่ง ''summary-address <network> <mask>'' ใช้บน OSPF ASBR เพื่อย่อเส้นทางภายนอก (Type 5 LSA)","options_th":["area range","summary-address","redistribute summary","ip route-summary"]},{"options":["172.16.0.0/23","172.16.0.0/22","172.16.0.0/25","172.16.0.0/16"],"question_en":"What is the summary prefix for the subnets 172.16.0.0/24 and 172.16.1.0/24?","question_th":"การย่อเส้นทาง (Route Summarization) สำหรับเครือข่ายย่อย 172.16.0.0/24 และ 172.16.1.0/24 จะได้ผลลัพธ์เป็น Prefix ใด?","correct_index":0,"explanation_en":"172.16.0.0/24 and 172.16.1.0/24 share the first 23 bits, resulting in the summary address 172.16.0.0/23.","explanation_th":"172.16.0.0/24 และ 172.16.1.0/24 มีบิตที่เหมือนกันใน 23 บิตแรก ส่งผลให้สรุปเป็น 172.16.0.0/23","options_th":["172.16.0.0/23","172.16.0.0/22","172.16.0.0/25","172.16.0.0/16"]},{"options":["To speed up packet forwarding.","To prevent routing loops for packets destined to unassigned subnets within the summary range.","To backup the physical interface in case of failure.","To block malicious attacks."],"question_en":"Why does OSPF automatically create a discard route to Null0 when summarization is configured?","question_th":"ทำไม OSPF จึงสร้าง Discard Route ไปยังอินเตอร์เฟส Null0 โดยอัตโนมัติเมื่อมีการกำหนดค่า Summarization?","correct_index":1,"explanation_en":"OSPF creates a discard route to Null0 to drop packets destined to non-existent subnets within the summarized range, preventing loops.","explanation_th":"OSPF สร้าง discard route ไปยัง Null0 เพื่อทิ้งแพ็กเก็ตที่ส่งไปยังซับเน็ตที่ไม่มีอยู่จริงภายในช่วงที่ทำการสรุป เพื่อป้องกันการเกิดลูปการส่งข้อมูล","options_th":["เพื่อเร่งความเร็วในการส่งต่อแพ็กเก็ตผ่านเราเตอร์ภายในเครือข่าย","เพื่อป้องกัน routing loop ของแพ็กเก็ตไปยังซับเน็ตที่ไม่ได้กำหนดในช่วง summary","เพื่อสำรองอินเตอร์เฟสทางกายภาพไว้ใช้แทนเมื่อลิงก์หลักล้มเหลว","เพื่อบล็อกการโจมตีที่เป็นอันตรายจากผู้ไม่หวังดีบนเครือข่าย"]},{"options":["It eliminates the need for Area 0.","It reduces routing table size, SPF CPU computation, and LSA flooding.","It automatically encrypts OSPF packets.","It enables unequal cost load balancing."],"question_en":"Which of the following is a primary benefit of route summarization in OSPF?","question_th":"ข้อใดคือประโยชน์หลักของการรวบรวมและย่อเส้นทาง (Route summarization) ใน OSPF?","correct_index":1,"explanation_en":"Route summarization reduces routing table sizes, minimizes LSA updates, and limits SPF algorithm re-calculations.","explanation_th":"การย่อเส้นทางช่วยลดขนาดตารางเส้นทาง ลดการส่งอัปเดต LSA และลดการคำนวณใหม่ของอัลกอริทึม SPF","options_th":["ทำให้ไม่จำเป็นต้องมี Backbone Area 0 ใน OSPF","ลดขนาด routing table, ภาระ CPU จาก SPF และ LSA flooding","เข้ารหัส OSPF packet ทุกชนิดโดยอัตโนมัติ","เปิดใช้ load balancing แบบ unequal cost ได้"]}]}', NULL),
	('lesson-ccna004-07', 'ccna-004', 'PPP และ HDLC', 'HDLC', '## PPP และ HDLC

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอน Protocol ระดับ Data Link ที่ใช้บน Serial/WAN Links แบบ Point-to-Point ทั้ง HDLC และ PPP พร้อม Lab Config

**เนื้อหาหลัก**
- **HDLC:** Protocol Default ของ Cisco บน Serial Interface เรียบง่ายแต่ใช้ได้เฉพาะ Cisco (encapsulation hdlc)
- **PPP:** Protocol มาตรฐานเปิดใช้ได้กับทุก Vendor รองรับ:
  - **Authentication:** PAP (Cleartext) หรือ CHAP (Challenge-Response ปลอดภัยกว่า)
  - **Compression:** ลดขนาดข้อมูลที่ส่ง
  - **Multilink PPP:** รวมหลาย Link เข้าด้วยกันเพื่อเพิ่ม Bandwidth
- **การตั้งค่า:**
```
interface Serial0/0
  encapsulation ppp
  ppp authentication chap
username PEER password SECRET
```
- **PPPoE:** ใช้ PPP บน Ethernet พบเห็นในการเชื่อมต่ออินเทอร์เน็ตผ่าน ADSL/Fiber ตามบ้าน
- **ตรวจสอบ:** show interfaces serial 0/0, debug ppp authentication

**สรุป**
แม้ HDLC และ PPP จะเป็นเทคโนโลยีเก่า แต่ยังปรากฏในข้อสอบ CCNA และระบบ Legacy WAN ขององค์กรบางแห่ง โดยเฉพาะ PPPoE ยังใช้งานอยู่ทั่วไปบน Broadband Connection', '## PPP and HDLC

**What you will learn in this video**
This video teaches Data Link layer protocols used on Point-to-Point Serial/WAN Links, specifically HDLC and PPP, along with lab configuration.

**Core Content**
- **HDLC:** Cisco''s default protocol on serial interfaces. Simple but Cisco-proprietary (`encapsulation hdlc`).
- **PPP:** Open standard protocol compatible with all vendors. Supports:
  - **Authentication:** PAP (Cleartext) or CHAP (Challenge-Response, more secure).
  - **Compression:** Reduces data payload size.
  - **Multilink PPP:** Bundles multiple links to increase bandwidth.
- **Configuration:**
```text
interface Serial0/0
  encapsulation ppp
  ppp authentication chap
username PEER password SECRET
```
- **PPPoE:** PPP over Ethernet. Commonly seen in home ADSL/Fiber connections.
- **Verification:** `show interfaces serial 0/0`, `debug ppp authentication`

**Conclusion**
Although HDLC and PPP are legacy technologies, they are still tested in CCNA and used in some enterprise WANs, especially PPPoE which remains widely used in broadband.', 'video', 7, 2, 'https://www.youtube.com/watch?v=N2tgsPUPEBE', 'https://loremflickr.com/600/400/server,technology,network/all?lock=17', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["High-Level Data Link Control","High-Speed Digital Link Connection","Hardware Data Link Connector","Hybrid Data Loop Control"],"question_en":"What does HDLC stand for?","question_th":"HDLC ย่อมาจากคำศัพท์ภาษาอังกฤษในข้อใด?","correct_index":0,"explanation_en":"HDLC stands for High-Level Data Link Control, a synchronous data link layer protocol.","explanation_th":"HDLC ย่อมาจาก High-Level Data Link Control ซึ่งเป็นโปรโตคอลในระดับเชื่อมโยงข้อมูล (Data link layer)","options_th":["การควบคุมการเชื่อมโยงข้อมูลระดับสูง","การเชื่อมต่อลิงค์ดิจิตอลความเร็วสูง","ตัวเชื่อมต่อลิงค์ข้อมูลฮาร์ดแวร์","การควบคุมลูปข้อมูลแบบไฮบริด"]},{"options":["It does not support error checking.","It lacks a field to identify the Network Layer protocol type of the packet being carried.","It cannot run over serial cables.","It requires IP address configuration."],"question_en":"What is a major limitation of standard ISO HDLC when running in multi-protocol networks?","question_th":"ข้อจำกัดหลักของ HDLC มาตรฐานอ้างอิงของ ISO เมื่อนำมาใช้งานในโครงข่ายแบบ multi-protocol คืออะไร?","correct_index":1,"explanation_en":"Standard ISO HDLC lacks a protocol identifier field, meaning it can only carry a single network layer protocol type.","explanation_th":"HDLC มาตรฐานดั้งเดิมจะไม่มีฟิลด์ระบุประเภทโปรโตคอล (Protocol type) ของเลเยอร์ 3 ทำให้รับส่งแพ็กเก็ตหลากประเภทพร้อมกันบนสายเดียวไม่ได้","options_th":["ไม่รองรับการตรวจสอบข้อผิดพลาด","ไม่มี Protocol Type Field ของ Layer 3","ไม่สามารถทำงานผ่านสายเคเบิลอนุกรมได้","มันต้องมีการกำหนดค่าที่อยู่ IP"]},{"options":["By developing a proprietary HDLC version with an added 2-byte Protocol field.","By replacing HDLC with Ethernet on all serial cables.","By encrypting the HDLC frame header.","By adding IP routing logic to Layer 1."],"question_en":"How did Cisco resolve the protocol-typing limitation of standard HDLC?","question_th":"Cisco เข้าแก้ไขข้อจำกัดการไม่รองรับโปรโตคอลหลายประเภทของ HDLC มาตรฐานดั้งเดิมอย่างไร?","correct_index":0,"explanation_en":"Cisco created a proprietary version of HDLC that adds a protocol field, allowing multiple network layer protocols (IPv4, IPv6, etc.) to traverse the link.","explanation_th":"Cisco สร้างสเปก HDLC เฉพาะของตนเองขึ้นมาโดยเพิ่มฟิลด์ขนาด 2 ไบต์เพื่อเอาไว้ระบุชนิดโปรโตคอลเลเยอร์ 3 (เช่น IPv4, IPv6)","options_th":["เพิ่ม Protocol Field 2 ไบต์ใน Cisco HDLC","โดยการแทนที่ HDLC ด้วย Ethernet บนสายเคเบิลอนุกรมทั้งหมด","โดยการเข้ารหัสส่วนหัวของเฟรม HDLC","โดยการเพิ่มตรรกะการกำหนดเส้นทาง IP ให้กับเลเยอร์ 1"]},{"options":["You must use fiber cables only.","Both endpoints of the serial connection must be Cisco devices (or support Cisco HDLC).","You must configure a VTP domain.","The link speed is limited to 1 Mbps."],"question_en":"Due to Cisco''s proprietary modification, what is a constraint when connecting two routers using HDLC encapsulation?","question_th":"จากลักษณะโครงสร้างเฉพาะของ Cisco HDLC ส่งผลให้เกิดข้อจำกัดอย่างไรในการตั้งค่าใช้งาน?","correct_index":1,"explanation_en":"Because Cisco HDLC is proprietary, serial links using it must be established between Cisco routers or routers that support Cisco''s custom HDLC header.","explanation_th":"เนื่องจากเป็นลิขสิทธิ์เฉพาะ ลิงก์เชื่อมต่อด้วย Cisco HDLC จึงต้องเชื่อมระหว่างอุปกรณ์ Cisco ด้วยกันหรือรุ่นที่เข้าใจรูปแบบ Header ดังกล่าวเท่านั้น","options_th":["คุณต้องใช้สายไฟเบอร์เท่านั้น","ปลายทั้งสองต้องรองรับ Cisco HDLC","คุณต้องกำหนดค่าโดเมน VTP","ความเร็วลิงค์ถูกจำกัดไว้ที่ 1 Mbps"]},{"options":["PPP","Frame Relay","HDLC","Ethernet"],"question_en":"What is the default encapsulation protocol on serial interfaces of Cisco routers?","question_th":"โปรโตคอลการห่อหุ้มเริ่มต้น (Default Encapsulation) บนอินเตอร์เฟสแบบ Serial ของเร้าเตอร์ Cisco คือข้อใด?","correct_index":2,"explanation_en":"HDLC is the default encapsulation protocol configured on Cisco serial interfaces.","explanation_th":"HDLC เป็นค่าห่อหุ้มตั้งต้น (Default encapsulation) ที่ระบบกำหนดไว้ให้ช่องสัญญาณ Serial บนอุปกรณ์ Cisco ทุกตัว","options_th":["PPP","เฟรมรีเลย์","HDLC","อีเทอร์เน็ต"]}]}', NULL),
	('lesson-git-03', 'devnet-005', 'Git Commands Knowledge Check', 'Git Commands Knowledge Check', '## Git Commands Knowledge Check

**สิ่งที่จะได้เรียนในคลิปนี้**
ในคลิปนี้เราจะทบทวนคำสั่ง Git พื้นฐานที่ใช้บ่อยที่สุดในการทำงานประจำวัน ตั้งแต่การสร้าง Repository การบันทึกการเปลี่ยนแปลง การทำงานร่วมกับทีม จนถึงการดูประวัติและจัดการ Branch

**เนื้อหาหลัก**
- **git init** — เริ่มต้น Git Repository ใหม่ สร้างโฟลเดอร์ .git
- **git clone <url>** — คัดลอก Repository จาก GitHub พร้อมประวัติทั้งหมด
- **git add <file>** — เพิ่มไฟล์ลงใน Staging Area (git add . เพื่อเพิ่มทุกไฟล์)
- **git commit -m** — บันทึก Snapshot เข้าสู่ประวัติ
- **git push** — ส่ง Commit ขึ้น Remote Repository
- **git pull** — ดึงการเปลี่ยนแปลงจาก Remote และ Merge เข้ากับ Branch ปัจจุบัน
- **git branch** — แสดงรายการ Branch ทั้งหมด (* คือ Branch ที่ใช้งานอยู่)
- **git merge <branch>** — รวมประวัติของ Branch ที่ระบุเข้ากับ Branch ปัจจุบัน
- **git log** — แสดงประวัติ Commit; ใช้ --oneline หรือ --graph
- **git status** — แสดงสถานะของ Working Directory
- **git diff** — เปรียบเทียบความต่างระหว่าง Working Directory กับ Commit ล่าสุด
- **git stash** — เก็บการเปลี่ยนแปลงที่ยังไม่ Commit ไว้ชั่วคราว

**สรุป**
การเข้าใจคำสั่ง Git พื้นฐานเหล่านี้เป็นทักษะที่จำเป็นสำหรับ Developer และ Network Engineer ยุคใหม่ทุกคน การฝึกใช้คำสั่งเหล่านี้ในชีวิตประจำวันจะทำให้การทำงานเป็นทีมมีประสิทธิภาพและสามารถย้อนกลับไปแก้ไขได้เสมอ', '## Git Commands Knowledge Check

**What you will learn in this video**
In this video, we review the most commonly used Git commands in daily work, from creating a Repository, saving changes, collaborating with a team, to viewing history and managing Branches.

**Core Content**
- **git init** — Initialize a new Git Repository, creating the .git folder.
- **git clone <url>** — Copy a Repository from GitHub with full history.
- **git add <file>** — Add files to the Staging Area (git add . for all files).
- **git commit -m** — Save a Snapshot into the history.
- **git push** — Send Commits up to the Remote Repository.
- **git pull** — Fetch changes from Remote and Merge them into the current Branch.
- **git branch** — List all Branches (* indicates the active Branch).
- **git merge <branch>** — Merge the history of the specified Branch into the current Branch.
- **git log** — Display Commit history; use --oneline or --graph.
- **git status** — Show the status of the Working Directory.
- **git diff** — Compare differences between the Working Directory and the latest Commit.
- **git stash** — Temporarily save uncommitted changes.

**Conclusion**
Understanding these fundamental Git commands is an essential skill for all modern Developers and Network Engineers. Practicing them daily improves team efficiency and ensures you can always roll back.', 'video', 10, 3, 'https://www.youtube.com/watch?v=ecK3EnyGD8o', '/images/thumbnails/lesson-git-03.jpg', NULL, '2026-06-04 07:07:14.488949+00', '2026-06-04 07:07:14.488949+00', '{"questions":[{"options":["git show","git status","git log","git diff"],"question_en":"Which command displays the state of the working directory and the staging area, showing which files are modified or tracked?","question_th":"คำสั่งใดใช้แสดงสถานะการทำงานปัจจุบันของโฟลเดอร์ไดเรกทอรีและจุดจัดเก็บ เพื่อตรวจสอบไฟล์ที่โดนแก้และไฟล์ที่ยังไม่ได้ติดตาม?","correct_index":1,"explanation_en":"The ''git status'' command provides detailed status information about untracked, modified, and staged files.","explanation_th":"ใช้คำสั่ง ''git status'' สั่งเช็คสถานะการเข้าออกของไฟล์เพื่อแสดงความคืบหน้าว่าไฟล์ใดบ้างกำลังอยู่ในคิวรอการอนุมัติ","options_th":["git show","git status","git log","git diff"]},{"options":["git history","git status","git log","git branch"],"question_en":"Which command displays the commit history log of the current branch in chronological order?","question_th":"คำสั่งใดใช้พ่นรายงานประวัติชิ้นงานที่เคย Commit ทั้งหมดของกิ่งปัจจุบันตามการจัดเรียงลำดับวันและเวลา?","correct_index":2,"explanation_en":"The ''git log'' command lists the details of past commits, including authors, hashes, dates, and messages.","explanation_th":"ใช้คำสั่ง ''git log'' เพื่อให้โปรแกรมเรียงลำดับประวัติ Commit ตั้งแต่อดีตแสดงออกมาให้ตรวจดูรายชื่อผู้เขียนและบันทึกข้อความ","options_th":["git history","git status","git log","git branch"]},{"options":["It deletes the current branch.","It lists all local branches in the repository, highlighting the active one.","It creates a new branch named ''branch''.","It downloads branches from GitHub."],"question_en":"What is the function of the ''git branch'' command when executed without additional arguments?","question_th":"ผลลัพธ์การพิมพ์คำสั่ง ''git branch'' โดยไม่ใส่พารามิเตอร์ใดๆ เพิ่มเติมจะแสดงข้อมูลเรื่องใด?","correct_index":1,"explanation_en":"Running ''git branch'' displays the list of branches present in the local repository, placing an asterisk next to the current active branch.","explanation_th":"จะพ่นรายการกิ่งก้านการพัฒนาโค้ด (Branch) ทั้งหมดที่มีอยู่ภายในเครื่องตัวเองพร้อมแปะดาวระบุกิ่งที่กำลังทำงานอยู่","options_th":["มันจะลบสาขาปัจจุบัน","แสดง Local Branch และตัวปัจจุบัน","มันสร้างสาขาใหม่ชื่อ ''สาขา''","มันดาวน์โหลดสาขาจาก GitHub"]},{"options":["git switch feature-testing (or git checkout feature-testing)","git move feature-testing","git merge feature-testing","git branch feature-testing"],"question_en":"Which command is used to switch from the current branch to another branch (e.g., ''feature-testing'')?","question_th":"คำสั่งใดใช้สลับจากกิ่งปัจจุบันที่ทำงานอยู่เพื่อเปลี่ยนสิทธิ์ไปเขียนโค้ดในกิ่งอื่น (เช่น กิ่ง ''feature-testing'')?","correct_index":0,"explanation_en":"The ''git switch <branch-name>'' (or legacy ''git checkout'') command changes the active working branch in Git.","explanation_th":"ใช้คำสั่ง ''git switch feature-testing'' (หรือคำสั่งแบบเดิม ''git checkout'') ในการสั่งหันเหไดเรกทอรีเปลี่ยนกิ่งเขียนโปรแกรม","options_th":["git switch feature-testing (or git checkout feature-testing)","git move feature-testing","git merge feature-testing","git branch feature-testing"]},{"options":["git diff","git show","git status","git compare"],"question_en":"Which command shows the line-by-line differences between modified files in the working directory and the index?","question_th":"คำสั่งใดแสดงความเคลื่อนไหวระดับบรรทัดเปรียบเทียบชี้ข้อแตกต่างระหว่างสิ่งที่กำลังแก้ไขในโฟลเดอร์และบันทึกอ้างอิง?","correct_index":0,"explanation_en":"The ''git diff'' command shows the differences between unstaged modifications and the staged/committed state.","explanation_th":"คำสั่ง ''git diff'' จะทำการผ่าแสดงสัญลักษณ์บวกและลบเพื่อระบุรายละเอียดของจุดโค้ดที่มีการเขียนเข้าหรือลบทิ้งเปรียบเทียบ","options_th":["git diff","git show","git status","git compare"]}]}', NULL),
	('lesson-adv002-02', 'adv-002', 'EIGRP Metric Calculation', 'EIGRP Metric Calculation', '## EIGRP Metric และการ Tuning

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
การ Tune EIGRP Metric อย่างถูกต้องช่วยให้ Traffic ไหลผ่านเส้นทางที่เหมาะสมที่สุด และช่วยป้องกันปัญหา Suboptimal Routing', '## EIGRP Metric and Tuning

**What you will learn in this video**
This video teaches how EIGRP Metrics are calculated and how to tune various parameters to control traffic paths.

**Core Content**
- **EIGRP Composite Metric:** Calculated from Bandwidth, Delay, Reliability, and Load using K-values.
- **K-values (Default):** K1=1 (BW), K2=0, K3=1 (Delay), K4=0, K5=0 (Uses only BW + Delay).
- **Bandwidth & Delay Tuning:**
  - `bandwidth <kbps>` Changes the bandwidth value EIGRP uses for calculation (does not affect actual BW).
  - `delay <tens-of-microseconds>` Adjusts the interface delay.
- **EIGRP Wide Metrics:** In IPv6/Named Mode, expands the metric to be more accurate on high-speed interfaces (>10Gbps).

**Conclusion**
Properly tuning EIGRP metrics ensures traffic flows through the most optimal paths and prevents suboptimal routing issues.', 'video', 8, 2, 'https://www.youtube.com/watch?v=5RQDKNS35y4', '/images/thumbnails/lesson-adv002-02.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["K1 and K2","K1 and K3","K2 and K4","K3 and K5"],"question_en":"Which two K-values are enabled by default in EIGRP metric calculations?","question_th":"K-value คู่ใดที่ถูกเปิดใช้งานเป็นค่าเริ่มต้นในการคำนวณ Metric ของ EIGRP?","correct_index":1,"explanation_en":"By default, K1 (Bandwidth) and K3 (Delay) are set to 1, while the other K-values are set to 0.","explanation_th":"ค่าเริ่มต้นของ EIGRP จะกำหนดให้ K1 (แบนด์วิดท์) และ K3 (ดีเลย์) มีค่าเป็น 1 ส่วน K อื่นๆ จะมีค่าเป็น 0","options_th":["K1 และ K2","K1 และ K3","K2 และ K4","K3 และ K5"]},{"options":["bandwidth <kbps>","delay <tens-of-microseconds>","eigrp delay <ms>","metric delay <value>"],"question_en":"What interface configuration command is used to adjust the delay value for EIGRP metric tuning?","question_th":"คำสั่งอินเตอร์เฟสใดที่ใช้ปรับแต่งค่า Delay สำหรับการปรับเปลี่ยนเมทริกของ EIGRP?","correct_index":1,"explanation_en":"The ''delay'' command on Cisco interfaces is configured in tens of microseconds to tune the EIGRP metric.","explanation_th":"คำสั่ง ''delay'' บนอินเตอร์เฟสของ Cisco ใช้กำหนดค่าหน่วยเป็นสิบไมโครวินาที (tens of microseconds) เพื่อปรับแต่งเมทริก EIGRP","options_th":["แบนด์วิธ <kbps>","ความล่าช้า <สิบของไมโครวินาที>","ความล่าช้า eigrp <ms>","ความล่าช้าของเมตริก <value>"]},{"options":["Metric = Bandwidth + Delay","Metric = [10,000,000 / Bandwidth + Delay] * 256","Metric = [Bandwidth * Delay] / 256","Metric = Hop Count * 256"],"question_en":"What is the formula for the default classical EIGRP metric?","question_th":"สูตรคำนวณสำหรับ Classical EIGRP Metric แบบเริ่มต้นคืออะไร?","correct_index":1,"explanation_en":"The default metric is computed as: Metric = (10^7 / Minimum Bandwidth in Kbps + Cumulative Delay in tens of microseconds) * 256.","explanation_th":"เมทริกเริ่มต้นคำนวณโดย: Metric = (10^7 / แบนด์วิดท์ต่ำสุด + ผลรวมดีเลย์หน่วยสิบไมโครวินาที) * 256","options_th":["เมตริก = แบนด์วิดท์ + ความล่าช้า","[10,000,000 / Bandwidth + Delay] × 256","เมตริก = [แบนด์วิดท์ * ความล่าช้า] / 256","เมตริก = จำนวนฮอป * 256"]},{"options":["To allow unequal cost path load balancing.","To support high-speed interfaces (>10Gbps) where classical metrics scale down to 1.","To automatically enable authentication.","To decrease CPU processing overhead."],"question_en":"Why does EIGRP Wide Metrics exist in Named Mode?","question_th":"เหตุใด EIGRP Wide Metrics จึงมีความจำเป็นใน Named Mode?","correct_index":1,"explanation_en":"Wide Metrics expands calculation limits to support very high-speed links (10 Gbps and above) without metric distortion.","explanation_th":"Wide Metrics ขยายขีดจำกัดการคำนวณเพื่อรองรับลิงก์ความเร็วสูงมาก (10 Gbps ขึ้นไป) โดยไม่ทำให้ค่าเมทริกเพี้ยน","options_th":["เพื่อให้เกิดความสมดุลในการโหลดเส้นทางต้นทุนไม่เท่ากัน","รองรับพอร์ตเกิน 10 Gbps ที่ Metric เดิมลดเหลือ 1","เพื่อเปิดใช้การยืนยันตัวตนโดยอัตโนมัติ","เพื่อลดโอเวอร์เฮดการประมวลผลของ CPU"]},{"options":["Yes, it limits the interface throughput dynamically.","No, it only alters the routing protocol metric calculations.","Yes, it changes the hardware clock rate.","No, it only acts as a text comment."],"question_en":"Does modifying the ''bandwidth'' command on an interface affect the actual physical transmission speed?","question_th":"การแก้ไขคำสั่ง ''bandwidth'' บนอินเตอร์เฟส ส่งผลกระทบต่อความเร็วการรับส่งข้อมูลทางกายภาพจริงหรือไม่?","correct_index":1,"explanation_en":"The interface ''bandwidth'' command is a logical tuning value. It does not limit the physical line rate.","explanation_th":"คำสั่ง ''bandwidth'' บนอินเตอร์เฟสเป็นเพียงการกำหนดค่าเชิงตรรกะ ไม่มีผลต่อความเร็วทางกายภาพจริงของลิงก์","options_th":["ใช่ มันจำกัดปริมาณงานอินเทอร์เฟซแบบไดนามิก","ไม่ มีผลเฉพาะการคำนวณ Routing Metric","ใช่ มันเปลี่ยนอัตรานาฬิกาของฮาร์ดแวร์","ไม่ มันทำหน้าที่เป็นความคิดเห็นแบบข้อความเท่านั้น"]}]}', NULL),
	('lesson-ccna001-02', 'ccna-001', 'โมเดล OSI 7 Layers', 'OSI 7 Layers Model', '## OSI Model และพื้นฐานเครือข่าย

**สิ่งที่จะได้เรียนในคลิปนี้**

แนะนำ OSI Model 7 ชั้น (Layer) ซึ่งเป็นกรอบมาตรฐานสำหรับทำความเข้าใจว่าข้อมูลเดินทางผ่านเครือข่ายอย่างไร
**เนื้อหาหลัก**
- **Layer 7 Application:** ส่วนติดต่อกับผู้ใช้งาน เช่น HTTP, DNS, FTP
- **Layer 4  Transport:** TCP (เชื่อถือได้) และ UDP (รวดเร็ว) จัดการการส่งข้อมูลระหว่างปลายทาง
- **Layer 3 Network:** IP Addressing และ Routing หาเส้นทางข้ามเครือข่ายฅ
- **Layer 2  Data Link:** MAC Address และ Switching ส่งข้อมูลในวง LAN
- **Layer 1  Physical:** สายไฟ, คลื่นวิทยุ, สัญญาณดิจิทัล
**สรุป**
OSI Model คือพื้นฐานที่วิศวกรเครือข่าย ต้องรู้จักก่อนเรียนหัวข้ออื่นทุกอย่าง เพราะใช้เป็นกรอบในการ Troubleshoot ปัญหาเครือข่ายได้อย่างเป็นระบบ', '## OSI Model and Network Fundamentals

**What you will learn in this video**
This video introduces the 7-Layer OSI Model, which is the standard framework for understanding how data travels across a network.

**Core Content**
- **Layer 7 – Application:** User interfaces such as HTTP, DNS, FTP.
- **Layer 4 – Transport:** TCP (reliable) and UDP (fast) manage data delivery between endpoints.
- **Layer 3 – Network:** IP Addressing and Routing to find paths across networks.
- **Layer 2 – Data Link:** MAC Addresses and Switching to deliver data within a LAN.
- **Layer 1 – Physical:** Cables, radio waves, digital signals.

**Conclusion**
The OSI Model is the foundation every network engineer must know before learning anything else, as it provides a systematic framework for troubleshooting network issues.', 'video', 10, 2, 'https://www.youtube.com/watch?v=Ca1jnqwqzg0', '/images/thumbnails/lesson-ccna001-02.jpg', NULL, '2026-05-18 10:02:06.461001+00', '2026-05-19 10:29:10.623729+00', '{"questions":[{"options":["4 layers","5 layers","7 layers","9 layers"],"question_en":"How many layers are defined in the standard OSI model?","question_th":"ตามโครงสร้างมาตรฐานของแบบจำลอง OSI (OSI Model) ประกอบด้วยเลเยอร์กี่ชั้น?","correct_index":2,"explanation_en":"The Open Systems Interconnection (OSI) model defines 7 distinct layers.","explanation_th":"แบบจำลอง Open Systems Interconnection (OSI Model) กำหนดแบ่งแยกกลุ่มหน้าที่การสื่อสารออกเป็น 7 เลเยอร์","options_th":["4ชั้น","5ชั้น","7ชั้น","9 ชั้น"]},{"options":["Data Link Layer","Network Layer","Transport Layer","Physical Layer"],"question_en":"Which OSI layer is responsible for routing data packets based on IP addresses?","question_th":"เลเยอร์ใดในแบบจำลอง OSI ที่มีหน้าที่จัดเส้นทางแพ็กเก็ตข้อมูล (Routing) โดยพิจารณาอิงตามไอพีแอดเดรส?","correct_index":1,"explanation_en":"The Network Layer (Layer 3) handles routing, logical addressing (IP), and packet forwarding.","explanation_th":"เลเยอร์เน็ตเวิร์ก (Layer 3) ดูแลกระบวนการเร้าติ้ง การระบุเลขไอพี และการสลับส่งแพ็กเก็ตข้อมูล","options_th":["ดาต้าลิงค์เลเยอร์","เลเยอร์เครือข่าย","ชั้นการขนส่ง","เลเยอร์ทางกายภาพ"]},{"options":["Segment","Packet","Frame","Bit"],"question_en":"What is the Protocol Data Unit (PDU) at the OSI Data Link Layer (Layer 2)?","question_th":"หน่วยของข้อมูล PDU (Protocol Data Unit) ของการทำงานใน Data Link Layer (Layer 2) เรียกว่าอะไร?","correct_index":2,"explanation_en":"At Layer 2 (Data Link), data is structured into ''Frames''. Layer 3 uses Packets, and Layer 4 uses Segments.","explanation_th":"ที่เลเยอร์ 2 (Data Link) ข้อมูลจะจัดโครงสร้างหน่วยเป็น ''Frame'' ส่วนเลเยอร์ 3 จะเรียก Packet และเลเยอร์ 4 จะเรียก Segment","options_th":["เซ็กเมนต์","แพ็กเก็ต","Frame","Bit"]},{"options":["Network Layer","Transport Layer","Session Layer","Application Layer"],"question_en":"Which OSI layer ensures reliable end-to-end communication, flow control, and error recovery (e.g., TCP)?","question_th":"เลเยอร์ใดในแบบจำลอง OSI ที่คอยตรวจสอบความถูกต้องสมบูรณ์ของการส่งข้อมูลตั้งแต่ต้นทางถึงปลายทาง รวมถึงควบคุมการไหลของข้อมูล (Flow control)?","correct_index":1,"explanation_en":"The Transport Layer (Layer 4) manages reliability, flow control, sequencing, and port-based multiplexing.","explanation_th":"เลเยอร์ทรานสปอร์ต (Layer 4) ดูแลเรื่องการส่งข้อมูลให้ครบถ้วน ความคุมความหนาแน่น และแยกแยะพอร์ตเชื่อมต่อ","options_th":["เลเยอร์เครือข่าย","ชั้นการขนส่ง","เลเยอร์เซสชัน","เลเยอร์แอปพลิเคชัน"]},{"options":["Application Layer","Presentation Layer","Session Layer","Transport Layer"],"question_en":"Which layer of the OSI model interacts directly with user software applications (like Web Browsers)?","question_th":"เลเยอร์ใดของแบบจำลอง OSI ที่ทำงานเชื่อมต่อสัมผัสใกล้ชิดกับแอปพลิเคชันซอฟต์แวร์ของผู้ใช้งาน (เช่น เว็บเบราว์เซอร์) โดยตรง?","correct_index":0,"explanation_en":"The Application Layer (Layer 7) provides protocols directly utilized by end-user software (HTTP, FTP, SMTP, etc.).","explanation_th":"เลเยอร์แอปพลิเคชัน (Layer 7) เตรียมบริการและโปรโตคอลให้โปรแกรมปลายทางฝั่งผู้ใช้เรียกใช้งาน (เช่น HTTP, FTP)","options_th":["เลเยอร์แอปพลิเคชัน","เลเยอร์การนำเสนอ","เลเยอร์เซสชัน","ชั้นการขนส่ง"]}]}', NULL),
	('lesson-git-05', 'devnet-005', 'CI/CD Pipelines for Network Code', 'CI/CD Pipelines for Network Code', '## CI/CD Pipeline สำหรับ Network Code

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
CI/CD ทำให้การเปลี่ยนแปลง Network Configuration มีความปลอดภัยสูงขึ้น ลด Human Error และมีประวัติการแก้ไขที่ตรวจสอบได้', '## CI/CD Pipeline for Network Code

**What you will learn in this video**
This video demonstrates a CI/CD Pipeline using GitHub Actions to automatically test and Deploy Network Configurations.

**Core Content**
- **What is CI/CD:** Continuous Integration (testing on every Commit) and Continuous Delivery (automated Deployment).
- **GitHub Actions Workflow:** The `.github/workflows/network-test.yml` file defines the steps.
- **Pipeline Example:**
  1. Developer Pushes code or Config to GitHub.
  2. GitHub Actions runs a Python Script to verify Config Syntax.
  3. Runs Network Simulation (e.g., Batfish) to ensure Policy correctness.
  4. If all tests pass → Ansible automatically Deploys the Config to the Production Router.

**Conclusion**
CI/CD makes Network Configuration changes much safer, drastically reduces Human Error, and provides an auditable history of changes.', 'video', 33, 5, 'https://www.youtube.com/watch?v=R8_veQiYBjI', '/images/thumbnails/lesson-git-05.jpg', NULL, '2026-06-04 07:07:14.488949+00', '2026-06-04 07:07:14.488949+00', '{"questions":[{"options":["Continuous Integration / Continuous Deployment (or Delivery)","Configuration Inspection / Command Delivery","Centralized Infrastructure / Controller Distribution","Code Isolation / Command Diagnostics"],"question_en":"What does CI/CD stand for in modern software and network automation workflows?","question_th":"คำย่อ CI/CD ในการพัฒนาซอฟต์แวร์และการทำงานเครือข่ายอัตโนมัติย่อมาจากคำศัพท์ในข้อใด?","correct_index":0,"explanation_en":"CI/CD stands for Continuous Integration (merging and building code) and Continuous Deployment or Delivery (automating deployments).","explanation_th":"CI/CD ย่อมาจาก Continuous Integration (การรวมโค้ดและทดสอบสม่ำเสมอ) และ Continuous Delivery/Deployment (การจัดส่งหรือติดตั้งใช้งานอัตโนมัติ)","options_th":["การผสานรวมต่อเนื่อง / การส่งมอบต่อเนื่อง","การตรวจสอบการกำหนดค่า / การส่งคำสั่ง","การกระจายโครงสร้างพื้นฐาน / ตัวควบคุมแบบรวมศูนย์","การแยกรหัส / การวินิจฉัยคำสั่ง"]},{"options":["It eliminates the need for routers.","It ensures changes are automatically tested, validated, and linted in a simulator/lab before pushing to production, reducing manual errors.","It makes the network connections wireless.","It lowers the electricity usage of switch hardware."],"question_en":"What is the primary benefit of applying CI/CD pipelines to network configuration changes?","question_th":"ประโยชน์สูงสุดของการนำกระบวนการ CI/CD (Pipeline) มาใช้กับการปรับปรุงค่าคอนฟิกอุปกรณ์เครือข่ายคืออะไร?","correct_index":1,"explanation_en":"CI/CD pipelines automate testing, linting, and dry-run syntax checks, preventing misconfigured templates from causing outages in production networks.","explanation_th":"ช่วยให้คำสั่งการแก้ไขเครือข่ายผ่านการจำลองทดสอบ ตรวจความถูกต้องของไวยากรณ์ และรันอัตโนมัติก่อนส่งขึ้นอุปกรณ์จริงเพื่อลดการผิดพลาดจากมนุษย์","options_th":["ช่วยลดความจำเป็นในการใช้เราเตอร์","Test/Validate Config ก่อน Production","ทำให้การเชื่อมต่อเครือข่ายไร้สาย","ช่วยลดการใช้ไฟฟ้าของฮาร์ดแวร์สวิตช์"]},{"options":["A manual power cycle of the router.","Events such as pushing code commits to a branch or opening a pull request.","Writing a text comment inside a python script.","Weekly scheduling only."],"question_en":"In Git-based CI/CD workflows, what triggers the execution of a pipeline?","question_th":"ในระบบการทำงานแบบ Git-based CI/CD สิ่งใดคือสิ่งกระตุ้น (Trigger) ให้ชุดกระบวนการเริ่มทำงาน?","correct_index":1,"explanation_en":"Pipelines are triggered by version control events, such as pushing commits, merging branches, or creating pull requests.","explanation_th":"ทริกเกอร์ในการรันเริ่มจากการทำงานของ Git (Git Events) เช่น การดันโค้ดขึ้นคลังส่วนกลาง (git push) หรือตอนเปิดด่านขอรวมไฟล์ (Pull Request)","options_th":["วงจรพลังงานด้วยตนเองของเราเตอร์","Push Commit หรือเปิด Pull Request","การเขียนความคิดเห็นข้อความภายในสคริปต์หลาม","กำหนดการรายสัปดาห์เท่านั้น"]},{"options":["Ansible inventory","GitHub Actions / GitLab CI/CD","Wireshark","Postman request builder"],"question_en":"What tool or service is commonly used to host and execute CI/CD pipelines?","question_th":"เครื่องมือหรือผู้บริการแพลตฟอร์มใดที่นิยมนำมาใช้งานหลักในการจัดเก็บและสั่งรันกระบวนการทำงานแบบ CI/CD?","correct_index":1,"explanation_en":"GitHub Actions, GitLab CI/CD, Jenkins, and Travis CI are popular automation engines that execute pipeline workflows.","explanation_th":"GitHub Actions และ GitLab CI/CD คือตัวขับเคลื่อนหลักที่คอยสร้างและรันไปป์ไลน์ทดสอบตามโจทย์ที่ตั้งไว้","options_th":["สินค้าคงคลังที่สามารถวิเคราะห์ได้","การดำเนินการ GitHub / GitLab CI/CD","Wireshark","ตัวสร้างคำขอบุรุษไปรษณีย์"]},{"options":["To delete the backup configuration on the router.","To simulate configuration changes and verify syntax without actually modifying the device''s running state.","To format the local computer hard drive.","To authenticate the user credentials."],"question_en":"In a network CI/CD pipeline, what is the purpose of a ''dry-run'' or ''check'' phase?","question_th":"วัตถุประสงค์ของขั้นตอนการจำลองสถานการณ์จริง (Dry-run/Check) ในกระบวนการ CI/CD คืออะไร?","correct_index":1,"explanation_en":"Dry-run/Check modes (like `ansible-playbook --check`) verify syntax and preview changes on routers without pushing modifications, preventing unintended outages.","explanation_th":"เป็นการทดลองรันคำสั่งจำลองเพื่อวิเคราะห์ความถูกต้องของไวยากรณ์ โดยจะไม่มีการเขียนค่าลงหน่วยความจำจริงของอุปกรณ์เราเตอร์","options_th":["หากต้องการลบการกำหนดค่าการสำรองข้อมูลบนเราเตอร์","จำลอง Config และตรวจ Syntax โดยไม่แก้ Running State","เพื่อฟอร์แมตฮาร์ดไดรฟ์คอมพิวเตอร์ในระบบ","เพื่อยืนยันตัวตนของผู้ใช้"]}]}', NULL),
	('lesson-adv002-04', 'adv-002', 'EIGRP Route Filtering และ Summarization', 'EIGRP Route Filtering and Summarization', '## EIGRP Route Filtering and Summarization

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
การประยุกต์ใช้ Filtering และ Summarization ร่วมกันใน EIGRP ช่วยเพิ่มความเสถียรของเครือข่าย ลดภาระของ CPU บนเร้าเตอร์ และควบคุมเส้นทางการเชื่อมต่อได้อย่างสมบูรณ์แบบ', '## EIGRP Route Filtering and Summarization

**Introduction**
EIGRP is an Advanced Distance Vector Routing Protocol. Managing the Routing Table to keep it small and efficient is an advanced skill in EIGRP.

**Route Filtering**
- Used to block or deny specific routes from entering the system.
- Achieved using `Prefix-list`, `Access-list`, or `Route-map` in conjunction with the `distribute-list` command.
- Increases security and controls traffic flow direction.

**Manual Summarization**
- Combines multiple subnets into a single route (Summary Route) before advertising it out.
- Done using interface-level commands such as `ip summary-address eigrp <AS> <IP> <Mask>`.
- **Benefits:** Reduces routing table size, limits the scope of EIGRP Queries when a route goes down (reduces Stuck-in-Active issues).

**Conclusion**
Combining Filtering and Summarization in EIGRP increases network stability, reduces router CPU load, and provides complete control over routing paths.', 'reading', 2, 4, NULL, '/images/thumbnails/lesson-adv002-04.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["Only on Area Border Routers (ABRs).","On any interface of any EIGRP router.","Only on Autonomous System boundary routers.","Only on backbone links."],"question_en":"At which points in the network can EIGRP route summarization be configured?","question_th":"สามารถระบุการรวบรวมและย่อเส้นทาง (Route summarization) ของ EIGRP ได้ที่จุดใดในเครือข่าย?","correct_index":1,"explanation_en":"Unlike OSPF, EIGRP route summarization can be configured on any interface of any router in the network.","explanation_th":"EIGRP แตกต่างจาก OSPF ตรงที่สามารถคอนฟิกการย่อเส้นทางได้ที่ทุกๆ อินเตอร์เฟสของเร้าเตอร์ EIGRP ตัวใดก็ได้ในระบบ","options_th":["เฉพาะบน Area Border Routers (ABR) เท่านั้น","บนอินเทอร์เฟซใดๆ ของเราเตอร์ EIGRP ใดๆ","เฉพาะบนเราเตอร์ขอบเขตของระบบอัตโนมัติเท่านั้น","เฉพาะลิงก์หลักเท่านั้น"]},{"options":["ip summary-address eigrp <as-number> <summary-address> <mask>","summary-address <summary-address> <mask>","area range <summary-address> <mask>","ip route-summary eigrp <as-number>"],"question_en":"What is the interface command used to configure manual EIGRP summarization in classic configuration mode?","question_th":"คำสั่งในระดับอินเตอร์เฟสใดที่ใช้กำหนดค่าการย่อเส้นทาง EIGRP ด้วยตนเองใน Classic Mode?","correct_index":0,"explanation_en":"In classic mode, manual summarization is configured per-interface using ''ip summary-address eigrp <as-number> <network> <mask>''.","explanation_th":"ใน Classic Mode การย่อเส้นทางทำได้โดยสั่งในระดับอินเตอร์เฟสด้วยคำสั่ง ''ip summary-address eigrp <as-number> <network> <mask>''","options_th":["ip summary-address eigrp <as-number> <summary-address> <mask>","summary-address <summary-address> <mask>","area range <summary-address> <mask>","ip route-summary eigrp <as-number>"]},{"options":["Route Maps","Distribute Lists","Prefix Lists","All of the above"],"question_en":"Which tool can be used with EIGRP to filter specific prefixes and prevent them from being advertised to neighbors?","question_th":"เครื่องมือใดที่สามารถนำมาใช้ร่วมกับ EIGRP เพื่อกรอง Prefix เฉพาะและปิดกั้นไม่ให้โฆษณาไปยังเพื่อนบ้าน?","correct_index":3,"explanation_en":"EIGRP supports route filtering using distribute-lists in combination with ACLs, prefix-lists, or route-maps.","explanation_th":"EIGRP รองรับการกรองเส้นทางโดยใช้ distribute-list ร่วมกับ ACL, prefix-list หรือ route-map","options_th":["Route Map","Distribute List","Prefix List","ถูกทุกข้อ"]},{"options":["distribute-list <list-name/id> [in | out] [interface]","ip distribute-list <list-name>","filter-list <list-name>","route-filter <list-name>"],"question_en":"What command applies a distribute-list in EIGRP router configuration mode?","question_th":"คำสั่งใดใช้ผูกการทำงานของ distribute-list ในโหมด EIGRP Router Configuration?","correct_index":0,"explanation_en":"The command ''distribute-list <list-name> [in|out]'' filters routing updates sent or received by EIGRP.","explanation_th":"คำสั่ง ''distribute-list <list-name> [in|out]'' ใช้กรองข้อมูลอัปเดตเส้นทางที่ส่งออกหรือรับเข้าสำหรับ EIGRP","options_th":["distribute-list <list-name/id> [in | out] [interface]","ip distribute-list <list-name> [in | out] [interface]","filter-list <list-name>","route-filter <list-name>"]},{"options":["1","5","90","170"],"question_en":"When EIGRP summarizes routes, what AD value is assigned to the automatically generated Null0 summary discard route?","question_th":"เมื่อ EIGRP ทำการย่อเส้นทาง ค่า AD (Administrative Distance) ใดที่ถูกระบุให้กับเส้นทาง Null0 ที่สร้างขึ้นโดยอัตโนมัติ?","correct_index":1,"explanation_en":"The EIGRP summary discard route pointing to Null0 is assigned an Administrative Distance (AD) value of 5.","explanation_th":"เส้นทาง Null0 (discard route) ที่เกิดจากการย่อเส้นทางใน EIGRP จะมีค่า Administrative Distance (AD) เท่ากับ 5","options_th":["1","5","90","170"]}]}', NULL),
	('lesson-python-01', 'devnet-001', 'พื้นฐาน Python', 'Python Basics', '## พื้นฐาน Python สำหรับ Network Engineer

**สิ่งที่จะได้เรียนในคลิปนี้**
ในคลิปนี้เราจะเรียนรู้พื้นฐานของภาษา Python ที่จำเป็นสำหรับ Network Engineer โดยเน้นที่การนำไปใช้งานจริงเพื่อ Automate งานที่ทำซ้ำๆ เช่น การ Backup Config การตรวจสอบ Interface Status

**เนื้อหาหลัก**
- **ทำไมต้องใช้ Python:** ลด Human Error, Automate อุปกรณ์หลายสิบหรือหลายร้อยตัวพร้อมกัน, Syntax เรียบง่าย
- **Data Types ที่สำคัญ:** str, int, bool, list, dict
- **Control Flow:** if/elif/else, for loop, while loop
- **Functions:** ห่อโค้ดที่ใช้ซ้ำบ่อยไว้ในฟังก์ชัน
- **Modules ที่สำคัญ:** Netmiko (SSH เข้าถึง Router/Switch), NAPALM, Requests (REST API), json/yaml
- **ตัวอย่าง:**
```python
from netmiko import ConnectHandler
device = {''device_type'': ''cisco_ios'', ''host'': ''10.0.0.1'', ''username'': ''admin'', ''password'': ''cisco''}
with ConnectHandler(**device) as net_connect:
    output = net_connect.send_command(''show ip interface brief'')
    print(output)
```

**สรุป**
Python เป็นทักษะที่ขาดไม่ได้สำหรับ Network Engineer ยุคใหม่ เป็นรากฐานที่แข็งแกร่งสำหรับการเรียนรู้ Network Automation ขั้นสูงต่อไป', '## Python Basics for Network Engineers

**What you will learn in this video**
In this video, we will learn fundamental Python required for Network Engineers, focusing on practical usage to Automate repetitive tasks such as Config Backups and Interface Status checks.

**Core Content**
- **Why use Python:** Reduces Human Error, Automates dozens or hundreds of devices simultaneously, simple Syntax.
- **Important Data Types:** str, int, bool, list, dict
- **Control Flow:** if/elif/else, for loop, while loop
- **Functions:** Wrapping frequently used code into functions.
- **Important Modules:** Netmiko (SSH into Router/Switch), NAPALM, Requests (REST API), json/yaml
- **Example:**
```python
from netmiko import ConnectHandler
device = {''device_type'': ''cisco_ios'', ''host'': ''10.0.0.1'', ''username'': ''admin'', ''password'': ''cisco''}
with ConnectHandler(**device) as net_connect:
    output = net_connect.send_command(''show ip interface brief'')
    print(output)
```

**Conclusion**
Python is an indispensable skill for modern Network Engineers and serves as a strong foundation for learning advanced Network Automation.', 'video', 267, 1, 'https://www.youtube.com/watch?v=rfscVS0vtbw', '/images/thumbnails/lesson-python-01.jpg', NULL, '2026-05-18 10:02:06.461001+00', '2026-05-19 10:29:10.623729+00', '{"questions":[{"options":["Compiled assembly language.","High-level, interpreted programming language known for readability.","Low-level hardware design language.","Pure markup script language."],"question_en":"What type of programming language is Python?","question_th":"ภาษา Python จัดอยู่ในประเภทภาษาเขียนโปรแกรมแบบใด?","correct_index":1,"explanation_en":"Python is an interpreted, high-level language designed with readability and simplicity in mind, widely used in automation.","explanation_th":"Python เป็นภาษาระดับสูงที่มีตัวแปลชนิดอินเทอร์พรีเตอร์ (Interpreted) โครงสร้างโค้ดถูกออกแบบมาให้อ่านทำความเข้าใจง่าย","options_th":["ภาษาแอสเซมบลีที่คอมไพล์","ภาษา Interpreted ระดับสูง อ่านง่าย","ภาษาการออกแบบฮาร์ดแวร์ระดับต่ำ","ภาษาสคริปต์มาร์กอัปล้วนๆ"]},{"options":["Tuple","List","Dictionary","String"],"question_en":"What data type in Python stores an ordered collection of items that is mutable?","question_th":"ประเภทข้อมูล (Data type) ใดใน Python ที่ใช้เก็บรวบรวมข้อมูลตามลำดับที่สามารถปรับแต่งแก้ไขค่าได้ (Mutable)?","correct_index":1,"explanation_en":"Lists in Python are ordered and mutable collections, defined using square brackets `[]`.","explanation_th":"List เป็นประเภทข้อมูลที่เรียงลำดับดัชนี สามารถเพิ่ม ลบ หรือแก้ไขสมาชิกภายในได้ ประกาศใช้ด้วยวงเล็บเหลี่ยม `[]`","options_th":["Tuple (ทูเพิล)","List (ลิสต์)","Dictionary (ดิกชันนารี)","String (สตริง)"]},{"options":["List","Dictionary","Set","Tuple"],"question_en":"Which Python data type stores key-value pairs and is ideal for representing network device details (like IP and hostname)?","question_th":"ประเภทข้อมูลในข้อใดที่เก็บข้อมูลเป็นคู่คีย์และมูลค่า (Key-value pairs) เหมาะสำหรับจัดระเบียบคุณสมบัติอุปกรณ์เครือข่าย?","correct_index":1,"explanation_en":"Dictionaries store key-value pairs (using `{}`) and allow quick lookups, making them perfect for holding device configuration variables.","explanation_th":"Dictionary (เขียนแทนด้วยปีกกา `{}`) เก็บข้อมูลแบบคู่กุญแจและค่า (Key-Value) เหมาะมากในการทำตารางระบุสเปกอุปกรณ์ไอที","options_th":["List (ลิสต์)","Dictionary (ดิกชันนารี)","Set (เซต)","Tuple (ทูเพิล)"]},{"options":["function myFunction():","def myFunction():","void myFunction() {}","define myFunction:"],"question_en":"What is the correct syntax to define a function in Python?","question_th":"รูปแบบไวยากรณ์ (Syntax) ในการประกาศสร้างฟังก์ชันในภาษา Python ข้อใดถูกต้อง?","correct_index":1,"explanation_en":"Functions in Python are defined using the `def` keyword followed by the function name, parentheses, and a colon.","explanation_th":"การสร้างฟังก์ชันจะเริ่มต้นด้วยคีย์เวิร์ด `def` ตามด้วยชื่อฟังก์ชัน วงเล็บ และปิดท้ายด้วยเครื่องหมายโคลอน `:`","options_th":["ฟังก์ชั่น myFunction():","def myFunction():","เป็นโมฆะ myFunction() {}","กำหนดฟังก์ชันของฉัน:"]},{"options":["Curly braces `{}`","Indentation (whitespace/tabs)","Semicolons `;`","Parentheses `()`"],"question_en":"How does Python define blocks of code (such as inside a loop or function)?","question_th":"ภาษา Python ใช้สิ่งใดในการจัดแบ่งอาณาเขตหรือขอบเขตบล็อกโค้ด (เช่น โค้ดในคำสั่งวนลูปหรือฟังก์ชัน)?","correct_index":1,"explanation_en":"Python uses indentation (standard is 4 spaces) rather than curly braces or brackets to define code blocks.","explanation_th":"Python ใช้การย่อหน้า (Indentation) ด้วยการเว้นวรรคหรือปุ่ม Tab เป็นตัวระบุบล็อกและโครงสร้างขอบเขต ไม่ใช้ปีกกา `{}`","options_th":["วงเล็บปีกกา `{}`","การเยื้องบรรทัด","อัฒภาค `;`","วงเล็บ `()`"]}]}', NULL),
	('devnet-004-lesson-1', 'devnet-004', 'ปูพื้นฐาน REST API', 'Introduction to REST APIs', '## ปูพื้นฐาน REST API
**สิ่งที่จะได้เรียนในคลิปนี้**
ทำความเข้าใจหลักการทำงานพื้นฐานของ REST API และวิธีที่โปรแกรมใช้สื่อสารกันผ่านเครือข่าย เพื่อเป็นพื้นฐานในการต่อยอดระบบ Network Automation

**เนื้อหาหลัก**

**สถาปัตยกรรม REST: รูปแบบมาตรฐานสากลสำหรับการส่งผ่านข้อมูลข้ามเครือข่ายผ่านโปรโตคอล HTTP**

**องค์ประกอบสำคัญของ REST API:**
- Endpoint / URI: ที่อยู่ของทรัพยากรบนเซิร์ฟเวอร์ที่ต้องการเข้าถึง
- HTTP Methods: วิธีการที่ระบุจุดประสงค์ของการร้องขอ (Request)
- Headers & Body: ข้อมูลส่วนหัวและเนื้อหาที่แนบไปกับการร้องขอหรือการตอบกลับ

**HTTP Methods ที่ใช้งานบ่อย (CRUD Operations):**
- GET (Read): ใช้สำหรับดึงข้อมูล โดยไม่เปลี่ยนแปลงข้อมูลบนเซิร์ฟเวอร์
- POST (Create): ใช้สำหรับสร้างข้อมูลหรือรีซอร์สใหม่
- PUT / PATCH (Update): ใช้สำหรับแก้ไขหรืออัปเดตข้อมูลที่มีอยู่
- DELETE (Delete): ใช้สำหรับลบข้อมูลออกจากระบบ

**รูปแบบข้อมูล (Data Formats):**
- JSON (JavaScript Object Notation): รูปแบบข้อมูลที่อ่านง่าย เป็นที่นิยมสูงสุดในปัจจุบัน
- XML (eXtensible Markup Language): รูปแบบข้อมูลแบบแท็ก ใช้ในระบบหรือสถาปัตยกรรมแบบดั้งเดิม

**ข้อควรระวัง**
การออกแบบ REST API ที่ดีจะต้องเป็นแบบ Stateless คือแต่ละ Request ทำงานแยกส่วนกันโดยเซิร์ฟเวอร์จะไม่จดจำสถานะก่อนหน้า

**สรุป**
REST API คือหัวใจสำคัญของการทำ Network Automation ในยุคปัจจุบัน การเข้าใจ HTTP Methods และ JSON จะช่วยให้คุณสั่งงานอุปกรณ์เครือข่ายสมัยใหม่ได้อย่างมีประสิทธิภาพ', '## Introduction to REST APIs
**What You Will Learn**
Understand the fundamental principles of REST APIs and how applications communicate over the network, laying the groundwork for modern network automation.

**Main Content**

**REST Architecture: A standardized approach for web services to communicate via HTTP protocol.**

**Key Components of a REST API:**
- Endpoint / URI: The specific path to access a resource on the server.
- HTTP Methods: The action requested from the server.
- Headers & Body: Additional metadata and payload sent with the request or response.

**Common HTTP Methods (CRUD Operations):**
- GET (Read): Retrieves data without modifying server state.
- POST (Create): Submits new data to create a resource.
- PUT / PATCH (Update): Modifies or replaces existing data.
- DELETE (Delete): Removes a resource from the server.

**Standard Data Formats:**
- JSON (JavaScript Object Notation): Human-readable and the most widely used format today.
- XML (eXtensible Markup Language): Tag-based format heavily used in legacy systems.

**Important Note**
REST APIs are strictly Stateless. This means every single request must contain all the information the server needs to fulfill it, without relying on past interactions.

**Conclusion**
REST APIs are the backbone of modern programmability and Network Automation. Mastering HTTP methods and JSON formats is your first step toward configuring network devices automatically.', 'video', 8, 1, 'https://www.youtube.com/watch?v=7YcW25PHnAA', NULL, NULL, '2026-07-14 02:27:54.182875+00', '2026-07-14 02:27:54.182875+00', '{"questions":[{"options":["The server stores session history to optimize requests.","Every request must contain all the information the server needs to fulfill it.","The client must maintain a constant connection to the server.","Only GET requests are allowed to be sent."],"question_en":"What does the stateless nature of REST APIs imply?","question_th":"คุณลักษณะการไม่มีสถานะ (Stateless) ของ REST API หมายถึงอะไร?","correct_index":1,"explanation_en":"Stateless means every request must contain all necessary information for processing, and the server does not store past interaction state.","explanation_th":"Stateless หมายถึงแต่ละ Request จะต้องมีข้อมูลทั้งหมดที่เซิร์ฟเวอร์ต้องการเพื่อประมวลผล โดยเซิร์ฟเวอร์จะไม่เก็บสถานะการโต้ตอบในอดีตไว้","options_th":["เซิร์ฟเวอร์จัดเก็บประวัติการใช้งานเซสชันไว้ เพื่อช่วยเพิ่มประสิทธิภาพในการจัดการกับคำขอ","ทุกคำขอต้องประกอบด้วยข้อมูลทั้งหมดที่เซิร์ฟเวอร์ต้องการเพื่อประมวลผล","ไคลเอนต์จะต้องรักษาการเชื่อมต่อกับเซิร์ฟเวอร์ให้คงอยู่ตลอดการสื่อสารทุกครั้ง","ระบบอนุญาตให้ส่งคำขอไปยังเซิร์ฟเวอร์ได้เฉพาะคำขอประเภท GET เท่านั้น"]},{"options":["POST","PUT","GET","DELETE"],"question_en":"Which HTTP method is used to retrieve data from a server without modifying its state?","question_th":"HTTP Method ใดใช้สำหรับดึงข้อมูลจากเซิร์ฟเวอร์โดยไม่มีการปรับเปลี่ยนสถานะของเซิร์ฟเวอร์?","correct_index":2,"explanation_en":"GET retrieves data without modifying server state, which corresponds to the ''Read'' operation in CRUD.","explanation_th":"GET ใช้ดึงข้อมูลโดยไม่มีการเปลี่ยนสถานะของเซิร์ฟเวอร์ ซึ่งสอดคล้องกับการทำงาน ''Read'' ใน CRUD","options_th":["POST (ส่งข้อมูลใหม่)","PUT (แก้ไขข้อมูล)","GET (ดึงข้อมูล)","DELETE (ลบข้อมูล)"]},{"options":["XML","JSON","HTML","YAML"],"question_en":"Which of the following is the most widely used data format in modern REST APIs?","question_th":"รูปแบบข้อมูลใดที่ถูกใช้งานอย่างแพร่หลายที่สุดใน REST API สมัยใหม่?","correct_index":1,"explanation_en":"JSON (JavaScript Object Notation) is human-readable and the most widely used format in modern REST APIs.","explanation_th":"JSON (JavaScript Object Notation) เป็นรูปแบบที่อ่านเข้าใจง่ายและเป็นที่นิยมใช้งานมากที่สุดใน REST API สมัยใหม่","options_th":["XML","JSON","HTML","YAML"]},{"options":["To format the payload in JSON.","To specify the path to access a resource on the server.","To encrypt the data transmission.","To validate the authentication token."],"question_en":"What is the purpose of an Endpoint / URI in a REST API?","question_th":"วัตถุประสงค์ของ Endpoint / URI ใน REST API คืออะไร?","correct_index":1,"explanation_en":"An Endpoint / URI defines the specific path to access a resource on the server.","explanation_th":"Endpoint / URI กำหนดเส้นทางเฉพาะเพื่อเข้าถึงทรัพยากรบนเซิร์ฟเวอร์","options_th":["เพื่อจัดรูปแบบ payload ของข้อมูลเป็น JSON","เพื่อระบุเส้นทางเฉพาะสำหรับเข้าถึงทรัพยากรบนเซิร์ฟเวอร์","เพื่อเข้ารหัสลับข้อมูลที่ส่งผ่านระหว่างไคลเอนต์กับเซิร์ฟเวอร์","เพื่อตรวจสอบความถูกต้องของโทเค็นยืนยันตัวตนก่อนเข้าถึง"]},{"options":["GET","PUT","POST","DELETE"],"question_en":"Which HTTP Method corresponds to the ''Create'' operation in CRUD?","question_th":"HTTP Method ใดตรงกับการทำงาน ''Create'' ใน CRUD?","correct_index":2,"explanation_en":"POST is used to submit new data to create a resource on the server.","explanation_th":"POST ใช้สำหรับส่งข้อมูลใหม่เพื่อสร้างทรัพยากรบนเซิร์ฟเวอร์","options_th":["GET","PUT","POST","DELETE"]}]}', NULL),
	('devnet-004-lesson-2', 'devnet-004', 'การใช้งาน Postman สำหรับ Network APIs', 'Using Postman for Network APIs', '## การใช้งาน Postman สำหรับ Network APIs
**สิ่งที่จะได้เรียนในคลิปนี้**
เรียนรู้วิธีการใช้ซอฟต์แวร์ Postman ในการทดสอบและจำลองการส่ง API Request ไปยังอุปกรณ์เครือข่าย เพื่อตรวจสอบความถูกต้องก่อนนำไปเขียนโค้ดจริง

**เนื้อหาหลัก**

**Postman: เครื่องมือยอดนิยมสำหรับนักพัฒนาเพื่อทดสอบ ออกแบบ และเอกสารประกอบ API อย่างรวดเร็ว**

**ส่วนประกอบหลักของ Postman Workspace:**
- Request Builder: พื้นที่สำหรับกำหนด HTTP Method, URL, Parameters และ Headers
- Response Window: ส่วนแสดงผลลัพธ์ที่ตอบกลับจากเซิร์ฟเวอร์ รวมถึง Status Code
- Collections: โฟลเดอร์สำหรับจัดเก็บและจัดระเบียบ API Requests ไว้ใช้งานซ้ำ

**สถานะการตอบกลับ (HTTP Status Codes):**
- 2xx (Success): การดำเนินการสำเร็จ เช่น 200 OK, 201 Created
- 4xx (Client Error): เกิดข้อผิดพลาดจากฝั่งผู้เรียกใช้งาน เช่น 400 Bad Request, 401 Unauthorized
- 5xx (Server Error): เกิดข้อผิดพลาดจากฝั่งระบบเซิร์ฟเวอร์ เช่น 500 Internal Server Error

**การประยุกต์ใช้งานด้านเครือข่าย:**
- API Testing: ทดสอบยิงคำสั่งเปิดพอร์ต หรือเช็คสถานะอุปกรณ์โดยไม่ต้องเขียนโปรแกรม
- Environment Variables: สร้างตัวแปรสำหรับ IP Address หรือ Token เพื่อสลับสวิตช์อุปกรณ์ได้รวดเร็ว

**ข้อควรระวัง**
อย่าลืมจัดการเรื่อง Authentication Token ใน Header อย่างปลอดภัย และหลีกเลี่ยงการเปิดเผย Token จริงในพื้นที่สาธารณะ

**สรุป**
Postman ช่วยลดระยะเวลาในการทดสอบ API อย่างมหาศาล และเป็นสะพานเชื่อมสำคัญที่จะทำให้ Network Engineer มั่นใจว่า API ใช้งานได้จริงก่อนนำไปเขียนสคริปต์อัตโนมัติ', '## Using Postman for Network APIs
**What You Will Learn**
Learn how to use Postman to test and simulate API requests against network devices, ensuring functionality before writing actual automation code.

**Main Content**

**Postman: The industry-standard tool for testing, designing, and documenting APIs rapidly.**

**Core Features of Postman Workspace:**
- Request Builder: Configure your HTTP Method, Endpoint URL, Query Parameters, and Headers.
- Response Window: Inspect the payload, response times, and HTTP Status Codes returned by the server.
- Collections: Group and save multiple API requests for organized workflows and reuse.

**Understanding HTTP Status Codes:**
- 2xx (Success): Request processed successfully (e.g., 200 OK, 201 Created).
- 4xx (Client Error): Issue with the request structure or credentials (e.g., 401 Unauthorized, 404 Not Found).
- 5xx (Server Error): Server failed to process a valid request (e.g., 500 Internal Server Error).

**Network Automation Applications:**
- API Testing: Verify interface states or push configuration snippets without writing a single line of Python.
- Environment Variables: Dynamically swap device IP addresses and API tokens using global or environment contexts.

**Important Note**
Always handle Authentication Tokens securely within Postman environments, and do not share workspaces containing sensitive production credentials.

**Conclusion**
Postman drastically accelerates the API learning and testing phase. It bridges the gap between reading API documentation and writing functional automation scripts.', 'video', 28, 2, 'https://www.youtube.com/watch?v=rza0VxuClek', NULL, NULL, '2026-07-14 02:27:54.182875+00', '2026-07-14 02:27:54.182875+00', '{"questions":[{"options":["Writing production Python scripts.","Testing, designing, and documenting APIs rapidly.","Configuring physical routers via serial cables.","Bypassing network security firewalls."],"question_en":"What is Postman primarily used for in network automation?","question_th":"Postman ถูกนำมาใช้งานเพื่อวัตถุประสงค์หลักใดในการทำงานอัตโนมัติของเครือข่าย?","correct_index":1,"explanation_en":"Postman is an industry-standard tool used for testing, designing, and documenting APIs.","explanation_th":"Postman เป็นเครื่องมือมาตรฐานในอุตสาหกรรมที่ใช้ในการทดสอบ ออกแบบ และทำเอกสารประกอบ API","options_th":["การเขียนสคริปต์ Python ที่ใช้งานจริงในระบบ Production","การทดสอบ ออกแบบ และจัดทำเอกสาร API อย่างรวดเร็ว","การตั้งค่าเราเตอร์จริงผ่านสาย Serial","การหลีกเลี่ยงไฟร์วอลล์รักษาความปลอดภัยเครือข่าย"]},{"options":["2xx","3xx","4xx","5xx"],"question_en":"Which HTTP Status Code range indicates a client-side error (e.g., unauthorized or not found)?","question_th":"ช่วงของรหัสสถานะ HTTP (HTTP Status Code) ใดที่บ่งชี้ถึงข้อผิดพลาดฝั่งไคลเอนต์ (เช่น ไม่มีสิทธิ์ หรือไม่พบหน้า)?","correct_index":2,"explanation_en":"4xx status codes (such as 401 Unauthorized or 404 Not Found) indicate client-side errors.","explanation_th":"รหัสสถานะ 4xx (เช่น 401 Unauthorized หรือ 404 Not Found) บ่งชี้ถึงข้อผิดพลาดฝั่งไคลเอนต์","options_th":["2xx (สำเร็จ)","3xx (การเปลี่ยนเส้นทาง)","4xx (ข้อผิดพลาดของไคลเอนต์)","5xx (ข้อผิดพลาดของเซิร์ฟเวอร์)"]},{"options":["Environments","Collections","Request Builder","Response Window"],"question_en":"What feature in Postman allows grouping and saving multiple API requests for reuse?","question_th":"ฟีเจอร์ใดใน Postman ที่อนุญาตให้จัดกลุ่มและบันทึกรายการคำขอ API หลายๆ ตัวเพื่อนำกลับมาใช้ซ้ำ?","correct_index":1,"explanation_en":"Collections allow users to group and save multiple API requests for organized workflows.","explanation_th":"Collections ช่วยให้ผู้ใช้สามารถจัดกลุ่มและบันทึกคำขอ API หลายๆ ตัวเพื่อให้ขั้นตอนการทำงานเป็นระเบียบเรียบร้อย","options_th":["สภาพแวดล้อม (Environments)","คอลเลกชัน (Collections)","เครื่องมือสร้างคำขอ (Request Builder)","หน้าต่างแสดงผลลัพธ์ (Response Window)"]},{"options":["Hardcoding the IP inside each request URL.","Using Environment Variables.","Creating a new collection for every device.","Editing the host file on the local computer."],"question_en":"What is the recommended way to handle device IP addresses dynamically in Postman?","question_th":"วิธีแนะนำในการจัดการที่อยู่ IP ของอุปกรณ์แบบไดนามิกใน Postman คืออะไร?","correct_index":1,"explanation_en":"Environment variables in Postman allow dynamically swapping values like device IP addresses and API tokens.","explanation_th":"ตัวแปรสภาพแวดล้อม (Environment variables) ใน Postman ช่วยให้สามารถสลับเปลี่ยนค่าต่างๆ เช่น IP ของอุปกรณ์และ API token ได้แบบไดนามิก","options_th":["การฮาร์ดโค้ด IP ไว้ใน URL ของแต่ละ request","การใช้ Environment Variables (ตัวแปรสภาพแวดล้อม)","การสร้าง collection ใหม่สำหรับอุปกรณ์ทุกเครื่อง","การแก้ไขไฟล์ host บนเครื่องคอมพิวเตอร์"]},{"options":["200 OK","401 Unauthorized","404 Not Found","500 Internal Server Error"],"question_en":"Which HTTP Status Code indicates that a request was processed successfully?","question_th":"รหัสสถานะ HTTP (HTTP Status Code) ใดที่บ่งชี้ว่าคำขอได้รับการประมวลผลสำเร็จ?","correct_index":0,"explanation_en":"2xx status codes (e.g., 200 OK) represent success.","explanation_th":"รหัสสถานะช่วง 2xx (เช่น 200 OK) แสดงถึงความสำเร็จในการดำเนินการ","options_th":["200 OK (สำเร็จ)","401 Unauthorized (ไม่ได้รับอนุญาต)","404 Not Found (ไม่พบ)","500 Internal Server Error (ข้อผิดพลาดภายในเซิร์ฟเวอร์)"]}]}', NULL),
	('lesson-ccna003-02', 'ccna-003', 'Static Routing', 'Static Routing', '## Static Routing

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการตั้งค่าเส้นทางแบบ Manual (Static Route) ซึ่งเหมาะสำหรับเครือข่ายขนาดเล็กหรือการกำหนดเส้นทางพิเศษ

**เนื้อหาหลัก**
- คำสั่ง: `ip route <Destination Network> <Subnet Mask> <Next-Hop IP หรือ Exit Interface>`
- **Default Route:** `ip route 0.0.0.0 0.0.0.0 <Next-Hop>` ส่งทุก Traffic ที่ไม่รู้จะไปไหนออก Gateway
- **Floating Static Route:** ตั้ง AD สูงกว่า Dynamic Protocol เพื่อทำ Backup Route
- ข้อดี: คาดเดาได้, ปลอดภัย, ไม่กิน CPU/Bandwidth
- ข้อเสีย: ต้องตั้งค่า Manual ทุกเส้นทาง ไม่ Scale ได้ในเครือข่ายใหญ่

**สรุป**
Static Route เหมาะสำหรับ Edge Router ที่ต่อออก ISP หรือ Stub Network ที่มีทางออกทางเดียว', '## Static Routing

**What you will learn in this video**
This video teaches Manual route configuration (Static Route), ideal for small networks or specifying special routes.

**Core Content**
- Command: `ip route <Destination Network> <Subnet Mask> <Next-Hop IP or Exit Interface>`
- **Default Route:** `ip route 0.0.0.0 0.0.0.0 <Next-Hop>` sends all unknown traffic out the Gateway.
- **Floating Static Route:** Sets a higher AD than Dynamic Protocols to act as a Backup Route.
- Advantages: Predictable, secure, uses zero CPU/Bandwidth.
- Disadvantages: Requires manual configuration for every route; does not scale in large networks.

**Conclusion**
Static Routing is perfect for Edge Routers connecting to an ISP or Stub Networks with only one way out.', 'video', 38, 2, 'https://www.youtube.com/watch?v=YCv4-_sMvYE&t=1383s', '/images/thumbnails/lesson-ccna003-02.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["It automatically adapts to network topology changes.","It uses no router CPU processing and link bandwidth for advertisements.","It is easier to configure in very large networks.","It automatically calculates the best path metric."],"question_en":"What is a major advantage of Static Routing over Dynamic Routing?","question_th":"ข้อดีที่สำคัญของการจัดเส้นทางแบบคงที่ (Static Routing) เมื่อเทียบกับแบบไดนามิกคืออะไร?","correct_index":1,"explanation_en":"Static routes do not send periodic routing updates, reducing CPU overhead and saving link bandwidth.","explanation_th":"การตั้งค่าเส้นทางแบบคงที่ไม่จำเป็นต้องส่งสัญญาณอัปเดตหากัน จึงไม่มี CPU overhead และประหยัดแบนด์วิดท์","options_th":["โดยจะปรับให้เข้ากับการเปลี่ยนแปลงโทโพโลยีเครือข่ายโดยอัตโนมัติ","ไม่ใช้ CPU และแบนด์วิธของลิงก์เพื่อส่งประกาศเส้นทาง","กำหนดค่าได้ง่ายกว่าในเครือข่ายขนาดใหญ่มาก","โดยจะคำนวณเมตริกเส้นทางที่ดีที่สุดโดยอัตโนมัติ"]},{"options":["ip route 10.0.0.0 255.255.255.0 192.168.1.1","route add 10.0.0.0 mask 255.255.255.0 192.168.1.1","ip route 192.168.1.1 10.0.0.0 255.255.255.0","router static 10.0.0.0/24 192.168.1.1"],"question_en":"What is the command to configure a static route to the network 10.0.0.0/24 via the next-hop IP 192.168.1.1?","question_th":"คำสั่งในการกำหนดเส้นทางคงที่ไปยังเครือข่าย 10.0.0.0/24 ผ่านไอพีปลายทางถัดไป 192.168.1.1 คือข้อใด?","correct_index":0,"explanation_en":"The syntax for a static route is: ''ip route <destination-network> <subnet-mask> <next-hop-ip | exit-interface>''.","explanation_th":"รูปแบบไวยากรณ์คือ ''ip route <เครือข่ายปลายทาง> <ซับเน็ตมาสก์> <ไอพีเพื่อนบ้าน/หรือพอร์ตขาออก>''","options_th":["ip route 10.0.0.0 255.255.255.0 192.168.1.1","route add 10.0.0.0 mask 255.255.255.0 192.168.1.1","ip route 192.168.1.1 10.0.0.0 255.255.255.0","router static 10.0.0.0/24 192.168.1.1"]},{"options":["A static route configured to use loopback interface.","A backup static route configured with an Administrative Distance higher than the primary routing protocol.","A route that automatically changes its IP addressing.","A temporary route created during network testing."],"question_en":"What is a Floating Static Route?","question_th":"Floating Static Route คืออะไร?","correct_index":1,"explanation_en":"A floating static route acts as a backup path. It is created by setting an AD higher than the primary path, so it only enters the routing table if the primary path fails.","explanation_th":"คือเส้นทางสำรองที่ตั้งค่า AD ไว้สูงกว่าค่าจัดเส้นทางหลัก (เช่น 120 เพื่อสำรองให้ OSPF 110) ทำให้ทำงานเฉพาะเมื่อระบบหลักล่ม","options_th":["เส้นทางแบบคงที่ที่กำหนดค่าให้ใช้อินเทอร์เฟซแบบย้อนกลับ","Static Route สำรองที่มี AD สูงกว่าเส้นทางหลัก","เส้นทางที่เปลี่ยนที่อยู่ IP โดยอัตโนมัติ","เส้นทางชั่วคราวที่สร้างขึ้นระหว่างการทดสอบเครือข่าย"]},{"options":["ip route 10.0.0.0 255.255.255.0 192.168.1.1 50","ip route 10.0.0.0 255.255.255.0 192.168.1.1 120","ip route 10.0.0.0 255.255.255.0 192.168.1.1","ip route floating 10.0.0.0 255.255.255.0 192.168.1.1"],"question_en":"Which command creates a floating static route to serve as a backup to OSPF (default AD 110)?","question_th":"คำสั่งใดสร้าง Floating Static Route เพื่อเป็นทางสำรองให้กับระบบหลักอย่าง OSPF (AD เริ่มต้น 110)?","correct_index":1,"explanation_en":"By adding ''120'' to the end of the ''ip route'' command, you set the AD higher than OSPF''s 110, creating a floating backup.","explanation_th":"การแนบตัวเลข ''120'' ท้ายสุดจะเป็นการระบุ AD ของเส้นทางนั้นให้สูงกว่า 110 (OSPF) เพื่อเก็บพับไว้ทำงานเป็นวงสำรองขากลับ","options_th":["ip route 10.0.0.0 255.255.255.0 192.168.1.1 50","ip route 10.0.0.0 255.255.255.0 192.168.1.1 120","ip route 10.0.0.0 255.255.255.0 192.168.1.1","ip route floating 10.0.0.0 255.255.255.0 192.168.1.1"]},{"options":["A static route to a network subnet mask of 255.255.255.255.","A route that only routes local management traffic.","A default route.","A route that redirects traffic back to the local host loopback."],"question_en":"What is a static host route?","question_th":"Static Host Route คืออะไร?","correct_index":0,"explanation_en":"A static host route is configured to direct traffic to a single specific IP address, using a subnet mask of 255.255.255.255 (/32).","explanation_th":"คือการล็อคการนำส่งข้อมูลเฉพาะเจาะจงลงไปยังเครื่องปลายทางเครื่องเดียว โดยระบุหน้ากากเป็น 255.255.255.255 (/32)","options_th":["เส้นทางแบบคงที่ไปยังซับเน็ตมาสก์เครือข่าย 255.255.255.255","เส้นทางที่กำหนดเส้นทางการรับส่งข้อมูลการจัดการในพื้นที่เท่านั้น","เส้นทางเริ่มต้น","เส้นทางที่เปลี่ยนเส้นทางการรับส่งข้อมูลกลับไปยังโลคัลโฮสต์ลูปแบ็ค"]}]}', NULL),
	('lesson-ccna004-03', 'ccna-004', 'MPLS และ VPN', 'MPLS and VPN', '## MPLS และ VPN

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้อธิบายหลักการทำงานของ MPLS ซึ่งเป็นกระดูกสันหลังของเครือข่าย ISP ระดับโลก

**เนื้อหาหลัก**
- **MPLS Labels:** แทนที่การค้นหาตาม IP ด้วย Label เพื่อความเร็วสูงสุด
- **LSR (Label Switching Router):** Router ที่ส่งข้อมูลด้วย Label แทน Routing Table
- **MPLS VPN (L3VPN):** ให้ลูกค้าหลายรายใช้โครงสร้าง MPLS เดียวกัน โดยแยก Traffic ด้วย VRF (Virtual Routing and Forwarding)
- ข้อดี: Low Latency, QoS ที่แน่นอน, รองรับ Traffic Engineering

**สรุป**
MPLS เป็นเทคโนโลยีเบื้องหลังของ Enterprise WAN ระดับสูง ช่วยให้ ISP ให้บริการ Guaranteed SLA ในด้าน Latency และ Bandwidth ได้', '## MPLS and VPN

**What you will learn in this video**
This video explains the principles of MPLS, the backbone of global ISP networks.

**Core Content**
- **MPLS Labels:** Replaces IP lookups with Labels for maximum speed.
- **LSR (Label Switching Router):** A router that forwards data using Labels instead of a Routing Table.
- **MPLS VPN (L3VPN):** Allows multiple clients to share the same MPLS infrastructure by separating traffic using VRF (Virtual Routing and Forwarding).
- Advantages: Low Latency, guaranteed QoS, supports Traffic Engineering.

**Conclusion**
MPLS is the underlying technology of high-end Enterprise WANs, allowing ISPs to provide Guaranteed SLAs for Latency and Bandwidth.', 'video', 60, 3, 'https://www.youtube.com/watch?v=T0k2-n4q8pM', '/images/thumbnails/lesson-ccna004-03.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["Routing based on MAC addresses.","Appending short, fixed-length labels to packets and switching based on those labels.","Encrypting all packet payloads.","Enforcing high-speed dial-up connections."],"question_en":"What is the primary mechanism MPLS uses to accelerate traffic forwarding?","question_th":"กลไกสำคัญใดที่ MPLS นำมาใช้เพื่อให้กระบวนการส่งต่อข้อมูลเป็นไปอย่างรวดเร็วเป็นพิเศษ?","correct_index":1,"explanation_en":"MPLS inserts a label header into packets. Routers switch packets based on the label values rather than executing complex IP routing lookups.","explanation_th":"MPLS จะแทรกแผ่นฉลาก (Label) ขนาดสั้นลงในแพ็กเก็ต และใช้วิธีจัดส่งแบบสลับป้ายชื่อซึ่งใช้เวลาน้อยกว่าการค้นหาไอพี","options_th":["การกำหนดเส้นทางตามที่อยู่ MAC","ติด Label คงที่แล้วส่งต่อ Packet ตาม Label","กำลังเข้ารหัสเพย์โหลดแพ็กเก็ตทั้งหมด","การบังคับใช้การเชื่อมต่อผ่านสายโทรศัพท์ความเร็วสูง"]},{"options":["To switch labeled packets within the provider core only.","To push labels onto incoming packets at the ingress edge and pop labels at the egress edge.","To protect the network from DDoS attacks.","To assign local DHCP addresses."],"question_en":"In MPLS, what is the role of the Label Edge Router (LER)?","question_th":"ในระบบ MPLS เร้าเตอร์ที่เป็น LER (Label Edge Router) จะทำหน้าที่อะไร?","correct_index":1,"explanation_en":"The LER is positioned at the edge of the MPLS network. It adds (pushes) labels to incoming IP packets and removes (pops) them as they leave the MPLS core.","explanation_th":"LER ทำหน้าที่อยู่ตรงขอบชายแดนเครือข่าย โดยคอยแปะป้าย (Push) ให้ข้อมูลขาเข้า และแกะป้ายออก (Pop) เมื่อข้อมูลจะวิ่งออกไปหาลูกค้า","options_th":["เพื่อสลับแพ็กเก็ตที่มีป้ายกำกับภายในแกนผู้ให้บริการเท่านั้น","เพื่อส่งฉลากไปยังแพ็กเก็ตขาเข้าที่ขอบทางเข้าและป๊อปฉลากที่ขอบทางออก","เพื่อปกป้องเครือข่ายจากการโจมตี DDoS","เพื่อกำหนดที่อยู่ DHCP ในเครื่อง"]},{"options":["LDP (Label Distribution Protocol)","BGP","OSPF","RIP"],"question_en":"Which protocol is commonly used in MPLS networks to distribute labels between routers?","question_th":"โปรโตคอลใดที่นิยมนำมาใช้งานในโครงข่าย MPLS เพื่อทำการกระจายแจกจ่ายหมายเลขป้ายฉลาก (Label) ระหว่างเร้าเตอร์?","correct_index":0,"explanation_en":"Label Distribution Protocol (LDP) is used by MPLS routers to exchange label-to-FEC bindings.","explanation_th":"Label Distribution Protocol (LDP) ใช้แลกเปลี่ยนและกระจายหมายเลขฉลากของแต่ละเส้นทางให้เร้าเตอร์ตัวอื่นได้รับทราบ","options_th":["LDP","BGP","OSPF","RIP"]},{"options":["Layer 2 VPN routes traffic; Layer 3 VPN switches traffic.","Layer 2 VPN makes the provider network look like a virtual switch/link to the customer; Layer 3 VPN involves the provider routing customer IP packets.","Layer 2 VPN is slower than Layer 3 VPN.","Layer 2 VPN uses IPsec; Layer 3 VPN uses SSL."],"question_en":"What is the difference between a Layer 2 VPN and a Layer 3 VPN in an MPLS network?","question_th":"ข้อแตกต่างระหว่างบริการ Layer 2 VPN และ Layer 3 VPN บนระบบเครือข่าย MPLS คือข้อใด?","correct_index":1,"explanation_en":"In a Layer 2 VPN, customer sites are bridged at Layer 2 (like a virtual switch). In a Layer 3 VPN, the customer routers peer with the provider edge (PE) routers to exchange routing tables.","explanation_th":"L2 VPN จะเชื่อมสาขาฝั่งลูกค้าเข้าหากันประหนึ่งเสียบเข้าสวิตช์เสมือนเดียวกัน ส่วน L3 VPN ทางค่ายเน็ตจะร่วมแลกเปลี่ยนเส้นทาง IP เครือข่ายด้วย","options_th":["การรับส่งข้อมูลเส้นทาง VPN เลเยอร์ 2; VPN เลเยอร์ 3 สลับการรับส่งข้อมูล","L2 VPN จำลอง Link ส่วน L3 VPN ให้ผู้ให้บริการ Route IP","VPN เลเยอร์ 2 ช้ากว่า VPN เลเยอร์ 3","VPN เลเยอร์ 2 ใช้ IPsec; VPN เลเยอร์ 3 ใช้ SSL"]},{"options":["Inside the IP header.","Between the Layer 2 header and the Layer 3 header (shim header).","Inside the TCP payload.","At the end of the frame trailer."],"question_en":"Where does the MPLS label sit in the protocol stack?","question_th":"ตำแหน่งข้อมูลของป้ายชื่อ (MPLS label) แทรกตัวอยู่ตรงช่วงใดของโปรโตคอลแสต็ก?","correct_index":1,"explanation_en":"The MPLS label is a ''shim'' header inserted between the Layer 2 (Data Link) header and the Layer 3 (Network) header.","explanation_th":"ป้ายฉลาก MPLS จะแทรกอยู่ระหว่างส่วนหัว Layer 2 (MAC header) และส่วนหัว Layer 3 (IP header) ซึ่งมักถูกแซวว่าเป็นเลเยอร์ 2.5","options_th":["ภายในส่วนหัว IP","ระหว่าง Header Layer 2 และ Layer 3","ภายในเพย์โหลด TCP","ในตอนท้ายของรถพ่วงเฟรม"]}]}', NULL),
	('devnet-004-lesson-3', 'devnet-004', 'การใช้ Python Requests', 'Python Requests Library', '## การใช้ Python Requests
**สิ่งที่จะได้เรียนในคลิปนี้**
วิธีการใช้งานไลบรารี `requests` ในภาษา Python เพื่อส่งคำสั่ง HTTP Request และจัดการข้อมูลระดับโปรแกรม เพื่อเริ่มต้นทำ Network Automation

**เนื้อหาหลัก**

**Python Requests: ไลบรารีมาตรฐานที่เป็นมิตรต่อผู้ใช้งาน สำหรับทำ HTTP Operations ทุกประเภท**

**องค์ประกอบสำคัญในการใช้งาน:**
- requests.get(): ฟังก์ชันสำหรับการดึงข้อมูล (Read)
- requests.post(): ฟังก์ชันสำหรับสร้างหรือส่งข้อมูล (Create)
- response.json(): เมธอดสำหรับแปลงข้อมูลจากเซิร์ฟเวอร์ให้อยู่ในรูป Python Dictionary

**เทคนิคการรับส่งข้อมูล (Data Handling):**
- Headers: ใช้กำหนดค่าต่างๆ เช่น `{''Content-Type'': ''application/json''}` และ Authorization Token
- Payloads (Data/JSON): การส่งข้อมูลแนบไปกับ request โดยมักใช้พารามิเตอร์ `json=payload` แทนการแปลง string เอง
- SSL Verification: การข้ามการตรวจสอบ Certificate (verify=False) สำหรับอุปกรณ์เครือข่ายภายในองค์กร

**ขั้นตอนการทำงาน (Workflow):**
- Authentication: ยิง Request ไปยังเซิร์ฟเวอร์เพื่อขอ Token
- Execution: นำ Token ที่ได้ไปแนบใน Header เพื่อขอแก้ไขคอนฟิกของสวิตช์หรือเราเตอร์

**ข้อควรระวัง**
เมื่อปิดการตรวจสอบ SSL ด้วย `verify=False` โปรแกรมจะแจ้งเตือน InsecureRequestWarning ซึ่งควรจัดการผ่านแพ็กเกจ `urllib3` หากต้องการซ่อนการแจ้งเตือน

**สรุป**
ไลบรารี `requests` เป็นเครื่องมือพื้นฐานที่ทรงพลังที่สุดในการทำ Network Programmability ช่วยให้คุณแปลงสิ่งที่ทดสอบใน Postman ออกมาเป็นโค้ดอัตโนมัติได้อย่างรวดเร็ว', '## Python Requests Library
**What You Will Learn**
How to implement the Python `requests` library to send HTTP requests, handle authentication, and parse API responses to build automated network scripts.

**Main Content**

**Python Requests: An elegant and simple HTTP library for Python, built for human beings.**

**Core Functions:**
- requests.get(): Fetch information from a specific endpoint.
- requests.post(): Submit a payload to create a new resource or authenticate.
- response.json(): Automatically parse a JSON formatted response into a Python Dictionary.

**Advanced Request Handling:**
- Custom Headers: Inject metadata like `{''Content-Type'': ''application/json''}` and Authentication tokens into your requests.
- JSON Payloads: Pass dictionaries directly via the `json=` parameter to safely serialize data without manual conversion.
- SSL Verification: Temporarily bypass strict certificate validation using `verify=False` for lab network environments.

**Typical Automation Workflow:**
- Authentication: Perform an initial request to acquire a session ID or Bearer token.
- Execution: Utilize the acquired token in the headers of subsequent requests to push network configurations.

**Important Note**
Setting `verify=False` will trigger an `InsecureRequestWarning`. While acceptable in labs, production environments should ideally use valid certificates or suppress the warning explicitly via `urllib3`.

**Conclusion**
The `requests` library is the most essential tool for Network Programmability in Python, seamlessly translating Postman tests into fully automated, repeatable code.', 'video', 13, 3, 'https://www.youtube.com/watch?v=XqIfWkVI3UA', NULL, NULL, '2026-07-14 02:27:54.182875+00', '2026-07-14 02:27:54.182875+00', '{"questions":[{"options":["socket","requests","netmiko","json"],"question_en":"Which library is commonly used in Python to send HTTP requests in network scripts?","question_th":"ไลบรารีใดที่นิยมใช้ในภาษา Python เพื่อส่งคำขอ HTTP ในสคริปต์เครือข่าย?","correct_index":1,"explanation_en":"The Python ''requests'' library is used to interact with REST APIs by sending HTTP requests easily.","explanation_th":"ไลบรารี ''requests'' ของ Python ใช้สำหรับโต้ตอบกับ REST API โดยการส่งคำขอ HTTP ได้อย่างง่ายดาย","options_th":["socket (ซ็อกเก็ต - เครือข่ายระดับต่ำ)","requests (ส่งคำขอ HTTP - ใช้งานง่าย)","netmiko (เน็ตไมโกะ - อุปกรณ์เครือข่าย)","json (เจสัน - จัดการข้อมูล JSON)"]},{"options":["Using response.json() method","Using response.text.split()","Using json.load(response.headers)","Using dict(response)"],"question_en":"How can you parse a JSON-formatted HTTP response into a Python dictionary?","question_th":"คุณจะแปลงการตอบกลับ HTTP ในรูปแบบ JSON ให้เป็น Dictionary ของ Python ได้อย่างไร?","correct_index":0,"explanation_en":"The response.json() method automatically deserializes a JSON payload into a Python dictionary.","explanation_th":"เมธอด response.json() จะทำการแปลงข้อมูล JSON จากการตอบกลับให้เป็น Dictionary ใน Python โดยอัตโนมัติ","options_th":["ใช้ response.json()","ใช้ response.text.split()","ใช้ json.load(response.headers)","ใช้ dict(response)"]},{"options":["data=","json=","payload=","params="],"question_en":"What parameter is used in requests.post() to send a Python dictionary as a JSON payload?","question_th":"พารามิเตอร์ใดใน requests.post() ที่ใช้ส่ง Dictionary ของ Python เป็นข้อมูล Payload แบบ JSON?","correct_index":1,"explanation_en":"The json= parameter automatically serializes a Python dictionary into a JSON string and sets the Content-Type header.","explanation_th":"พารามิเตอร์ json= จะแปลง Dictionary ใน Python เป็นสตริง JSON และตั้งค่า Content-Type ใน Header ให้โดยอัตโนมัติ","options_th":["data=","json=","payload=","params="]},{"options":["It disables SSL certificate verification, making the connection vulnerable to Man-in-the-Middle attacks.","It slows down the network request significantly.","It blocks the script from executing.","It prevents the use of JSON payloads."],"question_en":"What is the security risk of setting verify=False in requests?","question_th":"ความเสี่ยงด้านความปลอดภัยของการตั้งค่า verify=False ใน requests คืออะไร?","correct_index":0,"explanation_en":"Setting verify=False disables SSL validation, allowing the script to proceed in lab environments but exposing it to interception in production.","explanation_th":"การตั้งค่า verify=False จะปิดการตรวจสอบใบรับรอง SSL ซึ่งช่วยให้รันสคริปต์ในแล็บได้ แต่ทำให้เสี่ยงต่อการถูกดักจับข้อมูลในระบบใช้งานจริง","options_th":["ปิดการตรวจ SSL ทำให้เสี่ยงถูกโจมตีแบบ Man-in-the-Middle","ทำให้คำขอบนเครือข่ายทำงานช้าลงอย่างมีนัยสำคัญและเห็นได้ชัดเจน","บล็อกไม่ให้สคริปต์สามารถดำเนินการทำงานต่อไปได้","ป้องกันการใช้งาน JSON payload ในการส่งคำขอไปยังเซิร์ฟเวอร์"]},{"options":["requests.post()","requests.get()","requests.put()","requests.delete()"],"question_en":"Which requests method is used to retrieve data from a device?","question_th":"เมธอดใดใน requests ที่ใช้ในการดึงข้อมูลจากอุปกรณ์?","correct_index":1,"explanation_en":"requests.get() sends an HTTP GET request to fetch data.","explanation_th":"requests.get() ส่งคำขอ HTTP GET เพื่อดึงข้อมูล","options_th":["requests.post()","requests.get()","requests.put()","requests.delete()"]}]}', NULL),
	('devnet-004-lesson-4', 'devnet-004', 'การควบคุม Cisco DNA Center ผ่าน REST API', 'Cisco DNA Center REST API', '## การควบคุม Cisco DNA Center ผ่าน REST API
**สิ่งที่จะได้เรียนในคลิปนี้**
นำความรู้ทั้งหมดมาประยุกต์ใช้กับระบบจริง เรียนรู้วิธีการเชื่อมต่อและดึงข้อมูลสถานะเครือข่ายจาก Cisco DNA Center (Catalyst Center) ผ่าน REST API

**เนื้อหาหลัก**

**Cisco DNA Center Intent-based API: ศูนย์กลางการควบคุมและการจัดการเครือข่ายองค์กรสมัยใหม่ด้วย API**

**กระบวนการทำงานหลัก (API Flow):**
- Authentication API: การส่ง Basic Auth ไปยัง `/dna/system/api/v1/auth/token` เพื่อรับ Token (X-Auth-Token)
- Network Device API: การส่ง Token ไปขอรายการอุปกรณ์เครือข่ายพร้อมสถานะ
- Client Health API: ตรวจสอบประสิทธิภาพและการเชื่อมต่อของผู้ใช้งานในระบบ

**การทำงานร่วมกับ Resource:**
- Device Inventory: ดึงรายชื่อ Switch, Router และ Access Point ทั้งหมดในระบบ
- Topology: ดูแผนผังการเชื่อมต่อระหว่างอุปกรณ์
- Command Runner: สั่งรันคำสั่ง CLI ไปยังอุปกรณ์จำนวนมากแบบอัตโนมัติผ่าน API

**หน้าที่ของ DNA Center API:**
- Automation: เปลี่ยนแปลงการตั้งค่าเครือข่ายโดยไม่ต้องล็อกอินเข้าอุปกรณ์ทีละตัว
- Monitoring & Assurance: ส่งข้อมูลสถานะอุปกรณ์เข้าสู่ระบบ Dashboard ขององค์กรแบบ Real-time

**ข้อควรระวัง**
Token ของ DNA Center มีวันหมดอายุ (โดยปกติคือ 1 ชั่วโมง) ต้องเขียนสคริปต์เพื่อขอ Token ใหม่หากต้องการรันสคริปต์ที่ใช้เวลานาน

**สรุป**
การควบคุม Cisco DNA Center ผ่าน API คือตัวอย่างที่ชัดเจนที่สุดของ SDN (Software-Defined Networking) ที่เปลี่ยนการจัดการเครือข่ายแบบดั้งเดิมไปสู่ระบบอัตโนมัติเต็มรูปแบบ', '## Cisco DNA Center REST API
**What You Will Learn**
Apply your API skills to a real-world enterprise controller by connecting, authenticating, and retrieving network telemetry from Cisco DNA Center (Catalyst Center).

**Main Content**

**Cisco DNA Center Intent-based API: The centralized management plane that simplifies enterprise network automation.**

**The Authentication Flow:**
- Token Retrieval: Send Basic Auth credentials to `/dna/system/api/v1/auth/token` to receive a temporary `X-Auth-Token`.
- Subsequent Requests: Pass the `X-Auth-Token` in the header of all subsequent API calls.
- Endpoint Polling: Query specific endpoints to gather device or client health metrics.

**Key API Capabilities:**
- Device Inventory: Retrieve a comprehensive list of all managed Switches, Routers, and Wireless Access Points.
- Topology & Discovery: Map out the physical and logical connections between devices automatically.
- Command Runner: Execute read-only CLI commands across thousands of devices simultaneously via REST.

**Roles in Network Engineering:**
- Provisioning Automation: Programmatically deploy golden software images or configuration templates without manual CLI interaction.
- Assurance Integration: Feed real-time telemetry from DNA Center directly into custom IT dashboards or ITSM tools like ServiceNow.

**Important Note**
The DNA Center `X-Auth-Token` is temporary and typically expires after one hour. Enterprise scripts must handle token expiration and automatic renewal dynamically.

**Conclusion**
Automating Cisco DNA Center via its REST APIs embodies the ultimate goal of Software-Defined Networking (SDN), drastically reducing operational overhead in enterprise environments.', 'video', 30, 4, 'https://www.youtube.com/watch?v=Luei0p-2h10', NULL, NULL, '2026-07-14 02:27:54.182875+00', '2026-07-14 02:27:54.182875+00', '{"questions":[{"options":["/dna/system/api/v1/auth/token","/api/v1/login","/dna/api/v1/session","/dna/system/api/v1/devices"],"question_en":"Which endpoint is used to retrieve an authentication token from Cisco DNA Center?","question_th":"Endpoint ใดใช้ในการรับโทเค็นการตรวจสอบสิทธิ์ (Authentication token) จาก Cisco DNA Center?","correct_index":0,"explanation_en":"To authenticate with Cisco DNA Center, clients send Basic Auth credentials to `/dna/system/api/v1/auth/token`.","explanation_th":"ในการตรวจสอบสิทธิ์กับ Cisco DNA Center ไคลเอนต์จะต้องส่งข้อมูลประจำตัว Basic Auth ไปยัง `/dna/system/api/v1/auth/token`","options_th":["/dna/system/api/v1/auth/token","/api/v1/login","/dna/api/v1/session","/dna/system/api/v1/devices"]},{"options":["Authorization","X-Auth-Token","Bearer-Token","Token"],"question_en":"What is the header key used to pass the authentication token in subsequent Cisco DNA Center API requests?","question_th":"คีย์ในส่วน Header ใดที่ใช้ส่งโทเค็นการตรวจสอบสิทธิ์ในคำขอ API ของ Cisco DNA Center ในครั้งถัดๆ ไป?","correct_index":1,"explanation_en":"Subsequent API requests to Cisco DNA Center must include the acquired token in the ''X-Auth-Token'' header.","explanation_th":"คำขอ API ไปยัง Cisco DNA Center ถัดจากนั้นจำเป็นต้องแนบโทเค็นที่ได้รับใน Header ที่ชื่อ ''X-Auth-Token''","options_th":["Authorization (ส่วนหัว HTTP)","X-Auth-Token (โทเค็นยืนยันตัวตน)","Bearer-Token (โทเค็นแบบ Bearer)","Token (โทเค็น)"]},{"options":["Writing Python scripts on the router directly.","Executing read-only CLI commands across multiple devices simultaneously.","Rebooting physical switches instantly.","Creating network topology diagrams automatically."],"question_en":"What capability does Command Runner offer via the Cisco DNA Center REST API?","question_th":"ฟังก์ชัน Command Runner ใน Cisco DNA Center REST API มอบความสามารถใด?","correct_index":1,"explanation_en":"Command Runner executes read-only CLI commands across thousands of managed devices simultaneously via REST.","explanation_th":"Command Runner ช่วยให้สามารถเรียกใช้งานคำสั่ง CLI แบบอ่านอย่างเดียว (Read-only) บนอุปกรณ์ที่อยู่ภายใต้การจัดการจำนวนมากได้พร้อมกันผ่าน REST API","options_th":["การเขียนสคริปต์ Python บนเราเตอร์โดยตรงเพื่อจัดการการกำหนดค่า","การรันคำสั่ง CLI แบบอ่านอย่างเดียวบนหลายอุปกรณ์พร้อมกัน","การรีบูตสวิตช์จริงทันทีโดยไม่ต้องมีการยืนยันเพิ่มเติม","การสร้างไดอะแกรมโทโพโลยีเครือข่ายโดยอัตโนมัติจากข้อมูลอุปกรณ์"]},{"options":["10 minutes","1 hour","24 hours","7 days"],"question_en":"How long does a Cisco DNA Center authentication token typically remain valid?","question_th":"โดยทั่วไปแล้ว โทเค็นการตรวจสอบสิทธิ์ของ Cisco DNA Center จะมีอายุใช้งานนานเท่าใด?","correct_index":1,"explanation_en":"The DNA Center X-Auth-Token is temporary and typically expires after one hour.","explanation_th":"X-Auth-Token ของ DNA Center เป็นโทเค็นชั่วคราวและโดยทั่วไปจะหมดอายุหลังจากผ่านไปหนึ่งชั่วโมง","options_th":["10 นาที","1 ชั่วโมง","24 ชั่วโมง","7 วัน"]},{"options":["Intent-based API","Legacy CLI API","Direct SNMP API","Netconf API"],"question_en":"Which API category simplifies intent-based network management in Cisco DNA Center?","question_th":"หมวดหมู่ API ใดที่ช่วยให้การจัดการเครือข่ายแบบอิงตามความต้องการ (Intent-based) ใน Cisco DNA Center ง่ายขึ้น?","correct_index":0,"explanation_en":"Cisco DNA Center exposes Intent-based APIs that simplify enterprise network automation.","explanation_th":"Cisco DNA Center เปิดบริการ Intent-based API ที่ช่วยลดความซับซ้อนในการทำเครือข่ายอัตโนมัติระดับองค์กร","options_th":["Intent-based API","API แบบ CLI รุ่นเก่า","API แบบ SNMP โดยตรง","API แบบ Netconf"]}]}', NULL),
	('lesson-adv002-03', 'adv-002', 'Unequal-Cost Load Balancing', 'Unequal-Cost Load Balancing', '## EIGRP Load Balancing

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการกระจายโหลด Traffic บน EIGRP ซึ่งเป็นหนึ่งในความสามารถพิเศษที่ทำให้ EIGRP โดดเด่น

**เนื้อหาหลัก**
- **Equal-Cost Load Balancing (ECMP):** เมื่อมีหลายเส้นทาง Metric เท่ากัน จะกระจาย Traffic ได้เลย (สูงสุด 4 เส้น Default)
- **Unequal-Cost Load Balancing:** ความสามารถพิเศษของ EIGRP ใช้คำสั่ง `variance <multiplier>`
  - `variance 2` หมายถึง อนุญาตเส้นทางที่ Metric ไม่เกิน 2 เท่าของ Successor เข้าร่วม Load Balance
- **Maximum Paths:** เพิ่มจำนวนเส้นทางสูงสุดด้วย `maximum-paths <N>` (สูงสุด 16)

**สรุป**
Unequal-cost Load Balancing ของ EIGRP เป็นคุณสมบัติที่ไม่มีใน OSPF ทำให้ใช้ประโยชน์จาก Link ความเร็วต่างกันได้อย่างเต็มประสิทธิภาพ', '## EIGRP Load Balancing

**What you will learn in this video**
This video teaches traffic load balancing in EIGRP, one of the unique features that makes EIGRP stand out.

**Core Content**
- **Equal-Cost Load Balancing (ECMP):** When multiple paths have the exact same metric, traffic is load-balanced immediately (up to 4 paths by default).
- **Unequal-Cost Load Balancing:** A unique capability of EIGRP, enabled using the `variance <multiplier>` command.
  - `variance 2` means it allows routes with a metric up to 2 times the Successor''s metric to participate in load balancing.
- **Maximum Paths:** Increase the maximum number of paths with `maximum-paths <N>` (up to 16).

**Conclusion**
Unequal-cost Load Balancing in EIGRP is a feature absent in OSPF, allowing networks to fully utilize links of differing speeds.', 'video', 5, 3, 'https://www.youtube.com/watch?v=tL0XoSnW7OA', '/images/thumbnails/lesson-adv002-03.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["variance <multiplier>","maximum-paths <number>","load-balance unequal","metric weights"],"question_en":"Which command is used to enable Unequal-Cost Load Balancing in EIGRP?","question_th":"คำสั่งใดที่ใช้เปิดทำงาน Unequal-Cost Load Balancing ใน EIGRP?","correct_index":0,"explanation_en":"The ''variance'' command, followed by a multiplier, permits EIGRP to load balance traffic over routes with different metrics.","explanation_th":"คำสั่ง ''variance'' ตามด้วยตัวคูณ จะช่วยให้ EIGRP สามารถทำโหลดบาลานซ์ทราฟฟิกบนเส้นทางที่มีค่าเมทริกต่างกันได้","options_th":["variance <multiplier>","maximum-paths <number>","load-balance unequal","metric weights"]},{"options":["0","1","2","4"],"question_en":"What is the default variance value in EIGRP?","question_th":"ค่าเริ่มต้นของตัวคูณ Variance ใน EIGRP คือเท่าใด?","correct_index":1,"explanation_en":"By default, the variance multiplier is set to 1, meaning only equal-cost routes are installed in the routing table.","explanation_th":"ค่าเริ่มต้นของ Variance ใน EIGRP คือ 1 ซึ่งหมายถึงจะทำโหลดบาลานซ์เฉพาะบนเส้นทางที่มีค่าใช้จ่ายเท่ากันเท่านั้น","options_th":["0","1","2","4"]},{"options":["It must have a metric lower than the primary successor path.","It must be a validated Feasible Successor.","It must use named configuration mode.","It must connect to Area 0."],"question_en":"To be eligible for Unequal-Cost Load Balancing, what condition must a backup path satisfy?","question_th":"เส้นทางสำรองต้องสอดคล้องกับเงื่อนไขใดเพื่อจะมีสิทธิ์เข้าร่วมทำโหลดบาลานซ์แบบ Unequal-Cost?","correct_index":1,"explanation_en":"To be used for unequal load balancing, a path must be a Feasible Successor (it must meet the Feasibility Condition).","explanation_th":"เส้นทางที่จะทำ unequal load balancing ได้ จะต้องได้รับการยอมรับเป็น Feasible Successor (ผ่านเกณฑ์ Feasibility Condition) ก่อนเท่านั้น","options_th":["จะต้องมีเมตริกต่ำกว่าเส้นทางหลักที่สืบทอดมา","ต้องเป็น Feasible Successor ที่ผ่านเงื่อนไข","ต้องใช้โหมดการกำหนดค่าที่มีชื่อ","จะต้องเชื่อมต่อกับพื้นที่ 0"]},{"options":["2","3","4","5"],"question_en":"If a successor path has a Feasible Distance of 10 and a candidate path has a Feasible Distance of 25, what minimum variance multiplier is required to load share traffic?","question_th":"หากเส้นทาง Successor มี FD เป็น 10 และเส้นทางสำรองมี FD เป็น 25 จะต้องกำหนดค่าตัวคูณ Variance ขั้นต่ำเท่าใดจึงจะทำโหลดบาลานซ์ได้?","correct_index":1,"explanation_en":"Variance multiplier * Successor FD >= Candidate FD. Thus, Variance * 10 >= 25. The smallest integer multiplier is 3.","explanation_th":"สูตรคือ ตัวคูณ Variance * Successor FD >= Candidate FD จะได้ Variance * 10 >= 25 ดังนั้นจำนวนเต็มที่น้อยที่สุดคือ 3","options_th":["2","3","4","5"]},{"options":["2","4","8","16"],"question_en":"What is the maximum number of paths EIGRP can load balance across by default on modern IOS?","question_th":"ค่าเริ่มต้นของจำนวนเส้นทางสูงสุด (Maximum paths) ที่ EIGRP สามารถใช้ทำโหลดบาลานซ์ได้ในระบบ Cisco IOS ปัจจุบันคือเท่าใด?","correct_index":1,"explanation_en":"By default, EIGRP will load balance over a maximum of 4 paths, although this can be configured higher using the ''maximum-paths'' command.","explanation_th":"ตามค่าเริ่มต้น EIGRP จะส่งข้อมูลโหลดบาลานซ์ได้สูงสุด 4 เส้นทาง แต่สามารถตั้งค่าให้สูงขึ้นได้ด้วยคำสั่ง ''maximum-paths''","options_th":["2","4","8","16"]}]}', NULL),
	('lesson-adv003-03', 'adv-003', 'BGP Path Attributes', 'BGP Path Attributes', '## BGP Attributes (คุณสมบัติของ BGP)

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้อธิบาย BGP Attributes ที่ใช้ในการตัดสินใจเลือกเส้นทางที่ดีที่สุด

**เนื้อหาหลัก**
- **Well-Known Mandatory:** ทุก Router ต้องรู้และส่งต่อ → AS-Path, Next-Hop, Origin
- **Well-Known Discretionary:** ทุก Router รู้แต่อาจไม่ส่ง → Local Preference (ค่า Default 100, สูงกว่า = ดีกว่า)
- **Optional Transitive:** ส่งต่อแม้ไม่รู้จัก → Community
- **Optional Non-Transitive:** ไม่ส่งต่อ → MED (Multi-Exit Discriminator)
- **BGP Best Path Selection Process:** 14 ขั้นตอนในการเลือกเส้นทาง เรียงตาม Weight → Local Pref → AS Path Length → ...

**สรุป**
BGP Attributes คือเครื่องมือหลักของ BGP Traffic Engineering การเข้าใจ Local Preference, AS-Path และ MED ช่วยควบคุมได้ว่า Traffic จะไปทิศทางไหน', '## BGP Attributes

**What you will learn in this video**
This video explains the BGP Attributes used to make the best path selection decisions.

**Core Content**
- **Well-Known Mandatory:** Every router must recognize and pass it on → AS-Path, Next-Hop, Origin.
- **Well-Known Discretionary:** Every router recognizes but may not pass on → Local Preference (Default is 100, higher = better).
- **Optional Transitive:** Passed on even if unrecognized → Community.
- **Optional Non-Transitive:** Not passed on → MED (Multi-Exit Discriminator).
- **BGP Best Path Selection Process:** A 14-step process to choose the best route, evaluated in order of Weight → Local Pref → AS Path Length → ...

**Conclusion**
BGP Attributes are the primary tools for BGP Traffic Engineering. Understanding Local Preference, AS-Path, and MED allows you to control traffic directions.', 'video', 11, 3, 'https://www.youtube.com/watch?v=ZZRsPcNllbU', '/images/thumbnails/lesson-adv003-03.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["AS_PATH","Local Preference","Weight","MED"],"question_en":"Which of the following BGP path attributes is proprietary to Cisco?","question_th":"คุณลักษณะของเส้นทาง BGP (BGP path attribute) ข้อใดที่เป็นเอกสิทธิ์ของ Cisco เท่านั้น?","correct_index":2,"explanation_en":"Weight is a Cisco-proprietary BGP attribute. It is configured locally on a single router and is not advertised to peers.","explanation_th":"Weight เป็นแอตทริบิวต์เฉพาะตัวของ Cisco โดยประมวลผลอยู่ภายในตัวอุปกรณ์นั้นตัวเดียว ไม่มีการส่งต่อไปยังเร้าเตอร์เพื่อนบ้านอื่น","options_th":["AS_PATH","Local Preference","Weight","MED"]},{"options":["Weight","Local Preference","MED (Multi-Exit Discriminator)","Origin"],"question_en":"What BGP path attribute is used to influence outbound traffic leaving an Autonomous System, and is propagated throughout the local AS?","question_th":"แอตทริบิวต์ BGP ใดที่ใช้จูงใจทราฟฟิกขาส่งออกไปนอก Autonomous System โดยมีการกระจายข่าวสารนี้ไปทั่วทั้ง AS ภายใน?","correct_index":1,"explanation_en":"Local Preference is used to select outbound paths from a local AS and is propagated to all iBGP peers inside that AS.","explanation_th":"Local Preference ใช้จัดระดับทราฟฟิกขาส่งออกจาก AS ท้องถิ่น โดยจะแลกเปลี่ยนและรู้กันเฉพาะกลุ่ม iBGP ภายในระบบเดียวกัน","options_th":["Weight","Local Preference","MED (Multi-Exit Discriminator)","Origin"]},{"options":["Weight","Local Preference","MED (Multi-Exit Discriminator)","AS_PATH"],"question_en":"Which attribute is sent to external AS peers to influence inbound traffic decisions on how they reach your networks?","question_th":"แอตทริบิวต์ใดที่ถูกส่งไปยังเร้าเตอร์ AS ภายนอกเพื่อกำหนดเส้นทางขากลับ (Inbound traffic) เข้าสู่เครือข่ายของเรา?","correct_index":2,"explanation_en":"MED (Multi-Exit Discriminator) is sent to external AS peers to suggest which entrance to use when sending traffic into your AS.","explanation_th":"MED (Multi-Exit Discriminator) ใช้ส่งออกไปยังเพื่อนบ้านภายนอกเพื่อบอกแนวทางเชื่อมต่อกลับมาว่าควรเข้ามาทางอินเตอร์เฟสใด","options_th":["Weight","Local Preference","MED (Multi-Exit Discriminator)","AS_PATH"]},{"options":["BGP drops updates if the AS_PATH is longer than 10 ASs.","A router will reject any BGP update if its own local AS number is present inside the AS_PATH.","BGP encrypts updates that cross AS boundaries.","BGP uses AS_PATH to calculate the OSPF cost."],"question_en":"How does BGP use the AS_PATH attribute to prevent routing loops?","question_th":"BGP นำแอตทริบิวต์ AS_PATH มาประยุกต์ใช้เพื่อป้องกันการเกิดลูปการส่งข้อมูล (Routing Loop) ได้อย่างไร?","correct_index":1,"explanation_en":"If a BGP router receives an update containing its own local AS number in the AS_PATH, it discards the update to prevent routing loops.","explanation_th":"หากเร้าเตอร์ BGP ได้รับข้อมูลเส้นทางที่มีหมายเลข AS ตัวเองปรากฏอยู่ในกลุ่มรายชื่อ AS_PATH มันจะโยนข้อมูลชิ้นนั้นทิ้งทันทีเพื่อกันข้อมูลเดินวนรอบ","options_th":["BGP จะยกเลิกการอัปเดตหาก AS_PATH ยาวกว่า 10 ASs","ปฏิเสธ Update เมื่อพบ AS ของตนใน AS_PATH","BGP เข้ารหัสการอัปเดตที่ข้ามขอบเขต AS","BGP ใช้ AS_PATH เพื่อคำนวณต้นทุน OSPF"]},{"options":["MED","Weight","AS_PATH","Local Preference"],"question_en":"Which of the following is considered a Well-Known Mandatory BGP attribute?","question_th":"แอตทริบิวต์ BGP ในข้อใดที่จัดอยู่ในกลุ่มประเภทรู้จักทั่วไปและต้องมีในทุกความเคลื่อนไหว (Well-Known Mandatory)?","correct_index":2,"explanation_en":"Well-known mandatory attributes, such as AS_PATH, ORIGIN, and NEXT_HOP, must be recognized by all BGP implementations and present in every update.","explanation_th":"แอตทริบิวต์ Well-known mandatory เช่น AS_PATH, ORIGIN และ NEXT_HOP เป็นสิ่งจำเป็นที่ตัวแทนระบบ BGP ทุกค่ายต้องสามารถตีความและใส่มาในทุกๆ รายงาน","options_th":["MED","Weight","AS_PATH","Local Preference"]}]}', NULL),
	('lesson-python-03', 'devnet-001', 'การใช้ NAPALM', 'Using NAPALM', '## Python REST API และ JSON

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
ทักษะ Python + REST API เป็นหัวใจของ Network Automation สมัยใหม่ ช่วยให้สร้าง Dashboard, Chatbot แจ้งเตือน หรือ Auto-remediation ได้', '## Python REST API and JSON

**What you will learn in this video**
This video teaches using Python to call Network Controller REST APIs (like DNA Center, Meraki) and handling JSON data.

**Core Content**
- **HTTP Requests with Python:** GET, POST, PUT, DELETE via the `requests` Library.
- **JSON Parsing:** Converting a JSON Response into Python Dictionaries and Lists for processing.
- **Authentication:** Basic Auth, Tokens, API Keys in Headers.
- **Example:**
  ```python
  import requests
  url = "https://sandboxdnac.cisco.com/dna/system/api/v1/auth/token"
  response = requests.post(url, auth=("devnetuser", "Cisco123!"))
  token = response.json()["Token"]
  ```
- **Error Handling:** Checking HTTP Status Codes before using data.

**Conclusion**
Python + REST API skills are the heart of modern Network Automation, enabling you to build Dashboards, notification Chatbots, or Auto-remediation systems.', 'video', 10, 3, 'https://www.youtube.com/watch?v=QTapxlSEo1E', '/images/thumbnails/lesson-python-03.jpg', NULL, '2026-05-18 10:02:06.461001+00', '2026-05-19 10:29:10.623729+00', '{"questions":[{"options":["A network scanning tool.","An API-based Python library that provides a unified, cross-vendor interface for retrieving network state and managing configurations.","A firewall operating system.","A database query engine."],"question_en":"What is NAPALM in network automation?","question_th":"NAPALM ในเทคโนโลยีระบบเครือข่ายอัตโนมัติคืออะไร?","correct_index":1,"explanation_en":"NAPALM (Network Automation and Programmability Abstraction Layer with Multi-vendor support) abstracts API/CLI commands into standard Python methods.","explanation_th":"NAPALM เป็นไลบรารีใน Python ที่สร้างโครงสร้างครอบการเรียกใช้คำสั่ง (Abstraction layer) ทำให้โค้ดเดียวคุมเครื่องต่างค่ายได้ง่ายขึ้น","options_th":["เครื่องมือสแกนเครือข่าย","NAPALM API ข้าม Vendor","ระบบปฏิบัติการไฟร์วอลล์","เอ็นจิ้นการสืบค้นฐานข้อมูล"]},{"options":["NAPALM is faster.","NAPALM uses ''getters'' that return standardized structured JSON data (dictionaries) across all supported vendors, rather than raw text.","NAPALM supports wireless signals.","NAPALM does not require an IP connection."],"question_en":"What is a major advantage of NAPALM over Netmiko for gathering device state details?","question_th":"ข้อดีที่เด่นชัดของการเลือกใช้ NAPALM แทนที่จะใช้ Netmiko ในการเรียกสืบค้นข้อมูลประวัติหรือสภาพเครื่องคืออะไร?","correct_index":1,"explanation_en":"NAPALM getters (like `get_facts()`) parse device outputs automatically and return standardized Python dictionaries, eliminating manual regex parsing.","explanation_th":"NAPALM มีฟังก์ชันเก็ตเตอร์ (Getters) ที่ดึงค่าตอบกลับแล้วจัดหมวดเรียงมาในรูปแบบไฟล์ดิชชั่นนารีของ Python ให้อัตโนมัติ","options_th":["นาปาล์มเร็วขึ้น","getters คืน JSON มาตรฐานข้าม Vendor","NAPALM รองรับสัญญาณไร้สาย","NAPALM ไม่ต้องการการเชื่อมต่อ IP"]},{"options":["get_system()","get_facts()","get_status()","retrieve_info()"],"question_en":"Which NAPALM method is used to retrieve basic system information from a device (such as serial number, model, and uptime)?","question_th":"เมธอดใดของ NAPALM ที่ใช้ดึงค่าสารสนเทศพื้นฐานระบบจากตัวอุปกรณ์ (เช่น หมายเลขซีเรียล รุ่นสินค้า และเวลาที่รันระบบ)?","correct_index":1,"explanation_en":"The ''get_facts()'' method returns a dictionary containing hostname, model, serial number, OS version, and interface list.","explanation_th":"เมธอด ''get_facts()'' จะทำการคืนค่าคุณลักษณะของอุปกรณ์ เช่น ยี่ห้อ รุ่น ระบบ OS และเวลาตั้งแต่เปิดเครื่องทำงาน","options_th":["get_system()","get_facts()","get_status()","retrieve_info()"]},{"options":["To discard current local changes.","To apply the staged/merged configuration changes to the active running configuration of the device.","To reboot the switch hardware.","To authenticate the SSH session."],"question_en":"In NAPALM, what is the purpose of the ''commit_config()'' method?","question_th":"ในระบบการจัดแจงของ NAPALM เมธอด ''commit_config()'' มีเป้าหมายเพื่อทำอะไร?","correct_index":1,"explanation_en":"NAPALM supports configuration staging. Changes are uploaded to a staging buffer first, and ''commit_config()'' writes them to active status.","explanation_th":"ใช้เพื่อตกลงเริ่มเขียนข้อมูลที่พักสะสมไว้ในบัฟเฟอร์การแก้ไข (Staged config) ดันใส่ลงในการตั้งค่าใช้งานหลักของเครือข่ายจริง","options_th":["หากต้องการละทิ้งการเปลี่ยนแปลงท้องถิ่นในปัจจุบัน","นำ Candidate Config ไปใช้กับ Running Config","เพื่อรีบูตฮาร์ดแวร์สวิตช์","เพื่อตรวจสอบสิทธิ์เซสชัน SSH"]},{"options":["discard_config()","rollback()","cancel_changes()","delete_config()"],"question_en":"Which NAPALM method discards loaded configurations that have not yet been committed?","question_th":"เมธอดใดของ NAPALM ที่ใช้ยกเลิกยกยอดการแก้ไขทั้งหมดที่พึ่งอัปโหลดแต่ยังไม่ได้กดยืนยัน (Commit)?","correct_index":0,"explanation_en":"The ''discard_config()'' method clears the staging buffer without modifying the device''s running configuration.","explanation_th":"เมธอด ''discard_config()'' ล้างลบไฟล์เตรียมแก้ทิ้งไปเสียเพื่อไม่ให้ส่งผลเสียไปรบกวนค่าที่อุปกรณ์กำลังทำงานอยู่","options_th":["discard_config()","rollback()","cancel_changes()","delete_config()"]}]}', NULL),
	('lesson-adv003-01', 'adv-003', 'BGP Overview และ AS Numbers', 'BGP Overview and AS Numbers', '## BGP Overview (ภาพรวม BGP)

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้แนะนำ BGP (Border Gateway Protocol) ซึ่งเป็น Routing Protocol ที่ขับเคลื่อนอินเทอร์เน็ตทั้งหมด

**เนื้อหาหลัก**
- BGP เป็น **EGP (Exterior Gateway Protocol)** ใช้เชื่อมระหว่าง AS (Autonomous System) ต่างๆ
- **AS Number:** หมายเลขประจำตัวของแต่ละองค์กรบนอินเทอร์เน็ต (เช่น AS7470 = TOT, AS9335 = AIS)
- **iBGP vs eBGP:** iBGP เชื่อม Router ภายใน AS เดียวกัน, eBGP เชื่อมระหว่าง AS ต่างกัน
- BGP ไม่ใช่ Protocol เร็ว แต่เป็น Protocol ที่ **ควบคุมได้และยืดหยุ่นมากที่สุด**
- ใช้ TCP Port 179 ไม่ใช้ Multicast แต่ต้อง Configure Neighbor แบบ Manual

**สรุป**
BGP เป็น Protocol ระดับ ISP ที่วิศวกรเครือข่ายขั้นสูงต้องรู้จัก เป็นพื้นฐานสำหรับ CCNP/CCIE และการทำงานจริงกับ ISP', '## BGP Overview

**What you will learn in this video**
This video introduces BGP (Border Gateway Protocol), the routing protocol that powers the entire Internet.

**Core Content**
- BGP is an **EGP (Exterior Gateway Protocol)** used to connect different AS (Autonomous Systems).
- **AS Number:** A unique identifier for each organization on the internet (e.g., AS7470 = TOT, AS9335 = AIS).
- **iBGP vs eBGP:** iBGP connects routers within the same AS, eBGP connects different ASs.
- BGP is not a fast protocol, but it is the **most controllable and flexible protocol**.
- Uses TCP Port 179, does not use Multicast, and neighbors must be configured manually.

**Conclusion**
BGP is an ISP-level protocol that advanced network engineers must know. It is foundational for CCNP/CCIE and real-world ISP operations.', 'video', 10, 1, 'https://www.youtube.com/watch?v=_Z29ZzKeZHc', '/images/thumbnails/lesson-adv003-01.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["Link State","Distance Vector","Path Vector","Hybrid"],"question_en":"What type of routing protocol is BGP?","question_th":"BGP จัดอยู่ในประเภทโปรโตคอลเร้าติ้งแบบใด?","correct_index":2,"explanation_en":"BGP is a Path Vector protocol that advertises the path history (AS_PATH attribute) of routes to destination networks.","explanation_th":"BGP เป็นโปรโตคอลการจัดเส้นทางประเภท Path Vector ซึ่งใช้วิธีบอกประวัติการส่งข้อมูลผ่าน AS_PATH ไปยังเครือข่ายปลายทาง","options_th":["Link State","Distance Vector","Path Vector","Hybrid"]},{"options":["1 - 64511","64512 - 65535","65536 - 4294967295","49152 - 65535"],"question_en":"What is the range of private AS Numbers (Autonomous System Numbers) under the 2-byte (16-bit) format?","question_th":"ช่วงหมายเลข AS ส่วนบุคคล (Private AS Numbers) ในรูปแบบ 2 ไบต์ (16 บิต) คือเท่าใด?","correct_index":1,"explanation_en":"For 16-bit AS numbers, the range 64512 through 65535 is reserved for private use.","explanation_th":"สำหรับหมายเลข AS ขนาด 16 บิต ช่วงตั้งแต่ 64512 ถึง 65535 จะถูกจองไว้สำหรับใช้งานส่วนบุคคล (Private AS)","options_th":["1 - 64511","64512 - 65535","65536 - 4294967295","49152 - 65535"]},{"options":["IEEE","IANA / RIRs","IETF","ISOC"],"question_en":"Which organization oversees the allocation of Autonomous System Numbers (ASNs)?","question_th":"หน่วยงานใดทำหน้าที่ดูแลและจัดสรรหมายเลข Autonomous System Number (ASN)?","correct_index":1,"explanation_en":"IANA manages the global pool of ASNs and delegates allocation to Regional Internet Registries (RIRs).","explanation_th":"IANA บริหารจัดการกลุ่มหมายเลข ASN ระดับโลก และมอบหมายหน้าที่การกระจายสิทธิ์ไปยังทะเบียนอินเทอร์เน็ตระดับภูมิภาค (RIRs)","options_th":["IEEE","IANA / RIRs","IETF","ISOC"]},{"options":["eBGP connects peers in the same AS; iBGP connects peers in different ASs.","eBGP connects peers in different ASs; iBGP connects peers in the same AS.","eBGP uses UDP; iBGP uses TCP.","eBGP has a higher administrative distance than iBGP."],"question_en":"What is the difference between eBGP and iBGP?","question_th":"ความแตกต่างระหว่าง eBGP และ iBGP คืออะไร?","correct_index":1,"explanation_en":"External BGP (eBGP) connects peers in different Autonomous Systems, whereas Internal BGP (iBGP) connects routers in the same AS.","explanation_th":"External BGP (eBGP) เชื่อมต่อเพื่อนบ้านที่อยู่ต่าง AS กัน ส่วน Internal BGP (iBGP) เชื่อมต่อภายใน AS เดียวกัน","options_th":["eBGP เชื่อมต่อเพียร์ใน AS เดียวกัน iBGP เชื่อมต่อเพียร์ใน AS ที่แตกต่างกัน","eBGP เชื่อมต่อเพื่อนใน AS ที่แตกต่างกัน iBGP เชื่อมต่อเพียร์ใน AS เดียวกัน","eBGP ใช้ UDP; iBGP ใช้ TCP","eBGP มีระยะการดูแลระบบที่สูงกว่า iBGP"]},{"options":["UDP Port 179","TCP Port 179","TCP Port 520","SCTP Port 179"],"question_en":"What transport layer protocol and port number does BGP use to establish neighbor sessions?","question_th":"โปรโตคอลเลเยอร์ขนส่งและหมายเลขพอร์ตใดที่ BGP ใช้สร้างการเชื่อมต่อกับเพื่อนบ้าน?","correct_index":1,"explanation_en":"BGP establishes TCP sessions over port 179 to reliably exchange routing updates.","explanation_th":"BGP ใช้การเชื่อมต่อแบบ TCP ผ่านพอร์ตหมายเลข 179 เพื่อแลกเปลี่ยนข้อมูลเร้าติ้งที่แม่นยำ","options_th":["พอร์ต UDP 179","พอร์ต TCP 179","พอร์ต TCP 520","พอร์ต SCTP 179"]}]}', NULL),
	('lesson-adv003-02', 'adv-003', 'BGP Neighbor Relationships', 'BGP Neighbor Relationships', '## BGP Neighbors และ Sessions

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
BGP Session ที่ไม่ขึ้นมักเกิดจาก AS Number ผิด, ไม่มี Connectivity ถึง Peer IP, หรือปัญหา Firewall บน TCP 179', '## BGP Neighbors and Sessions

**What you will learn in this video**
This video teaches how to establish BGP Neighbor Relationships and how to troubleshoot when sessions fail to come up.

**Core Content**
- **BGP FSM (Finite State Machine):** BGP goes through various states before becoming Established.
  - Idle → Connect → Active → OpenSent → OpenConfirm → **Established**
- Basic commands: `router bgp 65001`, `neighbor 10.0.0.2 remote-as 65002`
- **BGP Timers:** Keepalive (60 seconds) and Hold Time (180 seconds) by default.
- **eBGP Multihop:** Used when eBGP Peers are not directly connected.
- Verification: `show bgp summary`, `show bgp neighbors`

**Conclusion**
BGP sessions failing to establish are usually caused by wrong AS Numbers, lack of connectivity to the Peer IP, or firewall issues blocking TCP 179.', 'video', 24, 2, 'https://www.youtube.com/watch?v=Yc2GMMgWuTI', '/images/thumbnails/lesson-adv003-02.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["Configure ebgp-multihop","Ensure IP reachability between peer addresses (e.g., using loopbacks with IGP/static routes)","Enable variance","Use named BGP mode only"],"question_en":"What configuration step is required for a router to accept BGP routing updates from an iBGP peer that is not directly connected?","question_th":"ขั้นตอนการคอนฟิกใดจำเป็นต้องใช้เพื่อให้เร้าเตอร์ยอมรับข้อมูลจากคู่ iBGP ที่ไม่ได้เชื่อมต่อกันโดยตรง?","correct_index":1,"explanation_en":"iBGP sessions do not require peers to be directly connected, but IP reachability between peer IP addresses must be established first.","explanation_th":"iBGP ไม่บังคับว่าอุปกรณ์คู่กันต้องเชื่อมต่อตรงผ่านสายจริง แต่ต้องมีข้อมูลเส้นทาง (IP reachability) ถึงกันได้ก่อน โดยมักใช้ Loopback ร่วมกับ IGP","options_th":["กำหนดค่า ebgp-multihop","ทำให้ Peer IP ติดต่อกันได้","เปิดใช้คำสั่ง variance","ใช้โหมด BGP ที่มีชื่อเท่านั้น"]},{"options":["Loopback interfaces provide higher bandwidth.","Loopback interfaces never go down, keeping the BGP session active as long as there is an active physical path.","Loopbacks automatically encrypt the session.","Cisco IOS enforces loopback use for eBGP."],"question_en":"Why is the loopback interface commonly used for BGP peering instead of physical interfaces?","question_th":"เพราะเหตุใดจึงนิยมใช้อินเตอร์เฟส Loopback ในการจับคู่ (Peering) ของ BGP แทนการใช้อินเตอร์เฟสจริง?","correct_index":1,"explanation_en":"Peering via loopback interfaces ensures session stability. The session remains up even if a physical link fails, provided backup paths exist.","explanation_th":"การจับคู่ผ่าน Loopback ช่วยให้เซสชันเสถียร เพราะอินเตอร์เฟสจำลองนี้จะไม่มีวันล่ม ตราบใดที่มีเส้นทางกายภาพอื่นสำรองไว้เชื่อมเข้าหา","options_th":["อินเทอร์เฟซแบบลูปแบ็คให้แบนด์วิธที่สูงกว่า","Loopback ไม่ล่มตามพอร์ต จึงคง BGP Session ไว้ได้","ลูปแบ็คจะเข้ารหัสเซสชันโดยอัตโนมัติ","Cisco IOS บังคับใช้การใช้ลูปแบ็คสำหรับ eBGP"]},{"options":["neighbor <ip-address> update-source loopback <number>","neighbor <ip-address> next-hop-self","neighbor <ip-address> ebgp-multihop 2","update-source loopback <number>"],"question_en":"What command is required to establish BGP peering using a Loopback IP address as the source IP?","question_th":"คำสั่งใดที่จำเป็นต้องป้อนเพื่อกำหนดให้ BGP Peering ใช้ไอพีของ Loopback เป็น IP ฝั่งส่ง?","correct_index":0,"explanation_en":"The ''neighbor update-source'' command tells BGP to source TCP connection requests from the specified loopback interface IP.","explanation_th":"คำสั่ง ''neighbor update-source'' ใช้สั่งการให้ BGP ยึดที่อยู่ IP ของ Loopback เป็น IP ต้นทางของ TCP เซสชัน","options_th":["neighbor <ip-address> update-source loopback <number>","neighbor <ip-address> next-hop-self","neighbor <ip-address> ebgp-multihop 2","update-source loopback <number>"]},{"options":["1","2","64","255"],"question_en":"By default, what is the TTL (Time to Live) value of eBGP packets?","question_th":"ตามค่าเริ่มต้น ค่า TTL (Time to Live) ของแพ็กเก็ต eBGP คือเท่าใด?","correct_index":0,"explanation_en":"eBGP peers are expected to be directly connected, so their peering packets have a default TTL of 1.","explanation_th":"eBGP จะถูกกำหนดให้เชื่อมเชื่อมต่อตรงเท่านั้น แพ็กเก็ตของ eBGP จึงถูกจำกัดค่า TTL เริ่มต้นเป็น 1","options_th":["1","2","64","255"]},{"options":["neighbor <ip-address> update-source loopback","neighbor <ip-address> ebgp-multihop <hop-count>","neighbor <ip-address> remote-as <same-as-local>","ebgp-multihop <hop-count>"],"question_en":"What command is used to connect to an eBGP peer that is multiple router hops away (e.g., using loopbacks)?","question_th":"คำสั่งใดใช้เพื่อสถาปนาการจับคู่ eBGP ที่อยู่ห่างออกไปหลาย Hop (เช่น กรณีเชื่อมต่อผ่าน Loopback)?","correct_index":1,"explanation_en":"The ''neighbor <ip> ebgp-multihop <count>'' command changes the default TTL of eBGP packets, permitting sessions over multiple hops.","explanation_th":"คำสั่ง ''neighbor <ip> ebgp-multihop <count>'' จะเปลี่ยนระดับค่า TTL เริ่มต้นของ eBGP เพื่อให้เชื่อมผ่านอุปกรณ์ข้ามพอยต์ได้","options_th":["neighbor <ip-address> update-source loopback","neighbor <ip-address> ebgp-multihop <hop-count>","neighbor <ip-address> remote-as <same-as-local>","ebgp-multihop <hop-count>"]}]}', NULL),
	('lesson-dev002-04', 'devnet-002', 'Ansible for Network Automation', 'Ansible for Network Automation', '## Ansible for Network Automation

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
Ansible ช่วยลดข้อผิดพลาดจากมนุษย์ (Human Error) และลดระยะเวลาในการทำงานแบบซ้ำซาก ทำให้วิศวกรเครือข่ายมีเวลาโฟกัสกับการออกแบบระบบมากขึ้น', '## Ansible for Network Automation

**Introduction**
Ansible is an open-source tool from Red Hat that is extremely popular in Network Automation because it is easy to use, does not require complex coding, and most importantly, is Agentless.

**Architecture and Operation**
- **Agentless:** No software installation needed on Routers or Switches; Ansible uses SSH to send commands directly.
- **Playbooks:** Written in YAML, which is human-readable.
- **Inventory:** A file specifying the list and groups of devices to manage.
- **Modules:** Dedicated modules for network devices such as `ios_config`, `nxos_command`, `eos_facts`.

**Use Case Example**
Using Ansible to configure VLANs, backup configurations, or check statuses (Show commands) on hundreds of devices simultaneously in just a few minutes.

**Conclusion**
Ansible reduces Human Error and cuts down time spent on repetitive tasks, allowing network engineers to focus more on system design.', 'reading', 2, 4, NULL, '/images/thumbnails/lesson-dev002-04.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["An agent-based coding compiler.","An agentless Configuration Management and orchestration tool.","A network simulation tool like GNS3.","A physical router hardware controller."],"question_en":"What is Ansible primarily classified as in network automation?","question_th":"อุปกรณ์ซอฟต์แวร์ Ansible ถูกจัดประเภทอยู่ในเครื่องมือกลุ่มใดสำหรับการจัดการทำเครือข่ายอัตโนมัติ?","correct_index":1,"explanation_en":"Ansible is agentless (runs on an control node and communicates via SSH/REST) and acts as configuration manager using YAML.","explanation_th":"Ansible เป็นระบบที่ไม่ต้องติดตั้งซอฟต์แวร์ฝั่งรับ (Agentless) คอนฟิกค่าผ่านเครื่องควบคุมส่วนกลางส่งข้ามสาย SSH","options_th":["คอมไพเลอร์การเข้ารหัสที่ใช้เอเจนต์","เครื่องมือจัดการ Config แบบ Agentless","เครื่องมือจำลองเครือข่ายเช่น GNS3","ตัวควบคุมฮาร์ดแวร์เราเตอร์ทางกายภาพ"]},{"options":["JSON","XML","YAML","Python script"],"question_en":"What file format is used to write Ansible playbooks?","question_th":"รูปแบบการเขียนเอกสารสั่งงานหรือเขียนไฟล์ Playbook ในระบบ Ansible ใช้มาตรฐานแบบใด?","correct_index":2,"explanation_en":"Ansible playbooks are structured using YAML (Yet Another Markup Language), which is clean and easy to read.","explanation_th":"Playbooks ของ Ansible ถูกเขียนขึ้นมาโดยยึดการจัดระเบียบและเว้นวรรคด้วยรูปแบบไฟล์ YAML","options_th":["JSON","XML","YAML","สคริปต์หลาม"]},{"options":["Playbook file","Inventory file","Ansible.cfg","Python module"],"question_en":"Where does Ansible look to find the list of network devices and their IP addresses to manage?","question_th":"Ansible ทราบรายชื่อและตำแหน่งไอพีของอุปกรณ์เครือข่ายปลายทางที่ต้องเข้าไปจัดการจากแหล่งเก็บข้อมูลใด?","correct_index":1,"explanation_en":"The inventory file (hosts) defines the targets, groups, and device-specific variables Ansible will connect to.","explanation_th":"ไฟล์คงคลัง (Inventory file) ทำหน้าที่เก็บรายชื่อ แบ่งกลุ่มเครื่องปลายทาง และจัดแจงตัวแปรของแต่ละอุปกรณ์ที่ต้องการเชื่อมโยง","options_th":["ไฟล์เพลย์บุ๊ก","ไฟล์สินค้าคงคลัง","Ansible.cfg","โมดูลหลาม"]},{"options":["It does not require any Python programming knowledge.","No software needs to be installed on the managed network switches and routers.","It operates without any IP network connection.","It is automatically supported by all hardware brands without configuration."],"question_en":"What is the main advantage of Ansible being ''Agentless'' for network engineering?","question_th":"ข้อดีที่เด่นชัดที่สุดของการออกแบบระบบแบบ ''Agentless'' ในมุมมองของวิศวกรระบบเครือข่ายคืออะไร?","correct_index":1,"explanation_en":"Because routers/switches cannot run third-party agents, Ansible''s ability to run over native SSH makes it ideal for network deployment.","explanation_th":"เนื่องจากอุปกรณ์เราเตอร์สวิตช์มักไม่เปิดช่องให้ติดตั้งโปรแกรมเสริม การสั่งการผ่านช่องทาง SSH/Netconf ทั่วไปจึงตอบโจทย์ที่สุด","options_th":["ไม่จำเป็นต้องมีความรู้การเขียนโปรแกรม Python ใด ๆ","ไม่จำเป็นต้องติดตั้งซอฟต์แวร์บนสวิตช์เครือข่ายและเราเตอร์ที่ได้รับการจัดการ","มันทำงานโดยไม่ต้องเชื่อมต่อเครือข่าย IP ใด ๆ","ได้รับการสนับสนุนโดยอัตโนมัติจากแบรนด์ฮาร์ดแวร์ทั้งหมดที่ไม่มีการกำหนดค่า"]},{"options":["Playbook","Play","Task / Module","Inventory"],"question_en":"In Ansible terminology, what represents a unit of work to be executed on a target (e.g., configuring an interface)?","question_th":"ตามคำนิยามคำศัพท์ของ Ansible สิ่งใดคือขอบเขตการทำงานเดี่ยวที่จะต้องประมวลผลลัพธ์บนเครื่องปลายทาง?","correct_index":2,"explanation_en":"Tasks invoke specific Ansible modules (like cisco.ios.ios_config) to execute specific configurations on target nodes.","explanation_th":"งานเดี่ยวหรือโมดูล (Task/Module) คือกลุ่มคำสั่งเฉพาะที่จะวิ่งเข้าไปดำเนินการตั้งค่าตามเจตจำนงบนอุปกรณ์ปลายทาง","options_th":["เพลย์บุ๊ก","Play","งาน / โมดูล","Inventory"]}]}', NULL),
	('lesson-adv003-04', 'adv-003', 'BGP Route Selection Process', 'BGP Route Selection Process', '## BGP Path Selection (การเลือกเส้นทางของ BGP)

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
BGP Traffic Engineering เป็นทักษะระดับสูงที่ ISP Engineer ใช้ทุกวัน เพื่อควบคุมว่า Traffic จะเข้า/ออกผ่าน ISP รายไหน', '## BGP Path Selection

**What you will learn in this video**
This video teaches the BGP path selection algorithm and how to use Attributes to influence path selection.

**Core Content**
- **BGP Decision Process (Simplified):**
  1. Weight (higher = better) → Cisco-only
  2. Local Preference (higher = better) → Controls Outbound traffic within the AS
  3. Locally originated routes
  4. Shortest AS-Path → Controls Outbound traffic to external ISPs
  5. Lowest Origin type (IGP > EGP > Incomplete)
  6. Lowest MED → Controls Inbound traffic from ISPs
- **AS-Path Prepending:** Adding AS Numbers repeatedly into the AS-Path to artificially make the route look "longer" and less preferred.

**Conclusion**
BGP Traffic Engineering is an advanced skill used daily by ISP Engineers to control which ISP traffic enters or exits through.', 'video', 8, 4, 'https://www.youtube.com/watch?v=XRetkD4UUL4', '/images/thumbnails/lesson-adv003-04.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["Highest Local Preference","Highest Weight (Cisco)","Shortest AS_PATH","Lowest MED"],"question_en":"What is the very first criteria BGP evaluates to select the best path?","question_th":"เกณฑ์ลำดับแรกสุดที่ BGP นำมาพิจารณาเพื่อเลือกเส้นทางที่ดีที่สุดคืออะไร?","correct_index":1,"explanation_en":"On Cisco routers, BGP evaluates the ''Weight'' attribute first. Higher weights are preferred.","explanation_th":"สำหรับอุปกรณ์ Cisco ค่าที่จะถูกเช็คเป็นสิทธิ์อันดับแรกคือ Weight โดยจะเลือกเส้นทางที่มีค่านี้สูงที่สุดก่อน","options_th":["Local Preference สูงสุด","Weight สูงสุด (Cisco)","AS_PATH สั้นที่สุด","MED ต่ำสุด"]},{"options":["AS_PATH","Local Preference","MED","Router ID"],"question_en":"If Weight values are equal on a Cisco router, what is the next attribute evaluated in the BGP route selection process?","question_th":"หากค่า Weight ที่ตรวจสอบเบื้องต้นมีค่าเท่ากัน แอตทริบิวต์ถัดไปที่ BGP นำมาวิเคราะห์หาเส้นทางที่ดีที่สุดคืออะไร?","correct_index":1,"explanation_en":"If weights match, BGP evaluates ''Local Preference'' next. The route with the highest local preference is selected.","explanation_th":"หาก Weight เท่ากัน ลำดับต่อไปคือวิเคราะห์จาก Local Preference โดยจะเลือกค่าที่สูงที่สุด","options_th":["AS_PATH","Local Preference","MED","Router ID"]},{"options":["The path with the longest AS_PATH is preferred.","The path with the shortest AS_PATH (least number of AS hops) is preferred.","The path with the most private AS numbers is preferred.","The path that contains local AS is preferred."],"question_en":"How does BGP evaluate the AS_PATH attribute during the path selection process?","question_th":"BGP มีการวิเคราะห์จัดลำดับแอตทริบิวต์ AS_PATH ในขั้นตอนการคัดเลือกเส้นทางอย่างไร?","correct_index":1,"explanation_en":"BGP prefers routes with the shortest AS_PATH length, which represents fewer intermediate autonomous systems.","explanation_th":"BGP จะเลือกเส้นทางที่มีความยาวของ AS_PATH สั้นที่สุด เพราะหมายถึงผ่านเขต Autonomous System น้อยรายที่สุด","options_th":["แนะนำให้ใช้เส้นทางที่มี AS_PATH ที่ยาวที่สุด","เลือก AS_PATH ที่มีจำนวน AS Hop น้อยที่สุด","แนะนำให้ใช้เส้นทางที่มีหมายเลข AS ส่วนตัวมากที่สุด","แนะนำให้ใช้เส้นทางที่มี AS ในเครื่อง"]},{"options":["BGP prefers iBGP routes over eBGP.","BGP prefers eBGP routes over iBGP.","BGP treats them with equal preference.","BGP dynamically randomizes the choice."],"question_en":"Between eBGP and iBGP routes, which one does the BGP selection process prefer?","question_th":"ระหว่างเส้นทางที่เรียนรู้จาก eBGP กับ iBGP ระบบคัดเลือกของ BGP จะจัดความสำคัญให้ฝั่งใดก่อน?","correct_index":1,"explanation_en":"BGP prefers routes learned from External BGP (eBGP) over those learned from Internal BGP (iBGP).","explanation_th":"BGP จะให้คะแนนสิทธิ์ในการเลือกกับเส้นทางที่ได้ยินจากภายนอก (eBGP) มากกว่าภายใน (iBGP)","options_th":["BGP ชอบเส้นทาง iBGP มากกว่า eBGP","BGP ชอบเส้นทาง eBGP มากกว่า iBGP","BGP ปฏิบัติต่อพวกเขาอย่างเท่าเทียมกัน","BGP สุ่มตัวเลือกแบบไดนามิก"]},{"options":["Path with the lowest MED.","Path coming from the peer with the lowest Router ID.","Path with the longest uptime.","Path with the highest IP address."],"question_en":"If all other attributes are identical, how is the tie-breaker resolved in BGP path selection?","question_th":"หากค่าแอตทริบิวต์การวิเคราะห์ด้านหลักทั้งหมดเสมอกัน ด่านสุดท้ายที่จะตัดสินขาดเส้นทางใน BGP คืออะไร?","correct_index":1,"explanation_en":"If multiple routes remain tied, BGP defaults to selecting the route from the peer with the lowest BGP Router ID (RID).","explanation_th":"เมื่อคะแนนเปรียบเทียบในหมวดสำคัญทั้งหมดเท่ากัน ตัวตัดสินสุดท้ายคือการเลือกคู่เพื่อนบ้านที่มี BGP Router ID ต่ำที่สุด","options_th":["เส้นทางที่มี MED ต่ำที่สุด","เส้นทางที่มาจากเพียร์ที่มี Router ID ต่ำที่สุด","เส้นทางที่มีสถานะการออนไลน์ยาวนานที่สุด","เส้นทางที่มีที่อยู่ IP สูงสุด"]}]}', NULL),
	('lesson-adv003-05', 'adv-003', 'BGP Filtering และ Route Maps', 'BGP Filtering and Route Maps', '## BGP Filtering and Route Maps

**บทนำ**
Border Gateway Protocol (BGP) คือโปรโตคอลหลักที่ขับเคลื่อนอินเทอร์เน็ต เนื่องจากตารางเส้นทางอินเทอร์เน็ตมีขนาดใหญ่มาก (Full Route หลักล้านเส้นทาง) การควบคุมเส้นทางด้วย Filtering จึงเป็นสิ่งที่ขาดไม่ได้

**เครื่องมือสำหรับ BGP Filtering**
- **Prefix-lists:** นิยมใช้คัดกรองตาม IP Prefix และ Subnet mask ได้อย่างแม่นยำ
- **AS-Path ACLs:** ใช้คัดกรองจากหมายเลข AS Number ด้วย Regular Expression (Regex) เช่น ยอมรับเฉพาะเส้นทางที่มาจาก AS ถัดไปเท่านั้น
- **Route Maps:** เป็นเครื่องมือที่ทรงพลังที่สุด ทำหน้าที่เหมือนชุดคำสั่ง IF-THEN

**การประยุกต์ใช้ Route Maps**
Route Maps สามารถจับคู่ (Match) เส้นทางด้วย Prefix-list จากนั้นจึงกระทำ (Set) การเปลี่ยนแปลงค่า BGP Attributes เช่น Local Preference, MED หรือ AS-Path Prepending เพื่อจัดการเส้นทาง (Traffic Engineering)

**สรุป**
BGP Filtering และ Route Maps เป็นเครื่องมือระดับผู้เชี่ยวชาญที่ช่วยให้องค์กรควบคุมได้อย่างเต็มที่ว่า จะรับข้อมูลจากที่ไหน และจะส่งทราฟฟิกออกไปยังผู้ให้บริการ (ISP) รายใด', '## BGP Filtering and Route Maps

**Introduction**
Border Gateway Protocol (BGP) is the core protocol driving the internet. Because the global internet routing table is massive (millions of full routes), route filtering is an absolute necessity.

**BGP Filtering Tools**
- **Prefix-lists:** Widely used to accurately filter by IP Prefix and Subnet mask.
- **AS-Path ACLs:** Used to filter based on AS Numbers using Regular Expressions (Regex), such as only accepting routes originating from an adjacent AS.
- **Route Maps:** The most powerful tool, acting like a set of IF-THEN scripting commands.

**Applying Route Maps**
Route Maps can match routes using Prefix-lists, and then act (Set) to modify BGP Attributes such as Local Preference, MED, or AS-Path Prepending to engineer traffic paths.

**Conclusion**
BGP Filtering and Route Maps are expert-level tools that give organizations full control over where they receive data from and which ISP they send traffic to.', 'reading', 2, 5, NULL, '/images/thumbnails/lesson-adv003-05.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["neighbor <ip-address> route-map <map-name> [in | out]","distribute-list route-map <map-name>","neighbor <ip-address> filter-map <map-name>","ip route-map <map-name> neighbor <ip-address>"],"question_en":"What command is used to apply a Route Map to a specific BGP neighbor?","question_th":"คำสั่งใดใช้ผูกการทำงานของ Route Map เข้ากับ BGP Neighbor เฉพาะเจาะจง?","correct_index":0,"explanation_en":"The ''neighbor <ip> route-map <name> [in|out]'' command is used in BGP configuration to apply policies in either direction.","explanation_th":"ใช้คำสั่ง ''neighbor <ip> route-map <name> [in|out]'' ในการตั้งค่า BGP เพื่อระบุกรองข้อมูลขาเข้าหรือขาออก","options_th":["neighbor <ip-address> route-map <map-name> [in | out]","distribute-list route-map <map-name>","neighbor <ip-address> filter-map <map-name>","ip route-map <map-name> neighbor <ip-address>"]},{"options":["It modifies the attribute of a matched route.","It defines the criteria that a route must meet to be processed by this clause.","It automatically permits the route.","It resets the BGP connection."],"question_en":"In a Route Map statement, what does the ''match'' command do?","question_th":"ในประโยคทำงานของ Route Map คำสั่ง ''match'' ทำหน้าที่อะไร?","correct_index":1,"explanation_en":"The ''match'' command defines the filtering criteria (such as matching an IP prefix list or ACL).","explanation_th":"คำสั่ง ''match'' ใช้ระบุเกณฑ์ตัวแปรในการตรวจสอบ เช่น เช็คว่าตรงกับเลขไอพีใน prefix list หรือ ACL หรือไม่","options_th":["มันปรับเปลี่ยนคุณลักษณะของเส้นทางที่ตรงกัน","กำหนดเงื่อนไขที่ Route ต้องตรงก่อนประมวลผล","มันจะอนุญาตเส้นทางโดยอัตโนมัติ","มันจะรีเซ็ตการเชื่อมต่อ BGP"]},{"options":["It selects which IP addresses to filter.","It modifies the attributes of routes that pass the match criteria.","It terminates the route map execution.","It configures interface parameters."],"question_en":"In a Route Map statement, what does the ''set'' command do?","question_th":"ในประโยคทำงานของ Route Map คำสั่ง ''set'' ทำหน้าที่อะไร?","correct_index":1,"explanation_en":"The ''set'' command is used to manipulate path attributes (e.g., set local-preference, weight, or metric) on routes that meet the match criteria.","explanation_th":"คำสั่ง ''set'' ใช้สั่งการเปลี่ยนค่าแอตทริบิวต์เส้นทาง (เช่น ตั้งค่า local-preference หรือ weight) ให้กับกลุ่มข้อมูลที่กรองเข้าเกณฑ์สำเร็จ","options_th":["มันเลือกที่อยู่ IP ที่จะกรอง","แก้ Attribute ของ Route ที่ match","หยุดการทำงานของ Route Map","มันกำหนดค่าพารามิเตอร์อินเทอร์เฟซ"]},{"options":["It is automatically permitted with default attributes.","It is implicitly denied (dropped).","It is sent to Area 0.","The route map raises a warning error."],"question_en":"What happens if a route does not match any clauses in a Route Map?","question_th":"จะเกิดอะไรขึ้นกับเส้นทางเครือข่าย หากนำมาวิ่งตรวจสอบผ่าน Route Map แล้วไม่สอดคล้องกับหัวข้อใดๆ เลย?","correct_index":1,"explanation_en":"Like Access Control Lists, Route Maps have an implicit deny at the end. Any route that does not match any entry is denied.","explanation_th":"เช่นเดียวกับ ACL การทำงานของ Route Map จะมีคำสั่งปฏิเสธโดยนัย (implicit deny) อยู่ท้ายสุด หากข้อมูลไม่เข้าเคสใดเลยจะโดนปัดทิ้ง","options_th":["ได้รับอนุญาตโดยอัตโนมัติด้วยแอตทริบิวต์เริ่มต้น","ถูกปฏิเสธโดยปริยายและทิ้งเส้นทาง","มันถูกส่งไปยังพื้นที่ 0","Route Map แสดงคำเตือน"]},{"options":["Access List","Prefix List","AS Path Access List (ip as-path access-list)","Distribute List"],"question_en":"Which filter type allows you to filter BGP routes using regular expressions based on the AS_PATH attribute?","question_th":"รูปแบบการกรองเส้นทางชนิดใดที่เปิดให้สามารถระบุ Regular Expression ตรวจสอบแอตทริบิวต์ AS_PATH เพื่อเลือกคัดกรองข้อมูล BGP?","correct_index":2,"explanation_en":"An AS Path Access List (''ip as-path access-list'') allows matching routes using regular expressions on the AS path string.","explanation_th":"AS Path Access List (''ip as-path access-list'') เปิดความสามารถในการกรองจับคู่เส้นทางโดยใช้ regular expression ค้นหารูปแบบในสตริง AS_PATH","options_th":["Access List","Prefix List","AS Path Access List","Distribute List"]}]}', NULL),
	('lesson-ccna001-05', 'ccna-001', 'IP Addressing and Subnetting', 'IP Addressing and Subnetting', '## IP Addressing และ Subnetting

**สิ่งที่จะได้เรียนในคลิปนี้**

คลิปนี้สอนวิธีการจัดสรร IP Address และการแบ่งย่อยเครือข่าย (Subnetting) ซึ่งเป็นทักษะที่ขาดไม่ได้สำหรับวิศวกรเครือข่าย

**เนื้อหาหลัก**

- โครงสร้างของ IPv4 Address (32 บิต แบ่งเป็น Network + Host portion)
- ค่า Subnet Mask และ CIDR Notation เช่น /24, /25, /26
- การคำนวณหา Network Address, Broadcast Address และจำนวน Host ที่ใช้ได้
- การแบ่ง Subnet ด้วย VLSM (Variable Length Subnet Masking) **ตัวอย่าง** `192.168.1.0/26` → มี 64 IP ใช้งานได้ 62 Host (ลบ Network + Broadcast)

**สรุป**

Subnetting เป็นทักษะที่ต้องฝึกจนคล่องมือ เพราะเป็นพื้นฐานของการออกแบบและบริหาร IP ในเครือข่ายจริงทุกขนาด', '## IP Addressing and Subnetting

**What you will learn in this video**
This video teaches how to allocate IP Addresses and divide networks (Subnetting), an indispensable skill for network engineers.

**Core Content**
- IPv4 Address structure (32-bit, divided into Network + Host portions).
- Subnet Masks and CIDR Notation such as /24, /25, /26.
- Calculating Network Addresses, Broadcast Addresses, and the number of usable Hosts.
- Subnetting using VLSM (Variable Length Subnet Masking).

**Example**
`192.168.1.0/26` → Has 64 IPs, yielding 62 usable Hosts (subtracting Network + Broadcast).

**Conclusion**
Subnetting is a skill that must be mastered through practice, as it forms the basis of IP design and management in real-world networks of all sizes.', 'video', 19, 5, 'https://www.youtube.com/watch?v=5WfiTHiU4x8', '/images/thumbnails/lesson-ccna001-05.jpg', NULL, '2026-05-18 10:02:06.461001+00', '2026-05-19 10:29:10.623729+00', '{"questions":[{"options":["16 bits","32 bits","64 bits","128 bits"],"question_en":"How many bits are in an IPv4 address?","question_th":"ที่อยู่ IPv4 (IPv4 address) ประกอบด้วยข้อมูลขนาดกี่บิต?","correct_index":1,"explanation_en":"An IPv4 address is a 32-bit binary address represented as four octets in dotted-decimal format.","explanation_th":"ไอพีแอดเดรสเวอร์ชัน 4 (IPv4) มีขนาดรวม 32 บิต เขียนแทนด้วยเลขฐานสิบสี่ชุดคั่นด้วยเครื่องหมายจุด","options_th":["16 บิต","32 บิต","64 บิต","128 บิต"]},{"options":["255.0.0.0","255.255.0.0","255.255.255.0","255.255.255.255"],"question_en":"What is the default subnet mask for a Class C IP network?","question_th":"ซับเน็ตมาสก์เริ่มต้น (Default Subnet Mask) สำหรับเครือข่ายคลาส C (Class C) คือข้อใด?","correct_index":2,"explanation_en":"Class C networks have a default subnet mask of 255.255.255.0 (/24 prefix length).","explanation_th":"เครือข่ายคลาส C มีค่าซับเน็ตมาสก์ตั้งต้นเป็น 255.255.255.0 (หรือความยาวพรีฟิกซ์ /24)","options_th":["255.0.0.0","255.255.0.0","255.255.255.0","255.255.255.255"]},{"options":["192.168.1.0","192.168.1.255","192.168.0.0","192.168.1.1"],"question_en":"What is the network address for the host IP 192.168.1.50 with a subnet mask of 255.255.255.0?","question_th":"เครือข่ายปลายทาง (Network Address) ของโฮสต์ไอพี 192.168.1.50 ที่มีซับเน็ตมาสก์เป็น 255.255.255.0 คือข้อใด?","correct_index":0,"explanation_en":"Performing a logical AND on 192.168.1.50 and 255.255.255.0 yields the network address 192.168.1.0.","explanation_th":"การทำ logical AND ระหว่างโฮสต์ IP 192.168.1.50 และมาสก์ 255.255.255.0 จะได้แอดเดรสของเครือข่ายเป็น 192.168.1.0","options_th":["192.168.1.0","192.168.1.255","192.168.0.0","192.168.1.1"]},{"options":["30","62","126","64"],"question_en":"How many usable host addresses are available in a /26 subnet?","question_th":"จำนวนไอพีที่เครื่องโฮสต์สามารถนำไปใช้งานได้จริง (Usable Host Addresses) ในซับเน็ตขนาด /26 คือเท่าใด?","correct_index":1,"explanation_en":"A /26 subnet leaves 6 host bits. 2^6 - 2 = 64 - 2 = 62 usable host addresses.","explanation_th":"ซับเน็ต /26 มีบิตสำหรับโฮสต์เหลือ 6 บิต สูตรคำนวณคือ 2^6 - 2 = 64 - 2 = 62 แอดเดรสที่สามารถตั้งค่าให้อุปกรณ์ได้","options_th":["30","62","126","64"]},{"options":["10.0.0.0 - 10.255.255.255","172.16.0.0 - 172.31.255.255","192.168.0.0 - 192.168.255.255","All of the above"],"question_en":"Which of the following is a private IP address range defined by RFC 1918?","question_th":"ข้อใดต่อไปนี้คือช่วงไอพีส่วนบุคคล (Private IP Address) ตามที่กำหนดในมาตรฐาน RFC 1918?","correct_index":3,"explanation_en":"RFC 1918 defines three private IP address blocks: 10.0.0.0/8, 172.16.0.0/12, and 192.168.16.0/16 (represented as 192.168.0.0/16).","explanation_th":"RFC 1918 กำหนดกลุ่มไอพีส่วนบุคคลไว้ 3 ช่วงหลัก ได้แก่ 10.0.0.0/8, 172.16.0.0/12 และ 192.168.0.0/16 ดังนั้นทุกข้อจึงถูกต้อง","options_th":["10.0.0.0 - 10.255.255.255","172.16.0.0 - 172.31.255.255","192.168.0.0 - 192.168.255.255","ถูกทุกข้อ"]}]}', NULL),
	('lesson-dev002-02', 'devnet-002', 'SD-WAN (Viptela) APIs', 'SD-WAN APIs', '## Cisco SD-WAN API (vManage)

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
SD-WAN API ช่วยให้ Network Engineer สามารถสร้าง Dashboard แบบ Custom และ Automate การตอบสนองต่อเหตุการณ์ต่างๆ ในเครือข่ายได้', '## Cisco SD-WAN API (vManage)

**What you will learn in this video**
This video teaches how to use the vManage REST API to programmatically administer SD-WAN Edge Devices.

**Core Content**
- **Cisco SD-WAN Architecture:** vManage (Management), vSmart (Control), vBond (Orchestration), vEdge/cEdge (Data Plane).
- **vManage API:** REST API used to retrieve data and configure the entire SD-WAN.
- **Use Case Examples:**
  - View all Tunnel statuses: `GET /dataservice/device/tunnel/statistics`
  - View Device Inventory: `GET /dataservice/device`
  - Push Policy: Create and Activate Policies via API

**Conclusion**
SD-WAN APIs empower Network Engineers to build Custom Dashboards and automate responses to network events.', 'video', 9, 2, 'https://www.youtube.com/watch?v=lB_NjIzlg-U', '/images/thumbnails/lesson-dev002-02.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["It forces the use of serial cables.","It separates control and data planes, allowing centralized policy management and dynamic traffic steering across multiple transport paths.","It disables local routing protocols completely.","It reduces network speeds to improve security."],"question_en":"What is the primary benefit of SD-WAN over traditional WAN architecture?","question_th":"ประโยชน์หลักของการสลับมาใช้อาณาเขตแบบ SD-WAN แทนระบบเครือข่ายระยะไกลแบบดั้งเดิมคือข้อใด?","correct_index":1,"explanation_en":"Cisco SD-WAN separates the control plane from the data plane, enabling centrally configured application steering policies across broadband, LTE, and MPLS.","explanation_th":"SD-WAN แยกส่วนระบบควบคุมออกจากการสลับส่งต่อข้อมูล ทำให้ผู้ดูแลระบบสามารถกำหนดเส้นทางทราฟฟิกได้โดยอิงตามพฤติกรรมข้อมูลส่วนกลาง","options_th":["มันบังคับให้ใช้สายเคเบิลอนุกรม","แยก Control/Data Plane เพื่อคุมนโยบายและเส้นทางจากส่วนกลาง","มันปิดการใช้งานโปรโตคอลการกำหนดเส้นทางในเครื่องอย่างสมบูรณ์","จะลดความเร็วเครือข่ายเพื่อปรับปรุงความปลอดภัย"]},{"options":["vSmart","vManage (Cisco Catalyst SD-WAN Manager)","vBond","vEdge"],"question_en":"In Cisco SD-WAN architecture, which component represents the centralized management plane (Single Pane of Glass)?","question_th":"ในระบบโครงสร้างของ Cisco SD-WAN ส่วนประกอบอุปกรณ์ย่อยใดทำหน้าที่เป็นด่านการจัดตั้งศูนย์บริหารรวมศูนย์ (Single Pane of Glass)?","correct_index":1,"explanation_en":"vManage is the centralized management dashboard used to configure, monitor, and provision the entire SD-WAN fabric.","explanation_th":"vManage เป็นหน้าจอบอร์ดจัดการส่วนกลาง (Management Plane) ที่เปิดให้ผู้ดูแลทำเทมเพลต แก้คอนฟิก และเฝ้าสังเกตการณ์ระบบทั้งหมด","options_th":["vSmart","vManage","vBond","vEdge"]},{"options":["vManage","vSmart","vBond","vEdge"],"question_en":"Which SD-WAN component acts as the centralized control plane, distributing routing and policy decisions to edge routers?","question_th":"ส่วนประกอบ SD-WAN ใดที่เปรียบเสมือนสมองของระบบทำหน้าที่ควบคุม (Control plane) จัดแจงทิศทางเร้าติ้งนโยบายให้เร้าเตอร์ปลายทาง?","correct_index":1,"explanation_en":"vSmart is the control plane engine of Cisco SD-WAN. It implements OMP (Overlay Management Protocol) to distribute routing info and security keys.","explanation_th":"vSmart ทำหน้าที่ประมวลผลสมองควบคุมทราฟฟิก (Control plane) สั่งงานและแจกจ่ายเส้นทางอิงตามนโยบายด้วยโปรโตคอล OMP","options_th":["vManage","vSmart","vBond","vEdge"]},{"options":["To forward user data packets.","To orchestrate initial authentication, secure onboarding, and direct edge devices to vManage and vSmart controllers.","To store system syslog entries.","To assign IP addresses to home PCs."],"question_en":"What is the role of the vBond orchestrator in Cisco SD-WAN?","question_th":"บทบาทหน้าที่หลักของระบบประสานงาน vBond ในเครือข่าย Cisco SD-WAN คือข้อใด?","correct_index":1,"explanation_en":"vBond is the orchestration plane. It handles initial authentication and setup, coordinating connections to vManage and vSmart.","explanation_th":"vBond ทำหน้าที่จัดด่านทักทายตรวจใบรับรอง (Orchestration plane) ชี้แนะให้อุปกรณ์ขอบเครือข่ายวิ่งเข้าหา vManage และ vSmart ได้ถูกต้อง","options_th":["เพื่อส่งต่อแพ็กเก็ตข้อมูลผู้ใช้","ยืนยันและ Onboard Edge แล้วชี้ไป vManage/vSmart","เพื่อจัดเก็บรายการบันทึกระบบของระบบ","เพื่อกำหนดที่อยู่ IP ให้กับพีซีที่บ้าน"]},{"options":["BGP","OSPF","OMP (Overlay Management Protocol)","EIGRP"],"question_en":"Which protocol is used by Cisco SD-WAN controllers to exchange routing and policy information over the secure fabric?","question_th":"โปรโตคอลเฉพาะใดที่ Cisco SD-WAN เลือกใช้แลกเปลี่ยนตารางเส้นทางเร้าติ้งและนโยบายผ่านโครงข่ายปลอดภัยเสมือน?","correct_index":2,"explanation_en":"Overlay Management Protocol (OMP) is the routing protocol of SD-WAN, running between vSmart controllers and vEdge/cEdge routers.","explanation_th":"OMP (Overlay Management Protocol) คือโปรโตคอลจัดหาเส้นทางที่วิ่งสื่อสารเชื่อมโยงการทำงานหลักในเครือข่าย SD-WAN","options_th":["BGP","OSPF","OMP","EIGRP"]}]}', NULL),
	('lesson-ccna001-03', 'ccna-001', 'TCP/IP Protocol Suite', 'TCP/IP Protocol Suite', '## TCP/IP Protocol Suite

**บทนำ**
TCP/IP Protocol Suite เป็นรากฐานของการสื่อสารในเครือข่ายคอมพิวเตอร์และอินเทอร์เน็ต ถูกออกแบบมาเพื่อให้ระบบต่างๆ สามารถสื่อสารกันได้แม้จะต่างแพลตฟอร์ม

**โครงสร้างเลเยอร์ (Layer Architecture)**
ประกอบด้วย 4 เลเยอร์หลัก:
- **Application Layer:** เทียบเท่ากับ Layer 5-7 ของ OSI Model จัดการกับโปรโตคอลระดับผู้ใช้งาน เช่น HTTP, FTP
- **Transport Layer:** จัดการการเชื่อมต่อระหว่าง Host มี 2 โปรโตคอลหลักคือ TCP (เชื่อถือได้) และ UDP (รวดเร็ว)
- **Internet Layer:** เทียบเท่า Network Layer ทำหน้าที่ค้นหาเส้นทางและระบุ IP Address
- **Network Access Layer:** จัดการกับฮาร์ดแวร์และการส่งข้อมูลบนสื่อกายภาพ

**สรุป**
TCP/IP คือโมเดลที่ใช้งานจริงในปัจจุบัน ซึ่งมีความเรียบง่ายและยืดหยุ่นกว่า OSI Model ทำให้กลายมาเป็นมาตรฐานสากลของระบบเครือข่าย', '## TCP/IP Protocol Suite

**Introduction**
The TCP/IP Protocol Suite is the foundation of communication in computer networks and the Internet, designed to allow disparate systems to communicate across different platforms.

**Layer Architecture**
Consists of 4 main layers:
- **Application Layer:** Equivalent to Layers 5-7 of the OSI Model, handling user-level protocols like HTTP, FTP.
- **Transport Layer:** Manages host-to-host connections. Its two main protocols are TCP (reliable) and UDP (fast).
- **Internet Layer:** Equivalent to the Network Layer, responsible for pathfinding and IP Addressing.
- **Network Access Layer:** Manages hardware and data transmission over physical media.

**Conclusion**
TCP/IP is the practical model used today. It is simpler and more flexible than the OSI Model, making it the universal standard for networking.', 'video', 2, 3, 'https://www.youtube.com/watch?v=OTwp3xtd4dg', '/images/thumbnails/lesson-ccna001-03.jpg', NULL, '2026-05-18 10:02:06.461001+00', '2026-05-19 10:29:10.623729+00', '{"questions":[{"options":["3 layers","4 layers","7 layers","5 layers"],"question_en":"How many layers are defined in the modern/standard TCP/IP model?","question_th":"ในแบบจำลอง TCP/IP (TCP/IP Model) ปัจจุบันประกอบด้วยเลเยอร์ทำงานกี่ชั้น?","correct_index":1,"explanation_en":"The TCP/IP model originally defines 4 layers (Application, Transport, Internet, Network Access).","explanation_th":"แบบจำลอง TCP/IP ดั้งเดิมประกอบด้วยเลเยอร์ทำงาน 4 ชั้นหลัก ได้แก่ Application, Transport, Internet และ Network Access","options_th":["3ชั้น","4ชั้น","7ชั้น","5ชั้น"]},{"options":["Network Access Layer","Internet Layer","Transport Layer","Application Layer"],"question_en":"Which TCP/IP model layer corresponds to the Network Layer of the OSI model?","question_th":"เลเยอร์ใดในแบบจำลอง TCP/IP ที่ทำบทบาทเทียบเท่ากับ Network Layer ในแบบจำลอง OSI?","correct_index":1,"explanation_en":"The Internet Layer in the TCP/IP model corresponds to Layer 3 (Network Layer) of the OSI model.","explanation_th":"เลเยอร์อินเทอร์เน็ต (Internet Layer) ใน TCP/IP ทำหน้าที่แบบเดียวกับ Network Layer (Layer 3) ของแบบจำลอง OSI","options_th":["เลเยอร์การเข้าถึงเครือข่าย","เลเยอร์อินเทอร์เน็ต","ชั้นการขนส่ง","เลเยอร์แอปพลิเคชัน"]},{"options":["TCP is connectionless and unreliable; UDP is connection-oriented.","TCP is connection-oriented and reliable; UDP is connectionless and unreliable.","TCP is faster than UDP.","TCP is used at Layer 3; UDP is used at Layer 4."],"question_en":"What is a key difference between TCP and UDP protocols?","question_th":"ข้อแตกต่างที่สำคัญยิ่งระหว่างโปรโตคอล TCP และ UDP คืออะไร?","correct_index":1,"explanation_en":"TCP establishes a connection and guarantees delivery. UDP is connectionless, prioritizing speed over guaranteed packet arrival.","explanation_th":"TCP จะสร้างเซสชันติดต่อก่อนและยืนยันการรับส่งข้อมูล ส่วน UDP จะส่งข้อมูลออกไปทันทีโดยเน้นความเร็วมากกว่าการยืนยันการถึง","options_th":["TCP ไม่มีการเชื่อมต่อและไม่น่าเชื่อถือ UDP เน้นการเชื่อมต่อ","TCP เชื่อมต่อและเชื่อถือได้ ส่วน UDP ไม่เชื่อมต่อ","TCP เร็วกว่า UDP","TCP ถูกใช้ที่เลเยอร์ 3; UDP ถูกใช้ในเลเยอร์ 4"]},{"options":["Application Layer","Transport Layer","Internet Layer","Network Access Layer"],"question_en":"Which layer of the TCP/IP model combines the physical and data link layers of the OSI model?","question_th":"เลเยอร์ใดในแบบจำลอง TCP/IP ที่ควบรวมการทำงานของทั้งเลเยอร์กายภาพ (Physical) และเลเยอร์เชื่อมโยงข้อมูล (Data link) ของ OSI เข้าด้วยกัน?","correct_index":3,"explanation_en":"The Network Access (or Link) Layer covers physical cabling, hardware addressing (MAC), and media access control.","explanation_th":"เลเยอร์เน็ตเวิร์กแอคเซส (Network Access Layer) จะครอบคลุมเรื่องสายสัญญาณทางกายภาพและการระบุแอดเดรสฮาร์ดแวร์ (MAC address)","options_th":["เลเยอร์แอปพลิเคชัน","ชั้นการขนส่ง","เลเยอร์อินเทอร์เน็ต","ชั้น Network Access"]},{"options":["IP","HTTP","UDP","ARP"],"question_en":"Which of the following protocols operates at the TCP/IP Transport Layer?","question_th":"โปรโตคอลใดต่อไปนี้ที่ทำหน้าที่อยู่ในเลเยอร์ขนส่ง (Transport Layer) ของ TCP/IP?","correct_index":2,"explanation_en":"TCP and UDP are the primary protocols operating at the Transport Layer.","explanation_th":"TCP และ UDP เป็นแกนหลักในการแลกเปลี่ยนที่จัดอยู่ในชั้นการขนส่ง (Transport Layer)","options_th":["IP","HTTP","UDP","ARP"]}]}', NULL),
	('lesson-ccna002-04', 'ccna-002', 'Spanning Tree Protocol (STP)', 'Spanning Tree Protocol (STP)', '## Spanning Tree Protocol (STP)

**บทนำ**
Spanning Tree Protocol (STP) คือโปรโตคอลใน Layer 2 ที่ออกแบบมาเพื่อป้องกันปัญหา Loop ที่เกิดขึ้นในสวิตช์เครือข่าย เมื่อมีการเชื่อมต่อสายแลนซ้ำซ้อน (Redundancy)

**หลักการทำงานของ STP**
- **การเลือก Root Bridge:** สวิตช์ที่มีค่า Bridge ID ต่ำที่สุดจะถูกเลือกเป็นศูนย์กลาง (Root Bridge)
- **Port Roles:** พอร์ตต่างๆ จะถูกกำหนดบทบาท เช่น Root Port (เส้นทางที่ดีที่สุดไป Root), Designated Port (พอร์ตส่งข้อมูล) และ Blocking Port (พอร์ตที่ถูกบล็อกเพื่อกัน Loop)
- **BPDU:** สวิตช์จะส่งข้อความ BPDU หากันเพื่อแลกเปลี่ยนข้อมูลและปรับเปลี่ยนโครงสร้าง Spanning Tree เมื่อมีสายขาด

**สรุป**
STP เป็นกลไกสำคัญที่ขาดไม่ได้ในเครือข่ายแบบสวิตชิ่ง ช่วยให้เครือข่ายมี Redundancy ได้โดยไม่เกิดปัญหา Broadcast Storm ที่อาจทำให้ระบบล่ม', '## Spanning Tree Protocol (STP)

**Introduction**
Spanning Tree Protocol (STP) is a Layer 2 protocol designed to prevent loops in switched networks when redundant links are connected.

**How STP Works**
- **Root Bridge Election:** The switch with the lowest Bridge ID is elected as the center (Root Bridge).
- **Port Roles:** Ports are assigned roles such as Root Port (best path to the root), Designated Port (forwarding port), and Blocking Port (blocked to prevent loops).
- **BPDU:** Switches exchange BPDU messages to share information and adapt the Spanning Tree structure when a link fails.

**Conclusion**
STP is an indispensable mechanism in switched networks. It allows networks to have redundancy without suffering from broadcast storms that could crash the system.', 'reading', 2, 4, NULL, '/images/thumbnails/lesson-ccna002-04.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["To route IP packets between separate switches.","To prevent Layer 2 loops in redundant network topologies by blocking redundant paths.","To tag VLAN traffic on trunk links.","To aggregate bandwidth from multiple physical ports."],"question_en":"What is the primary function of Spanning Tree Protocol (STP)?","question_th":"หน้าที่หลักที่สำคัญที่สุดของโปรโตคอล Spanning Tree (STP) คืออะไร?","correct_index":1,"explanation_en":"STP prevents Layer 2 loops, broadcast storms, and MAC database instability by logically blocking redundant ports.","explanation_th":"STP ป้องกันการเกิดข้อมูลวนลูปในระดับ Layer 2 (Loop) โดยวิเคราะห์และปิดพอร์ตสำรองบางตัวไม่ให้ส่งข้อมูลชั่วคราว","options_th":["เพื่อกำหนดเส้นทางแพ็กเก็ต IP ระหว่างสวิตช์แยกกัน","บล็อกเส้นทางซ้ำเพื่อป้องกัน Loop ที่ Layer 2","เพื่อติดแท็กการรับส่งข้อมูล VLAN บนลิงก์ลำตัว","เพื่อรวมแบนด์วิธจากพอร์ตทางกายภาพหลายพอร์ต"]},{"options":["Backup Bridge","Root Bridge","Designated Switch","Primary Switch"],"question_en":"Which switch in an STP topology is elected as the reference point for all path calculations?","question_th":"สวิตช์ตัวใดในโครงสร้าง STP ที่จะได้รับการคัดเลือกให้เป็นจุดอ้างอิงหลักสำหรับการคำนวณระยะทางทั้งหมด?","correct_index":1,"explanation_en":"The Root Bridge is the logical center of the STP topology. All other switches calculate their path costs relative to it.","explanation_th":"Root Bridge คือสวิตช์ที่เป็นจุดศูนย์กลางของโครงสร้างระบบ STP ซึ่งอุปกรณ์ทุกตัวจะวัดระยะเส้นทางอ้างอิงจากตัวนี้","options_th":["สะพานสำรอง","สะพานราก","สวิตช์ที่กำหนด","สวิตช์หลัก"]},{"options":["IP Address and MAC Address","Bridge Priority and MAC Address","Port Priority and Port ID","VLAN ID and IP Address"],"question_en":"What two values make up the STP Bridge ID (BID)?","question_th":"ค่าข้อมูลสองประเภทใดรวมกันประกอบขึ้นเป็น Bridge ID (BID) ในระบบ STP?","correct_index":1,"explanation_en":"The Bridge ID consists of the Bridge Priority (default 32768) and the hardware MAC address of the switch.","explanation_th":"Bridge ID ประกอบด้วยสองส่วน ได้แก่ ค่าระดับความสำคัญ (Bridge Priority) และหมายเลข MAC address ทางกายภาพของอุปกรณ์","options_th":["ที่อยู่ IP และที่อยู่ MAC","ลำดับความสำคัญของบริดจ์และที่อยู่ MAC","ลำดับความสำคัญของพอร์ตและรหัสพอร์ต","รหัส VLAN และที่อยู่ IP"]},{"options":["Blocking","Listening","Learning","Forwarding"],"question_en":"Which STP port state allows the port to send and receive user data?","question_th":"พอร์ตสถานะใดของ STP ที่เริ่มเปิดทำงานให้อุปกรณ์สามารถรับและส่งข้อมูลของผู้ใช้ตามปกติได้?","correct_index":3,"explanation_en":"The Forwarding state allows an STP-enabled port to process frames and forward traffic normally.","explanation_th":"สถานะ Forwarding ยินยอมให้พอร์ตรับส่งเฟรมข้อมูลผู้ใช้และคอยส่งผ่านการทำงานปกติ","options_th":["การปิดกั้น","การฟัง","การเรียนรู้","การส่งต่อ"]},{"options":["The switch with priority 32768.","The switch with priority 4096.","They have equal chance, depending on their IP addresses.","The switch with the higher MAC address."],"question_en":"If a switch has a bridge priority of 32768 and another has 4096, which one is more likely to become the Root Bridge?","question_th":"หากสวิตช์ตัวที่หนึ่งตั้งค่า Priority เป็น 32768 และสวิตช์ตัวที่สองเป็น 4096 อุปกรณ์ตัวใดมีโอกาสเป็น Root Bridge สูงกว่า?","correct_index":1,"explanation_en":"STP elects the Root Bridge based on the lowest Bridge ID. A lower priority value (like 4096) guarantees selection over default values (32768).","explanation_th":"STP จะเลือก Root Bridge จากอุปกรณ์ที่ Bridge ID ต่ำที่สุด ดังนั้นค่า Priority ที่น้อยกว่า (เช่น 4096) จะได้รับการเลือก","options_th":["สวิตช์ที่มีลำดับความสำคัญ 32768","สวิตช์ที่มีลำดับความสำคัญ 4096","พวกเขามีโอกาสเท่าเทียมกัน ขึ้นอยู่กับที่อยู่ IP ของพวกเขา","สวิตช์ที่มีที่อยู่ MAC สูงกว่า"]}]}', NULL),
	('lesson-ts002-04', 'troubleshoot-002', 'EEM และ SPAN', 'EEM and SPAN', '## EEM and SPAN

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
EEM ให้ความสามารถในการตอบสนองปัญหาอัตโนมัติบนตัวอุปกรณ์เอง ในขณะที่ SPAN เปิดโอกาสให้วิศวกรสามารถดักจับแพ็กเก็ตเพื่อวิเคราะห์ปัญหาเชิงลึก ทั้งสองอย่างเป็นเครื่องมือสำคัญสำหรับผู้ดูแลระบบเครือข่ายชั้นสูง', '## EEM and SPAN

**Introduction**
In the Troubleshooting and Monitoring process on Cisco devices, tools like EEM and SPAN are highly effective aides.

**Embedded Event Manager (EEM)**
- A built-in automated scripting system inside Cisco IOS.
- Works on a Trigger-Action basis, e.g., if an interface goes down (Trigger), open a backup port and send an email alert (Action).
- Drastically reduces Downtime without waiting for an admin.

**Switch Port Analyzer (SPAN)**
- Also known as Port Mirroring, it copies data (Traffic) from one port to another port where an analysis tool (like Wireshark) is plugged in.
- Includes Local SPAN (within the same switch) and RSPAN (across switches via a VLAN).

**Conclusion**
EEM provides automated issue response capabilities on the device itself, while SPAN allows engineers to capture packets for in-depth analysis. Both are essential tools for advanced network administrators.', 'reading', 2, 4, NULL, '/images/thumbnails/lesson-ts002-04.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["A tool to monitor switch CPU cooling fans.","A powerful device feature that enables automation of tasks and recovery actions directly on the device in response to system events.","A database manager.","A protocol for physical port aggregation."],"question_en":"What is Cisco EEM (Embedded Event Manager)?","question_th":"ฟังก์ชัน Cisco EEM (Embedded Event Manager) หมายถึงกลไกการทำงานประเภทใด?","correct_index":1,"explanation_en":"EEM is an on-device automation engine. It detects triggers (like syslog alerts, interface down, or timers) and executes configured CLI command scripts.","explanation_th":"เป็นฟังก์ชันสคริปต์อัตโนมัติในตัวเราเตอร์ โดยเปิดให้ดักจับเหตุการณ์ (Event) แล้วสั่งงานแก้วิกฤตด้วย CLI สคริปต์เองได้ทันที","options_th":["เครื่องมือในการตรวจสอบสวิตช์พัดลมระบายความร้อน CPU","ทำ Automation/Recovery ตาม System Event บนอุปกรณ์","ผู้จัดการฐานข้อมูล","โปรโตคอลสำหรับการรวมพอร์ตทางกายภาพ"]},{"options":["Source and Destination","Event (trigger) and Action (commands to execute)","Interface and Protocol","Server and Client"],"question_en":"What are the two main components of an EEM applet?","question_th":"สององค์ประกอบหลักพื้นฐานในการตั้งค่าโครงร่างโครงงานย่อยของ EEM (EEM Applet) คืออะไร?","correct_index":1,"explanation_en":"An EEM applet requires an ''event'' definition (what triggers the script) and one or more ''action'' statements (what commands to run).","explanation_th":"ต้องการสองส่วน ได้แก่ ตัวสัญญากระตุ้นเริ่มงาน (Event trigger) และขั้นตอนชุดคำสั่งที่จะดำเนินการ (Action)","options_th":["ต้นทางและปลายทาง","Event และ Action","อินเทอร์เฟซและโปรโตคอล","เซิร์ฟเวอร์และไคลเอนต์"]},{"options":["To merge multiple VLANs.","To copy (mirror) traffic from source ports or VLANs to a destination port connected to an analyzer or packet sniffer (like Wireshark).","To encrypt local traffic.","To assign IP addresses to switches."],"question_en":"What is the purpose of SPAN (Switched Port Analyzer) in network monitoring?","question_th":"วัตถุประสงค์ในการติดตั้งทำระบบ SPAN (Switched Port Analyzer) ในเครือข่ายสวิตช์คืออะไร?","correct_index":1,"explanation_en":"SPAN (Port Mirroring) copies traffic from monitored interfaces and forwards it to a destination port connected to a packet sniffer, without interrupting normal traffic flow.","explanation_th":"ใช้สะท้อนสำเนาทราฟฟิก (Port Mirroring) จากพอร์ตเป้าหมายส่งออกมายังพอร์ตพิเศษที่ต่อเข้าคอมพิวเตอร์เพื่อเก็บวิเคราะห์แพ็กเก็ต (เช่น Wireshark)","options_th":["เพื่อรวมหลาย VLAN","Mirror Traffic ไป Port วิเคราะห์","เพื่อเข้ารหัสการรับส่งข้อมูลในท้องถิ่น","เพื่อกำหนดที่อยู่ IP ให้กับสวิตช์"]},{"options":["SPAN is for Cisco; RSPAN is for Juniper.","SPAN mirrors traffic locally on the same switch; RSPAN (Remote SPAN) mirrors traffic across multiple switches over a dedicated VLAN.","SPAN is slower than RSPAN.","RSPAN is wireless port mirroring."],"question_en":"What is the difference between SPAN and RSPAN?","question_th":"ข้อแตกต่างระหว่างระบบ SPAN และ RSPAN คือข้อใด?","correct_index":1,"explanation_en":"SPAN is restricted to a single local switch. RSPAN mirrors traffic from source ports on one switch and transmits it across a designated RSPAN VLAN to a destination port on another switch.","explanation_th":"SPAN ทำการสะท้อนข้อมูลอยู่ภายในอุปกรณ์ตัวเดียวกัน ส่วน RSPAN จะนำทราฟฟิกข้ามเครือข่ายสวิตช์หลายพอยต์ผ่านวง VLAN พิเศษที่แยกสิทธิ์ไว้","options_th":["SPAN มีไว้สำหรับซิสโก้ RSPAN สำหรับจูนิเปอร์","SPAN Mirror ใน Switch เดียว; RSPAN ข้าม Switch ผ่าน VLAN","SPAN ช้ากว่า RSPAN","RSPAN คือการมิเรอร์พอร์ตไร้สาย"]},{"options":["It opens a remote web session.","It defines the source ports/VLANs and the destination mirror port under a matching session ID.","It automatically runs security auditing.","It shuts down the switch interface."],"question_en":"In a SPAN configuration on a Cisco switch, what does the ''session'' command do?","question_th":"ในการตั้งค่า SPAN บนสวิตช์ Cisco คำสั่ง ''session'' มีบทบาทในการทำหน้าที่อะไร?","correct_index":1,"explanation_en":"The ''monitor session <id>'' command is used to group source interfaces and destination mirroring ports in SPAN configurations.","explanation_th":"คำสั่ง ''monitor session <id>'' ใช้จับคู่และจัดกลุ่มรวมพอร์ตต้นทางและพอร์ตออกปลายทางของชุดกระจายสัญญาณสะท้อนข้อมูล","options_th":["จะเปิดเซสชันเว็บระยะไกล","กำหนด Source และ Destination Port ใน Session เดียว","มันดำเนินการตรวจสอบความปลอดภัยโดยอัตโนมัติ","มันปิดอินเทอร์เฟซสวิตช์"]}]}', NULL),
	('lesson-ccna001-04', 'ccna-001', 'Network Devices', 'Network Devices', '## Ethernet และพื้นฐาน LAN

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้อธิบายการทำงานของ Ethernet ซึ่งเป็นเทคโนโลยี LAN ที่ใช้งานแพร่หลายที่สุดในโลก

**เนื้อหาหลัก**
- โครงสร้าง Ethernet Frame และ MAC Address (48 บิต ไม่ซ้ำกันในโลก)
- วิธีการส่งข้อมูลแบบ Half-duplex และ Full-duplex
- ความแตกต่างระหว่าง Hub, Switch และ Bridge
- มาตรฐาน Ethernet ต่างๆ เช่น 10/100/1000 Mbps (Fast/Gigabit Ethernet)
- การทำงานของ ARP (Address Resolution Protocol) เพื่อแปลง IP → MAC

**สรุป**
ความเข้าใจ Ethernet และ MAC Address เป็นรากฐานของการทำงานบน Layer 2 ทั้งหมด ก่อนที่จะเรียน VLAN และ Switching ขั้นสูงต่อไป', '## Ethernet and LAN Fundamentals

**What you will learn in this video**
This video explains the operation of Ethernet, the most widely used LAN technology in the world.

**Core Content**
- Ethernet Frame structure and MAC Addresses (48-bit, globally unique).
- Half-duplex and Full-duplex transmission methods.
- Differences between Hubs, Switches, and Bridges.
- Various Ethernet standards such as 10/100/1000 Mbps (Fast/Gigabit Ethernet).
- How ARP (Address Resolution Protocol) works to map IP to MAC.

**Conclusion**
Understanding Ethernet and MAC Addresses is the foundation for all Layer 2 operations before moving on to advanced VLANs and Switching.', 'video', 8, 4, 'https://www.youtube.com/watch?v=1z0ULvg_pW8', '/images/thumbnails/lesson-ccna001-04.jpg', NULL, '2026-05-18 10:02:06.461001+00', '2026-05-19 10:29:10.623729+00', '{"questions":[{"options":["Hub","Network Switch","Router","Repeater"],"question_en":"Which device operates at Layer 2 (Data Link) and forwards traffic based on MAC addresses?","question_th":"อุปกรณ์ใดทำงานที่ Layer 2 (Data Link) และคอยส่งข้อมูลต่ออิงตามตำแหน่ง MAC address?","correct_index":1,"explanation_en":"Switches use MAC address tables to intelligently forward frames to specific ports in Layer 2.","explanation_th":"สวิตช์ใช้ตาราง MAC address เพื่อสลับส่งเฟรมข้อมูลไปยังพอร์ตปลายทางที่ถูกต้องใน Layer 2","options_th":["ฮับ","สวิตช์เครือข่าย","เราเตอร์","รีพีทเตอร์"]},{"options":["Switches use IP addresses; routers use MAC addresses.","Switches use MAC addresses within a single network; routers use IP addresses to route between separate networks.","Switches operate at Layer 3; routers operate at Layer 2.","Switches only connect wireless clients."],"question_en":"What is the primary difference between a Layer 2 switch and a router?","question_th":"ข้อแตกต่างหลักระหว่างสวิตช์ Layer 2 และเร้าเตอร์คืออะไร?","correct_index":1,"explanation_en":"Switches forward frames within a LAN segment using MAC addresses, whereas routers connect separate IP networks using IP routing.","explanation_th":"สวิตช์ส่งต่อข้อมูลภายในเครือข่ายเดียวโดยอิงจาก MAC address ส่วนเร้าเตอร์เชื่อมข้ามเครือข่ายโดยใช้ IP address","options_th":["สวิตช์ใช้ที่อยู่ IP เราเตอร์ใช้ที่อยู่ MAC","Switch ใช้ MAC ภายใน LAN ส่วน Router ใช้ IP ข้ามเครือข่าย","สวิตช์ทำงานที่เลเยอร์ 3; เราเตอร์ทำงานที่เลเยอร์ 2","สวิตช์เชื่อมต่อเฉพาะไคลเอนต์ไร้สายเท่านั้น"]},{"options":["It is more expensive.","It floods all incoming traffic out of every port, causing collision domains and security risks.","It does not support Ethernet cables.","It lacks physical status lights."],"question_en":"Why is a network hub considered inefficient compared to a network switch?","question_th":"เหตุใดอุปกรณ์ฮับ (Hub) จึงถือว่าไม่มีประสิทธิภาพเมื่อเทียบกับสวิตช์?","correct_index":1,"explanation_en":"Hubs act as physical repeaters, forwarding all traffic to all ports. This creates a single large collision domain.","explanation_th":"ฮับทำหน้าที่ส่งสัญญาณซ้ำไปทุกพอร์ต ส่งผลให้เกิดการชนกันของข้อมูล (Collision) และส่งผลเสียต่อความปลอดภัยเครือข่าย","options_th":["มันมีราคาแพงกว่า","ส่ง Frame ทุก Port จนเกิด Collision","ไม่รองรับสายอีเธอร์เน็ต","ไม่มีไฟแสดงสถานะทางกายภาพ"]},{"options":["Router","Access Point","Firewall","Repeater"],"question_en":"Which network security device monitors and filters network traffic based on predefined security rules?","question_th":"อุปกรณ์ความปลอดภัยเครือข่ายใดทำหน้าที่ตรวจสอบและคัดกรองทราฟฟิกข้อมูลตามกฎระเบียบที่ตั้งไว้?","correct_index":2,"explanation_en":"A Firewall filters inbound and outbound traffic to protect networks from unauthorized access.","explanation_th":"ไฟร์วอลล์ (Firewall) ป้องกันระบบโดยตรวจสอบและสกัดทราฟฟิกเข้าออกตามนโยบายความปลอดภัย","options_th":["เราเตอร์","จุดเข้าใช้งาน","ไฟร์วอลล์","รีพีทเตอร์"]},{"options":["Repeater","Switch","Router","Firewall"],"question_en":"Which device is used to extend the range of a network by receiving and regenerating physical signals?","question_th":"อุปกรณ์ใดใช้ขยายระยะทางการรับส่งข้อมูลโดยรับและปรับเพิ่มคุณภาพสัญญาณทางกายภาพใหม่?","correct_index":0,"explanation_en":"A Repeater operates at Layer 1 (Physical) to regenerate signals and overcome cable distance limitations.","explanation_th":"เครื่องทวนสัญญาณ (Repeater) ทำงานใน Layer 1 เพื่อกู้คืนและขยายสัญญาณที่อ่อนแรงลงเนื่องจากระยะสายเคเบิล","options_th":["รีพีทเตอร์","สวิตช์","เราเตอร์","ไฟร์วอลล์"]}]}', NULL),
	('lesson-ccna002-01', 'ccna-002', 'พื้นฐาน Ethernet Switching', 'Ethernet Switching Basics', '## พื้นฐานการทำงานของ Switch

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้อธิบายกลไกภายในของ Network Switch ซึ่งเป็นหัวใจของเครือข่าย LAN ทุกแห่ง

**เนื้อหาหลัก**
- Switch เรียนรู้ MAC Address ของอุปกรณ์ที่เชื่อมต่อและเก็บไว้ใน **MAC Address Table (CAM Table)**
- กระบวนการตัดสินใจส่งข้อมูล: Unicast, Multicast, Broadcast
- **Flooding:** เมื่อ Switch ไม่รู้ว่า MAC อยู่ที่พอร์ตไหน จะ Flood ออกทุกพอร์ต
- การจัดการ **STP (Spanning Tree Protocol)** เพื่อป้องกัน Loop
- **Port States:** Blocking → Listening → Learning → Forwarding

**สรุป**
การเข้าใจว่า Switch ทำงานอย่างไร ช่วยให้ Troubleshoot ปัญหา LAN ได้ เช่น Loop, Broadcast Storm หรือ MAC Flooding Attack', '## Switch Fundamentals

**What you will learn in this video**
This video explains the internal mechanics of a Network Switch, the heart of every LAN network.

**Core Content**
- Switches learn the MAC Addresses of connected devices and store them in the **MAC Address Table (CAM Table)**.
- Forwarding decisions: Unicast, Multicast, Broadcast.
- **Flooding:** When a switch doesn''t know which port a MAC belongs to, it floods the frame out all ports.
- **STP (Spanning Tree Protocol)** management to prevent loops.
- **Port States:** Blocking → Listening → Learning → Forwarding.

**Conclusion**
Understanding how a switch operates helps in troubleshooting LAN issues such as Loops, Broadcast Storms, or MAC Flooding Attacks.', 'video', 4, 1, 'https://www.youtube.com/watch?v=GMEeFI5Iao8', '/images/thumbnails/lesson-ccna002-01.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["IP Address","MAC Address","Port Number","Autonomous System Number"],"question_en":"What type of address does an Ethernet switch use to make forwarding decisions?","question_th":"สวิตช์อีเธอร์เน็ต (Ethernet Switch) ใช้แอดเดรสประเภทใดในการกำหนดแนวทางส่งข้อมูลเฟรม?","correct_index":1,"explanation_en":"Ethernet switches operate at Layer 2 and forward frames using destination MAC addresses.","explanation_th":"สวิตช์อีเธอร์เน็ตทำงานใน Layer 2 และตัดสินใจส่งต่อข้อมูลโดยตรวจสอบ MAC address ปลายทาง","options_th":["ที่อยู่ IP","ที่อยู่ MAC","หมายเลขพอร์ต","หมายเลขระบบอัตโนมัติ"]},{"options":["It queries a DNS server.","It learns source MAC addresses from incoming frames on each interface.","It is hardcoded by the administrator.","It learns them from routing tables."],"question_en":"How does a switch build its MAC Address Table?","question_th":"สวิตช์สร้างตารางข้อมูล MAC Address Table ของตนเองขึ้นมาได้อย่างไร?","correct_index":1,"explanation_en":"A switch populates its MAC table dynamically by recording the source MAC address of received frames and mapping them to incoming ports.","explanation_th":"สวิตช์เรียนรู้ตำแหน่งของอุปกรณ์โดยบันทึก MAC address ต้นทาง (Source MAC) ที่ส่งเข้ามาจากพอร์ตอินเตอร์เฟสนั้นๆ","options_th":["มันสอบถามเซิร์ฟเวอร์ DNS","เรียนรู้ Source MAC จาก Frame ขาเข้า","มันถูกฮาร์ดโค้ดโดยผู้ดูแลระบบ","มันเรียนรู้จากตารางเส้นทาง"]},{"options":["It discards the frame immediately.","It floods the frame out of all ports except the receiving port.","It queries the default gateway.","It sends an ICMP error message back."],"question_en":"What action does a switch take when it receives a frame with an unknown destination MAC address?","question_th":"สวิตช์จะดำเนินการอย่างไรเมื่อได้รับเฟรมข้อมูลที่มีปลายทางเป็น MAC address ที่ไม่รู้จักในตาราง?","correct_index":1,"explanation_en":"When a destination MAC is not in the MAC table, the switch performs unknown unicast flooding, broadcasting it out of all active ports except the ingress port.","explanation_th":"หากไม่พบข้อมูลแอดเดรสปลายทาง สวิตช์จะทำการกระจายข้อมูลออกไปทุกพอร์ตที่มีสถานะทำงานอยู่ ยกเว้นพอร์ตที่ข้อมูลนั้นวิ่งเข้ามา","options_th":["มันจะทิ้งเฟรมทันที","มันท่วมเฟรมออกจากพอร์ตทั้งหมดยกเว้นพอร์ตรับ","มันสอบถามเกตเวย์เริ่มต้น","มันจะส่งข้อความแสดงข้อผิดพลาด ICMP กลับมา"]},{"options":["32 bits","48 bits","64 bits","128 bits"],"question_en":"What is the standard size of a MAC address?","question_th":"ขนาดมาตรฐานของ MAC address คือเท่าใด?","correct_index":1,"explanation_en":"A MAC address is a 48-bit (6-byte) physical address represented in hexadecimal format.","explanation_th":"MAC address เป็นเลขแอดเดรสทางกายภาพขนาด 48 บิต (6 ไบต์) เขียนแทนในรูปแบบฐานสิบหก","options_th":["32 บิต","48 บิต","64 บิต","128 บิต"]},{"options":["Half-Duplex","Full-Duplex","Simplex","Auto-sensing only"],"question_en":"In what transmission mode can a switch port send and receive data at the same time?","question_th":"โหมดการรับส่งข้อมูลแบบใดบนพอร์ตสวิตช์ที่อนุญาตให้รับและส่งข้อมูลพร้อมกันได้?","correct_index":1,"explanation_en":"Full-Duplex communication allows simultaneous bidirectional data transmission without collision risks.","explanation_th":"โหมดฟูลดูเพล็กซ์ (Full-Duplex) รองรับการรับและส่งข้อมูลในเวลาเดียวกันโดยช่วยเลี่ยงปัญหาการชนกันของสัญญาณ","options_th":["ฮาล์ฟดูเพล็กซ์","ฟูลดูเพล็กซ์","Simplex","การตรวจจับอัตโนมัติเท่านั้น"]}]}', NULL),
	('lesson-ccna002-05', 'ccna-002', 'VTP', 'VTP ', '## VTP

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนหัวข้อสำคัญ: การจัดการ VLAN ด้วย VTP และการทำให้ VLAN ต่างๆ สื่อสารกันได้ พร้อม Lab ครบถ้วน

**เนื้อหาหลัก**
**VTP (VLAN Trunking Protocol)**
- ซิงค์ข้อมูล VLAN Database อัตโนมัติระหว่าง Switch บน Trunk Links
- มี 3 Mode: **Server** (สร้าง/แก้ไข/ลบ VLAN ได้), **Client** (รับข้อมูลอย่างเดียว), **Transparent** (ไม่เข้าร่วม)
- ⚠ **ความเสี่ยง:** นำ Switch ใหม่ที่มี VTP Revision Number สูงกว่าเข้าวง จะ Overwrite VLAN Database ทั้งหมด!

**สรุป**
VTP ช่วยลดงาน Admin แต่ต้องระวังความเสี่ยง Inter-VLAN Routing ช่วยให้ทุก VLAN สื่อสารข้ามกันได้ตาม Policy ที่กำหนด ซึ่งเราจะได้เรียนรู้ในบทถัดไป', '## VTP and Inter-VLAN Routing

**What you will learn in this video**
This video teaches 2 key topics: managing VLANs with VTP and enabling VLANs to communicate with each other.

**Core Content**

**VTP (VLAN Trunking Protocol)**
- Automatically syncs VLAN Database across Switches.
- 3 Modes: **Server** (create/edit VLANs), **Client** (receive data only), **Transparent** (does not participate).
- ⚠️ Warning: Bringing a new Switch with a higher VTP Revision into the network can wipe out all VLANs!

**Inter-VLAN Routing**
- **Router-on-a-Stick:** Uses 1 Router with a Sub-interface to route between VLANs.
- **Layer 3 Switch (SVI):** The preferred enterprise method, using `ip routing` and creating `interface vlan X`.

**Conclusion**
VTP reduces Admin workload but carries risks. Inter-VLAN routing enables all VLANs to cross-communicate based on defined policies.', 'video', 18, 5, 'https://www.youtube.com/watch?v=Nlyx5lFQR34', '/images/thumbnails/lesson-ccna002-05.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["IP routing configurations.","The creation, deletion, and synchronization of VLAN definitions across switches.","Port security monitoring.","Spanning tree path calculations."],"question_en":"What does VTP (VLAN Trunking Protocol) simplify in a switch network?","question_th":"โปรโตคอล VTP (VLAN Trunking Protocol) ช่วยลดความยุ่งยากในเรื่องใดของระบบเครือข่าย?","correct_index":1,"explanation_en":"VTP propagates the addition, deletion, and renaming of VLANs to all switches within a VTP domain, reducing administrative overhead.","explanation_th":"VTP คอยแจกจ่ายข้อมูลการเพิ่ม ลบ หรือแก้ไขชื่อ VLAN ไปให้สวิตช์เครือข่ายตัวอื่นๆ ใน VTP Domain เดียวกันโดยอัตโนมัติ","options_th":["การกำหนดค่า IP Routing","สร้าง ลบ และ Sync VLAN ระหว่าง Switch","การตรวจสอบ Port Security","การคำนวณเส้นทาง Spanning Tree"]},{"options":["VTP Server","VTP Client","VTP Transparent","VTP Off"],"question_en":"In which VTP mode can you create, modify, and delete VLANs that will propagate to other switches?","question_th":"ในโหมด VTP ใดที่คุณสามารถเพิ่ม ลบ หรือแก้ไข VLAN แล้วส่งผลกระทบสะท้อนไปยังสวิตช์เครือข่ายตัวอื่นๆ?","correct_index":0,"explanation_en":"VTP Server is the default mode where administrators make VLAN changes which are saved in NVRAM and advertised.","explanation_th":"VTP Server คือโหมดเริ่มต้นที่อนุญาตให้ผู้ดูแลระบบแก้ไขข้อมูล VLAN และคอยส่งข่าวสารอัปเดตกระจายไปยังตัวอื่นๆ","options_th":["VTP Server","VTP Client","VTP Transparent","ปิด VTP"]},{"options":["It can create VLANs but cannot delete them.","It cannot create, modify, or delete VLANs locally, and must learn them from a VTP Server.","It does not participate in VTP at all.","It saves VLAN configuration in NVRAM."],"question_en":"What is a characteristic of a switch configured in VTP Client mode?","question_th":"ข้อใดเป็นคุณสมบัติจำเพาะของสวิตช์ที่ตั้งค่าเป็น VTP Client?","correct_index":1,"explanation_en":"VTP Clients cannot modify the VLAN database locally; they only synchronize their VLANs based on advertisements from VTP Servers.","explanation_th":"VTP Client จะไม่สามารถแก้ไขฐานข้อมูล VLAN ได้เองในตัว แต่ต้องรอรับข่าวสารการซิงโครไนซ์จาก Server","options_th":["สามารถสร้าง VLAN ได้ แต่ไม่สามารถลบออกได้","แก้ VLAN เองไม่ได้ ต้องรับจาก VTP Server","มันไม่ได้มีส่วนร่วมใน VTP เลย","บันทึกการกำหนดค่า VLAN ใน NVRAM"]},{"options":["By comparing the timestamps.","By comparing the Configuration Revision Number.","By validating the MD5 checksum hash.","By checking the server''s IP address."],"question_en":"How does VTP determine whether an incoming advertisement contains more recent information than the local database?","question_th":"VTP ทราบได้อย่างไรว่าข้อมูลที่ส่งมาจากเพื่อนบ้านมีความเป็นปัจจุบันและใหม่กว่าตารางข้อมูลภายในตนเอง?","correct_index":1,"explanation_en":"Switches check the Configuration Revision Number. If the revision number in the advertisement is higher than the local revision, the switch updates its VLAN database.","explanation_th":"สวิตช์ตรวจสอบผ่านหมายเลขปรับปรุง (Configuration Revision Number) หากค่าที่ส่งมาสูงกว่าค่าปัจจุบัน แปลว่าเป็นข้อมูลที่อัปเดตกว่า","options_th":["โดยการเปรียบเทียบการประทับเวลา","โดยการเปรียบเทียบหมายเลขการแก้ไขการกำหนดค่า","โดยการตรวจสอบแฮชเช็คซัม MD5","โดยการตรวจสอบที่อยู่ IP ของเซิร์ฟเวอร์"]},{"options":["It discards VTP advertisements without forwarding them.","It forwards VTP advertisements but does not apply the VLAN changes locally, allowing local VLAN modifications.","It behaves exactly like a VTP Client.","It automatically becomes the Root VTP Server."],"question_en":"What is the behavior of a switch in VTP Transparent mode?","question_th":"ลักษณะการทำงานของสวิตช์เครือข่ายในโหมด VTP Transparent คือข้อใด?","correct_index":1,"explanation_en":"Transparent mode switches do not synchronize with VTP advertisements but forward them to other switches, maintaining a localized VLAN database.","explanation_th":"VTP Transparent จะไม่ซิงค์ค่าใดๆ จาก VTP Server แต่จะคอยส่งต่อข่าวสาร VTP ไปให้ตัวอื่น และสามารถเขียนหรือลบ VLAN ในตัวเองได้แยกต่างหาก","options_th":["ทิ้งประกาศ VTP โดยไม่ส่งต่อ","ส่งต่อ VTP แต่ไม่ใช้การเปลี่ยนแปลง จึงแก้ VLAN เองได้","มันทำงานเหมือนกับไคลเอนต์ VTP ทุกประการ","มันจะกลายเป็นเซิร์ฟเวอร์ Root VTP โดยอัตโนมัติ"]}]}', NULL),
	('lesson-ccna003-01', 'ccna-003', 'หลักการ Routing พื้นฐาน', 'Routing Fundamentals', '## พื้นฐาน Routing

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้อธิบายหลักการทำงานของ Router และการตัดสินใจส่งข้อมูลข้ามเครือข่าย

**เนื้อหาหลัก**
- Router ทำงานที่ Layer 3 ส่งข้อมูลระหว่างเครือข่าย (Network) ต่างๆ โดยอ้างอิง Routing Table
- **Routing Table:** ตารางที่เก็บเส้นทางไปยัง Network ต่างๆ ประกอบด้วย Destination, Next-Hop, Interface, Metric
- **Administrative Distance (AD):** ค่าความน่าเชื่อถือของแหล่งข้อมูล เช่น Connected=0, Static=1, OSPF=110, RIP=120
- **Metric:** ค่าที่ Routing Protocol ใช้วัดความดีของเส้นทาง เช่น Hop Count, Bandwidth, Delay

**สรุป**
ทุกครั้งที่แพ็กเก็ตมาถึง Router มันจะค้นหาใน Routing Table หาก Match กับ Entry ไหน ก็จะส่งออกไปยัง Next-Hop ของ Entry นั้น', '## Routing Basics

**What you will learn in this video**
This video explains the principles of a Router and how it makes data forwarding decisions across networks.

**Core Content**
- A Router operates at Layer 3, transmitting data between different networks by referencing its Routing Table.
- **Routing Table:** A table storing paths to various networks, containing Destination, Next-Hop, Interface, Metric.
- **Administrative Distance (AD):** The trustworthiness value of a routing source, e.g., Connected=0, Static=1, OSPF=110, RIP=120.
- **Metric:** The value a Routing Protocol uses to measure route quality, such as Hop Count, Bandwidth, Delay.

**Conclusion**
Every time a packet arrives at a Router, it searches the Routing Table. If it matches an Entry, it forwards the packet to that Entry''s Next-Hop.', 'video', 7, 1, 'https://www.youtube.com/watch?v=gQtgtKtvRdo&t=77s', '/images/thumbnails/lesson-ccna003-01.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["MAC Address Table","Routing Table","ARP Cache","NAT Table"],"question_en":"What is the primary lookup table a router uses to determine the next hop for a packet?","question_th":"ตารางตรวจสอบเส้นทางหลักใดที่เร้าเตอร์นำมาสแกนข้อมูลเพื่อตัดสินใจพานำแพ็กเก็ตไปยัง Next Hop?","correct_index":1,"explanation_en":"Routers inspect their routing table to match destination IP prefixes and find forwarding interfaces.","explanation_th":"เร้าเตอร์จะเปรียบเทียบข้อมูลไอพีปลายทางเข้ากับรายการภายในตารางหาเส้นทาง (Routing Table) เพื่อชี้จุดนำส่ง","options_th":["ตารางที่อยู่ MAC","ตารางเส้นทาง","แคช ARP","ตาราง แนท"]},{"options":["Metric","Administrative Distance (AD)","Hop Count","Cost"],"question_en":"What value represents the trustworthiness of a routing source in Cisco routers?","question_th":"ค่าตัวเลขใดที่แสดงถึงระดับความน่าเชื่อถือของแหล่งที่มาของข้อมูลการจัดเส้นทางในเร้าเตอร์ Cisco?","correct_index":1,"explanation_en":"Administrative Distance (AD) is the measure of routing source preference. Lower values are more trusted.","explanation_th":"Administrative Distance (AD) เป็นค่าแสดงความน่าเชื่อถือของแต่ละช่องทางจัดเส้นทาง โดยค่าที่ต่ำกว่าจะได้รับความสำคัญสูงสุด","options_th":["เมตริก","ระยะบริหาร (AD)","ฮอปนับ","Cost"]},{"options":["Directly Connected","Static Route","OSPF","EIGRP"],"question_en":"Which of the following routing sources has the default Administrative Distance of 1?","question_th":"แหล่งที่มาของเส้นทางในข้อใดต่อไปนี้ที่มีค่า Administrative Distance (AD) เริ่มต้นเท่ากับ 1?","correct_index":1,"explanation_en":"Directly connected routes have an AD of 0. Static routes have a default AD of 1.","explanation_th":"เส้นทางเชื่อมต่อตรงมี AD เป็น 0 ส่วนการคอนฟิกเส้นทางแบบกำหนดเอง (Static Route) จะมี AD เริ่มต้นเป็น 1","options_th":["เชื่อมต่อโดยตรง","เส้นทางแบบคงที่","OSPF","EIGRP"]},{"options":["90","110","120","170"],"question_en":"What is the default Administrative Distance of OSPF routes?","question_th":"ค่า Administrative Distance (AD) เริ่มต้นของโปรโตคอล OSPF คือเท่าใด?","correct_index":1,"explanation_en":"OSPF has a default Administrative Distance of 110.","explanation_th":"OSPF ถูกกำหนดค่า Administrative Distance เริ่มต้นอยู่ที่ระดับ 110","options_th":["90","110","120","170"]},{"options":["Loopback Route","Default Route (0.0.0.0/0)","Static Host Route","Connected Route"],"question_en":"What routing table entry is matched when no specific route exists for a destination packet?","question_th":"ข้อมูลแถวใดในตารางเร้าติ้งจะถูกนำมาใช้งานเมื่อไม่มีเส้นทางเฉพาะอื่นตรงกับเลขไอพีปลายทางของแพ็กเก็ตเลย?","correct_index":1,"explanation_en":"The default route (0.0.0.0/0) acts as a gateway of last resort, matching all traffic when no specific entry exists.","explanation_th":"Default Route (ระบุเป็น 0.0.0.0/0) ทำหน้าที่เป็นประตูท้ายสุดในการนำส่งแพ็กเก็ตเมื่อไม่พบข้อมูลนำทางที่เจาะจงกว่า","options_th":["เส้นทางย้อนกลับ","เส้นทางเริ่มต้น (0.0.0.0/0)","เส้นทางโฮสต์แบบคงที่","เส้นทางเชื่อมต่อ"]}]}', NULL),
	('lesson-ccna003-03', 'ccna-003', 'RIP (Routing Information Protocol)', 'RIP (Routing Information Protocol)', '## RIP (Routing Information Protocol)

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
แม้ในปัจจุบันองค์กรใหญ่ๆ จะหันไปใช้ OSPF หรือ EIGRP แต่ RIP ยังคงเป็นโปรโตคอลพื้นฐานที่สำคัญในการศึกษาทำความเข้าใจหลักการทำงานของ Dynamic Routing', '## RIP (Routing Information Protocol)

**Introduction**
RIP is one of the oldest Distance Vector Routing Protocols, designed for small to medium-sized networks.

**Core Features**
- **Metric:** Uses Hop Count to select paths, where the route with the fewest hops is considered the best.
- **Limitation:** Supports a maximum of 15 Hops (16 is considered Unreachable).
- **RIPv1 vs RIPv2:** RIPv1 is Classful (does not send Subnet masks), while RIPv2 supports Classless Inter-Domain Routing (CIDR) and Authentication.

**Basic Configuration Example**
```text
Router(config)# router rip
Router(config-router)# version 2
Router(config-router)# network 192.168.1.0
```

**Conclusion**
Although modern large organizations use OSPF or EIGRP, RIP remains an essential fundamental protocol for studying and understanding Dynamic Routing principles.', 'reading', 2, 3, NULL, '/images/thumbnails/lesson-ccna003-03.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["Link State","Distance Vector","Path Vector","Link Vector"],"question_en":"What classification of routing protocol is RIP?","question_th":"RIP จัดเป็นโปรโตคอลเร้าติ้งประเภทใดตามลักษณะการออกแบบ?","correct_index":1,"explanation_en":"RIP is a classic Distance Vector routing protocol that determines paths using hop count metrics.","explanation_th":"RIP เป็นโปรโตคอลประเภท Distance Vector ยุคเก่าซึ่งคำนวณการวัดระยะโดยพิจารณาจากจำนวน Hop","options_th":["Link State","Distance Vector","Path Vector","ลิงค์เวกเตอร์"]},{"options":["Maximum 10 hops; 11 is unreachable.","Maximum 15 hops; 16 is unreachable.","Maximum 255 hops; 256 is unreachable.","Unlimited hops."],"question_en":"What is the maximum hop count allowed in RIP? At what number is a destination considered unreachable?","question_th":"จำนวน Hop สูงสุดที่โปรโตคอล RIP ยินยอมให้ส่งผ่านข้อมูลคือเท่าใด? และค่าเท่าใดที่ถือว่าไปไม่ถึงปลายทาง?","correct_index":1,"explanation_en":"RIP allows a maximum hop count of 15. A hop count of 16 is defined as infinite (unreachable) to prevent routing loops.","explanation_th":"RIP ยอมรับระยะส่งได้ไม่เกิน 15 Hop โดยหากวัดได้ค่าที่ 16 จะตีความว่าทางขาด (unreachable) เพื่อตัดลูป","options_th":["สูงสุด 10 ฮ็อพ; 11 เข้าไม่ได้","สูงสุด 15 ฮ็อพ; 16 เข้าไม่ได้","สูงสุด 255 ฮอป; 256 ไม่สามารถเข้าถึงได้","กระโดดได้ไม่จำกัด"]},{"options":["RIPv2 uses link state Dijkstra algorithm.","RIPv2 is classless, supporting CIDR and subnet masks in updates.","RIPv2 allows hop counts up to 100.","RIPv2 sends updates via broadcast only."],"question_en":"What is a key improvement of RIPv2 compared to the original RIPv1?","question_th":"จุดปรับปรุงที่สำคัญของ RIPv2 เมื่อเทียบกับเวอร์ชันแรก (RIPv1) คืออะไร?","correct_index":1,"explanation_en":"RIPv2 is classless, transmitting subnet mask information within updates and supporting VLSM, whereas RIPv1 is classful.","explanation_th":"RIPv2 เปลี่ยนผ่านเป็นระบบ Classless ที่แนบรายละเอียดซับเน็ตมาสก์ไปในแพ็กเก็ตข่าวสาร จึงรองรับการแบ่ง VLSM ต่างจาก RIPv1","options_th":["RIPv2 ใช้อัลกอริทึม Dijkstra สถานะลิงก์","RIPv2 รองรับ CIDR และ Subnet Mask","RIPv2 อนุญาตให้นับฮอปได้สูงสุด 100","RIPv2 ส่งการอัปเดตผ่านการออกอากาศเท่านั้น"]},{"options":["224.0.0.5","224.0.0.9","224.0.0.10","255.255.255.255"],"question_en":"What multicast address does RIPv2 use to send routing updates to neighbors?","question_th":"RIPv2 ใช้ที่อยู่มัลติแคสต์ (Multicast address) เลขใดในการส่งข่าวสารอัปเดตไปยังเร้าเตอร์เพื่อนบ้าน?","correct_index":1,"explanation_en":"RIPv2 broadcasts updates to neighbors using the multicast address 224.0.0.9, unlike RIPv1 which uses Layer 3 broadcasts.","explanation_th":"RIPv2 คุยแบบมัลติแคสต์ผ่านแอดเดรส 224.0.0.9 ซึ่งต่างจาก RIPv1 ที่ใช้วิธีส่งแบบบรอดแคสต์ขยายวงกว้าง","options_th":["224.0.0.5","224.0.0.9","224.0.0.10","255.255.255.255"]},{"options":["90","110","120","170"],"question_en":"What is the default Administrative Distance of RIP?","question_th":"ค่า Administrative Distance (AD) เริ่มต้นของโปรโตคอล RIP คือเท่าใด?","correct_index":2,"explanation_en":"RIP has a default Administrative Distance of 120.","explanation_th":"RIP มีค่าระดับความเชื่อมั่นในตารางเร้าติ้ง (Administrative Distance) เริ่มต้นอยู่ที่ 120","options_th":["90","110","120","170"]}]}', NULL),
	('lesson-sec-01', 'sec-001', 'Firewall Basics', 'Firewall Basics', '## Firewall Basics

**สิ่งที่จะได้เรียนในคลิปนี้**
ในคลิปนี้เราจะปูพื้นฐานความเข้าใจเรื่อง Firewall ตั้งแต่ประเภทของ Firewall แต่ละชนิด การแบ่ง Security Zone, DMZ รวมถึงการทำงานของ Cisco ASA

**เนื้อหาหลัก**
- **ประเภทของ Firewall:**
  - **Packet Filter:** ทำงานที่ Layer 3/4 ตรวจสอบ Header แบบ Stateless
  - **Stateful Inspection:** ติดตาม State ของ Connection ผ่าน State Table
  - **Proxy Firewall:** ตรวจสอบ Traffic ที่ Layer 7 มองเห็น Application Data
  - **Next-Generation Firewall (NGFW):** รวมทุกคุณสมบัติพร้อม DPI, App-ID, IPS
- **Security Zones:**
  - **Inside (Trusted):** เครือข่ายภายในองค์กร มีความน่าเชื่อถือสูงสุด
  - **Outside (Untrusted):** อินเทอร์เน็ต หรือเครือข่ายภายนอก
  - **DMZ:** โซนกลางสำหรับวาง Server สาธารณะ (Web, Mail, DNS) แยกจากเครือข่ายภายใน
- **Cisco ASA Security Levels:**
  - ค่าระหว่าง **0 ถึง 100** กำหนดให้กับแต่ละ Interface
  - Security Level 100 = Inside (เชื่อถือสูงสุด)
  - Security Level 0 = Outside (ไม่เชื่อถือ)
  - Traffic ไหลจาก Level สูงไปต่ำ → อนุญาตโดยค่าเริ่มต้น
  - Traffic จาก Level ต่ำไปสูง → บล็อกโดยค่าเริ่มต้น
- **Inbound vs. Outbound Policy:**
  - **Inbound:** Traffic จากอินเทอร์เน็ตเข้าสู่ภายใน — ควบคุมเข้มงวดมาก
  - **Outbound:** Traffic จากภายในออกสู่อินเทอร์เน็ต — ใช้ควบคุมเนื้อหาหรือป้องกัน C&C Traffic

**สรุป**
Firewall เป็นแนวป้องกันแรกและสำคัญที่สุดของเครือข่าย การเลือกใช้ Firewall ประเภทที่เหมาะสมและการออกแบบ Security Zone ที่ดีเป็นพื้นฐานสำคัญของ Network Security Architecture', '## Firewall Basics

**What you will learn in this video**
In this video, we will lay the foundation for understanding Firewalls, from different Firewall types to Security Zones, DMZs, and how Cisco ASA operates.

**Core Content**
- **Firewall Types:**
  - **Packet Filter:** Operates at Layer 3/4, checking Headers statelessly.
  - **Stateful Inspection:** Tracks Connection States via a State Table.
  - **Proxy Firewall:** Inspects Layer 7 Traffic, seeing Application Data.
  - **Next-Generation Firewall (NGFW):** Combines all features plus DPI, App-ID, IPS.
- **Security Zones:**
  - **Inside (Trusted):** Internal corporate network, highest trustworthiness.
  - **Outside (Untrusted):** The Internet or external networks.
  - **DMZ:** A middle zone for public-facing Servers (Web, Mail, DNS) separated from the internal network.
- **Cisco ASA Security Levels:**
  - Values from **0 to 100** assigned to each Interface.
  - Security Level 100 = Inside (Highest trust)
  - Security Level 0 = Outside (Untrusted)
  - Traffic from High to Low Level → Permitted by default
  - Traffic from Low to High Level → Blocked by default
- **Inbound vs. Outbound Policy:**
  - **Inbound:** Traffic from Internet to Inside — highly restricted.
  - **Outbound:** Traffic from Inside to Internet — used to control content or prevent C&C Traffic.

**Conclusion**
Firewalls are the first and most critical line of defense for a network. Choosing the right Firewall type and designing good Security Zones are the foundations of Network Security Architecture.', 'video', 7, 1, 'https://www.youtube.com/watch?v=kDEX1HXybrU', '/images/thumbnails/lesson-sec-01.jpg', NULL, '2026-05-18 10:02:06.461001+00', '2026-05-19 10:29:10.623729+00', '{"questions":[{"options":["To assign IP addresses dynamically.","To isolate and control traffic crossing network boundaries based on security rules.","To act as a centralized file repository.","To accelerate router CPU speeds."],"question_en":"What is the primary role of a firewall in network security?","question_th":"หน้าที่รับผิดชอบหลักของไฟร์วอลล์ (Firewall) ในด้านความปลอดภัยเครือข่ายคืออะไร?","correct_index":1,"explanation_en":"Firewalls establish a barrier between trusted internal networks and untrusted external networks, filtering packet flows.","explanation_th":"ไฟร์วอลล์ทำหน้าที่เป็นตัวคัดกรองขวางกั้นความปลอดภัยระหว่งทราฟฟิกข้อมูลภายในและเครือข่ายอินเทอร์เน็ตที่อันตรายภายนอก","options_th":["เพื่อกำหนดที่อยู่ IP แบบไดนามิก","คุม Traffic ข้ามเขตเครือข่ายตาม Security Rule","เพื่อทำหน้าที่เป็นที่เก็บไฟล์ส่วนกลาง","เพื่อเร่งความเร็ว CPU ของเราเตอร์"]},{"options":["A firewall that inspects the application layer data.","A stateless firewall that inspects individual packet headers (IP addresses and ports) in isolation.","A firewall that prevents physical access to servers.","A hardware component that increases line bandwidth."],"question_en":"What is a Packet Filtering Firewall?","question_th":"ไฟร์วอลล์ประเภทคัดกรองแพ็กเก็ต (Packet Filtering Firewall) มีหลักการทำงานลักษณะใด?","correct_index":1,"explanation_en":"Packet filtering firewalls examine packet headers (IPs, ports, protocol) without maintaining connection state, behaving like basic ACLs.","explanation_th":"เป็นกลุ่มไฟร์วอลล์ไร้สถานะ (Stateless) ที่ส่องเช็คเฉพาะส่วนหัวของแพ็กเก็ตไอพีแยกตัวต่อตัวโดยไม่สนใจประวัติที่ผ่านมา","options_th":["ไฟร์วอลล์ที่ตรวจสอบข้อมูลเลเยอร์แอปพลิเคชัน","Stateless Firewall ตรวจ Header แต่ละ Packet","ไฟร์วอลล์ที่ป้องกันการเข้าถึงเซิร์ฟเวอร์ทางกายภาพ","ส่วนประกอบฮาร์ดแวร์ที่เพิ่มแบนด์วิธของสาย"]},{"options":["Packet Filtering Firewall","Application Gateway (Proxy Firewall / WAF)","Stateful Inspection Firewall","Circuit-Level Gateway"],"question_en":"Which firewall type operates at Layer 7 of the OSI model and inspects application-specific payloads?","question_th":"ไฟร์วอลล์ชนิดใดที่ทำงานอยู่ระดับ Layer 7 (Application) ของ OSI และสแกนเข้าไปตรวจสอบถึงเนื้อหาเฉพาะของตัวโปรแกรม?","correct_index":1,"explanation_en":"Application Layer Firewalls (or proxies) inspect the actual payload of application protocols (like HTTP, FTP) to detect complex threats.","explanation_th":"ไฟร์วอลล์ระดับแอปพลิเคชันหรือพร็อกซี (Application/Proxy Firewall) วิเคราะห์ลึกถึงเลเยอร์บนสุดส่องไฟล์ข้อมูล Payload ข้างใน","options_th":["ไฟร์วอลล์กรองแพ็กเก็ต","ไฟร์วอลล์พร็อกซี / WAF","ไฟร์วอลล์การตรวจสอบสถานะ","เกตเวย์ระดับวงจร"]},{"options":["Basic IP routing only.","Deep packet inspection, application awareness, and integrated Intrusion Prevention Systems (IPS).","Wireless access management.","Half-duplex connectivity support."],"question_en":"What does a Next-Generation Firewall (NGFW) incorporate that legacy firewalls do not?","question_th":"ระบบไฟร์วอลล์ยุคใหม่ NGFW (Next-Generation Firewall) บรรจุความสามารถเสริมด้านใดที่แตกต่างจากรุ่นก่อนเก่า?","correct_index":1,"explanation_en":"NGFWs combine traditional firewall filtering with deep packet inspection (DPI), application intelligence, and anti-malware/IPS services.","explanation_th":"NGFW รวมความสามารถเรื่องตรวจจับแอปพลิเคชัน (Application awareness) ระบบสแกนเชิงลึก (DPI) และป้องกันการเจาะระบบ (IPS)","options_th":["การกำหนดเส้นทาง IP พื้นฐานเท่านั้น","ตรวจ Packet เชิงลึก รู้จัก App และมี IPS","การจัดการการเข้าถึงแบบไร้สาย","รองรับการเชื่อมต่อแบบฮาล์ฟดูเพล็กซ์"]},{"options":["A highly secure room for IT administrators.","A semi-trusted network segment hosting public-facing services (like web servers) isolated from the private LAN.","An offline database backup segment.","The main core internet backbone."],"question_en":"In firewall design, what is a DMZ (Demilitarized Zone)?","question_th":"DMZ (Demilitarized Zone) ในการจัดโซนความปลอดภัยของไฟร์วอลล์หมายถึงพื้นที่ส่วนใด?","correct_index":1,"explanation_en":"A DMZ is a physical or logical subnetwork that exposes external-facing services to the internet while isolating the internal private network.","explanation_th":"เป็นวงเครือข่ายกึ่งสาธารณะเพื่อเอาไว้ให้เครื่องเซิร์ฟเวอร์เผยแพร่ (เช่น เว็บไซต์) โดยมีระบบคัดกรองขวางความเสี่ยงจากเน็ตเวิร์กภายใน","options_th":["ห้องที่มีความปลอดภัยสูงสำหรับผู้ดูแลระบบไอที","โซนกึ่งเชื่อถือสำหรับ Public Service แยกจาก LAN","ส่วนการสำรองฐานข้อมูลออฟไลน์","แกนหลักอินเทอร์เน็ตหลัก"]}]}', NULL),
	('lesson-sec-02', 'sec-001', 'Stateful Inspection', 'Stateful Inspection', '## Stateful Inspection Firewall

**สิ่งที่จะได้เรียนในคลิปนี้**
ในคลิปนี้เราจะเปรียบเทียบ Stateful Inspection Firewall กับ Packet Filtering แบบเดิม และทำความเข้าใจว่า Firewall ยุคใหม่ติดตาม Session ของ TCP และ UDP ได้อย่างไร

**เนื้อหาหลัก**
- **Packet Filtering (Stateless):** ตรวจสอบแต่ละ Packet แบบแยกส่วน ไม่มีความจำเกี่ยวกับ Packet ก่อนหน้า — เปรียบได้กับ "ยามที่จำอะไรไม่ได้"
- **Stateful Inspection:** ติดตาม Context ของการเชื่อมต่อด้วย **State Table** ซึ่งเก็บข้อมูล 5-tuple: Source IP, Source Port, Destination IP, Destination Port, Protocol
- **TCP Session Tracking:**
  - **SYN:** Firewall รับ Packet แรก ตรวจสอบ Policy สร้าง Entry (state: NEW)
  - **SYN-ACK:** Firewall อัปเดตสถานะเป็น ESTABLISHED
  - **ACK:** Handshake สมบูรณ์ อนุญาต Data Packets ที่ตามมาอัตโนมัติ
  - **FIN/RST:** เมื่อ Session จบ Firewall ลบ Entry ออกจากตาราง
- **UDP Pseudo-State Tracking:** UDP ไม่มี Handshake แต่ Firewall สร้าง Virtual Session โดยใช้ Timeout Value (เช่น 2 นาที) แทนสัญญาณ Close
- **ข้อดีด้านความปลอดภัย:**
  - บล็อก Unsolicited Inbound Traffic โดยอัตโนมัติ
  - ป้องกัน SYN Flood, Port Scanning, IP Spoofing
  - Packet ใน Established Session ไม่ต้องตรวจ ACL ทุกครั้ง

**สรุป**
Stateful Inspection Firewall เป็นการยกระดับความปลอดภัยที่สำคัญจาก Packet Filtering ด้วยการ "จำ" สถานะของแต่ละ Session ไว้ใน State Table ทำให้ตัดสินใจได้อย่างชาญฉลาดว่า Packet ใดเป็น Traffic ที่ถูกกฎหมายและ Packet ใดเป็นภัยคุกคาม ซึ่งเป็นพื้นฐานสำคัญของ Firewall ในยุคปัจจุบัน', '## Stateful Inspection Firewall

**What you will learn in this video**
In this video, we will compare Stateful Inspection Firewalls with legacy Packet Filtering and understand how modern Firewalls track TCP and UDP Sessions.

**Core Content**
- **Packet Filtering (Stateless):** Inspects each Packet individually with no memory of previous packets — like a "guard with no memory."
- **Stateful Inspection:** Tracks Connection Context using a **State Table** that stores the 5-tuple: Source IP, Source Port, Destination IP, Destination Port, Protocol.
- **TCP Session Tracking:**
  - **SYN:** Firewall receives the first Packet, checks Policy, creates Entry (state: NEW)
  - **SYN-ACK:** Firewall updates state to ESTABLISHED
  - **ACK:** Handshake complete, subsequent Data Packets permitted automatically
  - **FIN/RST:** When Session ends, Firewall removes the Entry from the table
- **UDP Pseudo-State Tracking:** UDP has no Handshake, so the Firewall creates a Virtual Session using a Timeout Value (e.g., 2 minutes) instead of a Close signal.
- **Security Advantages:**
  - Automatically blocks Unsolicited Inbound Traffic.
  - Prevents SYN Floods, Port Scanning, IP Spoofing.
  - Packets in an Established Session do not need ACL inspection every time.

**Conclusion**
Stateful Inspection Firewalls represent a significant security upgrade from Packet Filtering by "remembering" the state of each Session in a State Table, allowing intelligent decisions on which Packets are legitimate and which are threats.', 'video', 15, 2, 'https://www.youtube.com/watch?v=rL4-vbsN35w', '/images/thumbnails/lesson-sec-02.jpg', NULL, '2026-05-18 10:02:06.461001+00', '2026-05-19 10:29:10.623729+00', '{"questions":[{"options":["By querying a DNS server.","By maintaining a state table that records connection details (source/destination IPs, ports, and TCP handshake states).","By blocking all UDP traffic.","By analyzing physical cable voltages."],"question_en":"How does a Stateful Inspection Firewall track active connections?","question_th":"Stateful Inspection Firewall มีแนวทางในการติดตามเฝ้าดูความเคลื่อนไหวเซสชันเชื่อมต่อต่างๆ อย่างไร?","correct_index":1,"explanation_en":"Stateful firewalls monitor TCP handshakes and connection states, recording them in a state table. Outbound requests permit responses dynamically.","explanation_th":"จะรักษาบัญชีสถานะ (State Table) คอยจำข้อมูลแอดเดรสและพอร์ตคู่เซสชัน ทำให้อนุญาตทราฟฟิกขากลับได้หากเริ่มส่งจากวงใน","options_th":["โดยการสอบถามเซิร์ฟเวอร์ DNS","เก็บ State Table ของ IP, Port และ TCP Session","โดยการปิดกั้นการรับส่งข้อมูล UDP ทั้งหมด","โดยการวิเคราะห์แรงดันไฟฟ้าของสายเคเบิลทางกายภาพ"]},{"options":["Stateful inspection is slower, which prevents spam.","It only permits inbound packets that belong to an active, established connection initiated from the inside network.","It automatically encrypts the payload.","It requires fewer CPU resources."],"question_en":"What is a key security advantage of Stateful Inspection over basic Packet Filtering?","question_th":"ข้อดีทางเทคนิคความปลอดภัยที่เหนือกว่าอย่างเด่นชัดของระบบ Stateful Inspection เมื่อเทียบกับคัดกรองแพ็กเก็ตธรรมดาคืออะไร?","correct_index":1,"explanation_en":"Stateful inspection dynamically permits return traffic. Any unsolicited inbound traffic not matching an entry in the state table is automatically blocked.","explanation_th":"ช่วยบล็อกแพ็กเก็ตสวมรอยขาเข้าได้ดีเยี่ยม เพราะหากแอดเดรสนั้นไม่ได้อยู่ในประวัติที่มีการสร้างเซสชันติดต่อออกไป ก็จะไม่ยอมให้ผ่าน","options_th":["การตรวจสอบ stateful จะช้าลง ซึ่งช่วยป้องกันสแปม","รับเฉพาะ Packet ขาเข้าของ Session ที่เริ่มจากภายใน","มันจะเข้ารหัสเพย์โหลดโดยอัตโนมัติ","มันต้องการทรัพยากร CPU น้อยลง"]},{"options":["SYN only","SYN-ACK followed by ACK","RST-FIN","PSH-URG"],"question_en":"During TCP connection tracking, which TCP flag combination marks the successful establishment of a connection in the state table?","question_th":"ในการติดตามเซสชันเชื่อมต่อ ข้อมูลกลุ่มธงคีย์ (TCP Flags) ชุดใดที่ใช้บอกว่าเซสชันเชื่อมต่อในแบบ TCP บรรลุผลสำเร็จแล้วในตาราง?","correct_index":1,"explanation_en":"The three-way handshake (SYN, SYN-ACK, ACK) must complete to transition the state table entry to ''ESTABLISHED''.","explanation_th":"ด่านทักทายสามด่านย่อย (SYN, SYN-ACK, ACK) จะต้องผ่านเกณฑ์ระบบลุล่วงครบทุกกระบวนการเซสชันจึงเปลี่ยนเป็นสถานะสำเร็จ","options_th":["เฉพาะ SYN","SYN-ACK แล้วตามด้วย ACK","RST-FIN","PSH-URG"]},{"options":["Yes, it must always inspect Layer 7.","No, it primarily tracks parameters at the network and transport layers (IPs, TCP/UDP ports, sequence numbers).","Yes, but only for ICMP traffic.","No, it only operates at Layer 1."],"question_en":"Does a Stateful Inspection Firewall need to inspect the application layer payload to perform basic connection tracking?","question_th":"Stateful Inspection Firewall จำเป็นต้องสแกนส่องไฟล์ไปจนถึงระดับเลเยอร์แอปพลิเคชัน (L7 Payload) หรือไม่ในการทำหน้าที่คุมเซสชันปกติ?","correct_index":1,"explanation_en":"Traditional stateful inspection operates up to Layer 4 (Transport), tracking ports and TCP states without examining application payloads.","explanation_th":"ไม่จำเป็น เนื่องจากความสามารถพื้นฐานสแกนสูงสุดถึงเพียงชั้นเลเยอร์ขนส่ง Layer 4 (TCP/UDP) ก็ชี้ช่องอนุมัติสถานะได้สมบูรณ์","options_th":["ใช่ มันจะต้องตรวจสอบเลเยอร์ 7 เสมอ","ไม่ ติดตาม IP, Port และ Sequence ที่ Layer 3/4","ใช่ แต่สำหรับการรับส่งข้อมูล ICMP เท่านั้น","ไม่ มันทำงานเฉพาะที่เลเยอร์ 1 เท่านั้น"]},{"options":["It permits the packet.","It discards (drops) the packet as a potential spoofing attempt.","It creates a new session in the state table.","It forwards it to the default gateway."],"question_en":"What action does a stateful firewall take if a packet arrives from the internet with the ACK flag set, but no matching session exists in the state table?","question_th":"ไฟร์วอลล์จะจัดการอย่างไรเมื่อได้รับแพ็กเก็ตจากภายนอกที่ปักธง ACK แต่กลับไม่พบประวัติเซสชันของข้อมูลชิ้นนี้ในตารางเลย?","correct_index":1,"explanation_en":"Unsolicited packets claiming to be part of an active session (e.g. unsolicited ACK packets) are dropped as security violations.","explanation_th":"จะสั่งทำลายทิ้งทันทีเนื่องจากประเมินว่าเป็นแพ็กเก็ตไม่ปลอดภัยที่ปลอมปักธงแฝงตัวพยายามจะผ่านกำแพงเข้ามาในเน็ตเวิร์ก","options_th":["มันอนุญาตให้แพ็กเก็ต","ทิ้ง Packet เพราะอาจเป็น Spoofing","มันสร้างเซสชันใหม่ในตารางสถานะ","มันส่งต่อไปยังเกตเวย์เริ่มต้น"]}]}', NULL),
	('lesson-ccna004-01', 'ccna-004', 'WAN Overview และ Technologies', 'WAN Overview and Technologies', '## WAN Overview (ภาพรวม WAN)

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้อธิบายประเภทต่างๆ ของการเชื่อมต่อ WAN ที่องค์กรใช้เชื่อมสำนักงานสาขา

**เนื้อหาหลัก**
- **Leased Line:** วงจรเช่าส่วนตัว เสถียรแต่แพง (T1/E1, DS3)
- **MPLS (Multi-Protocol Label Switching):** เทคโนโลยี ISP ที่ส่งข้อมูลด้วย Label แทน IP เพื่อความเร็วและ QoS
- **Internet-based VPN:** เชื่อมสาขาผ่านอินเทอร์เน็ตด้วยการเข้ารหัส ราคาถูกแต่ไม่ Guarantee SLA
- **SD-WAN:** เทคโนโลยีใหม่ที่บริหาร WAN links หลายเส้นพร้อมกันอัจฉริยะ

**สรุป**
การเลือก WAN Technology ต้องพิจารณา Budget, Bandwidth, Latency และ SLA ขององค์กร MPLS ยังนิยมสำหรับองค์กรใหญ่ แต่ SD-WAN กำลังมาแรงในปัจจุบัน', '## WAN Overview

**What you will learn in this video**
This video explains the various types of WAN connections organizations use to connect remote branches.

**Core Content**
- **Leased Line:** A private rented circuit, highly stable but expensive (T1/E1, DS3).
- **MPLS (Multi-Protocol Label Switching):** An ISP technology that forwards data using Labels instead of IPs for speed and QoS.
- **Internet-based VPN:** Connects branches over the internet using encryption; cheaper but without SLA guarantees.
- **SD-WAN:** A modern technology that intelligently manages multiple WAN links simultaneously.

**Conclusion**
Choosing a WAN Technology requires balancing an organization''s Budget, Bandwidth, Latency, and SLA needs. MPLS remains popular for large enterprises, but SD-WAN is rapidly gaining ground today.', 'video', 45, 1, 'https://www.youtube.com/watch?v=L-T3oK9-XG0', '/images/thumbnails/lesson-ccna004-01.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["LANs connect devices globally; WANs are local.","LANs cover a small local area under single ownership; WANs cover broad geographical areas spanning cities or nations and are leased from service providers.","LANs use serial cables; WANs use Ethernet only.","LANs operate at Layer 3; WANs operate at Layer 1."],"question_en":"What is the primary difference between a Local Area Network (LAN) and a Wide Area Network (WAN)?","question_th":"ข้อแตกต่างที่ชัดเจนที่สุดระหว่างเครือข่าย LAN และ WAN คือข้อใด?","correct_index":1,"explanation_en":"WANs are designed to bridge remote geographical sites, requiring leased lines from telecommunications providers (SPs) operating across Layer 1 and 2.","explanation_th":"LAN ดูแลระยะใกล้ครอบคลุมพื้นที่จำกัด ส่วน WAN เชื่อมต่อข้ามเมืองหรือต่างซีกโลกโดยเช่าช่องสัญญาณจากผู้ให้บริการ","options_th":["LAN เชื่อมต่ออุปกรณ์ทั่วโลก WAN อยู่ในเครื่อง","LAN ครอบคลุมพื้นที่เล็ก ส่วน WAN ครอบคลุมพื้นที่กว้าง","LAN ใช้สายเคเบิลอนุกรม WAN ใช้อีเธอร์เน็ตเท่านั้น","LAN ทำงานที่เลเยอร์ 3; WAN ทำงานที่เลเยอร์ 1"]},{"options":["Frame Relay","ISDN","MPLS (Multiprotocol Label Switching)","ATM"],"question_en":"Which WAN technology uses label switching to forward traffic across a high-speed provider core network?","question_th":"เทคโนโลยี WAN ชนิดใดใช้การติดป้ายคีย์ฉลาก (Label switching) เพื่อสลับส่งผ่านข้อมูลในระบบโครงข่ายของผู้ให้บริการ?","correct_index":2,"explanation_en":"MPLS replaces traditional IP routing table lookups with rapid label switching at the provider core.","explanation_th":"MPLS ปรับปรุงกระบวนการจัดส่งโดยติดแผ่นป้ายบอกทิศทางบนแพ็กเก็ต ทำให้สลับส่งผ่านวงแลกเปลี่ยนส่วนกลางได้ฉับไวขึ้น","options_th":["เฟรมรีเลย์","ISDN","MPLS","ATM"]},{"options":["CSU/DSU","Layer 2 Switch","Wireless Access Point","EGP Router"],"question_en":"What device is typically placed at the customer premises edge to convert WAN digital signals to LAN formats?","question_th":"อุปกรณ์ปลายทางใดมักตั้งไว้ฝั่งลูกค้า (Customer Premises) เพื่อแปลงสัญญาณดิจิทัลระบบ WAN เป็นระบบ LAN?","correct_index":0,"explanation_en":"A CSU/DSU (Channel Service Unit/Data Service Unit) converts digital WAN line signals to format readable by customer routers.","explanation_th":"CSU/DSU แปลงระดับข้อมูลและชนิดสัญญาณโทรคมนาคม (T1/T3) จากผู้ให้บริการให้อยู่ในประเภทที่เร้าเตอร์สามารถอ่านได้","options_th":["มช./มส","สวิตช์เลเยอร์ 2","จุดเชื่อมต่อไร้สาย","เราเตอร์ EGP"]},{"options":["A network built using physical dedicated fiber lines.","A secure, encrypted tunnel established over a public network (like the Internet) to connect remote sites.","A local VLAN network segment.","A wireless network interface."],"question_en":"What is a VPN (Virtual Private Network)?","question_th":"เครือข่ายเสมือนส่วนตัว (VPN) หมายถึงลักษณะการเชื่อมต่อแบบใด?","correct_index":1,"explanation_en":"VPNs use encryption and tunneling protocols to securely transmit private data over public infrastructures.","explanation_th":"VPN อาศัยกลไกห่อหุ้มและเข้ารหัสข้อมูลเพื่อสร้างท่อเชื่อมต่อเฉพาะกิจผ่านเครือข่ายสาธารณะอินเทอร์เน็ต","options_th":["เครือข่ายที่สร้างขึ้นโดยใช้สายไฟเบอร์เฉพาะทางกายภาพ","Tunnel เข้ารหัสบน Internet เพื่อเชื่อม Site ระยะไกล","ส่วนเครือข่าย VLAN ท้องถิ่น","อินเทอร์เฟซเครือข่ายไร้สาย"]},{"options":["Local Loop","Central Office","Demarcation Point (Demarc)","Toll Network"],"question_en":"Which point in a WAN setup represents the boundary where customer responsibility ends and service provider responsibility begins?","question_th":"ตำแหน่งรอยต่อใดในเครือข่าย WAN ที่ถือเป็นเส้นแบ่งเขตรับผิดชอบระหว่างฝั่งลูกค้าและผู้ให้บริการระบบ?","correct_index":2,"explanation_en":"The demarcation point is the physical boundary separating customer equipment (CPE) from provider cabling.","explanation_th":"จุดแบ่งเขตความรับผิดชอบ (Demarcation Point) แบ่งแยกระหว่างโครงสายเคเบิลของสายบริษัทไอทีปลายทางและโครงข่ายผู้ให้บริการ","options_th":["วงท้องถิ่น","สำนักงานกลาง","จุดแบ่งเขต (Demarc)","เครือข่ายโทร"]}]}', NULL),
	('lesson-ccna005-01', 'ccna-005', 'DHCP Server และ Client', 'DHCP Server and Client', '## DHCP (Dynamic Host Configuration Protocol)

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการตั้งค่า DHCP Server บน Cisco Router เพื่อจ่าย IP อัตโนมัติให้อุปกรณ์ในเครือข่าย

**เนื้อหาหลัก**
- กระบวนการ DORA: **Discover** → **Offer** → **Request** → **Acknowledge**
- การตั้งค่า DHCP Pool บน Cisco: `ip dhcp pool LAN`, `network 192.168.1.0 /24`, `default-router`, `dns-server`
- **DHCP Exclusion:** กันช่วง IP ไม่ให้จ่ายออก เช่น `ip dhcp excluded-address 192.168.1.1 192.168.1.10`
- **DHCP Relay Agent:** ใช้เมื่อ DHCP Server อยู่คนละ Subnet กับ Client ตั้งด้วย `ip helper-address`

**สรุป**
DHCP ลดงาน Admin อย่างมาก ทุกองค์กรใช้งาน การเข้าใจ DHCP Relay เป็นสิ่งสำคัญสำหรับเครือข่ายขนาดใหญ่', '## DHCP (Dynamic Host Configuration Protocol)

**What you will learn in this video**
This video teaches how to configure a DHCP Server on a Cisco Router to automatically distribute IPs to network devices.

**Core Content**
- DORA Process: **Discover** → **Offer** → **Request** → **Acknowledge**
- DHCP Pool Configuration on Cisco: `ip dhcp pool LAN`, `network 192.168.1.0 /24`, `default-router`, `dns-server`
- **DHCP Exclusion:** Reserving IP ranges so they aren''t distributed, e.g., `ip dhcp excluded-address 192.168.1.1 192.168.1.10`
- **DHCP Relay Agent:** Used when the DHCP Server is on a different Subnet than the Client, configured with `ip helper-address`

**Conclusion**
DHCP massively reduces Admin workloads and is used in every organization. Understanding DHCP Relay is vital for large networks.', 'video', 11, 1, 'https://www.youtube.com/watch?v=e6-TaH5bkjo&t=136s', '/images/thumbnails/lesson-ccna005-01.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["ARP","DORA","DNS","ICMP"],"question_en":"What acronym describes the four-step process DHCP clients use to obtain an IP address?","question_th":"อักษรย่อใดที่อธิบายกระบวนการ 4 ขั้นตอนที่ไคลเอนต์ DHCP ใช้เพื่อขอรับ IP address?","correct_index":1,"explanation_en":"DHCP allocation uses a four-step process: Discover, Offer, Request, and Acknowledgment (DORA).","explanation_th":"การขอไอพีด้วย DHCP มีขั้นตอนย่อเรียกว่า DORA ซึ่งได้แก่ Discover, Offer, Request และ Acknowledgment","options_th":["ARP","DORA","DNS","ICMP"]},{"options":["DHCP Offer","DHCP Discover","DHCP Request","DHCP Ack"],"question_en":"Which DHCP packet is sent by a client as a broadcast to locate available DHCP servers on the network?","question_th":"แพ็กเก็ต DHCP ชนิดใดที่เครื่องไคลเอนต์ส่งแบบบรอดแคสต์เพื่อค้นหาเซิร์ฟเวอร์ DHCP ในระบบเครือข่าย?","correct_index":1,"explanation_en":"The DHCP Discover packet is a Layer 3 broadcast sent by the client to find any active DHCP servers.","explanation_th":"แพ็กเก็ต DHCP Discover เป็นข้อมูลที่ไคลเอนต์เริ่มส่งออกแบบบรอดแคสต์เพื่อตามหาเซิร์ฟเวอร์ที่เปิดทำงาน","options_th":["ข้อเสนอ DHCP","DHCP ค้นพบ","คำขอ DHCP","DHCP แอค"]},{"options":["Client: UDP 67; Server: UDP 68","Client: UDP 68; Server: UDP 67","Client: UDP 53; Server: UDP 53","Client: UDP 161; Server: UDP 162"],"question_en":"Which UDP port numbers are used by DHCP clients and servers?","question_th":"หมายเลขพอร์ต UDP ใดที่ใช้สำหรับการสื่อสารระหว่างไคลเอนต์และเซิร์ฟเวอร์ DHCP?","correct_index":1,"explanation_en":"DHCP clients send requests to server port 67, and servers respond to client port 68. Both use UDP.","explanation_th":"ไคลเอนต์ DHCP จะส่งคำขอเข้าหาเซิร์ฟเวอร์พอร์ต 67 ส่วนตัวเซิร์ฟเวอร์จะตอบกลับมาที่ไคลเอนต์พอร์ต 68 ทั้งคู่ใช้ UDP","options_th":["ไคลเอนต์: UDP 67; เซิร์ฟเวอร์: UDP 68","ไคลเอนต์: UDP 68; เซิร์ฟเวอร์: UDP 67","ไคลเอนต์: UDP 53; เซิร์ฟเวอร์: UDP 53","ไคลเอนต์: UDP 161; เซิร์ฟเวอร์: UDP 162"]},{"options":["ip helper-address <ip-address>","ip dhcp relay","ip forward-protocol","dhcp-server destination"],"question_en":"What Cisco command is configured on a router interface to forward local DHCP broadcasts to a server in a different subnet?","question_th":"คำสั่งใดบนอินเตอร์เฟสของเร้าเตอร์ Cisco ที่ใช้สำหรับส่งต่อ DHCP broadcast ข้ามซับเน็ตไปยังเซิร์ฟเวอร์ปลายทาง?","correct_index":0,"explanation_en":"The ''ip helper-address <server-ip>'' command configures the router to act as a DHCP relay agent, forwarding broadcasts as unicasts.","explanation_th":"คำสั่ง ''ip helper-address <server-ip>'' จะตั้งค่าเร้าเตอร์ให้แปลงสัญญาณบรอดแคสต์เป็นยูนิแคสต์ส่งข้ามวงเน็ตเวิร์ก","options_th":["ip helper-address <ip-address>","ip dhcp relay","ip forward-protocol","ปลายทางเซิร์ฟเวอร์ dhcp"]},{"options":["To block specific MAC addresses from accessing the network.","To specify IP addresses that the DHCP server should not assign to clients (e.g., static IPs for servers).","To define the default gateway IP.","To shut down the DHCP pool."],"question_en":"What is the purpose of the ''ip dhcp excluded-address'' command on a Cisco IOS router?","question_th":"คำสั่ง ''ip dhcp excluded-address'' บนเร้าเตอร์ Cisco IOS มีวัตถุประสงค์เพื่ออะไร?","correct_index":1,"explanation_en":"This command reserves static IP addresses (like router IPs, DNS, servers) so the DHCP pool does not assign them dynamically, preventing duplicate IP conflicts.","explanation_th":"เป็นคำสั่งละเว้นช่วงไอพีที่ไม่ต้องการแจก เช่น ไอพีของเร้าเตอร์ เซิร์ฟเวอร์ หรือเครื่องพิมพ์ เพื่อเลี่ยงปัญหาไอพีชนกัน","options_th":["เพื่อบล็อกที่อยู่ MAC ไม่ให้เข้าถึงเครือข่าย","กัน IP ที่ DHCP ห้ามแจก","เพื่อกำหนด IP เกตเวย์เริ่มต้น","เพื่อปิดพูล DHCP"]}]}', NULL),
	('lesson-ccna005-02', 'ccna-005', 'DNS (Domain Name System)', 'DNS (Domain Name System)', '## DNS (Domain Name System)

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้อธิบายกลไกของ DNS ที่แปลงชื่อโดเมนเป็น IP Address ซึ่งเป็นกระบวนการเบื้องหลังทุกครั้งที่เราพิมพ์ URL

**เนื้อหาหลัก**
- **DNS Hierarchy:** Root (.) → TLD (.com, .th) → Second-Level (google.com) → Subdomain (mail.google.com)
- **DNS Records:** A (IPv4), AAAA (IPv6), MX (Mail), CNAME (Alias), PTR (Reverse Lookup)
- **Recursive vs Iterative Query:** Client ถาม DNS Resolver ซึ่งจะไปถามต่อจนได้คำตอบ
- **DNS Caching & TTL:** คำตอบจะถูก Cache ไว้ตามค่า TTL เพื่อลด Traffic

**สรุป**
DNS คือ "สมุดโทรศัพท์" ของอินเทอร์เน็ต หาก DNS ล่มทุก Service จะใช้งานไม่ได้แม้เชื่อมต่ออินเทอร์เน็ตได้ปกติ', '## DNS (Domain Name System)

**What you will learn in this video**
This video explains the mechanics of DNS, which translates domain names into IP Addresses—a background process that runs every time we type a URL.

**Core Content**
- **DNS Hierarchy:** Root (.) → TLD (.com, .th) → Second-Level (google.com) → Subdomain (mail.google.com)
- **DNS Records:** A (IPv4), AAAA (IPv6), MX (Mail), CNAME (Alias), PTR (Reverse Lookup)
- **Recursive vs Iterative Query:** A Client queries a DNS Resolver, which then queries further up until an answer is found.
- **DNS Caching & TTL:** Answers are cached based on TTL values to reduce traffic.

**Conclusion**
DNS is the "Phonebook" of the Internet. If DNS goes down, all services become unusable even if internet connectivity is completely normal.', 'video', 13, 2, 'https://www.youtube.com/watch?v=71VeHHFpvqQ', '/images/thumbnails/lesson-ccna005-02.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["To assign IP addresses to new clients dynamically.","To translate human-readable domain names (like www.cisco.com) into IP addresses.","To monitor network bandwidth utilization.","To encrypt web browser traffic."],"question_en":"What is the primary function of the Domain Name System (DNS)?","question_th":"หน้าที่หลักที่สำคัญที่สุดของระบบ Domain Name System (DNS) คืออะไร?","correct_index":1,"explanation_en":"DNS acts as the phone book of the Internet, translating text-based domains into computer-readable IP addresses.","explanation_th":"DNS ทำหน้าที่เสมือนสมุดโทรศัพท์ของอินเทอร์เน็ต โดยแปลงชื่อโดเมนภาษาคนเป็นแอดเดรสไอพีที่คอมพิวเตอร์เข้าใจ","options_th":["กำหนดที่อยู่ IP ให้ไคลเอนต์ใหม่แบบไดนามิก","แปลงชื่อ Domain เป็น IP Address","เพื่อตรวจสอบการใช้แบนด์วิธเครือข่าย","เพื่อเข้ารหัสการรับส่งข้อมูลเว็บเบราว์เซอร์"]},{"options":["A record","AAAA record","MX record","CNAME record"],"question_en":"Which DNS resource record (RR) maps a domain name to an IPv4 address?","question_th":"เรคคอร์ดทรัพยากร DNS (DNS resource record) ประเภทใดใช้จับคู่แปลงชื่อโดเมนเป็นไอพีแอดเดรสแบบ IPv4?","correct_index":0,"explanation_en":"An ''A'' record (Address record) maps a hostname to a 32-bit IPv4 address. ''AAAA'' is used for IPv6.","explanation_th":"A record (Address record) ใช้ชี้จากชื่อโดเมนไปยังที่อยู่ IPv4 ขนาด 32 บิต ส่วน AAAA record จะใช้กับระบบ IPv6","options_th":["บันทึก","บันทึก AAAA","บันทึก MX","บันทึก CNAME"]},{"options":["CNAME record","MX record","NS record","PTR record"],"question_en":"Which DNS resource record points to a mail server responsible for receiving emails for a domain?","question_th":"เรคคอร์ด DNS ประเภทใดที่ชี้ตำแหน่งไปยังเครื่องเซิร์ฟเวอร์จดหมายอิเล็กทรอนิกส์ (Mail server) ประจำโดเมน?","correct_index":1,"explanation_en":"An MX (Mail Exchanger) record directs email traffic to the mail servers designated for a domain.","explanation_th":"MX record (Mail Exchanger record) บ่งบอกและชี้ทิศทางทราฟฟิกอีเมลไปยังเซิร์ฟเวอร์รับเมลของปลายทางนั้น","options_th":["บันทึก CNAME","บันทึก MX","บันทึกของ NS","บันทึกพีทีอาร์"]},{"options":["UDP Port 53","TCP Port 53","UDP Port 67","TCP Port 80"],"question_en":"What protocol and port number does DNS query traffic primarily use for client lookups?","question_th":"โปรโตคอลและหมายเลขพอร์ตใดที่ทราฟฟิกคำขอของ DNS นิยมใช้เป็นหลักในกระบวนการดึงข้อมูลสืบค้น?","correct_index":0,"explanation_en":"DNS queries use UDP port 53 because it is lightweight and fast. TCP port 53 is used for large zone transfers.","explanation_th":"การค้นหาข้อมูล DNS ใช้ UDP พอร์ต 53 เนื่องจากมีความเบาและรวดเร็ว ส่วน TCP พอร์ต 53 จะเก็บไว้ทำระบบ Zone Transfer","options_th":["พอร์ต UDP 53","พอร์ต TCP 53","พอร์ต UDP 67","พอร์ต TCP 80"]},{"options":["To map a domain name to an IPv6 address.","To create an alias that points a domain name to another canonical domain name.","To configure name servers for a zone.","To perform reverse IP lookups."],"question_en":"What is the purpose of a CNAME (Canonical Name) record in DNS?","question_th":"ประโยชน์ของเรคคอร์ดประเภท CNAME (Canonical Name) ในฐานข้อมูล DNS คือข้อใด?","correct_index":1,"explanation_en":"A CNAME record creates an alias hostname pointing to another domain name (e.g. mapping blog.example.com to example.com).","explanation_th":"CNAME record ใช้สร้างนามแฝง (Alias) เพื่อชี้จากชื่อโฮสต์หนึ่งไปยังอีกชื่อโฮสต์หนึ่งที่เป็นชื่อหลัก","options_th":["เพื่อจับคู่ชื่อโดเมนกับที่อยู่ IPv6","สร้าง Alias ชี้ไปยัง Canonical Name","เพื่อกำหนดค่าเนมเซิร์ฟเวอร์สำหรับโซน","เพื่อทำการค้นหา IP แบบย้อนกลับ"]}]}', NULL),
	('lesson-ccna005-04', 'ccna-005', 'ACL (Access Control Lists)', 'ACL (Access Control Lists)', '## ACL (Access Control Lists)

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการใช้ ACL เพื่อกรอง Traffic บน Router ซึ่งเป็นเครื่องมือ Security ระดับ L3/L4 พื้นฐาน

**เนื้อหาหลัก**
- **Standard ACL (1-99):** กรองตาม Source IP เท่านั้น → ใช้ใกล้ Destination
- **Extended ACL (100-199):** กรองตาม Source IP, Destination IP, Protocol, Port → ใช้ใกล้ Source
- Wildcard Mask: ตรงข้ามกับ Subnet Mask เช่น /24 = Wildcard 0.0.0.255
- ACL ประมวลผลจากบนลงล่าง หยุดเมื่อ Match และมี **Implicit Deny** ที่ท้ายเสมอ
- การผูก ACL กับ Interface: `ip access-group <ACL> in/out`

**สรุป**
ACL คือ Firewall เบื้องต้นที่ฝังมาใน Router เหมาะสำหรับควบคุม Traffic ง่ายๆ แต่ไม่สามารถแทน Stateful Firewall ได้', '## ACL (Access Control Lists)

**What you will learn in this video**
This video teaches the use of ACLs to filter traffic on a Router, which is a fundamental Layer 3/4 security tool.

**Core Content**
- **Standard ACL (1-99):** Filters by Source IP only → Place near Destination.
- **Extended ACL (100-199):** Filters by Source IP, Destination IP, Protocol, Port → Place near Source.
- Wildcard Mask: The inverse of a Subnet Mask (e.g., /24 = Wildcard 0.0.0.255).
- ACLs process top-down, stop upon Match, and always have an **Implicit Deny** at the end.
- Applying ACLs to an Interface: `ip access-group <ACL> in/out`

**Conclusion**
ACLs act as basic firewalls built into Routers, great for simple traffic control, but cannot replace Stateful Firewalls.', 'video', 14, 4, 'https://www.youtube.com/watch?v=vMshgkItW5g', '/images/thumbnails/lesson-ccna005-04.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["Destination IP address only.","Source IP address only.","Source and Destination IP addresses, and TCP/UDP ports.","Protocol type (TCP/UDP/ICMP)."],"question_en":"What is the primary criteria used by a Standard Access Control List (ACL) to filter traffic?","question_th":"เกณฑ์พื้นฐานหลักที่ใช้โดยรายการควบคุมการเข้าถึงแบบมาตรฐาน (Standard ACL) ในการกรองทราฟฟิกคือข้อใด?","correct_index":1,"explanation_en":"Standard ACLs (numbered 1-99 or 1300-1999) filter traffic based on the source IP address of packets only.","explanation_th":"Standard ACL (หมายเลข 1-99 หรือ 1300-1999) ตรวจสอบและกรองข้อมูลอิงตามข้อมูลแอดเดรสไอพีต้นทาง (Source IP) เท่านั้น","options_th":["ที่อยู่ IP ปลายทางเท่านั้น","ที่อยู่ IP ต้นทางเท่านั้น","ที่อยู่ IP ต้นทางและปลายทาง และพอร์ต TCP/UDP","ประเภทโปรโตคอล (TCP/UDP/ICMP)"]},{"options":["1 - 99","100 - 199","1300 - 1999","100 - 199 and 2000 - 2699"],"question_en":"What is the range of ACL numbers for Extended IP Access Lists on Cisco routers?","question_th":"ช่วงตัวเลขแสดงกลุ่มหมายเลขสำหรับ Extended IP Access List บนอุปกรณ์เร้าเตอร์ Cisco คือเท่าใด?","correct_index":3,"explanation_en":"Extended ACLs use numbers 100-199 and 2000-2699 to filter based on source, destination, protocol, and port numbers.","explanation_th":"Extended ACL จะเปิดใช้งานในช่วงหมายเลข 100-199 และ 2000-2699 เพื่อให้กรองได้ทั้งต้นทาง ปลายทาง พอร์ต และประเภทโปรโตคอล","options_th":["1 - 99","100 - 199","13.00 - 1999","100-199 / 2000-2699"]},{"options":["0.0.0.15","0.0.0.240","0.0.0.255","255.255.255.255"],"question_en":"What wildcard mask corresponds to the subnet mask 255.255.255.240?","question_th":"หน้ากากแบบไวลด์การ์ด (Wildcard Mask) ของซับเน็ตมาสก์ 255.255.255.240 คือข้อใด?","correct_index":0,"explanation_en":"Wildcard mask is calculated by subtracting the subnet mask from 255.255.255.255. (255-255).(255-255).(255-255).(255-240) = 0.0.0.15.","explanation_th":"ไวลด์การ์ดมาสก์คิดจากการนำ 255.255.255.255 ลบด้วยซับเน็ตมาสก์ จะได้เป็น (255-255).(255-255).(255-255).(255-240) = 0.0.0.15","options_th":["0.0.0.15","0.0.0.240","0.0.0.255","255.255.255.255"]},{"options":["Implicit permit all","Implicit deny all","Implicit redirect to gateway","Implicit log all"],"question_en":"What implicit statement exists at the end of every Access Control List (ACL) in Cisco IOS?","question_th":"ประโยคเงื่อนไขที่แฝงอยู่โดยนัย (Implicit Statement) ที่ท้ายสุดของทุกรายการ ACL ในระบบ Cisco IOS คืออะไร?","correct_index":1,"explanation_en":"Cisco ACLs end with an implicit ''deny any'' statement. Any packet that does not match any permit statement is dropped.","explanation_th":"ตอนท้ายสุดของทุกตาราง ACL จะมีประโยคปฏิเสธโดยปริยาย (implicit deny all) กำหนดอยู่ หากเช็คแล้วไม่เข้าหัวข้ออนุมัติใดเลยจะถูกโยนทิ้งทันที","options_th":["อนุญาตโดยปริยายทั้งหมด","ปฏิเสธโดยปริยายทั้งหมด","เปลี่ยนเส้นทางโดยนัยไปยังเกตเวย์","บันทึกโดยนัยทั้งหมด"]},{"options":["As close to the destination of the traffic as possible.","As close to the source of the traffic as possible.","On the internet gateway router only.","On the core switches only."],"question_en":"Where is it generally recommended to apply an Extended ACL in the network?","question_th":"ตามหลักปฏิบัติทั่วไป แนะนำให้วางตาราง Extended ACL ไว้ ณ ตำแหน่งใดของระบบเครือข่าย?","correct_index":1,"explanation_en":"Extended ACLs should be placed as close to the source of the traffic as possible to filter unwanted packets early and save network bandwidth.","explanation_th":"ควรวาง Extended ACL ให้ใกล้ชิดต้นทางทราฟฟิก (Source) มากที่สุด เพื่อตัดทิ้งแพ็กเก็ตที่ขัดต่อนโยบายตั้งแต่แรกและไม่เปลืองแบนด์วิดท์","options_th":["ใกล้ปลายทางของทราฟฟิกมากที่สุด","ใกล้ต้นทางของทราฟฟิกมากที่สุด","บนเราเตอร์อินเทอร์เน็ตเกตเวย์เท่านั้น","บนสวิตช์หลักเท่านั้น"]}]}', NULL),
	('lesson-python-02', 'devnet-001', 'การใช้ Netmiko', 'Using Netmiko', '## Python สำหรับ Network Automation

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
Python + Netmiko ช่วยให้เข้าไปดึงข้อมูลจาก Router 100 ตัวได้ในเวลาไม่กี่วินาที แทนที่จะต้อง Login ทีละเครื่อง', '## Python for Network Automation

**What you will learn in this video**
This video teaches writing Python Scripts to Automate Network tasks such as logging into devices and pulling data.

**Core Content**
- **Important Libraries:**
  - `netmiko`: SSH into network devices like Cisco, Juniper, etc.
  - `napalm`: Pull data from devices in a Vendor-agnostic way.
  - `requests`: Call REST APIs.
  - `paramiko`: Foundational SSH Library.
- **Netmiko Script Example:**
  ```python
  from netmiko import ConnectHandler
  device = ConnectHandler(device_type="cisco_ios", host="10.0.0.1", username="admin", password="cisco")
  output = device.send_command("show ip interface brief")
  print(output)
  ```

**Conclusion**
Python + Netmiko helps you pull data from 100 Routers in just seconds, rather than having to login one by one.', 'video', 11, 2, 'https://www.youtube.com/watch?v=NSnrvVhbuy8', '/images/thumbnails/lesson-python-02.jpg', NULL, '2026-05-18 10:02:06.461001+00', '2026-05-19 10:29:10.623729+00', '{"questions":[{"options":["A virtual router simulator.","A multi-vendor Python library built on Paramiko that simplifies SSH connections to network devices.","A network monitoring tool.","A Cisco IOS operating system."],"question_en":"What is Netmiko?","question_th":"Netmiko คืออะไรในระบบการทำเครือข่ายอัตโนมัติ?","correct_index":1,"explanation_en":"Netmiko is a popular Python library designed to simplify SSH management of network devices across diverse vendors.","explanation_th":"เป็นไลบรารีในภาษา Python ที่พัฒนาต่อยอดมาจาก Paramiko ช่วยลดความยากในการสั่งการเชื่อมโยงระบบ SSH เข้าไปยังเราเตอร์ค่ายต่างๆ","options_th":["เครื่องจำลองเราเตอร์เสมือน","Python Library สำหรับ SSH","เครื่องมือตรวจสอบเครือข่าย","ระบบปฏิบัติการ Cisco IOS"]},{"options":["send_config_set()","send_command()","send_show_command()","execute_cmd()"],"question_en":"Which Netmiko method is used to execute a read-only show command on a router?","question_th":"เมธอด (Method) ใดของ Netmiko ที่ใช้ในการส่งคำสั่งขอดูข้อมูลแบบอ่านอย่างเดียว (เช่น คำสั่ง show)?","correct_index":1,"explanation_en":"The ''send_command()'' method is used to send operational/read-only commands (like ''show ip interface brief'') and returns the output as a string.","explanation_th":"เมธอด ''send_command()'' ใช้สั่งส่งคำสั่งควบคุมการทำงานปกติของ CLI (เช่น คำสั่ง show) และคืนข้อมูลตอบกลับมาเป็นข้อความปกติ","options_th":["send_config_set()","send_command()","send_show_command()","execute_cmd()"]},{"options":["send_command()","send_config_set()","write_configuration()","push_config()"],"question_en":"Which Netmiko method is used to push configuration changes to a router?","question_th":"เมธอด (Method) ใดของ Netmiko ที่ใช้ส่งคำสั่งเพื่อปรับเปลี่ยนแก้ไขการตั้งค่าคอนฟิกบนตัวเราเตอร์?","correct_index":1,"explanation_en":"The ''send_config_set()'' method accepts a list of configuration commands and automatically enters/exits configuration mode on the device.","explanation_th":"เมธอด ''send_config_set()'' จะรับชุดอาร์กิวเมนต์เป็นรายการคำสั่งคอนฟิก และเปลี่ยนโหมดเข้าสู่คอนฟิกให้เองโดยอัตโนมัติ","options_th":["send_command()","send_config_set()","write_configuration()","push_config()"]},{"options":["os_name","device_type","platform","system_type"],"question_en":"What argument must be specified in Netmiko''s ConnectHandler to identify the target operating system (e.g., Cisco IOS)?","question_th":"อาร์กิวเมนต์ที่สำคัญยิ่งชนิดใดใน ConnectHandler ของ Netmiko ที่ใช้บอกประเภทระบบปฏิบัติการปลายทาง (เช่น Cisco IOS)?","correct_index":1,"explanation_en":"The ''device_type'' argument (e.g. ''cisco_ios'') must be defined so Netmiko knows how to handle prompt detection and session interactions.","explanation_th":"ต้องระบุตัวแปร ''device_type'' (เช่น ค่า ''cisco_ios'') เพื่อให้ระบบเข้าใจตัวรับข้อความและลักษณะการรอตอบกลับ","options_th":["os_name","device_type","platform","system_type"]},{"options":["Yes, it always saves changes.","No, you must explicitly call the ''send_config_set'' or ''send_command'' to run ''write memory'' or use the ''save_config()'' method.","Yes, unless configured otherwise.","No, saving is not supported in Netmiko."],"question_en":"Does Netmiko automatically save changes to startup configuration after executing configuration commands?","question_th":"Netmiko จะจัดเก็บเซฟบันทึกค่าลงใน Startup Configuration (เช่น คำสั่ง write memory) ให้โดยอัตโนมัติหลังคอนฟิกเสร็จหรือไม่?","correct_index":1,"explanation_en":"Netmiko changes running-config but does not write to startup-config automatically. You must call ''save_config()'' or send the save command explicitly.","explanation_th":"ไม่โดยอัตโนมัติ Netmiko จะแก้เฉพาะ Running-config เท่านั้น ผู้ใช้งานต้องสั่งบันทึกถาวรเองหรือเรียกเมธอด ''save_config()''","options_th":["ใช่ มันจะบันทึกการเปลี่ยนแปลงเสมอ","ไม่ ต้องสั่ง save_config() หรือ write memory เอง","ใช่ เว้นแต่จะกำหนดค่าเป็นอย่างอื่น","ไม่ Netmiko ไม่รองรับการบันทึก"]}]}', NULL),
	('lesson-sec002-02', 'sec-002', 'IPSec Deep Dive', 'IPSec Deep Dive', '## IPsec Deep Dive

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
IPsec เป็นรากฐานของ VPN ที่ปลอดภัยระดับองค์กร การเข้าใจ IKE Phase 1 & 2 เป็นสิ่งจำเป็นสำหรับการ Debug VPN ที่ไม่ขึ้น', '## IPsec Deep Dive

**What you will learn in this video**
This video dives deep into the IPsec Framework, the standard encryption used for building enterprise-grade VPNs.

**Core Content**
- **IPsec Protocols:** AH (Authentication Header) verifies integrity, ESP (Encapsulating Security Payload) encrypts data.
- **Modes:** Tunnel Mode (encrypts entire original Packet, used for VPN), Transport Mode (encrypts only Payload).
- **IKE (Internet Key Exchange):** The secure Key exchange process, consisting of 2 Phases:
  - **Phase 1:** Creates a Secure Channel for Negotiation (ISAKMP SA).
  - **Phase 2:** Agrees on Parameters for Data Encryption (IPsec SA).
- **Diffie-Hellman:** Used to exchange Symmetric Keys over an insecure Channel.

**Conclusion**
IPsec is the foundation of secure enterprise VPNs. Understanding IKE Phase 1 & 2 is essential for Debugging VPNs that fail to establish.', 'video', 15, 2, 'https://www.youtube.com/watch?v=15amNny_kKI', '/images/thumbnails/lesson-sec002-02.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["Speed, Reliability, Connectivity","Confidentiality (Encryption), Integrity, and Authentication","Routing, Switching, Address Translation","Access Control, Auditing, Administration"],"question_en":"What are the three core security services provided by the IPsec framework?","question_th":"บริการด้านความปลอดภัยหลัก 3 ประการที่เฟรมเวิร์ก IPsec มอบให้แก่การสื่อสารข้อมูลคืออะไร?","correct_index":1,"explanation_en":"IPsec guarantees confidentiality (via encryption), integrity (via hashing like SHA), and origin authentication.","explanation_th":"IPsec ยืนยัน 3 สิทธิ์สำคัญ ได้แก่ การรักษาความลับ (Confidentiality) ความถูกต้องของข้อมูล (Integrity) และการยืนยันตัวตน (Authentication)","options_th":["ความเร็ว ความน่าเชื่อถือ การเชื่อมต่อ","การรักษาความลับ ความถูกต้อง และการยืนยันตัวตน","การกำหนดเส้นทาง การสลับ การแปลที่อยู่","การควบคุมการเข้าถึง การตรวจสอบ การบริหาร"]},{"options":["AH (Authentication Header)","ESP (Encapsulating Security Payload)","IKE (Internet Key Exchange)","GRE"],"question_en":"Which IPsec header protocol provides data encryption (confidentiality) for the payload?","question_th":"โปรโตคอลส่วนหัว (Header protocol) ของ IPsec ตัวใดที่คอยทำหน้าที่เข้ารหัสข้อมูล (Confidentiality) ให้กับเนื้อความ?","correct_index":1,"explanation_en":"ESP (protocol 50) provides encryption and authentication for the payload, ensuring confidentiality. AH (protocol 51) only provides authentication and integrity.","explanation_th":"ESP (Encapsulating Security Payload) ดูแลการเข้ารหัสพรางตาข้อมูลและตรวจสอบสิทธิ์ ส่วน AH จะไม่มีระบบการเข้ารหัสพรางข้อมูล","options_th":["AH (Authentication Header)","ESP (Encapsulating Security Payload)","IKE (Internet Key Exchange)","GRE"]},{"options":["Transport Mode","Tunnel Mode","GRE Overload Mode","Secure Mode"],"question_en":"In which IPsec mode is the entire original IP packet encrypted and wrapped with a new IP header?","question_th":"โหมดการทำงานของ IPsec แบบใดที่โครงสร้างแพ็กเก็ต IP ดั้งเดิมทั้งหมดจะถูกเข้ารหัสแล้วห่อทับด้วยส่วนหัว IP แผ่นใหม่?","correct_index":1,"explanation_en":"Tunnel Mode encrypts the entire original packet (payload and original header) and adds a new IP header, ideal for WAN links over the internet.","explanation_th":"โหมดอุโมงค์ (Tunnel Mode) มักใช้เชื่อมต่อข้ามเน็ตเวิร์ก โดยเข้ารหัสตัวแพ็กเก็ตเดิมหมดจดแล้วประกบหัวส่งเส้นทางใหม่","options_th":["Transport Mode","Tunnel Mode","โหมดโอเวอร์โหลด GRE","โหมดปลอดภัย"]},{"options":["To route IP packets inside the tunnel.","To dynamically negotiate security parameters (SAs) and securely exchange cryptographic keys.","To monitor tunnel link speed.","To assign IP addresses to VPN clients."],"question_en":"What is the purpose of the Internet Key Exchange (IKE) protocol in IPsec VPNs?","question_th":"วัตถุประสงค์ของโปรโตคอล IKE (Internet Key Exchange) ในระบบการทำ IPsec VPN คืออะไร?","correct_index":1,"explanation_en":"IKE handles peer authentication, negotiates encryption/hashing parameters, and manages the exchange of secret session keys.","explanation_th":"IKE ทำหน้าที่ตกลงพารามิเตอร์การตั้งค่าความปลอดภัย (SA) และจัดการสลับแลกเปลี่ยนกุญแจเข้ารหัสลับระหว่างอุปกรณ์สองฝั่ง","options_th":["เพื่อกำหนดเส้นทางแพ็กเก็ต IP ภายในอุโมงค์","เจรจา SA และแลก Key เข้ารหัสอย่างปลอดภัย","เพื่อตรวจสอบความเร็วลิงค์ทันเนล","เพื่อกำหนดที่อยู่ IP ให้กับไคลเอนต์ VPN"]},{"options":["Diffie-Hellman (DH)","MD5","AES","SHA-256"],"question_en":"Which algorithm is commonly used in IPsec to securely exchange cryptographic keys over an unsecure network?","question_th":"อัลกอริทึมใดที่นิยมนำมาใช้งานร่วมกับ IPsec เพื่อแลกเปลี่ยนกุญแจลับในการเข้ารหัสอย่างปลอดภัยผ่านเครือข่ายอินเทอร์เน็ต?","correct_index":0,"explanation_en":"Diffie-Hellman (DH) key exchange allows two peers to establish a shared secret key over an unsecure medium.","explanation_th":"อัลกอริทึม Diffie-Hellman (DH) ช่วยให้อุปกรณ์คู่สถานีสื่อสารสร้างกุญแจลับร่วมกันผ่านสายส่งที่ไม่ปลอดภัยได้สำเร็จ","options_th":["DH","MD5","AES","SHA-256"]}]}', NULL),
	('lesson-ccna002-02', 'ccna-002', 'VLAN Configuration', 'VLAN Configuration', '## การตั้งค่า VLAN

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการสร้างและตั้งค่า VLAN (Virtual Local Area Network) บน Packet Tracer พร้อม Lab จริง

**เนื้อหาหลัก**
- VLAN แบ่งเครือข่ายออกเป็นส่วนๆ เสมือนเป็น Switch คนละตัว โดยไม่ต้องใช้ฮาร์ดแวร์แยก
- คำสั่งสร้าง VLAN: `vlan 10`, `name SALES`
- กำหนดพอร์ตให้เป็น Access Port: `switchport mode access`, `switchport access vlan 10`
- ตรวจสอบด้วย: `show vlan brief`
- **Inter-VLAN Routing:** VLAN ต่างกันจะสื่อสารกันไม่ได้ ต้องผ่าน Router หรือ Layer 3 Switch

**สรุป**
VLAN คือเครื่องมือสำคัญในการแยก Traffic ระหว่างแผนกต่างๆ เช่น IT, HR, Sales เพื่อความปลอดภัยและประสิทธิภาพ', '## VLAN Configuration

**What you will learn in this video**
This video teaches how to create and configure VLANs (Virtual Local Area Networks) on Packet Tracer
with a practical lab.

**Core Content**
- VLANs segment a network logically as if they were separate physical switches, without needing separate hardware.
- Commands to create a VLAN: `vlan 10`, `name SALES`
- Assigning a port as an Access Port: `switchport mode access`, `switchport access vlan 10`
- Verification: `show vlan brief`
- **Inter-VLAN Routing:** Different VLANs cannot communicate with each other directly; they require a Router or a Layer 3 Switch.

**Conclusion**
VLANs are essential tools for segregating traffic between different departments like IT, HR, and Sales to enhance security and performance.', 'video', 5, 2, 'https://www.youtube.com/watch?v=kOLeiXpA-5I&list=PL8U64TnLH9VhOJbr2Qwid5HSQZYZBeVL9', '/images/thumbnails/lesson-ccna002-02.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["To speed up physical connections.","To segment a physical switch into separate logical networks, dividing broadcast domains.","To automatically assign IP addresses.","To route traffic between different physical buildings."],"question_en":"What is the primary purpose of a Virtual LAN (VLAN)?","question_th":"วัตถุประสงค์หลักของระบบเครือข่ายเสมือน (VLAN) คืออะไร?","correct_index":1,"explanation_en":"VLANs logically divide a physical switch network into separate broadcast domains, improving security and management.","explanation_th":"VLAN ช่วยจัดสรรกลุ่มสวิตช์ทางกายภาพให้แยกย่อยเป็นระบบเครือข่ายเชิงตรรกะ ส่งผลให้เกิดการแบ่ง Broadcast Domain ออกจากกัน","options_th":["เพื่อเพิ่มความเร็วในการเชื่อมต่อทางกายภาพ","แบ่ง Switch เป็นหลาย Logical Network และแยก Broadcast Domain","เพื่อกำหนดที่อยู่ IP โดยอัตโนมัติ","เพื่อกำหนดเส้นทางทราฟฟิกระหว่างอาคารที่อยู่คนละสถานที่"]},{"options":["VLAN 0","VLAN 1","VLAN 100","VLAN 1002"],"question_en":"Which VLAN is typically used as the default VLAN for all switch ports out-of-the-box on Cisco switches?","question_th":"VLAN หมายเลขใดที่เป็น VLAN เริ่มต้น (Default VLAN) สำหรับพอร์ตทั้งหมดของสวิตช์ Cisco จากโรงงาน?","correct_index":1,"explanation_en":"VLAN 1 is the default native and management VLAN on Cisco switches out-of-the-box.","explanation_th":"VLAN 1 คือหมายเลขมาตรฐานที่สวิตช์จะตั้งเป็นกลุ่มเริ่มต้นให้ทุกพอร์ตใช้งานทันทีเมื่อเริ่มเดินระบบครั้งแรก","options_th":["วีแลน 0","วีแลน 1","วีแลน 100","วีแลน 1002"]},{"options":["switchport mode trunk; switchport trunk allowed vlan 10","switchport access vlan 10","vlan 10; switchport trunk native vlan 10","switchport mode access; switchport access vlan 10"],"question_en":"What configuration command assigns an interface to VLAN 10 as an access port?","question_th":"คำสั่งคอนฟิกใดใช้กำหนดพอร์ตอินเตอร์เฟสให้ทำหน้าที่เป็น Access Port อยู่ใน VLAN 10?","correct_index":3,"explanation_en":"An access port is configured using ''switchport mode access'' followed by ''switchport access vlan 10''.","explanation_th":"การตั้งค่าให้พอร์ตทำหน้าที่เชื่อมปลายทางเข้า VLAN ทำได้โดยสั่ง ''switchport mode access'' ตามด้วย ''switchport access vlan 10''","options_th":["switchport mode trunk; switchport trunk allowed vlan 10","switchport access vlan 10","วาแลน 10; switchport trunk ดั้งเดิม vlan 10","switchport mode access; switchport access vlan 10"]},{"options":["1 - 1001","1 - 4094","2 - 1005","1 - 1005"],"question_en":"What is the range of normal VLAN IDs on a Cisco switch?","question_th":"ช่วงของหมายเลข VLAN ID แบบปกติ (Normal Range VLANs) บนสวิตช์ Cisco คือข้อใด?","correct_index":3,"explanation_en":"Normal range VLANs on Cisco switches are numbered 1 through 1005, with 1002-1005 reserved for legacy protocols.","explanation_th":"ช่วง VLAN ปกติบนอุปกรณ์ Cisco คือ 1 ถึง 1005 โดยมีหมายเลข 1002-1005 จองไว้สำหรับโปรโตคอลระบบเก่า","options_th":["1 - 1001","1 - 4094","2 - 1005","1 - 1005"]},{"options":["Yes, switches automatically route between VLANs.","No, routing between VLANs requires a Layer 3 device (such as a router or multilayer switch).","Yes, if they are connected to the same switch.","No, unless they share the same physical cable."],"question_en":"Can devices on different VLANs communicate directly with each other without a Layer 3 device?","question_th":"อุปกรณ์ที่อยู่ต่าง VLAN กันจะสามารถสื่อสารกันโดยตรงโดยไม่ต้องพึ่งพาอุปกรณ์ Layer 3 ได้หรือไม่?","correct_index":1,"explanation_en":"VLANs block Layer 2 broadcast/unicast traffic between each other. Inter-VLAN communication requires Layer 3 routing.","explanation_th":"ไม่สามารถทำได้ เนื่องจาก VLAN แยกการทำงานในระดับ Layer 2 ออกจากกันโดยเด็ดขาด การสื่อสารข้ามวงจึงต้องผ่านการจัดเส้นทางใน Layer 3 เท่านั้น","options_th":["ใช่ สลับเส้นทางระหว่าง VLAN โดยอัตโนมัติ","ไม่ ต้องใช้ Router หรือ Layer 3 Switch","ใช่ หากเชื่อมต่อกับสวิตช์ตัวเดียวกัน","ไม่ เว้นแต่จะใช้สายเคเบิลเดียวกันร่วมกัน"]}]}', NULL),
	('lesson-ccna002-03', 'ccna-002', 'Trunking (802.1Q)', 'Trunking (802.1Q)', '## Trunking และ 802.1Q

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการส่ง Traffic หลาย VLAN พร้อมกันบนสายเคเบิลเส้นเดียวด้วย Trunk Port

**เนื้อหาหลัก**
- **Trunk Port:** พอร์ตที่ส่ง Traffic จากหลาย VLAN พร้อมกัน ใช้เชื่อมระหว่าง Switch ↔ Switch หรือ Switch ↔ Router
- **802.1Q Tag:** Header ขนาด 4 ไบต์ที่แทรกเข้าไปใน Ethernet Frame เพื่อบอกว่าแพ็กเก็ตนั้นเป็นของ VLAN ไหน
- **Native VLAN:** VLAN ที่ไม่มีการ Tag (Default คือ VLAN 1) ต้องตั้งให้ตรงกันทั้งสองฝั่ง
- คำสั่ง: `switchport mode trunk`, `switchport trunk allowed vlan 10,20,30`

**สรุป**
Trunking เป็นสิ่งที่ขาดไม่ได้ในเครือข่ายองค์กรที่มีหลาย VLAN เพราะถ้าไม่มี Trunk จะต้องต่อสายแยกสำหรับแต่ละ VLAN', '## Trunking and 802.1Q

**What you will learn in this video**
This video teaches how to send traffic from multiple VLANs simultaneously over a single cable using Trunk Ports.

**Core Content**
- **Trunk Port:** A port that transmits traffic for multiple VLANs at once, used for Switch ↔ Switch or Switch ↔ Router connections.
- **802.1Q Tag:** A 4-byte header inserted into the Ethernet Frame to identify which VLAN the packet belongs to.
- **Native VLAN:** An untagged VLAN (Default is VLAN 1) which must match on both ends of the trunk.
- Commands: `switchport mode trunk`, `switchport trunk allowed vlan 10,20,30`

**Conclusion**
Trunking is vital in enterprise networks with multiple VLANs. Without trunking, a separate cable would be needed for every single VLAN.', 'video', 8, 3, 'https://www.youtube.com/watch?v=vE5gvbmR8jg', '/images/thumbnails/lesson-ccna002-03.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["ISL","802.1Q","802.3","VTP"],"question_en":"Which protocol is the industry standard for tagging frames on a trunk link?","question_th":"โปรโตคอลใดที่เป็นมาตรฐานสากลในการทำ Tagging เฟรมบนพอร์ต Trunk?","correct_index":1,"explanation_en":"IEEE 802.1Q is the industry-standard frame encapsulation protocol used to carry multiple VLAN traffic over a trunk link.","explanation_th":"IEEE 802.1Q คือมาตรฐานหลักในปัจจุบันที่ใช้แปะป้ายระบุหมายเลข VLAN (Tagging) วิ่งผ่านลิงก์เชื่อมต่อแบบ Trunk","options_th":["ISL","802.1คิว","802.3","VTP"]},{"options":["To encrypt management traffic.","To handle untagged traffic received on the trunk link.","To block VLAN loop creation.","To assign IP addresses to the switch interface."],"question_en":"What is the purpose of the Native VLAN on an 802.1Q trunk link?","question_th":"Native VLAN ในการเชื่อมต่อแบบ 802.1Q Trunk มีวัตถุประสงค์เพื่ออะไร?","correct_index":1,"explanation_en":"Frames belonging to the Native VLAN are sent untagged across the 802.1Q trunk link. Untagged frames received on the trunk are processed by the native VLAN.","explanation_th":"Native VLAN จะยอมให้เฟรมข้อมูลเดินทางผ่านสาย Trunk ไปได้โดยไม่มีการแปะ Tag และหากมีเฟรมที่ไม่มี Tag วิ่งเข้ามาก็จะถือเป็นของ Native VLAN เช่นกัน","options_th":["เพื่อเข้ารหัสการรับส่งข้อมูลการจัดการ","รองรับ Traffic ที่ไม่ติด Tag บน Trunk","เพื่อบล็อกการสร้างลูป VLAN","เพื่อกำหนดที่อยู่ IP ให้กับอินเทอร์เฟซสวิตช์"]},{"options":["The switches will automatically disable trunking.","Traffic may leak between different VLANs, and CDP will generate error warnings.","The trunk will fall back to half-duplex.","All traffic will be encrypted."],"question_en":"What happens if there is a Native VLAN mismatch between two connected switch trunk ports?","question_th":"จะเกิดอะไรขึ้นหากมีการตั้งค่า Native VLAN ไม่ตรงกันระหว่างพอร์ต Trunk ของสวิตช์สองฝั่งที่เชื่อมกัน?","correct_index":1,"explanation_en":"A native VLAN mismatch can cause traffic from one VLAN to bleed into a different VLAN, and generates configuration warnings via protocols like CDP.","explanation_th":"จะเกิดความปั่นป่วนของข้อมูลที่ไหลข้ามสลับวง VLAN กัน (VLAN leaking) และโปรโตคอล CDP จะแจ้งเตือนข้อผิดพลาดขึ้นมาทันที","options_th":["สวิตช์จะปิดใช้งานการเชื่อมต่อสายไฟโดยอัตโนมัติ","Traffic ข้าม VLAN ผิดวงและ CDP แจ้งเตือน","ลำตัวจะถอยกลับไปเป็นฮาล์ฟดูเพล็กซ์","การรับส่งข้อมูลทั้งหมดจะถูกเข้ารหัส"]},{"options":["switchport mode trunk","switchport mode dynamic desirable","switchport mode access","switchport negotiation enable"],"question_en":"Which command is used to configure a switch port to dynamically negotiate trunk status with a connected device?","question_th":"คำสั่งใดใช้ระบุให้พอร์ตสวิตช์เริ่มทำข้อตกลงโหมด Trunk โดยอัตโนมัติกับอุปกรณ์ปลายทาง?","correct_index":1,"explanation_en":"The ''switchport mode dynamic desirable'' (or dynamic auto) command enables Dynamic Trunking Protocol (DTP) to negotiate the trunk link.","explanation_th":"การสั่งโหมด ''switchport mode dynamic desirable'' จะเรียกใช้โปรโตคอล DTP เพื่อคุยเจรจาตกลงเปิดโหมด Trunk ให้เองหากคู่สายยินยอม","options_th":["switchport mode trunk","switchport mode dynamic desirable","switchport mode access","switchport negotiation enable"]},{"options":["2 bytes","4 bytes","8 bytes","12 bytes"],"question_en":"How many bytes does the 802.1Q tag add to an Ethernet frame header?","question_th":"ป้าย Tag ของระบบ 802.1Q จะเพิ่มข้อมูลเข้าไปในส่วนหัว (Header) ของเฟรมอีเธอร์เน็ตขนาดกี่ไบต์?","correct_index":1,"explanation_en":"The 802.1Q tagging process inserts a 4-byte VLAN tag into the original Ethernet frame header.","explanation_th":"การแปะ VLAN tag แบบ 802.1Q จะแทรกข้อมูลเข้าไปเป็นจำนวน 4 ไบต์ ในส่วนหัวของเฟรมอีเธอร์เน็ตปกติ","options_th":["2 ไบต์","4 ไบต์","8 ไบต์","12 ไบต์"]}]}', NULL),
	('lesson-ccna005-05', 'ccna-005', 'NTP และ Syslog', 'NTP and Syslog', '## NTP and Syslog

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
หากไม่มี NTP เวลาใน Log จะคลาดเคลื่อน ทำให้ไม่สามารถนำข้อมูลจาก Syslog ของอุปกรณ์หลายๆ ตัวมาหาความสัมพันธ์ (Correlation) เพื่อวิเคราะห์หาสาเหตุของปัญหาในเครือข่ายได้', '## NTP and Syslog

**Introduction**
Network Time Protocol (NTP) and Syslog are two fundamental network services that work together for effective system administration and monitoring.

**Network Time Protocol (NTP)**
- Synchronizes the time across all devices in a network.
- Uses a Stratum architecture (Stratum 0 is the reference clock, Stratum 1 receives the time).
- Highly critical for authentication and troubleshooting.

**Syslog**
- The standard for collecting and sending system logs to a central server.
- Uses 8 Severity Levels (0 to 7), such as Level 0 (Emergencies), Level 3 (Errors), and Level 7 (Debugging).

**Conclusion**
Without NTP, log timestamps will drift, making it impossible to correlate Syslog data across multiple devices to analyze network issues.', 'reading', 2, 5, NULL, '/images/thumbnails/lesson-ccna005-05.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["NTP (Network Time Protocol)","SNMP","Syslog","DNS"],"question_en":"What protocol is used to synchronize the system clocks of network devices with a reference time source?","question_th":"โปรโตคอลใดใช้สำหรับซิงโครไนซ์เวลาของระบบนาฬิกา (System clock) ของอุปกรณ์กับแหล่งอ้างอิงเวลาที่ถูกต้อง?","correct_index":0,"explanation_en":"NTP (Network Time Protocol) synchronizes time across network devices to ensure accurate logs and certificate validations.","explanation_th":"NTP (Network Time Protocol) ช่วยปรับนาฬิกาของอุปกรณ์เครือข่ายทั้งหมดให้ตรงกันเพื่อความถูกต้องในการตรวจสอบประวัติและ Log","options_th":["NTP","SNMP","Syslog","DNS"]},{"options":["Priority","Stratum","Metric","Hop Count"],"question_en":"In NTP, what value indicates the hierarchical distance of a time source from the primary atomic clock?","question_th":"ในระบบ NTP ค่าตัวเลขใดบ่งบอกถึงระดับชั้นความห่างไกลความแม่นยำ (Hierarchical distance) จากนาฬิกาหลักอะตอมมิก?","correct_index":1,"explanation_en":"NTP uses ''Stratum'' levels. Stratum 0 is the reference atomic clock. Stratum 1 is directly connected to it, Stratum 2 connects to Stratum 1, and so on.","explanation_th":"NTP ใช้ระดับชั้น Stratum โดยที่ Stratum 0 เป็นนาฬิกาอะตอมมิกอ้างอิงตรง และเลขจะขยับเพิ่มตามระยะช่วงต่อห่างออกไป","options_th":["ลำดับความสำคัญ","Stratum","เมตริก","ฮอปนับ"]},{"options":["To assign IP addresses to switches.","To collect, format, and centralize system logs, status messages, and error alerts from devices.","To route traffic between different physical buildings.","To resolve domains to IP addresses."],"question_en":"What is the primary function of Syslog in network management?","question_th":"หน้าที่หลักของการทำระบบล็อกบันทึกเหตุการณ์ (Syslog) ในการจัดการเครือข่ายคืออะไร?","correct_index":1,"explanation_en":"Syslog standardizes event message formatting and allows sending logs from devices to a central repository server.","explanation_th":"Syslog ใช้รวบรวมเหตุการณ์ ระบบรายงานความเคลื่อนไหว และข้อความแจ้งเตือนข้อผิดพลาดจากอุปกรณ์ต่างๆ ส่งเข้าเก็บยังเซิร์ฟเวอร์ส่วนกลาง","options_th":["เพื่อกำหนดที่อยู่ IP ให้กับสวิตช์","รวม Log และ Error จากอุปกรณ์ไว้ส่วนกลาง","กำหนดเส้นทางทราฟฟิกระหว่างอาคารต่างๆ","แปลงชื่อโดเมนเป็นที่อยู่ IP"]},{"options":["5 levels","8 levels (0 to 7)","10 levels","4 levels"],"question_en":"How many severity levels are defined in the standard Syslog protocol?","question_th":"ในโปรโตคอลระบบมาตรฐานของ Syslog มีการจำแนกระดับความรุนแรงของเหตุการณ์ (Severity levels) ไว้ทั้งหมดกี่ระดับ?","correct_index":1,"explanation_en":"Syslog defines 8 severity levels, ranging from Level 0 (Emergency - system unusable) to Level 7 (Debugging).","explanation_th":"Syslog กำหนดความรุนแรงไว้ 8 ระดับ (0 ถึง 7) ไล่ตั้งแต่ระดับวิกฤตรุนแรงที่สุด Level 0 (Emergency) ไปจนถึงระดับแจ้งเบาะแสการแก้ไขอย่าง Level 7 (Debugging)","options_th":["5 ระดับ","8 ระดับ (0 ถึง 7)","10 ระดับ","4 ระดับ"]},{"options":["Level 1","Level 3","Level 5","Level 7"],"question_en":"Which Syslog severity level represents ''Errors'' in the event logs?","question_th":"ระดับความรุนแรงของ Syslog หมายเลขใดที่เป็นตัวแทนกลุ่มประเภทสถานะข้อผิดพลาด ''Errors'' ทั่วไป?","correct_index":1,"explanation_en":"Level 3 is ''Error'' messages, which indicate non-critical failures in processes or components.","explanation_th":"Level 3 คือกลุ่มรายงานข้อผิดพลาดทั่วไป (Errors) แสดงถึงจุดขัดข้องที่เกิดขึ้นกับโปรเซสหรือบางฟังก์ชันการทำงาน","options_th":["ระดับ 1","ระดับ 3","ระดับ 5","ระดับ 7"]}]}', NULL),
	('lesson-ccna006-01', 'ccna-006', 'Network Security Concepts', 'Network Security Concepts', '## Security Concepts (แนวคิดความปลอดภัยเครือข่าย)

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้แนะนำแนวคิดพื้นฐานด้านความปลอดภัยเครือข่าย และภัยคุกคามที่พบบ่อยในปัจจุบัน

**เนื้อหาหลัก**
- **CIA Triad:** Confidentiality (ข้อมูลไม่รั่วไหล), Integrity (ข้อมูลไม่ถูกดัดแปลง), Availability (ระบบพร้อมใช้เสมอ)
- **ประเภทภัยคุกคาม:** Malware, Phishing, DoS/DDoS, Man-in-the-Middle, SQL Injection
- **Defense in Depth:** ป้องกันหลายชั้น ไม่พึ่ง Single Point of Defense
- **Firewall Types:** Packet Filter, Stateful Inspection, NGFW (Next-Gen)
- **IDS vs IPS:** IDS ตรวจจับและแจ้งเตือน, IPS ตรวจจับและบล็อกอัตโนมัติ

**สรุป**
ความปลอดภัยไม่ใช่ผลิตภัณฑ์ แต่เป็นกระบวนการต่อเนื่อง วิศวกรเครือข่ายต้องเข้าใจภัยคุกคามเพื่อออกแบบระบบป้องกันที่ครอบคลุม', '## Security Concepts

**What you will learn in this video**
This video introduces fundamental network security concepts and common modern threats.

**Core Content**
- **CIA Triad:** Confidentiality (data doesn''t leak), Integrity (data isn''t altered), Availability (systems are always ready to use).
- **Threat Types:** Malware, Phishing, DoS/DDoS, Man-in-the-Middle, SQL Injection.
- **Defense in Depth:** Multi-layered defense, not relying on a Single Point of Defense.
- **Firewall Types:** Packet Filter, Stateful Inspection, NGFW (Next-Gen).
- **IDS vs IPS:** IDS detects and alerts, IPS detects and automatically blocks.

**Conclusion**
Security is not a product but an ongoing process. Network engineers must understand threats to design comprehensive defense systems.', 'video', 7, 1, 'https://www.youtube.com/watch?v=ONwAxehWKs0', '/images/thumbnails/lesson-ccna006-01.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["Configuration, Installation, Administration","Confidentiality, Integrity, Availability","Connectivity, Isolation, Authentication","Control, Inspection, Audit"],"question_en":"What are the three pillars of the CIA Triad in information security?","question_th":"สามเสาหลักในโครงสร้างสามเหลี่ยมความปลอดภัยข้อมูล CIA Triad คือข้อใด?","correct_index":1,"explanation_en":"The CIA Triad stands for Confidentiality (preventing unauthorized access), Integrity (preventing unauthorized modification), and Availability (ensuring systems are accessible).","explanation_th":"CIA Triad ยึดสามหลักการสำคัญ ได้แก่ ความเป็นส่วนตัว (Confidentiality) ความถูกต้องถูกต้อง (Integrity) และความพร้อมใช้งานระบบ (Availability)","options_th":["การกำหนดค่า การติดตั้ง การดูแลระบบ","การรักษาความลับ ความสมบูรณ์ ความพร้อมใช้งาน","การเชื่อมต่อ การแยกส่วน การยืนยันตัวตน","การควบคุม การตรวจสอบ การตรวจสอบ"]},{"options":["Vulnerability is an active attack; threat is a hardware bug.","Vulnerability is a weakness in the system; threat is a potential force or adversary looking to exploit that weakness.","Vulnerabilities only exist on switches; threats only exist on routers.","Threats are internal; vulnerabilities are external."],"question_en":"What is the difference between a vulnerability and a threat in network security?","question_th":"ความแตกต่างระหว่างช่องโหว่ (Vulnerability) และภัยคุกคาม (Threat) ในมุมมองความปลอดภัยเครือข่ายคืออะไร?","correct_index":1,"explanation_en":"A vulnerability is a weakness (e.g. software bug, misconfiguration). A threat is anything that could exploit that vulnerability to cause harm.","explanation_th":"Vulnerability คือจุดบกพร่องหรือความอ่อนแอในตัวระบบ ส่วน Threat คือปัจจัยภายนอกหรือผู้ไม่ประสงค์ดีที่จะเข้ามาเจาะจุดบกพร่องนั้น","options_th":["ช่องโหว่คือการโจมตีที่ทำงานอยู่ ภัยคุกคามคือจุดบกพร่องของฮาร์ดแวร์","Vulnerability คือจุดอ่อน; Threat คือสิ่งที่อาจโจมตี","ช่องโหว่มีอยู่บนสวิตช์เท่านั้น ภัยคุกคามมีเฉพาะบนเราเตอร์เท่านั้น","ภัยคุกคามอยู่ภายใน ช่องโหว่อยู่ภายนอก"]},{"options":["Man-in-the-Middle (MitM)","Phishing","Denial of Service (DoS / DDoS)","SQL Injection"],"question_en":"Which type of attack floods a network or server with fake traffic to make it unavailable to legitimate users?","question_th":"การโจมตีประเภทใดที่ยิงทราฟฟิกปลอมจำนวนมหาศาลถล่มระบบเพื่อป่วนให้เซิร์ฟเวอร์หยุดทำงานหรือไม่สามารถให้บริการลูกค้าปกติได้?","correct_index":2,"explanation_en":"Denial of Service (DoS) and Distributed DoS (DDoS) flood resources with traffic to overwhelm them, violating the ''Availability'' pillar of security.","explanation_th":"การโจมตีแบบปฏิเสธการให้บริการ (DoS/DDoS) มุ่งเป้าป่วนการเข้าถึงระบบโดยอัดข้อมูลปริมาณมากใส่เป้าหมายให้ประมวลผลไม่ทัน","options_th":["Man-in-the-Middle (MitM)","ฟิชชิ่ง","DoS / DDoS","SQL Injection"]},{"options":["Hacking physical network routers using custom code.","Manipulating people into revealing confidential information or granting unauthorized access.","Rewriting computer code to fix security bugs.","Bypassing firewalls using hardware components."],"question_en":"What is Social Engineering?","question_th":"วิศวกรรมสังคม (Social Engineering) หมายถึงเทคนิคการโจมตีในลักษณะใด?","correct_index":1,"explanation_en":"Social engineering uses psychological manipulation (like phishing or impersonation) to trick individuals into disclosing sensitive information (like passwords).","explanation_th":"คือกลอุบายหลอกล่อชักจูงคนโดยใช้จิตวิทยา (เช่น การส่งอีเมล Phishing หรือสวมรอย) เพื่อให้บอกข้อมูลที่เป็นความลับ","options_th":["การแฮ็กเราเตอร์เครือข่ายทางกายภาพโดยใช้โค้ดที่กำหนดเอง","หลอกคนให้เปิดเผยข้อมูลหรือให้สิทธิ์โดยมิชอบ","เขียนโค้ดคอมพิวเตอร์ใหม่เพื่อแก้ไขข้อบกพร่องด้านความปลอดภัย","การข้ามไฟร์วอลล์โดยใช้ส่วนประกอบฮาร์ดแวร์"]},{"options":["Authentication","Authorization","Accounting","Encryption"],"question_en":"Which security measure validates the identity of a user attempting to connect to a network resource?","question_th":"มาตรการความปลอดภัยใดทำหน้าที่ตรวจสอบยืนยันตัวตนของผู้ใช้ที่กำลังพยายามเชื่อมเข้าหาทรัพยากรระบบ?","correct_index":0,"explanation_en":"Authentication confirms who the user is (e.g. via username/password or certificates).","explanation_th":"การยืนยันตัวตน (Authentication) เป็นด่านแรกที่ตรวจสอบว่าผู้ใช้นั้นคือใครและเป็นผู้มีรายชื่อในระบบจริงหรือไม่","options_th":["การยืนยันตัวตน","การกำหนดสิทธิ์","การบันทึกการใช้งาน","การเข้ารหัส"]}]}', NULL),
	('lesson-ccna005-03', 'ccna-005', 'NAT และ PAT', 'NAT and PAT', '## NAT และ PAT

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการแปลง IP Address เพื่อให้อุปกรณ์ Private IP สามารถออกอินเทอร์เน็ตได้

**เนื้อหาหลัก**
- **Static NAT:** IP Private 1 ตัว ↔ IP Public 1 ตัว (ใช้สำหรับ Server ที่ต้องการ IP คงที่)
- **Dynamic NAT:** Pool ของ IP Private ↔ Pool ของ IP Public (First-come first-served)
- **PAT (Port Address Translation / NAT Overload):** หลาย IP Private → 1 IP Public โดยแยกด้วย Port Number (ที่บ้านทุกหลังใช้นี้)
- การตั้งค่า: `ip nat inside`, `ip nat outside`, `ip nat inside source list <ACL> interface <int> overload`

**สรุป**
PAT คือสิ่งที่ทำให้ IPv4 ยังใช้งานได้ถึงทุกวันนี้แม้ Address จะหมด เพราะบ้านแต่ละหลังใช้ IP สาธารณะแค่ 1 ตัวสำหรับอุปกรณ์ทุกชิ้น', '## NAT and PAT

**What you will learn in this video**
This video teaches IP Address translation, allowing devices with Private IPs to access the internet.

**Core Content**
- **Static NAT:** 1 Private IP ↔ 1 Public IP (Used for servers requiring a fixed IP).
- **Dynamic NAT:** Pool of Private IPs ↔ Pool of Public IPs (First-come, first-served).
- **PAT (Port Address Translation / NAT Overload):** Multiple Private IPs → 1 Public IP, differentiated by Port Number (This is what is used in every home).
- Configuration: `ip nat inside`, `ip nat outside`, `ip nat inside source list <ACL> interface <int> overload`

**Conclusion**
PAT is what keeps IPv4 viable today despite address exhaustion, as each home only needs 1 public IP for all its devices.', 'video', 20, 3, 'https://www.youtube.com/watch?v=PscmYeDZhlY', '/images/thumbnails/lesson-ccna005-03.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["To automatically encrypt all outbound traffic.","To conserve public IPv4 addresses by allowing private IP hosts to share public IPs.","To speed up local subnet routing.","To assign MAC addresses dynamically."],"question_en":"What is the primary benefit of Network Address Translation (NAT)?","question_th":"ประโยชน์สูงสุดของการทำกลไกแปลงที่อยู่เครือข่าย (NAT) คืออะไร?","correct_index":1,"explanation_en":"NAT conserves the limited global pool of public IPv4 addresses by translating private local IP addresses to public IPs.","explanation_th":"NAT ช่วยชะลอการหมดไปของ IPv4 โดยให้กลุ่มโฮสต์ไอพีส่วนบุคคลใช้ที่อยู่ไอพีสาธารณะแชร์ร่วมกันเพื่อเชื่อมออกสู่อินเทอร์เน็ต","options_th":["เพื่อเข้ารหัสการรับส่งข้อมูลขาออกทั้งหมดโดยอัตโนมัติ","ให้ Private IP หลายเครื่องใช้ Public IP ร่วมกัน","เพื่อเพิ่มความเร็วในการกำหนดเส้นทางซับเน็ตท้องถิ่น","เพื่อกำหนดที่อยู่ MAC แบบไดนามิก"]},{"options":["Static NAT","Dynamic NAT","PAT (Port Address Translation)","NAT Overload"],"question_en":"Which NAT type maps a single private IP address to a single public IP address permanently?","question_th":"การทำ NAT ประเภทใดที่ผูกจับคู่ที่อยู่ไอพีส่วนบุคคลเดี่ยวเข้ากับไอพีสาธารณะเดี่ยวแบบถาวรและแน่นอน (อัตราส่วน 1:1)?","correct_index":0,"explanation_en":"Static NAT creates a 1-to-1 permanent translation, mapping a specific local address to a specific global address.","explanation_th":"Static NAT คือการทำแปลงที่อยู่แบบ 1 ต่อ 1 โดยจับคู่ไอพีภายในและไอพีสาธารณะข้างนอกไว้คู่กันอย่างถาวร","options_th":["NAT แบบคงที่","NAT แบบไดนามิก","PAT (การแปลที่อยู่พอร์ต)","NAT โอเวอร์โหลด"]},{"options":["Static NAT","Dynamic NAT","NAT Overload","NAT Bypass"],"question_en":"What is another common name for Port Address Translation (PAT)?","question_th":"การทำแปลงแอดเดรสโดยอิงจากหมายเลขพอร์ต (Port Address Translation - PAT) มีชื่อเรียกขานทั่วไปอีกชื่อหนึ่งว่าอะไร?","correct_index":2,"explanation_en":"PAT is also known as NAT Overload, where multiple private IP hosts share a single public IP by using unique source port numbers.","explanation_th":"PAT หรือมีชื่อเรียกใน Cisco IOS ว่า NAT Overload คือการใช้อุปกรณ์ภายในจำนวนมากออกเน็ตโดยสวมไอพีสาธารณะตัวเดียวแต่ใช้พอร์ตแยกแยะ","options_th":["NAT แบบคงที่","NAT แบบไดนามิก","NAT โอเวอร์โหลด","แนท บายพาส"]},{"options":["The IP address of a host on the inside network as seen from the outside network.","The actual private IP address assigned to a host on the inside local network.","The public IP address of the destination host.","The router''s WAN interface IP."],"question_en":"In NAT terminology, what is the ''Inside Local'' address?","question_th":"ตามคำนิยามของการทำ NAT ที่อยู่ไอพีประเภท ''Inside Local'' หมายถึงแอดเดรสใด?","correct_index":1,"explanation_en":"Inside Local is the real IP address configured on an internal host, typically a private RFC 1918 address.","explanation_th":"Inside Local คือที่อยู่ไอพีจริงที่ตั้งค่าให้กับโฮสต์ภายในเครือข่าย ซึ่งส่วนใหญ่เป็นไอพีส่วนบุคคลตาม RFC 1918","options_th":["ที่อยู่ IP ของโฮสต์บนเครือข่ายภายในเมื่อเห็นจากเครือข่ายภายนอก","ที่อยู่ IP ส่วนตัวจริงที่กำหนดให้กับโฮสต์บนเครือข่ายท้องถิ่นภายใน","ที่อยู่ IP สาธารณะของโฮสต์ปลายทาง","IP อินเทอร์เฟซ WAN ของเราเตอร์"]},{"options":["enable","overload","pat","dynamic"],"question_en":"Which configuration keyword is appended to the ''ip nat inside source list'' command to enable PAT on a Cisco router interface?","question_th":"คีย์เวิร์ดใดที่ต่อท้ายคำสั่ง ''ip nat inside source list'' เพื่อสั่งให้เร้าเตอร์ Cisco เปิดใช้งานฟังก์ชัน PAT?","correct_index":1,"explanation_en":"The ''overload'' keyword at the end of the config command triggers PAT (Port Address Translation).","explanation_th":"การพิมพ์คำว่า ''overload'' ปิดท้ายชุดคำสั่งจะกระตุ้นให้ระบบสลับมาใช้กระบวนการทำงานของ PAT ทันที","options_th":["enable","overload","PAT","dynamic"]}]}', NULL),
	('lesson-ccna005-07', 'ccna-005', 'NAT และ PAT', 'NAT', '## NAT และ PAT

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการแปลง IP Address เพื่อให้อุปกรณ์ Private IP สามารถออกอินเทอร์เน็ตได้ พร้อม Lab ตั้งค่าบน Cisco Router

**เนื้อหาหลัก**
- **Static NAT:** IP Private 1 ตัว <-> IP Public 1 ตัว เหมาะสำหรับ Server ที่ต้องการ IP คงที่
- **Dynamic NAT:** Pool ของ IP Private <-> Pool ของ IP Public แบบ First-come first-served
- **PAT (Port Address Translation / NAT Overload):** หลาย IP Private -> 1 IP Public โดยแยกด้วย Port Number ที่แตกต่างกัน นี่คือสิ่งที่บ้านทุกหลังใช้งานอยู่
- **การตั้งค่า:**
```
interface GigabitEthernet0/0
  ip nat inside
interface GigabitEthernet0/1
  ip nat outside
ip nat inside source list 1 interface Gi0/1 overload
access-list 1 permit 192.168.1.0 0.0.0.255
```
- **ตรวจสอบ:** show ip nat translations, show ip nat statistics
- **NAT ทำลาย End-to-End Transparency:** อุปกรณ์ภายนอกไม่เห็น IP จริงของอุปกรณ์ภายใน

**สรุป**
PAT คือสิ่งที่ทำให้ IPv4 ยังใช้งานได้ถึงทุกวันนี้แม้ Address จะหมด เพราะบ้านแต่ละหลังใช้ IP สาธารณะแค่ 1 ตัวสำหรับอุปกรณ์ทุกชิ้น', '## NAT and PAT

**What you will learn in this video**
This video teaches IP Address translation allowing Private IP devices to access the internet, complete with a lab on a Cisco Router.

**Core Content**
- **Static NAT:** 1 Private IP <-> 1 Public IP. Ideal for servers needing a fixed IP.
- **Dynamic NAT:** Pool of Private IPs <-> Pool of Public IPs (First-come, first-served).
- **PAT (Port Address Translation / NAT Overload):** Multiple Private IPs -> 1 Public IP, distinguished by different Port Numbers. This is how home networks operate.
- **Configuration:**
```text
interface GigabitEthernet0/0
  ip nat inside
interface GigabitEthernet0/1
  ip nat outside
ip nat inside source list 1 interface Gi0/1 overload
access-list 1 permit 192.168.1.0 0.0.0.255
```
- **Verification:** `show ip nat translations`, `show ip nat statistics`
- **NAT breaks End-to-End Transparency:** External devices cannot see the true IP of internal devices.

**Conclusion**
PAT is what keeps IPv4 functional today despite address exhaustion, as each household uses just 1 public IP for all its devices.', 'video', 5, 3, 'https://www.youtube.com/watch?v=FTUV0t6JaDA', 'https://loremflickr.com/600/400/server,technology,network/all?lock=44', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["Inside Local","Inside Global","Outside Local","Outside Global"],"question_en":"Which NAT terminology refers to the IP address of an outside host as it is seen by hosts on the inside network?","question_th":"คีย์นิยาม NAT ในข้อใดที่หมายถึงตำแหน่งที่อยู่ไอพีของโฮสต์ภายนอกตามที่ถูกแปลมองเห็นโดยเครื่องโฮสต์ภายในเครือข่าย?","correct_index":2,"explanation_en":"Outside Local represents the IP address of an outside destination host as it appears to the internal network hosts.","explanation_th":"Outside Local บ่งชี้ไอพีของเครื่องข้างนอกตามที่ปรากฏให้เครื่องภายในเห็น (มักแปลงเพื่อไม่ให้อุปกรณ์ภายในสับสนการจัดเส้นทาง)","options_th":["ภายในท้องถิ่น","ภายในทั่วโลก","ภายนอกท้องถิ่น","ภายนอกทั่วโลก"]},{"options":["Dynamic NAT requires no configuration.","Dynamic NAT translates private IPs to a pool of public IPs on-demand, rather than binding them permanently.","Dynamic NAT automatically encrypts traffic.","Dynamic NAT works without any router."],"question_en":"Why would an organization configure dynamic NAT instead of static NAT?","question_th":"ทำไมองค์กรธุรกิจจึงนิยมใช้งาน Dynamic NAT แทนการคอนฟิกแบบ Static NAT?","correct_index":1,"explanation_en":"Dynamic NAT uses a pool of public IP addresses, assigning them to internal hosts dynamically as they request external access, rather than using rigid 1-to-1 pairings.","explanation_th":"Dynamic NAT จะดึงไอพีสาธารณะจากกลุ่มที่เตรียมไว้มาแปลสลับให้เครื่องภายในแบบเรียลไทม์เป็นรอบๆ แทนการจองผูกขาดถาวร","options_th":["Dynamic NAT ไม่ต้องกำหนดค่าใดๆ","แปลง Private IP เป็น Public IP จาก Pool เมื่อต้องใช้","Dynamic NAT เข้ารหัสการรับส่งข้อมูลโดยอัตโนมัติ","Dynamic NAT ทำงานโดยไม่ต้องใช้เราเตอร์"]},{"options":["ip nat outside","ip nat inside","ip nat enable","nat external"],"question_en":"Which command designates a router interface as connected to the external internet in a NAT configuration?","question_th":"คำสั่งใดใช้ประกาศพอร์ตอินเตอร์เฟสของเร้าเตอร์ว่าทำหน้าที่เชื่อมต่อไปยังอินเทอร์เน็ตภายนอก (External) ในคอนฟิก NAT?","correct_index":0,"explanation_en":"The ''ip nat outside'' command is applied on the interface facing the outside world (e.g. WAN interface).","explanation_th":"ใช้คำสั่ง ''ip nat outside'' ระบุไว้ในพอร์ตที่หันออกสู่เครือข่ายอินเทอร์เน็ตหรือฝั่งผู้ให้บริการภายนอก","options_th":["ip nat outside","ip nat inside","ip nat enable","แนทภายนอก"]},{"options":["It does not support IPv4.","Once the pool of public IP addresses is fully allocated, subsequent internal hosts are blocked from accessing the internet until an IP is freed.","It is slower than static routing.","It is proprietary to non-Cisco routers."],"question_en":"What is the main limitation of standard Dynamic NAT without overload (PAT)?","question_th":"ข้อจำกัดหลักของการทำ Dynamic NAT แบบธรรมดาที่ไม่มีการพ่วงฟังก์ชัน Overload (PAT) คืออะไร?","correct_index":1,"explanation_en":"Standard Dynamic NAT translates IPs on a 1-to-1 basis. If the pool has 5 IPs, only 5 hosts can access the internet simultaneously. Others must wait.","explanation_th":"เนื่องจากยังแปลแบบ 1:1 หากมีไอพีสาธารณะในกองกลาง 5 เบอร์ ก็จะใช้ออกเน็ตพร้อมกันได้เพียง 5 โฮสต์ ส่วนเครื่องถัดไปต้องต่อคิวรอ","options_th":["มันไม่รองรับ IPv4","Public IP ใน Pool หมด Host ใหม่จึงออก Internet ไม่ได้","มันช้ากว่าการกำหนดเส้นทางแบบคงที่","เป็นกรรมสิทธิ์ของเราเตอร์ที่ไม่ใช่ของ Cisco"]},{"options":["show ip nat translations","show ip nat statistics","show nat active","debug ip nat"],"question_en":"Which command is used to verify the active NAT translations currently stored in a Cisco router?","question_th":"คำสั่งตรวจสอบกระบวนการแปลงแอดเดรส NAT ที่กำลังทำงานอยู่แบบเรียลไทม์บนเร้าเตอร์ Cisco คือข้อใด?","correct_index":0,"explanation_en":"The command ''show ip nat translations'' displays the active translation table entries, showing mappings between inside/outside local and global IPs.","explanation_th":"คำสั่ง ''show ip nat translations'' แสดงตารางประวัติจับคู่ระหว่างกลุ่มไอพีภายนอกและภายในที่เซสชันกำลังเปิดอยู่","options_th":["show ip nat translations","show ip nat statistics","show nat active","debug ip nat"]}]}', NULL),
	('lesson-ts005-02', 'troubleshoot-005', 'บทความ: การใช้งาน IP SLA และ Tracking Object', 'Reading: IP SLA and Tracking Objects in Depth', '## ทำความรู้จักกับ IP SLA

**บทนำ**
IP SLA (Service-Level Agreement) เป็นฟีเจอร์ที่มาพร้อมกับ Cisco IOS ซึ่งทำหน้าที่ตรวจสอบประสิทธิภาพของเครือข่ายแบบแอคทีฟ (Active Monitoring)

**การทำงานของ IP SLA**
ต่างจากการตรวจสอบแบบปกติที่แค่ดูว่าลิงก์ Up หรือ Down (Passive) IP SLA จะทำการสร้างทราฟฟิกจำลอง (Synthetic Traffic) ส่งเข้าไปในเครือข่าย เพื่อวัดค่าตัวแปรต่างๆ เช่น:
- **Round-Trip Time (RTT):** เวลาที่ใช้ในการส่งข้อมูลไปและกลับ
- **Jitter:** ความแปรปรวนของระยะเวลาที่แพ็กเก็ตเดินทาง
- **Packet Loss:** เปอร์เซ็นต์ของแพ็กเก็ตที่สูญหายระหว่างทาง

**การประยุกต์ใช้ร่วมกับ Object Tracking**
ประโยชน์สูงสุดของ IP SLA คือการทำงานร่วมกับฟีเจอร์ "Object Tracking"
ตัวอย่างเช่น หากเรามี ISP สองเส้น (Primary และ Backup) เราสามารถตั้ง IP SLA ให้ ping ไปที่ Google DNS (8.8.8.8) ผ่าน Primary ISP อย่างต่อเนื่อง
หากเกิด Packet Loss หรือ RTT สูงเกินเกณฑ์ที่กำหนด Object Tracking จะตรวจจับได้ และสั่งให้เร้าเตอร์เปลี่ยนเส้นทาง Routing ไปใช้ Backup ISP อัตโนมัติ (Automated Failover)

**สรุป**
IP SLA ไม่ใช่แค่เครื่องมือมอนิเตอร์ธรรมดา แต่เป็นเซ็นเซอร์อัจฉริยะที่ช่วยให้เครือข่ายสามารถรับรู้สภาพการเชื่อมต่อและปรับตัวได้เองตามสถานการณ์', '## Understanding IP SLA

**Introduction**
IP SLA (Service-Level Agreement) is a feature included with Cisco IOS that performs Active Monitoring of network performance.

**How IP SLA Works**
Unlike standard monitoring that passively checks if a link is Up or Down, IP SLA generates Synthetic Traffic into the network to measure variables such as:
- **Round-Trip Time (RTT):** The time taken to send and receive data.
- **Jitter:** Variance in packet travel times.
- **Packet Loss:** The percentage of packets lost in transit.

**Applying with Object Tracking**
The greatest benefit of IP SLA is pairing it with "Object Tracking".
For example, with two ISPs (Primary and Backup), IP SLA can continuously ping Google DNS (8.8.8.8) via the Primary ISP.
If Packet Loss or RTT exceeds the threshold, Object Tracking detects it and automatically orders the Router to switch Routing to the Backup ISP (Automated Failover).

**Conclusion**
IP SLA isn''t just a simple monitoring tool; it acts as an intelligent sensor that enables the network to perceive connection conditions and adapt automatically.', 'reading', 5, 2, NULL, '/images/resources/it-made-easy.png', 'advanced', '2026-06-04 10:16:54.683486+00', '2026-06-04 10:16:54.683486+00', '{"questions":[{"options":["A tool to track physical device inventory.","A logical tracker that monitors the state of an IP SLA operation, routing state, or interface status and reports changes.","An administrative user profile.","A VLAN management tag."],"question_en":"What is a Track Object in Cisco IOS?","question_th":"Track Object ในระบบปฏิบัติการ Cisco IOS หมายถึงตัวแปรข้อใด?","correct_index":1,"explanation_en":"Track Objects decouple features from direct triggers. They monitor interfaces or IP SLA results and toggle states (up/down) based on threshold metrics.","explanation_th":"คือฟังก์ชันตรวจสอบเชิงตรรกะที่เฝ้าจับตามองสถานะของ IP SLA, พอร์ตอินเตอร์เฟส หรือเร้าติ้ง แล้วนำสถานะ (Up/Down) ไปชี้เป้าทำงานอื่น","options_th":["เครื่องมือในการติดตามสินค้าคงคลังของอุปกรณ์ทางกายภาพ","ตัวติดตามสถานะ IP SLA, Route หรือ Interface","โปรไฟล์ผู้ใช้ระดับผู้ดูแลระบบ","แท็กการจัดการ VLAN"]},{"options":["By configuring the static route inside the IP SLA config.","By adding the ''track <object-number>'' keyword to the ''ip route'' command.","By creating an EEM script only.","By enabling RIPv2."],"question_en":"How can you link a Track Object to a static route to provide automatic path failover?","question_th":"คุณจะผูกเชื่อม Track Object เข้ากับตารางเส้นทางคงที่ (Static Route) เพื่อให้สลับก๊อกสำรองอัตโนมัติ (Failover) ได้ด้วยวิธีการใด?","correct_index":1,"explanation_en":"By configuring ''ip route <network> <mask> <gateway> track <id>'', the static route is only installed in the routing table while the tracked object remains UP.","explanation_th":"ทำโดยแนบคีย์เวิร์ด ''track <เลขแทร็ก>'' ต่อท้ายคำสั่ง ''ip route'' เพื่อให้ลบเส้นทางทิ้งไปชั่วคราวหากเป้าหมายนั้นพัง (Down)","options_th":["โดยการกำหนดค่าเส้นทางแบบคงที่ภายในการกำหนดค่า IP SLA","โดยการเพิ่มคีย์เวิร์ด ''track <object-number>'' ลงในคำสั่ง ''ip route''","โดยการสร้างสคริปต์ EEM เท่านั้น","โดยการเปิดใช้งาน RIPv2"]},{"options":["The route remains active but changes its IP address.","The route is removed from the routing table, allowing a backup route with a higher AD to take over.","The router shuts down automatically.","The route is duplicated."],"question_en":"If a tracked IP SLA probe detects that the primary internet connection is down, what happens to the associated static route configured with that track object?","question_th":"หากแทร็กของ IP SLA พบว่าสายเชื่อมต่อเน็ตเส้นหลักเกิดขาดลง จะส่งผลอย่างไรต่อเส้นทางคงที่ (Static route) ที่ผูกติดกับแทร็กตัวนั้น?","correct_index":1,"explanation_en":"When the tracked SLA state changes to DOWN, the static route is pulled from the routing table. The backup path (e.g. floating static route) is then used.","explanation_th":"เส้นทางดังกล่าวจะโดนดึงถอนออกจากตาราง Routing table ทันที ทำให้เส้นทางสำรองที่ AD สูงกว่าสลับขึ้นมาทำงานแทนที่ได้สำเร็จ","options_th":["เส้นทางยังคงใช้งานได้แต่เปลี่ยนที่อยู่ IP","ลบ Route ออก แล้วให้ Backup Route รับช่วง","เราเตอร์จะปิดตัวลงโดยอัตโนมัติ","เส้นทางถูกทำซ้ำ"]},{"options":["track 1 ip sla 10 state","track 1 ip sla 10 reachability","monitor track 1 ip sla 10","ip sla track 1 10"],"question_en":"What is the command to configure Track Object number 1 to monitor the state of IP SLA operation 10?","question_th":"คำสั่งใดสร้างตัวตรวจจับ Track Object หมายเลข 1 เพื่อคอยเฝ้าเช็คประเมินผลจ๊อบ IP SLA หมายเลข 10?","correct_index":1,"explanation_en":"The command ''track 1 ip sla 10 reachability'' (or state) creates a tracking process mapping to the reachability of the SLA operation.","explanation_th":"ใช้คำสั่ง ''track 1 ip sla 10 reachability'' เพื่อผูกพฤติกรรมการมีตัวตนและความพร้อมดึงข้อมูลของ SLA 10 เข้ากับแทร็ก 1","options_th":["track 1 ip sla 10 state","track 1 ip sla 10 reachability","monitor track 1 ip sla 10","ip sla track 1 10"]},{"options":["show track","show ip sla statistics","show monitor status","show ip route track"],"question_en":"Which command is used to display the current state and history statistics of all track objects configured on a Cisco router?","question_th":"คำสั่งใดที่ใช้เปิดสืบดูสถานะการอัปเดตและประวัติรายงานความเคลื่อนไหวของทุก Track Object ในเร้าเตอร์?","correct_index":0,"explanation_en":"The command ''show track'' lists all configured tracking objects, their current status (UP/DOWN), and transition times.","explanation_th":"คำสั่ง ''show track'' จะคอยแจงข้อมูลสรุปของตัวจับทั้งหมดในระบบรวมถึงระยะเวลาเปลี่ยนรอบอัปเดต UP/DOWN","options_th":["show track","show ip sla statistics","show monitor status","show ip route track"]}]}', NULL),
	('lesson-ccna006-04', 'ccna-006', 'AAA (Authentication, Authorization, Accounting)', 'AAA Framework', '## AAA Framework

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
AAA เป็นหัวใจสำคัญของ Security Policyในองค์กร ช่วยให้ผู้ดูแลระบบควบคุมและตรวจสอบทุกการกระทำในเครือข่ายได้อย่างรัดกุม', '## AAA Framework

**Introduction**
AAA stands for Authentication, Authorization, and Accounting. It is the standard framework for controlling network access and security.

**AAA Components**
- **Authentication:** Verifies who the user is (e.g., via Username/Password, OTP, or Certificate).
- **Authorization:** Determines what the user is allowed to do after authenticating (e.g., config rights vs read-only rights).
- **Accounting:** Logs the user''s actions, such as login time, commands typed, and session duration.

**RADIUS vs TACACS+**
- **RADIUS:** An open standard popular for Network Access like Wi-Fi 802.1x.
- **TACACS+:** A Cisco protocol that distinctly separates A-A-A, popular for controlling Device Administration privileges.

**Conclusion**
AAA is the heart of an organization''s Security Policy, allowing administrators to tightly control and audit every action on the network.', 'reading', 2, 4, NULL, '/images/thumbnails/lesson-ccna006-04.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["Association, Allocation, Administration","Authentication, Authorization, Accounting","Access-control, Alert, Audit","Authority, Allocation, Action"],"question_en":"What do the three ''A''s in the AAA Security Framework stand for?","question_th":"ตัวอักษร ''A'' ทั้งสามตัวในเฟรมเวิร์กระบบความปลอดภัยแบบ AAA ย่อมาจากอะไร?","correct_index":1,"explanation_en":"AAA stands for Authentication (Who are you?), Authorization (What can you do?), and Accounting (What did you do?).","explanation_th":"AAA ยึดสิทธิ์ 3 ลำดับ ได้แก่ การพิสูจน์ตัวตน (Authentication) การอนุมัติสิทธิ์ (Authorization) และการเก็บบันทึกประวัติ (Accounting)","options_th":["สมาคม การจัดสรร การบริหาร","การยืนยันตัวตน การกำหนดสิทธิ์ การบันทึกการใช้งาน","การควบคุมการเข้าถึง การแจ้งเตือน การตรวจสอบ","อำนาจ การจัดสรร การดำเนินการ"]},{"options":["Authentication","Authorization","Accounting","Access-control"],"question_en":"Which AAA component tracks the actions a user performs, including commands executed and time spent on the device?","question_th":"ส่วนประกอบใดของ AAA ที่คอยจัดเก็บรวบรวมพฤติกรรมการทำงาน รวมถึงบันทึกประวัติคำสั่งสั่งงานและเวลาที่ใช้งานอุปกรณ์?","correct_index":2,"explanation_en":"Accounting generates log records detailing user actions, commands used, and connection durations for audit purposes.","explanation_th":"การเก็บบันทึกข้อมูล (Accounting) ทำหน้าที่บันทึกพฤติกรรม คีย์เวิร์ดคำสั่งต่างๆ และระยะเวลาที่เชื่อมต่อเพื่อใช้เป็นประวัติตรวจสอบย้อนหลัง","options_th":["การยืนยันตัวตน","การกำหนดสิทธิ์","การบันทึกการใช้งาน","การควบคุมการเข้าถึง"]},{"options":["TACACS+","RADIUS (Remote Authentication Dial-In User Service)","SSH","LDAP"],"question_en":"Which protocol is an open-standard used to communicate between network devices and a centralized AAA server?","question_th":"โปรโตคอลมาตรฐานเปิดในข้อใดที่ใช้แลกเปลี่ยนติดต่อสื่อสารระหว่างตัวอุปกรณ์เครือข่ายและเครื่องเซิร์ฟเวอร์ AAA ส่วนกลาง?","correct_index":1,"explanation_en":"RADIUS is an open-standard protocol used for centralized AAA. TACACS+ is originally Cisco-proprietary.","explanation_th":"RADIUS คือมาตรฐานกลางสากลที่ใช้คุยกับระบบสิทธิ์ AAA ส่วน TACACS+ นั้นดั้งเดิมพัฒนาขึ้นเป็นลิขสิทธิ์ของค่าย Cisco","options_th":["ทาคาส+","RADIUS","SSH","LDAP"]},{"options":["RADIUS encrypts the entire packet; TACACS+ only encrypts the password.","TACACS+ encrypts the entire packet payload and separates AAA functions; RADIUS only encrypts the password and combines Authentication/Authorization.","RADIUS uses TCP; TACACS+ uses UDP.","TACACS+ is open standard; RADIUS is Cisco proprietary."],"question_en":"What is a key difference between TACACS+ and RADIUS protocols?","question_th":"ข้อแตกต่างที่สำคัญประการหนึ่งระหว่างโปรโตคอล TACACS+ และ RADIUS คือข้อใด?","correct_index":1,"explanation_en":"TACACS+ uses TCP port 49, encrypts the entire payload, and strictly separates auth/authz functions. RADIUS uses UDP, encrypts only the password, and combines authentication/authorization.","explanation_th":"TACACS+ ใช้ TCP เข้ารหัสข้อมูลแพ็กเก็ตทั้งหมดและแยกหมวดสั่งงานชัดเจน ส่วน RADIUS ใช้ UDP เข้ารหัสเฉพาะรหัสผ่านและมัดรวมด่านตรวจสอบ","options_th":["RADIUS เข้ารหัสแพ็กเก็ตทั้งหมด TACACS+ เข้ารหัสเฉพาะรหัสผ่านเท่านั้น","TACACS+ เข้ารหัสทั้ง Packet และแยก AAA; RADIUS เข้ารหัสแค่ Password","RADIUS ใช้ TCP; TACACS+ ใช้ UDP","TACACS+ เป็นมาตรฐานเปิด RADIUS เป็นกรรมสิทธิ์ของ Cisco"]},{"options":["aaa new-model","aaa enable","service aaa","ip aaa-server"],"question_en":"Which command globally enables AAA services on a Cisco IOS switch or router?","question_th":"คำสั่งใดใช้เปิดการทำงานฟังก์ชันสิทธิ์ระบบ AAA ในสเกลระดับ Global Configuration บนอุปกรณ์ Cisco?","correct_index":0,"explanation_en":"The ''aaa new-model'' command is required in global configuration mode to activate AAA services on Cisco IOS.","explanation_th":"จำเป็นต้องป้อนคำสั่ง ''aaa new-model'' เพื่อให้ตัวระบบ Cisco IOS ปรับเปลี่ยนการบริหารสิทธิ์หันมาเริ่มใช้งานโครงสร้าง AAA","options_th":["aaa new-model","aaa enable","service aaa","ip aaa-server"]}]}', NULL),
	('lesson-adv-001', 'adv-001', 'OSPF Areas and LSA Types', 'OSPF Areas and LSA Types', '## OSPF Areas and LSA Types

**สิ่งที่จะได้เรียนในคลิปนี้**
ในคลิปนี้เราจะทำความเข้าใจโครงสร้างของ OSPF ในระดับลึก ทั้งประเภทของ Area ต่างๆ ได้แก่ Backbone, Stub, Totally Stubby, และ NSSA รวมถึง LSA Types 1-7 และบทบาทของ ABR กับ ASBR

**เนื้อหาหลัก**
- **Area 0 — Backbone Area:** หัวใจหลักของ OSPF ทุก Area ต้องเชื่อมต่อกับ Area 0 โดยตรง
- **ประเภทของ OSPF Area:**
  - **Standard Area:** รับ LSA ทุกประเภท (Type 1-5)
  - **Stub Area:** บล็อก External LSA (Type 5); ABR ส่ง Default Route แทน
  - **Totally Stubby Area (Cisco):** บล็อกทั้ง Type 5 และ Type 3; เหลือเพียง Default Route
  - **NSSA:** คล้าย Stub แต่ยอมให้มี ASBR ภายใน Area ได้ โดยใช้ Type 7 LSA
- **LSA Types 1-7:**
  - Type 1 (Router LSA): ทุก Router สร้าง — ภายใน Area
  - Type 2 (Network LSA): DR สร้าง — ภายใน Area
  - Type 3 (Summary LSA): ABR สร้าง — ระหว่าง Area
  - Type 4 (ASBR Summary LSA): ABR สร้าง — แจ้งตำแหน่งของ ASBR
  - Type 5 (AS External LSA): ASBR สร้าง — ทั่วทั้ง OSPF Domain
  - Type 6: Multicast OSPF (ไม่ค่อยพบ)
  - Type 7 (NSSA External LSA): ASBR ใน NSSA — ภายใน NSSA
- **บทบาทของ Router:**
  - **ABR:** ทำหน้าที่ส่ง Routing Info ระหว่าง Area สร้าง Type 3, 4 LSA
  - **ASBR:** Redistribute Route จากภายนอก (BGP, EIGRP, Static) เข้า OSPF
  - Router 1 ตัวสามารถมีได้หลายบทบาทพร้อมกัน

**สรุป**
ความเข้าใจเรื่อง OSPF Area และ LSA Types เป็นพื้นฐานสำคัญสำหรับการออกแบบและ Troubleshoot เครือข่าย OSPF ขนาดใหญ่ การเลือก Area Type ที่เหมาะสมจะช่วยให้ OSPF ทำงานได้อย่างมีประสิทธิภาพและประหยัด Resource', '## OSPF Areas and LSA Types

**What you will learn in this video**
In this video, we explore OSPF architecture in depth, including Area types (Backbone, Stub, Totally Stubby, NSSA), LSA Types 1-7, and the roles of ABRs and ASBRs.

**Core Content**
- **Area 0 — Backbone Area:** The core of OSPF. All areas must connect directly to Area 0.
- **OSPF Area Types:**
  - **Standard Area:** Accepts all LSAs (Type 1-5).
  - **Stub Area:** Blocks External LSAs (Type 5); ABR sends a Default Route instead.
  - **Totally Stubby Area (Cisco):** Blocks both Type 5 and Type 3; relies entirely on a Default Route.
  - **NSSA:** Similar to Stub but allows an ASBR inside the area using Type 7 LSAs.
- **LSA Types 1-7:**
  - Type 1 (Router LSA): Created by all routers — within area
  - Type 2 (Network LSA): Created by DR — within area
  - Type 3 (Summary LSA): Created by ABR — between areas
  - Type 4 (ASBR Summary LSA): Created by ABR — advertises ASBR location
  - Type 5 (AS External LSA): Created by ASBR — throughout OSPF domain
  - Type 6: Multicast OSPF (Rare)
  - Type 7 (NSSA External LSA): By ASBR in NSSA — within NSSA only
- **Router Roles:**
  - **ABR:** Routes between areas, creates Type 3, 4 LSAs.
  - **ASBR:** Redistributes external routes (BGP, EIGRP, Static) into OSPF.
  - A single router can hold multiple roles simultaneously.

**Conclusion**
Understanding OSPF Areas and LSA Types is foundational for designing and troubleshooting large OSPF networks.', 'video', 9, 1, 'https://www.youtube.com/watch?v=PIMnj2oqYIo', '/images/thumbnails/lesson-adv-001.jpg', NULL, '2026-05-18 10:02:06.461001+00', '2026-05-19 10:29:10.623729+00', '{"questions":[{"options":["Backbone Area","Stub Area","Totally Stubby Area","NSSA"],"question_en":"Which OSPF area type blocks Type 5 LSAs (External) but allows Type 3 LSAs (Summary) while relying on a default route?","question_th":"OSPF Area ประเภทใดที่ปิดกั้น Type 5 LSA (ภายนอก) แต่ยังอนุญาต Type 3 LSA (สรุปเส้นทาง) โดยอาศัยเส้นทางเริ่มต้น (Default Route)?","correct_index":1,"explanation_en":"A Stub Area blocks External LSAs (Type 5) and receives a Default Route instead from the ABR, while still permitting Type 3 LSAs.","explanation_th":"Stub Area จะปิดกั้น External LSA (Type 5) และได้รับ Default Route จาก ABR มาทดแทน โดยยังอนุญาตให้มี Type 3 LSA ได้ตามปกติ","options_th":["Backbone Area (บริเวณ Backbone)","Stub Area (บริเวณ Stub)","Totally Stubby Area (บริเวณ Totally Stubby)","NSSA (บริเวณ NSSA)"]},{"options":["Type 1 (Router LSA)","Type 2 (Network LSA)","Type 3 (Summary LSA)","Type 4 (ASBR Summary LSA)"],"question_en":"Which LSA type is generated by a Designated Router (DR) to describe OSPF routers in a multi-access network?","question_th":"LSA Type ใดที่สร้างขึ้นโดย Designated Router (DR) เพื่ออธิบายเร้าเตอร์ OSPF ตัวอื่นๆ ในเครือข่ายแบบ Multi-access?","correct_index":1,"explanation_en":"Type 2 (Network LSA) is created by the Designated Router (DR) to represent a multi-access network segments within an area.","explanation_th":"Type 2 (Network LSA) ถูกสร้างขึ้นโดย Designated Router (DR) เพื่อใช้เป็นตัวแทนของเซกเมนต์เครือข่ายแบบ multi-access ภายในพื้นที่นั้น","options_th":["ประเภท 1 (Router LSA)","ประเภท 2 (Network LSA)","ประเภท 3 (Summary LSA)","ประเภท 4 (ASBR Summary LSA)"]},{"options":["To redistribute routes from BGP into OSPF.","To route traffic between different areas and generate Type 3/4 LSAs.","To elect the Designated Router (DR) on multi-access links.","To establish neighbor adjacencies with non-OSPF routers."],"question_en":"What is the primary role of an Area Border Router (ABR) in OSPF?","question_th":"บทบาทหน้าที่หลักของ Area Border Router (ABR) ใน OSPF คืออะไร?","correct_index":1,"explanation_en":"ABRs connect OSPF Area 0 to other areas, routing traffic between them and generating Type 3 and Type 4 LSAs.","explanation_th":"ABR ทำหน้าที่เชื่อมต่อ OSPF Area 0 เข้ากับพื้นที่อื่นๆ โดยคอยส่งต่อทราฟฟิกและสร้าง LSA Type 3 และ Type 4","options_th":["กระจายเส้นทางจาก BGP เข้าสู่ OSPF","ส่งต่อทราฟฟิกระหว่างพื้นที่ต่างๆ และสร้าง LSA Type 3/4","เลือก Designated Router (DR) บนลิงก์ multi-access","สร้าง neighbor adjacency กับเราเตอร์ที่ไม่ใช่ OSPF"]},{"options":["Type 5 (AS External LSA)","Type 7 (NSSA External LSA)","Type 3 (Summary LSA)","Type 1 (Router LSA)"],"question_en":"Which LSA type is used by an ASBR inside a Not-So-Stubby Area (NSSA) to advertise redistributed external routes?","question_th":"LSA Type ใดที่ใช้งานโดย ASBR ภายในพื้นที่แบบ Not-So-Stubby Area (NSSA) เพื่อโฆษณาเส้นทางภายนอกที่ถูกดึงเข้ามา?","correct_index":1,"explanation_en":"An ASBR in an NSSA generates Type 7 (NSSA External LSA) to advertise external routes, which are later translated to Type 5 by the ABR.","explanation_th":"ASBR ใน NSSA จะสร้าง Type 7 LSA เพื่อโฆษณาเส้นทางภายนอก ซึ่งต่อมาจะถูกแปลงเป็น Type 5 โดย ABR","options_th":["Type 5 (AS External LSA) — LSA ภายนอก AS","Type 7 (NSSA External LSA) — LSA ภายนอก NSSA","Type 3 (Summary LSA) — LSA สรุปเส้นทาง","Type 1 (Router LSA) — LSA ของเราเตอร์"]},{"options":["Standard Area","Stub Area","Totally Stubby Area","NSSA"],"question_en":"Which OSPF Area blocks both Type 3 and Type 5 LSAs, relying entirely on a default route?","question_th":"OSPF Area ประเภทใดที่ปิดกั้นทั้ง Type 3 และ Type 5 LSA โดยอาศัยเส้นทางเริ่มต้น (Default Route) ทั้งหมด?","correct_index":2,"explanation_en":"Totally Stubby Area blocks both Type 3 (Summary) and Type 5 (External) LSAs to minimize the routing table size on internal routers.","explanation_th":"Totally Stubby Area จะปิดกั้นทั้ง Type 3 LSA (Summary) และ Type 5 LSA (External) เพื่อให้ตารางเส้นทางของเร้าเตอร์ภายในมีขนาดเล็กที่สุด","options_th":["พื้นที่มาตรฐาน (Standard Area)","พื้นที่ Stub","พื้นที่ Totally Stubby","NSSA"]}]}', NULL),
	('lesson-ccna001-01', 'ccna-001', 'บทนำสู่เครือข่ายคอมพิวเตอร์', 'Introduction to Computer Networks', '## Fundamental Networking: โครงสร้างพื้นฐานเครือข่ายคอมพิวเตอร์
**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้เน้นปูพื้นฐานโครงสร้างและหลักการทำงานระดับล่าง (Fundamental Networking) ของเครือข่ายคอมพิวเตอร์ เพื่อให้เข้าใจกลไกที่สำคัญที่สุดนั่นคือ "ข้อมูลเดินทางจากจุดหนึ่งไปอีกจุดหนึ่งได้อย่างไร" ในระดับโครงสร้างพื้นฐาน

**เนื้อหาหลัก**
LAN และ Ethernet: วิธีการเชื่อมต่อคอมพิวเตอร์ในเครือข่ายเฉพาะที่ และความสำคัญของการใช้ MAC Address เพื่อระบุตัวตนของอุปกรณ์แต่ละชิ้นอย่างแม่นยำ

**การจัดการความคับคั่ง:** ทำความเข้าใจปัญหาการชนกันของข้อมูล (Collision) ในเครือข่าย และวิธีการแก้ไขด้วยอัลกอริทึม Exponential Backoff
**Network Switches :** บทบาทสำคัญของอุปกรณ์สวิตช์ในการแบ่ง Collision Domain ซึ่งช่วยลดการชนกันของข้อมูลและเพิ่มประสิทธิภาพเครือข่ายให้สูงขึ้น

**รูปแบบการส่งข้อมูล:**
เปรียบเทียบความแตกต่างของการรับส่งข้อมูล 3 รูปแบบหลัก ได้แก่:

- **Circuit Switching:**
จองช่องสัญญาณและเชื่อมต่อสายตรงตลอดการสื่อสาร (เหมือนระบบโทรศัพท์สมัยก่อน)

- **Message Switching:**
ส่งข้อมูลผ่านโหนดเป็นทอด ๆ (เหมือนระบบไปรษณีย์)

- **Packet Switching:**
แบ่งข้อมูลเป็นแพ็กเก็ตเล็ก ๆ แยกกันเดินทางแล้วไปรวมที่ปลายทาง (หัวใจสำคัญของอินเทอร์เน็ตปัจจุบัน)

**IP Addressing และ ARPANET:**
ทำความรู้จักมาตรฐาน IP (Internet Protocol) และประวัติศาสตร์จุดกำเนิดของเครือข่ายอินเทอร์เน็ตจากโปรเจกต์ ARPANET

**สรุป**
เนื้อหาในคลิปนี้คือการทำความเข้าใจ กลไกระดับโครงสร้างพื้นฐาน ของระบบเครือข่าย ซึ่งเป็นการสร้างฐานความรู้ที่สำคัญ ก่อนที่จะก้าวข้ามขอบเขตไปเรียนรู้เรื่อง Network Services ในระดับ Application Layer (เช่น DHCP, DNS และ NAT) ในบทเรียนถัดไป', '## Fundamental Networking: Computer Network Infrastructure

**What you will learn in this video**
This video focuses on laying the foundation of network infrastructure and low-level operational principles to understand the most critical mechanism: "How does data travel from one point to another?" at the infrastructure level.

**Core Content**
**LAN and Ethernet:** How computers connect in a Local Area Network and the importance of using MAC Addresses to accurately identify each device.

**Congestion Management:** Understanding data collisions in networks and how the Exponential Backoff algorithm resolves them.

**Network Switches:** The crucial role of switches in breaking up Collision Domains, reducing data collisions, and increasing network efficiency.

**Data Transmission Models:**
Comparing the 3 main data transmission models:
- **Circuit Switching:** Reserves channels and maintains a direct line throughout communication (like legacy phone systems).
- **Message Switching:** Sends data hop-by-hop through nodes (like a postal system).
- **Packet Switching:** Divides data into small packets that travel separately and reassemble at the destination (the core of the modern Internet).

**IP Addressing and ARPANET:**
Introducing the IP (Internet Protocol) standard and the history of the Internet''s origins from the ARPANET project.

**Conclusion**
This video aims to build an understanding of network infrastructure mechanisms, serving as a critical knowledge base before moving up to Application Layer Network Services (such as DHCP, DNS, and NAT) in the next lessons.', 'video', 13, 1, 'https://www.youtube.com/watch?v=3QhU9jd03a0', '/images/thumbnails/lesson-ccna001-01.jpg', NULL, '2026-05-18 10:02:06.461001+00', '2026-05-19 10:29:10.623729+00', '{"questions":[{"options":["LAN (Local Area Network)","WAN (Wide Area Network)","MAN (Metropolitan Area Network)","PAN (Personal Area Network)"],"question_en":"Which network type spans a small geographical area, such as a single home, school, or office building?","question_th":"ประเภทเครือข่ายใดที่มีขอบเขตครอบคลุมพื้นที่ทางภูมิศาสตร์ขนาดเล็ก เช่น ภายในบ้าน โรงเรียน หรืออาคารสำนักงานแห่งเดียว?","correct_index":0,"explanation_en":"A Local Area Network (LAN) connects network devices within a limited geographical area.","explanation_th":"Local Area Network (LAN) ทำหน้าที่เชื่อมโยงอุปกรณ์เครือข่ายให้อยู่ร่วมกันในขอบเขตการทำงานภูมิศาสตร์จำกัด","options_th":["LAN (เครือข่ายท้องถิ่น)","WAN (เครือข่ายบริเวณกว้าง)","MAN (เครือข่ายเขตนครหลวง)","PAN (เครือข่ายพื้นที่ส่วนบุคคล)"]},{"options":["To connect end devices inside a single LAN.","To forward data packets between different networks (routing).","To provide wireless signals to mobile clients.","To protect networks from malware attacks."],"question_en":"What is the primary function of a router in a computer network?","question_th":"หน้าที่หลักของเร้าเตอร์ (Router) ในเครือข่ายคอมพิวเตอร์คืออะไร?","correct_index":1,"explanation_en":"Routers operate at the Network Layer (Layer 3) to route packets across separate networks.","explanation_th":"เร้าเตอร์ทำงานในเลเยอร์เน็ตเวิร์ก (Layer 3) เพื่อสลับส่งต่อแพ็กเก็ตข้อมูลข้ามเครือข่ายภายนอกที่อยู่ห่างออกไป","options_th":["เพื่อเชื่อมต่ออุปกรณ์ปลายทางภายใน LAN เดียว","ส่งต่อ Packet ระหว่างเครือข่ายด้วย Routing","เพื่อส่งสัญญาณไร้สายให้กับลูกค้ามือถือ","เพื่อปกป้องเครือข่ายจากการโจมตีของมัลแวร์"]},{"options":["Router","Network Switch","Modem","Firewall"],"question_en":"Which device is used to connect multiple end devices (like PCs and printers) within the same local network segment?","question_th":"อุปกรณ์ใดทำหน้าที่เชื่อมเชื่อมต่อปลายทางหลายชุด (เช่น คอมพิวเตอร์ หรือเครื่องพิมพ์) ให้อยู่ในเซกเมนต์เครือข่ายท้องถิ่นเดียวกัน?","correct_index":1,"explanation_en":"Switches connect devices within a single LAN segment, forwarding frames based on MAC addresses.","explanation_th":"สวิตช์เครือข่าย (Network Switch) ทำหน้าที่เชื่อมโยงอุปกรณ์ต่างๆ ภายใน LAN เซกเมนต์เดียวกันโดยส่งต่อเฟรมอิงตาม MAC address","options_th":["เราเตอร์","สวิตช์เครือข่าย","โมเด็ม","ไฟร์วอลล์"]},{"options":["Network Topology","IP Addressing","Protocol Suite","Routing Table"],"question_en":"What is the term used to describe the geometric layout or physical/logical structure of connections in a network?","question_th":"คำศัพท์ใดที่ใช้อธิบายลักษณะทางเรขาคณิตหรือโครงสร้างความเชื่อมโยงเชิงกายภาพและเชิงตรรกะในเครือข่าย?","correct_index":0,"explanation_en":"Network topology defines how nodes and links are arranged and connected physically or logically.","explanation_th":"โครงสร้างเครือข่าย (Network Topology) ระบุถึงรูปร่างและรูปแบบแนวการเชื่อมต่อของโหนดและลิงก์เชื่อมต่อต่างๆ","options_th":["โทโพโลยีเครือข่าย","การกำหนดที่อยู่ IP","ชุดโปรโตคอล","ตารางเส้นทาง"]},{"options":["A type of network hardware cable.","A set of rules that determines how network nodes communicate.","A software application for browsing websites.","An administrative user profile."],"question_en":"Which protocol represents a set of rules that defines how devices format and transmit data across a network?","question_th":"โปรโตคอลเครือข่ายหมายถึงอะไร?","correct_index":1,"explanation_en":"A protocol is a standardized set of rules that defines communication format, transmission, and error checking.","explanation_th":"โปรโตคอลคือข้อกำหนดมาตรฐานในการสื่อสารที่ระบุถึงวิธีการจัดรูปแบบข้อมูล การส่งผ่าน และการตรวจจับข้อผิดพลาด","options_th":["สายเคเบิลฮาร์ดแวร์เครือข่ายชนิดหนึ่ง","ชุดของกฎที่กำหนดวิธีการสื่อสารของโหนดเครือข่าย","แอพพลิเคชั่นซอฟต์แวร์สำหรับการเรียกดูเว็บไซต์","โปรไฟล์ผู้ใช้ระดับผู้ดูแลระบบ"]}]}', NULL),
	('lesson-ccna006-02', 'ccna-006', 'Switch Security', 'Switch Security', '## Switch Security

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
Layer 2 Security เป็นสิ่งที่มักถูกละเลยแต่มีความสำคัญสูงมาก เพราะการโจมตี LAN สามารถทำให้ระบบทั้งหมดล่มได้', '## Switch Security

**What you will learn in this video**
This video teaches Layer 2 security on Cisco Switches to prevent attacks within the LAN.

**Core Content**
- **Port Security:** Limits MAC Addresses on a port to prevent MAC Flooding Attacks.
  - `switchport port-security maximum 2`
  - `switchport port-security violation shutdown`
- **DHCP Snooping:** Filters fake DHCP Responses from rogue servers, preventing Rogue DHCP.
- **Dynamic ARP Inspection (DAI):** Prevents ARP Spoofing/Poisoning by validating ARPs.
- **BPDU Guard:** Prevents external devices from sending STP BPDUs.

**Conclusion**
Layer 2 Security is often overlooked but is extremely important, as LAN attacks can easily take down the entire system.', 'video', 24, 2, 'https://www.youtube.com/watch?v=0W4JZIWtjLQ&t=103s', '/images/thumbnails/lesson-ccna006-02.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["VTP Pruning","Port Security","DHCP Snooping","Dynamic ARP Inspection"],"question_en":"What switch security feature restricts incoming traffic on an interface by binding allowed MAC addresses to the port?","question_th":"ฟีเจอร์ความปลอดภัยของสวิตช์ใดที่ใช้จำกัดสิทธิ์พอร์ตเชื่อมต่อโดยระบุจำกัดให้เฉพาะ MAC address ที่บันทึกไว้เข้าถึงได้?","correct_index":1,"explanation_en":"Port Security is a Layer 2 security mechanism that limits allowed MAC addresses on a per-port basis.","explanation_th":"Port Security คือฟังก์ชันระบบป้องปราบความปลอดภัย Layer 2 ที่คุมพอร์ตสวิตช์โดยอนุมัติเฉพาะ MAC address ที่ถูกต้อง","options_th":["VTP Pruning","Port Security","DHCP Snooping","Dynamic ARP Inspection (DAI)"]},{"options":["Protect","Restrict","Shutdown","Disable"],"question_en":"What is the default violation action when Port Security detects an unauthorized MAC address?","question_th":"สถานะการตอบรับ (Violation action) เริ่มต้นคืออะไรเมื่อ Port Security ตรวจพบ MAC address ที่ไม่มีสิทธิ์เชื่อมต่อ?","correct_index":2,"explanation_en":"The default violation action is ''Shutdown''. The switch port is immediately disabled and placed into an error-disabled (err-disabled) state.","explanation_th":"การทำงานเริ่มต้นคือ ''Shutdown'' โดยพอร์ตของสวิตช์จะปิดการเชื่อมต่อทันทีและเข้าสู่สถานะจำกัดทำงาน (err-disabled)","options_th":["ปกป้อง","จำกัด","ปิดเครื่อง","ปิดการใช้งาน"]},{"options":["switchport port-security mac-address dynamic","switchport port-security mac-address sticky","switchport port-security learn-mac","ip port-security sticky"],"question_en":"What command configures a port to dynamically learn MAC addresses and save them permanently to the running configuration?","question_th":"คำสั่งใดระบุให้พอร์ตสวิตช์บันทึกจำแอดเดรสที่ตรวจพบแรกเข้าแบบถาวรลงในประวัติค่าคอนฟิก (Sticky MAC)?","correct_index":1,"explanation_en":"The ''switchport port-security mac-address sticky'' command dynamically learns MAC addresses and converts them into sticky addresses, saving them in configuration.","explanation_th":"ใช้คำสั่ง ''switchport port-security mac-address sticky'' ระบบจะแปลงแอดเดรสที่เรียนรู้สดให้ติดเข้าเป็นหนึ่งในบรรทัดคอนฟิกทันที","options_th":["switchport port-security mac-address dynamic","switchport port-security mac-address sticky","switchport port-security learn-mac","ip port-security sticky"]},{"options":["Port Security","DHCP Snooping","Dynamic ARP Inspection (DAI)","IP Source Guard"],"question_en":"Which switch security feature prevents DHCP starvation and rogue DHCP server attacks by verifying DHCP messages?","question_th":"ฟังก์ชันความปลอดภัยใดของสวิตช์ที่ช่วยป้องกันการแกล้งปลอมเป็น DHCP Server (Rogue DHCP) และการยิงป่วนแอดเดรสขัดข้อง?","correct_index":1,"explanation_en":"DHCP Snooping determines trusted and untrusted ports. It blocks unauthorized DHCP server replies coming from untrusted ports.","explanation_th":"DHCP Snooping กรองและจำแนกสิทธิ์พอร์ตว่าพอร์ตใดเชื่อถือได้ (Trusted) เพื่อไม่ยอมให้มีสัญญาณแจ้งแจกไอพีแปลกปลอมวิ่งเข้ามา","options_th":["Port Security","DHCP Snooping","การตรวจสอบ ARP แบบไดนามิก (DAI)","IP Source Guard"]},{"options":["It recovers automatically after 10 seconds without any action.","By executing ''shutdown'' followed by ''no shutdown'' on the affected interface.","By rebooting the entire switch.","By deleting the VLAN configuration."],"question_en":"How can an administrator recover a switch port that has been placed into the ''err-disabled'' state by Port Security?","question_th":"ผู้ดูแลระบบจะสามารถดึงพอร์ตสวิตช์ที่ถูกปิดตัวเป็นสถานะ ''err-disabled'' ให้ฟื้นกลับมาทำงานได้ด้วยวิธีการปกติอย่างไร?","correct_index":1,"explanation_en":"To manually reset an err-disabled interface, configure the interface with ''shutdown'' to disable it, and then ''no shutdown'' to enable it again.","explanation_th":"ให้คลิกสั่งหยุดพอร์ตโดยใช้คำสั่ง ''shutdown'' ก่อนรอบหนึ่ง แล้วค่อยตามด้วย ''no shutdown'' เพื่อกระตุ้นให้สถานะเคลียร์ตัวและพร้อมใช้งานใหม่","options_th":["จะฟื้นตัวโดยอัตโนมัติหลังจากผ่านไป 10 วินาทีโดยไม่มีการดำเนินการใดๆ","โดยดำเนินการ ''ปิดเครื่อง'' ตามด้วย ''ไม่ปิดเครื่อง'' บนอินเทอร์เฟซที่ได้รับผลกระทบ","โดยการรีบูตสวิตช์ทั้งหมด","โดยการลบการกำหนดค่า VLAN"]}]}', NULL),
	('lesson-ccna003-04', 'ccna-003', 'OSPF พื้นฐาน', 'OSPF Basics', '## OSPF Basics

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้แนะนำ OSPF (Open Shortest Path First) ซึ่งเป็น Dynamic Routing Protocol แบบ Link-State ที่ใช้งานมากที่สุดในองค์กร

**เนื้อหาหลัก**
- OSPF ใช้ Algorithm Dijkstra (SPF) คำนวณเส้นทางที่สั้นที่สุดโดยอิงจาก Bandwidth (Cost)
- **DR/BDR Election:** ในเครือข่ายแบบ Multi-access (Ethernet) จะเลือก Designated Router เพื่อลด Overhead
- **LSA (Link-State Advertisement):** ข้อมูลที่ OSPF Router แลกเปลี่ยนกันเพื่อสร้าง Topology Map
- **Area:** OSPF แบ่งเป็น Area เพื่อลดขนาด LSDB ทุก Area ต้องเชื่อมกับ Area 0 (Backbone)
- คำสั่งพื้นฐาน: `router ospf 1`, `network 192.168.1.0 0.0.0.255 area 0`

**สรุป**
OSPF มีความ Scalable สูง Converge เร็ว และเป็น Standard เปิด ทำให้เป็น Protocol ยอดนิยมสำหรับ Enterprise Network', '## OSPF Basics

**What you will learn in this video**
This video introduces OSPF (Open Shortest Path First), the most widely used Link-State Dynamic Routing Protocol in enterprise networks.

**Core Content**
- OSPF uses Dijkstra''s Algorithm (SPF) to calculate the shortest path based on Bandwidth (Cost).
- **DR/BDR Election:** In Multi-access networks (Ethernet), a Designated Router is elected to reduce overhead.
- **LSA (Link-State Advertisement):** Data exchanged between OSPF Routers to build the Topology Map.
- **Area:** OSPF is divided into Areas to reduce LSDB size; every Area must connect to Area 0 (Backbone).
- Basic commands: `router ospf 1`, `network 192.168.1.0 0.0.0.255 area 0`

**Conclusion**
OSPF is highly scalable, converges quickly, and is an open Standard, making it the most popular protocol for Enterprise Networks.', 'video', 9, 4, 'https://www.youtube.com/watch?v=PIMnj2oqYIo', '/images/thumbnails/lesson-ccna003-04.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["DUAL Algorithm","Bellman-Ford Algorithm","Dijkstra SPF (Shortest Path First)","Spanning Tree Algorithm"],"question_en":"Which algorithm does OSPF use to calculate the shortest path to destinations?","question_th":"OSPF ใช้อัลกอริทึมใดในการคำนวณค้นหาเส้นทางที่รวดเร็วและสั้นที่สุดไปยังปลายทาง?","correct_index":2,"explanation_en":"OSPF uses the Dijkstra Shortest Path First (SPF) algorithm to build a loop-free tree of paths.","explanation_th":"OSPF อาศัยการคำนวณผ่านอัลกอริทึม Dijkstra SPF (Shortest Path First) เพื่อประกอบร่างแผนที่โครงข่ายที่ไร้ลูป","options_th":["อัลกอริธึมคู่","อัลกอริทึมของเบลล์แมน-ฟอร์ด","อัลกอริทึม Dijkstra SPF","อัลกอริทึมการขยายต้นไม้"]},{"options":["Hop Count.","Bandwidth and Delay.","Cost, calculated as Reference Bandwidth (100 Mbps) / Link Bandwidth.","Metric weights based on reliability."],"question_en":"What metric does OSPF use to evaluate paths, and how is it calculated by default?","question_th":"OSPF ใช้ค่าเมทริกตัวแปรใดในการพิจารณาเส้นทาง และมีหลักการคำนวณพื้นฐานอย่างไร?","correct_index":2,"explanation_en":"OSPF uses ''Cost''. By default, Cost = 10^8 / Bandwidth in bps. Thus, higher speed links have lower cost.","explanation_th":"OSPF ใช้ค่า ''Cost'' คำนวณจากสูตรแบนด์วิดท์อ้างอิงหารด้วยความเร็วอินเตอร์เฟส ดังนั้นสายที่เร็วกว่าจะมี Cost ต่ำกว่า","options_th":["ฮอปนับ","แบนด์วิธและความล่าช้า","Cost = 100 Mbps / Link Bandwidth","ค่า Metric Weight ตาม Reliability"]},{"options":["LSA (Link State Advertisement)","LSU (Link State Update)","Hello Packets","LSAck Packets"],"question_en":"What type of packets does OSPF use to discover neighbors and maintain adjacency?","question_th":"แพ็กเก็ต OSPF ประเภทใดที่มีหน้าที่ค้นหาเพื่อนบ้าน (Neighbor Discovery) และคอยดูแลความสม่ำเสมอในการเชื่อมต่อ?","correct_index":2,"explanation_en":"Hello packets are sent periodically in OSPF to establish neighbor adjacencies and serve as keepalives.","explanation_th":"แพ็กเก็ต Hello จะถูกส่งหากันตามรอบวินาทีเพื่อผูกมิตรตกลงเป็นเพื่อนบ้านและคอยยืนยันตัวตนว่าระบบยังทำงานดีอยู่","options_th":["LSA (ประกาศสถานะลิงก์)","LSU (อัปเดตสถานะลิงก์)","Hello Packet (แพ็กเก็ตทักทาย)","LSAck Packet (แพ็กเก็ตตอบรับ LSA)"]},{"options":["224.0.0.5","224.0.0.6","224.0.0.9","224.0.0.10"],"question_en":"Which multicast address is reserved for all OSPF routers (AllSPFRouters) on multi-access links?","question_th":"ที่อยู่มัลติแคสต์ (Multicast address) เลขใดที่จองไว้สำหรับการสื่อสารไปยังเร้าเตอร์ OSPF ทุกตัวบนเซกเมนต์เครือข่าย?","correct_index":0,"explanation_en":"224.0.0.5 is used by all OSPF routers to send and receive Hello packets and updates. 224.0.0.6 is used to reach the DR/BDR.","explanation_th":"224.0.0.5 ใช้ติดต่อคุยกับเร้าเตอร์ OSPF ทั่วไปทุกตัว ส่วนแอดเดรส 224.0.0.6 มีไว้สื่อสารเจาะหาเฉพาะผู้บริหารอย่าง DR/BDR","options_th":["224.0.0.5","224.0.0.6","224.0.0.9","224.0.0.10"]},{"options":["0","1","64","128"],"question_en":"What is the default OSPF router priority value used in DR/BDR elections?","question_th":"ค่า Priority เริ่มต้นของเร้าเตอร์ OSPF ที่ใช้แข่งขันเพื่อเป็น DR/BDR คือข้อใด?","correct_index":1,"explanation_en":"The default OSPF priority for router interfaces is 1. A priority of 0 disables the interface from participating in elections.","explanation_th":"ค่า Priority ตั้งต้นจะอยู่ที่เลข 1 หากปรับเปลี่ยนลดลงเป็น 0 หมายถึงพอร์ตนั้นจะไม่ขอเข้าร่วมการคัดเลือกเป็น DR/BDR","options_th":["0","1","64","128"]}]}', NULL),
	('lesson-ccna003-05', 'ccna-003', 'EIGRP พื้นฐาน', 'EIGRP Basics', '## EIGRP Basics

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้แนะนำ EIGRP (Enhanced Interior Gateway Routing Protocol) ซึ่งเป็น Protocol ขั้นสูงของ Cisco

**เนื้อหาหลัก**
- EIGRP เป็น Advanced Distance Vector ใช้ Algorithm DUAL (Diffusing Update Algorithm) รับประกันว่าไม่มี Loop
- **Metric:** คำนวณจาก Bandwidth และ Delay เป็นหลัก (ค่า K-values)
- **Successor & Feasible Successor:** เก็บ Backup Route ไว้ล่วงหน้า ทำให้ Failover เร็วมาก (Sub-second)
- **Neighbor Relationship:** ใช้ Hello Packets สร้าง Neighbor ก่อนแลกเปลี่ยนข้อมูล
- คำสั่ง: `router eigrp 100`, `network 10.0.0.0 0.255.255.255`

**สรุป**
EIGRP Converge เร็วกว่า OSPF มาก เหมาะสำหรับ Network ที่ต้องการ Failover ที่รวดเร็ว แต่ข้อเสียคือใช้ได้เฉพาะอุปกรณ์ Cisco', '## EIGRP Basics

**What you will learn in this video**
This video introduces EIGRP (Enhanced Interior Gateway Routing Protocol), an advanced Cisco proprietary protocol.

**Core Content**
- EIGRP is an Advanced Distance Vector protocol using the DUAL Algorithm (Diffusing Update Algorithm) to guarantee loop-free networks.
- **Metric:** Calculated primarily from Bandwidth and Delay (K-values).
- **Successor & Feasible Successor:** Stores Backup Routes in advance, allowing for rapid (sub-second) failover.
- **Neighbor Relationship:** Uses Hello Packets to form Neighbors before exchanging data.
- Commands: `router eigrp 100`, `network 10.0.0.0 0.255.255.255`

**Conclusion**
EIGRP converges much faster than OSPF and is ideal for networks requiring rapid failover, but its drawback is that it is strictly for Cisco devices.', 'video', 19, 5, 'https://www.youtube.com/watch?v=QyymlFWDEgM&t=2s', '/images/thumbnails/lesson-ccna003-05.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["Advanced Distance Vector (Hybrid)","Link Vector","Path State","Pure Link State"],"question_en":"What is a unique classification often given to EIGRP because it combines characteristics of both distance-vector and link-state protocols?","question_th":"การจัดประเภทโปรโตคอลในลักษณะใดที่มักระบุให้กับ EIGRP เนื่องจากมีการหยิบยืมจุดเด่นของทั้งฝั่ง Distance Vector และ Link State มารวมกัน?","correct_index":0,"explanation_en":"EIGRP is often classified as an Advanced Distance Vector or Hybrid protocol because it sends updates dynamically like distance-vector but maintains topology tables.","explanation_th":"EIGRP มักจัดเป็น Advanced Distance Vector หรือ Hybrid เร้าติ้ง เพราะคำนวณระยะส่งแบบเวกเตอร์แต่สะสมแผนที่เชิงตรรกะในแบบลิงก์สเตต","options_th":["Distance Vector ขั้นสูง","ลิงค์เวกเตอร์","รัฐเส้นทาง","สถานะเพียวลิงค์"]},{"options":["Hop Count and Cost","Bandwidth and Delay","Reliability and Load","Bandwidth, Delay, and MTU"],"question_en":"What is the primary routing protocol metric formula component for EIGRP by default?","question_th":"ค่าพารามิเตอร์พื้นฐานทางกายภาพใดที่ EIGRP นำมารวมคำนวณร่วมกันเป็นค่าเมทริกเริ่มต้น?","correct_index":1,"explanation_en":"By default, EIGRP uses minimum Bandwidth and cumulative Delay along the path to calculate its composite metric.","explanation_th":"EIGRP ใช้ตัวแปรแบนด์วิดท์ขั้นต่ำ (Minimum Bandwidth) และค่าดีเลย์สะสม (Cumulative Delay) มาคิดรวมเป็นค่าเมทริกขาส่ง","options_th":["จำนวนฮอปและต้นทุน","แบนด์วิธและความล่าช้า","ความน่าเชื่อถือและโหลด","แบนด์วิธ ความล่าช้า และ MTU"]},{"options":["Feasible Successor","Successor","Reported Distance","Feasible Distance"],"question_en":"Which EIGRP term refers to the primary route to a destination network installed in the routing table?","question_th":"คำศัพท์ EIGRP ใดหมายถึงเส้นทางสายหลักสำหรับนำส่งทราฟฟิกไปยังเครือข่ายปลายทางที่ได้รับการบรรจุในตารางเร้าติ้ง?","correct_index":1,"explanation_en":"The ''Successor'' is the primary loop-free route chosen by DUAL to forward traffic to a network.","explanation_th":"Successor คือเส้นทางหลักที่ DUAL คำนวณแล้วว่าเป็นจุดเชื่อมที่เหมาะสมและปลอดลูปที่สุดสำหรับใช้ส่งผ่านข้อมูลผู้ใช้","options_th":["Feasible Successor","Successor","Reported Distance (RD)","Feasible Distance (FD)"]},{"options":["90","110","120","170"],"question_en":"What is the default Administrative Distance of internal EIGRP routes?","question_th":"ค่า Administrative Distance (AD) เริ่มต้นของโปรโตคอล EIGRP ภายใน (Internal EIGRP) คือเท่าใด?","correct_index":0,"explanation_en":"Internal EIGRP routes have a default AD of 90. External EIGRP routes (redistributed) have an AD of 170.","explanation_th":"เส้นทาง EIGRP ภายใน มี AD ตั้งต้นเป็น 90 ส่วนเส้นทางประเภทภายนอกที่ดึงเข้ามา (External EIGRP) จะมี AD เป็น 170","options_th":["90","110","120","170"]},{"options":["224.0.0.5","224.0.0.9","224.0.0.10","224.0.0.12"],"question_en":"Which multicast address does EIGRP use to exchange routing information with neighbor routers?","question_th":"ที่อยู่มัลติแคสต์ (Multicast address) เลขใดที่ EIGRP ใช้ส่งออกข้อมูลเพื่อเจรจากับกลุ่มเร้าเตอร์เพื่อนบ้าน?","correct_index":2,"explanation_en":"EIGRP uses the multicast address 224.0.0.10 (IPv4) or FF02::A (IPv6) to communicate with neighbors.","explanation_th":"EIGRP สื่อสารกับกลุ่มเพื่อนบ้านในสเปกมัลติแคสต์แอดเดรสไอพี 224.0.0.10 ในระบบ IPv4","options_th":["224.0.0.5","224.0.0.9","224.0.0.10","224.0.0.12"]}]}', NULL),
	('lesson-ccna006-03', 'ccna-006', 'Access Control Lists สำหรับ Security', 'ACLs for Security', '## ACL สำหรับความปลอดภัยเครือข่าย

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
ACL ที่ออกแบบดีเป็นชั้นป้องกันที่สำคัญบน Router และ Layer 3 Switch ก่อนที่ Traffic จะถึง Firewall', '## ACLs for Network Security

**What you will learn in this video**
This video teaches how to apply ACLs specifically for security to control traffic in enterprise networks.

**Core Content**
- **Time-based ACL:** Opens/closes access based on time, e.g., allowing Internet only during office hours.
- **Named ACL:** Names the ACL to make it easier to edit than Numbered ACLs.
- **Reflexive ACL:** Automated ACL that permits Return Traffic of a session initiated internally (similar to a Stateful firewall).
- **Use Case Examples:**
  - Block all Telnet (port 23), allow only SSH (port 22).
  - Restrict Management Interface access only to Admin IPs.

**Conclusion**
A well-designed ACL acts as an important defensive layer on Routers and Layer 3 Switches before traffic even reaches the Firewall.', 'video', 19, 3, 'https://www.youtube.com/watch?v=6PlLEU0UBQQ&t=1065s', '/images/thumbnails/lesson-ccna006-03.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["Routing protocols will stop functioning.","All incoming traffic from the internet is permitted into the internal network by default.","Internet speed is limited.","DHCP server will crash."],"question_en":"What is the main security risk of not implementing Access Control Lists (ACLs) on internet-facing router interfaces?","question_th":"ความเสี่ยงที่สำคัญที่สุดหากละเลยการใช้ ACL บนพอร์ตขาเชื่อมอินเทอร์เน็ตของเร้าเตอร์คืออะไร?","correct_index":1,"explanation_en":"Without ACLs to filter traffic, any internet host can attempt to connect directly to internal devices, creating severe security risks.","explanation_th":"หากไม่มีการกรอง ข้อมูลดิบทุกประเภทจากโลกภายนอกจะสามารถวิ่งพุ่งผ่านเข้ามาหาเครือข่ายภายในองค์กรได้ทั้งหมดโดยไม่มีตัวกลั่นกรอง","options_th":["โปรโตคอลการกำหนดเส้นทางจะหยุดทำงาน","เปิดรับ Internet Traffic เข้า LAN ทั้งหมด","ความเร็วอินเทอร์เน็ตมีจำกัด","เซิร์ฟเวอร์ DHCP จะขัดข้อง"]},{"options":["Extended Named ACL only","Standard Named or Numbered ACL","VLAN Access Map","Dynamic ACL"],"question_en":"Which type of ACL is recommended for securing the VTY (Virtual Terminal) lines of a switch or router?","question_th":"ACL ประเภทใดที่แนะนำสำหรับนำมาผูกป้องกันพอร์ต VTY (สายสิทธิ์การควบคุมระดับไกลอย่าง Telnet/SSH)?","correct_index":1,"explanation_en":"Standard ACLs are sufficient for securing VTY lines because you only need to match the source IP addresses of authorized administrative hosts.","explanation_th":"ใช้เพียง Standard ACL ก็เพียงพอแล้วสำหรับการป้องกัน VTY เพราะมีหน้าที่เช็คตรวจสอบสแกนไอพีฝั่งผู้เรียกเข้า (Source) เท่านั้น","options_th":["ACL ที่มีชื่อเพิ่มเติมเท่านั้น","ACL ที่มีชื่อหรือหมายเลขมาตรฐาน","แผนที่การเข้าถึง VLAN","ACL แบบไดนามิก"]},{"options":["ip access-group <number> in","access-class <number> in","traffic-filter <number> vty","line access-list <number>"],"question_en":"What command is used to apply an ACL to restrict access to a router''s VTY lines?","question_th":"คำสั่งใดใช้ระบุเชื่อมผูกเงื่อนไข ACL เพื่อใช้ควบคุมจำกัดความปลอดภัยของช่องทาง VTY บนเร้าเตอร์?","correct_index":1,"explanation_en":"The ''access-class <number> in'' command is used inside line vty configuration mode to filter remote access traffic.","explanation_th":"ต้องใช้คำสั่ง ''access-class <number> in'' ป้อนภายใต้โหมด line vty เพื่อสั่งจับคู่คัดกรองไอพีที่ได้รับอนุญาตเชื่อมเข้ามา","options_th":["ip access-group <number> in","access-class <number> in","traffic-filter <number> vty","line access-list <number>"]},{"options":["To speed up router operations.","To explicitly drop unauthorized traffic and generate syslog messages containing packet details for security audits.","To enable unequal cost load balancing.","To bypass the implicit deny statement."],"question_en":"In securing network infrastructure, why is it recommended to include a final ''deny ip any any log'' statement in extended ACLs?","question_th":"ในการเพิ่มระบบป้องกัน เพราะเหตุใดจึงแนะนำให้เขียนข้อปฏิเสธสรุปประโยคท้ายสุดเป็น ''deny ip any any log'' ใน Extended ACL?","correct_index":1,"explanation_en":"Adding ''log'' at the end of a deny statement causes the router to send Syslog alerts whenever someone attempts an unauthorized access, improving network visibility.","explanation_th":"การระบุคำสั่ง ''log'' ต่อท้ายบรรทัด deny จะบอกให้เร้าเตอร์พ่นข้อความประวัติ Syslog ออกไปทุกครั้งที่มีการจับเจาะฝ่าฝืน เพื่อบันทึกประวัติการบุกรุก","options_th":["เพื่อเร่งการทำงานของเราเตอร์","ทิ้ง Traffic ที่ไม่อนุญาตและบันทึก Syslog เพื่อ Audit","เพื่อเปิดใช้งานการปรับสมดุลภาระต้นทุนที่ไม่เท่ากัน","เพื่อข้ามคำสั่งปฏิเสธโดยนัย"]},{"options":["TCP Port 21","TCP Port 22","TCP Port 23","TCP Port 80"],"question_en":"What TCP port is blocked to prevent unsecured Telnet traffic from accessing network devices?","question_th":"พอร์ต TCP หมายเลขใดที่มักบล็อกการกรองเพื่อไม่ยอมให้ทราฟฟิกแบบไม่ปลอดภัยอย่าง Telnet เชื่อมเข้ามาคุมอุปกรณ์?","correct_index":2,"explanation_en":"Telnet uses TCP port 23, which transmits traffic in cleartext. SSH (port 22) should be used instead.","explanation_th":"Telnet ทำงานที่ TCP พอร์ต 23 ซึ่งส่งข้อมูลแบบปกติไม่มีการเข้ารหัส แนะนำให้ปิดกั้นแล้วสลับมาใช้พอร์ต SSH (พอร์ต 22) แทน","options_th":["พอร์ต TCP 21","พอร์ต TCP 22","พอร์ต TCP 23","พอร์ต TCP 80"]}]}', NULL),
	('lesson-dev002-01', 'devnet-002', 'Cisco DNA Center API', 'Cisco DNA Center API', '## Cisco DNA Center API

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
DNA Center API ช่วยให้ Automate การจัดการ Campus Network ได้อย่างรวดเร็ว และเป็นพื้นฐานสำหรับ Network DevOps สมัยใหม่', '## Cisco DNA Center API

**What you will learn in this video**
This video teaches how to use Cisco DNA Center''s REST API to manage networks programmatically.

**Core Content**
- **Cisco DNA Center:** A Controller for Campus Networks supporting Intent-Based Networking.
- **REST API:** Communicates using HTTP Methods (GET, POST, PUT, DELETE) sending/receiving JSON data.
- **Authentication:** Uses Token-based Auth via `POST /dna/system/api/v1/auth/token`.
- **API Call Examples:**
  - `GET /dna/intent/api/v1/network-device` → View all devices
  - `GET /dna/intent/api/v1/topology/site-topology` → View Network Topology

**Conclusion**
DNA Center API enables rapid automation of Campus Network management and forms the foundation for modern Network DevOps.', 'video', 7, 1, 'https://www.youtube.com/watch?v=hzsmoY2xdjQ', '/images/thumbnails/lesson-dev002-01.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["A distributed peer-to-peer router.","A centralized SDN controller for enterprise campus and branch networks.","A wireless client utility.","A firewall management console only."],"question_en":"What type of controller is Cisco DNA Center (Catalyst Center)?","question_th":"Cisco DNA Center (Catalyst Center) จัดอยู่ในประเภทคอนโทรลเลอร์ควบคุมแบบใด?","correct_index":1,"explanation_en":"Cisco DNA Center is a centralized SDN (Software-Defined Networking) controller that manages intent-based campus network policies.","explanation_th":"Cisco DNA Center เป็นระบบคอนโทรลเลอร์จัดเก็บสิทธิ์ส่วนกลางของเครือข่าย SDN สำหรับบริหารระบบแคมปัสและสาขาต่างๆ","options_th":["เราเตอร์แบบเพียร์ทูเพียร์แบบกระจาย","SDN Controller ส่วนกลาง","ยูทิลิตี้ไคลเอนต์ไร้สาย","คอนโซลการจัดการไฟร์วอลล์เท่านั้น"]},{"options":["To automatically buy new hardware licenses.","To collect network telemetry and apply analytics to monitor device and client health in real time.","To encrypt serial link traffic.","To block employee social media access."],"question_en":"What is the purpose of the ''Assurance'' feature in Cisco DNA Center?","question_th":"วัตถุประสงค์ของฟังก์ชันระบบรายงานความมั่นใจ ''Assurance'' ใน Cisco DNA Center คือข้อใด?","correct_index":1,"explanation_en":"Assurance uses machine learning and streaming telemetry to analyze network health, troubleshooting issues before they impact users.","explanation_th":"Assurance ช่วยรวบรวมค่าสถิติจากอุปกรณ์วิเคราะห์เชิงลึก เพื่อประเมินระดับความพร้อมของโครงข่ายและตรวจสุขภาพผู้ใช้งานเรียลไทม์","options_th":["เพื่อซื้อใบอนุญาตฮาร์ดแวร์ใหม่โดยอัตโนมัติ","เก็บ Telemetry วิเคราะห์สุขภาพ Device/Client แบบ Real-time","เพื่อเข้ารหัสการรับส่งข้อมูลลิงค์อนุกรม","เพื่อบล็อกการเข้าถึงโซเชียลมีเดียของพนักงาน"]},{"options":["Assurance APIs","Intent-based APIs (Provisioning / Policy)","System Integration APIs","Command Runner APIs"],"question_en":"Which Cisco DNA Center API category allows developers to push configuration templates and design policies?","question_th":"หมวดหมู่ API ประเภทใดของ Cisco DNA Center ที่เปิดให้ผู้พัฒนาใช้ส่งชุดคำสั่งเทมเพลตและการคอนฟิกภาพรวมเครือข่าย?","correct_index":1,"explanation_en":"Provisioning and Policy APIs under the Intent-based suite allow programmatically pushed configurations and designs.","explanation_th":"Intent-based API ในหมวดการจัดสรร (Provisioning/Policy) ช่วยให้นักพัฒนาปรับแก้ไขการตั้งค่าอุปกรณ์ปลายทางจำนวนมากได้พร้อมกัน","options_th":["Assurance APIs","Intent-based APIs (Provisioning / Policy)","System Integration APIs","Command Runner APIs"]},{"options":["SNMP v3","REST APIs (JSON over HTTPS)","SSH / CLI scripting","Netconf / XML"],"question_en":"Which architecture pattern does Cisco DNA Center use to represent the northbound interface?","question_th":"สถาปัตยกรรมเชื่อมต่อทางฝั่ง Northbound Interface ของ Cisco DNA Center ทำงานอยู่ในรูปแบบอินเตอร์เฟสทางเทคนิคใด?","correct_index":1,"explanation_en":"The Northbound interface is built on REST APIs, using JSON payloads for data exchange with external scripts and orchestrators.","explanation_th":"อินเตอร์เฟสฝั่งเหนือ (Northbound) สื่อสารระบบหลักในแบบ REST API (รับส่งไฟล์ข้อมูลประเภท JSON ผ่านการเชื่อมต่อ HTTPS)","options_th":["SNMP เวอร์ชัน 3","REST API (JSON บน HTTPS)","การเขียนสคริปต์ SSH / CLI","เน็ตคอนฟ / ​​XML"]},{"options":["10 minutes","1 hour","12 hours","24 hours"],"question_en":"In Cisco DNA Center API authentication, what is the life span of a generated authentication token?","question_th":"ในการพิสูจน์สิทธิ์ของ Cisco DNA Center API โทเค็นที่สร้างขึ้นมาเพื่อเป็นบัตรผ่านจะมีอายุใช้งานนานกี่ชั่วโมง?","correct_index":1,"explanation_en":"The generated X-Auth-Token typically has a life span of 1 hour (3600 seconds) before it must be renewed.","explanation_th":"โทเค็นสิทธิ์เข้าทำคำสั่งระบบ (X-Auth-Token) มีระยะเวลาหมดอายุความปลอดภัยหลังจากได้รับครั้งแรก 1 ชั่วโมง","options_th":["10 นาที","1 ชั่วโมง","12 ชม","24 ชม"]}]}', NULL),
	('lesson-git-04', 'devnet-005', 'Resolving a Merge Conflict', 'Resolving a Merge Conflict', '## Resolving a Merge Conflict

**สิ่งที่จะได้เรียนในคลิปนี้**
ในคลิปนี้เราจะเรียนรู้ว่า Merge Conflict ใน Git เกิดขึ้นได้อย่างไร และจะแก้ไขได้อย่างถูกต้องตามขั้นตอน จนถึงการ Commit ผลลัพธ์สุดท้าย

**เนื้อหาหลัก**
- **สาเหตุ:** เกิดเมื่อ Developer 2 คนแก้ไขไฟล์เดิมบรรทัดเดิมบน Branch คนละ Branch แล้ว Merge เข้าหากัน
- **ขั้นตอนที่ 1:** git status ดูไฟล์ที่มีปัญหา (อยู่ใต้ Unmerged paths)
- **ขั้นตอนที่ 2 — Conflict Markers:**
```
 <<<<<<< HEAD
โค้ดของ Branch ปัจจุบัน
 =======
โค้ดของ Branch ที่กำลัง Merge เข้ามา
 >>>>>>> feature-branch
```
- **ขั้นตอนที่ 3:** แก้ไขด้วยตนเองใน Text Editor เลือกโค้ดที่ต้องการ แล้วลบ Marker ทั้งหมดออก
- **ทางเลือก:** git mergetool ใช้เครื่องมือ GUI เช่น VS Code, KDiff3
- **ขั้นตอนที่ 4:** git add filename → git commit
- **ยกเลิกได้เสมอ:** git merge --abort เพื่อกลับไปสถานะก่อน Merge

**สรุป**
Merge Conflict เป็นเรื่องปกติที่เกิดขึ้นในทุก Team ที่ทำงานร่วมกันด้วย Git การฝึกแก้ Conflict บ่อยๆ จะทำให้ชำนาญและมั่นใจในการทำงานแบบ Collaborative มากขึ้น', '## Resolving a Merge Conflict

**What you will learn in this video**
In this video, we will learn how Merge Conflicts occur in Git and how to properly resolve them step-by-step, right up to committing the final result.

**Core Content**
- **Cause:** Occurs when 2 Developers edit the same lines in the same file on different Branches and then Merge them.
- **Step 1:** git status to identify problem files (listed under Unmerged paths).
- **Step 2 — Conflict Markers:**
```text
 <<<<<<< HEAD
Current Branch''s code
 =======
Incoming Branch''s code
 >>>>>>> feature-branch
```
- **Step 3:** Manually edit in a Text Editor, select the desired code, and remove all Markers.
- **Alternative:** git mergetool using GUI tools like VS Code or KDiff3.
- **Step 4:** git add filename → git commit
- **Always Reversible:** git merge --abort to return to the pre-Merge state.

**Conclusion**
Merge Conflicts are a normal occurrence in any Team collaborating via Git. Practicing conflict resolution builds proficiency and confidence in Collaborative work.', 'video', 5, 4, 'https://www.youtube.com/watch?v=DloR0BOGNU0', '/images/thumbnails/lesson-git-04.jpg', NULL, '2026-06-04 07:07:14.488949+00', '2026-06-04 07:07:14.488949+00', '{"questions":[{"options":["An authentication error when pushing to GitHub.","An event when Git cannot automatically resolve differences in code edits made by different people to the same line in a file.","A routing loop on network switches.","A hardware failure on the computer''s hard drive."],"question_en":"What is a Git Merge Conflict?","question_th":"ข้อขัดแย้งในการรวมไฟล์ในระบบ Git (Git Merge Conflict) หมายถึงอะไร?","correct_index":1,"explanation_en":"A merge conflict occurs when two branches modify the same line of a file in different ways, and Git cannot decide which change is correct.","explanation_th":"คือการชนกันของข้อมูลเมื่อคนสองคนเขียนโค้ดทับบรรทัดของไฟล์เดียวกันต่างกัน จนตัวโปรแกรมไม่สามารถรวมให้อัตโนมัติได้","options_th":["เกิดข้อผิดพลาดในการยืนยันตัวตนเมื่อ push ไปยัง GitHub","Git รวมการแก้บรรทัดเดียวกันอัตโนมัติไม่ได้","ลูปการกำหนดเส้นทางบนสวิตช์เครือข่าย","ความล้มเหลวของฮาร์ดแวร์ในฮาร์ดไดรฟ์ของคอมพิวเตอร์"]},{"options":["It encrypts the entire file.","It inserts conflict markers, such as <<<<<<<, =======, and >>>>>>>.","It automatically deletes the conflicting file.","It marks the file red in the file system."],"question_en":"How does Git represent conflicting sections inside a file during a merge conflict?","question_th":"Git จะแปะทำเครื่องหมายสัญลักษณ์ระบุพื้นที่ชนกันขัดแย้งของข้อมูลอย่างไรภายในไฟล์ที่เกิดปัญหา?","correct_index":1,"explanation_en":"Git inserts visual conflict markers: ''<<<<<<<'' marks the current branch''s changes, ''======='' separates the changes, and ''>>>>>>>'' marks the incoming branch''s changes.","explanation_th":"Git จะแนบเครื่องหมายสัญลักษณ์พิเศษเพื่อบอกจุดชน ได้แก่ ''<<<<<<<'' แยกตัวด้วย ''======='' และขีดเส้นใต้เขตขัดแย้งปลายสุดด้วย ''>>>>>>>''","options_th":["มันเข้ารหัสไฟล์ทั้งหมด","โดยแทรกเครื่องหมายข้อขัดแย้ง เช่น <<<<<<<, ======= และ >>>>>>>","มันจะลบไฟล์ที่ขัดแย้งโดยอัตโนมัติ","มันทำเครื่องหมายไฟล์เป็นสีแดงในระบบไฟล์"]},{"options":["Delete the Git repository and clone it again.","Open the conflicting file, edit the conflict markers out manually selecting the desired code, add the file to staging, and commit.","Run ''git push'' with the force flag.","Use standard windows explorer copy-paste."],"question_en":"What is the correct workflow to resolve a Git merge conflict?","question_th":"กระบวนการขั้นตอนปฏิบัติที่ถูกต้องที่สุดในการคลี่คลายข้อขัดแย้งการชนกันของโค้ดคือข้อใด?","correct_index":1,"explanation_en":"To resolve conflicts: open the affected files, resolve differences, delete the conflict markers, run ''git add'', and commit the resolution.","explanation_th":"ผู้ดูแลต้องเปิดไฟล์ตัวปัญหา เลือกเคลียร์ตัดบรรทัดรอยชนและสัญลักษณ์ออกด้วยมือให้เหลือเพียงโค้ดชุดที่ถูกต้อง สั่ง ''git add'' และทำการ commit","options_th":["ลบที่เก็บ Git และโคลนอีกครั้ง","แก้ Conflict Marker เลือก Code แล้ว add และ commit","เรียกใช้ ''git push'' ด้วยธงบังคับ","ใช้การคัดลอกและวางมาตรฐานของ windows explorer"]},{"options":["git merge --abort","git reset --hard","git rollback","git abort"],"question_en":"Which command aborts the current merge process and returns the working directory to the pre-merge state?","question_th":"คำสั่งใดใช้ยกเลิกการควบรวมไฟล์ระหว่างดำเนินการเพื่อดึงสภาพแวดล้อมระบบให้ย้อนกลับสู่จุดเริ่มต้นก่อนสั่ง Merge?","correct_index":0,"explanation_en":"The ''git merge --abort'' command stops the merge and attempts to restore the working directory state back to before the merge command.","explanation_th":"ป้อนคำสั่ง ''git merge --abort'' เพื่อยกเลิกภารกิจการจัดเตรียมไฟล์ขัดแย้งและหักลบกระบวนการ Merge ทิ้งไปทั้งหมด","options_th":["git merge --abort","git reset --hard","git rollback","git abort"]},{"options":["Yes, Git allows it without warning.","No, although you can technically commit it, it is a bad practice and will break code compilation and testing.","Yes, but only if you use the force command.","No, Git blocks the commit command completely."],"question_en":"Can you commit a file containing merge conflict markers (like ''<<<<<<<'') directly without resolving the conflict?","question_th":"คุณสามารถสั่ง Commit ไฟล์ที่ยังมีเครื่องหมายสัญลักษณ์ชนกันของโค้ด (เช่น ''<<<<<<<'') ค้างอยู่เข้าคลังตรงๆ ได้เลยหรือไม่?","correct_index":1,"explanation_en":"While Git will permit committing the file, the conflict markers are plain text. Committing them directly will cause syntax errors and break build compilations.","explanation_th":"ทางเทคนิคทำได้ แต่นับเป็นพฤติกรรมที่ไม่พึงประสงค์อย่างยิ่ง เพราะเครื่องหมายป้ายสัญลักษณ์จะยังค้างอยู่ในไฟล์ส่งผลให้สคริปต์คอมไพล์ไม่ผ่าน","options_th":["ใช่ Git อนุญาตโดยไม่มีการเตือนล่วงหน้า","ไม่ ควรแก้ Marker ก่อนเพราะ Code/Test จะเสีย","ใช่ แต่เฉพาะในกรณีที่คุณใช้คำสั่งบังคับเท่านั้น","ไม่ Git บล็อกคำสั่งคอมมิตอย่างสมบูรณ์"]}]}', NULL),
	('lesson-ccna004-04', 'ccna-004', 'WAN Design และ Redundancy', 'WAN Design and Redundancy', '## WAN Design and Redundancy

**บทนำ**
เครือข่ายบริเวณกว้าง (WAN) คือระบบที่เชื่อมต่อสาขาต่างๆ ขององค์กรเข้าด้วยกัน การออกแบบ WAN ต้องคำนึงถึงความเสถียรและความพร้อมใช้งานสูง

**รูปแบบการออกแบบ (Topologies)**
- **Hub and Spoke:** สำนักงานใหญ่เป็นศูนย์กลาง (Hub) และสาขา (Spoke) เชื่อมเข้ามา จัดการง่ายแต่มี Single Point of Failure
- **Full Mesh:** ทุกสาขาเชื่อมถึงกันหมด เสถียรที่สุดแต่มีค่าใช้จ่ายสูง
- **Partial Mesh:** ผสมผสานเพื่อลดต้นทุน โดยเชื่อมเฉพาะสาขาสำคัญเข้าด้วยกัน

**ความสำคัญของ Redundancy**
การออกแบบเครือข่ายสำรอง (Dual-homed หรือ Dual-WAN) ช่วยรับประกันว่าระบบจะทำงานได้ต่อเนื่องหากลิงก์หลักเกิดปัญหา โดยมักใช้ร่วมกับโปรโตคอลเช่น BGP หรือการทำ SD-WAN ในปัจจุบัน

**สรุป**
การออกแบบ WAN ที่ดีต้องรักษาสมดุลระหว่างประสิทธิภาพ ค่าใช้จ่าย และความน่าเชื่อถือ โดยการวางแผน Redundancy ถือเป็นหัวใจสำคัญ', '## WAN Design and Redundancy

**Introduction**
Wide Area Networks (WANs) connect dispersed organizational sites. Designing an effective WAN requires a focus on high availability and stability.

**Design Topologies**
- **Hub and Spoke:** Headquarters acts as the center (Hub) with branches (Spoke) connecting in. Simple to manage but has a Single Point of Failure.
- **Full Mesh:** All branches connect to each other. Most stable but very expensive.
- **Partial Mesh:** A hybrid approach to reduce costs, directly connecting only the critical branches.

**Importance of Redundancy**
Designing backup networks (Dual-homed or Dual-WAN) ensures continuous operation if the primary link fails, often combined with protocols like BGP or modern SD-WAN.

**Conclusion**
Good WAN design balances performance, cost, and reliability. Planning for Redundancy is the heart of this process.', 'reading', 2, 4, NULL, '/images/thumbnails/lesson-ccna004-04.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["To reduce the cost of monthly bills.","To ensure continuous network availability and prevent downtime by using multiple active connections.","To encrypt database traffic.","To limit employee access to external websites."],"question_en":"What is the primary goal of WAN Redundancy in enterprise networks?","question_th":"เป้าหมายหลักของการทำความซ้ำซ้อนระบบ WAN (WAN Redundancy) ในระบบเครือข่ายระดับองค์กรคืออะไร?","correct_index":1,"explanation_en":"WAN redundancy uses backup paths and multiple service providers to ensure business continuity in case of link failure.","explanation_th":"เป็นการเตรียมเส้นทางสำรองและจ้างค่ายเน็ตหลายเจ้า เพื่อให้ธุรกิจดำเนินงานได้ต่อเนื่องเมื่อสายหลักมีปัญหา","options_th":["เพื่อลดค่าบริการรายเดือน","คงบริการต่อเนื่องด้วยหลาย Link","เพื่อเข้ารหัสการรับส่งข้อมูลฐานข้อมูล","เพื่อจำกัดการเข้าถึงของพนักงานไปยังเว็บไซต์ภายนอก"]},{"options":["Connecting a customer site to a single provider using a single line.","Connecting a customer site to two different service providers for redundancy.","Configuring two IP addresses on a single physical link.","Using two routers in the same local room without external links."],"question_en":"What is Dual-Homing in WAN design?","question_th":"การออกแบบโครงสร้าง WAN ในสเปกแบบ Dual-Homing หมายถึงการออกแบบในลักษณะใด?","correct_index":1,"explanation_en":"Dual-Homing means connecting customer networks to two separate service providers, protecting against a single service provider outage.","explanation_th":"คือการเชื่อมต่อเครือข่ายองค์กรไปยังผู้ให้บริการ (ISP) สองรายที่ต่างกัน เพื่อป้องกันการล่มของระบบเครือข่ายรายใดรายหนึ่ง","options_th":["การเชื่อมต่อไซต์ของลูกค้ากับผู้ให้บริการรายเดียวโดยใช้สายเดียว","การเชื่อมต่อไซต์ของลูกค้ากับผู้ให้บริการสองรายเพื่อความซ้ำซ้อน","การกำหนดค่าที่อยู่ IP สองรายการบนลิงก์ทางกายภาพเดียว","การใช้เราเตอร์สองตัวในห้องเดียวกันโดยไม่มีลิงก์ภายนอก"]},{"options":["Active-Active uses only one link; Active-Standby uses two.","Active-Active load shares traffic over both links simultaneously; Active-Standby uses one primary link and only activates the second when the primary fails.","Active-Active is slower than Active-Standby.","Active-Standby requires OSPF."],"question_en":"What is the difference between Active-Active and Active-Standby redundancy?","question_th":"ข้อแตกต่างระหว่างรูปแบบความซ้ำซ้อนแบบ Active-Active และ Active-Standby คืออะไร?","correct_index":1,"explanation_en":"Active-Active utilizes all links for traffic transmission simultaneously, maximizing bandwidth. Active-Standby leaves backup links idle until the primary path fails.","explanation_th":"Active-Active จะส่งข้อมูลแชร์วิ่งสองสายพร้อมกัน ส่วน Active-Standby จะใช้สายหลักเพียงสายเดียวและเก็บสายสำรองไว้เฉยๆ จนกว่าสายหลักจะพัง","options_th":["Active-Active ใช้ลิงก์เดียวเท่านั้น Active-Standby ใช้สองตัว","Active-Active ใช้ทั้งสอง Link; Standby ใช้ Link สำรองเมื่อล่ม","Active-Active ช้ากว่า Active-Standby","Active-Standby ต้องใช้ OSPF"]},{"options":["Standard Frame Relay","SD-WAN (Software-Defined WAN)","Legacy Hub-and-Spoke","Direct dial-up"],"question_en":"Which WAN technology allows dynamic path selection and load sharing across multiple links (such as broadband, LTE, and MPLS) based on application requirements?","question_th":"เทคโนโลยี WAN ใดที่รองรับการเลือกเส้นทางแบบไดนามิกและโหลดบาลานซ์ตามประเภทแอปพลิเคชันผ่านสายส่งหลากหลายช่องทาง?","correct_index":1,"explanation_en":"SD-WAN provides centralized control and dynamic path routing over diverse transport links based on application performance rules.","explanation_th":"SD-WAN ช่วยให้บริหารจัดการโครงข่ายระยะไกลได้อย่างอิสระโดยวิเคราะห์ประเภทข้อมูลและสภาพสายส่งเพื่อสลับทางวิ่งให้เหมาะสมที่สุด","options_th":["รีเลย์เฟรมมาตรฐาน","SD-WAN","Hub-and-Spoke แบบเดิม","การโทรออกโดยตรง"]},{"options":["To automatically encrypt packets.","To monitor network performance (latency, packet loss) and trigger path failover if parameters degrade.","To assign IP addresses to new branch routers.","To limit interface speeds."],"question_en":"In WAN redundancy, what is the role of IP SLA (Service Level Agreement)?","question_th":"ในการทำความซ้ำซ้อนระบบ WAN ฟังก์ชัน IP SLA (Service Level Agreement) มีบทบาทหน้าที่อย่างไร?","correct_index":1,"explanation_en":"IP SLA actively monitors connection health by sending probes. If it detects loss or high latency, it can trigger static route switches.","explanation_th":"IP SLA จะคอยยิงสัญญาณทดสอบคุณภาพสายส่งอย่างต่อเนื่อง หากพบปัญหาความล่าช้า (Latency) หรือข้อมูลหาย จะสั่งสลับทางวิ่งไปพอร์ตสำรอง","options_th":["เพื่อเข้ารหัสแพ็กเก็ตโดยอัตโนมัติ","วัด Latency/Loss แล้วสั่ง Failover","เพื่อกำหนดที่อยู่ IP ให้กับเราเตอร์สาขาใหม่","เพื่อจำกัดความเร็วของอินเทอร์เฟซ"]}]}', NULL),
	('lesson-git-01', 'devnet-005', 'Introduction to Git', 'Introduction to Git', '## Git เบื้องต้น

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
Git เป็นเครื่องมือที่ทุก Developer และ Network Engineer ใช้ร่วมกัน เมื่อเริ่มต้นใช้แล้วจะขาดไม่ได้', '## Introduction to Git

**What you will learn in this video**
This video teaches how to use Git, a Version Control system that modern network engineers must know.

**Core Content**
- **Why use Git:** Keep the edit history of every Config/Script Version, allowing you to roll back when mistakes happen.
- **Basic Commands:**
  - `git init` Create a new Repository
  - `git add .` Add modified files to Staging
  - `git commit -m "message"` Save a Snapshot
  - `git log` View full history
  - `git diff` Compare changes
- **.gitignore file:** Specify files you do not want to Track, such as Password files.

**Conclusion**
Git is a tool shared by all Developers and Network Engineers. Once you start using it, you won''t be able to work without it.', 'video', 16, 1, 'https://www.youtube.com/watch?v=USjZcfj8yxE', '/images/thumbnails/lesson-git-01.jpg', NULL, '2026-06-04 07:07:14.488949+00', '2026-06-04 07:07:14.488949+00', '{"questions":[{"options":["A programming language for network code.","A distributed version control system to track changes in source code.","A cloud database server.","A software pipeline compile utility."],"question_en":"What is Git?","question_th":"Git คือระบบโปรแกรมประเภทใด?","correct_index":1,"explanation_en":"Git is a distributed version control system that tracks revisions, changes, and history of text files (like code).","explanation_th":"Git เป็นระบบควบคุมรุ่นแบบกระจายศูนย์ (Distributed Version Control) เพื่อใช้เฝ้าบันทึกประวัติการเปลี่ยนแปลงแก้ไขตัวโค้ดโปรแกรม","options_th":["ภาษาโปรแกรมสำหรับรหัสเครือข่าย","ระบบควบคุมเวอร์ชันแบบกระจาย","เซิร์ฟเวอร์ฐานข้อมูลคลาวด์","ยูทิลิตี้การคอมไพล์ไปป์ไลน์ซอฟต์แวร์"]},{"options":["git start","git init","git create","git clone"],"question_en":"Which command initializes a new, empty Git repository in the current local folder?","question_th":"คำสั่งใดใช้สำหรับริเริ่มสร้างคลังข้อมูล Git ใหม่ที่ว่างเปล่า (Initialize repository) ลงในโฟลเดอร์ปัจจุบัน?","correct_index":1,"explanation_en":"The ''git init'' command creates a hidden ''.git'' directory, initializing a repository.","explanation_th":"ใช้คำสั่ง ''git init'' เพื่อเรียกตั้งแฟ้มประวัติไฟล์ลับ ''.git'' ขึ้นมารับช่วงต่อสังเกตการณ์ความเคลื่อนไหวในโฟลเดอร์","options_th":["git start","git init","git create","git clone"]},{"options":["git stage","git add <filename>","git commit","git push"],"question_en":"What command is used to add local changes in a file to the staging area in Git?","question_th":"คำสั่งใดที่ใช้ในการนำส่งการแก้ไขของไฟล์ในท้องถิ่นเข้าสู่พื้นที่เตรียมคลัง (Staging Area) ในระบบ Git?","correct_index":1,"explanation_en":"The ''git add <file>'' command adds changes to the index, preparing them to be committed.","explanation_th":"สั่งรวบรวมไฟล์เก็บพักไว้ในด่านเตรียมส่งตัวโดยใช้คำสั่ง ''git add <ชื่อไฟล์>'' ก่อนทำขั้นต่อไป","options_th":["git stage","git add <filename>","git commit","git push"]},{"options":["git save","git commit -m \"message\"","git push","git record"],"question_en":"What command permanently records the staged snapshot in the Git history with a descriptive log message?","question_th":"คำสั่งใดใช้บันทึกเก็บภาพการแก้ไขที่รอคอยใน Staging Area ลงเป็นประวัติผลงานถาวรของ Git พร้อมแนบคำอธิบาย?","correct_index":1,"explanation_en":"The ''git commit -m \"msg\"'' command permanently records the staged files in the local Git repository''s history database.","explanation_th":"คำสั่ง ''git commit -m \"คำอธิบาย\"'' จะบันทึกภาพรวมความคืบหน้าของโค้ดเก็บเข้าเป็นประวัติผลงานถาวรในคลังระบบ","options_th":["git save","git commit -m \"message\"","git push","git record"]},{"options":["Staging Area","Working Directory (Working Tree)","Local Repository","Remote Repository"],"question_en":"Which area in Git contains files that are modified but have not yet been added to the staging area or committed?","question_th":"พื้นที่บริเวณใดในระบบ Git ที่แสดงสถานะว่าไฟล์โดนปรับเปลี่ยนข้อมูลแล้ว แต่ยังไม่ได้ลงชื่อในส่วนเตรียมตัวหรือ Commit?","correct_index":1,"explanation_en":"The Working Directory is the active file system folder where files are modified before being added to Git staging.","explanation_th":"พื้นที่ไดเรกทอรีทำงาน (Working Directory) คือตัวโฟลเดอร์ปกติที่มีความเคลื่อนไหวแต่ตัว Git ยังไม่ได้ลงบันทึกใน Staging","options_th":["Staging Area","Working Directory (Working Tree)","Local Repository","Remote Repository"]}]}', NULL),
	('lesson-git-02', 'devnet-005', 'GitHub & GitLab Workflows', 'GitHub & GitLab Workflows', '## GitHub & GitLab Workflows

**บทนำ**
เมื่อวงการเครือข่ายก้าวเข้าสู่ยุค NetDevOps (Network + DevOps) การจัดการซอร์สโค้ด (Source Control) จึงเข้ามามีบทบาท GitHub และ GitLab เป็นแพลตฟอร์มหลักที่ใช้หลักการของ Git

**การจัดการด้วย Git Workflow**
- **Branching:** เมื่อต้องการเปลี่ยนคอนฟิก วิศวกรจะไม่แก้ไขในระบบจริง แต่จะแตก Branch ใหม่ขึ้นมา
- **Pull Requests (PR) / Merge Requests (MR):** หลังจากแก้ไฟล์เสร็จ จะเปิดการขอรวมโค้ด (PR/MR) เพื่อให้เพื่อนร่วมทีมช่วยตรวจสอบ (Code Review) ก่อนนำไปใช้จริง
- **CI/CD Pipeline:** สามารถผูกเข้ากับ GitLab CI หรือ GitHub Actions เพื่อให้เมื่อมีการผ่าน PR ระบบจะรัน Ansible หรือ Python สคริปต์ไปตั้งค่าบนอุปกรณ์จริงอัตโนมัติ

**สรุป**
GitHub และ GitLab workflows เปลี่ยนวิธีการทำงานของวิศวกรเครือข่ายให้มีมาตรฐาน มีประวัติการแก้ไขชัดเจน และมีความปลอดภัยเทียบเท่ากับการพัฒนาซอฟต์แวร์ระดับองค์กร', '## GitHub & GitLab Workflows

**Introduction**
As the networking industry steps into the NetDevOps (Network + DevOps) era, Source Control becomes crucial. GitHub and GitLab are the primary platforms built on Git principles.

**Management with Git Workflow**
- **Branching:** When changing a configuration, engineers do not edit the production system; instead, they branch off.
- **Pull Requests (PR) / Merge Requests (MR):** After editing files, a PR/MR is opened to allow teammates to review the code (Code Review) before applying it.
- **CI/CD Pipeline:** Can integrate with GitLab CI or GitHub Actions to automatically run Ansible or Python scripts to configure real devices once a PR is merged.

**Conclusion**
GitHub and GitLab workflows standardize how network engineers work, providing clear edit histories and enterprise-level software development security.', 'reading', 2, 2, NULL, '/images/thumbnails/lesson-git-02.jpg', NULL, '2026-06-04 07:07:14.488949+00', '2026-06-04 07:07:14.488949+00', '{"questions":[{"options":["Git is a paid service; GitHub is free open-source software.","Git is the local version control software; GitHub and GitLab are web-based platforms that host remote Git repositories and provide collaboration tools.","Git operates in Layer 3; GitHub operates in Layer 7.","They are identical products developed by different companies."],"question_en":"What is the primary difference between Git and GitHub/GitLab?","question_th":"ข้อแตกต่างพื้นฐานที่สำคัญระหว่างตัวระบบ Git และผู้ให้บริการอย่าง GitHub/GitLab คืออะไร?","correct_index":1,"explanation_en":"Git is the underlying tool that runs locally. Platforms like GitHub and GitLab host these repositories on servers to allow team collaboration.","explanation_th":"Git คือซอฟต์แวร์เครื่องมือหลักที่ติดตั้งรันในคอมพิวเตอร์ ส่วน GitHub/GitLab เป็นคลังเก็บไฟล์บนอินเทอร์เน็ตที่ช่วยทำงานเป็นทีม","options_th":["Git เป็นบริการแบบเสียเงิน ส่วน GitHub เป็นซอฟต์แวร์โอเพนซอร์สฟรี","Git คือ VCS ในเครื่อง; GitHub/GitLab คือ Remote Platform","Git ทำงานที่ Layer 3 ส่วน GitHub ทำงานที่ Layer 7","เป็นผลิตภัณฑ์ที่เหมือนกันซึ่งพัฒนาโดยบริษัทต่างๆ"]},{"options":["git download","git clone <repository-url>","git import","git pull"],"question_en":"What command is used to download an existing remote Git repository onto your local computer?","question_th":"คำสั่งใดใช้ดาวน์โหลดคลังข้อมูล Git ที่มีอยู่แล้วจากระยะไกล (Remote repository) ลงมาบันทึกในเครื่องตนเอง?","correct_index":1,"explanation_en":"The ''git clone'' command fetches a remote repository and configures a local copy pointing to the source URL.","explanation_th":"ใช้คำสั่ง ''git clone <ที่อยู่เว็บคลัง>'' ในการสั่งดึงข้อมูลประวัติทั้งหมดของระบบคลังจากระยะไกลมาเริ่มทำงานในเครื่อง","options_th":["git download","git clone <repository-url>","git import","git pull"]},{"options":["A command to download files from GitHub.","A proposal to merge changes from one branch into another, allowing code review and automated checks.","A warning message when Git detects duplicate IPs.","A request to delete a branch."],"question_en":"What is a Pull Request (PR) or Merge Request (MR)?","question_th":"Pull Request (PR) หรือ Merge Request (MR) ในมุมของการพัฒนาซอฟต์แวร์ร่วมกันหมายถึงขั้นตอนใด?","correct_index":1,"explanation_en":"Pull/Merge Requests permit developers to notify team members of completed work, review modifications, and run automated tests before merging to main code.","explanation_th":"คือขั้นตอนยื่นเจตจำนงของโค้ดที่แก้ไขเพื่อขอเอาไปรวมเข้ากับกิ่งหลัก เพื่อให้ทีมช่วยตรวจเช็คความถูกต้องและรันการทดสอบ","options_th":["คำสั่งดาวน์โหลดไฟล์จาก GitHub","ข้อเสนอ Merge Branch พร้อม Code Review และ Checks","ข้อความเตือนเมื่อ Git ตรวจพบ IP ที่ซ้ำกัน","คำร้องขอให้ลบสาขา"]},{"options":["git upload","git push","git commit","git publish"],"question_en":"What command upload local commits to a remote repository on GitHub?","question_th":"คำสั่งใดใช้ส่งประวัติชิ้นงานที่ Commit ในเครื่องตัวเองขึ้นสู่คลังข้อมูลระยะไกล (Remote Repository) บน GitHub?","correct_index":1,"explanation_en":"The ''git push'' command transfers local commits to the designated remote repository (e.g. origin/main).","explanation_th":"ใช้คำสั่ง ''git push'' เพื่อคัดส่งประวัติงานทรานสเฟอร์จากเครื่องตัวเองดันขึ้นไปเก็บไว้ในเซิร์ฟเวอร์ส่วนกลาง","options_th":["git upload","git push","git commit","git publish"]},{"options":["git fetch","git pull","git merge","git update"],"question_en":"Which command fetches changes from a remote repository and immediately integrates them into the current active branch?","question_th":"คำสั่งใดจะดึงข้อมูลการแก้ไขล่าสุดของคลังส่วนกลางลงมาและสั่งรวมเข้ากับกิ่งปัจจุบันในเครื่องให้ทันที?","correct_index":1,"explanation_en":"The ''git pull'' command is a shortcut that performs a ''git fetch'' followed by a ''git merge'' to bring local files up-to-date.","explanation_th":"คำสั่ง ''git pull'' เป็นคำสั่งย่อที่สั่งรัน ''git fetch'' เพื่อตรวจสอบข่าวสารแล้วสั่งเอาโค้ดมารวม (''git merge'') เข้าหาทันที","options_th":["git fetch","git pull","git merge","git update"]}]}', NULL),
	('lesson-sec002-01', 'sec-002', 'VPN Concepts และ Types', 'VPN Concepts and Types', '## VPN Concepts (แนวคิด VPN)

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
VPN เป็นพื้นฐานความรู้ที่จำเป็นก่อนเรียน IPsec และ SSL VPN ในหัวข้อต่อไป', '## VPN Concepts

**What you will learn in this video**
This video explains the basics of VPNs and why every organization must use them.

**Core Content**
- **VPN (Virtual Private Network):** Creates an encrypted, virtual private tunnel over public networks.
- **Why use VPN:** Secure, cheaper than Leased Lines, supports Remote Work.
- **VPN Types:**
  - **Site-to-Site VPN:** Permanently connects 2 offices together.
  - **Remote Access VPN:** Employees at home connect into the office.
- **Encryption Basics:** Symmetric (AES), Asymmetric (RSA), Hashing (SHA) used in VPNs.

**Conclusion**
VPN is fundamental knowledge required before diving into IPsec and SSL VPN in the upcoming topics.', 'video', 8, 1, 'https://www.youtube.com/watch?v=R-JUOpCgTZc', '/images/thumbnails/lesson-sec002-01.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["To provide internet connections to computers without cables.","To create a secure, encrypted connection (tunnel) over a public infrastructure like the Internet.","To monitor employee web histories.","To assign local DHCP IP addresses."],"question_en":"What is the primary function of a Virtual Private Network (VPN)?","question_th":"หน้าที่หลักของการทำเครือข่ายเสมือนส่วนตัว (VPN) คืออะไร?","correct_index":1,"explanation_en":"VPNs use cryptography to encapsulate and encrypt data, allowing users to send private traffic safely over public networks.","explanation_th":"สร้างท่อข้อมูลเสมือนที่ได้รับการเข้ารหัส (Encryption) ส่งตรงข้ามโครงสร้างอินเทอร์เน็ตสาธารณะเสมือนเป็นสายเชื่อมตรงส่วนตัว","options_th":["เพื่อให้การเชื่อมต่ออินเทอร์เน็ตกับคอมพิวเตอร์โดยไม่ต้องใช้สายเคเบิล","สร้าง Tunnel เข้ารหัสผ่าน Internet","เพื่อติดตามประวัติเว็บของพนักงาน","เพื่อกำหนดที่อยู่ IP ของ DHCP ในเครื่อง"]},{"options":["Remote Access VPN","Site-to-Site VPN","Clientless SSL VPN","Dial-up VPN"],"question_en":"What type of VPN connects two permanent office sites (e.g., Headquarters and a Branch office) together securely?","question_th":"VPN ประเภทใดที่ถูกออกแบบมาเพื่อเชื่อมโยงสำนักงานถาวรสองแห่ง (เช่น สำนักงานใหญ่และสำนักงานสาขา) เข้าหากันอย่างปลอดภัย?","correct_index":1,"explanation_en":"A Site-to-Site VPN uses gateway routers or firewalls at each office location to establish a permanent secure link connecting the LANs.","explanation_th":"Site-to-Site VPN ใช้เพื่อเชื่อมสำนักงานสองฝั่งผ่านเร้าเตอร์ขอบแดนถาวร อุปกรณ์ปลายทางภายในใช้งานได้โดยไม่ต้องมีโปรแกรมเสริม","options_th":["Remote Access VPN","VPN แบบไซต์ต่อไซต์","SSL VPN แบบไร้ไคลเอ็นต์","VPN แบบเชื่อมต่อผ่านสายโทรศัพท์"]},{"options":["Site-to-Site VPN","Remote Access VPN","Frame Relay VPN","Point-to-Point serial link"],"question_en":"What type of VPN allows individual teleworkers to connect securely to the corporate network from home or hotels?","question_th":"VPN ประเภทใดที่อนุญาตให้พนักงานรายบุคคลเชื่อมต่อจากระยะไกล (เช่น จากบ้านหรือโรงแรม) เข้าหาเครือข่ายองค์กรได้อย่างปลอดภัย?","correct_index":1,"explanation_en":"Remote Access VPNs connect individual clients to a corporate VPN gateway using software installed on the client machine.","explanation_th":"Remote Access VPN เหมาะให้พนักงานรันผ่านแอปพลิเคชันไคลเอนต์ (เช่น Cisco AnyConnect) เพื่อล็อกอินส่งท่อความปลอดภัยเฉพาะตัว","options_th":["VPN แบบไซต์ต่อไซต์","Remote Access VPN","เฟรมรีเลย์ VPN","ลิงค์อนุกรมแบบจุดต่อจุด"]},{"options":["SSL / TLS","IPsec (IP Security)","GRE","PPP"],"question_en":"Which protocol suite is the industry standard for securing IP traffic at the Network Layer in a VPN tunnel?","question_th":"ชุดโปรโตคอลมาตรฐานสากลใดที่นิยมนำมาใช้เป็นแกนหลักเพื่อป้องกันความปลอดภัยทราฟฟิกข้อมูล IP ในเลเยอร์เครือข่าย?","correct_index":1,"explanation_en":"IPsec (IP Security) is a suite of protocols configured at Layer 3 to provide encryption, data integrity, and authentication for VPNs.","explanation_th":"IPsec (IP Security) เป็นกลุ่มมาตรฐานความปลอดภัยในเลเยอร์เน็ตเวิร์ก (Layer 3) มอบการเข้ารหัสและตรวจสอบข้อมูลครบถ้วน","options_th":["SSL/TLS","IPsec","GRE","PPP"]},{"options":["GRE does not support routing protocols.","GRE has no built-in encryption or security features, meaning data is transmitted in plaintext.","GRE is slower than Dial-up.","GRE is proprietary to Cisco switches."],"question_en":"What is the main limitation of GRE (Generic Routing Encapsulation) tunnels when used alone to connect branch offices?","question_th":"ข้อจำกัดข้อสำคัญของการใช้ท่อ GRE (Generic Routing Encapsulation) เดี่ยวๆ เชื่อมสาขาโดยไม่มีโปรแกรมเสริมคือข้อใด?","correct_index":1,"explanation_en":"GRE encapsulates routing updates and multicast traffic but does not encrypt the payloads. It is commonly combined with IPsec for security.","explanation_th":"GRE สามารถช่วยกรองทราฟฟิกและรองรับมัลติแคสต์ได้ดี แต่ไม่มีการเข้ารหัสข้อมูลในตัว ทราฟฟิกที่วิ่งผ่านท่อจึงยังเป็นข้อความดิบ","options_th":["GRE ไม่รองรับโปรโตคอลการกำหนดเส้นทาง","GRE ไม่เข้ารหัส ข้อมูลจึงเป็น Plaintext","GRE ช้ากว่า Dial-up","GRE เป็นกรรมสิทธิ์ของสวิตช์ Cisco"]}]}', NULL),
	('lesson-wireshark-01', 'troubleshoot-001', 'การติดตั้งและใช้งาน Wireshark', 'Installing and Using Wireshark', '## Wireshark เบื้องต้น

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการใช้ Wireshark ซึ่งเป็นเครื่องมือ Packet Analysis ยอดนิยมสำหรับ Troubleshoot และวิเคราะห์ Protocol

**เนื้อหาหลัก**
- **Capture Filters:** กรอง Packet ระหว่างการ Capture เช่น `host 192.168.1.1`, `port 80`
- **Display Filters:** กรอง Packet ที่ Capture แล้ว เช่น `ip.addr == 192.168.1.1`, `tcp.port == 443`, `http`
- **Packet Dissection:** อ่าน Packet Detail ทีละ Layer (Frame → Ethernet → IP → TCP → Application)
- **Follow TCP Stream:** ดูข้อมูลการสื่อสารทั้ง Session ของ TCP Connection
- **Statistics:** I/O Graph, Protocol Hierarchy, Conversations

**สรุป**
Wireshark เป็นเครื่องมือที่วิศวกรเครือข่ายและ Security ต้องรู้จักใช้ เพราะช่วยให้เห็น "ความจริง" ของ Network Traffic ได้โดยตรง', '## Wireshark Basics

**What you will learn in this video**
This video teaches how to use Wireshark, the most popular Packet Analysis tool for Troubleshooting and Protocol analysis.

**Core Content**
- **Capture Filters:** Filter Packets during Capture, e.g., `host 192.168.1.1`, `port 80`
- **Display Filters:** Filter captured Packets, e.g., `ip.addr == 192.168.1.1`, `tcp.port == 443`, `http`
- **Packet Dissection:** Read Packet Details Layer by Layer (Frame → Ethernet → IP → TCP → Application)
- **Follow TCP Stream:** View all communication data across a TCP Connection Session.
- **Statistics:** I/O Graph, Protocol Hierarchy, Conversations.

**Conclusion**
Wireshark is a tool that Network and Security engineers must master, as it reveals the direct "truth" of Network Traffic.', 'video', 21, 1, 'https://www.youtube.com/watch?v=qTaOZrDnMzQ', '/images/thumbnails/lesson-wireshark-01.jpg', NULL, '2026-05-18 10:02:06.461001+00', '2026-05-19 10:29:10.623729+00', '{"questions":[{"options":["A computer virus scanner.","An open-source packet analyzer used for network troubleshooting, analysis, and protocol education.","A command-line text editor.","A virtual switch simulator."],"question_en":"What is Wireshark?","question_th":"Wireshark คือโปรแกรมเครื่องมือประเภทใดในระบบคอมพิวเตอร์?","correct_index":1,"explanation_en":"Wireshark is the industry-standard GUI network packet sniffer and protocol analyzer.","explanation_th":"Wireshark เป็นโปรแกรมโอเพ่นซอร์สใช้สอยสำหรับดักจับและแกะอ่านวิเคราะห์โครงสร้างข้อมูลในระดับแพ็กเก็ต (Packet analyzer)","options_th":["เครื่องสแกนไวรัสคอมพิวเตอร์","เครื่องมือวิเคราะห์แพ็กเก็ตโอเพนซอร์ส","โปรแกรมแก้ไขข้อความบรรทัดคำสั่ง","เครื่องจำลองสวิตช์เสมือน"]},{"options":["WinPcap / Npcap","WinSock","Paramiko","OpenSSL"],"question_en":"What library must be installed alongside Wireshark on Windows to capture network interface packets?","question_th":"ไลบรารีพิเศษใดที่จะต้องติดตั้งร่วมกับ Wireshark บนระบบ Windows เพื่อให้ดักจับแพ็กเก็ตจากพอร์ตแลนทางกายภาพได้?","correct_index":0,"explanation_en":"Wireshark relies on Npcap (or legacy WinPcap) on Windows to hook into network interface cards and capture raw frames.","explanation_th":"บนระบบ Windows จำเป็นต้องติดตั้ง Npcap (หรือ WinPcap) เพื่อช่วยคัดสำเนาเฟรมดิบข้ามจากตัวการ์ดแลนส่งต่อมายังโปรแกรม","options_th":["WinPcap / Npcap","WinSock","Paramiko","OpenSSL"]},{"options":["Half-duplex mode","Promiscuous mode","Simplex mode","Broadcast-only mode"],"question_en":"What mode must a network interface card (NIC) support to capture all traffic on a local network hub, not just traffic sent to your own host?","question_th":"การ์ดแลน (NIC) ต้องเปิดทำงานในโหมดใดเพื่อยินยอมให้ดักจับประวัติข้อมูลทราฟฟิกของผู้อื่นบนวงฮับได้ด้วย ไม่ใช่แค่ไฟล์ที่ส่งหาตนเอง?","correct_index":1,"explanation_en":"Promiscuous mode forces the NIC to pass all received frames up to the operating system, regardless of the destination MAC address.","explanation_th":"โหมด Promiscuous (โหมดไม่เลือกที่รักมักที่ชัง) สั่งการให้ตัวการ์ดรับนำส่งเฟรมข้อมูลทุกแผ่นข้ามขึ้นมาให้ซอฟต์แวร์ส่องอ่านแม้จะเป็นของผู้อื่น","options_th":["โหมดฮาล์ฟดูเพล็กซ์","Promiscuous Mode","โหมดซิมเพล็กซ์","โหมดออกอากาศเท่านั้น"]},{"options":["Capture Filter runs in Layer 3; Display Filter runs in Layer 7.","Capture Filter limits what traffic is recorded to disk; Display Filter temporarily hides packets from view in the interface without deleting them.","They are identical filter functions.","Capture Filter is for routers; Display Filter is for switches."],"question_en":"What is the difference between a Capture Filter and a Display Filter in Wireshark?","question_th":"ข้อแตกต่างที่ชัดเจนระหว่างตัวกรองขณะดักจับ (Capture Filter) และตัวกรองขณะแสดงผล (Display Filter) คือข้อใด?","correct_index":1,"explanation_en":"Capture filters are applied before gathering packets, saving disk space. Display filters are applied post-capture, hiding packets to simplify analysis.","explanation_th":"ตัวกรองดักจับจำกัดเฉพาะทราฟฟิกที่จะเซฟลงเครื่อง ส่วนตัวกรองแสดงผลเพียงซ่อนภาพแพ็กเก็ตที่ไม่ต้องการมองในตารางเพื่อความง่ายในการอ่าน","options_th":["Capture Filter ทำงานในเลเยอร์ 3; ตัวกรองการแสดงผลทำงานในเลเยอร์ 7","Capture จำกัดสิ่งที่บันทึก; Display ซ่อนเฉพาะมุมมอง","เป็นฟังก์ชันตัวกรองที่เหมือนกัน","Capture Filter ใช้สำหรับเราเตอร์ ตัวกรองการแสดงผลใช้สำหรับสวิตช์"]},{"options":["http","tcp.port == 80","ip.proto == http","port 80 http"],"question_en":"Which Wireshark filter syntax only displays HTTP web traffic?","question_th":"ไวยากรณ์สเปกกรอง (Filter syntax) ของ Wireshark ในข้อใดที่จะแสดงเฉพาะไฟล์ประวัติทราฟฟิกเว็บแบบ HTTP?","correct_index":0,"explanation_en":"The display filter ''http'' filters the capture output to show only packets utilizing HTTP protocol.","explanation_th":"ป้อนเพียงคีย์เวิร์ด ''http'' ในช่องกรองแสดงผล ระบบจะดึงเอาเฉพาะเซสชันเว็บปกติมาแสดงหน้ากระดานทันที","options_th":["http","tcp.port == 80","ip.proto == http","port 80 http"]}]}', NULL),
	('lesson-wireshark-02', 'troubleshoot-001', 'การวิเคราะห์ TCP Packets', 'Analyzing TCP Packets', '## Protocol Analysis with Wireshark

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการวิเคราะห์ Protocol ต่างๆ เช่น TCP Handshake, HTTP, DNS ผ่าน Wireshark

**เนื้อหาหลัก**
- **TCP Three-Way Handshake:** วิเคราะห์ SYN → SYN-ACK → ACK ใน Packet
- **HTTP Analysis:** ดู Request/Response Headers, Status Codes (200, 404, 503)
- **DNS Query/Response:** ดูกระบวนการแปลง Domain Name เป็น IP แบบ Real-time
- **TLS/SSL Handshake:** ดูขั้นตอนการสร้าง Encrypted Session (ClientHello, ServerHello, Certificate)
- **TCP Retransmissions:** หา Performance Issue จาก Retransmit ใน Stream

**สรุป**
การอ่าน Packet ได้คล่องช่วยให้ Troubleshoot ปัญหาเครือข่ายและ Application ได้ลึกกว่าการดูแค่ Show Commands บน Router/Switch', '## Protocol Analysis with Wireshark

**What you will learn in this video**
This video teaches the analysis of various Protocols such as TCP Handshakes, HTTP, and DNS using Wireshark.

**Core Content**
- **TCP Three-Way Handshake:** Analyze SYN → SYN-ACK → ACK in Packets.
- **HTTP Analysis:** View Request/Response Headers, Status Codes (200, 404, 503).
- **DNS Query/Response:** See the Domain Name to IP translation process in Real-time.
- **TLS/SSL Handshake:** View the Encrypted Session creation process (ClientHello, ServerHello, Certificate).
- **TCP Retransmissions:** Identify Performance Issues from Retransmits in a Stream.

**Conclusion**
Fluency in reading Packets helps troubleshoot Network and Application problems much deeper than just viewing Show Commands on a Router/Switch.', 'video', 5, 2, 'https://www.youtube.com/watch?v=4dSaAMZsPvw', '/images/thumbnails/lesson-wireshark-02.jpg', NULL, '2026-05-18 10:02:06.461001+00', '2026-05-19 10:29:10.623729+00', '{"questions":[{"options":["SYN -> ACK -> SYN-ACK","SYN -> SYN-ACK -> ACK","Request -> Offer -> Ack","SYN -> FIN-ACK -> ACK"],"question_en":"What is the three-way handshake sequence in TCP connection establishment, as viewed in Wireshark?","question_th":"ลำดับชุดสัญญาณในด่านทักทาย (Three-way handshake) ของการสร้างเซสชัน TCP ที่ส่องพบใน Wireshark คือข้อใด?","correct_index":1,"explanation_en":"TCP connection setup begins with a SYN packet, followed by a SYN-ACK response, and completes with an ACK packet.","explanation_th":"เริ่มด้วยสัญญาณพยายามขอจับคู่ (SYN) ตามด้วยฝั่งรับตกลงส่งคู่กลับ (SYN-ACK) และจบด่านด้วยไคลเอนต์ตอบรับรับทราบ (ACK)","options_th":["SYN -> ACK -> SYN-ACK","SYN -> SYN-ACK -> ACK","คำขอ -> ข้อเสนอ -> รับทราบ","SYN -> FIN-ACK -> ACK"]},{"options":["SYN","FIN","RST","PSH"],"question_en":"Which TCP flag is used to request the graceful termination of an active connection?","question_th":"ธงในส่วนหัว TCP (TCP Flag) ตัวใดที่ระบุคีย์เพื่อใช้ขอจบปิดการเชื่อมต่อเซสชันแบบปกติและเป็นระเบียบ?","correct_index":1,"explanation_en":"The FIN (Finish) flag is set in the TCP header to notify the peer that the sender has finished transmitting data.","explanation_th":"ธง FIN (Finish) ใช้ประกาศขอปิดความสัมพันธ์และหยุดการส่งรับของเครื่องฝั่งนั้นอย่างราบรื่น","options_th":["SYN","FIN","RST","PSH"]},{"options":["The connection is successfully established.","An abrupt, immediate termination of the connection, indicating a host rejected the connection or crashed.","A request to synchronize sequence numbers.","Data payload is being pushed immediately."],"question_en":"What does a TCP Reset (RST) flag indicate when captured in Wireshark?","question_th":"สัญญาณธงสเปกรีเซ็ต (TCP RST flag) บ่งบอกแจ้งข้อขัดข้องเรื่องใดของเซสชันในการตรวจจับผ่าน Wireshark?","correct_index":1,"explanation_en":"RST flags indicate an abrupt closure, often sent when a device receives a packet for a port that is not open or when a socket is suddenly closed.","explanation_th":"แสดงถึงการปิดเซสชันแบบตัดขาดรวดเร็วฉับพลัน (Abrupt termination) ชี้ว่ามีอุปกรณ์ไม่ยอมรับการสื่อสารนั้นหรือโปรเซสพัง","options_th":["สร้างการเชื่อมต่อสำเร็จแล้ว","ตัด Connection ทันทีจาก Reject/Crash","คำขอซิงโครไนซ์หมายเลขลำดับ","เพย์โหลดข้อมูลจะถูกผลักทันที"]},{"options":["It converts them to hexadecimal letters.","It displays them as Relative Sequence Numbers starting from 0, rather than raw 32-bit random values.","It hides them by default.","It translates them into IP addresses."],"question_en":"How does Wireshark represent TCP sequence and acknowledgment numbers to make them easier to analyze?","question_th":"Wireshark ช่วยอำนวยความสะดวกในการจัดแสดงหมายเลขลำดับ (Sequence/Ack numbers) อย่างไรให้วิศวกรอ่านเข้าใจง่าย?","correct_index":1,"explanation_en":"Wireshark calculates relative sequence and ack numbers starting at 0 for each session, simplifying the tracking of packet flows.","explanation_th":"Wireshark จะช่วยแปลงข้อมูลจากตัวเลขดิบ 32 บิตฐานสิบสุ่ม ให้ปรับสเกลตัวเลขนับเริ่มจาก 0 (Relative) เพื่อให้เทียบง่ายว่าตัวนี้คือข้อมูลลำดับที่เท่าใด","options_th":["มันจะแปลงให้เป็นตัวอักษรฐานสิบหก","แสดง Relative Sequence Number เริ่มที่ 0","โดยจะซ่อนไว้ตามค่าเริ่มต้น","มันแปลให้เป็นที่อยู่ IP"]},{"options":["Analyze Traffic","Follow TCP Stream","Decode As","Expert Info"],"question_en":"What Wireshark feature allows you to reconstruct and view the complete text-based dialogue of a TCP session in order?","question_th":"ความสามารถเด่นใดใน Wireshark ที่ช่วยให้ปะติดปะต่อข้อความสนทนาตั้งแต่ต้นจนจบของเซสชัน TCP มาแสดงเป็นบทพูดภาษาคนเรียงกัน?","correct_index":1,"explanation_en":"Right-clicking a TCP packet and selecting ''Follow -> TCP Stream'' rebuilds the sequential data exchange of the session as readable text.","explanation_th":"การคลิกขวาที่แพ็กเก็ตเลือก ''Follow -> TCP Stream'' จะช่วยแกะประวัติและรวมคำพูดรับส่งของคู่เซสชันมารวมแสดงเรียงกันในหน้านิ่งเดียว","options_th":["Analyze Traffic (วิเคราะห์ทราฟฟิก)","Follow TCP Stream (ติดตามสตรีม TCP)","Decode As (ถอดรหัสเป็น)","Expert Info (ข้อมูลผู้เชี่ยวชาญ)"]}]}', NULL),
	('lesson-dev002-03', 'devnet-002', 'Meraki Dashboard API', 'Meraki Dashboard API', '## Cisco Meraki API

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
Meraki API เป็นจุดเริ่มต้นที่ดีสำหรับการเรียน Network Automation เพราะ Documentation ชัดเจนและมี Interactive API Docs ให้ทดลองได้เลย', '## Cisco Meraki API

**What you will learn in this video**
This video teaches how to use the Meraki Dashboard API, one of the easiest Cloud-managed Network APIs available.

**Core Content**
- **Meraki:** Cloud-managed Networks (WiFi, Switches, Security) managed via an online Dashboard.
- **Meraki API Key:** Simple authentication added to the Header: `X-Cisco-Meraki-API-Key`.
- **Common API Examples:**
  - `GET /organizations` → View list of Organizations
  - `GET /networks/{networkId}/devices` → View devices in a network
  - `GET /devices/{serial}/clients` → View connected Clients
- **Webhook:** Receive Real-time Alerts when network events occur.

**Conclusion**
The Meraki API is an excellent starting point for learning Network Automation due to its clear Documentation and Interactive API Docs that allow immediate testing.', 'video', 15, 3, 'https://www.youtube.com/watch?v=XjKrLAGZJzs', '/images/thumbnails/lesson-dev002-03.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["On-premise CLI only.","Cloud-managed IT infrastructure.","Distributed decentralized hub.","Standard SNMP controller."],"question_en":"What is the primary architecture model of Cisco Meraki?","question_th":"รูปแบบโครงสร้างการให้บริการหลักของผลิตภัณฑ์ระบบ Cisco Meraki คือข้อใด?","correct_index":1,"explanation_en":"Cisco Meraki is built on a 100% cloud-managed model where hardware devices connect to a centralized Meraki Dashboard.","explanation_th":"Cisco Meraki ออกแบบและควบคุมในรูปแบบอุปกรณ์ไอทีจัดตั้งผ่านระบบคลาวด์ (Cloud-managed) เชื่อมตรงหาศูนย์กลาง Dashboard เดียว","options_th":["CLI ภายในองค์กรเท่านั้น","โครงสร้าง IT ที่บริหารผ่าน Cloud","ศูนย์กลางการกระจายอำนาจแบบกระจาย","ตัวควบคุม SNMP มาตรฐาน"]},{"options":["By sending SSH commands to the device directly.","Via the Meraki Dashboard REST API.","Through serial connection interface.","By using telnet scripting."],"question_en":"How do developers interact with Cisco Meraki programmatically?","question_th":"นักพัฒนาจะสามารถส่งคำสั่งสั่งงานระบบบริหารของ Cisco Meraki ผ่านโปรแกรมได้อย่างไร?","correct_index":1,"explanation_en":"Meraki provides comprehensive REST APIs that allow provisioning, monitoring, and configuring networks via HTTPS.","explanation_th":"Meraki มีบริการระบบ REST API ที่รองรับการสั่งสแกนประวัติ ปรับแต่งค่า และตรวจสอบสภาพเครือข่ายผ่าน HTTPS จากสคริปต์ภายนอก","options_th":["โดยการส่งคำสั่ง SSH ไปยังอุปกรณ์โดยตรง","ผ่าน Meraki Dashboard REST API","ผ่านอินเทอร์เฟซการเชื่อมต่อแบบอนุกรม","โดยใช้สคริปต์เทลเน็ต"]},{"options":["To reboot the routers weekly.","To send real-time alerts or event notifications from Meraki Dashboard to external receiver URLs.","To update the software version of access points.","To encrypt physical Ethernet cables."],"question_en":"What is the purpose of the Meraki Webhook API?","question_th":"เป้าหมายการทำงานของระบบ Meraki Webhook API คือข้อใด?","correct_index":1,"explanation_en":"Webhooks allow Meraki Dashboard to push event alerts (like device offline or high latency) to external services immediately.","explanation_th":"Webhook ใช้ให้ Meraki ยิงข้อความประกาศเตือนภัยเร่งด่วนแบบเรียลไทม์ (เช่น อุปกรณ์ล่ม) พุ่งเข้าหา URL ปลายทางภายนอกทันที","options_th":["เพื่อรีบูตเราเตอร์ทุกสัปดาห์","ส่ง Event จาก Meraki Dashboard ไปยัง Receiver URL","เพื่ออัพเดตเวอร์ชันซอฟต์แวร์ของจุดเข้าใช้งาน","เพื่อเข้ารหัสสายเคเบิลอีเธอร์เน็ตแบบฟิสิคัล"]},{"options":["Authorization: Bearer <token>","X-Cisco-Meraki-API-Key: <key>","X-Auth-Token","API-Key"],"question_en":"Which API header is required to authenticate requests against the Meraki Dashboard API?","question_th":"ข้อมูลในหัวข้อ Header ใดของ HTTP ที่ต้องแนบไปในการเรียกใช้งานเพื่อพิสูจน์ยืนยันตัวตนกับระบบ Meraki API?","correct_index":1,"explanation_en":"Meraki REST API calls require the ''X-Cisco-Meraki-API-Key'' custom header containing the user''s API token.","explanation_th":"ในการเรียกใช้ Meraki API จำเป็นต้องระบุคีย์เวิร์ดใน Header เป็น ''X-Cisco-Meraki-API-Key'' พร้อมแปะตัวรหัสสิทธิ์ประกอบ","options_th":["Authorization: Bearer <token>","X-Cisco-Meraki-API-Key: <key>","X-Auth-Token","API-Key"]},{"options":["XML","JSON","YAML","HTML"],"question_en":"In what format are Meraki API payloads exchanged?","question_th":"ข้อมูล Payload ที่แลกเปลี่ยนผ่าน Meraki API ส่งรับกันอยู่ในไฟล์รูปแบบใด?","correct_index":1,"explanation_en":"Like most modern REST APIs, Cisco Meraki uses JSON formatted payloads for all requests and responses.","explanation_th":"เมรากิใช้รูปแบบไฟล์ประเภท JSON ในทุกๆ การส่งรับพารามิเตอร์ข้อมูลผ่านสเปก REST API ของตน","options_th":["XML","JSON","YAML","HTML"]}]}', NULL),
	('lesson-sec002-03', 'sec-002', 'Site-to-Site VPN Configuration', 'Site-to-Site VPN Configuration', '## Site-to-Site VPN Configuration

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
Lab นี้ช่วยให้เห็นภาพรวมการทำงานของ IPsec VPN จริงๆ ซึ่งเป็นสิ่งที่ออกข้อสอบ CCNA เสมอและใช้งานจริงในทุกองค์กร', '## Site-to-Site VPN Configuration

**What you will learn in this video**
This video teaches the step-by-step process of configuring an IPsec Site-to-Site VPN on a Cisco Router.

**Core Content**
- **5 Configuration Steps:**
  1. Define IKE Policy (Encryption, Hashing, DH Group, Lifetime)
  2. Set Pre-shared Key: `crypto isakmp key <password> address <peer-IP>`
  3. Create IPsec Transform Set: `crypto ipsec transform-set`
  4. Define Traffic to encrypt using a Crypto ACL
  5. Create and attach a Crypto Map to an Interface
- **Verification:** `show crypto isakmp sa`, `show crypto ipsec sa`

**Conclusion**
This Lab gives a real-world overview of how IPsec VPN works, which is frequently tested in CCNA and used practically in every organization.', 'video', 10, 3, 'https://www.youtube.com/watch?v=CWy3x3Wux6o', '/images/thumbnails/lesson-sec002-03.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["To block hackers from accessing the router console.","To define the specific traffic (interesting traffic) that must be encrypted and sent through the VPN tunnel.","To assign private IP addresses to LAN hosts.","To configure dynamic routing protocol updates."],"question_en":"What is the function of the Crypto ACL (Access Control List) in a Cisco router site-to-site IPsec VPN configuration?","question_th":"ตาราง Crypto ACL ทำหน้าที่สำคัญอย่างไรในขั้นตอนคอนฟิกจับคู่ VPN แบบ Site-to-Site บนเราเตอร์ Cisco?","correct_index":1,"explanation_en":"Crypto ACLs match packets (interesting traffic) destined for the remote VPN network. Traffic matching ''permit'' triggers tunnel negotiation and is encrypted.","explanation_th":"Crypto ACL ใช้กำหนดกลุ่มข้อมูลที่ต้องเข้ารหัส (Interesting Traffic) หากข้อมูลตรงกติกาที่เลือกไว้จะกระตุ้นให้อุปกรณ์เริ่มยิงท่อสิทธิ์","options_th":["เพื่อบล็อกแฮกเกอร์ไม่ให้เข้าถึงคอนโซลของเราเตอร์","ระบุ Traffic ที่ต้องเข้ารหัสผ่าน VPN Tunnel","เพื่อกำหนดที่อยู่ IP ส่วนตัวให้กับโฮสต์ LAN","เพื่อกำหนดค่าการอัปเดตโปรโตคอลการกำหนดเส้นทางแบบไดนามิก"]},{"options":["crypto isakmp policy <priority>","crypto ipsec transform-set <name>","crypto map <name> <sequence>","ike phase1 policy <priority>"],"question_en":"What is the command to create an IKE Phase 1 policy on a Cisco IOS router?","question_th":"คำสั่งตั้งต้นในการสร้างนโยบายความปลอดภัย IKE Phase 1 (ISAKMP) บนอุปกรณ์เราเตอร์ Cisco IOS คือข้อใด?","correct_index":0,"explanation_en":"The command ''crypto isakmp policy <number>'' enters the ISAKMP policy configuration mode to define Phase 1 encryption, hash, and DH parameters.","explanation_th":"สั่งงานด้วยชุดคำสั่ง ''crypto isakmp policy <number>'' เพื่อเริ่มระบุระดับค่านโยบายความปลอดภัยและเกณฑ์พิสูจน์สิทธิ์ของด่านแรก","options_th":["crypto isakmp policy <priority>","crypto ipsec transform-set <name>","crypto map <name> <sequence>","ike phase1 policy <priority>"]},{"options":["The peer IP address and connection password.","The encryption and authentication algorithms (like esp-aes and esp-sha-hmac) for Phase 2 data transit.","The interface IP addresses.","The OSPF cost parameters."],"question_en":"What is configured in an IPsec Transform Set?","question_th":"องค์ประกอบใดที่จะต้องกำหนดค่าไว้ในชุดเปลี่ยนผ่านข้อมูล (IPsec Transform Set)?","correct_index":1,"explanation_en":"An IPsec transform set specifies the exact security protocols and algorithms (ESP encryption/hashing) to protect user data in Phase 2.","explanation_th":"Transform Set ใช้กำหนดระบุชุดกลไกการเข้ารหัสพรางข้อมูลและแฮชความถูกต้อง (เช่น esp-aes, esp-sha-hmac) สำหรับขาส่งจริงใน Phase 2","options_th":["ที่อยู่ IP เพียร์และรหัสผ่านการเชื่อมต่อ","กำหนด ESP Encryption/Auth สำหรับ Phase 2","ที่อยู่ IP ของอินเทอร์เฟซ","พารามิเตอร์ต้นทุน OSPF"]},{"options":["ISAKMP Policy","Crypto Map","Tunnel Interface","Security Association"],"question_en":"Which configuration component binds the Crypto ACL, peer IP, and Transform Set together before being applied to a physical interface?","question_th":"ส่วนประกอบคอนฟิกใดทำหน้าที่ควบรวมหัวข้อ Crypto ACL, IP คู่เป้าหมาย และ Transform Set เข้าด้วยกันเพื่อเอาไปพ่นผูกกับพอร์ตขาออก?","correct_index":1,"explanation_en":"A Crypto Map ties the interesting traffic (ACL), peer IP, and transform-set together. The map is then applied to the exit interface.","explanation_th":"Crypto Map ทำหน้าที่รวบดึงเงื่อนไขทราฟฟิก คีย์ปลายทาง และตัวจัดส่งรวมมาไว้ที่จุดเดียวเพื่อเอาไปจับผูกติดไว้ที่พอร์ตอินเตอร์เฟสจริง","options_th":["นโยบาย ISAKMP","Crypto Map","Tunnel Interface","Security Association (SA)"]},{"options":["show crypto isakmp sa","show crypto ipsec sa","show crypto map active","show ipsec tunnel status"],"question_en":"What is the verification command to check the status of IPsec Security Associations (SAs) active on a Cisco router?","question_th":"คำสั่งสืบค้นประวัติเพื่อยืนยันสถานะความสำเร็จของท่อเชื่อมต่อ IPsec SA บนเราเตอร์ Cisco คือข้อใด?","correct_index":1,"explanation_en":"The command ''show crypto ipsec sa'' displays the parameters of active Phase 2 IPsec SAs, including packets encrypted/decrypted.","explanation_th":"คำสั่ง ''show crypto ipsec sa'' ใช้ดูรายงานสรุปความคืบหน้าของเฟส 2 ซึ่งมีประวัติจำนวนตัวนับการเข้ารหัสและถอดรหัสของแพ็กเก็ตจริง","options_th":["show crypto isakmp sa","show crypto ipsec sa","show crypto map active","show ipsec tunnel status"]}]}', NULL),
	('lesson-sec002-04', 'sec-002', 'SSL VPN และ AnyConnect', 'SSL VPN and AnyConnect', '## SSL VPN and AnyConnect

**บทนำ**
ในยุคการทำงานทางไกล (Remote Work) VPN เป็นเครื่องมือที่สำคัญ SSL VPN เป็นเทคโนโลยีที่ช่วยให้ผู้ใช้งานภายนอกเชื่อมต่อเข้ามายังเครือข่ายองค์กรได้อย่างปลอดภัยผ่านโปรโตคอล TLS/SSL

**รูปแบบของ SSL VPN**
- **Clientless SSL VPN:** เข้าถึงผ่านเว็บเบราว์เซอร์ ไม่ต้องติดตั้งโปรแกรม เหมาะสำหรับการเข้าถึงเว็บแอปพลิเคชันภายใน
- **Client-based SSL VPN:** ต้องใช้ซอฟต์แวร์เช่น **Cisco AnyConnect Secure Mobility Client** ซึ่งจะจำลองการเชื่อมต่อเสมือนว่าคอมพิวเตอร์นั้นนั่งอยู่ในออฟฟิศจริงๆ (ได้ IP จากวงภายใน)

**จุดเด่นของ Cisco AnyConnect**
นอกจากฟังก์ชัน VPN แล้ว AnyConnect ยังสามารถตรวจสอบความปลอดภัยของเครื่องไคลเอนต์ (Posture Assessment) เช่น ต้องมีแอนตี้ไวรัส หรืออัปเดต Windows ล่าสุดก่อน ถึงจะยอมให้เชื่อมต่อ

**สรุป**
SSL VPN ใช้งานง่ายกว่า IPsec VPN แบบดั้งเดิมมาก เนื่องจากไม่ต้องกังวลเรื่องการตั้งค่าพอร์ตบนฝั่งผู้ใช้งาน และ AnyConnect ช่วยยกระดับความปลอดภัยให้องค์กรได้อย่างดีเยี่ยม', '## SSL VPN and AnyConnect

**Introduction**
In the Remote Work era, VPN is a critical tool. SSL VPN is a technology that allows external users to securely connect to the corporate network via TLS/SSL protocols.

**Types of SSL VPN**
- **Clientless SSL VPN:** Accessed via a Web Browser with no software installation required. Ideal for accessing internal web applications.
- **Client-based SSL VPN:** Requires software like the **Cisco AnyConnect Secure Mobility Client**, which simulates a connection as if the computer were physically in the office (obtains an internal IP).

**Cisco AnyConnect Highlights**
Beyond VPN functions, AnyConnect can perform Posture Assessment on the client machine, such as requiring Antivirus or the latest Windows updates before allowing connection.

**Conclusion**
SSL VPN is much easier to use than traditional IPsec VPNs since users don''t have to worry about port settings, and AnyConnect significantly elevates enterprise security.', 'reading', 2, 4, NULL, '/images/thumbnails/lesson-sec002-04.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["SSL VPNs do not require encryption.","SSL VPNs can be clientless (running natively within standard web browsers) and easily traverse NAT/firewalls via HTTPS (port 443).","SSL VPNs are developed by Cisco only.","SSL VPNs run over serial cable interfaces."],"question_en":"What is a major advantage of SSL VPNs over traditional IPsec VPNs for remote access users?","question_th":"ข้อดีที่โดดเด่นของการเลือกใช้ระบบ SSL VPN แทนที่ระบบ IPsec VPN แบบเดิมในหมวดบริการพนักงานทางไกลคืออะไร?","correct_index":1,"explanation_en":"SSL VPNs operate over TCP port 443 (HTTPS) which is almost always open in firewalls, and can support portal-based clientless access without client installs.","explanation_th":"SSL VPN สื่อสารผ่านพอร์ต HTTPS 443 ซึ่งส่วนใหญ่เกตเวย์จะเปิดทิ้งไว้ให้อยู่แล้ว และสามารถเข้าใช้งานผ่านหน้าเบราว์เซอร์ได้ทันทีโดยไม่ต้องรันโปรแกรมเสริม","options_th":["SSL VPN ไม่ต้องการการเข้ารหัส","ใช้ผ่าน Browser/HTTPS 443 และผ่าน NAT/Firewall ง่าย","SSL VPN ได้รับการพัฒนาโดย Cisco เท่านั้น","SSL VPN ทำงานผ่านอินเทอร์เฟซเคเบิลแบบอนุกรม"]},{"options":["A virtual router simulator.","A unified security client application used to establish secure remote access SSL or IPsec VPN tunnels to Cisco gateways.","A database manager.","A network cabling tool."],"question_en":"What is Cisco AnyConnect?","question_th":"Cisco AnyConnect คือซอฟต์แวร์ประเภทใด?","correct_index":1,"explanation_en":"Cisco AnyConnect Secure Mobility Client is the application installed on user machines to establish full-tunnel SSL/IPsec VPNs.","explanation_th":"เป็นโปรแกรมซอฟต์แวร์ไคลเอนต์ปลายทางที่ติดตั้งบนคอมพิวเตอร์พนักงานเพื่อทำการสร้างท่อ VPN เต็มพิกัดเชื่อมหาเกตเวย์ของ Cisco","options_th":["เครื่องจำลองเราเตอร์เสมือน","Cisco Client สำหรับ Remote SSL/IPsec VPN","ผู้จัดการฐานข้อมูล","เครื่องมือสายเคเบิลเครือข่าย"]},{"options":["Clientless requires installing Cisco AnyConnect; Client-based does not.","Clientless only grants access to specific web resources via a browser portal; Client-based installs a virtual network adapter providing full network-level access.","Clientless is more secure.","Client-based only supports IPv6."],"question_en":"What is the difference between Clientless SSL VPN and Client-based (Full-Tunnel) SSL VPN?","question_th":"ความต่างระหว่างบริการระบบ Clientless SSL VPN และ Client-based (Full-Tunnel) คือข้อใด?","correct_index":1,"explanation_en":"Clientless SSL VPN displays applications in a web portal. Client-based SSL VPN runs software to create a virtual NIC, routing all PC IP traffic through the tunnel.","explanation_th":"Clientless จะจำกัดเข้าใช้เฉพาะเว็บแอปที่ผูกไว้บนพอร์ทัลเบราว์เซอร์ ส่วน Client-based จะลงการ์ดจอเสมือนทำให้พาสื่อสารได้ทุกโปรแกรมระดับไอพี","options_th":["Clientless ต้องติดตั้ง Cisco AnyConnect แต่ Client-based ไม่ต้องติดตั้ง","Clientless ใช้ Web Portal ส่วน Client-based เข้าถึงได้ทั้งเครือข่าย","Clientless ปลอดภัยกว่าเสมอ","Client-based รองรับเฉพาะ IPv6"]},{"options":["UDP Port 500","TCP Port 443","TCP Port 22","UDP Port 4500"],"question_en":"What transport-layer protocol and port does SSL/TLS VPN rely on by default?","question_th":"โปรโตคอลระดับเลเยอร์ขนส่งและพอร์ตหมายเลขใดที่ระบบ VPN ในรูปแบบ SSL/TLS ยึดเกณฑ์สื่อสารเป็นหลัก?","correct_index":1,"explanation_en":"SSL/TLS VPNs utilize TCP port 443, sharing the same port as secure web traffic (HTTPS).","explanation_th":"SSL/TLS VPN จะเรียกส่งข้อมูลผ่าน TCP พอร์ต 443 ซึ่งเป็นหมายเลขเดียวกับการเปิดหน้าเว็บไซต์แบบปลอดภัยปกติ (HTTPS)","options_th":["พอร์ต UDP 500","พอร์ต TCP 443","พอร์ต TCP 22","พอร์ต UDP 4500"]},{"options":["Splitting a single physical link into two virtual switches.","Allowing corporate-bound traffic to go through the VPN tunnel while general internet traffic goes directly out of the local gateway.","Enforcing all computer traffic to traverse the VPN tunnel.","Using two internet service providers simultaneously."],"question_en":"What is a Split Tunneling configuration in remote access VPNs?","question_th":"การตั้งค่าแยกท่อข้อมูล (Split Tunneling) ในคอนฟิกระบบ VPN ระยะไกลหมายถึงการทำงานแบบใด?","correct_index":1,"explanation_en":"Split tunneling permits encrypting only company-destined traffic via the tunnel, allowing personal browsing to use the home internet directly, saving corporate bandwidth.","explanation_th":"คือการแยกเส้นทางให้ทราฟฟิกเป้าหมายบริษัทวิ่งเข้าท่อลัด ส่วนการเปิดเล่นเน็ตทั่วไปให้ยิงออกอินเทอร์เน็ตบ้านตรงเพื่อประหยัดแบนด์วิดท์ฝั่งบริษัท","options_th":["แบ่งลิงก์จริงหนึ่งเส้นเป็นสวิตช์เสมือนสองตัว","ส่งทราฟฟิกองค์กรผ่าน VPN ส่วนอินเทอร์เน็ตทั่วไปออก Local Gateway","บังคับให้ทราฟฟิกทั้งหมดผ่าน VPN Tunnel","ใช้ผู้ให้บริการอินเทอร์เน็ตสองรายพร้อมกัน"]}]}', NULL),
	('lesson-ts002-01', 'troubleshoot-002', 'Troubleshooting Methodology', 'Troubleshooting Methodology', '## Troubleshooting Methodology (วิธีการแก้ปัญหาเครือข่าย)

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
Troubleshooting ที่ดีต้องมีระบบ ไม่ใช่การสุ่มลองไปเรื่อยๆ วิศวกรที่ดีสามารถแก้ปัญหาในนาทีแทนที่จะใช้ชั่วโมง', '## Troubleshooting Methodology

**What you will learn in this video**
This video teaches a systematic Troubleshooting process, the skill that separates novice engineers from the pros.

**Core Content**
- **Structured Approach:** Solve problems Bottom-Up (from lower layers) or Top-Down (from application level).
- **OSI Model as Framework:** Test layer by layer, e.g., Layer 1 (Is the cable unplugged?) → Layer 2 (Is the MAC correct?) → Layer 3 (Is the IP reachable?).
- **Basic Tools:**
  - `ping` / `traceroute` to check Connectivity
  - `show ip interface brief` to view Interface status
  - `show ip route` to check Routing Table
- **Documentation:** Always document what was tested and the results.

**Conclusion**
Good Troubleshooting must be systematic, not random guessing. A great engineer can resolve issues in minutes rather than hours.', 'video', 7, 1, 'https://www.youtube.com/watch?v=1i3XdhC2ZAs', '/images/thumbnails/lesson-ts002-01.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["Replace the core switch hardware.","Define / Identify the problem clearly by gathering symptoms.","Reboot the router.","Modify the OSPF cost values."],"question_en":"What is the first step in a structured network troubleshooting methodology?","question_th":"ขั้นตอนแรกสุดตามทฤษฎีกระบวนการแก้ไขปัญหาเครือข่ายอย่างเป็นระบบคืออะไร?","correct_index":1,"explanation_en":"The troubleshooting loop starts with identifying the problem by gathering symptoms and isolating the scope of the fault.","explanation_th":"ต้องระบุปัญหาและรวบรวมอาการขัดข้องเบื้องต้น (Define/Identify) เพื่อประเมินของเขตข้อเสียให้แน่ชัดก่อนเริ่มสุ่มทำสิ่งอื่น","options_th":["เปลี่ยนฮาร์ดแวร์สวิตช์หลัก","รวบรวมอาการแล้วระบุปัญหาให้ชัด","รีบูทเราเตอร์","แก้ไขมูลค่าต้นทุน OSPF"]},{"options":["It uses fewer command lines.","It allows you to start testing at a middle layer (e.g., Layer 3 or 4) to quickly isolate whether the issue lies in upper or lower layers.","It requires no technical knowledge.","It automatically fixes switch ports."],"question_en":"Why is the ''Divide-and-Conquer'' troubleshooting approach highly recommended?","question_th":"ทำไมการแก้ไขปัญหาในแบบแนวทาง ''แบ่งแยกเพื่อแก้ไข'' (Divide-and-Conquer) จึงได้รับการแนะนำอย่างยิ่ง?","correct_index":1,"explanation_en":"By testing at Layer 3 (ping), you can isolate: if successful, the issue is in layers 4-7; if unsuccessful, check layers 1-2, saving diagnostic time.","explanation_th":"เพราะช่วยสกัดจุดเสียได้เร็วโดยเริ่มทดสอบจากเลเยอร์กลางๆ (เช่น ชั้นที่ 3) หากปิงผ่าน แปลว่าปัญหามักอยู่เลเยอร์บน หากปิงไม่ติด ก็ค่อยไปเช็คสายฟิสิคัล","options_th":["ใช้บรรทัดคำสั่งน้อยลง","เริ่ม Layer กลางเพื่อแยกปัญหาบน/ล่าง","ไม่จำเป็นต้องมีความรู้ด้านเทคนิค","มันจะแก้ไขพอร์ตสวิตช์โดยอัตโนมัติ"]},{"options":["Top-down approach","Bottom-up approach","Divide-and-conquer","Follow-the-path"],"question_en":"Which troubleshooting strategy starts at OSI Layer 1 (Physical) and moves upward to Layer 7?","question_th":"แนวทางการแก้ปัญหาเครือข่ายชนิดใดที่เริ่มต้นตรวจสอบจากระดับกายภาพ Layer 1 (สายเคเบิล/พอร์ตไฟ) ไล่เรียงขึ้นไปจนถึง Layer 7?","correct_index":1,"explanation_en":"The bottom-up strategy verifies physical connections first (cables, link lights), then progresses layer-by-layer up the OSI stack.","explanation_th":"แนวทางแบบจากล่างขึ้นบน (Bottom-up) เป็นการสแกนตรวจตั้งแต่สายแลนและการเช็คไฟลิงก์สถานะทางกายภาพก่อน แล้วค่อยขยับไปเช็ค Layer สูงขึ้น","options_th":["แนวทางจากบนลงล่าง","แนวทางจากล่างขึ้นบน","Divide-and-Conquer (แบ่งปัญหาแล้วพิชิต)","Follow-the-Path (ไล่ตรวจตามเส้นทาง)"]},{"options":["It ignores the OSI model entirely.","It traces the actual physical and logical path of packets from source to destination, checking each hop.","It updates the router software version.","It bypasses firewalls dynamically."],"question_en":"What is the main benefit of the ''Follow-the-Path'' troubleshooting technique?","question_th":"ประโยชน์สำคัญของการแก้ไขจุดบกพร่องตามเทคนิคแบบ ''เดินตามรอยเส้นทาง'' (Follow-the-Path) คือข้อใด?","correct_index":1,"explanation_en":"Follow-the-path traces the hop-by-hop path of a packet (e.g. using traceroute), diagnosing interface configurations sequentially along the flow.","explanation_th":"เป็นการสืบแกะรอยตามสายการเดินทางข้อมูล (เช่น ใช้ traceroute) เพื่อไปไล่เช็คความถูกต้องทีละอุปกรณ์ระหว่างทางจนถึงปลายทาง","options_th":["โดยจะละเว้นโมเดล OSI โดยสิ้นเชิง","ไล่ตรวจแต่ละ Hop จากต้นทางถึงปลายทาง","จะอัพเดตเวอร์ชันซอฟต์แวร์เราเตอร์","มันข้ามไฟร์วอลล์แบบไดนามิก"]},{"options":["Shut down the active routers.","Document the problem symptoms, root cause, and steps taken to resolve it for future reference.","Delete the syslog files.","Change the BGP AS numbers."],"question_en":"What should you do immediately after successfully resolving a network issue?","question_th":"ขั้นตอนที่ผู้ดูแลระบบต้องดำเนินการทันทีหลังคลี่คลายแก้ไขปัญหาเครือข่ายสำเร็จลุล่วงด้วยดีคือข้อใด?","correct_index":1,"explanation_en":"Documenting resolutions preserves knowledge, helps other team members solve similar issues, and maintains accurate system history.","explanation_th":"ทำเอกสารสรุปอาการ จุดบกพร่อง และวิธีที่เราปราบจุดเสียเก็บไว้ (Document) เพื่อใช้ศึกษาอ้างอิงย้อนดูหากเกิดซ้ำอีกในอนาคต","options_th":["ปิดเราเตอร์ที่ใช้งานอยู่","บันทึกปัญหา สาเหตุ และวิธีแก้","ลบไฟล์ syslog","เปลี่ยนหมายเลข BGP AS"]}]}', NULL),
	('lesson-ts002-02', 'troubleshoot-002', 'Debug Commands และ Show Commands', 'Debug and Show Commands', '## Debug Commands (คำสั่ง Debug บน Cisco)

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
Debug เป็นเครื่องมือ Troubleshoot ที่ทรงพลังแต่อันตราย ควรใช้นอกเวลาทำการหรือบน Lab Environment เท่านั้น', '## Debug Commands (On Cisco)

**What you will learn in this video**
This video teaches how to use the `debug` command on Cisco IOS safely and effectively.

**Core Content**
- **Important Debug Commands:**
  - `debug ip routing` View Routing Table changes in Real-time
  - `debug ip ospf events` View OSPF Neighbor Events
  - `debug ip icmp` View ICMP Packets in Real-time (Warning! High CPU usage)
  - `debug crypto isakmp` Debug VPN Phase 1
- **⚠️ Caution:** Debugging on Production Routers requires extreme care as it can cause 100% CPU spikes and crash the Router.
- **Turn off Debug:** `undebug all` or `no debug all`
- **Conditional Debug:** `debug ip packet detail access-list <ACL>` filters only specific Traffic.

**Conclusion**
Debug is a powerful but dangerous Troubleshooting tool. It should only be used outside business hours or in a Lab Environment.', 'video', 15, 2, 'https://www.youtube.com/watch?v=rurs7cdT5cc', '/images/thumbnails/lesson-ts002-02.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["show modifies the config; debug does not.","show displays static snapshots of configuration/state; debug provides real-time monitoring and event alerts as they occur, which consumes significant CPU resources.","show requires administrator privileges; debug does not.","They are identical commands."],"question_en":"What is the difference between ''show'' and ''debug'' commands on Cisco IOS devices?","question_th":"ความต่างระหว่างการใช้งานคำสั่ง ''show'' และคำสั่ง ''debug'' บนอุปกรณ์ Cisco IOS คืออะไร?","correct_index":1,"explanation_en":"Show commands present current database snapshots. Debug commands output real-time process details, but can cause CPU spikes and crashes if run on busy systems.","explanation_th":"show จะดึงภาพนิ่งของสถานะระบบออกมาแสดง ส่วน debug เป็นการรายงานการทำงานสดๆ บน CPU ซึ่งจะกินทรัพยากรประมวลผลสูงมาก","options_th":["show modifies the config; debug does not.","show ดู Snapshot; debug ดู Event Real-time และใช้ CPU สูง","show requires administrator privileges; debug does not.","เป็นคำสั่งที่เหมือนกัน"]},{"options":["undebug all (or no debug all)","debug off","stop debugging","no debug"],"question_en":"What command is used to disable all active debug commands instantly on a Cisco router?","question_th":"คำสั่งใดใช้ยกเลิกการรันคำสั่ง debug ทั้งหมดที่กำลังทำงานอยู่บนตัวเราเตอร์ให้หยุดทำงานทันที?","correct_index":0,"explanation_en":"The shortcut ''undebug all'' (or ''u all'') immediately terminates all active debug outputs.","explanation_th":"ใช้คำสั่งลัด ''undebug all'' (หรือป้อนสั้นๆ ''u all'') เพื่อเคลียร์คำสั่งสแกนดีบั๊กทั้งหมดที่รันคาอยู่ให้หยุดทำงานลงทันที","options_th":["undebug all (or no debug all)","debug off","stop debugging","no debug"]},{"options":["It will delete the IP address configuration.","It generates excessive console messages, which can overwhelm the router CPU and cause the device to crash.","It disables the physical interfaces.","It requires a software reboot."],"question_en":"Why should you avoid running broad debug commands (like ''debug ip packet'') on a high-traffic production router?","question_th":"ทำไมวิศวกรจึงหลีกเลี่ยงการสั่งรัน debug ที่หว่านประมวลผลกว้าง (เช่น debug ip packet) บนเราเตอร์ใช้งานจริงที่มีทราฟฟิกสูง?","correct_index":1,"explanation_en":"Broad debugs generate CPU interrupts for every packet. On busy links, this will cause 100% CPU usage, locking out management and crashing services.","explanation_th":"เพราะการสั่ง debug ทุกแพ็กเก็ตจะแย่งพลังประมวลผลของ CPU มาพ่นข้อความออกทางคอนโซล ส่งผลให้เราเตอร์ค้างและเน็ตเวิร์กสายนั้นล่มทันที","options_th":["มันจะลบการกำหนดค่าที่อยู่ IP","Log มากจน CPU ล้นและ Router อาจล่ม","มันปิดการใช้งานอินเทอร์เฟซทางกายภาพ","จำเป็นต้องรีบูทซอฟต์แวร์"]},{"options":["logging console","terminal monitor","show logging","logging monitor"],"question_en":"What command configures the router to display debug message outputs on an active SSH/Telnet terminal session?","question_th":"คำสั่งใดสั่งการเราเตอร์ให้พ่นข้อความรายงาน debug หรือ log ออกมาแสดงบนหน้าจอควบคุมที่รีโมทผ่าน SSH/Telnet?","correct_index":1,"explanation_en":"By default, debug outputs only show on the physical console port. The ''terminal monitor'' command redirects logs to virtual SSH/Telnet sessions.","explanation_th":"ต้องใช้คำสั่ง ''terminal monitor'' เพื่อขอให้ระบบช่วยดึงข้อความ debug ออกมาแสดงที่หน้าจอจำลอง (VTY) เพราะค่าเริ่มต้นจะโชว์แค่ที่สายต่อตรง Console","options_th":["logging console","terminal monitor","show logging","logging monitor"]},{"options":["show logging","show debug","show history","show syslog"],"question_en":"Which command displays the general status, logging buffer size, and configured syslog server destination details?","question_th":"คำสั่งใดดึงรายงานสรุปผลการเก็บ log ขนาดบันทึกในบัฟเฟอร์ และไอพีของ Syslog Server ปลายทางออกมาให้สืบค้น?","correct_index":0,"explanation_en":"The ''show logging'' command outputs statistics about the logging setup, buffer status, and log messages stored in the local RAM buffer.","explanation_th":"คำสั่ง ''show logging'' แสดงสถานะระบบควบคุม log ปริมาณข้อความในบัฟเฟอร์ และบันทึกเหตุการณ์ประวัติล่าสุดในตัวอุปกรณ์","options_th":["show logging","show debug","show history","show syslog"]}]}', NULL),
	('lesson-ts002-03', 'troubleshoot-002', 'Syslog และ Logging Analysis', 'Syslog and Logging Analysis', '## Syslog Analysis (การวิเคราะห์ Log เครือข่าย)

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
Syslog คือ "กล่องดำ" ของเครือข่าย หากไม่มีการ Log ที่ดี การหาต้นเหตุของปัญหาหลังเกิดเหตุจะเป็นไปไม่ได้เลย', '## Syslog Analysis

**What you will learn in this video**
This video teaches how to read and analyze Syslog Messages from Cisco devices to find the root cause of problems.

**Core Content**
- **Syslog Message Format:** `%Facility-Severity-Mnemonic: Description`
  - Example: `%LINK-3-UPDOWN: Interface GigabitEthernet0/0, changed state to down`
- **Important Severity Levels:**
  - Level 0 (Emergency), Level 2 (Critical), Level 3 (Error), Level 4 (Warning), Level 7 (Debug)
- **Log Destinations:** Console, VTY (Terminal), Buffer (RAM), Syslog Server
- Configuration: `logging host 192.168.1.100`, `logging trap informational`
- **Log Correlation:** Cross-referencing Logs from multiple devices to find simultaneous events (Requires NTP!).

**Conclusion**
Syslog is the "Black Box" of a network. Without good Logging, finding the root cause of an issue post-incident is virtually impossible.', 'video', 12, 3, 'https://www.youtube.com/watch?v=BMVHHX02T4Q', '/images/thumbnails/lesson-ts002-03.jpg', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["It increases the transmission speed of network cables.","It provides centralized, permanent storage of events from all devices, allowing easier correlation, auditing, and log retention even if a device fails.","It automatically encrypts target routers.","It disables the need for administrative accounts."],"question_en":"What is the primary benefit of sending syslog messages to a centralized Syslog Server?","question_th":"ประโยชน์หลักของการส่งรายงานบันทึกเหตุการณ์เครือข่ายไปยังเครื่องเซิร์ฟเวอร์ Syslog ส่วนกลางคืออะไร?","correct_index":1,"explanation_en":"Centralizing logs ensures event logs survive local hardware reboots/crashes, and allows security teams to correlate alerts across multiple nodes.","explanation_th":"ช่วยรวบรวมประวัติเหตุการณ์ไว้ที่ส่วนกลางอย่างปลอดภัย เพื่อให้ทีมวิเคราะห์ประมวลความเกี่ยวโยงของความบกพร่องได้ง่ายและมีประวัติอยู่แม้ตัวระบบจะพัง","options_th":["จะเพิ่มความเร็วในการรับส่งข้อมูลของสายเคเบิลเครือข่าย","เก็บ Log ทุกอุปกรณ์ส่วนกลางเพื่อ Correlate/Audit","มันจะเข้ารหัสเราเตอร์เป้าหมายโดยอัตโนมัติ","มันปิดการใช้งานความต้องการบัญชีผู้ดูแลระบบ"]},{"options":["logging 192.168.1.100 (or logging host 192.168.1.100)","syslog-server 192.168.1.100","ip logging server 192.168.1.100","send logging 192.168.1.100"],"question_en":"Which Cisco command is used to direct syslog messages to a central syslog server at IP 192.168.1.100?","question_th":"คำสั่งใดของ Cisco ที่ใช้ส่งต่อประวัติบันทึกเหตุการณ์ (Syslog) ไปจัดเก็บบนเซิร์ฟเวอร์ส่วนกลางไอพี 192.168.1.100?","correct_index":0,"explanation_en":"The command ''logging <ip>'' or ''logging host <ip>'' in global configuration mode specifies a remote syslog collector server.","explanation_th":"ในโหมด Global Config ให้ป้อนคำสั่ง ''logging 192.168.1.100'' เพื่อระบุเป้าหมายเซิร์ฟเวอร์เก็บประวัติภายนอก","options_th":["logging 192.168.1.100 (or logging host 192.168.1.100)","syslog-server 192.168.1.100","ip logging server 192.168.1.100","send logging 192.168.1.100"]},{"options":["logging trap warnings","logging trap 4 (or logging trap warnings)","logging level warnings","syslog filter level 4"],"question_en":"What command restricts the logs sent to a syslog server to only levels 0 through 4 (warnings and more severe)?","question_th":"คำสั่งใดใช้จำกัดความรุนแรงของรายงานที่จะถูกคัดส่งไปที่เซิร์ฟเวอร์เฉพาะระดับความเสี่ยง 0 ถึง 4 (ระดับ Warning ขึ้นไป)?","correct_index":1,"explanation_en":"The ''logging trap <level-name | level-number>'' command restricts sent logs to the specified severity level and higher (numerically lower). Warnings level is 4.","explanation_th":"คำสั่ง ''logging trap 4'' หรือคำว่า ''logging trap warnings'' จะกรองส่งประวัติเฉพาะระดับความรุนแรงเลข 0-4 เพื่อไม่ให้ขยะข้อความทั่วไปรกระบบ","options_th":["logging trap warnings","logging trap 4 (or logging trap warnings)","logging level warnings","syslog filter level 4"]},{"options":["Syslog will not function without NTP.","It ensures all logs share a synchronized, accurate timestamp, allowing administrators to correlate events across multiple devices chronologically.","NTP compresses the size of log files.","NTP automatically resolves DNS domains."],"question_en":"Why is configuring NTP crucial for analyzing syslog messages in a multi-device network?","question_th":"เพราะเหตุใดการตั้งค่าบริการ NTP จึงมีความสำคัญอย่างสูงยิ่งในการวิเคราะห์รายงาน Syslog ในเครือข่ายที่มีอุปกรณ์จำนวนมาก?","correct_index":1,"explanation_en":"Without synchronized clocks, comparing logs from different routers to diagnose a network-wide event is nearly impossible because timestamp logs will disagree.","explanation_th":"เพราะช่วยรับประกันความแม่นยำของเวลาที่เกิดเหตุ (Timestamp) บนอุปกรณ์ทุกชิ้น ทำให้วิศวกรเทียบดูลำดับวิกฤตของจุดเกิดเหตุได้ตรงกันช็อตต่อช็อต","options_th":["Syslog จะไม่ทำงานหากไม่มี NTP","ทำให้ Timestamp ทุกอุปกรณ์ตรงกัน","NTP บีบอัดขนาดของไฟล์บันทึก","NTP จะแก้ไขโดเมน DNS โดยอัตโนมัติ"]},{"options":["To speed up router boot times.","To include precise date, time, and millisecond detail in syslog message timestamps.","To configure time limit zones.","To delete the logging buffer."],"question_en":"What is the purpose of the ''service timestamps log datetime msec'' command on Cisco devices?","question_th":"คำสั่ง ''service timestamps log datetime msec'' บนอุปกรณ์ Cisco มีประโยชน์อย่างไร?","correct_index":1,"explanation_en":"This command configures log messages to include high-resolution timestamps, showing date, time, down to millisecond accuracy, which is vital for debugging.","explanation_th":"เป็นการตั้งค่าสั่งให้อุปกรณ์ระบุข้อมูลวัน เวลา ปี และหน่วยเศษของมิลลิวินาที (msec) ไปในหัวประวัติเพื่อให้สืบย้อนข้อมูลได้อย่างละเอียด","options_th":["เพื่อเพิ่มความเร็วในการบูตเราเตอร์","เพิ่มวันที่ เวลา และ Millisecond ใน Syslog","เพื่อกำหนดค่าโซนจำกัดเวลา","หากต้องการลบบัฟเฟอร์การบันทึก"]}]}', NULL),
	('lesson-ts005-01', 'troubleshoot-005', 'วิดีโอ: ทำความรู้จักและคอนฟิก IP SLA เบื้องต้น', 'Video: Introduction to IP SLA', '## ทำความรู้จักและคอนฟิก IP SLA เบื้องต้น

**สิ่งที่จะได้เรียนในคลิปนี้**
ในคลิปนี้เราจะเรียนรู้เกี่ยวกับ Cisco IP SLA (Service Level Agreement) ซึ่งเป็นเครื่องมือตรวจสอบเครือข่ายแบบ Proactive ที่ช่วยให้ Router สามารถทดสอบและวัดประสิทธิภาพของเส้นทางเครือข่ายได้อย่างต่อเนื่องตลอด 24 ชั่วโมง และนำผลลัพธ์ที่ได้มาเป็นเงื่อนไขในการเปลี่ยนเส้นทาง (Routing) โดยอัตโนมัติ

**เนื้อหาหลัก**
- **IP SLA คืออะไร:** เป็น Feature ของ Cisco IOS ที่ใช้ส่ง Probe Packet ไปทดสอบเส้นทางเครือข่ายอย่างสม่ำเสมอ โดยไม่ต้องรอให้เกิดปัญหาก่อน (Proactive Monitoring)
- **Operation แบบ ICMP Echo:** ใช้ส่ง Ping ไปยัง IP ปลายทาง เหมาะสำหรับตรวจสอบว่าปลายทางสามารถเข้าถึงได้หรือไม่ (Reachability Check) ง่ายที่สุดและไม่ต้องการ Responder ที่ปลายทาง
- **Operation แบบ UDP Jitter:** ใช้วัด Latency, Jitter (ความผันผวนของ Delay) และ Packet Loss เหมาะสำหรับแอปพลิเคชันที่ไวต่อความหน่วงเช่น VoIP โดยต้องมี Cisco IP SLA Responder ที่ปลายทาง
- **การเชื่อมกับ Floating Static Route:** ใช้ร่วมกับ Enhanced Object Tracking เพื่อให้ Router ถอด Primary Route ออกจาก Routing Table โดยอัตโนมัติเมื่อ Probe ล้มเหลว และสลับไปใช้ Backup Route ที่มี AD สูงกว่า
- **คำสั่งสำคัญ:** ip sla, icmp-echo, frequency, ip sla schedule, track, ip route with track
- **Delay ใน Tracking:** ใช้คำสั่ง delay down 10 up 10 ป้องกัน Route Flapping

**สรุป**
IP SLA เป็นเครื่องมืออันทรงพลังของ Cisco ที่ทำให้เครือข่ายมีความ Resilient โดยการตรวจสอบเส้นทางอย่างต่อเนื่องและสั่งเปลี่ยนเส้นทางได้โดยอัตโนมัติเมื่อเกิดปัญหา ช่วยลดเวลา Downtime และทำให้ระบบ Failover ทำงานได้อย่างชาญฉลาดโดยไม่ต้องพึ่งพาการแจ้งเตือนจาก Routing Protocol', '## Introduction and Basic Configuration of IP SLA

**What you will learn in this video**
In this video, we will learn about Cisco IP SLA (Service Level Agreement), a Proactive network monitoring tool that enables Routers to continuously test and measure network path performance 24/7, using the results to automatically trigger Routing changes.

**Core Content**
- **What is IP SLA:** A Cisco IOS Feature that sends Probe Packets to regularly test network paths without waiting for problems to occur (Proactive Monitoring).
- **ICMP Echo Operation:** Pings a Destination IP. Ideal for Reachability Checks; it''s the simplest and requires no Responder at the destination.
- **UDP Jitter Operation:** Measures Latency, Jitter (delay variance), and Packet Loss. Ideal for delay-sensitive apps like VoIP, requiring a Cisco IP SLA Responder at the destination.
- **Floating Static Route Integration:** Used with Enhanced Object Tracking to automatically remove a Primary Route from the Routing Table when a Probe fails and failover to a Backup Route with a higher AD.
- **Key Commands:** ip sla, icmp-echo, frequency, ip sla schedule, track, ip route with track
- **Tracking Delay:** Use `delay down 10 up 10` to prevent Route Flapping.

**Conclusion**
IP SLA is a powerful Cisco tool that builds network Resiliency by continuously monitoring paths and automatically switching routes when issues occur, reducing Downtime and enabling intelligent Failovers without relying on Routing Protocol alerts.', 'video', 6, 1, 'https://www.youtube.com/watch?v=tqH9KEdMzRI', '/images/resources/it-made-easy.png', 'advanced', '2026-06-04 10:16:54.683486+00', '2026-06-04 10:16:54.683486+00', '{"questions":[{"options":["Internet Protocol Service Level Agreement","IP Security Link Association","Intelligent Protocol System Log Analyzer","IP Speed Limit Authorization"],"question_en":"What does IP SLA stand for?","question_th":"IP SLA ย่อมาจากคำศัพท์ในข้อใด?","correct_index":0,"explanation_en":"IP SLA stands for Internet Protocol Service Level Agreement, a feature in Cisco IOS to monitor network performance.","explanation_th":"IP SLA ย่อมาจาก Internet Protocol Service Level Agreement ซึ่งเป็นฟีเจอร์ตรวจวัดคุณภาพบริการในเครือข่าย","options_th":["ข้อตกลงระดับบริการอินเทอร์เน็ตโปรโตคอล","การเชื่อมโยงความปลอดภัย IP","เครื่องวิเคราะห์บันทึกระบบโปรโตคอลอัจฉริยะ","การอนุญาตขีดจำกัดความเร็ว IP"]},{"options":["To automatically assign IP addresses.","To actively generate traffic probes to measure network performance metrics such as latency, jitter, and packet loss.","To encrypt WAN links.","To manage routing tables."],"question_en":"What is the primary function of IP SLA?","question_th":"หน้าที่หลักของระบบ IP SLA คือข้อใด?","correct_index":1,"explanation_en":"IP SLA generates active traffic (like ICMP Echo, HTTP requests) to measure performance statistics between a router and a remote destination.","explanation_th":"ทำหน้าที่ยิงทราฟฟิกตรวจสอบ (เช่น ส่ง ICMP Echo) เพื่อเก็บสถิติเรื่อง ความหน่วง ความผันผวน (Jitter) และข้อมูลตกหล่นข้ามโฮสต์","options_th":["เพื่อกำหนดที่อยู่ IP โดยอัตโนมัติ","ส่ง Probe วัด Latency/Jitter/Loss","เพื่อเข้ารหัสลิงค์ WAN","เพื่อจัดการตารางเส้นทาง"]},{"options":["ICMP Echo (ping)","HTTP Get","UDP Jitter","All of the above"],"question_en":"Which of the following is a common probe type used by IP SLA to verify link reachability?","question_th":"ประเภทหัวข้อการยิงตรวจสอบ (Probe type) ยอดนิยมของ IP SLA ในการสืบสถานะสายเชื่อมต่ออินเทอร์เน็ตคือข้อใด?","correct_index":3,"explanation_en":"IP SLA supports multiple probe types, including ICMP Echo, UDP Jitter, TCP Connect, and HTTP requests, to test various network layers.","explanation_th":"IP SLA รองรับการส่งสเปกข้อมูลสืบค้นได้หลากประเภท ทั้งการปิงแบบ ICMP, UDP Jitter, และการดึงหน้าเว็บด้วย HTTP จึงถูกทุกข้อ","options_th":["ICMP Echo (ปิง)","HTTP GET","UDP Jitter","ถูกทุกข้อ"]},{"options":["ip sla 10","crypto ip sla 10","monitor ip sla 10","service ip sla 10"],"question_en":"What Cisco command is used to configure an IP SLA operation number 10?","question_th":"คำสั่งเริ่มต้นในการประกาศกำหนดค่ากลุ่มชุดงาน IP SLA หมายเลข 10 บนอุปกรณ์ Cisco คือข้อใด?","correct_index":0,"explanation_en":"The global configuration command ''ip sla 10'' starts the configuration of the IP SLA operation with ID 10.","explanation_th":"ป้อนคำสั่ง ''ip sla 10'' ในระดับโหมดการคอนฟิกรวมเพื่อเริ่มระบุกฎพารามิเตอร์ให้กับจ๊อบหมายเลข 10","options_th":["ip sla 10","crypto ip sla 10","monitor ip sla 10","service ip sla 10"]},{"options":["ip sla schedule <operation-id> start-time now life forever","ip sla start <operation-id>","run ip sla <operation-id>","service ip sla schedule <operation-id>"],"question_en":"How is an IP SLA operation executed and scheduled to run in Cisco IOS?","question_th":"ชุดจ๊อบของ IP SLA จะเริ่มทำงานและตั้งเวลาตรวจระบบ (Schedule) ได้ด้วยการพิมพ์คำสั่งใด?","correct_index":0,"explanation_en":"The ''ip sla schedule'' command defines when the SLA probe starts and how long it remains active (e.g. start-time now life forever).","explanation_th":"ต้องใช้คำสั่ง ''ip sla schedule <id> start-time now life forever'' เพื่อให้เริ่มยิงทดสอบทันทีและทำงานรันรอบไปเรื่อยๆ","options_th":["ip sla schedule <operation-id> start-time now life forever","ip sla start <operation-id>","run ip sla <operation-id> start-time now life forever","service ip sla schedule <operation-id>"]}]}', NULL),
	('lesson-wireshark-03', 'troubleshoot-001', 'การวิเคราะห์ UDP และ DNS', 'UDP and DNS Analysis', '## Security Analysis with Wireshark

**สิ่งที่จะได้เรียนในคลิปนี้**
คลิปนี้สอนการใช้ Wireshark เพื่อตรวจสอบ Network Attack และพฤติกรรมผิดปกติ

**เนื้อหาหลัก**
- **Port Scanning Detection:** เห็น Pattern ของ SYN Flood หรือ Nmap Scan ในรูปแบบ Packet
- **ARP Spoofing Detection:** พบ Gratuitous ARP ที่ผิดปกติ (IP เดียวกันมี MAC ต่างกัน)
- **Cleartext Credentials:** ตรวจจับ Username/Password ที่ส่งแบบไม่เข้ารหัสบน Telnet, FTP, HTTP
- **DNS Tunneling:** วิเคราะห์ DNS Query ที่มี Payload ผิดปกติ (ใช้ส่งข้อมูลหนีออก Firewall)
- **Malware C2 Traffic:** สังเกต Beacon Pattern ของ Malware ที่ติดต่อ Command & Control Server

**สรุป**
Wireshark ในมือ Security Analyst ช่วยหาพฤติกรรมผิดปกติในเครือข่ายได้อย่างที่ Security Tool อื่นอาจพลาด', '## Security Analysis with Wireshark

**What you will learn in this video**
This video teaches how to use Wireshark to investigate Network Attacks and abnormal behaviors.

**Core Content**
- **Port Scanning Detection:** Spot SYN Flood or Nmap Scan Patterns in Packets.
- **ARP Spoofing Detection:** Find abnormal Gratuitous ARPs (Same IP with different MACs).
- **Cleartext Credentials:** Detect unencrypted Username/Passwords sent over Telnet, FTP, HTTP.
- **DNS Tunneling:** Analyze abnormal payloads in DNS Queries (used to sneak data past Firewalls).
- **Malware C2 Traffic:** Observe Malware Beacon Patterns communicating with Command & Control Servers.

**Conclusion**
In the hands of a Security Analyst, Wireshark identifies abnormal network behaviors that other Security Tools might miss.', 'video', 13, 3, 'https://www.youtube.com/watch?v=71VeHHFpvqQ', '/images/thumbnails/lesson-wireshark-03.jpg', NULL, '2026-05-18 10:02:06.461001+00', '2026-05-19 10:29:10.623729+00', '{"questions":[{"options":["UDP headers are much larger.","UDP headers are extremely simple, consisting of only 8 bytes (source port, destination port, length, and checksum).","UDP headers contain sequence numbers.","UDP headers do not contain port numbers."],"question_en":"What is a major difference between UDP and TCP header structures as viewed in Wireshark?","question_th":"ความแตกต่างที่เด่นชัดมากระหว่างส่วนหัว (Header) ของ UDP และ TCP เมื่อแกะดูใน Wireshark คืออะไร?","correct_index":1,"explanation_en":"UDP is connectionless and lightweight. Its header is only 8 bytes total, containing no sequence numbers, window sizes, or flags, unlike TCP.","explanation_th":"ส่วนหัวของ UDP มีขนาดเล็กมากเพียง 8 ไบต์เท่านั้น ประกอบด้วยพอร์ตต้นทาง ปลายทาง ความยาว และเช็คซัม โดยไม่มีข้อมูลสถานะใดๆ","options_th":["ส่วนหัว UDP มีขนาดใหญ่กว่ามาก","UDP Header มีเพียง 8 ไบต์","ส่วนหัว UDP มีหมายเลขลำดับ","ส่วนหัว UDP ไม่มีหมายเลขพอร์ต"]},{"options":["dns","udp.port == 53","ip.proto == 53","domain-name-service"],"question_en":"Which Wireshark filter display syntax isolates only DNS packets?","question_th":"ไวยากรณ์ในการกรองแสดงผล (Display filter) ของ Wireshark ข้อใดดึงมาแสดงเฉพาะทราฟฟิกโปรโตคอล DNS?","correct_index":0,"explanation_en":"The display filter ''dns'' isolates domain name queries and responses in the capture log.","explanation_th":"พิมพ์สั้นๆ ในช่องตัวกรองแสดงผลเป็น ''dns'' เพื่อจัดแยกหมวดไอพีดึงการอ้างอิง DNS ขึ้นมาสแกนอ่าน","options_th":["dns","udp.port == 53","ip.proto == 53","domain-name-service"]},{"options":["The target IP address being requested.","The domain name hostname being queried, the query type (e.g., A record), and class (IN).","The email server credentials.","The default gateway MAC."],"question_en":"What information does a DNS Query packet contain, as analyzed in Wireshark?","question_th":"ข้อมูลอะไรบ้างที่บรรจุอยู่ภายในแพ็กเก็ตส่งขอถาม (DNS Query) เมื่อแยกดูรายละเอียดใน Wireshark?","correct_index":1,"explanation_en":"A DNS query packet specifies the name being requested (e.g., google.com) and the requested record type (A, MX, etc.) under the Questions section.","explanation_th":"ในหมวดคำถาม (Questions) จะระบุชื่อโดเมนที่ต้องการสืบค้น (เช่น cisco.com) และระบุประเภทของเรคคอร์ดข้อมูลที่ร้องขอ","options_th":["ที่อยู่ IP เป้าหมายที่กำลังค้นหา","Domain, Query Type และ Class","ข้อมูลรับรองเซิร์ฟเวอร์อีเมล","MAC เกตเวย์เริ่มต้น"]},{"options":["DNS Response packets use TCP port 80.","DNS Response packets have the QR (Query/Response) flag set to 1 in the DNS flags header and contain an Answers section.","DNS Response packets have no header.","DNS Response packets contain OSPF costs."],"question_en":"How can you identify a DNS Response packet in Wireshark, as distinct from a Query?","question_th":"คุณจะจำแนกแยกแยะแพ็กเก็ตตอบกลับ (DNS Response) ออกจากแพ็กเก็ตส่งถามคำถามได้อย่างไรใน Wireshark?","correct_index":1,"explanation_en":"In the DNS header flags, QR=0 is a Query, while QR=1 indicates a Response, which also includes the resolved address details in the Answers section.","explanation_th":"ในส่วนธง Flags ของ DNS ตัวแปร QR จะถูกปักค่าเป็น 1 (แปลว่า Response) และมีช่องรายละเอียดคำตอบ (Answers) บรรจุผลลัพธ์มาให้","options_th":["แพ็กเก็ตการตอบสนอง DNS ใช้พอร์ต TCP 80","QR=1 และมีส่วน Answers","แพ็กเก็ตการตอบสนอง DNS ไม่มีส่วนหัว","แพ็กเก็ตตอบกลับ DNS มีค่า Cost ของ OSPF"]},{"options":["The domain was resolved successfully.","The requested domain name does not exist on the server.","The DNS server is offline.","The query timed out."],"question_en":"What does a DNS response code of ''NXDOMAIN'' mean when inspecting a DNS packet?","question_th":"รหัสสถานะส่งคืนแบบ ''NXDOMAIN'' ในแพ็กเก็ตตอบกลับของ DNS หมายความว่าอย่างไร?","correct_index":1,"explanation_en":"NXDOMAIN (Non-Existent Domain) is a DNS status returned by a server indicating that the requested domain name is not registered in the DNS database.","explanation_th":"NXDOMAIN (Non-Existent Domain) แจ้งกลับมาว่าไม่มีชื่อโดเมนที่ระบุลงทะเบียนอยู่ในระบบและฐานข้อมูลของเซิร์ฟเวอร์","options_th":["แก้ไขโดเมนสำเร็จแล้ว","ไม่มี Domain ที่ร้องขอ","เซิร์ฟเวอร์ DNS ออฟไลน์อยู่","คำขอหมดเวลา"]}]}', NULL),
	('lesson-ccna002-07', 'ccna-002', 'Inter-VLAN Routing', 'Inter-VLAN Routing', '## InterVLAN Routing
**สิ่งที่จะได้เรียนในคลิปนี้**
วิดีโอนี้เน้นไปที่เรื่อง Inter-VLAN Routing โดยตรง และการทำให้ VLAN ต่างๆ คุยกันได้

**เนื้อหาหลัก**

**Inter-VLAN Routing:** คือกระบวนการที่ทำให้คอมพิวเตอร์ที่อยู่คนละ VLAN สามารถสื่อสารกันได้ ซึ่งในวิดีโอได้อธิบาย 3 วิธีหลัก คือ:

* **Traditional Router:** ใช้ Router เชื่อมต่อแยกฟิสิคัลพอร์ตต่อ VLAN
* **Router-on-a-Stick:** ใช้ Router 1 ตัวกับ Sub-interface เพื่อ Route ระหว่าง VLAN

```text
interface Gi0/0.10
encapsulation dot1Q 10
ip address 192.168.10.1 255.255.255.0

```

* **Layer 3 Switch (SVI):** วิธีที่นิยมในองค์กร ใช้คำสั่ง `ip routing` และสร้าง `interface vlan X`

```text
ip routing
interface vlan 10
ip address 192.168.10.1 255.255.255.0

```

**สรุป**

1. **Traditional Router:** ใช้พอร์ตจริงแยกต่อแต่ละ VLAN
2. **Router-on-a-Stick:** ใช้สาย Trunk เส้นเดียวและแบ่งเป็น Sub-interface
3. **Multilayer Switch:** ทำ Routing ภายใน Switch ผ่าน SVI', '## VTP and Inter-VLAN Routing

**What you will learn in this video**
This video teaches 2 key topics: managing VLANs with VTP and allowing VLANs to communicate, complete with a lab.

**Core Content**
**VTP (VLAN Trunking Protocol)**
- Automatically syncs VLAN Database across Switches over Trunk Links.
- 3 Modes: **Server** (create/edit/delete VLANs), **Client** (receive data only), **Transparent** (does not participate).
- ⚠️ **Risk:** Introducing a new Switch with a higher VTP Revision Number will overwrite the entire VLAN Database!

**Inter-VLAN Routing**
- **Router-on-a-Stick:**
```text
interface Gi0/0.10
  encapsulation dot1Q 10
  ip address 192.168.10.1 255.255.255.0
```
- **Layer 3 Switch (SVI):**
```text
ip routing
interface vlan 10
  ip address 192.168.10.1 255.255.255.0
```

**Conclusion**
VTP reduces administrative tasks but requires caution regarding risks. Inter-VLAN routing allows all VLANs to communicate cross-network according to defined policies.', 'video', 6, 5, 'https://www.youtube.com/watch?v=NmkFzDrZsXM', 'https://loremflickr.com/600/400/server,technology,network/all?lock=67', NULL, '2026-05-30 09:38:16.329058+00', '2026-05-30 09:38:16.329058+00', '{"questions":[{"options":["Routing traffic between different physical LAN networks.","Forwarding traffic between different logical VLAN segments using a Layer 3 device.","Blocking traffic between switches.","Broadcasting messages to all switches."],"question_en":"What is Inter-VLAN Routing?","question_th":"Inter-VLAN Routing หมายถึงกระบวนการใด?","correct_index":1,"explanation_en":"Inter-VLAN Routing is the process of routing traffic between different VLANs using a router or multilayer switch.","explanation_th":"คือการส่งต่อทราฟฟิกข้อมูลเชื่อมสลับการทำงานข้ามกลุ่มเครือข่ายเสมือน (VLAN) ต่างวง โดยต้องใช้อุปกรณ์ระดับ Layer 3","options_th":["การกำหนดเส้นทางการรับส่งข้อมูลระหว่างเครือข่าย LAN ทางกายภาพที่แตกต่างกัน","การส่งต่อการรับส่งข้อมูลระหว่างส่วน VLAN แบบลอจิคัลที่แตกต่างกันโดยใช้อุปกรณ์เลเยอร์ 3","การปิดกั้นการรับส่งข้อมูลระหว่างสวิตช์","กระจายข้อความไปยังสวิตช์ทั้งหมด"]},{"options":["Using multiple physical cables, one for each VLAN.","Using a single physical interface configured with subinterfaces connected to a switch trunk port.","Using serial console cables.","Via wireless routing."],"question_en":"In a Router-on-a-Stick (ROAS) configuration, how does the router interface connect to the switch?","question_th":"ในโครงสร้าง Router-on-a-Stick (ROAS) สายเชื่อมต่อฝั่งอินเตอร์เฟสของเร้าเตอร์จะต่อเข้ากับสวิตช์ในรูปแบบใด?","correct_index":1,"explanation_en":"Router-on-a-Stick utilizes a single physical interface divided into logical subinterfaces, connected to a switch trunk port.","explanation_th":"ROAS ใช้พอร์ตอินเตอร์เฟสจริงเพียงหนึ่งช่องสัญญาณ แต่แตกแยกย่อยเป็นอินเตอร์เฟสจำลอง (Subinterface) ต่อสายเข้าหาพอร์ต Trunk บนสวิตช์","options_th":["การใช้สายเคเบิลฟิสิคัลหลายเส้น หนึ่งเส้นสำหรับแต่ละ VLAN","ใช้พอร์ตเดียวแบ่ง Subinterface ต่อกับ Trunk","การใช้สายเคเบิลคอนโซลอนุกรม","ผ่านเส้นทางไร้สาย"]},{"options":["interface gigabitethernet 0/0 vlan 10","interface gigabitethernet 0/0.10","subinterface gigabitethernet 0/0 10","interface g0/0 sub 10"],"question_en":"What is the command to create and enter subinterface configuration on a router''s GigabitEthernet 0/0 interface for VLAN 10?","question_th":"คำสั่งใดสร้างและเปิดการตั้งค่าอินเตอร์เฟสย่อย (Subinterface) หมายเลข 10 บนพอร์ต GigabitEthernet 0/0 ของเร้าเตอร์?","correct_index":1,"explanation_en":"Subinterfaces are configured by adding a dot and a logical number after the physical interface name (e.g., interface GigabitEthernet 0/0.10).","explanation_th":"การเข้าแต่งค่าอินเตอร์เฟสย่อยทำได้โดยระบุจุดทศนิยมตามหลังชื่อพอร์ตหลัก เช่น ''interface gigabitethernet 0/0.10''","options_th":["interface gigabitethernet 0/0 vlan 10","interface gigabitethernet 0/0.10","subinterface gigabitethernet 0/0 10","interface g0/0 sub 10"]},{"options":["encapsulation dot1q 10","switchport mode trunk 10","vlan 10 encapsulation","ip encapsulation 802.1q vlan 10"],"question_en":"Which command is required on a router subinterface to enable 802.1Q encapsulation for VLAN 10?","question_th":"คำสั่งใดที่จำเป็นต้องกำหนดบนอินเตอร์เฟสย่อยของเร้าเตอร์เพื่อเปิดใช้งานการห่อหุ้ม 802.1Q สำหรับ VLAN 10?","correct_index":0,"explanation_en":"The ''encapsulation dot1q <vlan-id>'' command is required to associate a subinterface with a specific VLAN tag.","explanation_th":"คำสั่ง ''encapsulation dot1q 10'' เป็นการระบุให้อินเตอร์เฟสย่อยผูกการรับส่ง Tag ในรูปแบบ 802.1Q กับ VLAN 10","options_th":["encapsulation dot1q 10","switchport mode trunk 10","การห่อหุ้ม vlan 10","ip encapsulation 802.1q vlan 10"]},{"options":["Loopback Interface","Switch Virtual Interface (SVI)","Subinterface","Tunnel Interface"],"question_en":"What virtual interface is used to perform Inter-VLAN routing directly on a Multilayer Switch (Layer 3 Switch)?","question_th":"อินเตอร์เฟสเสมือนชนิดใดที่ถูกเรียกสร้างขึ้นมาเพื่อใช้นำทางเร้าติ้งข้าม VLAN บนสวิตช์ระดับ Multilayer Switch (L3 Switch)?","correct_index":1,"explanation_en":"Multilayer switches use Switch Virtual Interfaces (SVIs), configured via ''interface vlan <vlan-id>'', to route between networks.","explanation_th":"สวิตช์ Layer 3 จะสั่งสร้างอินเตอร์เฟสเสมือนที่ชื่อ SVI (ผ่านคำสั่ง ''interface vlan <number>'') เพื่อคอยจัดการแอดเดรสในการจัดเส้นทาง","options_th":["Loopback Interface","Switch Virtual Interface (SVI)","Subinterface","Tunnel Interface"]}]}', NULL);

COMMIT;
