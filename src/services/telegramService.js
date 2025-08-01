import axios from 'axios';

const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

export async function sendTelegramMessage({ fullName, email, message }) {
  try {
    const text = `📩 New Contact Form Submission:\n👤 Name: ${fullName}\n📧 Email: ${email}\n📝 Message: ${message}`;

    const response = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: 'HTML',
      }
    );

    return { success: true, data: response.data };
  } catch (error) {
    console.error('❌ Telegram send error:', error);
    return { success: false, error };
  }
}
