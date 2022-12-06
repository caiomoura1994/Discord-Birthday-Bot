const dynamoose = require("dynamoose");

dynamoose.aws.ddb.local();

const UsersModel = dynamoose.model(
    "UsersTable",
    { "id": Number, "userId": String, "name": String }
);

exports.default = { UsersModel }