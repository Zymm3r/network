-- Migration Part 1: Translate content_th to English for content_en

UPDATE public.lessons SET content_en = '## OSPF Areas and LSA Types

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
Understanding OSPF Areas and LSA Types is foundational for designing and troubleshooting large OSPF networks.'
WHERE id = 'lesson-adv-001';

UPDATE public.lessons SET content_en = '## OSPF Route Summarization

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
OSPF Route Summarization is an essential technique for large networks. Properly using `area range` on ABRs and `summary-address` on ASBRs makes the network more efficient, stable, and scalable.'
WHERE id = 'lesson-adv-002';

UPDATE public.lessons SET content_en = '## EIGRP Architecture

**What you will learn in this video**
This video delves into the internal architecture of EIGRP and how the DUAL Algorithm guarantees a loop-free network.

**Core Content**
- **DUAL Algorithm:** Pre-calculates backup routes (Feasible Successors). When the primary route fails, it fails over immediately.
- **Feasibility Condition:** A crucial condition used to verify that the backup route will not cause a routing loop.
- **EIGRP Tables:** Neighbor Table, Topology Table, Routing Table.
- **Packet Types:** Hello, Update, Query, Reply, Acknowledgment.
- **Named EIGRP Mode:** A modern configuration mode that unifies all Address Families in one place.

**Conclusion**
EIGRP is a complex but powerful protocol. Understanding DUAL and the Feasibility Condition helps accurately debug routing issues.'
WHERE id = 'lesson-adv002-01';

UPDATE public.lessons SET content_en = '## EIGRP Metric and Tuning

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
Properly tuning EIGRP metrics ensures traffic flows through the most optimal paths and prevents suboptimal routing issues.'
WHERE id = 'lesson-adv002-02';

UPDATE public.lessons SET content_en = '## EIGRP Load Balancing

**What you will learn in this video**
This video teaches traffic load balancing in EIGRP, one of the unique features that makes EIGRP stand out.

**Core Content**
- **Equal-Cost Load Balancing (ECMP):** When multiple paths have the exact same metric, traffic is load-balanced immediately (up to 4 paths by default).
- **Unequal-Cost Load Balancing:** A unique capability of EIGRP, enabled using the `variance <multiplier>` command.
  - `variance 2` means it allows routes with a metric up to 2 times the Successor''s metric to participate in load balancing.
- **Maximum Paths:** Increase the maximum number of paths with `maximum-paths <N>` (up to 16).

**Conclusion**
Unequal-cost Load Balancing in EIGRP is a feature absent in OSPF, allowing networks to fully utilize links of differing speeds.'
WHERE id = 'lesson-adv002-03';

UPDATE public.lessons SET content_en = '## EIGRP Route Filtering and Summarization

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
Combining Filtering and Summarization in EIGRP increases network stability, reduces router CPU load, and provides complete control over routing paths.'
WHERE id = 'lesson-adv002-04';

UPDATE public.lessons SET content_en = '## BGP Overview

**What you will learn in this video**
This video introduces BGP (Border Gateway Protocol), the routing protocol that powers the entire Internet.

**Core Content**
- BGP is an **EGP (Exterior Gateway Protocol)** used to connect different AS (Autonomous Systems).
- **AS Number:** A unique identifier for each organization on the internet (e.g., AS7470 = TOT, AS9335 = AIS).
- **iBGP vs eBGP:** iBGP connects routers within the same AS, eBGP connects different ASs.
- BGP is not a fast protocol, but it is the **most controllable and flexible protocol**.
- Uses TCP Port 179, does not use Multicast, and neighbors must be configured manually.

**Conclusion**
BGP is an ISP-level protocol that advanced network engineers must know. It is foundational for CCNP/CCIE and real-world ISP operations.'
WHERE id = 'lesson-adv003-01';

UPDATE public.lessons SET content_en = '## BGP Neighbors and Sessions

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
BGP sessions failing to establish are usually caused by wrong AS Numbers, lack of connectivity to the Peer IP, or firewall issues blocking TCP 179.'
WHERE id = 'lesson-adv003-02';

UPDATE public.lessons SET content_en = '## BGP Attributes

**What you will learn in this video**
This video explains the BGP Attributes used to make the best path selection decisions.

