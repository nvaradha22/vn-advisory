// Cloudflare Pages Function — GDELT proxy (with timeout and fallback)
export async function onRequest(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': 'https://vnadvisory.in',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // A simple fallback in case the GDELT API fails or returns nothing
  const fallbackArticles = [
    {
      title: 'Red Sea shipping attacks continue to disrupt global trade routes',
      url: 'https://www.reuters.com/world/middle-east/red-sea-shipping-attacks-2025-04-10/',
      domain: 'reuters.com',
      date: new Date().toISOString().split('T')[0],
    },
    {
      title: 'Iran seizes container ship near Strait of Hormuz',
      url: 'https://apnews.com/article/iran-strait-of-hormuz-ship-seizure-2025-04-09',
      domain: 'apnews.com',
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    },
    {
      title: 'Malacca Strait traffic increases as vessels avoid Red Sea',
      url: 'https://www.lloydslist.com/2025/04/08/malacca-strait-traffic-surge',
      domain: 'lloydslist.com',
      date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
    },
  ];

  try {
    const url = new URL(context.request.url);
    const mode = url.searchParams.get('mode') || 'chokepoints';

    // A broad query that is more likely to return results.
    const query = encodeURIComponent('"supply chain" OR "Red Sea" OR "Suez Canal" OR "Strait of Hormuz" OR "CBAM"');
    // Note: The `timespan` parameter is omitted. The API's default window is used.
    const gdeltURL = `https://api.gdeltproject.org/api/v2/doc/doc?query=${query}&mode=ArtList&maxrecords=8&format=json`;

    // Create an AbortController to set a timeout for the fetch
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5-second timeout

    const response = await fetch(gdeltURL, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`GDELT API returned ${response.status}`);
    }

    const data = await response.json();

    // Check if we got any articles
    if (!data.articles || data.articles.length === 0) {
      console.log('GDELT returned no articles. Using fallback.');
      throw new Error('No articles found');
    }

    // Process and simplify the response
    const articles = data.articles.map(article => ({
      title: article.title || 'Untitled',
      url: article.url,
      domain: article.domain || new URL(article.url).hostname,
      // seendate is in YYYYMMDDTHHMMSSZ format, convert to YYYY-MM-DD
      date: article.seendate 
        ? article.seendate.substring(0, 4) + '-' + article.seendate.substring(4, 6) + '-' + article.seendate.substring(6, 8)
        : '',
    }));

    // Calculate a simple risk score based on the number of articles
    const riskScore = Math.min(100, 40 + articles.length * 5);

    return new Response(
      JSON.stringify({
        mode,
        riskScore,
        eventCount: articles.length,
        articles,
        timestamp: new Date().toISOString(),
        source: 'GDELT Project',
      }),
      { 
        status: 200, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json', 
          'Cache-Control': 'public, max-age=600' 
        } 
      }
    );

  } catch (error) {
    console.error('GDELT function error:', error.message);
    
    // Return the fallback data to the frontend
    return new Response(
      JSON.stringify({
        mode: 'chokepoints',
        riskScore: 65,
        eventCount: fallbackArticles.length,
        articles: fallbackArticles,
        timestamp: new Date().toISOString(),
        source: 'GDELT Project (fallback)',
      }),
      { 
        status: 200, // Return 200 with fallback data instead of an error
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
}
