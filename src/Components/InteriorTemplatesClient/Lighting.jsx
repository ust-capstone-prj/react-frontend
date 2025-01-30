import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Lighting.css';

const Lighting = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [sqFeet, setSqFeet] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showFinalPrice, setShowFinalPrice] = useState(false);
    const [showPhoneModal, setShowPhoneModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();

    const lightingTemplates = [
        {
            id: 1,
            name: "Smart LED Package",
            image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89",
            pricePerSqFt: 25,
            description: "Smart LED lighting system with app control and voice activation features.",
            features: ["Smart Control", "Energy Efficient", "Color Changing"]
        },
        {
            id: 2,
            name: "Luxury Chandelier Collection",
            image: "https://images.unsplash.com/photo-1543646775-d0c8e51e6a6f",
            pricePerSqFt: 45,
            description: "Elegant crystal chandeliers that add luxury and sophistication to your space.",
            features: ["Crystal Design", "Premium Finish", "Statement Piece"]
        },
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
        <div className="lighting-container">
            <h1 className="lighting-title">Premium Lighting Solutions</h1>
            
            <div className="templates-grid">
                {lightingTemplates.map((template) => (
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
                                Select Template
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
                        <p>Thank you for your purchase</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Lighting; 