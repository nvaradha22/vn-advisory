// Cloudflare Pages Function — API proxy for Alpha Vantage forex
export async function onRequest(context) {
  const { env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': 'https://vnadvisory.in',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const apiKey = env.ALPHA_VANTAGE_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  try {
    const url = new URL(context.request.url);
    const pairs = (url.searchParams.get('pairs') || 'EUR/USD,GBP/USD,USD/INR,USD/AED,USD/SAR').split(',');

    const results = {};
    for (const pair of pairs.slice(0, 5)) {
      const [from, to] = pair.trim().split('/');
      const apiURL = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${to}&apikey=${apiKey}`;
      const response = await fetch(apiURL);
      const data = await response.json();

      if (data['Realtime Currency Exchange Rate']) {
        const r = data['Realtime Currency Exchange Rate'];
        results[pair.trim()] = {
          rate: parseFloat(r['5. Exchange Rate']).toFixed(4),
          from: r['1. From_Currency Code'],
          to: r['3. To_Currency Code'],
          lastRefreshed: r['6. Last Refreshed'],
        };
      }
    }

    return new Response(
      JSON.stringify({ data: results, timestamp: new Date().toISOString(), source: 'Alpha Vantage' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch forex data' }), { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
}
