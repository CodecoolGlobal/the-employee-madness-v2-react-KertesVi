import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";
import Loading from "../Components/Loading";

const updateEmployee = (employee) => {
  return fetch(`/api/employees/${employee._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const fetchEmployee = (id) => {
  return fetch(`/api/employees/${id}`).then((res) => res.json());
};

const fetchEquipments = () => {
  return fetch(`/api/equipments`).then((res) => res.json());
};

const fetchBrands = () => {
  return fetch(`/api/brands`).then((res) => res.json());
};

const fetchCompanies = () => {
  return fetch(`/api/company`).then((res) => res.json());
};

const EmployeeUpdater = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(true);
  const [equipments, setEquipments] = useState([]);
  const [brands, setBrands] = useState("");
  const [companies, setCompanies] = useState();


  useEffect(() => {
    setEmployeeLoading(true);
    fetchCompanies()
      .then((companies) =>
        setCompanies(
          companies.map((company) => ({
            label: company.name,
            value: company._id,
          }))
        )
      )
      .catch((error) => console.error(error));
    fetchEmployee(id).then((employee) => {
      setEmployee(employee);
      fetchEquipments().then((equipments) => setEquipments(equipments));

      fetchBrands().then((brands) =>
        setBrands(
          brands.map((nextBrand) => ({
            label: nextBrand.name,
            value: nextBrand._id,
          }))
        )
      );
      setEmployeeLoading(false);
    });
  }, [id]);

  const handleUpdateEmployee = (employee) => {
    setUpdateLoading(true);
    updateEmployee(employee).then(() => {
      setUpdateLoading(false);
      alert("Employee updated");
      navigate(`/update/${employee._id}`);
    });
  };

  if (employeeLoading) {
    return <Loading />;
  }
  return (
    <EmployeeForm
      companies={companies}
      brands={brands}
      equipments={equipments}
      employee={employee}
      onSave={handleUpdateEmployee}
      disabled={updateLoading}
      onCancel={() => navigate("/")}
    />
  );
};

export default EmployeeUpdater;
