const { default: { UsersModel } } = require("./models/users");
const express = require("express");
const serverless = require("serverless-http");

const app = express();

app.use(express.json());

app.get("/users/:userId", async function (req, res) {
  try {
    const findedUser = await UsersModel.get(Number(req.params.userId))
    if (findedUser) {
      res.json(findedUser);
    } else {
      res
        .status(404)
        .json({ error: 'Could not find user with provided "userId"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive user" });
  }
});

app.post("/users", async function (req, res) {
  const { userId, name } = req.body;
  if (typeof userId !== "string") {
    res.status(400).json({ error: '"userId" must be a string' });
  } else if (typeof name !== "string") {
    res.status(400).json({ error: '"name" must be a string' });
  }

  try {
    const createdUser = await UsersModel.create(req.body)
    const findedUser = await UsersModel.get(createdUser.id)
    res.json(findedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create user" });
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


module.exports.handler = serverless(app);
