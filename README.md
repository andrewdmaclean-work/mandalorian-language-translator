### Mandalorian Language Translator

SMS hotline that translates English to Mandalorian. Runs on Twilio Functions with a local Mando'a dictionary (sourced from [MandoCreator](https://www.mandocreator.com/)).

#### Environment Variables

Set via `.env` for local dev, or in **Twilio Console > Functions & Assets > Services > mandalorian-translation > Settings > Environment Variables** for production.

| Variable | Description |
|---|---|
| `EASTER_EGG_CODEWORD` | Phrase that triggers the easter egg (case-insensitive, exact match) |
| `EASTER_EGG_MESSAGE` | Easter egg response, including any links |

#### Deploy

```bash
npm install
npm run deploy
```

#### Connect to a Twilio Phone Number

1. Go to **Phone Numbers** in the Twilio Console.
2. Select your number.
3. **Messaging** > **A MESSAGE COMES IN** > *Function* > *mandalorian-translation* > *dev-environment* > */sms*
4. **Voice** > **A CALL COMES IN** > *Function* > *mandalorian-translation* > *dev-environment* > */call*

#### A2P 10DLC Compliance

A2P 10DLC registration is required before sending at scale. Without it, carriers will filter or block messages.

1. **Register your Brand** -- Twilio Console > **Messaging > Trust Hub > Brands**
2. **Register a Campaign** -- **Messaging > Trust Hub > Campaigns**
3. **Associate your number** to the campaign

See [Twilio's A2P 10DLC docs](https://www.twilio.com/docs/messaging/guides/10dlc).

Built-in compliance in the function:
- All replies include "Reply STOP to opt out, HELP for info"
- HELP keyword returns service description + opt-out instructions
- Twilio handles STOP/UNSTOP automatically
