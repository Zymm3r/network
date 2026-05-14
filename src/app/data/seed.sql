-- ============================================
-- Networking Education Platform - Seed Data
-- Compatible with Supabase/PostgreSQL
-- ============================================

-- ============================================
-- COURSES - 30 Networking Courses
-- ============================================

INSERT INTO courses (id, name_th, name_en, description_th, description_en, level, minutes_per_lesson, min_modules, availability, includes, highlights, image_url, rating, review_count, tags, modules_left, estimated_hours, prerequisites, created_at, updated_at) VALUES
-- CCNA Track (8 courses)
('ccna-001', 'พื้นฐานเครือข่ายคอมพิวเตอร์', 'Computer Networking Fundamentals', 'เรียนรู้พื้นฐานการทำงานของเครือข่ายคอมพิวเตอร์ รวมถึงโมเดล OSI และ TCP/IP การระบุตำแหน่งอุปกรณ์เครือข่าย และหลักการส่งข้อมูล', 'Master the fundamentals of computer networking including the OSI model, TCP/IP protocol suite, network devices, and data transmission principles.', 'beginner', 30, 4, 'available', ARRAY['Video lessons', 'Hands-on labs', 'Quizzes', 'Certificate']::TEXT[], ARRAY['CCNA 200-301 aligned', 'Packet Tracer labs', 'Exam prep']::TEXT[], '/images/courses/ccna-fundamentals.jpg', 4.8, 342, ARRAY['CCNA', 'Networking Basics', 'OSI Model', 'TCP/IP']::TEXT[], 150, 40, ARRAY[]::TEXT[], NOW(), NOW()),

('ccna-002', 'การสลับสัญญาณและ VLAN', 'LAN Switching and VLANs', 'เรียนรู้การทำงานของ Switch ในเครือข่าย LAN, VLAN configuration, Trunking, และ STP protocols', 'Learn how LAN switches operate, VLAN configuration, trunking protocols, and Spanning Tree Protocol for enterprise networks.', 'intermediate', 45, 5, 'available', ARRAY['Video lessons', 'Packet Tracer labs', 'Quizzes', 'Certificate']::TEXT[], ARRAY['VLAN configuration', 'STP deep dive', 'Switch troubleshooting']::TEXT[], '/images/courses/lan-switching.jpg', 4.7, 218, ARRAY['CCNA', 'VLAN', 'Switching', 'STP']::TEXT[], 120, 50, ARRAY['ccna-001']::TEXT[], NOW(), NOW()),

('ccna-003', 'เทคโนโลยีการ routing', 'Routing Technologies', 'เข้าใจหลักการ routing, static routes, dynamic routing protocols (RIP, OSPF, EIGRP) และการ config routers', 'Understand routing principles, static routes, and dynamic routing protocols including RIP, OSPF, and EIGRP configuration.', 'intermediate', 60, 6, 'available', ARRAY['Video lessons', 'Router labs', 'Practice exams', 'Certificate']::TEXT[], ARRAY['RIP, OSPF, EIGRP', 'Route redistribution', 'Troubleshooting']::TEXT[], '/images/courses/routing.jpg', 4.9, 289, ARRAY['CCNA', 'Routing', 'OSPF', 'EIGRP']::TEXT[], 100, 60, ARRAY['ccna-001']::TEXT[], NOW(), NOW()),

('ccna-004', 'เทคโนโลยี WAN', 'WAN Technologies', 'เรียนรู้เทคโนโลยี WAN ต่างๆ เช่น PPP, HDLC, Frame Relay, MPLS, และ VPN configurations', 'Learn WAN technologies including PPP, HDLC, Frame Relay, MPLS, and VPN configurations for enterprise connectivity.', 'intermediate', 40, 4, 'available', ARRAY['Video lessons', 'WAN labs', 'Case studies', 'Certificate']::TEXT[], ARRAY['PPP/HDLC', 'MPLS basics', 'VPN setup']::TEXT[], '/images/courses/wan-technologies.jpg', 4.6, 156, ARRAY['CCNA', 'WAN', 'MPLS', 'VPN']::TEXT[], 80, 35, ARRAY['ccna-003']::TEXT[], NOW(), NOW()),

('ccna-005', 'บริการพื้นฐานโครงสร้างเครือข่าย', 'Infrastructure Services', 'เรียนรู้บริการเครือข่ายที่จำเป็น ได้แก่ DHCP, DNS, NAT, PAT, และ ACLs', 'Essential network services including DHCP, DNS, NAT, PAT, and Access Control Lists configuration.', 'intermediate', 50, 4, 'available', ARRAY['Video lessons', 'Configuration labs', 'Certificate']::TEXT[], ARRAY['DHCP/DNS', 'NAT configuration', 'ACL fundamentals']::TEXT[], '/images/courses/infrastructure-services.jpg', 4.7, 201, ARRAY['CCNA', 'DHCP', 'DNS', 'NAT', 'ACL']::TEXT[], 90, 38, ARRAY['ccna-001']::TEXT[], NOW(), NOW()),

('ccna-006', 'ความปลอดภัยของโครงสร้างเครือข่าย', 'Infrastructure Security', 'เรียนรู้หลักการความปลอดภัยเครือข่าย การ configure security devices, และ threat mitigation', 'Network security fundamentals including security device configuration, threat mitigation, and access control.', 'intermediate', 55, 5, 'available', ARRAY['Video lessons', 'Security labs', 'Certificate']::TEXT[], ARRAY['Port security', 'Switch security', 'Threat prevention']::TEXT[], '/images/courses/infrastructure-security.jpg', 4.8, 178, ARRAY['CCNA', 'Security', 'Network Security']::TEXT[], 75, 45, ARRAY['ccna-002']::TEXT[], NOW(), NOW()),

('ccna-007', 'การจัดการโครงสร้างเครือข่าย', 'Infrastructure Management', 'เรียนรู้การจัดการและ monitor เครือข่าย รวมถึง SNMP, Syslog, และ network management tools', 'Network management and monitoring including SNMP, Syslog, and network management tools.', 'advanced', 50, 4, 'available', ARRAY['Video lessons', 'Management labs', 'Certificate']::TEXT[], ARRAY['SNMP configuration', 'Syslog analysis', 'Network monitoring']::TEXT[], '/images/courses/infrastructure-management.jpg', 4.6, 134, ARRAY['CCNA', 'Network Management', 'SNMP']::TEXT[], 60, 36, ARRAY['ccna-003']::TEXT[], NOW(), NOW()),

('ccna-008', 'พื้นฐานการทำงานอัตโนมัติของเครือข่าย', 'Network Automation Basics', 'บทนำสู่ network automation และ programmability ด้วย Python, APIs, และ configuration management tools', 'Introduction to network automation and programmability using Python, APIs, and configuration management tools.', 'advanced', 65, 5, 'available', ARRAY['Video lessons', 'Python labs', 'API exercises', 'Certificate']::TEXT[], ARRAY['Python for networking', 'REST APIs', 'Automation scripts']::TEXT[], '/images/courses/network-automation.jpg', 4.9, 267, ARRAY['CCNA', 'Automation', 'Python', 'API']::TEXT[], 85, 48, ARRAY['ccna-007']::TEXT[], NOW(), NOW()),

