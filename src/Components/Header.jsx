import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { FaUserCircle } from "react-icons/fa";

const Header = ({ username }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/");
    };

    const handleNavigateToProjects = () => {
        navigate("/my-projects"); // Adjust this path to match your actual route
    };

    return (
        <nav className="header">
            <div className="logo">
                <span className="logo-text">ABM </span>
            </div>
            <div className="profile-container">
                {/* Add My Projects Button */}
                <button
                    className="projects-btn"
                    onClick={handleNavigateToProjects}
                    style={{ fontSize: "18px", padding: "10px" }}
                >
                    My Projects
                </button>
                <div
                    className="profile-icon"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    style={{ fontSize: "40px" }}
                >
                    <FaUserCircle size={40} />
                </div>
                {isDropdownOpen && (
                    <div className="dropdown-menu">
                        <div className="username" style={{ fontSize: "24px" }}>
                            {username}
                        </div>
                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                            style={{ fontSize: "20px" }}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Header;
