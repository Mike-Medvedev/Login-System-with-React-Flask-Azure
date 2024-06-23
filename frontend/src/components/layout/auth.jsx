import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { KeyRound } from 'lucide-react';
import { Label } from '../ui/label';
import { useSelector } from 'react-redux';
import LoadingSpinner from './loadingSpinner';

/**
 * @description Child component of App.jsx which takes props
 * to specify whether its a sign up and login component
 *
 * @param {function} onSubmit determines whether submission button
 * does a Login or Signup
 * @param {string} buttonText determines whether button says login or signup
 * @param {string} linkText determines whether link is signups
 * or navigates back to login
 * @param {function} setSignup setter function for boolean isSignup
 * is user currently signing up or logging in?
 */

const AuthForm = ({ onSubmit, buttonText, linkText, setSignup }) => {
  const isAuth = useSelector(store => store.auth.isAuth);

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
