import { useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ExperienceTable from "../Components/Experience/ExperienceTable";
import PageNotFound from "./PageNotFound";

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) =>
    res.json().catch((err) => console.err(err))
  );
};

export default function Experience(){
  const { experience } = useParams();
  const [employees, setEmployees] = useState([]);
  const [validParam, setValidParam] = useState(true)

  const filterExperienceOfEmployees = (employees, experience) => {
    try {
      const filteredEmployees = employees.filter(
        (employee) => Number(experience) < Number(employee.experience)
      );

      if (filteredEmployees.length === 0) {
        throw new Error("No employee has match the criteria");
      }

      return filteredEmployees;
    } catch (error) {
      console.error(error);
    }
  };

  const handleError = (params) => {
    if (params < 0 || isNaN(params) === true) {
      setValidParam(false)
    }    
  }

  useEffect(() => {
    fetchEmployees().then((employees) => {
      setEmployees(filterExperienceOfEmployees(employees, experience));
      handleError(experience)
    });
  }, [experience]);
console.log(validParam)
console.log(experience)

  return validParam ? <ExperienceTable employees={employees} /> : <PageNotFound/>
  
};

