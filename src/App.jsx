import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./Componects/Navbar/";
import Footer from "./Componects/Footer";
import Content from "./Componects/Content";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Content />}></Route>
        {/* <Route path="contact" element={<Contact />}></Route> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
