import { useState } from 'react';
import RowOverlay from './rowOverlay';
import SubmitFormChanges from './submitFormChanges';
import EditModeForm from './editModeForm';
import { useSelector, useDispatch } from 'react-redux';
import { setRowState } from '@/state/slices/dataTableSlice';
import { useForm } from 'react-hook-form';
export default function TableBody({ data }) {
  const dispatch = useDispatch();
  const rowState = useSelector(store => store.dataTable.rowState);
  // const [rowState, setRowState] = useState([]);
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  function renderEditModeSubmission(index) {
    if (rowState[index]) {
      return <SubmitFormChanges index={index} setIsSubmitted={setIsSubmitted} />;
    } else {
      return <></>;
    }
  }

  function renderEditModeForm(innerGuitarArray, index) {
    if (rowState[index]) {
      return (
        <EditModeForm index={index} innerGuitarArray={innerGuitarArray} isSubmitted={isSubmitted} />
      );
    } else {
      return (
        <>
          <div>{innerGuitarArray[1]}</div>
          <div>{innerGuitarArray[2]}</div>
          <div>{innerGuitarArray[3]}</div>
          <div>{innerGuitarArray[4]}</div>
        </>
      );
    }
  }

  return (
    <>
      {data.map((innerGuitarArray, index) => {
        return (
          <div key={index}>
            {renderEditModeSubmission(index)}
            <div
              id="mainrow"
              className={` relative grid grid-cols-4 gap-x-8 p-3 rounded-md text-center shadow-md ${
                hoveredRowIndex === index && !rowState[index] ? 'hovered' : ''
              } `}
              onMouseOver={() => setHoveredRowIndex(index)}
              onMouseLeave={() => setHoveredRowIndex(null)}>
              <RowOverlay index={index} />

              {renderEditModeForm(innerGuitarArray, index)}
            </div>
          </div>
        );
      })}
    </>
  );
}
