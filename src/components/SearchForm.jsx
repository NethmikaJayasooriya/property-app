function SearchForm({ onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const criteria = {
      type: formData.get('type'),
      minPrice: formData.get('minPrice'),
      maxPrice: formData.get('maxPrice'),
      minBedrooms: formData.get('minBedrooms'),
      maxBedrooms: formData.get('maxBedrooms'),
      dateAdded: formData.get('dateAdded'),
      postcode: formData.get('postcode')
    };
    onSearch(criteria);
  };

  return (
    <form className="search-form-container" onSubmit={handleSubmit}>

      <div className="search-inputs">
        
        {/* Type Select */}
        <select name="type" style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}>
          <option value="any">Any Type</option>
          <option value="House">House</option>
          <option value="Flat">Flat</option>
          <option value="Bungalow">Bungalow</option>
        </select>

        {/* Price Inputs */}
        <input type="number" name="minPrice" placeholder="Min Price" style={{ padding: '10px', width: '100px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <input type="number" name="maxPrice" placeholder="Max Price" style={{ padding: '10px', width: '100px', borderRadius: '4px', border: '1px solid #ccc' }} />

        {/* Bedroom Inputs */}
        <input type="number" name="minBedrooms" placeholder="Min Beds" style={{ padding: '10px', width: '100px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <input type="number" name="maxBedrooms" placeholder="Max Beds" style={{ padding: '10px', width: '100px', borderRadius: '4px', border: '1px solid #ccc' }} />

        {/* Postcode */}
        <input type="text" name="postcode" placeholder="Postcode (e.g. NW1)" style={{ padding: '10px', width: '150px', borderRadius: '4px', border: '1px solid #ccc' }} />

        {/* Date Filter - Added Class Here */}
        <div className="date-wrapper">
            <span style={{ fontSize: '0.9rem', color: '#666' }}>Added after:</span>
            <input type="date" name="dateAdded" style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        {/* Search Button */}
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;