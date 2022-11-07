import { CSSProperties, FunctionComponent } from "react"
import { ButtonType } from "../../interfaces/Forms.intf";
import { NavLink } from "react-router-dom";
import './style.scss'

const Button: FunctionComponent<ButtonType> = ({label = "button", primaryColor='#059ECE', secondaryColor='#4BC8DD', outlined = false, buttonLink = false, loading = false, disabled = false, onClick}) => {
  if(buttonLink) {
    return (
      <div className={`button${ outlined ? ' button--outlined' : ''}${ loading ? ' button--isloading' : ''}`}>
        { loading && ( <div className="button__loader"></div> )}
        <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/a-propos">{label}</NavLink>
      </div>    
    );
  }
  
  return (
    <div 
      className={`button${ outlined ? ' button--outlined' : ''}${ disabled ? ' button--disabled' : ''}${ loading ? ' button--isloading' : ''}`}
      style={{
        '--primary-color':primaryColor,
        '--secondary-color':secondaryColor
      } as CSSProperties}
    >
      { loading && ( <div className="button__loader"></div> )}
      <button type="button" onClick={onClick}>{label}</button>
    </div>    
  );
}

export default Button
