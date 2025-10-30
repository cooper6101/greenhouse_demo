import { Link } from 'react-router-dom';
import type { ColumnConfig } from '@/components/DataTable';
import DataTable from '@/components/DataTable';
import type { Job } from '@/util/types';

const columns: ColumnConfig<Job>[] = [
  {
    key: 'id',
    label: 'ID',
    accessor: (job) => (
      <Link
        to={`/dashboard/jobs/${job.id}`}
        className='font-medium text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300'
      >
        {job.id}
      </Link>
    ),
  },
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'requisition_id',
    label: 'Requisition ID',
  },
  {
    key: 'notes',
    label: 'Notes',
  },
  {
    key: 'confidential',
    label: 'Confidential',
  },
  {
    key: 'status',
    label: 'Status',
  },
  {
    key: 'created_at',
    label: 'Created At',
  },
  {
    key: 'opened_at',
    label: 'Opened At',
  },
  {
    key: 'closed_at',
    label: 'Closed At',
  },
  {
    key: 'updated_at',
    label: 'Updated At',
  },
  {
    key: 'is_template',
    label: 'Is Template',
  },
  {
    key: 'copied_from_id',
    label: 'Copied From ID',
  },
];

const JobsTable = () => {
  return (
    <DataTable
      dataType='jobs'
      columns={columns}
      title='Jobs'
      description='Jobs table'
      initialVisibleColumns={[
        'id',
        'name',
        'requisition_id',
        'notes',
        'confidential',
        'status',
        'created_at',
        'opened_at',
        'closed_at',
        'updated_at',
        'is_template',
        'copied_from_id',
      ]}
    />
  );
};

export default JobsTable;
