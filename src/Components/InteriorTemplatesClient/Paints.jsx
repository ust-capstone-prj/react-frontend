import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Paints.css";

const Paints = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [sqFeet, setSqFeet] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showFinalPrice, setShowFinalPrice] = useState(false);
    const [showPhoneModal, setShowPhoneModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [templates, setTemplates] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8060/api/projectvar/newcosts/3")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const transformedData = data.map((template) => ({
                    id: template.projTypCatVarId, // using projTypCatVarId as the ID
                    name: template.projTypCatVarName,
                    pricePerSqFt: template.projTypCatVarCost, // using projTypCatVarCost as price
                    image: template.projTypCatVarImg,
                    description: template.projTypCatVarDesc,
                }));
                setTemplates(transformedData);
            })
            .catch((error) =>
                console.error("Error fetching variations: ", error)
            );
    }, []);

    const paintTemplates = [
        {
            id: 1,
            name: "Modern Minimalist",
            image: "https://m.media-amazon.com/images/I/817JTgOSENL._AC_UF1000,1000_QL80_.jpg",
            pricePerSqFt: 12,
            description:
                "Clean lines and subtle tones create a contemporary feel perfect for urban homes.",
            features: ["Low VOC", "Washable", "Stain Resistant"],
        },
        {
            id: 2,
            name: "Luxury Metallic",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdWO99GTD_kWiHdyw4XL3dErYKYfCY7B2Rrg&s", // Replace with actual image URL
            pricePerSqFt: 18,
            description:
                "Add glamour with our metallic finish that catches light beautifully.",
            features: ["Metallic Finish", "Premium Quality", "Long Lasting"],
        },
        // Add more templates as needed
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
                setSqFeet("");
                navigate("/project-type-client");
            }, 3000);
        }
    };

    return (
        <div className="paints-container">
            <h1 className="paints-title">Premium Paint Templates</h1>

            {/* <div className="templates-grid">
                {paintTemplates.map((template) => (
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
            </div> */}

            <div className="templates-grid">
                {templates.map((template) => (
                    <div key={template.id} className="template-card">
                        <div className="template-image">
                            <img src={template.image} alt={template.name} />
                        </div>
                        <div className="template-content">
                            <h2>{template.name}</h2>
                            <p className="price">
                                ₹{template.pricePerSqFt}/sq.ft
                            </p>
                            <p className="description">
                                {template.description}
                            </p>
                            <button
                                className="select-btn"
                                onClick={() => handleSelect(template)}
                            >
                                Select Design
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
                        <button onClick={() => setShowModal(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Updated Final Price Display */}
            {showFinalPrice && selectedTemplate && (
                <div className="final-price">
                    <h3>Total Cost</h3>
                    <p className="amount">
                        ₹
                        {(
                            selectedTemplate.pricePerSqFt * Number(sqFeet)
                        ).toFixed(2)}
                    </p>
                    <p className="details">
                        {sqFeet} sq.ft × ₹{selectedTemplate.pricePerSqFt}/sq.ft
                    </p>
                    <div className="action-buttons">
                        <button className="add-to-cart-btn">Add to Cart</button>
                        <button className="proceed-btn" onClick={handleProceed}>
                            Proceed
                        </button>
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
                            <p className="error-message">
                                Please enter a valid 10-digit number
                            </p>
                        )}
                        <button
                            className={`confirm-btn ${
                                phoneNumber.length === 10 ? "active" : ""
                            }`}
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

export default Paints;
