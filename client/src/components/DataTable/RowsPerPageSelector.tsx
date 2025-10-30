import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { ROWS_PER_PAGE_OPTIONS, type RowsPerPage } from '.';

// Rows Per Page Selector Component
interface RowsPerPageSelectorProps {
  rowsPerPage: RowsPerPage;
  onRowsPerPageChange: (rows: RowsPerPage) => void;
}

const RowsPerPageSelector = ({
  rowsPerPage,
  onRowsPerPageChange,
}: RowsPerPageSelectorProps) => {
  return (
    <Menu as='div' className='relative'>
      <MenuButton className='flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-xs hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus-visible:outline-indigo-500'>
        {rowsPerPage} rows
        <ChevronDownIcon aria-hidden='true' className='size-4' />
      </MenuButton>
      <MenuItems className='absolute right-0 z-50 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg outline outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:outline-white/10'>
        <div className='overflow-visible rounded-md bg-white py-1 dark:bg-gray-800'>
          {ROWS_PER_PAGE_OPTIONS.map((option) => {
            return (
              <MenuItem key={option}>
                {({ focus }) => (
                  <button
                    type='button'
                    onClick={() => onRowsPerPageChange(option)}
                    className={`flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 ${
                      focus
                        ? 'bg-gray-100 dark:bg-white/5'
                        : 'bg-white dark:bg-gray-800'
                    }`}
                  >
                    {option} rows
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

export default RowsPerPageSelector;
