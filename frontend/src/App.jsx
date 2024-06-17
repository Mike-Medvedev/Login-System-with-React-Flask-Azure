import { useState } from 'react';
import reactLogo from '@/assets/react.svg';
import './App.css';
import AuthForm from './components/layout/auth';
import useLogin from '@/hooks/useLogin';

export default function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [signUp, setSignup] = useState(false);
  const { handleLogin, handleSignup } = useLogin(signUp);

  function onSubmit(data, e) {
    console.log('yo', data, e);

    signUp ? handleSignup(data) : handleLogin(data);
    setIsSubmitted(true); // Optionally set a submitted state
  }

  return (
    <div className=" min-w-fit md:w-1/3 lg:w-2/6 xl:w-1/4 xl:h-3/6 flex flex-col gap-2 justify-evenly place-items-center border-2 p-3 border-gray-800 rounded-lg overflow-hidden">
      <div>
        <img src={reactLogo} className={`h-20 p-2 ${isSubmitted && 'logo'}`} alt="React logo" />
      </div>
      {!signUp ? <h2 className="text-3xl">Login In</h2> : <h2 className="text-3xl">Sign Up</h2>}
      <div>
        <AuthForm
          onSubmit={onSubmit}
          buttonText={signUp ? 'Signup' : 'Login'}
          linkText={signUp ? 'Back' : 'Signup'}
          setSignup={setSignup}
        />
      </div>
    </div>
  );
}
