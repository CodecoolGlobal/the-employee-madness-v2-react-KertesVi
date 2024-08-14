import React from "react";
import { useState } from "react";

const CreateCompany = () => {
  const [company, setCompany] = useState([]);

  console.log(company);

  const createCompany = (company) => {
    return fetch("/api/company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name: company}),
    }).then((res) => res.json());
  };

  async function onSave(e) {
    e.preventDefault()
    await createCompany(company);
    console.log("saved");
  }

  return (
    <>
      <form className="CompanyForm" onSubmit={onSave}>
        <div className="control">
          <label htmlFor="name">Name:</label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            name="name"
            id="name"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default CreateCompany;
