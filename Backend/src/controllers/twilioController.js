import twilio from "twilio";

const accountSid = "AC90e77ad1a56d24b291b61cff707a0c09";
const authToken = "cffe29a4a352bffb60bc16522e6fee2d";
const messagingServiceSid = "MG88d92efcb8be3f4ae9c3c34539b06780";
const verifySid = "VA7f30cb9ab43363528c6e22303eb3937d";
const twilioClient = twilio(accountSid, authToken);

const cadastrarNumero = async (req, res) => {
  const { numero, nomeBot } = req.body;

  if (!numero) {
    return res.status(400).json({ error: "Número é obrigatório" });
  }

  try {
    const verification = await twilioClient.verify.v2
      .services(verifySid)
      .verifications.create({
        to: `+${numero}`,
        channel: "sms",
        messagingServiceSid: messagingServiceSid,
      });

    let flow;
    try {
      flow = await twilioClient.studio.v2.flows.create({
        friendlyName: nomeBot || `Bot-${numero}`,
        status: "published",
        definition: {
          initial_state: "Trigger",
          states: [
            {
              name: "Trigger",
              type: "trigger",
              transitions: [{ next: "BoasVindas", event: "incomingMessage" }],
            },
            {
              name: "BoasVindas",
              type: "send-message",
              content: "Olá! Como posso ajudar?",
              transitions: [],
            },
          ],
        },
      });
    } catch (studioError) {
      console.error("Erro no Studio:", studioError);
    }

    return res.json({
      success: true,
      message: "SMS enviado com sucesso!",
      verificationSid: verification.sid,
      flowSid: flow?.sid || "Não criado",
      channel: "sms",
    });
  } catch (error) {
    console.error("Erro no Twilio:", {
      message: error.message,
      code: error.code,
      moreInfo: error.moreInfo,
    });

    return res.status(500).json({
      error: "Falha no envio do SMS",
      details: error.message,
      twilioErrorCode: error.code,
      solution: "Verifique o saldo e configurações no console Twilio",
    });
  }
};

export default cadastrarNumero;
