import { useState } from "react";

const EmployeeForm = ({ onSave, disabled, employee, onCancel, equipments }) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");
  const [selectedEquipment, setSelectedEquipment] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (equipments) {
      const addNewEquipment = {
        name: selectedEquipment,
        createdAt: new Date(),
      };
      const updatedEquipments = [...employee.equipments, addNewEquipment];
      console.log(employee);
      if (employee) {
        return onSave({
          ...employee,
          name,
          level,
          position,
          updatedEquipments,
        });
      }

      return onSave({
        name,
        level,
        position,
        updatedEquipments,
      });
    } else {
      if (employee) {
        return onSave({
          ...employee,
          name,
          level,
          position,
        });
      }

      return onSave({
        name,
        level,
        position,
      });
    }
  };

  const handleEquipmentChange = (e) => {
    e.preventDefault();
    setSelectedEquipment(e.target.value);
  };

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          name="position"
          id="position"
        />
      </div>
      {equipments ? (
        <div className="control">
          <label htmlFor="equipments">Equipments:</label>
          {employee.equipments.length > 0
            ? employee.equipments.map((equipment) => <p>{equipment.name}</p>)
            : null}
          <select id="equipmentList" onChange={handleEquipmentChange}>
            <option>Select an equipment</option>
            {equipments.map((equipment, index) => (
              <option key={index} name={equipment.name}>
                {equipment.name}
              </option>
            ))}
          </select>
        </div>
      ) : null}
      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
