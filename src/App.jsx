import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./Componects/Navbar/";
import Footer from "./Componects/Footer";
import Content from "./Componects/Content";
import AdminTable from "./Componects/AdminTable";
import InsertData from "./Componects/InsertData";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Content />}></Route>
        <Route path="AdminTable" element={<AdminTable />}></Route>
        <Route path="contact" element={<contact />}></Route>
        <Route path="InsertData" element={<InsertData />}></Route>
        <Route path="/admin-table" element={<AdminTable />}></Route>  
      </Routes>
      <Footer />
    </>
  );
}

export default App;
