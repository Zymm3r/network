export const quizzesPart3 = {
  "lesson-ccna005-01": {
    "questions": [
      {
        "question_en": "What acronym describes the four-step process DHCP clients use to obtain an IP address?",
        "question_th": "อักษรย่อใดที่อธิบายกระบวนการ 4 ขั้นตอนที่ไคลเอนต์ DHCP ใช้เพื่อขอรับ IP address?",
        "options": ["ARP", "DORA", "DNS", "ICMP"],
        "correct_index": 1,
        "explanation_en": "DHCP allocation uses a four-step process: Discover, Offer, Request, and Acknowledgment (DORA).",
        "explanation_th": "การขอไอพีด้วย DHCP มีขั้นตอนย่อเรียกว่า DORA ซึ่งได้แก่ Discover, Offer, Request และ Acknowledgment"
      },
      {
        "question_en": "Which DHCP packet is sent by a client as a broadcast to locate available DHCP servers on the network?",
        "question_th": "แพ็กเก็ต DHCP ชนิดใดที่เครื่องไคลเอนต์ส่งแบบบรอดแคสต์เพื่อค้นหาเซิร์ฟเวอร์ DHCP ในระบบเครือข่าย?",
        "options": ["DHCP Offer", "DHCP Discover", "DHCP Request", "DHCP Ack"],
        "correct_index": 1,
        "explanation_en": "The DHCP Discover packet is a Layer 3 broadcast sent by the client to find any active DHCP servers.",
        "explanation_th": "แพ็กเก็ต DHCP Discover เป็นข้อมูลที่ไคลเอนต์เริ่มส่งออกแบบบรอดแคสต์เพื่อตามหาเซิร์ฟเวอร์ที่เปิดทำงาน"
      },
      {
        "question_en": "Which UDP port numbers are used by DHCP clients and servers?",
        "question_th": "หมายเลขพอร์ต UDP ใดที่ใช้สำหรับการสื่อสารระหว่างไคลเอนต์และเซิร์ฟเวอร์ DHCP?",
        "options": [
          "Client: UDP 67; Server: UDP 68",
          "Client: UDP 68; Server: UDP 67",
          "Client: UDP 53; Server: UDP 53",
          "Client: UDP 161; Server: UDP 162"
        ],
        "correct_index": 1,
        "explanation_en": "DHCP clients send requests to server port 67, and servers respond to client port 68. Both use UDP.",
        "explanation_th": "ไคลเอนต์ DHCP จะส่งคำขอเข้าหาเซิร์ฟเวอร์พอร์ต 67 ส่วนตัวเซิร์ฟเวอร์จะตอบกลับมาที่ไคลเอนต์พอร์ต 68 ทั้งคู่ใช้ UDP"
      },
      {
        "question_en": "What Cisco command is configured on a router interface to forward local DHCP broadcasts to a server in a different subnet?",
        "question_th": "คำสั่งใดบนอินเตอร์เฟสของเร้าเตอร์ Cisco ที่ใช้สำหรับส่งต่อ DHCP broadcast ข้ามซับเน็ตไปยังเซิร์ฟเวอร์ปลายทาง?",
        "options": ["ip helper-address <ip-address>", "ip dhcp relay", "ip forward-protocol", "dhcp-server destination"],
        "correct_index": 0,
        "explanation_en": "The 'ip helper-address <server-ip>' command configures the router to act as a DHCP relay agent, forwarding broadcasts as unicasts.",
        "explanation_th": "คำสั่ง 'ip helper-address <server-ip>' จะตั้งค่าเร้าเตอร์ให้แปลงสัญญาณบรอดแคสต์เป็นยูนิแคสต์ส่งข้ามวงเน็ตเวิร์ก"
      },
      {
        "question_en": "What is the purpose of the 'ip dhcp excluded-address' command on a Cisco IOS router?",
        "question_th": "คำสั่ง 'ip dhcp excluded-address' บนเร้าเตอร์ Cisco IOS มีวัตถุประสงค์เพื่ออะไร?",
        "options": [
          "To block specific MAC addresses from accessing the network.",
          "To specify IP addresses that the DHCP server should not assign to clients (e.g., static IPs for servers).",
          "To define the default gateway IP.",
          "To shut down the DHCP pool."
        ],
        "correct_index": 1,
        "explanation_en": "This command reserves static IP addresses (like router IPs, DNS, servers) so the DHCP pool does not assign them dynamically, preventing duplicate IP conflicts.",
        "explanation_th": "เป็นคำสั่งละเว้นช่วงไอพีที่ไม่ต้องการแจก เช่น ไอพีของเร้าเตอร์ เซิร์ฟเวอร์ หรือเครื่องพิมพ์ เพื่อเลี่ยงปัญหาไอพีชนกัน"
      }
    ]
  },
  "lesson-ccna005-02": {
    "questions": [
      {
        "question_en": "What is the primary function of the Domain Name System (DNS)?",
        "question_th": "หน้าที่หลักที่สำคัญที่สุดของระบบ Domain Name System (DNS) คืออะไร?",
        "options": [
          "To assign IP addresses to new clients dynamically.",
          "To translate human-readable domain names (like www.cisco.com) into IP addresses.",
          "To monitor network bandwidth utilization.",
          "To encrypt web browser traffic."
        ],
        "correct_index": 1,
        "explanation_en": "DNS acts as the phone book of the Internet, translating text-based domains into computer-readable IP addresses.",
        "explanation_th": "DNS ทำหน้าที่เสมือนสมุดโทรศัพท์ของอินเทอร์เน็ต โดยแปลงชื่อโดเมนภาษาคนเป็นแอดเดรสไอพีที่คอมพิวเตอร์เข้าใจ"
      },
      {
        "question_en": "Which DNS resource record (RR) maps a domain name to an IPv4 address?",
        "question_th": "เรคคอร์ดทรัพยากร DNS (DNS resource record) ประเภทใดใช้จับคู่แปลงชื่อโดเมนเป็นไอพีแอดเดรสแบบ IPv4?",
        "options": ["A record", "AAAA record", "MX record", "CNAME record"],
        "correct_index": 0,
        "explanation_en": "An 'A' record (Address record) maps a hostname to a 32-bit IPv4 address. 'AAAA' is used for IPv6.",
        "explanation_th": "A record (Address record) ใช้ชี้จากชื่อโดเมนไปยังที่อยู่ IPv4 ขนาด 32 บิต ส่วน AAAA record จะใช้กับระบบ IPv6"
      },
      {
        "question_en": "Which DNS resource record points to a mail server responsible for receiving emails for a domain?",
        "question_th": "เรคคอร์ด DNS ประเภทใดที่ชี้ตำแหน่งไปยังเครื่องเซิร์ฟเวอร์จดหมายอิเล็กทรอนิกส์ (Mail server) ประจำโดเมน?",
        "options": ["CNAME record", "MX record", "NS record", "PTR record"],
        "correct_index": 1,
        "explanation_en": "An MX (Mail Exchanger) record directs email traffic to the mail servers designated for a domain.",
        "explanation_th": "MX record (Mail Exchanger record) บ่งบอกและชี้ทิศทางทราฟฟิกอีเมลไปยังเซิร์ฟเวอร์รับเมลของปลายทางนั้น"
      },
      {
        "question_en": "What protocol and port number does DNS query traffic primarily use for client lookups?",
        "question_th": "โปรโตคอลและหมายเลขพอร์ตใดที่ทราฟฟิกคำขอของ DNS นิยมใช้เป็นหลักในกระบวนการดึงข้อมูลสืบค้น?",
        "options": ["UDP Port 53", "TCP Port 53", "UDP Port 67", "TCP Port 80"],
        "correct_index": 0,
        "explanation_en": "DNS queries use UDP port 53 because it is lightweight and fast. TCP port 53 is used for large zone transfers.",
        "explanation_th": "การค้นหาข้อมูล DNS ใช้ UDP พอร์ต 53 เนื่องจากมีความเบาและรวดเร็ว ส่วน TCP พอร์ต 53 จะเก็บไว้ทำระบบ Zone Transfer"
      },
      {
        "question_en": "What is the purpose of a CNAME (Canonical Name) record in DNS?",
        "question_th": "ประโยชน์ของเรคคอร์ดประเภท CNAME (Canonical Name) ในฐานข้อมูล DNS คือข้อใด?",
        "options": [
          "To map a domain name to an IPv6 address.",
          "To create an alias that points a domain name to another canonical domain name.",
          "To configure name servers for a zone.",
          "To perform reverse IP lookups."
        ],
        "correct_index": 1,
        "explanation_en": "A CNAME record creates an alias hostname pointing to another domain name (e.g. mapping blog.example.com to example.com).",
        "explanation_th": "CNAME record ใช้สร้างนามแฝง (Alias) เพื่อชี้จากชื่อโฮสต์หนึ่งไปยังอีกชื่อโฮสต์หนึ่งที่เป็นชื่อหลัก"
      }
    ]
  },
  "lesson-ccna005-03": {
    "questions": [
      {
        "question_en": "What is the primary benefit of Network Address Translation (NAT)?",
        "question_th": "ประโยชน์สูงสุดของการทำกลไกแปลงที่อยู่เครือข่าย (NAT) คืออะไร?",
        "options": [
          "To automatically encrypt all outbound traffic.",
          "To conserve public IPv4 addresses by allowing private IP hosts to share public IPs.",
          "To speed up local subnet routing.",
          "To assign MAC addresses dynamically."
        ],
        "correct_index": 1,
        "explanation_en": "NAT conserves the limited global pool of public IPv4 addresses by translating private local IP addresses to public IPs.",
        "explanation_th": "NAT ช่วยชะลอการหมดไปของ IPv4 โดยให้กลุ่มโฮสต์ไอพีส่วนบุคคลใช้ที่อยู่ไอพีสาธารณะแชร์ร่วมกันเพื่อเชื่อมออกสู่อินเทอร์เน็ต"
      },
      {
        "question_en": "Which NAT type maps a single private IP address to a single public IP address permanently?",
        "question_th": "การทำ NAT ประเภทใดที่ผูกจับคู่ที่อยู่ไอพีส่วนบุคคลเดี่ยวเข้ากับไอพีสาธารณะเดี่ยวแบบถาวรและแน่นอน (อัตราส่วน 1:1)?",
        "options": ["Static NAT", "Dynamic NAT", "PAT (Port Address Translation)", "NAT Overload"],
        "correct_index": 0,
        "explanation_en": "Static NAT creates a 1-to-1 permanent translation, mapping a specific local address to a specific global address.",
        "explanation_th": "Static NAT คือการทำแปลงที่อยู่แบบ 1 ต่อ 1 โดยจับคู่ไอพีภายในและไอพีสาธารณะข้างนอกไว้คู่กันอย่างถาวร"
      },
      {
        "question_en": "What is another common name for Port Address Translation (PAT)?",
        "question_th": "การทำแปลงแอดเดรสโดยอิงจากหมายเลขพอร์ต (Port Address Translation - PAT) มีชื่อเรียกขานทั่วไปอีกชื่อหนึ่งว่าอะไร?",
        "options": ["Static NAT", "Dynamic NAT", "NAT Overload", "NAT Bypass"],
        "correct_index": 2,
        "explanation_en": "PAT is also known as NAT Overload, where multiple private IP hosts share a single public IP by using unique source port numbers.",
        "explanation_th": "PAT หรือมีชื่อเรียกใน Cisco IOS ว่า NAT Overload คือการใช้อุปกรณ์ภายในจำนวนมากออกเน็ตโดยสวมไอพีสาธารณะตัวเดียวแต่ใช้พอร์ตแยกแยะ"
      },
      {
        "question_en": "In NAT terminology, what is the 'Inside Local' address?",
        "question_th": "ตามคำนิยามของการทำ NAT ที่อยู่ไอพีประเภท 'Inside Local' หมายถึงแอดเดรสใด?",
        "options": [
          "The IP address of a host on the inside network as seen from the outside network.",
          "The actual private IP address assigned to a host on the inside local network.",
          "The public IP address of the destination host.",
          "The router's WAN interface IP."
        ],
        "correct_index": 1,
        "explanation_en": "Inside Local is the real IP address configured on an internal host, typically a private RFC 1918 address.",
        "explanation_th": "Inside Local คือที่อยู่ไอพีจริงที่ตั้งค่าให้กับโฮสต์ภายในเครือข่าย ซึ่งส่วนใหญ่เป็นไอพีส่วนบุคคลตาม RFC 1918"
      },
      {
        "question_en": "Which configuration keyword is appended to the 'ip nat inside source list' command to enable PAT on a Cisco router interface?",
        "question_th": "คีย์เวิร์ดใดที่ต่อท้ายคำสั่ง 'ip nat inside source list' เพื่อสั่งให้เร้าเตอร์ Cisco เปิดใช้งานฟังก์ชัน PAT?",
        "options": ["enable", "overload", "pat", "dynamic"],
        "correct_index": 1,
        "explanation_en": "The 'overload' keyword at the end of the config command triggers PAT (Port Address Translation).",
        "explanation_th": "การพิมพ์คำว่า 'overload' ปิดท้ายชุดคำสั่งจะกระตุ้นให้ระบบสลับมาใช้กระบวนการทำงานของ PAT ทันที"
      }
    ]
  },
  "lesson-ccna005-04": {
    "questions": [
      {
        "question_en": "What is the primary criteria used by a Standard Access Control List (ACL) to filter traffic?",
        "question_th": "เกณฑ์พื้นฐานหลักที่ใช้โดยรายการควบคุมการเข้าถึงแบบมาตรฐาน (Standard ACL) ในการกรองทราฟฟิกคือข้อใด?",
        "options": [
          "Destination IP address only.",
          "Source IP address only.",
          "Source and Destination IP addresses, and TCP/UDP ports.",
          "Protocol type (TCP/UDP/ICMP)."
        ],
        "correct_index": 1,
        "explanation_en": "Standard ACLs (numbered 1-99 or 1300-1999) filter traffic based on the source IP address of packets only.",
        "explanation_th": "Standard ACL (หมายเลข 1-99 หรือ 1300-1999) ตรวจสอบและกรองข้อมูลอิงตามข้อมูลแอดเดรสไอพีต้นทาง (Source IP) เท่านั้น"
      },
      {
        "question_en": "What is the range of ACL numbers for Extended IP Access Lists on Cisco routers?",
        "question_th": "ช่วงตัวเลขแสดงกลุ่มหมายเลขสำหรับ Extended IP Access List บนอุปกรณ์เร้าเตอร์ Cisco คือเท่าใด?",
        "options": ["1 - 99", "100 - 199", "1300 - 1999", "100 - 199 and 2000 - 2699"],
        "correct_index": 3,
        "explanation_en": "Extended ACLs use numbers 100-199 and 2000-2699 to filter based on source, destination, protocol, and port numbers.",
        "explanation_th": "Extended ACL จะเปิดใช้งานในช่วงหมายเลข 100-199 และ 2000-2699 เพื่อให้กรองได้ทั้งต้นทาง ปลายทาง พอร์ต และประเภทโปรโตคอล"
      },
      {
        "question_en": "What wildcard mask corresponds to the subnet mask 255.255.255.240?",
        "question_th": "หน้ากากแบบไวลด์การ์ด (Wildcard Mask) ของซับเน็ตมาสก์ 255.255.255.240 คือข้อใด?",
        "options": ["0.0.0.15", "0.0.0.240", "0.0.0.255", "255.255.255.255"],
        "correct_index": 0,
        "explanation_en": "Wildcard mask is calculated by subtracting the subnet mask from 255.255.255.255. (255-255).(255-255).(255-255).(255-240) = 0.0.0.15.",
        "explanation_th": "ไวลด์การ์ดมาสก์คิดจากการนำ 255.255.255.255 ลบด้วยซับเน็ตมาสก์ จะได้เป็น (255-255).(255-255).(255-255).(255-240) = 0.0.0.15"
      },
      {
        "question_en": "What implicit statement exists at the end of every Access Control List (ACL) in Cisco IOS?",
        "question_th": "ประโยคเงื่อนไขที่แฝงอยู่โดยนัย (Implicit Statement) ที่ท้ายสุดของทุกรายการ ACL ในระบบ Cisco IOS คืออะไร?",
        "options": ["Implicit permit all", "Implicit deny all", "Implicit redirect to gateway", "Implicit log all"],
        "correct_index": 1,
        "explanation_en": "Cisco ACLs end with an implicit 'deny any' statement. Any packet that does not match any permit statement is dropped.",
        "explanation_th": "ตอนท้ายสุดของทุกตาราง ACL จะมีประโยคปฏิเสธโดยปริยาย (implicit deny all) กำหนดอยู่ หากเช็คแล้วไม่เข้าหัวข้ออนุมัติใดเลยจะถูกโยนทิ้งทันที"
      },
      {
        "question_en": "Where is it generally recommended to apply an Extended ACL in the network?",
        "question_th": "ตามหลักปฏิบัติทั่วไป แนะนำให้วางตาราง Extended ACL ไว้ ณ ตำแหน่งใดของระบบเครือข่าย?",
        "options": [
          "As close to the destination of the traffic as possible.",
          "As close to the source of the traffic as possible.",
          "On the internet gateway router only.",
          "On the core switches only."
        ],
        "correct_index": 1,
        "explanation_en": "Extended ACLs should be placed as close to the source of the traffic as possible to filter unwanted packets early and save network bandwidth.",
        "explanation_th": "ควรวาง Extended ACL ให้ใกล้ชิดต้นทางทราฟฟิก (Source) มากที่สุด เพื่อตัดทิ้งแพ็กเก็ตที่ขัดต่อนโยบายตั้งแต่แรกและไม่เปลืองแบนด์วิดท์"
      }
    ]
  },
  "lesson-ccna005-05": {
    "questions": [
      {
        "question_en": "What protocol is used to synchronize the system clocks of network devices with a reference time source?",
        "question_th": "โปรโตคอลใดใช้สำหรับซิงโครไนซ์เวลาของระบบนาฬิกา (System clock) ของอุปกรณ์กับแหล่งอ้างอิงเวลาที่ถูกต้อง?",
        "options": ["NTP (Network Time Protocol)", "SNMP", "Syslog", "DNS"],
        "correct_index": 0,
        "explanation_en": "NTP (Network Time Protocol) synchronizes time across network devices to ensure accurate logs and certificate validations.",
        "explanation_th": "NTP (Network Time Protocol) ช่วยปรับนาฬิกาของอุปกรณ์เครือข่ายทั้งหมดให้ตรงกันเพื่อความถูกต้องในการตรวจสอบประวัติและ Log"
      },
      {
        "question_en": "In NTP, what value indicates the hierarchical distance of a time source from the primary atomic clock?",
        "question_th": "ในระบบ NTP ค่าตัวเลขใดบ่งบอกถึงระดับชั้นความห่างไกลความแม่นยำ (Hierarchical distance) จากนาฬิกาหลักอะตอมมิก?",
        "options": ["Priority", "Stratum", "Metric", "Hop Count"],
        "correct_index": 1,
        "explanation_en": "NTP uses 'Stratum' levels. Stratum 0 is the reference atomic clock. Stratum 1 is directly connected to it, Stratum 2 connects to Stratum 1, and so on.",
        "explanation_th": "NTP ใช้ระดับชั้น Stratum โดยที่ Stratum 0 เป็นนาฬิกาอะตอมมิกอ้างอิงตรง และเลขจะขยับเพิ่มตามระยะช่วงต่อห่างออกไป"
      },
      {
        "question_en": "What is the primary function of Syslog in network management?",
        "question_th": "หน้าที่หลักของการทำระบบล็อกบันทึกเหตุการณ์ (Syslog) ในการจัดการเครือข่ายคืออะไร?",
        "options": [
          "To assign IP addresses to switches.",
          "To collect, format, and centralize system logs, status messages, and error alerts from devices.",
          "To route traffic between different physical buildings.",
          "To resolve domains to IP addresses."
        ],
        "correct_index": 1,
        "explanation_en": "Syslog standardizes event message formatting and allows sending logs from devices to a central repository server.",
        "explanation_th": "Syslog ใช้รวบรวมเหตุการณ์ ระบบรายงานความเคลื่อนไหว และข้อความแจ้งเตือนข้อผิดพลาดจากอุปกรณ์ต่างๆ ส่งเข้าเก็บยังเซิร์ฟเวอร์ส่วนกลาง"
      },
      {
        "question_en": "How many severity levels are defined in the standard Syslog protocol?",
        "question_th": "ในโปรโตคอลระบบมาตรฐานของ Syslog มีการจำแนกระดับความรุนแรงของเหตุการณ์ (Severity levels) ไว้ทั้งหมดกี่ระดับ?",
        "options": ["5 levels", "8 levels (0 to 7)", "10 levels", "4 levels"],
        "correct_index": 1,
        "explanation_en": "Syslog defines 8 severity levels, ranging from Level 0 (Emergency - system unusable) to Level 7 (Debugging).",
        "explanation_th": "Syslog กำหนดความรุนแรงไว้ 8 ระดับ (0 ถึง 7) ไล่ตั้งแต่ระดับวิกฤตรุนแรงที่สุด Level 0 (Emergency) ไปจนถึงระดับแจ้งเบาะแสการแก้ไขอย่าง Level 7 (Debugging)"
      },
      {
        "question_en": "Which Syslog severity level represents 'Errors' in the event logs?",
        "question_th": "ระดับความรุนแรงของ Syslog หมายเลขใดที่เป็นตัวแทนกลุ่มประเภทสถานะข้อผิดพลาด 'Errors' ทั่วไป?",
        "options": ["Level 1", "Level 3", "Level 5", "Level 7"],
        "correct_index": 1,
        "explanation_en": "Level 3 is 'Error' messages, which indicate non-critical failures in processes or components.",
        "explanation_th": "Level 3 คือกลุ่มรายงานข้อผิดพลาดทั่วไป (Errors) แสดงถึงจุดขัดข้องที่เกิดขึ้นกับโปรเซสหรือบางฟังก์ชันการทำงาน"
      }
    ]
  },
  "lesson-ccna005-07": {
    "questions": [
      {
        "question_en": "Which NAT terminology refers to the IP address of an outside host as it is seen by hosts on the inside network?",
        "question_th": "คีย์นิยาม NAT ในข้อใดที่หมายถึงตำแหน่งที่อยู่ไอพีของโฮสต์ภายนอกตามที่ถูกแปลมองเห็นโดยเครื่องโฮสต์ภายในเครือข่าย?",
        "options": ["Inside Local", "Inside Global", "Outside Local", "Outside Global"],
        "correct_index": 2,
        "explanation_en": "Outside Local represents the IP address of an outside destination host as it appears to the internal network hosts.",
        "explanation_th": "Outside Local บ่งชี้ไอพีของเครื่องข้างนอกตามที่ปรากฏให้เครื่องภายในเห็น (มักแปลงเพื่อไม่ให้อุปกรณ์ภายในสับสนการจัดเส้นทาง)"
      },
      {
        "question_en": "Why would an organization configure dynamic NAT instead of static NAT?",
        "question_th": "ทำไมองค์กรธุรกิจจึงนิยมใช้งาน Dynamic NAT แทนการคอนฟิกแบบ Static NAT?",
        "options": [
          "Dynamic NAT requires no configuration.",
          "Dynamic NAT translates private IPs to a pool of public IPs on-demand, rather than binding them permanently.",
          "Dynamic NAT automatically encrypts traffic.",
          "Dynamic NAT works without any router."
        ],
        "correct_index": 1,
        "explanation_en": "Dynamic NAT uses a pool of public IP addresses, assigning them to internal hosts dynamically as they request external access, rather than using rigid 1-to-1 pairings.",
        "explanation_th": "Dynamic NAT จะดึงไอพีสาธารณะจากกลุ่มที่เตรียมไว้มาแปลสลับให้เครื่องภายในแบบเรียลไทม์เป็นรอบๆ แทนการจองผูกขาดถาวร"
      },
      {
        "question_en": "Which command designates a router interface as connected to the external internet in a NAT configuration?",
        "question_th": "คำสั่งใดใช้ประกาศพอร์ตอินเตอร์เฟสของเร้าเตอร์ว่าทำหน้าที่เชื่อมต่อไปยังอินเทอร์เน็ตภายนอก (External) ในคอนฟิก NAT?",
        "options": ["ip nat outside", "ip nat inside", "ip nat enable", "nat external"],
        "correct_index": 0,
        "explanation_en": "The 'ip nat outside' command is applied on the interface facing the outside world (e.g. WAN interface).",
        "explanation_th": "ใช้คำสั่ง 'ip nat outside' ระบุไว้ในพอร์ตที่หันออกสู่เครือข่ายอินเทอร์เน็ตหรือฝั่งผู้ให้บริการภายนอก"
      },
      {
        "question_en": "What is the main limitation of standard Dynamic NAT without overload (PAT)?",
        "question_th": "ข้อจำกัดหลักของการทำ Dynamic NAT แบบธรรมดาที่ไม่มีการพ่วงฟังก์ชัน Overload (PAT) คืออะไร?",
        "options": [
          "It does not support IPv4.",
          "Once the pool of public IP addresses is fully allocated, subsequent internal hosts are blocked from accessing the internet until an IP is freed.",
          "It is slower than static routing.",
          "It is proprietary to non-Cisco routers."
        ],
        "correct_index": 1,
        "explanation_en": "Standard Dynamic NAT translates IPs on a 1-to-1 basis. If the pool has 5 IPs, only 5 hosts can access the internet simultaneously. Others must wait.",
        "explanation_th": "เนื่องจากยังแปลแบบ 1:1 หากมีไอพีสาธารณะในกองกลาง 5 เบอร์ ก็จะใช้ออกเน็ตพร้อมกันได้เพียง 5 โฮสต์ ส่วนเครื่องถัดไปต้องต่อคิวรอ"
      },
      {
        "question_en": "Which command is used to verify the active NAT translations currently stored in a Cisco router?",
        "question_th": "คำสั่งตรวจสอบกระบวนการแปลงแอดเดรส NAT ที่กำลังทำงานอยู่แบบเรียลไทม์บนเร้าเตอร์ Cisco คือข้อใด?",
        "options": ["show ip nat translations", "show ip nat statistics", "show nat active", "debug ip nat"],
        "correct_index": 0,
        "explanation_en": "The command 'show ip nat translations' displays the active translation table entries, showing mappings between inside/outside local and global IPs.",
        "explanation_th": "คำสั่ง 'show ip nat translations' แสดงตารางประวัติจับคู่ระหว่างกลุ่มไอพีภายนอกและภายในที่เซสชันกำลังเปิดอยู่"
      }
    ]
  },
  "lesson-ccna006-01": {
    "questions": [
      {
        "question_en": "What are the three pillars of the CIA Triad in information security?",
        "question_th": "สามเสาหลักในโครงสร้างสามเหลี่ยมความปลอดภัยข้อมูล CIA Triad คือข้อใด?",
        "options": [
          "Configuration, Installation, Administration",
          "Confidentiality, Integrity, Availability",
          "Connectivity, Isolation, Authentication",
          "Control, Inspection, Audit"
        ],
        "correct_index": 1,
        "explanation_en": "The CIA Triad stands for Confidentiality (preventing unauthorized access), Integrity (preventing unauthorized modification), and Availability (ensuring systems are accessible).",
        "explanation_th": "CIA Triad ยึดสามหลักการสำคัญ ได้แก่ ความเป็นส่วนตัว (Confidentiality) ความถูกต้องถูกต้อง (Integrity) และความพร้อมใช้งานระบบ (Availability)"
      },
      {
        "question_en": "What is the difference between a vulnerability and a threat in network security?",
        "question_th": "ความแตกต่างระหว่างช่องโหว่ (Vulnerability) และภัยคุกคาม (Threat) ในมุมมองความปลอดภัยเครือข่ายคืออะไร?",
        "options": [
          "Vulnerability is an active attack; threat is a hardware bug.",
          "Vulnerability is a weakness in the system; threat is a potential force or adversary looking to exploit that weakness.",
          "Vulnerabilities only exist on switches; threats only exist on routers.",
          "Threats are internal; vulnerabilities are external."
        ],
        "correct_index": 1,
        "explanation_en": "A vulnerability is a weakness (e.g. software bug, misconfiguration). A threat is anything that could exploit that vulnerability to cause harm.",
        "explanation_th": "Vulnerability คือจุดบกพร่องหรือความอ่อนแอในตัวระบบ ส่วน Threat คือปัจจัยภายนอกหรือผู้ไม่ประสงค์ดีที่จะเข้ามาเจาะจุดบกพร่องนั้น"
      },
      {
        "question_en": "Which type of attack floods a network or server with fake traffic to make it unavailable to legitimate users?",
        "question_th": "การโจมตีประเภทใดที่ยิงทราฟฟิกปลอมจำนวนมหาศาลถล่มระบบเพื่อป่วนให้เซิร์ฟเวอร์หยุดทำงานหรือไม่สามารถให้บริการลูกค้าปกติได้?",
        "options": ["Man-in-the-Middle (MitM)", "Phishing", "Denial of Service (DoS / DDoS)", "SQL Injection"],
        "correct_index": 2,
        "explanation_en": "Denial of Service (DoS) and Distributed DoS (DDoS) flood resources with traffic to overwhelm them, violating the 'Availability' pillar of security.",
        "explanation_th": "การโจมตีแบบปฏิเสธการให้บริการ (DoS/DDoS) มุ่งเป้าป่วนการเข้าถึงระบบโดยอัดข้อมูลปริมาณมากใส่เป้าหมายให้ประมวลผลไม่ทัน"
      },
      {
        "question_en": "What is Social Engineering?",
        "question_th": "วิศวกรรมสังคม (Social Engineering) หมายถึงเทคนิคการโจมตีในลักษณะใด?",
        "options": [
          "Hacking physical network routers using custom code.",
          "Manipulating people into revealing confidential information or granting unauthorized access.",
          "Rewriting computer code to fix security bugs.",
          "Bypassing firewalls using hardware components."
        ],
        "correct_index": 1,
        "explanation_en": "Social engineering uses psychological manipulation (like phishing or impersonation) to trick individuals into disclosing sensitive information (like passwords).",
        "explanation_th": "คือกลอุบายหลอกล่อชักจูงคนโดยใช้จิตวิทยา (เช่น การส่งอีเมล Phishing หรือสวมรอย) เพื่อให้บอกข้อมูลที่เป็นความลับ"
      },
      {
        "question_en": "Which security measure validates the identity of a user attempting to connect to a network resource?",
        "question_th": "มาตรการความปลอดภัยใดทำหน้าที่ตรวจสอบยืนยันตัวตนของผู้ใช้ที่กำลังพยายามเชื่อมเข้าหาทรัพยากรระบบ?",
        "options": ["Authentication", "Authorization", "Accounting", "Encryption"],
        "correct_index": 0,
        "explanation_en": "Authentication confirms who the user is (e.g. via username/password or certificates).",
        "explanation_th": "การยืนยันตัวตน (Authentication) เป็นด่านแรกที่ตรวจสอบว่าผู้ใช้นั้นคือใครและเป็นผู้มีรายชื่อในระบบจริงหรือไม่"
      }
    ]
  },
  "lesson-ccna006-02": {
    "questions": [
      {
        "question_en": "What switch security feature restricts incoming traffic on an interface by binding allowed MAC addresses to the port?",
        "question_th": "ฟีเจอร์ความปลอดภัยของสวิตช์ใดที่ใช้จำกัดสิทธิ์พอร์ตเชื่อมต่อโดยระบุจำกัดให้เฉพาะ MAC address ที่บันทึกไว้เข้าถึงได้?",
        "options": ["VTP Pruning", "Port Security", "DHCP Snooping", "Dynamic ARP Inspection"],
        "correct_index": 1,
        "explanation_en": "Port Security is a Layer 2 security mechanism that limits allowed MAC addresses on a per-port basis.",
        "explanation_th": "Port Security คือฟังก์ชันระบบป้องปราบความปลอดภัย Layer 2 ที่คุมพอร์ตสวิตช์โดยอนุมัติเฉพาะ MAC address ที่ถูกต้อง"
      },
      {
        "question_en": "What is the default violation action when Port Security detects an unauthorized MAC address?",
        "question_th": "สถานะการตอบรับ (Violation action) เริ่มต้นคืออะไรเมื่อ Port Security ตรวจพบ MAC address ที่ไม่มีสิทธิ์เชื่อมต่อ?",
        "options": ["Protect", "Restrict", "Shutdown", "Disable"],
        "correct_index": 2,
        "explanation_en": "The default violation action is 'Shutdown'. The switch port is immediately disabled and placed into an error-disabled (err-disabled) state.",
        "explanation_th": "การทำงานเริ่มต้นคือ 'Shutdown' โดยพอร์ตของสวิตช์จะปิดการเชื่อมต่อทันทีและเข้าสู่สถานะจำกัดทำงาน (err-disabled)"
      },
      {
        "question_en": "What command configures a port to dynamically learn MAC addresses and save them permanently to the running configuration?",
        "question_th": "คำสั่งใดระบุให้พอร์ตสวิตช์บันทึกจำแอดเดรสที่ตรวจพบแรกเข้าแบบถาวรลงในประวัติค่าคอนฟิก (Sticky MAC)?",
        "options": [
          "switchport port-security mac-address dynamic",
          "switchport port-security mac-address sticky",
          "switchport port-security learn-mac",
          "ip port-security sticky"
        ],
        "correct_index": 1,
        "explanation_en": "The 'switchport port-security mac-address sticky' command dynamically learns MAC addresses and converts them into sticky addresses, saving them in configuration.",
        "explanation_th": "ใช้คำสั่ง 'switchport port-security mac-address sticky' ระบบจะแปลงแอดเดรสที่เรียนรู้สดให้ติดเข้าเป็นหนึ่งในบรรทัดคอนฟิกทันที"
      },
      {
        "question_en": "Which switch security feature prevents DHCP starvation and rogue DHCP server attacks by verifying DHCP messages?",
        "question_th": "ฟังก์ชันความปลอดภัยใดของสวิตช์ที่ช่วยป้องกันการแกล้งปลอมเป็น DHCP Server (Rogue DHCP) และการยิงป่วนแอดเดรสขัดข้อง?",
        "options": ["Port Security", "DHCP Snooping", "Dynamic ARP Inspection (DAI)", "IP Source Guard"],
        "correct_index": 1,
        "explanation_en": "DHCP Snooping determines trusted and untrusted ports. It blocks unauthorized DHCP server replies coming from untrusted ports.",
        "explanation_th": "DHCP Snooping กรองและจำแนกสิทธิ์พอร์ตว่าพอร์ตใดเชื่อถือได้ (Trusted) เพื่อไม่ยอมให้มีสัญญาณแจ้งแจกไอพีแปลกปลอมวิ่งเข้ามา"
      },
      {
        "question_en": "How can an administrator recover a switch port that has been placed into the 'err-disabled' state by Port Security?",
        "question_th": "ผู้ดูแลระบบจะสามารถดึงพอร์ตสวิตช์ที่ถูกปิดตัวเป็นสถานะ 'err-disabled' ให้ฟื้นกลับมาทำงานได้ด้วยวิธีการปกติอย่างไร?",
        "options": [
          "It recovers automatically after 10 seconds without any action.",
          "By executing 'shutdown' followed by 'no shutdown' on the affected interface.",
          "By rebooting the entire switch.",
          "By deleting the VLAN configuration."
        ],
        "correct_index": 1,
        "explanation_en": "To manually reset an err-disabled interface, configure the interface with 'shutdown' to disable it, and then 'no shutdown' to enable it again.",
        "explanation_th": "ให้คลิกสั่งหยุดพอร์ตโดยใช้คำสั่ง 'shutdown' ก่อนรอบหนึ่ง แล้วค่อยตามด้วย 'no shutdown' เพื่อกระตุ้นให้สถานะเคลียร์ตัวและพร้อมใช้งานใหม่"
      }
    ]
  },
  "lesson-ccna006-03": {
    "questions": [
      {
        "question_en": "What is the main security risk of not implementing Access Control Lists (ACLs) on internet-facing router interfaces?",
        "question_th": "ความเสี่ยงที่สำคัญที่สุดหากละเลยการใช้ ACL บนพอร์ตขาเชื่อมอินเทอร์เน็ตของเร้าเตอร์คืออะไร?",
        "options": [
          "Routing protocols will stop functioning.",
          "All incoming traffic from the internet is permitted into the internal network by default.",
          "Internet speed is limited.",
          "DHCP server will crash."
        ],
        "correct_index": 1,
        "explanation_en": "Without ACLs to filter traffic, any internet host can attempt to connect directly to internal devices, creating severe security risks.",
        "explanation_th": "หากไม่มีการกรอง ข้อมูลดิบทุกประเภทจากโลกภายนอกจะสามารถวิ่งพุ่งผ่านเข้ามาหาเครือข่ายภายในองค์กรได้ทั้งหมดโดยไม่มีตัวกลั่นกรอง"
      },
      {
        "question_en": "Which type of ACL is recommended for securing the VTY (Virtual Terminal) lines of a switch or router?",
        "question_th": "ACL ประเภทใดที่แนะนำสำหรับนำมาผูกป้องกันพอร์ต VTY (สายสิทธิ์การควบคุมระดับไกลอย่าง Telnet/SSH)?",
        "options": ["Extended Named ACL only", "Standard Named or Numbered ACL", "VLAN Access Map", "Dynamic ACL"],
        "correct_index": 1,
        "explanation_en": "Standard ACLs are sufficient for securing VTY lines because you only need to match the source IP addresses of authorized administrative hosts.",
        "explanation_th": "ใช้เพียง Standard ACL ก็เพียงพอแล้วสำหรับการป้องกัน VTY เพราะมีหน้าที่เช็คตรวจสอบสแกนไอพีฝั่งผู้เรียกเข้า (Source) เท่านั้น"
      },
      {
        "question_en": "What command is used to apply an ACL to restrict access to a router's VTY lines?",
        "question_th": "คำสั่งใดใช้ระบุเชื่อมผูกเงื่อนไข ACL เพื่อใช้ควบคุมจำกัดความปลอดภัยของช่องทาง VTY บนเร้าเตอร์?",
        "options": ["ip access-group <number> in", "access-class <number> in", "traffic-filter <number> vty", "line access-list <number>"],
        "correct_index": 1,
        "explanation_en": "The 'access-class <number> in' command is used inside line vty configuration mode to filter remote access traffic.",
        "explanation_th": "ต้องใช้คำสั่ง 'access-class <number> in' ป้อนภายใต้โหมด line vty เพื่อสั่งจับคู่คัดกรองไอพีที่ได้รับอนุญาตเชื่อมเข้ามา"
      },
      {
        "question_en": "In securing network infrastructure, why is it recommended to include a final 'deny ip any any log' statement in extended ACLs?",
        "question_th": "ในการเพิ่มระบบป้องกัน เพราะเหตุใดจึงแนะนำให้เขียนข้อปฏิเสธสรุปประโยคท้ายสุดเป็น 'deny ip any any log' ใน Extended ACL?",
        "options": [
          "To speed up router operations.",
          "To explicitly drop unauthorized traffic and generate syslog messages containing packet details for security audits.",
          "To enable unequal cost load balancing.",
          "To bypass the implicit deny statement."
        ],
        "correct_index": 1,
        "explanation_en": "Adding 'log' at the end of a deny statement causes the router to send Syslog alerts whenever someone attempts an unauthorized access, improving network visibility.",
        "explanation_th": "การระบุคำสั่ง 'log' ต่อท้ายบรรทัด deny จะบอกให้เร้าเตอร์พ่นข้อความประวัติ Syslog ออกไปทุกครั้งที่มีการจับเจาะฝ่าฝืน เพื่อบันทึกประวัติการบุกรุก"
      },
      {
        "question_en": "What TCP port is blocked to prevent unsecured Telnet traffic from accessing network devices?",
        "question_th": "พอร์ต TCP หมายเลขใดที่มักบล็อกการกรองเพื่อไม่ยอมให้ทราฟฟิกแบบไม่ปลอดภัยอย่าง Telnet เชื่อมเข้ามาคุมอุปกรณ์?",
        "options": ["TCP Port 21", "TCP Port 22", "TCP Port 23", "TCP Port 80"],
        "correct_index": 2,
        "explanation_en": "Telnet uses TCP port 23, which transmits traffic in cleartext. SSH (port 22) should be used instead.",
        "explanation_th": "Telnet ทำงานที่ TCP พอร์ต 23 ซึ่งส่งข้อมูลแบบปกติไม่มีการเข้ารหัส แนะนำให้ปิดกั้นแล้วสลับมาใช้พอร์ต SSH (พอร์ต 22) แทน"
      }
    ]
  },
  "lesson-ccna006-04": {
    "questions": [
      {
        "question_en": "What do the three 'A's in the AAA Security Framework stand for?",
        "question_th": "ตัวอักษร 'A' ทั้งสามตัวในเฟรมเวิร์กระบบความปลอดภัยแบบ AAA ย่อมาจากอะไร?",
        "options": [
          "Association, Allocation, Administration",
          "Authentication, Authorization, Accounting",
          "Access-control, Alert, Audit",
          "Authority, Allocation, Action"
        ],
        "correct_index": 1,
        "explanation_en": "AAA stands for Authentication (Who are you?), Authorization (What can you do?), and Accounting (What did you do?).",
        "explanation_th": "AAA ยึดสิทธิ์ 3 ลำดับ ได้แก่ การพิสูจน์ตัวตน (Authentication) การอนุมัติสิทธิ์ (Authorization) และการเก็บบันทึกประวัติ (Accounting)"
      },
      {
        "question_en": "Which AAA component tracks the actions a user performs, including commands executed and time spent on the device?",
        "question_th": "ส่วนประกอบใดของ AAA ที่คอยจัดเก็บรวบรวมพฤติกรรมการทำงาน รวมถึงบันทึกประวัติคำสั่งสั่งงานและเวลาที่ใช้งานอุปกรณ์?",
        "options": ["Authentication", "Authorization", "Accounting", "Access-control"],
        "correct_index": 2,
        "explanation_en": "Accounting generates log records detailing user actions, commands used, and connection durations for audit purposes.",
        "explanation_th": "การเก็บบันทึกข้อมูล (Accounting) ทำหน้าที่บันทึกพฤติกรรม คีย์เวิร์ดคำสั่งต่างๆ และระยะเวลาที่เชื่อมต่อเพื่อใช้เป็นประวัติตรวจสอบย้อนหลัง"
      },
      {
        "question_en": "Which protocol is an open-standard used to communicate between network devices and a centralized AAA server?",
        "question_th": "โปรโตคอลมาตรฐานเปิดในข้อใดที่ใช้แลกเปลี่ยนติดต่อสื่อสารระหว่างตัวอุปกรณ์เครือข่ายและเครื่องเซิร์ฟเวอร์ AAA ส่วนกลาง?",
        "options": ["TACACS+", "RADIUS (Remote Authentication Dial-In User Service)", "SSH", "LDAP"],
        "correct_index": 1,
        "explanation_en": "RADIUS is an open-standard protocol used for centralized AAA. TACACS+ is originally Cisco-proprietary.",
        "explanation_th": "RADIUS คือมาตรฐานกลางสากลที่ใช้คุยกับระบบสิทธิ์ AAA ส่วน TACACS+ นั้นดั้งเดิมพัฒนาขึ้นเป็นลิขสิทธิ์ของค่าย Cisco"
      },
      {
        "question_en": "What is a key difference between TACACS+ and RADIUS protocols?",
        "question_th": "ข้อแตกต่างที่สำคัญประการหนึ่งระหว่างโปรโตคอล TACACS+ และ RADIUS คือข้อใด?",
        "options": [
          "RADIUS encrypts the entire packet; TACACS+ only encrypts the password.",
          "TACACS+ encrypts the entire packet payload and separates AAA functions; RADIUS only encrypts the password and combines Authentication/Authorization.",
          "RADIUS uses TCP; TACACS+ uses UDP.",
          "TACACS+ is open standard; RADIUS is Cisco proprietary."
        ],
        "correct_index": 1,
        "explanation_en": "TACACS+ uses TCP port 49, encrypts the entire payload, and strictly separates auth/authz functions. RADIUS uses UDP, encrypts only the password, and combines authentication/authorization.",
        "explanation_th": "TACACS+ ใช้ TCP เข้ารหัสข้อมูลแพ็กเก็ตทั้งหมดและแยกหมวดสั่งงานชัดเจน ส่วน RADIUS ใช้ UDP เข้ารหัสเฉพาะรหัสผ่านและมัดรวมด่านตรวจสอบ"
      },
      {
        "question_en": "Which command globally enables AAA services on a Cisco IOS switch or router?",
        "question_th": "คำสั่งใดใช้เปิดการทำงานฟังก์ชันสิทธิ์ระบบ AAA ในสเกลระดับ Global Configuration บนอุปกรณ์ Cisco?",
        "options": ["aaa new-model", "aaa enable", "service aaa", "ip aaa-server"],
        "correct_index": 0,
        "explanation_en": "The 'aaa new-model' command is required in global configuration mode to activate AAA services on Cisco IOS.",
        "explanation_th": "จำเป็นต้องป้อนคำสั่ง 'aaa new-model' เพื่อให้ตัวระบบ Cisco IOS ปรับเปลี่ยนการบริหารสิทธิ์หันมาเริ่มใช้งานโครงสร้าง AAA"
      }
    ]
  },
  "lesson-dev002-01": {
    "questions": [
      {
        "question_en": "What type of controller is Cisco DNA Center (Catalyst Center)?",
        "question_th": "Cisco DNA Center (Catalyst Center) จัดอยู่ในประเภทคอนโทรลเลอร์ควบคุมแบบใด?",
        "options": [
          "A distributed peer-to-peer router.",
          "A centralized SDN controller for enterprise campus and branch networks.",
          "A wireless client utility.",
          "A firewall management console only."
        ],
        "correct_index": 1,
        "explanation_en": "Cisco DNA Center is a centralized SDN (Software-Defined Networking) controller that manages intent-based campus network policies.",
        "explanation_th": "Cisco DNA Center เป็นระบบคอนโทรลเลอร์จัดเก็บสิทธิ์ส่วนกลางของเครือข่าย SDN สำหรับบริหารระบบแคมปัสและสาขาต่างๆ"
      },
      {
        "question_en": "What is the purpose of the 'Assurance' feature in Cisco DNA Center?",
        "question_th": "วัตถุประสงค์ของฟังก์ชันระบบรายงานความมั่นใจ 'Assurance' ใน Cisco DNA Center คือข้อใด?",
        "options": [
          "To automatically buy new hardware licenses.",
          "To collect network telemetry and apply analytics to monitor device and client health in real time.",
          "To encrypt serial link traffic.",
          "To block employee social media access."
        ],
        "correct_index": 1,
        "explanation_en": "Assurance uses machine learning and streaming telemetry to analyze network health, troubleshooting issues before they impact users.",
        "explanation_th": "Assurance ช่วยรวบรวมค่าสถิติจากอุปกรณ์วิเคราะห์เชิงลึก เพื่อประเมินระดับความพร้อมของโครงข่ายและตรวจสุขภาพผู้ใช้งานเรียลไทม์"
      },
      {
        "question_en": "Which Cisco DNA Center API category allows developers to push configuration templates and design policies?",
        "question_th": "หมวดหมู่ API ประเภทใดของ Cisco DNA Center ที่เปิดให้ผู้พัฒนาใช้ส่งชุดคำสั่งเทมเพลตและการคอนฟิกภาพรวมเครือข่าย?",
        "options": ["Assurance APIs", "Intent-based APIs (Provisioning / Policy)", "System Integration APIs", "Command Runner APIs"],
        "correct_index": 1,
        "explanation_en": "Provisioning and Policy APIs under the Intent-based suite allow programmatically pushed configurations and designs.",
        "explanation_th": "Intent-based API ในหมวดการจัดสรร (Provisioning/Policy) ช่วยให้นักพัฒนาปรับแก้ไขการตั้งค่าอุปกรณ์ปลายทางจำนวนมากได้พร้อมกัน"
      },
      {
        "question_en": "Which architecture pattern does Cisco DNA Center use to represent the northbound interface?",
        "question_th": "สถาปัตยกรรมเชื่อมต่อทางฝั่ง Northbound Interface ของ Cisco DNA Center ทำงานอยู่ในรูปแบบอินเตอร์เฟสทางเทคนิคใด?",
        "options": ["SNMP v3", "REST APIs (JSON over HTTPS)", "SSH / CLI scripting", "Netconf / XML"],
        "correct_index": 1,
        "explanation_en": "The Northbound interface is built on REST APIs, using JSON payloads for data exchange with external scripts and orchestrators.",
        "explanation_th": "อินเตอร์เฟสฝั่งเหนือ (Northbound) สื่อสารระบบหลักในแบบ REST API (รับส่งไฟล์ข้อมูลประเภท JSON ผ่านการเชื่อมต่อ HTTPS)"
      },
      {
        "question_en": "In Cisco DNA Center API authentication, what is the life span of a generated authentication token?",
        "question_th": "ในการพิสูจน์สิทธิ์ของ Cisco DNA Center API โทเค็นที่สร้างขึ้นมาเพื่อเป็นบัตรผ่านจะมีอายุใช้งานนานกี่ชั่วโมง?",
        "options": ["10 minutes", "1 hour", "12 hours", "24 hours"],
        "correct_index": 1,
        "explanation_en": "The generated X-Auth-Token typically has a life span of 1 hour (3600 seconds) before it must be renewed.",
        "explanation_th": "โทเค็นสิทธิ์เข้าทำคำสั่งระบบ (X-Auth-Token) มีระยะเวลาหมดอายุความปลอดภัยหลังจากได้รับครั้งแรก 1 ชั่วโมง"
      }
    ]
  },
  "lesson-dev002-02": {
    "questions": [
      {
        "question_en": "What is the primary benefit of SD-WAN over traditional WAN architecture?",
        "question_th": "ประโยชน์หลักของการสลับมาใช้อาณาเขตแบบ SD-WAN แทนระบบเครือข่ายระยะไกลแบบดั้งเดิมคือข้อใด?",
        "options": [
          "It forces the use of serial cables.",
          "It separates control and data planes, allowing centralized policy management and dynamic traffic steering across multiple transport paths.",
          "It disables local routing protocols completely.",
          "It reduces network speeds to improve security."
        ],
        "correct_index": 1,
        "explanation_en": "Cisco SD-WAN separates the control plane from the data plane, enabling centrally configured application steering policies across broadband, LTE, and MPLS.",
        "explanation_th": "SD-WAN แยกส่วนระบบควบคุมออกจากการสลับส่งต่อข้อมูล ทำให้ผู้ดูแลระบบสามารถกำหนดเส้นทางทราฟฟิกได้โดยอิงตามพฤติกรรมข้อมูลส่วนกลาง"
      },
      {
        "question_en": "In Cisco SD-WAN architecture, which component represents the centralized management plane (Single Pane of Glass)?",
        "question_th": "ในระบบโครงสร้างของ Cisco SD-WAN ส่วนประกอบอุปกรณ์ย่อยใดทำหน้าที่เป็นด่านการจัดตั้งศูนย์บริหารรวมศูนย์ (Single Pane of Glass)?",
        "options": ["vSmart", "vManage (Cisco Catalyst SD-WAN Manager)", "vBond", "vEdge"],
        "correct_index": 1,
        "explanation_en": "vManage is the centralized management dashboard used to configure, monitor, and provision the entire SD-WAN fabric.",
        "explanation_th": "vManage เป็นหน้าจอบอร์ดจัดการส่วนกลาง (Management Plane) ที่เปิดให้ผู้ดูแลทำเทมเพลต แก้คอนฟิก และเฝ้าสังเกตการณ์ระบบทั้งหมด"
      },
      {
        "question_en": "Which SD-WAN component acts as the centralized control plane, distributing routing and policy decisions to edge routers?",
        "question_th": "ส่วนประกอบ SD-WAN ใดที่เปรียบเสมือนสมองของระบบทำหน้าที่ควบคุม (Control plane) จัดแจงทิศทางเร้าติ้งนโยบายให้เร้าเตอร์ปลายทาง?",
        "options": ["vManage", "vSmart", "vBond", "vEdge"],
        "correct_index": 1,
        "explanation_en": "vSmart is the control plane engine of Cisco SD-WAN. It implements OMP (Overlay Management Protocol) to distribute routing info and security keys.",
        "explanation_th": "vSmart ทำหน้าที่ประมวลผลสมองควบคุมทราฟฟิก (Control plane) สั่งงานและแจกจ่ายเส้นทางอิงตามนโยบายด้วยโปรโตคอล OMP"
      },
      {
        "question_en": "What is the role of the vBond orchestrator in Cisco SD-WAN?",
        "question_th": "บทบาทหน้าที่หลักของระบบประสานงาน vBond ในเครือข่าย Cisco SD-WAN คือข้อใด?",
        "options": [
          "To forward user data packets.",
          "To orchestrate initial authentication, secure onboarding, and direct edge devices to vManage and vSmart controllers.",
          "To store system syslog entries.",
          "To assign IP addresses to home PCs."
        ],
        "correct_index": 1,
        "explanation_en": "vBond is the orchestration plane. It handles initial authentication and setup, coordinating connections to vManage and vSmart.",
        "explanation_th": "vBond ทำหน้าที่จัดด่านทักทายตรวจใบรับรอง (Orchestration plane) ชี้แนะให้อุปกรณ์ขอบเครือข่ายวิ่งเข้าหา vManage และ vSmart ได้ถูกต้อง"
      },
      {
        "question_en": "Which protocol is used by Cisco SD-WAN controllers to exchange routing and policy information over the secure fabric?",
        "question_th": "โปรโตคอลเฉพาะใดที่ Cisco SD-WAN เลือกใช้แลกเปลี่ยนตารางเส้นทางเร้าติ้งและนโยบายผ่านโครงข่ายปลอดภัยเสมือน?",
        "options": ["BGP", "OSPF", "OMP (Overlay Management Protocol)", "EIGRP"],
        "correct_index": 2,
        "explanation_en": "Overlay Management Protocol (OMP) is the routing protocol of SD-WAN, running between vSmart controllers and vEdge/cEdge routers.",
        "explanation_th": "OMP (Overlay Management Protocol) คือโปรโตคอลจัดหาเส้นทางที่วิ่งสื่อสารเชื่อมโยงการทำงานหลักในเครือข่าย SD-WAN"
      }
    ]
  },
  "lesson-dev002-03": {
    "questions": [
      {
        "question_en": "What is the primary architecture model of Cisco Meraki?",
        "question_th": "รูปแบบโครงสร้างการให้บริการหลักของผลิตภัณฑ์ระบบ Cisco Meraki คือข้อใด?",
        "options": [
          "On-premise CLI only.",
          "Cloud-managed IT infrastructure.",
          "Distributed decentralized hub.",
          "Standard SNMP controller."
        ],
        "correct_index": 1,
        "explanation_en": "Cisco Meraki is built on a 100% cloud-managed model where hardware devices connect to a centralized Meraki Dashboard.",
        "explanation_th": "Cisco Meraki ออกแบบและควบคุมในรูปแบบอุปกรณ์ไอทีจัดตั้งผ่านระบบคลาวด์ (Cloud-managed) เชื่อมตรงหาศูนย์กลาง Dashboard เดียว"
      },
      {
        "question_en": "How do developers interact with Cisco Meraki programmatically?",
        "question_th": "นักพัฒนาจะสามารถส่งคำสั่งสั่งงานระบบบริหารของ Cisco Meraki ผ่านโปรแกรมได้อย่างไร?",
        "options": [
          "By sending SSH commands to the device directly.",
          "Via the Meraki Dashboard REST API.",
          "Through serial connection interface.",
          "By using telnet scripting."
        ],
        "correct_index": 1,
        "explanation_en": "Meraki provides comprehensive REST APIs that allow provisioning, monitoring, and configuring networks via HTTPS.",
        "explanation_th": "Meraki มีบริการระบบ REST API ที่รองรับการสั่งสแกนประวัติ ปรับแต่งค่า และตรวจสอบสภาพเครือข่ายผ่าน HTTPS จากสคริปต์ภายนอก"
      },
      {
        "question_en": "What is the purpose of the Meraki Webhook API?",
        "question_th": "เป้าหมายการทำงานของระบบ Meraki Webhook API คือข้อใด?",
        "options": [
          "To reboot the routers weekly.",
          "To send real-time alerts or event notifications from Meraki Dashboard to external receiver URLs.",
          "To update the software version of access points.",
          "To encrypt physical Ethernet cables."
        ],
        "correct_index": 1,
        "explanation_en": "Webhooks allow Meraki Dashboard to push event alerts (like device offline or high latency) to external services immediately.",
        "explanation_th": "Webhook ใช้ให้ Meraki ยิงข้อความประกาศเตือนภัยเร่งด่วนแบบเรียลไทม์ (เช่น อุปกรณ์ล่ม) พุ่งเข้าหา URL ปลายทางภายนอกทันที"
      },
      {
        "question_en": "Which API header is required to authenticate requests against the Meraki Dashboard API?",
        "question_th": "ข้อมูลในหัวข้อ Header ใดของ HTTP ที่ต้องแนบไปในการเรียกใช้งานเพื่อพิสูจน์ยืนยันตัวตนกับระบบ Meraki API?",
        "options": ["Authorization: Bearer <token>", "X-Cisco-Meraki-API-Key: <key>", "X-Auth-Token", "API-Key"],
        "correct_index": 1,
        "explanation_en": "Meraki REST API calls require the 'X-Cisco-Meraki-API-Key' custom header containing the user's API token.",
        "explanation_th": "ในการเรียกใช้ Meraki API จำเป็นต้องระบุคีย์เวิร์ดใน Header เป็น 'X-Cisco-Meraki-API-Key' พร้อมแปะตัวรหัสสิทธิ์ประกอบ"
      },
      {
        "question_en": "In what format are Meraki API payloads exchanged?",
        "question_th": "ข้อมูล Payload ที่แลกเปลี่ยนผ่าน Meraki API ส่งรับกันอยู่ในไฟล์รูปแบบใด?",
        "options": ["XML", "JSON", "YAML", "HTML"],
        "correct_index": 1,
        "explanation_en": "Like most modern REST APIs, Cisco Meraki uses JSON formatted payloads for all requests and responses.",
        "explanation_th": "เมรากิใช้รูปแบบไฟล์ประเภท JSON ในทุกๆ การส่งรับพารามิเตอร์ข้อมูลผ่านสเปก REST API ของตน"
      }
    ]
  },
  "lesson-dev002-04": {
    "questions": [
      {
        "question_en": "What is Ansible primarily classified as in network automation?",
        "question_th": "อุปกรณ์ซอฟต์แวร์ Ansible ถูกจัดประเภทอยู่ในเครื่องมือกลุ่มใดสำหรับการจัดการทำเครือข่ายอัตโนมัติ?",
        "options": [
          "An agent-based coding compiler.",
          "An agentless Configuration Management and orchestration tool.",
          "A network simulation tool like GNS3.",
          "A physical router hardware controller."
        ],
        "correct_index": 1,
        "explanation_en": "Ansible is agentless (runs on an control node and communicates via SSH/REST) and acts as configuration manager using YAML.",
        "explanation_th": "Ansible เป็นระบบที่ไม่ต้องติดตั้งซอฟต์แวร์ฝั่งรับ (Agentless) คอนฟิกค่าผ่านเครื่องควบคุมส่วนกลางส่งข้ามสาย SSH"
      },
      {
        "question_en": "What file format is used to write Ansible playbooks?",
        "question_th": "รูปแบบการเขียนเอกสารสั่งงานหรือเขียนไฟล์ Playbook ในระบบ Ansible ใช้มาตรฐานแบบใด?",
        "options": ["JSON", "XML", "YAML", "Python script"],
        "correct_index": 2,
        "explanation_en": "Ansible playbooks are structured using YAML (Yet Another Markup Language), which is clean and easy to read.",
        "explanation_th": "Playbooks ของ Ansible ถูกเขียนขึ้นมาโดยยึดการจัดระเบียบและเว้นวรรคด้วยรูปแบบไฟล์ YAML"
      },
      {
        "question_en": "Where does Ansible look to find the list of network devices and their IP addresses to manage?",
        "question_th": "Ansible ทราบรายชื่อและตำแหน่งไอพีของอุปกรณ์เครือข่ายปลายทางที่ต้องเข้าไปจัดการจากแหล่งเก็บข้อมูลใด?",
        "options": ["Playbook file", "Inventory file", "Ansible.cfg", "Python module"],
        "correct_index": 1,
        "explanation_en": "The inventory file (hosts) defines the targets, groups, and device-specific variables Ansible will connect to.",
        "explanation_th": "ไฟล์คงคลัง (Inventory file) ทำหน้าที่เก็บรายชื่อ แบ่งกลุ่มเครื่องปลายทาง และจัดแจงตัวแปรของแต่ละอุปกรณ์ที่ต้องการเชื่อมโยง"
      },
      {
        "question_en": "What is the main advantage of Ansible being 'Agentless' for network engineering?",
        "question_th": "ข้อดีที่เด่นชัดที่สุดของการออกแบบระบบแบบ 'Agentless' ในมุมมองของวิศวกรระบบเครือข่ายคืออะไร?",
        "options": [
          "It does not require any Python programming knowledge.",
          "No software needs to be installed on the managed network switches and routers.",
          "It operates without any IP network connection.",
          "It is automatically supported by all hardware brands without configuration."
        ],
        "correct_index": 1,
        "explanation_en": "Because routers/switches cannot run third-party agents, Ansible's ability to run over native SSH makes it ideal for network deployment.",
        "explanation_th": "เนื่องจากอุปกรณ์เราเตอร์สวิตช์มักไม่เปิดช่องให้ติดตั้งโปรแกรมเสริม การสั่งการผ่านช่องทาง SSH/Netconf ทั่วไปจึงตอบโจทย์ที่สุด"
      },
      {
        "question_en": "In Ansible terminology, what represents a unit of work to be executed on a target (e.g., configuring an interface)?",
        "question_th": "ตามคำนิยามคำศัพท์ของ Ansible สิ่งใดคือขอบเขตการทำงานเดี่ยวที่จะต้องประมวลผลลัพธ์บนเครื่องปลายทาง?",
        "options": ["Playbook", "Play", "Task / Module", "Inventory"],
        "correct_index": 2,
        "explanation_en": "Tasks invoke specific Ansible modules (like cisco.ios.ios_config) to execute specific configurations on target nodes.",
        "explanation_th": "งานเดี่ยวหรือโมดูล (Task/Module) คือกลุ่มคำสั่งเฉพาะที่จะวิ่งเข้าไปดำเนินการตั้งค่าตามเจตจำนงบนอุปกรณ์ปลายทาง"
      }
    ]
  },
  "lesson-git-01": {
    "questions": [
      {
        "question_en": "What is Git?",
        "question_th": "Git คือระบบโปรแกรมประเภทใด?",
        "options": [
          "A programming language for network code.",
          "A distributed version control system to track changes in source code.",
          "A cloud database server.",
          "A software pipeline compile utility."
        ],
        "correct_index": 1,
        "explanation_en": "Git is a distributed version control system that tracks revisions, changes, and history of text files (like code).",
        "explanation_th": "Git เป็นระบบควบคุมรุ่นแบบกระจายศูนย์ (Distributed Version Control) เพื่อใช้เฝ้าบันทึกประวัติการเปลี่ยนแปลงแก้ไขตัวโค้ดโปรแกรม"
      },
      {
        "question_en": "Which command initializes a new, empty Git repository in the current local folder?",
        "question_th": "คำสั่งใดใช้สำหรับริเริ่มสร้างคลังข้อมูล Git ใหม่ที่ว่างเปล่า (Initialize repository) ลงในโฟลเดอร์ปัจจุบัน?",
        "options": ["git start", "git init", "git create", "git clone"],
        "correct_index": 1,
        "explanation_en": "The 'git init' command creates a hidden '.git' directory, initializing a repository.",
        "explanation_th": "ใช้คำสั่ง 'git init' เพื่อเรียกตั้งแฟ้มประวัติไฟล์ลับ '.git' ขึ้นมารับช่วงต่อสังเกตการณ์ความเคลื่อนไหวในโฟลเดอร์"
      },
      {
        "question_en": "What command is used to add local changes in a file to the staging area in Git?",
        "question_th": "คำสั่งใดที่ใช้ในการนำส่งการแก้ไขของไฟล์ในท้องถิ่นเข้าสู่พื้นที่เตรียมคลัง (Staging Area) ในระบบ Git?",
        "options": ["git stage", "git add <filename>", "git commit", "git push"],
        "correct_index": 1,
        "explanation_en": "The 'git add <file>' command adds changes to the index, preparing them to be committed.",
        "explanation_th": "สั่งรวบรวมไฟล์เก็บพักไว้ในด่านเตรียมส่งตัวโดยใช้คำสั่ง 'git add <ชื่อไฟล์>' ก่อนทำขั้นต่อไป"
      },
      {
        "question_en": "What command permanently records the staged snapshot in the Git history with a descriptive log message?",
        "question_th": "คำสั่งใดใช้บันทึกเก็บภาพการแก้ไขที่รอคอยใน Staging Area ลงเป็นประวัติผลงานถาวรของ Git พร้อมแนบคำอธิบาย?",
        "options": ["git save", "git commit -m \"message\"", "git push", "git record"],
        "correct_index": 1,
        "explanation_en": "The 'git commit -m \"msg\"' command permanently records the staged files in the local Git repository's history database.",
        "explanation_th": "คำสั่ง 'git commit -m \"คำอธิบาย\"' จะบันทึกภาพรวมความคืบหน้าของโค้ดเก็บเข้าเป็นประวัติผลงานถาวรในคลังระบบ"
      },
      {
        "question_en": "Which area in Git contains files that are modified but have not yet been added to the staging area or committed?",
        "question_th": "พื้นที่บริเวณใดในระบบ Git ที่แสดงสถานะว่าไฟล์โดนปรับเปลี่ยนข้อมูลแล้ว แต่ยังไม่ได้ลงชื่อในส่วนเตรียมตัวหรือ Commit?",
        "options": ["Staging Area", "Working Directory (Working Tree)", "Local Repository", "Remote Repository"],
        "correct_index": 1,
        "explanation_en": "The Working Directory is the active file system folder where files are modified before being added to Git staging.",
        "explanation_th": "พื้นที่ไดเรกทอรีทำงาน (Working Directory) คือตัวโฟลเดอร์ปกติที่มีความเคลื่อนไหวแต่ตัว Git ยังไม่ได้ลงบันทึกใน Staging"
      }
    ]
  },
  "lesson-git-02": {
    "questions": [
      {
        "question_en": "What is the primary difference between Git and GitHub/GitLab?",
        "question_th": "ข้อแตกต่างพื้นฐานที่สำคัญระหว่างตัวระบบ Git และผู้ให้บริการอย่าง GitHub/GitLab คืออะไร?",
        "options": [
          "Git is a paid service; GitHub is free open-source software.",
          "Git is the local version control software; GitHub and GitLab are web-based platforms that host remote Git repositories and provide collaboration tools.",
          "Git operates in Layer 3; GitHub operates in Layer 7.",
          "They are identical products developed by different companies."
        ],
        "correct_index": 1,
        "explanation_en": "Git is the underlying tool that runs locally. Platforms like GitHub and GitLab host these repositories on servers to allow team collaboration.",
        "explanation_th": "Git คือซอฟต์แวร์เครื่องมือหลักที่ติดตั้งรันในคอมพิวเตอร์ ส่วน GitHub/GitLab เป็นคลังเก็บไฟล์บนอินเทอร์เน็ตที่ช่วยทำงานเป็นทีม"
      },
      {
        "question_en": "What command is used to download an existing remote Git repository onto your local computer?",
        "question_th": "คำสั่งใดใช้ดาวน์โหลดคลังข้อมูล Git ที่มีอยู่แล้วจากระยะไกล (Remote repository) ลงมาบันทึกในเครื่องตนเอง?",
        "options": ["git download", "git clone <repository-url>", "git import", "git pull"],
        "correct_index": 1,
        "explanation_en": "The 'git clone' command fetches a remote repository and configures a local copy pointing to the source URL.",
        "explanation_th": "ใช้คำสั่ง 'git clone <ที่อยู่เว็บคลัง>' ในการสั่งดึงข้อมูลประวัติทั้งหมดของระบบคลังจากระยะไกลมาเริ่มทำงานในเครื่อง"
      },
      {
        "question_en": "What is a Pull Request (PR) or Merge Request (MR)?",
        "question_th": "Pull Request (PR) หรือ Merge Request (MR) ในมุมของการพัฒนาซอฟต์แวร์ร่วมกันหมายถึงขั้นตอนใด?",
        "options": [
          "A command to download files from GitHub.",
          "A proposal to merge changes from one branch into another, allowing code review and automated checks.",
          "A warning message when Git detects duplicate IPs.",
          "A request to delete a branch."
        ],
        "correct_index": 1,
        "explanation_en": "Pull/Merge Requests permit developers to notify team members of completed work, review modifications, and run automated tests before merging to main code.",
        "explanation_th": "คือขั้นตอนยื่นเจตจำนงของโค้ดที่แก้ไขเพื่อขอเอาไปรวมเข้ากับกิ่งหลัก เพื่อให้ทีมช่วยตรวจเช็คความถูกต้องและรันการทดสอบ"
      },
      {
        "question_en": "What command upload local commits to a remote repository on GitHub?",
        "question_th": "คำสั่งใดใช้ส่งประวัติชิ้นงานที่ Commit ในเครื่องตัวเองขึ้นสู่คลังข้อมูลระยะไกล (Remote Repository) บน GitHub?",
        "options": ["git upload", "git push", "git commit", "git publish"],
        "correct_index": 1,
        "explanation_en": "The 'git push' command transfers local commits to the designated remote repository (e.g. origin/main).",
        "explanation_th": "ใช้คำสั่ง 'git push' เพื่อคัดส่งประวัติงานทรานสเฟอร์จากเครื่องตัวเองดันขึ้นไปเก็บไว้ในเซิร์ฟเวอร์ส่วนกลาง"
      },
      {
        "question_en": "Which command fetches changes from a remote repository and immediately integrates them into the current active branch?",
        "question_th": "คำสั่งใดจะดึงข้อมูลการแก้ไขล่าสุดของคลังส่วนกลางลงมาและสั่งรวมเข้ากับกิ่งปัจจุบันในเครื่องให้ทันที?",
        "options": ["git fetch", "git pull", "git merge", "git update"],
        "correct_index": 1,
        "explanation_en": "The 'git pull' command is a shortcut that performs a 'git fetch' followed by a 'git merge' to bring local files up-to-date.",
        "explanation_th": "คำสั่ง 'git pull' เป็นคำสั่งย่อที่สั่งรัน 'git fetch' เพื่อตรวจสอบข่าวสารแล้วสั่งเอาโค้ดมารวม ('git merge') เข้าหาทันที"
      }
    ]
  },
  "lesson-git-03": {
    "questions": [
      {
        "question_en": "Which command displays the state of the working directory and the staging area, showing which files are modified or tracked?",
        "question_th": "คำสั่งใดใช้แสดงสถานะการทำงานปัจจุบันของโฟลเดอร์ไดเรกทอรีและจุดจัดเก็บ เพื่อตรวจสอบไฟล์ที่โดนแก้และไฟล์ที่ยังไม่ได้ติดตาม?",
        "options": ["git show", "git status", "git log", "git diff"],
        "correct_index": 1,
        "explanation_en": "The 'git status' command provides detailed status information about untracked, modified, and staged files.",
        "explanation_th": "ใช้คำสั่ง 'git status' สั่งเช็คสถานะการเข้าออกของไฟล์เพื่อแสดงความคืบหน้าว่าไฟล์ใดบ้างกำลังอยู่ในคิวรอการอนุมัติ"
      },
      {
        "question_en": "Which command displays the commit history log of the current branch in chronological order?",
        "question_th": "คำสั่งใดใช้พ่นรายงานประวัติชิ้นงานที่เคย Commit ทั้งหมดของกิ่งปัจจุบันตามการจัดเรียงลำดับวันและเวลา?",
        "options": ["git history", "git status", "git log", "git branch"],
        "correct_index": 2,
        "explanation_en": "The 'git log' command lists the details of past commits, including authors, hashes, dates, and messages.",
        "explanation_th": "ใช้คำสั่ง 'git log' เพื่อให้โปรแกรมเรียงลำดับประวัติ Commit ตั้งแต่อดีตแสดงออกมาให้ตรวจดูรายชื่อผู้เขียนและบันทึกข้อความ"
      },
      {
        "question_en": "What is the function of the 'git branch' command when executed without additional arguments?",
        "question_th": "ผลลัพธ์การพิมพ์คำสั่ง 'git branch' โดยไม่ใส่พารามิเตอร์ใดๆ เพิ่มเติมจะแสดงข้อมูลเรื่องใด?",
        "options": [
          "It deletes the current branch.",
          "It lists all local branches in the repository, highlighting the active one.",
          "It creates a new branch named 'branch'.",
          "It downloads branches from GitHub."
        ],
        "correct_index": 1,
        "explanation_en": "Running 'git branch' displays the list of branches present in the local repository, placing an asterisk next to the current active branch.",
        "explanation_th": "จะพ่นรายการกิ่งก้านการพัฒนาโค้ด (Branch) ทั้งหมดที่มีอยู่ภายในเครื่องตัวเองพร้อมแปะดาวระบุกิ่งที่กำลังทำงานอยู่"
      },
      {
        "question_en": "Which command is used to switch from the current branch to another branch (e.g., 'feature-testing')?",
        "question_th": "คำสั่งใดใช้สลับจากกิ่งปัจจุบันที่ทำงานอยู่เพื่อเปลี่ยนสิทธิ์ไปเขียนโค้ดในกิ่งอื่น (เช่น กิ่ง 'feature-testing')?",
        "options": [
          "git switch feature-testing (or git checkout feature-testing)",
          "git move feature-testing",
          "git merge feature-testing",
          "git branch feature-testing"
        ],
        "correct_index": 0,
        "explanation_en": "The 'git switch <branch-name>' (or legacy 'git checkout') command changes the active working branch in Git.",
        "explanation_th": "ใช้คำสั่ง 'git switch feature-testing' (หรือคำสั่งแบบเดิม 'git checkout') ในการสั่งหันเหไดเรกทอรีเปลี่ยนกิ่งเขียนโปรแกรม"
      },
      {
        "question_en": "Which command shows the line-by-line differences between modified files in the working directory and the index?",
        "question_th": "คำสั่งใดแสดงความเคลื่อนไหวระดับบรรทัดเปรียบเทียบชี้ข้อแตกต่างระหว่างสิ่งที่กำลังแก้ไขในโฟลเดอร์และบันทึกอ้างอิง?",
        "options": ["git diff", "git show", "git status", "git compare"],
        "correct_index": 0,
        "explanation_en": "The 'git diff' command shows the differences between unstaged modifications and the staged/committed state.",
        "explanation_th": "คำสั่ง 'git diff' จะทำการผ่าแสดงสัญลักษณ์บวกและลบเพื่อระบุรายละเอียดของจุดโค้ดที่มีการเขียนเข้าหรือลบทิ้งเปรียบเทียบ"
      }
    ]
  },
  "lesson-git-04": {
    "questions": [
      {
        "question_en": "What is a Git Merge Conflict?",
        "question_th": "ข้อขัดแย้งในการรวมไฟล์ในระบบ Git (Git Merge Conflict) หมายถึงอะไร?",
        "options": [
          "An authentication error when pushing to GitHub.",
          "An event when Git cannot automatically resolve differences in code edits made by different people to the same line in a file.",
          "A routing loop on network switches.",
          "A hardware failure on the computer's hard drive."
        ],
        "correct_index": 1,
        "explanation_en": "A merge conflict occurs when two branches modify the same line of a file in different ways, and Git cannot decide which change is correct.",
        "explanation_th": "คือการชนกันของข้อมูลเมื่อคนสองคนเขียนโค้ดทับบรรทัดของไฟล์เดียวกันต่างกัน จนตัวโปรแกรมไม่สามารถรวมให้อัตโนมัติได้"
      },
      {
        "question_en": "How does Git represent conflicting sections inside a file during a merge conflict?",
        "question_th": "Git จะแปะทำเครื่องหมายสัญลักษณ์ระบุพื้นที่ชนกันขัดแย้งของข้อมูลอย่างไรภายในไฟล์ที่เกิดปัญหา?",
        "options": [
          "It encrypts the entire file.",
          "It inserts conflict markers, such as <<<<<<<, =======, and >>>>>>>.",
          "It automatically deletes the conflicting file.",
          "It marks the file red in the file system."
        ],
        "correct_index": 1,
        "explanation_en": "Git inserts visual conflict markers: '<<<<<<<' marks the current branch's changes, '=======' separates the changes, and '>>>>>>>' marks the incoming branch's changes.",
        "explanation_th": "Git จะแนบเครื่องหมายสัญลักษณ์พิเศษเพื่อบอกจุดชน ได้แก่ '<<<<<<<' แยกตัวด้วย '=======' และขีดเส้นใต้เขตขัดแย้งปลายสุดด้วย '>>>>>>>'"
      },
      {
        "question_en": "What is the correct workflow to resolve a Git merge conflict?",
        "question_th": "กระบวนการขั้นตอนปฏิบัติที่ถูกต้องที่สุดในการคลี่คลายข้อขัดแย้งการชนกันของโค้ดคือข้อใด?",
        "options": [
          "Delete the Git repository and clone it again.",
          "Open the conflicting file, edit the conflict markers out manually selecting the desired code, add the file to staging, and commit.",
          "Run 'git push' with the force flag.",
          "Use standard windows explorer copy-paste."
        ],
        "correct_index": 1,
        "explanation_en": "To resolve conflicts: open the affected files, resolve differences, delete the conflict markers, run 'git add', and commit the resolution.",
        "explanation_th": "ผู้ดูแลต้องเปิดไฟล์ตัวปัญหา เลือกเคลียร์ตัดบรรทัดรอยชนและสัญลักษณ์ออกด้วยมือให้เหลือเพียงโค้ดชุดที่ถูกต้อง สั่ง 'git add' และทำการ commit"
      },
      {
        "question_en": "Which command aborts the current merge process and returns the working directory to the pre-merge state?",
        "question_th": "คำสั่งใดใช้ยกเลิกการควบรวมไฟล์ระหว่างดำเนินการเพื่อดึงสภาพแวดล้อมระบบให้ย้อนกลับสู่จุดเริ่มต้นก่อนสั่ง Merge?",
        "options": ["git merge --abort", "git reset --hard", "git rollback", "git abort"],
        "correct_index": 0,
        "explanation_en": "The 'git merge --abort' command stops the merge and attempts to restore the working directory state back to before the merge command.",
        "explanation_th": "ป้อนคำสั่ง 'git merge --abort' เพื่อยกเลิกภารกิจการจัดเตรียมไฟล์ขัดแย้งและหักลบกระบวนการ Merge ทิ้งไปทั้งหมด"
      },
      {
        "question_en": "Can you commit a file containing merge conflict markers (like '<<<<<<<') directly without resolving the conflict?",
        "question_th": "คุณสามารถสั่ง Commit ไฟล์ที่ยังมีเครื่องหมายสัญลักษณ์ชนกันของโค้ด (เช่น '<<<<<<<') ค้างอยู่เข้าคลังตรงๆ ได้เลยหรือไม่?",
        "options": [
          "Yes, Git allows it without warning.",
          "No, although you can technically commit it, it is a bad practice and will break code compilation and testing.",
          "Yes, but only if you use the force command.",
          "No, Git blocks the commit command completely."
        ],
        "correct_index": 1,
        "explanation_en": "While Git will permit committing the file, the conflict markers are plain text. Committing them directly will cause syntax errors and break build compilations.",
        "explanation_th": "ทางเทคนิคทำได้ แต่นับเป็นพฤติกรรมที่ไม่พึงประสงค์อย่างยิ่ง เพราะเครื่องหมายป้ายสัญลักษณ์จะยังค้างอยู่ในไฟล์ส่งผลให้สคริปต์คอมไพล์ไม่ผ่าน"
      }
    ]
  }
};
