import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { validateTokenAsync } from '@/state/thunks/validateTokenAsync';
import LoadingSpinner from './loadingSpinner';

export default function LoginGuard({ children }) {
  const isAuth = useSelector(store => store.auth.isAuth);
  const isValidToken = useSelector(store => store.auth.isValidToken);
  const isValidatingToken = useSelector(store => store.auth.isValidatingToken);
  const error = useSelector(store => store.auth.error);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('isValidToken: in effect', isValidToken);
    console.log('Dispatching token validation');
    dispatch(validateTokenAsync());
  }, []);

  console.log('isValidToken:', isValidToken);
  console.log(error);

  if (isValidatingToken) {
    return <LoadingSpinner />;
  }
  if (isValidToken) {
    return children;
  }
  if (error) {
    return <Navigate to={'/unauthorized'} />;
  } else {
    return <></>;
  }
}
