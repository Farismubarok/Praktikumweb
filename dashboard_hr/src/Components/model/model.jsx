// src/Components/Modal/Modal.jsx
import React from 'react';
import { X } from 'lucide-react';
import './Model.css'; // Pastikan CSS modal sudah ada (seperti jawaban sebelumnya)

const Model = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="btn-close" onClick={onClose}><X size={20}/></button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Model;