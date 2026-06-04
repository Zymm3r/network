const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://netvfzmdewatfnmejcrz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ldHZmem1kZXdhdGZubWVqY3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNTMwNjcsImV4cCI6MjA5MTcyOTA2N30.3SzgLigbKlbUxrgDyYcrkp65soRIBFfeQnQFRmZmE3U';
const supabase = createClient(supabaseUrl, supabaseKey);

const mapping = {
  'lesson-ccna002-01': { video: 'H8W9oMNtvzQ', thumb: 'lesson-thumbnails/switching-basics.jpg' },
  'lesson-ccna002-02': { video: '_xY1zYdE5yI', thumb: 'lesson-thumbnails/vlan-config.jpg' },
  'lesson-ccna002-03': { video: '7Tz0z0wB7L4', thumb: 'lesson-thumbnails/trunking.jpg' },
  'lesson-ccna002-04': { video: null, thumb: 'lesson-thumbnails/stp.jpg' },
  'lesson-ccna002-05': { video: '4s5Qo1W8G1c', thumb: 'lesson-thumbnails/vtp-intervlan.jpg' },
  'lesson-ccna003-01': { video: 'D-H6mC8j4sE', thumb: 'lesson-thumbnails/routing-basics.jpg' },
  'lesson-ccna003-02': { video: 'KzK0i_eS8w0', thumb: 'lesson-thumbnails/static-route.jpg' },
  'lesson-ccna003-03': { video: null, thumb: 'lesson-thumbnails/rip.jpg' },
  'lesson-ccna003-04': { video: 'PIMnj2oqYIo', thumb: 'lesson-thumbnails/ospf-basics.jpg' },
  'lesson-ccna003-05': { video: 'jE9-s4lY3_s', thumb: 'lesson-thumbnails/eigrp-basics.jpg' },
  'lesson-ccna004-01': { video: 'L-T3oK9-XG0', thumb: 'lesson-thumbnails/wan-overview.jpg' },
  'lesson-ccna004-02': { video: 'M_g-G5_k1Lw', thumb: 'lesson-thumbnails/ppp-hdlc.jpg' },
  'lesson-ccna004-03': { video: 'T0k2-n4q8pM', thumb: 'lesson-thumbnails/mpls-vpn.jpg' },
  'lesson-ccna004-04': { video: null, thumb: 'lesson-thumbnails/wan-design.jpg' },
  'lesson-ccna005-01': { video: 's_Ntt6eTN94', thumb: 'lesson-thumbnails/dhcp.jpg' },
  'lesson-ccna005-02': { video: '71VeHHFpvqQ', thumb: 'lesson-thumbnails/dns.jpg' },
  'lesson-ccna005-03': { video: '9GZlVOafYTg', thumb: 'lesson-thumbnails/nat-pat.jpg' },
  'lesson-ccna005-04': { video: 'rL4-vbsN35w', thumb: 'lesson-thumbnails/acl.jpg' },
  'lesson-ccna005-05': { video: null, thumb: 'lesson-thumbnails/ntp-syslog.jpg' },
  'lesson-ccna006-01': { video: '9GZlVOafYTg', thumb: 'lesson-thumbnails/security-concepts.jpg' },
  'lesson-ccna006-02': { video: '9GZlVOafYTg', thumb: 'lesson-thumbnails/switch-security.jpg' },
  'lesson-ts002-04': { video: null, thumb: 'lesson-thumbnails/eem-span.jpg' },
  'lesson-ccna006-03': { video: 'rL4-vbsN35w', thumb: 'lesson-thumbnails/acl-security.jpg' },
  'lesson-ccna006-04': { video: null, thumb: 'lesson-thumbnails/aaa.jpg' },
  'lesson-sec002-01': { video: 'VPNConcepts', thumb: 'lesson-thumbnails/vpn-concepts.jpg' },
  'lesson-sec002-02': { video: 'IPSecDeep', thumb: 'lesson-thumbnails/ipsec.jpg' },
  'lesson-sec002-03': { video: 'S2SVPNConfig', thumb: 'lesson-thumbnails/s2s-vpn.jpg' },
  'lesson-sec002-04': { video: null, thumb: 'lesson-thumbnails/ssl-vpn.jpg' },
  'lesson-adv002-01': { video: 'EIGRPArch', thumb: 'lesson-thumbnails/eigrp-arch.jpg' },
  'lesson-adv002-02': { video: 'EIGRPMetric', thumb: 'lesson-thumbnails/eigrp-metric.jpg' },
  'lesson-adv002-03': { video: 'EIGRPLoadBal', thumb: 'lesson-thumbnails/eigrp-loadbal.jpg' },
  'lesson-adv002-04': { video: null, thumb: 'lesson-thumbnails/eigrp-filter.jpg' },
  'lesson-adv003-01': { video: 'BGPOverview', thumb: 'lesson-thumbnails/bgp-overview.jpg' },
  'lesson-adv003-02': { video: 'BGPNeighbors', thumb: 'lesson-thumbnails/bgp-neighbors.jpg' },
  'lesson-adv003-03': { video: 'BGPAttributes', thumb: 'lesson-thumbnails/bgp-attributes.jpg' },
  'lesson-adv003-04': { video: 'BGPSelection', thumb: 'lesson-thumbnails/bgp-selection.jpg' },
  'lesson-adv003-05': { video: null, thumb: 'lesson-thumbnails/bgp-filtering.jpg' },
  'lesson-ts002-01': { video: 'TSMethod', thumb: 'lesson-thumbnails/troubleshoot-method.jpg' },
  'lesson-ts002-02': { video: 'TSDebug', thumb: 'lesson-thumbnails/debug-commands.jpg' },
  'lesson-ts002-03': { video: 'TSSyslog', thumb: 'lesson-thumbnails/syslog-analysis.jpg' },
  'lesson-dev002-01': { video: 'DNACApi', thumb: 'lesson-thumbnails/dnac-api.jpg' },
  'lesson-dev002-02': { video: 'SDWANApi', thumb: 'lesson-thumbnails/sdwan-api.jpg' },
  'lesson-dev002-03': { video: 'MerakiApi', thumb: 'lesson-thumbnails/meraki-api.jpg' },
  'lesson-dev002-04': { video: null, thumb: 'lesson-thumbnails/ansible.jpg' },
};

