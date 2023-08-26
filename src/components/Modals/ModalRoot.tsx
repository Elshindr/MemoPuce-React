import React from 'react';
import './ModalRoot.css';
const ModalRoot = ({ isOpen, onClose, children }: any) => {

  if (!isOpen) {
    return null;
  }


  return (

    <div id="mamodal" className="modal  modal-overlay">
      {children}
      <button className=" btn color-main-btn modal-close-button" onClick={onClose}>Annuler</button>
    </div>

  );
};

export default ModalRoot;
