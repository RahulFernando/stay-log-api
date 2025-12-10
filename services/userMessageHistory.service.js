import UserMessageHistoryModel from '../models/userMessageHistory.model.js';

export const getUserMessageHistoryByUserId = async userId => {
  return await UserMessageHistoryModel.find({ userId });
};

export const createUserMessageHistory = async data => {
  return await UserMessageHistoryModel.create(data);
};

export const deleteUserMessageHistoryByUserId = async userId => {
  return await UserMessageHistoryModel.deleteMany({ userId });
};
