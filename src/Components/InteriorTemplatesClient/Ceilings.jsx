import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Ceilings.css';

const Ceilings = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [sqFeet, setSqFeet] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showFinalPrice, setShowFinalPrice] = useState(false);
    const [showPhoneModal, setShowPhoneModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();

    const ceilingTemplates = [
        {
            id: 1,
            name: "Classic Pop Design",
            description: "Timeless pop ceiling design with elegant patterns and smooth finish.",
            pricePerSqFt: 150,
            image: "/images/ceiling-classic.jpg"
        },
        {
            id: 2,
            name: "Modern Coffered Ceiling",
            description: "Contemporary grid-pattern design with recessed panels for added depth.",
            pricePerSqFt: 200,
            image: "/images/ceiling-coffered.jpg"
        },
        {
            id: 3,
            name: "LED Integrated Design",
            description: "Modern ceiling design with built-in LED lighting for ambient illumination.",
            pricePerSqFt: 250,
            image: "/images/ceiling-led.jpg"
        }
    ];

    const handleTemplateClick = (template) => {
        setSelectedTemplate(template);
        setShowModal(true);
    };

    const handleSqFeetSubmit = (e) => {
        e.preventDefault();
        if (sqFeet > 0) {
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
        <div className="ceilings-container">
            <h1>Ceiling Design Solutions</h1>
            <div className="templates-grid">
                {ceilingTemplates.map((template) => (
                    <div 
                        key={template.id} 
                        className="template-card"
                        onClick={() => handleTemplateClick(template)}
                    >
                        <div className="template-image">
                            <img src={template.image} alt={template.name} />
                        </div>
                        <div className="template-info">
                            <h3>{template.name}</h3>
                            <p>{template.description}</p>
                            <p className="price">₹{template.pricePerSqFt}/sq.ft</p>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && selectedTemplate && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>{selectedTemplate.name}</h2>
                        <form onSubmit={handleSqFeetSubmit}>
                            <input
                                type="number"
                                value={sqFeet}
                                onChange={(e) => setSqFeet(e.target.value)}
                                placeholder="Enter square feet"
                                required
                            />
                            <button type="submit">Calculate Cost</button>
                        </form>
                    </div>
                </div>
            )}

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

export default Ceilings; 