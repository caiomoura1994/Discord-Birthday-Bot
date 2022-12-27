const { default: { UsersModel } } = require("./models/users");

export default {
    list: () => {
        const findedUsers = await UsersModel.scan().exec()
        return {
            "type": 4,
            "data": {
                "content": findedUsers
                    .map(u => `<@${u.id}> | ${u.birthday}`)
                    .join(', ')
            }
        }
    },
    setBirthday: async (body) => {
        const userId = body.member.user.id
        const findedUser = await UsersModel.get(userId)
        const birthdayDay = body.data.options[0].value.trim()
        const birthdayMonth = body.data.options[1].value.trim()
        const birthday = `${birthdayDay}/${birthdayMonth}`
        if (!findedUser) {
            await UsersModel.create({ userId, birthday })
        } else {
            await UsersModel.update({ userId, birthday })
        }
        return {
            "type": 4,
            "data": { "content": `Aniversário Cadastrado com sucesso - ${birthday}` }
        }
    },
    deleteBirthday: async (body) => {
        let userId
        if (body.data.options) {
            userId = body.data.options[0].value
        } else {
            userId = body.member.user.id
        }
        const findedUser = await UsersModel.get(userId)
        await findedUser.delete()
        return {
            "type": 4,
            "data": { "content": `Aniversário Excluído com sucesso` }
        }
    }
}


