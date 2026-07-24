# contact-form Lambda

Single-purpose Lambda: receives the contact form POST (via API Gateway HTTP
API, proxy integration) and sends it to the store via SES.

## Local testing

```sh
npm install
node local-invoke.mjs
```

Runs with `DRY_RUN=true` by default -- logs the constructed SES command
instead of sending, so no AWS credentials or deployed SES identity are
needed. Unset `DRY_RUN` (and provide real credentials + a verified SES
identity) to exercise a true end-to-end send.

## Environment variables (set by Terraform in production)

- `SENDER_EMAIL` -- verified SES identity address.
- `RECIPIENT_EMAIL` -- store notification address.
- `DRY_RUN` -- `"true"` to skip the actual SES send (local testing only).
