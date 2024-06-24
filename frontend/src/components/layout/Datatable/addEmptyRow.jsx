import { CircleFadingPlus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addNewRow } from '@/state/slices/dataTableSlice';
export default function AddEmptyRow() {
  const dispatch = useDispatch();

  return (
    <div
      className="w-full cursor-pointer flex justify-center text-2xl border-dashed border-2 border-blue-gray-400 mt-2 p-2 bg-blue-gray-100 hover:bg-blue-gray-200"
      onClick={() => {
        dispatch(addNewRow());
      }}>
      <CircleFadingPlus size={38} color="#333333" />
    </div>
  );
}
