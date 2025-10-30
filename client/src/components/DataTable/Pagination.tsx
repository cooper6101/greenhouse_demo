import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  rowsPerPage: number;
  totalItems?: number; // Optional: if API returns total count
  hasNextPage: boolean; // Determined by whether we got a full page of results
  visibleItems: number; // Number of items currently visible
}

const Pagination = ({
  currentPage,
  onPageChange,
  rowsPerPage,
  totalItems,
  hasNextPage,
  visibleItems,
}: PaginationProps) => {
  const totalPages = totalItems
    ? Math.ceil(totalItems / rowsPerPage)
    : undefined;
  const isFirstPage = currentPage === 1;
  const isLastPage = totalPages ? currentPage >= totalPages : !hasNextPage;

  // Calculate range of items shown based on visible items
  const startItem = (currentPage - 1) * rowsPerPage + 1;
  const endItem = totalItems
    ? Math.min(currentPage * rowsPerPage, totalItems)
    : startItem + visibleItems - 1;

  const handlePrevious = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className='flex items-center justify-between border-t border-gray-200 px-4 py-3 dark:border-gray-700 sm:px-6'>
      <div className='flex flex-1 justify-between sm:hidden'>
        {/* Mobile pagination */}
        <button
          type='button'
          onClick={handlePrevious}
          disabled={isFirstPage}
          className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
        >
          Previous
        </button>
        <button
          type='button'
          onClick={handleNext}
          disabled={isLastPage}
          className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
        >
          Next
        </button>
      </div>
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm text-gray-700 dark:text-gray-300'>
            Showing{' '}
            <span className='font-medium'>
              {startItem}
              {totalItems && `-${endItem}`}
            </span>{' '}
            {totalItems ? (
              <>
                of <span className='font-medium'>{totalItems}</span> results
              </>
            ) : (
              <>
                {visibleItems > 0 && `of ${visibleItems} results`}
                {hasNextPage && '+'}
                {totalPages && ` (Page ${currentPage} of ${totalPages})`}
              </>
            )}
          </p>
        </div>
        <div>
          <nav
            className='isolate inline-flex -space-x-px rounded-md shadow-xs'
            aria-label='Pagination'
          >
            <button
              type='button'
              onClick={handlePrevious}
              disabled={isFirstPage}
              className='relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
            >
              <span className='sr-only'>Previous</span>
              <ChevronLeftIcon aria-hidden='true' className='size-5' />
            </button>
            {totalPages && totalPages > 0 && (
              <>
                {/* Show page numbers if we know total pages */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      type='button'
                      onClick={() => onPageChange(pageNum)}
                      className={`relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 ${
                        currentPage === pageNum
                          ? 'z-10 border-indigo-500 bg-indigo-50 text-indigo-600 dark:border-indigo-500 dark:bg-indigo-600/20 dark:text-indigo-300'
                          : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </>
            )}
            <button
              type='button'
              onClick={handleNext}
              disabled={isLastPage}
              className='relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
            >
              <span className='sr-only'>Next</span>
              <ChevronRightIcon aria-hidden='true' className='size-5' />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
