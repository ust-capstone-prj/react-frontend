import { useEffect, useState } from 'react';
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

    useEffect(() => {
        fetch("http://localhost:8060/api/projectvar/newcosts/1")
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setTemplates(data)
            })
            .catch((error) => console.error("Error fetching variations: ", error));
    }, [])

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
        const typecatid = 1 //lighting id
        console.log("value is: ", typecatid)
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody1)
        })
            .then((response) => {
                if (!response.ok) {
                    alert("Failed to save template")
                    throw new Error("Failed to save template")
                }
                return response.json()
            })
            // then(({ ProjTypCatVarCatId }) 
            .then(({ projTypCatVarId }) => {
                const MaterialCost = (newTemplate.baseCost * newTemplate.materialCostPercent) / 100;
                const LabourCost = (newTemplate.baseCost * newTemplate.laborCostPercent) / 100;
                const ProfitCost = newTemplate.baseCost - (MaterialCost + LabourCost);
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
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody2)
                })
                    .then((response) => {
                        if (!response.ok) {
                            alert("Failed to save template")
                            throw new Error("Failed to save template")
                        }
                        return response.json()
                    })
                    .then((data) => {
                        alert("Added cost successfully")
                    })
            })

        setTemplates(prev => [...prev, { ...newTemplate, id: Date.now() }]);
        setNewTemplate({ image: '', variationName: '', baseCost: '', description: '', materialCostPercent: '', laborCostPercent: '', profitPercent: '' });
        setIsFormVisible(false);
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
                                className="description-textarea"
                                required
                            />
                        </div>
                        <div className="cost-container">
                            <div className="cost-row">
                                <div className="form-group">
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
                                <div className="form-group">
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
                            <div className="form-group profit-group">
                                <label>Profit (%):</label>
                                <input
                                    type="number"
                                    name="profitCost"
                                    value={newTemplate.profitCost}
                                    readOnly
                                    disabled
                                />
                            </div>
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

            <div className="templates-list">
                {templates.map(template => (
                    <div key={template.projTypCatVarId} className="template-card">
                        <div className="template-image">
                            <img src={template.projTypCatVarImg} alt={template.projTypCatVarName} />
                        </div>
                        <div className="template-details">
                            <h3>{template.projTypCatVarName}</h3>
                            <p>Description: {template.projTypCatVarDesc}</p>
                            <p>Cost/SqFt: ₹{template.projTypCatVarCost}</p>
                            <p>Material Cost/SqFt: {template.projectCostPojo.materialCost}</p>
                            <p>Labour Cost/SqFt: {template.projectCostPojo.labourCost}</p>
                            <p>Profit/SqFt: {template.projectCostPojo.profitCost}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Templates3; 