import { useState } from "react";

const BonusForm = ({ onSave, disabled, employee, onCancel }) => {
  const [bonus, setBonus] = useState(0);

  const bonuses = employee?.bonuses || [];

  const totalBonusAmount = () => {
    if (!bonuses.length) return 0;
    return bonuses.reduce((total, bonus) => total + bonus.value, 0);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const addNewBonus = { value: bonus, createdAt: new Date() };
    const updatedBonuses = [...employee.bonuses, addNewBonus];
    const updatedEmployee = { ...employee, bonuses: updatedBonuses };

    onSave(updatedEmployee);
    setBonus("");
  };

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      <div className="control">
        <h1 htmlFor="name">Bonuses of {employee.name}</h1>
        <p id="level">Level: {employee.level}</p>
        <p id="position">Position: {employee.position}</p>
      </div>

      <div className="control">
        <label htmlFor="bonus">Bonuses:</label>
        {employee.bonuses.map((bonus, index) => (
          <p key={index}>
            Date: {bonus.createdAt.split("T")[0]} Amount: {Number(bonus.value)}{" "}
            $
          </p>
        ))}
        <p>
          <strong>Total bonus earned: {totalBonusAmount()} $</strong>
        </p>

        <label htmlFor="bonus">Add bonus:</label>
        <input
          onChange={(e) => setBonus(Number(e.target.value))}
          id="bonuses"
        />
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          Save Bonus
        </button>

        <button type="button" onClick={onCancel}>
          Return
        </button>
      </div>
    </form>
  );
};

export default BonusForm;
