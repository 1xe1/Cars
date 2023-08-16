import React, { useState, useEffect } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { fetchData } from "../Api";

function AdminTable() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchData()
      .then((data) => setCars(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (cars.length > 0) {
      $("#myTable").DataTable();
    }
  }, [cars]);

  return (
    <div className="border-8 ">
      <link
        href="https://cdn.datatables.net/1.10.18/css/dataTables.bootstrap4.min.css"
        rel="stylesheet"
      />
        <div className="container mx-auto p-4 text-center">
          <button className="border-gray-800 border-4 p-4 rounded-lg text-white bg-green-600">
            เพิ่มข้อมูล
          </button>
        </div>
      <table id="myTable" className="table ">
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
            <th>btn</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((item) => (
            <tr key={item.motorcycle_id}>
              <td>{item.motorcycle_id}</td>
              <td>{item.brand}</td>
              <td>{item.model}</td>
              <td>{item.year}</td>
              <td>${item.price}</td>
              <td>{item.condition}</td>
              <td>{item.description}</td>
              <td>
                <img
                  src={item.image_url}
                  alt={item.model}
                  className="w-24 h-16 rounded-lg" // Adjust the image width, height, and rounded corners
                />
              </td>
              <td>
              <button className="px-4 py-2 bg-blue-500 text-white mr-4 rounded-lg ">
                  Edit
                </button>
                <button className="px-4 py-2 bg-C70039 text-white rounded-lg">
                  DEL
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminTable;
