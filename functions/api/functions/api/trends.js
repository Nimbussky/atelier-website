export async function onRequest(context) {
    var headers = {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600'
    };
    try {
        var ytKey = context.env.YOUTUBE_API_KEY;
        var ytResponse = await fetch(
            'https://www.googleapis.com/youtube/v3/search?part=snippet&q=web+design+trends+2025&type=video&maxResults=3&key=' + ytKey
        );
        var ytData = await ytResponse.json();
        var metaToken = context.env.META_ACCESS_TOKEN;
        var metaResponse = await fetch(
            'https://graph.facebook.com/v18.0/search?q=web+design+trends&type=page&fields=name,about,fan_count&limit=3&access_token=' + metaToken
        );
        var metaData = await metaResponse.json();
        return new Response(JSON.stringify({
            youtube: ytData.items || [],
            meta: metaData.data || [],
            timestamp: new Date().toISOString()
        }), { headers: headers });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'API fetch failed' }), {
            status: 500,
            headers: headers
        });
    }
}
