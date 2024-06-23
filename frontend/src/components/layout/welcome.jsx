import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '@/state/slices/authSlice';
import { useLoaderData } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useForm } from 'react-hook-form';
import Crud from './crud';
import { CircleFadingPlus, SquarePen, Trash2 } from 'lucide-react';
export default function Welcome() {
  const dispatch = useDispatch();
  const { user_data, guitar_data } = useLoaderData();
  const [operation, setOperation] = useState('');
  const [guitars, setGuitars] = useState(guitar_data.data);
  const [selectedGuitarId, setSelectedGuitarId] = useState(null);
  const [text, setText] = useState('');
  const [editModeIndex, setEditModeIndex] = useState(null);
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const scrollRef = useRef(null);
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
