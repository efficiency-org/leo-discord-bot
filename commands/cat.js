const fetch = require('node-fetch');

module.exports = {
    name: 'cat',
    description: 'Displays an image of a random cat using a REST API.',
    guildOnly: true,
    cooldown: 10,
    aliases: ['kitten', 'kitty', 'kitty-kitty-kitty', 'meow', 'purr', 'hiss'],
    async execute(message, args) {
        const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
        
        if (!file) {
            return message.channel.send('I couldn\'t fetch the cat you requested! :(');
        }
        
        message.channel.send(file);
    },
};
