import { Input } from '@/components/ui/input';
import { updateSelectedRow, setRowState, addChanges } from '@/state/slices/dataTableSlice';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Check, X } from 'lucide-react';

export default function EditModeForm({ index, innerGuitarArray, setHoveredRowIndex }) {
  const dispatch = useDispatch();
  const [shouldJiggle, setShouldJiggle] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(formData) {
    console.log(formData);
    dispatch(updateSelectedRow({ index, data: formData }));
    dispatch(addChanges({ data: formData, index: index }));
    dispatch(setRowState(index));
    setHoveredRowIndex(null);
  }

  return (
    <>
      <div className="flex justify-center gap-2 absolute left-1/2 top-[-1.5rem] transform -translate-x-1/2 ">
        <div className="text-gray-400 italic text-nowrap">Accept Changes?</div>
        <Check
          className={`cursor-pointer ${errors[`year-${index}`] && shouldJiggle ? 'jiggle' : ''}`}
          onClick={handleSubmit(onSubmit)}
          color="green"
        />
        <X
          color="red"
          className="cursor-pointer"
          onClick={() => {
            dispatch(setRowState(index));
          }}
        />
      </div>

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
        className={`${errors[`year-${index}`] ? 'bg-red-400' : ''}`}
      />
    </>
  );
}
