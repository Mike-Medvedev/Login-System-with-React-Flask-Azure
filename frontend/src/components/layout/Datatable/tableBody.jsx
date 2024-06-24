import { useState } from 'react';
import RowOverlay from './rowOverlay';
import EditModeForm from './editModeForm';
import { useSelector } from 'react-redux';
export default function TableBody({ data }) {
  const rowState = useSelector(store => store.dataTable.rowState);
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

  function renderEditModeForm(innerGuitarArray, index) {
    if (rowState[index]) {
      return (
        <EditModeForm
          index={index}
          innerGuitarArray={innerGuitarArray}
          setHoveredRowIndex={setHoveredRowIndex}
        />
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
            <div
              id="mainrow"
              className="relative grid grid-cols-4 gap-x-8 p-3 rounded-md text-center shadow-md"
              onMouseOver={() => {
                setHoveredRowIndex(index);
              }}
              onMouseLeave={() => {
                setHoveredRowIndex(null);
              }}>
              <RowOverlay
                index={index}
                cssHidden={
                  hoveredRowIndex === index && !rowState[index]
                    ? 'opacity-100 pointer-events-auto'
                    : 'opacity-0 pointer-events-none'
                }
              />

              {renderEditModeForm(innerGuitarArray, index)}
            </div>
          </div>
        );
      })}
    </>
  );
}
