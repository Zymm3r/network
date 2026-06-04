/* ═══════════════════════════════════════════════════════════════
   Course-Specific Quiz & Exercise Content
   แบบทดสอบและแบบฝึกหัดเฉพาะตามหลักสูตร
   ═══════════════════════════════════════════════════════════════ */

export interface QuizQuestion {
  id: number;
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
  hint?: string;
}

export interface TestCase {
  input: string;
  expected: string;
  passed?: boolean;
}

export interface ExerciseData {
  title: string;
  description: string;
  starterCode: string;
  solutionCode: string;
  testCases: TestCase[];
  hint: string;
  xpReward: number;
}

/* ─────────────────────────────────────────
   DEFAULT FALLBACK (พื้นฐานเครือข่าย)
───────────────────────────────────────── */
export const DEFAULT_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'โมเดล OSI มีกี่ Layer?',
    choices: ['4 Layers', '5 Layers', '7 Layers', '6 Layers'],
    correctIndex: 2,
    explanation: 'โมเดล OSI (Open Systems Interconnection) มี 7 Layers ได้แก่ Physical, Data Link, Network, Transport, Session, Presentation, Application',
    hint: 'นับจาก Physical ขึ้นไปถึง Application',
  },
  {
    id: 2,
    question: 'Protocol ใดทำงานที่ Layer 3 (Network Layer)?',
    choices: ['HTTP', 'TCP', 'IP', 'Ethernet'],
    correctIndex: 2,
    explanation: 'IP (Internet Protocol) ทำงานที่ Network Layer (Layer 3) ทำหน้าที่ routing และ addressing',
  },
  {
    id: 3,
    question: 'Subnet Mask 255.255.255.0 เทียบเท่ากับ CIDR ใด?',
    choices: ['/8', '/16', '/24', '/32'],
    correctIndex: 2,
    explanation: '/24 หมายถึง 24 bits แรกเป็น network portion ซึ่งเท่ากับ 255.255.255.0',
    hint: 'นับจำนวน bit 1 ใน subnet mask',
  },
  {
    id: 4,
    question: 'อุปกรณ์ใดทำงานที่ Layer 2?',
    choices: ['Router', 'Switch', 'Hub', 'Firewall'],
    correctIndex: 1,
    explanation: 'Switch ทำงานที่ Data Link Layer (Layer 2) โดยใช้ MAC address ในการ forward frames',
  },
  {
    id: 5,
    question: 'TCP แตกต่างจาก UDP อย่างไร?',
    choices: [
      'TCP เร็วกว่า UDP',
      'TCP มี connection-oriented และ reliable delivery',
      'UDP มี error correction ดีกว่า',
      'TCP ใช้สำหรับ video streaming เท่านั้น',
    ],
    correctIndex: 1,
    explanation: 'TCP เป็น connection-oriented protocol ที่มีการ handshake และ reliable delivery ขณะที่ UDP เป็น connectionless',
    hint: 'คิดถึง Three-way Handshake',
  },
];

export const DEFAULT_EXERCISE: ExerciseData = {
  title: 'คำนวณ Subnet',
  description: 'จงเขียนฟังก์ชันที่คำนวณจำนวน host ที่สามารถใช้งานได้จาก CIDR notation ที่กำหนดให้',
  starterCode: `def calc_hosts(cidr_prefix):
    # คำนวณจำนวน usable hosts จาก CIDR prefix
    # เช่น /24 = 254 hosts, /30 = 2 hosts
    pass

print(calc_hosts(24))`,
  solutionCode: `def calc_hosts(cidr_prefix):
    host_bits = 32 - cidr_prefix
    total = (2 ** host_bits) - 2
    return max(total, 0)

print(calc_hosts(24))`,
  testCases: [
    { input: 'calc_hosts(24)', expected: '254' },
    { input: 'calc_hosts(30)', expected: '2' },
    { input: 'calc_hosts(16)', expected: '65534' },
  ],
  hint: 'จำนวน host = 2^(32-prefix) - 2 (ลบ network address และ broadcast)',
  xpReward: 25,
};

/* ═══════════════════════════════════════════════════════════════
   CCNA TRACK
   ═══════════════════════════════════════════════════════════════ */

const CCNA_001_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'Layer ใดของโมเดล OSI รับผิดชอบเรื่อง Routing?',
    choices: ['Layer 1 - Physical', 'Layer 2 - Data Link', 'Layer 3 - Network', 'Layer 4 - Transport'],
    correctIndex: 2,
    explanation: 'Network Layer (Layer 3) รับผิดชอบเรื่อง logical addressing (IP) และ routing ของ packets',
    hint: 'Router ทำงานที่ Layer ใด?',
  },
  {
    id: 2,
    question: 'IP Address 192.168.1.0/24 เป็น Class ใด?',
    choices: ['Class A', 'Class B', 'Class C', 'Class D'],
    correctIndex: 2,
    explanation: 'IP Address ที่เริ่มต้นด้วย 192-223 จัดอยู่ใน Class C ซึ่ง default subnet mask คือ /24',
  },
  {
    id: 3,
    question: 'TCP Three-way Handshake ใช้ flags อะไรบ้างตามลำดับ?',
    choices: ['SYN → ACK → FIN', 'SYN → SYN-ACK → ACK', 'ACK → SYN → FIN', 'FIN → ACK → RST'],
    correctIndex: 1,
    explanation: 'TCP Three-way Handshake: Client ส่ง SYN, Server ตอบ SYN-ACK, Client ส่ง ACK เพื่อสร้าง connection',
    hint: 'เริ่มจาก SYN',
  },
  {
    id: 4,
    question: 'Private IP Address range ใดที่ถูกต้อง?',
    choices: ['1.0.0.0 - 1.255.255.255', '10.0.0.0 - 10.255.255.255', '100.0.0.0 - 100.255.255.255', '200.0.0.0 - 200.255.255.255'],
    correctIndex: 1,
    explanation: 'Private IP ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 ตาม RFC 1918',
  },
  {
    id: 5,
    question: 'Port number ใดใช้สำหรับ HTTPS?',
    choices: ['80', '22', '443', '8080'],
    correctIndex: 2,
    explanation: 'HTTPS ใช้ port 443 (HTTP ใช้ port 80, SSH ใช้ port 22)',
    hint: 'เกี่ยวข้องกับ SSL/TLS',
  },
];

const CCNA_001_EXERCISE: ExerciseData = {
  title: 'คำนวณ Subnet และ Usable Hosts',
  description: 'จงเขียนฟังก์ชัน calc_subnet(ip, prefix) ที่รับ IP address และ CIDR prefix แล้ว print จำนวน usable hosts',
  starterCode: `def calc_subnet(ip, prefix):
    # คำนวณจำนวน usable hosts
    # สูตร: 2^(32-prefix) - 2
    pass

calc_subnet("192.168.1.0", 24)`,
  solutionCode: `def calc_subnet(ip, prefix):
    hosts = (2 ** (32 - prefix)) - 2
    print(f"{hosts}")

calc_subnet("192.168.1.0", 24)`,
  testCases: [
    { input: 'calc_subnet("192.168.1.0", 24)', expected: '254' },
    { input: 'calc_subnet("10.0.0.0", 8)', expected: '16777214' },
    { input: 'calc_subnet("172.16.0.0", 30)', expected: '2' },
  ],
  hint: 'usable hosts = 2^(32-prefix) - 2',
  xpReward: 15,
};

