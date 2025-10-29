const Spinner = ({
  size = 'sm',
  ...props
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}) => {
  return (
    <>
      {size === 'sm' ? (
        <output
          className='animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-sky-600 rounded-full dark:text-sky-500'
          aria-label='loading'
          {...props}
        >
          <span className='sr-only'>Loading...</span>
        </output>
      ) : size === 'md' ? (
        <output
          className='animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-sky-600 rounded-full dark:text-sky-500'
          aria-label='loading'
          {...props}
        >
          <span className='sr-only'>Loading...</span>
        </output>
      ) : size === 'lg' ? (
        <output
          className='animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-sky-600 rounded-full dark:text-sky-500'
          aria-label='loading'
          {...props}
        >
          <span className='sr-only'>Loading...</span>
        </output>
      ) : (
        <output
          className='animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-sky-600 rounded-full dark:text-sky-500'
          aria-label='loading'
          {...props}
        >
          <span className='sr-only'>Loading...</span>
        </output>
      )}
    </>
  );
};

export default Spinner;
