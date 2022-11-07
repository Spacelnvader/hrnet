import { faCaretDown, faCaretUp, faDatabase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, CSSProperties, Fragment, FunctionComponent, ReactNode, useEffect, useRef, useState } from 'react';
import { TablDataFilterSortType, TablDataProps, TableDataFilterSort, TableDataLegend } from './intf';
import jsonTranslate from "./data.translate.json"
import './style.scss';

const TableData: FunctionComponent<TablDataProps> = ({listObjectsData, listLegend, lang = 'en-EN', color = 'grey', textColor}) => {
  const i18n: Map<string, any> = new Map(Object.entries(jsonTranslate.i18n))

  const translate: Map<string, any> | null = i18n.get(lang) ? new Map(Object.entries(i18n.get(lang))) : new Map(Object.entries(i18n.get('fr-FR')))

  const defaultEntrieCountValue = 10
  const [filterListObjectsData, setFilterListObjectsData] = useState<Array<Object>>([])
  const [arraySortSelected, setArraySortSelected] = useState<TableDataFilterSort>()
  const [entriesCount, setEntriesCount] = useState<number>(defaultEntrieCountValue)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [nbrPages, setNbrPages] = useState<number>(1)

  const searchInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setFilterListObjectsData(listObjectsData)
  }, [listObjectsData])

  useEffect(() => {    
      let newNbrPages = Math.ceil(filterListObjectsData.length / entriesCount)    
      if(newNbrPages === 0) newNbrPages = 1

      setNbrPages(newNbrPages)

      if(currentPage > newNbrPages) setCurrentPage(newNbrPages)
  }, [filterListObjectsData, entriesCount, currentPage])

  const filterTableSort  = (filterObject: TableDataFilterSort, dataListObject: Object[]): Object[] => {
    const objectEntryLabel:string = listLegend[filterObject.index].entry  
  
    switch(filterObject.filter) {
      case  TablDataFilterSortType.asc :
        const filterTabSortDesc = dataListObject.sort((a: any, b: any) => {
          // Convert data type for sort filter
          const valueA = typeof(a[objectEntryLabel]) === 'string' ? a[objectEntryLabel].toLowerCase().replace(' ', '') : a[objectEntryLabel]
          const valueB = typeof(b[objectEntryLabel]) === 'string' ?  b[objectEntryLabel].toLowerCase().replace(' ', '') : b[objectEntryLabel]

          if(valueA < valueB) return -1
          if (valueB > valueA) return 1
          return 0
        })
        return filterTabSortDesc
      case  TablDataFilterSortType.desc :        
        const filterTabSortAsc =  dataListObject.sort((a: any, b: any) => {
          // Convert data type for sort filter        
          const valueA = typeof(a[objectEntryLabel]) === 'string' ?  a[objectEntryLabel].toLowerCase().replace(' ', '') : a[objectEntryLabel]
          const valueB = typeof(b[objectEntryLabel]) === 'string' ?  b[objectEntryLabel].toLowerCase().replace(' ', '') : b[objectEntryLabel]

          if(valueA > valueB) return -1
          if (valueB < valueA) return 1
          return 0
        })
        return filterTabSortAsc
      default:
        return []
    }
  }

  const filterTableSearch = (value: string): Object[] => {
    let keywords: string[] = value.split(' ')
    let resultTabSearch: Object[] = []

    keywords = keywords.map((value) => value.toLowerCase())
    
    keywords.forEach((word) => {
      const wordResultTabSearch: Object[] = []
      
      listObjectsData.forEach((objectData: Object) => {
        let values = Object.values(objectData) // Extact Object values
        values = values.map((value) => {
          let convertValueToString: string = ''
          if(typeof(value) === 'number') convertValueToString = value.toString() // Convert number to string
          if(typeof(value) === 'string') convertValueToString = value.toLowerCase() // Keep String value
          if(value instanceof Date) convertValueToString = value.toLocaleDateString(lang, {year:'numeric', month:'2-digit', day:'2-digit'})
          
          return convertValueToString
        })

        values.forEach((value: string) => {
          if(word.length > 0 && value.includes(word) && !wordResultTabSearch.includes(objectData)) {
            wordResultTabSearch.push(objectData)
            return
          }
        })
      })

      resultTabSearch = resultTabSearch.concat(wordResultTabSearch)
    })

    return keywords.length > 0 && resultTabSearch.length > 0 ? resultTabSearch : listObjectsData
  }

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const newFilterTab = filterTableSearch(e.currentTarget.value)
    
    setFilterListObjectsData(newFilterTab)    
  }

  const handleChangeEntries = (e: ChangeEvent<HTMLSelectElement>) => {
    const newNbrEntriesCount: number = parseInt(e.currentTarget.value)
    setEntriesCount(newNbrEntriesCount)
  }

  const handleChangeSort = (filterObject: TableDataFilterSort) => {
    const newFilterTab = filterTableSort(filterObject, filterListObjectsData)
    setFilterListObjectsData(newFilterTab)
    setArraySortSelected(filterObject)
  }

  const generateTableHeader = (): ReactNode => {
    return (
      <thead className="table-data__table__header">
        <tr>
          {listLegend.map((item: TableDataLegend, index: number) => (
            <td key={ item.entry }>
              <div className="table-data__table__header__legend">
                <span onClick={() => handleChangeSort({
                    index: index, 
                    filter: arraySortSelected?.filter === TablDataFilterSortType.asc ?
                    TablDataFilterSortType.desc : TablDataFilterSortType.asc
                  })}
                >
                  { item.label }
                </span>
                <div className='table-data__table__header__legend__controls'>
                  <i className={`${ arraySortSelected?.index === index && arraySortSelected.filter === TablDataFilterSortType.asc ? 'active' : '' }`}>
                    <FontAwesomeIcon
                      onClick={() => handleChangeSort({index: index, filter: TablDataFilterSortType.asc}) }                      
                      icon={faCaretUp}
                      fontSize={'10px'} 
                    />
                  </i>
                  <i className={`${ arraySortSelected?.index === index && arraySortSelected.filter === TablDataFilterSortType.desc ? 'active' : '' }`}>
                    <FontAwesomeIcon 
                      onClick={() => handleChangeSort({index: index, filter: TablDataFilterSortType.desc}) }                      
                      icon={faCaretDown} 
                      fontSize={'10px'} 
                    />
                  </i>
                </div>
              </div>
            </td>
          ))}
        </tr>
      </thead>
    )
  }

  const generateTableBody = (): ReactNode => {
    const startEntries = (currentPage -1) * entriesCount
    const endEntries = ((currentPage -1) * entriesCount) + (entriesCount - 1)

    const filterTabFilterWithEntriesCount = filterListObjectsData.slice(startEntries, endEntries)

    return (
      <tbody>
        {filterListObjectsData.length > 0 ? (
          filterTabFilterWithEntriesCount.map((data: Object, index: number) => (
            generateLineEmployee(index, data)
          ))
        ) : (
          <tr>
            <td colSpan={Object.entries(listObjectsData[0]).length} className="no-result">{translate.get('noResult')}</td>            
          </tr>
        )}
    </tbody>
    )
  }

  const generateLineEmployee = (key:number, data: Object): ReactNode => {
    const dataMapFromObject = Array.from(new Map(Object.entries(data)))

    // Order data from legend agencement
    const dataMapOrder =  dataMapFromObject.map((elmnt, index) => {
      return dataMapFromObject.find(item => item[0] === listLegend[index].entry)
    })

    return (
      <tr key={key} className={`${key % 2 ? 'table-white' : 'table-color'}`}>
        {
          dataMapOrder.map((item: any, index: number) => (
            <td key={index}>{ item[1] instanceof Date ? item[1].toLocaleDateString(lang, {year:'numeric', month:'2-digit', day:'2-digit'}) : item[1] }</td>
          ))
        }
      </tr> 
    )
  }

  const generatePagination = (): ReactNode => {
    
    const pages: ReactNode[] = []

    for (let index = 1; index <= nbrPages; index++) {
      pages.push(
        <li
          key={'page-' + index}
          className={index === currentPage ? 'current' : ''}
          onClick={() => setCurrentPage(index)}
        >
          { index }
        </li>
      )    
    }

    return (
      <Fragment>
        <div 
          className={`table-data__pagination__controler ${currentPage <= 1 ? ' disable' : ''}`}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          {translate.get('previous')}
        </div>
        <ul className='table-data__pagination__pages'>
          { pages }
        </ul>
        <div 
          className={`table-data__pagination__controler ${currentPage >= nbrPages ? ' disable' : ''}`}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          {translate.get('next')}
        </div>
      </Fragment>
    )
  }

  return (    
    <div
      className='table-data'
      style={{
        '--primary-color': color,
        '--secondary-color': textColor ?? color
      } as CSSProperties}
    >
      { listObjectsData.length > 0 ? (
          <div>
            <div className='table-data__filter'>
              <div className='table-data__filter__count'>
                <label>{translate.get('show')} 
                  <select 
                    value={entriesCount}
                    onChange={handleChangeEntries}
                    name="show-entries"
                  >
                    <option value={defaultEntrieCountValue}>{defaultEntrieCountValue}</option>
                    <option value={defaultEntrieCountValue * 2.5}>{defaultEntrieCountValue * 2.5}</option>
                    <option value={defaultEntrieCountValue * 5}>{defaultEntrieCountValue * 5}</option>
                    <option value={defaultEntrieCountValue * 10}>{defaultEntrieCountValue * 10}</option>
                  </select>
                  {translate.get('entries')}
                </label>
              </div>
              <div className='table-data__filter__search'>
                <label>{translate.get('search')}</label>
                <input name="search" ref={searchInput} onChange={handleChangeSearch} />
              </div>
            </div>
            <div className='table-data__container'>
              <table className='table-data__table'>
                { generateTableHeader ()}
                { generateTableBody() }
              </table>
            </div>
            <div className='table-data__infos'>
              {
                translate.get('showing') + ' '
                + ((currentPage -1) * entriesCount + 1) 
                + ' ' + translate.get('to') + ' ' + (((currentPage -1) * entriesCount) + entriesCount) 
                + ' ' + translate.get('of') + ' ' + filterListObjectsData.length 
                + ' ' + translate.get('element') + ' '                 
              }
              {
                searchInput && searchInput.current! && searchInput.current!.value.length > 0 ? (
                  ' ( ' + translate.get('filterdFrom') + ' ' + listObjectsData.length + ' ' + translate.get('totalElements') + ' )'
                ) : null
              }
            </div>
            <div className='table-data__pagination'>
              { nbrPages > 1 ? generatePagination() : null }
            </div>
          </div>  
        ) : (
          <div className="table-data__empty">
            <i><FontAwesomeIcon icon={faDatabase} fontSize={'80px'} /></i>
            <h3>{translate.get('dataEmpty')}</h3>
          </div>  
        )}    
    </div>
  )
}

export default TableData;
