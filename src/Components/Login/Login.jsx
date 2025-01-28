import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    // Initialize state for form data
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        userType: "contractor",
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login attempted with:", formData);

        const requestBody = {
            username: formData.username,
            password: formData.password,
        };
        console.log(JSON.stringify(requestBody));

        fetch("http://localhost:8060/api/auth/validate/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        })
            .then((response) => {
                if (!response.ok) {
                    alert("Login Failed");
                    throw new Error("Login Failed");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Response Data:", data);
                const { username, roleName, token } = data;
                
                // Store the auth token and role
                sessionStorage.setItem("authToken", token);
                sessionStorage.setItem("userRole", roleName);

                // Navigate based on role
                if (roleName === "CONTRACTOR") {
                    console.log("Logged in as Contractor");
                    navigate("/project-type");
                } else if (roleName === "CLIENT") {
                    navigate("/project-type-client");
                } else {
                    console.error("Unknown role:", roleName);
                }
            })
            .catch((error) => {
                console.error("Login error:", error);
                sessionStorage.removeItem("authToken"); // Clear any existing token
                sessionStorage.removeItem("userRole"); // Clear any existing role
            });
    };

    // Handle clearing the form
    const handleClear = () => {
        setFormData({
            username: "",
            password: "",
            userType: "contractor",
        });
    };

    const handleLogout = () => {
        sessionStorage.removeItem("authToken");
        navigate("/login");
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-title">
                    <i className="fas fa-hard-hat"></i> Login Portal
                </h2>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        placeholder="Enter your username"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter your password"
                    />
                </div>

                <div className="btn-container">
                    <button type="submit" className="btn btn-login">
                        Login
                    </button>
                    <button
                        type="button"
                        className="btn btn-clear"
                        onClick={handleClear}
                    >
                        Clear
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
