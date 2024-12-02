import User from '../models/User.js';
import { chargeCard } from '../Utils/payment.js';
import logger from '../Utils/logger.js';

export const processSubscriptions = async (req, res, next) => {
  try {
    // Find users whose plan has expired and are still active
    const users = await User.find({
      status: 'active',
      planEndDate: { $lt: new Date() },
    });

    // Process each user
    for (const user of users) {
      // Charge the user's card
      const paymentSuccess = await chargeCard(user.paymentDetails);

      if (paymentSuccess) {
        // If payment is successful, extend the plan by one month
        user.planEndDate = new Date(new Date().setMonth(new Date().getMonth() + 1));
        logger.info(`Payment for user ${user.email} was successful. Plan extended.`);
      } else {
        // If payment failed, deactivate the user's account
        user.status = 'inactive';
        logger.warn(`Payment failed for user ${user.email}. Account deactivated.`);
      }

      // Save the updated user record
      await user.save();
    }

    return res.json({ message: 'Subscriptions processed successfully' });
  } catch (err) {
    logger.error('Error processing subscriptions:', err);
    next(err);
  }
};
