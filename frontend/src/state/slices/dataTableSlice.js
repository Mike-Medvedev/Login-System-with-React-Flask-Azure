import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rowState: [],
  dataSource: [],
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
      state.dataSource = action.payload; // Correctly modify the draft state
    },
    deleteSelectedRow: (state, action) => {
      const index = action.payload;
      state.dataSource = state.dataSource.filter(
        innerElement => state.dataSource.indexOf(innerElement) != index,
      );
    },
    addSelectedRow: (state, action) => {
      const lastId =
        state.dataSource.length > 0 ? state.dataSource[state.dataSource.length - 1][0] + 1 : 1;
      state.dataSource.push([lastId, '', '', '', 0]);
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
  },
});

export const { setDataSource, setRowState, deleteSelectedRow, addSelectedRow, updateSelectedRow } =
  dataTableSlice.actions;

export default dataTableSlice.reducer;
