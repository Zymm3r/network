import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataPath = resolve(__dirname, '_backfill_data.json');
const outDir = resolve(__dirname, '..', 'supabase', 'migrations');

// Category knowledge
const CAT: Record<string, { domain: string; features: string[]; apps: string[]; install: string[]; bp: string[]; overview: string }> = {
  Surveillance: { domain: 'video surveillance and security monitoring',
    features: ['High-resolution video capture with advanced image processing','Intelligent motion detection with configurable sensitivity zones','Night vision capability with infrared or starlight sensor technology','Remote monitoring and playback via web browser or mobile application','On-board storage support with microSD slot and NVR integration','Weatherproof and vandal-resistant housing for outdoor deployment'],
    apps: ['Commercial building perimeter monitoring','Retail store loss prevention and customer behavior analytics','Industrial facility security and operational monitoring','Critical infrastructure protection','Residential property surveillance with smart home integration','Public space safety monitoring in transportation hubs'],
    install: ['Mount at 2.5 to 4 meters for optimal field of view','Use included mounting template and hardware','Route cables through weatherproof conduits','Configure IP address before permanent installation','Adjust lens focus and angle after mounting','Verify PoE power budget on the switch'],
    bp: ['Enable motion detection zones to reduce false alerts','Configure recording schedules based on operational hours','Use H.265+ encoding for storage efficiency','Set up automatic firmware update notifications','Regularly verify camera alignment and clean lens','Implement network segmentation for surveillance traffic'],
    overview: 'This network surveillance camera delivers high-definition video monitoring for professional security applications. Designed for indoor and outdoor deployment, it provides reliable video capture with advanced image processing capabilities. The camera integrates with standard NVR platforms and supports multiple simultaneous streams.' },
  Networking: { domain: 'network infrastructure and connectivity',
    features: ['IEEE 802.11ax/ac/n/a wireless standards with dual-band operation','Enterprise-grade WPA3 and 802.1X authentication support','Multiple operating modes including AP, bridge, and repeater','Centralized cloud management for multi-site deployment','QoS controls for bandwidth prioritization','Automatic channel selection and transmit power adjustment'],
    apps: ['High-density wireless coverage in offices and hotels','Campus network extension across multiple buildings','Point-to-point wireless bridge links for remote connectivity','Warehouse wireless infrastructure for mobile operations','Healthcare facility wireless networking','Smart building IoT device aggregation'],
    install: ['Plan deployment using wireless site survey','Mount at ceiling height using included bracket','Connect via Gigabit Ethernet Cat6+ cabling','Power through PoE switch or included adapter','Configure SSID, security, and VLAN settings','Validate coverage with Wi-Fi analyzer'],
    bp: ['Deploy on staggered channel plan to minimize interference','Enable band steering for 5/6 GHz clients','Configure separate SSIDs for guest and corporate','Monitor client density and throughput metrics','Keep firmware current for performance and security','Document network topology and mounting locations'],
    overview: 'This wireless access point provides high-performance network connectivity for commercial and enterprise environments. Built on the latest Wi-Fi standard, it delivers high-throughput wireless coverage with centralized cloud management across multiple deployment sites.' },
  'Access Control': { domain: 'physical access control and entry management',
    features: ['Multi-factor authentication with card, PIN, fingerprint, and facial recognition','Anti-passback and anti-tailgating security logic','Real-time event logging with cloud synchronization','Integration with third-party access control software','Tamper detection with automatic alarm triggering','Support for IC, ID, NFC, and mobile credentials'],
    apps: ['Commercial office building entrance access control','Industrial facility restricted area management','Residential community gate and parking automation','Educational campus building access and attendance','Healthcare facility restricted ward management','Government multi-level security zone enforcement'],
    install: ['Mount at door handle height 1.2 to 1.5 meters','Run shielded network and power cabling','Connect to controller or network switch','Initialize through management software','Enroll credentials and configure access groups','Test all entry and exit scenarios'],
    bp: ['Regular maintenance schedule for card readers and sensors','Maintain up-to-date access control matrix','Enable audit logging for regulatory compliance','Implement visitor management workflow','Configure automatic lockout after failed attempts','Test door release under power failure conditions'],
    overview: 'This access control device provides secure personnel management for controlled entry and exit points. Combining multiple authentication methods with real-time event logging, it delivers comprehensive access control for commercial, industrial, and residential environments.' },
  POS: { domain: 'point-of-sale and retail technology',
    features: ['High-speed thermal printing with auto paper detection','Multiple connectivity interfaces including Ethernet and USB','ESC/POS command compatibility','Compact form factor for countertop deployment','Cash drawer kick-out port with configurable bell','Self-diagnostic capability with status reporting'],
    apps: ['Restaurant and food service order printing','Retail checkout receipt generation','Hospitality front desk billing slip printing','Warehouse picking and packing slip generation','Healthcare pharmacy prescription label printing','Ticketing and queuing system output'],
    install: ['Connect via USB, Ethernet, or serial cable','Install paper roll per directional guide','Install printer driver or configure ESC/POS','Run self-test print to verify hardware','Adjust print density for paper type','Mount on counter or pole mount bracket'],
    bp: ['Use recommended thermal paper grades','Clean print head and paper path regularly','Set up low-paper and error notifications','Configure receipt format with business details','Test cash drawer kick-out connection','Maintain backup printer on-site'],
    overview: 'This thermal receipt printer delivers fast and reliable output for point-of-sale transaction documentation. Designed for high-volume retail and hospitality environments, it provides consistent print quality with minimal maintenance.' },
  Storage: { domain: 'data storage and drive technology',
    features: ['High-capacity storage with reliable sequential performance','SATA III 6Gb/s interface for maximum throughput','Vibration resistance and shock protection','Error correction code for data integrity','Low power consumption with adaptive spin-down','MTBF rating exceeding 1 million hours'],
    apps: ['NVR storage expansion for surveillance retention','Server data center archival backup infrastructure','Desktop workstation storage for content creation','NAS drive bay deployment for shared storage','Surveillance DVR continuous recording','Data backup and disaster recovery'],
    install: ['Power down system before installation','Mount in appropriate 3.5 or 2.5 inch bay','Connect SATA data and power cables','Verify drive in BIOS or UEFI','Initialize and format through disk management','Configure partition layout for workload'],
    bp: ['Avoid temperatures outside rated range','Monitor S.M.A.R.T. health attributes regularly','Enable scheduled data integrity checks','Maintain adequate airflow for cooling','Implement backup drive rotation schedule','Document serial numbers for asset tracking'],
    overview: 'This hard disk drive provides high-capacity data storage for professional and enterprise applications. Designed for continuous operation, it delivers consistent performance for sequential and random data access workloads.' },
};

