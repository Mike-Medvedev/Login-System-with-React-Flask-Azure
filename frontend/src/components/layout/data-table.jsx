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
import { CircleFadingPlus, SquarePen, Trash2, Check, X } from 'lucide-react';

export default function DataTable() {
  const dispatch = useDispatch();
  const { user_data, guitar_data } = useLoaderData();
  const [operation, setOperation] = useState('');
  const [guitars, setGuitars] = useState(guitar_data.data);
  const [selectedGuitarId, setSelectedGuitarId] = useState(null);
  const [text, setText] = useState('');
  const [editModeIndex, setEditModeIndex] = useState(null);
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [divState, setDivState] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  function toggleEditMode(index) {
    setDivState(prev => ({
      ...prev,
      [index]: { ...prev[index], editMode: !prev[index]?.editMode },
    }));
  }

  const onSubmit = (data, index) => {
    setGuitars(prev => {
      const updatedGuitars = [...prev];

      // replacing 4 items in array starting from index 1
      const spliced = updatedGuitars[index].toSpliced(
        1,
        4,
        data[`brand-${index}`],
        data[`model-${index}`],
        data[`color-${index}`],
        data[`year-${index}`],
      );
      updatedGuitars[index] = spliced;
      return updatedGuitars;
    });

    console.log('printing', data);
  };

  const scrollRef = useRef(null);
  return (
    <div
      ref={scrollRef}
      className="flex flex-col align-items-center border-2 h-full border-black rounded-md p-1 overflow-y-scroll relative">
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-4 p-3 ">
          <div className="text-xl text-center font-serif font-bold">Brand</div>
          <div className="text-xl font-serif text-center font-bold">Model</div>
          <div className="text-xl font-serif text-center font-bold">Color</div>
          <div className="text-xl font-serif text-center font-bold">Year</div>
        </div>
        <div className="grid row-auto gap-4 ">
          {guitars.map((innerGuitarArray, index) => {
            return (
              <div key={index}>
                <div
                  className={`flex justify-center gap-2  ${
                    divState[index]?.editMode ? '' : 'hidden'
                  }`}>
                  <div className="text-gray-400 italic">Accept Changes?</div>
                  <Check
                    className="cursor-pointer"
                    onClick={handleSubmit(data => {
                      onSubmit(data, index);
                      toggleEditMode(index);
                    })}
                    color="green"
                  />
                  <X color="red" className="cursor-pointer" onClick={() => toggleEditMode(index)} />
                </div>
                <div
                  id={`row-${innerGuitarArray[0]}`}
                  className={` relative grid grid-cols-4 gap-x-8 p-3 border-2 border-black rounded-md ${
                    selectedGuitarId === innerGuitarArray[0] ? 'bg-slate-200' : ''
                  }${hoveredRowIndex === index && !divState[index]?.editMode ? 'hovered' : ''} `}
                  onMouseOver={() => setHoveredRowIndex(index)}
                  onMouseLeave={() => setHoveredRowIndex(null)}>
                  <div className="delete-overlay">
                    <div className="flex gap-9">
                      <div className="flex justify-center">
                        <SquarePen
                          className="cursor-pointer jiggle"
                          size={30}
                          onClick={() => toggleEditMode(index)}
                          color="#FAF9F6"
                        />
                      </div>
                      <div>
                        <Trash2
                          className="cursor-pointer jiggle"
                          size={30}
                          color="#FAF9F6"
                          onClick={() => {
                            setGuitars(prev => {
                              const filterArray = prev.filter(
                                inner => prev.indexOf(inner) !== index,
                              );
                              console.log(index);

                              console.log(filterArray);
                              return filterArray;
                            });
                            // if (scrollRef.current) {
                            //   scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                            // }
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {divState[index]?.editMode ? (
                    <>
                      <Input
                        {...register(`brand-${index}`, { value: innerGuitarArray[1] })}
                        placeholder="Enter brand"
                      />
                      <Input
                        {...register(`model-${index}`, { value: innerGuitarArray[2] })}
                        placeholder="Enter model"
                      />
                      <Input
                        {...register(`color-${index}`, { value: innerGuitarArray[3] })}
                        placeholder="Enter color"
                      />
                      <Input
                        type="number"
                        {...register(`year-${index}`, {
                          required: true,
                          value: innerGuitarArray[4],
                        })}
                        placeholder="Enter year"
                        className={`${errors[`year-${index}`] && 'bg-red-400'} `}
                      />
                    </>
                  ) : (
                    <>
                      <div>{innerGuitarArray[1]}</div>
                      <div>{innerGuitarArray[2]}</div>
                      <div>{innerGuitarArray[3]}</div>
                      <div>{innerGuitarArray[4]}</div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="w-full cursor-pointer flex justify-center text-2xl border-dashed border-2 border-gray-400 mt-2 p-2"
        onClick={() => {
          setText('Creating new record');
          setOperation('CREATE');
          setGuitars(prev => {
            //set the id of the new guitar entry to 1 + last guitars id
            const lastId = prev.length > 0 ? prev[prev.length - 1][0] : 0;
            const newArray = [lastId + 1, '', '', '', 0];
            return [...prev, newArray];
          });
        }}>
        <CircleFadingPlus size={38} color="#808080" />
      </div>
    </div>
  );
}
