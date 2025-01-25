import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const landingStyle = {
    backgroundImage: 'url("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  };

  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    padding: '1rem 0',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 2,
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: '500',
    transition: 'color 0.3s ease',
    cursor: 'pointer',
  };

  // ... existing styles ...
  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  };

  const contentStyle = {
    color: 'white',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
    marginTop: '8rem', // Increased to accommodate the header
  };

  return (
    <div style={landingStyle}>
      <header style={headerStyle}>
        <nav style={navStyle}>
        <Link style={linkStyle} to="/login">Login</Link>
          <a style={linkStyle} href="#about">About</a>
          <a style={linkStyle} href="#services">Our Services</a>
          <a style={linkStyle} href="#feedback">Feedback</a>
        </nav>
      </header>
      <div style={overlayStyle}></div>
      <div style={contentStyle}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
          Transform Your Living Space
        </h1>
        <h2 style={{ fontSize: '2rem', fontWeight: '300', marginBottom: '2rem' }}>
          Expert Home Interior Design & Construction Services
        </h2>
        <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
          From concept to creation, we bring your dream home to life with innovative designs 
          and quality construction. Experience luxury living with our bespoke interior solutions.
        </p>
      </div>
    </div>
  );
};

export default Landing;