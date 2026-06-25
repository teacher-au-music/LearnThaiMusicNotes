// หน้าที่: รับข้อมูลโน้ตเพลงยาวๆ สร้างรหัสสั้นๆ และเก็บลง Cloudflare KV
export async function onRequestPost(context) {
    try {
        const songData = await context.request.json();
        
        // 1. สร้างรหัสสุ่ม 6 ตัวอักษร (เช่น a1b2c3)
        const shortId = Math.random().toString(36).substring(2, 8);
        
        // 2. เอาข้อมูลเพลงเก็บลงฐานข้อมูล KV โดยใช้รหัสนี้เป็นกุญแจ
        await context.env.THAI_MUSIC_DB.put(shortId, JSON.stringify(songData));
        
        // 3. ส่งรหัสกุญแจกลับไปให้หน้าเว็บ
        return new Response(JSON.stringify({ id: shortId }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response("Error saving data", { status: 500 });
    }
}