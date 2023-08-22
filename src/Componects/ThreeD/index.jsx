import React from "react";
import "./ThreeD.css";

function ThreeD() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="box">
        <span style={{ "--i": 1 }}>
          <img
            src="https://topicstock.pantip.com/ratchada/topicstock/2008/11/V7162667/V7162667-0.jpg"
            alt=""
          />
        </span>
      </div>
    </div>
  );
}

export default ThreeD;
