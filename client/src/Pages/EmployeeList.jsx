import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import Pagination from "../Components/Pagination";

const fetchEmployees = (sortedBy, order) => {
  if (sortedBy === "" && order === "") {
    return fetch(`/api/employees`).then((res) => res.json());
  }
  const query = new URLSearchParams({ sortedBy: sortedBy, order: order });
  return fetch(`/api/employees?${query}`).then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [order, setOrder] = useState({
    sortedBy: "",
    order: "",
  });
  const [page, setPage] = useState(1);

  const handleDelete = (id) => {
    const isConfirmed = window.confirm(`Are you sure you want to cancel?`);
    if (isConfirmed) {
      deleteEmployee(id);

      setEmployees((employees) => {
        return employees.filter((employee) => employee._id !== id);
      });
    }
  };

  useEffect(() => {
    fetchEmployees(order.sortedBy, order.order).then((employees) => {
      setLoading(false);
      setEmployees(employees);
    });
  }, [order.order, order.sortedBy]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <EmployeeTable
        page={page}
        employees={employees}
        setOrder={setOrder}
        order={order}
        onDelete={handleDelete}
      />
      <Pagination employeeTotal={employees.length} setPage={setPage} page={page} />
    </>
  );
};

export default EmployeeList;
