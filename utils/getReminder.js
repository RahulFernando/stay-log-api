import dayjs from 'dayjs';

export const getReminderDate = createdAt => {
  const created = dayjs(createdAt);

  const anniversary = created.date();
  const reminderDate = dayjs().date(anniversary).subtract(3, 'day');

  return reminderDate;
};