-- Security Track (6 courses)
('sec-001', 'พื้นฐาน Firewall', 'Firewall Fundamentals', 'เรียนรู้หลักการทำงานของ Firewall, Stateful inspection, และ Zone-based policy configuration', 'Learn firewall operation principles, stateful inspection, and zone-based policy configuration.', 'intermediate', 55, 5, 'available', ARRAY['Video lessons', 'Firewall labs', 'Certificate']::TEXT[], ARRAY['Zone-based firewall', 'Policy configuration', 'NAT traversal']::TEXT[], '/images/courses/firewall-fundamentals.jpg', 4.7, 189, ARRAY['Security', 'Firewall', 'Palo Alto', 'Cisco ASA']::TEXT[], 70, 45, ARRAY['ccna-006']::TEXT[], NOW(), NOW()),

('sec-002', 'เทคโนโลยี VPN', 'VPN Technologies', 'เรียนรู้การ configure VPN ทั้ง site-to-site, remote access, และ SSL VPN ด้วย various protocols', 'Configure VPN connections including site-to-site, remote access, and SSL VPN with various protocols.', 'intermediate', 65, 5, 'available', ARRAY['Video lessons', 'VPN labs', 'Certificate']::TEXT[], ARRAY['IPSec', 'SSL VPN', 'GRE tunnels']::TEXT[], '/images/courses/vpn-technologies.jpg', 4.8, 223, ARRAY['Security', 'VPN', 'IPSec', 'SSL']::TEXT[], 95, 50, ARRAY['sec-001']::TEXT[], NOW(), NOW()),

('sec-003', 'การตรวจจับและป้องกันการบุกรุก', 'Intrusion Detection and Prevention', 'เรียนรู้การ deploy และ configure IDS/IPS systems, signature-based และ anomaly-based detection', 'Deploy and configure IDS/IPS systems with signature-based and anomaly-based detection.', 'advanced', 55, 4, 'available', ARRAY['Video lessons', 'IPS labs', 'Certificate']::TEXT[], ARRAY['Snort rules', 'Tuning strategies', 'Alert analysis']::TEXT[], '/images/courses/ids-ips.jpg', 4.6, 145, ARRAY['Security', 'IDS', 'IPS', 'Snort']::TEXT[], 55, 38, ARRAY['sec-001']::TEXT[], NOW(), NOW()),

('sec-004', 'การควบคุมการเข้าถึงเครือข่าย', 'Network Access Control', 'เรียนรู้ NAC solutions, 802.1X authentication, และ endpoint security compliance', 'NAC solutions, 802.1X authentication, and endpoint security compliance implementation.', 'advanced', 45, 4, 'available', ARRAY['Video lessons', 'NAC labs', 'Certificate']::TEXT[], ARRAY['802.1X', 'RADIUS', 'Endpoint compliance']::TEXT[], '/images/courses/nac.jpg', 4.5, 98, ARRAY['Security', 'NAC', '802.1X', 'RADIUS']::TEXT[], 40, 35, ARRAY['sec-001', 'ccna-006']::TEXT[], NOW(), NOW()),

('sec-005', 'การตรวจสอบความปลอดภัยเครือข่าย', 'Network Security Auditing', 'เรียนรู้การ conduct security audits, vulnerability assessments, และ penetration testing basics', 'Conduct security audits, vulnerability assessments, and penetration testing fundamentals.', 'advanced', 60, 5, 'available', ARRAY['Video lessons', 'Audit tools', 'Certificate']::TEXT[], ARRAY['Vulnerability scanning', 'Penetration testing', 'Compliance']::TEXT[], '/images/courses/security-auditing.jpg', 4.8, 167, ARRAY['Security', 'Audit', 'Pentest', 'Compliance']::TEXT[], 65, 48, ARRAY['sec-003', 'sec-004']::TEXT[], NOW(), NOW()),

('sec-006', 'การตอบสนองต่อเหตุการณ์', 'Incident Response', 'เรียนรู้กระบวนการ incident response, forensic analysis, และ malware detection', 'Incident response procedures, forensic analysis, and malware detection techniques.', 'advanced', 60, 5, 'available', ARRAY['Video lessons', 'IR labs', 'Certificate']::TEXT[], ARRAY['Incident handling', 'Forensics', 'Malware analysis']::TEXT[], '/images/courses/incident-response.jpg', 4.7, 134, ARRAY['Security', 'Incident Response', 'Forensics']::TEXT[], 50, 45, ARRAY['sec-003']::TEXT[], NOW(), NOW()),

-- Advanced Routing (6 courses)
('adv-001', 'OSPF แบบลึก', 'OSPF Deep Dive', 'เรียนรู้ OSPF advanced features, LSA types, area types, และ route optimization', 'Advanced OSPF features, LSA types, area types, and route optimization techniques.', 'advanced', 65, 5, 'available', ARRAY['Video lessons', 'OSPF labs', 'Certificate']::TEXT[], ARRAY['LSA types', 'Stub areas', 'Route summarization']::TEXT[], '/images/courses/ospf-deep-dive.jpg', 4.8, 198, ARRAY['Routing', 'OSPF', 'CCNP']::TEXT[], 75, 50, ARRAY['ccna-003']::TEXT[], NOW(), NOW()),

('adv-002', 'การ configure EIGRP', 'EIGRP Configuration', 'เรียนรู้ EIGRP advanced configuration, load balancing, และ route filtering', 'Advanced EIGRP configuration, load balancing, and route filtering techniques.', 'advanced', 45, 4, 'available', ARRAY['Video lessons', 'EIGRP labs', 'Certificate']::TEXT[], ARRAY['Unequal-cost load balancing', 'Route filtering', 'Stuck in active']::TEXT[], '/images/courses/eigrp.jpg', 4.6, 145, ARRAY['Routing', 'EIGRP', 'CCNP']::TEXT[], 60, 40, ARRAY['ccna-003']::TEXT[], NOW(), NOW()),

('adv-003', 'พื้นฐาน BGP', 'BGP Fundamentals', 'เรียนรู้ BGP basics, neighbor relationships, route propagation, และ basic configuration', 'BGP basics, neighbor relationships, route propagation, and basic configuration.', 'advanced', 70, 6, 'available', ARRAY['Video lessons', 'BGP labs', 'Certificate']::TEXT[], ARRAY['Neighbor adjacency', 'Route attributes', 'AS path']::TEXT[], '/images/courses/bgp-fundamentals.jpg', 4.9, 234, ARRAY['Routing', 'BGP', 'ISP', 'CCNP']::TEXT[], 45, 55, ARRAY['adv-001', 'ccna-003']::TEXT[], NOW(), NOW()),

