import React from 'react';

const ModalMsgErreur = ({ msg, onClose }) => {
  if (!message) return null;

  return (
    <div>
      <h2>Erreur</h2>
      <p>{message}</p>
      <button onClick={onClose}>Fermer</button>
    </div>
  );
};

export default ModalMsgErreur;
