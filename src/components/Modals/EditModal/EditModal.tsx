// EditModal.tsx
import React, { useState } from 'react';
import '../modals.scss';

interface EditModalProps {
  taskTitle: string;
  onConfirm: (newTitle: string) => void;
  onCancel: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ taskTitle, onConfirm, onCancel }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTaskTitle, setNewTaskTitle] = useState<string>(taskTitle);

  const handleConfirmation = (): void => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      onConfirm(newTaskTitle);
    }
  };

  return (
    <div className="modal-overlay d-flex jc-center al-center">
      <div className="modal-content d-flex fd-column jc-center al-center">
        {!isEditing ? (
          <>
            <h2>Deseja editar esse item?</h2>
            <p>Colocar as descrições das tarefas aqui.</p>
            <div className="modal-buttons">
              <button className="modal-button cancel" onClick={onCancel}>Não</button>
              <button className="modal-button confirm" onClick={handleConfirmation}>Sim</button>
            </div>
          </>
        ) : (
          <>
            <h2>Digite um novo nome para Tarefa</h2>
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.target.value)}
              className="edit-input"
              autoFocus
            />
            <div className="modal-buttons">
              <button className="modal-button cancel" onClick={onCancel}>Cancelar</button>
              <button className="modal-button confirm" onClick={handleConfirmation}>Confirmar</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditModal;