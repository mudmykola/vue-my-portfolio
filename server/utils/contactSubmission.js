import { getHeader, readBody, setResponseStatus } from 'h3';

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

export async function handleContactSubmission(event, fetchImpl = fetch) {
  const contentType = getHeader(event, 'content-type') || '';
  if (!contentType.includes('application/json')) {
    setResponseStatus(event, 415);
    return { success: false, error: 'Unsupported content type' };
  }

  let payload;
  try {
    payload = await readBody(event);
  } catch {
    setResponseStatus(event, 400);
    return { success: false, error: 'Invalid JSON body' };
  }

  const invalidReason = validatePayload(payload);
  if (invalidReason) {
    setResponseStatus(event, 400);
    return { success: false, error: invalidReason };
  }

  const config = useRuntimeConfig(event);
  const bindings = event.context.cloudflare?.env || {};
  const botToken = config.telegramBotToken || bindings.TELEGRAM_BOT_TOKEN;
  const chatId = config.telegramChatId || bindings.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) {
    setResponseStatus(event, 500);
    return { success: false, error: 'Server is not configured correctly' };
  }

  const text = [
    '📩 New Contact Form Submission',
    `👤 Name: ${String(payload.fullName).trim()}`,
    `📧 Email: ${String(payload.email).trim()}`,
    `📝 Message: ${String(payload.message).trim()}`,
  ].join('\n');

  try {
    const response = await fetchImpl(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text }),
      }
    );

    if (!response.ok) {
      setResponseStatus(event, 502);
      return {
        success: false,
        error: `Telegram API request failed (status ${response.status})`,
      };
    }

    return { success: true };
  } catch {
    setResponseStatus(event, 500);
    return { success: false, error: 'Unable to process request' };
  }
}
