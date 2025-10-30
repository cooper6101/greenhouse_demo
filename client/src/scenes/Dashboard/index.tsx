import { useAuthInfo } from '@propelauth/react';
import JobsTable from '../Jobs/JobsTable';
import ApiKeyForm from './ApiKeyForm';

const Dashboard = () => {
  const { user } = useAuthInfo();

  return (
    <div className='mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8'>
      {(user as any)?.metadata?.greenhouseApiKey ? (
        <JobsTable />
      ) : (
        <ApiKeyForm />
      )}
    </div>
  );
};

export default Dashboard;
