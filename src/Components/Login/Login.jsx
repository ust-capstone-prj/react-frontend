import { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    // Initialize state for form data
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        userType: 'contractor'
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
        console.log('Login attempted with:', formData);
        
        // Navigate to ProjectType if user is a contractor
        if (formData.userType === 'contractor') {
            navigate('/project-type');
        }
    };

    // Handle clearing the form
    const handleClear = () => {
        setFormData({
            username: '',
            password: '',
            userType: 'contractor'
        });
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-title">
                    <i className="fas fa-hard-hat"></i> Construction Portal
                </h2>
                
                <div className="form-group">
                    <label>User Type</label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="userType"
                                value="contractor"
                                checked={formData.userType === 'contractor'}
                                onChange={handleChange}
                            />
                            Contractor
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="userType"
                                value="homeowner"
                                checked={formData.userType === 'homeowner'}
                                onChange={handleChange}
                            />
                            Home Owner
                        </label>
                    </div>
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
                    <button type="button" className="btn btn-clear" onClick={handleClear}>
                        Clear
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;