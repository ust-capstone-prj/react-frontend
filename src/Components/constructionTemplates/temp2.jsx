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
        name: '',
        baseCost: '',
        percentage: '',
        description: ''
    });
    const [editingCard, setEditingCard] = useState(null);

    const handleCreateCard = () => {
        setShowForm(true);
        setEditingCard(null);
        setFormData({
            image: '',
            name: '',
            baseCost: '',
            percentage: '',
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
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({
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
            name: '',
            baseCost: '',
            percentage: '',
            description: ''
        });
        setShowForm(false);
        setEditingCard(null);
    };

    return (
        <div className="temp2-container">
            <button 
                className="create-button"
                onClick={handleCreateCard}
                disabled={showForm}
            >
                Create New Card
            </button>

            {showForm && (
                <div className="form-overlay">
                    <form className="card-form" onSubmit={handleSubmit}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            required={!editingCard}
                        />
                        <input
                            type="text"
                            name="name"
                            placeholder="Card Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="number"
                            name="baseCost"
                            placeholder="Base Cost"
                            value={formData.baseCost}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="number"
                            name="percentage"
                            placeholder="Percentage"
                            value={formData.percentage}
                            onChange={handleInputChange}
                            required
                        />
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                        />
                        <button type="submit">
                            {editingCard ? 'Update Card' : 'Create Card'}
                        </button>
                    </form>
                </div>
            )}

            <div className="cards-container">
                {cards.map((card, index) => (
                    <div key={index} className="card">
                        <img src={card.image} alt={card.name} />
                        <h3>{card.name}</h3>
                        <p className="cost">Base Cost: ${card.baseCost}</p>
                        <p className="percentage">Percentage: {card.percentage}%</p>
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