import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
const useLogin = () => {
  const { toast } = useToast();
  const [loginStatus, setLoginStatus] = useState(null);

  useEffect(() => {
    if (loginStatus == true) {
      toast({
        variant: 'success',
        title: '',
        description: 'Login Success!',
      });
    }
    if (loginStatus == false) {
      toast({
        variant: 'destructive',
        title: '',
        description: 'Login Failed!',
      });
    }
    setLoginStatus(null);
  }, [loginStatus]);

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
      setLoginStatus(true);
    } catch (error) {
      console.error(error);
      setLoginStatus(false);
    }
  };

  return { handleLogin };
};

export default useLogin;
