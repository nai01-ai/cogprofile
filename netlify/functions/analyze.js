javascriptexports.handler = async function(event) {
  if(event.httpMethod !== 'POST') return {statusCode:405, body:'Method Not Allowed'};
  const { prompt } = JSON.parse(event.body);
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }]
    })
  });
  const d = await r.json();
  const text = d.content?.[0]?.text || '';
  return {
    statusCode: 200,
    headers: {'Access-Control-Allow-Origin': '*'},
    body: JSON.stringify({ text })
  };
};
