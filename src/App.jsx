import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PropertyCard from './components/PropertyCard';
import SearchForm from './components/SearchForm'; // Import the new form
import propertiesData from './properties.json';

function App() {
  const [properties, setProperties] = useState(propertiesData); // State stores the filtered properties
  
  // This function runs when you click "Search"
  const handleSearch = (criteria) => {
    const filtered = propertiesData.filter(property => {
      // 1. Type Check
      if (criteria.type !== 'any' && property.type !== criteria.type) return false;

      // 2. Price Check
      if (criteria.minPrice && property.price < Number(criteria.minPrice)) return false;
      if (criteria.maxPrice && property.price > Number(criteria.maxPrice)) return false;

      // 3. Bedroom Check
      if (criteria.minBedrooms && property.bedrooms < Number(criteria.minBedrooms)) return false;
      if (criteria.maxBedrooms && property.bedrooms > Number(criteria.maxBedrooms)) return false;

      // 4. Postcode Check
      if (criteria.postcode && !property.postcode.toLowerCase().includes(criteria.postcode.toLowerCase())) return false;

      // 5. Date Check
      if (criteria.dateAdded) {
        if (new Date(property.dateAdded) < new Date(criteria.dateAdded)) return false;
      }

      return true;
    });
    
    setProperties(filtered);
  };

  return (
    <BrowserRouter>
      <div className="app-container" style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        
        {/* Navbar */}
        <nav style={{ padding: '20px', backgroundColor: '#333', color: 'white', marginBottom: '30px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Estate Agent App</h1>
            <button onClick={() => setProperties(propertiesData)} style={{ cursor: 'pointer', background: 'transparent', color: 'white', border: '1px solid white', padding: '5px 10px', borderRadius: '4px' }}>
                Show All
            </button>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
              
              {/* ADD SEARCH FORM HERE */}
              <SearchForm onSearch={handleSearch} />
              
              <h2 style={{ marginBottom: '20px', color: '#333' }}>
                Found {properties.length} Properties
              </h2>
              
              {/* Grid of Results */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
                {properties.length > 0 ? (
                    properties.map(property => (
                        <PropertyCard key={property.id} property={property} />
                    ))
                ) : (
                    <p style={{ fontSize: '1.2rem', color: '#666' }}>No properties match your search criteria.</p>
                )}
              </div>
            </div>
          } />

          <Route path="/property/:id" element={<h1>Property Details Page</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;