const GENERIC = { domain: 'professional equipment and technology solutions',
  features: ['Professional-grade construction for reliable operation','Integration with existing management platforms','Remote configuration via web-based interfaces','Industry-standard protocols and certifications','Energy-efficient with intelligent power management','Compact design for various environments'],
  apps: ['Commercial and enterprise infrastructure deployment','Industrial facility operational support','Educational institution technology infrastructure','Healthcare facility specialized equipment','Government and institutional operations','Residential smart technology integration'],
  install: ['Review documentation to verify site requirements','Prepare area with adequate power and connectivity','Follow manufacturer mounting guidelines','Connect to network and configure settings','Test all functions before finalizing installation','Document IP configuration and physical location'],
  bp: ['Follow manufacturer maintenance schedule','Keep firmware updated to latest stable version','Monitor device health through management dashboard','Maintain documentation of configurations','Train staff on basic troubleshooting','Review device placement periodically'],
  overview: 'This product is designed for professional technology deployment across commercial and enterprise environments. It provides reliable performance with support for standard integration protocols and management interfaces.' };

function brand(name: string): { brand: string; info: string } {
  const l = name.toLowerCase();
  if (l.includes('hikvision') || l.startsWith('ds-')) return { brand: 'Hikvision', info: 'Part of the Hikvision product ecosystem with compatibility with iVMS and HikCentral platforms.' };
  if (l.includes('reyee') || l.includes('rg-')) return { brand: 'Reyee', info: 'Engineered for simplified network deployment with cloud-first management via the Reyee platform.' };
  if (l.includes('zkteco') || l.includes('f18') || l.includes('k60') || l.includes('sc105') || l.includes('ua400') || l.includes('gl300')) return { brand: 'ZKTeco', info: 'Leverages advanced biometric and RFID technologies with ZKBioSecurity and ZKBio Time platforms.' };
  if (l.includes('link-')) return { brand: 'LINK', info: 'Designed for structured cabling meeting international standards for data transmission.' };
  if (l.includes('hip-') || l.includes('hip ')) return { brand: 'HIP', info: 'Serves the security and access control market with specialized hardware.' };
  if (l.includes('ribbon') || l.includes('erc38') || l.includes('barcode')) return { brand: 'Ribbon', info: 'Designed for telecommunications and structured cabling applications.' };
  if (l.includes('guard-tour') || l.includes('gt11')) return { brand: 'Guard Tour', info: 'Provides checkpoint verification and patrol management for security personnel.' };
  return { brand: 'Professional', info: 'Part of a comprehensive technology portfolio for professional deployment.' };
}

