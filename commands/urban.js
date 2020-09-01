const fetch = require('node-fetch');
const querystring = require('querystring');
const { MessageEmbed } = require('discord.js');
const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

module.exports = {
    name: 'urban',
    description: 'Get a definition of a word from the Urban Dictionary using a REST API.',
    guildOnly: true,
    cooldown: 10,
    args: true,
    usage: '<term>',
    aliases: ['urb', 'ur', 'dic', 'dictionary', 'urban-dic', 'ur-dic', 'urb-dic', 'urban-dictionary', 'ur-dictionary', 'urb-dictionary'],
    async execute(message, args) {
        const query = querystring.stringify({ term: args.join(' ') });
        
        const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());
        
        const [ answer ] = list;
        
        const embed = new MessageEmbed()
            .setColor('#EFFF00')
            .setTitle(answer.word)
            .setURL(answer.permalink)
            .addFields(
                { name: 'Definition', value: trim(answer.definition, 1024) },
                { name: 'Example', value: trim(answer.example, 1024) },
                { name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` },
            );
        
        message.channel.send(embed);
    },
};
