import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import TableHeader from './Datatable/tableHeader';
import TableBody from './Datatable/tableBody';
import AddEmptyRow from './Datatable/addEmptyRow';
import { setDataSource } from '@/state/slices/dataTableSlice';
import FormSubmission from './Datatable/formSubmission';

/**
 * @description Parent component of all data-table components
 * @returns Data-table that contains rows of [brand, model, color ,year]
 */
export default function DataTable() {
  const { guitar_data } = useLoaderData();
  const dispatch = useDispatch();
  const dataSource = useSelector(store => store.dataTable.dataSource);

  useEffect(() => {
    dispatch(setDataSource(guitar_data.data));
  }, []);

  const scrollRef = useRef(null);
  return (
    <>
      <div
        ref={scrollRef}
        className="flex flex-col align-items-center border-2 h-full border-transparent rounded-md p-1 overflow-y-scroll relative bg-slate-300">
        <div className="flex flex-col gap-2">
          <TableHeader />
          <div className="grid row-auto gap-8 ">
            <TableBody data={dataSource} />
          </div>
        </div>
        ``
        <AddEmptyRow />
      </div>
      <FormSubmission />
    </>
  );
}
