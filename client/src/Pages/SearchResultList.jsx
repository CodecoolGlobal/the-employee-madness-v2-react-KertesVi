import React, { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import { useParams } from "react-router-dom";

const fetchEmployees = (search) => {
  if (!search) {
    alert("Missing search word");
    return Promise.reject("Missing search word");
  }
  return fetch(`/api/search/${search}`).then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

export default function SearchResultList() {
  const { search } = useParams();
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [order, setOrder] = useState({
    sortedBy: "",
    order: "",
  });
  console.log(search);

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    fetchEmployees(search).then((employees) => {
      setLoading(false);
      setEmployees(employees);
    });
  }, [search]);

  if (loading) {
    return <Loading />;
  }

  return (
    <EmployeeTable
      setOrder={setOrder}
      order={order}
      employees={employees}
      onDelete={handleDelete}
    />
  );
}
