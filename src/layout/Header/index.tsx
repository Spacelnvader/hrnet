
import { FunctionComponent }  from 'react'
import { NavLink } from 'react-router-dom'
import { RouteAppObject } from '../../interfaces/Routes.intf'
import RoutesApp from '../../routes/Routes.app'
import imgLogo from '../../assets/logo-wealth-health.png'

import './style.scss'

/**
 * Header Layout
 */
const Header: FunctionComponent = () => {
  const routeHome: RouteAppObject = RoutesApp.getRouteByName('home')!

  return (
    <header id="header">
      <div className="logo">
        <NavLink to={routeHome.path}>
          <img src={imgLogo} alt="wealth health logo" />
          <div>
            <h1>HRnet</h1>
            <p>by wealth health</p>
          </div>
        </NavLink>
      </div>
    </header>
  );
}

export default Header