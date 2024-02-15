import { Link } from "react-router-dom";
import "./ExperienceTable.css";

export default function ExperienceTable({ employees }) {
  return (
    <div className="ExpereinceTable">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Experience</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {employees &&
            employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.position}</td>
                <td>
                  {employee.experience}{" "}
                  {employee.experience > 1 ? "years" : "year"}
                </td>
                <td>
                  <Link to={`/update/${employee._id}`}>
                    <button type="button">Update</button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
