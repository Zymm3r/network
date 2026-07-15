import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

function generateTemplate(productName: string, type: string, lang: 'th' | 'en') {
  if (lang === 'th') {
    return `## Overview

${productName} ได้รับการออกแบบมาเพื่อให้ประสิทธิภาพการทำงานที่พึ่งพาได้สำหรับแอปพลิเคชันที่ต้องการการจัดการระดับอุตสาหกรรม ผลิตภัณฑ์นี้ช่วยให้การทำงานมีความปลอดภัยและเสถียรยิ่งขึ้น This product is backed by comprehensive documentation and technical support จากบริษัทผู้ผลิตโดยตรง.

## Features

- ประสิทธิภาพสูงและเสถียรภาพเยี่ยม
- รองรับการติดตั้งแบบ Plug and Play
- ดีไซน์ทนทานต่อสภาพแวดล้อม
- ประหยัดพลังงาน
- รับประกันการใช้งานระยะยาว

The ${productName} supports integration with ระบบเครือข่ายระดับองค์กรทั่วไป.

## Applications

The ${productName} is suitable for:

- สำนักงานขนาดกลางถึงขนาดใหญ่
- โรงงานอุตสาหกรรม
- คลังสินค้า
- โรงพยาบาล
- ห้างสรรพสินค้า
- สถาบันการศึกษา

The device is appropriate for organizations seeking reliable ${type} solutions.

## Installation Notes

**Important:** Review all documentation before installation.

1. Review documentation to verify site requirements (ตรวจสอบแผนผังพื้นที่และจุดเชื่อมต่อให้เรียบร้อย)
2. ติดตั้งอุปกรณ์เข้ากับจุดที่กำหนดให้แน่นหนา
3. เชื่อมต่อสายไฟและสายสัญญาณ
4. Connect to network and configure settings (ตั้งค่า IP และพารามิเตอร์ผ่านแดชบอร์ด)
5. Test all functions before finalizing installation
6. Document physical location (จดบันทึกหมายเลขซีเรียลและตำแหน่งในระบบ asset)
7. After installation, verify operation. ตรวจสอบสถานะไฟ LED เพื่อยืนยันว่าทำงานปกติ.

Refer to the คู่มือการใช้งาน ${productName} for detailed procedures.

## Best Practices

- Follow manufacturer maintenance schedule
- ตรวจสอบสายเคเบิลทุกๆ 6 เดือน
- Monitor device health through management dashboard
- Maintain documentation of configurations (สำรองค่า config เก็บไว้ในระบบเสมอ)
- Train staff on basic troubleshooting
- Review device placement periodically
- การรับประกันของแบรนด์นี้ ครอบคลุมอะไรบ้าง: ครอบคลุมการเปลี่ยนอะไหล่ 1 ปีเต็ม ติดต่อศูนย์บริการ 02-123-4567
- วิธีรีเซ็ตค่าโรงงานสำหรับ ${productName}: กดปุ่ม Reset ค้างไว้ 10 วินาทีจนไฟกะพริบ.

## Troubleshooting

## ปัญหาเปิดไม่ติด / Power Failure

**Symptoms:** อุปกรณ์ไม่มีไฟสถานะขึ้น และไม่สามารถตอบสนองได้
**Resolution:**
1. ตรวจสอบเต้ารับและสายไฟว่าเสียบแน่นหรือไม่
2. ทดลองเปลี่ยนสายอะแดปเตอร์
3. หากแก้ไขไม่ได้ โปรดติดต่อฝ่ายสนับสนุนทางเทคนิคที่ support@utech.com

Contact support if issues persist.

## Training

- **Basic Operation Course** (Beginner) - เรียนรู้วิธีเปิดใช้งานและตั้งค่าอุปกรณ์เบื้องต้นใน 30 นาที

## Summary

The ${productName} is a ${type} solution from TopBrand for องค์กรและสภาพแวดล้อมที่ต้องการความเสถียร.

## Key Highlights:
- ติดตั้งง่ายใน 5 นาที
- ทนทานต่อการใช้งานหนัก
- ประหยัดพลังงานระดับ 5
- รองรับการอัปเกรดในอนาคต`;
  } else {
    return `## Overview

The ${productName} is designed to deliver dependable performance for applications requiring industrial-grade management. This product ensures safe and stable operations. This product is backed by comprehensive documentation and technical support from the manufacturer.

## Features

- High performance and excellent stability
- Supports Plug and Play installation
- Durable design for harsh environments
- Energy efficient
- Long-term warranty

The ${productName} supports integration with standard enterprise network systems.

## Applications

The ${productName} is suitable for:

- Medium to large offices
- Industrial factories
- Warehouses
- Hospitals
- Shopping malls
- Educational institutions

The device is appropriate for organizations seeking reliable ${type} solutions.

## Installation Notes

**Important:** Review all documentation before installation.

1. Review documentation to verify site requirements (Check site layout and connection points)
2. Mount the device securely to the designated spot
3. Connect power and signal cables
4. Connect to network and configure settings (Configure IP and parameters via dashboard)
5. Test all functions before finalizing installation
6. Document physical location (Record serial number and location in asset system)
7. After installation, verify operation. Check LED status to confirm normal operation.

Refer to the ${productName} User Manual for detailed procedures.

## Best Practices

- Follow manufacturer maintenance schedule
- Check cables every 6 months
- Monitor device health through management dashboard
- Maintain documentation of configurations (Always backup configs)
- Train staff on basic troubleshooting
- Review device placement periodically
- Warranty coverage: Covers parts replacement for 1 full year. Contact service center at 02-123-4567.
- Factory reset for ${productName}: Press and hold the Reset button for 10 seconds until the light blinks.

## Troubleshooting

## Power Failure / ปัญหาเปิดไม่ติด

**Symptoms:** The device shows no status lights and is unresponsive.
**Resolution:**
1. Check the power outlet and ensure cables are plugged in securely.
2. Try replacing the power adapter.
3. If the issue persists, please contact technical support at support@utech.com.

Contact support if issues persist.

## Training

- **Basic Operation Course** (Beginner) - Learn how to turn on and configure the device in 30 minutes.

## Summary

The ${productName} is a ${type} solution from TopBrand for organizations and environments requiring stability.

## Key Highlights:
- Easy setup in 5 minutes
- Durable for heavy use
- Tier 5 energy saving
- Supports future upgrades`;
  }
}

const products = [
  { id: '08493e26-39f0-4b36-b172-d5df7928a582', name: 'Line Protector', type: 'Surge Protection' },
  { id: '8c32021a-c23a-4ca7-8121-3c02b8eaa818', name: 'HIP Key Tag รุ่น HL-3', type: 'Access Control' },
  { id: '338f7e58-c0de-4cbc-852e-5ca41bdcac7d', name: 'PABX PHONiK รุ่น Super Diamond (C)', type: 'Telecommunication' }
];

async function run() {
  const records: any[] = [];
  
  for (const p of products) {
    records.push({
      product_id: p.id,
      language: 'th',
      content: generateTemplate(p.name, p.type, 'th')
    });
    records.push({
      product_id: p.id,
      language: 'en',
      content: generateTemplate(p.name, p.type, 'en')
    });
  }

  const { error } = await supabase.from('product_translations').upsert(records, { onConflict: 'product_id, language' });
  
  if (error) {
    console.error('Error upserting:', error.message);
  } else {
    console.log('Successfully upserted sample translations.');
  }
}

run();
