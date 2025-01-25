import { useState } from "react";
import "./Login.css";

const Login = () => {
    // Initialize state for form data
    const [formData, setFormData] = useState({
        username: "",
        password: "",
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
        // Add your login logic here
        const requestBody = {
            username: formData.username,
            password: formData.password,
        };
        console.log("Login attempted with:", formData, requestBody);
        //fetch("http://localhost:1212/api/auth/validate/user");
        fetch("http://localhost:1212/api/auth/validate/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response (e.g., handle success or failure)
                console.log("Response data:", data);
            })
            .catch((error) => {
                // Handle any errors
                console.error("Error during login:", error);
            });
    };

    // Handle clearing the form
    const handleClear = () => {
        setFormData({
            username: "",
            password: "",
        });
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-title">
                    <i className="fas fa-hard-hat"></i> Construction Portal
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
