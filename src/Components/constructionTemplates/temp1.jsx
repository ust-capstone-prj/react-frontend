import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './temp1.css';

const ConstructionTemplate1 = () => {
    const location = useLocation();
    const projectType = location.state?.projectType;
    
    const [templates, setTemplates] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [templateData, setTemplateData] = useState({
        templateName: '',
        bedrooms: '',
        bathrooms: '',
        squareFeet: '',
        garageCapacity: '',
        baseCost: '',
        materialCostPercent: '',
        laborCostPercent: '',
        profitPercentage: '',
        image: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTemplateData(prev => {
            const updatedTemplate = { ...prev, [name]: value };
            
            // Calculate total percentage for cost fields
            const totalPercentage = 
                Number(updatedTemplate.materialCostPercent || 0) +
                Number(updatedTemplate.laborCostPercent || 0) +
                Number(updatedTemplate.profitPercentage || 0);

            // If total exceeds 100%, revert the change
            if (totalPercentage > 100 && 
                (name === 'materialCostPercent' || 
                 name === 'laborCostPercent' || 
                 name === 'profitPercentage')) {
                return prev;
            }

            return updatedTemplate;
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTemplateData(prev => ({
                    ...prev,
                    image: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTemplates(prev => [...prev, { ...templateData, id: Date.now() }]);
        setTemplateData({
            templateName: '',
            bedrooms: '',
            bathrooms: '',
            squareFeet: '',
            garageCapacity: '',
            baseCost: '',
            materialCostPercent: '',
            laborCostPercent: '',
            profitPercentage: '',
            image: null
        });
        setIsFormVisible(false);
    };

    return (
        <div className="template-container">
            <div className="background-effect"></div>
            <div className="template-content">
                <h1 className="template-title">House Templates</h1>
                
                <button 
                    className="create-template-btn"
                    onClick={() => setIsFormVisible(true)}
                >
                    Create New Template
                </button>

                {isFormVisible && (
                    <div className="template-form-overlay">
                        <form className="template-form" onSubmit={handleSubmit}>
                            <h3>Create New Template</h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label htmlFor="templateName">Template Name</label>
                                    <input
                                        type="text"
                                        id="templateName"
                                        name="templateName"
                                        value={templateData.templateName}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Modern Minimalist"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="bedrooms">Number of Bedrooms</label>
                                    <input
                                        type="number"
                                        id="bedrooms"
                                        name="bedrooms"
                                        value={templateData.bedrooms}
                                        onChange={handleInputChange}
                                        min="1"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="bathrooms">Number of Bathrooms</label>
                                    <input
                                        type="number"
                                        id="bathrooms"
                                        name="bathrooms"
                                        value={templateData.bathrooms}
                                        onChange={handleInputChange}
                                        min="1"
                                        step="0.5"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="squareFeet">Square Feet</label>
                                    <input
                                        type="number"
                                        id="squareFeet"
                                        name="squareFeet"
                                        value={templateData.squareFeet}
                                        onChange={handleInputChange}
                                        min="500"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="garageCapacity">Garage Capacity</label>
                                    <input
                                        type="number"
                                        id="garageCapacity"
                                        name="garageCapacity"
                                        value={templateData.garageCapacity}
                                        onChange={handleInputChange}
                                        min="0"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="baseCost">Base Cost ($)</label>
                                    <input
                                        type="number"
                                        id="baseCost"
                                        name="baseCost"
                                        value={templateData.baseCost}
                                        onChange={handleInputChange}
                                        min="0"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="materialCostPercent">Material Cost (%)</label>
                                    <input
                                        type="number"
                                        id="materialCostPercent"
                                        name="materialCostPercent"
                                        value={templateData.materialCostPercent}
                                        onChange={handleInputChange}
                                        min="0"
                                        max="100"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="laborCostPercent">Labor Cost (%)</label>
                                    <input
                                        type="number"
                                        id="laborCostPercent"
                                        name="laborCostPercent"
                                        value={templateData.laborCostPercent}
                                        onChange={handleInputChange}
                                        min="0"
                                        max="100"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="profitPercentage">Profit (%)</label>
                                    <input
                                        type="number"
                                        id="profitPercentage"
                                        name="profitPercentage"
                                        value={templateData.profitPercentage}
                                        onChange={handleInputChange}
                                        min="0"
                                        max="100"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="image">House Image</label>
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-buttons">
                                <button type="submit">Create Template</button>
                                <button 
                                    type="button" 
                                    onClick={() => setIsFormVisible(false)}
                                    className="cancel-btn"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>

            <div className="templates-list">
                {templates.map(template => (
                    <div key={template.id} className="template-card">
                        <div className="template-image">
                            <img src={template.image} alt={template.templateName} />
                        </div>
                        <div className="template-details">
                            <h3>{template.templateName}</h3>
                            <p>Bedrooms: {template.bedrooms}</p>
                            <p>Bathrooms: {template.bathrooms}</p>
                            <p>Square Feet: {template.squareFeet}</p>
                            <p>Garage Capacity: {template.garageCapacity}</p>
                            <p>Base Cost: ${template.baseCost}</p>
                            <p>Material Cost: {template.materialCostPercent}%</p>
                            <p>Labor Cost: {template.laborCostPercent}%</p>
                            <p>Profit: {template.profitPercentage}%</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConstructionTemplate1; 