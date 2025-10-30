import Spinner from '@/components/Spinner';
import { Apple, Facebook, Google } from './AuthSvg';

const classNames = {
  facebook:
    'flex w-full items-center justify-center gap-3 rounded-md bg-[#3B5998] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B5998]',
  google:
    'flex w-full items-center justify-center gap-3 rounded-md bg-background px-3 py-1.5 text-[#24292F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]',
  apple:
    'flex w-full items-center justify-center gap-3 rounded-md bg-background px-3 py-1.5 text-[#24292F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]',
};

const AuthButton = ({
  svg,
  onClick,
  loading,
}: {
  svg: 'google' | 'facebook' | 'apple';
  onClick: () => void;
  loading: boolean;
}) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={classNames[svg]}
      style={{
        outline: '1px solid',
        outlineColor: '#bbbcbc',
      }}
    >
      {loading ? (
        <Spinner size='md' />
      ) : (
        <>
          {' '}
          {svg === 'google' ? (
            <Google />
          ) : svg === 'facebook' ? (
            <Facebook />
          ) : svg === 'apple' ? (
            <Apple />
          ) : (
            <></>
          )}
          <span>{svg}</span>
        </>
      )}
    </button>
  );
};

export default AuthButton;