('adv-004', 'VLAN และ STP ขั้นสูง', 'Advanced VLAN and STP', 'เรียนรู้ VLAN advanced features, MSTP, EtherChannel, และ inter-VLAN routing', 'Advanced VLAN features, MSTP, EtherChannel, and inter-VLAN routing configuration.', 'advanced', 45, 4, 'available', ARRAY['Video lessons', 'Advanced switching labs', 'Certificate']::TEXT[], ARRAY['MSTP', 'Link Aggregation', 'VTP']::TEXT[], '/images/courses/advanced-vlan.jpg', 4.7, 167, ARRAY['Switching', 'VLAN', 'STP', 'CCNP']::TEXT[], 55, 38, ARRAY['ccna-002']::TEXT[], NOW(), NOW()),

('adv-005', 'Multicast Routing', 'Multicast Routing', 'เรียนรู้ IP multicast, IGMP, PIM protocols, และ multicast routing configuration', 'IP multicast, IGMP, PIM protocols, and multicast routing configuration.', 'advanced', 55, 4, 'available', ARRAY['Video lessons', 'Multicast labs', 'Certificate']::TEXT[], ARRAY['PIM Sparse-Dense', 'IGMP Snooping', 'RP selection']::TEXT[], '/images/courses/multicast.jpg', 4.5, 89, ARRAY['Routing', 'Multicast', 'PIM']::TEXT[], 35, 36, ARRAY['adv-001']::TEXT[], NOW(), NOW()),

('adv-006', 'การ implement QoS', 'QoS Implementation', 'เรียนรู้ Quality of Service, traffic classification, queuing mechanisms, และ QoS configuration', 'Quality of Service, traffic classification, queuing mechanisms, and QoS configuration.', 'advanced', 65, 5, 'available', ARRAY['Video lessons', 'QoS labs', 'Certificate']::TEXT[], ARRAY['Weighted Fair Queuing', 'CBWFQ', 'Policing and shaping']::TEXT[], '/images/courses/qos.jpg', 4.6, 112, ARRAY['QoS', 'Traffic Management', 'CCNP']::TEXT[], 40, 45, ARRAY['adv-001', 'ccna-003']::TEXT[], NOW(), NOW()),

-- Troubleshooting (5 courses)
('troubleshoot-001', 'การวิเคราะห์ด้วย Wireshark', 'Wireshark Analysis', 'เรียนรู้การใช้ Wireshark สำหรับ packet analysis, protocol debugging, และ network troubleshooting', 'Master Wireshark for packet analysis, protocol debugging, and network troubleshooting.', 'intermediate', 55, 5, 'available', ARRAY['Video lessons', 'Capture files', 'Certificate']::TEXT[], ARRAY['Protocol analysis', 'Troubleshooting scenarios', 'Expert info']::TEXT[], '/images/courses/wireshark.jpg', 4.9, 312, ARRAY['Troubleshooting', 'Wireshark', 'Packet Analysis']::TEXT[], 110, 48, ARRAY['ccna-001']::TEXT[], NOW(), NOW()),

('troubleshoot-002', 'การแก้ไขปัญหา Cisco IOS', 'Cisco IOS Troubleshooting', 'เรียนรู้ Cisco IOS troubleshooting methodology, debug commands, และ logging analysis', 'Cisco IOS troubleshooting methodology, debug commands, and logging analysis.', 'intermediate', 45, 4, 'available', ARRAY['Video lessons', 'Troubleshooting scenarios', 'Certificate']::TEXT[], ARRAY['Debug commands', 'Syslog analysis', 'SPAN']::TEXT[], '/images/courses/ios-troubleshooting.jpg', 4.7, 178, ARRAY['Troubleshooting', 'Cisco IOS', 'Debugging']::TEXT[], 70, 38, ARRAY['ccna-003']::TEXT[], NOW(), NOW()),

('troubleshoot-003', 'การวินิจฉัยเครือข่าย', 'Network Diagnostics', 'เรียนรู้การใช้ diagnostic tools เช่น ping, traceroute, NetFlow, และ SNMP troubleshooting', 'Use diagnostic tools including ping, traceroute, NetFlow, and SNMP troubleshooting.', 'intermediate', 50, 4, 'available', ARRAY['Video lessons', 'Diagnostic labs', 'Certificate']::TEXT[], ARRAY['Ping/Traceroute', 'NetFlow', 'SNMP walk']::TEXT[], '/images/courses/network-diagnostics.jpg', 4.6, 145, ARRAY['Troubleshooting', 'Diagnostics', 'Network Tools']::TEXT[], 80, 35, ARRAY['ccna-001']::TEXT[], NOW(), NOW()),

('troubleshoot-004', 'การ optimize ประสิทธิภาพเครือข่าย', 'Network Performance Optimization', 'เรียนรู้การ analyze และ optimize network performance, bottleneck identification', 'Analyze and optimize network performance, identify bottlenecks, and improve efficiency.', 'advanced', 55, 4, 'available', ARRAY['Video lessons', 'Optimization labs', 'Certificate']::TEXT[], ARRAY['Performance metrics', 'Load analysis', 'Tuning strategies']::TEXT[], '/images/courses/performance-optimization.jpg', 4.7, 123, ARRAY['Performance', 'Optimization', 'Monitoring']::TEXT[], 55, 40, ARRAY['troubleshoot-002', 'troubleshoot-003']::TEXT[], NOW(), NOW()),

('troubleshoot-005', 'การ monitor ด้วย SLA', 'SLA Monitoring', 'เรียนรู้การ configure IP SLA, service level agreements, และ performance monitoring', 'Configure IP SLA, service level agreements, and performance monitoring.', 'advanced', 399, 3, 'available', ARRAY['Video lessons', 'SLA labs', 'Certificate']::TEXT[], ARRAY['IP SLA operations', 'Tracking objects', 'Response time']::TEXT[], '/images/courses/sla-monitoring.jpg', 4.5, 78, ARRAY['Monitoring', 'SLA', 'IP SLA']::TEXT[], 35, 28, ARRAY['troubleshoot-003']::TEXT[], NOW(), NOW()),

-- DevNet/Automation (5 courses)
('devnet-001', 'Python สำหรับ Network Engineer', 'Python for Network Engineers', 'เรียนรู้ Python programming สำหรับ network automation, libraries like Netmiko, Paramiko', 'Python programming for network automation with libraries like Netmiko and Paramiko.', 'intermediate', 499, 6, 'available', ARRAY['Video lessons', 'Code exercises', 'Certificate']::TEXT[], ARRAY['Netmiko', 'NAPALM', 'Network scripts']::TEXT[], '/images/courses/python-networking.jpg', 4.9, 287, ARRAY['Automation', 'Python', 'DevNet', 'Scripting']::TEXT[], 100, 55, ARRAY['ccna-001']::TEXT[], NOW(), NOW()),

