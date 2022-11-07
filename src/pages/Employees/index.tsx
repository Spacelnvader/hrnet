import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/main.store';
import { Employee } from "../../interfaces/Employee.intf"
import './style.scss'
import TableData from '../../components/TableData';
import { TableDataLegend } from '../../components/TableData/intf';
import Colors from '../../sass/themes/_colors.module.scss'


const Employees: React.FunctionComponent = () => {
  const listLegend: TableDataLegend[] = [
    {label: 'First Name', entry: 'firstname'},
    {label: 'Last Name', entry: 'lastname'},
    {label: 'Start Date', entry: 'start'},
    {label: 'Department', entry: 'department'},
    {label: 'Date of Birth', entry: 'dateOfBirth'},
    {label: 'Street', entry: 'street'},
    {label: 'City', entry: 'city'},
    {label: 'State', entry: 'state'},
    {label: 'Zip Code', entry: 'zipcode'},
  ]

  const listEmployees: Employee[] = useAppSelector((state) => state.listEmployeeSlice )
  const [listEmployeesFormatted, setListEmployeesFormatted] = useState<Object[]>([])

  useEffect(() => {
    const formatEmployeeToObjectString = (listEmployees: Employee[]): Object[] => {
      return  listEmployees.map((employee) => {
        return {
          ...employee,
          start: new Date(employee.start!),
          dateOfBirth: new Date(employee.dateOfBirth!) 
        }
      })
    }

    setListEmployeesFormatted(formatEmployeeToObjectString(listEmployees))
  }, [listEmployees])
  
  return (    
    <section id='employees' className='box'>
      <h2>List Employees</h2>
      <TableData 
        listObjectsData={listEmployeesFormatted}
        listLegend={listLegend}
        lang={'en-EN'}
        color={Colors.greenLigth}
        textColor={Colors.secondary}
      />
    </section>
  )
}

export default Employees;