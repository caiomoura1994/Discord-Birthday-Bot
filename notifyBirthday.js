const { default: { UsersModel } } = require("./models/users");

module.exports.run = async (_event, _context) => {
  const findedUser = await UsersModel.scan().exec()
  const time = new Date();
  const month = time.getMonth() + 1
  const day = time.getDate()
  const toSendBirthayCongradulations = findedUser.filter(user => {
    const [savedDay, savedmonth] = user.birthday.split('/')
    const isSameDay = day === Number(savedDay);
    const isSameMonth = month === Number(savedmonth);
    return isSameDay && isSameMonth
  }).map(congradulation => {
    return `Parabéns <@${congradulation.id}>\n`
  })
  const messagePayload = {
    "content": "@everyone",
    "embeds": [
      {
        "type": "rich",
        "title": `Hoje é aniversário de uma pessoa muito especial para nós.`,
        "description": toSendBirthayCongradulations,
        "color": 1752220,
      }
    ]
  }
  try {
    await fetch(
      `https://discord.com/api/v10/webhooks/${process.env.WEBHOOK_ID}/${process.env.WEBHOOK_TOKEN}`,
      {
        body: messagePayload,
        method: "post"
      }
    )
  } catch (err) {
    console.log('not sendded')
  }
};
