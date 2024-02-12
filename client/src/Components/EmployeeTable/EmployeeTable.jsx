import { Link } from "react-router-dom";
import { useState } from "react";
import "./EmployeeTable.css";

function EmployeeTable({
  employees,
  onDelete,
  setOrder,
  order,
  page,
  setPage,
}) {
  const [searched, setSearched] = useState("");

  function handleSearch(e) {
    setSearched(e.target.value);
  }

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
    const presentDate = new Date(); // Create a new Date object
    const presentDateString = presentDate.toISOString().split("T")[0];
    console.log(presentDateString);
    return fetch(`/api/employees/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ present: presentDateString }),
    }).then((res) => res.json());
  };

  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th>
              <button>present</button>
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
                  <td>
                    <input
                      onChange={() => handlePresent(employee._id)}
                      type="checkbox"
                      id={employee._id}
                      className="present"
                    ></input>
                    {employee.name}
                  </td>
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
            : employees.map((employee) =>
                employee.level.toLowerCase().includes(searched.toLowerCase()) ||
                employee.position
                  .toLowerCase()
                  .includes(searched.toLowerCase()) ? (
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
