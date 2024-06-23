import { Input } from '@/components/ui/input';
import { updateSelectedRow, setRowState } from '@/state/slices/dataTableSlice';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

export default function EditModeForm({ index, innerGuitarArray, callback, isSubmitted }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    getValues,
  } = useForm();

  useEffect(() => {
    trigger();
    dispatch(updateSelectedRow({ index: index, data: getValues() }));
    dispatch(setRowState(index));
  }, [isSubmitted]);

  return (
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
  );
}
