import { useEffect, useState } from "react";
import "./MyProjectClient.css";

const MyProjectClient = () => {
    // Data variables
    const [projects, setProjects] = useState([]);
    const [projectInfo, setProjectInfo] = useState({});

    const userId = sessionStorage.getItem("userid");

    useEffect(() => {
        // Fetch the projects based on userId
        fetch(`http://localhost:8060/project-details/user/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setProjects(data);

                // Fetch additional project info (image, name, cost, etc.) for each project
                data.forEach((project) => {
                    fetch(
                        `http://localhost:8060/api/projectvar/${project.projectTypeCategoryVariationId}`
                    )
                        .then((response) => response.json())
                        .then((projectData) => {
                            setProjectInfo((prevInfo) => ({
                                ...prevInfo,
                                [project.projectId]: projectData,
                            }));
                        });
                });
            });
    }, [userId]);

    return (
        <div className="projects-client">
            <h1 className="projects-title">Your Projects</h1>
            <div className="templates-grid">
                {projects.map((project) => {
                    const projectDetails = projectInfo[project.projectId];
                    const sqftCost = projectDetails?.projTypCatVarCost || 0;
                    const totalCost = sqftCost * project.sqftArea;

                    return (
                        <div key={project.projectId} className="template-card">
                            <div className="template-image">
                                {projectDetails && (
                                    <img
                                        src={projectDetails.projTypCatVarImg}
                                        alt={projectDetails.projTypCatVarName}
                                    />
                                )}
                            </div>
                            <div className="template-content">
                                <h2>{projectDetails?.projTypCatVarName}</h2>
                                <p className="price">₹{sqftCost}/sq.ft</p>
                                <p className="area">
                                    Area: {project.sqftArea} sqft
                                </p>
                                <p className="total-cost">
                                    Total Cost: ₹{totalCost.toFixed(2)}
                                </p>
                                <div className="approval-section">
                                    {project.approved ? (
                                        <>
                                            <div className="approval-status approved">
                                                Approved
                                            </div>
                                            <p>
                                                Your request has been approved
                                                and a contractor will get in
                                                touch with you soon.
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <div className="approval-status not-approved">
                                                Not Approved
                                            </div>
                                            <p>
                                                Your request has been submitted
                                                and is being reviewed.
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyProjectClient;
