import { sendSMS } from 'textlk-node';
import dotenv from 'dotenv';

dotenv.config();

export const sendMessage = async (to, message) => {
  const apiToken = process.env.TEXTLK_API_TOKEN;
  const senderId = process.env.TEXTLK_SENDER_ID || 'TextLKDemo';

  if (!apiToken) {
    console.error('API token is not defined');
  }

  try {
    const response = await sendSMS({
      apiToken,
      phoneNumber: to,
      message: message,
      senderId,
    });
    console.log('✅ SMS sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
};
