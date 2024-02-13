import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
                <Link to="/" className="mr-4">Home</Link>
                <Link to="/library" className="mr-4">Library</Link>
            </div>
            <div className="flex items-center">
                <Link to="/login" className="mr-4">Login</Link>
                <Link to="/register" className="mr-4">Register</Link>
            </div>
        </header>
    );
};

export default Header;
