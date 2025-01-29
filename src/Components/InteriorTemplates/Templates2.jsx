import { useState } from 'react';
import './Templates1.css';
import { useEffect } from'react';``

const Templates2 = () => {
    const [templates, setTemplates] = useState([]);
    const [newTemplate, setNewTemplate] = useState({
        image: '',
        variationName: '',
        baseCost: '',
        description: '',
        materialCostPercent: '',
        laborCostPercent: '',
        profitPercent: ''
    });
    const [isFormVisible, setIsFormVisible] = useState(false);
    
    useEffect(() => {
        fetch("http://localhost:8060/api/projectvar")
            .then((response) => response.json())
            .then((data) => setTemplates(data))
            .catch((error) => console.error("Error fetching variations:", error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTemplate(prev => {
            const updatedTemplate = { ...prev, [name]: value };
            
            const totalPercentage = 
                Number(updatedTemplate.materialCostPercent || 0) +
                Number(updatedTemplate.laborCostPercent || 0) +
                Number(updatedTemplate.profitPercent || 0);

            if (totalPercentage > 100 && 
                (name === 'materialCostPercent' || 
                 name === 'laborCostPercent' || 
                 name === 'profitPercent')) {
                return prev;
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

    const handleSubmit = async (e) => {
        e.preventDefault();
    
       
        
            const response = await fetch("http://localhost:8060/api/projectvar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTemplate)
            });
    
            if (!response.ok) {
                throw new Error("Failed to upload template");
            }
    
            const savedTemplate = await response.json();
            setTemplates(prev => [...prev, savedTemplate]);
    
            // Reset form and hide
            setNewTemplate({ 
                image: '', 
                variationName: '', 
                baseCost: '', 
                description: '', 
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
                            <label>Description:</label>
                            <input 
                                type="text"
                                name="description"
                                value={newTemplate.description}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Material Cost Percent:</label>
                            <input 
                                type="number"
                                name="materialCostPercent"
                                value={newTemplate.materialCostPercent}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Labor Cost Percent:</label>
                            <input 
                                type="number"
                                name="laborCostPercent"
                                value={newTemplate.laborCostPercent}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Profit Percent:</label>
                            <input 
                                type="number"
                                name="profitPercent"
                                value={newTemplate.profitPercent}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button type="submit" className="upload-btn">Upload Template</button>
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
                            <p>Base Cost: ₹{template.baseCost}</p>
                            <p>Description: {template.description}</p>
                            <p>Material Cost: {template.materialCostPercent}%</p>
                            <p>Labor Cost: {template.laborCostPercent}%</p>
                            <p>Profit: {template.profitPercent}%</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Templates2; 