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
        <div className="toast">
          <div className="toast__message">{message}</div>
          <button className="toast__close" onClick={handleClose}>
            &times;
          </button>
        </div>
      )}
    </>
  );
};

export default Toast;