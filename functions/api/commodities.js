// Cloudflare Pages Function — API proxy for Alpha Vantage commodities
// API key stored as environment variable in Cloudflare dashboard
// Settings → Pages → your-project → Environment variables → ALPHA_VANTAGE_KEY

export async function onRequest(context) {
  const { request, env } = context;

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': 'https://vnadvisory.in',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting: simple check via Cloudflare
  const clientIP = request.headers.get('CF-Connecting-IP');
  // (Advanced: use Cloudflare Rate Limiting rules instead)

  const apiKey = env.ALPHA_VANTAGE_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'API key not configured' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const url = new URL(request.url);
    const symbols = url.searchParams.get('symbols') || 'STEEL,ALUMINUM,COPPER,CRUDE_OIL,IRON_ORE';

    // Build Alpha Vantage requests
    const symbolList = symbols.split(',').map(s => s.trim());
    const results = {};

    // Use GLOBAL_QUOTE endpoint (5 calls per minute free tier)
    // For production, use the bulk TIME_SERIES_DAILY or consider upgrading
    for (const symbol of symbolList.slice(0, 5)) {
      const apiURL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
      const response = await fetch(apiURL);
      const data = await response.json();

      if (data['Global Quote']) {
        const q = data['Global Quote'];
        results[symbol] = {
          price: parseFloat(q['05. price']).toFixed(2),
          change: parseFloat(q['09. change']).toFixed(2),
          changePercent: q['10. change percent'],
          volume: q['06. volume'],
          latestTradingDay: q['07. latest trading day'],
        };
      }
    }

    return new Response(
      JSON.stringify({ data: results, timestamp: new Date().toISOString(), source: 'Alpha Vantage' }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch commodity data' }),
      { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}
