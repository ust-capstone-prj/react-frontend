import { useState } from 'react';
import './Templates1.css';

const Templates1 = () => {
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTemplate(prev => {
            const updatedTemplate = { ...prev, [name]: value };
            
            // Calculate total percentage for cost fields
            const totalPercentage = 
                Number(updatedTemplate.materialCostPercent || 0) +
                Number(updatedTemplate.laborCostPercent || 0) +
                Number(updatedTemplate.profitPercent || 0);

            // If total exceeds 100%, revert the change
            if (totalPercentage > 100 && 
                (name === 'materialCostPercent' || 
                 name === 'laborCostPercent' || 
                 name === 'profitPercent')) {
                return prev;
            }

            return updatedTemplate;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const typecatid = 1
        console.log("value is: ",typecatid)
        const requestBody1 = {
            projTypCatVarName: newTemplate.variationName,
            projTypCatVarCost: newTemplate.baseCost,
            projTypCatVarImg: newTemplate.image,
            projTypCatVarDesc: newTemplate.description,
            projTypCatId: typecatid
        }
        // console.log(requestBody1)
        console.log("Final response body", JSON.stringify(requestBody1))
        fetch("http://localhost:8060/api/projectvar", {
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(requestBody1)
        })
        .then((response)=> {
            if(!response.ok){
                alert("Failed to save template")
                throw new Error("Failed to save template")
            }
            return response.json()
        })
        // then(({ ProjTypCatVarCatId }) 
        .then(({projTypCatVarCatId})=>{
            const MaterialCost = (newTemplate.baseCost * newTemplate.materialCostPercent) / 100;
            const LabourCost = (newTemplate.baseCost * newTemplate.laborCostPercent) / 100;
            const ProfitCost = newTemplate.baseCost - (materialCost + labourCost);
            alert("Template added")
            const requestBody2 = {
                profitCost: ProfitCost,
                labourCost: LabourCost,
                materialCost: MaterialCost,
                projTypCatVarId
            }
            console.log("requestBody2: ", requestBody2)
            fetch("http://localhost:8060/api/projectcost", {
                method: "POST",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(requestBody2)
            })
            .then((response)=> {
                if(!response.ok){
                    alert("Failed to save template")
                    throw new Error("Failed to save template")
                }
                return response.json()
            })
            .then((data)=>{
                alert("Added cost successfully")
            })
        })

        setTemplates(prev => [...prev, { ...newTemplate, id: Date.now() }]);
        setNewTemplate({ image: '', variationName: '', baseCost: '', description: '', materialCostPercent: '', laborCostPercent: '', profitPercent: '' });
        setIsFormVisible(false);
    };

    return (
        <div className="templates-container">
            <h2 className="templates-title">Paint Work Templates</h2>
            
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
                        
                        <div className="form-group">
                            <label>Paint Work Image URL</label>
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
                            <label>Variation Name</label>
                            <input 
                                type="text"
                                name="variationName"
                                value={newTemplate.variationName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Base Cost (₹)</label>
                            <input 
                                type="number"
                                name="baseCost"
                                value={newTemplate.baseCost}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Description (days)</label>
                            <input 
                                type="number"
                                name="description"
                                value={newTemplate.description}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Material Cost (%)</label>
                            <input 
                                type="number"
                                name="materialCostPercent"
                                value={newTemplate.materialCostPercent}
                                onChange={handleInputChange}
                                min="0"
                                max="100"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Labor Cost (%)</label>
                            <input 
                                type="number"
                                name="laborCostPercent"
                                value={newTemplate.laborCostPercent}
                                onChange={handleInputChange}
                                min="0"
                                max="100"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Profit (%)</label>
                            <input 
                                type="number"
                                name="profitPercent"
                                value={newTemplate.profitPercent}
                                onChange={handleInputChange}
                                min="0"
                                max="100"
                                required
                            />
                        </div>

                        <div className="form-buttons">
                            <button type="submit">Upload Template</button>
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

            <div className="templates-list">
                {templates.map(template => (
                    <div key={template.id} className="template-card">
                        <div className="template-image">
                            <img src={template.image} alt={template.variationName} />
                        </div>
                        <div className="template-details">
                            <h3>{template.variationName}</h3>
                            <p>Base Cost: ₹{template.baseCost}</p>
                            <p>Description: {template.description} days</p>
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

export default Templates1; 