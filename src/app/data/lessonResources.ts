export interface LessonResource {
  title: string;
  url: string;
  type: 'documentation' | 'article' | 'rfc' | 'video';
  source: string;
  duration?: string;
}

export const lessonResourcesData: Record<string, { readings: LessonResource[], videos: LessonResource[] }> = {
  'lesson-ccna001-01': {
    readings: [
      { title: "Introduction to Computer Networks - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
  'lesson-ccna001-02': {
    readings: [
      { title: "OSI 7 Layers Model - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
  'lesson-ccna001-03': {
    readings: [
      { title: "TCP/IP Protocol Suite - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
  'lesson-ccna001-04': {
    readings: [
      { title: "Network Devices - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
  'lesson-ccna001-05': {
    readings: [
      { title: "IP Addressing and Subnetting - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
  'lesson-wireshark-01': {
    readings: [
      { title: "Installing and Using Wireshark - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "Wireshark User's Guide", url: "https://www.wireshark.org/docs/wsug_html_chunked/", type: "documentation", source: "Wireshark" },
      { title: "Packet Analysis Basics", url: "https://www.comparitech.com/net-admin/wireshark-cheat-sheet/", type: "article", source: "Comparitech" },
    ],
    videos: [
      { title: "Wireshark Tutorial for Beginners", url: "https://www.youtube.com/watch?v=lb1Dw0elw0Q", type: "video", source: "David Bombal", duration: "30:45" },
    ]
  },
  'lesson-wireshark-02': {
    readings: [
      { title: "Analyzing TCP Packets - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "Wireshark User's Guide", url: "https://www.wireshark.org/docs/wsug_html_chunked/", type: "documentation", source: "Wireshark" },
      { title: "Packet Analysis Basics", url: "https://www.comparitech.com/net-admin/wireshark-cheat-sheet/", type: "article", source: "Comparitech" },
    ],
    videos: [
      { title: "Wireshark Tutorial for Beginners", url: "https://www.youtube.com/watch?v=lb1Dw0elw0Q", type: "video", source: "David Bombal", duration: "30:45" },
    ]
  },
  'lesson-wireshark-03': {
    readings: [
      { title: "UDP and DNS Analysis - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
  'lesson-python-01': {
    readings: [
      { title: "Python Basics - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "Python Official Documentation", url: "https://docs.python.org/3/", type: "documentation", source: "Python.org" },
      { title: "Python for Network Engineers (Netmiko)", url: "https://pynet.twb-tech.com/blog/automation/netmiko.html", type: "article", source: "Kirk Byers" },
    ],
    videos: [
      { title: "Python for Beginners", url: "https://www.youtube.com/watch?v=eWRfhZUzrAc", type: "video", source: "Programming with Mosh", duration: "1:00:00" },
    ]
  },
  'lesson-python-02': {
    readings: [
      { title: "Using Netmiko - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
  'lesson-python-03': {
    readings: [
      { title: "Using NAPALM - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
  'lesson-sec-01': {
    readings: [
      { title: "Firewall Basics - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "Network Security Fundamentals", url: "https://www.cisco.com/c/en/us/products/security/what-is-network-security.html", type: "article", source: "Cisco" },
      { title: "IPsec VPN Overview", url: "https://www.cisco.com/c/en/us/support/docs/security-vpn/ipsec-negotiation-ike-protocols/14106-how-ipsec-works.html", type: "documentation", source: "Cisco" },
    ],
    videos: [
      { title: "VPNs Explained", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "20:10" },
    ]
  },
  'lesson-sec-02': {
    readings: [
      { title: "Stateful Inspection - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
  'lesson-adv-001': {
    readings: [
      { title: "OSPF Areas and LSA Types - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "OSPF Design Guide", url: "https://www.cisco.com/c/en/us/support/docs/ip/open-shortest-path-first-ospf/7039-1.html", type: "documentation", source: "Cisco" },
      { title: "RFC 2328: OSPF Version 2", url: "https://datatracker.ietf.org/doc/html/rfc2328", type: "rfc", source: "IETF" },
    ],
    videos: [
      { title: "OSPF Explained", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "22:15" },
      { title: "OSPF Deep Dive", url: "https://www.youtube.com/watch?v=IPvYjXCsTg8", type: "video", source: "David Bombal", duration: "45:30" },
    ]
  },
  'lesson-adv-002': {
    readings: [
      { title: "OSPF Route Summarization - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "OSPF Design Guide", url: "https://www.cisco.com/c/en/us/support/docs/ip/open-shortest-path-first-ospf/7039-1.html", type: "documentation", source: "Cisco" },
      { title: "RFC 2328: OSPF Version 2", url: "https://datatracker.ietf.org/doc/html/rfc2328", type: "rfc", source: "IETF" },
    ],
    videos: [
      { title: "OSPF Explained", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "22:15" },
      { title: "OSPF Deep Dive", url: "https://www.youtube.com/watch?v=IPvYjXCsTg8", type: "video", source: "David Bombal", duration: "45:30" },
    ]
  },
  'lesson-ccna002-01': {
    readings: [
      { title: "Ethernet Switching Basics - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "VLAN Configuration Guide", url: "https://www.cisco.com/c/en/us/support/docs/lan-switching/virtual-lans-vlan-trunking-protocol-vtp-q-in-q/index.html", type: "documentation", source: "Cisco" },
      { title: "IEEE 802.1Q standard", url: "https://1.ieee802.org/vlan/", type: "article", source: "IEEE" },
    ],
    videos: [
      { title: "VLANs Explained", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "18:50" },
    ]
  },
  'lesson-ccna002-02': {
    readings: [
      { title: "VLAN Configuration - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "VLAN Configuration Guide", url: "https://www.cisco.com/c/en/us/support/docs/lan-switching/virtual-lans-vlan-trunking-protocol-vtp-q-in-q/index.html", type: "documentation", source: "Cisco" },
      { title: "IEEE 802.1Q standard", url: "https://1.ieee802.org/vlan/", type: "article", source: "IEEE" },
    ],
    videos: [
      { title: "VLANs Explained", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "18:50" },
    ]
  },
  'lesson-ccna002-03': {
    readings: [
      { title: "Trunking (802.1Q) - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
  'lesson-ccna002-04': {
    readings: [
      { title: "Spanning Tree Protocol (STP) - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
  'lesson-ccna002-05': {
    readings: [
      { title: "VTP and Inter-VLAN Routing - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "VLAN Configuration Guide", url: "https://www.cisco.com/c/en/us/support/docs/lan-switching/virtual-lans-vlan-trunking-protocol-vtp-q-in-q/index.html", type: "documentation", source: "Cisco" },
      { title: "IEEE 802.1Q standard", url: "https://1.ieee802.org/vlan/", type: "article", source: "IEEE" },
    ],
    videos: [
      { title: "VLANs Explained", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "18:50" },
    ]
  },
  'lesson-ccna003-01': {
    readings: [
      { title: "Routing Fundamentals - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
  'lesson-ccna003-02': {
    readings: [
      { title: "Static Routing - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
  'lesson-ccna003-03': {
    readings: [
      { title: "RIP (Routing Information Protocol) - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
  'lesson-ccna003-04': {
    readings: [
      { title: "OSPF Basics - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "OSPF Design Guide", url: "https://www.cisco.com/c/en/us/support/docs/ip/open-shortest-path-first-ospf/7039-1.html", type: "documentation", source: "Cisco" },
      { title: "RFC 2328: OSPF Version 2", url: "https://datatracker.ietf.org/doc/html/rfc2328", type: "rfc", source: "IETF" },
    ],
    videos: [
      { title: "OSPF Explained", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "22:15" },
      { title: "OSPF Deep Dive", url: "https://www.youtube.com/watch?v=IPvYjXCsTg8", type: "video", source: "David Bombal", duration: "45:30" },
    ]
  },
  'lesson-ccna003-05': {
    readings: [
      { title: "EIGRP Basics - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
  'lesson-ccna004-01': {
    readings: [
      { title: "WAN Overview and Technologies - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
  'lesson-ccna004-02': {
    readings: [
      { title: "PPP and HDLC - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
  'lesson-ccna004-03': {
    readings: [
      { title: "MPLS and VPN - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "Network Security Fundamentals", url: "https://www.cisco.com/c/en/us/products/security/what-is-network-security.html", type: "article", source: "Cisco" },
      { title: "IPsec VPN Overview", url: "https://www.cisco.com/c/en/us/support/docs/security-vpn/ipsec-negotiation-ike-protocols/14106-how-ipsec-works.html", type: "documentation", source: "Cisco" },
    ],
    videos: [
      { title: "VPNs Explained", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "20:10" },
    ]
  },
  'lesson-ccna004-04': {
    readings: [
      { title: "WAN Design and Redundancy - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
  'lesson-ccna005-01': {
    readings: [
      { title: "DHCP Server and Client - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
  'lesson-ccna005-02': {
    readings: [
      { title: "DNS (Domain Name System) - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
  'lesson-ccna005-03': {
    readings: [
      { title: "NAT and PAT - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
  'lesson-ccna005-04': {
    readings: [
      { title: "ACL (Access Control Lists) - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
  'lesson-ccna005-05': {
    readings: [
      { title: "NTP and Syslog - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
  'lesson-ccna006-01': {
    readings: [
      { title: "Network Security Concepts - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "Network Security Fundamentals", url: "https://www.cisco.com/c/en/us/products/security/what-is-network-security.html", type: "article", source: "Cisco" },
      { title: "IPsec VPN Overview", url: "https://www.cisco.com/c/en/us/support/docs/security-vpn/ipsec-negotiation-ike-protocols/14106-how-ipsec-works.html", type: "documentation", source: "Cisco" },
    ],
    videos: [
      { title: "VPNs Explained", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "20:10" },
    ]
  },
  'lesson-ccna006-02': {
    readings: [
      { title: "Switch Security - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "VLAN Configuration Guide", url: "https://www.cisco.com/c/en/us/support/docs/lan-switching/virtual-lans-vlan-trunking-protocol-vtp-q-in-q/index.html", type: "documentation", source: "Cisco" },
      { title: "IEEE 802.1Q standard", url: "https://1.ieee802.org/vlan/", type: "article", source: "IEEE" },
    ],
    videos: [
      { title: "VLANs Explained", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "18:50" },
    ]
  },
  'lesson-ccna006-03': {
    readings: [
      { title: "ACLs for Security - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "Network Security Fundamentals", url: "https://www.cisco.com/c/en/us/products/security/what-is-network-security.html", type: "article", source: "Cisco" },
      { title: "IPsec VPN Overview", url: "https://www.cisco.com/c/en/us/support/docs/security-vpn/ipsec-negotiation-ike-protocols/14106-how-ipsec-works.html", type: "documentation", source: "Cisco" },
    ],
    videos: [
      { title: "VPNs Explained", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "20:10" },
    ]
  },
  'lesson-ccna006-04': {
    readings: [
      { title: "AAA Framework - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
  'lesson-sec002-01': {
    readings: [
      { title: "VPN Concepts and Types - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "Network Security Fundamentals", url: "https://www.cisco.com/c/en/us/products/security/what-is-network-security.html", type: "article", source: "Cisco" },
      { title: "IPsec VPN Overview", url: "https://www.cisco.com/c/en/us/support/docs/security-vpn/ipsec-negotiation-ike-protocols/14106-how-ipsec-works.html", type: "documentation", source: "Cisco" },
    ],
    videos: [
      { title: "VPNs Explained", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "20:10" },
    ]
  },
  'lesson-sec002-02': {
    readings: [
      { title: "IPSec Deep Dive - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
  'lesson-sec002-03': {
    readings: [
      { title: "Site-to-Site VPN Configuration - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "Network Security Fundamentals", url: "https://www.cisco.com/c/en/us/products/security/what-is-network-security.html", type: "article", source: "Cisco" },
      { title: "IPsec VPN Overview", url: "https://www.cisco.com/c/en/us/support/docs/security-vpn/ipsec-negotiation-ike-protocols/14106-how-ipsec-works.html", type: "documentation", source: "Cisco" },
    ],
    videos: [
      { title: "VPNs Explained", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "20:10" },
    ]
  },
  'lesson-sec002-04': {
    readings: [
      { title: "SSL VPN and AnyConnect - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "Network Security Fundamentals", url: "https://www.cisco.com/c/en/us/products/security/what-is-network-security.html", type: "article", source: "Cisco" },
      { title: "IPsec VPN Overview", url: "https://www.cisco.com/c/en/us/support/docs/security-vpn/ipsec-negotiation-ike-protocols/14106-how-ipsec-works.html", type: "documentation", source: "Cisco" },
    ],
    videos: [
      { title: "VPNs Explained", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "20:10" },
    ]
  },
  'lesson-adv002-01': {
    readings: [
      { title: "EIGRP Architecture - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
  'lesson-adv002-02': {
    readings: [
      { title: "EIGRP Metric Calculation - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
  'lesson-adv002-03': {
    readings: [
      { title: "Unequal-Cost Load Balancing - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
  'lesson-adv002-04': {
    readings: [
      { title: "EIGRP Route Filtering and Summarization - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
  'lesson-adv003-01': {
    readings: [
      { title: "BGP Overview and AS Numbers - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "BGP Best Path Selection Algorithm", url: "https://www.cisco.com/c/en/us/support/docs/ip/border-gateway-protocol-bgp/13753-25.html", type: "documentation", source: "Cisco" },
      { title: "RFC 4271: A Border Gateway Protocol 4 (BGP-4)", url: "https://datatracker.ietf.org/doc/html/rfc4271", type: "rfc", source: "IETF" },
    ],
    videos: [
      { title: "BGP Routing Explained", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "25:40" },
    ]
  },
  'lesson-adv003-02': {
    readings: [
      { title: "BGP Neighbor Relationships - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "BGP Best Path Selection Algorithm", url: "https://www.cisco.com/c/en/us/support/docs/ip/border-gateway-protocol-bgp/13753-25.html", type: "documentation", source: "Cisco" },
      { title: "RFC 4271: A Border Gateway Protocol 4 (BGP-4)", url: "https://datatracker.ietf.org/doc/html/rfc4271", type: "rfc", source: "IETF" },
    ],
    videos: [
      { title: "BGP Routing Explained", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "25:40" },
    ]
  },
  'lesson-adv003-03': {
    readings: [
      { title: "BGP Path Attributes - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "BGP Best Path Selection Algorithm", url: "https://www.cisco.com/c/en/us/support/docs/ip/border-gateway-protocol-bgp/13753-25.html", type: "documentation", source: "Cisco" },
      { title: "RFC 4271: A Border Gateway Protocol 4 (BGP-4)", url: "https://datatracker.ietf.org/doc/html/rfc4271", type: "rfc", source: "IETF" },
    ],
    videos: [
      { title: "BGP Routing Explained", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "25:40" },
    ]
  },
  'lesson-adv003-04': {
    readings: [
      { title: "BGP Route Selection Process - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "BGP Best Path Selection Algorithm", url: "https://www.cisco.com/c/en/us/support/docs/ip/border-gateway-protocol-bgp/13753-25.html", type: "documentation", source: "Cisco" },
      { title: "RFC 4271: A Border Gateway Protocol 4 (BGP-4)", url: "https://datatracker.ietf.org/doc/html/rfc4271", type: "rfc", source: "IETF" },
    ],
    videos: [
      { title: "BGP Routing Explained", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "25:40" },
    ]
  },
  'lesson-adv003-05': {
    readings: [
      { title: "BGP Filtering and Route Maps - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "BGP Best Path Selection Algorithm", url: "https://www.cisco.com/c/en/us/support/docs/ip/border-gateway-protocol-bgp/13753-25.html", type: "documentation", source: "Cisco" },
      { title: "RFC 4271: A Border Gateway Protocol 4 (BGP-4)", url: "https://datatracker.ietf.org/doc/html/rfc4271", type: "rfc", source: "IETF" },
    ],
    videos: [
      { title: "BGP Routing Explained", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "25:40" },
    ]
  },
  'lesson-ts002-01': {
    readings: [
      { title: "Troubleshooting Methodology - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
  'lesson-ts002-02': {
    readings: [
      { title: "Debug and Show Commands - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
  'lesson-ts002-03': {
    readings: [
      { title: "Syslog and Logging Analysis - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
  'lesson-ts002-04': {
    readings: [
      { title: "EEM and SPAN - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
  'lesson-dev002-01': {
    readings: [
      { title: "Cisco DNA Center API - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "REST API Tutorial", url: "https://restfulapi.net/", type: "documentation", source: "REST API Tutorial" },
      { title: "Cisco DevNet Learning Labs", url: "https://developer.cisco.com/learning/", type: "article", source: "Cisco DevNet" },
    ],
    videos: [
      { title: "REST APIs Explained", url: "https://www.youtube.com/watch?v=-mN3VyJuCjM", type: "video", source: "Fireship", duration: "10:30" },
    ]
  },
  'lesson-dev002-02': {
    readings: [
      { title: "SD-WAN APIs - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "REST API Tutorial", url: "https://restfulapi.net/", type: "documentation", source: "REST API Tutorial" },
      { title: "Cisco DevNet Learning Labs", url: "https://developer.cisco.com/learning/", type: "article", source: "Cisco DevNet" },
    ],
    videos: [
      { title: "REST APIs Explained", url: "https://www.youtube.com/watch?v=-mN3VyJuCjM", type: "video", source: "Fireship", duration: "10:30" },
    ]
  },
  'lesson-dev002-03': {
    readings: [
      { title: "Meraki Dashboard API - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "REST API Tutorial", url: "https://restfulapi.net/", type: "documentation", source: "REST API Tutorial" },
      { title: "Cisco DevNet Learning Labs", url: "https://developer.cisco.com/learning/", type: "article", source: "Cisco DevNet" },
    ],
    videos: [
      { title: "REST APIs Explained", url: "https://www.youtube.com/watch?v=-mN3VyJuCjM", type: "video", source: "Fireship", duration: "10:30" },
    ]
  },
  'lesson-dev002-04': {
    readings: [
      { title: "Ansible for Network Automation - Official Overview", url: "https://www.cisco.com/c/en/us/support/docs/index.html", type: "documentation", source: "Cisco" },
      { title: "CCNA 200-301 Official Cert Guide", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-volume-1-9780135792735", type: "article", source: "Cisco Press" },
      { title: "Networking Fundamentals", url: "https://www.netacad.com/", type: "article", source: "Cisco NetAcad" },
    ],
    videos: [
      { title: "Learn Basic Networking", url: "https://www.youtube.com/watch?v=qiQR5rTSshw", type: "video", source: "NetworkChuck", duration: "15:00" },
    ]
  },
};
