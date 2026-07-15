export const quizzesPart4 = {
  "lesson-git-05": {
    "questions": [
      {
        "question_en": "What does CI/CD stand for in modern software and network automation workflows?",
        "question_th": "คำย่อ CI/CD ในการพัฒนาซอฟต์แวร์และการทำงานเครือข่ายอัตโนมัติย่อมาจากคำศัพท์ในข้อใด?",
        "options": [
          "Continuous Integration / Continuous Deployment (or Delivery)",
          "Configuration Inspection / Command Delivery",
          "Centralized Infrastructure / Controller Distribution",
          "Code Isolation / Command Diagnostics"
        ],
        "correct_index": 0,
        "explanation_en": "CI/CD stands for Continuous Integration (merging and building code) and Continuous Deployment or Delivery (automating deployments).",
        "explanation_th": "CI/CD ย่อมาจาก Continuous Integration (การรวมโค้ดและทดสอบสม่ำเสมอ) และ Continuous Delivery/Deployment (การจัดส่งหรือติดตั้งใช้งานอัตโนมัติ)"
      },
      {
        "question_en": "What is the primary benefit of applying CI/CD pipelines to network configuration changes?",
        "question_th": "ประโยชน์สูงสุดของการนำกระบวนการ CI/CD (Pipeline) มาใช้กับการปรับปรุงค่าคอนฟิกอุปกรณ์เครือข่ายคืออะไร?",
        "options": [
          "It eliminates the need for routers.",
          "It ensures changes are automatically tested, validated, and linted in a simulator/lab before pushing to production, reducing manual errors.",
          "It makes the network connections wireless.",
          "It lowers the electricity usage of switch hardware."
        ],
        "correct_index": 1,
        "explanation_en": "CI/CD pipelines automate testing, linting, and dry-run syntax checks, preventing misconfigured templates from causing outages in production networks.",
        "explanation_th": "ช่วยให้คำสั่งการแก้ไขเครือข่ายผ่านการจำลองทดสอบ ตรวจความถูกต้องของไวยากรณ์ และรันอัตโนมัติก่อนส่งขึ้นอุปกรณ์จริงเพื่อลดการผิดพลาดจากมนุษย์"
      },
      {
        "question_en": "In Git-based CI/CD workflows, what triggers the execution of a pipeline?",
        "question_th": "ในระบบการทำงานแบบ Git-based CI/CD สิ่งใดคือสิ่งกระตุ้น (Trigger) ให้ชุดกระบวนการเริ่มทำงาน?",
        "options": [
          "A manual power cycle of the router.",
          "Events such as pushing code commits to a branch or opening a pull request.",
          "Writing a text comment inside a python script.",
          "Weekly scheduling only."
        ],
        "correct_index": 1,
        "explanation_en": "Pipelines are triggered by version control events, such as pushing commits, merging branches, or creating pull requests.",
        "explanation_th": "ทริกเกอร์ในการรันเริ่มจากการทำงานของ Git (Git Events) เช่น การดันโค้ดขึ้นคลังส่วนกลาง (git push) หรือตอนเปิดด่านขอรวมไฟล์ (Pull Request)"
      },
      {
        "question_en": "What tool or service is commonly used to host and execute CI/CD pipelines?",
        "question_th": "เครื่องมือหรือผู้บริการแพลตฟอร์มใดที่นิยมนำมาใช้งานหลักในการจัดเก็บและสั่งรันกระบวนการทำงานแบบ CI/CD?",
        "options": ["Ansible inventory", "GitHub Actions / GitLab CI/CD", "Wireshark", "Postman request builder"],
        "correct_index": 1,
        "explanation_en": "GitHub Actions, GitLab CI/CD, Jenkins, and Travis CI are popular automation engines that execute pipeline workflows.",
        "explanation_th": "GitHub Actions และ GitLab CI/CD คือตัวขับเคลื่อนหลักที่คอยสร้างและรันไปป์ไลน์ทดสอบตามโจทย์ที่ตั้งไว้"
      },
      {
        "question_en": "In a network CI/CD pipeline, what is the purpose of a 'dry-run' or 'check' phase?",
        "question_th": "วัตถุประสงค์ของขั้นตอนการจำลองสถานการณ์จริง (Dry-run/Check) ในกระบวนการ CI/CD คืออะไร?",
        "options": [
          "To delete the backup configuration on the router.",
          "To simulate configuration changes and verify syntax without actually modifying the device's running state.",
          "To format the local computer hard drive.",
          "To authenticate the user credentials."
        ],
        "correct_index": 1,
        "explanation_en": "Dry-run/Check modes (like `ansible-playbook --check`) verify syntax and preview changes on routers without pushing modifications, preventing unintended outages.",
        "explanation_th": "เป็นการทดลองรันคำสั่งจำลองเพื่อวิเคราะห์ความถูกต้องของไวยากรณ์ โดยจะไม่มีการเขียนค่าลงหน่วยความจำจริงของอุปกรณ์เราเตอร์"
      }
    ]
  },
  "lesson-python-01": {
    "questions": [
      {
        "question_en": "What type of programming language is Python?",
        "question_th": "ภาษา Python จัดอยู่ในประเภทภาษาเขียนโปรแกรมแบบใด?",
        "options": [
          "Compiled assembly language.",
          "High-level, interpreted programming language known for readability.",
          "Low-level hardware design language.",
          "Pure markup script language."
        ],
        "correct_index": 1,
        "explanation_en": "Python is an interpreted, high-level language designed with readability and simplicity in mind, widely used in automation.",
        "explanation_th": "Python เป็นภาษาระดับสูงที่มีตัวแปลชนิดอินเทอร์พรีเตอร์ (Interpreted) โครงสร้างโค้ดถูกออกแบบมาให้อ่านทำความเข้าใจง่าย"
      },
      {
        "question_en": "What data type in Python stores an ordered collection of items that is mutable?",
        "question_th": "ประเภทข้อมูล (Data type) ใดใน Python ที่ใช้เก็บรวบรวมข้อมูลตามลำดับที่สามารถปรับแต่งแก้ไขค่าได้ (Mutable)?",
        "options": ["Tuple", "List", "Dictionary", "String"],
        "correct_index": 1,
        "explanation_en": "Lists in Python are ordered and mutable collections, defined using square brackets `[]`.",
        "explanation_th": "List เป็นประเภทข้อมูลที่เรียงลำดับดัชนี สามารถเพิ่ม ลบ หรือแก้ไขสมาชิกภายในได้ ประกาศใช้ด้วยวงเล็บเหลี่ยม `[]`"
      },
      {
        "question_en": "Which Python data type stores key-value pairs and is ideal for representing network device details (like IP and hostname)?",
        "question_th": "ประเภทข้อมูลในข้อใดที่เก็บข้อมูลเป็นคู่คีย์และมูลค่า (Key-value pairs) เหมาะสำหรับจัดระเบียบคุณสมบัติอุปกรณ์เครือข่าย?",
        "options": ["List", "Dictionary", "Set", "Tuple"],
        "correct_index": 1,
        "explanation_en": "Dictionaries store key-value pairs (using `{}`) and allow quick lookups, making them perfect for holding device configuration variables.",
        "explanation_th": "Dictionary (เขียนแทนด้วยปีกกา `{}`) เก็บข้อมูลแบบคู่กุญแจและค่า (Key-Value) เหมาะมากในการทำตารางระบุสเปกอุปกรณ์ไอที"
      },
      {
        "question_en": "What is the correct syntax to define a function in Python?",
        "question_th": "รูปแบบไวยากรณ์ (Syntax) ในการประกาศสร้างฟังก์ชันในภาษา Python ข้อใดถูกต้อง?",
        "options": [
          "function myFunction():",
          "def myFunction():",
          "void myFunction() {}",
          "define myFunction:"
        ],
        "correct_index": 1,
        "explanation_en": "Functions in Python are defined using the `def` keyword followed by the function name, parentheses, and a colon.",
        "explanation_th": "การสร้างฟังก์ชันจะเริ่มต้นด้วยคีย์เวิร์ด `def` ตามด้วยชื่อฟังก์ชัน วงเล็บ และปิดท้ายด้วยเครื่องหมายโคลอน `:`"
      },
      {
        "question_en": "How does Python define blocks of code (such as inside a loop or function)?",
        "question_th": "ภาษา Python ใช้สิ่งใดในการจัดแบ่งอาณาเขตหรือขอบเขตบล็อกโค้ด (เช่น โค้ดในคำสั่งวนลูปหรือฟังก์ชัน)?",
        "options": ["Curly braces `{}`", "Indentation (whitespace/tabs)", "Semicolons `;`", "Parentheses `()`"],
        "correct_index": 1,
        "explanation_en": "Python uses indentation (standard is 4 spaces) rather than curly braces or brackets to define code blocks.",
        "explanation_th": "Python ใช้การย่อหน้า (Indentation) ด้วยการเว้นวรรคหรือปุ่ม Tab เป็นตัวระบุบล็อกและโครงสร้างขอบเขต ไม่ใช้ปีกกา `{}`"
      }
    ]
  },
  "lesson-python-02": {
    "questions": [
      {
        "question_en": "What is Netmiko?",
        "question_th": "Netmiko คืออะไรในระบบการทำเครือข่ายอัตโนมัติ?",
        "options": [
          "A virtual router simulator.",
          "A multi-vendor Python library built on Paramiko that simplifies SSH connections to network devices.",
          "A network monitoring tool.",
          "A Cisco IOS operating system."
        ],
        "correct_index": 1,
        "explanation_en": "Netmiko is a popular Python library designed to simplify SSH management of network devices across diverse vendors.",
        "explanation_th": "เป็นไลบรารีในภาษา Python ที่พัฒนาต่อยอดมาจาก Paramiko ช่วยลดความยากในการสั่งการเชื่อมโยงระบบ SSH เข้าไปยังเราเตอร์ค่ายต่างๆ"
      },
      {
        "question_en": "Which Netmiko method is used to execute a read-only show command on a router?",
        "question_th": "เมธอด (Method) ใดของ Netmiko ที่ใช้ในการส่งคำสั่งขอดูข้อมูลแบบอ่านอย่างเดียว (เช่น คำสั่ง show)?",
        "options": ["send_config_set()", "send_command()", "send_show_command()", "execute_cmd()"],
        "correct_index": 1,
        "explanation_en": "The 'send_command()' method is used to send operational/read-only commands (like 'show ip interface brief') and returns the output as a string.",
        "explanation_th": "เมธอด 'send_command()' ใช้สั่งส่งคำสั่งควบคุมการทำงานปกติของ CLI (เช่น คำสั่ง show) และคืนข้อมูลตอบกลับมาเป็นข้อความปกติ"
      },
      {
        "question_en": "Which Netmiko method is used to push configuration changes to a router?",
        "question_th": "เมธอด (Method) ใดของ Netmiko ที่ใช้ส่งคำสั่งเพื่อปรับเปลี่ยนแก้ไขการตั้งค่าคอนฟิกบนตัวเราเตอร์?",
        "options": ["send_command()", "send_config_set()", "write_configuration()", "push_config()"],
        "correct_index": 1,
        "explanation_en": "The 'send_config_set()' method accepts a list of configuration commands and automatically enters/exits configuration mode on the device.",
        "explanation_th": "เมธอด 'send_config_set()' จะรับชุดอาร์กิวเมนต์เป็นรายการคำสั่งคอนฟิก และเปลี่ยนโหมดเข้าสู่คอนฟิกให้เองโดยอัตโนมัติ"
      },
      {
        "question_en": "What argument must be specified in Netmiko's ConnectHandler to identify the target operating system (e.g., Cisco IOS)?",
        "question_th": "อาร์กิวเมนต์ที่สำคัญยิ่งชนิดใดใน ConnectHandler ของ Netmiko ที่ใช้บอกประเภทระบบปฏิบัติการปลายทาง (เช่น Cisco IOS)?",
        "options": ["os_name", "device_type", "platform", "system_type"],
        "correct_index": 1,
        "explanation_en": "The 'device_type' argument (e.g. 'cisco_ios') must be defined so Netmiko knows how to handle prompt detection and session interactions.",
        "explanation_th": "ต้องระบุตัวแปร 'device_type' (เช่น ค่า 'cisco_ios') เพื่อให้ระบบเข้าใจตัวรับข้อความและลักษณะการรอตอบกลับ"
      },
      {
        "question_en": "Does Netmiko automatically save changes to startup configuration after executing configuration commands?",
        "question_th": "Netmiko จะจัดเก็บเซฟบันทึกค่าลงใน Startup Configuration (เช่น คำสั่ง write memory) ให้โดยอัตโนมัติหลังคอนฟิกเสร็จหรือไม่?",
        "options": [
          "Yes, it always saves changes.",
          "No, you must explicitly call the 'send_config_set' or 'send_command' to run 'write memory' or use the 'save_config()' method.",
          "Yes, unless configured otherwise.",
          "No, saving is not supported in Netmiko."
        ],
        "correct_index": 1,
        "explanation_en": "Netmiko changes running-config but does not write to startup-config automatically. You must call 'save_config()' or send the save command explicitly.",
        "explanation_th": "ไม่โดยอัตโนมัติ Netmiko จะแก้เฉพาะ Running-config เท่านั้น ผู้ใช้งานต้องสั่งบันทึกถาวรเองหรือเรียกเมธอด 'save_config()'"
      }
    ]
  },
  "lesson-python-03": {
    "questions": [
      {
        "question_en": "What is NAPALM in network automation?",
        "question_th": "NAPALM ในเทคโนโลยีระบบเครือข่ายอัตโนมัติคืออะไร?",
        "options": [
          "A network scanning tool.",
          "An API-based Python library that provides a unified, cross-vendor interface for retrieving network state and managing configurations.",
          "A firewall operating system.",
          "A database query engine."
        ],
        "correct_index": 1,
        "explanation_en": "NAPALM (Network Automation and Programmability Abstraction Layer with Multi-vendor support) abstracts API/CLI commands into standard Python methods.",
        "explanation_th": "NAPALM เป็นไลบรารีใน Python ที่สร้างโครงสร้างครอบการเรียกใช้คำสั่ง (Abstraction layer) ทำให้โค้ดเดียวคุมเครื่องต่างค่ายได้ง่ายขึ้น"
      },
      {
        "question_en": "What is a major advantage of NAPALM over Netmiko for gathering device state details?",
        "question_th": "ข้อดีที่เด่นชัดของการเลือกใช้ NAPALM แทนที่จะใช้ Netmiko ในการเรียกสืบค้นข้อมูลประวัติหรือสภาพเครื่องคืออะไร?",
        "options": [
          "NAPALM is faster.",
          "NAPALM uses 'getters' that return standardized structured JSON data (dictionaries) across all supported vendors, rather than raw text.",
          "NAPALM supports wireless signals.",
          "NAPALM does not require an IP connection."
        ],
        "correct_index": 1,
        "explanation_en": "NAPALM getters (like `get_facts()`) parse device outputs automatically and return standardized Python dictionaries, eliminating manual regex parsing.",
        "explanation_th": "NAPALM มีฟังก์ชันเก็ตเตอร์ (Getters) ที่ดึงค่าตอบกลับแล้วจัดหมวดเรียงมาในรูปแบบไฟล์ดิชชั่นนารีของ Python ให้อัตโนมัติ"
      },
      {
        "question_en": "Which NAPALM method is used to retrieve basic system information from a device (such as serial number, model, and uptime)?",
        "question_th": "เมธอดใดของ NAPALM ที่ใช้ดึงค่าสารสนเทศพื้นฐานระบบจากตัวอุปกรณ์ (เช่น หมายเลขซีเรียล รุ่นสินค้า และเวลาที่รันระบบ)?",
        "options": ["get_system()", "get_facts()", "get_status()", "retrieve_info()"],
        "correct_index": 1,
        "explanation_en": "The 'get_facts()' method returns a dictionary containing hostname, model, serial number, OS version, and interface list.",
        "explanation_th": "เมธอด 'get_facts()' จะทำการคืนค่าคุณลักษณะของอุปกรณ์ เช่น ยี่ห้อ รุ่น ระบบ OS และเวลาตั้งแต่เปิดเครื่องทำงาน"
      },
      {
        "question_en": "In NAPALM, what is the purpose of the 'commit_config()' method?",
        "question_th": "ในระบบการจัดแจงของ NAPALM เมธอด 'commit_config()' มีเป้าหมายเพื่อทำอะไร?",
        "options": [
          "To discard current local changes.",
          "To apply the staged/merged configuration changes to the active running configuration of the device.",
          "To reboot the switch hardware.",
          "To authenticate the SSH session."
        ],
        "correct_index": 1,
        "explanation_en": "NAPALM supports configuration staging. Changes are uploaded to a staging buffer first, and 'commit_config()' writes them to active status.",
        "explanation_th": "ใช้เพื่อตกลงเริ่มเขียนข้อมูลที่พักสะสมไว้ในบัฟเฟอร์การแก้ไข (Staged config) ดันใส่ลงในการตั้งค่าใช้งานหลักของเครือข่ายจริง"
      },
      {
        "question_en": "Which NAPALM method discards loaded configurations that have not yet been committed?",
        "question_th": "เมธอดใดของ NAPALM ที่ใช้ยกเลิกยกยอดการแก้ไขทั้งหมดที่พึ่งอัปโหลดแต่ยังไม่ได้กดยืนยัน (Commit)?",
        "options": ["discard_config()", "rollback()", "cancel_changes()", "delete_config()"],
        "correct_index": 0,
        "explanation_en": "The 'discard_config()' method clears the staging buffer without modifying the device's running configuration.",
        "explanation_th": "เมธอด 'discard_config()' ล้างลบไฟล์เตรียมแก้ทิ้งไปเสียเพื่อไม่ให้ส่งผลเสียไปรบกวนค่าที่อุปกรณ์กำลังทำงานอยู่"
      }
    ]
  },
  "lesson-sec-01": {
    "questions": [
      {
        "question_en": "What is the primary role of a firewall in network security?",
        "question_th": "หน้าที่รับผิดชอบหลักของไฟร์วอลล์ (Firewall) ในด้านความปลอดภัยเครือข่ายคืออะไร?",
        "options": [
          "To assign IP addresses dynamically.",
          "To isolate and control traffic crossing network boundaries based on security rules.",
          "To act as a centralized file repository.",
          "To accelerate router CPU speeds."
        ],
        "correct_index": 1,
        "explanation_en": "Firewalls establish a barrier between trusted internal networks and untrusted external networks, filtering packet flows.",
        "explanation_th": "ไฟร์วอลล์ทำหน้าที่เป็นตัวคัดกรองขวางกั้นความปลอดภัยระหว่งทราฟฟิกข้อมูลภายในและเครือข่ายอินเทอร์เน็ตที่อันตรายภายนอก"
      },
      {
        "question_en": "What is a Packet Filtering Firewall?",
        "question_th": "ไฟร์วอลล์ประเภทคัดกรองแพ็กเก็ต (Packet Filtering Firewall) มีหลักการทำงานลักษณะใด?",
        "options": [
          "A firewall that inspects the application layer data.",
          "A stateless firewall that inspects individual packet headers (IP addresses and ports) in isolation.",
          "A firewall that prevents physical access to servers.",
          "A hardware component that increases line bandwidth."
        ],
        "correct_index": 1,
        "explanation_en": "Packet filtering firewalls examine packet headers (IPs, ports, protocol) without maintaining connection state, behaving like basic ACLs.",
        "explanation_th": "เป็นกลุ่มไฟร์วอลล์ไร้สถานะ (Stateless) ที่ส่องเช็คเฉพาะส่วนหัวของแพ็กเก็ตไอพีแยกตัวต่อตัวโดยไม่สนใจประวัติที่ผ่านมา"
      },
      {
        "question_en": "Which firewall type operates at Layer 7 of the OSI model and inspects application-specific payloads?",
        "question_th": "ไฟร์วอลล์ชนิดใดที่ทำงานอยู่ระดับ Layer 7 (Application) ของ OSI และสแกนเข้าไปตรวจสอบถึงเนื้อหาเฉพาะของตัวโปรแกรม?",
        "options": ["Packet Filtering Firewall", "Application Gateway (Proxy Firewall / WAF)", "Stateful Inspection Firewall", "Circuit-Level Gateway"],
        "correct_index": 1,
        "explanation_en": "Application Layer Firewalls (or proxies) inspect the actual payload of application protocols (like HTTP, FTP) to detect complex threats.",
        "explanation_th": "ไฟร์วอลล์ระดับแอปพลิเคชันหรือพร็อกซี (Application/Proxy Firewall) วิเคราะห์ลึกถึงเลเยอร์บนสุดส่องไฟล์ข้อมูล Payload ข้างใน"
      },
      {
        "question_en": "What does a Next-Generation Firewall (NGFW) incorporate that legacy firewalls do not?",
        "question_th": "ระบบไฟร์วอลล์ยุคใหม่ NGFW (Next-Generation Firewall) บรรจุความสามารถเสริมด้านใดที่แตกต่างจากรุ่นก่อนเก่า?",
        "options": [
          "Basic IP routing only.",
          "Deep packet inspection, application awareness, and integrated Intrusion Prevention Systems (IPS).",
          "Wireless access management.",
          "Half-duplex connectivity support."
        ],
        "correct_index": 1,
        "explanation_en": "NGFWs combine traditional firewall filtering with deep packet inspection (DPI), application intelligence, and anti-malware/IPS services.",
        "explanation_th": "NGFW รวมความสามารถเรื่องตรวจจับแอปพลิเคชัน (Application awareness) ระบบสแกนเชิงลึก (DPI) และป้องกันการเจาะระบบ (IPS)"
      },
      {
        "question_en": "In firewall design, what is a DMZ (Demilitarized Zone)?",
        "question_th": "DMZ (Demilitarized Zone) ในการจัดโซนความปลอดภัยของไฟร์วอลล์หมายถึงพื้นที่ส่วนใด?",
        "options": [
          "A highly secure room for IT administrators.",
          "A semi-trusted network segment hosting public-facing services (like web servers) isolated from the private LAN.",
          "An offline database backup segment.",
          "The main core internet backbone."
        ],
        "correct_index": 1,
        "explanation_en": "A DMZ is a physical or logical subnetwork that exposes external-facing services to the internet while isolating the internal private network.",
        "explanation_th": "เป็นวงเครือข่ายกึ่งสาธารณะเพื่อเอาไว้ให้เครื่องเซิร์ฟเวอร์เผยแพร่ (เช่น เว็บไซต์) โดยมีระบบคัดกรองขวางความเสี่ยงจากเน็ตเวิร์กภายใน"
      }
    ]
  },
  "lesson-sec-02": {
    "questions": [
      {
        "question_en": "How does a Stateful Inspection Firewall track active connections?",
        "question_th": "Stateful Inspection Firewall มีแนวทางในการติดตามเฝ้าดูความเคลื่อนไหวเซสชันเชื่อมต่อต่างๆ อย่างไร?",
        "options": [
          "By querying a DNS server.",
          "By maintaining a state table that records connection details (source/destination IPs, ports, and TCP handshake states).",
          "By blocking all UDP traffic.",
          "By analyzing physical cable voltages."
        ],
        "correct_index": 1,
        "explanation_en": "Stateful firewalls monitor TCP handshakes and connection states, recording them in a state table. Outbound requests permit responses dynamically.",
        "explanation_th": "จะรักษาบัญชีสถานะ (State Table) คอยจำข้อมูลแอดเดรสและพอร์ตคู่เซสชัน ทำให้อนุญาตทราฟฟิกขากลับได้หากเริ่มส่งจากวงใน"
      },
      {
        "question_en": "What is a key security advantage of Stateful Inspection over basic Packet Filtering?",
        "question_th": "ข้อดีทางเทคนิคความปลอดภัยที่เหนือกว่าอย่างเด่นชัดของระบบ Stateful Inspection เมื่อเทียบกับคัดกรองแพ็กเก็ตธรรมดาคืออะไร?",
        "options": [
          "Stateful inspection is slower, which prevents spam.",
          "It only permits inbound packets that belong to an active, established connection initiated from the inside network.",
          "It automatically encrypts the payload.",
          "It requires fewer CPU resources."
        ],
        "correct_index": 1,
        "explanation_en": "Stateful inspection dynamically permits return traffic. Any unsolicited inbound traffic not matching an entry in the state table is automatically blocked.",
        "explanation_th": "ช่วยบล็อกแพ็กเก็ตสวมรอยขาเข้าได้ดีเยี่ยม เพราะหากแอดเดรสนั้นไม่ได้อยู่ในประวัติที่มีการสร้างเซสชันติดต่อออกไป ก็จะไม่ยอมให้ผ่าน"
      },
      {
        "question_en": "During TCP connection tracking, which TCP flag combination marks the successful establishment of a connection in the state table?",
        "question_th": "ในการติดตามเซสชันเชื่อมต่อ ข้อมูลกลุ่มธงคีย์ (TCP Flags) ชุดใดที่ใช้บอกว่าเซสชันเชื่อมต่อในแบบ TCP บรรลุผลสำเร็จแล้วในตาราง?",
        "options": ["SYN only", "SYN-ACK followed by ACK", "RST-FIN", "PSH-URG"],
        "correct_index": 1,
        "explanation_en": "The three-way handshake (SYN, SYN-ACK, ACK) must complete to transition the state table entry to 'ESTABLISHED'.",
        "explanation_th": "ด่านทักทายสามด่านย่อย (SYN, SYN-ACK, ACK) จะต้องผ่านเกณฑ์ระบบลุล่วงครบทุกกระบวนการเซสชันจึงเปลี่ยนเป็นสถานะสำเร็จ"
      },
      {
        "question_en": "Does a Stateful Inspection Firewall need to inspect the application layer payload to perform basic connection tracking?",
        "question_th": "Stateful Inspection Firewall จำเป็นต้องสแกนส่องไฟล์ไปจนถึงระดับเลเยอร์แอปพลิเคชัน (L7 Payload) หรือไม่ในการทำหน้าที่คุมเซสชันปกติ?",
        "options": [
          "Yes, it must always inspect Layer 7.",
          "No, it primarily tracks parameters at the network and transport layers (IPs, TCP/UDP ports, sequence numbers).",
          "Yes, but only for ICMP traffic.",
          "No, it only operates at Layer 1."
        ],
        "correct_index": 1,
        "explanation_en": "Traditional stateful inspection operates up to Layer 4 (Transport), tracking ports and TCP states without examining application payloads.",
        "explanation_th": "ไม่จำเป็น เนื่องจากความสามารถพื้นฐานสแกนสูงสุดถึงเพียงชั้นเลเยอร์ขนส่ง Layer 4 (TCP/UDP) ก็ชี้ช่องอนุมัติสถานะได้สมบูรณ์"
      },
      {
        "question_en": "What action does a stateful firewall take if a packet arrives from the internet with the ACK flag set, but no matching session exists in the state table?",
        "question_th": "ไฟร์วอลล์จะจัดการอย่างไรเมื่อได้รับแพ็กเก็ตจากภายนอกที่ปักธง ACK แต่กลับไม่พบประวัติเซสชันของข้อมูลชิ้นนี้ในตารางเลย?",
        "options": [
          "It permits the packet.",
          "It discards (drops) the packet as a potential spoofing attempt.",
          "It creates a new session in the state table.",
          "It forwards it to the default gateway."
        ],
        "correct_index": 1,
        "explanation_en": "Unsolicited packets claiming to be part of an active session (e.g. unsolicited ACK packets) are dropped as security violations.",
        "explanation_th": "จะสั่งทำลายทิ้งทันทีเนื่องจากประเมินว่าเป็นแพ็กเก็ตไม่ปลอดภัยที่ปลอมปักธงแฝงตัวพยายามจะผ่านกำแพงเข้ามาในเน็ตเวิร์ก"
      }
    ]
  },
  "lesson-sec002-01": {
    "questions": [
      {
        "question_en": "What is the primary function of a Virtual Private Network (VPN)?",
        "question_th": "หน้าที่หลักของการทำเครือข่ายเสมือนส่วนตัว (VPN) คืออะไร?",
        "options": [
          "To provide internet connections to computers without cables.",
          "To create a secure, encrypted connection (tunnel) over a public infrastructure like the Internet.",
          "To monitor employee web histories.",
          "To assign local DHCP IP addresses."
        ],
        "correct_index": 1,
        "explanation_en": "VPNs use cryptography to encapsulate and encrypt data, allowing users to send private traffic safely over public networks.",
        "explanation_th": "สร้างท่อข้อมูลเสมือนที่ได้รับการเข้ารหัส (Encryption) ส่งตรงข้ามโครงสร้างอินเทอร์เน็ตสาธารณะเสมือนเป็นสายเชื่อมตรงส่วนตัว"
      },
      {
        "question_en": "What type of VPN connects two permanent office sites (e.g., Headquarters and a Branch office) together securely?",
        "question_th": "VPN ประเภทใดที่ถูกออกแบบมาเพื่อเชื่อมโยงสำนักงานถาวรสองแห่ง (เช่น สำนักงานใหญ่และสำนักงานสาขา) เข้าหากันอย่างปลอดภัย?",
        "options": ["Remote Access VPN", "Site-to-Site VPN", "Clientless SSL VPN", "Dial-up VPN"],
        "correct_index": 1,
        "explanation_en": "A Site-to-Site VPN uses gateway routers or firewalls at each office location to establish a permanent secure link connecting the LANs.",
        "explanation_th": "Site-to-Site VPN ใช้เพื่อเชื่อมสำนักงานสองฝั่งผ่านเร้าเตอร์ขอบแดนถาวร อุปกรณ์ปลายทางภายในใช้งานได้โดยไม่ต้องมีโปรแกรมเสริม"
      },
      {
        "question_en": "What type of VPN allows individual teleworkers to connect securely to the corporate network from home or hotels?",
        "question_th": "VPN ประเภทใดที่อนุญาตให้พนักงานรายบุคคลเชื่อมต่อจากระยะไกล (เช่น จากบ้านหรือโรงแรม) เข้าหาเครือข่ายองค์กรได้อย่างปลอดภัย?",
        "options": ["Site-to-Site VPN", "Remote Access VPN", "Frame Relay VPN", "Point-to-Point serial link"],
        "correct_index": 1,
        "explanation_en": "Remote Access VPNs connect individual clients to a corporate VPN gateway using software installed on the client machine.",
        "explanation_th": "Remote Access VPN เหมาะให้พนักงานรันผ่านแอปพลิเคชันไคลเอนต์ (เช่น Cisco AnyConnect) เพื่อล็อกอินส่งท่อความปลอดภัยเฉพาะตัว"
      },
      {
        "question_en": "Which protocol suite is the industry standard for securing IP traffic at the Network Layer in a VPN tunnel?",
        "question_th": "ชุดโปรโตคอลมาตรฐานสากลใดที่นิยมนำมาใช้เป็นแกนหลักเพื่อป้องกันความปลอดภัยทราฟฟิกข้อมูล IP ในเลเยอร์เครือข่าย?",
        "options": ["SSL / TLS", "IPsec (IP Security)", "GRE", "PPP"],
        "correct_index": 1,
        "explanation_en": "IPsec (IP Security) is a suite of protocols configured at Layer 3 to provide encryption, data integrity, and authentication for VPNs.",
        "explanation_th": "IPsec (IP Security) เป็นกลุ่มมาตรฐานความปลอดภัยในเลเยอร์เน็ตเวิร์ก (Layer 3) มอบการเข้ารหัสและตรวจสอบข้อมูลครบถ้วน"
      },
      {
        "question_en": "What is the main limitation of GRE (Generic Routing Encapsulation) tunnels when used alone to connect branch offices?",
        "question_th": "ข้อจำกัดข้อสำคัญของการใช้ท่อ GRE (Generic Routing Encapsulation) เดี่ยวๆ เชื่อมสาขาโดยไม่มีโปรแกรมเสริมคือข้อใด?",
        "options": [
          "GRE does not support routing protocols.",
          "GRE has no built-in encryption or security features, meaning data is transmitted in plaintext.",
          "GRE is slower than Dial-up.",
          "GRE is proprietary to Cisco switches."
        ],
        "correct_index": 1,
        "explanation_en": "GRE encapsulates routing updates and multicast traffic but does not encrypt the payloads. It is commonly combined with IPsec for security.",
        "explanation_th": "GRE สามารถช่วยกรองทราฟฟิกและรองรับมัลติแคสต์ได้ดี แต่ไม่มีการเข้ารหัสข้อมูลในตัว ทราฟฟิกที่วิ่งผ่านท่อจึงยังเป็นข้อความดิบ"
      }
    ]
  },
  "lesson-sec002-02": {
    "questions": [
      {
        "question_en": "What are the three core security services provided by the IPsec framework?",
        "question_th": "บริการด้านความปลอดภัยหลัก 3 ประการที่เฟรมเวิร์ก IPsec มอบให้แก่การสื่อสารข้อมูลคืออะไร?",
        "options": [
          "Speed, Reliability, Connectivity",
          "Confidentiality (Encryption), Integrity, and Authentication",
          "Routing, Switching, Address Translation",
          "Access Control, Auditing, Administration"
        ],
        "correct_index": 1,
        "explanation_en": "IPsec guarantees confidentiality (via encryption), integrity (via hashing like SHA), and origin authentication.",
        "explanation_th": "IPsec ยืนยัน 3 สิทธิ์สำคัญ ได้แก่ การรักษาความลับ (Confidentiality) ความถูกต้องของข้อมูล (Integrity) และการยืนยันตัวตน (Authentication)"
      },
      {
        "question_en": "Which IPsec header protocol provides data encryption (confidentiality) for the payload?",
        "question_th": "โปรโตคอลส่วนหัว (Header protocol) ของ IPsec ตัวใดที่คอยทำหน้าที่เข้ารหัสข้อมูล (Confidentiality) ให้กับเนื้อความ?",
        "options": ["AH (Authentication Header)", "ESP (Encapsulating Security Payload)", "IKE (Internet Key Exchange)", "GRE"],
        "correct_index": 1,
        "explanation_en": "ESP (protocol 50) provides encryption and authentication for the payload, ensuring confidentiality. AH (protocol 51) only provides authentication and integrity.",
        "explanation_th": "ESP (Encapsulating Security Payload) ดูแลการเข้ารหัสพรางตาข้อมูลและตรวจสอบสิทธิ์ ส่วน AH จะไม่มีระบบการเข้ารหัสพรางข้อมูล"
      },
      {
        "question_en": "In which IPsec mode is the entire original IP packet encrypted and wrapped with a new IP header?",
        "question_th": "โหมดการทำงานของ IPsec แบบใดที่โครงสร้างแพ็กเก็ต IP ดั้งเดิมทั้งหมดจะถูกเข้ารหัสแล้วห่อทับด้วยส่วนหัว IP แผ่นใหม่?",
        "options": ["Transport Mode", "Tunnel Mode", "GRE Overload Mode", "Secure Mode"],
        "correct_index": 1,
        "explanation_en": "Tunnel Mode encrypts the entire original packet (payload and original header) and adds a new IP header, ideal for WAN links over the internet.",
        "explanation_th": "โหมดอุโมงค์ (Tunnel Mode) มักใช้เชื่อมต่อข้ามเน็ตเวิร์ก โดยเข้ารหัสตัวแพ็กเก็ตเดิมหมดจดแล้วประกบหัวส่งเส้นทางใหม่"
      },
      {
        "question_en": "What is the purpose of the Internet Key Exchange (IKE) protocol in IPsec VPNs?",
        "question_th": "วัตถุประสงค์ของโปรโตคอล IKE (Internet Key Exchange) ในระบบการทำ IPsec VPN คืออะไร?",
        "options": [
          "To route IP packets inside the tunnel.",
          "To dynamically negotiate security parameters (SAs) and securely exchange cryptographic keys.",
          "To monitor tunnel link speed.",
          "To assign IP addresses to VPN clients."
        ],
        "correct_index": 1,
        "explanation_en": "IKE handles peer authentication, negotiates encryption/hashing parameters, and manages the exchange of secret session keys.",
        "explanation_th": "IKE ทำหน้าที่ตกลงพารามิเตอร์การตั้งค่าความปลอดภัย (SA) และจัดการสลับแลกเปลี่ยนกุญแจเข้ารหัสลับระหว่างอุปกรณ์สองฝั่ง"
      },
      {
        "question_en": "Which algorithm is commonly used in IPsec to securely exchange cryptographic keys over an unsecure network?",
        "question_th": "อัลกอริทึมใดที่นิยมนำมาใช้งานร่วมกับ IPsec เพื่อแลกเปลี่ยนกุญแจลับในการเข้ารหัสอย่างปลอดภัยผ่านเครือข่ายอินเทอร์เน็ต?",
        "options": ["Diffie-Hellman (DH)", "MD5", "AES", "SHA-256"],
        "correct_index": 0,
        "explanation_en": "Diffie-Hellman (DH) key exchange allows two peers to establish a shared secret key over an unsecure medium.",
        "explanation_th": "อัลกอริทึม Diffie-Hellman (DH) ช่วยให้อุปกรณ์คู่สถานีสื่อสารสร้างกุญแจลับร่วมกันผ่านสายส่งที่ไม่ปลอดภัยได้สำเร็จ"
      }
    ]
  },
  "lesson-sec002-03": {
    "questions": [
      {
        "question_en": "What is the function of the Crypto ACL (Access Control List) in a Cisco router site-to-site IPsec VPN configuration?",
        "question_th": "ตาราง Crypto ACL ทำหน้าที่สำคัญอย่างไรในขั้นตอนคอนฟิกจับคู่ VPN แบบ Site-to-Site บนเราเตอร์ Cisco?",
        "options": [
          "To block hackers from accessing the router console.",
          "To define the specific traffic (interesting traffic) that must be encrypted and sent through the VPN tunnel.",
          "To assign private IP addresses to LAN hosts.",
          "To configure dynamic routing protocol updates."
        ],
        "correct_index": 1,
        "explanation_en": "Crypto ACLs match packets (interesting traffic) destined for the remote VPN network. Traffic matching 'permit' triggers tunnel negotiation and is encrypted.",
        "explanation_th": "Crypto ACL ใช้กำหนดกลุ่มข้อมูลที่ต้องเข้ารหัส (Interesting Traffic) หากข้อมูลตรงกติกาที่เลือกไว้จะกระตุ้นให้อุปกรณ์เริ่มยิงท่อสิทธิ์"
      },
      {
        "question_en": "What is the command to create an IKE Phase 1 policy on a Cisco IOS router?",
        "question_th": "คำสั่งตั้งต้นในการสร้างนโยบายความปลอดภัย IKE Phase 1 (ISAKMP) บนอุปกรณ์เราเตอร์ Cisco IOS คือข้อใด?",
        "options": [
          "crypto isakmp policy <priority>",
          "crypto ipsec transform-set <name>",
          "crypto map <name> <sequence>",
          "ike phase1 policy <priority>"
        ],
        "correct_index": 0,
        "explanation_en": "The command 'crypto isakmp policy <number>' enters the ISAKMP policy configuration mode to define Phase 1 encryption, hash, and DH parameters.",
        "explanation_th": "สั่งงานด้วยชุดคำสั่ง 'crypto isakmp policy <number>' เพื่อเริ่มระบุระดับค่านโยบายความปลอดภัยและเกณฑ์พิสูจน์สิทธิ์ของด่านแรก"
      },
      {
        "question_en": "What is configured in an IPsec Transform Set?",
        "question_th": "องค์ประกอบใดที่จะต้องกำหนดค่าไว้ในชุดเปลี่ยนผ่านข้อมูล (IPsec Transform Set)?",
        "options": [
          "The peer IP address and connection password.",
          "The encryption and authentication algorithms (like esp-aes and esp-sha-hmac) for Phase 2 data transit.",
          "The interface IP addresses.",
          "The OSPF cost parameters."
        ],
        "correct_index": 1,
        "explanation_en": "An IPsec transform set specifies the exact security protocols and algorithms (ESP encryption/hashing) to protect user data in Phase 2.",
        "explanation_th": "Transform Set ใช้กำหนดระบุชุดกลไกการเข้ารหัสพรางข้อมูลและแฮชความถูกต้อง (เช่น esp-aes, esp-sha-hmac) สำหรับขาส่งจริงใน Phase 2"
      },
      {
        "question_en": "Which configuration component binds the Crypto ACL, peer IP, and Transform Set together before being applied to a physical interface?",
        "question_th": "ส่วนประกอบคอนฟิกใดทำหน้าที่ควบรวมหัวข้อ Crypto ACL, IP คู่เป้าหมาย และ Transform Set เข้าด้วยกันเพื่อเอาไปพ่นผูกกับพอร์ตขาออก?",
        "options": ["ISAKMP Policy", "Crypto Map", "Tunnel Interface", "Security Association"],
        "correct_index": 1,
        "explanation_en": "A Crypto Map ties the interesting traffic (ACL), peer IP, and transform-set together. The map is then applied to the exit interface.",
        "explanation_th": "Crypto Map ทำหน้าที่รวบดึงเงื่อนไขทราฟฟิก คีย์ปลายทาง และตัวจัดส่งรวมมาไว้ที่จุดเดียวเพื่อเอาไปจับผูกติดไว้ที่พอร์ตอินเตอร์เฟสจริง"
      },
      {
        "question_en": "What is the verification command to check the status of IPsec Security Associations (SAs) active on a Cisco router?",
        "question_th": "คำสั่งสืบค้นประวัติเพื่อยืนยันสถานะความสำเร็จของท่อเชื่อมต่อ IPsec SA บนเราเตอร์ Cisco คือข้อใด?",
        "options": [
          "show crypto isakmp sa",
          "show crypto ipsec sa",
          "show crypto map active",
          "show ipsec tunnel status"
        ],
        "correct_index": 1,
        "explanation_en": "The command 'show crypto ipsec sa' displays the parameters of active Phase 2 IPsec SAs, including packets encrypted/decrypted.",
        "explanation_th": "คำสั่ง 'show crypto ipsec sa' ใช้ดูรายงานสรุปความคืบหน้าของเฟส 2 ซึ่งมีประวัติจำนวนตัวนับการเข้ารหัสและถอดรหัสของแพ็กเก็ตจริง"
      }
    ]
  },
  "lesson-sec002-04": {
    "questions": [
      {
        "question_en": "What is a major advantage of SSL VPNs over traditional IPsec VPNs for remote access users?",
        "question_th": "ข้อดีที่โดดเด่นของการเลือกใช้ระบบ SSL VPN แทนที่ระบบ IPsec VPN แบบเดิมในหมวดบริการพนักงานทางไกลคืออะไร?",
        "options": [
          "SSL VPNs do not require encryption.",
          "SSL VPNs can be clientless (running natively within standard web browsers) and easily traverse NAT/firewalls via HTTPS (port 443).",
          "SSL VPNs are developed by Cisco only.",
          "SSL VPNs run over serial cable interfaces."
        ],
        "correct_index": 1,
        "explanation_en": "SSL VPNs operate over TCP port 443 (HTTPS) which is almost always open in firewalls, and can support portal-based clientless access without client installs.",
        "explanation_th": "SSL VPN สื่อสารผ่านพอร์ต HTTPS 443 ซึ่งส่วนใหญ่เกตเวย์จะเปิดทิ้งไว้ให้อยู่แล้ว และสามารถเข้าใช้งานผ่านหน้าเบราว์เซอร์ได้ทันทีโดยไม่ต้องรันโปรแกรมเสริม"
      },
      {
        "question_en": "What is Cisco AnyConnect?",
        "question_th": "Cisco AnyConnect คือซอฟต์แวร์ประเภทใด?",
        "options": [
          "A virtual router simulator.",
          "A unified security client application used to establish secure remote access SSL or IPsec VPN tunnels to Cisco gateways.",
          "A database manager.",
          "A network cabling tool."
        ],
        "correct_index": 1,
        "explanation_en": "Cisco AnyConnect Secure Mobility Client is the application installed on user machines to establish full-tunnel SSL/IPsec VPNs.",
        "explanation_th": "เป็นโปรแกรมซอฟต์แวร์ไคลเอนต์ปลายทางที่ติดตั้งบนคอมพิวเตอร์พนักงานเพื่อทำการสร้างท่อ VPN เต็มพิกัดเชื่อมหาเกตเวย์ของ Cisco"
      },
      {
        "question_en": "What is the difference between Clientless SSL VPN and Client-based (Full-Tunnel) SSL VPN?",
        "question_th": "ความต่างระหว่างบริการระบบ Clientless SSL VPN และ Client-based (Full-Tunnel) คือข้อใด?",
        "options": [
          "Clientless requires installing Cisco AnyConnect; Client-based does not.",
          "Clientless only grants access to specific web resources via a browser portal; Client-based installs a virtual network adapter providing full network-level access.",
          "Clientless is more secure.",
          "Client-based only supports IPv6."
        ],
        "correct_index": 1,
        "explanation_en": "Clientless SSL VPN displays applications in a web portal. Client-based SSL VPN runs software to create a virtual NIC, routing all PC IP traffic through the tunnel.",
        "explanation_th": "Clientless จะจำกัดเข้าใช้เฉพาะเว็บแอปที่ผูกไว้บนพอร์ทัลเบราว์เซอร์ ส่วน Client-based จะลงการ์ดจอเสมือนทำให้พาสื่อสารได้ทุกโปรแกรมระดับไอพี"
      },
      {
        "question_en": "What transport-layer protocol and port does SSL/TLS VPN rely on by default?",
        "question_th": "โปรโตคอลระดับเลเยอร์ขนส่งและพอร์ตหมายเลขใดที่ระบบ VPN ในรูปแบบ SSL/TLS ยึดเกณฑ์สื่อสารเป็นหลัก?",
        "options": ["UDP Port 500", "TCP Port 443", "TCP Port 22", "UDP Port 4500"],
        "correct_index": 1,
        "explanation_en": "SSL/TLS VPNs utilize TCP port 443, sharing the same port as secure web traffic (HTTPS).",
        "explanation_th": "SSL/TLS VPN จะเรียกส่งข้อมูลผ่าน TCP พอร์ต 443 ซึ่งเป็นหมายเลขเดียวกับการเปิดหน้าเว็บไซต์แบบปลอดภัยปกติ (HTTPS)"
      },
      {
        "question_en": "What is a Split Tunneling configuration in remote access VPNs?",
        "question_th": "การตั้งค่าแยกท่อข้อมูล (Split Tunneling) ในคอนฟิกระบบ VPN ระยะไกลหมายถึงการทำงานแบบใด?",
        "options": [
          "Splitting a single physical link into two virtual switches.",
          "Allowing corporate-bound traffic to go through the VPN tunnel while general internet traffic goes directly out of the local gateway.",
          "Enforcing all computer traffic to traverse the VPN tunnel.",
          "Using two internet service providers simultaneously."
        ],
        "correct_index": 1,
        "explanation_en": "Split tunneling permits encrypting only company-destined traffic via the tunnel, allowing personal browsing to use the home internet directly, saving corporate bandwidth.",
        "explanation_th": "คือการแยกเส้นทางให้ทราฟฟิกเป้าหมายบริษัทวิ่งเข้าท่อลัด ส่วนการเปิดเล่นเน็ตทั่วไปให้ยิงออกอินเทอร์เน็ตบ้านตรงเพื่อประหยัดแบนด์วิดท์ฝั่งบริษัท"
      }
    ]
  },
  "lesson-ts002-01": {
    "questions": [
      {
        "question_en": "What is the first step in a structured network troubleshooting methodology?",
        "question_th": "ขั้นตอนแรกสุดตามทฤษฎีกระบวนการแก้ไขปัญหาเครือข่ายอย่างเป็นระบบคืออะไร?",
        "options": [
          "Replace the core switch hardware.",
          "Define / Identify the problem clearly by gathering symptoms.",
          "Reboot the router.",
          "Modify the OSPF cost values."
        ],
        "correct_index": 1,
        "explanation_en": "The troubleshooting loop starts with identifying the problem by gathering symptoms and isolating the scope of the fault.",
        "explanation_th": "ต้องระบุปัญหาและรวบรวมอาการขัดข้องเบื้องต้น (Define/Identify) เพื่อประเมินของเขตข้อเสียให้แน่ชัดก่อนเริ่มสุ่มทำสิ่งอื่น"
      },
      {
        "question_en": "Why is the 'Divide-and-Conquer' troubleshooting approach highly recommended?",
        "question_th": "ทำไมการแก้ไขปัญหาในแบบแนวทาง 'แบ่งแยกเพื่อแก้ไข' (Divide-and-Conquer) จึงได้รับการแนะนำอย่างยิ่ง?",
        "options": [
          "It uses fewer command lines.",
          "It allows you to start testing at a middle layer (e.g., Layer 3 or 4) to quickly isolate whether the issue lies in upper or lower layers.",
          "It requires no technical knowledge.",
          "It automatically fixes switch ports."
        ],
        "correct_index": 1,
        "explanation_en": "By testing at Layer 3 (ping), you can isolate: if successful, the issue is in layers 4-7; if unsuccessful, check layers 1-2, saving diagnostic time.",
        "explanation_th": "เพราะช่วยสกัดจุดเสียได้เร็วโดยเริ่มทดสอบจากเลเยอร์กลางๆ (เช่น ชั้นที่ 3) หากปิงผ่าน แปลว่าปัญหามักอยู่เลเยอร์บน หากปิงไม่ติด ก็ค่อยไปเช็คสายฟิสิคัล"
      },
      {
        "question_en": "Which troubleshooting strategy starts at OSI Layer 1 (Physical) and moves upward to Layer 7?",
        "question_th": "แนวทางการแก้ปัญหาเครือข่ายชนิดใดที่เริ่มต้นตรวจสอบจากระดับกายภาพ Layer 1 (สายเคเบิล/พอร์ตไฟ) ไล่เรียงขึ้นไปจนถึง Layer 7?",
        "options": ["Top-down approach", "Bottom-up approach", "Divide-and-conquer", "Follow-the-path"],
        "correct_index": 1,
        "explanation_en": "The bottom-up strategy verifies physical connections first (cables, link lights), then progresses layer-by-layer up the OSI stack.",
        "explanation_th": "แนวทางแบบจากล่างขึ้นบน (Bottom-up) เป็นการสแกนตรวจตั้งแต่สายแลนและการเช็คไฟลิงก์สถานะทางกายภาพก่อน แล้วค่อยขยับไปเช็ค Layer สูงขึ้น"
      },
      {
        "question_en": "What is the main benefit of the 'Follow-the-Path' troubleshooting technique?",
        "question_th": "ประโยชน์สำคัญของการแก้ไขจุดบกพร่องตามเทคนิคแบบ 'เดินตามรอยเส้นทาง' (Follow-the-Path) คือข้อใด?",
        "options": [
          "It ignores the OSI model entirely.",
          "It traces the actual physical and logical path of packets from source to destination, checking each hop.",
          "It updates the router software version.",
          "It bypasses firewalls dynamically."
        ],
        "correct_index": 1,
        "explanation_en": "Follow-the-path traces the hop-by-hop path of a packet (e.g. using traceroute), diagnosing interface configurations sequentially along the flow.",
        "explanation_th": "เป็นการสืบแกะรอยตามสายการเดินทางข้อมูล (เช่น ใช้ traceroute) เพื่อไปไล่เช็คความถูกต้องทีละอุปกรณ์ระหว่างทางจนถึงปลายทาง"
      },
      {
        "question_en": "What should you do immediately after successfully resolving a network issue?",
        "question_th": "ขั้นตอนที่ผู้ดูแลระบบต้องดำเนินการทันทีหลังคลี่คลายแก้ไขปัญหาเครือข่ายสำเร็จลุล่วงด้วยดีคือข้อใด?",
        "options": [
          "Shut down the active routers.",
          "Document the problem symptoms, root cause, and steps taken to resolve it for future reference.",
          "Delete the syslog files.",
          "Change the BGP AS numbers."
        ],
        "correct_index": 1,
        "explanation_en": "Documenting resolutions preserves knowledge, helps other team members solve similar issues, and maintains accurate system history.",
        "explanation_th": "ทำเอกสารสรุปอาการ จุดบกพร่อง และวิธีที่เราปราบจุดเสียเก็บไว้ (Document) เพื่อใช้ศึกษาอ้างอิงย้อนดูหากเกิดซ้ำอีกในอนาคต"
      }
    ]
  },
  "lesson-ts002-02": {
    "questions": [
      {
        "question_en": "What is the difference between 'show' and 'debug' commands on Cisco IOS devices?",
        "question_th": "ความต่างระหว่างการใช้งานคำสั่ง 'show' และคำสั่ง 'debug' บนอุปกรณ์ Cisco IOS คืออะไร?",
        "options": [
          "show modifies the config; debug does not.",
          "show displays static snapshots of configuration/state; debug provides real-time monitoring and event alerts as they occur, which consumes significant CPU resources.",
          "show requires administrator privileges; debug does not.",
          "They are identical commands."
        ],
        "correct_index": 1,
        "explanation_en": "Show commands present current database snapshots. Debug commands output real-time process details, but can cause CPU spikes and crashes if run on busy systems.",
        "explanation_th": "show จะดึงภาพนิ่งของสถานะระบบออกมาแสดง ส่วน debug เป็นการรายงานการทำงานสดๆ บน CPU ซึ่งจะกินทรัพยากรประมวลผลสูงมาก"
      },
      {
        "question_en": "What command is used to disable all active debug commands instantly on a Cisco router?",
        "question_th": "คำสั่งใดใช้ยกเลิกการรันคำสั่ง debug ทั้งหมดที่กำลังทำงานอยู่บนตัวเราเตอร์ให้หยุดทำงานทันที?",
        "options": ["undebug all (or no debug all)", "debug off", "stop debugging", "no debug"],
        "correct_index": 0,
        "explanation_en": "The shortcut 'undebug all' (or 'u all') immediately terminates all active debug outputs.",
        "explanation_th": "ใช้คำสั่งลัด 'undebug all' (หรือป้อนสั้นๆ 'u all') เพื่อเคลียร์คำสั่งสแกนดีบั๊กทั้งหมดที่รันคาอยู่ให้หยุดทำงานลงทันที"
      },
      {
        "question_en": "Why should you avoid running broad debug commands (like 'debug ip packet') on a high-traffic production router?",
        "question_th": "ทำไมวิศวกรจึงหลีกเลี่ยงการสั่งรัน debug ที่หว่านประมวลผลกว้าง (เช่น debug ip packet) บนเราเตอร์ใช้งานจริงที่มีทราฟฟิกสูง?",
        "options": [
          "It will delete the IP address configuration.",
          "It generates excessive console messages, which can overwhelm the router CPU and cause the device to crash.",
          "It disables the physical interfaces.",
          "It requires a software reboot."
        ],
        "correct_index": 1,
        "explanation_en": "Broad debugs generate CPU interrupts for every packet. On busy links, this will cause 100% CPU usage, locking out management and crashing services.",
        "explanation_th": "เพราะการสั่ง debug ทุกแพ็กเก็ตจะแย่งพลังประมวลผลของ CPU มาพ่นข้อความออกทางคอนโซล ส่งผลให้เราเตอร์ค้างและเน็ตเวิร์กสายนั้นล่มทันที"
      },
      {
        "question_en": "What command configures the router to display debug message outputs on an active SSH/Telnet terminal session?",
        "question_th": "คำสั่งใดสั่งการเราเตอร์ให้พ่นข้อความรายงาน debug หรือ log ออกมาแสดงบนหน้าจอควบคุมที่รีโมทผ่าน SSH/Telnet?",
        "options": ["logging console", "terminal monitor", "show logging", "logging monitor"],
        "correct_index": 1,
        "explanation_en": "By default, debug outputs only show on the physical console port. The 'terminal monitor' command redirects logs to virtual SSH/Telnet sessions.",
        "explanation_th": "ต้องใช้คำสั่ง 'terminal monitor' เพื่อขอให้ระบบช่วยดึงข้อความ debug ออกมาแสดงที่หน้าจอจำลอง (VTY) เพราะค่าเริ่มต้นจะโชว์แค่ที่สายต่อตรง Console"
      },
      {
        "question_en": "Which command displays the general status, logging buffer size, and configured syslog server destination details?",
        "question_th": "คำสั่งใดดึงรายงานสรุปผลการเก็บ log ขนาดบันทึกในบัฟเฟอร์ และไอพีของ Syslog Server ปลายทางออกมาให้สืบค้น?",
        "options": ["show logging", "show debug", "show history", "show syslog"],
        "correct_index": 0,
        "explanation_en": "The 'show logging' command outputs statistics about the logging setup, buffer status, and log messages stored in the local RAM buffer.",
        "explanation_th": "คำสั่ง 'show logging' แสดงสถานะระบบควบคุม log ปริมาณข้อความในบัฟเฟอร์ และบันทึกเหตุการณ์ประวัติล่าสุดในตัวอุปกรณ์"
      }
    ]
  },
  "lesson-ts002-03": {
    "questions": [
      {
        "question_en": "What is the primary benefit of sending syslog messages to a centralized Syslog Server?",
        "question_th": "ประโยชน์หลักของการส่งรายงานบันทึกเหตุการณ์เครือข่ายไปยังเครื่องเซิร์ฟเวอร์ Syslog ส่วนกลางคืออะไร?",
        "options": [
          "It increases the transmission speed of network cables.",
          "It provides centralized, permanent storage of events from all devices, allowing easier correlation, auditing, and log retention even if a device fails.",
          "It automatically encrypts target routers.",
          "It disables the need for administrative accounts."
        ],
        "correct_index": 1,
        "explanation_en": "Centralizing logs ensures event logs survive local hardware reboots/crashes, and allows security teams to correlate alerts across multiple nodes.",
        "explanation_th": "ช่วยรวบรวมประวัติเหตุการณ์ไว้ที่ส่วนกลางอย่างปลอดภัย เพื่อให้ทีมวิเคราะห์ประมวลความเกี่ยวโยงของความบกพร่องได้ง่ายและมีประวัติอยู่แม้ตัวระบบจะพัง"
      },
      {
        "question_en": "Which Cisco command is used to direct syslog messages to a central syslog server at IP 192.168.1.100?",
        "question_th": "คำสั่งใดของ Cisco ที่ใช้ส่งต่อประวัติบันทึกเหตุการณ์ (Syslog) ไปจัดเก็บบนเซิร์ฟเวอร์ส่วนกลางไอพี 192.168.1.100?",
        "options": [
          "logging 192.168.1.100 (or logging host 192.168.1.100)",
          "syslog-server 192.168.1.100",
          "ip logging server 192.168.1.100",
          "send logging 192.168.1.100"
        ],
        "correct_index": 0,
        "explanation_en": "The command 'logging <ip>' or 'logging host <ip>' in global configuration mode specifies a remote syslog collector server.",
        "explanation_th": "ในโหมด Global Config ให้ป้อนคำสั่ง 'logging 192.168.1.100' เพื่อระบุเป้าหมายเซิร์ฟเวอร์เก็บประวัติภายนอก"
      },
      {
        "question_en": "What command restricts the logs sent to a syslog server to only levels 0 through 4 (warnings and more severe)?",
        "question_th": "คำสั่งใดใช้จำกัดความรุนแรงของรายงานที่จะถูกคัดส่งไปที่เซิร์ฟเวอร์เฉพาะระดับความเสี่ยง 0 ถึง 4 (ระดับ Warning ขึ้นไป)?",
        "options": [
          "logging trap warnings",
          "logging trap 4 (or logging trap warnings)",
          "logging level warnings",
          "syslog filter level 4"
        ],
        "correct_index": 1,
        "explanation_en": "The 'logging trap <level-name | level-number>' command restricts sent logs to the specified severity level and higher (numerically lower). Warnings level is 4.",
        "explanation_th": "คำสั่ง 'logging trap 4' หรือคำว่า 'logging trap warnings' จะกรองส่งประวัติเฉพาะระดับความรุนแรงเลข 0-4 เพื่อไม่ให้ขยะข้อความทั่วไปรกระบบ"
      },
      {
        "question_en": "Why is configuring NTP crucial for analyzing syslog messages in a multi-device network?",
        "question_th": "เพราะเหตุใดการตั้งค่าบริการ NTP จึงมีความสำคัญอย่างสูงยิ่งในการวิเคราะห์รายงาน Syslog ในเครือข่ายที่มีอุปกรณ์จำนวนมาก?",
        "options": [
          "Syslog will not function without NTP.",
          "It ensures all logs share a synchronized, accurate timestamp, allowing administrators to correlate events across multiple devices chronologically.",
          "NTP compresses the size of log files.",
          "NTP automatically resolves DNS domains."
        ],
        "correct_index": 1,
        "explanation_en": "Without synchronized clocks, comparing logs from different routers to diagnose a network-wide event is nearly impossible because timestamp logs will disagree.",
        "explanation_th": "เพราะช่วยรับประกันความแม่นยำของเวลาที่เกิดเหตุ (Timestamp) บนอุปกรณ์ทุกชิ้น ทำให้วิศวกรเทียบดูลำดับวิกฤตของจุดเกิดเหตุได้ตรงกันช็อตต่อช็อต"
      },
      {
        "question_en": "What is the purpose of the 'service timestamps log datetime msec' command on Cisco devices?",
        "question_th": "คำสั่ง 'service timestamps log datetime msec' บนอุปกรณ์ Cisco มีประโยชน์อย่างไร?",
        "options": [
          "To speed up router boot times.",
          "To include precise date, time, and millisecond detail in syslog message timestamps.",
          "To configure time limit zones.",
          "To delete the logging buffer."
        ],
        "correct_index": 1,
        "explanation_en": "This command configures log messages to include high-resolution timestamps, showing date, time, down to millisecond accuracy, which is vital for debugging.",
        "explanation_th": "เป็นการตั้งค่าสั่งให้อุปกรณ์ระบุข้อมูลวัน เวลา ปี และหน่วยเศษของมิลลิวินาที (msec) ไปในหัวประวัติเพื่อให้สืบย้อนข้อมูลได้อย่างละเอียด"
      }
    ]
  },
  "lesson-ts002-04": {
    "questions": [
      {
        "question_en": "What is Cisco EEM (Embedded Event Manager)?",
        "question_th": "ฟังก์ชัน Cisco EEM (Embedded Event Manager) หมายถึงกลไกการทำงานประเภทใด?",
        "options": [
          "A tool to monitor switch CPU cooling fans.",
          "A powerful device feature that enables automation of tasks and recovery actions directly on the device in response to system events.",
          "A database manager.",
          "A protocol for physical port aggregation."
        ],
        "correct_index": 1,
        "explanation_en": "EEM is an on-device automation engine. It detects triggers (like syslog alerts, interface down, or timers) and executes configured CLI command scripts.",
        "explanation_th": "เป็นฟังก์ชันสคริปต์อัตโนมัติในตัวเราเตอร์ โดยเปิดให้ดักจับเหตุการณ์ (Event) แล้วสั่งงานแก้วิกฤตด้วย CLI สคริปต์เองได้ทันที"
      },
      {
        "question_en": "What are the two main components of an EEM applet?",
        "question_th": "สององค์ประกอบหลักพื้นฐานในการตั้งค่าโครงร่างโครงงานย่อยของ EEM (EEM Applet) คืออะไร?",
        "options": [
          "Source and Destination",
          "Event (trigger) and Action (commands to execute)",
          "Interface and Protocol",
          "Server and Client"
        ],
        "correct_index": 1,
        "explanation_en": "An EEM applet requires an 'event' definition (what triggers the script) and one or more 'action' statements (what commands to run).",
        "explanation_th": "ต้องการสองส่วน ได้แก่ ตัวสัญญากระตุ้นเริ่มงาน (Event trigger) และขั้นตอนชุดคำสั่งที่จะดำเนินการ (Action)"
      },
      {
        "question_en": "What is the purpose of SPAN (Switched Port Analyzer) in network monitoring?",
        "question_th": "วัตถุประสงค์ในการติดตั้งทำระบบ SPAN (Switched Port Analyzer) ในเครือข่ายสวิตช์คืออะไร?",
        "options": [
          "To merge multiple VLANs.",
          "To copy (mirror) traffic from source ports or VLANs to a destination port connected to an analyzer or packet sniffer (like Wireshark).",
          "To encrypt local traffic.",
          "To assign IP addresses to switches."
        ],
        "correct_index": 1,
        "explanation_en": "SPAN (Port Mirroring) copies traffic from monitored interfaces and forwards it to a destination port connected to a packet sniffer, without interrupting normal traffic flow.",
        "explanation_th": "ใช้สะท้อนสำเนาทราฟฟิก (Port Mirroring) จากพอร์ตเป้าหมายส่งออกมายังพอร์ตพิเศษที่ต่อเข้าคอมพิวเตอร์เพื่อเก็บวิเคราะห์แพ็กเก็ต (เช่น Wireshark)"
      },
      {
        "question_en": "What is the difference between SPAN and RSPAN?",
        "question_th": "ข้อแตกต่างระหว่างระบบ SPAN และ RSPAN คือข้อใด?",
        "options": [
          "SPAN is for Cisco; RSPAN is for Juniper.",
          "SPAN mirrors traffic locally on the same switch; RSPAN (Remote SPAN) mirrors traffic across multiple switches over a dedicated VLAN.",
          "SPAN is slower than RSPAN.",
          "RSPAN is wireless port mirroring."
        ],
        "correct_index": 1,
        "explanation_en": "SPAN is restricted to a single local switch. RSPAN mirrors traffic from source ports on one switch and transmits it across a designated RSPAN VLAN to a destination port on another switch.",
        "explanation_th": "SPAN ทำการสะท้อนข้อมูลอยู่ภายในอุปกรณ์ตัวเดียวกัน ส่วน RSPAN จะนำทราฟฟิกข้ามเครือข่ายสวิตช์หลายพอยต์ผ่านวง VLAN พิเศษที่แยกสิทธิ์ไว้"
      },
      {
        "question_en": "In a SPAN configuration on a Cisco switch, what does the 'session' command do?",
        "question_th": "ในการตั้งค่า SPAN บนสวิตช์ Cisco คำสั่ง 'session' มีบทบาทในการทำหน้าที่อะไร?",
        "options": [
          "It opens a remote web session.",
          "It defines the source ports/VLANs and the destination mirror port under a matching session ID.",
          "It automatically runs security auditing.",
          "It shuts down the switch interface."
        ],
        "correct_index": 1,
        "explanation_en": "The 'monitor session <id>' command is used to group source interfaces and destination mirroring ports in SPAN configurations.",
        "explanation_th": "คำสั่ง 'monitor session <id>' ใช้จับคู่และจัดกลุ่มรวมพอร์ตต้นทางและพอร์ตออกปลายทางของชุดกระจายสัญญาณสะท้อนข้อมูล"
      }
    ]
  },
  "lesson-ts005-01": {
    "questions": [
      {
        "question_en": "What does IP SLA stand for?",
        "question_th": "IP SLA ย่อมาจากคำศัพท์ในข้อใด?",
        "options": [
          "Internet Protocol Service Level Agreement",
          "IP Security Link Association",
          "Intelligent Protocol System Log Analyzer",
          "IP Speed Limit Authorization"
        ],
        "correct_index": 0,
        "explanation_en": "IP SLA stands for Internet Protocol Service Level Agreement, a feature in Cisco IOS to monitor network performance.",
        "explanation_th": "IP SLA ย่อมาจาก Internet Protocol Service Level Agreement ซึ่งเป็นฟีเจอร์ตรวจวัดคุณภาพบริการในเครือข่าย"
      },
      {
        "question_en": "What is the primary function of IP SLA?",
        "question_th": "หน้าที่หลักของระบบ IP SLA คือข้อใด?",
        "options": [
          "To automatically assign IP addresses.",
          "To actively generate traffic probes to measure network performance metrics such as latency, jitter, and packet loss.",
          "To encrypt WAN links.",
          "To manage routing tables."
        ],
        "correct_index": 1,
        "explanation_en": "IP SLA generates active traffic (like ICMP Echo, HTTP requests) to measure performance statistics between a router and a remote destination.",
        "explanation_th": "ทำหน้าที่ยิงทราฟฟิกตรวจสอบ (เช่น ส่ง ICMP Echo) เพื่อเก็บสถิติเรื่อง ความหน่วง ความผันผวน (Jitter) และข้อมูลตกหล่นข้ามโฮสต์"
      },
      {
        "question_en": "Which of the following is a common probe type used by IP SLA to verify link reachability?",
        "question_th": "ประเภทหัวข้อการยิงตรวจสอบ (Probe type) ยอดนิยมของ IP SLA ในการสืบสถานะสายเชื่อมต่ออินเทอร์เน็ตคือข้อใด?",
        "options": ["ICMP Echo (ping)", "HTTP Get", "UDP Jitter", "All of the above"],
        "correct_index": 3,
        "explanation_en": "IP SLA supports multiple probe types, including ICMP Echo, UDP Jitter, TCP Connect, and HTTP requests, to test various network layers.",
        "explanation_th": "IP SLA รองรับการส่งสเปกข้อมูลสืบค้นได้หลากประเภท ทั้งการปิงแบบ ICMP, UDP Jitter, และการดึงหน้าเว็บด้วย HTTP จึงถูกทุกข้อ"
      },
      {
        "question_en": "What Cisco command is used to configure an IP SLA operation number 10?",
        "question_th": "คำสั่งเริ่มต้นในการประกาศกำหนดค่ากลุ่มชุดงาน IP SLA หมายเลข 10 บนอุปกรณ์ Cisco คือข้อใด?",
        "options": [
          "ip sla 10",
          "crypto ip sla 10",
          "monitor ip sla 10",
          "service ip sla 10"
        ],
        "correct_index": 0,
        "explanation_en": "The global configuration command 'ip sla 10' starts the configuration of the IP SLA operation with ID 10.",
        "explanation_th": "ป้อนคำสั่ง 'ip sla 10' ในระดับโหมดการคอนฟิกรวมเพื่อเริ่มระบุกฎพารามิเตอร์ให้กับจ๊อบหมายเลข 10"
      },
      {
        "question_en": "How is an IP SLA operation executed and scheduled to run in Cisco IOS?",
        "question_th": "ชุดจ๊อบของ IP SLA จะเริ่มทำงานและตั้งเวลาตรวจระบบ (Schedule) ได้ด้วยการพิมพ์คำสั่งใด?",
        "options": [
          "ip sla schedule <operation-id> start-time now life forever",
          "ip sla start <operation-id>",
          "run ip sla <operation-id>",
          "service ip sla schedule <operation-id>"
        ],
        "correct_index": 0,
        "explanation_en": "The 'ip sla schedule' command defines when the SLA probe starts and how long it remains active (e.g. start-time now life forever).",
        "explanation_th": "ต้องใช้คำสั่ง 'ip sla schedule <id> start-time now life forever' เพื่อให้เริ่มยิงทดสอบทันทีและทำงานรันรอบไปเรื่อยๆ"
      }
    ]
  },
  "lesson-ts005-02": {
    "questions": [
      {
        "question_en": "What is a Track Object in Cisco IOS?",
        "question_th": "Track Object ในระบบปฏิบัติการ Cisco IOS หมายถึงตัวแปรข้อใด?",
        "options": [
          "A tool to track physical device inventory.",
          "A logical tracker that monitors the state of an IP SLA operation, routing state, or interface status and reports changes.",
          "An administrative user profile.",
          "A VLAN management tag."
        ],
        "correct_index": 1,
        "explanation_en": "Track Objects decouple features from direct triggers. They monitor interfaces or IP SLA results and toggle states (up/down) based on threshold metrics.",
        "explanation_th": "คือฟังก์ชันตรวจสอบเชิงตรรกะที่เฝ้าจับตามองสถานะของ IP SLA, พอร์ตอินเตอร์เฟส หรือเร้าติ้ง แล้วนำสถานะ (Up/Down) ไปชี้เป้าทำงานอื่น"
      },
      {
        "question_en": "How can you link a Track Object to a static route to provide automatic path failover?",
        "question_th": "คุณจะผูกเชื่อม Track Object เข้ากับตารางเส้นทางคงที่ (Static Route) เพื่อให้สลับก๊อกสำรองอัตโนมัติ (Failover) ได้ด้วยวิธีการใด?",
        "options": [
          "By configuring the static route inside the IP SLA config.",
          "By adding the 'track <object-number>' keyword to the 'ip route' command.",
          "By creating an EEM script only.",
          "By enabling RIPv2."
        ],
        "correct_index": 1,
        "explanation_en": "By configuring 'ip route <network> <mask> <gateway> track <id>', the static route is only installed in the routing table while the tracked object remains UP.",
        "explanation_th": "ทำโดยแนบคีย์เวิร์ด 'track <เลขแทร็ก>' ต่อท้ายคำสั่ง 'ip route' เพื่อให้ลบเส้นทางทิ้งไปชั่วคราวหากเป้าหมายนั้นพัง (Down)"
      },
      {
        "question_en": "If a tracked IP SLA probe detects that the primary internet connection is down, what happens to the associated static route configured with that track object?",
        "question_th": "หากแทร็กของ IP SLA พบว่าสายเชื่อมต่อเน็ตเส้นหลักเกิดขาดลง จะส่งผลอย่างไรต่อเส้นทางคงที่ (Static route) ที่ผูกติดกับแทร็กตัวนั้น?",
        "options": [
          "The route remains active but changes its IP address.",
          "The route is removed from the routing table, allowing a backup route with a higher AD to take over.",
          "The router shuts down automatically.",
          "The route is duplicated."
        ],
        "correct_index": 1,
        "explanation_en": "When the tracked SLA state changes to DOWN, the static route is pulled from the routing table. The backup path (e.g. floating static route) is then used.",
        "explanation_th": "เส้นทางดังกล่าวจะโดนดึงถอนออกจากตาราง Routing table ทันที ทำให้เส้นทางสำรองที่ AD สูงกว่าสลับขึ้นมาทำงานแทนที่ได้สำเร็จ"
      },
      {
        "question_en": "What is the command to configure Track Object number 1 to monitor the state of IP SLA operation 10?",
        "question_th": "คำสั่งใดสร้างตัวตรวจจับ Track Object หมายเลข 1 เพื่อคอยเฝ้าเช็คประเมินผลจ๊อบ IP SLA หมายเลข 10?",
        "options": [
          "track 1 ip sla 10 state",
          "track 1 ip sla 10 reachability",
          "monitor track 1 ip sla 10",
          "ip sla track 1 10"
        ],
        "correct_index": 1,
        "explanation_en": "The command 'track 1 ip sla 10 reachability' (or state) creates a tracking process mapping to the reachability of the SLA operation.",
        "explanation_th": "ใช้คำสั่ง 'track 1 ip sla 10 reachability' เพื่อผูกพฤติกรรมการมีตัวตนและความพร้อมดึงข้อมูลของ SLA 10 เข้ากับแทร็ก 1"
      },
      {
        "question_en": "Which command is used to display the current state and history statistics of all track objects configured on a Cisco router?",
        "question_th": "คำสั่งใดที่ใช้เปิดสืบดูสถานะการอัปเดตและประวัติรายงานความเคลื่อนไหวของทุก Track Object ในเร้าเตอร์?",
        "options": ["show track", "show ip sla statistics", "show monitor status", "show ip route track"],
        "correct_index": 0,
        "explanation_en": "The command 'show track' lists all configured tracking objects, their current status (UP/DOWN), and transition times.",
        "explanation_th": "คำสั่ง 'show track' จะคอยแจงข้อมูลสรุปของตัวจับทั้งหมดในระบบรวมถึงระยะเวลาเปลี่ยนรอบอัปเดต UP/DOWN"
      }
    ]
  },
  "lesson-wireshark-01": {
    "questions": [
      {
        "question_en": "What is Wireshark?",
        "question_th": "Wireshark คือโปรแกรมเครื่องมือประเภทใดในระบบคอมพิวเตอร์?",
        "options": [
          "A computer virus scanner.",
          "An open-source packet analyzer used for network troubleshooting, analysis, and protocol education.",
          "A command-line text editor.",
          "A virtual switch simulator."
        ],
        "correct_index": 1,
        "explanation_en": "Wireshark is the industry-standard GUI network packet sniffer and protocol analyzer.",
        "explanation_th": "Wireshark เป็นโปรแกรมโอเพ่นซอร์สใช้สอยสำหรับดักจับและแกะอ่านวิเคราะห์โครงสร้างข้อมูลในระดับแพ็กเก็ต (Packet analyzer)"
      },
      {
        "question_en": "What library must be installed alongside Wireshark on Windows to capture network interface packets?",
        "question_th": "ไลบรารีพิเศษใดที่จะต้องติดตั้งร่วมกับ Wireshark บนระบบ Windows เพื่อให้ดักจับแพ็กเก็ตจากพอร์ตแลนทางกายภาพได้?",
        "options": ["WinPcap / Npcap", "WinSock", "Paramiko", "OpenSSL"],
        "correct_index": 0,
        "explanation_en": "Wireshark relies on Npcap (or legacy WinPcap) on Windows to hook into network interface cards and capture raw frames.",
        "explanation_th": "บนระบบ Windows จำเป็นต้องติดตั้ง Npcap (หรือ WinPcap) เพื่อช่วยคัดสำเนาเฟรมดิบข้ามจากตัวการ์ดแลนส่งต่อมายังโปรแกรม"
      },
      {
        "question_en": "What mode must a network interface card (NIC) support to capture all traffic on a local network hub, not just traffic sent to your own host?",
        "question_th": "การ์ดแลน (NIC) ต้องเปิดทำงานในโหมดใดเพื่อยินยอมให้ดักจับประวัติข้อมูลทราฟฟิกของผู้อื่นบนวงฮับได้ด้วย ไม่ใช่แค่ไฟล์ที่ส่งหาตนเอง?",
        "options": ["Half-duplex mode", "Promiscuous mode", "Simplex mode", "Broadcast-only mode"],
        "correct_index": 1,
        "explanation_en": "Promiscuous mode forces the NIC to pass all received frames up to the operating system, regardless of the destination MAC address.",
        "explanation_th": "โหมด Promiscuous (โหมดไม่เลือกที่รักมักที่ชัง) สั่งการให้ตัวการ์ดรับนำส่งเฟรมข้อมูลทุกแผ่นข้ามขึ้นมาให้ซอฟต์แวร์ส่องอ่านแม้จะเป็นของผู้อื่น"
      },
      {
        "question_en": "What is the difference between a Capture Filter and a Display Filter in Wireshark?",
        "question_th": "ข้อแตกต่างที่ชัดเจนระหว่างตัวกรองขณะดักจับ (Capture Filter) และตัวกรองขณะแสดงผล (Display Filter) คือข้อใด?",
        "options": [
          "Capture Filter runs in Layer 3; Display Filter runs in Layer 7.",
          "Capture Filter limits what traffic is recorded to disk; Display Filter temporarily hides packets from view in the interface without deleting them.",
          "They are identical filter functions.",
          "Capture Filter is for routers; Display Filter is for switches."
        ],
        "correct_index": 1,
        "explanation_en": "Capture filters are applied before gathering packets, saving disk space. Display filters are applied post-capture, hiding packets to simplify analysis.",
        "explanation_th": "ตัวกรองดักจับจำกัดเฉพาะทราฟฟิกที่จะเซฟลงเครื่อง ส่วนตัวกรองแสดงผลเพียงซ่อนภาพแพ็กเก็ตที่ไม่ต้องการมองในตารางเพื่อความง่ายในการอ่าน"
      },
      {
        "question_en": "Which Wireshark filter syntax only displays HTTP web traffic?",
        "question_th": "ไวยากรณ์สเปกกรอง (Filter syntax) ของ Wireshark ในข้อใดที่จะแสดงเฉพาะไฟล์ประวัติทราฟฟิกเว็บแบบ HTTP?",
        "options": ["http", "tcp.port == 80", "ip.proto == http", "port 80 http"],
        "correct_index": 0,
        "explanation_en": "The display filter 'http' filters the capture output to show only packets utilizing HTTP protocol.",
        "explanation_th": "ป้อนเพียงคีย์เวิร์ด 'http' ในช่องกรองแสดงผล ระบบจะดึงเอาเฉพาะเซสชันเว็บปกติมาแสดงหน้ากระดานทันที"
      }
    ]
  },
  "lesson-wireshark-02": {
    "questions": [
      {
        "question_en": "What is the three-way handshake sequence in TCP connection establishment, as viewed in Wireshark?",
        "question_th": "ลำดับชุดสัญญาณในด่านทักทาย (Three-way handshake) ของการสร้างเซสชัน TCP ที่ส่องพบใน Wireshark คือข้อใด?",
        "options": ["SYN -> ACK -> SYN-ACK", "SYN -> SYN-ACK -> ACK", "Request -> Offer -> Ack", "SYN -> FIN-ACK -> ACK"],
        "correct_index": 1,
        "explanation_en": "TCP connection setup begins with a SYN packet, followed by a SYN-ACK response, and completes with an ACK packet.",
        "explanation_th": "เริ่มด้วยสัญญาณพยายามขอจับคู่ (SYN) ตามด้วยฝั่งรับตกลงส่งคู่กลับ (SYN-ACK) และจบด่านด้วยไคลเอนต์ตอบรับรับทราบ (ACK)"
      },
      {
        "question_en": "Which TCP flag is used to request the graceful termination of an active connection?",
        "question_th": "ธงในส่วนหัว TCP (TCP Flag) ตัวใดที่ระบุคีย์เพื่อใช้ขอจบปิดการเชื่อมต่อเซสชันแบบปกติและเป็นระเบียบ?",
        "options": ["SYN", "FIN", "RST", "PSH"],
        "correct_index": 1,
        "explanation_en": "The FIN (Finish) flag is set in the TCP header to notify the peer that the sender has finished transmitting data.",
        "explanation_th": "ธง FIN (Finish) ใช้ประกาศขอปิดความสัมพันธ์และหยุดการส่งรับของเครื่องฝั่งนั้นอย่างราบรื่น"
      },
      {
        "question_en": "What does a TCP Reset (RST) flag indicate when captured in Wireshark?",
        "question_th": "สัญญาณธงสเปกรีเซ็ต (TCP RST flag) บ่งบอกแจ้งข้อขัดข้องเรื่องใดของเซสชันในการตรวจจับผ่าน Wireshark?",
        "options": [
          "The connection is successfully established.",
          "An abrupt, immediate termination of the connection, indicating a host rejected the connection or crashed.",
          "A request to synchronize sequence numbers.",
          "Data payload is being pushed immediately."
        ],
        "correct_index": 1,
        "explanation_en": "RST flags indicate an abrupt closure, often sent when a device receives a packet for a port that is not open or when a socket is suddenly closed.",
        "explanation_th": "แสดงถึงการปิดเซสชันแบบตัดขาดรวดเร็วฉับพลัน (Abrupt termination) ชี้ว่ามีอุปกรณ์ไม่ยอมรับการสื่อสารนั้นหรือโปรเซสพัง"
      },
      {
        "question_en": "How does Wireshark represent TCP sequence and acknowledgment numbers to make them easier to analyze?",
        "question_th": "Wireshark ช่วยอำนวยความสะดวกในการจัดแสดงหมายเลขลำดับ (Sequence/Ack numbers) อย่างไรให้วิศวกรอ่านเข้าใจง่าย?",
        "options": [
          "It converts them to hexadecimal letters.",
          "It displays them as Relative Sequence Numbers starting from 0, rather than raw 32-bit random values.",
          "It hides them by default.",
          "It translates them into IP addresses."
        ],
        "correct_index": 1,
        "explanation_en": "Wireshark calculates relative sequence and ack numbers starting at 0 for each session, simplifying the tracking of packet flows.",
        "explanation_th": "Wireshark จะช่วยแปลงข้อมูลจากตัวเลขดิบ 32 บิตฐานสิบสุ่ม ให้ปรับสเกลตัวเลขนับเริ่มจาก 0 (Relative) เพื่อให้เทียบง่ายว่าตัวนี้คือข้อมูลลำดับที่เท่าใด"
      },
      {
        "question_en": "What Wireshark feature allows you to reconstruct and view the complete text-based dialogue of a TCP session in order?",
        "question_th": "ความสามารถเด่นใดใน Wireshark ที่ช่วยให้ปะติดปะต่อข้อความสนทนาตั้งแต่ต้นจนจบของเซสชัน TCP มาแสดงเป็นบทพูดภาษาคนเรียงกัน?",
        "options": ["Analyze Traffic", "Follow TCP Stream", "Decode As", "Expert Info"],
        "correct_index": 1,
        "explanation_en": "Right-clicking a TCP packet and selecting 'Follow -> TCP Stream' rebuilds the sequential data exchange of the session as readable text.",
        "explanation_th": "การคลิกขวาที่แพ็กเก็ตเลือก 'Follow -> TCP Stream' จะช่วยแกะประวัติและรวมคำพูดรับส่งของคู่เซสชันมารวมแสดงเรียงกันในหน้านิ่งเดียว"
      }
    ]
  },
  "lesson-wireshark-03": {
    "questions": [
      {
        "question_en": "What is a major difference between UDP and TCP header structures as viewed in Wireshark?",
        "question_th": "ความแตกต่างที่เด่นชัดมากระหว่างส่วนหัว (Header) ของ UDP และ TCP เมื่อแกะดูใน Wireshark คืออะไร?",
        "options": [
          "UDP headers are much larger.",
          "UDP headers are extremely simple, consisting of only 8 bytes (source port, destination port, length, and checksum).",
          "UDP headers contain sequence numbers.",
          "UDP headers do not contain port numbers."
        ],
        "correct_index": 1,
        "explanation_en": "UDP is connectionless and lightweight. Its header is only 8 bytes total, containing no sequence numbers, window sizes, or flags, unlike TCP.",
        "explanation_th": "ส่วนหัวของ UDP มีขนาดเล็กมากเพียง 8 ไบต์เท่านั้น ประกอบด้วยพอร์ตต้นทาง ปลายทาง ความยาว และเช็คซัม โดยไม่มีข้อมูลสถานะใดๆ"
      },
      {
        "question_en": "Which Wireshark filter display syntax isolates only DNS packets?",
        "question_th": "ไวยากรณ์ในการกรองแสดงผล (Display filter) ของ Wireshark ข้อใดดึงมาแสดงเฉพาะทราฟฟิกโปรโตคอล DNS?",
        "options": ["dns", "udp.port == 53", "ip.proto == 53", "domain-name-service"],
        "correct_index": 0,
        "explanation_en": "The display filter 'dns' isolates domain name queries and responses in the capture log.",
        "explanation_th": "พิมพ์สั้นๆ ในช่องตัวกรองแสดงผลเป็น 'dns' เพื่อจัดแยกหมวดไอพีดึงการอ้างอิง DNS ขึ้นมาสแกนอ่าน"
      },
      {
        "question_en": "What information does a DNS Query packet contain, as analyzed in Wireshark?",
        "question_th": "ข้อมูลอะไรบ้างที่บรรจุอยู่ภายในแพ็กเก็ตส่งขอถาม (DNS Query) เมื่อแยกดูรายละเอียดใน Wireshark?",
        "options": [
          "The target IP address being requested.",
          "The domain name hostname being queried, the query type (e.g., A record), and class (IN).",
          "The email server credentials.",
          "The default gateway MAC."
        ],
        "correct_index": 1,
        "explanation_en": "A DNS query packet specifies the name being requested (e.g., google.com) and the requested record type (A, MX, etc.) under the Questions section.",
        "explanation_th": "ในหมวดคำถาม (Questions) จะระบุชื่อโดเมนที่ต้องการสืบค้น (เช่น cisco.com) และระบุประเภทของเรคคอร์ดข้อมูลที่ร้องขอ"
      },
      {
        "question_en": "How can you identify a DNS Response packet in Wireshark, as distinct from a Query?",
        "question_th": "คุณจะจำแนกแยกแยะแพ็กเก็ตตอบกลับ (DNS Response) ออกจากแพ็กเก็ตส่งถามคำถามได้อย่างไรใน Wireshark?",
        "options": [
          "DNS Response packets use TCP port 80.",
          "DNS Response packets have the QR (Query/Response) flag set to 1 in the DNS flags header and contain an Answers section.",
          "DNS Response packets have no header.",
          "DNS Response packets contain OSPF costs."
        ],
        "correct_index": 1,
        "explanation_en": "In the DNS header flags, QR=0 is a Query, while QR=1 indicates a Response, which also includes the resolved address details in the Answers section.",
        "explanation_th": "ในส่วนธง Flags ของ DNS ตัวแปร QR จะถูกปักค่าเป็น 1 (แปลว่า Response) และมีช่องรายละเอียดคำตอบ (Answers) บรรจุผลลัพธ์มาให้"
      },
      {
        "question_en": "What does a DNS response code of 'NXDOMAIN' mean when inspecting a DNS packet?",
        "question_th": "รหัสสถานะส่งคืนแบบ 'NXDOMAIN' ในแพ็กเก็ตตอบกลับของ DNS หมายความว่าอย่างไร?",
        "options": [
          "The domain was resolved successfully.",
          "The requested domain name does not exist on the server.",
          "The DNS server is offline.",
          "The query timed out."
        ],
        "correct_index": 1,
        "explanation_en": "NXDOMAIN (Non-Existent Domain) is a DNS status returned by a server indicating that the requested domain name is not registered in the DNS database.",
        "explanation_th": "NXDOMAIN (Non-Existent Domain) แจ้งกลับมาว่าไม่มีชื่อโดเมนที่ระบุลงทะเบียนอยู่ในระบบและฐานข้อมูลของเซิร์ฟเวอร์"
      }
    ]
  }
};
