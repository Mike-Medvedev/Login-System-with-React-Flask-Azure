import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '@/state/slices/authSlice';
import { useLoaderData } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useForm } from 'react-hook-form';
export default function Home() {
  const dispatch = useDispatch();
  const { user_data, guitar_data } = useLoaderData();
  const [guitars, setGuitars] = useState(guitar_data.data);
  const [isHidden, setisHidden] = useState(false);
  const [currId, setCurrId] = useState(null);
  const [selected, isSelected] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const scrollRef = useRef(null);
  const rowRef = useRef(null);

  async function onSubmit(data, event) {
    console.log(data);

    const response = await fetch('http://localhost:5000/create', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const refetch = await fetch('http://127.0.0.1:5000/guitars', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      const result = await refetch.json();
      setGuitars(result.data);
    }
  }

  async function deleteGuitar() {}

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
            <tbody className="">
              {guitars.map((innerGuitarArray, index) => (
                <tr
                  key={index}
                  // className={rowRef.current=== index && 'bg-slate-200'}
                  ref={rowRef}>
                  {innerGuitarArray.map((guitarField, innerIndex) => (
                    <td
                      className="text-center cursor-pointer focus:bg-slate-500"
                      key={`${innerIndex}-${index}`}>
                      {guitarField}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {/* <div className="flex flex-col justify-around gap-4  overflow-auto">
            {guitars.map((innerGuitarArray, index) => (
              <div className="flex flex-row w-full gap-4 justify-around">
                {innerGuitarArray.map((guitarField, innerIndex) => (
                  <div className="cursor-pointer focus:bg-slate-500" key={`${innerIndex}-${index}`}>
                    {guitarField}
                  </div>
                ))}
              </div>
            ))}
          </div> */}
        </div>
        <div className="flex justify-evenly">
          <div>
            <Button
              onClick={() => {
                setisHidden(prev => !prev);
              }}>
              Create
            </Button>
          </div>
          <div>
            <Button>Read</Button>
          </div>
          <div>
            <Button
              onClick={() => {
                setisHidden(prev => !prev);
              }}>
              Update
            </Button>
          </div>
          <div>
            <Button
              onClick={e => {
                // deleteGuitar(id);
                setGuitars(prev => prev.slice(0, -1));
                if (scrollRef.current) {
                  scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }
              }}>
              Delete
            </Button>
          </div>
        </div>
        <div className={`flex border-2 border-black rounded-md p-1 ${isHidden && 'hidden'}`}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 justify-around w-full p-2">
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
      </div>
    </>
  );
}
