import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/state/slices/authSlice';
import { useLoaderData } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import Crud from './crud';
import { CircleFadingPlus, SquarePen, Trash2, Check, X } from 'lucide-react';
import TableHeader from './Datatable/tableHeader';
import TableBody from './Datatable/tableBody';
import AddEmptyRow from './Datatable/addEmptyRow';
import store from '@/state/store';
import { setDataSource } from '@/state/slices/dataTableSlice';

export default function DataTable() {
  const { guitar_data } = useLoaderData();
  const dispatch = useDispatch();
  const dataSource = useSelector(store => store.dataTable.dataSource);

  const [operation, setOperation] = useState('');
  const [guitars, setGuitars] = useState(guitar_data.data);
  const [selectedGuitarId, setSelectedGuitarId] = useState(null);

  const [editModeIndex, setEditModeIndex] = useState(null);
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [shouldJiggle, setShouldJiggle] = useState(false);

  useEffect(() => {
    dispatch(setDataSource(guitar_data.data));
  }, []);

  const scrollRef = useRef(null);
  return (
    <div
      ref={scrollRef}
      className="flex flex-col align-items-center border-2 h-full border-transparent rounded-md p-1 overflow-y-scroll relative bg-slate-300">
      <div className="flex flex-col gap-2">
        <TableHeader />
        <div className="grid row-auto gap-4 ">
          <TableBody data={dataSource} />
        </div>
      </div>

      <AddEmptyRow />
    </div>
  );
}
