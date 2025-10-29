import { useLogoutFunction } from '@propelauth/react';
import { useEffect } from 'react';

import Overlay from '../../components/Overlay';

const Logout = () => {
  const logout = useLogoutFunction();

  useEffect(() => {
    logout(true);
  }, [logout]);

  return <Overlay />;
};

export default Logout;
