import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isPending?: boolean;
  danger?: boolean;
}

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isPending = false,
  danger = false,
}: ConfirmDialogProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className='relative z-50'>
      <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <DialogPanel className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 dark:bg-gray-800'>
            <div className='sm:flex sm:items-start'>
              <div
                className={`mx-auto flex size-12 shrink-0 items-center justify-center rounded-full sm:mx-0 sm:size-10 ${
                  danger
                    ? 'bg-red-100 dark:bg-red-900/20'
                    : 'bg-blue-100 dark:bg-blue-900/20'
                }`}
              >
                <ExclamationTriangleIcon
                  aria-hidden='true'
                  className={`size-6 ${
                    danger
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-blue-600 dark:text-blue-400'
                  }`}
                />
              </div>
              <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                <DialogTitle
                  as='h3'
                  className='text-base font-semibold leading-6 text-gray-900 dark:text-white'
                >
                  {title}
                </DialogTitle>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    {message}
                  </p>
                </div>
              </div>
            </div>
            <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
              <button
                type='button'
                disabled={isPending}
                onClick={onConfirm}
                className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 sm:ml-3 sm:w-auto ${
                  danger
                    ? 'bg-red-600 hover:bg-red-500 focus-visible:outline-red-600 disabled:opacity-50 dark:bg-red-600 dark:hover:bg-red-500 dark:focus-visible:outline-red-500'
                    : 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600 disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500'
                }`}
              >
                {isPending ? 'Processing...' : confirmText}
              </button>
              <button
                type='button'
                disabled={isPending}
                onClick={onClose}
                className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-600 dark:hover:bg-gray-700 dark:focus-visible:outline-indigo-500 sm:mt-0 sm:w-auto'
              >
                {cancelText}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmDialog;
