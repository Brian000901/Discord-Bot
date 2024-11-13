const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gay')
        .setDescription('檢測甲')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('要檢測的人')
                .setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        let random;
        if (user.id === '810409750625386497') {
            random = 0
        } else if (user.id === '940831027922874399') {
            random = 100
        } else {
        random = Math.floor(Math.random() * 101);
        }
        await interaction.reply(`${user.username} 的gay指數是 ${random}% `);
    }
};