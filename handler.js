const nacl = require('tweetnacl');
const express = require("express");
const serverless = require("serverless-http");
const { default: commandsHandler } = require("./commandsHandler");

const app = express();

app.use(express.json());

app.get("/", async function (req, res) {
  res.json({ ok: true })
});

app.all("/discordInteractions", async function (req, res) {
  const PUBLIC_KEY = process.env.PUBLIC_KEY;
  const signature = req.headers['x-signature-ed25519']
  const timestamp = req.headers['x-signature-timestamp'];
  const strBody = JSON.stringify(req.body); // should be string, for successful sign

  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + strBody),
    Buffer.from(signature, 'hex'),
    Buffer.from(PUBLIC_KEY, 'hex')
  );
  if (!isVerified) {
    return res
      .status(401)
      .json({ error: 'invalid request signature' });
  }
  // Replying to ping (requirement 2.)
  const body = req.body
  if (body.type == 1) {
    return res.json({ type: 1 });
  }
  if (body.data.name) return await commandsHandler[body.data.name](body)
  res.status(404)
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


module.exports.handler = serverless(app);
