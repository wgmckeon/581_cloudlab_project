const express = require("express");
const redis = require("redis");
const app = express();
const PORT = process.env.PORT || 8080;
const REDIS_HOST = process.env.REDIS_HOST || "redis";
const REDIS_PORT = process.env.REDIS_PORT || 6379;

//redis client setup
const client = redis.createClient({
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
    reconnectStrategy: (retries) => {
      //error stops retry and crashes after 5 tries
      if (retries >= 5) {
        console.error("5 failed connection attempts. Exiting.");
        process.exit(1); 
      }
      const delay = retries * 2000; 
      console.warn(`Retrying in ${delay / 1000}s... (attempt ${retries + 1}/5)`);
      return delay;
    },
  },
});
client.on("error", (err) => console.error("[Redis Error]", err.message));

//view count starts at 0, ensures first visit is always '1'
app.get("/", async (req, res) => {
  const count = await client.incr("visitors");
  res.send(`
    <html>
      <head><title>Visitor Counter</title></head>
      <body style="font-family: sans-serif; text-align: center; margin-top: 100px;">
        <h1>Welcome to the visitor counter!</h1>
        <h2>Visitors: ${count}</h2>
      </body>
    </html>
  `);
});

app.get("/health", async (req, res) => {
  //health check. returns 200 if functioning, 503 if app cannot reach redis
  try {
    await client.ping();
    res.status(200).json({ status: "ok", redis: "connected" });
  } catch (err) {
    res.status(503).json({ status: "error", redis: "unreachable" });
  }
});

//wait for redis to connect, listen for HTTP requests, print port info to console when ready
async function start() {
  await client.connect();
  app.listen(PORT, () => {
    console.log(`Server running on http://<cloudlab-node-address>:${PORT}`);
  });
}
start();
