<!--
title: 'Serverless Framework Node Express API service backed by DynamoDB on AWS'
description: 'This template demonstrates how to develop and deploy a simple Node Express API service backed by DynamoDB running on AWS Lambda using the traditional Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# Birthday discord bot with serverless framework lambdas and dynamodb

This is a simple project to pratice serveless, to do this project we need to use dynamodb and lambdas

## Usage

### Deployment

Install dependencies with:

```
yarn install
```

and then deploy with:

```
serverless deploy
```

### Local development

Before all create a `.env` file with your secret keys, we have a `.env.example` to help you

To run it locally can you run `docker-compose up -d` to up the dynamoDb database locally and run `yarn && sls offline` to start locally the project:

Verify your machine versions:
Im using node:`v16.16.0`, serverless:`3.24.0`

Install `Rest Client` extensions in Visual Studio to register all commands in your discord guild read `./commands.http`

Can you follow this tutorial to configure your discord bot. https://betterprogramming.pub/build-a-discord-bot-with-aws-lambda-api-gateway-cc1cff750292
