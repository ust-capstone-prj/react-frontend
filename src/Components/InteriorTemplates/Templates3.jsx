import { useState } from 'react';
import './Templates3.css';
const Templates3 = () => {
   
    const [templates, setTemplates] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newTemplate, setNewTemplate] = useState({
        image: '',
        variationName: '',
        baseCost: '',
        duration: '',
        materialCost: '',
        laborCost: '',
        profitCost: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTemplate(prev => {
            const updatedTemplate = {
                ...prev,
                [name]: value
            };
            
            // Validate percentage total
            if (name === 'materialCost' || name === 'laborCost' || name === 'profitCost') {
                const total = Number(updatedTemplate.materialCost || 0) + 
                            Number(updatedTemplate.laborCost || 0) + 
                            Number(updatedTemplate.profitCost || 0);
                if (total > 100) {
                    return prev; // Don't update if total exceeds 100%
                }
            }
            
            return updatedTemplate;
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setNewTemplate(prev => ({
                ...prev,
                image: reader.result
            }));
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTemplates(prev => [...prev, { ...newTemplate, id: Date.now() }]);
        setNewTemplate({
            image: '',
            variationName: '',
            baseCost: '',
            duration: '',
            materialCost: '',
            laborCost: '',
            profitCost: ''
        });
        setIsFormOpen(false);
    };

    return (
        <div className="templates-container">
            <h2 className="templates-title">Lighting Design Templates</h2>
            
            <button 
                className="create-template-btn"
                onClick={() => setIsFormOpen(true)}
            >
                Create New Template
            </button>

            {isFormOpen && (
                <div className="template-form-overlay">
                    <form onSubmit={handleSubmit} className="template-form">
                        <div className="form-group">
                            <label>Design Image:</label>
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={handleImageChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Variation Name:</label>
                            <input 
                                type="text"
                                name="variationName"
                                value={newTemplate.variationName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Base Cost:</label>
                            <input 
                                type="number"
                                name="baseCost"
                                value={newTemplate.baseCost}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Duration (days):</label>
                            <input 
                                type="number"
                                name="duration"
                                value={newTemplate.duration}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Material Cost (%):</label>
                            <input 
                                type="number"
                                name="materialCost"
                                value={newTemplate.materialCost}
                                onChange={handleInputChange}
                                min="0"
                                max="100"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Labor Cost (%):</label>
                            <input 
                                type="number"
                                name="laborCost"
                                value={newTemplate.laborCost}
                                onChange={handleInputChange}
                                min="0"
                                max="100"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Profit Cost (%):</label>
                            <input 
                                type="number"
                                name="profitCost"
                                value={newTemplate.profitCost}
                                onChange={handleInputChange}
                                min="0"
                                max="100"
                                required
                            />
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="upload-btn">Upload Template</button>
                            <button 
                                type="button" 
                                className="cancel-btn"
                                onClick={() => setIsFormOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="templates-grid">
                {templates.map(template => (
                    <div key={template.id} className="template-card">
                        <img src={template.image} alt={template.variationName} />
                        <div className="template-details">
                            <h3>{template.variationName}</h3>
                            <p>Cost: ${template.baseCost}</p>
                            <p>Duration: {template.duration} days</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Templates3; 