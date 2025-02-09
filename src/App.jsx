import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./Components/Login/Login";
import Landing from "./Components/Landing";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Register from "./Components/Register/Register";
import About from "./Components/About";
import Contact from "./Components/Contact";
import ProjectType from "./Components/ProjectType/ProjectType";
import ProjectTypeCategory1 from "./Components/ProjectTypeCategory1/ProjectTypeCategory1";
import ProjectTypeCategory from "./Components/ProjectTypeCategory/ProjectTypeCategory";
import Templates1 from "./Components/InteriorTemplates/Templates1";
import Templates2 from "./Components/InteriorTemplates/Templates2";
import Templates3 from "./Components/InteriorTemplates/Templates3";
import ConstructionTemplate1 from "./Components/constructionTemplates/temp1";
import Temp2 from "./Components/constructionTemplates/temp2";
import ProjectTypeClient from "./Components/ProjectTypeClient/ProjectTypeClient";
import ProjectTypeCategoryClient from "./Components/ProjectTypeCategoryClient/ProjectTypeCategoryClient";
import ProjectTypeCategory1Client from "./Components/ProjectTypeCategory1Client/ProjectTypeCategory1Client";
import Paints from "./Components/InteriorTemplatesClient/Paints";
import Ceilings from "./Components/InteriorTemplatesClient/Ceilings";
import Lighting from "./Components/InteriorTemplatesClient/Lighting";
import NewHome from "./Components/constructionTemplatesClient/NewHome";
import Renovation from "./Components/constructionTemplatesClient/Renovation";
import ClientLayout from "./components/ClientLayout";
import MyProjectClient from "./Components/myProjects/MyProjectClient";
import MyProjectContractor from "./Components/myProjects/MyProjectContractor";
import ContractorStats from "./Components/Stats/ContractorStats";

// Protected Route Component with role check
const ProtectedRoute = ({ children, allowedRoles }) => {
    const authToken = sessionStorage.getItem("authToken");
    const userRole = sessionStorage.getItem("userRole");

    if (!authToken) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

function App() {
    return (
        <>
            {/* <Landing /> */}
            {/* <Login /> */}
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Landing />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />

                    {/* Contractor Routes */}
                    <Route
                        path="/project-type"
                        element={
                            <ProtectedRoute allowedRoles={["CONTRACTOR"]}>
                                <ProjectType />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/stats"
                        element={
                            <ProtectedRoute allowedRoles={["CONTRACTOR"]}>
                                <ContractorStats />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/contractor-projects"
                        element={
                            <ProtectedRoute allowedRoles={["CONTRACTOR"]}>
                                <MyProjectContractor />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/project-category"
                        element={
                            <ProtectedRoute allowedRoles={["CONTRACTOR"]}>
                                <ProjectTypeCategory />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/project-category1"
                        element={
                            <ProtectedRoute allowedRoles={["CONTRACTOR"]}>
                                <ProjectTypeCategory1 />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/paint-templates"
                        element={
                            <ProtectedRoute allowedRoles={["CONTRACTOR"]}>
                                <Templates1 />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/ceiling-templates"
                        element={
                            <ProtectedRoute allowedRoles={["CONTRACTOR"]}>
                                <Templates2 />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/lighting-templates"
                        element={
                            <ProtectedRoute allowedRoles={["CONTRACTOR"]}>
                                <Templates3 />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/construction-template-1"
                        element={
                            <ProtectedRoute allowedRoles={["CONTRACTOR"]}>
                                <ConstructionTemplate1 />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/temp2"
                        element={
                            <ProtectedRoute allowedRoles={["CONTRACTOR"]}>
                                <Temp2 />
                            </ProtectedRoute>
                        }
                    />

                    {/* Client Routes with Layout */}
                    <Route
                        path="/project-type-client"
                        element={
                            <ProtectedRoute allowedRoles={["CLIENT"]}>
                                <ClientLayout>
                                    <ProjectTypeClient />
                                </ClientLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/my-projects"
                        element={
                            <ProtectedRoute allowedRoles={["CLIENT"]}>
                                <ClientLayout>
                                    <MyProjectClient />
                                </ClientLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/interior-categories"
                        element={
                            <ProtectedRoute allowedRoles={["CLIENT"]}>
                                <ClientLayout>
                                    <ProjectTypeCategoryClient />
                                </ClientLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/construction-categories"
                        element={
                            <ProtectedRoute allowedRoles={["CLIENT"]}>
                                <ClientLayout>
                                    <ProjectTypeCategory1Client />
                                </ClientLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/interior/paints"
                        element={
                            <ProtectedRoute allowedRoles={["CLIENT"]}>
                                <ClientLayout>
                                    <Paints />
                                </ClientLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/interior/ceilings"
                        element={
                            <ProtectedRoute allowedRoles={["CLIENT"]}>
                                <ClientLayout>
                                    <Ceilings />
                                </ClientLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/interior/lighting"
                        element={
                            <ProtectedRoute allowedRoles={["CLIENT"]}>
                                <ClientLayout>
                                    <Lighting />
                                </ClientLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/new-home"
                        element={
                            <ProtectedRoute allowedRoles={["CLIENT"]}>
                                <ClientLayout>
                                    <NewHome />
                                </ClientLayout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/renovation"
                        element={
                            <ProtectedRoute allowedRoles={["CLIENT"]}>
                                <ClientLayout>
                                    <Renovation />
                                </ClientLayout>
                            </ProtectedRoute>
                        }
                    />

                    {/* Common Routes (accessible by both roles) */}
                    <Route
                        path="/about/*"
                        element={
                            <ProtectedRoute
                                allowedRoles={["CONTRACTOR", "CLIENT"]}
                            >
                                <About />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/contact"
                        element={
                            <ProtectedRoute
                                allowedRoles={["CONTRACTOR", "CLIENT"]}
                            >
                                <Contact />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
