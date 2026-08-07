# NYI A

ဒီ repo က NYI AI (မြန်မာဘာသာ အထောက်အပံ့ရှိတဲ့ AI assistant) ရဲ့ starter project ဖြစ်ပါတယ်။  
Frontend: React + TailwindCSS  
Backend: Node.js + Express  
Database: Supabase (Postgres)  
AI: OpenAI API  
Deploy: Vercel (frontend) + Render (backend)

အရေးကြီး — secrets များ (OpenAI key, SUPABASE_SERVICE_ROLE_KEY, TELEGRAM_BOT_TOKEN) ကို frontend သို့ မထည့်ပါနှင့်။ Render/Vercel/Supabase console မှာသာ သတ်မှတ်ပါ။

အကြောင်းအရာ
- db/schema.sql — Supabase အတွက် schema
- server/* — Backend starter
- frontend/* — Frontend starter (Vite + React ကို သုံးထားနိုင်တယ်)
- .env.example — စမ်းသပ်ရန် env template

ထုတ်လွှင့် နည်းလမ်း (တို)
1. Supabase project ဖန်တီးပြီး db/schema.sql ကို run လိုက်ပါ။
2. Supabase storage မှာ `payment-screenshots` bucket ဖန်တီးပါ။
3. Backend ကို Render (private service) ပေါ် deploy — env တွေထည့်ပါ။
4. Frontend ကို Vercel ပေါ် deploy — Vite env တွေထည့်ပါ။

ပို၍ အသေးစိတ် လမ်းညွှန်ချက်များနဲ့ setup ကို repo ထဲ commit ပြီးနောက် README ထပ်ထည့်သွားပါမယ်။