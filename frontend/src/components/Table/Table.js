import React, {useEffect, useState} from 'react'
import { useTable, useSortBy, usePagination, useFilters, useGlobalFilter }  from 'react-table'
import Button from '@mui/material/Button';
import { ZButton } from '../Button/ZButton'
import './Table.css';
import {matchSorter} from 'match-sorter';
import ColumnDialog from './ColumnDialog';
export const BaseTable = (props) => {
  const[z, setZ] = useState("");
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [infoOpen, setInfoOpen] = React.useState(false);
  function dataSwitch(){
    props.setData(props[z + document.getElementById("activeData").value])
    console.log(props[z + document.getElementById("activeData").value])
  }
  function getZ(x){
      setZ(x)
  }
  useEffect(()=>{
    dataSwitch()
  },[z]
  )

  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef()
      const resolvedRef = ref || defaultRef
  
      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate])
  
      return <input type="checkbox" ref={resolvedRef} {...rest} />
    }
  )
  const tableColumns = [
    {
    Header: 'PLAYER',
    accessor: 'name',
    sortType: 'basic',
    filter: 'fuzzyText',
    columnName: 'Player Name',
    },
    {
    Header: 'POS',
    accessor: 'pos',
    sortType: 'basic',
    Filter: SelectColumnFilter,
    columnName: 'Position',
    },
    {
    Header: 'AGE',
    accessor: 'age',
    sortType: 'basic',
    sortDescFirst: true,
    Filter: null,
    columnName: 'Age',
    },
    {
    Header: 'TEAM',
    accessor: 'team_id',
    Filter: SelectColumnFilter,
    columnName: 'Team',
    },
    {
    Header: 'G',
    accessor: 'g',
    sortType: 'basic',
    sortDescFirst: true,
    Filter: NumberRangeColumnFilter,
    filter: 'between',
    columnName: 'Games Played',
    },
    {
    Header: 'GS',
    accessor: 'gs',
    sortType: 'basic',
    sortDescFirst: true,
    Filter: NumberRangeColumnFilter,
    filter: 'between',
    columnName: 'Games Started',
    },
    {
    Header: 'MP',
    accessor: 'mp_per_g',
    sortType: 'basic',
    sortDescFirst: true,
    Filter: NumberRangeColumnFilter,
    filter: 'between',
    columnName: 'Minutes Played',
    },
    {
    Header: 'FG',
    accessor: "fg",
    sortMethod: (a, b) => Number(a)-Number(b),
    sortType: 'basic',
    sortDescFirst: true,
    Filter: NumberRangeColumnFilter,
    filter: 'between',
    columnName: 'Field Goals',
    },
    {
    Header: 'FG%',
    accessor: "fg_pct",
    sortMethod: (a, b) => Number(a)-Number(b),
    sortType: 'basic',
    sortDescFirst: true,
    Filter: NumberRangeColumnFilter,
    filter: 'between',
    columnName: 'Field Goal %',
    },
    {
    Header: 'FG3',
    accessor: "fg3",
    sortMethod: (a, b) => Number(a)-Number(b),
    sortType: 'basic',
    sortDescFirst: true,
    Filter: NumberRangeColumnFilter,
    filter: 'between',
    columnName: '3-Point Field Goals',
    },
    
    {
    Header: 'FG3%',
    accessor: "fg3_pct",
    sortMethod: (a, b) => Number(a)-Number(b),
    sortType: 'basic',
    sortDescFirst: true,
    Filter: NumberRangeColumnFilter,
    filter: 'between',
    columnName: '3-Point Field Goal %',
    },
    {
    Header: 'FT',
    accessor: "ft",
    sortMethod: (a, b) => Number(a)-Number(b),
    sortType: 'basic',
    sortDescFirst: true,
    Filter: NumberRangeColumnFilter,
    filter: 'between',
    columnName: 'Free Throws',
    },
    {
    Header: 'FT%',
    accessor: "ft_pct",
    sortMethod: (a, b) => Number(a)-Number(b),
    sortType: 'basic',
    sortDescFirst: true,
    Filter: NumberRangeColumnFilter,
    filter: 'between',
    columnName: 'Free Throw %',
    },
    {
    Header: 'RB',
    accessor: "trb",
    sortMethod: (a, b) => Number(a)-Number(b),
    sortType: 'basic',
    sortDescFirst: true,
    Filter: NumberRangeColumnFilter,
    filter: 'between',
    columnName: 'Rebounds',
    },
    {
    Header: 'AST',
    accessor: "ast",
    sortMethod: (a, b) => Number(a)-Number(b),
    sortType: 'basic',
    sortDescFirst: true,
    Filter: NumberRangeColumnFilter,
    filter: 'between',
    columnName: 'Assists',
    },
    {
    Header: 'STL',
    accessor: "stl",
    sortMethod: (a, b) => Number(a)-Number(b),
    sortType: 'basic',
    sortDescFirst: true,
    Filter: NumberRangeColumnFilter,
    filter: 'between',
    columnName: 'Steals',
    },
    {
    Header: 'BLK',
    accessor: "blk",
    sortMethod: (a, b) => Number(a)-Number(b),
    sortType: 'basic',
    sortDescFirst: true,
    Filter: NumberRangeColumnFilter,
    filter: 'between',
    columnName: 'Blocks',
    },
    {
    Header: 'TOV',
    accessor: "tov",
    sortMethod: (a, b) => Number(a)-Number(b),
    sortType: 'basic',
    sortDescFirst: true,
    Filter: MaxColumnFilter,
    filter: 'between',
    columnName: 'Turnovers',
    },
    {
    Header: 'PTS',
    accessor: "pts",
    sortMethod: (a, b) => Number(a)-Number(b),
    sortType: 'basic',
    sortDescFirst: true,
    Filter: NumberRangeColumnFilter,
    filter: 'between',
    columnName: 'Points',
    },
]
  const columns = React.useMemo(() => tableColumns, [])
  const data = React.useMemo(() => props.propdata, [props.propdata])
  

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows, props.propdata])

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}


// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    preFilteredRows.forEach(row => {
      min = Math.min(row.values[id], min)
      max = Math.max(row.values[id], max)
    })
    return [min, max]
  }, [id, preFilteredRows])

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <input
        value={filterValue[0] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [val ? parseFloat(val, 10) : undefined, old[1]])
        }}
        placeholder={`Min`}
        style={{
          width: '45px',
        }}
      />
    </div>
  )
}
function MaxColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    preFilteredRows.forEach(row => {
      min = 0
      max = Math.max(row.values[id], max)
    })
    return [min, max]
  }, [id, preFilteredRows])

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <input
        value={filterValue[1] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [old[0], val ? parseFloat(val, 10) : undefined])
        }}
        placeholder={`Max`}
        style={{
          width: '45px',
        }}
      />
    </div>
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val


const defaultColumn = React.useMemo(
  () => ({
    // Let's set up our default Filter UI
    Filter: DefaultColumnFilter,
  }),
  [props.propdata]
)
var {
  getTableProps,
  getTableBodyProps,
  headerGroups,
  page,
  canPreviousPage,
  canNextPage,
  pageOptions,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  setPageSize,
  state: { pageIndex, pageSize },
  prepareRow,
  allColumns,
  getToggleHideAllColumnsProps,
} = useTable(
  {
    columns,
    data, 
    defaultColumn,
    initialState: {
      hiddenColumns: ['id'],
      pageIndex: 0,
      pageSize: 50,
      manualPagination: false
    }
  },
  useFilters, 
  useGlobalFilter,  
  useSortBy,  
  usePagination, 
)
function filterLessThan(rows, id, filterValue) {
  return rows.filter(row => {
    const rowValue = row.values[id]
    return rowValue <= filterValue
  })
}
filterLessThan.autoRemove = val => typeof val !== 'number'

const handleClickOpenSettings = () => {
  setSettingsOpen(true);
};

const handleClickOpenInfo = () => {
  setInfoOpen(true);
}

const handleClose = () => {
  setSettingsOpen(false);
  setInfoOpen(false);
};

    return (
    <>
      <table>
        <tbody>
            <tr>
              <td className = "table-settings">
                <Button size="small" variant = "outlined" onClick={handleClickOpenInfo}>Read Me</Button>
              </td>
              <ColumnDialog open={infoOpen} onClose={handleClose}>
              <h2>NBA Fantasy Advanced Stats Table</h2>
              <p className="table-settings">
                This table was designed to make player value analysis easier by utilizing advanced, multi-layered
                filtering capabilities and z-score analysis of player statistics. Knowing how much more valuable
                each player is in comparison to the average player will give the user an edge. 
              </p>
              <p className="table-settings">
                Another key feature is the use of weighted field goal/throw percentages in the z-score analysis. 
                A 100% free throw percentage is higher than a 99% free throw percentage, but if they only shoot 1 
                free throw for 100%, the next miss will make the average 1/2 or 50%. On the other hand, if someone 
                shoots 99/100 for 99%, the next miss won't move the average much because they have made so many already.
                This difference in value can't be determined when observing a typical statistics chart; understanding this
                can help fantasy team managers more accurately determine a players value.
              </p>
              <p className="note">
                Click on table headings to sort!
              </p>  
              </ColumnDialog>
              <td className="table-settings">
                <Button size="small" variant = "outlined" onClick={handleClickOpenSettings}>Column Visibility</Button>
              </td>
              <ColumnDialog open={settingsOpen} onClose={handleClose}>
                <div><IndeterminateCheckbox {...getToggleHideAllColumnsProps()}/> Toggle All</div>
                  {allColumns.map(column => (
                    <div key={column.id}>
                      <label>
                        <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
                        {(tableColumns.find((col)=>column.id==col.accessor)).Header} — {tableColumns.find((col)=>column.id==col.accessor).columnName}
                      </label>
                    </div>
                  ))}
              </ColumnDialog>
              <td className="table-settings">
                  <ZButton z = {z} getZ = {getZ} />
              </td>
              <td className="table-settings">
                  <select id = "activeData" onChange={dataSwitch}>
                      <option value = "Season" defaultValue>2022 Stats</option>
                      <option value = "L30">30 Day Stats</option>
                      <option value = "L7">7 Day Stats</option>
                  </select>
              </td>
            </tr>
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[50, 100, 150, 200, 250].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                  <span>
                    <i className={column.isSorted ? column.isSortedDesc ? "fa-solid fa-chevron-down" : "fa-solid fa-chevron-up": ''}></i>
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <thead>
        {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{}
                  {column.Filter ? column.render('Filter') : null}
                
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
  }
