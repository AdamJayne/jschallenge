"use strict";
require('dotenv').config();

const fetch = require("node-fetch");

const fastify = require("fastify")({
  logger: {
    prettyPrint: true,
    level: "info"
  }
})

fastify.register(require("fastify-cors"))

fastify.post("/locations", async function (req, res) {
  const { long, lat } = req.body;
  if (!lat || !long ) {
    res.send("Must have lat and long!");
  }
  const api_key = process.env.API_KEY;
  const url = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${long}&radius=5000`;
  const headers = {
    Authorization: `Bearer ${api_key}`
  }
  try {
    await fetch(url, { method: "GET", headers }).then(data => {
      data.json()
        .then(value => {
          res.send(value);
        });
    });
  } catch (e) {
    res.send(fastify.httpErrors(e));
  }
})

fastify.listen(8080);
