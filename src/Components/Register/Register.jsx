import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
    const navigate = useNavigate();
    // Initialize state for form data
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        userType: "1", // default value
        companyName: "",
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
        console.log("Registration attempted with FormData:", formData);

        const requestBody1 = {
            username: formData.username,
            password: formData.password,
            roleId: formData.userType,
        };
        console.log(requestBody1);

        fetch("http://localhost:8060/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody1),
        })
            .then((response) => {
                if (!response.ok) {
                    //alert("Registration Failed");
                    throw new Error("Registration Failed");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Response Data: ", data);
                const { userId, username, password, roleId } = data;

                const requestbody2 = {
                    userInfoId: data.userId,
                    userFirstName: formData.firstName,
                    userLastName: formData.lastName,
                    userEmail: formData.email,
                    userCompany: formData.companyName,
                };

                console.log("Request Body 2: ", requestbody2);
                fetch("http://localhost:8060/api/userdetails", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestbody2),
                })
                    .then((response) => {
                        if (!response.ok) {
                            //alert("Failed to add user details");
                            throw new Error("Failed to add user details");
                        }
                        return response.json();
                    })
                    .then((data) => {
                        // console.log(data)
                        console.log("successfully registered user.");
                        //alert("Registration Successful. Please Login")
                        navigate("/login");
                    });
            });
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2 className="register-title">
                    <i className="fas fa-hard-hat"></i> Create Account
                </h2>

                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="Enter your First Name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Enter your Last Name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your Email"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        placeholder="Choose a Username"
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
                        placeholder="Enter your Password"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="userType">Register as</label>
                    <select
                        id="userType"
                        name="userType"
                        value={formData.userType}
                        onChange={handleChange}
                        required
                    >
                        <option value="1">Client</option>
                        <option value="2">Contractor</option>
                    </select>
                </div>

                {formData.userType === "2" && (
                    <>
                        <div className="form-group">
                            <label htmlFor="companyName">Company Name</label>
                            <input
                                type="text"
                                id="companyName"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                required
                                placeholder="Enter Company Name"
                            />
                        </div>
                    </>
                )}

                <div className="btn-container">
                    <button type="submit" className="btn btn-register">
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
