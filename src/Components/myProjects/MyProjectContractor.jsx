import { useEffect, useState } from "react";
import "./MyProjectContractor.css";
import ContractorLayout from "../ContractorLayout";

const MyProjectContractor = () => {
    const [projects, setProjects] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [projectCosts, setProjectCosts] = useState({});
    const [projectInfo, setProjectInfo] = useState({});
    const [showDetails, setShowDetails] = useState({});
    const [showCosts, setShowCosts] = useState({});
    const [isApproved, setIsApproved] = useState({});

    useEffect(() => {
        fetch("http://localhost:8060/project-details")
            .then((response) => response.json())
            .then((data) => {
                setProjects(data);
                data.forEach((project) => {
                    fetch(
                        `http://localhost:8060/project-details/${project.projectId}`
                    )
                        .then((response) => response.json())
                        .then((projectData) => {
                            setIsApproved((prevState) => ({
                                ...prevState,
                                [project.projectId]: projectData.approved,
                            }));
                        });

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
    }, []);

    const fetchUserDetails = (projectId, userId) => {
        fetch(`http://localhost:8060/api/userdetails/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setUserDetails((prevDetails) => ({
                    ...prevDetails,
                    [projectId]: data,
                }));
            });
    };

    const fetchProjectCosts = (
        projectId,
        projectTypeCategoryVariationId,
        sqftArea
    ) => {
        fetch(
            `http://localhost:8060/api/projectcost/${projectTypeCategoryVariationId}`
        )
            .then((response) => response.json())
            .then((data) => {
                const profitCost = data.profitCost * sqftArea;
                const labourCost = data.labourCost * sqftArea;
                const materialCost = data.materialCost * sqftArea;
                const totalCost = profitCost + labourCost + materialCost;

                setProjectCosts((prevCosts) => ({
                    ...prevCosts,
                    [projectId]: {
                        profitCost,
                        labourCost,
                        materialCost,
                        totalCost,
                    },
                }));
            });
    };

    const toggleClientDetails = (projectId) => {
        setShowDetails((prevState) => ({
            ...prevState,
            [projectId]: !prevState[projectId],
        }));
        if (!showDetails[projectId]) {
            fetchUserDetails(
                projectId,
                projects.find((p) => p.projectId === projectId).userId
            );
        }
    };

    const toggleViewCosts = (projectId) => {
        setShowCosts((prevState) => ({
            ...prevState,
            [projectId]: !prevState[projectId],
        }));
        if (!showCosts[projectId]) {
            fetchProjectCosts(
                projectId,
                projects.find((p) => p.projectId === projectId)
                    .projectTypeCategoryVariationId,
                projects.find((p) => p.projectId === projectId).sqftArea
            );
        }
    };

    const approveProject = (projectId) => {
        fetch(`http://localhost:8060/project-details/approval/${projectId}`, {
            method: "PUT",
            body: JSON.stringify({ approved: true }),
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then(() => {
                setIsApproved((prevState) => ({
                    ...prevState,
                    [projectId]: true,
                }));
            });
    };

    return (
        <ContractorLayout>
            <div className="projects-contractor-cont">
                <h1 className="projects-title-cont">Client Projects</h1>
                <div className="templates-list-cont">
                    {projects.map((project) => (
                        <div
                            key={project.projectId}
                            className="template-card-cont"
                        >
                            <div className="template-image-cont">
                                {projectInfo[project.projectId] && (
                                    <img
                                        src={
                                            projectInfo[project.projectId]
                                                .projTypCatVarImg
                                        }
                                        alt={
                                            projectInfo[project.projectId]
                                                .projTypCatVarName
                                        }
                                    />
                                )}
                            </div>
                            <div className="template-details-cont">
                                <h3>
                                    {
                                        projectInfo[project.projectId]
                                            ?.projTypCatVarName
                                    }
                                </h3>
                                <p className="sqft-area-cont">
                                    Area: {project.sqftArea} sqft
                                </p>

                                <button
                                    onClick={() =>
                                        toggleClientDetails(project.projectId)
                                    }
                                    className="client-details-btn-cont"
                                >
                                    Client Details
                                </button>
                                {showDetails[project.projectId] &&
                                    userDetails[project.projectId] && (
                                        <div
                                            className={`user-details-cont ${
                                                showDetails[project.projectId]
                                                    ? "show"
                                                    : ""
                                            }`}
                                        >
                                            <p>
                                                <strong>Name:</strong>{" "}
                                                {
                                                    userDetails[
                                                        project.projectId
                                                    ].userFirstName
                                                }{" "}
                                                {
                                                    userDetails[
                                                        project.projectId
                                                    ].userLastName
                                                }
                                            </p>
                                            <p>
                                                <strong>Email:</strong>{" "}
                                                {
                                                    userDetails[
                                                        project.projectId
                                                    ].userEmail
                                                }
                                            </p>
                                        </div>
                                    )}

                                <button
                                    onClick={() =>
                                        toggleViewCosts(project.projectId)
                                    }
                                    className="view-costs-btn-cont"
                                >
                                    View Costs
                                </button>
                                {showCosts[project.projectId] &&
                                    projectCosts[project.projectId] && (
                                        <div
                                            className={`project-costs-cont ${
                                                showCosts[project.projectId]
                                                    ? "show"
                                                    : ""
                                            }`}
                                        >
                                            <h4>
                                                Profit Cost: ₹
                                                {projectCosts[
                                                    project.projectId
                                                ].profitCost.toFixed(2)}
                                            </h4>
                                            <h4>
                                                Labour Cost: ₹
                                                {projectCosts[
                                                    project.projectId
                                                ].labourCost.toFixed(2)}
                                            </h4>
                                            <h4>
                                                Material Cost: ₹
                                                {projectCosts[
                                                    project.projectId
                                                ].materialCost.toFixed(2)}
                                            </h4>
                                            <h4>
                                                Total Cost: ₹
                                                {projectCosts[
                                                    project.projectId
                                                ].totalCost.toFixed(2)}
                                            </h4>
                                        </div>
                                    )}
                                <button
                                    onClick={() =>
                                        approveProject(project.projectId)
                                    }
                                    className="approve-btn-cont"
                                    disabled={isApproved[project.projectId]}
                                >
                                    {isApproved[project.projectId]
                                        ? "Approved"
                                        : "Approve"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ContractorLayout>
    );
};

export default MyProjectContractor;
