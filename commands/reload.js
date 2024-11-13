const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reloads a application (/) commands.')
        .addStringOption(option => 
            option.setName('command')
                .setDescription('The command to reload')
                .setRequired(true)),
    async execute(interaction) {
        if (interaction.user.id !== '810409750625386497') {
            return interaction.reply({ content: '你沒權限使用這個指令。', ephemeral: true });
        } else {
            const commandName = interaction.options.getString('command', true).toLowerCase();
            const command = interaction.client.commands.get(commandName);

            if (!command) {
                return interaction.reply({ content: `There is no command with the name \`${commandName}\`.`, ephemeral: true });
            }

            delete require.cache[require.resolve(`./${commandName}.js`)];

            try {
                const newCommand = require(`./${commandName}.js`);
                interaction.client.commands.set(newCommand.data.name, newCommand);
                interaction.reply({ content: `Command \`${commandName}\` was reloaded.`, ephemeral: true });
            } catch (error) {
                console.error(error);
                interaction.reply({ content: `There was an error while reloading a command \`${commandName}\`:\n\`${error.message}\``, ephemeral: true });
            }
        }
    }
};
    