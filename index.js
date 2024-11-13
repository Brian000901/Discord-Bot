const { TOKEN, CLIENT_ID } = require("dotenv").config().parsed;
const { Client, Events, Collection, GatewayIntentBits, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.commands = new Collection();
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

// 將每個指令載入到 client.commands 集合中
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

// 將所有指令的 data 屬性轉換為 JSON 格式
const commands = commandFiles.map(file => {
    const command = require(`./commands/${file}`);
    return command.data.toJSON();
});

// 創建 REST 實例並設置 token
const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        const data = await rest.put(
            Routes.applicationCommands(CLIENT_ID),
            { body: commands },
        );
        console.log(`Successfully reloaded ${commands.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();

// 讀取 events 資料夾中的所有 .js 檔案
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

// 將每個事件載入到 client 中
for (const file of eventFiles) {
    const event = require(path.join(eventsPath, file));
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

// 在控制台顯示載入的事件檔案數量
console.log(`Loaded ${eventFiles.length} event files.`);

// 當收到互動事件時執行
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

// 當機器人準備就緒時執行
client.once('ready', () => {
    console.log(`Ready! Logged in as ${client.user.tag}`);
});

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reloads all application (/) commands.'),
    async execute(interaction) {
        if (interaction.user.id !== '810409750625386497') {
            return interaction.reply({ content: '你沒權限使用這個指令。', ephemeral: true });
        } else {
            s
// 登入 Discord
client.login(TOKEN);