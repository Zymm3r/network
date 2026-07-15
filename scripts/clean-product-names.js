import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function cleanString(name) {
  if (!name) return name;
  return name
    .replace(/Product Brand\s*>\s*/ig, '')
    .replace(/Product Category\s*>\s*/ig, '')
    .replace(/Brand\s*>\s*/ig, '')
    .replace(/Category\s*>\s*/ig, '')
    .trim();
}

async function main() {
  console.log('Fetching products...');
  const { data: products, error } = await supabase.from('products').select('id, name');
  
  if (error) {
    console.error('Error fetching products:', error);
    return;
  }

  console.log(`Found ${products.length} products. Cleaning names...`);

  let updatedCount = 0;

  for (const product of products) {
    const cleanedName = cleanString(product.name);

    const needsUpdate = product.name !== cleanedName;

    if (needsUpdate) {
      const { error: updateError } = await supabase
        .from('products')
        .update({
          name: cleanedName
        })
        .eq('id', product.id);

      if (updateError) {
        console.error(`Error updating product ${product.id}:`, updateError);
      } else {
        updatedCount++;
        console.log(`Updated: "${product.name}" -> "${cleanedName}"`);
      }
    }
  }

  console.log(`\nFinished! Updated ${updatedCount} products.`);

  console.log('\nFetching training courses...');
  const { data: courses, error: courseError } = await supabase.from('training_courses').select('id, title, description');
  
  if (courseError) {
    console.error('Error fetching courses:', courseError);
    return;
  }

  console.log(`Found ${courses.length} courses. Cleaning titles and descriptions...`);
  let courseUpdatedCount = 0;

  for (const course of courses) {
    const cleanedTitle = cleanString(course.title);
    const cleanedDesc = cleanString(course.description);

    if (course.title !== cleanedTitle || course.description !== cleanedDesc) {
      const { error: updateError } = await supabase
        .from('training_courses')
        .update({
          title: cleanedTitle,
          description: cleanedDesc
        })
        .eq('id', course.id);

      if (updateError) {
        console.error(`Error updating course ${course.id}:`, updateError);
      } else {
        courseUpdatedCount++;
        console.log(`Updated Course: "${course.title}" -> "${cleanedTitle}"`);
      }
    }
  }

  console.log(`\nFinished! Updated ${courseUpdatedCount} courses.`);
}

main();
