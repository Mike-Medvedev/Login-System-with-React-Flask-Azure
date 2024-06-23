import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '@/state/slices/authSlice';
import { useLoaderData } from 'react-router-dom';
export default function Welcome() {
  const dispatch = useDispatch();
  const { user_data } = useLoaderData();

  return (
    <div className="flex border-bottom-2 border-b-2 border-slate-700 p-1 relative">
      <div className="">
        <Link to={'/'}>
          <Button
            onClick={() => {
              dispatch(logout());
            }}>
            Logout
          </Button>
        </Link>
      </div>
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="text-center text-xl  font-bold">Welcome {user_data.message}</div>
      </div>
    </div>
  );
}