**Core Content**
- **Well-Known Mandatory:** Every router must recognize and pass it on → AS-Path, Next-Hop, Origin.
- **Well-Known Discretionary:** Every router recognizes but may not pass on → Local Preference (Default is 100, higher = better).
- **Optional Transitive:** Passed on even if unrecognized → Community.
- **Optional Non-Transitive:** Not passed on → MED (Multi-Exit Discriminator).
- **BGP Best Path Selection Process:** A 14-step process to choose the best route, evaluated in order of Weight → Local Pref → AS Path Length → ...

**Conclusion**
BGP Attributes are the primary tools for BGP Traffic Engineering. Understanding Local Preference, AS-Path, and MED allows you to control traffic directions.'
WHERE id = 'lesson-adv003-03';

UPDATE public.lessons SET content_en = '## BGP Path Selection

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
BGP Traffic Engineering is an advanced skill used daily by ISP Engineers to control which ISP traffic enters or exits through.'
WHERE id = 'lesson-adv003-04';

UPDATE public.lessons SET content_en = '## BGP Filtering and Route Maps

**Introduction**
Border Gateway Protocol (BGP) is the core protocol driving the internet. Because the global internet routing table is massive (millions of full routes), route filtering is an absolute necessity.

**BGP Filtering Tools**
- **Prefix-lists:** Widely used to accurately filter by IP Prefix and Subnet mask.
- **AS-Path ACLs:** Used to filter based on AS Numbers using Regular Expressions (Regex), such as only accepting routes originating from an adjacent AS.
- **Route Maps:** The most powerful tool, acting like a set of IF-THEN scripting commands.

**Applying Route Maps**
Route Maps can match routes using Prefix-lists, and then act (Set) to modify BGP Attributes such as Local Preference, MED, or AS-Path Prepending to engineer traffic paths.

**Conclusion**
BGP Filtering and Route Maps are expert-level tools that give organizations full control over where they receive data from and which ISP they send traffic to.'
WHERE id = 'lesson-adv003-05';

UPDATE public.lessons SET content_en = '## Fundamental Networking: Computer Network Infrastructure

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
This video aims to build an understanding of network infrastructure mechanisms, serving as a critical knowledge base before moving up to Application Layer Network Services (such as DHCP, DNS, and NAT) in the next lessons.'
WHERE id = 'lesson-ccna001-01';

UPDATE public.lessons SET content_en = '## OSI Model and Network Fundamentals

**What you will learn in this video**
This video introduces the 7-Layer OSI Model, which is the standard framework for understanding how data travels across a network.

**Core Content**
- **Layer 7 – Application:** User interfaces such as HTTP, DNS, FTP.
- **Layer 4 – Transport:** TCP (reliable) and UDP (fast) manage data delivery between endpoints.
- **Layer 3 – Network:** IP Addressing and Routing to find paths across networks.
- **Layer 2 – Data Link:** MAC Addresses and Switching to deliver data within a LAN.
- **Layer 1 – Physical:** Cables, radio waves, digital signals.

**Conclusion**
The OSI Model is the foundation every network engineer must know before learning anything else, as it provides a systematic framework for troubleshooting network issues.'
WHERE id = 'lesson-ccna001-02';

UPDATE public.lessons SET content_en = '## TCP/IP Protocol Suite

**Introduction**
The TCP/IP Protocol Suite is the foundation of communication in computer networks and the Internet, designed to allow disparate systems to communicate across different platforms.

**Layer Architecture**
Consists of 4 main layers:
- **Application Layer:** Equivalent to Layers 5-7 of the OSI Model, handling user-level protocols like HTTP, FTP.
- **Transport Layer:** Manages host-to-host connections. Its two main protocols are TCP (reliable) and UDP (fast).
- **Internet Layer:** Equivalent to the Network Layer, responsible for pathfinding and IP Addressing.
- **Network Access Layer:** Manages hardware and data transmission over physical media.

**Conclusion**
TCP/IP is the practical model used today. It is simpler and more flexible than the OSI Model, making it the universal standard for networking.'
WHERE id = 'lesson-ccna001-03';

UPDATE public.lessons SET content_en = '## Ethernet and LAN Fundamentals

