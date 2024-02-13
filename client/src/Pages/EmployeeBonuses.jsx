import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import { useNavigate, useParams } from "react-router-dom";

export default function EmployeeBonuses() {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(true);
  const [bonus, setBonus] = useState(0);

  const bonuses = employee?.bonuses || [];
  const totalBonusAmount = () => {
    if (!bonuses.length) return 0;
    return bonuses.reduce((total, bonus) => total + bonus.value, 0);
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setEmployeeLoading(true);
        const response = await fetch(`/api/employees/${employeeId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch employee");
        }
        const employeeData = await response.json();
        setEmployee(employeeData);
        setEmployeeLoading(false);
      } catch (error) {
        console.error("Error fetching employee:", error);
        setEmployeeLoading(false);
      }
    };
    fetchEmployee();
  }, [employeeId]);


  const handleUpdateEmployee = async () => {
    try {
      setUpdateLoading(true);
      const response = await fetch(`/api/bonus/${employee._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: bonus }),
      });
      if (!response.ok) {
        throw new Error("Failed to update bonus");
      }
      setUpdateLoading(false);
      navigate(`/`);
    } catch (error) {
      console.error("Error updating bonus:", error);
      setUpdateLoading(false);
    }
  };

  if (employeeLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="control">
        <h1 htmlFor="name">Bonuses of <span style={{ color: 'red' }}>{employee.name}</span></h1>
        <h3 id="level">Level: {employee.level}</h3>
        <h3 id="position">Position: {employee.position}</h3>
      </div>

      <div className="control">
        <label>Bonuses:</label>
        {employee.bonuses.map((bonus, index) => (
          <p key={index}>
            Date: {bonus.createdAt.split("T")[0]} Amount: $ {bonus.value}
          </p>
        ))}
        <p>
          <strong>Total bonus earned: $ {totalBonusAmount()} </strong>
        </p>

        <label>Add bonus:</label>
        <input type="number" onChange={(e) => setBonus(e.target.value)} />
      </div>

      <div className="buttons">
        <button type="submit" onClick={handleUpdateEmployee}>
          Save Bonus
        </button>
        <button type="button" onClick={() => navigate("/")}>
          Return
        </button>
      </div>
      </>
  );
}
