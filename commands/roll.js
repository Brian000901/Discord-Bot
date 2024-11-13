const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Roll a random number')
        .addIntegerOption(option =>
            option.setName('max')
                .setDescription('Max number')
                .setRequired(false)),
    async execute(interaction) {
        const max = interaction.options.getInteger('max') || 100;
        const result = Math.floor(Math.random() * max) + 1;
        await interaction.reply(`You rolled a ${result}/${max}`);
    },
};