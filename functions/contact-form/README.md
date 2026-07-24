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

## SES sandbox mode

This Lambda only ever sends **to** the fixed `RECIPIENT_EMAIL` -- the
customer's own email address from the form is used solely as
`ReplyToAddresses`, never as a `Destination`. SES sandbox mode's
verified-recipient restriction only applies to `Destination` addresses, so
as long as `RECIPIENT_EMAIL` is verified as its own SES identity, this Lambda
works indefinitely without ever requesting SES production access.

Note: SES's IAM authorization for `ses:SendEmail` checks permissions against
every identity ARN involved in the send, including the destination address
if it's a verified identity in the same account (which `RECIPIENT_EMAIL` is,
here) -- not just the sending identity. `infra/modules/contact-form`'s IAM
policy grants `ses:SendEmail`/`ses:SendRawEmail` on both ARNs for this
reason.
