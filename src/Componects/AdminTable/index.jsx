import React, { useState, useEffect } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { fetchData } from "../Api";
import { Link } from "react-router-dom";

function AdminTable() {
  const [cars, setCars] = useState([]);
  const [update, setUpdate] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

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

  const [showDeleteSpinner, setShowDeleteSpinner] = useState(false);

  const DeleteData = (id) => {
    var data = {
      motorcycle_id: id,
    };

    // เมื่อกดปุ่ม "DEL" ให้เปิด Popup และสามารถปรับปรุง UI ให้แสดง Animated SVG with spinner
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?")) {
      setShowDeleteSpinner(true);

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
          setShowDeleteSpinner(false);
          alert(result["message"]);
          if (result["status"] === "ok") {
            fetchData()
              .then((data) => setCars(data))
              .catch((error) => {
                console.error("Error fetching data:", error);
                setShowDeleteSpinner(false);
              });
          }
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
          setShowDeleteSpinner(false);
        });
      window.location.reload();
    }
  };

  const handleReadMore = (Car) => {
    setSelectedData(Car);
    setUpdate(true);
  };

  const handleUpdateData = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8081/Cars/${selectedData.motorcycle_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedData),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result["message"]);
        if (result["status"] === "success") {
          fetchData()
            .then((data) => setCars(data))
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
        }
        setSelectedData(null);
        setUpdate(false); // เปลี่ยนสถานะการแก้ไขเมื่อเสร็จสิ้นการอัปเดต
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  const handleCloseDetails = () => {
    setUpdate(false);
    setSelectedData(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="border-8 ">
      <link
        href="https://cdn.datatables.net/1.10.18/css/dataTables.bootstrap4.min.css"
        rel="stylesheet"
      />
      <div className="container mx-auto p-4 text-center">
        <Link
          to="/InsertData"
          className="border-gray-800 border-4 p-4 rounded-lg text-white bg-green-600"
        >
          เพิ่มข้อมูล
        </Link>
      </div>
      <table id="myTable" className="table ">
        <thead>
          <tr>
            <th>ID</th>
            <th>ยี่ห้อ</th>
            <th>รุ่น</th>
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
                  className="w-24 h-16 rounded-lg"
                />
              </td>
              <td>
                <button
                  className="px-4 py-2 bg-blue-500 text-white mr-4 rounded-lg"
                  onClick={() => handleReadMore(item)}
                >
                  Edit
                </button>
                <button
                  className="delete px-4 py-2 bg-C70039 text-white rounded-lg"
                  onClick={() => DeleteData(item.motorcycle_id)}
                >
                  DEL
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDeleteSpinner && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="absolute">
            <svg
              className="animate-spin h-10 w-10 text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.937l3-2.646z"
              ></path>
            </svg>
          </div>
        </div>
      )}
      {update && selectedData && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="bg-white p-6 w-3/4 max-w-md rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center">
              แก้ไขข้อมูลรถจักรยานยนต์
            </h2>
            <form onSubmit={handleUpdateData} className="space-y-4">
              <div className="mb-4">
                <label htmlFor="brand" className="block font-semibold">
                  ยี่ห้อ:
                </label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={selectedData.brand}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="model" className="block font-semibold">
                  รุ่น:
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={selectedData.model}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
              {/* ... (Repeat for other input fields) */}
              <div className="mb-4">
                <label htmlFor="year" className="block font-semibold">
                  ปีผลิต:
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={selectedData.year}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block font-semibold">
                  ราคา:
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={selectedData.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="condition" className="block font-semibold">
                  สภาพรถ:
                </label>
                <input
                  type="text"
                  id="condition"
                  name="condition"
                  value={selectedData.condition}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block font-semibold">
                  รายละเอียดเพิ่มเติม:
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={selectedData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="image_url" className="block font-semibold">
                  ลิงค์รูปภาพ:
                </label>
                <input
                  type="text"
                  id="image_url"
                  name="image_url" // ต้องตรงกับฟิลด์ที่ใช้ใน State
                  value={selectedData.image_url}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  บันทึก
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 ml-2 focus:outline-none focus:ring focus:ring-red-300"
                  onClick={handleCloseDetails}
                >
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminTable;
