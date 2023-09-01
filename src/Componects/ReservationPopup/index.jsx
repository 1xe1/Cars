import React, { useState } from "react";
import { makeReservation } from "../Api/CarTran"; // Import the API function to make a reservation

function ReservationPopup({ motorcycleId, onClose }) {
  const [customerName, setCustomerName] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the API to make a reservation
      await makeReservation({
        motorcycle_id: motorcycleId,
        customer_id: 2, // You can set the customer ID here
        transaction_date: transactionDate,
        payment_amount: paymentAmount,
      });

      setSuccess(true);
      setError(null);
    } catch (error) {
      setError("An error occurred while making the reservation.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 pt-24">
      <div className="bg-white p-4 max-w-lg">
        <h2 className="text-lg font-bold">จองรถ</h2>
        {success ? (
          <p className="text-green-500">จองรถสำเร็จ!</p>
        ) : (
          <>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="ชื่อลูกค้า"
                className="p-2 border border-gray-300 rounded mb-2"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
              <input
                type="date"
                className="p-2 border border-gray-300 rounded mb-2"
                value={transactionDate}
                onChange={(e) => setTransactionDate(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="จำนวนเงิน"
                className="p-2 border border-gray-300 rounded mb-2"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                required
              />
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-600 px-4 py-2 rounded mr-2"
                  onClick={onClose}
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  ยืนยัน
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ReservationPopup;
