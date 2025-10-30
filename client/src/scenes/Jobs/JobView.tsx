import { useParams } from 'react-router-dom';
import * as JobsApi from '@/api/Jobs';
import Spinner from '@/components/Spinner';
import { useApiQuery } from '@/hooks/query';
import CandidatesTable from './CandidatesTable';

const JobView = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: job,
    isLoading,
    error,
  } = useApiQuery({
    queryFn: JobsApi.one,
    params: { id: id! },
    queryKey: ['job', id],
    showErrorAlert: true,
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className='flex h-[calc(100vh-12rem)] items-center justify-center'>
        <Spinner size='xl' />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className='flex h-[calc(100vh-12rem)] items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>
            Error loading job
          </h2>
          <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
            {error ? 'Failed to load job details' : 'Job not found'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8'>
      <header>
        <h1 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {job.name}
        </h1>
      </header>
      <div className='mt-2 space-y-6'>
        {/* Job Details */}
        <div className='rounded-lg border border-gray-200 bg-white p-6 shadow-xs dark:border-gray-700 dark:bg-gray-800'>
          <dl className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            <div>
              <dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                Job ID
              </dt>
              <dd className='mt-1 text-sm text-gray-900 dark:text-white'>
                {job.id}
              </dd>
            </div>
            <div>
              <dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                Status
              </dt>
              <dd className='mt-1 text-sm text-gray-900 dark:text-white'>
                {job.status}
              </dd>
            </div>
            <div>
              <dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                Requisition ID
              </dt>
              <dd className='mt-1 text-sm text-gray-900 dark:text-white'>
                {job.requisition_id || '—'}
              </dd>
            </div>
            <div>
              <dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                Created At
              </dt>
              <dd className='mt-1 text-sm text-gray-900 dark:text-white'>
                {new Date(job.created_at).toLocaleDateString()}
              </dd>
            </div>
            <div>
              <dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                Opened At
              </dt>
              <dd className='mt-1 text-sm text-gray-900 dark:text-white'>
                {job.opened_at
                  ? new Date(job.opened_at).toLocaleDateString()
                  : '—'}
              </dd>
            </div>
            <div>
              <dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                Confidential
              </dt>
              <dd className='mt-1 text-sm text-gray-900 dark:text-white'>
                {job.confidential ? 'Yes' : 'No'}
              </dd>
            </div>
            {job.notes && (
              <div className='sm:col-span-2 lg:col-span-3'>
                <dt className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                  Notes
                </dt>
                <dd className='mt-1 text-sm text-gray-900 dark:text-white'>
                  {job.notes}
                </dd>
              </div>
            )}
          </dl>
        </div>

        {/* Candidates Table */}
        <CandidatesTable jobId={String(job.id)} />
      </div>
    </div>
  );
};

export default JobView;
