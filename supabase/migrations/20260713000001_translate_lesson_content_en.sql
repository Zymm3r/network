-- Migration: Translate content_th to English for content_en for 14 updated lessons

UPDATE public.lessons SET content_en = '## PPP and HDLC

**What you will learn in this video**
This video teaches Data Link layer protocols used on Point-to-Point Serial/WAN Links.

**Core Content**
- **HDLC (High-Level Data Link Control):** Cisco''s default protocol on serial interfaces. Simple but Cisco-proprietary.
- **PPP (Point-to-Point Protocol):** Open standard protocol. Supports Authentication (PAP/CHAP), Compression, and Multilink.
- **PPPoE:** PPP over Ethernet. Commonly seen in home broadband ADSL/Fiber connections.
- **PPP Configuration:** `encapsulation ppp`, `ppp authentication chap`

**Conclusion**
Although HDLC and PPP are older technologies, they still appear in CCNA exams and some legacy enterprise WAN systems.'
WHERE id = 'lesson-ccna004-02';

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

UPDATE public.lessons SET content_en = '## NAT and PAT

**What you will learn in this video**
This video teaches IP Address translation, allowing devices with Private IPs to access the internet.

**Core Content**
- **Static NAT:** 1 Private IP <-> 1 Public IP (Used for servers requiring a fixed IP).
- **Dynamic NAT:** Pool of Private IPs <-> Pool of Public IPs (First-come, first-served).
- **PAT (Port Address Translation / NAT Overload):** Multiple Private IPs -> 1 Public IP, differentiated by Port Number (This is what is used in every home).
- **Configuration:** `ip nat inside`, `ip nat outside`, `ip nat inside source list <ACL> interface <int> overload`

**Conclusion**
PAT is what keeps IPv4 viable today despite address exhaustion, as each home only needs 1 public IP for all its devices.'
WHERE id = 'lesson-ccna005-03';

UPDATE public.lessons SET content_en = '## Firewall Basics

**What you will learn in this video**
In this video, we will cover the fundamentals of firewalls, including different types of firewalls, Security Zones, DMZ, and how Cisco ASA operates.

**Core Content**
- **Types of Firewalls:**
  - **Packet Filter:** Operates at Layer 3/4, stateless header inspection.
  - **Stateful Inspection:** Tracks connection state using a State Table.
  - **Proxy Firewall:** Inspects traffic at Layer 7, capable of seeing application data.
  - **Next-Generation Firewall (NGFW):** Combines all features with DPI, App-ID, IPS.
- **Security Zones:**
  - **Inside (Trusted):** Internal corporate network, highest trust level.
  - **Outside (Untrusted):** The internet or external networks.
  - **DMZ:** Middle zone for public-facing servers (Web, Mail, DNS) isolated from the internal network.
- **Cisco ASA Security Levels:**
  - Assigned a value between **0 and 100** per interface.
  - Security Level 100 = Inside (Highest trust)
  - Security Level 0 = Outside (Untrusted)
  - Traffic from High to Low Level → Permitted by default
  - Traffic from Low to High Level → Denied by default
- **Inbound vs. Outbound Policy:**
  - **Inbound:** Traffic from internet to inside — strictly controlled.
  - **Outbound:** Traffic from inside to internet — used to control content or prevent C&C traffic.

**Conclusion**
Firewalls are the first and most crucial line of defense for a network. Choosing the right firewall type and designing proper Security Zones is foundational to Network Security Architecture.'
WHERE id = 'lesson-sec-01';

UPDATE public.lessons SET content_en = '## Stateful Inspection Firewall

**What you will learn in this video**
In this video, we compare Stateful Inspection Firewalls with traditional Packet Filtering, and understand how modern firewalls track TCP and UDP sessions.

**Core Content**
- **Packet Filtering (Stateless):** Inspects each packet individually with no memory of previous packets — like a "guard with no memory".
- **Stateful Inspection:** Tracks connection context using a **State Table** storing the 5-tuple: Source IP, Source Port, Destination IP, Destination Port, Protocol.
- **TCP Session Tracking:**
  - **SYN:** Firewall receives first packet, checks policy, creates entry (state: NEW)
  - **SYN-ACK:** Firewall updates state to ESTABLISHED
  - **ACK:** Handshake complete, subsequent data packets permitted automatically
  - **FIN/RST:** When session ends, firewall removes entry from the table
- **UDP Pseudo-State Tracking:** UDP lacks a handshake, so the firewall creates a virtual session using a Timeout Value (e.g., 2 minutes) instead of a close signal.
- **Security Benefits:**
  - Automatically blocks unsolicited inbound traffic
  - Prevents SYN Floods, Port Scanning, IP Spoofing
  - Packets in an established session do not need ACL inspection every time

**Conclusion**
Stateful Inspection is a major security leap from Packet Filtering by "remembering" session states, allowing it to intelligently decide which traffic is legitimate and which is a threat.'
WHERE id = 'lesson-sec-02';

UPDATE public.lessons SET content_en = '## VTP and Inter-VLAN Routing

**What you will learn in this video**
This video covers two key topics: managing VLANs with VTP, and allowing different VLANs to communicate with each other.

**Core Content**
**VTP (VLAN Trunking Protocol)**
- Automatically synchronizes VLAN database across switches.
- 3 Modes: **Server** (create/edit VLANs), **Client** (receive data only), **Transparent** (does not participate).
- ⚠️ **Warning:** Connecting a new switch with a higher VTP Revision number can wipe the entire VLAN database!

**Inter-VLAN Routing**
- **Router-on-a-Stick:** Uses 1 Router with Sub-interfaces to route between VLANs.
- **Layer 3 Switch (SVI):** Preferred enterprise method, using `ip routing` and `interface vlan X`.

