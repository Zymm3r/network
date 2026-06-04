const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://netvfzmdewatfnmejcrz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ldHZmem1kZXdhdGZubWVqY3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNTMwNjcsImV4cCI6MjA5MTcyOTA2N30.3SzgLigbKlbUxrgDyYcrkp65soRIBFfeQnQFRmZmE3U';
const supabase = createClient(supabaseUrl, supabaseKey);

const mapping = {
  'lesson-ccna002-01': { video: 'H8W9oMNtvzQ' },
  'lesson-ccna002-02': { video: '_xY1zYdE5yI' },
  'lesson-ccna002-03': { video: '7Tz0z0wB7L4' },
  'lesson-ccna002-04': { video: null },
  'lesson-ccna002-05': { video: '4s5Qo1W8G1c' },
  'lesson-ccna003-01': { video: 'D-H6mC8j4sE' },
  'lesson-ccna003-02': { video: 'KzK0i_eS8w0' },
  'lesson-ccna003-03': { video: null },
  'lesson-ccna003-04': { video: 'PIMnj2oqYIo' },
  'lesson-ccna003-05': { video: 'jE9-s4lY3_s' },
  'lesson-ccna004-01': { video: 'L-T3oK9-XG0' },
  'lesson-ccna004-02': { video: 'M_g-G5_k1Lw' },
  'lesson-ccna004-03': { video: 'T0k2-n4q8pM' },
  'lesson-ccna004-04': { video: null },
  'lesson-ccna005-01': { video: 's_Ntt6eTN94' },
  'lesson-ccna005-02': { video: '71VeHHFpvqQ' },
  'lesson-ccna005-03': { video: '9GZlVOafYTg' },
  'lesson-ccna005-04': { video: 'rL4-vbsN35w' },
  'lesson-ccna005-05': { video: null },
  'lesson-ccna006-01': { video: '9GZlVOafYTg' },
  'lesson-ccna006-02': { video: '9GZlVOafYTg' },
  'lesson-ts002-04': { video: null },
  'lesson-ccna006-03': { video: 'rL4-vbsN35w' },
  'lesson-ccna006-04': { video: null },
  'lesson-sec002-01': { video: 'VPNConcepts' },
  'lesson-sec002-02': { video: 'IPSecDeep' },
  'lesson-sec002-03': { video: 'S2SVPNConfig' },
  'lesson-sec002-04': { video: null },
  'lesson-adv002-01': { video: 'EIGRPArch' },
  'lesson-adv002-02': { video: 'EIGRPMetric' },
  'lesson-adv002-03': { video: 'EIGRPLoadBal' },
  'lesson-adv002-04': { video: null },
  'lesson-adv003-01': { video: 'BGPOverview' },
  'lesson-adv003-02': { video: 'BGPNeighbors' },
  'lesson-adv003-03': { video: 'BGPAttributes' },
  'lesson-adv003-04': { video: 'BGPSelection' },
  'lesson-adv003-05': { video: null },
  'lesson-ts002-01': { video: 'TSMethod' },
  'lesson-ts002-02': { video: 'TSDebug' },
  'lesson-ts002-03': { video: 'TSSyslog' },
  'lesson-dev002-01': { video: 'DNACApi' },
  'lesson-dev002-02': { video: 'SDWANApi' },
  'lesson-dev002-03': { video: 'MerakiApi' },
  'lesson-dev002-04': { video: null },
};