const CCNA_002_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'VLAN คืออะไร?',
    choices: [
      'Virtual Local Area Network - แบ่ง broadcast domain แบบ logical',
      'Very Large Area Network',
      'Virtual Link Access Node',
      'Variable Length Area Network',
    ],
    correctIndex: 0,
    explanation: 'VLAN (Virtual LAN) ใช้แบ่ง broadcast domain แบบ logical บน switch ตัวเดียวหรือหลายตัว',
  },
  {
    id: 2,
    question: 'Trunk port ต่างจาก Access port อย่างไร?',
    choices: [
      'Trunk port เร็วกว่า Access port',
      'Trunk port carry ได้หลาย VLAN ขณะที่ Access port อยู่ VLAN เดียว',
      'Access port ใช้สำหรับ Router เท่านั้น',
      'Trunk port ไม่รองรับ tagging',
    ],
    correctIndex: 1,
    explanation: 'Trunk port สามารถ carry traffic จากหลาย VLAN โดยใช้ 802.1Q tagging ส่วน Access port อยู่ใน VLAN เดียว',
    hint: 'คิดถึง 802.1Q tagging',
  },
  {
    id: 3,
    question: 'STP (Spanning Tree Protocol) ใช้ทำอะไร?',
    choices: ['เพิ่มความเร็วเครือข่าย', 'ป้องกัน switching loops', 'เข้ารหัสข้อมูล', 'จัดการ IP address'],
    correctIndex: 1,
    explanation: 'STP ป้องกัน Layer 2 loops โดยการ block redundant paths และสร้าง loop-free topology',
  },
  {
    id: 4,
    question: 'VLAN 1 มีความพิเศษอย่างไร?',
    choices: [
      'เป็น VLAN ที่เร็วที่สุด',
      'เป็น default/native VLAN บน Cisco switches',
      'ใช้สำหรับ management เท่านั้น',
      'ไม่สามารถลบได้แต่ไม่มีความสำคัญ',
    ],
    correctIndex: 1,
    explanation: 'VLAN 1 เป็น default VLAN ที่ ports ทั้งหมดอยู่เมื่อเริ่มต้น และเป็น native VLAN default บน trunk',
  },
  {
    id: 5,
    question: 'EtherChannel คืออะไร?',
    choices: [
      'Protocol สำหรับเข้ารหัส Ethernet',
      'การรวม physical links หลายเส้นเป็น logical link เดียว',
      'วิธีการแบ่ง VLAN',
      'Ethernet encryption protocol',
    ],
    correctIndex: 1,
    explanation: 'EtherChannel (Link Aggregation) รวม physical links หลายเส้นเข้าด้วยกันเพื่อเพิ่ม bandwidth และ redundancy',
    hint: 'คิดถึง Link Aggregation',
  },
];

const CCNA_002_EXERCISE: ExerciseData = {
  title: 'Configure VLAN บน Switch',
  description: 'จงเขียนคำสั่ง Cisco IOS เพื่อสร้าง VLAN 10 ชื่อ "Sales" และกำหนด interface Gi0/1 เป็น access port ใน VLAN 10',
  starterCode: `# เขียนคำสั่ง Cisco IOS config
def configure_vlan():
    commands = []
    # สร้าง VLAN 10 ชื่อ Sales
    # กำหนด interface Gi0/1 เป็น access port
    pass

print(configure_vlan())`,
  solutionCode: `def configure_vlan():
    commands = [
        "vlan 10",
        "name Sales",
        "interface GigabitEthernet0/1",
        "switchport mode access",
        "switchport access vlan 10",
    ]
    return "\\n".join(commands)

print(configure_vlan())`,
  testCases: [
    { input: 'configure_vlan()', expected: 'vlan 10\nname Sales\ninterface GigabitEthernet0/1\nswitchport mode access\nswitchport access vlan 10' },
  ],
  hint: 'ใช้คำสั่ง vlan, name, switchport mode access, switchport access vlan',
  xpReward: 25,
};

const CCNA_003_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'Static Route ต่างจาก Dynamic Route อย่างไร?',
    choices: [
      'Static route เร็วกว่า Dynamic route เสมอ',
      'Static route ต้อง config ด้วยมือ ส่วน Dynamic route เรียนรู้จาก protocol',
      'Dynamic route ปลอดภัยกว่า Static route',
      'Static route ใช้ได้กับ OSPF เท่านั้น',
    ],
    correctIndex: 1,
    explanation: 'Static route ถูกกำหนดด้วยมือโดย admin ขณะที่ Dynamic route เรียนรู้อัตโนมัติจาก routing protocols เช่น OSPF, EIGRP',
  },
  {
    id: 2,
    question: 'Administrative Distance ของ OSPF คือเท่าไร?',
    choices: ['90', '110', '120', '170'],
    correctIndex: 1,
    explanation: 'OSPF มี AD = 110, EIGRP = 90, RIP = 120, Static = 1, Connected = 0',
    hint: 'อยู่ระหว่าง EIGRP (90) กับ RIP (120)',
  },
  {
    id: 3,
    question: 'OSPF ใช้ algorithm ใดในการคำนวณ shortest path?',
    choices: ['Bellman-Ford', 'Dijkstra (SPF)', 'DUAL', 'Distance Vector'],
    correctIndex: 1,
    explanation: 'OSPF ใช้ Dijkstra Shortest Path First (SPF) algorithm ในการสร้าง routing table',
  },
  {
    id: 4,
    question: 'EIGRP เป็น routing protocol ประเภทใด?',
    choices: ['Link-State', 'Distance Vector', 'Advanced Distance Vector (Hybrid)', 'Path Vector'],
    correctIndex: 2,
    explanation: 'EIGRP เป็น Advanced Distance Vector (Hybrid) protocol ที่รวมข้อดีของทั้ง Distance Vector และ Link-State',
  },
  {
    id: 5,
    question: 'Default route คือ route ไปยัง network ใด?',
    choices: ['127.0.0.0/8', '0.0.0.0/0', '255.255.255.255/32', '10.0.0.0/8'],
    correctIndex: 1,
    explanation: '0.0.0.0/0 คือ default route ที่ match กับทุก destination ที่ไม่มี specific route',
    hint: 'เรียกว่า "gateway of last resort"',
  },
];

const CCNA_003_EXERCISE: ExerciseData = {
  title: 'Configure Static Route',
  description: 'จงเขียนคำสั่ง Cisco IOS เพื่อกำหนด static route ไปยัง network 10.10.0.0/16 ผ่าน next-hop 192.168.1.1 และ default route ผ่าน 192.168.1.1',
  starterCode: `def configure_routes():
    commands = []
    # เพิ่ม static route ไปยัง 10.10.0.0/16
    # เพิ่ม default route
    pass

print(configure_routes())`,
  solutionCode: `def configure_routes():
    commands = [
        "ip route 10.10.0.0 255.255.0.0 192.168.1.1",
        "ip route 0.0.0.0 0.0.0.0 192.168.1.1",
    ]
    return "\\n".join(commands)

print(configure_routes())`,
  testCases: [
    { input: 'configure_routes()', expected: 'ip route 10.10.0.0 255.255.0.0 192.168.1.1\nip route 0.0.0.0 0.0.0.0 192.168.1.1' },
  ],
  hint: 'ใช้คำสั่ง ip route [network] [mask] [next-hop]',
  xpReward: 25,
};

const CCNA_005_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'DHCP ใช้ทำอะไร?',
    choices: ['เข้ารหัสข้อมูล', 'แจก IP address อัตโนมัติ', 'แปลง domain name เป็น IP', 'กำหนด routing table'],
    correctIndex: 1,
    explanation: 'DHCP (Dynamic Host Configuration Protocol) แจก IP address, subnet mask, default gateway และ DNS server อัตโนมัติ',
  },
  {
    id: 2,
    question: 'NAT ย่อมาจากอะไร และทำหน้าที่อะไร?',
    choices: [
      'Network Access Technology - ควบคุมการเข้าถึง',
      'Network Address Translation - แปลง IP address',
      'Network Authentication Token - ยืนยันตัวตน',
      'Node Access Terminal - จัดการ terminal',
    ],
    correctIndex: 1,
    explanation: 'NAT แปลง private IP เป็น public IP เพื่อให้ host ภายในสามารถเข้าถึง Internet ได้',
    hint: 'เกี่ยวกับการแปลง IP address',
  },
  {
    id: 3,
    question: 'DNS ใช้ port อะไร?',
    choices: ['Port 22', 'Port 53', 'Port 80', 'Port 443'],
    correctIndex: 1,
    explanation: 'DNS ใช้ port 53 ทั้ง TCP และ UDP (ส่วนใหญ่ใช้ UDP สำหรับ query)',
  },
  {
    id: 4,
    question: 'ACL ประเภท Standard ใช้เกณฑ์อะไรในการ filter?',
    choices: ['Source IP เท่านั้น', 'Destination IP เท่านั้น', 'Source และ Destination IP', 'Port number เท่านั้น'],
    correctIndex: 0,
    explanation: 'Standard ACL (1-99) ใช้เฉพาะ source IP ในการ filter ส่วน Extended ACL ใช้ทั้ง source, destination และ port',
  },
  {
    id: 5,
    question: 'PAT (Port Address Translation) ต่างจาก NAT อย่างไร?',
    choices: [
      'PAT แปลงเฉพาะ port, NAT แปลงเฉพาะ IP',
      'PAT ใช้ port number เพื่อ map หลาย private IP ไปยัง public IP เดียว',
      'PAT เร็วกว่า NAT 10 เท่า',
      'ไม่มีความแตกต่าง',
    ],
    correctIndex: 1,
    explanation: 'PAT (NAT Overload) ใช้ port number เพื่อให้หลาย private IP ใช้ public IP เดียวกันได้พร้อมกัน',
    hint: 'คิดถึง NAT Overload',
  },
];

