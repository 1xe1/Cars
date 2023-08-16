import React, { useState, useEffect } from "react";
import { fetchData } from "../Api";

function Content() {
  const [Cars, setCars] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const numPerPage = 6;

  useEffect(() => {
    fetchData().then((data) => setCars(data));
  }, []);

  const handleReadMore = (Car) => {
    setSelectedData(Car);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setSelectedData(null);
    setShowDetails(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredCars = Cars.filter((Car) =>
    Car.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCar = currentPage * numPerPage;
  const indexOfFirstCar = indexOfLastCar - numPerPage;
  const currentCar = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / numPerPage);

  return (
    <div className="container mx-auto p-4">
      <h1 className="underline underline-offset-4 text-3xl font-bold mb-4 text-center text-52057B  pb-2">
        รายชื่อสถานที่
      </h1>
      <div className="mb-4 text-right">
        <input
          type="text"
          placeholder="ค้นหาสถานที่"
          className="p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {currentCar.map((Car) => (
          <div
            className="bg-white p-4 shadow-md border border-gray-300 rounded"
            key={Car.motorcycle_id}
          >
            <div>
              <img src={Car.image_url} alt={Car.model} className="mb-4" />
              <h2 className="text-lg font-bold">{Car.model}</h2>
              <p className="text-gray-500 text-sm">{Car.descript}</p>
              <p className="text-gray-500 text-sm">ประเภท: {Car.brand}</p>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              onClick={() => handleReadMore(Car)}
            >
              อ่านเพิ่มเติม
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {showDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="bg-white p-4 max-w-lg">
            <h2 className="text-lg font-bold">{selectedData.model}</h2>
            <img
              src={selectedData.image_url}
              alt={selectedData.model}
              className="mb-4"
            />
            <p className="text-gray-500 text-sm">{selectedData.descript}</p>
            <p className="text-gray-500 text-sm">
              ประเภท: {selectedData.brand}
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              onClick={handleCloseDetails}
            >
              ปิด
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Content;
