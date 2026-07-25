import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function resetProgress() {
  console.log("Starting progress reset...");

  try {
    // 1. Delete from enrollments where course_id != 'ccna-001'
    console.log("Resetting enrollments...");
    const { error: enrollError, count: enrollCount } = await supabase
      .from('enrollments')
      .delete({ count: 'exact' })
      .neq('course_id', 'ccna-001');

    if (enrollError) {
      console.error("Error deleting enrollments:", enrollError);
    } else {
      console.log(`Successfully deleted ${enrollCount ?? 'unknown number of'} enrollments (except ccna-001).`);
    }

    // 2. Fetch all lesson IDs that belong to courses OTHER THAN ccna-001
    console.log("Fetching lesson IDs to reset...");
    const { data: lessons, error: lessonsError } = await supabase
      .from('lessons')
      .select('id')
      .neq('course_id', 'ccna-001');

    if (lessonsError) {
      console.error("Error fetching lessons:", lessonsError);
      return;
    }

    if (!lessons || lessons.length === 0) {
      console.log("No lessons found to reset.");
      return;
    }

    const lessonIds = lessons.map(l => l.id);
    console.log(`Found ${lessonIds.length} lessons to reset progress for.`);

    // Delete in chunks if there are too many, but Supabase `in` filter usually handles hundreds fine.
    // Let's do it in chunks of 100 just to be safe.
    let totalDeleted = 0;
    for (let i = 0; i < lessonIds.length; i += 100) {
      const chunk = lessonIds.slice(i, i + 100);
      const { error: progressError, count: progressCount } = await supabase
        .from('user_progress')
        .delete({ count: 'exact' })
        .in('lesson_id', chunk);

      if (progressError) {
        console.error(`Error deleting user_progress for chunk ${i}:`, progressError);
      } else {
        totalDeleted += (progressCount || 0);
      }
    }

    console.log(`Successfully deleted ${totalDeleted} user_progress records.`);
    console.log("Progress reset completed!");

  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

resetProgress();
