import React from "react";
import { RiCloseFill } from "react-icons/ri";

export default function Modal({ title, onClose, children }) {
  return (
    <div className="modalOverlay" onClick={onClose}>
      <div   className="modalContent" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <h1>{title || 'Hello'}</h1>
          <button className="closeButton" onClick={onClose}>
            <RiCloseFill size={24} />
          </button>
        </div>
        <div className="modalBody">{children}</div>
      </div>
    </div>
  );
}
