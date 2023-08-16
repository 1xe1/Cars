import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./Componects/Navbar/";
import Footer from "./Componects/Footer";
import Content from "./Componects/Content";
import AdminTable from "./Componects/AdminTable";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Content />}></Route>
        <Route path="AdminTable" element={<AdminTable />}></Route>
        <Route path="contact" element={<contact />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
