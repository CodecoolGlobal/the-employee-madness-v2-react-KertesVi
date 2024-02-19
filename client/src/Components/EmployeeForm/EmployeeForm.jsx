import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { CirclePicker } from "react-color";

const EmployeeForm = ({
  onSave,
  disabled,
  employee,
  onCancel,
  equipments,
  brands,
}) => {
  const navigate = useNavigate();
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [favBrandId, setFavBrandId] = useState(employee?.favoriteBrand ?? "");
  const [color, setColor] = useState(employee?.color ?? "#FFFFFF");
  const [salary, setSalary] = useState(employee?.salary ?? 0);
  const [desiredSalary, setDesiredSalary] = useState(
    employee?.desiredSalary ?? 0
  );
  const [startDate, setStartDate] = useState(
    employee?.startDate.split("T")[0] ?? 0);

  const onSubmit = (e) => {
    e.preventDefault();
    let updatedEquipments = [];
    if (equipments) {
      if (selectedEquipment !== "") {
        const addNewEquipment = { name: selectedEquipment };
        updatedEquipments = employee.equipments.push(addNewEquipment);
      } else {
        updatedEquipments = employee.equipments;
      }
      if (employee) {
        return onSave({
          ...employee,
          name,
          level,
          position,
          updatedEquipments,
          favoriteBrand: favBrandId,
          color: color,
          startDate: startDate,
          salary: salary,
          desiredSalary: desiredSalary,
        });
      }

      return onSave({
        name,
        level,
        position,
        updatedEquipments,
        favoriteBrand: favBrandId,
        color: color,
        startDate: startDate,
        salary: salary,
        desiredSalary: desiredSalary,
      });
    } else {
      if (employee) {
        return onSave({
          ...employee,
          name,
          level,
          position,
          favoriteBrand: favBrandId,
          color: color,
          startDate: startDate,
          salary: salary,
          desiredSalary: desiredSalary,
        });
      }

      return onSave({
        name,
        level,
        position,
        favoriteBrand: favBrandId,
        color: color,
        startDate: startDate,
        salary: salary,
        desiredSalary: desiredSalary,
      });
    }
  };

  const handleEquipmentChange = (e) => {
    e.preventDefault();
    setSelectedEquipment(e.target.value);
  };

  const removeEquipment = (id) => {
    if (employee && Array.isArray(employee.equipments)) {
      const index = employee.equipments.findIndex(
        (equipment) => equipment._id === id
      );

      if (index !== -1) {
        employee.equipments.splice(index, 1);
        alert("Equipment removed successfully");
        console.log(employee);
        navigate(`/update/${employee._id}`);
      } else {
        console.log("Equipment not found");
      }
    } else {
      console.log("Invalid employee or equipments array");
    }
  };

  const displayFavBrandName = () => {
    for (const brand of brands) {
      if (favBrandId === brand.value) {
        return brand.label;
      }
    }
  };

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value)
  }

  const handleSalaryChange = (e) => {
    setSalary(e.target.value)
  }

  const handleDesiredSalaryChange = (e) => {
    setDesiredSalary(e.target.value)
  }

  const countDifferenceBetweenSalaryAndDesire = (desiredSalary, salary) => {
    return desiredSalary - salary
  }

  return (
    <form className="EmployeeForm" onSubmit={onSubmit} >
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

      <div className="control">
        <label htmlFor="startingDate">Starting Date:</label>
        <input
        type="date"
          value={startDate}
          onChange={handleStartDateChange}
          name="startingDate"
          id="startingDate"
        />
      </div>

      <div className="control">
        <label htmlFor="salary">Salary in USD:</label>
        <input
        type="number"
          value={salary}
          onChange={handleSalaryChange}
          name="salary"
          id="salary"
        />
          <label htmlFor="salary">Desired Salary:</label>
        <input
        type="number"
          value={desiredSalary}
          onChange={handleDesiredSalaryChange}
          name="desiredSalary"
          id="desiredSalary"
        />
        <p>Difference: ${countDifferenceBetweenSalaryAndDesire(desiredSalary, salary)} </p>
      </div>

      <div style={{ backgroundColor: color }} className="control">
        <label htmlFor="favoriteColor">FavoriteColor: {color}</label>
       <CirclePicker color={color} onChange={handleColorChange} />
      </div>

      <div className="control">
        <label htmlFor="favoriteBrand">
          FavoriteBrand: <strong>{displayFavBrandName()}</strong>
        </label>
        <Select
          options={brands}
          defaultValue={favBrandId}
          onChange={(option) => setFavBrandId(option.value)}
        />
      </div>

      {equipments ? (
        <div className="control">
          <label htmlFor="equipments">Equipments:</label>
          <ul>
            {employee.equipments.length > 0
              ? employee.equipments.map((equipment, index) => (
                  <li key={index}>
                    {equipment.name}
                    <button onClick={() => removeEquipment(equipment._id)}>
                      ❌
                    </button>
                  </li>
                ))
              : null}
          </ul>
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
