module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(message, client) {
        if (message.content.startsWith('!!run')) {
            const code = message.content.slice('!!run'.length).trim();
            try {
                eval(code);
            } catch (error) {
                message.reply(`There was an error while executing this command!\n\`\`\`${error}\`\`\``);
            }
        }
    }
};

console.log('Loaded run.js event file.');