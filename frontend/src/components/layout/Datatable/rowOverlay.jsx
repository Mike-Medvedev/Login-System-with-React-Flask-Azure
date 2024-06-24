import { SquarePen, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setRowState, deleteSelectedRow } from '@/state/slices/dataTableSlice';
import { useCallback } from 'react';
export default function RowOverlay({ index, cssHidden }) {
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(setRowState(index));
  }, [dispatch, index]);

  return (
    <div className={`delete-overlay ${cssHidden}`}>
      <div className="flex gap-9">
        <div className="flex justify-center">
          <SquarePen
            className="cursor-pointer jiggle"
            size={30}
            onClick={handleClick}
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
