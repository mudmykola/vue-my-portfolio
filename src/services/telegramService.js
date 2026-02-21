import axios from 'axios';

const CONTACT_API_URL = (import.meta.env.VITE_CONTACT_API_URL || '/contact').trim();

export async function sendTelegramMessage({ fullName, email, message }) {
  try {
    const response = await axios.post(CONTACT_API_URL, {
      fullName,
      email,
      message,
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error('❌ Telegram send error:', error);
    return {
      success: false,
      error: error?.response?.data?.error || 'Failed to send message',
    };
  }
}
