import React, { useState } from "react";

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
      const response = await fetch("http://localhost:8081/Cars/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(motorcycleData),
      });

      if (response.ok) {
        const data = await response.text(); // Try using response.text() to see the raw response
        console.log("Response:", data);

      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // Clear the form after submission
    setMotorcycleData({
      brand: "",
      model: "",
      year: "",
      price: "",
      condition: "",
      description: "",
      imageUrl: "",
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-center text-2xl font-semibold text-gray-800 mb-4">
          เพิ่มข้อมูลรถ
        </h1>
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
