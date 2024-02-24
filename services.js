const getWhatsappMsg = (message) => {
  try {
    const { type } = message;
    if (!type) return "Unrecognized Msg";

    let msg = "";
    if (type === "text") msg = message["text"]["body"];
    else if (type === "button") msg = message["button"]["text"];
    else if (
      type === "interactive" &&
      message["interactive"]["type"] === "list_reply"
    )
      msg = message["interactive"]["list_reply"]["title"];
    else if (
      type === "interactive" &&
      message["interactive"]["type"] === "button_reply"
    )
      msg = message["interactive"]["button_reply"]["title"];
    else msg = "Unrevognised";

    return msg;
  } catch (error) {
    console.log("Error in  getWhatsappMsg", error);
  }
};

const sendWhatsappMessage = async (body) => {
  try {
    const whatsappToken = process.env.WHATSAPP_ACCESS_TOKEN;
    const response = await fetch(process.env.WHATSAPP_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${whatsappToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else return "Request not Success";
  } catch (error) {
    console.log("Error in sendWhatsappMessage", error);
  }
};

const text_message = (number, text) => {
  try {
    const data = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: number,
      type: "text",
      text: {
        preview_url: false,
        body: text,
      },
    };
    return data;
  } catch (error) {
    console.log("Error in text_message", error);
  }
};

const administrator_chatbot = async (text, number, messageId, name) => {
  try {
    const lowercase_text = text.toLowerCase();
    const data = text_message(
      number,
      `Hello from WhishHub's Bot ->${lowercase_text} `
    );
    await sendWhatsappMessage(data);
  } catch (error) {
    console.log("Error in administrator_chatbot", error);
  }
};

module.exports = {
  getWhatsappMsg,
  sendWhatsappMessage,
  text_message,
  administrator_chatbot,
};
