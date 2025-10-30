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
import { oneCandidate } from './data';

describe('candidates route Test', () => {
  const fastify = app();
  const stubs: Record<string, sinon.SinonStub> = {};
  let mockAxios: { get: sinon.SinonStub };
  let encryptedKey: string;

  beforeAll(async () => {
    encryptedKey = encrypt('TEST_KEY');

    mockAxios = {
      get: sinon.stub().resolves({ data: [oneCandidate] }),
    };

    // Stub the gh function to return mock axios, but accept the key parameter
    stubs.gh = sinon
      .stub(ghModule, 'default')
      .callsFake(() => mockAxios as any);
    stubs.getCandidates = mockAxios.get;

    stubs.auth = sinon.stub(propel, 'validateAccessTokenAndGetUser').resolves({
      userId: '123',
      email: '',
      properties: {
        metadata: {
          greenhouseApiKey: encryptedKey,
        },
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
    const res = await fastify.inject().get(`/candidates`);
    expect(res.statusCode).toEqual(401);
  });

  test('should GET SEARCH candidates', async () => {
    const res = await fastify.inject().get(`/candidates`).headers({
      authorization: 'Bearer test-token',
      'x-greenhouse-key': encryptedKey,
    });

    expect(res.statusCode).toEqual(200);
    expect(stubs.gh.calledOnce).toBe(true);

    const body = res.json();

    expect(body).toHaveLength(1);

    expect(body).toMatchObject([oneCandidate]);
  });
});
