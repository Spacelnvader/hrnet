import { InputType } from "./Forms.intf"

export interface Employee {
  firstname?: string
  lastname?: string
  dateOfBirth?: number
  street?: string
  city?: string
  state?: string
  zipcode?: number
  start?: number
  department?: string
}

export interface FormEmployeeState {
  formInputFirstname?: InputType
  formInputLastname?: InputType
  formInputDateOfBirth?: InputType
  formInputStreet?: InputType
  formInputCity?: InputType
  formInputState?: InputType
  formInputZipcode?: InputType
  formInputCompanyStart?: InputType
  formInputDepartment?: InputType
}