const CCNA_005_EXERCISE: ExerciseData = {
  title: 'Configure NAT Overload (PAT)',
  description: 'จงเขียนคำสั่ง configure NAT overload บน router โดยใช้ interface GigabitEthernet0/0 เป็น outside',
  starterCode: `def configure_nat():
    commands = []
    # กำหนด ACL permit 192.168.1.0/24
    # กำหนด NAT overload
    pass

print(configure_nat())`,
  solutionCode: `def configure_nat():
    commands = [
        "access-list 1 permit 192.168.1.0 0.0.0.255",
        "ip nat inside source list 1 interface GigabitEthernet0/0 overload",
    ]
    return "\\n".join(commands)

print(configure_nat())`,
  testCases: [
    { input: 'configure_nat()', expected: 'access-list 1 permit 192.168.1.0 0.0.0.255\nip nat inside source list 1 interface GigabitEthernet0/0 overload' },
  ],
  hint: 'ใช้ access-list + ip nat inside source list ... overload',
  xpReward: 25,
};

const CCNA_006_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'Port Security ใช้ป้องกันภัยคุกคามประเภทใด?',
    choices: ['DDoS Attack', 'MAC Flooding / Unauthorized access', 'SQL Injection', 'Phishing'],
    correctIndex: 1,
    explanation: 'Port Security จำกัดจำนวน MAC address ที่ learn ได้บน port เพื่อป้องกัน MAC flooding และ unauthorized device',
  },
  {
    id: 2,
    question: 'DHCP Snooping ป้องกันอะไร?',
    choices: ['DNS Poisoning', 'Rogue DHCP Server', 'ARP Spoofing', 'VLAN Hopping'],
    correctIndex: 1,
    explanation: 'DHCP Snooping ป้องกัน Rogue DHCP Server โดยกำหนดว่า port ใดที่เป็น trusted (สามารถตอบ DHCP ได้)',
    hint: 'เกี่ยวกับ DHCP Server ปลอม',
  },
  {
    id: 3,
    question: 'AAA ย่อมาจากอะไร?',
    choices: [
      'Access, Audit, Alert',
      'Authentication, Authorization, Accounting',
      'Automatic, Adaptive, Active',
      'Address, Allocation, Assignment',
    ],
    correctIndex: 1,
    explanation: 'AAA = Authentication (ยืนยันตัวตน), Authorization (กำหนดสิทธิ์), Accounting (บันทึกการใช้งาน)',
  },
  {
    id: 4,
    question: 'SSH ปลอดภัยกว่า Telnet อย่างไร?',
    choices: ['SSH เร็วกว่า', 'SSH เข้ารหัสข้อมูลทั้งหมด', 'SSH ใช้ UDP', 'SSH ไม่ต้องใช้ password'],
    correctIndex: 1,
    explanation: 'SSH เข้ารหัสข้อมูลทั้งหมดรวมถึง username/password ขณะที่ Telnet ส่งเป็น plaintext',
  },
  {
    id: 5,
    question: 'DAI (Dynamic ARP Inspection) ป้องกันอะไร?',
    choices: ['IP Spoofing', 'ARP Spoofing / ARP Poisoning', 'DNS Spoofing', 'MAC Spoofing'],
    correctIndex: 1,
    explanation: 'DAI ตรวจสอบ ARP packets เทียบกับ DHCP snooping binding table เพื่อป้องกัน ARP spoofing',
  },
];

const CCNA_006_EXERCISE: ExerciseData = {
  title: 'Configure Port Security',
  description: 'จงเขียนคำสั่ง configure port security บน interface Fa0/1 ให้รับ MAC address ได้สูงสุด 2 ตัว โดย violation mode เป็น shutdown',
  starterCode: `def configure_port_security():
    commands = []
    # Config port security บน Fa0/1
    pass

print(configure_port_security())`,
  solutionCode: `def configure_port_security():
    commands = [
        "interface FastEthernet0/1",
        "switchport mode access",
        "switchport port-security",
        "switchport port-security maximum 2",
        "switchport port-security violation shutdown",
    ]
    return "\\n".join(commands)

print(configure_port_security())`,
  testCases: [
    { input: 'configure_port_security()', expected: 'interface FastEthernet0/1\nswitchport mode access\nswitchport port-security\nswitchport port-security maximum 2\nswitchport port-security violation shutdown' },
  ],
  hint: 'ต้อง set switchport mode access ก่อน enable port-security',
  xpReward: 25,
};

const CCNA_007_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'SNMP ใช้ทำอะไร?',
    choices: ['ส่งอีเมล', 'Monitor และจัดการ network devices', 'เข้ารหัส traffic', 'สร้าง VPN'],
    correctIndex: 1,
    explanation: 'SNMP (Simple Network Management Protocol) ใช้สำหรับ monitor, collect data และจัดการ network devices',
  },
  {
    id: 2,
    question: 'Syslog Severity Level 0 หมายถึง?',
    choices: ['Debug', 'Informational', 'Emergency', 'Warning'],
    correctIndex: 2,
    explanation: 'Syslog Level 0 = Emergency (ร้ายแรงที่สุด), Level 7 = Debug (รายละเอียดมากสุด)',
    hint: 'ยิ่งเลขน้อย ยิ่งร้ายแรง',
  },
  {
    id: 3,
    question: 'NTP ใช้ทำอะไร?',
    choices: ['Transfer files', 'Synchronize เวลาระหว่าง devices', 'Monitor bandwidth', 'Encrypt data'],
    correctIndex: 1,
    explanation: 'NTP (Network Time Protocol) ใช้ synchronize เวลาระหว่าง network devices เพื่อให้ log มี timestamp ที่ตรงกัน',
  },
  {
    id: 4,
    question: 'CDP (Cisco Discovery Protocol) ให้ข้อมูลอะไร?',
    choices: ['Routing table ของ neighbor', 'ข้อมูลของ directly connected Cisco devices', 'Bandwidth ของ link', 'MAC address table'],
    correctIndex: 1,
    explanation: 'CDP ให้ข้อมูลเกี่ยวกับ directly connected Cisco devices เช่น hostname, IP, platform, port',
  },
  {
    id: 5,
    question: 'SNMP Trap ต่างจาก SNMP Poll อย่างไร?',
    choices: [
      'Trap ใช้ TCP ส่วน Poll ใช้ UDP',
      'Trap เป็นการที่ device ส่ง alert เอง ส่วน Poll เป็นการ query จาก server',
      'Trap ช้ากว่า Poll',
      'ไม่มีความแตกต่าง',
    ],
    correctIndex: 1,
    explanation: 'SNMP Trap = device ส่ง notification เมื่อเกิด event (push) ส่วน Poll = NMS query device เป็นระยะ (pull)',
  },
];

