import { SquarePen, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { seteditModeBooleanArray, deleteSelectedRow } from '@/state/slices/dataTableSlice';
export default function RowOverlay({ index }) {
  const dispatch = useDispatch();
  return (
    <div className="delete-overlay">
      <div className="flex gap-9">
        <div className="flex justify-center">
          <SquarePen
            className="cursor-pointer jiggle"
            size={30}
            onClick={() => dispatch(seteditModeBooleanArray(index))}
            color="#FAF9F6"
          />
        </div>
        <div>
          <Trash2
            className="cursor-pointer jiggle"
            size={30}
            color="#FAF9F6"
            onClick={() => {
              dispatch(deleteSelectedRow(index));
            }}
          />
        </div>
      </div>
    </div>
  );
}
