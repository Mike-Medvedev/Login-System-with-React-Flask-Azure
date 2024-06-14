import React, { useState, useEffect } from 'react';
import reactLogo from '../../assets/react.svg';
import '../../App.css';
import { Button } from '@/components/ui/button';
import { KeyRound } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useLogin from '../../hooks/useLogin.js';

export default function Login() {
  const [isSubmitted, setisSubmitted] = useState(false);
  const [form, setForm] = useState({});
  const [data, setData] = useState([]);
  const { handleLogin } = useLogin();

  // useEffect(() => {
  //   console.log(form);
  // }, [form]);

  function handleInput(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div className=" w-2/3 md:w-1/3 lg:w-2/6 xl:w-1/4  xl:h-3/6 flex flex-col gap-2 justify-evenly place-items-center  border-2 p-3 border-gray-800 rounded-lg overflow-hidden">
      <div className="">
        <img src={reactLogo} className={`h-20 p-2 ${isSubmitted && 'logo'}`} alt="React logo" />
      </div>
      <div>
        <Label htmlFor="name">Username: </Label>
        <Input type="text" name="username" placeholder="Enter username" onChange={handleInput} />
      </div>
      <div>
        <Label htmlFor="pass">Password: </Label>
        <Input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handleInput}
        />
      </div>
      <div className="">
        <Button
          onClick={() => {
            handleLogin(form);
          }}>
          <KeyRound className="mr-2" /> Login
        </Button>
      </div>
    </div>
  );
}