const CCNA_007_EXERCISE: ExerciseData = {
  title: 'Configure SNMP และ Syslog',
  description: 'จงเขียนคำสั่ง configure SNMP community string "NetMon" แบบ read-only และส่ง syslog ไปยัง server 10.0.0.100',
  starterCode: `def configure_monitoring():
    commands = []
    # Config SNMP community
    # Config Syslog server
    pass

print(configure_monitoring())`,
  solutionCode: `def configure_monitoring():
    commands = [
        "snmp-server community NetMon ro",
        "logging host 10.0.0.100",
        "logging trap informational",
    ]
    return "\\n".join(commands)

print(configure_monitoring())`,
  testCases: [
    { input: 'configure_monitoring()', expected: 'snmp-server community NetMon ro\nlogging host 10.0.0.100\nlogging trap informational' },
  ],
  hint: 'ใช้ snmp-server community [string] ro/rw และ logging host [ip]',
  xpReward: 25,
};

const CCNA_008_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'Python library ใดใช้สำหรับ SSH ไปยัง network devices?',
    choices: ['requests', 'flask', 'netmiko', 'numpy'],
    correctIndex: 2,
    explanation: 'Netmiko เป็น Python library ที่ช่วยทำ SSH connection ไปยัง network devices หลาย vendors',
  },
  {
    id: 2,
    question: 'REST API ใช้ HTTP method ใดสำหรับสร้างข้อมูลใหม่?',
    choices: ['GET', 'POST', 'DELETE', 'PATCH'],
    correctIndex: 1,
    explanation: 'POST ใช้สำหรับ create resource ใหม่, GET = read, PUT/PATCH = update, DELETE = delete',
    hint: 'คิดถึง CRUD operations',
  },
  {
    id: 3,
    question: 'JSON ย่อมาจากอะไร?',
    choices: ['Java Source Object Notation', 'JavaScript Object Notation', 'Just Simple Object Names', 'Java Serialized Object Network'],
    correctIndex: 1,
    explanation: 'JSON = JavaScript Object Notation เป็น data format ที่ใช้กันแพร่หลายใน APIs',
  },
  {
    id: 4,
    question: 'YANG model ใช้ทำอะไรใน network automation?',
    choices: ['เข้ารหัสข้อมูล', 'กำหนด data model สำหรับ network configuration', 'สร้าง GUI', 'Compile Python code'],
    correctIndex: 1,
    explanation: 'YANG เป็น data modeling language ที่ใช้กำหนดโครงสร้างข้อมูลสำหรับ NETCONF/RESTCONF',
  },
  {
    id: 5,
    question: 'Ansible ต่างจาก Python script ทั่วไปอย่างไร?',
    choices: [
      'Ansible เร็วกว่า Python',
      'Ansible ใช้ playbook (YAML) แบบ declarative ไม่ต้องเขียน code',
      'Python ไม่สามารถ automate network ได้',
      'Ansible ใช้ได้กับ Cisco เท่านั้น',
    ],
    correctIndex: 1,
    explanation: 'Ansible ใช้ YAML playbooks แบบ declarative ทำให้ง่ายกว่าการเขียน Python script สำหรับ config management',
    hint: 'คิดถึง Infrastructure as Code',
  },
];

const CCNA_008_EXERCISE: ExerciseData = {
  title: 'เขียน Python script ดึงข้อมูล device ด้วย Netmiko',
  description: 'จงเขียนฟังก์ชัน get_version(host) ที่ใช้ Netmiko เชื่อมต่อไปยัง device แล้ว print คำสั่ง "show version" (จำลอง)',
  starterCode: `def get_version(host):
    # จำลองการใช้ Netmiko
    # ส่งคำสั่ง show version
    pass

get_version("192.168.1.1")`,
  solutionCode: `def get_version(host):
    command = "show version"
    print(f"Connected to {host}")
    print(f"Sending: {command}")

get_version("192.168.1.1")`,
  testCases: [
    { input: 'get_version("192.168.1.1")', expected: 'Connected to 192.168.1.1\nSending: show version' },
    { input: 'get_version("10.0.0.1")', expected: 'Connected to 10.0.0.1\nSending: show version' },
  ],
  hint: 'ใช้ f-string เพื่อแสดง host และ command',
  xpReward: 25,
};

/* ═══════════════════════════════════════════════════════════════
   SECURITY TRACK
   ═══════════════════════════════════════════════════════════════ */

const SEC_001_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'Stateful Firewall ต่างจาก Stateless Firewall อย่างไร?',
    choices: [
      'Stateful เร็วกว่า Stateless',
      'Stateful จดจำ connection state ส่วน Stateless ตรวจแต่ละ packet แยกกัน',
      'Stateless ปลอดภัยกว่า Stateful',
      'ไม่มีความแตกต่าง',
    ],
    correctIndex: 1,
    explanation: 'Stateful Firewall ติดตาม state ของ connection (TCP sessions) ขณะที่ Stateless ตรวจแต่ละ packet ตาม rules โดยไม่สนใจ connection state',
  },
  {
    id: 2,
    question: 'Zone-Based Firewall ใช้หลักการอะไร?',
    choices: ['IP-based filtering', 'แบ่ง interface เป็น security zones แล้วกำหนด policy ระหว่าง zones', 'MAC address filtering', 'Port-based filtering เท่านั้น'],
    correctIndex: 1,
    explanation: 'Zone-Based Firewall จัดกลุ่ม interface เป็น zones (เช่น inside, outside, DMZ) แล้วกำหนด policy สำหรับ traffic ระหว่าง zones',
  },
  {
    id: 3,
    question: 'DMZ คืออะไร?',
    choices: ['De-Militarized Zone - เครือข่ายกลางระหว่าง trusted และ untrusted', 'Data Management Zone', 'Dynamic Memory Zone', 'Default Management Zone'],
    correctIndex: 0,
    explanation: 'DMZ เป็นเครือข่ายที่อยู่ระหว่าง internal (trusted) และ external (untrusted) สำหรับวาง public-facing servers',
    hint: 'ใช้วาง Web Server, Mail Server ที่ต้อง access จากภายนอก',
  },
  {
    id: 4,
    question: 'Application Layer Firewall (Layer 7) ตรวจสอบอะไรเพิ่มเติม?',
    choices: ['MAC address', 'IP address เท่านั้น', 'เนื้อหาของ application data (HTTP, FTP, DNS)', 'Physical layer signals'],
    correctIndex: 2,
    explanation: 'Layer 7 Firewall สามารถตรวจสอบ application-level content เช่น URL filtering, content inspection',
  },
  {
    id: 5,
    question: 'Next-Generation Firewall (NGFW) มีความสามารถอะไรเพิ่มจาก traditional firewall?',
    choices: [
      'เร็วกว่า 100 เท่า',
      'IPS, Application awareness, และ SSL inspection',
      'ไม่ต้องใช้ rules',
      'รองรับ IPv6 เท่านั้น',
    ],
    correctIndex: 1,
    explanation: 'NGFW รวม IPS (Intrusion Prevention), application awareness, user identity, และ SSL decryption เข้าด้วยกัน',
  },
];

const SEC_001_EXERCISE: ExerciseData = {
  title: 'เขียน Firewall Zone Policy',
  description: 'จงเขียนคำสั่ง configure Zone-Based Firewall: สร้าง zone "INSIDE" และ "OUTSIDE" แล้ว assign interface',
  starterCode: `def configure_zbf():
    commands = []
    # สร้าง security zones
    # assign interfaces
    pass

print(configure_zbf())`,
  solutionCode: `def configure_zbf():
    commands = [
        "zone security INSIDE",
        "zone security OUTSIDE",
        "interface GigabitEthernet0/0",
        "zone-member security INSIDE",
        "interface GigabitEthernet0/1",
        "zone-member security OUTSIDE",
    ]
    return "\\n".join(commands)

print(configure_zbf())`,
  testCases: [
    { input: 'configure_zbf()', expected: 'zone security INSIDE\nzone security OUTSIDE\ninterface GigabitEthernet0/0\nzone-member security INSIDE\ninterface GigabitEthernet0/1\nzone-member security OUTSIDE' },
  ],
  hint: 'ใช้ zone security [name] แล้ว zone-member security [name] ใน interface',
  xpReward: 25,
};

