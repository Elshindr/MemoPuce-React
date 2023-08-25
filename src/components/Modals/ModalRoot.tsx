import React from 'react';
import './ModalRoot.css';
const ModalRoot = ({ isOpen, onClose, children }: any) => {

  if (!isOpen) {
    return null;
  }


  return (

    <div id="mamodal" className="modal  modal-overlay">
      <button className="modal-close-button" onClick={onClose}>X</button>
      {children}
    </div>

  );
};

export default ModalRoot;
