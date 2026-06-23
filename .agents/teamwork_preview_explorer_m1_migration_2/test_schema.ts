import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

async function testColumns(cols: string) {
    const res = await fetch(`${supabaseUrl}/rest/v1/training_courses?select=${cols}&limit=1`, {
        headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`
        }
    });
    if (res.ok) {
        console.log(`Columns [${cols}] exist! (Status: ${res.status})`);
        return true;
    } else {
        const text = await res.text();
        console.log(`Columns [${cols}] error:`, text);
        return false;
    }
}

async function main() {
    await testColumns('id');
    await testColumns('title');
    await testColumns('description');
    await testColumns('difficulty');
}

main();
