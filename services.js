const requests = require("requests");
const sett = require("./sett");

function get_whatsapp_message(message) {
  if (!("type" in message)) {
    return "unrecognized message";
  }

  const typeMessage = message["type"];
  let text = "";
  switch (typeMessage) {
    case "text":
      text = message["text"]["body"];
      break;
    case "button":
      text = message["button"]["text"];
      break;
    case "interactive":
      if (message["interactive"]["type"] === "list_reply") {
        text = message["interactive"]["list_reply"]["title"];
      } else if (message["interactive"]["type"] === "button_reply") {
        text = message["interactive"]["button_reply"]["title"];
      }
      break;
    default:
      text = "unprocessed message";
  }

  return text;
}

async function send_whatsapp_message(data) {
  try {
    const whatsapp_token = sett.whatsapp_token;
    const whatsapp_url = sett.whatsapp_url;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${whatsapp_token}`,
    };
    console.log("sending ", data);
    const response = await requests.post(whatsapp_url, {
      headers: headers,
      body: data,
    });

    if (response.statusCode === 200) {
      return "message sent";
    } else {
      return `error sending message: ${response.statusCode}`;
    }
  } catch (error) {
    return `error: ${error}`;
  }
}

// Define other functions here...

module.exports = {
  get_whatsapp_message,
  send_whatsapp_message,
  // Add other functions here...
};
