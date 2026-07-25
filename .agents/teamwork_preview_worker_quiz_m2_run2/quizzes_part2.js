export const quizzesPart2 = {
  "lesson-ccna001-04": {
    "questions": [
      {
        "question_en": "Which device operates at Layer 2 (Data Link) and forwards traffic based on MAC addresses?",
        "question_th": "อุปกรณ์ใดทำงานที่ Layer 2 (Data Link) และคอยส่งข้อมูลต่ออิงตามตำแหน่ง MAC address?",
        "options": ["Hub", "Network Switch", "Router", "Repeater"],
        "correct_index": 1,
        "explanation_en": "Switches use MAC address tables to intelligently forward frames to specific ports in Layer 2.",
        "explanation_th": "สวิตช์ใช้ตาราง MAC address เพื่อสลับส่งเฟรมข้อมูลไปยังพอร์ตปลายทางที่ถูกต้องใน Layer 2"
      },
      {
        "question_en": "What is the primary difference between a Layer 2 switch and a router?",
        "question_th": "ข้อแตกต่างหลักระหว่างสวิตช์ Layer 2 และเร้าเตอร์คืออะไร?",
        "options": [
          "Switches use IP addresses; routers use MAC addresses.",
          "Switches use MAC addresses within a single network; routers use IP addresses to route between separate networks.",
          "Switches operate at Layer 3; routers operate at Layer 2.",
          "Switches only connect wireless clients."
        ],
        "correct_index": 1,
        "explanation_en": "Switches forward frames within a LAN segment using MAC addresses, whereas routers connect separate IP networks using IP routing.",
        "explanation_th": "สวิตช์ส่งต่อข้อมูลภายในเครือข่ายเดียวโดยอิงจาก MAC address ส่วนเร้าเตอร์เชื่อมข้ามเครือข่ายโดยใช้ IP address"
      },
      {
        "question_en": "Why is a network hub considered inefficient compared to a network switch?",
        "question_th": "เหตุใดอุปกรณ์ฮับ (Hub) จึงถือว่าไม่มีประสิทธิภาพเมื่อเทียบกับสวิตช์?",
        "options": [
          "It is more expensive.",
          "It floods all incoming traffic out of every port, causing collision domains and security risks.",
          "It does not support Ethernet cables.",
          "It lacks physical status lights."
        ],
        "correct_index": 1,
        "explanation_en": "Hubs act as physical repeaters, forwarding all traffic to all ports. This creates a single large collision domain.",
        "explanation_th": "ฮับทำหน้าที่ส่งสัญญาณซ้ำไปทุกพอร์ต ส่งผลให้เกิดการชนกันของข้อมูล (Collision) และส่งผลเสียต่อความปลอดภัยเครือข่าย"
      },
      {
        "question_en": "Which network security device monitors and filters network traffic based on predefined security rules?",
        "question_th": "อุปกรณ์ความปลอดภัยเครือข่ายใดทำหน้าที่ตรวจสอบและคัดกรองทราฟฟิกข้อมูลตามกฎระเบียบที่ตั้งไว้?",
        "options": ["Router", "Access Point", "Firewall", "Repeater"],
        "correct_index": 2,
        "explanation_en": "A Firewall filters inbound and outbound traffic to protect networks from unauthorized access.",
        "explanation_th": "ไฟร์วอลล์ (Firewall) ป้องกันระบบโดยตรวจสอบและสกัดทราฟฟิกเข้าออกตามนโยบายความปลอดภัย"
      },
      {
        "question_en": "Which device is used to extend the range of a network by receiving and regenerating physical signals?",
        "question_th": "อุปกรณ์ใดใช้ขยายระยะทางการรับส่งข้อมูลโดยรับและปรับเพิ่มคุณภาพสัญญาณทางกายภาพใหม่?",
        "options": ["Repeater", "Switch", "Router", "Firewall"],
        "correct_index": 0,
        "explanation_en": "A Repeater operates at Layer 1 (Physical) to regenerate signals and overcome cable distance limitations.",
        "explanation_th": "เครื่องทวนสัญญาณ (Repeater) ทำงานใน Layer 1 เพื่อกู้คืนและขยายสัญญาณที่อ่อนแรงลงเนื่องจากระยะสายเคเบิล"
      }
    ]
  },
  "lesson-ccna001-05": {
    "questions": [
      {
        "question_en": "How many bits are in an IPv4 address?",
        "question_th": "ที่อยู่ IPv4 (IPv4 address) ประกอบด้วยข้อมูลขนาดกี่บิต?",
        "options": ["16 bits", "32 bits", "64 bits", "128 bits"],
        "correct_index": 1,
        "explanation_en": "An IPv4 address is a 32-bit binary address represented as four octets in dotted-decimal format.",
        "explanation_th": "ไอพีแอดเดรสเวอร์ชัน 4 (IPv4) มีขนาดรวม 32 บิต เขียนแทนด้วยเลขฐานสิบสี่ชุดคั่นด้วยเครื่องหมายจุด"
      },
      {
        "question_en": "What is the default subnet mask for a Class C IP network?",
        "question_th": "ซับเน็ตมาสก์เริ่มต้น (Default Subnet Mask) สำหรับเครือข่ายคลาส C (Class C) คือข้อใด?",
        "options": ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.255"],
        "correct_index": 2,
        "explanation_en": "Class C networks have a default subnet mask of 255.255.255.0 (/24 prefix length).",
        "explanation_th": "เครือข่ายคลาส C มีค่าซับเน็ตมาสก์ตั้งต้นเป็น 255.255.255.0 (หรือความยาวพรีฟิกซ์ /24)"
      },
      {
        "question_en": "What is the network address for the host IP 192.168.1.50 with a subnet mask of 255.255.255.0?",
        "question_th": "เครือข่ายปลายทาง (Network Address) ของโฮสต์ไอพี 192.168.1.50 ที่มีซับเน็ตมาสก์เป็น 255.255.255.0 คือข้อใด?",
        "options": ["192.168.1.0", "192.168.1.255", "192.168.0.0", "192.168.1.1"],
        "correct_index": 0,
        "explanation_en": "Performing a logical AND on 192.168.1.50 and 255.255.255.0 yields the network address 192.168.1.0.",
        "explanation_th": "การทำ logical AND ระหว่างโฮสต์ IP 192.168.1.50 และมาสก์ 255.255.255.0 จะได้แอดเดรสของเครือข่ายเป็น 192.168.1.0"
      },
      {
        "question_en": "How many usable host addresses are available in a /26 subnet?",
        "question_th": "จำนวนไอพีที่เครื่องโฮสต์สามารถนำไปใช้งานได้จริง (Usable Host Addresses) ในซับเน็ตขนาด /26 คือเท่าใด?",
        "options": ["30", "62", "126", "64"],
        "correct_index": 1,
        "explanation_en": "A /26 subnet leaves 6 host bits. 2^6 - 2 = 64 - 2 = 62 usable host addresses.",
        "explanation_th": "ซับเน็ต /26 มีบิตสำหรับโฮสต์เหลือ 6 บิต สูตรคำนวณคือ 2^6 - 2 = 64 - 2 = 62 แอดเดรสที่สามารถตั้งค่าให้อุปกรณ์ได้"
      },
      {
        "question_en": "Which of the following is a private IP address range defined by RFC 1918?",
        "question_th": "ข้อใดต่อไปนี้คือช่วงไอพีส่วนบุคคล (Private IP Address) ตามที่กำหนดในมาตรฐาน RFC 1918?",
        "options": ["10.0.0.0 - 10.255.255.255", "172.16.0.0 - 172.31.255.255", "192.168.0.0 - 192.168.255.255", "All of the above"],
        "correct_index": 3,
        "explanation_en": "RFC 1918 defines three private IP address blocks: 10.0.0.0/8, 172.16.0.0/12, and 192.168.16.0/16 (represented as 192.168.0.0/16).",
        "explanation_th": "RFC 1918 กำหนดกลุ่มไอพีส่วนบุคคลไว้ 3 ช่วงหลัก ได้แก่ 10.0.0.0/8, 172.16.0.0/12 และ 192.168.0.0/16 ดังนั้นทุกข้อจึงถูกต้อง"
      }
    ]
  },
  "lesson-ccna002-01": {
    "questions": [
      {
        "question_en": "What type of address does an Ethernet switch use to make forwarding decisions?",
        "question_th": "สวิตช์อีเธอร์เน็ต (Ethernet Switch) ใช้แอดเดรสประเภทใดในการกำหนดแนวทางส่งข้อมูลเฟรม?",
        "options": ["IP Address", "MAC Address", "Port Number", "Autonomous System Number"],
        "correct_index": 1,
        "explanation_en": "Ethernet switches operate at Layer 2 and forward frames using destination MAC addresses.",
        "explanation_th": "สวิตช์อีเธอร์เน็ตทำงานใน Layer 2 และตัดสินใจส่งต่อข้อมูลโดยตรวจสอบ MAC address ปลายทาง"
      },
      {
        "question_en": "How does a switch build its MAC Address Table?",
        "question_th": "สวิตช์สร้างตารางข้อมูล MAC Address Table ของตนเองขึ้นมาได้อย่างไร?",
        "options": [
          "It queries a DNS server.",
          "It learns source MAC addresses from incoming frames on each interface.",
          "It is hardcoded by the administrator.",
          "It learns them from routing tables."
        ],
        "correct_index": 1,
        "explanation_en": "A switch populates its MAC table dynamically by recording the source MAC address of received frames and mapping them to incoming ports.",
        "explanation_th": "สวิตช์เรียนรู้ตำแหน่งของอุปกรณ์โดยบันทึก MAC address ต้นทาง (Source MAC) ที่ส่งเข้ามาจากพอร์ตอินเตอร์เฟสนั้นๆ"
      },
      {
        "question_en": "What action does a switch take when it receives a frame with an unknown destination MAC address?",
        "question_th": "สวิตช์จะดำเนินการอย่างไรเมื่อได้รับเฟรมข้อมูลที่มีปลายทางเป็น MAC address ที่ไม่รู้จักในตาราง?",
        "options": [
          "It discards the frame immediately.",
          "It floods the frame out of all ports except the receiving port.",
          "It queries the default gateway.",
          "It sends an ICMP error message back."
        ],
        "correct_index": 1,
        "explanation_en": "When a destination MAC is not in the MAC table, the switch performs unknown unicast flooding, broadcasting it out of all active ports except the ingress port.",
        "explanation_th": "หากไม่พบข้อมูลแอดเดรสปลายทาง สวิตช์จะทำการกระจายข้อมูลออกไปทุกพอร์ตที่มีสถานะทำงานอยู่ ยกเว้นพอร์ตที่ข้อมูลนั้นวิ่งเข้ามา"
      },
      {
        "question_en": "What is the standard size of a MAC address?",
        "question_th": "ขนาดมาตรฐานของ MAC address คือเท่าใด?",
        "options": ["32 bits", "48 bits", "64 bits", "128 bits"],
        "correct_index": 1,
        "explanation_en": "A MAC address is a 48-bit (6-byte) physical address represented in hexadecimal format.",
        "explanation_th": "MAC address เป็นเลขแอดเดรสทางกายภาพขนาด 48 บิต (6 ไบต์) เขียนแทนในรูปแบบฐานสิบหก"
      },
      {
        "question_en": "In what transmission mode can a switch port send and receive data at the same time?",
        "question_th": "โหมดการรับส่งข้อมูลแบบใดบนพอร์ตสวิตช์ที่อนุญาตให้รับและส่งข้อมูลพร้อมกันได้?",
        "options": ["Half-Duplex", "Full-Duplex", "Simplex", "Auto-sensing only"],
        "correct_index": 1,
        "explanation_en": "Full-Duplex communication allows simultaneous bidirectional data transmission without collision risks.",
        "explanation_th": "โหมดฟูลดูเพล็กซ์ (Full-Duplex) รองรับการรับและส่งข้อมูลในเวลาเดียวกันโดยช่วยเลี่ยงปัญหาการชนกันของสัญญาณ"
      }
    ]
  },
  "lesson-ccna002-02": {
    "questions": [
      {
        "question_en": "What is the primary purpose of a Virtual LAN (VLAN)?",
        "question_th": "วัตถุประสงค์หลักของระบบเครือข่ายเสมือน (VLAN) คืออะไร?",
        "options": [
          "To speed up physical connections.",
          "To segment a physical switch into separate logical networks, dividing broadcast domains.",
          "To automatically assign IP addresses.",
          "To route traffic between different physical buildings."
        ],
        "correct_index": 1,
        "explanation_en": "VLANs logically divide a physical switch network into separate broadcast domains, improving security and management.",
        "explanation_th": "VLAN ช่วยจัดสรรกลุ่มสวิตช์ทางกายภาพให้แยกย่อยเป็นระบบเครือข่ายเชิงตรรกะ ส่งผลให้เกิดการแบ่ง Broadcast Domain ออกจากกัน"
      },
      {
        "question_en": "Which VLAN is typically used as the default VLAN for all switch ports out-of-the-box on Cisco switches?",
        "question_th": "VLAN หมายเลขใดที่เป็น VLAN เริ่มต้น (Default VLAN) สำหรับพอร์ตทั้งหมดของสวิตช์ Cisco จากโรงงาน?",
        "options": ["VLAN 0", "VLAN 1", "VLAN 100", "VLAN 1002"],
        "correct_index": 1,
        "explanation_en": "VLAN 1 is the default native and management VLAN on Cisco switches out-of-the-box.",
        "explanation_th": "VLAN 1 คือหมายเลขมาตรฐานที่สวิตช์จะตั้งเป็นกลุ่มเริ่มต้นให้ทุกพอร์ตใช้งานทันทีเมื่อเริ่มเดินระบบครั้งแรก"
      },
      {
        "question_en": "What configuration command assigns an interface to VLAN 10 as an access port?",
        "question_th": "คำสั่งคอนฟิกใดใช้กำหนดพอร์ตอินเตอร์เฟสให้ทำหน้าที่เป็น Access Port อยู่ใน VLAN 10?",
        "options": [
          "switchport mode trunk; switchport trunk allowed vlan 10",
          "switchport access vlan 10",
          "vlan 10; switchport trunk native vlan 10",
          "switchport mode access; switchport access vlan 10"
        ],
        "correct_index": 3,
        "explanation_en": "An access port is configured using 'switchport mode access' followed by 'switchport access vlan 10'.",
        "explanation_th": "การตั้งค่าให้พอร์ตทำหน้าที่เชื่อมปลายทางเข้า VLAN ทำได้โดยสั่ง 'switchport mode access' ตามด้วย 'switchport access vlan 10'"
      },
      {
        "question_en": "What is the range of normal VLAN IDs on a Cisco switch?",
        "question_th": "ช่วงของหมายเลข VLAN ID แบบปกติ (Normal Range VLANs) บนสวิตช์ Cisco คือข้อใด?",
        "options": ["1 - 1001", "1 - 4094", "2 - 1005", "1 - 1005"],
        "correct_index": 3,
        "explanation_en": "Normal range VLANs on Cisco switches are numbered 1 through 1005, with 1002-1005 reserved for legacy protocols.",
        "explanation_th": "ช่วง VLAN ปกติบนอุปกรณ์ Cisco คือ 1 ถึง 1005 โดยมีหมายเลข 1002-1005 จองไว้สำหรับโปรโตคอลระบบเก่า"
      },
      {
        "question_en": "Can devices on different VLANs communicate directly with each other without a Layer 3 device?",
        "question_th": "อุปกรณ์ที่อยู่ต่าง VLAN กันจะสามารถสื่อสารกันโดยตรงโดยไม่ต้องพึ่งพาอุปกรณ์ Layer 3 ได้หรือไม่?",
        "options": [
          "Yes, switches automatically route between VLANs.",
          "No, routing between VLANs requires a Layer 3 device (such as a router or multilayer switch).",
          "Yes, if they are connected to the same switch.",
          "No, unless they share the same physical cable."
        ],
        "correct_index": 1,
        "explanation_en": "VLANs block Layer 2 broadcast/unicast traffic between each other. Inter-VLAN communication requires Layer 3 routing.",
        "explanation_th": "ไม่สามารถทำได้ เนื่องจาก VLAN แยกการทำงานในระดับ Layer 2 ออกจากกันโดยเด็ดขาด การสื่อสารข้ามวงจึงต้องผ่านการจัดเส้นทางใน Layer 3 เท่านั้น"
      }
    ]
  },
  "lesson-ccna002-03": {
    "questions": [
      {
        "question_en": "Which protocol is the industry standard for tagging frames on a trunk link?",
        "question_th": "โปรโตคอลใดที่เป็นมาตรฐานสากลในการทำ Tagging เฟรมบนพอร์ต Trunk?",
        "options": ["ISL", "802.1Q", "802.3", "VTP"],
        "correct_index": 1,
        "explanation_en": "IEEE 802.1Q is the industry-standard frame encapsulation protocol used to carry multiple VLAN traffic over a trunk link.",
        "explanation_th": "IEEE 802.1Q คือมาตรฐานหลักในปัจจุบันที่ใช้แปะป้ายระบุหมายเลข VLAN (Tagging) วิ่งผ่านลิงก์เชื่อมต่อแบบ Trunk"
      },
      {
        "question_en": "What is the purpose of the Native VLAN on an 802.1Q trunk link?",
        "question_th": "Native VLAN ในการเชื่อมต่อแบบ 802.1Q Trunk มีวัตถุประสงค์เพื่ออะไร?",
        "options": [
          "To encrypt management traffic.",
          "To handle untagged traffic received on the trunk link.",
          "To block VLAN loop creation.",
          "To assign IP addresses to the switch interface."
        ],
        "correct_index": 1,
        "explanation_en": "Frames belonging to the Native VLAN are sent untagged across the 802.1Q trunk link. Untagged frames received on the trunk are processed by the native VLAN.",
        "explanation_th": "Native VLAN จะยอมให้เฟรมข้อมูลเดินทางผ่านสาย Trunk ไปได้โดยไม่มีการแปะ Tag และหากมีเฟรมที่ไม่มี Tag วิ่งเข้ามาก็จะถือเป็นของ Native VLAN เช่นกัน"
      },
      {
        "question_en": "What happens if there is a Native VLAN mismatch between two connected switch trunk ports?",
        "question_th": "จะเกิดอะไรขึ้นหากมีการตั้งค่า Native VLAN ไม่ตรงกันระหว่างพอร์ต Trunk ของสวิตช์สองฝั่งที่เชื่อมกัน?",
        "options": [
          "The switches will automatically disable trunking.",
          "Traffic may leak between different VLANs, and CDP will generate error warnings.",
          "The trunk will fall back to half-duplex.",
          "All traffic will be encrypted."
        ],
        "correct_index": 1,
        "explanation_en": "A native VLAN mismatch can cause traffic from one VLAN to bleed into a different VLAN, and generates configuration warnings via protocols like CDP.",
        "explanation_th": "จะเกิดความปั่นป่วนของข้อมูลที่ไหลข้ามสลับวง VLAN กัน (VLAN leaking) และโปรโตคอล CDP จะแจ้งเตือนข้อผิดพลาดขึ้นมาทันที"
      },
      {
        "question_en": "Which command is used to configure a switch port to dynamically negotiate trunk status with a connected device?",
        "question_th": "คำสั่งใดใช้ระบุให้พอร์ตสวิตช์เริ่มทำข้อตกลงโหมด Trunk โดยอัตโนมัติกับอุปกรณ์ปลายทาง?",
        "options": [
          "switchport mode trunk",
          "switchport mode dynamic desirable",
          "switchport mode access",
          "switchport negotiation enable"
        ],
        "correct_index": 1,
        "explanation_en": "The 'switchport mode dynamic desirable' (or dynamic auto) command enables Dynamic Trunking Protocol (DTP) to negotiate the trunk link.",
        "explanation_th": "การสั่งโหมด 'switchport mode dynamic desirable' จะเรียกใช้โปรโตคอล DTP เพื่อคุยเจรจาตกลงเปิดโหมด Trunk ให้เองหากคู่สายยินยอม"
      },
      {
        "question_en": "How many bytes does the 802.1Q tag add to an Ethernet frame header?",
        "question_th": "ป้าย Tag ของระบบ 802.1Q จะเพิ่มข้อมูลเข้าไปในส่วนหัว (Header) ของเฟรมอีเธอร์เน็ตขนาดกี่ไบต์?",
        "options": ["2 bytes", "4 bytes", "8 bytes", "12 bytes"],
        "correct_index": 1,
        "explanation_en": "The 802.1Q tagging process inserts a 4-byte VLAN tag into the original Ethernet frame header.",
        "explanation_th": "การแปะ VLAN tag แบบ 802.1Q จะแทรกข้อมูลเข้าไปเป็นจำนวน 4 ไบต์ ในส่วนหัวของเฟรมอีเธอร์เน็ตปกติ"
      }
    ]
  },
  "lesson-ccna002-04": {
    "questions": [
      {
        "question_en": "What is the primary function of Spanning Tree Protocol (STP)?",
        "question_th": "หน้าที่หลักที่สำคัญที่สุดของโปรโตคอล Spanning Tree (STP) คืออะไร?",
        "options": [
          "To route IP packets between separate switches.",
          "To prevent Layer 2 loops in redundant network topologies by blocking redundant paths.",
          "To tag VLAN traffic on trunk links.",
          "To aggregate bandwidth from multiple physical ports."
        ],
        "correct_index": 1,
        "explanation_en": "STP prevents Layer 2 loops, broadcast storms, and MAC database instability by logically blocking redundant ports.",
        "explanation_th": "STP ป้องกันการเกิดข้อมูลวนลูปในระดับ Layer 2 (Loop) โดยวิเคราะห์และปิดพอร์ตสำรองบางตัวไม่ให้ส่งข้อมูลชั่วคราว"
      },
      {
        "question_en": "Which switch in an STP topology is elected as the reference point for all path calculations?",
        "question_th": "สวิตช์ตัวใดในโครงสร้าง STP ที่จะได้รับการคัดเลือกให้เป็นจุดอ้างอิงหลักสำหรับการคำนวณระยะทางทั้งหมด?",
        "options": ["Backup Bridge", "Root Bridge", "Designated Switch", "Primary Switch"],
        "correct_index": 1,
        "explanation_en": "The Root Bridge is the logical center of the STP topology. All other switches calculate their path costs relative to it.",
        "explanation_th": "Root Bridge คือสวิตช์ที่เป็นจุดศูนย์กลางของโครงสร้างระบบ STP ซึ่งอุปกรณ์ทุกตัวจะวัดระยะเส้นทางอ้างอิงจากตัวนี้"
      },
      {
        "question_en": "What two values make up the STP Bridge ID (BID)?",
        "question_th": "ค่าข้อมูลสองประเภทใดรวมกันประกอบขึ้นเป็น Bridge ID (BID) ในระบบ STP?",
        "options": [
          "IP Address and MAC Address",
          "Bridge Priority and MAC Address",
          "Port Priority and Port ID",
          "VLAN ID and IP Address"
        ],
        "correct_index": 1,
        "explanation_en": "The Bridge ID consists of the Bridge Priority (default 32768) and the hardware MAC address of the switch.",
        "explanation_th": "Bridge ID ประกอบด้วยสองส่วน ได้แก่ ค่าระดับความสำคัญ (Bridge Priority) และหมายเลข MAC address ทางกายภาพของอุปกรณ์"
      },
      {
        "question_en": "Which STP port state allows the port to send and receive user data?",
        "question_th": "พอร์ตสถานะใดของ STP ที่เริ่มเปิดทำงานให้อุปกรณ์สามารถรับและส่งข้อมูลของผู้ใช้ตามปกติได้?",
        "options": ["Blocking", "Listening", "Learning", "Forwarding"],
        "correct_index": 3,
        "explanation_en": "The Forwarding state allows an STP-enabled port to process frames and forward traffic normally.",
        "explanation_th": "สถานะ Forwarding ยินยอมให้พอร์ตรับส่งเฟรมข้อมูลผู้ใช้และคอยส่งผ่านการทำงานปกติ"
      },
      {
        "question_en": "If a switch has a bridge priority of 32768 and another has 4096, which one is more likely to become the Root Bridge?",
        "question_th": "หากสวิตช์ตัวที่หนึ่งตั้งค่า Priority เป็น 32768 และสวิตช์ตัวที่สองเป็น 4096 อุปกรณ์ตัวใดมีโอกาสเป็น Root Bridge สูงกว่า?",
        "options": [
          "The switch with priority 32768.",
          "The switch with priority 4096.",
          "They have equal chance, depending on their IP addresses.",
          "The switch with the higher MAC address."
        ],
        "correct_index": 1,
        "explanation_en": "STP elects the Root Bridge based on the lowest Bridge ID. A lower priority value (like 4096) guarantees selection over default values (32768).",
        "explanation_th": "STP จะเลือก Root Bridge จากอุปกรณ์ที่ Bridge ID ต่ำที่สุด ดังนั้นค่า Priority ที่น้อยกว่า (เช่น 4096) จะได้รับการเลือก"
      }
    ]
  },
  "lesson-ccna002-05": {
    "questions": [
      {
        "question_en": "What does VTP (VLAN Trunking Protocol) simplify in a switch network?",
        "question_th": "โปรโตคอล VTP (VLAN Trunking Protocol) ช่วยลดความยุ่งยากในเรื่องใดของระบบเครือข่าย?",
        "options": [
          "IP routing configurations.",
          "The creation, deletion, and synchronization of VLAN definitions across switches.",
          "Port security monitoring.",
          "Spanning tree path calculations."
        ],
        "correct_index": 1,
        "explanation_en": "VTP propagates the addition, deletion, and renaming of VLANs to all switches within a VTP domain, reducing administrative overhead.",
        "explanation_th": "VTP คอยแจกจ่ายข้อมูลการเพิ่ม ลบ หรือแก้ไขชื่อ VLAN ไปให้สวิตช์เครือข่ายตัวอื่นๆ ใน VTP Domain เดียวกันโดยอัตโนมัติ"
      },
      {
        "question_en": "In which VTP mode can you create, modify, and delete VLANs that will propagate to other switches?",
        "question_th": "ในโหมด VTP ใดที่คุณสามารถเพิ่ม ลบ หรือแก้ไข VLAN แล้วส่งผลกระทบสะท้อนไปยังสวิตช์เครือข่ายตัวอื่นๆ?",
        "options": ["VTP Server", "VTP Client", "VTP Transparent", "VTP Off"],
        "correct_index": 0,
        "explanation_en": "VTP Server is the default mode where administrators make VLAN changes which are saved in NVRAM and advertised.",
        "explanation_th": "VTP Server คือโหมดเริ่มต้นที่อนุญาตให้ผู้ดูแลระบบแก้ไขข้อมูล VLAN และคอยส่งข่าวสารอัปเดตกระจายไปยังตัวอื่นๆ"
      },
      {
        "question_en": "What is a characteristic of a switch configured in VTP Client mode?",
        "question_th": "ข้อใดเป็นคุณสมบัติจำเพาะของสวิตช์ที่ตั้งค่าเป็น VTP Client?",
        "options": [
          "It can create VLANs but cannot delete them.",
          "It cannot create, modify, or delete VLANs locally, and must learn them from a VTP Server.",
          "It does not participate in VTP at all.",
          "It saves VLAN configuration in NVRAM."
        ],
        "correct_index": 1,
        "explanation_en": "VTP Clients cannot modify the VLAN database locally; they only synchronize their VLANs based on advertisements from VTP Servers.",
        "explanation_th": "VTP Client จะไม่สามารถแก้ไขฐานข้อมูล VLAN ได้เองในตัว แต่ต้องรอรับข่าวสารการซิงโครไนซ์จาก Server"
      },
      {
        "question_en": "How does VTP determine whether an incoming advertisement contains more recent information than the local database?",
        "question_th": "VTP ทราบได้อย่างไรว่าข้อมูลที่ส่งมาจากเพื่อนบ้านมีความเป็นปัจจุบันและใหม่กว่าตารางข้อมูลภายในตนเอง?",
        "options": [
          "By comparing the timestamps.",
          "By comparing the Configuration Revision Number.",
          "By validating the MD5 checksum hash.",
          "By checking the server's IP address."
        ],
        "correct_index": 1,
        "explanation_en": "Switches check the Configuration Revision Number. If the revision number in the advertisement is higher than the local revision, the switch updates its VLAN database.",
        "explanation_th": "สวิตช์ตรวจสอบผ่านหมายเลขปรับปรุง (Configuration Revision Number) หากค่าที่ส่งมาสูงกว่าค่าปัจจุบัน แปลว่าเป็นข้อมูลที่อัปเดตกว่า"
      },
      {
        "question_en": "What is the behavior of a switch in VTP Transparent mode?",
        "question_th": "ลักษณะการทำงานของสวิตช์เครือข่ายในโหมด VTP Transparent คือข้อใด?",
        "options": [
          "It discards VTP advertisements without forwarding them.",
          "It forwards VTP advertisements but does not apply the VLAN changes locally, allowing local VLAN modifications.",
          "It behaves exactly like a VTP Client.",
          "It automatically becomes the Root VTP Server."
        ],
        "correct_index": 1,
        "explanation_en": "Transparent mode switches do not synchronize with VTP advertisements but forward them to other switches, maintaining a localized VLAN database.",
        "explanation_th": "VTP Transparent จะไม่ซิงค์ค่าใดๆ จาก VTP Server แต่จะคอยส่งต่อข่าวสาร VTP ไปให้ตัวอื่น และสามารถเขียนหรือลบ VLAN ในตัวเองได้แยกต่างหาก"
      }
    ]
  },
  "lesson-ccna002-07": {
    "questions": [
      {
        "question_en": "What is Inter-VLAN Routing?",
        "question_th": "Inter-VLAN Routing หมายถึงกระบวนการใด?",
        "options": [
          "Routing traffic between different physical LAN networks.",
          "Forwarding traffic between different logical VLAN segments using a Layer 3 device.",
          "Blocking traffic between switches.",
          "Broadcasting messages to all switches."
        ],
        "correct_index": 1,
        "explanation_en": "Inter-VLAN Routing is the process of routing traffic between different VLANs using a router or multilayer switch.",
        "explanation_th": "คือการส่งต่อทราฟฟิกข้อมูลเชื่อมสลับการทำงานข้ามกลุ่มเครือข่ายเสมือน (VLAN) ต่างวง โดยต้องใช้อุปกรณ์ระดับ Layer 3"
      },
      {
        "question_en": "In a Router-on-a-Stick (ROAS) configuration, how does the router interface connect to the switch?",
        "question_th": "ในโครงสร้าง Router-on-a-Stick (ROAS) สายเชื่อมต่อฝั่งอินเตอร์เฟสของเร้าเตอร์จะต่อเข้ากับสวิตช์ในรูปแบบใด?",
        "options": [
          "Using multiple physical cables, one for each VLAN.",
          "Using a single physical interface configured with subinterfaces connected to a switch trunk port.",
          "Using serial console cables.",
          "Via wireless routing."
        ],
        "correct_index": 1,
        "explanation_en": "Router-on-a-Stick utilizes a single physical interface divided into logical subinterfaces, connected to a switch trunk port.",
        "explanation_th": "ROAS ใช้พอร์ตอินเตอร์เฟสจริงเพียงหนึ่งช่องสัญญาณ แต่แตกแยกย่อยเป็นอินเตอร์เฟสจำลอง (Subinterface) ต่อสายเข้าหาพอร์ต Trunk บนสวิตช์"
      },
      {
        "question_en": "What is the command to create and enter subinterface configuration on a router's GigabitEthernet 0/0 interface for VLAN 10?",
        "question_th": "คำสั่งใดสร้างและเปิดการตั้งค่าอินเตอร์เฟสย่อย (Subinterface) หมายเลข 10 บนพอร์ต GigabitEthernet 0/0 ของเร้าเตอร์?",
        "options": [
          "interface gigabitethernet 0/0 vlan 10",
          "interface gigabitethernet 0/0.10",
          "subinterface gigabitethernet 0/0 10",
          "interface g0/0 sub 10"
        ],
        "correct_index": 1,
        "explanation_en": "Subinterfaces are configured by adding a dot and a logical number after the physical interface name (e.g., interface GigabitEthernet 0/0.10).",
        "explanation_th": "การเข้าแต่งค่าอินเตอร์เฟสย่อยทำได้โดยระบุจุดทศนิยมตามหลังชื่อพอร์ตหลัก เช่น 'interface gigabitethernet 0/0.10'"
      },
      {
        "question_en": "Which command is required on a router subinterface to enable 802.1Q encapsulation for VLAN 10?",
        "question_th": "คำสั่งใดที่จำเป็นต้องกำหนดบนอินเตอร์เฟสย่อยของเร้าเตอร์เพื่อเปิดใช้งานการห่อหุ้ม 802.1Q สำหรับ VLAN 10?",
        "options": [
          "encapsulation dot1q 10",
          "switchport mode trunk 10",
          "vlan 10 encapsulation",
          "ip encapsulation 802.1q vlan 10"
        ],
        "correct_index": 0,
        "explanation_en": "The 'encapsulation dot1q <vlan-id>' command is required to associate a subinterface with a specific VLAN tag.",
        "explanation_th": "คำสั่ง 'encapsulation dot1q 10' เป็นการระบุให้อินเตอร์เฟสย่อยผูกการรับส่ง Tag ในรูปแบบ 802.1Q กับ VLAN 10"
      },
      {
        "question_en": "What virtual interface is used to perform Inter-VLAN routing directly on a Multilayer Switch (Layer 3 Switch)?",
        "question_th": "อินเตอร์เฟสเสมือนชนิดใดที่ถูกเรียกสร้างขึ้นมาเพื่อใช้นำทางเร้าติ้งข้าม VLAN บนสวิตช์ระดับ Multilayer Switch (L3 Switch)?",
        "options": ["Loopback Interface", "Switch Virtual Interface (SVI)", "Subinterface", "Tunnel Interface"],
        "correct_index": 1,
        "explanation_en": "Multilayer switches use Switch Virtual Interfaces (SVIs), configured via 'interface vlan <vlan-id>', to route between networks.",
        "explanation_th": "สวิตช์ Layer 3 จะสั่งสร้างอินเตอร์เฟสเสมือนที่ชื่อ SVI (ผ่านคำสั่ง 'interface vlan <number>') เพื่อคอยจัดการแอดเดรสในการจัดเส้นทาง"
      }
    ]
  },
  "lesson-ccna003-01": {
    "questions": [
      {
        "question_en": "What is the primary lookup table a router uses to determine the next hop for a packet?",
        "question_th": "ตารางตรวจสอบเส้นทางหลักใดที่เร้าเตอร์นำมาสแกนข้อมูลเพื่อตัดสินใจพานำแพ็กเก็ตไปยัง Next Hop?",
        "options": ["MAC Address Table", "Routing Table", "ARP Cache", "NAT Table"],
        "correct_index": 1,
        "explanation_en": "Routers inspect their routing table to match destination IP prefixes and find forwarding interfaces.",
        "explanation_th": "เร้าเตอร์จะเปรียบเทียบข้อมูลไอพีปลายทางเข้ากับรายการภายในตารางหาเส้นทาง (Routing Table) เพื่อชี้จุดนำส่ง"
      },
      {
        "question_en": "What value represents the trustworthiness of a routing source in Cisco routers?",
        "question_th": "ค่าตัวเลขใดที่แสดงถึงระดับความน่าเชื่อถือของแหล่งที่มาของข้อมูลการจัดเส้นทางในเร้าเตอร์ Cisco?",
        "options": ["Metric", "Administrative Distance (AD)", "Hop Count", "Cost"],
        "correct_index": 1,
        "explanation_en": "Administrative Distance (AD) is the measure of routing source preference. Lower values are more trusted.",
        "explanation_th": "Administrative Distance (AD) เป็นค่าแสดงความน่าเชื่อถือของแต่ละช่องทางจัดเส้นทาง โดยค่าที่ต่ำกว่าจะได้รับความสำคัญสูงสุด"
      },
      {
        "question_en": "Which of the following routing sources has the default Administrative Distance of 1?",
        "question_th": "แหล่งที่มาของเส้นทางในข้อใดต่อไปนี้ที่มีค่า Administrative Distance (AD) เริ่มต้นเท่ากับ 1?",
        "options": ["Directly Connected", "Static Route", "OSPF", "EIGRP"],
        "correct_index": 1,
        "explanation_en": "Directly connected routes have an AD of 0. Static routes have a default AD of 1.",
        "explanation_th": "เส้นทางเชื่อมต่อตรงมี AD เป็น 0 ส่วนการคอนฟิกเส้นทางแบบกำหนดเอง (Static Route) จะมี AD เริ่มต้นเป็น 1"
      },
      {
        "question_en": "What is the default Administrative Distance of OSPF routes?",
        "question_th": "ค่า Administrative Distance (AD) เริ่มต้นของโปรโตคอล OSPF คือเท่าใด?",
        "options": ["90", "110", "120", "170"],
        "correct_index": 1,
        "explanation_en": "OSPF has a default Administrative Distance of 110.",
        "explanation_th": "OSPF ถูกกำหนดค่า Administrative Distance เริ่มต้นอยู่ที่ระดับ 110"
      },
      {
        "question_en": "What routing table entry is matched when no specific route exists for a destination packet?",
        "question_th": "ข้อมูลแถวใดในตารางเร้าติ้งจะถูกนำมาใช้งานเมื่อไม่มีเส้นทางเฉพาะอื่นตรงกับเลขไอพีปลายทางของแพ็กเก็ตเลย?",
        "options": ["Loopback Route", "Default Route (0.0.0.0/0)", "Static Host Route", "Connected Route"],
        "correct_index": 1,
        "explanation_en": "The default route (0.0.0.0/0) acts as a gateway of last resort, matching all traffic when no specific entry exists.",
        "explanation_th": "Default Route (ระบุเป็น 0.0.0.0/0) ทำหน้าที่เป็นประตูท้ายสุดในการนำส่งแพ็กเก็ตเมื่อไม่พบข้อมูลนำทางที่เจาะจงกว่า"
      }
    ]
  },
  "lesson-ccna003-02": {
    "questions": [
      {
        "question_en": "What is a major advantage of Static Routing over Dynamic Routing?",
        "question_th": "ข้อดีที่สำคัญของการจัดเส้นทางแบบคงที่ (Static Routing) เมื่อเทียบกับแบบไดนามิกคืออะไร?",
        "options": [
          "It automatically adapts to network topology changes.",
          "It uses no router CPU processing and link bandwidth for advertisements.",
          "It is easier to configure in very large networks.",
          "It automatically calculates the best path metric."
        ],
        "correct_index": 1,
        "explanation_en": "Static routes do not send periodic routing updates, reducing CPU overhead and saving link bandwidth.",
        "explanation_th": "การตั้งค่าเส้นทางแบบคงที่ไม่จำเป็นต้องส่งสัญญาณอัปเดตหากัน จึงไม่มี CPU overhead และประหยัดแบนด์วิดท์"
      },
      {
        "question_en": "What is the command to configure a static route to the network 10.0.0.0/24 via the next-hop IP 192.168.1.1?",
        "question_th": "คำสั่งในการกำหนดเส้นทางคงที่ไปยังเครือข่าย 10.0.0.0/24 ผ่านไอพีปลายทางถัดไป 192.168.1.1 คือข้อใด?",
        "options": [
          "ip route 10.0.0.0 255.255.255.0 192.168.1.1",
          "route add 10.0.0.0 mask 255.255.255.0 192.168.1.1",
          "ip route 192.168.1.1 10.0.0.0 255.255.255.0",
          "router static 10.0.0.0/24 192.168.1.1"
        ],
        "correct_index": 0,
        "explanation_en": "The syntax for a static route is: 'ip route <destination-network> <subnet-mask> <next-hop-ip | exit-interface>'.",
        "explanation_th": "รูปแบบไวยากรณ์คือ 'ip route <เครือข่ายปลายทาง> <ซับเน็ตมาสก์> <ไอพีเพื่อนบ้าน/หรือพอร์ตขาออก>'"
      },
      {
        "question_en": "What is a Floating Static Route?",
        "question_th": "Floating Static Route คืออะไร?",
        "options": [
          "A static route configured to use loopback interface.",
          "A backup static route configured with an Administrative Distance higher than the primary routing protocol.",
          "A route that automatically changes its IP addressing.",
          "A temporary route created during network testing."
        ],
        "correct_index": 1,
        "explanation_en": "A floating static route acts as a backup path. It is created by setting an AD higher than the primary path, so it only enters the routing table if the primary path fails.",
        "explanation_th": "คือเส้นทางสำรองที่ตั้งค่า AD ไว้สูงกว่าค่าจัดเส้นทางหลัก (เช่น 120 เพื่อสำรองให้ OSPF 110) ทำให้ทำงานเฉพาะเมื่อระบบหลักล่ม"
      },
      {
        "question_en": "Which command creates a floating static route to serve as a backup to OSPF (default AD 110)?",
        "question_th": "คำสั่งใดสร้าง Floating Static Route เพื่อเป็นทางสำรองให้กับระบบหลักอย่าง OSPF (AD เริ่มต้น 110)?",
        "options": [
          "ip route 10.0.0.0 255.255.255.0 192.168.1.1 50",
          "ip route 10.0.0.0 255.255.255.0 192.168.1.1 120",
          "ip route 10.0.0.0 255.255.255.0 192.168.1.1",
          "ip route floating 10.0.0.0 255.255.255.0 192.168.1.1"
        ],
        "correct_index": 1,
        "explanation_en": "By adding '120' to the end of the 'ip route' command, you set the AD higher than OSPF's 110, creating a floating backup.",
        "explanation_th": "การแนบตัวเลข '120' ท้ายสุดจะเป็นการระบุ AD ของเส้นทางนั้นให้สูงกว่า 110 (OSPF) เพื่อเก็บพับไว้ทำงานเป็นวงสำรองขากลับ"
      },
      {
        "question_en": "What is a static host route?",
        "question_th": "Static Host Route คืออะไร?",
        "options": [
          "A static route to a network subnet mask of 255.255.255.255.",
          "A route that only routes local management traffic.",
          "A default route.",
          "A route that redirects traffic back to the local host loopback."
        ],
        "correct_index": 0,
        "explanation_en": "A static host route is configured to direct traffic to a single specific IP address, using a subnet mask of 255.255.255.255 (/32).",
        "explanation_th": "คือการล็อคการนำส่งข้อมูลเฉพาะเจาะจงลงไปยังเครื่องปลายทางเครื่องเดียว โดยระบุหน้ากากเป็น 255.255.255.255 (/32)"
      }
    ]
  },
  "lesson-ccna003-03": {
    "questions": [
      {
        "question_en": "What classification of routing protocol is RIP?",
        "question_th": "RIP จัดเป็นโปรโตคอลเร้าติ้งประเภทใดตามลักษณะการออกแบบ?",
        "options": ["Link State", "Distance Vector", "Path Vector", "Link Vector"],
        "correct_index": 1,
        "explanation_en": "RIP is a classic Distance Vector routing protocol that determines paths using hop count metrics.",
        "explanation_th": "RIP เป็นโปรโตคอลประเภท Distance Vector ยุคเก่าซึ่งคำนวณการวัดระยะโดยพิจารณาจากจำนวน Hop"
      },
      {
        "question_en": "What is the maximum hop count allowed in RIP? At what number is a destination considered unreachable?",
        "question_th": "จำนวน Hop สูงสุดที่โปรโตคอล RIP ยินยอมให้ส่งผ่านข้อมูลคือเท่าใด? และค่าเท่าใดที่ถือว่าไปไม่ถึงปลายทาง?",
        "options": [
          "Maximum 10 hops; 11 is unreachable.",
          "Maximum 15 hops; 16 is unreachable.",
          "Maximum 255 hops; 256 is unreachable.",
          "Unlimited hops."
        ],
        "correct_index": 1,
        "explanation_en": "RIP allows a maximum hop count of 15. A hop count of 16 is defined as infinite (unreachable) to prevent routing loops.",
        "explanation_th": "RIP ยอมรับระยะส่งได้ไม่เกิน 15 Hop โดยหากวัดได้ค่าที่ 16 จะตีความว่าทางขาด (unreachable) เพื่อตัดลูป"
      },
      {
        "question_en": "What is a key improvement of RIPv2 compared to the original RIPv1?",
        "question_th": "จุดปรับปรุงที่สำคัญของ RIPv2 เมื่อเทียบกับเวอร์ชันแรก (RIPv1) คืออะไร?",
        "options": [
          "RIPv2 uses link state Dijkstra algorithm.",
          "RIPv2 is classless, supporting CIDR and subnet masks in updates.",
          "RIPv2 allows hop counts up to 100.",
          "RIPv2 sends updates via broadcast only."
        ],
        "correct_index": 1,
        "explanation_en": "RIPv2 is classless, transmitting subnet mask information within updates and supporting VLSM, whereas RIPv1 is classful.",
        "explanation_th": "RIPv2 เปลี่ยนผ่านเป็นระบบ Classless ที่แนบรายละเอียดซับเน็ตมาสก์ไปในแพ็กเก็ตข่าวสาร จึงรองรับการแบ่ง VLSM ต่างจาก RIPv1"
      },
      {
        "question_en": "What multicast address does RIPv2 use to send routing updates to neighbors?",
        "question_th": "RIPv2 ใช้ที่อยู่มัลติแคสต์ (Multicast address) เลขใดในการส่งข่าวสารอัปเดตไปยังเร้าเตอร์เพื่อนบ้าน?",
        "options": ["224.0.0.5", "224.0.0.9", "224.0.0.10", "255.255.255.255"],
        "correct_index": 1,
        "explanation_en": "RIPv2 broadcasts updates to neighbors using the multicast address 224.0.0.9, unlike RIPv1 which uses Layer 3 broadcasts.",
        "explanation_th": "RIPv2 คุยแบบมัลติแคสต์ผ่านแอดเดรส 224.0.0.9 ซึ่งต่างจาก RIPv1 ที่ใช้วิธีส่งแบบบรอดแคสต์ขยายวงกว้าง"
      },
      {
        "question_en": "What is the default Administrative Distance of RIP?",
        "question_th": "ค่า Administrative Distance (AD) เริ่มต้นของโปรโตคอล RIP คือเท่าใด?",
        "options": ["90", "110", "120", "170"],
        "correct_index": 2,
        "explanation_en": "RIP has a default Administrative Distance of 120.",
        "explanation_th": "RIP มีค่าระดับความเชื่อมั่นในตารางเร้าติ้ง (Administrative Distance) เริ่มต้นอยู่ที่ 120"
      }
    ]
  },
  "lesson-ccna003-04": {
    "questions": [
      {
        "question_en": "Which algorithm does OSPF use to calculate the shortest path to destinations?",
        "question_th": "OSPF ใช้อัลกอริทึมใดในการคำนวณค้นหาเส้นทางที่รวดเร็วและสั้นที่สุดไปยังปลายทาง?",
        "options": ["DUAL Algorithm", "Bellman-Ford Algorithm", "Dijkstra SPF (Shortest Path First)", "Spanning Tree Algorithm"],
        "correct_index": 2,
        "explanation_en": "OSPF uses the Dijkstra Shortest Path First (SPF) algorithm to build a loop-free tree of paths.",
        "explanation_th": "OSPF อาศัยการคำนวณผ่านอัลกอริทึม Dijkstra SPF (Shortest Path First) เพื่อประกอบร่างแผนที่โครงข่ายที่ไร้ลูป"
      },
      {
        "question_en": "What metric does OSPF use to evaluate paths, and how is it calculated by default?",
        "question_th": "OSPF ใช้ค่าเมทริกตัวแปรใดในการพิจารณาเส้นทาง และมีหลักการคำนวณพื้นฐานอย่างไร?",
        "options": [
          "Hop Count.",
          "Bandwidth and Delay.",
          "Cost, calculated as Reference Bandwidth (100 Mbps) / Link Bandwidth.",
          "Metric weights based on reliability."
        ],
        "correct_index": 2,
        "explanation_en": "OSPF uses 'Cost'. By default, Cost = 10^8 / Bandwidth in bps. Thus, higher speed links have lower cost.",
        "explanation_th": "OSPF ใช้ค่า 'Cost' คำนวณจากสูตรแบนด์วิดท์อ้างอิงหารด้วยความเร็วอินเตอร์เฟส ดังนั้นสายที่เร็วกว่าจะมี Cost ต่ำกว่า"
      },
      {
        "question_en": "What type of packets does OSPF use to discover neighbors and maintain adjacency?",
        "question_th": "แพ็กเก็ต OSPF ประเภทใดที่มีหน้าที่ค้นหาเพื่อนบ้าน (Neighbor Discovery) และคอยดูแลความสม่ำเสมอในการเชื่อมต่อ?",
        "options": ["LSA (Link State Advertisement)", "LSU (Link State Update)", "Hello Packets", "LSAck Packets"],
        "correct_index": 2,
        "explanation_en": "Hello packets are sent periodically in OSPF to establish neighbor adjacencies and serve as keepalives.",
        "explanation_th": "แพ็กเก็ต Hello จะถูกส่งหากันตามรอบวินาทีเพื่อผูกมิตรตกลงเป็นเพื่อนบ้านและคอยยืนยันตัวตนว่าระบบยังทำงานดีอยู่"
      },
      {
        "question_en": "Which multicast address is reserved for all OSPF routers (AllSPFRouters) on multi-access links?",
        "question_th": "ที่อยู่มัลติแคสต์ (Multicast address) เลขใดที่จองไว้สำหรับการสื่อสารไปยังเร้าเตอร์ OSPF ทุกตัวบนเซกเมนต์เครือข่าย?",
        "options": ["224.0.0.5", "224.0.0.6", "224.0.0.9", "224.0.0.10"],
        "correct_index": 0,
        "explanation_en": "224.0.0.5 is used by all OSPF routers to send and receive Hello packets and updates. 224.0.0.6 is used to reach the DR/BDR.",
        "explanation_th": "224.0.0.5 ใช้ติดต่อคุยกับเร้าเตอร์ OSPF ทั่วไปทุกตัว ส่วนแอดเดรส 224.0.0.6 มีไว้สื่อสารเจาะหาเฉพาะผู้บริหารอย่าง DR/BDR"
      },
      {
        "question_en": "What is the default OSPF router priority value used in DR/BDR elections?",
        "question_th": "ค่า Priority เริ่มต้นของเร้าเตอร์ OSPF ที่ใช้แข่งขันเพื่อเป็น DR/BDR คือข้อใด?",
        "options": ["0", "1", "64", "128"],
        "correct_index": 1,
        "explanation_en": "The default OSPF priority for router interfaces is 1. A priority of 0 disables the interface from participating in elections.",
        "explanation_th": "ค่า Priority ตั้งต้นจะอยู่ที่เลข 1 หากปรับเปลี่ยนลดลงเป็น 0 หมายถึงพอร์ตนั้นจะไม่ขอเข้าร่วมการคัดเลือกเป็น DR/BDR"
      }
    ]
  },
  "lesson-ccna003-05": {
    "questions": [
      {
        "question_en": "What is a unique classification often given to EIGRP because it combines characteristics of both distance-vector and link-state protocols?",
        "question_th": "การจัดประเภทโปรโตคอลในลักษณะใดที่มักระบุให้กับ EIGRP เนื่องจากมีการหยิบยืมจุดเด่นของทั้งฝั่ง Distance Vector และ Link State มารวมกัน?",
        "options": ["Advanced Distance Vector (Hybrid)", "Link Vector", "Path State", "Pure Link State"],
        "correct_index": 0,
        "explanation_en": "EIGRP is often classified as an Advanced Distance Vector or Hybrid protocol because it sends updates dynamically like distance-vector but maintains topology tables.",
        "explanation_th": "EIGRP มักจัดเป็น Advanced Distance Vector หรือ Hybrid เร้าติ้ง เพราะคำนวณระยะส่งแบบเวกเตอร์แต่สะสมแผนที่เชิงตรรกะในแบบลิงก์สเตต"
      },
      {
        "question_en": "What is the primary routing protocol metric formula component for EIGRP by default?",
        "question_th": "ค่าพารามิเตอร์พื้นฐานทางกายภาพใดที่ EIGRP นำมารวมคำนวณร่วมกันเป็นค่าเมทริกเริ่มต้น?",
        "options": ["Hop Count and Cost", "Bandwidth and Delay", "Reliability and Load", "Bandwidth, Delay, and MTU"],
        "correct_index": 1,
        "explanation_en": "By default, EIGRP uses minimum Bandwidth and cumulative Delay along the path to calculate its composite metric.",
        "explanation_th": "EIGRP ใช้ตัวแปรแบนด์วิดท์ขั้นต่ำ (Minimum Bandwidth) และค่าดีเลย์สะสม (Cumulative Delay) มาคิดรวมเป็นค่าเมทริกขาส่ง"
      },
      {
        "question_en": "Which EIGRP term refers to the primary route to a destination network installed in the routing table?",
        "question_th": "คำศัพท์ EIGRP ใดหมายถึงเส้นทางสายหลักสำหรับนำส่งทราฟฟิกไปยังเครือข่ายปลายทางที่ได้รับการบรรจุในตารางเร้าติ้ง?",
        "options": ["Feasible Successor", "Successor", "Reported Distance", "Feasible Distance"],
        "correct_index": 1,
        "explanation_en": "The 'Successor' is the primary loop-free route chosen by DUAL to forward traffic to a network.",
        "explanation_th": "Successor คือเส้นทางหลักที่ DUAL คำนวณแล้วว่าเป็นจุดเชื่อมที่เหมาะสมและปลอดลูปที่สุดสำหรับใช้ส่งผ่านข้อมูลผู้ใช้"
      },
      {
        "question_en": "What is the default Administrative Distance of internal EIGRP routes?",
        "question_th": "ค่า Administrative Distance (AD) เริ่มต้นของโปรโตคอล EIGRP ภายใน (Internal EIGRP) คือเท่าใด?",
        "options": ["90", "110", "120", "170"],
        "correct_index": 0,
        "explanation_en": "Internal EIGRP routes have a default AD of 90. External EIGRP routes (redistributed) have an AD of 170.",
        "explanation_th": "เส้นทาง EIGRP ภายใน มี AD ตั้งต้นเป็น 90 ส่วนเส้นทางประเภทภายนอกที่ดึงเข้ามา (External EIGRP) จะมี AD เป็น 170"
      },
      {
        "question_en": "Which multicast address does EIGRP use to exchange routing information with neighbor routers?",
        "question_th": "ที่อยู่มัลติแคสต์ (Multicast address) เลขใดที่ EIGRP ใช้ส่งออกข้อมูลเพื่อเจรจากับกลุ่มเร้าเตอร์เพื่อนบ้าน?",
        "options": ["224.0.0.5", "224.0.0.9", "224.0.0.10", "224.0.0.12"],
        "correct_index": 2,
        "explanation_en": "EIGRP uses the multicast address 224.0.0.10 (IPv4) or FF02::A (IPv6) to communicate with neighbors.",
        "explanation_th": "EIGRP สื่อสารกับกลุ่มเพื่อนบ้านในสเปกมัลติแคสต์แอดเดรสไอพี 224.0.0.10 ในระบบ IPv4"
      }
    ]
  },
  "lesson-ccna004-01": {
    "questions": [
      {
        "question_en": "What is the primary difference between a Local Area Network (LAN) and a Wide Area Network (WAN)?",
        "question_th": "ข้อแตกต่างที่ชัดเจนที่สุดระหว่างเครือข่าย LAN และ WAN คือข้อใด?",
        "options": [
          "LANs connect devices globally; WANs are local.",
          "LANs cover a small local area under single ownership; WANs cover broad geographical areas spanning cities or nations and are leased from service providers.",
          "LANs use serial cables; WANs use Ethernet only.",
          "LANs operate at Layer 3; WANs operate at Layer 1."
        ],
        "correct_index": 1,
        "explanation_en": "WANs are designed to bridge remote geographical sites, requiring leased lines from telecommunications providers (SPs) operating across Layer 1 and 2.",
        "explanation_th": "LAN ดูแลระยะใกล้ครอบคลุมพื้นที่จำกัด ส่วน WAN เชื่อมต่อข้ามเมืองหรือต่างซีกโลกโดยเช่าช่องสัญญาณจากผู้ให้บริการ"
      },
      {
        "question_en": "Which WAN technology uses label switching to forward traffic across a high-speed provider core network?",
        "question_th": "เทคโนโลยี WAN ชนิดใดใช้การติดป้ายคีย์ฉลาก (Label switching) เพื่อสลับส่งผ่านข้อมูลในระบบโครงข่ายของผู้ให้บริการ?",
        "options": ["Frame Relay", "ISDN", "MPLS (Multiprotocol Label Switching)", "ATM"],
        "correct_index": 2,
        "explanation_en": "MPLS replaces traditional IP routing table lookups with rapid label switching at the provider core.",
        "explanation_th": "MPLS ปรับปรุงกระบวนการจัดส่งโดยติดแผ่นป้ายบอกทิศทางบนแพ็กเก็ต ทำให้สลับส่งผ่านวงแลกเปลี่ยนส่วนกลางได้ฉับไวขึ้น"
      },
      {
        "question_en": "What device is typically placed at the customer premises edge to convert WAN digital signals to LAN formats?",
        "question_th": "อุปกรณ์ปลายทางใดมักตั้งไว้ฝั่งลูกค้า (Customer Premises) เพื่อแปลงสัญญาณดิจิทัลระบบ WAN เป็นระบบ LAN?",
        "options": ["CSU/DSU", "Layer 2 Switch", "Wireless Access Point", "EGP Router"],
        "correct_index": 0,
        "explanation_en": "A CSU/DSU (Channel Service Unit/Data Service Unit) converts digital WAN line signals to format readable by customer routers.",
        "explanation_th": "CSU/DSU แปลงระดับข้อมูลและชนิดสัญญาณโทรคมนาคม (T1/T3) จากผู้ให้บริการให้อยู่ในประเภทที่เร้าเตอร์สามารถอ่านได้"
      },
      {
        "question_en": "What is a VPN (Virtual Private Network)?",
        "question_th": "เครือข่ายเสมือนส่วนตัว (VPN) หมายถึงลักษณะการเชื่อมต่อแบบใด?",
        "options": [
          "A network built using physical dedicated fiber lines.",
          "A secure, encrypted tunnel established over a public network (like the Internet) to connect remote sites.",
          "A local VLAN network segment.",
          "A wireless network interface."
        ],
        "correct_index": 1,
        "explanation_en": "VPNs use encryption and tunneling protocols to securely transmit private data over public infrastructures.",
        "explanation_th": "VPN อาศัยกลไกห่อหุ้มและเข้ารหัสข้อมูลเพื่อสร้างท่อเชื่อมต่อเฉพาะกิจผ่านเครือข่ายสาธารณะอินเทอร์เน็ต"
      },
      {
        "question_en": "Which point in a WAN setup represents the boundary where customer responsibility ends and service provider responsibility begins?",
        "question_th": "ตำแหน่งรอยต่อใดในเครือข่าย WAN ที่ถือเป็นเส้นแบ่งเขตรับผิดชอบระหว่างฝั่งลูกค้าและผู้ให้บริการระบบ?",
        "options": ["Local Loop", "Central Office", "Demarcation Point (Demarc)", "Toll Network"],
        "correct_index": 2,
        "explanation_en": "The demarcation point is the physical boundary separating customer equipment (CPE) from provider cabling.",
        "explanation_th": "จุดแบ่งเขตความรับผิดชอบ (Demarcation Point) แบ่งแยกระหว่างโครงสายเคเบิลของสายบริษัทไอทีปลายทางและโครงข่ายผู้ให้บริการ"
      }
    ]
  },
  "lesson-ccna004-02": {
    "questions": [
      {
        "question_en": "Which Layer 2 protocol is commonly used on point-to-point serial links and supports both PAP and CHAP authentication?",
        "question_th": "โปรโตคอล Layer 2 ใดนิยมใช้งานอย่างแพร่หลายบนลิงก์เชื่อมต่อแบบ Serial และรองรับการตรวจสอบสิทธิ์แบบ PAP/CHAP?",
        "options": ["HDLC", "PPP (Point-to-Point Protocol)", "Frame Relay", "Ethernet"],
        "correct_index": 1,
        "explanation_en": "PPP is a robust WAN protocol that provides link quality monitoring, multilink bonding, and authentication via PAP or CHAP.",
        "explanation_th": "Point-to-Point Protocol (PPP) เป็นมาตรฐานการสื่อสารแบบสองจุดที่มีฟังก์ชันตรวจสอบคุณภาพสาย และระบบระบุตัวตน PAP/CHAP"
      },
      {
        "question_en": "What is the primary difference between PAP and CHAP authentication in PPP?",
        "question_th": "ข้อแตกต่างที่สำคัญยิ่งระหว่างระบบตรวจสอบสิทธิ์ PAP และ CHAP ในโปรโตคอล PPP คืออะไร?",
        "options": [
          "PAP sends passwords in cleartext; CHAP uses a secure three-way handshake with MD5 hashing to hide passwords.",
          "PAP is secure; CHAP is insecure.",
          "PAP is developed by Cisco; CHAP is open standard.",
          "PAP is used on fiber links; CHAP is used on copper cables."
        ],
        "correct_index": 0,
        "explanation_en": "PAP transmits credentials in plaintext, making it vulnerable. CHAP uses a challenge-response handshake with MD5 hashing, never transmitting the password directly.",
        "explanation_th": "PAP จะส่งรหัสผ่านผ่านสายเป็นแบบข้อความดิบอ่านออกได้ทันที ส่วน CHAP จะเข้ารหัสแฮชด้วย MD5 คุยแบบสามด่านย่อย"
      },
      {
        "question_en": "Which component of PPP is responsible for negotiating and configuring the network layer protocols (e.g., IPv4 or IPv6)?",
        "question_th": "ส่วนประกอบย่อยใดของ PPP ที่ทำหน้าที่เจรจาต่อรองเพื่อจัดระเบียบตกลงโหมดกับระดับเลเยอร์เครือข่าย (เช่น IPv4/IPv6)?",
        "options": ["LCP (Link Control Protocol)", "NCP (Network Control Protocol)", "PAP", "HDLC encapsulation"],
        "correct_index": 1,
        "explanation_en": "Network Control Protocol (NCP) is used to establish and configure different network layer protocols over a PPP link.",
        "explanation_th": "Network Control Protocol (NCP) ทำหน้าที่ตกลงและเลือกชนิดโปรโตคอลในระดับเน็ตเวิร์กเลเยอร์ขี่บนสายสัญญาณ PPP"
      },
      {
        "question_en": "Which component of PPP is responsible for establishing, configuring, and testing the Layer 2 physical connection?",
        "question_th": "ส่วนประกอบย่อยใดของ PPP ที่คอยดูแลเรื่องการสร้าง คอนฟิก และทดสอบสถานะการเชื่อมต่อทางกายภาพในระดับ Layer 2?",
        "options": ["NCP", "LCP (Link Control Protocol)", "CHAP", "SDLC"],
        "correct_index": 1,
        "explanation_en": "Link Control Protocol (LCP) handles link establishment, configuration options negotiation, and link termination.",
        "explanation_th": "Link Control Protocol (LCP) ดูแลการตกลงเจรจาเงื่อนไขเบื้องต้นของเฟรมและตรวจสอบคุณภาพสายสัญญาณ Layer 2"
      },
      {
        "question_en": "What features does PPP offer that standard HDLC does not?",
        "question_th": "ฟีเจอร์เด่นใดที่โปรโตคอล PPP มีให้ใช้งานแต่ใน HDLC มาตรฐานทั่วไปไม่รองรับ?",
        "options": [
          "Error detection only.",
          "Authentication (PAP/CHAP) and Multilink bonding.",
          "IP addressing support.",
          "Speed limits definition."
        ],
        "correct_index": 1,
        "explanation_en": "PPP supports authentication (PAP/CHAP) and multilink grouping for load balancing, which standard HDLC does not support.",
        "explanation_th": "PPP รองรับการทำยืนยันตัวตนและการรวมลิงก์ (Multilink) เพื่อกระจายทราฟฟิก ซึ่งคุณสมบัติเหล่านี้ไม่มีอยู่ใน HDLC ดั้งเดิม"
      }
    ]
  },
  "lesson-ccna004-03": {
    "questions": [
      {
        "question_en": "What is the primary mechanism MPLS uses to accelerate traffic forwarding?",
        "question_th": "กลไกสำคัญใดที่ MPLS นำมาใช้เพื่อให้กระบวนการส่งต่อข้อมูลเป็นไปอย่างรวดเร็วเป็นพิเศษ?",
        "options": [
          "Routing based on MAC addresses.",
          "Appending short, fixed-length labels to packets and switching based on those labels.",
          "Encrypting all packet payloads.",
          "Enforcing high-speed dial-up connections."
        ],
        "correct_index": 1,
        "explanation_en": "MPLS inserts a label header into packets. Routers switch packets based on the label values rather than executing complex IP routing lookups.",
        "explanation_th": "MPLS จะแทรกแผ่นฉลาก (Label) ขนาดสั้นลงในแพ็กเก็ต และใช้วิธีจัดส่งแบบสลับป้ายชื่อซึ่งใช้เวลาน้อยกว่าการค้นหาไอพี"
      },
      {
        "question_en": "In MPLS, what is the role of the Label Edge Router (LER)?",
        "question_th": "ในระบบ MPLS เร้าเตอร์ที่เป็น LER (Label Edge Router) จะทำหน้าที่อะไร?",
        "options": [
          "To switch labeled packets within the provider core only.",
          "To push labels onto incoming packets at the ingress edge and pop labels at the egress edge.",
          "To protect the network from DDoS attacks.",
          "To assign local DHCP addresses."
        ],
        "correct_index": 1,
        "explanation_en": "The LER is positioned at the edge of the MPLS network. It adds (pushes) labels to incoming IP packets and removes (pops) them as they leave the MPLS core.",
        "explanation_th": "LER ทำหน้าที่อยู่ตรงขอบชายแดนเครือข่าย โดยคอยแปะป้าย (Push) ให้ข้อมูลขาเข้า และแกะป้ายออก (Pop) เมื่อข้อมูลจะวิ่งออกไปหาลูกค้า"
      },
      {
        "question_en": "Which protocol is commonly used in MPLS networks to distribute labels between routers?",
        "question_th": "โปรโตคอลใดที่นิยมนำมาใช้งานในโครงข่าย MPLS เพื่อทำการกระจายแจกจ่ายหมายเลขป้ายฉลาก (Label) ระหว่างเร้าเตอร์?",
        "options": ["LDP (Label Distribution Protocol)", "BGP", "OSPF", "RIP"],
        "correct_index": 0,
        "explanation_en": "Label Distribution Protocol (LDP) is used by MPLS routers to exchange label-to-FEC bindings.",
        "explanation_th": "Label Distribution Protocol (LDP) ใช้แลกเปลี่ยนและกระจายหมายเลขฉลากของแต่ละเส้นทางให้เร้าเตอร์ตัวอื่นได้รับทราบ"
      },
      {
        "question_en": "What is the difference between a Layer 2 VPN and a Layer 3 VPN in an MPLS network?",
        "question_th": "ข้อแตกต่างระหว่างบริการ Layer 2 VPN และ Layer 3 VPN บนระบบเครือข่าย MPLS คือข้อใด?",
        "options": [
          "Layer 2 VPN routes traffic; Layer 3 VPN switches traffic.",
          "Layer 2 VPN makes the provider network look like a virtual switch/link to the customer; Layer 3 VPN involves the provider routing customer IP packets.",
          "Layer 2 VPN is slower than Layer 3 VPN.",
          "Layer 2 VPN uses IPsec; Layer 3 VPN uses SSL."
        ],
        "correct_index": 1,
        "explanation_en": "In a Layer 2 VPN, customer sites are bridged at Layer 2 (like a virtual switch). In a Layer 3 VPN, the customer routers peer with the provider edge (PE) routers to exchange routing tables.",
        "explanation_th": "L2 VPN จะเชื่อมสาขาฝั่งลูกค้าเข้าหากันประหนึ่งเสียบเข้าสวิตช์เสมือนเดียวกัน ส่วน L3 VPN ทางค่ายเน็ตจะร่วมแลกเปลี่ยนเส้นทาง IP เครือข่ายด้วย"
      },
      {
        "question_en": "Where does the MPLS label sit in the protocol stack?",
        "question_th": "ตำแหน่งข้อมูลของป้ายชื่อ (MPLS label) แทรกตัวอยู่ตรงช่วงใดของโปรโตคอลแสต็ก?",
        "options": [
          "Inside the IP header.",
          "Between the Layer 2 header and the Layer 3 header (shim header).",
          "Inside the TCP payload.",
          "At the end of the frame trailer."
        ],
        "correct_index": 1,
        "explanation_en": "The MPLS label is a 'shim' header inserted between the Layer 2 (Data Link) header and the Layer 3 (Network) header.",
        "explanation_th": "ป้ายฉลาก MPLS จะแทรกอยู่ระหว่างส่วนหัว Layer 2 (MAC header) และส่วนหัว Layer 3 (IP header) ซึ่งมักถูกแซวว่าเป็นเลเยอร์ 2.5"
      }
    ]
  },
  "lesson-ccna004-04": {
    "questions": [
      {
        "question_en": "What is the primary goal of WAN Redundancy in enterprise networks?",
        "question_th": "เป้าหมายหลักของการทำความซ้ำซ้อนระบบ WAN (WAN Redundancy) ในระบบเครือข่ายระดับองค์กรคืออะไร?",
        "options": [
          "To reduce the cost of monthly bills.",
          "To ensure continuous network availability and prevent downtime by using multiple active connections.",
          "To encrypt database traffic.",
          "To limit employee access to external websites."
        ],
        "correct_index": 1,
        "explanation_en": "WAN redundancy uses backup paths and multiple service providers to ensure business continuity in case of link failure.",
        "explanation_th": "เป็นการเตรียมเส้นทางสำรองและจ้างค่ายเน็ตหลายเจ้า เพื่อให้ธุรกิจดำเนินงานได้ต่อเนื่องเมื่อสายหลักมีปัญหา"
      },
      {
        "question_en": "What is Dual-Homing in WAN design?",
        "question_th": "การออกแบบโครงสร้าง WAN ในสเปกแบบ Dual-Homing หมายถึงการออกแบบในลักษณะใด?",
        "options": [
          "Connecting a customer site to a single provider using a single line.",
          "Connecting a customer site to two different service providers for redundancy.",
          "Configuring two IP addresses on a single physical link.",
          "Using two routers in the same local room without external links."
        ],
        "correct_index": 1,
        "explanation_en": "Dual-Homing means connecting customer networks to two separate service providers, protecting against a single service provider outage.",
        "explanation_th": "คือการเชื่อมต่อเครือข่ายองค์กรไปยังผู้ให้บริการ (ISP) สองรายที่ต่างกัน เพื่อป้องกันการล่มของระบบเครือข่ายรายใดรายหนึ่ง"
      },
      {
        "question_en": "What is the difference between Active-Active and Active-Standby redundancy?",
        "question_th": "ข้อแตกต่างระหว่างรูปแบบความซ้ำซ้อนแบบ Active-Active และ Active-Standby คืออะไร?",
        "options": [
          "Active-Active uses only one link; Active-Standby uses two.",
          "Active-Active load shares traffic over both links simultaneously; Active-Standby uses one primary link and only activates the second when the primary fails.",
          "Active-Active is slower than Active-Standby.",
          "Active-Standby requires OSPF."
        ],
        "correct_index": 1,
        "explanation_en": "Active-Active utilizes all links for traffic transmission simultaneously, maximizing bandwidth. Active-Standby leaves backup links idle until the primary path fails.",
        "explanation_th": "Active-Active จะส่งข้อมูลแชร์วิ่งสองสายพร้อมกัน ส่วน Active-Standby จะใช้สายหลักเพียงสายเดียวและเก็บสายสำรองไว้เฉยๆ จนกว่าสายหลักจะพัง"
      },
      {
        "question_en": "Which WAN technology allows dynamic path selection and load sharing across multiple links (such as broadband, LTE, and MPLS) based on application requirements?",
        "question_th": "เทคโนโลยี WAN ใดที่รองรับการเลือกเส้นทางแบบไดนามิกและโหลดบาลานซ์ตามประเภทแอปพลิเคชันผ่านสายส่งหลากหลายช่องทาง?",
        "options": ["Standard Frame Relay", "SD-WAN (Software-Defined WAN)", "Legacy Hub-and-Spoke", "Direct dial-up"],
        "correct_index": 1,
        "explanation_en": "SD-WAN provides centralized control and dynamic path routing over diverse transport links based on application performance rules.",
        "explanation_th": "SD-WAN ช่วยให้บริหารจัดการโครงข่ายระยะไกลได้อย่างอิสระโดยวิเคราะห์ประเภทข้อมูลและสภาพสายส่งเพื่อสลับทางวิ่งให้เหมาะสมที่สุด"
      },
      {
        "question_en": "In WAN redundancy, what is the role of IP SLA (Service Level Agreement)?",
        "question_th": "ในการทำความซ้ำซ้อนระบบ WAN ฟังก์ชัน IP SLA (Service Level Agreement) มีบทบาทหน้าที่อย่างไร?",
        "options": [
          "To automatically encrypt packets.",
          "To monitor network performance (latency, packet loss) and trigger path failover if parameters degrade.",
          "To assign IP addresses to new branch routers.",
          "To limit interface speeds."
        ],
        "correct_index": 1,
        "explanation_en": "IP SLA actively monitors connection health by sending probes. If it detects loss or high latency, it can trigger static route switches.",
        "explanation_th": "IP SLA จะคอยยิงสัญญาณทดสอบคุณภาพสายส่งอย่างต่อเนื่อง หากพบปัญหาความล่าช้า (Latency) หรือข้อมูลหาย จะสั่งสลับทางวิ่งไปพอร์ตสำรอง"
      }
    ]
  },
  "lesson-ccna004-07": {
    "questions": [
      {
        "question_en": "What does HDLC stand for?",
        "question_th": "HDLC ย่อมาจากคำศัพท์ภาษาอังกฤษในข้อใด?",
        "options": [
          "High-Level Data Link Control",
          "High-Speed Digital Link Connection",
          "Hardware Data Link Connector",
          "Hybrid Data Loop Control"
        ],
        "correct_index": 0,
        "explanation_en": "HDLC stands for High-Level Data Link Control, a synchronous data link layer protocol.",
        "explanation_th": "HDLC ย่อมาจาก High-Level Data Link Control ซึ่งเป็นโปรโตคอลในระดับเชื่อมโยงข้อมูล (Data link layer)"
      },
      {
        "question_en": "What is a major limitation of standard ISO HDLC when running in multi-protocol networks?",
        "question_th": "ข้อจำกัดหลักของ HDLC มาตรฐานอ้างอิงของ ISO เมื่อนำมาใช้งานในโครงข่ายแบบ multi-protocol คืออะไร?",
        "options": [
          "It does not support error checking.",
          "It lacks a field to identify the Network Layer protocol type of the packet being carried.",
          "It cannot run over serial cables.",
          "It requires IP address configuration."
        ],
        "correct_index": 1,
        "explanation_en": "Standard ISO HDLC lacks a protocol identifier field, meaning it can only carry a single network layer protocol type.",
        "explanation_th": "HDLC มาตรฐานดั้งเดิมจะไม่มีฟิลด์ระบุประเภทโปรโตคอล (Protocol type) ของเลเยอร์ 3 ทำให้รับส่งแพ็กเก็ตหลากประเภทพร้อมกันบนสายเดียวไม่ได้"
      },
      {
        "question_en": "How did Cisco resolve the protocol-typing limitation of standard HDLC?",
        "question_th": "Cisco เข้าแก้ไขข้อจำกัดการไม่รองรับโปรโตคอลหลายประเภทของ HDLC มาตรฐานดั้งเดิมอย่างไร?",
        "options": [
          "By developing a proprietary HDLC version with an added 2-byte Protocol field.",
          "By replacing HDLC with Ethernet on all serial cables.",
          "By encrypting the HDLC frame header.",
          "By adding IP routing logic to Layer 1."
        ],
        "correct_index": 0,
        "explanation_en": "Cisco created a proprietary version of HDLC that adds a protocol field, allowing multiple network layer protocols (IPv4, IPv6, etc.) to traverse the link.",
        "explanation_th": "Cisco สร้างสเปก HDLC เฉพาะของตนเองขึ้นมาโดยเพิ่มฟิลด์ขนาด 2 ไบต์เพื่อเอาไว้ระบุชนิดโปรโตคอลเลเยอร์ 3 (เช่น IPv4, IPv6)"
      },
      {
        "question_en": "Due to Cisco's proprietary modification, what is a constraint when connecting two routers using HDLC encapsulation?",
        "question_th": "จากลักษณะโครงสร้างเฉพาะของ Cisco HDLC ส่งผลให้เกิดข้อจำกัดอย่างไรในการตั้งค่าใช้งาน?",
        "options": [
          "You must use fiber cables only.",
          "Both endpoints of the serial connection must be Cisco devices (or support Cisco HDLC).",
          "You must configure a VTP domain.",
          "The link speed is limited to 1 Mbps."
        ],
        "correct_index": 1,
        "explanation_en": "Because Cisco HDLC is proprietary, serial links using it must be established between Cisco routers or routers that support Cisco's custom HDLC header.",
        "explanation_th": "เนื่องจากเป็นลิขสิทธิ์เฉพาะ ลิงก์เชื่อมต่อด้วย Cisco HDLC จึงต้องเชื่อมระหว่างอุปกรณ์ Cisco ด้วยกันหรือรุ่นที่เข้าใจรูปแบบ Header ดังกล่าวเท่านั้น"
      },
      {
        "question_en": "What is the default encapsulation protocol on serial interfaces of Cisco routers?",
        "question_th": "โปรโตคอลการห่อหุ้มเริ่มต้น (Default Encapsulation) บนอินเตอร์เฟสแบบ Serial ของเร้าเตอร์ Cisco คือข้อใด?",
        "options": ["PPP", "Frame Relay", "HDLC", "Ethernet"],
        "correct_index": 2,
        "explanation_en": "HDLC is the default encapsulation protocol configured on Cisco serial interfaces.",
        "explanation_th": "HDLC เป็นค่าห่อหุ้มตั้งต้น (Default encapsulation) ที่ระบบกำหนดไว้ให้ช่องสัญญาณ Serial บนอุปกรณ์ Cisco ทุกตัว"
      }
    ]
  }
};
