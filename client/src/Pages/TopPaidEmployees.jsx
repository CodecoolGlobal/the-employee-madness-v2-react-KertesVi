import React from "react";
import { useEffect, useState } from "react";

export default function TopPaidEmployees() {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = () => {
    return fetch(`/api/employees`).then((res) => res.json());
  };

  const sortTopEmployeeSalary = (employees) => {
    return employees.sort((a, b) => b.salary - a.salary);
  };

  useEffect(() => {
    fetchEmployees().then((employees) => {
      const sortedEmployees = sortTopEmployeeSalary(employees);
      setEmployees(sortedEmployees);
    });
  }, []);

  const countDeferenceBetweenPreviousEmployee = (employees) => {
    const differences = [];
    for (let i = 1; i < employees.length; i++) {
      const currentSalary = employees[i].salary;
      const previousSalary = employees[i - 1].salary;
      const difference = currentSalary - previousSalary;
      differences.push(difference);
    }
    return differences;
  };
  const salaryDifferences = countDeferenceBetweenPreviousEmployee(employees);

  return (
    <div className="TopPaidTable">
      <h1>Top Paid Employees</h1>
      <table>
        <thead>
          <tr>
            <th>Nr.</th>
            <th>Name</th>
            <th>Salary</th>
            <th>Difference between previous</th>
            <th>Desired Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees.slice(0, 3).map((employee, index) => (
            <tr key={employee._id}>
              <td>{index + 1}</td>
              <td>{employee.name}</td>
              <td>{employee.salary} $</td>
              <td>{index > 0 ? salaryDifferences[index - 1] + " $" : "-"}</td>
              <td>{employee.desiredSalary} $</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