const SEC_002_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'IPSec ประกอบด้วย protocol หลักอะไรบ้าง?',
    choices: ['HTTP และ HTTPS', 'AH (Authentication Header) และ ESP (Encapsulating Security Payload)', 'TCP และ UDP', 'SSH และ SSL'],
    correctIndex: 1,
    explanation: 'IPSec ใช้ AH สำหรับ authentication และ ESP สำหรับ encryption + authentication',
  },
  {
    id: 2,
    question: 'IKE Phase 1 ทำหน้าที่อะไร?',
    choices: ['ส่งข้อมูลจริง', 'สร้าง secure channel สำหรับ negotiate IPSec parameters', 'เข้ารหัส user data', 'ยืนยัน certificate'],
    correctIndex: 1,
    explanation: 'IKE Phase 1 สร้าง secure channel (IKE SA) เพื่อใช้ negotiate IPSec SA ใน Phase 2',
    hint: 'แบ่งเป็น Main Mode และ Aggressive Mode',
  },
  {
    id: 3,
    question: 'SSL VPN ต่างจาก IPSec VPN อย่างไร?',
    choices: [
      'SSL VPN ปลอดภัยกว่า',
      'SSL VPN ทำงานผ่าน web browser ไม่ต้องติดตั้ง client software พิเศษ',
      'IPSec VPN เร็วกว่า 10 เท่า',
      'SSL VPN ใช้ port 22',
    ],
    correctIndex: 1,
    explanation: 'SSL VPN ใช้ HTTPS (port 443) สามารถ access ผ่าน web browser ได้ทันที ขณะที่ IPSec ต้องติดตั้ง client',
  },
  {
    id: 4,
    question: 'GRE Tunnel ต่างจาก IPSec Tunnel อย่างไร?',
    choices: [
      'GRE เข้ารหัส ส่วน IPSec ไม่เข้ารหัส',
      'GRE encapsulate packets แต่ไม่เข้ารหัส ส่วน IPSec เข้ารหัส',
      'GRE ใช้สำหรับ WAN เท่านั้น',
      'ไม่มีความแตกต่าง',
    ],
    correctIndex: 1,
    explanation: 'GRE สร้าง tunnel สำหรับ encapsulate แต่ไม่มี encryption ต้องใช้ร่วมกับ IPSec (GRE over IPSec) เพื่อเข้ารหัส',
  },
  {
    id: 5,
    question: 'Split Tunneling ใน VPN คืออะไร?',
    choices: [
      'แบ่ง encryption เป็น 2 ระดับ',
      'ส่ง traffic บางส่วนผ่าน VPN และ traffic ส่วนอื่นผ่าน internet ตรง',
      'ใช้ VPN 2 ตัวพร้อมกัน',
      'แบ่ง bandwidth เป็น 2 ส่วน',
    ],
    correctIndex: 1,
    explanation: 'Split Tunneling ส่งเฉพาะ corporate traffic ผ่าน VPN ขณะที่ internet traffic ออกตรงๆ ช่วยลด bandwidth บน VPN',
  },
];

const SEC_002_EXERCISE: ExerciseData = {
  title: 'Configure Site-to-Site IPSec VPN',
  description: 'จงเขียนคำสั่ง configure crypto map สำหรับ Site-to-Site VPN กำหนด peer IP 203.0.113.1 และ transform-set "MY-SET"',
  starterCode: `def configure_vpn():
    commands = []
    # สร้าง crypto map
    pass

print(configure_vpn())`,
  solutionCode: `def configure_vpn():
    commands = [
        "crypto map MY-MAP 10 ipsec-isakmp",
        "set peer 203.0.113.1",
        "set transform-set MY-SET",
        "match address VPN-ACL",
    ]
    return "\\n".join(commands)

print(configure_vpn())`,
  testCases: [
    { input: 'configure_vpn()', expected: 'crypto map MY-MAP 10 ipsec-isakmp\nset peer 203.0.113.1\nset transform-set MY-SET\nmatch address VPN-ACL' },
  ],
  hint: 'ใช้ crypto map, set peer, set transform-set',
  xpReward: 35,
};

/* ═══════════════════════════════════════════════════════════════
   ADVANCED ROUTING
   ═══════════════════════════════════════════════════════════════ */

const ADV_001_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'OSPF LSA Type 1 คืออะไร?',
    choices: ['Network LSA', 'Router LSA', 'Summary LSA', 'External LSA'],
    correctIndex: 1,
    explanation: 'Type 1 = Router LSA สร้างโดยทุก router ใน area อธิบาย links และ costs ของตัวเอง',
    hint: 'ทุก OSPF router สร้าง LSA type นี้',
  },
  {
    id: 2,
    question: 'OSPF Stub Area ไม่รับ LSA ประเภทใด?',
    choices: ['Type 1 และ 2', 'Type 3 และ 4', 'Type 5 (External LSA)', 'ทุกประเภท'],
    correctIndex: 2,
    explanation: 'Stub Area ไม่รับ Type 5 (External LSA) แต่ใช้ default route แทน เพื่อลด LSDB size',
  },
  {
    id: 3,
    question: 'OSPF Area 0 มีความสำคัญอย่างไร?',
    choices: ['เป็น area ที่เร็วที่สุด', 'เป็น backbone area ที่ทุก area ต้องเชื่อมต่อ', 'เป็น area สำหรับ management เท่านั้น', 'ไม่มีความสำคัญพิเศษ'],
    correctIndex: 1,
    explanation: 'Area 0 เป็น backbone area ทุก area อื่นต้องเชื่อมต่อกับ Area 0 (ตรงหรือผ่าน virtual link)',
  },
  {
    id: 4,
    question: 'DR/BDR Election ใน OSPF ใช้เกณฑ์อะไร?',
    choices: ['IP address สูงสุด', 'Priority สูงสุด (ถ้าเท่ากันใช้ Router ID สูงสุด)', 'Bandwidth สูงสุด', 'uptime นานสุด'],
    correctIndex: 1,
    explanation: 'DR/BDR ถูกเลือกจาก priority สูงสุด (default=1) ถ้าเท่ากันจะใช้ Router ID สูงสุด',
    hint: 'Priority 0 = ไม่เข้าร่วม election',
  },
  {
    id: 5,
    question: 'OSPF Totally Stubby Area ต่างจาก Stub Area อย่างไร?',
    choices: [
      'เหมือนกันทุกประการ',
      'Totally Stubby ไม่รับ Type 3, 4, 5 ส่วน Stub ไม่รับเฉพาะ Type 5',
      'Totally Stubby เร็วกว่า',
      'Stub ไม่รับ Type 3',
    ],
    correctIndex: 1,
    explanation: 'Totally Stubby Area ไม่รับ Type 3 (Inter-area), 4, 5 ใช้เฉพาะ default route ทำให้ LSDB เล็กที่สุด',
  },
];

const ADV_001_EXERCISE: ExerciseData = {
  title: 'Configure OSPF Multi-Area',
  description: 'จงเขียนคำสั่ง configure OSPF multi-area: Area 0 (backbone) บน Gi0/0 (10.0.0.0/24) และ Area 1 บน Gi0/1 (172.16.1.0/24)',
  starterCode: `def configure_ospf():
    commands = []
    # Config OSPF process 1
    # Advertise networks ใน Area 0 และ Area 1
    pass

print(configure_ospf())`,
  solutionCode: `def configure_ospf():
    commands = [
        "router ospf 1",
        "network 10.0.0.0 0.0.0.255 area 0",
        "network 172.16.1.0 0.0.0.255 area 1",
    ]
    return "\\n".join(commands)

print(configure_ospf())`,
  testCases: [
    { input: 'configure_ospf()', expected: 'router ospf 1\nnetwork 10.0.0.0 0.0.0.255 area 0\nnetwork 172.16.1.0 0.0.0.255 area 1' },
  ],
  hint: 'ใช้ wildcard mask (0.0.0.255 = /24) ใน network statement',
  xpReward: 35,
};

