import cron from 'node-cron';
import fetch from 'node-fetch';

cron.schedule('0 9 * * *', async () => {
  console.log('⏰ CRON эхэллээ...');
  try {
    const res = await fetch('https://pinequest-n2o2.vercel.app/api/reminder');
    const data = await res.json();
    console.log('✅ API хариу:', data);
  } catch (err) {
    console.error('❌ Алдаа:', err);
  }
});

console.log('⚙️ CRON scheduler ажиллаж байна...');