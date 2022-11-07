
import { FunctionComponent }  from 'react'
import './style.scss'

/**
 * Header Layout
 */
const Footer: FunctionComponent = () => {
  return (
    <footer id="footer">
      <p>copyrigth © { new Date().getFullYear() } Wealth Health - Tous droits réservés</p>
    </footer>
  );
}

export default Footer