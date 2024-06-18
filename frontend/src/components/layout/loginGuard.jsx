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
    dispatch(validateTokenAsync());
  }, [dispatch, isValidToken]);

  if (isValidatingToken) {
    return <LoadingSpinner />;
  } else if (isAuth && isValidToken) {
    return children;
  } else if (error) {
    return <Navigate to="/unauthorized" />;
  }
}
