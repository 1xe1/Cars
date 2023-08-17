import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function InsertData() {
  const [motorcycleData, setMotorcycleData] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
    condition: "",
    description: "",
    imageUrl: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMotorcycleData({
      ...motorcycleData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setProcessing(true); // เริ่มประมวลผล

      const response = await fetch("http://localhost:8081/Cars/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(motorcycleData),
      });

      if (response.ok) {
        const data = await response.text();
        console.log("Response:", data);

        // Clear the form after successful submission
        setMotorcycleData({
          brand: "",
          model: "",
          year: "",
          price: "",
          condition: "",
          description: "",
          imageUrl: "",
        });

        setShowPopup(true);
        setProcessing(false); // ประมวลผลเสร็จสิ้น
      } else {
        console.error("Error:", response.status);
        setProcessing(false); // ประมวลผลเสร็จสิ้น (แม้ว่าจะเกิด Error ก็ตาม)
      }
    } catch (error) {
      console.error("Error:", error);
      setProcessing(false); // ประมวลผลเสร็จสิ้น (กรณีเกิด Error)
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <Link
          to="/AdminTable"
          className="text-base font-semibold text-blue-600 underline underline-offset-4 hover:text-pink-500"
        >
          กลับ
        </Link>
        <h1 className="text-center text-2xl font-semibold text-gray-800 mb-4">
          เพิ่มข้อมูลรถ
        </h1>
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
            <div className="bg-white p-4 max-w-lg rounded-lg">
              <div className="flex items-center justify-center">
                <svg
                  className={`animate-spin h-5 w-5 mr-3 text-green-600 ${
                    processing ? "hidden" : ""
                  }`}
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
                <svg
                  className={`h-5 w-5 mr-3 text-green-600 ${
                    processing ? "" : "hidden"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.937l3-2.646z"
                  ></path>
                </svg>
                <p className={`text-green-600 ${processing ? "hidden" : ""}`}>
                  เพิ่มข้อมูลเรียบร้อย
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              ยี่ห้อ:
            </label>
            <input
              type="text"
              name="brand"
              value={motorcycleData.brand}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              รุ่น:
            </label>
            <input
              type="text"
              name="model"
              value={motorcycleData.model}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              ปีผลิต:
            </label>
            <input
              type="number"
              name="year"
              value={motorcycleData.year}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              ราคา:
            </label>
            <input
              type="number"
              name="price"
              value={motorcycleData.price}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              สภาพรถ:
            </label>
            <input
              type="text"
              name="condition"
              value={motorcycleData.condition}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              รายละเอียดเพิ่มเติม:
            </label>
            <textarea
              name="description"
              value={motorcycleData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              ลิงค์รูปภาพ:
            </label>
            <input
              type="text"
              name="imageUrl"
              value={motorcycleData.imageUrl}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300"
            >
              เพิ่มรถจักรยานยนต์
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InsertData;