('devnet-002', 'พื้นฐาน Ansible', 'Ansible Fundamentals', 'เรียนรู้ Ansible สำหรับ network configuration management, playbooks, และ roles', 'Ansible for network configuration management, playbooks, and roles.', 'intermediate', 55, 5, 'available', ARRAY['Video lessons', 'Ansible labs', 'Certificate']::TEXT[], ARRAY['Playbooks', 'Network modules', 'Tower basics']::TEXT[], '/images/courses/ansible.jpg', 4.8, 198, ARRAY['Automation', 'Ansible', 'Configuration Management']::TEXT[], 75, 45, ARRAY['devnet-001']::TEXT[], NOW(), NOW()),

('devnet-003', 'Cisco DNA Center', 'Cisco DNA Center', 'เรียนรู้ Cisco DNA Center features, intent-based networking, automation, และ analytics', 'Cisco DNA Center features, intent-based networking, automation, and analytics.', 'advanced', 60, 5, 'available', ARRAY['Video lessons', 'DNA Center labs', 'Certificate']::TEXT[], ARRAY['Intent-based', 'Assurance', 'Automation workflows']::TEXT[], '/images/courses/dna-center.jpg', 4.7, 145, ARRAY['Cisco', 'DNA Center', 'Intent-Based']::TEXT[], 50, 48, ARRAY['devnet-002']::TEXT[], NOW(), NOW()),

('devnet-004', 'REST APIs สำหรับ Networking', 'REST APIs for Networking', 'เรียนรู้ REST API concepts, JSON, และการ integrate network devices ผ่าน APIs', 'REST API concepts, JSON, and network device integration through APIs.', 'intermediate', 45, 4, 'available', ARRAY['Video lessons', 'API labs', 'Certificate']::TEXT[], ARRAY['REST concepts', 'Postman', 'API authentication']::TEXT[], '/images/courses/rest-api.jpg', 4.8, 178, ARRAY['API', 'REST', 'JSON', 'DevNet']::TEXT[], 65, 38, ARRAY['devnet-001']::TEXT[], NOW(), NOW()),

('devnet-005', 'Git สำหรับ Network Automation', 'Git for Network Automation', 'เรียนรู้ Git version control, GitHub/GitLab workflows, และ CI/CD pipelines สำหรับ network code', 'Git version control, GitHub/GitLab workflows, and CI/CD pipelines for network code.', 'beginner', 299, 3, 'available', ARRAY['Video lessons', 'Git exercises', 'Certificate']::TEXT[], ARRAY['Version control', 'Branching', 'Pull requests']::TEXT[], '/images/courses/git-networking.jpg', 4.6, 134, ARRAY['Git', 'DevOps', 'CI/CD', 'Automation']::TEXT[], 90, 25, ARRAY[]::TEXT[], NOW(), NOW());

-- ============================================
-- RESOURCES - 20 Networking Resources
-- ============================================

INSERT INTO resources (id, name_th, name_en, description_th, description_en, resource_type, location, category, rating, tags, image_url, created_at) VALUES
-- Tools
('res-001', 'Cisco Packet Tracer', 'Cisco Packet Tracer', 'เครื่องมือ network simulation ฟรีจาก Cisco สำหรับ lab practice และ CCNA/CCNP preparation', 'Free network simulation tool from Cisco for lab practice and CCNA/CCNP preparation.', 'tool', 'https://www.netacad.com/portal/resources/packet-tracer', 'Simulation', 4.9, ARRAY['Tool', 'Cisco', 'Simulation', 'CCNA', 'Free']::TEXT[], '/images/resources/packet-tracer.png', NOW()),

('res-002', 'Wireshark', 'Wireshark', 'โปรแกรม packet analyzer ฟรี สำหรับ network troubleshooting และ protocol analysis', 'Free packet analyzer for network troubleshooting and protocol analysis.', 'tool', 'https://www.wireshark.org/', 'Analysis', 4.9, ARRAY['Tool', 'Analysis', 'Free', 'Packet Capture']::TEXT[], '/images/resources/wireshark.png', NOW()),

('res-003', 'GNS3', 'GNS3', 'Network simulation software รองรับ real Cisco IOS, Juniper, และ other vendors', 'Network simulation software supporting real Cisco IOS, Juniper, and other vendors.', 'tool', 'https://www.gns3.com/', 'Simulation', 4.7, ARRAY['Tool', 'Simulation', 'GNS3', 'Cisco IOS']::TEXT[], '/images/resources/gns3.png', NOW()),

('res-004', 'Cisco IOSv', 'Cisco IOSv', 'Virtual Cisco router/switch images สำหรับ GNS3 และ VIRL labs', 'Virtual Cisco router/switch images for GNS3 and VIRL labs.', 'tool', 'https://developer.cisco.com/docs/virl/', 'Virtualization', 4.8, ARRAY['Tool', 'Cisco', 'Virtual', 'Lab']::TEXT[], '/images/resources/iosv.png', NOW()),

('res-005', 'Netmiko', 'Netmiko', 'Python library สำหรับ SSH connectivity ไปยัง network devices', 'Python library for SSH connectivity to network devices.', 'tool', 'https://github.com/ktbyers/netmiko', 'Automation', 4.8, ARRAY['Tool', 'Python', 'Automation', 'SSH']::TEXT[], '/images/resources/netmiko.png', NOW()),

('res-006', 'NAPALM', 'NAPALM', 'Python library สำหรับ network automation รองรับหลาย vendors', 'Python library for multi-vendor network automation.', 'tool', 'https://napalm.readthedocs.io/', 'Automation', 4.7, ARRAY['Tool', 'Python', 'Automation', 'Multi-vendor']::TEXT[], '/images/resources/napalm.png', NOW()),

-- Documentation
('res-007', 'Cisco Learning Network', 'Cisco Learning Network', 'Official Cisco learning resources, forums, และ exam topics สำหรับ certifications', 'Official Cisco learning resources, forums, and exam topics for certifications.', 'documentation', 'https://learningnetwork.cisco.com/', 'Learning', 4.8, ARRAY['Documentation', 'Cisco', 'Certification', 'Forum']::TEXT[], '/images/resources/cisco-learning.png', NOW()),

('res-008', 'RFC Editor', 'RFC Editor', 'เอกสาร RFC ทั้งหมดเกี่ยวกับ internet protocols และ standards', 'Complete RFC documents for internet protocols and standards.', 'documentation', 'https://www.rfc-editor.org/', 'Standards', 4.9, ARRAY['Documentation', 'RFC', 'Standards', 'Protocols']::TEXT[], '/images/resources/rfc-editor.png', NOW()),

('res-009', 'Cisco Command Reference', 'Cisco Command Reference', 'คู่มืออ้างอิงคำสั่ง Cisco IOS ฉบับสมบูรณ์', 'Complete Cisco IOS command reference guide.', 'documentation', 'https://www.cisco.com/c/en/us/support/index.html', 'Reference', 4.8, ARRAY['Documentation', 'Cisco', 'Commands', 'Reference']::TEXT[], '/images/resources/cisco-commands.png', NOW()),

('res-010', 'IANA Protocol Numbers', 'IANA Protocol Numbers', 'Official registry สำหรับ protocol numbers และ port numbers', 'Official registry for protocol numbers and port numbers.', 'documentation', 'https://www.iana.org/assignments/protocol-numbers/protocol-numbers.xhtml', 'Reference', 4.7, ARRAY['Documentation', 'IANA', 'Protocols', 'Ports']::TEXT[], '/images/resources/iana.png', NOW()),

