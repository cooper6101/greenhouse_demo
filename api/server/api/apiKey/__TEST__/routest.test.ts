import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  test,
} from '@jest/globals';
import sinon from 'sinon';
import app from '../../../app';
import { encrypt } from '../../../util/encrypt';
import propel from '../../../util/propel';

describe('apiKey route Test', () => {
  const fastify = app();
  const stubs: Record<string, sinon.SinonStub> = {};
  let encryptedKey: string;

  beforeAll(async () => {
    encryptedKey = encrypt('TEST_KEY');

    stubs.auth = sinon.stub(propel, 'validateAccessTokenAndGetUser').resolves({
      userId: '123',
      email: '',
      properties: {},
      metadata: {
        greenhouseApiKey: encryptedKey,
      },
    } as any);

    stubs.updateMetadata = sinon
      .stub(propel, 'updateUserMetadata')
      .resolves(undefined);
  });

  afterEach(async () => {
    stubs.updateMetadata.resetHistory();
  });

  afterAll(async () => {
    stubs.auth.restore();
    stubs.updateMetadata.restore();
  });

  test('should fail without valid API key', async () => {
    const res = await fastify.inject().post(`/api-key`);

    expect(res.statusCode).toEqual(401);
  });

  test('should POST create apiKey', async () => {
    const res = await fastify
      .inject()
      .post(`/api-key`)
      .headers({
        authorization: 'Bearer test-token',
      })
      .payload({
        apiKey: 'TEST_API_KEY',
      });

    expect(res.statusCode).toEqual(201);

    expect(res.body).toEqual('API key created');

    // Verify that updateUserMetadata was called with encrypted key
    expect(stubs.updateMetadata.calledOnce).toBe(true);
    const callArgs = stubs.updateMetadata.firstCall.args;
    expect(callArgs[0]).toBe('123'); // userId
    expect(callArgs[1].metadata.greenhouseApiKey).toBeDefined();
    // The encrypted key should be different from the plain key
    expect(callArgs[1].metadata.greenhouseApiKey).not.toBe('TEST_API_KEY');
  });

  test('should DELETE destroy apiKey', async () => {
    const res = await fastify.inject().delete(`/api-key`).headers({
      authorization: 'Bearer test-token',
    });

    expect(res.statusCode).toEqual(204);

    expect(stubs.updateMetadata.calledOnce).toBe(true);
    const callArgs = stubs.updateMetadata.firstCall.args;
    expect(callArgs[0]).toBe('123'); // userId
    expect(callArgs[1].metadata.greenhouseApiKey).toBeNull();
  });
});
