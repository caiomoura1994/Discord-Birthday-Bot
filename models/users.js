const dynamoose = require("dynamoose");

if (process.env.IS_OFFLINE) dynamoose.aws.ddb.local();

const UsersModel = dynamoose.model(
    process.env.USERS_TABLE,
    { "userId": String, "birthday": String }
);

exports.default = { UsersModel }