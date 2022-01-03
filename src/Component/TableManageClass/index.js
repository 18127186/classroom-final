import React, {useEffect,useState} from "react";
import { useTable, useGlobalFilter, useAsyncDebounce  } from "react-table";
import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Modal, Form } from "react-bootstrap"
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 200)
  
    return (
      <span>
        Search:{' '}
        <input
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
        />
      </span>
    )
}
function TableManageClass({ columns, data, uploadData }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,state,
    preGlobalFilteredRows, 
    setGlobalFilter, } =
    useTable({
      columns,
      data,
    },
    useGlobalFilter 
  );
  
  
  return (
    <div className="row">
        <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
        />
        <table {...getTableProps()} border="1" className="table-data">
          <thead>
              {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                  ))}
              </tr>
              ))}
          </thead>
          <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
              prepareRow(row);
              return (
                  
                  <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    if (row.values.username !== "root")
                      return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                  })}
                  
                  </tr>
                  
              );
              })}
          </tbody>
        </table>
          
    </div>

  );
}

export default TableManageClass;