function infer(name: string, catMap: Record<string, string>): string {
  const l = name.toLowerCase();
  for (const [, cn] of Object.entries(catMap)) { if (l.includes(cn.toLowerCase())) return cn; }
  if (l.includes('camera') || l.includes('cctv') || l.includes('nvr') || l.startsWith('ds-2')) return 'Surveillance';
  if (l.includes('switch') || l.includes('access point') || l.includes('wi-fi') || l.includes('rap') || l.includes('rg-')) return 'Networking';
  if (l.includes('door') || l.includes('access control') || l.includes('hip-') || l.includes('barrier') || l.includes('kt') || l.includes('k60') || l.includes('f18')) return 'Access Control';
  if (l.includes('printer') || l.includes('pos')) return 'POS';
  if (l.includes('hdd') || l.includes('seagate')) return 'Storage';
  return 'Accessories';
}

function gen(p: any, catMap: Record<string, string>, docs: any[], faqs: any[], ts: any[], tc: any[]): string {
  const name = p.name;
  const catName = catMap[p.category_id] || 'Products';
  const k = CAT[catName] || CAT[infer(name, catMap)] || GENERIC;
  const b = brand(name);
  const desc = p.description && p.description.length > 10 ? p.description : '';
  const s: string[] = [];
  s.push(`## Overview\n\n${k.overview}\n\n${b.info}\n\n${desc ? `The ${name} is designed to deliver dependable performance for applications requiring ${k.domain} capabilities. ${desc}` : `The ${name} is engineered for professional-grade deployment in environments where ${k.domain} performance and reliability are critical.`} This product is backed by comprehensive documentation and technical support.`);
  s.push(`## Features\n\n${k.features.map(f=>`- ${f}`).join('\n')}\n\nThe ${name} supports integration with standard management platforms used in ${k.domain} deployments.`);
  s.push(`## Applications\n\nThe ${name} is suitable for:\n\n${k.apps.map(a=>`- ${a}`).join('\n')}\n\nThe device is appropriate for organizations seeking reliable ${k.domain} solutions.`);
  const inst = [...k.install];
  if (ts.length > 0 && ts[0].solution) { const f = ts[0].solution.split('\n')[0]; if (f && f.length > 20) inst.push(`After installation, verify operation. ${f.replace(/^\d+\.\s*/, '')}.`); }
  s.push(`## Installation Notes\n\n**Important:** Review all documentation before installation.\n\n${inst.map((n,i)=>`${i+1}. ${n}`).join('\n')}\n\nRefer to the ${docs.find(d=>d.document_type==='User Manual')?.title||'User Manual'} for detailed procedures.`);
  const bp = [...k.bp];
  faqs.forEach(f=>{ if (f.answer && f.answer.length > 20) bp.push(`${f.question.replace(/\?$/,'.')} ${f.answer}`); });
  s.push(`## Best Practices\n\n${bp.map(b=>`- ${b}`).join('\n')}`);
  if (ts.length > 0) s.push(`## Troubleshooting\n\n${ts.map(t=>`### ${t.issue}\n\n**Symptoms:** ${t.symptoms}\n\n**Resolution:**\n${t.solution}`).join('\n\n')}\n\nContact support if issues persist.`);
  if (tc.length > 0) s.push(`## Training\n\n${tc.map(c=>`- **${c.title}** (${c.difficulty||'Beginner'}) — ${c.description}`).join('\n')}`);
  s.push(`## Summary\n\nThe ${name} is a professional ${k.domain} solution from ${b.brand} for commercial and enterprise environments.\n\n**Key Highlights:**\n- Professional-grade construction\n- Integration with ${b.brand} management ecosystem\n- Comprehensive documentation and support\n- Suitable for ${k.apps[0]?.toLowerCase()||'professional'} applications`);
  return s.join('\n\n');
}

function escSql(str: string): string {
  return str.replace(/'/g, "''").replace(/\\/g, '\\\\');
}

// ─── Main ──────────────────────────────────────────────────────────
const data = JSON.parse(readFileSync(dataPath, 'utf8'));
const { products, categories, docs, faqs, ts, tc } = data;
const catMap: Record<string, string> = {};
categories.forEach((c: any) => catMap[c.id] = c.name);

const docsBy = new Map<string, any[]>(); docs.forEach((d: any) => { if (!docsBy.has(d.product_id)) docsBy.set(d.product_id, []); docsBy.get(d.product_id)!.push(d); });
const faqsBy = new Map<string, any[]>(); faqs.forEach((f: any) => { if (!faqsBy.has(f.product_id)) faqsBy.set(f.product_id, []); faqsBy.get(f.product_id)!.push(f); });
const tsBy = new Map<string, any[]>(); ts.forEach((t: any) => { if (!tsBy.has(t.product_id)) tsBy.set(t.product_id, []); tsBy.get(t.product_id)!.push(t); });
const tcBy = new Map<string, any[]>(); tc.forEach((c: any) => { if (!tcBy.has(c.product_id)) tcBy.set(c.product_id, []); tcBy.get(c.product_id)!.push(c); });

mkdirSync(outDir, { recursive: true });

const updates: string[] = [];
products.forEach((p: any) => {
  const rel = { docs: docsBy.get(p.id)||[], faqs: faqsBy.get(p.id)||[], ts: tsBy.get(p.id)||[], tc: tcBy.get(p.id)||[] };
  const content = gen(p, catMap, rel.docs, rel.faqs, rel.ts, rel.tc);
  updates.push(`UPDATE products SET content = '${escSql(content)}' WHERE id = '${p.id}';`);
});

// Split into 3 batches
const batchSize = Math.ceil(updates.length / 3);
const batches = [updates.slice(0, batchSize), updates.slice(batchSize, batchSize*2), updates.slice(batchSize*2)];

batches.forEach((batch, i) => {
  const filename = `batch_${String(i+1).padStart(2,'0')}.sql`;
  const content = `-- Product Content Backfill - Batch ${i+1} of 3\n-- Products: ${batch.length}\n-- Generated: ${new Date().toISOString()}\n-- Run in Supabase SQL Editor\n\nBEGIN;\n\n${batch.join('\n\n')}\n\nCOMMIT;\n\n-- Verification\nSELECT COUNT(*) as products_with_content FROM products WHERE LENGTH(content) > 100;\n`;
  writeFileSync(resolve(outDir, filename), content);
  console.log(`${filename}: ${batch.length} updates, ${content.length} chars`);
});

const totalSize = batches.reduce((s, b) => s + b.length, 0);
console.log(`\nTotal: ${totalSize} updates across 3 files`);
console.log(`Output: ${outDir}`);
console.log(`Verification: SELECT COUNT(*) FROM products WHERE LENGTH(content) > 100;`);