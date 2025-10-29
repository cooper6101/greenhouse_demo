import { Route, Routes } from 'react-router-dom';

import Authentication from '../scenes/Auth';
import Logout from '../scenes/Auth/Logout';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route index element={<Authentication type='signup' />} />
      <Route path='/login/*' element={<Authentication type='login' />} />
      <Route path='/logout/*' element={<Logout />} />
      <Route path='/register/*' element={<Authentication type='signup' />} />
      <Route path='*' element={<Authentication type='signup' />} />
    </Routes>
  );
};

const AuthLayout = () => {
  return (
    <div
      className='flex h-full flex-1 bg-slate-50'
      style={{
        height: '100vh',
      }}
    >
      <div className='flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full align-middle'>
          <AuthRoutes />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
