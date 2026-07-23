// Local test harness (CLAUDE.md Section 7 execution step 5). Runs the
// handler directly against a mock API-Gateway-proxy event -- no AWS
// credentials or deployed infra required as long as DRY_RUN=true.
process.env.DRY_RUN ??= 'true';
process.env.SENDER_EMAIL ??= 'no-reply@eurohomemadebakery.com';
process.env.RECIPIENT_EMAIL ??= 'store@eurohomemadebakery.com';

const { handler } = await import('./index.mjs');

const mockEvent = {
  httpMethod: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    phone: '555-0100',
    message: 'This is a local test invocation.',
  }),
};

const response = await handler(mockEvent);
console.log('Response:', response);
