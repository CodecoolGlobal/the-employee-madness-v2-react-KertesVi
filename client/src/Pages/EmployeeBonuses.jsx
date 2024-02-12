import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import { useNavigate, useParams } from "react-router-dom";
import BonusForm from "../Components/EmployeeForm/BonusForm";

const updateBonusEmployee = (employee) => {
    console.log(employee)
  return fetch(`/api/bonus/${employee._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({...employee,
        bonuses: [...employee.bonuses, { value: employee.bonus }],
      }),
    })
      .then((res) => res.json());
  };

const fetchEmployee = (id) => {
  return fetch(`/api/employees/${id}`).then((res) => res.json());
};

export default function EmployeeBonuses() {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(true);

  useEffect(() => {
    setEmployeeLoading(true);
    fetchEmployee(employeeId)
    .then((employee) => {
      setEmployee(employee);
      setEmployeeLoading(false);
    });
  }, [employeeId]);

  const handleUpdateEmployee = (employee) => {
    setUpdateLoading(true);
    updateBonusEmployee(employee)
    .then(() => {
      setUpdateLoading(false);
      navigate(`/`);
    });
  };

  if (employeeLoading) {
    return <Loading />;
  }

  return (
    <BonusForm
      employee={employee}
      onSave={handleUpdateEmployee}
      disabled={updateLoading}
      onCancel={() => navigate("/")}
    />
  );
}
