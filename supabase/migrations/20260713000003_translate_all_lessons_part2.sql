-- Migration Part 2: Translate content_th to English for content_en

UPDATE public.lessons SET content_en = '## VTP and Inter-VLAN Routing

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
VTP reduces Admin workload but carries risks. Inter-VLAN routing enables all VLANs to cross-communicate based on defined policies.'
WHERE id = 'lesson-ccna002-05';

UPDATE public.lessons SET content_en = '## VTP and Inter-VLAN Routing

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
VTP reduces administrative tasks but requires caution regarding risks. Inter-VLAN routing allows all VLANs to communicate cross-network according to defined policies.'
WHERE id = 'lesson-ccna002-07';

UPDATE public.lessons SET content_en = '## Routing Basics

**What you will learn in this video**
This video explains the principles of a Router and how it makes data forwarding decisions across networks.

**Core Content**
- A Router operates at Layer 3, transmitting data between different networks by referencing its Routing Table.
- **Routing Table:** A table storing paths to various networks, containing Destination, Next-Hop, Interface, Metric.
- **Administrative Distance (AD):** The trustworthiness value of a routing source, e.g., Connected=0, Static=1, OSPF=110, RIP=120.
- **Metric:** The value a Routing Protocol uses to measure route quality, such as Hop Count, Bandwidth, Delay.

**Conclusion**
Every time a packet arrives at a Router, it searches the Routing Table. If it matches an Entry, it forwards the packet to that Entry''s Next-Hop.'
WHERE id = 'lesson-ccna003-01';

UPDATE public.lessons SET content_en = '## Static Routing

**What you will learn in this video**
This video teaches Manual route configuration (Static Route), ideal for small networks or specifying special routes.

**Core Content**
- Command: `ip route <Destination Network> <Subnet Mask> <Next-Hop IP or Exit Interface>`
- **Default Route:** `ip route 0.0.0.0 0.0.0.0 <Next-Hop>` sends all unknown traffic out the Gateway.
- **Floating Static Route:** Sets a higher AD than Dynamic Protocols to act as a Backup Route.
- Advantages: Predictable, secure, uses zero CPU/Bandwidth.
- Disadvantages: Requires manual configuration for every route; does not scale in large networks.

**Conclusion**
Static Routing is perfect for Edge Routers connecting to an ISP or Stub Networks with only one way out.'
WHERE id = 'lesson-ccna003-02';

UPDATE public.lessons SET content_en = '## RIP (Routing Information Protocol)

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
Although modern large organizations use OSPF or EIGRP, RIP remains an essential fundamental protocol for studying and understanding Dynamic Routing principles.'
WHERE id = 'lesson-ccna003-03';

UPDATE public.lessons SET content_en = '## OSPF Basics

**What you will learn in this video**
This video introduces OSPF (Open Shortest Path First), the most widely used Link-State Dynamic Routing Protocol in enterprise networks.

**Core Content**
- OSPF uses Dijkstra''s Algorithm (SPF) to calculate the shortest path based on Bandwidth (Cost).
- **DR/BDR Election:** In Multi-access networks (Ethernet), a Designated Router is elected to reduce overhead.
- **LSA (Link-State Advertisement):** Data exchanged between OSPF Routers to build the Topology Map.
- **Area:** OSPF is divided into Areas to reduce LSDB size; every Area must connect to Area 0 (Backbone).
- Basic commands: `router ospf 1`, `network 192.168.1.0 0.0.0.255 area 0`

**Conclusion**
OSPF is highly scalable, converges quickly, and is an open Standard, making it the most popular protocol for Enterprise Networks.'
WHERE id = 'lesson-ccna003-04';

UPDATE public.lessons SET content_en = '## EIGRP Basics

**What you will learn in this video**
This video introduces EIGRP (Enhanced Interior Gateway Routing Protocol), an advanced Cisco proprietary protocol.

**Core Content**
- EIGRP is an Advanced Distance Vector protocol using the DUAL Algorithm (Diffusing Update Algorithm) to guarantee loop-free networks.
- **Metric:** Calculated primarily from Bandwidth and Delay (K-values).
- **Successor & Feasible Successor:** Stores Backup Routes in advance, allowing for rapid (sub-second) failover.
- **Neighbor Relationship:** Uses Hello Packets to form Neighbors before exchanging data.
- Commands: `router eigrp 100`, `network 10.0.0.0 0.255.255.255`

**Conclusion**
EIGRP converges much faster than OSPF and is ideal for networks requiring rapid failover, but its drawback is that it is strictly for Cisco devices.'
WHERE id = 'lesson-ccna003-05';

UPDATE public.lessons SET content_en = '## WAN Overview

**What you will learn in this video**
This video explains the various types of WAN connections organizations use to connect remote branches.

