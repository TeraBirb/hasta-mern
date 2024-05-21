import React, { useState } from 'react';
import './Toast.css';

const Toast = ({ message }) => {
  const [showToast, setShowToast] = useState(true);

  const handleClose = () => {
    setShowToast(false);
  };

  return (
    <>
      {showToast && (
        <div className="toast bg-2">
          <div className="toast__message">{message}</div>
          <button className="toast__close hl-1" onClick={handleClose}>
            &times;
          </button>
        </div>
      )}
    </>
  );
};

export default Toast;