-- Videos
('res-011', 'David Bombal YouTube', 'David Bombal YouTube', 'YouTube channel ยอดนิยมสำหรับ Cisco certifications และ networking tutorials', 'Popular YouTube channel for Cisco certifications and networking tutorials.', 'video', 'https://www.youtube.com/@DavidBombal', 'Video Tutorial', 4.9, ARRAY['Video', 'Tutorial', 'Cisco', 'CCNA', 'CCNP']::TEXT[], '/images/resources/david-bombal.png', NOW()),

('res-012', 'NetworkChuck YouTube', 'NetworkChuck YouTube', 'YouTube channel สอน networking และ cloud ด้วย style ที่สนุก', 'YouTube channel teaching networking and cloud with fun style.', 'video', 'https://www.youtube.com/@NetworkChuck', 'Video Tutorial', 4.8, ARRAY['Video', 'Tutorial', 'Networking', 'Cloud']::TEXT[], '/images/resources/networkchuck.png', NOW()),

('res-013', 'Pete Long YouTube', 'Pete Long YouTube', 'CCNA/CCNP tutorials จาก experienced instructor ด้วย explanation ที่ชัดเจน', 'CCNA/CCNP tutorials from experienced instructor with clear explanations.', 'video', 'https://www.youtube.com/@PeteLong', 'Video Tutorial', 4.8, ARRAY['Video', 'Tutorial', 'CCNA', 'CCNP']::TEXT[], '/images/resources/pete-long.png', NOW()),

-- Tutorials
('res-014', 'คอร์ส CCNA ภาษาไทย', 'Thai CCNA Course', 'คอร์ส CCNA 200-301 สอนเป็นภาษาไทย ครอบคลุมทุกหัวข้อสำหรับสอบ', 'CCNA 200-301 course in Thai language covering all exam topics.', 'tutorial', 'https://www.youtube.com/playlist?list=PLl3dRxlR7m4', 'Video Tutorial', 4.7, ARRAY['Tutorial', 'Thai', 'CCNA', 'Local Language']::TEXT[], '/images/resources/thai-ccna.png', NOW()),

-- External Links
('res-015', 'Cisco NetAcad', 'Cisco NetAcad', 'Official Cisco networking academy พร้อม courses และ labs', 'Official Cisco networking academy with courses and labs.', 'external_link', 'https://www.netacad.com/', 'Learning Platform', 4.8, ARRAY['External', 'Cisco', 'Academy', 'Courses']::TEXT[], '/images/resources/netacad.png', NOW()),

('res-016', 'TechExams Network', 'TechExams Network', 'Forum สำหรับ discuss certifications และ share study materials', 'Forum for discussing certifications and sharing study materials.', 'external_link', 'https://www.techexams.net/', 'Forum', 4.6, ARRAY['External', 'Forum', 'Certification', 'Community']::TEXT[], '/images/resources/techexams.png', NOW()),

('res-017', 'StackOverflow Networking', 'StackOverflow Networking', 'Q&A platform สำหรับ networking questions และ troubleshooting', 'Q&A platform for networking questions and troubleshooting.', 'external_link', 'https://networkengineering.stackexchange.com/', 'Q&A', 4.7, ARRAY['External', 'Q&A', 'Troubleshooting', 'Community']::TEXT[], '/images/resources/stackexchange.png', NOW()),

('res-018', 'PacketLife.net', 'PacketLife.net', 'Cheat sheets และ reference materials สำหรับ networking professionals', 'Cheat sheets and reference materials for networking professionals.', 'documentation', 'https://packetlife.net/', 'Reference', 4.8, ARRAY['Documentation', 'Cheat Sheets', 'Reference']::TEXT[], '/images/resources/packetlife.png', NOW()),

('res-019', 'IP Subnet Calculator', 'IP Subnet Calculator', 'Online tool สำหรับคำนวณ subnet และ IP addressing', 'Online tool for subnet calculation and IP addressing.', 'tool', 'https://www.subnet-calculator.com/', 'Calculator', 4.7, ARRAY['Tool', 'Calculator', 'Subnet', 'IP']::TEXT[], '/images/resources/subnet-calc.png', NOW()),

('res-020', 'Subnet Calculator 101', 'Subnet Calculator 101', 'อีกหนึ่ง subnet calculator พร้อม visual representation', 'Another subnet calculator with visual representation.', 'tool', 'https://www.calculator.net/subnet-calculator.html', 'Calculator', 4.6, ARRAY['Tool', 'Calculator', 'Subnet', 'Visual']::TEXT[], '/images/resources/subnet-calc-101.png', NOW());

-- ============================================
-- LEARNING PATHS - 5 Certification Tracks
-- ============================================

INSERT INTO learning_paths (id, name_th, name_en, description_th, description_en, from_level, to_level, duration, path_type, price, availability, seats_left, modules, operator, frequency, created_at, updated_at) VALUES
('path-001', 'เส้นทาง CCNA 200-301', 'CCNA 200-301 Certification Track', 'เส้นทางเรียนรู้สำหรับสอบ Cisco CCNA 200-301 ครอบคลุมทุกหัวข้อที่ออกสอบ', 'Complete learning path for Cisco CCNA 200-301 exam, covering all exam topics.', 'beginner', 'intermediate', '6 months', 'sequential', 8999, 'available', 200, ARRAY['ccna-001', 'ccna-002', 'ccna-003', 'ccna-004', 'ccna-005', 'ccna-006', 'ccna-007', 'ccna-008']::TEXT[], 'self_paced', 'flexible', NOW(), NOW()),

('path-002', 'เส้นทาง Network Security Specialist', 'Network Security Specialist Track', 'เส้นทางสำหรับผู้ที่ต้องการเชี่ยวชาญด้านความปลอดภัยเครือข่าย', 'Path for those who want to specialize in network security.', 'intermediate', 'advanced', '4 months', 'sequential', 6999, 'available', 150, ARRAY['sec-001', 'sec-002', 'sec-003', 'sec-004', 'sec-005', 'sec-006']::TEXT[], 'self_paced', 'flexible', NOW(), NOW()),

('path-003', 'เส้นทาง CCNP Enterprise', 'CCNP Enterprise Track', 'เส้นทางสำหรับสอบ CCNP Enterprise ด้วย advanced routing และ switching', 'Path for CCNP Enterprise exam with advanced routing and switching.', 'intermediate', 'advanced', '8 months', 'sequential', 12999, 'available', 100, ARRAY['ccna-002', 'ccna-003', 'adv-001', 'adv-002', 'adv-003', 'adv-004']::TEXT[], 'self_paced', 'flexible', NOW(), NOW()),

