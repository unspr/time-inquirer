const notifier = require('node-notifier');
const nc = new notifier.NotificationCenter();

function notify(message) {
  nc.notify({
    title: message.title,
    message: message.message,
    sound: 'Funk',
    // reply: true,
  });
}

module.exports = notify;
