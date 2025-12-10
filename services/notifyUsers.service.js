import cron from 'node-cron';
import dayjs from 'dayjs';
import { getAllUsers } from './user.service.js';
import {
  getUserMessageHistoryByUserId,
  createUserMessageHistory,
} from './userMessageHistory.service.js';
import { getReminderDate } from '../utils/getReminder.js';
import { sendMessage } from './messaging.service.js';

export const startReminderService = () => {
  cron.schedule('0 0 * * *', async () => {
    console.log('🔔 Running reminder job...');
    const users = await getAllUsers();
    const activeUsers = users.filter(user => user.isActive);
    const today = dayjs().startOf('day');

    for (const user of activeUsers) {
      const messageHistories = await getUserMessageHistoryByUserId(user._id);
      if (messageHistories.length > 0) {
        const lastMessageDate = dayjs(messageHistories[messageHistories.length - 1].sentAt).startOf(
          'day',
        );
        if (today.isSame(lastMessageDate)) {
          return;
        }
      }
      const reminderDate = getReminderDate(user.createdAt).startOf('day');
      if (today.isSame(reminderDate)) {
        await sendMessage(
          user.mobileNumber,
          `Hello! This is a reminder: your payment is due on ${dayjs(user.createdAt).date()} of this month. If you have already made the payment, please ignore this message. Thank you!`,
        );
        await createUserMessageHistory({ userId: user._id }); //log the message history
      }
    }
  });
};
