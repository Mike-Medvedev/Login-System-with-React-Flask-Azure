import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
const useLogin = signup => {
  const { toast, dismiss } = useToast();
  const [loginStatus, setLoginStatus] = useState(null);
  const [is409, setIs409] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (loginStatus !== null) {
      const variant = loginStatus ? 'success' : 'destructive';
      const status = signup
        ? loginStatus
          ? 'Sign Up Success'
          : `Sign Up Failed ${is409 && 'Username taken please use another one'}`
        : loginStatus
        ? 'Login Success'
        : 'Login Failed';
      const t = toast({
        className: cn('top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'),
        variant: variant,
        title: status,
      });
      setTimeout(() => {
        dismiss(t.id);
      }, 4000);

      if (loginStatus && !signup) navigate('/home');
    }
    setLoginStatus(null);
    setIs409(null);
  }, [loginStatus, signup]);

  const handleLogin = async form => {
    const options = {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'content-type': 'application/json',
      },
    };
    try {
      const response = await fetch('http://127.0.0.1:5000/login', options);
      const result = await response.json();

      console.log(response.ok);

      if (response.ok) {
        console.log(result.access_token);
        localStorage.setItem('access_token', result.access_token);
        setLoginStatus(true);
      } else {
        setLoginStatus(false);
      }
    } catch (error) {
      console.error(error);
      setLoginStatus(false);
    }
  };

  const handleSignup = async form => {
    const options = {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'content-type': 'application/json',
      },
    };
    try {
      const response = await fetch('http://127.0.0.1:5000/signup', options);
      if (response.ok) {
        setLoginStatus(true);
      } else if (response.status == 409) {
        setIs409(true);
        setLoginStatus(false);
      } else {
        setLoginStatus(false);
      }
    } catch (error) {
      console.error(error);
      setLoginStatus(false);
    }
  };

  return { handleLogin, handleSignup };
};

export default useLogin;
