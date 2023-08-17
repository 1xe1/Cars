import React, { useState, useEffect } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { fetchData } from "../Api";
import { Link } from "react-router-dom";

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

  const handleDeleteConfirmation = (id) => {
    if (window.confirm("คุณต้องการลบรายการนี้ใช่หรือไม่?")) {
      DeleteData(id);
    }
  };

  const DeleteData = (id) => {
    var data = {
      motorcycle_id: id,
    };
    fetch("http://localhost:8081/Cars/", {
      method: "DELETE",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result["message"]);
        if (result["status"] === "ok") {
          // ใช้ setCars เพื่ออัปเดตข้อมูลใน state
          fetchData()
            .then((data) => setCars(data))
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
        }
      });
  };

  return (
    <div className="border-8 ">
      <link
        href="https://cdn.datatables.net/1.10.18/css/dataTables.bootstrap4.min.css"
        rel="stylesheet"
      />
        <div className="container mx-auto p-4 text-center">
          <Link to="/InsertData" className="border-gray-800 border-4 p-4 rounded-lg text-white bg-green-600">
            เพิ่มข้อมูล
          </Link>
        </div>
      <table id="myTable" className="table ">
        <thead>
          <tr>
            <th>ID</th>
            <th>ยี่ห้อ</th>
            <th>รุ่น</th>
            <th>ปีผลิต</th>
            <th>ราคา</th>
            <th>สภาพรถ</th>
            <th>รายละเอียดเพิ่มเติม</th>
            <th>รูปภาพ</th>
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
              <button className="px-4 py-2 bg-blue-500 text-white mr-4 rounded-lg " >
                  Edit
                </button>
                <button className="delete px-4 py-2 bg-C70039 text-white rounded-lg " onClick={() => handleDeleteConfirmation(item.motorcycle_id)} >
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
