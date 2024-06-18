import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '@/state/slices/authSlice';
export default function Home() {
  const dispatch = useDispatch();

  return (
    <>
      <div>Hello</div>
      <Link to={'/'}>
        <Button
          onClick={() => {
            dispatch(logout());
          }}>
          Logout
        </Button>
      </Link>
    </>
  );
}
