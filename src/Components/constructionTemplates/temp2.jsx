import { useState } from 'react';
import './temp2.css';

const Temp2 = () => {
    const [showForm, setShowForm] = useState(false);
    const [cards, setCards] = useState(() => {
        const savedCards = localStorage.getItem('constructionTemplates');
        return savedCards ? JSON.parse(savedCards) : [];
    });
    const [formData, setFormData] = useState({
        image: '',
        variationName: '',
        baseCost: '',
        materialCost: '',
        laborCost: '',
        profitCost: '',
        description: ''
    });
    const [editingCard, setEditingCard] = useState(null);

    const handleCreateCard = () => {
        setShowForm(true);
        setEditingCard(null);
        setFormData({
            image: '',
            variationName: '',
            baseCost: '',
            materialCost: '',
            laborCost: '',
            profitCost: '',
            description: ''
        });
    };

    const handleEdit = (card) => {
        setEditingCard(card);
        setFormData(card);
        setShowForm(true);
    };

    const handleDelete = (indexToDelete) => {
        const updatedCards = cards.filter((_, index) => index !== indexToDelete);
        setCards(updatedCards);
        localStorage.setItem('constructionTemplates', JSON.stringify(updatedCards));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const updatedData = {
                ...prev,
                [name]: value
            };
            
            // Calculate profit cost when material or labor cost changes
            if (name === 'materialCost' || name === 'laborCost') {
                const materialCost = parseFloat(name === 'materialCost' ? value : prev.materialCost) || 0;
                const laborCost = parseFloat(name === 'laborCost' ? value : prev.laborCost) || 0;
                
                // Ensure total costs don't exceed 100%
                if (materialCost + laborCost > 100) {
                    alert("Material and Labor costs combined cannot exceed 100%");
                    return prev;
                }
                
                updatedData.profitCost = 100 - (materialCost + laborCost);
            }
            
            return updatedData;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editingCard !== null) {
            // Update existing card
            const updatedCards = cards.map((card, index) => 
                index === cards.indexOf(editingCard) ? formData : card
            );
            setCards(updatedCards);
            localStorage.setItem('constructionTemplates', JSON.stringify(updatedCards));
        } else {
            // Create new card
            const updatedCards = [...cards, formData];
            setCards(updatedCards);
            localStorage.setItem('constructionTemplates', JSON.stringify(updatedCards));
        }

        setFormData({
            image: '',
            variationName: '',
            baseCost: '',
            materialCost: '',
            laborCost: '',
            profitCost: '',
            description: ''
        });
        setShowForm(false);
        setEditingCard(null);
    };

    return (
        <div className="temp2-container">
            <h2 className="templates-title">Renovation Design Templates</h2>
            
            <button 
                className="create-template-btn"
                onClick={handleCreateCard}
                disabled={showForm}
            >
                Create New Template
            </button>

            {showForm && (
                <div className="template-form-overlay">
                    <form onSubmit={handleSubmit} className="template-form">
                        <div className="form-group">
                            <label>Variation Name:</label>
                            <input 
                                type="text"
                                name="variationName"
                                value={formData.variationName}
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
                                value={formData.baseCost}
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
                                value={formData.image}
                                onChange={handleInputChange}
                                placeholder="Enter image URL"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Description:</label>
                            <textarea 
                                name="description"
                                value={formData.description}
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
                                        value={formData.materialCost}
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
                                        value={formData.laborCost}
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
                                    value={formData.profitCost}
                                    readOnly
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="upload-btn">
                                {editingCard ? 'Update Template' : 'Upload Template'}
                            </button>
                            <button 
                                type="button" 
                                className="cancel-btn"
                                onClick={() => setShowForm(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="cards-container">
                {cards.map((card, index) => (
                    <div key={index} className="card">
                        <img src={card.image} alt={card.variationName} />
                        <h3>{card.variationName}</h3>
                        <p className="cost">Base Cost: ${card.baseCost}</p>
                        <p className="description">{card.description}</p>
                        <div className="card-actions">
                            <button 
                                className="edit-button"
                                onClick={() => handleEdit(card)}
                            >
                                Edit
                            </button>
                            <button 
                                className="delete-button"
                                onClick={() => handleDelete(index)}
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

export default Temp2; 