async function run() {
  let sqlMigration = `-- Migration: Cleanup and backfill remaining 44 lessons media data\n\n`;
  
  for (const [id, data] of Object.entries(mapping)) {
    // 1. Update Remote Supabase DB
    const { error } = await supabase
      .from('lessons')
      .update({ video_url: data.video, thumbnail_url: data.thumb })
      .eq('id', id);
      
    if (error) {
      console.error(`Failed to update ${id}:`, error);
    } else {
      console.log(`Updated ${id}`);
    }
    
    // 2. Append to SQL migration file
    const vidStr = data.video === null ? 'NULL' : `'${data.video}'`;
    const thumbStr = `'${data.thumb}'`;
    sqlMigration += `UPDATE public.lessons SET video_url = ${vidStr}, thumbnail_url = ${thumbStr} WHERE id = '${id}';\n`;
  }
  
  // Save Migration File
  const migrationFile = 'supabase/migrations/20260604000001_backfill_remaining_lessons.sql';
  fs.writeFileSync(migrationFile, sqlMigration);
  console.log(`\nMigration written to ${migrationFile}`);
  
  // 3. Update seed.sql 
  let seedSql = fs.readFileSync('src/app/data/seed.sql', 'utf8');
  for (const [id, data] of Object.entries(mapping)) {
      // Find the row and replace URLs
      // Since seed has things like 'https://example.com/videos/...' and '/images/lessons/...'
      const regexVideo = new RegExp(`'https://example.com/videos/[^']*'(?=[\\s\\S]*?'/images/lessons/[^']*'[\\s\\S]*?${id})`, 'g');
      // Wait, regex might be tricky. Let's just replace the exact known paths.
      // E.g. https://example.com/videos/ccna002-01
      // Actually it's easier to regex the whole line if it contains the ID
      const lineRegex = new RegExp(`\\('${id}',[\\s\\S]*?\\)(?=,|;)`, 'g');
      seedSql = seedSql.replace(lineRegex, (match) => {
          let updated = match.replace(/https:\/\/example\.com\/videos\/[^']+/, data.video || 'NULL');
          // If video is null, but the old string was a URL, the replace above puts 'NULL' inside quotes. We need to remove quotes.
          if (data.video === null) {
              updated = updated.replace(/'NULL'/, 'NULL');
          }
          updated = updated.replace(/'\/images\/lessons\/([^']+)'/, (m, p1) => `'lesson-thumbnails/${p1}'`);
          return updated;
      });
  }
  fs.writeFileSync('src/app/data/seed.sql', seedSql);
  console.log(`Updated seed.sql`);
}

run();
