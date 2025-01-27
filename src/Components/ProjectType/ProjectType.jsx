import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectType.css';

const ProjectType = () => {
    const navigate = useNavigate();

    const handleProjectSelect = (projectType) => {
        const card = document.querySelector(`.project-card[data-type="${projectType}"]`);
        card.classList.add('card-clicked');
        
        setTimeout(() => {
            navigate('/project-category');
        }, 500); 
            // Navigate after animation completes
    };
    
    const handleConstructionClick = () => {
        navigate('/project-category1');
    };

    return (
        <div className="project-type-container">
            <div className="background-effect"></div>
            <h2 className="project-type-title">Select Project Type</h2>
            <div className="project-cards">
                <div 
                    className="project-card"
                    data-type="houseInteriors"
                    onClick={() => handleProjectSelect('houseInteriors')}
                >
                    <div className="card-image">
                        <img 
                            src="src\assets\homeInteriorType.jpg" 
                            alt="Home Interiors"
                        />
                    </div>
                    <div className="card-content">
                        <h3>House Interiors</h3>
                        <p>Transform living spaces with modern interior solutions</p>
                    </div>
                </div>

                <div 
                    className="project-card"
                    onClick={handleConstructionClick}
                >
                    <div className="card-image">
                        <img 
                            src="src\assets\ProjectTypeConstruction.jpg" 
                            alt="Construction"
                        />
                    </div>
                    <div className="card-content">
                        <h3>Construction</h3>
                        <p>Build your dream projects from the ground up</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectType; 