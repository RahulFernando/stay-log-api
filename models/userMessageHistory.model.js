import mongoose from 'mongoose';

const userMessageHistorySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sentAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default mongoose.model('UserMessageHistory', userMessageHistorySchema);
