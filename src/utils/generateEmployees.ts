import { Employee } from "../interfaces/Employee.intf";
import StatesData from "../data/states.json"
import DepartmentsData from "../data/departments.json"

export const generateEmployees = async (iteration: number) => {

  const statesName: string[] = StatesData.map((element) => element.name)  
  const departments: string[] = DepartmentsData
  const listEmployees: Employee[] = []

  for (let index = 0; index < iteration; index++) {
    const init: RequestInit = { method: 'GET', headers: new Headers(), mode: 'cors', cache: 'default' };

    await fetch('https://randomuser.me/api/?nat=us', init)
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        return response['results'][0]
      })
      .then((response) => {
        const employee: Employee = {
          firstname: response.name.first,
          lastname: response.name.last,
          dateOfBirth: new Date(response.dob.date).getTime(),
          street: response.location.street.name,
          city: response.location.city,
          state: statesName[Math.floor(Math.random() * (statesName.length))],
          zipcode: response.location.postcode,
          start: new Date(response.registered.date).getTime(),
          department: departments[Math.floor(Math.random() * (departments.length))],
        }

        listEmployees.push(employee)
      })
  }

  console.log(listEmployees)

  localStorage.setItem('employees', JSON.stringify(listEmployees))  
}