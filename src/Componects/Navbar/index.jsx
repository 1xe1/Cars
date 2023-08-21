import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-000000 px-4 py-5 sticky top-0 z-10">
            <div className="container mx-auto flex items-center justify-between">
                <Link to="/" className="text-lg font-semibold text-white">Logo</Link>
                <div className="space-x-4">
                    <Link to="/" className=" text-white underline hover:underline-offset-4">Home</Link>
                    <Link to="/AdminTable" className="text-white underline hover:underline-offset-4">Admin</Link>
                    <Link to="/Contact" className="text-white underline hover:underline-offset-4">Contact</Link>
                    <Link to="/ThreeD" className="text-white underline hover:underline-offset-4">3D</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
