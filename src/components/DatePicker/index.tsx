import {faCalendar} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {CSSProperties, FunctionComponent, useEffect, useRef, useState} from "react"
import DatePickerCalendar from "../DatePickerCalendar"
import "./style.scss"

type DatePickerProps = {
  label?: string
  name?: string
  errorMessage?: string
  error?: boolean
  value?: string
  lang?: string
  year?: number
  month?: number
  day?: number
  zIndex?: number
  intervalYearsSelection?: number[]
  elevationPicker?: boolean
  headerPickerColor?: string
  textColor?: string
  focusColor?: string
  errorColor?: string
  borderColor?: string
  borderRadius?: string
  onSelect?: CallableFunction
}

export type DatePickerResult = {
  date: Date,
  value: string
}

const DatePicker: FunctionComponent<DatePickerProps> = ({
  label = "Label",
  name = "inputName",
  errorMessage = "Erreur message",
  error = false,
  value = "",
  lang = "fr-FR",
  year, 
  month,
  day,
  intervalYearsSelection,
  elevationPicker = false,
  headerPickerColor = '#059ECE',
  borderColor = '#DADCE0',
  textColor = '#70757A',
  focusColor = '#059ECE',
  errorColor = '#EF6C6C',
  borderRadius = '5px',
  zIndex = 999,
  onSelect,
}) => {

  const inputDate = useRef<HTMLInputElement>(null)
  const wrapperInputDate = useRef<HTMLInputElement>(null)
  const wrapperDate = useRef<HTMLInputElement>(null)  

  const [showCalendar, setShowCalendar] = useState<boolean>()
  const [valueInput, setValueInput] = useState<string>(value)
  const [errorStatus, setErrorStatus] = useState<boolean>(error)

  useEffect(() => {
    document.addEventListener("mousedown", (e: any) => {
      e.stopPropagation()
      if (wrapperDate.current && wrapperInputDate.current && !wrapperDate.current.contains(e.target) && !wrapperInputDate.current.contains(e.target) && showCalendar === true ) {
        setShowCalendar(false)
        inputDate.current?.blur()
      }
    });
  }, [wrapperDate, showCalendar])

  useEffect(() => {
    setErrorStatus(error)
  }, [error])

  useEffect(() => {
    setValueInput(value)
  }, [value])

  const displayDatePicker = (active?: boolean) => {
    showCalendar ? inputDate.current?.blur() : inputDate.current?.focus()
    setShowCalendar(active ?? !showCalendar)
  }

  return (
    <div className="date-picker">
      <div 
        ref={wrapperInputDate}
        onClick={() => displayDatePicker()}        
        className={`input-date${valueInput !== "" ? " input-date--active" : ""}${errorStatus ? " input-date--error" : ""}${showCalendar ? " input-date--focus" : ""}`}
        style={{
          zIndex: zIndex,
          '--text-color': textColor,
          '--focus-color': focusColor,
          '--error-color': errorColor,
          '--border-color': borderColor,
          '--border-radius': borderRadius,
        } as CSSProperties}
      >
        <label htmlFor={name}>{label}</label>
        <div className="input-date__content">
          <input ref={inputDate} name={name} value={valueInput} readOnly={true} />
          <i><FontAwesomeIcon icon={faCalendar}/></i>
        </div>
        { errorStatus && (<p className="input-date__error-message">{errorMessage}</p>) }
      </div>
      <div 
        ref={wrapperDate}
        className={`picker${ showCalendar === true ? ' show' : showCalendar === false ? ' hide' : '' }`}
        style={{
          zIndex: zIndex
        } as CSSProperties}
      >
        <DatePickerCalendar 
          elevation={elevationPicker} 
          lang={lang}
          year={year}
          month={month}
          day={day}
          intervalYearsSelection={intervalYearsSelection}
          color={headerPickerColor}
          onSelect={(date, value) => {
            const result: DatePickerResult = {
              date: date,
              value: value
            }
            setValueInput(value)
            if(onSelect) onSelect(result)
          }}
          onClose={() => displayDatePicker(false)}
        />
      </div>
      
    </div>

  )
}

export default DatePicker
