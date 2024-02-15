import { useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ExperienceTable from "../Components/Experience/ExperienceTable";

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) =>
    res.json().catch((err) => console.err(err))
  );
};

export default function Experience(){
  const { number } = useParams();
  const [employees, setEmployees] = useState([]);

  const filterExperienceOfEmployees = (employees, params) => {
    try {
      if (params < 0 || isNaN(params) === true) {
        throw new Error("Invalid Parameter");
      }    

      const filteredEmployees = employees.filter(
        (employee) => Number(params) < Number(employee.experience)
      );

      if (filteredEmployees.length === 0) {
        throw new Error("No employee has match the criteria");
      }

      return filteredEmployees;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployees().then((employees) => {
      setEmployees(filterExperienceOfEmployees(employees, number));
    });
  }, [number]);

  return <ExperienceTable employees={employees} />;
};