**What you will learn in this video**
This video explains the operation of Ethernet, the most widely used LAN technology in the world.

**Core Content**
- Ethernet Frame structure and MAC Addresses (48-bit, globally unique).
- Half-duplex and Full-duplex transmission methods.
- Differences between Hubs, Switches, and Bridges.
- Various Ethernet standards such as 10/100/1000 Mbps (Fast/Gigabit Ethernet).
- How ARP (Address Resolution Protocol) works to map IP to MAC.

**Conclusion**
Understanding Ethernet and MAC Addresses is the foundation for all Layer 2 operations before moving on to advanced VLANs and Switching.'
WHERE id = 'lesson-ccna001-04';

UPDATE public.lessons SET content_en = '## IP Addressing and Subnetting

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
Subnetting is a skill that must be mastered through practice, as it forms the basis of IP design and management in real-world networks of all sizes.'
WHERE id = 'lesson-ccna001-05';

UPDATE public.lessons SET content_en = '## Switch Fundamentals

**What you will learn in this video**
This video explains the internal mechanics of a Network Switch, the heart of every LAN network.

**Core Content**
- Switches learn the MAC Addresses of connected devices and store them in the **MAC Address Table (CAM Table)**.
- Forwarding decisions: Unicast, Multicast, Broadcast.
- **Flooding:** When a switch doesn''t know which port a MAC belongs to, it floods the frame out all ports.
- **STP (Spanning Tree Protocol)** management to prevent loops.
- **Port States:** Blocking → Listening → Learning → Forwarding.

**Conclusion**
Understanding how a switch operates helps in troubleshooting LAN issues such as Loops, Broadcast Storms, or MAC Flooding Attacks.'
WHERE id = 'lesson-ccna002-01';

UPDATE public.lessons SET content_en = '## VLAN Configuration

**What you will learn in this video**
This video teaches how to create and configure VLANs (Virtual Local Area Networks) on Cisco Switches with a practical lab.

**Core Content**
- VLANs segment a network logically as if they were separate physical switches, without needing separate hardware.
- Commands to create a VLAN: `vlan 10`, `name SALES`
- Assigning a port as an Access Port: `switchport mode access`, `switchport access vlan 10`
- Verification: `show vlan brief`
- **Inter-VLAN Routing:** Different VLANs cannot communicate with each other directly; they require a Router or a Layer 3 Switch.

**Conclusion**
VLANs are essential tools for segregating traffic between different departments like IT, HR, and Sales to enhance security and performance.'
WHERE id = 'lesson-ccna002-02';

UPDATE public.lessons SET content_en = '## Trunking and 802.1Q

**What you will learn in this video**
This video teaches how to send traffic from multiple VLANs simultaneously over a single cable using Trunk Ports.

**Core Content**
- **Trunk Port:** A port that transmits traffic for multiple VLANs at once, used for Switch ↔ Switch or Switch ↔ Router connections.
- **802.1Q Tag:** A 4-byte header inserted into the Ethernet Frame to identify which VLAN the packet belongs to.
- **Native VLAN:** An untagged VLAN (Default is VLAN 1) which must match on both ends of the trunk.
- Commands: `switchport mode trunk`, `switchport trunk allowed vlan 10,20,30`

**Conclusion**
Trunking is vital in enterprise networks with multiple VLANs. Without trunking, a separate cable would be needed for every single VLAN.'
WHERE id = 'lesson-ccna002-03';

UPDATE public.lessons SET content_en = '## Spanning Tree Protocol (STP)

**Introduction**
Spanning Tree Protocol (STP) is a Layer 2 protocol designed to prevent loops in switched networks when redundant links are connected.

**How STP Works**
- **Root Bridge Election:** The switch with the lowest Bridge ID is elected as the center (Root Bridge).
- **Port Roles:** Ports are assigned roles such as Root Port (best path to the root), Designated Port (forwarding port), and Blocking Port (blocked to prevent loops).
- **BPDU:** Switches exchange BPDU messages to share information and adapt the Spanning Tree structure when a link fails.

**Conclusion**
STP is an indispensable mechanism in switched networks. It allows networks to have redundancy without suffering from broadcast storms that could crash the system.'
WHERE id = 'lesson-ccna002-04';
