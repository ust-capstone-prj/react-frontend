import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ProjectTypeCategory1.css';
import ContractorLayout from '../ContractorLayout';

const ProjectTypeCategory1 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const projectType = location.state?.projectType;

    const handleCategorySelect = (category) => {
        const card = document.querySelector(`.category-card[data-category="${category}"]`);
        card.classList.add('card-clicked');
        
        setTimeout(() => {
            if (category === 'newConstruction') {
                navigate('/construction-template-1', { state: { projectType } });
            } else if (category === 'renovation') {
                navigate('/temp2', { state: { projectType } });
            }
        }, 500);
    };

    return (
        <>
            <ContractorLayout>
                <div className="category-container">
                    <div className="background-effect"></div>
                    <h2 className="category-title">Select Construction Type</h2>
                    <div className="category-cards">
                        <div 
                            className="category-card"
                            data-category="newConstruction"
                            onClick={() => handleCategorySelect('newConstruction')}
                        >
                            <div className="card-image">
                                <img 
                                    src="src/assets/newhouse1.jpg"
                                    alt="New Home Construction"
                                />
                            </div>
                            <div className="card-content">
                                <h3>New Home Construction</h3>
                                <p>Build your dream home from the ground up with modern designs and quality materials. Experience the joy of creating a completely customized living space.</p>
                            </div>
                        </div>

                        <div 
                            className="category-card"
                            data-category="renovation"
                            onClick={() => handleCategorySelect('renovation')}
                        >
                            <div className="card-image">
                                <img 
                                    src="src/assets/renovation.jpg" 
                                    alt="Home Renovation"
                                />
                            </div>
                            <div className="card-content">
                                <h3>Home Renovation</h3>
                                <p>Transform your existing home into a modern masterpiece. Update layouts, enhance functionality, and increase your property value.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </ContractorLayout>
        </>
    );
};

export default ProjectTypeCategory1;
