const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Remove a user from the server but let them come back with an invite.',
    args: true,
    usage: '<user> [reason]',
    guildOnly: true,
    cooldown: 1,
    aliases: ['boot'],
    execute(message, args) {
        const member = message.mentions.members.first();
        let reason = args.slice(1).join(' ');

        if (!message.member.hasPermission('KICK_MEMBERS')) {
            return message.reply('you don\'t have permission to do that!');
        }

        if (!message.guild.me.hasPermission('KICK_MEMBERS')) {
            return message.reply('I don\'t have permission to do that!');
        }

        if (member.hasPermission('KICK_MEMBERS')) {
            return message.reply('you can\'t kick a moderator.');
        }

        if (!reason) reason = 'Unspecified';

        try {
            member.kick(reason);
        } catch (error) {
            console.error('Could not kick:', error);
            message.reply('I had a problem kicking that user!');
        } finally {
            const embed = new MessageEmbed()
                .setTitle('Member Kicked')
                .setColor('#808080')
                .setDescription('A member was just kicked from the server successfully by a moderator.')
                .setAuthor(message.author)
                .setThumbnail(message.author.displayAvatarURL({ "format": "png", "dynamic": true }))
                .addFields(
                    { name: 'User', value: member.user },
                    { name: 'Moderator', value: message.author },
                    { name: 'Reason', value: reason },
                );
                
            message.channel.send(embed);
        }
    },
};
