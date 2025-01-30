import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './temp1.css';

const ConstructionTemplate1 = () => {
    const location = useLocation();
    const projectType = location.state?.projectType;
    
    const [templates, setTemplates] = useState(() => {
        const savedTemplates = localStorage.getItem('constructionTemplates1');
        return savedTemplates ? JSON.parse(savedTemplates) : [];
    });
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState(null);
    const [templateData, setTemplateData] = useState({
        templateName: '',
        baseCost: '',
        materialCostPercent: '',
        laborCostPercent: '',
        profitPercentage: '',
        image: '',
        description: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTemplateData(prev => {
            const updatedTemplate = { ...prev, [name]: value };
            
            if (name === 'materialCostPercent' || name === 'laborCostPercent') {
                const materialCost = Number(name === 'materialCostPercent' ? value : updatedTemplate.materialCostPercent) || 0;
                const laborCost = Number(name === 'laborCostPercent' ? value : updatedTemplate.laborCostPercent) || 0;
                
                if (materialCost + laborCost > 100) {
                    return prev;
                }
                
                updatedTemplate.profitPercentage = Math.max(0, 100 - materialCost - laborCost);
            }

            return updatedTemplate;
        });
    };

    const handleEdit = (template) => {
        setEditingTemplate(template);
        setTemplateData(template);
        setIsFormVisible(true);
    };

    const handleDelete = (templateId) => {
        const templateElement = document.getElementById(`template-${templateId}`);
        templateElement.classList.add('template-delete-animation');

        setTimeout(() => {
            const updatedTemplates = templates.filter(template => template.id !== templateId);
            setTemplates(updatedTemplates);
            localStorage.setItem('constructionTemplates1', JSON.stringify(updatedTemplates));
        }, 300);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let updatedTemplates;
        if (editingTemplate) {
            updatedTemplates = templates.map(template => 
                template.id === editingTemplate.id 
                    ? { ...templateData, id: template.id }
                    : template
            );
        } else {
            updatedTemplates = [...templates, { ...templateData, id: Date.now() }];
        }

        localStorage.setItem('constructionTemplates1', JSON.stringify(updatedTemplates));
        setTemplates(updatedTemplates);
        resetForm();
    };

    const resetForm = () => {
        setTemplateData({
            templateName: '',
            baseCost: '',
            materialCostPercent: '',
            laborCostPercent: '',
            profitPercentage: '',
            image: '',
            description: ''
        });
        setEditingTemplate(null);
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
                            <h3>{editingTemplate ? 'Edit Template' : 'Create New Template'}</h3>
                            
                            <div className="form-group">
                                <label htmlFor="templateName">Template Name</label>
                                <input
                                    type="text"
                                    id="templateName"
                                    name="templateName"
                                    value={templateData.templateName}
                                    onChange={handleInputChange}
                                    placeholder='Enter Template Name'
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={templateData.description}
                                    onChange={handleInputChange}
                                    placeholder='Enter Description'
                                    rows="3"
                                    className="description-textarea"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="image">House Image URL</label>
                                <input
                                    type="url"
                                    id="image"
                                    name="image"
                                    value={templateData.image}
                                    onChange={handleInputChange}
                                    placeholder="Enter image URL"
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
                                    placeholder='Enter Base Cost'
                                    min="0"
                                    required
                                />
                            </div>

                            <div className="cost-container">
                                <div className="cost-row">
                                    <div className="form-group">
                                        <label htmlFor="materialCostPercent">Material Cost (%)</label>
                                        <input
                                            type="number"
                                            id="materialCostPercent"
                                            name="materialCostPercent"
                                            value={templateData.materialCostPercent}
                                            onChange={handleInputChange}
                                            placeholder='Enter Material Cost'
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
                                            placeholder='Enter Labor Cost'
                                            min="0"
                                            max="100"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group profit-group">
                                    <label htmlFor="profitPercentage">Profit (%)</label>
                                    <input
                                        type="number"
                                        id="profitPercentage"
                                        name="profitPercentage"
                                        value={templateData.profitPercentage}
                                        readOnly
                                        disabled
                                    />
                                </div>
                            </div>

                            

                            <div className="form-buttons">
                                <button type="submit">
                                    {editingTemplate ? 'Save Changes' : 'Create Template'}
                                </button>
                                <button 
                                    type="button" 
                                    onClick={resetForm}
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
                    <div 
                        key={template.id} 
                        id={`template-${template.id}`}
                        className="template-card"
                    >
                        <div className="template-image">
                            <img src={template.image} alt={template.templateName} />
                        </div>
                        <div className="template-details">
                            <h3>{template.templateName}</h3>
                            <p className="description">{template.description}</p>
                            <p>Base Cost: ${template.baseCost}</p>
                            <p>Material Cost: {template.materialCostPercent}%</p>
                            <p>Labor Cost: {template.laborCostPercent}%</p>
                            <p>Profit: {template.profitPercentage}%</p>
                        </div>
                        <div className="template-card-actions">
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
                ))}
            </div>
        </div>
    );
};

export default ConstructionTemplate1; 