('path-004', 'เส้นทาง Network Troubleshooting Expert', 'Network Troubleshooting Expert Track', 'เส้นทางสำหรับพัฒนาทักษะการแก้ไขปัญหาเครือข่ายระดับมืออาชีพ', 'Path for developing professional network troubleshooting skills.', 'intermediate', 'advanced', '4 months', 'sequential', 5499, 'available', 180, ARRAY['troubleshoot-001', 'troubleshoot-002', 'troubleshoot-003', 'troubleshoot-004', 'troubleshoot-005']::TEXT[], 'self_paced', 'flexible', NOW(), NOW()),

('path-005', 'เส้นทาง Network Automation Engineer', 'Network Automation Engineer Track', 'เส้นทางสำหรับ Network Engineer ที่ต้องการเรียนรู้ automation และ programmability', 'Path for Network Engineers wanting to learn automation and programmability.', 'beginner', 'advanced', '5 months', 'sequential', 7999, 'available', 120, ARRAY['devnet-005', 'devnet-001', 'devnet-004', 'devnet-002', 'devnet-003']::TEXT[], 'self_paced', 'flexible', NOW(), NOW());

-- ============================================
-- LESSONS - 15 Lessons for key courses
-- ============================================

INSERT INTO lessons (id, course_id, title_th, title_en, content_th, content_en, lesson_type, duration_minutes, order_index, video_url, thumbnail_url, created_at, updated_at) VALUES
-- CCNA 001 Lessons
('lesson-ccna001-01', 'ccna-001', 'บทนำสู่เครือข่ายคอมพิวเตอร์', 'Introduction to Computer Networks', 'เรียนรู้พื้นฐานการทำงานของเครือข่ายและความสำคัญในยุคดิจิทัล', 'Learn the fundamentals of how networks work and their importance in the digital age.', 'video', 45, 1, 'https://example.com/videos/ccna001-01', '/images/lessons/network-intro.jpg', NOW(), NOW()),

('lesson-ccna001-02', 'ccna-001', 'โมเดล OSI 7 Layers', 'OSI 7 Layers Model', 'ทำความเข้าใจโมเดล OSI และหน้าที่ของแต่ละ layer', 'Understand the OSI model and the functions of each layer.', 'video', 60, 2, 'https://example.com/videos/ccna001-02', '/images/lessons/osi-model.jpg', NOW(), NOW()),

('lesson-ccna001-03', 'ccna-001', 'TCP/IP Protocol Suite', 'TCP/IP Protocol Suite', 'เรียนรู้ TCP/IP model และ protocols ต่างๆ ในชุดโปรโตคอล', 'Learn the TCP/IP model and various protocols in the suite.', 'reading', 30, 3, NULL, '/images/lessons/tcpip.jpg', NOW(), NOW()),

('lesson-ccna001-04', 'ccna-001', 'Network Devices', 'Network Devices', 'ทำความรู้จักอุปกรณ์เครือข่ายต่างๆ เช่น Router, Switch, Hub', 'Learn about network devices such as Router, Switch, Hub.', 'video', 40, 4, 'https://example.com/videos/ccna001-04', '/images/lessons/network-devices.jpg', NOW(), NOW()),

('lesson-ccna001-05', 'ccna-001', 'IP Addressing and Subnetting', 'IP Addressing and Subnetting', 'เรียนรู้การกำหนด IP address และการคำนวณ subnet', 'Learn IP address assignment and subnet calculation.', 'video', 55, 5, 'https://example.com/videos/ccna001-05', '/images/lessons/ip-addressing.jpg', NOW(), NOW()),

-- Wireshark Lessons
('lesson-wireshark-01', 'troubleshoot-001', 'การติดตั้งและใช้งาน Wireshark', 'Installing and Using Wireshark', 'เรียนรู้การติดตั้งและใช้งาน Wireshark เบื้องต้น', 'Learn how to install and use Wireshark basics.', 'video', 50, 1, 'https://example.com/videos/wireshark-01', '/images/lessons/wireshark-intro.jpg', NOW(), NOW()),

('lesson-wireshark-02', 'troubleshoot-001', 'การวิเคราะห์ TCP Packets', 'Analyzing TCP Packets', 'เรียนรู้การวิเคราะห์ TCP three-way handshake และ packet flow', 'Learn to analyze TCP three-way handshake and packet flow.', 'video', 60, 2, 'https://example.com/videos/wireshark-02', '/images/lessons/tcp-analysis.jpg', NOW(), NOW()),

('lesson-wireshark-03', 'troubleshoot-001', 'การวิเคราะห์ UDP และ DNS', 'UDP and DNS Analysis', 'เรียนรู้การวิเคราะห์ UDP packets และ DNS queries', 'Learn to analyze UDP packets and DNS queries.', 'video', 45, 3, 'https://example.com/videos/wireshark-03', '/images/lessons/dns-analysis.jpg', NOW(), NOW()),

-- Python Lessons
('lesson-python-01', 'devnet-001', 'พื้นฐาน Python', 'Python Basics', 'เรียนรู้พื้นฐาน Python programming สำหรับ network engineers', 'Learn Python basics for network engineers.', 'video', 90, 1, 'https://example.com/videos/python-01', '/images/lessons/python-basics.jpg', NOW(), NOW()),

('lesson-python-02', 'devnet-001', 'การใช้ Netmiko', 'Using Netmiko', 'เรียนรู้การใช้ Netmiko library สำหรับ SSH ไปยัง network devices', 'Learn to use Netmiko library for SSH to network devices.', 'video', 75, 2, 'https://example.com/videos/python-02', '/images/lessons/netmiko.jpg', NOW(), NOW()),

('lesson-python-03', 'devnet-001', 'การใช้ NAPALM', 'Using NAPALM', 'เรียนรู้การใช้ NAPALM สำหรับ multi-vendor network automation', 'Learn to use NAPALM for multi-vendor network automation.', 'video', 80, 3, 'https://example.com/videos/python-03', '/images/lessons/napalm.jpg', NOW(), NOW()),

-- Security Lessons
('lesson-sec-01', 'sec-001', 'Firewall Basics', 'Firewall Basics', 'เรียนรู้หลักการทำงานของ Firewall และ packet filtering', 'Learn firewall operation principles and packet filtering.', 'video', 55, 1, 'https://example.com/videos/sec-01', '/images/lessons/firewall-basics.jpg', NOW(), NOW()),

('lesson-sec-02', 'sec-001', 'Stateful Inspection', 'Stateful Inspection', 'เรียนรู้การทำงานของ Stateful inspection firewall', 'Learn how stateful inspection firewalls work.', 'video', 50, 2, 'https://example.com/videos/sec-02', '/images/lessons/stateful.jpg', NOW(), NOW()),

-- Routing Lessons
('lesson-adv-001', 'adv-001', 'OSPF Areas and LSA Types', 'OSPF Areas and LSA Types', 'เรียนรู้ OSPF area types และ LSA types ต่างๆ', 'Learn OSPF area types and different LSA types.', 'video', 65, 1, 'https://example.com/videos/ospf-01', '/images/lessons/ospf-areas.jpg', NOW(), NOW()),

