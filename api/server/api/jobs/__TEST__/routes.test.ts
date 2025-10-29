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
import * as ghModule from '../../../util/greenhouse';
import propel from '../../../util/propel';
import { oneJob } from './data';

describe('jobs route Test', () => {
  const fastify = app();
  const stubs: Record<string, sinon.SinonStub | any> = {};
  let mockAxios: { get: sinon.SinonStub };
  let encryptedKey: string;

  beforeAll(async () => {
    encryptedKey = encrypt('TEST_KEY');

    // Create a mock axios instance with a stubbed 'get' method
    mockAxios = {
      get: sinon.stub().resolves({ data: oneJob }),
    };

    // Stub the gh function itself to return our mock axios instance
    // When any code calls gh(key), it will get the same mock instance
    stubs.gh = sinon.stub(ghModule, 'default').returns(mockAxios as any);
    stubs.getJobs = mockAxios.get;

    stubs.auth = sinon.stub(propel, 'validateAccessTokenAndGetUser').resolves({
      userId: '123',
      email: '',
      properties: {},
      metadata: {
        greenhouseApiKey: encryptedKey,
      },
    } as any);
  });

  afterEach(async () => {
    stubs.gh.resetHistory();
  });

  afterAll(async () => {
    stubs.gh.restore();
    stubs.auth.restore();
  });

  test('should fail without valid API key', async () => {
    const res = await fastify.inject().get(`/jobs`);
    expect(res.statusCode).toEqual(401);
  });

  test('should GET ONE job', async () => {
    const testID = 'TEST_ID';
    const res = await fastify.inject().get(`/jobs/${testID}`).headers({
      authorization: 'Bearer test-token',
      'x-greenhouse-key': encryptedKey,
    });

    expect(res.statusCode).toEqual(200);

    const body = res.json();

    expect(body).toMatchObject(oneJob);
  });

  test('should GET SEARCH jobs', async () => {
    // Update stub for array response
    stubs.getJobs.resolves({
      data: [oneJob],
    });

    const res = await fastify.inject().get(`/jobs`).headers({
      authorization: 'Bearer test-token',
      'x-greenhouse-key': encryptedKey,
    });

    expect(res.statusCode).toEqual(200);

    const body = res.json();

    expect(body).toHaveLength(1);

    expect(body).toMatchObject([oneJob]);
  });
});
