module.exports = {
    name: 'messageCreate', // 事件名稱應該是 'messageCreate'
    once: false, // 是否只執行一次
    async execute(message, client) { // 當事件觸發時執行的函數
        if (message.content.toLowerCase() === 'hello') { // 如果訊息內容是 'hello'
            message.reply('Hello!'); // 回覆 'Hello!'
        }
    }
}

console.log('Loaded event file: hello.js'); // 在控制台顯示載入的事件檔案名稱