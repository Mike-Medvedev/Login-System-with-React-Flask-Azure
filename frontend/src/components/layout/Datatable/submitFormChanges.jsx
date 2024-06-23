import { Check, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { updateSelectedRow, seteditModeBooleanArray } from '@/state/slices/dataTableSlice';
export default function SubmitFormChanges({ index, setIsSubmitted }) {
  const [shouldJiggle, setShouldJiggle] = useState(false);
  const dispatch = useDispatch();
  const editModeBooleanArray = useSelector(store => store.dataTable.editModeBooleanArray);

  const {
    formState: { errors },
  } = useForm();

  function handleFormSubmit() {
    setShouldJiggle(prev => !prev);
    setIsSubmitted(prev => !prev);
    dispatch(updateSelectedRow(index));
  }

  return (
    <div
      className={`flex justify-center gap-2 bg-slate-300 ${
        editModeBooleanArray[index] ? '' : 'hidden'
      }`}>
      <div className="text-gray-400 italic">Accept Changes?</div>
      <Check
        className={`cursor-pointer ${errors[`year-${index}`] && shouldJiggle ? 'jiggle' : ''}`}
        onClick={handleFormSubmit}
        color="green"
      />
      <X
        color="red"
        className="cursor-pointer"
        onClick={() => dispatch(seteditModeBooleanArray(index))}
      />
    </div>
  );
}
