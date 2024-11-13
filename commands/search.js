const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('search')
        .setDescription('Google search')
        .addStringOption(option =>
            option.setName('內容')
                .setDescription('要搜尋的東西')
                .setRequired(true)),
    async execute(interaction) {
        const query = interaction.options.getString('內容');
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

        // Fetch search results
        const response = await axios.get(searchUrl);
        const $ = cheerio.load(response.data);
        const results = [];

        $('a').each((_, element) => {
            const title = $(element).find('h3').text();
            let link = $(element).attr('href');
            if (title && link) {
                // Ensure the link is properly formatted
                if (link.startsWith('/url?q=')) {
                    link = link.replace('/url?q=', '').split('&')[0];
                }
                results.push({ title, link });
            }
        });

        if (results.length === 0) {
            return interaction.reply('No results found.');
        }

        const select = new StringSelectMenuBuilder()
            .setCustomId('result')
            .setPlaceholder('Select a result')
            .addOptions(
                results.slice(0, 5).map(result => 
                    new StringSelectMenuOptionBuilder()
                        .setLabel(result.title)
                        .setValue(result.link.substring(0, 100))
                )
            );

        const row = new ActionRowBuilder().addComponents(select);

        await interaction.reply({ content: 'Search results:', components: [row] });

        // Handle select menu interaction
        const filter = i => i.customId === 'result' && i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            if (i.customId === 'result') {
                await i.update({ content: `結果: ${i.values[0]}`, components: [] });
            }
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                interaction.editReply({ content: 'No selection made.', components: [] });
            }
        });
    }
};