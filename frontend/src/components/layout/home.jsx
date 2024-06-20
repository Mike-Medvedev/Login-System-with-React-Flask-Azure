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
export default function Home() {
  const dispatch = useDispatch();
  const { user_data, guitar_data } = useLoaderData();
  const [operation, setOperation] = useState('');
  const [guitars, setGuitars] = useState(guitar_data.data);
  const [selectedGuitarId, setSelectedGuitarId] = useState(null);
  const [text, setText] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const scrollRef = useRef(null);

  return (
    <>
      <div className="flex flex-col w-full h-full p-3 gap-2">
        <div className="flex justify-center border-2 border-black rounded-md p-1">
          <div>
            <Link to={'/'}>
              <Button
                onClick={() => {
                  dispatch(logout());
                }}>
                Logout
              </Button>
            </Link>
          </div>
        </div>
        <div
          ref={scrollRef}
          className="flex flex-col align-items-center border-2 h-2/3 border-black rounded-md p-1 overflow-y-scroll relative">
          <div className="text-center p-3 text-xl font-serif font-bold">
            Welcome {user_data.message}
          </div>
          <div className="flex gap-4 w-full justify-around"></div>

          <table>
            <thead>
              <tr>
                <th className="text-xl font-serif font-bold">Brand</th>
                <th className="text-xl font-serif font-bold">Model</th>
                <th className="text-xl font-serif font-bold">Color</th>
                <th className="text-xl font-serif font-bold">Year</th>
              </tr>
            </thead>
            <tbody>
              {guitars.map((innerGuitarArray, index) => {
                return (
                  <tr
                    key={index}
                    id={innerGuitarArray[0]}
                    className={selectedGuitarId === innerGuitarArray[0] ? 'bg-slate-200' : ''}
                    onClick={() => setSelectedGuitarId(innerGuitarArray[0])}>
                    {innerGuitarArray.slice(1).map((guitarField, innerIndex) => (
                      <td
                        className="text-center cursor-pointer focus:bg-slate-500"
                        key={`${innerIndex}-${index}`}>
                        {/* <input placeholder={guitarField} className="placeholder:text-black" /> */}
                        {guitarField}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex justify-evenly">
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
            <Button onClick={() => setOperation('READ')}>Read</Button>
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
                // deleteGuitar(id);
                // setGuitars(prev => prev.slice(0, -1));
                if (scrollRef.current) {
                  scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }
              }}>
              Delete
            </Button>
          </div>
        </div>
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
