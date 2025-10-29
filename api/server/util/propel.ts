import { initBaseAuth } from '@propelauth/node';

import config from '../config';

// We manually create like this for testing. Propel won't recognize functions that we don't explicity define.
const propel =
  process.env.NODE_ENV === 'test'
    ? ({
        validateAccessTokenAndGetUser: async () => {},
        fetchUserMetadataByUserId: async () => {},
        updateUserMetadata: async () => {},
      } as unknown as ReturnType<typeof initBaseAuth>)
    : initBaseAuth({
        authUrl: config.AUTH_URL,
        apiKey: config.AUTH_API_KEY,
      });

export default propel;