**Core Content**
- **Leased Line:** A private rented circuit, highly stable but expensive (T1/E1, DS3).
- **MPLS (Multi-Protocol Label Switching):** An ISP technology that forwards data using Labels instead of IPs for speed and QoS.
- **Internet-based VPN:** Connects branches over the internet using encryption; cheaper but without SLA guarantees.
- **SD-WAN:** A modern technology that intelligently manages multiple WAN links simultaneously.

**Conclusion**
Choosing a WAN Technology requires balancing an organization''s Budget, Bandwidth, Latency, and SLA needs. MPLS remains popular for large enterprises, but SD-WAN is rapidly gaining ground today.'
WHERE id = 'lesson-ccna004-01';

UPDATE public.lessons SET content_en = '## PPP and HDLC

**What you will learn in this video**
This video teaches Data Link layer protocols used on Point-to-Point Serial/WAN Links.

**Core Content**
- **HDLC (High-Level Data Link Control):** Cisco''s default protocol on serial interfaces. Simple but Cisco-proprietary.
- **PPP (Point-to-Point Protocol):** Open standard protocol. Supports Authentication (PAP/CHAP), Compression, and Multilink.
- **PPPoE:** PPP over Ethernet. Commonly seen in home broadband ADSL/Fiber connections.
- PPP Configuration: `encapsulation ppp`, `ppp authentication chap`

**Conclusion**
Although HDLC and PPP are older technologies, they still appear in CCNA exams and some legacy enterprise WAN systems.'
WHERE id = 'lesson-ccna004-02';

UPDATE public.lessons SET content_en = '## MPLS and VPN

**What you will learn in this video**
This video explains the principles of MPLS, the backbone of global ISP networks.

**Core Content**
- **MPLS Labels:** Replaces IP lookups with Labels for maximum speed.
- **LSR (Label Switching Router):** A router that forwards data using Labels instead of a Routing Table.
- **MPLS VPN (L3VPN):** Allows multiple clients to share the same MPLS infrastructure by separating traffic using VRF (Virtual Routing and Forwarding).
- Advantages: Low Latency, guaranteed QoS, supports Traffic Engineering.

**Conclusion**
MPLS is the underlying technology of high-end Enterprise WANs, allowing ISPs to provide Guaranteed SLAs for Latency and Bandwidth.'
WHERE id = 'lesson-ccna004-03';

UPDATE public.lessons SET content_en = '## WAN Design and Redundancy

**Introduction**
Wide Area Networks (WANs) connect dispersed organizational sites. Designing an effective WAN requires a focus on high availability and stability.

**Design Topologies**
- **Hub and Spoke:** Headquarters acts as the center (Hub) with branches (Spoke) connecting in. Simple to manage but has a Single Point of Failure.
- **Full Mesh:** All branches connect to each other. Most stable but very expensive.
- **Partial Mesh:** A hybrid approach to reduce costs, directly connecting only the critical branches.

**Importance of Redundancy**
Designing backup networks (Dual-homed or Dual-WAN) ensures continuous operation if the primary link fails, often combined with protocols like BGP or modern SD-WAN.

**Conclusion**
Good WAN design balances performance, cost, and reliability. Planning for Redundancy is the heart of this process.'
WHERE id = 'lesson-ccna004-04';

UPDATE public.lessons SET content_en = '## PPP and HDLC

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
Although HDLC and PPP are legacy technologies, they are still tested in CCNA and used in some enterprise WANs, especially PPPoE which remains widely used in broadband.'
WHERE id = 'lesson-ccna004-07';

UPDATE public.lessons SET content_en = '## DHCP (Dynamic Host Configuration Protocol)

**What you will learn in this video**
This video teaches how to configure a DHCP Server on a Cisco Router to automatically distribute IPs to network devices.

**Core Content**
- DORA Process: **Discover** → **Offer** → **Request** → **Acknowledge**
- DHCP Pool Configuration on Cisco: `ip dhcp pool LAN`, `network 192.168.1.0 /24`, `default-router`, `dns-server`
- **DHCP Exclusion:** Reserving IP ranges so they aren''t distributed, e.g., `ip dhcp excluded-address 192.168.1.1 192.168.1.10`
- **DHCP Relay Agent:** Used when the DHCP Server is on a different Subnet than the Client, configured with `ip helper-address`

**Conclusion**
DHCP massively reduces Admin workloads and is used in every organization. Understanding DHCP Relay is vital for large networks.'
WHERE id = 'lesson-ccna005-01';

UPDATE public.lessons SET content_en = '## DNS (Domain Name System)

**What you will learn in this video**
This video explains the mechanics of DNS, which translates domain names into IP Addresses—a background process that runs every time we type a URL.

**Core Content**
- **DNS Hierarchy:** Root (.) → TLD (.com, .th) → Second-Level (google.com) → Subdomain (mail.google.com)
- **DNS Records:** A (IPv4), AAAA (IPv6), MX (Mail), CNAME (Alias), PTR (Reverse Lookup)
- **Recursive vs Iterative Query:** A Client queries a DNS Resolver, which then queries further up until an answer is found.
- **DNS Caching & TTL:** Answers are cached based on TTL values to reduce traffic.

