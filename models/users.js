const dynamoose = require("dynamoose");

if (process.env.IS_OFFLINE) dynamoose.aws.ddb.local();

const UsersModel = dynamoose.model(
    "UsersTable",
    { "userId": String, "name": String }
);

exports.default = { UsersModel }