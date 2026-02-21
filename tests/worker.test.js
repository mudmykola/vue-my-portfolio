import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../worker/src/index.js';

const originalFetch = global.fetch;

test('worker returns health payload for GET /health', async () => {
  const request = new Request('https://example.workers.dev/health');
  const response = await worker.fetch(request, { ALLOWED_ORIGIN: '*' });
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.success, true);
  assert.equal(body.status, 'ok');
});

test('worker serves static assets for GET /', async () => {
  let assetsCalled = 0;
  const request = new Request('https://example.workers.dev/');
  const env = {
    ALLOWED_ORIGIN: '*',
    ASSETS: {
      async fetch() {
        assetsCalled += 1;
        return new Response('<html>ok</html>', {
          status: 200,
          headers: { 'content-type': 'text/html' },
        });
      },
    },
  };

  const response = await worker.fetch(request, env);
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.equal(assetsCalled, 1);
  assert.match(html, /ok/);
});

test('worker rejects non-POST methods on /contact', async () => {
  const request = new Request('https://example.workers.dev/contact', {
    method: 'PUT',
  });
  const response = await worker.fetch(request, { ALLOWED_ORIGIN: '*' });
  const body = await response.json();

  assert.equal(response.status, 405);
  assert.equal(body.error, 'Method not allowed');
});

test('worker validates content-type and body on /contact', async () => {
  const request = new Request('https://example.workers.dev/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: 'bad',
  });
  const response = await worker.fetch(request, { ALLOWED_ORIGIN: '*' });
  const body = await response.json();

  assert.equal(response.status, 415);
  assert.equal(body.error, 'Unsupported content type');
});

test('worker requires telegram secrets for valid payload', async () => {
  const request = new Request('https://example.workers.dev/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'John Doe',
      email: 'john@example.com',
      message: 'Hello',
    }),
  });

  const response = await worker.fetch(request, { ALLOWED_ORIGIN: '*' });
  const body = await response.json();

  assert.equal(response.status, 500);
  assert.equal(body.error, 'Server is not configured correctly');
});

test('worker posts message to telegram and returns success', async () => {
  global.fetch = async (url) => {
    assert.match(String(url), /api\.telegram\.org/);
    return new Response('{}', { status: 200 });
  };

  const request = new Request('https://example.workers.dev/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'John Doe',
      email: 'john@example.com',
      message: 'Hello',
    }),
  });
  const env = {
    ALLOWED_ORIGIN: '*',
    TELEGRAM_BOT_TOKEN: 'token',
    TELEGRAM_CHAT_ID: 'chat-id',
  };

  const response = await worker.fetch(request, env);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.success, true);
});

process.on('exit', () => {
  global.fetch = originalFetch;
});
