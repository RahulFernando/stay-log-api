import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    nationalIdentityCardNumber: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    guardianName: { type: String, required: true },
    guardianMobileNumber: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model('User', userSchema);
