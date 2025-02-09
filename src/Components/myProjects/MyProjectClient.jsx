import { useEffect, useState } from "react";
import "./MyProjectClient.css";

const MyProjectClient = () => {
  // Data variables
  const [projects, setProjects] = useState([]);
  const [projectInfo, setProjectInfo] = useState({});
  const [editProject, setEditProject] = useState(null);
  const [formValues, setFormValues] = useState({
    phoneNumber: "",
    sqftArea: "",
  });
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

  const handleDelete = (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      fetch(`http://localhost:8060/project-details/soft-delete/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          if (response.ok) {
            setProjects((prevProjects) =>
              prevProjects.filter((p) => p.projectId !== projectId)
            );
          } else {
            console.error("Failed to delete project");
          }
        })
        .catch((error) => console.error("Error deleting project: ", error));
    }
  };

  const handleEdit = (project) => {
    setEditProject(project);
    setFormValues({
      phoneNumber: project.phoneNumber || "",
      sqftArea: project.sqftArea || "",
    });
  };

  const handleUpdate = () => {
    fetch(
      `http://localhost:8060/project-details/${editProject.projectId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      }
    )
      .then((response) => response.json())
      .then((updatedProject) => {
        setProjects((prevProjects) =>
          prevProjects.map((p) =>
            p.projectId === updatedProject.projectId ? updatedProject : p
          )
        );
        // console.log(updatedProject);
        setEditProject(null);
      })
      .catch((error) => console.error("Error updating project: ", error));
  };

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
                <p className="area">Area: {project.sqftArea} sqft</p>
                <p className="phone">Phone: {project.phoneNumber}</p>
                <p className="total-cost">
                  Total Cost: ₹{totalCost.toFixed(2)}
                </p>
                <div className="approval-section">
                  {project.approved ? (
                    <>
                      <div className="approval-status approved">Approved</div>
                      <p>
                        Your request has been approved and a contractor will get
                        in touch with you soon.
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="approval-status not-approved">
                        Not Approved
                      </div>
                      <p>
                        Your request has been submitted and is being reviewed.
                      </p>
                    </>
                  )}
                  <div>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(project)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(project.projectId)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {editProject && (
        <div className="edit-project-overlay">
          <div className={`edit-project-form ${editProject ? "show" : ""}`}>
            <h3>Edit Project</h3>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formValues.phoneNumber}
              
              onChange={(e) =>
                setFormValues({ ...formValues, phoneNumber: e.target.value })
              }
              
            />
            
            <input
              type="number"
              placeholder="Square Feet Area"
              name="sqftArea"
              value={formValues.sqftArea}
              onChange={(e) =>
                setFormValues({ ...formValues, sqftArea: e.target.value })
              }
            />
            <button className="save-btn" onClick={handleUpdate}>
              Save
            </button>
            <button className="cancel-btn" onClick={() => setEditProject(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProjectClient;
