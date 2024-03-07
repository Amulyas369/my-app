import React from 'react'
import "../App.css"
function Lazyloading() {
  return (
    <div className="loading-indicator">
          {/* You can use a library or your custom spinner here */}
          <div className="loading-spinner"></div>
        
        </div>
  )
}

export default Lazyloading