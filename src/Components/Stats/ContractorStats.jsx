import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import ContractorLayout from "../ContractorLayout";
import "./ContractorStats.css"; // Your custom CSS for styling

// Register the necessary chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ContractorStats = () => {
    const [approvedProjects, setApprovedProjects] = useState(0);
    const [unapprovedProjects, setUnapprovedProjects] = useState(0);
    const [clientsCount, setClientsCount] = useState(0);
    const [totalMaterialCost, setTotalMaterialCost] = useState(0); // New state for total material cost
    const [totalLabourCost, setTotalLabourCost] = useState(0); // New state for total labour cost
    const [totalProfitCost, setTotalProfitCost] = useState(0); // New state for total profit cost

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Fetch all projects
                const projectsResponse = await fetch(
                    "http://localhost:8060/project-details"
                );
                const projects = await projectsResponse.json();

                // Initialize total costs
                let materialCost = 0;
                let labourCost = 0;
                let profitCost = 0;

                // Loop through each project
                for (const project of projects) {
                    if (!project.deleted) {
                        // Only process non-deleted projects
                        const { sqftArea, projectTypeCategoryVariationId } =
                            project;

                        // Fetch cost breakdown for each project's category variation
                        const costResponse = await fetch(
                            `http://localhost:8060/api/projectcosts/variation/${projectTypeCategoryVariationId}`
                        );
                        const costData = await costResponse.json();

                        // Calculate costs (sqft * cost values)
                        materialCost += sqftArea * costData.materialCost;
                        labourCost += sqftArea * costData.labourCost;
                        profitCost += sqftArea * costData.profitCost;
                    }
                }

                // Set the total cost values
                setTotalMaterialCost(materialCost);
                setTotalLabourCost(labourCost);
                setTotalProfitCost(profitCost);
            } catch (err) {
                console.error("Error fetching projects or cost data:", err);
            }
        };

        fetchProjects();

        // Fetch number of approved projects
        fetch("http://localhost:8060/project-details/count?approved=true")
            .then((response) => response.json())
            .then((data) => setApprovedProjects(data))
            .catch((err) =>
                console.error("Error fetching approved projects:", err)
            );

        // Fetch number of unapproved projects
        fetch("http://localhost:8060/project-details/count?approved=false")
            .then((response) => response.json())
            .then((data) => setUnapprovedProjects(data))
            .catch((err) =>
                console.error("Error fetching unapproved projects:", err)
            );

        // Fetch number of registered clients
        fetch("http://localhost:8060/api/auth/count/role/1")
            .then((response) => response.json())
            .then((data) => setClientsCount(data))
            .catch((err) =>
                console.error("Error fetching clients count:", err)
            );
    }, []);

    // Pie Chart Data for Project Approval
    const projectApprovalChart = {
        labels: ["Approved", "Unapproved"],
        datasets: [
            {
                label: "Projects",
                data: [approvedProjects, unapprovedProjects],
                backgroundColor: ["#4caf50", "#f44336"], // Green for approved, Red for unapproved
                borderColor: ["#388e3c", "#d32f2f"],
                borderWidth: 1,
            },
        ],
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.label || "";
                            let value = context.raw || 0;
                            let percentage =
                                (value /
                                    (approvedProjects + unapprovedProjects)) *
                                100;
                            return `${label}: ${value} projects (${percentage.toFixed(
                                1
                            )}%)`;
                        },
                    },
                },
                legend: {
                    position: "top", // Positioning the legend at the top
                    labels: {
                        font: {
                            size: 14,
                        },
                        boxWidth: 20,
                        boxHeight: 20,
                        // Display the number of projects in the legend
                        generateLabels: function (chart) {
                            let labels =
                                ChartJS.defaults.plugins.legend.labels.generateLabels(
                                    chart
                                );
                            labels[0].text = `Approved (${approvedProjects})`; // Custom text with number of approved
                            labels[1].text = `Unapproved (${unapprovedProjects})`; // Custom text with number of unapproved
                            return labels;
                        },
                    },
                },
            },
        },
    };

    return (
        <ContractorLayout>
            <div className="analytics-container-admin">
                <h1 className="analytics-title-admin">Analytics Overview</h1>

                <div className="stats-container-admin">
                    {/* Card for Number of Clients */}
                    <div className="card-admin card-client">
                        <h2>Total Clients</h2>
                        <p>{clientsCount}</p>
                    </div>

                    {/* Pie Chart for Approved vs Unapproved Projects */}
                    <div className="card-admin chart-card-admin">
                        <h3>Project Approval Status</h3>
                        <div className="pie-chart-container-admin">
                            <Pie data={projectApprovalChart} />
                        </div>
                    </div>

                    {/* Cost Analysis Card */}
                    <div className="card-admin card-cost-analysis">
                        <h2>Cost Analysis</h2>
                        <p className="cost-item">
                            Total Material Cost: ${totalMaterialCost.toFixed(2)}
                        </p>
                        <p className="cost-item">
                            Total Labour Cost: ${totalLabourCost.toFixed(2)}
                        </p>
                        <p className="cost-item">
                            Total Profit Cost: ${totalProfitCost.toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>
        </ContractorLayout>
    );
};

export default ContractorStats;
