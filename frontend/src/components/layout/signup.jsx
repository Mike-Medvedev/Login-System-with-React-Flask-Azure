import React, { useState } from 'react';
import '../../App.css';
import useLogin from '../../hooks/useLogin.js';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { KeyRound } from 'lucide-react';

export default function Signup() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { handleLogin } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data, e) {
    console.log('yo', data, e);
    handleLogin(data);
    setIsSubmitted(true); // Optionally set a submitted state
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 place-items-center">
      <div>
        <Label htmlFor="username">Username: </Label>
        <Input
          className={errors.username?.type && 'border-red-600'}
          {...register('username', { required: 'Username required' })}
          type="text"
          placeholder="Enter username"
        />
        {errors.username?.type === 'required' && (
          <p className="text-red-500" role="alert">
            Username is required
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="password">Password: </Label>
        <Input
          className={errors.password?.type && 'border-red-600'}
          type="password"
          {...register('password', { required: true })}
          placeholder="Enter password"
        />
        {errors.password?.type === 'required' && (
          <p className="text-red-500" role="alert">
            Password is required
          </p>
        )}
      </div>
      <div className="flex gap-2">
        <div className="flex gap-2">
          <Button type="submit">
            <KeyRound className="mr-2" /> Submit
          </Button>
          <Link to={'/'}>
            <Button>Back</Button>
          </Link>
        </div>
      </div>
    </form>
  );
}
