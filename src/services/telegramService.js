import axios from 'axios';

const RAW_CONTACT_API_URL = (
  import.meta.env.VITE_CONTACT_API_URL || '/api/contact'
).trim();

// Always target the Worker's `/api/contact` endpoint, whatever shape the env
// value takes (base URL, trailing slash, legacy `/contact`, or the full path).
// A plain `/contact` collides with the prerendered SPA route and is 405'd by
// the static-asset layer before reaching the Worker, so we normalise here.
const CONTACT_API_BASE = RAW_CONTACT_API_URL.replace(/\/+$/, '').replace(
  /\/(api\/)?contact$/,
  ''
);
const CONTACT_API_URL = CONTACT_API_BASE
  ? `${CONTACT_API_BASE}/api/contact`
  : '/api/contact';

export async function sendTelegramMessage({ fullName, email, message }) {
  try {
    const { data } = await axios.post(
      CONTACT_API_URL,
      { fullName, email, message },
      {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'json',
      }
    );

    // The contact Worker always confirms with { success: true }. Anything
    // else (e.g. an SPA-rewrite returning index.html with status 200) means
    // the request never reached the Worker — treat it as a failure instead
    // of reporting a false success.
    if (data && data.success === true) {
      return { success: true, data };
    }

    return {
      success: false,
      error:
        (data && data.error) ||
        'Message service is not reachable. Please try again later.',
    };
  } catch (error) {
    console.error('❌ Telegram send error:', error);
    return {
      success: false,
      error:
        error?.response?.data?.error ||
        error?.message ||
        'Failed to send message',
    };
  }
}
