-- Migration Part 3: Translate content_th to English for content_en

UPDATE public.lessons SET content_en = '## Ansible for Network Automation

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
Ansible reduces Human Error and cuts down time spent on repetitive tasks, allowing network engineers to focus more on system design.'
WHERE id = 'lesson-dev002-04';

UPDATE public.lessons SET content_en = '## Introduction to Git

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
Git is a tool shared by all Developers and Network Engineers. Once you start using it, you won''t be able to work without it.'
WHERE id = 'lesson-git-01';

UPDATE public.lessons SET content_en = '## GitHub & GitLab Workflows

**Introduction**
As the networking industry steps into the NetDevOps (Network + DevOps) era, Source Control becomes crucial. GitHub and GitLab are the primary platforms built on Git principles.

**Management with Git Workflow**
- **Branching:** When changing a configuration, engineers do not edit the production system; instead, they branch off.
- **Pull Requests (PR) / Merge Requests (MR):** After editing files, a PR/MR is opened to allow teammates to review the code (Code Review) before applying it.
- **CI/CD Pipeline:** Can integrate with GitLab CI or GitHub Actions to automatically run Ansible or Python scripts to configure real devices once a PR is merged.

**Conclusion**
GitHub and GitLab workflows standardize how network engineers work, providing clear edit histories and enterprise-level software development security.'
WHERE id = 'lesson-git-02';

UPDATE public.lessons SET content_en = '## Git Commands Knowledge Check

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
Understanding these fundamental Git commands is an essential skill for all modern Developers and Network Engineers. Practicing them daily improves team efficiency and ensures you can always roll back.'
WHERE id = 'lesson-git-03';

UPDATE public.lessons SET content_en = '## Resolving a Merge Conflict

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
Merge Conflicts are a normal occurrence in any Team collaborating via Git. Practicing conflict resolution builds proficiency and confidence in Collaborative work.'
WHERE id = 'lesson-git-04';

UPDATE public.lessons SET content_en = '## CI/CD Pipeline for Network Code

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
CI/CD makes Network Configuration changes much safer, drastically reduces Human Error, and provides an auditable history of changes.'
WHERE id = 'lesson-git-05';

UPDATE public.lessons SET content_en = '## Python Basics for Network Engineers

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
Python is an indispensable skill for modern Network Engineers and serves as a strong foundation for learning advanced Network Automation.'
WHERE id = 'lesson-python-01';

UPDATE public.lessons SET content_en = '## Python for Network Automation

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
Python + Netmiko helps you pull data from 100 Routers in just seconds, rather than having to login one by one.'
WHERE id = 'lesson-python-02';

UPDATE public.lessons SET content_en = '## Python REST API and JSON

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
Python + REST API skills are the heart of modern Network Automation, enabling you to build Dashboards, notification Chatbots, or Auto-remediation systems.'
WHERE id = 'lesson-python-03';

UPDATE public.lessons SET content_en = '## Firewall Basics

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
Firewalls are the first and most critical line of defense for a network. Choosing the right Firewall type and designing good Security Zones are the foundations of Network Security Architecture.'
WHERE id = 'lesson-sec-01';

UPDATE public.lessons SET content_en = '## Stateful Inspection Firewall

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
Stateful Inspection Firewalls represent a significant security upgrade from Packet Filtering by "remembering" the state of each Session in a State Table, allowing intelligent decisions on which Packets are legitimate and which are threats.'
WHERE id = 'lesson-sec-02';

UPDATE public.lessons SET content_en = '## VPN Concepts

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
VPN is fundamental knowledge required before diving into IPsec and SSL VPN in the upcoming topics.'
WHERE id = 'lesson-sec002-01';

UPDATE public.lessons SET content_en = '## IPsec Deep Dive

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
IPsec is the foundation of secure enterprise VPNs. Understanding IKE Phase 1 & 2 is essential for Debugging VPNs that fail to establish.'
WHERE id = 'lesson-sec002-02';

UPDATE public.lessons SET content_en = '## Site-to-Site VPN Configuration

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
This Lab gives a real-world overview of how IPsec VPN works, which is frequently tested in CCNA and used practically in every organization.'
WHERE id = 'lesson-sec002-03';

UPDATE public.lessons SET content_en = '## SSL VPN and AnyConnect

**Introduction**
In the Remote Work era, VPN is a critical tool. SSL VPN is a technology that allows external users to securely connect to the corporate network via TLS/SSL protocols.

**Types of SSL VPN**
- **Clientless SSL VPN:** Accessed via a Web Browser with no software installation required. Ideal for accessing internal web applications.
- **Client-based SSL VPN:** Requires software like the **Cisco AnyConnect Secure Mobility Client**, which simulates a connection as if the computer were physically in the office (obtains an internal IP).