**Conclusion**
DNS is the "Phonebook" of the Internet. If DNS goes down, all services become unusable even if internet connectivity is completely normal.'
WHERE id = 'lesson-ccna005-02';

UPDATE public.lessons SET content_en = '## NAT and PAT

**What you will learn in this video**
This video teaches IP Address translation, allowing devices with Private IPs to access the internet.

**Core Content**
- **Static NAT:** 1 Private IP ↔ 1 Public IP (Used for servers requiring a fixed IP).
- **Dynamic NAT:** Pool of Private IPs ↔ Pool of Public IPs (First-come, first-served).
- **PAT (Port Address Translation / NAT Overload):** Multiple Private IPs → 1 Public IP, differentiated by Port Number (This is what is used in every home).
- Configuration: `ip nat inside`, `ip nat outside`, `ip nat inside source list <ACL> interface <int> overload`

**Conclusion**
PAT is what keeps IPv4 viable today despite address exhaustion, as each home only needs 1 public IP for all its devices.'
WHERE id = 'lesson-ccna005-03';

UPDATE public.lessons SET content_en = '## ACL (Access Control Lists)

**What you will learn in this video**
This video teaches the use of ACLs to filter traffic on a Router, which is a fundamental Layer 3/4 security tool.

**Core Content**
- **Standard ACL (1-99):** Filters by Source IP only → Place near Destination.
- **Extended ACL (100-199):** Filters by Source IP, Destination IP, Protocol, Port → Place near Source.
- Wildcard Mask: The inverse of a Subnet Mask (e.g., /24 = Wildcard 0.0.0.255).
- ACLs process top-down, stop upon Match, and always have an **Implicit Deny** at the end.
- Applying ACLs to an Interface: `ip access-group <ACL> in/out`

**Conclusion**
ACLs act as basic firewalls built into Routers, great for simple traffic control, but cannot replace Stateful Firewalls.'
WHERE id = 'lesson-ccna005-04';

UPDATE public.lessons SET content_en = '## NTP and Syslog

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
Without NTP, log timestamps will drift, making it impossible to correlate Syslog data across multiple devices to analyze network issues.'
WHERE id = 'lesson-ccna005-05';

UPDATE public.lessons SET content_en = '## NAT and PAT

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
PAT is what keeps IPv4 functional today despite address exhaustion, as each household uses just 1 public IP for all its devices.'
WHERE id = 'lesson-ccna005-07';

UPDATE public.lessons SET content_en = '## Security Concepts

**What you will learn in this video**
This video introduces fundamental network security concepts and common modern threats.

**Core Content**
- **CIA Triad:** Confidentiality (data doesn''t leak), Integrity (data isn''t altered), Availability (systems are always ready to use).
- **Threat Types:** Malware, Phishing, DoS/DDoS, Man-in-the-Middle, SQL Injection.
- **Defense in Depth:** Multi-layered defense, not relying on a Single Point of Defense.
- **Firewall Types:** Packet Filter, Stateful Inspection, NGFW (Next-Gen).
- **IDS vs IPS:** IDS detects and alerts, IPS detects and automatically blocks.

**Conclusion**
Security is not a product but an ongoing process. Network engineers must understand threats to design comprehensive defense systems.'
WHERE id = 'lesson-ccna006-01';

UPDATE public.lessons SET content_en = '## Switch Security

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
Layer 2 Security is often overlooked but is extremely important, as LAN attacks can easily take down the entire system.'
WHERE id = 'lesson-ccna006-02';

UPDATE public.lessons SET content_en = '## ACLs for Network Security

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
A well-designed ACL acts as an important defensive layer on Routers and Layer 3 Switches before traffic even reaches the Firewall.'
WHERE id = 'lesson-ccna006-03';

UPDATE public.lessons SET content_en = '## AAA Framework

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
AAA is the heart of an organization''s Security Policy, allowing administrators to tightly control and audit every action on the network.'
WHERE id = 'lesson-ccna006-04';

UPDATE public.lessons SET content_en = '## Cisco DNA Center API

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
DNA Center API enables rapid automation of Campus Network management and forms the foundation for modern Network DevOps.'
WHERE id = 'lesson-dev002-01';

UPDATE public.lessons SET content_en = '## Cisco SD-WAN API (vManage)

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
SD-WAN APIs empower Network Engineers to build Custom Dashboards and automate responses to network events.'
WHERE id = 'lesson-dev002-02';

UPDATE public.lessons SET content_en = '## Cisco Meraki API

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
The Meraki API is an excellent starting point for learning Network Automation due to its clear Documentation and Interactive API Docs that allow immediate testing.'
WHERE id = 'lesson-dev002-03';
