import cron from 'node-cron';
import { processSubscriptions } from '../controllers/subscriptionController.js';

// Schedule the subscription processing job to run every 24 hours
cron.schedule('0 0 * * *', () => {
  console.log('Running subscription processing job');
  processSubscriptions();
});
