// ToDoView.tsx
import "./todoview.scss"
import Checkbox from "../../assets/checkbox.svg"
import CompletedCheckbox from "../../assets/checkedCheckbox.svg"
import EditIcon from "../../assets/editIcon.svg"
import DeleteIcon from "../../assets/deleteIcon.svg"
import { ToDoItemData } from "../../types/toDoItem"
import { useState } from "react"
import EditModal from "../Modals/EditModal/EditModal" // Importe o componente do modal
import DeleteModal from "../Modals/DeleteModal/DeleteModal" // Importe o componente de modal de exclusão

function ToDo() {
  const [toDos, setToDos] = useState<ToDoItemData[]>([])
  const [newToDo, setNewToDo] = useState<string>("")
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null)

  const addToDoItem = () => {
    if(newToDo !== "") {
      const newId = crypto.randomUUID()
      const newToDoItem: ToDoItemData = {
        id: newId,
        title: newToDo,
        description: "",
        completed: false
      }
      setToDos([...toDos, newToDoItem])
      setNewToDo("")
    }
  }

  const completeTask = (id: string) => {
    const toDosUpdated = toDos.map((toDo) => {
      if (toDo.id === id) {
        return { ...toDo, completed: !toDo.completed}
      }
      return toDo
    })
    setToDos(toDosUpdated)
  }

  const openEditModal = (id: string) => {
    setCurrentTaskId(id)
    setShowEditModal(true)
  }

  const openDeleteModal = (id: string) => {
    setCurrentTaskId(id)
    setShowDeleteModal(true)
  }

  const editTask = (newTitle: string) => {
    if (currentTaskId) {
      const toDosUpdated = toDos.map((toDo) => {
        if (toDo.id === currentTaskId) {
          return { ...toDo, title: newTitle }
        }
        return toDo
      })
      setToDos(toDosUpdated)
      closeModal()
    }
  }

  const deleteTask = () => {
    if (currentTaskId) {
      const toDosUpdated = toDos.filter((toDo) => toDo.id !== currentTaskId)
      setToDos(toDosUpdated)
      closeModal()
    }
  }

  const closeModal = () => {
    setShowEditModal(false)
    setShowDeleteModal(false)
    setCurrentTaskId(null)
  }

  // Função para pegar o título da tarefa atual
  const getCurrentTaskTitle = (): string => {
    const task = toDos.find(toDo => toDo.id === currentTaskId)
    return task ? task.title : ""
  }

  return (
    <main className='d-flex fd-column jc-center al-center'>
      <div className='margin-b margin-t'>
        <h1>Otimize seu tempo e se organize com o nosso Planejador Diário.</h1>
      </div>  
      <div className="todo-list">
        <div className='d-flex list-title'>
          <h3 className='tarefas-column'>Tarefa</h3>
          <h3 className='status-column d-flex jc-center'>Status</h3>
          <h3 className='opcoes-column d-flex jc-flex-end'>Opções</h3>
        </div>
        <div className="list-items">
          {
            toDos.map((toDo) => (
              <div key={toDo.id} className="d-flex al-center todo-item">
                <p className="item-title">{toDo.title}</p>
                <div className="item-checkbox d-flex jc-center">
                <img onClick={() => completeTask(toDo.id)} className="c-pointer" src={!toDo.completed ? Checkbox : CompletedCheckbox} alt="checkbox"/>
                </div>
                <div className="d-flex jc-flex-end option-itens">
                  <img onClick={() => openEditModal(toDo.id)} className="c-pointer" src={EditIcon} alt="edit"/>
                  <img onClick={() => openDeleteModal(toDo.id)} className="c-pointer" src={DeleteIcon} alt="delete"/>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <div className="d-flex jc-space-btw al-center add-item">
        <input 
          value={newToDo} 
          onChange={(e) => setNewToDo(e.target.value)} 
          className="add-item-input" 
          type="text"
          placeholder="Nova tarefa..."
        >
        </input>
        <p className="c-pointer" onClick={addToDoItem}>+</p>
      </div>

      {showEditModal && (
        <EditModal
          taskTitle={getCurrentTaskTitle()}
          onConfirm={editTask}
          onCancel={closeModal}
        />
      )}

      {showDeleteModal && (
        <DeleteModal 
          onConfirm={deleteTask}
          onCancel={closeModal}
        />
      )}
    </main>
  )
}

export default ToDo