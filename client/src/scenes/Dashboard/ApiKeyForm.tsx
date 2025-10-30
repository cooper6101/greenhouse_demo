import { useAuthInfo } from '@propelauth/react';
import { useEffect, useState } from 'react';
import * as ApiKey from '@/api/ApiKey';
import { useApiMutation } from '@/hooks/query';

const ApiKeyForm = () => {
  const { refreshAuthInfo } = useAuthInfo();
  const [apiKey, setApiKey] = useState('');

  const mutation = useApiMutation({
    mutationFn: ApiKey.create,
    queryKey: ['api-key'],
    successMessage: 'API key saved successfully',
    showSuccessAlert: true,
    callback: () => {
      // reload propel user
      refreshAuthInfo();
    },
  });

  // Clear form after successful mutation
  useEffect(() => {
    if (mutation.isSuccess) {
      setApiKey('');
      // Reset the mutation state after clearing the form
      mutation.reset();
    }
  }, [mutation.isSuccess]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!apiKey.trim()) return;

    mutation.mutate({ apiKey: apiKey.trim() });
  };

  return (
    <div className='rounded-lg border border-gray-200 bg-white p-6 shadow-xs dark:border-gray-700 dark:bg-gray-800'>
      <h2 className='mb-4 text-lg font-semibold text-gray-900 dark:text-white'>
        Add API Key
      </h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label
            htmlFor='apiKey'
            className='block text-sm font-medium text-gray-700 dark:text-gray-300'
          >
            Greenhouse API Key
          </label>
          <input
            type='text'
            id='apiKey'
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            disabled={mutation.isPending}
            placeholder='Enter your Greenhouse API key'
            className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-xs placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 dark:disabled:bg-gray-800'
            required
          />
        </div>
        <div>
          <button
            type='submit'
            disabled={mutation.isPending || !apiKey.trim()}
            className='rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500'
          >
            {mutation.isPending ? 'Saving...' : 'Save API Key'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApiKeyForm;