**Conclusion**
VTP reduces administrative overhead but carries revision risks. Inter-VLAN routing enables all VLANs to communicate based on defined policies.'
WHERE id = 'lesson-ccna002-05';

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

UPDATE public.lessons SET content_en = '## VTP and Inter-VLAN Routing

**What you will learn in this video**
This video covers two key topics: managing VLANs with VTP and allowing different VLANs to communicate, complete with a lab.

**Core Content**
**VTP (VLAN Trunking Protocol)**
- Automatically synchronizes VLAN databases across switches over Trunk Links.
- 3 Modes: **Server** (create/edit/delete VLANs), **Client** (receive data only), **Transparent** (does not participate).
- ⚠️ **Risk:** Introducing a new switch with a higher VTP Revision Number will overwrite the entire VLAN database!

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
VTP reduces administrative tasks but requires caution regarding revisions. Inter-VLAN routing enables VLANs to cross-communicate based on configured policies.'
WHERE id = 'lesson-ccna002-07';

UPDATE public.lessons SET content_en = '## NAT and PAT

**What you will learn in this video**
This video teaches IP Address translation to allow Private IP devices to access the internet, complete with a Cisco Router lab.

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

UPDATE public.lessons SET content_en = '## Git Commands Knowledge Check

**What you will learn in this video**
In this video, we review the most frequently used fundamental Git commands for daily work, from creating a repository and saving changes to collaborating with a team and managing branches.

**Core Content**
- **git init** — Initializes a new Git Repository, creating the .git folder.
- **git clone <url>** — Copies a repository from GitHub along with its full history.
- **git add <file>** — Adds files to the Staging Area (`git add .` for all files).
- **git commit -m** — Saves a snapshot to the history.
- **git push** — Pushes commits to the Remote Repository.
- **git pull** — Fetches changes from Remote and merges them into the current branch.
- **git branch** — Lists all branches (* indicates the active branch).
- **git merge <branch>** — Merges the specified branch''s history into the current branch.
- **git log** — Displays commit history; use `--oneline` or `--graph`.
- **git status** — Shows the status of the Working Directory.
- **git diff** — Compares differences between the Working Directory and the latest commit.
- **git stash** — Temporarily saves uncommitted changes.

**Conclusion**
Understanding these fundamental Git commands is an essential skill for all modern Developers and Network Engineers, improving team efficiency and allowing you to revert mistakes safely.'
WHERE id = 'lesson-git-03';

UPDATE public.lessons SET content_en = '## Resolving a Merge Conflict

**What you will learn in this video**
In this video, we will learn how Merge Conflicts occur in Git and how to properly resolve them step-by-step, up to committing the final result.

**Core Content**
- **Cause:** Occurs when 2 developers edit the exact same line in the same file on different branches, and then merge them.
- **Step 1:** Use `git status` to identify conflicting files (listed under Unmerged paths).
- **Step 2 — Conflict Markers:**
```text
<<<<<<< HEAD
Current Branch''s code
=======
Incoming Branch''s code
>>>>>>> feature-branch
```
- **Step 3:** Manually edit in a Text Editor, choose the desired code, and remove all markers.
- **Alternative:** Use `git mergetool` with GUI tools like VS Code or KDiff3.
- **Step 4:** `git add <filename>` → `git commit`
- **Always Reversible:** Use `git merge --abort` to return to the pre-merge state.

**Conclusion**
Merge conflicts are a normal part of collaborative Git workflows. Practicing conflict resolution builds confidence in team collaboration.'
WHERE id = 'lesson-git-04';

UPDATE public.lessons SET content_en = '## Python Basics for Network Engineers

**What you will learn in this video**
In this video, we will learn fundamental Python required for Network Engineers, focusing on practical usage to automate repetitive tasks like backing up configs and checking interface statuses.

**Core Content**
- **Why use Python:** Reduces human error, automates dozens or hundreds of devices simultaneously, simple syntax.
- **Important Data Types:** str, int, bool, list, dict
- **Control Flow:** if/elif/else, for loop, while loop
- **Functions:** Wrapping frequently used code into reusable functions.
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
Python is an indispensable skill for modern Network Engineers, serving as a strong foundation for learning advanced Network Automation.'
WHERE id = 'lesson-python-01';

UPDATE public.lessons SET content_en = '## Introduction to IP SLA Configuration

**What you will learn in this video**
In this video, we will learn about Cisco IP SLA (Service Level Agreement), a proactive network monitoring tool that allows routers to continuously test network performance 24/7 and use the results to automate route changes.

**Core Content**
- **What is IP SLA:** A Cisco IOS feature that sends probe packets to regularly test network paths without waiting for issues to occur (Proactive Monitoring).
- **ICMP Echo Operation:** Pings a destination IP. Ideal for Reachability Checks, simple, and requires no responder.
- **UDP Jitter Operation:** Measures Latency, Jitter, and Packet Loss. Ideal for delay-sensitive apps like VoIP, but requires a Cisco IP SLA Responder at the destination.
- **Integration with Floating Static Routes:** Uses Enhanced Object Tracking to automatically remove a primary route upon probe failure and switch to a backup route with a higher AD.
- **Key Commands:** `ip sla`, `icmp-echo`, `frequency`, `ip sla schedule`, `track`, `ip route` with track.
- **Tracking Delay:** Use `delay down 10 up 10` to prevent Route Flapping.

**Conclusion**
IP SLA is a powerful Cisco tool that builds network resiliency by continuously monitoring paths and automatically switching routes when problems arise, reducing downtime intelligently.'
WHERE id = 'lesson-ts005-01';
