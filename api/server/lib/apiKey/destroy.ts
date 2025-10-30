import propel from '@/util/propel';

const destroy = async (userId: string) => {
  // store in propel user metadata
  await propel.updateUserMetadata(userId, {
    metadata: {
      greenhouseApiKey: null,
    },
  });
};

export default destroy;
