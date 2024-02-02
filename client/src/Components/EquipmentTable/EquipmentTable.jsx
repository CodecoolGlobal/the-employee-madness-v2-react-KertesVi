import { Link } from "react-router-dom";
import "./EquipmentTable.css";

export default function EquipmentTable({ equipments, onDelete }) {
  console.log(equipments);
  return (
    <div className="EquipmentTable">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Amount</th>

            <th />
          </tr>
        </thead>
        <tbody>
          {equipments.map((equipment) => (
            <tr key={equipment._id}>
              <td>{equipment.name}</td>
              <td>{equipment.type}</td>
              <td>{equipment.amount}</td>
              <td>
                <Link to={`/updateEquipments/${equipment._id}`}>
                  <button type="button">Update</button>
                </Link>
                <button type="button" onClick={() => onDelete(equipment._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div id="listingTable">
      <button href="javascript:prevPage()" id="btn_prev">
        Prev
      </button>
      <button href="javascript:nextPage()" id="btn_next">
        Next
      </button>
      page: <span id="page"></span>
      </div>
    </div>
  );
}