const ADV_003_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'BGP เป็น routing protocol ประเภทใด?',
    choices: ['Link-State', 'Distance Vector', 'Path Vector', 'Hybrid'],
    correctIndex: 2,
    explanation: 'BGP เป็น Path Vector protocol ที่ใช้ AS_PATH เป็นหนึ่งในเกณฑ์การเลือก best path',
  },
  {
    id: 2,
    question: 'eBGP neighbor ต้อง directly connected หรือไม่?',
    choices: ['ต้อง directly connected เสมอ', 'โดยปกติต้อง แต่สามารถใช้ ebgp-multihop ได้', 'ไม่จำเป็น', 'ขึ้นอยู่กับ vendor'],
    correctIndex: 1,
    explanation: 'eBGP neighbor ปกติต้อง directly connected (TTL=1) แต่สามารถใช้ ebgp-multihop เพื่อข้าม hop ได้',
  },
  {
    id: 3,
    question: 'BGP attribute ใดที่ใช้เป็นอันดับแรกในการเลือก best path?',
    choices: ['AS_PATH', 'LOCAL_PREF', 'Weight (Cisco)', 'MED'],
    correctIndex: 2,
    explanation: 'Weight (Cisco proprietary) มี priority สูงสุด ตามด้วย LOCAL_PREF, AS_PATH, MED',
    hint: 'เป็น Cisco proprietary attribute',
  },
  {
    id: 4,
    question: 'AS Number ใช้ทำอะไรใน BGP?',
    choices: ['ระบุ IP address', 'ระบุ Autonomous System ที่แต่ละองค์กรหรือ ISP ดูแล', 'ระบุ VLAN number', 'ระบุ port number'],
    correctIndex: 1,
    explanation: 'AS Number ใช้ระบุ Autonomous System ซึ่งเป็นกลุ่ม networks ที่อยู่ภายใต้การบริหารเดียวกัน',
  },
  {
    id: 5,
    question: 'BGP Neighbor State "Established" หมายถึง?',
    choices: ['กำลัง connect', 'กำลัง exchange routes', 'BGP session สำเร็จและพร้อมแลกเปลี่ยน routes', 'Session ถูก reset'],
    correctIndex: 2,
    explanation: 'Established คือ state สุดท้ายของ BGP peering หมายถึง session สำเร็จและกำลังแลกเปลี่ยน routing information',
  },
];

const ADV_003_EXERCISE: ExerciseData = {
  title: 'Configure eBGP Neighbor',
  description: 'จงเขียนคำสั่ง configure eBGP: AS 65001 neighbor กับ 203.0.113.1 ใน AS 65002 พร้อม advertise network 10.0.0.0/8',
  starterCode: `def configure_bgp():
    commands = []
    # Config BGP AS 65001
    # เพิ่ม neighbor
    # Advertise network
    pass

print(configure_bgp())`,
  solutionCode: `def configure_bgp():
    commands = [
        "router bgp 65001",
        "neighbor 203.0.113.1 remote-as 65002",
        "network 10.0.0.0 mask 255.0.0.0",
    ]
    return "\\n".join(commands)

print(configure_bgp())`,
  testCases: [
    { input: 'configure_bgp()', expected: 'router bgp 65001\nneighbor 203.0.113.1 remote-as 65002\nnetwork 10.0.0.0 mask 255.0.0.0' },
  ],
  hint: 'ใช้ router bgp [AS], neighbor [IP] remote-as [AS], network [IP] mask [mask]',
  xpReward: 35,
};

/* ═══════════════════════════════════════════════════════════════
   TROUBLESHOOTING TRACK
   ═══════════════════════════════════════════════════════════════ */

const TROUBLESHOOT_001_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'Wireshark Display Filter ใดใช้แสดงเฉพาะ HTTP traffic?',
    choices: ['filter http', 'http', 'tcp.port == 80', 'protocol == http'],
    correctIndex: 1,
    explanation: 'ใน Wireshark พิมพ์ "http" ใน display filter bar เพื่อแสดงเฉพาะ HTTP packets',
  },
  {
    id: 2,
    question: 'Capture Filter ต่างจาก Display Filter อย่างไร?',
    choices: [
      'เหมือนกัน',
      'Capture Filter กรองก่อนจับ packet ส่วน Display Filter กรองหลังจับแล้ว',
      'Display Filter เร็วกว่า',
      'Capture Filter ใช้ syntax เดียวกับ Display Filter',
    ],
    correctIndex: 1,
    explanation: 'Capture Filter (BPF syntax) กรองก่อนจับ packet ลด file size ส่วน Display Filter กรองจาก packets ที่จับมาแล้ว',
    hint: 'Capture Filter ใช้ BPF syntax',
  },
  {
    id: 3,
    question: 'TCP Retransmission บ่งบอกถึงอะไร?',
    choices: ['Network ทำงานปกติ', 'มี packet loss หรือ delay ใน network', 'Firewall block traffic', 'DNS resolution fail'],
    correctIndex: 1,
    explanation: 'TCP Retransmission เกิดเมื่อ sender ไม่ได้รับ ACK ภายในเวลาที่กำหนด บ่งชี้ว่ามี packet loss หรือ high latency',
  },
  {
    id: 4,
    question: 'Wireshark filter "ip.addr == 10.0.0.1" แสดงอะไร?',
    choices: [
      'เฉพาะ packets จาก 10.0.0.1',
      'เฉพาะ packets ไปยัง 10.0.0.1',
      'ทั้ง packets จากและไปยัง 10.0.0.1',
      'ไม่แสดงอะไร',
    ],
    correctIndex: 2,
    explanation: 'ip.addr จะ match ทั้ง source และ destination ใช้ ip.src หรือ ip.dst เพื่อระบุทิศทาง',
  },
  {
    id: 5,
    question: 'Follow TCP Stream ใน Wireshark ใช้ทำอะไร?',
    choices: ['ดู TCP header', 'ดู payload ทั้งหมดของ TCP conversation', 'ดู routing table', 'สร้าง TCP connection ใหม่'],
    correctIndex: 1,
    explanation: 'Follow TCP Stream รวบรวมและแสดง payload ทั้งหมดของ TCP conversation เดียวกันให้อ่านง่าย',
  },
];

const TROUBLESHOOT_001_EXERCISE: ExerciseData = {
  title: 'เขียน Wireshark Display Filter',
  description: 'จงเขียนฟังก์ชันที่ return Wireshark display filter สำหรับ: 1) HTTP จาก IP 10.0.0.5 2) DNS queries 3) TCP SYN packets',
  starterCode: `def get_filters():
    filters = {}
    # สร้าง display filters
    pass

result = get_filters()
for name, f in result.items():
    print(f"{name}: {f}")`,
  solutionCode: `def get_filters():
    filters = {
        "http_from_host": "http && ip.src == 10.0.0.5",
        "dns_queries": "dns.flags.response == 0",
        "tcp_syn": "tcp.flags.syn == 1 && tcp.flags.ack == 0",
    }
    return filters

result = get_filters()
for name, f in result.items():
    print(f"{name}: {f}")`,
  testCases: [
    { input: 'get_filters()["http_from_host"]', expected: 'http && ip.src == 10.0.0.5' },
    { input: 'get_filters()["dns_queries"]', expected: 'dns.flags.response == 0' },
  ],
  hint: 'Wireshark display filter ใช้ && สำหรับ AND',
  xpReward: 25,
};

