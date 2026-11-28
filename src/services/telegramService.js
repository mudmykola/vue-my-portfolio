import axios from 'axios';

const CONTACT_API_URL = '/api/contact';

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
    // otherwise, a fallback HTML response with status 200 would mean
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