('lesson-adv-002', 'adv-001', 'OSPF Route Summarization', 'OSPF Route Summarization', 'เรียนรู้การ summarize routes ใน OSPF', 'Learn route summarization in OSPF.', 'video', 60, 2, 'https://example.com/videos/ospf-02', '/images/lessons/ospf-summary.jpg', NOW(), NOW());

-- ============================================
-- PRACTICE EXERCISES - 20 Quiz Questions
-- ============================================

INSERT INTO practice_exercises (id, name_th, name_en, description_th, description_en, exercise_type, location, duration, price, group_size, difficulty, availability, target_audience, includes, highlights, image_url, rating, best_time, created_at, updated_at) VALUES
-- CCNA Exercises
('ex-001', 'แบบทดสอบ OSI Model', 'OSI Model Quiz', 'แบบทดสอบความเข้าใจโมเดล OSI 7 Layers', 'Quiz on understanding the OSI 7 Layers model.', 'quiz', '/exercises/osi-quiz', '20 minutes', 0, 'individual', 'easy', 'available', ARRAY['Beginners', 'CCNA candidates']::TEXT[], ARRAY['Multiple choice', 'Instant feedback']::TEXT[], ARRAY['OSI layers', 'Protocols']::TEXT[], '/images/exercises/osi-quiz.jpg', 4.5, '15 minutes', NOW(), NOW()),

('ex-002', 'แบบทดสอบ TCP/IP Protocol Suite', 'TCP/IP Protocol Suite Quiz', 'แบบทดสอบความเข้าใจ TCP/IP protocols', 'Quiz on understanding TCP/IP protocols.', 'quiz', '/exercises/tcpip-quiz', '25 minutes', 0, 'individual', 'easy', 'available', ARRAY['Beginners', 'CCNA candidates']::TEXT[], ARRAY['Multiple choice', 'Explanation']::TEXT[], ARRAY['TCP', 'UDP', 'IP']::TEXT[], '/images/exercises/tcpip-quiz.jpg', 4.4, '18 minutes', NOW(), NOW()),

('ex-003', 'แบบทดสอบ Subnetting', 'Subnetting Quiz', 'แบบทดสอบการคำนวณ subnet และ IP addressing', 'Quiz on subnet calculation and IP addressing.', 'quiz', '/exercises/subnet-quiz', '30 minutes', 0, 'individual', 'moderate', 'available', ARRAY['CCNA candidates', 'Network engineers']::TEXT[], ARRAY['Calculation problems', 'Step-by-step']::TEXT[], ARRAY['Subnet mask', 'CIDR', 'VLSM']::TEXT[], '/images/exercises/subnet-quiz.jpg', 4.7, '22 minutes', NOW(), NOW()),

('ex-004', 'แบบทดสอบ VLAN Configuration', 'VLAN Configuration Quiz', 'แบบทดสอบการ configure VLANs และ trunking', 'Quiz on configuring VLANs and trunking.', 'quiz', '/exercises/vlan-quiz', '25 minutes', 0, 'individual', 'moderate', 'available', ARRAY['CCNA candidates', 'Switch administrators']::TEXT[], ARRAY['Configuration scenarios', 'Diagram-based']::TEXT[], ARRAY['VLAN', 'Trunk', 'VTP']::TEXT[], '/images/exercises/vlan-quiz.jpg', 4.6, '20 minutes', NOW(), NOW()),

('ex-005', 'แบบทดสอบ Routing Protocols', 'Routing Protocols Quiz', 'แบบทดสอบความเข้าใจ routing protocols', 'Quiz on understanding routing protocols.', 'quiz', '/exercises/routing-quiz', '30 minutes', 0, 'individual', 'moderate', 'available', ARRAY['CCNA candidates', 'Network engineers']::TEXT[], ARRAY['Comparison questions', 'Scenario-based']::TEXT[], ARRAY['OSPF', 'EIGRP', 'RIP']::TEXT[], '/images/exercises/routing-quiz.jpg', 4.5, '25 minutes', NOW(), NOW()),

('ex-006', 'แบบทดสอบ OSPF', 'OSPF Quiz', 'แบบทดสอบความเข้าใจ OSPF routing protocol', 'Quiz on understanding OSPF routing protocol.', 'quiz', '/exercises/ospf-quiz', '35 minutes', 0, 'individual', 'challenging', 'available', ARRAY['CCNP candidates', 'Advanced engineers']::TEXT[], ARRAY['LSA types', 'Area types', 'Calculations']::TEXT[], ARRAY['OSPF', 'Areas', 'LSA']::TEXT[], '/images/exercises/ospf-quiz.jpg', 4.8, '28 minutes', NOW(), NOW()),

('ex-007', 'แบบทดสอบ BGP', 'BGP Quiz', 'แบบทดสอบความเข้าใจ BGP routing protocol', 'Quiz on understanding BGP routing protocol.', 'quiz', '/exercises/bgp-quiz', '40 minutes', 0, 'individual', 'challenging', 'available', ARRAY['CCNP candidates', 'ISP engineers']::TEXT[], ARRAY['BGP attributes', 'AS path', 'Neighbor states']::TEXT[], ARRAY['BGP', 'AS', 'Attributes']::TEXT[], '/images/exercises/bgp-quiz.jpg', 4.9, '32 minutes', NOW(), NOW()),

-- Wireshark Exercises
('ex-008', 'แบบทดสอบ Wireshark Basics', 'Wireshark Basics Quiz', 'แบบทดสอบพื้นฐานการใช้ Wireshark', 'Quiz on Wireshark basics.', 'quiz', '/exercises/wireshark-basics', '20 minutes', 0, 'individual', 'easy', 'available', ARRAY['Beginners', 'Troubleshooting students']::TEXT[], ARRAY['Capture analysis', 'Filter usage']::TEXT[], ARRAY['Wireshark', 'Filters', 'Capture']::TEXT[], '/images/exercises/wireshark-basics.jpg', 4.6, '15 minutes', NOW(), NOW()),

('ex-009', 'แบบทดสอบ TCP Analysis', 'TCP Analysis Quiz', 'แบบทดสอบการวิเคราะห์ TCP packets ด้วย Wireshark', 'Quiz on analyzing TCP packets with Wireshark.', 'quiz', '/exercises/tcp-analysis', '30 minutes', 0, 'individual', 'moderate', 'available', ARRAY['Network troubleshooters', 'CCNA candidates']::TEXT[], ARRAY['Three-way handshake', 'Window size', 'Retransmissions']::TEXT[], ARRAY['TCP', 'Handshake', 'Analysis']::TEXT[], '/images/exercises/tcp-analysis.jpg', 4.7, '24 minutes', NOW(), NOW()),

('ex-010', 'แบบทดสอบ DNS Analysis', 'DNS Analysis Quiz', 'แบบทดสอบการวิเคราะห์ DNS traffic ด้วย Wireshark', 'Quiz on analyzing DNS traffic with Wireshark.', 'quiz', '/exercises/dns-analysis', '25 minutes', 0, 'individual', 'moderate', 'available', ARRAY['Network troubleshooters', 'Security analysts']::TEXT[], ARRAY['DNS queries', 'Responses', 'Troubleshooting']::TEXT[], ARRAY['DNS', 'UDP', 'Queries']::TEXT[], '/images/exercises/dns-analysis.jpg', 4.5, '20 minutes', NOW(), NOW()),

