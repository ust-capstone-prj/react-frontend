import React from 'react';

const Contact = () => {
  const containerStyle = {
    minHeight: '100vh',
    padding: '6rem 2rem',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const formStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px',
    marginTop: '2rem',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.8rem',
    marginBottom: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  };

  const buttonStyle = {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#2c3e50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const contactInfoStyle = {
    marginTop: '3rem',
    textAlign: 'center',
    width: '100%',
    maxWidth: '800px',
  };

  const infoItemStyle = {
    margin: '1rem 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: '2.5rem', color: '#2c3e50', marginBottom: '1rem' }}>Contact Us</h1>
      <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem', textAlign: 'center' }}>
        We'd love to hear from you. Send us a message and we'll respond as soon as possible.
      </p>

      {/* <form style={formStyle}>
        <input
          style={inputStyle}
          type="text"
          placeholder="Your Name"
          required
        />
        <input
          style={inputStyle}
          type="email"
          placeholder="Your Email"
          required
        />
        <input
          style={inputStyle}
          type="tel"
          placeholder="Phone Number"
        />
        <textarea
          style={{ ...inputStyle, height: '150px', resize: 'vertical' }}
          placeholder="Your Message"
          required
        ></textarea>
        <button 
          style={buttonStyle}
          type="submit"
          onMouseOver={(e) => e.target.style.backgroundColor = '#34495e'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#2c3e50'}
        >
          Send Message
        </button>
      </form> */}

      <div style={contactInfoStyle}>
        <h2 style={{ color: '#2c3e50', marginBottom: '2rem' }}>Other Ways to Reach Us</h2>
        <div style={infoItemStyle}>
          <span style={{ fontWeight: 'bold' }}>📍 Address:</span>
          <span>123 Design Street, Creative City, ST 12345</span>
        </div>
        <div style={infoItemStyle}>
          <span style={{ fontWeight: 'bold' }}>📞 Phone:</span>
          <span>(555) 123-4567</span>
        </div>
        <div style={infoItemStyle}>
          <span style={{ fontWeight: 'bold' }}>✉️ Email:</span>
          <span>info@yourdesigncompany.com</span>
        </div>
        <div style={infoItemStyle}>
          <span style={{ fontWeight: 'bold' }}>⏰ Business Hours:</span>
          <span>Monday - Friday: 9:00 AM - 6:00 PM</span>
        </div>
      </div>
    </div>
  );
};

export default Contact; 