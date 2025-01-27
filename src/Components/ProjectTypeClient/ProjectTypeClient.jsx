import { useState, useEffect } from 'react';
import './ProjectTypeClient.css';
import { useNavigate } from 'react-router-dom';

const ProjectTypeClient = () => {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleInteriorClick = () => {
        navigate('/interior-categories');
    };

    return (
        <div className="project-type-client-container">
            <h1 className="animated-title">Choose Your Project Type</h1>
            
            <div className="cards-container">
                <div 
                    className={`card ${isVisible ? 'fade-in' : ''}`}
                    onClick={handleInteriorClick}
                    style={{ cursor: 'pointer' }}
                >
                    <div className="card-image house-interior"></div>
                    <div className="card-content">
                        <h2>House Interiors</h2>
                        <p>Transform your living space into a masterpiece with our expert interior design services. We specialize in creating beautiful, functional spaces that reflect your personal style and enhance your daily life.</p>
                    </div>
                </div>

                <div className={`card ${isVisible ? 'fade-in' : ''}`}>
                    <div className="card-image construction"></div>
                    <div className="card-content">
                        <h2>Construction</h2>
                        <p>Build your dream home from the ground up with our comprehensive construction services. Our experienced team ensures quality craftsmanship and attention to detail in every project.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectTypeClient; 