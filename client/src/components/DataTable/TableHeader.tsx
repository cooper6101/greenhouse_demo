import type { ColumnConfig, TableData } from '.';

// Table Header Component
interface TableHeaderProps<T extends TableData> {
  columns: ColumnConfig<T>[];
  visibleColumns: Set<string>;
}

const TableHeader = <T extends TableData>({
  columns,
  visibleColumns,
}: TableHeaderProps<T>) => {
  const visibleCols = columns.filter((col) => visibleColumns.has(col.key));

  return (
    <thead className='sticky top-0 z-10 bg-gray-50 dark:bg-gray-800'>
      <tr>
        {visibleCols.map((column) => (
          <th
            key={column.key}
            scope='col'
            className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 ${column.className || ''}`}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
