import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseList: [],
  filteredKey: "",
  filteredCourse: {},
};

const temporarySlice = createSlice({
  name: "temporarySlice",
  initialState,
  reducers: {
    addCourse: (state: any, action) => {
      state.courseList = [...state.courseList, action.payload];
    },
    filterCourse: (state: any, action) => {
      state.filteredCourse = action.payload;
    },
    deleteCourse: (state: any, action) => {
      state.courseList = state.courseList.filter((item: any) => {
        return item.id !== action.payload;
      });
    },
    upCourse: (state: any, action) => {
      state.courseList = [...state.courseList];
      const i = state.courseList.findIndex(
        (item: any) => item.id === action.payload.id
      );
      if (i > 0) {
        let temp = state.courseList[i];
        state.courseList[i] = state.courseList[i - 1];
        state.courseList[i - 1] = temp;
      } else {
        alert("첫 번째 코스입니다.");
      }
    },
    downCourse: (state: any, action) => {
      state.courseList = [...state.courseList];
      const i = state.courseList.findIndex(
        (item: any) => item.id === action.payload.id
      );
      if (i + 1 < state.courseList.length) {
        let temp = state.courseList[i];
        state.courseList[i] = state.courseList[i + 1];
        state.courseList[i + 1] = temp;
      } else {
        alert("마지막 코스입니다.");
      }
    },
    editMemo: (state: any, action) => {
      state.courseList = [...state.courseList];
      const i = state.courseList.findIndex(
        (item: any) => item.id === action.payload.id
      );
      state.courseList[i].memo = action.payload.memo;
    },
    deleteMemo: (state: any, action) => {
      state.courseList = [...state.courseList];
      const i = state.courseList.findIndex(
        (item: any) => item.id === action.payload
      );
      state.courseList[i].memo = "";
    },
  },
});

export const {
  addCourse,
  deleteCourse,
  filterCourse,
  upCourse,
  downCourse,
  editMemo,
  deleteMemo,
} = temporarySlice.actions;
export default temporarySlice.reducer;
