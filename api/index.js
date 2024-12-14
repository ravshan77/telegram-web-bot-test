const TelegramBot = require('node-telegram-bot-api');

// Bot tokeningizni kiriting
const token = 'YOUR_BOT_TOKEN';
const bot = new TelegramBot(token, { polling: true });

// WebApp tugmasini foydalanuvchiga yuborish
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Bizning WebApp ni ochish uchun tugmani bosing:', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Web Loyihamni Ochish',
            web_app: { url: 'https://telegram-web-bot.netlify.app' }, // WebApp URLingizni kiriting
          },
        ],
      ],
    },
  });
});

console.log('Bot ishga tushdi!');
