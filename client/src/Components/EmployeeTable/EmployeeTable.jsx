import { Link } from "react-router-dom";
import { useState } from "react";
import "./EmployeeTable.css";
import { useNavigate } from "react-router-dom";

function EmployeeTable({ page, employees, onDelete, setOrder, order }) {
  const [searched, setSearched] = useState("");
  const navigate = useNavigate();
  const employeePerPage = 10;
  const startIndex = (page - 1) * employeePerPage;
  const endIndex = page * employeePerPage;


  function handleOrder(orderBy) {
    setOrder({
      ...order,
      sortedBy: orderBy,
      order: order.order === "desc" ? "asc" : "desc",
    });
  }

  function handleArrow(orderBy) {
    return order.sortedBy === orderBy && (order.order === "asc" ? "⬇" : "⬆");
  }


  const handlePresent = (id) => {
    const presentDate = new Date().toISOString().split("T")[0];

console.log(presentDate)
    return fetch(`/api/employees/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ present: presentDate }),
    }).then((res) => res.json());
  };


  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th>
              <button onClick={() => navigate(`/missing`)}>Present</button>
            </th>
            <th>
              <button onClick={() => handleOrder("Name")}>
                Name {handleArrow("Name")}
              </button>
            </th>
            <th>
              <button onClick={() => handleOrder("Level")}>
                Level {handleArrow("Level")}
              </button>
            </th>
            <th>
              <button onClick={() => handleOrder("Position")}>
                Position {handleArrow("Position")}
              </button>
            </th>
            <th>
              <input
                onChange={(e) => setSearched(e.target.value)}
                placeholder="Search..."
              ></input>
            </th>

            <th />
          </tr>
        </thead>
        <tbody>
          {!searched
            ? employees.slice(startIndex, endIndex).map((employee) => (
                <tr key={employee._id}>
                  <td>
                    <input
                      onChange={() => handlePresent(employee._id)}
                      type="checkbox"
                      id={employee._id}
                      className="present"
                    ></input>
                  </td>
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
                    <Link to={`/bonus/${employee._id}`}>
                      <button type="button">$</button>
                    </Link>
                  </td>
                </tr>
              ))
            : employees
                .filter(
                  (employee) =>
                    employee.level
                      .toLowerCase()
                      .includes(searched.toLowerCase()) ||
                    employee.position
                      .toLowerCase()
                      .includes(searched.toLowerCase()) ||
                    employee.name.toLowerCase().includes(searched.toLowerCase())
                )
                .slice(startIndex, endIndex)
                .map((employee) => (
                  <tr key={employee._id}>
                    <td>
                      <input
                        onChange={() => handlePresent(employee._id)}
                        type="checkbox"
                        id={employee._id}
                        className="present"
                      ></input>
                    </td>
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
                ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