const TROUBLESHOOT_002_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'คำสั่ง "show ip route" แสดงอะไร?',
    choices: ['MAC address table', 'Routing table', 'ARP table', 'Running configuration'],
    correctIndex: 1,
    explanation: 'show ip route แสดง routing table ของ router รวมถึง connected, static, dynamic routes',
  },
  {
    id: 2,
    question: 'คำสั่ง "debug" บน Cisco IOS ควรใช้เมื่อไร?',
    choices: ['ตลอดเวลาเพื่อ monitor', 'เฉพาะตอน troubleshoot และปิดทันทีหลังเสร็จ', 'เมื่อต้องการ save config', 'ไม่ควรใช้เลย'],
    correctIndex: 1,
    explanation: 'debug ใช้ CPU สูงมาก ควรใช้เฉพาะเมื่อ troubleshoot และใช้ undebug all ปิดทันทีหลังเสร็จ',
    hint: 'Debug ใช้ CPU resources มาก!',
  },
  {
    id: 3,
    question: '"show interfaces" แสดง counter ใดที่บ่งชี้ปัญหา?',
    choices: ['input/output packets', 'CRC errors, runts, giants, collisions', 'bandwidth', 'IP address'],
    correctIndex: 1,
    explanation: 'CRC errors, runts (frame เล็กเกินไป), giants (frame ใหญ่เกินไป), collisions บ่งชี้ปัญหา Layer 1/2',
  },
  {
    id: 4,
    question: 'คำสั่ง "traceroute" ช่วย troubleshoot อะไร?',
    choices: ['DNS resolution', 'ระบุ path และ hop-by-hop latency ไปยัง destination', 'Bandwidth testing', 'Port scanning'],
    correctIndex: 1,
    explanation: 'traceroute แสดง path ที่ packet ผ่านแต่ละ hop พร้อม latency ช่วยระบุจุดที่มีปัญหา',
  },
  {
    id: 5,
    question: '"show running-config" ต่างจาก "show startup-config" อย่างไร?',
    choices: [
      'เหมือนกัน',
      'running-config = config ใน RAM ปัจจุบัน, startup-config = config ใน NVRAM ที่ boot',
      'startup-config เป็น config ใหม่กว่า',
      'running-config อ่านได้อย่างเดียว',
    ],
    correctIndex: 1,
    explanation: 'running-config อยู่ใน RAM (ใช้งานปัจจุบัน) ส่วน startup-config อยู่ใน NVRAM (ใช้ตอน boot) ต้อง copy run start เพื่อ save',
  },
];

const TROUBLESHOOT_002_EXERCISE: ExerciseData = {
  title: 'Troubleshoot Interface Issues',
  description: 'จงเขียนลำดับคำสั่ง show ที่ใช้ troubleshoot เมื่อ interface Gi0/0 down',
  starterCode: `def troubleshoot_interface():
    commands = []
    # เขียนลำดับคำสั่ง troubleshoot
    pass

print(troubleshoot_interface())`,
  solutionCode: `def troubleshoot_interface():
    commands = [
        "show ip interface brief",
        "show interfaces GigabitEthernet0/0",
        "show logging",
        "show cdp neighbors",
    ]
    return "\\n".join(commands)

print(troubleshoot_interface())`,
  testCases: [
    { input: 'troubleshoot_interface()', expected: 'show ip interface brief\nshow interfaces GigabitEthernet0/0\nshow logging\nshow cdp neighbors' },
  ],
  hint: 'เริ่มจาก show ip int br เพื่อดู status ทุก interface',
  xpReward: 25,
};

/* ═══════════════════════════════════════════════════════════════
   DEVNET TRACK
   ═══════════════════════════════════════════════════════════════ */

const DEVNET_001_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'Netmiko ใช้ protocol อะไรเชื่อมต่อ network devices?',
    choices: ['HTTP', 'SNMP', 'SSH', 'Telnet เท่านั้น'],
    correctIndex: 2,
    explanation: 'Netmiko ใช้ SSH (Secure Shell) เป็นหลักในการเชื่อมต่อ network devices อย่างปลอดภัย',
  },
  {
    id: 2,
    question: 'NAPALM ย่อมาจากอะไร?',
    choices: [
      'Network Automation Protocol And Library Module',
      'Network Automation and Programmability Abstraction Layer with Multivendor support',
      'New Advanced Protocol for LAN Management',
      'Network Application Programming And Logging Module',
    ],
    correctIndex: 1,
    explanation: 'NAPALM = Network Automation and Programmability Abstraction Layer with Multivendor support',
  },
  {
    id: 3,
    question: 'Python data type ใดเหมาะสมที่สุดสำหรับเก็บ interface information?',
    choices: ['list', 'tuple', 'dictionary', 'string'],
    correctIndex: 2,
    explanation: 'Dictionary เหมาะสมที่สุดเพราะเก็บข้อมูลเป็น key-value pairs เช่น {"name": "Gi0/0", "status": "up", "ip": "10.0.0.1"}',
  },
  {
    id: 4,
    question: 'try/except ใน Python ใช้ทำอะไรใน network automation?',
    choices: ['เพิ่มความเร็ว', 'จัดการ error เช่น connection timeout หรือ authentication failure', 'สร้าง loop', 'Import library'],
    correctIndex: 1,
    explanation: 'try/except ใช้จัดการ exceptions เช่น NetmikoTimeoutException, NetmikoAuthenticationException',
    hint: 'Error handling สำคัญมากเมื่อเชื่อมต่อ network devices',
  },
  {
    id: 5,
    question: 'TextFSM ใน Netmiko ใช้ทำอะไร?',
    choices: ['เข้ารหัส output', 'Parse unstructured CLI output เป็น structured data', 'สร้าง configuration template', 'Compress data'],
    correctIndex: 1,
    explanation: 'TextFSM parse ข้อมูลจาก show commands ที่เป็น text ให้เป็น structured data (dictionary/list) ที่ใช้งานง่าย',
  },
];

const DEVNET_001_EXERCISE: ExerciseData = {
  title: 'เขียน Python จัดการ Network Inventory',
  description: 'จงเขียนฟังก์ชัน show_inventory(devices) ที่รับ list ของ device dictionaries แล้ว print ชื่อและ IP ของแต่ละ device',
  starterCode: `def show_inventory(devices):
    # แสดงข้อมูล device แต่ละตัว
    # format: "hostname: ip_address"
    pass

devices = [
    {"hostname": "R1", "ip": "10.0.0.1"},
    {"hostname": "SW1", "ip": "10.0.0.2"},
]
show_inventory(devices)`,
  solutionCode: `def show_inventory(devices):
    for device in devices:
        print(f"{device['hostname']}: {device['ip']}")

devices = [
    {"hostname": "R1", "ip": "10.0.0.1"},
    {"hostname": "SW1", "ip": "10.0.0.2"},
]
show_inventory(devices)`,
  testCases: [
    { input: 'show_inventory([{"hostname":"R1","ip":"10.0.0.1"}])', expected: 'R1: 10.0.0.1' },
    { input: 'show_inventory([{"hostname":"R1","ip":"10.0.0.1"},{"hostname":"SW1","ip":"10.0.0.2"}])', expected: 'R1: 10.0.0.1\nSW1: 10.0.0.2' },
  ],
  hint: 'ใช้ for loop กับ f-string',
  xpReward: 25,
};

const DEVNET_004_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'HTTP Status Code 200 หมายถึง?',
    choices: ['Not Found', 'OK (Success)', 'Server Error', 'Unauthorized'],
    correctIndex: 1,
    explanation: '200 OK = request สำเร็จ, 404 = Not Found, 401 = Unauthorized, 500 = Server Error',
  },
  {
    id: 2,
    question: 'REST API ใช้ HTTP method ใดสำหรับ update ข้อมูลทั้งหมด?',
    choices: ['POST', 'GET', 'PUT', 'DELETE'],
    correctIndex: 2,
    explanation: 'PUT ใช้สำหรับ update/replace ข้อมูลทั้งหมด ส่วน PATCH ใช้ update บางส่วน',
  },
  {
    id: 3,
    question: 'Header "Content-Type: application/json" บอกอะไร?',
    choices: ['ใช้ XML format', 'Request/Response body เป็น JSON format', 'ใช้ basic authentication', 'เป็น text/html'],
    correctIndex: 1,
    explanation: 'Content-Type header ระบุ format ของ body data ซึ่ง application/json บอกว่าเป็น JSON format',
  },
  {
    id: 4,
    question: 'API Authentication แบบ Bearer Token ส่งอย่างไร?',
    choices: ['ใน URL query string', 'ใน request body', 'ใน Authorization header', 'ใน Cookie'],
    correctIndex: 2,
    explanation: 'Bearer Token ส่งใน Authorization header: "Authorization: Bearer <token>"',
    hint: 'ใส่ใน HTTP header',
  },
  {
    id: 5,
    question: 'Pagination ใน REST API ใช้ทำอะไร?',
    choices: ['เข้ารหัสข้อมูล', 'แบ่งผลลัพธ์เป็นหน้าๆ เพื่อลด load', 'สร้าง cache', 'Authenticate users'],
    correctIndex: 1,
    explanation: 'Pagination แบ่ง response เป็น pages (เช่น ?page=1&limit=20) เพื่อไม่ให้ส่งข้อมูลมากเกินไปในครั้งเดียว',
  },
];

