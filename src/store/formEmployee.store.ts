import { Slice, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FormEmployeeState } from '../interfaces/Employee.intf';

import StatesData from "../data/states.json"
import DepartmentsData from "../data/departments.json"

const states: string[] = StatesData.map((element) => element.name)
const departments: string[] = DepartmentsData

const initialState: FormEmployeeState = {
  formInputFirstname: {label: "First Name", name: "first-name", error: false, errorMessage: "Please enter your first name", inputIsValid: false},
  formInputLastname: {label: "Last Name", name: "last-name", error: false, errorMessage: "Please enter your last name", inputIsValid: false},
  formInputDateOfBirth: {label: "Date of Birth", name: "date-of-birth", error: false, errorMessage: "Please select a valid date", readOnly: true, inputIsValid: false},
  formInputStreet: {label: "Street", name: "street", errorMessage: "Please enter your street", inputIsValid: false},
  formInputCity: {label: "City", name: "city", errorMessage: "Please enter your city", inputIsValid: false},
  formInputState: {label: "State", name: "state", errorMessage: "Please select your state", choices: states, inputIsValid: false},
  formInputZipcode: {label: "Zip code", name: "zip-code", errorMessage: "Please enter a valid postal code", inputIsValid: false},
  formInputCompanyStart: {label: "Start Date", name: "start-date", errorMessage: "Please select a valid date", readOnly: true, inputIsValid: false},
  formInputDepartment: {label: "Department", name: "department", errorMessage: "Please select your department", choices: departments, inputIsValid: false},
}

const formEmployeeSlice:Slice = createSlice({
  name: 'formEmployee',
  initialState: {...initialState},
  reducers: {
    reset: (state: FormEmployeeState) => {
      return state = {...initialState}
    },

    updateState: (state: FormEmployeeState, action: PayloadAction<FormEmployeeState>) => {
      state.formInputFirstname = action.payload.formInputFirstname ?? state.formInputFirstname
      state.formInputLastname = action.payload.formInputLastname ?? state.formInputLastname
      state.formInputDateOfBirth = action.payload.formInputDateOfBirth ?? state.formInputDateOfBirth
      state.formInputStreet = action.payload.formInputStreet ?? state.formInputStreet
      state.formInputCity = action.payload.formInputCity ?? state.formInputCity
      state.formInputState = action.payload.formInputState ?? state.formInputState
      state.formInputZipcode = action.payload.formInputZipcode ?? state.formInputZipcode
      state.formInputCompanyStart = action.payload.formInputCompanyStart ?? state.formInputCompanyStart
      state.formInputDepartment = action.payload.formInputDepartment ?? state.formInputDepartment
    },

    displayInputsError: (state: FormEmployeeState) => {
      state.formInputFirstname!.error = !state.formInputFirstname!.inputIsValid
      state.formInputLastname!.error  = !state.formInputLastname!.inputIsValid
      state.formInputDateOfBirth!.error  = !state.formInputDateOfBirth!.inputIsValid
      state.formInputStreet!.error  = !state.formInputStreet!.inputIsValid
      state.formInputCity!.error  = !state.formInputCity!.inputIsValid
      state.formInputState!.error  = !state.formInputState!.inputIsValid
      state.formInputZipcode!.error  = !state.formInputZipcode!.inputIsValid
      state.formInputCompanyStart!.error  = !state.formInputCompanyStart!.inputIsValid
      state.formInputDepartment!.error  = !state.formInputDepartment!.inputIsValid
    },
  },
});

const { reset, updateState, displayInputsError } = formEmployeeSlice.actions

export const FormEmployeeActions = { reset, updateState, displayInputsError }

export default formEmployeeSlice