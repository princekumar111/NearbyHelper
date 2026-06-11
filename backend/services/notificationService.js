// services/notificationService.js
const Notification = require('../models/Notification');

// Function to send booking status notifications
const sendBookingStatusNotification = async (userId, providerId, status) => {
  const message = status === 'confirmed'
    ? `Your booking with the provider has been confirmed.`
    : `Your booking has been rejected.`;

  try {
    // Notify the user
    await Notification.create({
      userId,
      message,
      type: 'status-change'
    });

    // Notify the provider
    await Notification.create({
      userId: providerId,
      message: `You have updated the status of a booking with user ${userId}.`,
      type: 'status-change'
    });
  } catch (error) {
    console.error('Error sending booking status notification:', error);
  }
};

module.exports = { sendBookingStatusNotification };
