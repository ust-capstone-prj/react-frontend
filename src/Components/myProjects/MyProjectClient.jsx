import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyProjectClient.css";

const MyProjectClient = () => {
    //data variables

    const navigate = useNavigate();

    // useEffect(()=>{
    //     fetch("http:")//get user_id using username from sessionStorage
    //     //get project_details by id
    // })

    return (
        <div className="projects-client">
            <h1 className="projects-title">Your Projects</h1>
            {/* <div className="templates-grid">
                {templates.map((template) => (
                    <div key={template.id} className="template-card">
                        <div className="template-image">
                            <img src={template.image} alt={template.name} />
                        </div>
                        <div className="template-content">
                            <h2>{template.name}</h2>
                            <p className="price">
                                ₹{template.pricePerSqFt}/sq.ft
                            </p>
                            <p className="description">
                                {template.description}
                            </p>
                            <button
                                className="select-btn"
                                onClick={() => handleSelect(template)}
                            >
                                Select Design
                            </button>
                        </div>
                    </div>
                ))}
            </div> */}
        </div>
    );
};

export default MyProjectClient;
