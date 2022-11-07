import React, { useState } from "react"
import Button from "../../components/Button"
import Input from "../../components/Input"
import DatePicker, { DatePickerResult } from "../../components/DatePicker"

import Colors from '../../sass/themes/_colors.module.scss'
import "./style.scss"

import StatesData from "../../data/states.json"
import DepartmentsData from "../../data/departments.json"

import Dialog from "../../components/Dialog"
import { useAppDispatch, useAppSelector } from "../../store/main.store"
import { FormEmployeeActions } from "../../store/formEmployee.store"
import { listEmployeesActions } from "../../store/listEmployees.store"
import { Employee } from "../../interfaces/Employee.intf"
import Dropdown from "../../components/DropDown"

const Home: React.FunctionComponent = () => {
  const states: any[] = StatesData
  const statesName: string[] = StatesData.map((element) => element.name)
  
  const departments: string[] = DepartmentsData

  const formInputFirstname = useAppSelector((state) => state.formEmployeeSlice.formInputFirstname )
  const formInputLastname = useAppSelector((state) => state.formEmployeeSlice.formInputLastname )
  const formInputDateOfBirth = useAppSelector((state) => state.formEmployeeSlice.formInputDateOfBirth )
  const formInputStreet = useAppSelector((state) => state.formEmployeeSlice.formInputStreet )
  const formInputCity = useAppSelector((state) => state.formEmployeeSlice.formInputCity )
  const formInputState = useAppSelector((state) => state.formEmployeeSlice.formInputState )
  const formInputZipcode = useAppSelector((state) => state.formEmployeeSlice.formInputZipcode )
  const formInputCompanyStart = useAppSelector((state) => state.formEmployeeSlice.formInputCompanyStart )
  const formInputDepartment = useAppSelector((state) => state.formEmployeeSlice.formInputDepartment )
  const dispatch = useAppDispatch()

  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const checkFormNoErrors = (): boolean => {
    return (
      formInputFirstname.inputIsValid === true &&
      formInputLastname.inputIsValid === true &&
      formInputDateOfBirth.inputIsValid === true &&
      formInputStreet.inputIsValid === true &&
      formInputCity.inputIsValid === true &&
      formInputState.inputIsValid === true &&
      formInputZipcode.inputIsValid === true &&
      formInputCompanyStart.inputIsValid === true &&
      formInputDepartment.inputIsValid === true
    )
  }

  const checkFormInputStringValid = (value: string): boolean => typeof(value) === "string" && value.length > 2
  const checkFormInputStringDate = (value: Date): boolean  => value instanceof Date
  const checkFormInputStringSelect = (listData: string[], value?: string): boolean  => typeof(value) === "string" && listData.includes(value)
  const checkFormInputZipCode = (value: string): boolean  => typeof(value) === "string" && value.length === 5

  const onSubmit = () => {
    dispatch(FormEmployeeActions.displayInputsError({}))
    if(checkFormNoErrors()) storeData()
  }

  const storeData = () => {
    const employee: Employee = {
      firstname: formInputFirstname.value,
      lastname: formInputLastname.value,
      dateOfBirth: formInputDateOfBirth.value,
      street: formInputStreet.value,
      city: formInputCity.value,
      state: states.find(item => item['name'] === formInputState.value)['abbreviation'] ,
      zipcode: parseInt(formInputZipcode.value),
      start: formInputCompanyStart.value,
      department: formInputDepartment.value
    }

    dispatch(listEmployeesActions.addEmployee(employee))
    dispatch(FormEmployeeActions.reset({}))
    setShowSuccessDialog(true)
  }

  return (
    <section className="box" id="home">
      <h2>Create Employee</h2>
      <form action="#" id="create-employee">
        <div className="row row--wrap row--jse row--start">
          <div className="informations">
            <h3 className="text-center">Informations</h3>
            <Input 
              label={formInputFirstname.label}
              name={formInputFirstname.name} 
              error={formInputFirstname.error} 
              errorMessage={formInputFirstname.errorMessage} 
              text={formInputFirstname.text}
              inputIsValid={formInputFirstname.inputIsValid}
              onChange={(value: string) => {
                dispatch(FormEmployeeActions.updateState({
                  formInputFirstname: {
                    ...formInputFirstname,
                    value: value,
                    inputIsValid: checkFormInputStringValid(value),
                    error: false,
                    text: value
                  }})
                )
              }}
            />
            <Input 
              label={formInputLastname.label} 
              name={formInputLastname.name} 
              error={formInputLastname.error} 
              text={formInputLastname.text}
              errorMessage={formInputLastname.errorMessage} 
              inputIsValid={formInputFirstname.inputIsValid}
              onChange={(value: string) => {
                dispatch(FormEmployeeActions.updateState({
                  formInputLastname: {
                    ...formInputLastname,
                    value: value,
                    inputIsValid: checkFormInputStringValid(value),
                    error: false,
                    text: value
                  }})
                )
              }}
            />
            <DatePicker 
              zIndex={12}
              label={formInputDateOfBirth.label}
              error={formInputDateOfBirth.error}
              errorMessage={formInputDateOfBirth.errorMessage}
              value={formInputDateOfBirth.text}
              elevationPicker={true}
              headerPickerColor={Colors.primary}
              textColor={Colors.secondry}
              errorColor={Colors.danger}
              focusColor={Colors.primary}
              borderColor={Colors.greyLigth}
              lang={'en-EN'}
              onSelect={(result: DatePickerResult) => {
                dispatch(FormEmployeeActions.updateState({
                  formInputDateOfBirth: {
                    ...formInputDateOfBirth,
                    value: result.date.getTime(),
                    inputIsValid: checkFormInputStringDate(result.date),
                    error: false,
                    text: result.value
                  }})
                )
              }}
            />
          </div>
          <fieldset>
            <legend>Address</legend>
            <Input 
              label={formInputStreet.label} 
              name={formInputStreet.name} 
              error={formInputStreet.error} 
              text={formInputStreet.text}
              errorMessage={formInputStreet.errorMessage} 
              onChange={(value: string) => {
                dispatch(FormEmployeeActions.updateState({
                  formInputStreet: {
                    ...formInputStreet,
                    value: value,
                    inputIsValid: checkFormInputStringValid(value),
                    error: false,
                    text: value
                  }})
                )
              }}
            />
            <Input 
              label={formInputCity.label} 
              name={formInputCity.name} 
              error={formInputCity.error} 
              text={formInputCity.text}
              errorMessage={formInputCity.errorMessage} 
              onChange={(value: string) => {
                dispatch(FormEmployeeActions.updateState({
                  formInputCity: {
                    ...formInputCity,
                    value: value,
                    inputIsValid: checkFormInputStringValid(value),
                    error: false,
                    text: value
                  }})
                )
              }}
            />
            <Dropdown 
              label={formInputState.label} 
              name={formInputState.name} 
              error={formInputState.error} 
              errorMessage={formInputState.errorMessage} 
              choicies={formInputState.choices} 
              value={formInputState.value as string}
              zIndex={10} 
              textColor={Colors.secondry}
              errorColor={Colors.danger}
              focusColor={Colors.primary}
              borderColor={Colors.greyLigth}            
              onSelect={(value: string) => {
                dispatch(FormEmployeeActions.updateState({
                  formInputState: {
                    ...formInputState,
                    inputIsValid: checkFormInputStringSelect(statesName, value),
                    error: false,
                    value: value
                  }})
                )              
              }}
            />
            <Input 
              type={"number"} 
              label={formInputZipcode.label} 
              name={formInputZipcode.name} 
              error={formInputZipcode.error}
              text={formInputZipcode.text}
              value={formInputZipcode.value}
              errorMessage={formInputZipcode.errorMessage} 
              onChange={(value: string) => {
                dispatch(FormEmployeeActions.updateState({
                  formInputZipcode: {
                    ...formInputZipcode,
                    value: value,
                    inputIsValid: checkFormInputZipCode(value),
                    error: false,
                    text: value
                  }})
                )
              }}
            />
          </fieldset>
        </div>
        <div className="department">
          <h3 className="text-center">Company</h3>
          <DatePicker 
            zIndex={11}
            label={formInputCompanyStart.label}
            error={formInputCompanyStart.error}
            errorMessage={formInputCompanyStart.errorMessage}
            value={formInputCompanyStart.text}
            elevationPicker={true}
            headerPickerColor={Colors.primary}
            textColor={Colors.secondry}
            errorColor={Colors.danger}
            focusColor={Colors.primary}
            borderColor={Colors.greyLigth}
            lang={'en-EN'}
            onSelect={(result: DatePickerResult) => {
              dispatch(FormEmployeeActions.updateState({
                formInputCompanyStart: {
                  ...formInputCompanyStart,
                  text: result.value,
                  inputIsValid: checkFormInputStringDate(result.date),
                  error: false,
                  value: result.date.getTime()
                }})
              )
            }}
          />
          <Dropdown 
            label={formInputDepartment.label} 
            name={formInputDepartment.name} 
            error={formInputDepartment.error} 
            errorMessage={formInputDepartment.errorMessage} 
            choicies={formInputDepartment.choices} 
            value={formInputDepartment.value as string}
            zIndex={10} 
            textColor={Colors.secondry}
            errorColor={Colors.danger}
            focusColor={Colors.primary}
            borderColor={Colors.greyLigth}
            onSelect={(value: string) => {
              dispatch(FormEmployeeActions.updateState({
                formInputDepartment: {
                  ...formInputDepartment,
                  inputIsValid: checkFormInputStringSelect(departments, value),
                  error: false,
                  value: value
                }
              }))
            }}
          />
        </div>
      </form>
      <div className="form-controllers">
        <Button label="Reset" outlined primaryColor={Colors.greyLigth} secondaryColor={Colors.secondary} onClick={() => dispatch(FormEmployeeActions.reset({})) } />
        <Button label="Save" onClick={onSubmit} primaryColor={Colors.primary} />
      </div>
      <Dialog text="Employee Created !" showDialog={showSuccessDialog} onClose={() => setShowSuccessDialog(false)} />
    </section>  
  )
}

export default Home