**Cisco AnyConnect Highlights**
Beyond VPN functions, AnyConnect can perform Posture Assessment on the client machine, such as requiring Antivirus or the latest Windows updates before allowing connection.

**Conclusion**
SSL VPN is much easier to use than traditional IPsec VPNs since users don''t have to worry about port settings, and AnyConnect significantly elevates enterprise security.'
WHERE id = 'lesson-sec002-04';

UPDATE public.lessons SET content_en = '## Troubleshooting Methodology

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
Good Troubleshooting must be systematic, not random guessing. A great engineer can resolve issues in minutes rather than hours.'
WHERE id = 'lesson-ts002-01';

UPDATE public.lessons SET content_en = '## Debug Commands (On Cisco)

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
Debug is a powerful but dangerous Troubleshooting tool. It should only be used outside business hours or in a Lab Environment.'
WHERE id = 'lesson-ts002-02';

UPDATE public.lessons SET content_en = '## Syslog Analysis

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
Syslog is the "Black Box" of a network. Without good Logging, finding the root cause of an issue post-incident is virtually impossible.'
WHERE id = 'lesson-ts002-03';

UPDATE public.lessons SET content_en = '## EEM and SPAN

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
EEM provides automated issue response capabilities on the device itself, while SPAN allows engineers to capture packets for in-depth analysis. Both are essential tools for advanced network administrators.'
WHERE id = 'lesson-ts002-04';

UPDATE public.lessons SET content_en = '## Introduction and Basic Configuration of IP SLA

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
IP SLA is a powerful Cisco tool that builds network Resiliency by continuously monitoring paths and automatically switching routes when issues occur, reducing Downtime and enabling intelligent Failovers without relying on Routing Protocol alerts.'
WHERE id = 'lesson-ts005-01';

UPDATE public.lessons SET content_en = '## Understanding IP SLA

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
IP SLA isn''t just a simple monitoring tool; it acts as an intelligent sensor that enables the network to perceive connection conditions and adapt automatically.'
WHERE id = 'lesson-ts005-02';

UPDATE public.lessons SET content_en = '## Wireshark Basics

**What you will learn in this video**
This video teaches how to use Wireshark, the most popular Packet Analysis tool for Troubleshooting and Protocol analysis.

**Core Content**
- **Capture Filters:** Filter Packets during Capture, e.g., `host 192.168.1.1`, `port 80`
- **Display Filters:** Filter captured Packets, e.g., `ip.addr == 192.168.1.1`, `tcp.port == 443`, `http`
- **Packet Dissection:** Read Packet Details Layer by Layer (Frame → Ethernet → IP → TCP → Application)
- **Follow TCP Stream:** View all communication data across a TCP Connection Session.
- **Statistics:** I/O Graph, Protocol Hierarchy, Conversations.

**Conclusion**
Wireshark is a tool that Network and Security engineers must master, as it reveals the direct "truth" of Network Traffic.'
WHERE id = 'lesson-wireshark-01';

UPDATE public.lessons SET content_en = '## Protocol Analysis with Wireshark

**What you will learn in this video**
This video teaches the analysis of various Protocols such as TCP Handshakes, HTTP, and DNS using Wireshark.

**Core Content**
- **TCP Three-Way Handshake:** Analyze SYN → SYN-ACK → ACK in Packets.
- **HTTP Analysis:** View Request/Response Headers, Status Codes (200, 404, 503).
- **DNS Query/Response:** See the Domain Name to IP translation process in Real-time.
- **TLS/SSL Handshake:** View the Encrypted Session creation process (ClientHello, ServerHello, Certificate).
- **TCP Retransmissions:** Identify Performance Issues from Retransmits in a Stream.

**Conclusion**
Fluency in reading Packets helps troubleshoot Network and Application problems much deeper than just viewing Show Commands on a Router/Switch.'
WHERE id = 'lesson-wireshark-02';

UPDATE public.lessons SET content_en = '## Security Analysis with Wireshark

**What you will learn in this video**
This video teaches how to use Wireshark to investigate Network Attacks and abnormal behaviors.

**Core Content**
- **Port Scanning Detection:** Spot SYN Flood or Nmap Scan Patterns in Packets.
- **ARP Spoofing Detection:** Find abnormal Gratuitous ARPs (Same IP with different MACs).
- **Cleartext Credentials:** Detect unencrypted Username/Passwords sent over Telnet, FTP, HTTP.
- **DNS Tunneling:** Analyze abnormal payloads in DNS Queries (used to sneak data past Firewalls).
- **Malware C2 Traffic:** Observe Malware Beacon Patterns communicating with Command & Control Servers.

**Conclusion**
In the hands of a Security Analyst, Wireshark identifies abnormal network behaviors that other Security Tools might miss.'
WHERE id = 'lesson-wireshark-03';
