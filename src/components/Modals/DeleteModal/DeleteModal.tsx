// DeleteModal.tsx
import React from 'react';
import '../modals.scss';

interface DeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay d-flex jc-center al-center">
      <div className="modal-content d-flex fd-column jc-center al-center">
        <h2>Deseja excluir esse item?</h2>
        <p>Colocar as descrições das tarefas aqui.</p>
        <div className="modal-buttons">
          <button className="modal-button cancel" onClick={onCancel}>Não</button>
          <button className="modal-button confirm" onClick={onConfirm}>Sim</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;