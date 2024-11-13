module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(message, client) {
        if (message.content.includes('<@940831027922874399>')) {
            const reply = await message.reply('應該女裝');
            setTimeout(() => {
                reply.delete();
            }, 10000); // 10000 milliseconds = 10 seconds
        }
    }
};

console.log('Loaded chi.js event file.');