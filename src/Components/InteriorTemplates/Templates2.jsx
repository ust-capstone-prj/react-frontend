import { useState } from 'react';
import './Templates1.css';

const Templates2 = () => {
    const [templates, setTemplates] = useState([]);
    const [newTemplate, setNewTemplate] = useState({
        image: '',
        variationName: '',
        description: '',
        baseCost: '',
        duration: '',
        materialCostPercent: '',
        laborCostPercent: '',
        profitPercent: ''
    });
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTemplate(prev => {
            const updatedTemplate = { ...prev, [name]: value };
            
            if (name === 'materialCostPercent' || name === 'laborCostPercent') {
                const materialCost = Number(name === 'materialCostPercent' ? value : updatedTemplate.materialCostPercent || 0);
                const laborCost = Number(name === 'laborCostPercent' ? value : updatedTemplate.laborCostPercent || 0);
                const profit = 100 - (materialCost + laborCost);
                if (profit >= 0) {
                    updatedTemplate.profitPercent = profit;
                } else {
                    return prev;
                }
            }

            return updatedTemplate;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTemplates(prev => [...prev, { ...newTemplate, id: Date.now() }]);
        setNewTemplate({ 
            image: '', 
            variationName: '', 
            description: '', 
            baseCost: '', 
            duration: '', 
            materialCostPercent: '', 
            laborCostPercent: '', 
            profitPercent: '' 
        });
        setIsFormVisible(false);
    };

    return (
        <div className="templates-container">
            <h2 className="templates-title">Ceiling Design Templates</h2>
            
            <button 
                className="create-template-btn"
                onClick={() => setIsFormVisible(true)}
            >
                Create New Template
            </button>

            {isFormVisible && (
                <div className="template-form-overlay">
                    <form onSubmit={handleSubmit} className="template-form">
                        
                        <div className="form-group">
                            <label>Variation Name:</label>
                            <input 
                                type="text"
                                name="variationName"
                                value={newTemplate.variationName}
                                onChange={handleInputChange}
                                placeholder='Enter variation name'
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Description:</label>
                            <textarea 
                                name="description"
                                value={newTemplate.description}
                                onChange={handleInputChange}
                                placeholder='Enter description'
                                required
                                rows="3"
                                style={{ width: '100%', resize: 'none' }}
                            />
                        </div>
                        <div className="form-group">
                            <label>Base Cost:</label>
                            <input 
                                type="number"
                                name="baseCost"
                                value={newTemplate.baseCost}
                                onChange={handleInputChange}
                                placeholder='Enter base cost'
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Design Image URL:</label>
                            <input 
                                type="url"
                                name="image"
                                value={newTemplate.image}
                                onChange={handleInputChange}
                                placeholder="Enter image URL"
                                required
                            />
                        </div>
                        {/* <div className="form-group">
                            <label>Duration (days):</label>
                            <input 
                                type="number"
                                name="duration"
                                value={newTemplate.duration}
                                onChange={handleInputChange}
                                required
                            />
                        </div> */}
                        <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label>Material Cost Percent:</label>
                                <input 
                                    type="number"
                                    name="materialCostPercent"
                                    value={newTemplate.materialCostPercent}
                                    placeholder='Enter material cost percent'
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label>Labor Cost Percent:</label>
                                <input 
                                    type="number"
                                    name="laborCostPercent"
                                    value={newTemplate.laborCostPercent}
                                    onChange={handleInputChange}
                                    placeholder='Enter labor cost percent'
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Profit Percent:</label>
                            <input 
                                type="number"
                                name="profitPercent"
                                value={newTemplate.profitPercent}
                                onChange={handleInputChange}
                                required
                                disabled
                            />
                        </div>
                        <div className="button-group">
                            <button type="submit" className="upload-btn">Upload Template</button>
                            <button 
                                type="button" 
                                className="cancel-btn"
                                onClick={() => setIsFormVisible(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="templates-list">
                {templates.map(template => (
                    <div key={template.id} className="template-card">
                        <div className="template-image">
                            <img src={template.image} alt={template.variationName} />
                        </div>
                        <div className="template-details">
                            <h3>{template.variationName}</h3>
                            <p className="description">{template.description}</p>
                            <p>Base Cost: ₹{template.baseCost}</p>
                            <p>Duration: {template.duration} days</p>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <p>Material Cost: {template.materialCostPercent}%</p>
                                <p>Labor Cost: {template.laborCostPercent}%</p>
                            </div>
                            <p>Profit: {template.profitPercent}%</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Templates2; 