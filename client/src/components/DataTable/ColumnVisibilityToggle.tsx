import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
  ChevronDownIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';
import type { ColumnConfig, TableData } from '.';

// Column Visibility Toggle Component
interface ColumnVisibilityToggleProps {
  columns: ColumnConfig<TableData>[];
  visibleColumns: Set<string>;
  onToggleColumn: (key: string) => void;
}

const ColumnVisibilityToggle = ({
  columns,
  visibleColumns,
  onToggleColumn,
}: ColumnVisibilityToggleProps) => {
  return (
    <Menu as='div' className='relative'>
      <MenuButton className='flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-xs hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus-visible:outline-indigo-500'>
        <EyeIcon aria-hidden='true' className='size-4' />
        Columns
        <ChevronDownIcon aria-hidden='true' className='size-4' />
      </MenuButton>
      <MenuItems className='absolute left-0 z-50 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg outline outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:outline-white/10'>
        <div className='overflow-visible rounded-md bg-white py-1 dark:bg-gray-800'>
          {columns.map((column) => {
            const isVisible = visibleColumns.has(column.key);
            return (
              <MenuItem key={column.key}>
                {({ focus }) => (
                  <button
                    type='button'
                    onClick={() => onToggleColumn(column.key)}
                    className={`flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 ${
                      focus
                        ? 'bg-gray-100 dark:bg-white/5'
                        : 'bg-white dark:bg-gray-800'
                    }`}
                  >
                    {isVisible ? (
                      <EyeIcon aria-hidden='true' className='size-4' />
                    ) : (
                      <EyeSlashIcon aria-hidden='true' className='size-4' />
                    )}
                    {column.label}
                  </button>
                )}
              </MenuItem>
            );
          })}
        </div>
      </MenuItems>
    </Menu>
  );
};

export default ColumnVisibilityToggle;
