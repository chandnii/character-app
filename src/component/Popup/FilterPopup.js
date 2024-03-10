// FilterPopup.js
import React from "react";

function FilterPopup({ onClose, pagination }) {
  return (
    <div className="filter-popup">
      <div className="filter-popup-content">
        {pagination}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default FilterPopup;
