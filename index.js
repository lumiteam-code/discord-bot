const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

const app = express();
app.use(express.json());

// TẠO BOT
const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// LOGIN BOT
client.login(process.env.BOT_TOKEN);

// KHI BOT ONLINE
client.on("ready", () => {
  console.log("✅ Bot đã online");
});

// API nhận task từ Google Sheets
app.post("/notify", async (req, res) => {
  try {
    const { userId, task } = req.body;

    console.log("Nhận task:", task);

    const user = await client.users.fetch(userId);

    if (user) {
      await user.send(`🆕 Task mới của bạn:\n👉 ${task}`);
    }

    res.send("OK");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

// CHẠY SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server chạy port ${PORT}`);
});