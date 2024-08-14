import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

import "./Layout.css";

export default function Layout() {
  const [activeLink, setActiveLink] = useState("");

  const handleActive = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="Layout">
      <nav>
        <ul>
          <li className="grow">
            <Link to="/" onClick={()=>handleActive("employees")} style={activeLink === "employees" ? { color: "black" } : { color: "white" }}>Employees</Link>
            <br></br>
            <Link to="/equipments" onClick={()=>handleActive("equipments")} style={activeLink === "equipments" ? { color: "black" } : { color: "white" }}>Equipments</Link>
          </li>

          <li>
            <Link to="/createEquipments">
              <button type="button">Create Equipment</button>
            </Link>
          </li>
          <li>
            <Link to="/create">
              <button type="button">Create Employee</button>
            </Link>

            <Link to="/company">
              <button type="button">Create Company</button>
            </Link>

          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
