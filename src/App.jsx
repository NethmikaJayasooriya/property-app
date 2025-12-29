import { useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'; // IMPORT useNavigate
import './App.css';
import FavoritesList from './components/FavoritesList';
import Footer from './components/Footer';
import PropertyCard from './components/PropertyCard';
import PropertyDetails from './components/PropertyDetails';
import SearchForm from './components/SearchForm';
import propertiesData from './properties.json';

// 1. Rename your old "App" function to "MainApp" (or any name)
// This contains all your logic, state, and UI
function MainApp() {
  const [properties, setProperties] = useState(propertiesData);
  const [favorites, setFavorites] = useState([]); 
  
  // NEW: Hook for navigation
  const navigate = useNavigate();

  const handleSearch = (criteria) => {
    const filtered = propertiesData.filter(property => {
      if (criteria.type !== 'any' && property.type !== criteria.type) return false;
      if (criteria.minPrice && property.price < Number(criteria.minPrice)) return false;
      if (criteria.maxPrice && property.price > Number(criteria.maxPrice)) return false;
      if (criteria.minBedrooms && property.bedrooms < Number(criteria.minBedrooms)) return false;
      if (criteria.maxBedrooms && property.bedrooms > Number(criteria.maxBedrooms)) return false;
      if (criteria.postcode && !property.postcode.toLowerCase().includes(criteria.postcode.toLowerCase())) return false;
      if (criteria.dateAdded && new Date(property.dateAdded) < new Date(criteria.dateAdded)) return false;
      return true;
    });
    setProperties(filtered);
    // Optional: Navigate to home if they search while on a details page
    navigate('/'); 
  };

  const addToFavorites = (property) => {
    if (!favorites.find(fav => fav.id === property.id)) {
      setFavorites([...favorites, property]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const propertyId = e.dataTransfer.getData("propertyId");
    const propertyToAdd = propertiesData.find(p => p.id === propertyId);
    if (propertyToAdd) {
      addToFavorites(propertyToAdd);
    }
  };

  // NEW: Handle Show All Button
  const handleShowAll = () => {
    setProperties(propertiesData); // 1. Reset Data
    navigate('/');                 // 2. Go to Home Page
  };

  return (
    <div className="app-container">
        
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-content">
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>Estate Agent App</h1>
          
          {/* UPDATED: Button now calls handleShowAll */}
          <button 
              onClick={handleShowAll} 
              style={{ 
                cursor: 'pointer', 
                background: 'transparent', 
                color: 'white', 
                border: '1px solid rgba(255,255,255,0.5)', 
                padding: '6px 15px', 
                borderRadius: '4px',
                transition: 'all 0.2s'
              }}
          >
              Show All
          </button>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={
          <>
            <div className="hero-section">
              <SearchForm onSearch={handleSearch} />
            </div>

            <div className="page-content">
              <div className="main-layout">
                
                {/* Left: Property Grid */}
                <div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
                      <h2 style={{ margin: 0, color: '#0f172a' }}>Properties For Sale</h2>
                      <span style={{ color: '#64748b' }}>Found {properties.length}</span>
                   </div>
                   
                   <div className="properties-grid">
                    {properties.length > 0 ? (
                        properties.map(property => (
                            <PropertyCard 
                                key={property.id} 
                                property={property} 
                                onFavorite={addToFavorites} 
                            />
                        ))
                    ) : (
                        <div style={{ textAlign: 'center', padding: '40px', gridColumn: '1/-1', backgroundColor: 'white', borderRadius: '8px' }}>
                            <h3>No properties match your search</h3>
                            <p style={{color: '#666'}}>Try changing your filters or click "Show All".</p>
                        </div>
                    )}
                  </div>
                </div>

                {/* Right: Sticky Favorites */}
                <div 
                    className="sticky-sidebar"
                    onDrop={handleDrop} 
                    onDragOver={(e) => e.preventDefault()} 
                >
                    <FavoritesList 
                        favorites={favorites} 
                        onRemove={removeFavorite} 
                        onClear={() => setFavorites([])} 
                    />
                </div>
              </div>
            </div>
          </>
        } />

        <Route path="/property/:id" element={<PropertyDetails />} />
      </Routes>

      <Footer />
      
    </div>
  );
}

// 2. Creates the actual App component that wraps MainApp in BrowserRouter
// This is required for 'useNavigate' to work inside MainApp
function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}

export default App;