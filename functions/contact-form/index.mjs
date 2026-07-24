// AWS Lambda handler for the contact form, invoked via API Gateway HTTP API
// (Lambda proxy integration, payload format 2.0). CORS is handled entirely
// by API Gateway's cors_configuration (infra/modules/contact-form) -- this
// handler does not set any Access-Control-* response headers.
//
// Handler shape: docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html
// Proxy integration request/response shape:
// docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
//
// SESv2 SendEmailCommand parameter shape below is the well-established v3
// SDK convention but was not confirmed against a live-fetched parameter
// reference this session -- verify against
// docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/sesv2/ before the
// first real send.
import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';

const ses = new SESv2Client({});

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

export const handler = async (event) => {
  let payload;
  try {
    payload = JSON.parse(event.body ?? '{}');
  } catch {
    return jsonResponse(400, { error: 'Invalid JSON body' });
  }

  const { name, email, phone, message } = payload;
  if (!name || !email || !message) {
    return jsonResponse(400, { error: 'name, email, and message are required' });
  }

  const senderEmail = process.env.SENDER_EMAIL;
  const recipientEmail = process.env.RECIPIENT_EMAIL;
  if (!senderEmail || !recipientEmail) {
    throw new Error('SENDER_EMAIL and RECIPIENT_EMAIL environment variables must be set');
  }

  const command = new SendEmailCommand({
    FromEmailAddress: senderEmail,
    Destination: { ToAddresses: [recipientEmail] },
    Content: {
      Simple: {
        Subject: { Data: `Contact form: ${name}` },
        Body: {
          Text: {
            Data: `Name: ${name}\nEmail: ${email}\nPhone: ${phone ?? ''}\n\n${message}`,
          },
        },
      },
    },
    ReplyToAddresses: [email],
  });

  if (process.env.DRY_RUN === 'true') {
    console.log('DRY_RUN=true -- not sending. Constructed command input:', command.input);
    return jsonResponse(200, { ok: true, dryRun: true });
  }

  try {
    await ses.send(command);
  } catch (err) {
    console.error('SES send failed', err);
    return jsonResponse(500, { error: 'Failed to send message' });
  }

  return jsonResponse(200, { ok: true });
};
