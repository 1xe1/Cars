import React, { useState, useEffect } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { fetchData } from "../Api";

function AdminTable() {
  const [cars, setCars] = useState([]); // Changed 'Cars' to 'cars'

  useEffect(() => {
    fetchData().then((data) => setCars(data));
  }, []);

  useEffect(() => {
    $("#myTable").DataTable(); // Initialize DataTable plugin after data is fetched
  }, [cars]); // Re-run this effect whenever 'cars' data changes

  return (
    <div className="show">
      <link
        href="https://cdn.datatables.net/1.10.18/css/dataTables.bootstrap4.min.css"
        rel="stylesheet"
      ></link>
      <table id="myTable" className="display">
        <thead>
          <tr>
            <th>motorcycle_id</th>
            <th>brand</th>
            <th>model</th>
            <th>year</th>
            <th>price</th>
            <th>condition</th>
            <th>description</th>
            <th>image_url</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((item) => ( // Changed 'data' to 'cars'
            <tr key={item.motorcycle_id}>
              <td>{item.motorcycle_id}</td>
              <td>{item.brand}</td>
              <td>{item.model}</td>
              <td>{item.year}</td>
              <td>{item.price}</td>
              <td>{item.condition}</td>
              <td>{item.description}</td>
              <td>
                <img src={item.image_url} alt={item.model} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminTable;
