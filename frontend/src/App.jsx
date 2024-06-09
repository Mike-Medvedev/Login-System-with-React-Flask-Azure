import { useState } from 'react';
import './App.css';
import Login from '=/login';
import Test from '=/test';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const env = import.meta.env.VITE_APP_ENV;

  return (
    <>
      {env === 'test' ? <Test /> : <Login />}
      <Toaster />{' '}
    </>
  );
}

export default App;
