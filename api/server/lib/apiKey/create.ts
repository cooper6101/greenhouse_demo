import { encrypt } from '@/util/encrypt';
import propel from '@/util/propel';

const create = async ({
  userId,
  apiKey,
}: {
  userId: string;
  apiKey: string;
}) => {
  const encryptedApiKey = encrypt(apiKey);

  // store in propel user metadata
  await propel.updateUserMetadata(userId, {
    metadata: {
      greenhouseApiKey: encryptedApiKey,
    },
  });
};

export default create;