// Base pool of tech photo IDs to ensure uniqueness
const photoIds = [
  '1517694712202-14dd9538aa97', '1519389953810-c511178f7364', '1550751827-4bd374c3f58b', 
  '1523961131990-521a0e01a8b7', '1496096265110-f83ad7f96608', '1542744094-1188d5e86532',
  '1573164713988-8665fc963095', '1551288049-bebda4e38f71', '1504639725590-34d0984388bd',
  '1525547719571-a2d4ac8945e2', '1484417894907-623942c8ee29', '1517433670267-088a143b8a1c',
  '1504384764586-bb4cdc1707b0', '1457305237443-44c3d5a30b89', '1563770660-93726db212e9',
  '1518770660439-4636190af475', '1544197150-b99a580bb7a8', '1508921912842-328b9c8b7db2',
  '1519125323398-675f0ddb6308', '1535223289827-42f1e9919769', '1451187580459-43490279c0fa',
  '1504384308090-c894fdcc538d', '1521542464131-cb30f7398bc6', '1501504905252-473c47e087f8',
  '1501504905252-473c47e087f8', '1516321318423-f06f85e504b3', '1562813733-b31f71025d54',
  '1614064641938-3bbee52942c7', '1526374965328-7f61d4dc18c5', '1553877522-43269d4ea984',
  '1555066931-4365d14bab8c', '1587620962725-abab7fe55159', '1629654297299-c8506221ca97',
  '1597852074816-d933c7d2b988', '1560732488-6b0df240254a', '1558494949-ef010cbdcc31',
  '1624368733221-3fc5298516fb', '1507208752277-2fce4d4c5c2d', '1631557022026-6466de27129f',
  '1585827720970-d4fb21884dc4', '1573164713988-8665fc963095', '1604147706228-591b92040ce6',
  '1581092923984-722a44bd27d5', '1518770660439-4636190af475'
];

async function run() {
  let sqlMigration = `-- Migration: Revert remaining 44 lessons to full URLs\n\n`;
  let index = 0;
  
  for (const [id, data] of Object.entries(mapping)) {
    // Generate valid full URLs
    const fullVideoUrl = data.video ? `https://www.youtube.com/watch?v=${data.video}` : null;
    
    // Cycle through photo IDs safely
    const photoId = photoIds[index % photoIds.length];
    index++;
    const fullThumbUrl = `https://images.unsplash.com/photo-${photoId}?w=600&q=80&auto=format`;
    
    // Append to SQL migration file
    const vidStr = fullVideoUrl === null ? 'NULL' : `'${fullVideoUrl}'`;
    const thumbStr = `'${fullThumbUrl}'`;
    sqlMigration += `UPDATE public.lessons SET video_url = ${vidStr}, thumbnail_url = ${thumbStr} WHERE id = '${id}';\n`;
  }
  
  // Save Migration File
  const migrationFile = 'supabase/migrations/20260604000002_revert_to_full_urls.sql';
  fs.writeFileSync(migrationFile, sqlMigration);
  console.log(`\nMigration written to ${migrationFile}`);
  
  // Update seed.sql 
  let seedSql = fs.readFileSync('src/app/data/seed.sql', 'utf8');
  let seedIndex = 0;
  
  for (const [id, data] of Object.entries(mapping)) {
    const fullVideoUrl = data.video ? `https://www.youtube.com/watch?v=${data.video}` : null;
    const photoId = photoIds[seedIndex % photoIds.length];
    seedIndex++;
    const fullThumbUrl = `https://images.unsplash.com/photo-${photoId}?w=600&q=80&auto=format`;
    
    // Replace in seed.sql: video_url and thumbnail_url
    // seed.sql currently has:
    // ... 'H8W9oMNtvzQ', 'lesson-thumbnails/switching-basics.jpg' ...
    const lineRegex = new RegExp(`\\('${id}',([\\s\\S]*?)\\)(?=,|;)`, 'g');
    
    seedSql = seedSql.replace(lineRegex, (match, inner) => {
        // The last two string fields before dates are video and thumb
        // e.g., 'videoID' or NULL, 'lesson-thumbnails/something.jpg'
        // We will split by commas, taking care of strings
        let cols = match.split(/,\s*(?=(?:[^']*'[^']*')*[^']*$)/);
        if (cols.length >= 11) {
            cols[cols.length - 4] = fullVideoUrl ? `'${fullVideoUrl}'` : 'NULL';
            cols[cols.length - 3] = `'${fullThumbUrl}'`;
            return cols.join(', ');
        }
        return match;
    });
  }
  fs.writeFileSync('src/app/data/seed.sql', seedSql);
  console.log(`Updated seed.sql`);
}

run();
