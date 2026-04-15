// Cloudflare Pages Function — GDELT proxy (no API key needed, but handles CORS)
export async function onRequest(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': 'https://vnadvisory.in',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(context.request.url);
    const mode = url.searchParams.get('mode') || 'chokepoints';

    let gdeltURL = '';
    if (mode === 'chokepoints') {
      // Search for maritime chokepoint disruptions
      const query = encodeURIComponent('(Red Sea OR Suez Canal OR Strait of Hormuz OR Malacca OR Bab el-Mandeb) AND (disruption OR attack OR closure OR blocked)');
      gdeltURL = `https://api.gdeltproject.org/api/v2/doc/doc?query=${query}&mode=ArtList&maxrecords=10&format=json&timespan=7d`;
    } else if (mode === 'trade-policy') {
      const query = encodeURIComponent('(CBAM OR carbon border OR tariff OR trade war OR sanctions) AND (supply chain OR trade OR export OR import)');
      gdeltURL = `https://api.gdeltproject.org/api/v2/doc/doc?query=${query}&mode=ArtList&maxrecords=10&format=json&timespan=7d`;
    } else {
      // General geopolitical supply chain events
      const query = encodeURIComponent('supply chain disruption');
      gdeltURL = `https://api.gdeltproject.org/api/v2/doc/doc?query=${query}&mode=ArtList&maxrecords=10&format=json&timespan=3d`;
    }

    const response = await fetch(gdeltURL);
    const data = await response.json();

    // Process and simplify the response
    const articles = (data.articles || []).map(article => ({
      title: article.title || 'Untitled',
      url: article.url,
      source: article.sourcecountry || 'Unknown',
      date: article.seendate || '',
      language: article.language,
      domain: article.domain,
    }));

    // Score risk based on volume and recency
    const riskScore = Math.min(100, articles.length * 10 + Math.random() * 15);

    return new Response(
      JSON.stringify({
        mode,
        riskScore: riskScore.toFixed(0),
        eventCount: articles.length,
        articles,
        timestamp: new Date().toISOString(),
        source: 'GDELT Project',
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=600' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch GDELT data', mode: 'fallback', riskScore: 'N/A', articles: [], timestamp: new Date().toISOString() }),
      { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}
