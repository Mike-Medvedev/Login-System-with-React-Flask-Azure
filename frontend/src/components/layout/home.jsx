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
import DataTable from './data-table';
import Welcome from './welcome';
export default function Home() {
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
    <>
      <div className="flex flex-col w-full h-full p-3 gap-2 bg-slate-200">
        <Welcome />
        <div className="h-2/3">
          <DataTable />
        </div>

        {/* <div className="flex justify-evenly">
          <div>
            <Button
              onClick={() => {
                setText('Creating new record');
                setOperation('CREATE');
              }}>
              Create
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                setOperation('READ');
                setText('Reading all records');
              }}>
              Read
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                setOperation('UPDATE');
                setText('Updating Selected record');
              }}>
              Update
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                setOperation('DELETE');
                setText('Deleting selected record');
                if (scrollRef.current) {
                  scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }
              }}>
              Delete
            </Button>
          </div>
        </div>
        <div className=" text-center text-2xl font-bold">
          Select a <strong>CRUD</strong> operation and then click submit
        </div> */}
        <Crud
          operation={operation}
          text={text}
          selectedGuitarId={selectedGuitarId}
          setData={setGuitars}
          scrollRef={scrollRef}
        />
        {/* <div className={`flex flex-col ${isHidden && 'hidden'} `}>
          <div className="flash-text text-green-600 text-2xl font-bold">Creating new record</div>
          <div className="flex border-2 border-black rounded-md p-1">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex gap-2 justify-around w-full p-2">
              <div>
                <Label>Brand: </Label>
                <Input {...register('brand')}></Input>
              </div>
              <div>
                <Label>Model: </Label>
                <Input {...register('model')}></Input>
              </div>
              <div>
                <Label>Color: </Label>
                <Input {...register('color')}></Input>
              </div>
              <div>
                <Label>Year: </Label>
                <Input type="number" {...register('year')}></Input>
              </div>
              <div className="flex flex-col justify-end">
                <Button>Submit</Button>
              </div>
            </form>
          </div>
        </div> */}
      </div>
    </>
  );
}