-- Security Exercises
('ex-011', 'แบบทดสอบ Firewall Fundamentals', 'Firewall Fundamentals Quiz', 'แบบทดสอบความเข้าใจ Firewall operation', 'Quiz on understanding firewall operation.', 'quiz', '/exercises/firewall-quiz', '25 minutes', 0, 'individual', 'moderate', 'available', ARRAY['Security students', 'CCNA Security']::TEXT[], ARRAY['Packet filtering', 'Stateful inspection', 'Zones']::TEXT[], ARRAY['Firewall', 'Security', 'Zones']::TEXT[], '/images/exercises/firewall-quiz.jpg', 4.6, '22 minutes', NOW(), NOW()),

('ex-012', 'แบบทดสอบ VPN Technologies', 'VPN Technologies Quiz', 'แบบทดสอบความเข้าใจ VPN protocols และ configuration', 'Quiz on understanding VPN protocols and configuration.', 'quiz', '/exercises/vpn-quiz', '30 minutes', 0, 'individual', 'challenging', 'available', ARRAY['Security engineers', 'CCNP Security']::TEXT[], ARRAY['IPSec', 'SSL VPN', 'Tunnel modes']::TEXT[], ARRAY['VPN', 'IPSec', 'Tunneling']::TEXT[], '/images/exercises/vpn-quiz.jpg', 4.7, '26 minutes', NOW(), NOW()),

('ex-013', 'แบบทดสอบ ACL Configuration', 'ACL Configuration Quiz', 'แบบทดสอบการ configure ACLs บน Cisco devices', 'Quiz on configuring ACLs on Cisco devices.', 'quiz', '/exercises/acl-quiz', '25 minutes', 0, 'individual', 'moderate', 'available', ARRAY['CCNA candidates', 'Network administrators']::TEXT[], ARRAY['Standard ACL', 'Extended ACL', 'Named ACL']::TEXT[], ARRAY['ACL', 'Security', 'Filtering']::TEXT[], '/images/exercises/acl-quiz.jpg', 4.5, '20 minutes', NOW(), NOW()),

-- Python/Automation Exercises
('ex-014', 'แบบทดสอบ Python Basics', 'Python Basics Quiz', 'แบบทดสอบพื้นฐาน Python สำหรับ Network Engineers', 'Quiz on Python basics for Network Engineers.', 'quiz', '/exercises/python-basics', '30 minutes', 0, 'individual', 'easy', 'available', ARRAY['Automation students', 'DevNet candidates']::TEXT[], ARRAY['Variables', 'Loops', 'Functions']::TEXT[], ARRAY['Python', 'Programming', 'Basics']::TEXT[], '/images/exercises/python-basics.jpg', 4.6, '22 minutes', NOW(), NOW()),

('ex-015', 'แบบทดสอบ Netmiko', 'Netmiko Quiz', 'แบบทดสอบการใช้ Netmiko library', 'Quiz on using the Netmiko library.', 'quiz', '/exercises/netmiko-quiz', '35 minutes', 0, 'individual', 'moderate', 'available', ARRAY['Automation engineers', 'DevNet candidates']::TEXT[], ARRAY['SSH connection', 'Send commands', 'Exception handling']::TEXT[], ARRAY['Netmiko', 'SSH', 'Automation']::TEXT[], '/images/exercises/netmiko-quiz.jpg', 4.7, '28 minutes', NOW(), NOW()),

-- Network Troubleshooting Exercises
('ex-016', 'แบบทดสอบ Network Diagnostics', 'Network Diagnostics Quiz', 'แบบทดสอบการใช้ diagnostic tools', 'Quiz on using diagnostic tools.', 'quiz', '/exercises/diagnostics-quiz', '25 minutes', 0, 'individual', 'easy', 'available', ARRAY['All levels', 'CCNA candidates']::TEXT[], ARRAY['Ping', 'Traceroute', 'NSlookup']::TEXT[], ARRAY['Diagnostics', 'Tools', 'Troubleshooting']::TEXT[], '/images/exercises/diagnostics-quiz.jpg', 4.4, '18 minutes', NOW(), NOW()),

('ex-017', 'แบบทดสอบ Cisco IOS Troubleshooting', 'Cisco IOS Troubleshooting Quiz', 'แบบทดสอบการแก้ไขปัญหาบน Cisco IOS', 'Quiz on troubleshooting Cisco IOS.', 'quiz', '/exercises/ios-troubleshoot', '35 minutes', 0, 'individual', 'challenging', 'available', ARRAY['CCNA candidates', 'Network administrators']::TEXT[], ARRAY['Debug commands', 'Logging', 'Show commands']::TEXT[], ARRAY['Cisco IOS', 'Debugging', 'Troubleshooting']::TEXT[], '/images/exercises/ios-troubleshoot.jpg', 4.8, '30 minutes', NOW(), NOW()),

('ex-018', 'แบบทดสอบ NAT Configuration', 'NAT Configuration Quiz', 'แบบทดสอบการ configure NAT บน routers', 'Quiz on configuring NAT on routers.', 'quiz', '/exercises/nat-quiz', '25 minutes', 0, 'individual', 'moderate', 'available', ARRAY['CCNA candidates', 'Network engineers']::TEXT[], ARRAY['Static NAT', 'Dynamic NAT', 'PAT']::TEXT[], ARRAY['NAT', 'Translation', 'PAT']::TEXT[], '/images/exercises/nat-quiz.jpg', 4.5, '22 minutes', NOW(), NOW()),

('ex-019', 'แบบทดสอบ DHCP', 'DHCP Quiz', 'แบบทดสอบความเข้าใจ DHCP operation', 'Quiz on understanding DHCP operation.', 'quiz', '/exercises/dhcp-quiz', '20 minutes', 0, 'individual', 'easy', 'available', ARRAY['Beginners', 'CCNA candidates']::TEXT[], ARRAY['DHCP discovery', 'Offer', 'Request', 'Ack']::TEXT[], ARRAY['DHCP', 'IP Assignment', 'UDP']::TEXT[], '/images/exercises/dhcp-quiz.jpg', 4.5, '15 minutes', NOW(), NOW()),

('ex-020', 'แบบทดสอบ STP', 'STP Quiz', 'แบบทดสอบความเข้าใจ Spanning Tree Protocol', 'Quiz on understanding Spanning Tree Protocol.', 'quiz', '/exercises/stp-quiz', '30 minutes', 0, 'individual', 'challenging', 'available', ARRAY['CCNA candidates', 'Switch administrators']::TEXT[], ARRAY['Port states', 'BPDU', 'Root bridge']::TEXT[], ARRAY['STP', 'Switching', 'Redundancy']::TEXT[], '/images/exercises/stp-quiz.jpg', 4.7, '25 minutes', NOW(), NOW());