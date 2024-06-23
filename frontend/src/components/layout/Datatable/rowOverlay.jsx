import { SquarePen, Trash2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { setRowState, setDataSource, deleteSelectedRow } from '@/state/slices/dataTableSlice';
export default function RowOverlay({ index }) {
  const dispatch = useDispatch();
  const rowState = useSelector(store => store.dataTable.rowState);
  return (
    <div className="delete-overlay">
      <div className="flex gap-9">
        <div className="flex justify-center">
          <SquarePen
            className="cursor-pointer jiggle"
            size={30}
            onClick={() => dispatch(setRowState(index))}
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
              // if (scrollRef.current) {
              //   scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
              // }
            }}
          />
        </div>
      </div>
    </div>
  );
}
