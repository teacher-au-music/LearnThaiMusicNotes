// หน้าที่: รับรหัสกุญแจสั้นๆ ไปค้นหาใน Cloudflare KV แล้วส่งเพลงกลับมา
export async function onRequestGet(context) {
    try {
        const url = new URL(context.request.url);
        const shortId = url.searchParams.get('id');
        
        if (!shortId) return new Response("Missing ID", { status: 400 });

        // 1. ไปค้นหาข้อมูลในฐานข้อมูล KV ด้วยกุญแจ
        const songData = await context.env.THAI_MUSIC_DB.get(shortId);
        
        if (!songData) {
            return new Response("Song not found", { status: 404 });
        }

        // 2. ส่งข้อมูลโน้ตเพลงกลับไปแสดงผล
        return new Response(songData, {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response("Error loading data", { status: 500 });
    }
}