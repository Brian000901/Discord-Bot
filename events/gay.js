module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(message, client) {
        if (message.author.id === '940831027922874399' && message.content.toLowerCase().includes('gay') || message.content.includes('甲'))
            await message.reply('是你')
    }
}

console.log("Loaded gay.js event file");