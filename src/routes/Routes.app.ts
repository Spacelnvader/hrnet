import Error from '../pages/Error'
import Home from '../pages/Home'
import { RouteAppObject } from "../interfaces/Routes.intf"
import { faUserPlus, faUsers, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'


const routeList: RouteAppObject[] = [
  { 
    path: '/', 
    name: 'home',
    label: 'Create Employee',
    Component: Home,
    title: 'HRnet',
    icon: faUserPlus
  },
  {
    path: '*', 
    name: 'Error',
    Component: Error,
    title: 'Error404',
    icon: faCircleExclamation
  }
]

const getRouteByName = (name: string):RouteAppObject | undefined => {
  return routeList.find(route => route.name === name)
}

const getRouteByPathName = (pathname: string):RouteAppObject | undefined => {
  return routeList.find(route => route.path === pathname)
}

const RoutesApp = {
  routeList,
  getRouteByName,
  getRouteByPathName
}

export default RoutesApp