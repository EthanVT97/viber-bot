const fetch = require('node-fetch');

const VIBER_API_URL = "https://chatapi.viber.com/pa/send_message";
const VIBER_BOT_TOKEN = process.env.VIBER_BOT_TOKEN;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body);
    if (body.event === "message") {
      const reply = {
        receiver: body.sender.id,
        min_api_version: 1,
        sender: { name: "555Mix Bot" },
        type: "text",
        text: `You said: ${body.message.text}`,
      };

      await fetch(VIBER_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Viber-Auth-Token": VIBER_BOT_TOKEN,
        },
        body: JSON.stringify(reply),
      });
    }

    return { statusCode: 200, body: JSON.stringify({ message: "OK" }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "Internal Error" }) };
  }
};
