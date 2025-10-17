//index.js
import express from 'express';
import mongoose from 'mongoose';
import redis from 'redis';
import { Client } from "pg";
import 'dotenv/config';
import os from 'os';

const app = express();

//connect to postgres
const client = new Client({ connectionString: "postgresql://root:example@postgres:5432" });
client
  .connect()
  .then(() => console.log("connected to postgres"))
  .catch((err) => console.log("failed to connect with postgres"));

//connect to redis
const redisClient = redis.createClient({ url: "redis://redis:6379" });
redisClient.on("connect", () => console.log("connected to redis"));
redisClient.on("error", () => console.log("failed to connect to redis"));
redisClient.connect();

//Connect to DB
// mongoose
//   .connect("mongodb://root:example@mongo:27017")
//   .then((conn) => console.log(`Connected to Database`))
//   .catch((err) => console.log("failed to connect to db"));

app.get("/", async (req, res) => {
  await redisClient.set("value", "mohamed");
  console.log(`From container ${os.hostname}`);
  
  res.send("<h1>Hello Tresmerg... samy antar nouh sharaf</h1>");
});

app.get("/data", async (req, res) => {
  const value = await redisClient.get("value");
  res.send(`<h1> Hello TresMerge...</h1 <h2>${value}</h2`);
});

app.listen(process.env.PORT, () =>
  console.log(`app running on port ${process.env.PORT}`)
);
