import { Slice, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Employee } from '../interfaces/Employee.intf';

const initialState: Employee[] = []

const listEmployeesSlice:Slice = createSlice({
  name: 'formEmployee',
  initialState: initialState,
  reducers: {
    addEmployee: (state: Employee[], action: PayloadAction<Employee>) => {      
      state.push(action.payload)
      localStorage.setItem('employees', JSON.stringify(state))
    },

    initStore: (state: Employee[]) => {
      const data = localStorage.getItem('employees')
      const dataObject: Employee[] = data ? JSON.parse(data) : []

      return state = dataObject
    }
  },
});

const { addEmployee, initStore} = listEmployeesSlice.actions

export const listEmployeesActions = { addEmployee, initStore }

export default listEmployeesSlice