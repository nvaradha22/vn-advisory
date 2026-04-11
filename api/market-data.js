export default async function handler(req, res) {
  const API_KEY = process.env.ALPHA_API_KEY;
  
  // Basic security: only allow your domain (if applicable)
  res.setHeader('Access-Control-Allow-Origin', '*'); 

  try {
    const goldUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=GLD&apikey=${API_KEY}`;
    const forexUrl = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=INR&apikey=${API_KEY}`;

    const [goldRes, forexRes] = await Promise.all([fetch(goldUrl), fetch(forexUrl)]);
    const goldData = await goldRes.json();
    const forexData = await forexRes.json();

    const output = {
      gold: goldData["Global Quote"]?.["05. price"] || "N/A",
      forex: forexData["Realtime Currency Exchange Rate"]?.["5. Exchange Rate"] || "N/A",
      updated: new Date().toLocaleTimeString()
    };

    // CDN Caching for 6 Hours (21600 seconds)
    res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate=3600');
    return res.status(200).json(output);
  } catch (error) {
    return res.status(500).json({ error: "Market update paused" });
  }
}