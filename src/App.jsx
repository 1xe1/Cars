import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./Componects/Navbar/";
import Footer from "./Componects/Footer";
import Content from "./Componects/Content";
import AdminTable from "./Componects/AdminTable";
import InsertData from "./Componects/InsertData";
import Contact from "./Componects/Contact";
import ThreeD from "./Componects/ThreeD";

function App() {
  return (
    <>
      <Navbar />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" rel="stylesheet"></link>
      <Routes>
        <Route path="/" element={<Content />}></Route>
        <Route path="AdminTable" element={<AdminTable />}></Route>
        <Route path="Contact" element={<Contact />}></Route>
        <Route path="/InsertData" element={<InsertData />}></Route>
        <Route path="/admin-table" element={<AdminTable />}></Route>  
        <Route path="/ThreeD" element={<ThreeD />}></Route>  
      </Routes>
      <Footer />
    </>
  );
}

export default App;
