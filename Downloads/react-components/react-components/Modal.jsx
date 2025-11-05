import React, { useState } from 'react';
import './Modal.css';

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOverlayClick = (e) => {
    // Close modal when clicking on overlay (but not on modal content)
    if (e.target.className === 'modal-overlay') {
      handleClose();
    }
  };

  const handleConfirm = () => {
    // Handle confirm action here
    console.log('Confirmed!');
    handleClose();
  };

  return (
    <>
      {/* Button to open modal */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="button-wrap" onClick={handleOpen} style={{ cursor: 'pointer' }}>
          <button>
            <span>Open Modal</span>
          </button>
          <div className="button-shadow"></div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-wrap">
            <div className="modal">
              <div className="modal-header">
                <h2 className="modal-title">Confirm Action</h2>
                <button 
                  className="modal-close" 
                  aria-label="Close modal"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to proceed with this action? This operation cannot be undone and will permanently affect your data.</p>
              </div>
              <div className="modal-footer">
                <button className="modal-button" onClick={handleClose}>Cancel</button>
                <button className="modal-button modal-button--primary" onClick={handleConfirm}>Confirm</button>
              </div>
            </div>
            <div className="modal-shadow"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
