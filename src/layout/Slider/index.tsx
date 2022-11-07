import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FunctionComponent }  from 'react'
import { NavLink } from 'react-router-dom'
import RoutesApp from '../../routes/Routes.app'

import './style.scss'

/**
 * Slider Layout with nav Links
 */
const Slider: FunctionComponent = () => {
  return (
    <div id="slider">
      <nav>
        <ul>
        { RoutesApp.routeList.map(({ path, label, name, icon }) => (
          path !== '*' ?
          <NavLink key={name} to={path}>
            <li>            
              { icon != null ?  <i><FontAwesomeIcon size='lg' icon={icon!} /></i> : null }
              {label}              
            </li>
          </NavLink>
          : null       
        ))}
        </ul>
      </nav>
    </div>
  )
}

export default Slider