import { useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import FavoritesList from './components/FavoritesList';
import Footer from './components/Footer';
import PropertyCard from './components/PropertyCard';
import PropertyDetails from './components/PropertyDetails';
import SearchForm from './components/SearchForm';
import propertiesData from './properties.json';

function MainApp() {
  const [properties, setProperties] = useState(propertiesData);
  const [favorites, setFavorites] = useState([]); 
  
  const navigate = useNavigate();

  const handleSearch = (criteria) => {
    const filtered = propertiesData.filter(property => {
      if (criteria.type !== 'any' && property.type !== criteria.type) return false;
      if (criteria.minPrice && property.price < Number(criteria.minPrice)) return false;
      if (criteria.maxPrice && property.price > Number(criteria.maxPrice)) return false;
      if (criteria.minBedrooms && property.bedrooms < Number(criteria.minBedrooms)) return false;
      if (criteria.maxBedrooms && property.bedrooms > Number(criteria.maxBedrooms)) return false;
      if (criteria.postcode && !property.postcode.toLowerCase().includes(criteria.postcode.toLowerCase())) return false;
      
      if (criteria.dateAdded) {
        const propDate = new Date(property.dateAdded);
        const searchDate = new Date(criteria.dateAdded);
        if (propDate < searchDate) return false;
      }
      return true;
    });
    setProperties(filtered);
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

  const handleShowAll = () => {
    setProperties(propertiesData); 
    navigate('/');                 
  };

  //HANDLE DROPS ON THE SIDEBAR (Adding)
  const handleSidebarDrop = (e) => {
    e.preventDefault();
    e.stopPropagation(); //Stops the "Global Remove" from triggering
    
    const propertyId = e.dataTransfer.getData("propertyId");
    const fromFavorites = e.dataTransfer.getData("fromFavorites");

    // If dragging FROM favorites TO favorites, do nothing (ignore)
    if (fromFavorites) return;

    //find the property and add it
    const propertyToAdd = propertiesData.find(p => p.id === propertyId);
    if (propertyToAdd) {
      addToFavorites(propertyToAdd);
    }
  };

  //HANDLE DROPS ANYWHERE ELSE (Removing)
  const handleGlobalDrop = (e) => {
    e.preventDefault();
    
    const propertyId = e.dataTransfer.getData("propertyId");
    const fromFavorites = e.dataTransfer.getData("fromFavorites");

    // Only remove if it CAME FROM the favorites list
    if (fromFavorites && propertyId) {
        removeFavorite(propertyId);
    }
  };

  return (
    // Attach Global Drop Handler to the main container
    <div 
        className="app-container" 
        onDrop={handleGlobalDrop} 
        onDragOver={(e) => e.preventDefault()}
    >
      <nav className="navbar">
        <div className="navbar__content">
          <h1 className="navbar__title">Estate Agent App</h1>
          <button onClick={handleShowAll} className="navbar__btn">
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
                   <div className="properties-header">
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
                    onDrop={handleSidebarDrop} // Use the new Sidebar handler
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

        <Route 
          path="/property/:id" 
          element={
            <PropertyDetails 
              onFavorite={addToFavorites} 
              favorites={favorites} 
            />
          } 
        />
      </Routes>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}

export default App;