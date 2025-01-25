import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectTypeCategory.css';

const ProjectTypeCategory = () => {
    const navigate = useNavigate();
    
    const categories = [
        {
            title: 'Paint',
            description: 'Premium quality paints and expert application services',
            image: 'src/assets/paint-category.jpg'
        },
        {
            title: 'Ceiling',
            description: 'Modern ceiling designs and installations',
            image: 'src/assets/ceiling-category.jpg'
        },
        {
            title: 'Lighting',
            description: 'Innovative lighting solutions for every space',
            image: 'src/assets/lighting-category.jpg'
        }
    ];

    const handleCategorySelect = (category) => {
        console.log(`Selected category: ${category}`);
        // Add navigation logic here
    };

    return (
        <div className="category-container">
            <div className="category-background"></div>
            <h2 className="category-title">Choose Your Service</h2>
            <div className="category-cards">
                {categories.map((category, index) => (
                    <div 
                        key={index}
                        className="category-card"
                        onClick={() => handleCategorySelect(category.title.toLowerCase())}
                    >
                        <div className="category-image">
                            <img src={category.image} alt={category.title} />
                        </div>
                        <div className="category-content">
                            <h3>{category.title}</h3>
                            <p>{category.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectTypeCategory; 