import React from 'react';
import { useEffect } from 'react';

function PopUp({ handleClose, show,popupWidth,popupHeight,children }) {
    const showHideClassName = show ? "fixed inset-0 flex items-center justify-center z-50 overflow-auto" : "hidden";
    
    const handleClickOutside = (e) => {
        console.log("outside");
      if (e.target.classList.contains('bg-gray-500')) {
        handleClose();
      }
    };

    const handlePopupToggle = (show) => {
        if (show) {
          document.documentElement.classList.add('overflow-hidden');
        } else {
          document.documentElement.classList.remove('overflow-hidden');
        }
    };
    
      // Call handlePopupToggle when the popup is shown or hidden
      useEffect(() => {
        handlePopupToggle(show);
      }, [show]);
  
    return (
      <div className={showHideClassName} >
        <div className="fixed inset-0 bg-gray-500 opacity-75 " onClick={handleClickOutside}></div>
        <div className={`bg-white rounded-lg p-8  z-10 relative overflow-hidden`} style={{width:`${popupWidth}%`,height:`${popupHeight}%`}}>
          <button className="absolute top-0 right-0 m-4" onClick={handleClose}>X</button>
          {children}
        </div>
      </div>
    );
}

export default PopUp;
