import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

const Navbar = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleLogout = () => {
        setShowPopup(true);
    };

    return (
        <div className="bg-slate-500 w-full h-10 fixed z-10 flex flex-row justify-around items-center">
            <div>
                <Link to="/Home">Home</Link>
            </div>
            <div>
                <Link to="/EmployeeList">Employee List</Link>
            </div>
            <div>
                <Link to="/Account">
                {username && <span> {username}</span>}</Link>
            </div>
            <div>
                <Link onClick={handleLogout}>Logout</Link>
                {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg">
                            <p>Do you want to logout?</p>
                            <div className="mt-4 flex justify-end">
                                <Link to="/" className="bg-green-500 text-white px-4 py-2 mr-2">Yes</Link>
                                <button className="bg-red-500 text-white px-4 py-2" onClick={() => setShowPopup(false)}>No</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
