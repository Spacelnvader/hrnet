import React, {FunctionComponent, useEffect, MouseEvent, useState, CSSProperties} from "react"
import jsonTranslate from "./data.translate.json"
import {faHome, faAngleLeft, faAngleRight, faClose} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import "./style.scss"

type DatePickerCalendarProps = {
  className?: string
  color?: string
  elevation?: boolean
  lang?: string
  year?: number
  month?: number
  day?: number
  intervalYearsSelection?: number[]
  onSelect?: (date : Date, value : string) => void
  onClose?: CallableFunction
}

const DatePickerCalendar: FunctionComponent<DatePickerCalendarProps> = ({
  className,
  color,
  elevation = false,
  lang = "fr-FR",
  year = new Date().getFullYear(),
  month = new Date().getMonth(),
  day = new Date().getDate(),
  intervalYearsSelection = [
    new Date().getFullYear() - 90,
    new Date().getFullYear()
  ],
  onSelect,
  onClose
}) => {
  const i18n: Map<string, any> = new Map(Object.entries(jsonTranslate.i18n))
  const translate: Map<string, any> = new Map(Object.entries(i18n.get(lang)))
  let translateDaysShort: Array<string> = Array.from(translate.get("dayOfWeekShort"))
  const translateMonth: Array<string> = Array.from(translate.get("months"))
  const currentDate: Date = new Date(year, month, day)

  // sort the array so that the first day is Monday
  const firstDay = translateDaysShort[0]
  translateDaysShort = translateDaysShort.slice(1)
  translateDaysShort.push(firstDay)

  // Set State
  const [nDaysInMonth, setNDaysInMonth] = useState<number>(0)
  const [firstDaysInMonth, setFirstDaysInMonth] = useState<number>(0)
  const [selectDay, setSelectDay] = useState<number>(day)
  const [selectMonth, setSelectMonth] = useState<number>(month)
  const [selectYear, setSelectYear] = useState<number>(year)
  const [value, setValue] = useState<Date>(new Date())

  const [showDays, setShowDays] = useState<boolean>()
  const [showMonths, setShowMonths] = useState<boolean>(false)
  const [showYears, setShowYears] = useState<boolean>(false)

  useEffect(() => {
    setValue(new Date(year, month, day))
  }, [year, month, day])

  useEffect(() => {
    setSelectYear(selectYear)
    setSelectMonth(selectMonth)
    setSelectDay(selectDay)

    if (selectMonth < 0) {
      setSelectYear(selectYear - 1)
      setSelectMonth(11)
    }

    if (selectMonth > 11) {
      setSelectYear(selectYear + 1)
      setSelectMonth(0)
    }

    setFirstDaysInMonth(new Date(selectYear, selectMonth, 0).getDay())
    setNDaysInMonth(new Date(selectYear, selectMonth + 1, 0).getDate())
  }, [selectDay, selectMonth, selectYear])

  const generateDaysTable = () : React.ReactNode[] => {
    let table: React.ReactNode[] = []

    const previousMonthNDays = new Date(selectYear, selectMonth - 1, 0).getDate()
    let nextMountCounterDays = 1

    translateDaysShort.map((day) => table.push(<div className="day-label" key={day}>
      {day}
    </div>))

    for (let index = 1; index <= 6 * 7; index++) {
      const dayNumber = index - firstDaysInMonth
      const currentDateTable = new Date(selectYear, selectMonth, dayNumber)
      const daySelected = currentDateTable.getTime() === value.getTime()
      const currentDateSelected = currentDateTable.getTime() === currentDate.getTime()

      if (dayNumber <= nDaysInMonth && dayNumber >= 1) {
        table.push(<div key={`day-${index}`} onClick={handleClickDay} className={`day${
          daySelected && !currentDateSelected
            ? " day-selected"
            : ""}${currentDateSelected
              ? " day-current"
              : ""}`}>
          <span>{dayNumber}</span>
        </div>)
      } else {
        if (dayNumber <= 0) {
          table.push(<div key={`day-${index}`} className="day--grey">
            <span>{previousMonthNDays + dayNumber}</span>
          </div>)
        } else {
          table.push(<div key={`day-${index}`} className="day--grey">
            <span>{nextMountCounterDays}</span>
          </div>)
          nextMountCounterDays++
        }
      }
    }

    return table
  }

  const generateMonthsTable = () : React.ReactNode[] => {
    let table: React.ReactNode[] = []

    translateMonth.map((month, index) => table.push(<div className="month" onClick={handleClickMonth} data-id={index} key={month}>
      {month}
    </div>))

    return table
  }

  const generateYearsTable = () : React.ReactNode[] => {
    let table: React.ReactNode[] = []

    for (let index = intervalYearsSelection[0]; index <= intervalYearsSelection[1]; index++) {
      table.push(<div className="year" onClick={handleClickYear} key={index}>
        {index}
      </div>)
    }

    return table
  }

  const handleClickDay = (e : MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const result = new Date(selectYear, selectMonth, parseInt(e.currentTarget.querySelector("span")!.innerHTML))
    setValue(result)
    if (onSelect != null) 
      onSelect(result, result.toLocaleDateString(lang, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }))
    }
  
  const handleClickMonth = (e : MouseEvent<HTMLElement>) => {
    e.preventDefault()
    showDaysTable()
    setSelectMonth(parseInt(e.currentTarget.dataset.id !))
  }

  const handleClickYear = (e : MouseEvent<HTMLElement>) => {
    e.preventDefault()
    showMonthsTable()
    setSelectYear(parseInt(e.currentTarget.innerHTML))
  }

  const previousMonth = (e : MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setSelectMonth(selectMonth - 1)
  }

  const nextMonth = (e : MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setSelectMonth(selectMonth + 1)
  }

  const reset = (e : MouseEvent<HTMLElement>) => {
    e.preventDefault()
    showDaysTable()
    setSelectDay(day)
    setSelectMonth(month)
    setSelectYear(year)
  }

  const close = (e : MouseEvent<HTMLElement>) => {
    e.preventDefault()
    if (onClose != null) 
      onClose()
    }
  
  const showDaysTable = () => {
    setShowDays(true)
    setShowMonths(false)
    setShowYears(false)
  }

  const showMonthsTable = () => {
    setShowDays(false)
    setShowMonths(true)
    setShowYears(false)
  }

  const showYearsTable = () => {
    setShowDays(false)
    setShowMonths(false)
    setShowYears(true)
  }

  return (
    <div 
      className={`${className ? className + " " : ""}date-picker-calendar${elevation ? " date-picker-calendar__shadow" : ""}`}
      style={{
        '--primary-color': color
      } as CSSProperties}
    >
      <div className="date-picker-calendar__header" style={{backgroundColor : color}}>
        <button onClick={reset}>
          <FontAwesomeIcon icon={faHome}/>
        </button>
        <div className="controls">
          <button onClick={previousMonth}>
            <FontAwesomeIcon icon={faAngleLeft}/>
          </button>
          <p>
            <span className="date-picker-calendar__header__month" onClick={showMonthsTable}>
              {translateMonth[selectMonth]}
            </span>
            <span className="date-picker-calendar__header__year" onClick={showYearsTable}>
              {selectYear}
            </span>
          </p>
          <button onClick={nextMonth}>
            <FontAwesomeIcon icon={faAngleRight}/>
          </button>
        </div>
        <button onClick={close}>
          <FontAwesomeIcon icon={faClose}/>
        </button>
      </div>
      <div className="date-picker-calendar__table">
        <div className={`date-picker-calendar__table__days ${showDays === true  ? "show-table" : showDays === false ? "hide-table" : ""}`}>
          {generateDaysTable()}
        </div>
        <div className={`date-picker-calendar__table__months ${showMonths ? "show-table" : "hide-table"}`}>
          {generateMonthsTable()}
        </div>
        <div className={`date-picker-calendar__table__years ${showYears ? "show-table" : "hide-table"}`}>
          {generateYearsTable()}
        </div>
      </div>
    </div>
  )
}

export default DatePickerCalendar
