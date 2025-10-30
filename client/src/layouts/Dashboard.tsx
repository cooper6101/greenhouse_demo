import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { RedirectToLogin, useAuthInfo } from '@propelauth/react';
import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import * as ApiKey from '@/api/ApiKey';
import ConfirmDialog from '@/components/ConfirmDialog';
import Overlay from '@/components/Overlay';
import { useApiMutation } from '@/hooks/query';
import { classNames } from '@/util/common';
import Dashboard from '../scenes/Dashboard';
import JobView from '../scenes/Jobs/JobView';

const navigation = [{ name: 'Home', href: '/dashboard', current: true }];
const userNavigation = [{ name: 'Sign out', href: '/logout' }];

const DashboardLayout = () => {
  const { user, isLoggedIn, loading } = useAuthInfo();
  const location = useLocation();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const hasApiKey = (user as any)?.metadata?.greenhouseApiKey;

  const deleteMutation = useApiMutation({
    mutationFn: ApiKey.destroy,
    queryKey: ['api-key'],
    successMessage: 'API key cleared successfully',
    showSuccessAlert: true,
    callback: () => {
      setIsConfirmDialogOpen(false);
    },
  });

  // Determine if Home nav item should be current
  const currentNavigation = navigation.map((item) => ({
    ...item,
    current: location.pathname === '/' || location.pathname === '/dashboard',
  }));

  // User is not available yet, return loading
  if (loading) return <Overlay />;

  // User is not logged in, redirect to login page
  if (!isLoggedIn || !user) return <RedirectToLogin />;

  return (
    <div className='min-h-full'>
      <Disclosure
        as='nav'
        className='border-b border-gray-200 bg-white dark:border-white/10 dark:bg-gray-900'
      >
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='flex h-16 justify-between'>
            <div className='flex'>
              <div className='flex shrink-0 items-center'>
                <img
                  alt='Greenhouse Demo App'
                  src='https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600'
                  className='h-8 w-auto dark:hidden'
                />
                <img
                  alt='Greenhouse Demo App'
                  src='https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500'
                  className='h-8 w-auto not-dark:hidden'
                />
              </div>
              <div className='hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8'>
                {currentNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current
                        ? 'border-indigo-600 text-gray-900 dark:border-indigo-500 dark:text-white'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-white/20 dark:hover:text-gray-200',
                      'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
            <div className='hidden sm:ml-6 sm:flex sm:items-center'>
              <button
                type='button'
                className='relative rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 dark:text-gray-400 dark:hover:text-white dark:focus:outline-indigo-500'
              >
                <span className='absolute -inset-1.5' />
                <span className='sr-only'>View notifications</span>
                <BellIcon aria-hidden='true' className='size-6' />
              </button>

              {/* Profile dropdown */}
              <Menu as='div' className='relative ml-3'>
                <MenuButton className='relative flex max-w-xs items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-500'>
                  <span className='absolute -inset-1.5' />
                  <span className='sr-only'>Open user menu</span>
                  <img
                    alt=''
                    src={
                      user?.pictureUrl ??
                      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                    }
                    className='size-8 rounded-full outline -outline-offset-1 outline-black/5 dark:outline-white/10'
                  />
                </MenuButton>

                <MenuItems
                  transition
                  className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10'
                >
                  {hasApiKey && (
                    <MenuItem>
                      {({ focus }) => (
                        <button
                          type='button'
                          onClick={() => setIsConfirmDialogOpen(true)}
                          className={`block w-full px-4 py-2 text-left text-sm text-gray-700 ${
                            focus
                              ? 'bg-gray-100 dark:bg-white/5'
                              : 'bg-white dark:bg-gray-800'
                          } dark:text-gray-300`}
                        >
                          Clear API Key
                        </button>
                      )}
                    </MenuItem>
                  )}
                  {userNavigation.map((item) => (
                    <MenuItem key={item.name}>
                      <a
                        href={item.href}
                        className='block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5'
                      >
                        {item.name}
                      </a>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>
            <div className='-mr-2 flex items-center sm:hidden'>
              {/* Mobile menu button */}
              <DisclosureButton className='group relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 dark:bg-gray-900 dark:text-gray-400 dark:hover:text-white/5 dark:hover:text-white dark:focus:outline-indigo-500'>
                <span className='absolute -inset-0.5' />
                <span className='sr-only'>Open main menu</span>
                <Bars3Icon
                  aria-hidden='true'
                  className='block size-6 group-data-open:hidden'
                />
                <XMarkIcon
                  aria-hidden='true'
                  className='hidden size-6 group-data-open:block'
                />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel className='sm:hidden'>
          <div className='space-y-1 pt-2 pb-3'>
            {currentNavigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as='a'
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={classNames(
                  item.current
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-600/10 dark:text-indigo-300'
                    : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:hover:border-gray-500 dark:hover:bg-white/5 dark:hover:text-gray-200',
                  'block border-l-4 py-2 pr-4 pl-3 text-base font-medium'
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
          <div className='border-t border-gray-200 pt-4 pb-3 dark:border-gray-700'>
            <div className='flex items-center px-4'>
              <div className='shrink-0'>
                <img
                  alt=''
                  src={
                    user?.pictureUrl ??
                    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                  }
                  className='size-10 rounded-full outline -outline-offset-1 outline-black/5 dark:outline-white/10'
                />
              </div>
              <div className='ml-3'>
                <div className='text-base font-medium text-gray-800 dark:text-white'>
                  {user?.firstName}
                </div>
                <div className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                  {user?.email}
                </div>
              </div>
              <button
                type='button'
                className='relative ml-auto shrink-0 rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 dark:text-gray-400 dark:hover:text-white dark:focus:outline-indigo-500'
              >
                <span className='absolute -inset-1.5' />
                <span className='sr-only'>View notifications</span>
                <BellIcon aria-hidden='true' className='size-6' />
              </button>
            </div>
            <div className='mt-3 space-y-1'>
              {hasApiKey && (
                <DisclosureButton
                  as='button'
                  type='button'
                  onClick={() => setIsConfirmDialogOpen(true)}
                  className='block w-full px-4 py-2 text-left text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-200'
                >
                  Clear API Key
                </DisclosureButton>
              )}
              {userNavigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as='a'
                  href={item.href}
                  className='block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-200'
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>

      <div className='py-10'>
        <main>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/jobs/:id' element={<JobView />} />
          </Routes>
        </main>
      </div>

      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={() => deleteMutation.mutate({})}
        title='Clear API Key'
        message='Are you sure you want to clear your Greenhouse API key? You will need to enter it again to view jobs and candidates.'
        confirmText='Clear API Key'
        cancelText='Cancel'
        isPending={deleteMutation.isPending}
        danger
      />
    </div>
  );
};

export default DashboardLayout;
