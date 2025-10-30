import type { Candidate, Job } from '@/util/types';
import type { ColumnConfig, TableData } from '.';

// Table Body Component
interface TableBodyProps<T extends TableData> {
  columns: ColumnConfig<T>[];
  visibleColumns: Set<string>;
  data: T[] | undefined;
  isLoading: boolean;
}

const TableBody = <T extends TableData>({
  columns,
  visibleColumns,
  data,
  isLoading,
}: TableBodyProps<T>) => {
  const visibleCols = columns.filter((col) => visibleColumns.has(col.key));

  if (isLoading) {
    return (
      <tbody className='divide-y divide-gray-200 bg-white dark:divide-white/10 dark:bg-gray-900'>
        <tr>
          <td
            colSpan={visibleCols.length}
            className='px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400'
          >
            Loading...
          </td>
        </tr>
      </tbody>
    );
  }

  if (!data || data.length === 0) {
    return (
      <tbody className='divide-y divide-gray-200 bg-white dark:divide-white/10 dark:bg-gray-900'>
        <tr>
          <td
            colSpan={visibleCols.length}
            className='px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400'
          >
            No data available
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className='divide-y divide-gray-200 bg-white dark:divide-white/10 dark:bg-gray-900'>
      {data.map((row, rowIndex) => (
        <tr
          key={(row as Job).id || (row as Candidate).id || rowIndex}
          className='hover:bg-gray-50 dark:hover:bg-gray-800/50'
        >
          {visibleCols.map((column) => {
            let value: React.ReactNode;
            if (column.accessor) {
              value = column.accessor(row);
            } else {
              const rawValue = (row as unknown as Record<string, unknown>)[
                column.key
              ];
              value =
                rawValue === null || rawValue === undefined
                  ? null
                  : String(rawValue);
            }

            return (
              <td
                key={column.key}
                className={`whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white ${column.className || ''}`}
              >
                {value ?? <span className='text-gray-400'>—</span>}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
