import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FunctionComponent, useState, ChangeEvent, useEffect, MouseEvent, FocusEvent } from "react"
import { InputType } from "../../interfaces/Forms.intf"
import './style.scss'

const Input: FunctionComponent<InputType> = ({
  prependIcon,
  appendIcon,
  label = 'Label',
  name = 'inputName',
  errorMessage = "Erreur message",
  error = false,
  onChange,
  onClick,
  onBlur,
  text = '',
  isFocus,
  disabled = false,
  type = 'text',
  readOnly = false,
  value = '',
} : InputType) => {  
  const [onFocusInput, setOnFocusInput] = useState<boolean>(false)
  const [valueInput, setValueInput] = useState<string | string[] | number | boolean>(value)
  const [textInput, setTextInput] = useState<string>(text)
  const [errorStatus, setErrorStatus] = useState<boolean>(error)

  useEffect(() => {
    setErrorStatus(error)
  }, [error])

  useEffect(() => {
    setValueInput(valueInput)
  }, [valueInput])

  useEffect(() => {
    setValueInput(value)
  }, [value])

  useEffect(() => {
    setTextInput(textInput)
  }, [textInput])

  useEffect(() => {
    setTextInput(text)
  }, [text])

  useEffect(() => {
    setOnFocusInput(isFocus!)
  }, [isFocus])

  const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
    setTextInput(event.target.value)

    if(onChange) onChange(event.target.value)    
  }

  const handleClick = (e : MouseEvent<HTMLElement>) => {
    e.preventDefault()
    e.currentTarget.querySelector('input')?.focus()
    if(onClick) onClick()    
  }

  const handleClickInput = (e : MouseEvent<HTMLElement>) => {
    e.preventDefault()  
    e.currentTarget.focus()
    setOnFocusInput(isFocus !== undefined ? isFocus : true)
  }

  const handleOnFocus = () => {
    setOnFocusInput(isFocus !== undefined ? isFocus : true)
  }

  const handleOnBlur = (e : FocusEvent) => {
    onBlur ? onBlur(e) : setOnFocusInput(false) 
  }

  return (
    <div className={
      `input${ textInput !== '' ? ' input--active' : ''}${ onFocusInput ? ' input--focus' : ''}${ errorStatus ?  ' input--error' : ''}${ readOnly ?  ' input--read' : ''}`
    }>
      <label htmlFor={name} className={prependIcon ? 'indent' : '' }>{label}</label>
      <div onClick={readOnly ? handleClick : () => {}} className="input__content">
        { prependIcon ? <i><FontAwesomeIcon icon={prependIcon} /></i> : null }
        <input 
          type={type} 
          name={name} 
          readOnly={readOnly} 
          onClick={handleClickInput}
          onFocus={handleOnFocus} 
          onBlur={handleOnBlur} 
          onChange={handleChange}
          disabled={disabled}     
          value={textInput}
        />
        { appendIcon ? <i><FontAwesomeIcon icon={appendIcon} /></i> : null }
      </div>
      {errorStatus && (
      <p className="input__error-message">{errorMessage}</p>
      )}
    </div>
  );
}

export default Input
