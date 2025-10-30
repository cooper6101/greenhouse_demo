import type { ColumnConfig } from '@/components/DataTable';
import DataTable from '@/components/DataTable';
import type { Candidate } from '@/util/types';

interface CandidatesTableProps {
  jobId: string;
}

const columns: ColumnConfig<Candidate>[] = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'first_name',
    label: 'First Name',
  },
  {
    key: 'last_name',
    label: 'Last Name',
  },
  {
    key: 'company',
    label: 'Company',
  },
  {
    key: 'title',
    label: 'Title',
  },
  {
    key: 'created_at',
    label: 'Created At',
  },
  {
    key: 'updated_at',
    label: 'Updated At',
  },
  {
    key: 'last_activity',
    label: 'Last Activity',
  },
  {
    key: 'is_private',
    label: 'Is Private',
  },
  {
    key: 'photo_url',
    label: 'Photo URL',
  },
  {
    key: 'recruiter',
    label: 'Recruiter',
  },
  {
    key: 'coordinator',
    label: 'Coordinator',
  },
];

const CandidatesTable = ({ jobId }: CandidatesTableProps) => {
  return (
    <DataTable
      dataType='candidates'
      columns={columns}
      title='Candidates'
      description='Candidates for this job'
      jobId={jobId}
      height='h-[800px]'
      initialVisibleColumns={[
        'id',
        'first_name',
        'last_name',
        'company',
        'title',
        'created_at',
        'updated_at',
        'last_activity',
        'is_private',
        'photo_url',
        'recruiter',
        'coordinator',
      ]}
    />
  );
};

export default CandidatesTable;
