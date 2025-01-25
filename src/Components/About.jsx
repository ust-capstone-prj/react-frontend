import React from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';

const About = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const containerStyle = {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    color: '#2d3436',
    minHeight: '100vh',
    backgroundColor: '#dfe6e9',
  };

  const sectionStyle = {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const navStyle = {
    display: 'flex',
    gap: '2rem',
    marginBottom: '2rem',
    backgroundColor: '#6c5ce7',
    padding: '1rem',
    borderRadius: '8px',
  };

  const subNavLinkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  };

  const activeStyle = {
    ...subNavLinkStyle,
    backgroundColor: '#a29bfe',
  };

  const homeButtonStyle = {
    ...subNavLinkStyle,
    backgroundColor: '#00b894',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
  };

  const MainContent = () => (
    <div style={sectionStyle}>
      <h1 style={{ color: '#2c3e50', marginBottom: '1.5rem' }}>Welcome to Dream Home Interiors</h1>
      <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
        With over 15 years of experience in transforming houses into dream homes, 
        we specialize in comprehensive interior solutions and construction services.
      </p>
    </div>
  );

  const InteriorServices = () => (
    <div style={sectionStyle}>
      <h2 style={{ color: '#6c5ce7', marginBottom: '1.5rem' }}>Interior Services</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div style={{ backgroundColor: '#ffeaa7', padding: '1.5rem', borderRadius: '8px' }}>
          <h3 style={{ color: '#d63031' }}>Painting</h3>
          <p>Premium quality painting services with a wide range of finishes and textures.</p>
        </div>
        <div style={{ backgroundColor: '#81ecec', padding: '1.5rem', borderRadius: '8px' }}>
          <h3 style={{ color: '#0984e3' }}>Lighting</h3>
          <p>Modern lighting solutions to enhance the ambiance of your space.</p>
        </div>
        <div style={{ backgroundColor: '#55efc4', padding: '1.5rem', borderRadius: '8px' }}>
          <h3 style={{ color: '#00b894' }}>Ceiling</h3>
          <p>Innovative ceiling designs and installations for a stunning overhead view.</p>
        </div>
      </div>
    </div>
  );

  const Construction = () => (
    <div style={sectionStyle}>
      <h2 style={{ color: '#6c5ce7', marginBottom: '1.5rem' }}>Construction Services</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div style={{ backgroundColor: '#fab1a0', padding: '1.5rem', borderRadius: '8px' }}>
          <h3 style={{ color: '#e17055' }}>New House Construction</h3>
          <p>Building your dream home from the ground up with quality materials and expert craftsmanship.</p>
        </div>
        <div style={{ backgroundColor: '#74b9ff', padding: '1.5rem', borderRadius: '8px' }}>
          <h3 style={{ color: '#0984e3' }}>House Renovation</h3>
          <p>Transforming existing spaces with modern upgrades and structural improvements.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div style={containerStyle}>
      <nav style={navStyle}>
        <Link 
          to="/" 
          style={homeButtonStyle}
        >
          <i className="fas fa-home"></i> Home
        </Link>
        <Link 
          to="/about" 
          style={location.pathname === '/about' ? activeStyle : subNavLinkStyle}
        >
          Overview
        </Link>
        <Link 
          to="/about/interior" 
          style={location.pathname === '/about/interior' ? activeStyle : subNavLinkStyle}
        >
          Interior Services
        </Link>
        <Link 
          to="/about/construction" 
          style={location.pathname === '/about/construction' ? activeStyle : subNavLinkStyle}
        >
          Construction
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/interior" element={<InteriorServices />} />
        <Route path="/construction" element={<Construction />} />
      </Routes>
    </div>
  );
};

export default About; 