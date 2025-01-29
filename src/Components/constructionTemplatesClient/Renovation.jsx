import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Renovation.css';

const Renovation = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [sqFeet, setSqFeet] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showFinalPrice, setShowFinalPrice] = useState(false);
    const [showPhoneModal, setShowPhoneModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();

    const renovationTemplates = [
        {
            id: 1,
            name: "Basic Renovation Package",
            image: "https://example.com/basic-renovation.jpg", // Replace with actual image URL
            pricePerSqFt: 850,
            description: "Essential renovation services including basic repairs, painting, and flooring updates.",
            features: ["Basic Repairs", "Fresh Paint", "Flooring Update", "Basic Electrical"]
        },
        {
            id: 2,
            name: "Standard Renovation Package",
            image: "https://example.com/standard-renovation.jpg", // Replace with actual image URL
            pricePerSqFt: 1200,
            description: "Comprehensive renovation with modern fixtures, improved layout, and quality materials.",
            features: ["Layout Optimization", "Modern Fixtures", "Quality Materials", "Plumbing Updates"]
        },
        {
            id: 3,
            name: "Premium Renovation Package",
            image: "https://example.com/premium-renovation.jpg", // Replace with actual image URL
            pricePerSqFt: 1800,
            description: "Luxury renovation with high-end materials, smart home integration, and custom designs.",
            features: ["Custom Design", "Smart Integration", "Premium Materials", "Full Remodeling"]
        }
    ];

    const handleSelect = (template) => {
        setSelectedTemplate(template);
        setShowModal(true);
    };

    const handleContinue = () => {
        if (sqFeet) {
            setShowModal(false);
            setShowFinalPrice(true);
        }
    };

    const handleProceed = () => {
        setShowPhoneModal(true);
    };

    const handlePhoneSubmit = () => {
        if (phoneNumber.length >= 10) {
            setShowPhoneModal(false);
            setShowSuccessModal(true);
            setTimeout(() => {
                setShowSuccessModal(false);
                setShowFinalPrice(false);
                setSelectedTemplate(null);
                setSqFeet('');
                navigate('/project-type-client');
            }, 3000);
        }
    };

    return (
        <div className="renovation-container">
            <h1 className="renovation-title">Home Renovation Packages</h1>
            
            <div className="templates-grid">
                {renovationTemplates.map((template) => (
                    <div key={template.id} className="template-card">
                        <div className="template-image">
                            <img src={template.image} alt={template.name} />
                        </div>
                        <div className="template-content">
                            <h2>{template.name}</h2>
                            <p className="price">₹{template.pricePerSqFt}/sq.ft</p>
                            <p className="description">{template.description}</p>
                            <div className="features">
                                {template.features.map((feature, index) => (
                                    <span key={index} className="feature-tag">{feature}</span>
                                ))}
                            </div>
                            <button 
                                className="select-btn"
                                onClick={() => handleSelect(template)}
                            >
                                Select Package
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Square Feet Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Enter Area Details</h2>
                        <input
                            type="number"
                            placeholder="Enter square feet"
                            value={sqFeet}
                            onChange={(e) => setSqFeet(e.target.value)}
                        />
                        <button onClick={handleContinue}>Continue</button>
                        <button onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {/* Final Price Display */}
            {showFinalPrice && selectedTemplate && (
                <div className="final-price">
                    <h3>Total Cost</h3>
                    <p className="amount">
                        ₹{(selectedTemplate.pricePerSqFt * Number(sqFeet)).toFixed(2)}
                    </p>
                    <p className="details">
                        {sqFeet} sq.ft × ₹{selectedTemplate.pricePerSqFt}/sq.ft
                    </p>
                    <div className="action-buttons">
                        <button className="add-to-cart-btn">Add to Cart</button>
                        <button className="proceed-btn" onClick={handleProceed}>Proceed</button>
                    </div>
                </div>
            )}

            {/* Phone Number Modal */}
            {showPhoneModal && (
                <div className="phone-modal-overlay">
                    <div className="phone-modal">
                        <h2>Almost there! 📱</h2>
                        <p>Please enter your phone number to proceed</p>
                        <div className="phone-input-container">
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Enter your phone number"
                                maxLength="10"
                                pattern="[0-9]*"
                            />
                            <div className="input-animation-bar"></div>
                        </div>
                        {phoneNumber.length < 10 && phoneNumber.length > 0 && (
                            <p className="error-message">Please enter a valid 10-digit number</p>
                        )}
                        <button 
                            className={`confirm-btn ${phoneNumber.length === 10 ? 'active' : ''}`}
                            onClick={handlePhoneSubmit}
                            disabled={phoneNumber.length !== 10}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="success-modal-overlay">
                    <div className="success-modal">
                        <div className="success-icon">✓</div>
                        <h2>Order Successful!</h2>
                        <p>Thank you for choosing our renovation services</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Renovation; 