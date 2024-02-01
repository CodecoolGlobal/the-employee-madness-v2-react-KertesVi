import { Link } from "react-router-dom";
import { useState } from "react";
import "./EmployeeTable.css";



function EmployeeTable({ employees, onDelete, setOrder, order, setMissing}) {
  const [searched, setSearched] = useState("");

  function handleSearch(e) {
    setSearched(e.target.value);
  }

  function handleOrder(orderBy){
    setOrder({...order, sortedBy: orderBy, order: order.order === "desc" ?  "asc": "desc"})
  }

  function handleArrow(orderBy){
    return order.sortedBy === orderBy && (order.order === "asc" ?  "⬇": "⬆")
  }

  function handlePresent(id){
    setMissing((prevMissing) => {
      const isPresent = prevMissing && prevMissing._id === id;
      return isPresent ? null :  {_id: id} ; 
    });
  }
  

  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th><button>present</button><button onClick={()=> handleOrder("Name")}>Name {handleArrow("Name")}</button></th>
            <th><button onClick={()=> handleOrder("Level")}>Level {handleArrow("Level")}</button></th>
            <th><button onClick={()=> handleOrder("Position")}>Position {handleArrow("Position")}</button></th>
            <th>
              <input
                onChange={handleSearch}
                placeholder="Search by level or position"
              ></input>
            </th>
           <th />
          </tr>
        </thead>
        <tbody>
          {!searched
            ? employees.map((employee) => (
                <tr key={employee._id}>
                  <td><input onChange={()=> handlePresent(employee._id)} type="checkbox" id={employee._id} className="present"></input>{employee.name}</td>
                  <td>{employee.level}</td>
                  <td>{employee.position}</td>
                  <td>
                    <Link to={`/update/${employee._id}`}>
                      <button type="button">Update</button>
                    </Link>
                    <button
                      type="button"
                      onClick={() => onDelete(employee._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : employees.map((employee) =>
                employee.level.toLowerCase().includes(searched.toLowerCase()) ||
                employee.position.toLowerCase().includes(searched.toLowerCase()) ? (
                  <tr key={employee._id}>
                    <td>{employee.name}</td>
                    <td>{employee.level}</td>
                    <td>{employee.position}</td>
                    <td>
                      <Link to={`/update/${employee._id}`}>
                        <button type="button">Update</button>
                      </Link>
                      <button
                        type="button"
                        onClick={() => onDelete(employee._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ) : null
              )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
