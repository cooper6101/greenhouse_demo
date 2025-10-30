import { ArrowPathIcon } from '@heroicons/react/24/outline';
import type React from 'react';
import { useMemo, useState } from 'react';
import * as CandidatesApi from '@/api/Candidates';
import * as JobsApi from '@/api/Jobs';
import { useApiQuery } from '@/hooks/query';
import type { Candidate, Job } from '@/util/types';
import ColumnVisibilityToggle from './ColumnVisibilityToggle';
import Pagination from './Pagination';
import RowsPerPageSelector from './RowsPerPageSelector';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

// Types
export type DataType = 'jobs' | 'candidates';
export type TableData = Job | Candidate;

export interface ColumnConfig<T extends TableData> {
  key: string;
  label: string;
  accessor?: (row: T) => React.ReactNode;
  defaultVisible?: boolean;
  className?: string;
}

interface DataTableProps<T extends TableData> {
  dataType: DataType;
  columns: ColumnConfig<T>[];
  title?: string;
  description?: string;
  jobId?: string; // Optional, for filtering candidates by job
  initialVisibleColumns?: string[]; // Column keys that should be visible initially
  height?: string; // Optional custom height class (e.g., 'h-[600px]' or 'max-h-[600px]')
}

// Row per page options
// added 2 rows to test pagination
export const ROWS_PER_PAGE_OPTIONS = [2, 25, 50, 100] as const;
export type RowsPerPage = (typeof ROWS_PER_PAGE_OPTIONS)[number];

// Main DataTable Component
function DataTable<T extends TableData>({
  dataType,
  columns,
  title,
  description,
  jobId,
  initialVisibleColumns,
  height = 'h-[calc(100vh-12rem)]',
}: DataTableProps<T>) {
  const [rowsPerPage, setRowsPerPage] = useState<RowsPerPage>(25);
  const [page, setPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(() => {
    // Initialize visible columns from initialVisibleColumns or defaultVisible flags
    if (initialVisibleColumns) {
      return new Set(initialVisibleColumns);
    }
    return new Set(
      columns
        .filter((col) => col.defaultVisible !== false)
        .map((col) => col.key)
    );
  });

  // Build query params
  const queryParams = useMemo(() => {
    const params: Record<string, unknown> = {
      perPage: rowsPerPage,
      page,
    };
    if (jobId) {
      params.jobId = jobId;
    }
    return params;
  }, [rowsPerPage, page, jobId]);

  // Determine which API to use
  const queryFn = dataType === 'jobs' ? JobsApi.search : CandidatesApi.search;

  // Fetch data using React Query
  const { data, isLoading, error, refetch, isRefetching } = useApiQuery({
    queryFn,
    params: queryParams,
    queryKey: [dataType, queryParams],
    showErrorAlert: true,
  });

  // Toggle column visibility
  const handleToggleColumn = (key: string) => {
    setVisibleColumns((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <div className={`flex ${height} flex-col`}>
      {/* Header Section */}
      {(title || description) && (
        <div className='mb-4'>
          {title && (
            <h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>
              {title}
            </h2>
          )}
          {description && (
            <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
              {description}
            </p>
          )}
        </div>
      )}

      {/* Toolbar */}
      <div className='mb-4 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <ColumnVisibilityToggle
            columns={columns}
            visibleColumns={visibleColumns}
            onToggleColumn={handleToggleColumn}
          />
          <RowsPerPageSelector
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(rows) => {
              setRowsPerPage(rows);
              setPage(1); // Reset to first page when changing rows per page
            }}
          />
          <button
            type='button'
            onClick={() => refetch()}
            disabled={isLoading || isRefetching}
            className='inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-xs hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus-visible:outline-indigo-500'
            title='Refresh data'
          >
            <ArrowPathIcon
              aria-hidden='true'
              className={`size-4 ${isRefetching ? 'animate-spin' : ''}`}
            />
            Refresh
          </button>
        </div>
        {error && (
          <div className='text-sm text-red-600 dark:text-red-400'>
            Error loading data
          </div>
        )}
      </div>

      {/* Table Container */}
      <div className='flex-1 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700'>
        <div className='h-full overflow-auto'>
          <table className='min-w-full divide-y divide-gray-200 dark:divide-white/10'>
            <TableHeader columns={columns} visibleColumns={visibleColumns} />
            <TableBody
              columns={columns}
              visibleColumns={visibleColumns}
              data={data as T[] | undefined}
              isLoading={isLoading}
            />
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {data && data.length > 0 && (
        <Pagination
          currentPage={page}
          onPageChange={setPage}
          rowsPerPage={rowsPerPage}
          hasNextPage={data.length === rowsPerPage}
          visibleItems={data.length}
          // totalItems can be added later if API provides it
        />
      )}
    </div>
  );
}

export default DataTable;
