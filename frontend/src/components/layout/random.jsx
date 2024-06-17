import React, { useState, useReducer, act, useRef } from 'react';
import reactLogo from '../../assets/react.svg';
import '../../App.css';
import { Button } from '@/components/ui/button';
import { KeyRound } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useLogin from '../../hooks/useLogin.js';
import { Outlet, Link } from 'react-router-dom';
import store from '@/state/store';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, incrementAmount, incrementAsync } from '@/state/slices/counterSlice';
import { useForm } from 'react-hook-form';

const countState = {
  value: 0,
};

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

function reducer(countState, action) {
  switch (action) {
    case INCREMENT: {
      return { ...countState, value: countState.value + 1 };
    }

    case DECREMENT: {
      return { ...countState, value: countState.value - 1 };
    }

    default:
      return countState;
  }
}

export default function Login() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { handleLogin } = useLogin();
  // const [state, dispatch] = useReducer(reducer, countState);
  const count = useSelector(store => store.counter.value);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const inputRef = useRef(null);

  function onSubmit(data, e) {
    console.log('yo', data, e);
    handleLogin(data);
    setIsSubmitted(true); // Optionally set a submitted state
  }

  return (
    <div className=" min-w-fit md:w-1/3 lg:w-2/6 xl:w-1/4 xl:h-3/6 flex flex-col gap-2 justify-evenly place-items-center border-2 p-3 border-gray-800 rounded-lg overflow-hidden">
      <div>
        <img src={reactLogo} className={`h-20 p-2 ${isSubmitted && 'logo'}`} alt="React logo" />
      </div>
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
              <KeyRound className="mr-2" /> Login
            </Button>
            <Link to={'signup'}>
              <Button type="button">
                <KeyRound className="mr-2" /> Signup
              </Button>
            </Link>
          </div>
        </div>
      </form>
      <div className="flex gap-2">
        <Link className="border-2 border-blue-200 p-2" to={'test/1'}>
          Go to test 1
        </Link>
        <Link className="border-2 border-blue-200 p-2" to={'test/2'}>
          Go to test 2
        </Link>
        <Link className="border-2 border-blue-200 p-2" to={'/'}>
          Go back
        </Link>
        <Button onClick={() => inputRef.current.focus()}>
          Click this button to focus username form
        </Button>
        <Button onClick={() => dispatch(increment())}>+</Button>
        <Button onClick={() => dispatch(decrement())}>-</Button>
        <Button onClick={() => dispatch(incrementAmount(5))}>Increment by amount</Button>
        <Button onClick={() => dispatch(incrementAsync(10))}>Increment async</Button>
      </div>
      <div>{count}</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
