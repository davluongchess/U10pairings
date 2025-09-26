const fetch = require('node-fetch');

exports.handler = async function (event) {
  const player = event.queryStringParameters.player;
  if (!player) {
    return {
      statusCode: 400,
      body: 'Missing player parameter.',
      headers: { 'Access-Control-Allow-Origin': '*' },
    };
  }

  const url = `https://foodweb.kingsleychess.com.au/kingsley?player=${encodeURIComponent(player)}&show_games=1`;

  try {
    console.log('Fetching URL:', url);
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ProxyBot/1.0)' },
    });
    if (!response.ok) throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    const text = await response.text();
    return {
      statusCode: 200,
      body: text,
      headers: { 'Access-Control-Allow-Origin': '*' },
    };
  } catch (error) {
    console.error('Fetch error:', error);
    return {
      statusCode: 500,
      body: `Error fetching results: ${error.message}`,
      headers: { 'Access-Control-Allow-Origin': '*' },
    };
  }
};
