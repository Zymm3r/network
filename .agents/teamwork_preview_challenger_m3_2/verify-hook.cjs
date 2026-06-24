const fs = require('fs');
const path = require('path');

const hookPath = path.resolve('src/features/equipment/hooks/useProductDetail.ts');
const content = fs.readFileSync(hookPath, 'utf8');

const checks = [
  { name: 'nameVal', regex: /nameVal !== null && nameVal !== undefined && nameVal !== ''/ },
  { name: 'descVal', regex: /descVal !== null && descVal !== undefined && descVal !== ''/ },
  { name: 'contentVal', regex: /contentVal !== null && contentVal !== undefined && contentVal !== ''/ },
  { name: 'mappedDocuments title', regex: /docTitle !== null && docTitle !== undefined && docTitle !== ''/ },
  { name: 'mappedFaqs question', regex: /qVal !== null && qVal !== undefined && qVal !== ''/ },
  { name: 'mappedFaqs answer', regex: /aVal !== null && aVal !== undefined && aVal !== ''/ },
  { name: 'mappedGuides issue', regex: /issueVal !== null && issueVal !== undefined && issueVal !== ''/ },
  { name: 'mappedGuides symptoms', regex: /symVal !== null && symVal !== undefined && symVal !== ''/ },
  { name: 'mappedGuides solution', regex: /solVal !== null && solVal !== undefined && solVal !== ''/ },
  { name: 'mappedCourses lesson title', regex: /lTitle !== null && lTitle !== undefined && lTitle !== ''/ },
  { name: 'mappedCourses lesson content', regex: /lContent !== null && lContent !== undefined && lContent !== ''/ },
  { name: 'mappedCourses course title', regex: /cTitle !== null && cTitle !== undefined && cTitle !== ''/ },
  { name: 'mappedCourses course description', regex: /cDesc !== null && cDesc !== undefined && cDesc !== ''/ },
];

console.log('Analyzing useProductDetail.ts fallback trim checks...');
let issuesFound = 0;

for (const check of checks) {
  const match = content.match(check.regex);
  if (match) {
    console.log(`[WARNING] Field '${check.name}' does not include trim() check. Matching code: "${match[0]}"`);
    issuesFound++;
  } else {
    // If regex doesn't match, maybe it already uses trim, let's verify if a trimmed check exists
    const hasTrim = content.includes(`${check.name.split(' ')[0]}.trim()`);
    if (!hasTrim) {
      console.log(`[INFO] Field '${check.name}' might have custom implementation, but no explicit trim() check found.`);
    }
  }
}

if (issuesFound > 0) {
  console.log(`\nAnalysis complete. Found ${issuesFound} fields where empty whitespace strings ('   ') could bypass fallback logic.`);
  process.exit(1);
} else {
  console.log('\nAnalysis complete. All fields correctly use trim() checks.');
  process.exit(0);
}
