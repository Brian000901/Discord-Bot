const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data:new SlashCommandBuilder()
        .setName('ping')
        .setDescription('獲取延遲'),
    async execute(interaction) {
        await interaction.reply(`延遲: ${Date.now() - interaction.createdTimestamp}ms`);
    },
};
