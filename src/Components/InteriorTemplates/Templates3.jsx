import { useState } from 'react';
import './Templates3.css';
const Templates3 = () => {
   
    const [templates, setTemplates] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [newTemplate, setNewTemplate] = useState({
        image: '',
        variationName: '',
        baseCost: '',
        description: '',
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
            
            // Automatically calculate profit percentage
            if (name === 'materialCost' || name === 'laborCost') {
                const materialCost = Number(updatedTemplate.materialCost || 0);
                const laborCost = Number(updatedTemplate.laborCost || 0);
                const profitCost = 100 - (materialCost + laborCost);
                
                if (profitCost >= 0) {
                    updatedTemplate.profitCost = profitCost.toString();
                } else {
                    return prev; // Don't update if total exceeds 100%
                }
            }
            
            return updatedTemplate;
        });
    };

    const handleDelete = (id) => {
        const element = document.getElementById(`template-${id}`);
        element.classList.add('fade-out');
        
        setTimeout(() => {
            setTemplates(prev => prev.filter(template => template.id !== id));
        }, 300);
    };

    const handleEdit = (template) => {
        setNewTemplate(template);
        setIsEditing(true);
        setEditingId(template.id);
        setIsFormOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            setTemplates(prev => prev.map(template => 
                template.id === editingId ? { ...newTemplate, id: editingId } : template
            ));
            setIsEditing(false);
            setEditingId(null);
        } else {
            setTemplates(prev => [...prev, { ...newTemplate, id: Date.now() }]);
        }
        setNewTemplate({
            image: '',
            variationName: '',
            baseCost: '',
            description: '',
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
                        <div className="form-group">
                            <label>Description:</label>
                            <textarea 
                                name="description"
                                value={newTemplate.description}
                                onChange={handleInputChange}
                                placeholder='Enter description'
                                rows="3"
                                required
                            />
                        </div>
                        <div className="cost-percentages">
                            <div className="form-group half-width">
                                <label>Material Cost (%):</label>
                                <input 
                                    type="number"
                                    name="materialCost"
                                    value={newTemplate.materialCost}
                                    onChange={handleInputChange}
                                    placeholder='Enter material cost percent'
                                    min="0"
                                    max="100"
                                    required
                                />
                            </div>
                            <div className="form-group half-width">
                                <label>Labor Cost (%):</label>
                                <input 
                                    type="number"
                                    name="laborCost"
                                    value={newTemplate.laborCost}
                                    onChange={handleInputChange}
                                    placeholder='Enter labor cost percent'
                                    min="0"
                                    max="100"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label>Profit (%):</label>
                            <input 
                                type="number"
                                name="profitCost"
                                value={newTemplate.profitCost}
                                readOnly
                                disabled
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
                    <div 
                        key={template.id} 
                        id={`template-${template.id}`}
                        className="template-card"
                    >
                        <img src={template.image} alt={template.variationName} />
                        <div className="template-details">
                            <h3>{template.variationName}</h3>
                            <p className="description">{template.description}</p>
                            <p>Cost: ${template.baseCost}</p>
                            <div className="template-actions">
                                <button 
                                    className="edit-btn"
                                    onClick={() => handleEdit(template)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="delete-btn"
                                    onClick={() => handleDelete(template.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Templates3; 