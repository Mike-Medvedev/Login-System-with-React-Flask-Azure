import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { KeyRound } from 'lucide-react';
import { Label } from '../ui/label';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '@/state/slices/authSlice';
import LoadingSpinner from './loadingSpinner';

const AuthForm = ({ onSubmit, buttonText, linkText, setSignup }) => {
  const isAuth = useSelector(store => store.auth.isAuth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return isAuth ? (
    <LoadingSpinner />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 place-items-center">
      <div>
        <Label htmlFor="username">Username: </Label>
        <Input
          className={`${errors.username?.type && 'border-red-600'} border-black`}
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
          className={`${errors.password?.type && 'border-red-600'} border-black`}
          type="password"
          {...register('password', { required: 'Password required' })}
          placeholder="Enter password"
        />
        {errors.password?.type === 'required' && (
          <p className="text-red-500" role="alert">
            Password is required
          </p>
        )}
      </div>
      <div className="flex gap-2">
        <Button type="submit">
          <KeyRound className="mr-2" /> {buttonText}
        </Button>
        <Button onClick={() => setSignup(prev => !prev)} type="button">
          <KeyRound className="mr-2" /> {linkText}
        </Button>
      </div>
    </form>
  );
};

export default AuthForm;
