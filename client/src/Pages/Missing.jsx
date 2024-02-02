import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = (sortedBy, order) => {

  let url = `/api/missing`;

  if (sortedBy !== "" && order !== "") {
    const query = new URLSearchParams({ sortedBy: sortedBy, order: order });
    url += `?${query}`;
  }
  return fetch(url).then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const Missing = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [order, setOrder] = useState({
    sortedBy: "",
    order: "",
  });

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    fetchEmployees(order.sortedBy, order.order).then((employees) => {
        setLoading(false);
        setEmployees(employees);
      }
    );
  }, [order.order, order.sortedBy]);

  if (loading) {
    return <Loading />;
  }

  return (
    <EmployeeTable
      employees={employees}
      setOrder={setOrder}
      order={order}
      onDelete={handleDelete}
    />
  );
};

export default Missing;
