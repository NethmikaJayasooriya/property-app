import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function SearchForm({ onSearch }) {
  const [startDate, setStartDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const criteria = {
      type: formData.get('type'),
      minPrice: formData.get('minPrice'),
      maxPrice: formData.get('maxPrice'),
      minBedrooms: formData.get('minBedrooms'),
      maxBedrooms: formData.get('maxBedrooms'),
      postcode: formData.get('postcode'),
      // Convert DatePicker object to string YYYY-MM-DD
      dateAdded: startDate ? startDate.toISOString().split('T')[0] : ''
    };
    onSearch(criteria);
  };

  return (
    <form className="search-form-container" onSubmit={handleSubmit}>
      <div className="search-inputs">
        
        {/* Widget: Type Select */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '5px' }}>Property Type</label>
            <select name="type" style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', minWidth: '120px' }}>
            <option value="any">Any</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
            <option value="Bungalow">Bungalow</option>
            </select>
        </div>

        {/* Grouping Price */}
        <div style={{ display: 'flex', gap: '5px', alignItems: 'flex-end' }}>
             <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '5px' }}>Price (£)</label>
                <input type="number" name="minPrice" placeholder="Min" style={{ padding: '10px', width: '100px', borderRadius: '4px', border: '1px solid #ccc' }} />
             </div>
             <span style={{ paddingBottom: '10px' }}>-</span>
             <input type="number" name="maxPrice" placeholder="Max" style={{ padding: '10px', width: '100px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '0' }} />
        </div>

        {/* Grouping Bedrooms */}
        <div style={{ display: 'flex', gap: '5px', alignItems: 'flex-end' }}>
             <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '5px' }}>Bedrooms</label>
                <input type="number" name="minBedrooms" placeholder="Min" style={{ padding: '10px', width: '80px', borderRadius: '4px', border: '1px solid #ccc' }} />
             </div>
             <span style={{ paddingBottom: '10px' }}>-</span>
             <input type="number" name="maxBedrooms" placeholder="Max" style={{ padding: '10px', width: '80px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '0' }} />
        </div>

        {/* Postcode */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '5px' }}>Postcode</label>
            <input type="text" name="postcode" placeholder="e.g. BR1" style={{ padding: '10px', width: '100px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        {/* Widget: React DatePicker (REQUIRED) */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '5px' }}>Added After</label>
            <DatePicker 
                selected={startDate} 
                onChange={(date) => setStartDate(date)} 
                placeholderText="Select Date"
                className="date-picker-input" 
                // Inline style for the input itself (react-datepicker renders an input)
                customInput={<input style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }} />}
            />
        </div>

        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: 'auto', height: '40px' }}>
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;