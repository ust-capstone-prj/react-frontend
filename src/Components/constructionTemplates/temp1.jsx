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
        squareFeet: '',
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
            
            const totalPercentage = 
                Number(updatedTemplate.materialCostPercent || 0) +
                Number(updatedTemplate.laborCostPercent || 0) +
                Number(updatedTemplate.profitPercentage || 0);

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
            squareFeet: '',
            baseCost: '',
            materialCostPercent: '',
            laborCostPercent: '',
            profitPercentage: '',
            image: null
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
                            <div className="form-grid">
                                <div className="form-group">
                                    <label htmlFor="templateName">Template Name</label>
                                    <input
                                        type="text"
                                        id="templateName"
                                        name="templateName"
                                        value={templateData.templateName}
                                        onChange={handleInputChange}
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
                                        required={!editingTemplate}
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
                            <p>Square Feet: {template.squareFeet}</p>
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