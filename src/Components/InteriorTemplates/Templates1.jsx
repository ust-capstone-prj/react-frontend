import { useEffect, useState } from "react";
import "./Templates1.css";

const Templates1 = () => {
    const [templates, setTemplates] = useState([]);
    const [newTemplate, setNewTemplate] = useState({
        image: "",
        variationName: "",
        baseCost: "",
        description: "",
        materialCostPercent: "",
        laborCostPercent: "",
        profitPercent: "",
    });
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8060/api/projectvar/newcosts/3")
            .then((response) => response.json())
            .then((data) => {
                console.log("Response from useeffect", data);
                setTemplates(data);
            })
            .catch((error) =>
                console.error("Error fetching variations: ", error)
            );
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTemplate((prev) => {
            const updatedTemplate = { ...prev, [name]: value };

            // If material or labor cost is updated, calculate profit automatically
            if (name === "materialCostPercent" || name === "laborCostPercent") {
                const materialCost = Number(
                    name === "materialCostPercent"
                        ? value
                        : updatedTemplate.materialCostPercent || 0
                );
                const laborCost = Number(
                    name === "laborCostPercent"
                        ? value
                        : updatedTemplate.laborCostPercent || 0
                );
                const profit = Math.max(0, 100 - materialCost - laborCost);
                updatedTemplate.profitPercent = profit.toString();
            }

            // If total would exceed 100%, revert the change
            const totalPercentage =
                Number(updatedTemplate.materialCostPercent || 0) +
                Number(updatedTemplate.laborCostPercent || 0);

            if (totalPercentage > 100) {
                return prev;
            }

            return updatedTemplate;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const typecatid = 3; //painting id
        console.log("value is: ", typecatid);
        const requestBody1 = {
            projTypCatVarName: newTemplate.variationName,
            projTypCatVarCost: newTemplate.baseCost,
            projTypCatVarImg: newTemplate.image,
            projTypCatVarDesc: newTemplate.description,
            projTypCatId: typecatid,
        };
        // console.log(requestBody1)
        console.log("Final response body", JSON.stringify(requestBody1));
        fetch("http://localhost:8060/api/projectvar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody1),
        })
            .then((response) => {
                if (!response.ok) {
                    alert("Failed to save template");
                    throw new Error("Failed to save template");
                }
                return response.json();
            })
            // then(({ ProjTypCatVarCatId })
            .then(({ projTypCatVarId }) => {
                const MaterialCost =
                    (newTemplate.baseCost * newTemplate.materialCostPercent) /
                    100;
                const LabourCost =
                    (newTemplate.baseCost * newTemplate.laborCostPercent) / 100;
                const ProfitCost =
                    newTemplate.baseCost - (MaterialCost + LabourCost);
                alert("Template added");
                const requestBody2 = {
                    profitCost: ProfitCost,
                    labourCost: LabourCost,
                    materialCost: MaterialCost,
                    projTypCatVarId,
                };
                console.log("requestBody2: ", requestBody2);
                fetch("http://localhost:8060/api/projectcost", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody2),
                })
                    .then((response) => {
                        if (!response.ok) {
                            alert("Failed to save template");
                            throw new Error("Failed to save template");
                        }
                        return response.json();
                    })
                    .then((data) => {
                        console.log("final response: ", data);
                        alert("Added cost successfully");
                    });
            });

        setTemplates((prev) => [...prev, { ...newTemplate, id: Date.now() }]);
        setNewTemplate({
            image: "",
            variationName: "",
            baseCost: "",
            description: "",
            materialCostPercent: "",
            laborCostPercent: "",
            profitPercent: "",
        });
        setIsFormVisible(false);
    };

    return (
        <div className="templates-container">
            <h2 className="templates-title">Paint Work Templates</h2>

            <button
                className="create-template-btn"
                onClick={() => setIsFormVisible(true)}
            >
                Create New Template
            </button>

            {isFormVisible && (
                <div className="template-form-overlay">
                    <form className="template-form" onSubmit={handleSubmit}>
                        <h3>Create New Template</h3>

                        <div className="form-group">
                            <label>Design Name</label>
                            <input
                                type="text"
                                name="variationName"
                                value={newTemplate.variationName}
                                onChange={handleInputChange}
                                placeholder="Enter Design Name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Cost/SqFt (₹)</label>
                            <input
                                type="number"
                                name="baseCost"
                                value={newTemplate.baseCost}
                                onChange={handleInputChange}
                                placeholder="Enter Cost/SqFt"
                                required
                                min="0"
                            />
                        </div>
                        <div className="form-group">
                            <label>Image URL</label>
                            <input
                                type="url"
                                name="image"
                                value={newTemplate.image}
                                onChange={handleInputChange}
                                placeholder="Enter Image URL"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={newTemplate.description}
                                onChange={handleInputChange}
                                placeholder="Enter Description"
                                required
                                rows="3"
                                style={{ width: "100%", resize: "none" }}
                            />
                        </div>

                        <div
                            className="cost-percentages-container"
                            style={{ display: "flex", gap: "2rem" }}
                        >
                            <div className="form-group" style={{ flex: 1 }}>
                                <label>Material Cost (%)</label>
                                <input
                                    type="number"
                                    name="materialCostPercent"
                                    value={newTemplate.materialCostPercent}
                                    onChange={handleInputChange}
                                    placeholder="Percentage of Material Cost"
                                    min="0"
                                    max="100"
                                    required
                                />
                            </div>

                            <div className="form-group" style={{ flex: 1 }}>
                                <label>Labour Cost (%)</label>
                                <input
                                    type="number"
                                    name="laborCostPercent"
                                    value={newTemplate.laborCostPercent}
                                    onChange={handleInputChange}
                                    placeholder="Percentage of Labour Cost"
                                    min="0"
                                    max="100"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Profit (%)</label>
                            <input
                                type="number"
                                name="profitPercent"
                                value={newTemplate.profitPercent}
                                onChange={handleInputChange}
                                min="0"
                                max="100"
                                required
                                disabled
                                style={{ backgroundColor: "#f0f0f0" }}
                            />
                        </div>

                        <div className="form-buttons">
                            <button type="submit">Upload Design</button>
                            <button
                                type="button"
                                onClick={() => setIsFormVisible(false)}
                                className="cancel-btn"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="templates-list">
                {templates.map((template) => (
                    <div
                        key={template.projTypCatVarId}
                        className="template-card"
                    >
                        <div className="template-image">
                            <img
                                src={template.projTypCatVarImg}
                                alt={template.projTypCatVarName}
                            />
                        </div>
                        <div className="template-details">
                            <h3>{template.projTypCatVarName}</h3>
                            <p>Description: {template.projTypCatVarDesc}</p>
                            <p>Cost/SqFt: ₹{template.projTypCatVarCost}</p>
                            <p>
                                Material Cost/SqFt:{" "}
                                {template.projectCostPojo.materialCost}
                            </p>
                            <p>
                                Labour Cost/SqFt:{" "}
                                {template.projectCostPojo.labourCost}
                            </p>
                            <p>
                                Profit/SqFt:{" "}
                                {template.projectCostPojo.profitCost}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Templates1;
