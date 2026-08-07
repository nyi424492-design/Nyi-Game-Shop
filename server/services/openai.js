const fetch = require('node-fetch');

const OPENAI_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_KEY) {
  console.error('Missing OPENAI_API_KEY');
  process.exit(1);
}

async function streamChatCompletion(messages, res, options = {}) {
  const body = {
    model: options.model || 'gpt-4o-mini',
    messages,
    temperature: options.temperature ?? 0.2,
    top_p: options.top_p ?? 1,
    stream: true
  };

  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!r.ok) {
    const text = await r.text();
    res.status(502).json({ error: 'OpenAI error', details: text });
    return;
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.flushHeaders();

  const reader = r.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';

  async function pump() {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const parts = buffer.split(/\n\n/);
      buffer = parts.pop();
      for (const part of parts) {
        const m = part.replace(/^data: /, '').trim();
        if (m === '[DONE]') {
          res.write('event: done\n\n');
          res.end();
          return;
        }
        try {
          const parsed = JSON.parse(m);
          const delta = parsed.choices?.[0]?.delta?.content || '';
          if (delta) {
            res.write(`data: ${JSON.stringify({ type: 'chunk', text: delta })}\n\n`);
          }
        } catch (err) {
          // ignore
        }
      }
    }
    res.write('event: done\n\n');
    res.end();
  }

  pump().catch(err => {
    console.error('streaming pump error', err);
    try { res.end(); } catch {}
  });
}

module.exports = { streamChatCompletion };