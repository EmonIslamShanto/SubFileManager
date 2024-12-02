import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  planStartDate: Date,
  planEndDate: Date,
  paymentDetails: {
    cardNumber: String,
    cvc: String,
    expiryDate: String,
  },
});

const User = mongoose.model('User', userSchema);
export default User;
