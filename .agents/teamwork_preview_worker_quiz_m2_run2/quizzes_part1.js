export const quizzesPart1 = {
  "devnet-004-lesson-1": {
    "questions": [
      {
        "question_en": "What does the stateless nature of REST APIs imply?",
        "question_th": "คุณลักษณะการไม่มีสถานะ (Stateless) ของ REST API หมายถึงอะไร?",
        "options": [
          "The server stores session history to optimize requests.",
          "Every request must contain all the information the server needs to fulfill it.",
          "The client must maintain a constant connection to the server.",
          "Only GET requests are allowed to be sent."
        ],
        "correct_index": 1,
        "explanation_en": "Stateless means every request must contain all necessary information for processing, and the server does not store past interaction state.",
        "explanation_th": "Stateless หมายถึงแต่ละ Request จะต้องมีข้อมูลทั้งหมดที่เซิร์ฟเวอร์ต้องการเพื่อประมวลผล โดยเซิร์ฟเวอร์จะไม่เก็บสถานะการโต้ตอบในอดีตไว้"
      },
      {
        "question_en": "Which HTTP method is used to retrieve data from a server without modifying its state?",
        "question_th": "HTTP Method ใดใช้สำหรับดึงข้อมูลจากเซิร์ฟเวอร์โดยไม่มีการปรับเปลี่ยนสถานะของเซิร์ฟเวอร์?",
        "options": ["POST", "PUT", "GET", "DELETE"],
        "correct_index": 2,
        "explanation_en": "GET retrieves data without modifying server state, which corresponds to the 'Read' operation in CRUD.",
        "explanation_th": "GET ใช้ดึงข้อมูลโดยไม่มีการเปลี่ยนสถานะของเซิร์ฟเวอร์ ซึ่งสอดคล้องกับการทำงาน 'Read' ใน CRUD"
      },
      {
        "question_en": "Which of the following is the most widely used data format in modern REST APIs?",
        "question_th": "รูปแบบข้อมูลใดที่ถูกใช้งานอย่างแพร่หลายที่สุดใน REST API สมัยใหม่?",
        "options": ["XML", "JSON", "HTML", "YAML"],
        "correct_index": 1,
        "explanation_en": "JSON (JavaScript Object Notation) is human-readable and the most widely used format in modern REST APIs.",
        "explanation_th": "JSON (JavaScript Object Notation) เป็นรูปแบบที่อ่านเข้าใจง่ายและเป็นที่นิยมใช้งานมากที่สุดใน REST API สมัยใหม่"
      },
      {
        "question_en": "What is the purpose of an Endpoint / URI in a REST API?",
        "question_th": "วัตถุประสงค์ของ Endpoint / URI ใน REST API คืออะไร?",
        "options": [
          "To format the payload in JSON.",
          "To specify the path to access a resource on the server.",
          "To encrypt the data transmission.",
          "To validate the authentication token."
        ],
        "correct_index": 1,
        "explanation_en": "An Endpoint / URI defines the specific path to access a resource on the server.",
        "explanation_th": "Endpoint / URI กำหนดเส้นทางเฉพาะเพื่อเข้าถึงทรัพยากรบนเซิร์ฟเวอร์"
      },
      {
        "question_en": "Which HTTP Method corresponds to the 'Create' operation in CRUD?",
        "question_th": "HTTP Method ใดตรงกับการทำงาน 'Create' ใน CRUD?",
        "options": ["GET", "PUT", "POST", "DELETE"],
        "correct_index": 2,
        "explanation_en": "POST is used to submit new data to create a resource on the server.",
        "explanation_th": "POST ใช้สำหรับส่งข้อมูลใหม่เพื่อสร้างทรัพยากรบนเซิร์ฟเวอร์"
      }
    ]
  },
  "devnet-004-lesson-2": {
    "questions": [
      {
        "question_en": "What is Postman primarily used for in network automation?",
        "question_th": "Postman ถูกนำมาใช้งานเพื่อวัตถุประสงค์หลักใดในการทำงานอัตโนมัติของเครือข่าย?",
        "options": [
          "Writing production Python scripts.",
          "Testing, designing, and documenting APIs rapidly.",
          "Configuring physical routers via serial cables.",
          "Bypassing network security firewalls."
        ],
        "correct_index": 1,
        "explanation_en": "Postman is an industry-standard tool used for testing, designing, and documenting APIs.",
        "explanation_th": "Postman เป็นเครื่องมือมาตรฐานในอุตสาหกรรมที่ใช้ในการทดสอบ ออกแบบ และทำเอกสารประกอบ API"
      },
      {
        "question_en": "Which HTTP Status Code range indicates a client-side error (e.g., unauthorized or not found)?",
        "question_th": "ช่วงของรหัสสถานะ HTTP (HTTP Status Code) ใดที่บ่งชี้ถึงข้อผิดพลาดฝั่งไคลเอนต์ (เช่น ไม่มีสิทธิ์ หรือไม่พบหน้า)?",
        "options": ["2xx", "3xx", "4xx", "5xx"],
        "correct_index": 2,
        "explanation_en": "4xx status codes (such as 401 Unauthorized or 404 Not Found) indicate client-side errors.",
        "explanation_th": "รหัสสถานะ 4xx (เช่น 401 Unauthorized หรือ 404 Not Found) บ่งชี้ถึงข้อผิดพลาดฝั่งไคลเอนต์"
      },
      {
        "question_en": "What feature in Postman allows grouping and saving multiple API requests for reuse?",
        "question_th": "ฟีเจอร์ใดใน Postman ที่อนุญาตให้จัดกลุ่มและบันทึกรายการคำขอ API หลายๆ ตัวเพื่อนำกลับมาใช้ซ้ำ?",
        "options": ["Environments", "Collections", "Request Builder", "Response Window"],
        "correct_index": 1,
        "explanation_en": "Collections allow users to group and save multiple API requests for organized workflows.",
        "explanation_th": "Collections ช่วยให้ผู้ใช้สามารถจัดกลุ่มและบันทึกคำขอ API หลายๆ ตัวเพื่อให้ขั้นตอนการทำงานเป็นระเบียบเรียบร้อย"
      },
      {
        "question_en": "What is the recommended way to handle device IP addresses dynamically in Postman?",
        "question_th": "วิธีแนะนำในการจัดการที่อยู่ IP ของอุปกรณ์แบบไดนามิกใน Postman คืออะไร?",
        "options": [
          "Hardcoding the IP inside each request URL.",
          "Using Environment Variables.",
          "Creating a new collection for every device.",
          "Editing the host file on the local computer."
        ],
        "correct_index": 1,
        "explanation_en": "Environment variables in Postman allow dynamically swapping values like device IP addresses and API tokens.",
        "explanation_th": "ตัวแปรสภาพแวดล้อม (Environment variables) ใน Postman ช่วยให้สามารถสลับเปลี่ยนค่าต่างๆ เช่น IP ของอุปกรณ์และ API token ได้แบบไดนามิก"
      },
      {
        "question_en": "Which HTTP Status Code indicates that a request was processed successfully?",
        "question_th": "รหัสสถานะ HTTP (HTTP Status Code) ใดที่บ่งชี้ว่าคำขอได้รับการประมวลผลสำเร็จ?",
        "options": ["200 OK", "401 Unauthorized", "404 Not Found", "500 Internal Server Error"],
        "correct_index": 0,
        "explanation_en": "2xx status codes (e.g., 200 OK) represent success.",
        "explanation_th": "รหัสสถานะช่วง 2xx (เช่น 200 OK) แสดงถึงความสำเร็จในการดำเนินการ"
      }
    ]
  },
  "devnet-004-lesson-3": {
    "questions": [
      {
        "question_en": "Which library is commonly used in Python to send HTTP requests in network scripts?",
        "question_th": "ไลบรารีใดที่นิยมใช้ในภาษา Python เพื่อส่งคำขอ HTTP ในสคริปต์เครือข่าย?",
        "options": ["socket", "requests", "netmiko", "json"],
        "correct_index": 1,
        "explanation_en": "The Python 'requests' library is used to interact with REST APIs by sending HTTP requests easily.",
        "explanation_th": "ไลบรารี 'requests' ของ Python ใช้สำหรับโต้ตอบกับ REST API โดยการส่งคำขอ HTTP ได้อย่างง่ายดาย"
      },
      {
        "question_en": "How can you parse a JSON-formatted HTTP response into a Python dictionary?",
        "question_th": "คุณจะแปลงการตอบกลับ HTTP ในรูปแบบ JSON ให้เป็น Dictionary ของ Python ได้อย่างไร?",
        "options": [
          "Using response.json() method",
          "Using response.text.split()",
          "Using json.load(response.headers)",
          "Using dict(response)"
        ],
        "correct_index": 0,
        "explanation_en": "The response.json() method automatically deserializes a JSON payload into a Python dictionary.",
        "explanation_th": "เมธอด response.json() จะทำการแปลงข้อมูล JSON จากการตอบกลับให้เป็น Dictionary ใน Python โดยอัตโนมัติ"
      },
      {
        "question_en": "What parameter is used in requests.post() to send a Python dictionary as a JSON payload?",
        "question_th": "พารามิเตอร์ใดใน requests.post() ที่ใช้ส่ง Dictionary ของ Python เป็นข้อมูล Payload แบบ JSON?",
        "options": ["data=", "json=", "payload=", "params="],
        "correct_index": 1,
        "explanation_en": "The json= parameter automatically serializes a Python dictionary into a JSON string and sets the Content-Type header.",
        "explanation_th": "พารามิเตอร์ json= จะแปลง Dictionary ใน Python เป็นสตริง JSON และตั้งค่า Content-Type ใน Header ให้โดยอัตโนมัติ"
      },
      {
        "question_en": "What is the security risk of setting verify=False in requests?",
        "question_th": "ความเสี่ยงด้านความปลอดภัยของการตั้งค่า verify=False ใน requests คืออะไร?",
        "options": [
          "It disables SSL certificate verification, making the connection vulnerable to Man-in-the-Middle attacks.",
          "It slows down the network request significantly.",
          "It blocks the script from executing.",
          "It prevents the use of JSON payloads."
        ],
        "correct_index": 0,
        "explanation_en": "Setting verify=False disables SSL validation, allowing the script to proceed in lab environments but exposing it to interception in production.",
        "explanation_th": "การตั้งค่า verify=False จะปิดการตรวจสอบใบรับรอง SSL ซึ่งช่วยให้รันสคริปต์ในแล็บได้ แต่ทำให้เสี่ยงต่อการถูกดักจับข้อมูลในระบบใช้งานจริง"
      },
      {
        "question_en": "Which requests method is used to retrieve data from a device?",
        "question_th": "เมธอดใดใน requests ที่ใช้ในการดึงข้อมูลจากอุปกรณ์?",
        "options": ["requests.post()", "requests.get()", "requests.put()", "requests.delete()"],
        "correct_index": 1,
        "explanation_en": "requests.get() sends an HTTP GET request to fetch data.",
        "explanation_th": "requests.get() ส่งคำขอ HTTP GET เพื่อดึงข้อมูล"
      }
    ]
  },
  "devnet-004-lesson-4": {
    "questions": [
      {
        "question_en": "Which endpoint is used to retrieve an authentication token from Cisco DNA Center?",
        "question_th": "Endpoint ใดใช้ในการรับโทเค็นการตรวจสอบสิทธิ์ (Authentication token) จาก Cisco DNA Center?",
        "options": [
          "/dna/system/api/v1/auth/token",
          "/api/v1/login",
          "/dna/api/v1/session",
          "/dna/system/api/v1/devices"
        ],
        "correct_index": 0,
        "explanation_en": "To authenticate with Cisco DNA Center, clients send Basic Auth credentials to `/dna/system/api/v1/auth/token`.",
        "explanation_th": "ในการตรวจสอบสิทธิ์กับ Cisco DNA Center ไคลเอนต์จะต้องส่งข้อมูลประจำตัว Basic Auth ไปยัง `/dna/system/api/v1/auth/token`"
      },
      {
        "question_en": "What is the header key used to pass the authentication token in subsequent Cisco DNA Center API requests?",
        "question_th": "คีย์ในส่วน Header ใดที่ใช้ส่งโทเค็นการตรวจสอบสิทธิ์ในคำขอ API ของ Cisco DNA Center ในครั้งถัดๆ ไป?",
        "options": ["Authorization", "X-Auth-Token", "Bearer-Token", "Token"],
        "correct_index": 1,
        "explanation_en": "Subsequent API requests to Cisco DNA Center must include the acquired token in the 'X-Auth-Token' header.",
        "explanation_th": "คำขอ API ไปยัง Cisco DNA Center ถัดจากนั้นจำเป็นต้องแนบโทเค็นที่ได้รับใน Header ที่ชื่อ 'X-Auth-Token'"
      },
      {
        "question_en": "What capability does Command Runner offer via the Cisco DNA Center REST API?",
        "question_th": "ฟังก์ชัน Command Runner ใน Cisco DNA Center REST API มอบความสามารถใด?",
        "options": [
          "Writing Python scripts on the router directly.",
          "Executing read-only CLI commands across multiple devices simultaneously.",
          "Rebooting physical switches instantly.",
          "Creating network topology diagrams automatically."
        ],
        "correct_index": 1,
        "explanation_en": "Command Runner executes read-only CLI commands across thousands of managed devices simultaneously via REST.",
        "explanation_th": "Command Runner ช่วยให้สามารถเรียกใช้งานคำสั่ง CLI แบบอ่านอย่างเดียว (Read-only) บนอุปกรณ์ที่อยู่ภายใต้การจัดการจำนวนมากได้พร้อมกันผ่าน REST API"
      },
      {
        "question_en": "How long does a Cisco DNA Center authentication token typically remain valid?",
        "question_th": "โดยทั่วไปแล้ว โทเค็นการตรวจสอบสิทธิ์ของ Cisco DNA Center จะมีอายุใช้งานนานเท่าใด?",
        "options": ["10 minutes", "1 hour", "24 hours", "7 days"],
        "correct_index": 1,
        "explanation_en": "The DNA Center X-Auth-Token is temporary and typically expires after one hour.",
        "explanation_th": "X-Auth-Token ของ DNA Center เป็นโทเค็นชั่วคราวและโดยทั่วไปจะหมดอายุหลังจากผ่านไปหนึ่งชั่วโมง"
      },
      {
        "question_en": "Which API category simplifies intent-based network management in Cisco DNA Center?",
        "question_th": "หมวดหมู่ API ใดที่ช่วยให้การจัดการเครือข่ายแบบอิงตามความต้องการ (Intent-based) ใน Cisco DNA Center ง่ายขึ้น?",
        "options": ["Intent-based API", "Legacy CLI API", "Direct SNMP API", "Netconf API"],
        "correct_index": 0,
        "explanation_en": "Cisco DNA Center exposes Intent-based APIs that simplify enterprise network automation.",
        "explanation_th": "Cisco DNA Center เปิดบริการ Intent-based API ที่ช่วยลดความซับซ้อนในการทำเครือข่ายอัตโนมัติระดับองค์กร"
      }
    ]
  },
  "lesson-adv-001": {
    "questions": [
      {
        "question_en": "Which OSPF area type blocks Type 5 LSAs (External) but allows Type 3 LSAs (Summary) while relying on a default route?",
        "question_th": "OSPF Area ประเภทใดที่ปิดกั้น Type 5 LSA (ภายนอก) แต่ยังอนุญาต Type 3 LSA (สรุปเส้นทาง) โดยอาศัยเส้นทางเริ่มต้น (Default Route)?",
        "options": ["Backbone Area", "Stub Area", "Totally Stubby Area", "NSSA"],
        "correct_index": 1,
        "explanation_en": "A Stub Area blocks External LSAs (Type 5) and receives a Default Route instead from the ABR, while still permitting Type 3 LSAs.",
        "explanation_th": "Stub Area จะปิดกั้น External LSA (Type 5) และได้รับ Default Route จาก ABR มาทดแทน โดยยังอนุญาตให้มี Type 3 LSA ได้ตามปกติ"
      },
      {
        "question_en": "Which LSA type is generated by a Designated Router (DR) to describe OSPF routers in a multi-access network?",
        "question_th": "LSA Type ใดที่สร้างขึ้นโดย Designated Router (DR) เพื่ออธิบายเร้าเตอร์ OSPF ตัวอื่นๆ ในเครือข่ายแบบ Multi-access?",
        "options": ["Type 1 (Router LSA)", "Type 2 (Network LSA)", "Type 3 (Summary LSA)", "Type 4 (ASBR Summary LSA)"],
        "correct_index": 1,
        "explanation_en": "Type 2 (Network LSA) is created by the Designated Router (DR) to represent a multi-access network segments within an area.",
        "explanation_th": "Type 2 (Network LSA) ถูกสร้างขึ้นโดย Designated Router (DR) เพื่อใช้เป็นตัวแทนของเซกเมนต์เครือข่ายแบบ multi-access ภายในพื้นที่นั้น"
      },
      {
        "question_en": "What is the primary role of an Area Border Router (ABR) in OSPF?",
        "question_th": "บทบาทหน้าที่หลักของ Area Border Router (ABR) ใน OSPF คืออะไร?",
        "options": [
          "To redistribute routes from BGP into OSPF.",
          "To route traffic between different areas and generate Type 3/4 LSAs.",
          "To elect the Designated Router (DR) on multi-access links.",
          "To establish neighbor adjacencies with non-OSPF routers."
        ],
        "correct_index": 1,
        "explanation_en": "ABRs connect OSPF Area 0 to other areas, routing traffic between them and generating Type 3 and Type 4 LSAs.",
        "explanation_th": "ABR ทำหน้าที่เชื่อมต่อ OSPF Area 0 เข้ากับพื้นที่อื่นๆ โดยคอยส่งต่อทราฟฟิกและสร้าง LSA Type 3 และ Type 4"
      },
      {
        "question_en": "Which LSA type is used by an ASBR inside a Not-So-Stubby Area (NSSA) to advertise redistributed external routes?",
        "question_th": "LSA Type ใดที่ใช้งานโดย ASBR ภายในพื้นที่แบบ Not-So-Stubby Area (NSSA) เพื่อโฆษณาเส้นทางภายนอกที่ถูกดึงเข้ามา?",
        "options": ["Type 5 (AS External LSA)", "Type 7 (NSSA External LSA)", "Type 3 (Summary LSA)", "Type 1 (Router LSA)"],
        "correct_index": 1,
        "explanation_en": "An ASBR in an NSSA generates Type 7 (NSSA External LSA) to advertise external routes, which are later translated to Type 5 by the ABR.",
        "explanation_th": "ASBR ใน NSSA จะสร้าง Type 7 LSA เพื่อโฆษณาเส้นทางภายนอก ซึ่งต่อมาจะถูกแปลงเป็น Type 5 โดย ABR"
      },
      {
        "question_en": "Which OSPF Area blocks both Type 3 and Type 5 LSAs, relying entirely on a default route?",
        "question_th": "OSPF Area ประเภทใดที่ปิดกั้นทั้ง Type 3 และ Type 5 LSA โดยอาศัยเส้นทางเริ่มต้น (Default Route) ทั้งหมด?",
        "options": ["Standard Area", "Stub Area", "Totally Stubby Area", "NSSA"],
        "correct_index": 2,
        "explanation_en": "Totally Stubby Area blocks both Type 3 (Summary) and Type 5 (External) LSAs to minimize the routing table size on internal routers.",
        "explanation_th": "Totally Stubby Area จะปิดกั้นทั้ง Type 3 LSA (Summary) และ Type 5 LSA (External) เพื่อให้ตารางเส้นทางของเร้าเตอร์ภายในมีขนาดเล็กที่สุด"
      }
    ]
  },
  "lesson-adv-002": {
    "questions": [
      {
        "question_en": "What OSPF command is used to configure inter-area route summarization on an ABR?",
        "question_th": "คำสั่ง OSPF ใดที่ใช้กำหนดค่าการย่อเส้นทางระหว่างพื้นที่ (Inter-area route summarization) บน ABR?",
        "options": ["summary-address", "area range", "ip summary-address ospf", "ip route summary"],
        "correct_index": 1,
        "explanation_en": "The 'area <area-id> range <network> <mask>' command is used on ABRs to summarize routes between OSPF areas.",
        "explanation_th": "คำสั่ง 'area <area-id> range <network> <mask>' ใช้บน ABR เพื่อรวบรวมและย่อเส้นทางระหว่างพื้นที่ OSPF"
      },
      {
        "question_en": "Which command is used on an ASBR to summarize external routes redistributed into OSPF?",
        "question_th": "คำสั่งใดใช้กำหนดค่าบน ASBR เพื่อย่อเส้นทางภายนอก (External routes) ที่ถูกดึงเข้ามาใน OSPF?",
        "options": ["area range", "summary-address", "redistribute summary", "ip route-summary"],
        "correct_index": 1,
        "explanation_en": "The 'summary-address <network> <mask>' command is used on OSPF ASBRs to summarize external routes (Type 5 LSAs).",
        "explanation_th": "คำสั่ง 'summary-address <network> <mask>' ใช้บน OSPF ASBR เพื่อย่อเส้นทางภายนอก (Type 5 LSA)"
      },
      {
        "question_en": "What is the summary prefix for the subnets 172.16.0.0/24 and 172.16.1.0/24?",
        "question_th": "การย่อเส้นทาง (Route Summarization) สำหรับเครือข่ายย่อย 172.16.0.0/24 และ 172.16.1.0/24 จะได้ผลลัพธ์เป็น Prefix ใด?",
        "options": ["172.16.0.0/23", "172.16.0.0/22", "172.16.0.0/25", "172.16.0.0/16"],
        "correct_index": 0,
        "explanation_en": "172.16.0.0/24 and 172.16.1.0/24 share the first 23 bits, resulting in the summary address 172.16.0.0/23.",
        "explanation_th": "172.16.0.0/24 และ 172.16.1.0/24 มีบิตที่เหมือนกันใน 23 บิตแรก ส่งผลให้สรุปเป็น 172.16.0.0/23"
      },
      {
        "question_en": "Why does OSPF automatically create a discard route to Null0 when summarization is configured?",
        "question_th": "ทำไม OSPF จึงสร้าง Discard Route ไปยังอินเตอร์เฟส Null0 โดยอัตโนมัติเมื่อมีการกำหนดค่า Summarization?",
        "options": [
          "To speed up packet forwarding.",
          "To prevent routing loops for packets destined to unassigned subnets within the summary range.",
          "To backup the physical interface in case of failure.",
          "To block malicious attacks."
        ],
        "correct_index": 1,
        "explanation_en": "OSPF creates a discard route to Null0 to drop packets destined to non-existent subnets within the summarized range, preventing loops.",
        "explanation_th": "OSPF สร้าง discard route ไปยัง Null0 เพื่อทิ้งแพ็กเก็ตที่ส่งไปยังซับเน็ตที่ไม่มีอยู่จริงภายในช่วงที่ทำการสรุป เพื่อป้องกันการเกิดลูปการส่งข้อมูล"
      },
      {
        "question_en": "Which of the following is a primary benefit of route summarization in OSPF?",
        "question_th": "ข้อใดคือประโยชน์หลักของการรวบรวมและย่อเส้นทาง (Route summarization) ใน OSPF?",
        "options": [
          "It eliminates the need for Area 0.",
          "It reduces routing table size, SPF CPU computation, and LSA flooding.",
          "It automatically encrypts OSPF packets.",
          "It enables unequal cost load balancing."
        ],
        "correct_index": 1,
        "explanation_en": "Route summarization reduces routing table sizes, minimizes LSA updates, and limits SPF algorithm re-calculations.",
        "explanation_th": "การย่อเส้นทางช่วยลดขนาดตารางเส้นทาง ลดการส่งอัปเดต LSA และลดการคำนวณใหม่ของอัลกอริทึม SPF"
      }
    ]
  },
  "lesson-adv002-01": {
    "questions": [
      {
        "question_en": "What is the primary routing algorithm used by EIGRP?",
        "question_th": "อัลกอริทึมหลักที่ใช้ในการหาเส้นทางของ EIGRP คืออะไร?",
        "options": ["Dijkstra SPF", "Bellman-Ford", "DUAL (Diffusing Update Algorithm)", "Path Vector"],
        "correct_index": 2,
        "explanation_en": "EIGRP uses the DUAL (Diffusing Update Algorithm) to calculate shortest path and maintain loop-free topology.",
        "explanation_th": "EIGRP ใช้อัลกอริทึม DUAL (Diffusing Update Algorithm) ในการคำนวณหาเส้นทางที่สั้นที่สุดและรับประกันโครงสร้างที่ปลอดลูป"
      },
      {
        "question_en": "Which EIGRP table holds the list of all backup routes (Feasible Successors)?",
        "question_th": "ตาราง EIGRP ใดที่เก็บรายการของเส้นทางสำรองทั้งหมด (Feasible Successors)?",
        "options": ["Neighbor Table", "Routing Table", "Topology Table", "ARP Table"],
        "correct_index": 2,
        "explanation_en": "The EIGRP Topology Table contains all Successors and Feasible Successors (backup routes) discovered.",
        "explanation_th": "ตาราง Topology ของ EIGRP จะบันทึกข้อมูล Successor และ Feasible Successor (เส้นทางสำรอง) ทั้งหมดที่ค้นพบ"
      },
      {
        "question_en": "What condition must a backup route meet to be classified as a Feasible Successor?",
        "question_th": "เงื่อนไขใดที่เส้นทางสำรองต้องผ่านเกณฑ์เพื่อจัดเป็น Feasible Successor?",
        "options": [
          "Its Feasible Distance must be less than the Successor's Reported Distance.",
          "Its Reported Distance (RD) must be less than the Feasible Distance (FD) of the current Successor.",
          "Its metric must be equal to the primary route metric.",
          "Its hop count must be less than 15."
        ],
        "correct_index": 1,
        "explanation_en": "The Feasibility Condition states that a neighbor's Reported Distance (RD) must be strictly less than the current Successor's Feasible Distance (FD).",
        "explanation_th": "เงื่อนไขการทำงานเสมือนจริง (Feasibility Condition) ระบุว่า Reported Distance (RD) ของเพื่อนบ้านต้องน้อยกว่า Feasible Distance (FD) ของ Successor ปัจจุบัน"
      },
      {
        "question_en": "Which EIGRP packet type is sent to neighbors to request alternative routing information when a route fails and has no backup?",
        "question_th": "แพ็กเก็ต EIGRP ประเภทใดที่ส่งไปยังเพื่อนบ้านเพื่อขอข้อมูลเส้นทางอื่น เมื่อเส้นทางเดิมล้มเหลวและไม่มีเส้นทางสำรอง?",
        "options": ["Hello", "Update", "Query", "Reply"],
        "correct_index": 2,
        "explanation_en": "A Query packet is sent by EIGRP when a route fails and no Feasible Successor exists, asking neighbors for paths.",
        "explanation_th": "แพ็กเก็ต Query จะถูกส่งโดย EIGRP เมื่อเส้นทางเสียหายและไม่มี Feasible Successor โดยถามเพื่อนบ้านว่ามีเส้นทางอื่นหรือไม่"
      },
      {
        "question_en": "What configuration mode in EIGRP unifies all IPv4 and IPv6 Address Families in a single configuration block?",
        "question_th": "โหมดการตั้งค่าใดใน EIGRP ที่รวบรวม Address Family ของทั้ง IPv4 และ IPv6 ไว้ในบล็อกเดียวกัน?",
        "options": ["Classic Mode", "Named EIGRP Mode", "Autonomous System Mode", "Global Config Mode"],
        "correct_index": 1,
        "explanation_en": "Named EIGRP Mode unifies address-families configuration for IPv4 and IPv6 under a single virtual instance name.",
        "explanation_th": "Named EIGRP Mode จะรวมการกำหนดค่า address-family ของ IPv4 และ IPv6 ไว้ภายใต้ชื่อ virtual instance เดียวกัน"
      }
    ]
  },
  "lesson-adv002-02": {
    "questions": [
      {
        "question_en": "Which two K-values are enabled by default in EIGRP metric calculations?",
        "question_th": "K-value คู่ใดที่ถูกเปิดใช้งานเป็นค่าเริ่มต้นในการคำนวณ Metric ของ EIGRP?",
        "options": ["K1 and K2", "K1 and K3", "K2 and K4", "K3 and K5"],
        "correct_index": 1,
        "explanation_en": "By default, K1 (Bandwidth) and K3 (Delay) are set to 1, while the other K-values are set to 0.",
        "explanation_th": "ค่าเริ่มต้นของ EIGRP จะกำหนดให้ K1 (แบนด์วิดท์) และ K3 (ดีเลย์) มีค่าเป็น 1 ส่วน K อื่นๆ จะมีค่าเป็น 0"
      },
      {
        "question_en": "What interface configuration command is used to adjust the delay value for EIGRP metric tuning?",
        "question_th": "คำสั่งอินเตอร์เฟสใดที่ใช้ปรับแต่งค่า Delay สำหรับการปรับเปลี่ยนเมทริกของ EIGRP?",
        "options": ["bandwidth <kbps>", "delay <tens-of-microseconds>", "eigrp delay <ms>", "metric delay <value>"],
        "correct_index": 1,
        "explanation_en": "The 'delay' command on Cisco interfaces is configured in tens of microseconds to tune the EIGRP metric.",
        "explanation_th": "คำสั่ง 'delay' บนอินเตอร์เฟสของ Cisco ใช้กำหนดค่าหน่วยเป็นสิบไมโครวินาที (tens of microseconds) เพื่อปรับแต่งเมทริก EIGRP"
      },
      {
        "question_en": "What is the formula for the default classical EIGRP metric?",
        "question_th": "สูตรคำนวณสำหรับ Classical EIGRP Metric แบบเริ่มต้นคืออะไร?",
        "options": [
          "Metric = Bandwidth + Delay",
          "Metric = [10,000,000 / Bandwidth + Delay] * 256",
          "Metric = [Bandwidth * Delay] / 256",
          "Metric = Hop Count * 256"
        ],
        "correct_index": 1,
        "explanation_en": "The default metric is computed as: Metric = (10^7 / Minimum Bandwidth in Kbps + Cumulative Delay in tens of microseconds) * 256.",
        "explanation_th": "เมทริกเริ่มต้นคำนวณโดย: Metric = (10^7 / แบนด์วิดท์ต่ำสุด + ผลรวมดีเลย์หน่วยสิบไมโครวินาที) * 256"
      },
      {
        "question_en": "Why does EIGRP Wide Metrics exist in Named Mode?",
        "question_th": "เหตุใด EIGRP Wide Metrics จึงมีความจำเป็นใน Named Mode?",
        "options": [
          "To allow unequal cost path load balancing.",
          "To support high-speed interfaces (>10Gbps) where classical metrics scale down to 1.",
          "To automatically enable authentication.",
          "To decrease CPU processing overhead."
        ],
        "correct_index": 1,
        "explanation_en": "Wide Metrics expands calculation limits to support very high-speed links (10 Gbps and above) without metric distortion.",
        "explanation_th": "Wide Metrics ขยายขีดจำกัดการคำนวณเพื่อรองรับลิงก์ความเร็วสูงมาก (10 Gbps ขึ้นไป) โดยไม่ทำให้ค่าเมทริกเพี้ยน"
      },
      {
        "question_en": "Does modifying the 'bandwidth' command on an interface affect the actual physical transmission speed?",
        "question_th": "การแก้ไขคำสั่ง 'bandwidth' บนอินเตอร์เฟส ส่งผลกระทบต่อความเร็วการรับส่งข้อมูลทางกายภาพจริงหรือไม่?",
        "options": [
          "Yes, it limits the interface throughput dynamically.",
          "No, it only alters the routing protocol metric calculations.",
          "Yes, it changes the hardware clock rate.",
          "No, it only acts as a text comment."
        ],
        "correct_index": 1,
        "explanation_en": "The interface 'bandwidth' command is a logical tuning value. It does not limit the physical line rate.",
        "explanation_th": "คำสั่ง 'bandwidth' บนอินเตอร์เฟสเป็นเพียงการกำหนดค่าเชิงตรรกะ ไม่มีผลต่อความเร็วทางกายภาพจริงของลิงก์"
      }
    ]
  },
  "lesson-adv002-03": {
    "questions": [
      {
        "question_en": "Which command is used to enable Unequal-Cost Load Balancing in EIGRP?",
        "question_th": "คำสั่งใดที่ใช้เปิดทำงาน Unequal-Cost Load Balancing ใน EIGRP?",
        "options": ["variance <multiplier>", "maximum-paths <number>", "load-balance unequal", "metric weights"],
        "correct_index": 0,
        "explanation_en": "The 'variance' command, followed by a multiplier, permits EIGRP to load balance traffic over routes with different metrics.",
        "explanation_th": "คำสั่ง 'variance' ตามด้วยตัวคูณ จะช่วยให้ EIGRP สามารถทำโหลดบาลานซ์ทราฟฟิกบนเส้นทางที่มีค่าเมทริกต่างกันได้"
      },
      {
        "question_en": "What is the default variance value in EIGRP?",
        "question_th": "ค่าเริ่มต้นของตัวคูณ Variance ใน EIGRP คือเท่าใด?",
        "options": ["0", "1", "2", "4"],
        "correct_index": 1,
        "explanation_en": "By default, the variance multiplier is set to 1, meaning only equal-cost routes are installed in the routing table.",
        "explanation_th": "ค่าเริ่มต้นของ Variance ใน EIGRP คือ 1 ซึ่งหมายถึงจะทำโหลดบาลานซ์เฉพาะบนเส้นทางที่มีค่าใช้จ่ายเท่ากันเท่านั้น"
      },
      {
        "question_en": "To be eligible for Unequal-Cost Load Balancing, what condition must a backup path satisfy?",
        "question_th": "เส้นทางสำรองต้องสอดคล้องกับเงื่อนไขใดเพื่อจะมีสิทธิ์เข้าร่วมทำโหลดบาลานซ์แบบ Unequal-Cost?",
        "options": [
          "It must have a metric lower than the primary successor path.",
          "It must be a validated Feasible Successor.",
          "It must use named configuration mode.",
          "It must connect to Area 0."
        ],
        "correct_index": 1,
        "explanation_en": "To be used for unequal load balancing, a path must be a Feasible Successor (it must meet the Feasibility Condition).",
        "explanation_th": "เส้นทางที่จะทำ unequal load balancing ได้ จะต้องได้รับการยอมรับเป็น Feasible Successor (ผ่านเกณฑ์ Feasibility Condition) ก่อนเท่านั้น"
      },
      {
        "question_en": "If a successor path has a Feasible Distance of 10 and a candidate path has a Feasible Distance of 25, what minimum variance multiplier is required to load share traffic?",
        "question_th": "หากเส้นทาง Successor มี FD เป็น 10 และเส้นทางสำรองมี FD เป็น 25 จะต้องกำหนดค่าตัวคูณ Variance ขั้นต่ำเท่าใดจึงจะทำโหลดบาลานซ์ได้?",
        "options": ["2", "3", "4", "5"],
        "correct_index": 1,
        "explanation_en": "Variance multiplier * Successor FD >= Candidate FD. Thus, Variance * 10 >= 25. The smallest integer multiplier is 3.",
        "explanation_th": "สูตรคือ ตัวคูณ Variance * Successor FD >= Candidate FD จะได้ Variance * 10 >= 25 ดังนั้นจำนวนเต็มที่น้อยที่สุดคือ 3"
      },
      {
        "question_en": "What is the maximum number of paths EIGRP can load balance across by default on modern IOS?",
        "question_th": "ค่าเริ่มต้นของจำนวนเส้นทางสูงสุด (Maximum paths) ที่ EIGRP สามารถใช้ทำโหลดบาลานซ์ได้ในระบบ Cisco IOS ปัจจุบันคือเท่าใด?",
        "options": ["2", "4", "8", "16"],
        "correct_index": 1,
        "explanation_en": "By default, EIGRP will load balance over a maximum of 4 paths, although this can be configured higher using the 'maximum-paths' command.",
        "explanation_th": "ตามค่าเริ่มต้น EIGRP จะส่งข้อมูลโหลดบาลานซ์ได้สูงสุด 4 เส้นทาง แต่สามารถตั้งค่าให้สูงขึ้นได้ด้วยคำสั่ง 'maximum-paths'"
      }
    ]
  },
  "lesson-adv002-04": {
    "questions": [
      {
        "question_en": "At which points in the network can EIGRP route summarization be configured?",
        "question_th": "สามารถระบุการรวบรวมและย่อเส้นทาง (Route summarization) ของ EIGRP ได้ที่จุดใดในเครือข่าย?",
        "options": [
          "Only on Area Border Routers (ABRs).",
          "On any interface of any EIGRP router.",
          "Only on Autonomous System boundary routers.",
          "Only on backbone links."
        ],
        "correct_index": 1,
        "explanation_en": "Unlike OSPF, EIGRP route summarization can be configured on any interface of any router in the network.",
        "explanation_th": "EIGRP แตกต่างจาก OSPF ตรงที่สามารถคอนฟิกการย่อเส้นทางได้ที่ทุกๆ อินเตอร์เฟสของเร้าเตอร์ EIGRP ตัวใดก็ได้ในระบบ"
      },
      {
        "question_en": "What is the interface command used to configure manual EIGRP summarization in classic configuration mode?",
        "question_th": "คำสั่งในระดับอินเตอร์เฟสใดที่ใช้กำหนดค่าการย่อเส้นทาง EIGRP ด้วยตนเองใน Classic Mode?",
        "options": [
          "ip summary-address eigrp <as-number> <summary-address> <mask>",
          "summary-address <summary-address> <mask>",
          "area range <summary-address> <mask>",
          "ip route-summary eigrp <as-number>"
        ],
        "correct_index": 0,
        "explanation_en": "In classic mode, manual summarization is configured per-interface using 'ip summary-address eigrp <as-number> <network> <mask>'.",
        "explanation_th": "ใน Classic Mode การย่อเส้นทางทำได้โดยสั่งในระดับอินเตอร์เฟสด้วยคำสั่ง 'ip summary-address eigrp <as-number> <network> <mask>'"
      },
      {
        "question_en": "Which tool can be used with EIGRP to filter specific prefixes and prevent them from being advertised to neighbors?",
        "question_th": "เครื่องมือใดที่สามารถนำมาใช้ร่วมกับ EIGRP เพื่อกรอง Prefix เฉพาะและปิดกั้นไม่ให้โฆษณาไปยังเพื่อนบ้าน?",
        "options": ["Route Maps", "Distribute Lists", "Prefix Lists", "All of the above"],
        "correct_index": 3,
        "explanation_en": "EIGRP supports route filtering using distribute-lists in combination with ACLs, prefix-lists, or route-maps.",
        "explanation_th": "EIGRP รองรับการกรองเส้นทางโดยใช้ distribute-list ร่วมกับ ACL, prefix-list หรือ route-map"
      },
      {
        "question_en": "What command applies a distribute-list in EIGRP router configuration mode?",
        "question_th": "คำสั่งใดใช้ผูกการทำงานของ distribute-list ในโหมด EIGRP Router Configuration?",
        "options": [
          "distribute-list <list-name/id> [in | out] [interface]",
          "ip distribute-list <list-name>",
          "filter-list <list-name>",
          "route-filter <list-name>"
        ],
        "correct_index": 0,
        "explanation_en": "The command 'distribute-list <list-name> [in|out]' filters routing updates sent or received by EIGRP.",
        "explanation_th": "คำสั่ง 'distribute-list <list-name> [in|out]' ใช้กรองข้อมูลอัปเดตเส้นทางที่ส่งออกหรือรับเข้าสำหรับ EIGRP"
      },
      {
        "question_en": "When EIGRP summarizes routes, what AD value is assigned to the automatically generated Null0 summary discard route?",
        "question_th": "เมื่อ EIGRP ทำการย่อเส้นทาง ค่า AD (Administrative Distance) ใดที่ถูกระบุให้กับเส้นทาง Null0 ที่สร้างขึ้นโดยอัตโนมัติ?",
        "options": ["1", "5", "90", "170"],
        "correct_index": 1,
        "explanation_en": "The EIGRP summary discard route pointing to Null0 is assigned an Administrative Distance (AD) value of 5.",
        "explanation_th": "เส้นทาง Null0 (discard route) ที่เกิดจากการย่อเส้นทางใน EIGRP จะมีค่า Administrative Distance (AD) เท่ากับ 5"
      }
    ]
  },
  "lesson-adv003-01": {
    "questions": [
      {
        "question_en": "What type of routing protocol is BGP?",
        "question_th": "BGP จัดอยู่ในประเภทโปรโตคอลเร้าติ้งแบบใด?",
        "options": ["Link State", "Distance Vector", "Path Vector", "Hybrid"],
        "correct_index": 2,
        "explanation_en": "BGP is a Path Vector protocol that advertises the path history (AS_PATH attribute) of routes to destination networks.",
        "explanation_th": "BGP เป็นโปรโตคอลการจัดเส้นทางประเภท Path Vector ซึ่งใช้วิธีบอกประวัติการส่งข้อมูลผ่าน AS_PATH ไปยังเครือข่ายปลายทาง"
      },
      {
        "question_en": "What is the range of private AS Numbers (Autonomous System Numbers) under the 2-byte (16-bit) format?",
        "question_th": "ช่วงหมายเลข AS ส่วนบุคคล (Private AS Numbers) ในรูปแบบ 2 ไบต์ (16 บิต) คือเท่าใด?",
        "options": ["1 - 64511", "64512 - 65535", "65536 - 4294967295", "49152 - 65535"],
        "correct_index": 1,
        "explanation_en": "For 16-bit AS numbers, the range 64512 through 65535 is reserved for private use.",
        "explanation_th": "สำหรับหมายเลข AS ขนาด 16 บิต ช่วงตั้งแต่ 64512 ถึง 65535 จะถูกจองไว้สำหรับใช้งานส่วนบุคคล (Private AS)"
      },
      {
        "question_en": "Which organization oversees the allocation of Autonomous System Numbers (ASNs)?",
        "question_th": "หน่วยงานใดทำหน้าที่ดูแลและจัดสรรหมายเลข Autonomous System Number (ASN)?",
        "options": ["IEEE", "IANA / RIRs", "IETF", "ISOC"],
        "correct_index": 1,
        "explanation_en": "IANA manages the global pool of ASNs and delegates allocation to Regional Internet Registries (RIRs).",
        "explanation_th": "IANA บริหารจัดการกลุ่มหมายเลข ASN ระดับโลก และมอบหมายหน้าที่การกระจายสิทธิ์ไปยังทะเบียนอินเทอร์เน็ตระดับภูมิภาค (RIRs)"
      },
      {
        "question_en": "What is the difference between eBGP and iBGP?",
        "question_th": "ความแตกต่างระหว่าง eBGP และ iBGP คืออะไร?",
        "options": [
          "eBGP connects peers in the same AS; iBGP connects peers in different ASs.",
          "eBGP connects peers in different ASs; iBGP connects peers in the same AS.",
          "eBGP uses UDP; iBGP uses TCP.",
          "eBGP has a higher administrative distance than iBGP."
        ],
        "correct_index": 1,
        "explanation_en": "External BGP (eBGP) connects peers in different Autonomous Systems, whereas Internal BGP (iBGP) connects routers in the same AS.",
        "explanation_th": "External BGP (eBGP) เชื่อมต่อเพื่อนบ้านที่อยู่ต่าง AS กัน ส่วน Internal BGP (iBGP) เชื่อมต่อภายใน AS เดียวกัน"
      },
      {
        "question_en": "What transport layer protocol and port number does BGP use to establish neighbor sessions?",
        "question_th": "โปรโตคอลเลเยอร์ขนส่งและหมายเลขพอร์ตใดที่ BGP ใช้สร้างการเชื่อมต่อกับเพื่อนบ้าน?",
        "options": ["UDP Port 179", "TCP Port 179", "TCP Port 520", "SCTP Port 179"],
        "correct_index": 1,
        "explanation_en": "BGP establishes TCP sessions over port 179 to reliably exchange routing updates.",
        "explanation_th": "BGP ใช้การเชื่อมต่อแบบ TCP ผ่านพอร์ตหมายเลข 179 เพื่อแลกเปลี่ยนข้อมูลเร้าติ้งที่แม่นยำ"
      }
    ]
  },
  "lesson-adv003-02": {
    "questions": [
      {
        "question_en": "What configuration step is required for a router to accept BGP routing updates from an iBGP peer that is not directly connected?",
        "question_th": "ขั้นตอนการคอนฟิกใดจำเป็นต้องใช้เพื่อให้เร้าเตอร์ยอมรับข้อมูลจากคู่ iBGP ที่ไม่ได้เชื่อมต่อกันโดยตรง?",
        "options": [
          "Configure ebgp-multihop",
          "Ensure IP reachability between peer addresses (e.g., using loopbacks with IGP/static routes)",
          "Enable variance",
          "Use named BGP mode only"
        ],
        "correct_index": 1,
        "explanation_en": "iBGP sessions do not require peers to be directly connected, but IP reachability between peer IP addresses must be established first.",
        "explanation_th": "iBGP ไม่บังคับว่าอุปกรณ์คู่กันต้องเชื่อมต่อตรงผ่านสายจริง แต่ต้องมีข้อมูลเส้นทาง (IP reachability) ถึงกันได้ก่อน โดยมักใช้ Loopback ร่วมกับ IGP"
      },
      {
        "question_en": "Why is the loopback interface commonly used for BGP peering instead of physical interfaces?",
        "question_th": "เพราะเหตุใดจึงนิยมใช้อินเตอร์เฟส Loopback ในการจับคู่ (Peering) ของ BGP แทนการใช้อินเตอร์เฟสจริง?",
        "options": [
          "Loopback interfaces provide higher bandwidth.",
          "Loopback interfaces never go down, keeping the BGP session active as long as there is an active physical path.",
          "Loopbacks automatically encrypt the session.",
          "Cisco IOS enforces loopback use for eBGP."
        ],
        "correct_index": 1,
        "explanation_en": "Peering via loopback interfaces ensures session stability. The session remains up even if a physical link fails, provided backup paths exist.",
        "explanation_th": "การจับคู่ผ่าน Loopback ช่วยให้เซสชันเสถียร เพราะอินเตอร์เฟสจำลองนี้จะไม่มีวันล่ม ตราบใดที่มีเส้นทางกายภาพอื่นสำรองไว้เชื่อมเข้าหา"
      },
      {
        "question_en": "What command is required to establish BGP peering using a Loopback IP address as the source IP?",
        "question_th": "คำสั่งใดที่จำเป็นต้องป้อนเพื่อกำหนดให้ BGP Peering ใช้ไอพีของ Loopback เป็น IP ฝั่งส่ง?",
        "options": [
          "neighbor <ip-address> update-source loopback <number>",
          "neighbor <ip-address> next-hop-self",
          "neighbor <ip-address> ebgp-multihop 2",
          "update-source loopback <number>"
        ],
        "correct_index": 0,
        "explanation_en": "The 'neighbor update-source' command tells BGP to source TCP connection requests from the specified loopback interface IP.",
        "explanation_th": "คำสั่ง 'neighbor update-source' ใช้สั่งการให้ BGP ยึดที่อยู่ IP ของ Loopback เป็น IP ต้นทางของ TCP เซสชัน"
      },
      {
        "question_en": "By default, what is the TTL (Time to Live) value of eBGP packets?",
        "question_th": "ตามค่าเริ่มต้น ค่า TTL (Time to Live) ของแพ็กเก็ต eBGP คือเท่าใด?",
        "options": ["1", "2", "64", "255"],
        "correct_index": 0,
        "explanation_en": "eBGP peers are expected to be directly connected, so their peering packets have a default TTL of 1.",
        "explanation_th": "eBGP จะถูกกำหนดให้เชื่อมเชื่อมต่อตรงเท่านั้น แพ็กเก็ตของ eBGP จึงถูกจำกัดค่า TTL เริ่มต้นเป็น 1"
      },
      {
        "question_en": "What command is used to connect to an eBGP peer that is multiple router hops away (e.g., using loopbacks)?",
        "question_th": "คำสั่งใดใช้เพื่อสถาปนาการจับคู่ eBGP ที่อยู่ห่างออกไปหลาย Hop (เช่น กรณีเชื่อมต่อผ่าน Loopback)?",
        "options": [
          "neighbor <ip-address> update-source loopback",
          "neighbor <ip-address> ebgp-multihop <hop-count>",
          "neighbor <ip-address> remote-as <same-as-local>",
          "ebgp-multihop <hop-count>"
        ],
        "correct_index": 1,
        "explanation_en": "The 'neighbor <ip> ebgp-multihop <count>' command changes the default TTL of eBGP packets, permitting sessions over multiple hops.",
        "explanation_th": "คำสั่ง 'neighbor <ip> ebgp-multihop <count>' จะเปลี่ยนระดับค่า TTL เริ่มต้นของ eBGP เพื่อให้เชื่อมผ่านอุปกรณ์ข้ามพอยต์ได้"
      }
    ]
  },
  "lesson-adv003-03": {
    "questions": [
      {
        "question_en": "Which of the following BGP path attributes is proprietary to Cisco?",
        "question_th": "คุณลักษณะของเส้นทาง BGP (BGP path attribute) ข้อใดที่เป็นเอกสิทธิ์ของ Cisco เท่านั้น?",
        "options": ["AS_PATH", "Local Preference", "Weight", "MED"],
        "correct_index": 2,
        "explanation_en": "Weight is a Cisco-proprietary BGP attribute. It is configured locally on a single router and is not advertised to peers.",
        "explanation_th": "Weight เป็นแอตทริบิวต์เฉพาะตัวของ Cisco โดยประมวลผลอยู่ภายในตัวอุปกรณ์นั้นตัวเดียว ไม่มีการส่งต่อไปยังเร้าเตอร์เพื่อนบ้านอื่น"
      },
      {
        "question_en": "What BGP path attribute is used to influence outbound traffic leaving an Autonomous System, and is propagated throughout the local AS?",
        "question_th": "แอตทริบิวต์ BGP ใดที่ใช้จูงใจทราฟฟิกขาส่งออกไปนอก Autonomous System โดยมีการกระจายข่าวสารนี้ไปทั่วทั้ง AS ภายใน?",
        "options": ["Weight", "Local Preference", "MED (Multi-Exit Discriminator)", "Origin"],
        "correct_index": 1,
        "explanation_en": "Local Preference is used to select outbound paths from a local AS and is propagated to all iBGP peers inside that AS.",
        "explanation_th": "Local Preference ใช้จัดระดับทราฟฟิกขาส่งออกจาก AS ท้องถิ่น โดยจะแลกเปลี่ยนและรู้กันเฉพาะกลุ่ม iBGP ภายในระบบเดียวกัน"
      },
      {
        "question_en": "Which attribute is sent to external AS peers to influence inbound traffic decisions on how they reach your networks?",
        "question_th": "แอตทริบิวต์ใดที่ถูกส่งไปยังเร้าเตอร์ AS ภายนอกเพื่อกำหนดเส้นทางขากลับ (Inbound traffic) เข้าสู่เครือข่ายของเรา?",
        "options": ["Weight", "Local Preference", "MED (Multi-Exit Discriminator)", "AS_PATH"],
        "correct_index": 2,
        "explanation_en": "MED (Multi-Exit Discriminator) is sent to external AS peers to suggest which entrance to use when sending traffic into your AS.",
        "explanation_th": "MED (Multi-Exit Discriminator) ใช้ส่งออกไปยังเพื่อนบ้านภายนอกเพื่อบอกแนวทางเชื่อมต่อกลับมาว่าควรเข้ามาทางอินเตอร์เฟสใด"
      },
      {
        "question_en": "How does BGP use the AS_PATH attribute to prevent routing loops?",
        "question_th": "BGP นำแอตทริบิวต์ AS_PATH มาประยุกต์ใช้เพื่อป้องกันการเกิดลูปการส่งข้อมูล (Routing Loop) ได้อย่างไร?",
        "options": [
          "BGP drops updates if the AS_PATH is longer than 10 ASs.",
          "A router will reject any BGP update if its own local AS number is present inside the AS_PATH.",
          "BGP encrypts updates that cross AS boundaries.",
          "BGP uses AS_PATH to calculate the OSPF cost."
        ],
        "correct_index": 1,
        "explanation_en": "If a BGP router receives an update containing its own local AS number in the AS_PATH, it discards the update to prevent routing loops.",
        "explanation_th": "หากเร้าเตอร์ BGP ได้รับข้อมูลเส้นทางที่มีหมายเลข AS ตัวเองปรากฏอยู่ในกลุ่มรายชื่อ AS_PATH มันจะโยนข้อมูลชิ้นนั้นทิ้งทันทีเพื่อกันข้อมูลเดินวนรอบ"
      },
      {
        "question_en": "Which of the following is considered a Well-Known Mandatory BGP attribute?",
        "question_th": "แอตทริบิวต์ BGP ในข้อใดที่จัดอยู่ในกลุ่มประเภทรู้จักทั่วไปและต้องมีในทุกความเคลื่อนไหว (Well-Known Mandatory)?",
        "options": ["MED", "Weight", "AS_PATH", "Local Preference"],
        "correct_index": 2,
        "explanation_en": "Well-known mandatory attributes, such as AS_PATH, ORIGIN, and NEXT_HOP, must be recognized by all BGP implementations and present in every update.",
        "explanation_th": "แอตทริบิวต์ Well-known mandatory เช่น AS_PATH, ORIGIN และ NEXT_HOP เป็นสิ่งจำเป็นที่ตัวแทนระบบ BGP ทุกค่ายต้องสามารถตีความและใส่มาในทุกๆ รายงาน"
      }
    ]
  },
  "lesson-adv003-04": {
    "questions": [
      {
        "question_en": "What is the very first criteria BGP evaluates to select the best path?",
        "question_th": "เกณฑ์ลำดับแรกสุดที่ BGP นำมาพิจารณาเพื่อเลือกเส้นทางที่ดีที่สุดคืออะไร?",
        "options": ["Highest Local Preference", "Highest Weight (Cisco)", "Shortest AS_PATH", "Lowest MED"],
        "correct_index": 1,
        "explanation_en": "On Cisco routers, BGP evaluates the 'Weight' attribute first. Higher weights are preferred.",
        "explanation_th": "สำหรับอุปกรณ์ Cisco ค่าที่จะถูกเช็คเป็นสิทธิ์อันดับแรกคือ Weight โดยจะเลือกเส้นทางที่มีค่านี้สูงที่สุดก่อน"
      },
      {
        "question_en": "If Weight values are equal on a Cisco router, what is the next attribute evaluated in the BGP route selection process?",
        "question_th": "หากค่า Weight ที่ตรวจสอบเบื้องต้นมีค่าเท่ากัน แอตทริบิวต์ถัดไปที่ BGP นำมาวิเคราะห์หาเส้นทางที่ดีที่สุดคืออะไร?",
        "options": ["AS_PATH", "Local Preference", "MED", "Router ID"],
        "correct_index": 1,
        "explanation_en": "If weights match, BGP evaluates 'Local Preference' next. The route with the highest local preference is selected.",
        "explanation_th": "หาก Weight เท่ากัน ลำดับต่อไปคือวิเคราะห์จาก Local Preference โดยจะเลือกค่าที่สูงที่สุด"
      },
      {
        "question_en": "How does BGP evaluate the AS_PATH attribute during the path selection process?",
        "question_th": "BGP มีการวิเคราะห์จัดลำดับแอตทริบิวต์ AS_PATH ในขั้นตอนการคัดเลือกเส้นทางอย่างไร?",
        "options": [
          "The path with the longest AS_PATH is preferred.",
          "The path with the shortest AS_PATH (least number of AS hops) is preferred.",
          "The path with the most private AS numbers is preferred.",
          "The path that contains local AS is preferred."
        ],
        "correct_index": 1,
        "explanation_en": "BGP prefers routes with the shortest AS_PATH length, which represents fewer intermediate autonomous systems.",
        "explanation_th": "BGP จะเลือกเส้นทางที่มีความยาวของ AS_PATH สั้นที่สุด เพราะหมายถึงผ่านเขต Autonomous System น้อยรายที่สุด"
      },
      {
        "question_en": "Between eBGP and iBGP routes, which one does the BGP selection process prefer?",
        "question_th": "ระหว่างเส้นทางที่เรียนรู้จาก eBGP กับ iBGP ระบบคัดเลือกของ BGP จะจัดความสำคัญให้ฝั่งใดก่อน?",
        "options": [
          "BGP prefers iBGP routes over eBGP.",
          "BGP prefers eBGP routes over iBGP.",
          "BGP treats them with equal preference.",
          "BGP dynamically randomizes the choice."
        ],
        "correct_index": 1,
        "explanation_en": "BGP prefers routes learned from External BGP (eBGP) over those learned from Internal BGP (iBGP).",
        "explanation_th": "BGP จะให้คะแนนสิทธิ์ในการเลือกกับเส้นทางที่ได้ยินจากภายนอก (eBGP) มากกว่าภายใน (iBGP)"
      },
      {
        "question_en": "If all other attributes are identical, how is the tie-breaker resolved in BGP path selection?",
        "question_th": "หากค่าแอตทริบิวต์การวิเคราะห์ด้านหลักทั้งหมดเสมอกัน ด่านสุดท้ายที่จะตัดสินขาดเส้นทางใน BGP คืออะไร?",
        "options": [
          "Path with the lowest MED.",
          "Path coming from the peer with the lowest Router ID.",
          "Path with the longest uptime.",
          "Path with the highest IP address."
        ],
        "correct_index": 1,
        "explanation_en": "If multiple routes remain tied, BGP defaults to selecting the route from the peer with the lowest BGP Router ID (RID).",
        "explanation_th": "เมื่อคะแนนเปรียบเทียบในหมวดสำคัญทั้งหมดเท่ากัน ตัวตัดสินสุดท้ายคือการเลือกคู่เพื่อนบ้านที่มี BGP Router ID ต่ำที่สุด"
      }
    ]
  },
  "lesson-adv003-05": {
    "questions": [
      {
        "question_en": "What command is used to apply a Route Map to a specific BGP neighbor?",
        "question_th": "คำสั่งใดใช้ผูกการทำงานของ Route Map เข้ากับ BGP Neighbor เฉพาะเจาะจง?",
        "options": [
          "neighbor <ip-address> route-map <map-name> [in | out]",
          "distribute-list route-map <map-name>",
          "neighbor <ip-address> filter-map <map-name>",
          "ip route-map <map-name> neighbor <ip-address>"
        ],
        "correct_index": 0,
        "explanation_en": "The 'neighbor <ip> route-map <name> [in|out]' command is used in BGP configuration to apply policies in either direction.",
        "explanation_th": "ใช้คำสั่ง 'neighbor <ip> route-map <name> [in|out]' ในการตั้งค่า BGP เพื่อระบุกรองข้อมูลขาเข้าหรือขาออก"
      },
      {
        "question_en": "In a Route Map statement, what does the 'match' command do?",
        "question_th": "ในประโยคทำงานของ Route Map คำสั่ง 'match' ทำหน้าที่อะไร?",
        "options": [
          "It modifies the attribute of a matched route.",
          "It defines the criteria that a route must meet to be processed by this clause.",
          "It automatically permits the route.",
          "It resets the BGP connection."
        ],
        "correct_index": 1,
        "explanation_en": "The 'match' command defines the filtering criteria (such as matching an IP prefix list or ACL).",
        "explanation_th": "คำสั่ง 'match' ใช้ระบุเกณฑ์ตัวแปรในการตรวจสอบ เช่น เช็คว่าตรงกับเลขไอพีใน prefix list หรือ ACL หรือไม่"
      },
      {
        "question_en": "In a Route Map statement, what does the 'set' command do?",
        "question_th": "ในประโยคทำงานของ Route Map คำสั่ง 'set' ทำหน้าที่อะไร?",
        "options": [
          "It selects which IP addresses to filter.",
          "It modifies the attributes of routes that pass the match criteria.",
          "It terminates the route map execution.",
          "It configures interface parameters."
        ],
        "correct_index": 1,
        "explanation_en": "The 'set' command is used to manipulate path attributes (e.g., set local-preference, weight, or metric) on routes that meet the match criteria.",
        "explanation_th": "คำสั่ง 'set' ใช้สั่งการเปลี่ยนค่าแอตทริบิวต์เส้นทาง (เช่น ตั้งค่า local-preference หรือ weight) ให้กับกลุ่มข้อมูลที่กรองเข้าเกณฑ์สำเร็จ"
      },
      {
        "question_en": "What happens if a route does not match any clauses in a Route Map?",
        "question_th": "จะเกิดอะไรขึ้นกับเส้นทางเครือข่าย หากนำมาวิ่งตรวจสอบผ่าน Route Map แล้วไม่สอดคล้องกับหัวข้อใดๆ เลย?",
        "options": [
          "It is automatically permitted with default attributes.",
          "It is implicitly denied (dropped).",
          "It is sent to Area 0.",
          "The route map raises a warning error."
        ],
        "correct_index": 1,
        "explanation_en": "Like Access Control Lists, Route Maps have an implicit deny at the end. Any route that does not match any entry is denied.",
        "explanation_th": "เช่นเดียวกับ ACL การทำงานของ Route Map จะมีคำสั่งปฏิเสธโดยนัย (implicit deny) อยู่ท้ายสุด หากข้อมูลไม่เข้าเคสใดเลยจะโดนปัดทิ้ง"
      },
      {
        "question_en": "Which filter type allows you to filter BGP routes using regular expressions based on the AS_PATH attribute?",
        "question_th": "รูปแบบการกรองเส้นทางชนิดใดที่เปิดให้สามารถระบุ Regular Expression ตรวจสอบแอตทริบิวต์ AS_PATH เพื่อเลือกคัดกรองข้อมูล BGP?",
        "options": ["Access List", "Prefix List", "AS Path Access List (ip as-path access-list)", "Distribute List"],
        "correct_index": 2,
        "explanation_en": "An AS Path Access List ('ip as-path access-list') allows matching routes using regular expressions on the AS path string.",
        "explanation_th": "AS Path Access List ('ip as-path access-list') เปิดความสามารถในการกรองจับคู่เส้นทางโดยใช้ regular expression ค้นหารูปแบบในสตริง AS_PATH"
      }
    ]
  },
  "lesson-ccna001-01": {
    "questions": [
      {
        "question_en": "Which network type spans a small geographical area, such as a single home, school, or office building?",
        "question_th": "ประเภทเครือข่ายใดที่มีขอบเขตครอบคลุมพื้นที่ทางภูมิศาสตร์ขนาดเล็ก เช่น ภายในบ้าน โรงเรียน หรืออาคารสำนักงานแห่งเดียว?",
        "options": ["LAN (Local Area Network)", "WAN (Wide Area Network)", "MAN (Metropolitan Area Network)", "PAN (Personal Area Network)"],
        "correct_index": 0,
        "explanation_en": "A Local Area Network (LAN) connects network devices within a limited geographical area.",
        "explanation_th": "Local Area Network (LAN) ทำหน้าที่เชื่อมโยงอุปกรณ์เครือข่ายให้อยู่ร่วมกันในขอบเขตการทำงานภูมิศาสตร์จำกัด"
      },
      {
        "question_en": "What is the primary function of a router in a computer network?",
        "question_th": "หน้าที่หลักของเร้าเตอร์ (Router) ในเครือข่ายคอมพิวเตอร์คืออะไร?",
        "options": [
          "To connect end devices inside a single LAN.",
          "To forward data packets between different networks (routing).",
          "To provide wireless signals to mobile clients.",
          "To protect networks from malware attacks."
        ],
        "correct_index": 1,
        "explanation_en": "Routers operate at the Network Layer (Layer 3) to route packets across separate networks.",
        "explanation_th": "เร้าเตอร์ทำงานในเลเยอร์เน็ตเวิร์ก (Layer 3) เพื่อสลับส่งต่อแพ็กเก็ตข้อมูลข้ามเครือข่ายภายนอกที่อยู่ห่างออกไป"
      },
      {
        "question_en": "Which device is used to connect multiple end devices (like PCs and printers) within the same local network segment?",
        "question_th": "อุปกรณ์ใดทำหน้าที่เชื่อมเชื่อมต่อปลายทางหลายชุด (เช่น คอมพิวเตอร์ หรือเครื่องพิมพ์) ให้อยู่ในเซกเมนต์เครือข่ายท้องถิ่นเดียวกัน?",
        "options": ["Router", "Network Switch", "Modem", "Firewall"],
        "correct_index": 1,
        "explanation_en": "Switches connect devices within a single LAN segment, forwarding frames based on MAC addresses.",
        "explanation_th": "สวิตช์เครือข่าย (Network Switch) ทำหน้าที่เชื่อมโยงอุปกรณ์ต่างๆ ภายใน LAN เซกเมนต์เดียวกันโดยส่งต่อเฟรมอิงตาม MAC address"
      },
      {
        "question_en": "What is the term used to describe the geometric layout or physical/logical structure of connections in a network?",
        "question_th": "คำศัพท์ใดที่ใช้อธิบายลักษณะทางเรขาคณิตหรือโครงสร้างความเชื่อมโยงเชิงกายภาพและเชิงตรรกะในเครือข่าย?",
        "options": ["Network Topology", "IP Addressing", "Protocol Suite", "Routing Table"],
        "correct_index": 0,
        "explanation_en": "Network topology defines how nodes and links are arranged and connected physically or logically.",
        "explanation_th": "โครงสร้างเครือข่าย (Network Topology) ระบุถึงรูปร่างและรูปแบบแนวการเชื่อมต่อของโหนดและลิงก์เชื่อมต่อต่างๆ"
      },
      {
        "question_en": "Which protocol represents a set of rules that defines how devices format and transmit data across a network?",
        "question_th": "โปรโตคอลเครือข่ายหมายถึงอะไร?",
        "options": [
          "A type of network hardware cable.",
          "A set of rules that determines how network nodes communicate.",
          "A software application for browsing websites.",
          "An administrative user profile."
        ],
        "correct_index": 1,
        "explanation_en": "A protocol is a standardized set of rules that defines communication format, transmission, and error checking.",
        "explanation_th": "โปรโตคอลคือข้อกำหนดมาตรฐานในการสื่อสารที่ระบุถึงวิธีการจัดรูปแบบข้อมูล การส่งผ่าน และการตรวจจับข้อผิดพลาด"
      }
    ]
  },
  "lesson-ccna001-02": {
    "questions": [
      {
        "question_en": "How many layers are defined in the standard OSI model?",
        "question_th": "ตามโครงสร้างมาตรฐานของแบบจำลอง OSI (OSI Model) ประกอบด้วยเลเยอร์กี่ชั้น?",
        "options": ["4 layers", "5 layers", "7 layers", "9 layers"],
        "correct_index": 2,
        "explanation_en": "The Open Systems Interconnection (OSI) model defines 7 distinct layers.",
        "explanation_th": "แบบจำลอง Open Systems Interconnection (OSI Model) กำหนดแบ่งแยกกลุ่มหน้าที่การสื่อสารออกเป็น 7 เลเยอร์"
      },
      {
        "question_en": "Which OSI layer is responsible for routing data packets based on IP addresses?",
        "question_th": "เลเยอร์ใดในแบบจำลอง OSI ที่มีหน้าที่จัดเส้นทางแพ็กเก็ตข้อมูล (Routing) โดยพิจารณาอิงตามไอพีแอดเดรส?",
        "options": ["Data Link Layer", "Network Layer", "Transport Layer", "Physical Layer"],
        "correct_index": 1,
        "explanation_en": "The Network Layer (Layer 3) handles routing, logical addressing (IP), and packet forwarding.",
        "explanation_th": "เลเยอร์เน็ตเวิร์ก (Layer 3) ดูแลกระบวนการเร้าติ้ง การระบุเลขไอพี และการสลับส่งแพ็กเก็ตข้อมูล"
      },
      {
        "question_en": "What is the Protocol Data Unit (PDU) at the OSI Data Link Layer (Layer 2)?",
        "question_th": "หน่วยของข้อมูล PDU (Protocol Data Unit) ของการทำงานใน Data Link Layer (Layer 2) เรียกว่าอะไร?",
        "options": ["Segment", "Packet", "Frame", "Bit"],
        "correct_index": 2,
        "explanation_en": "At Layer 2 (Data Link), data is structured into 'Frames'. Layer 3 uses Packets, and Layer 4 uses Segments.",
        "explanation_th": "ที่เลเยอร์ 2 (Data Link) ข้อมูลจะจัดโครงสร้างหน่วยเป็น 'Frame' ส่วนเลเยอร์ 3 จะเรียก Packet และเลเยอร์ 4 จะเรียก Segment"
      },
      {
        "question_en": "Which OSI layer ensures reliable end-to-end communication, flow control, and error recovery (e.g., TCP)?",
        "question_th": "เลเยอร์ใดในแบบจำลอง OSI ที่คอยตรวจสอบความถูกต้องสมบูรณ์ของการส่งข้อมูลตั้งแต่ต้นทางถึงปลายทาง รวมถึงควบคุมการไหลของข้อมูล (Flow control)?",
        "options": ["Network Layer", "Transport Layer", "Session Layer", "Application Layer"],
        "correct_index": 1,
        "explanation_en": "The Transport Layer (Layer 4) manages reliability, flow control, sequencing, and port-based multiplexing.",
        "explanation_th": "เลเยอร์ทรานสปอร์ต (Layer 4) ดูแลเรื่องการส่งข้อมูลให้ครบถ้วน ความคุมความหนาแน่น และแยกแยะพอร์ตเชื่อมต่อ"
      },
      {
        "question_en": "Which layer of the OSI model interacts directly with user software applications (like Web Browsers)?",
        "question_th": "เลเยอร์ใดของแบบจำลอง OSI ที่ทำงานเชื่อมต่อสัมผัสใกล้ชิดกับแอปพลิเคชันซอฟต์แวร์ของผู้ใช้งาน (เช่น เว็บเบราว์เซอร์) โดยตรง?",
        "options": ["Application Layer", "Presentation Layer", "Session Layer", "Transport Layer"],
        "correct_index": 0,
        "explanation_en": "The Application Layer (Layer 7) provides protocols directly utilized by end-user software (HTTP, FTP, SMTP, etc.).",
        "explanation_th": "เลเยอร์แอปพลิเคชัน (Layer 7) เตรียมบริการและโปรโตคอลให้โปรแกรมปลายทางฝั่งผู้ใช้เรียกใช้งาน (เช่น HTTP, FTP)"
      }
    ]
  },
  "lesson-ccna001-03": {
    "questions": [
      {
        "question_en": "How many layers are defined in the modern/standard TCP/IP model?",
        "question_th": "ในแบบจำลอง TCP/IP (TCP/IP Model) ปัจจุบันประกอบด้วยเลเยอร์ทำงานกี่ชั้น?",
        "options": ["3 layers", "4 layers", "7 layers", "5 layers"],
        "correct_index": 1,
        "explanation_en": "The TCP/IP model originally defines 4 layers (Application, Transport, Internet, Network Access).",
        "explanation_th": "แบบจำลอง TCP/IP ดั้งเดิมประกอบด้วยเลเยอร์ทำงาน 4 ชั้นหลัก ได้แก่ Application, Transport, Internet และ Network Access"
      },
      {
        "question_en": "Which TCP/IP model layer corresponds to the Network Layer of the OSI model?",
        "question_th": "เลเยอร์ใดในแบบจำลอง TCP/IP ที่ทำบทบาทเทียบเท่ากับ Network Layer ในแบบจำลอง OSI?",
        "options": ["Network Access Layer", "Internet Layer", "Transport Layer", "Application Layer"],
        "correct_index": 1,
        "explanation_en": "The Internet Layer in the TCP/IP model corresponds to Layer 3 (Network Layer) of the OSI model.",
        "explanation_th": "เลเยอร์อินเทอร์เน็ต (Internet Layer) ใน TCP/IP ทำหน้าที่แบบเดียวกับ Network Layer (Layer 3) ของแบบจำลอง OSI"
      },
      {
        "question_en": "What is a key difference between TCP and UDP protocols?",
        "question_th": "ข้อแตกต่างที่สำคัญยิ่งระหว่างโปรโตคอล TCP และ UDP คืออะไร?",
        "options": [
          "TCP is connectionless and unreliable; UDP is connection-oriented.",
          "TCP is connection-oriented and reliable; UDP is connectionless and unreliable.",
          "TCP is faster than UDP.",
          "TCP is used at Layer 3; UDP is used at Layer 4."
        ],
        "correct_index": 1,
        "explanation_en": "TCP establishes a connection and guarantees delivery. UDP is connectionless, prioritizing speed over guaranteed packet arrival.",
        "explanation_th": "TCP จะสร้างเซสชันติดต่อก่อนและยืนยันการรับส่งข้อมูล ส่วน UDP จะส่งข้อมูลออกไปทันทีโดยเน้นความเร็วมากกว่าการยืนยันการถึง"
      },
      {
        "question_en": "Which layer of the TCP/IP model combines the physical and data link layers of the OSI model?",
        "question_th": "เลเยอร์ใดในแบบจำลอง TCP/IP ที่ควบรวมการทำงานของทั้งเลเยอร์กายภาพ (Physical) และเลเยอร์เชื่อมโยงข้อมูล (Data link) ของ OSI เข้าด้วยกัน?",
        "options": ["Application Layer", "Transport Layer", "Internet Layer", "Network Access Layer"],
        "correct_index": 3,
        "explanation_en": "The Network Access (or Link) Layer covers physical cabling, hardware addressing (MAC), and media access control.",
        "explanation_th": "เลเยอร์เน็ตเวิร์กแอคเซส (Network Access Layer) จะครอบคลุมเรื่องสายสัญญาณทางกายภาพและการระบุแอดเดรสฮาร์ดแวร์ (MAC address)"
      },
      {
        "question_en": "Which of the following protocols operates at the TCP/IP Transport Layer?",
        "question_th": "โปรโตคอลใดต่อไปนี้ที่ทำหน้าที่อยู่ในเลเยอร์ขนส่ง (Transport Layer) ของ TCP/IP?",
        "options": ["IP", "HTTP", "UDP", "ARP"],
        "correct_index": 2,
        "explanation_en": "TCP and UDP are the primary protocols operating at the Transport Layer.",
        "explanation_th": "TCP และ UDP เป็นแกนหลักในการแลกเปลี่ยนที่จัดอยู่ในชั้นการขนส่ง (Transport Layer)"
      }
    ]
  }
};
