const json = (data, status = 200, origin = '*') =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });

const getOrigin = (request, env) => {
  const configured = env.ALLOWED_ORIGIN;
  const reqOrigin = request.headers.get('Origin') || '';

  if (!configured || configured === '*') return '*';
  if (reqOrigin === configured) return configured;
  return configured;
};

const validatePayload = (payload) => {
  const fullName = String(payload?.fullName || '').trim();
  const email = String(payload?.email || '').trim();
  const message = String(payload?.message || '').trim();

  if (!fullName || fullName.length > 120) return 'Invalid fullName';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 160)
    return 'Invalid email';
  if (!message || message.length > 2500) return 'Invalid message';

  return null;
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { method } = request;
    const origin = getOrigin(request, env);
    const isContactRoute = url.pathname === '/contact';
    const isHealthRoute = url.pathname === '/health';

    if (request.method === 'GET' && isHealthRoute) {
      return json(
        {
          success: true,
          service: 'vue-my-portfolio-contact',
          status: 'ok',
          usage: {
            method: 'POST',
            endpoint: '/contact',
            contentType: 'application/json',
          },
        },
        200,
        origin
      );
    }

    if (isContactRoute && method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (method === 'GET' || method === 'HEAD') {
      if (!env.ASSETS) {
        return json(
          { success: false, error: 'Static assets binding is not configured' },
          500,
          origin
        );
      }

      return env.ASSETS.fetch(request);
    }

    if (!isContactRoute || method !== 'POST') {
      return json({ success: false, error: 'Method not allowed' }, 405, origin);
    }

    const contentType = request.headers.get('Content-Type') || '';
    if (!contentType.includes('application/json')) {
      return json({ success: false, error: 'Unsupported content type' }, 415, origin);
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return json({ success: false, error: 'Invalid JSON body' }, 400, origin);
    }

    const invalidReason = validatePayload(payload);
    if (invalidReason) {
      return json({ success: false, error: invalidReason }, 400, origin);
    }

    if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
      return json(
        { success: false, error: 'Server is not configured correctly' },
        500,
        origin
      );
    }

    const text = [
      '📩 New Contact Form Submission',
      `👤 Name: ${payload.fullName}`,
      `📧 Email: ${payload.email}`,
      `📝 Message: ${payload.message}`,
    ].join('\n');

    try {
      const tgRes = await fetch(
        `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: env.TELEGRAM_CHAT_ID,
            text,
          }),
        }
      );

      if (!tgRes.ok) {
        return json(
          {
            success: false,
            error: `Telegram API request failed (status ${tgRes.status})`,
          },
          502,
          origin
        );
      }

      return json({ success: true }, 200, origin);
    } catch {
      return json({ success: false, error: 'Unable to process request' }, 500, origin);
    }
  },
};
