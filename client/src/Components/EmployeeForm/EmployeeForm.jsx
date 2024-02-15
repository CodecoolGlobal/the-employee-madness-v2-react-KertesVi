import { useState } from "react";

const EmployeeForm = ({
  onSave,
  disabled,
  employee,
  onCancel,
  equipments,
  brands,
}) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [experience, setExperience] = useState(employee?.experience ?? 0)
console.log(experience)
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
          experience,
        });
      }

      return onSave({
        name,
        level,
        position,
        updatedEquipments,
        experience,
      });
    } else {
      if (employee) {
        return onSave({
          ...employee,
          name,
          level,
          position,
          experience,
        });
      }

      return onSave({
        name,
        level,
        position,
        experience,
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
      } else {
        console.log("Equipment not found");
      }
    } else {
      console.log("Invalid employee or equipments array");
    }
  };

  const getFavBrand = () => {
    for (const brand of brands) {
      if (employee.favoriteBrand === brand._id) {
        return brand.name;
      }
    }
    return null; 
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

    <div className="control">
    {employee.level !== "Junior" ?
    (<>
      <label>Experience:</label>
      <input type="number" onChange={(e)=> setExperience(e.target.value)} value={experience}/>
      </>): null}
    </div>

      <div className="control">
        <label htmlFor="FavoriteBrand">FavoriteBrand:</label>
        <p>{getFavBrand()}</p>
      </div>

      {equipments ? (
        <div className="control">
          <label htmlFor="equipments">Equipments:</label>
          {employee.equipments.length > 0
            ? employee.equipments.map((equipment, index) => (
                <p key={index}>
                  {equipment.name}
                  <button onClick={() => removeEquipment(equipment._id)}>
                    ❌
                  </button>
                </p>
              ))
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
