import { useState } from 'react';
import './Templates3.css';
const Templates3 = () => {
   
    const [templates, setTemplates] = useState([]);
    const [newTemplate, setNewTemplate] = useState({
        image: '',
        variationName: '',
        baseCost: '',
        duration: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTemplate(prev => ({
            ...prev,
            [name]: value
        }));
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
            duration: ''
        });
    };

    return (
        <div className="templates-container">
            <h2 className="templates-title">Lighting Design Templates</h2>
            
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
                <button type="submit" className="upload-btn">Upload Template</button>
            </form>

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