import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'; // Using the icons you installed

function Footer() {
  return (
    <footer style={{
      // CHANGE: Match the Navbar color here
      backgroundColor: '#0f172a', 
      
      color: '#cbd5e1', // A slightly softer white text looks more premium
      padding: '40px 20px',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        textAlign: 'center' // Centered for mobile friendliness
      }}>
        
        {/* Column 1: Info */}
        <div style={{ textAlign: 'left' }}>
          <h3 style={{ borderBottom: '2px solid #007bff', display: 'inline-block', paddingBottom: '5px' }}>Estate Agent App</h3>
          <p style={{ fontSize: '0.9rem', color: '#ccc' }}>
            Find your dream home with Us. 
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div style={{ textAlign: 'left' }}>
            <h4 style={{ color: '#fff' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem' }}>
                <li style={{ marginBottom: '8px' }}><a href="/" style={{ color: '#ccc', textDecoration: 'none' }}>Search Properties</a></li>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>About Us</a></li>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Privacy Policy</a></li>
            </ul>
        </div>

        {/* Column 3: Contact/Socials */}
        <div style={{ textAlign: 'left' }}>
            <h4 style={{ color: '#fff' }}>Connect</h4>
            <div style={{ display: 'flex', gap: '15px' }}>
                <a href="#" style={{ color: 'white', fontSize: '1.5rem' }}><FaGithub /></a>
                <a href="#" style={{ color: 'white', fontSize: '1.5rem' }}><FaLinkedin /></a>
                <a href="#" style={{ color: 'white', fontSize: '1.5rem' }}><FaEnvelope /></a>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#777', marginTop: '15px' }}>
                &copy; {new Date().getFullYear()} Estate Agent App. All rights reserved.
            </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;