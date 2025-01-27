import { useState } from 'react';
import './temp2.css';

const Temp2 = () => {
    const [showForm, setShowForm] = useState(false);
    const [cards, setCards] = useState([]);
    const [formData, setFormData] = useState({
        image: '',
        name: '',
        baseCost: '',
        percentage: '',
        description: ''
    });

    const handleCreateCard = () => {
        setShowForm(true);
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
        setCards(prev => [...prev, formData]);
        setFormData({
            image: '',
            name: '',
            baseCost: '',
            percentage: '',
            description: ''
        });
        setShowForm(false);
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
                            required
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
                        <button type="submit">Create Card</button>
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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Temp2; 