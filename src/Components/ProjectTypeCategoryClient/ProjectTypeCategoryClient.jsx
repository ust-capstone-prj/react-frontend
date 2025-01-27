import { useState, useEffect } from 'react';
import './ProjectTypeCategoryClient.css';

const ProjectTypeCategoryClient = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="category-container">
            <h1 className="category-title">Interior Design Services</h1>
            
            <div className="category-cards-container">
                <div className={`category-card ${isVisible ? 'slide-in' : ''}`}>
                    <div className="category-card-image painting"></div>
                    <div className="category-card-content">
                        <h2>Premium Painting Solutions</h2>
                        <p>Transform your space with our expert painting services. We offer trendy color combinations, textured finishes, and eco-friendly options to create the perfect ambiance for your home.</p>
                    </div>
                </div>

                <div className={`category-card ${isVisible ? 'slide-in' : ''}`}>
                    <div className="category-card-image ceiling"></div>
                    <div className="category-card-content">
                        <h2>Elegant Ceiling Designs</h2>
                        <p>Elevate your interiors with our stunning ceiling solutions. From modern pop designs to classic coffered ceilings, we create architectural masterpieces that become the highlight of your space.</p>
                    </div>
                </div>

                <div className={`category-card ${isVisible ? 'slide-in' : ''}`}>
                    <div className="category-card-image lighting"></div>
                    <div className="category-card-content">
                        <h2>Innovative Lighting</h2>
                        <p>Illuminate your world with our creative lighting solutions. We combine functionality with aesthetics to create the perfect ambiance, featuring smart controls and energy-efficient options.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectTypeCategoryClient; 