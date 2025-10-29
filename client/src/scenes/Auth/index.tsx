import { useRedirectFunctions } from '@propelauth/react';
import { useEffect } from 'react';

import Overlay from '../../components/internal/Loaders/Overlay';

const AuthLoader = ({ authRoute }: { authRoute: 'login' | 'signup' }) => {
  const { redirectToLoginPage, redirectToSignupPage } = useRedirectFunctions();

  useEffect(() => {
    if (authRoute === 'login') redirectToLoginPage();
    if (authRoute === 'signup') redirectToSignupPage();
  }, []);

  return <Overlay onClose={() => {}} />;
};

const Authentication = ({ type }: { type: 'login' | 'signup' }) => {
  return (
    <div
      style={{
        marginTop: '7.5rem',
      }}
    >
      {type === 'login' ? (
        <AuthLoader authRoute='login' />
      ) : (
        <AuthLoader authRoute='signup' />
      )}
    </div>
  );
};

export default Authentication;
