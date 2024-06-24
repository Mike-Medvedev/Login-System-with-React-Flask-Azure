import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rowState: [],
  dataSource: [],
  changesToSubmit: {},
};

const dataTableSlice = createSlice({
  name: 'dataTable',
  initialState,
  reducers: {
    setRowState: (state, action) => {
      const index = action.payload;
      state.rowState[index] = !state.rowState[index];
    },
    setDataSource: (state, action) => {
      state.dataSource = action.payload;
    },
    deleteSelectedRow: (state, action) => {
      const index = action.payload;
      state.dataSource = state.dataSource.filter(
        innerElement => state.dataSource.indexOf(innerElement) != index,
      );
    },
    addNewRow: (state, action) => {
      state.dataSource.push([null, '', '', '', 0]);
      const temp = Date.now();
      state.changesToSubmit = {
        ...state.changesToSubmit,
        [temp]: {
          [`id-${temp}`]: null,
          [`brand-${temp}`]: '',
          [`model-${temp}`]: '',
          [`color-${temp}`]: '',
          [`year-${temp}`]: 0,
        },
      };
    },
    updateSelectedRow: (state, action) => {
      const { index, data } = action.payload;
      const updatedDataSource = state.dataSource.map((item, indexOfMapIteration) => {
        if (indexOfMapIteration === index) {
          const [id, brand, model, color, year] = item;
          return [
            id,
            data[`brand-${index}`] || brand,
            data[`model-${index}`] || model,
            data[`color-${index}`] || color,
            data[`year-${index}`] || year,
          ];
        }
        return item;
      });

      state.dataSource = updatedDataSource;
    },
    addChanges: (state, action) => {
      const { data, index } = action.payload;
      const id = state.dataSource[index][0];

      const newObj = {
        id: id,
        ...data,
      };

      state.changesToSubmit = {
        ...state.changesToSubmit,
        [index]: newObj,
      };
    },
    resetChanges: state => {
      state.changesToSubmit = {};
    },
  },
});

export const {
  setDataSource,
  setRowState,
  deleteSelectedRow,
  addNewRow,
  updateSelectedRow,
  addChanges,
  resetChanges,
} = dataTableSlice.actions;

export default dataTableSlice.reducer;
