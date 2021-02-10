const Discord = require("discord.js");
const client = new Discord.Client();
const canvacord = require("canvacord");

const config = {
  prefix: "bot prefix",
  owner: "discord bot owner id",
  token: "discord bot token",
  join: "join channel id",
  leave: "leave channel id",
};

client.on("message", async (message) => {
  if (
    message.content === `${config.prefix}add` &&
    message.author.id === `${config.owner}`
  )
    client.emit("guildMemberAdd", message.member);
  if (
    message.content === `${config.prefix}remove` &&
    message.author.id === `${config.owner}`
  )
    client.emit("guildMemberRemove", message.member);
});


client.on("guildMemberAdd", async (member) => {
  const channel = member.guild.channels.cache.find(
    (channel) => channel.id === `${config.join}`
  );
  const card = new canvacord.Welcomer()
    .setUsername(`${member.user.username}`)
    .setDiscriminator(`${member.user.discriminator}`)
    .setMemberCount(`${member.guild.memberCount}`)
    .setGuildName(`${member.guild.name}`)
    .setAvatar(
      `${member.user.displayAvatarURL({
        format: "png",
        dynamic: false,
        size: 4096,
      })}`
    );

  card.build().then((buffer) => {
    const attachment = new Discord.MessageAttachment(buffer, "welcomer.png");

    channel.send(
      `<:welcomer:798655033297207337> | Joined: ${member.user.username} | ➤ Guild: ${member.guild.name}`,
      {
        embed: {
          color: `43B581`,
          files: [attachment],
          image: {
            url: "attachment://welcomer.png",
          },
          timestamp: new Date(),
        },
      }
    );
  });
});

client.on("guildMemberRemove", async (member) => {
  const channel = member.guild.channels.cache.find(
    (channel) => channel.id === `${config.leave}`
  );

  const card = new canvacord.Leaver()
    .setUsername(`${member.user.username}`)
    .setDiscriminator(`${member.user.discriminator}`)
    .setMemberCount(`${member.guild.memberCount}`)
    .setGuildName(`${member.guild.name}`)
    .setAvatar(
      `${member.user.displayAvatarURL({
        format: "png",
        dynamic: false,
        size: 4096,
      })}`
    );

  card.build().then((buffer) => {
    const attachment = new Discord.MessageAttachment(buffer, "leaver.png");
    channel.send(
      `<:leaver:798655022573289482> Left: ${member.user.username} | ➤ Guild: ${member.guild.name}`,
      {
        embed: {
          color: `F04747`,
          files: [attachment],
          image: {
            url: "attachment://leaver.png",
          },
          timestamp: new Date(),
        },
      }
    );
  });
});

client.login(config.token);