const DEVNET_004_EXERCISE: ExerciseData = {
  title: 'เขียน Python เรียก REST API',
  description: 'จงเขียนฟังก์ชัน api_request(method, url) ที่จำลองการส่ง HTTP request แล้ว print method และ URL',
  starterCode: `def api_request(method, url):
    # จำลองการส่ง HTTP request
    # print: "[METHOD] URL"
    pass

api_request("GET", "https://api.example.com/devices")`,
  solutionCode: `def api_request(method, url):
    print(f"[{method}] {url}")

api_request("GET", "https://api.example.com/devices")`,
  testCases: [
    { input: 'api_request("GET", "https://api.example.com/devices")', expected: '[GET] https://api.example.com/devices' },
    { input: 'api_request("POST", "https://api.example.com/vlans")', expected: '[POST] https://api.example.com/vlans' },
  ],
  hint: 'ใช้ f-string: f"[{method}] {url}"',
  xpReward: 25,
};

const DEVNET_005_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'คำสั่ง git ใดใช้สร้าง branch ใหม่?',
    choices: ['git branch [name]', 'git new [name]', 'git create [name]', 'git fork [name]'],
    correctIndex: 0,
    explanation: 'git branch [name] สร้าง branch ใหม่ หรือใช้ git checkout -b [name] สร้างและ switch ไปพร้อมกัน',
  },
  {
    id: 2,
    question: 'git pull เทียบเท่ากับคำสั่งอะไร?',
    choices: ['git push + git commit', 'git fetch + git merge', 'git clone + git checkout', 'git add + git commit'],
    correctIndex: 1,
    explanation: 'git pull = git fetch (ดึงข้อมูลจาก remote) + git merge (รวมเข้ากับ branch ปัจจุบัน)',
  },
  {
    id: 3,
    question: '.gitignore ใช้ทำอะไร?',
    choices: ['ลบ files', 'ระบุ files ที่ git จะไม่ track', 'เข้ารหัส files', 'Compress files'],
    correctIndex: 1,
    explanation: '.gitignore ระบุ patterns ของ files/directories ที่ git จะไม่ track เช่น .env, node_modules/, __pycache__/',
    hint: 'ใช้สำหรับ files ที่ไม่ควร commit เช่น credentials',
  },
  {
    id: 4,
    question: 'Pull Request (PR) คืออะไร?',
    choices: [
      'คำสั่ง git pull',
      'การขอรวม code จาก branch หนึ่งเข้าไปยังอีก branch พร้อม review',
      'การ download repository',
      'การ revert changes',
    ],
    correctIndex: 1,
    explanation: 'PR เป็นการขอ merge code จาก feature branch เข้า main branch พร้อมกระบวนการ code review',
  },
  {
    id: 5,
    question: 'git stash ใช้ทำอะไร?',
    choices: ['ลบ changes ถาวร', 'เก็บ uncommitted changes ชั่วคราวเพื่อ switch branch', 'Push code ไป remote', 'สร้าง tag'],
    correctIndex: 1,
    explanation: 'git stash เก็บ uncommitted changes ชั่วคราวเพื่อให้ working directory clean สามารถ pop กลับมาได้ภายหลัง',
  },
];

const DEVNET_005_EXERCISE: ExerciseData = {
  title: 'เขียน Git Workflow',
  description: 'จงเขียนลำดับคำสั่ง git สำหรับ: สร้าง branch "feature/vlan-config", เพิ่มไฟล์, commit, และ push',
  starterCode: `def git_workflow():
    commands = []
    # เขียนลำดับ git commands
    pass

print(git_workflow())`,
  solutionCode: `def git_workflow():
    commands = [
        "git checkout -b feature/vlan-config",
        "git add .",
        'git commit -m "Add VLAN configuration"',
        "git push origin feature/vlan-config",
    ]
    return "\\n".join(commands)

print(git_workflow())`,
  testCases: [
    { input: 'git_workflow()', expected: 'git checkout -b feature/vlan-config\ngit add .\ngit commit -m "Add VLAN configuration"\ngit push origin feature/vlan-config' },
  ],
  hint: 'checkout -b = สร้าง + switch branch',
  xpReward: 15,
};

/* ═══════════════════════════════════════════════════════════════
   COURSE MAPS
   ═══════════════════════════════════════════════════════════════ */

export const COURSE_QUIZ_MAP: Record<string, QuizQuestion[]> = {
  'ccna-001': CCNA_001_QUIZ,
  'ccna-002': CCNA_002_QUIZ,
  'ccna-003': CCNA_003_QUIZ,
  'ccna-004': CCNA_003_QUIZ,   // WAN reuses Routing fundamentals
  'ccna-005': CCNA_005_QUIZ,
  'ccna-006': CCNA_006_QUIZ,
  'ccna-007': CCNA_007_QUIZ,
  'ccna-008': CCNA_008_QUIZ,
  'sec-001': SEC_001_QUIZ,
  'sec-002': SEC_002_QUIZ,
  'sec-003': SEC_001_QUIZ,     // IDS/IPS shares Firewall fundamentals
  'adv-001': ADV_001_QUIZ,
  'adv-003': ADV_003_QUIZ,
  'troubleshoot-001': TROUBLESHOOT_001_QUIZ,
  'troubleshoot-002': TROUBLESHOOT_002_QUIZ,
  'devnet-001': DEVNET_001_QUIZ,
  'devnet-004': DEVNET_004_QUIZ,
  'devnet-005': DEVNET_005_QUIZ,
};

export const COURSE_EXERCISE_MAP: Record<string, ExerciseData> = {
  'ccna-001': CCNA_001_EXERCISE,
  'ccna-002': CCNA_002_EXERCISE,
  'ccna-003': CCNA_003_EXERCISE,
  'ccna-004': CCNA_003_EXERCISE,
  'ccna-005': CCNA_005_EXERCISE,
  'ccna-006': CCNA_006_EXERCISE,
  'ccna-007': CCNA_007_EXERCISE,
  'ccna-008': CCNA_008_EXERCISE,
  'sec-001': SEC_001_EXERCISE,
  'sec-002': SEC_002_EXERCISE,
  'sec-003': SEC_001_EXERCISE,
  'adv-001': ADV_001_EXERCISE,
  'adv-003': ADV_003_EXERCISE,
  'troubleshoot-001': TROUBLESHOOT_001_EXERCISE,
  'troubleshoot-002': TROUBLESHOOT_002_EXERCISE,
  'devnet-001': DEVNET_001_EXERCISE,
  'devnet-004': DEVNET_004_EXERCISE,
  'devnet-005': DEVNET_005_EXERCISE,
};

/* ─────────────────────────────────────────
   Helper Functions
───────────────────────────────────────── */
export function getQuizForCourse(courseId?: string): QuizQuestion[] {
  if (courseId && COURSE_QUIZ_MAP[courseId]) return COURSE_QUIZ_MAP[courseId];
  return DEFAULT_QUIZ_QUESTIONS;
}

export function getExerciseForCourse(courseId?: string): ExerciseData {
  if (courseId && COURSE_EXERCISE_MAP[courseId]) return COURSE_EXERCISE_MAP[courseId];
  return DEFAULT_EXERCISE;
}
