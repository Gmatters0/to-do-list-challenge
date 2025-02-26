// ToDoView.tsx
import "./todoview.scss"
import Checkbox from "../../assets/checkbox.svg"
import CompletedCheckbox from "../../assets/checkedCheckbox.svg"
import EditIcon from "../../assets/editIcon.svg"
import DeleteIcon from "../../assets/deleteIcon.svg"
import { ToDoItemData } from "../../types/toDoItem"
import { useState, useEffect } from "react"
import EditModal from "../Modals/EditModal/EditModal"
import DeleteModal from "../Modals/DeleteModal/DeleteModal"
import { useLocation } from 'react-router-dom'

function ToDo() {
  const [toDos, setToDos] = useState<ToDoItemData[]>([])
  const [completedTasks, setCompletedTasks] = useState<ToDoItemData[]>([])
  const [uncompletedTasks, setUncompletedTasks] = useState<ToDoItemData[]>([])
  const [newToDo, setNewToDo] = useState<string>("")
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [currentTaskId, setCurrentTaskId] = useState<string>("")
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const location = useLocation()

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
    setCurrentTaskId("")
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      addToDoItem()
    }
  }

  const getCurrentTaskTitle = (): string => {
    const task = toDos.find(toDo => toDo.id === currentTaskId)
    return task ? task.title : ""
  }

  useEffect(() => {
    if(isLoaded) {
      localStorage.setItem('tasks', JSON.stringify(toDos))
    }
  }, [toDos, isLoaded])

  useEffect(() => {
    const memoryTasks = localStorage.getItem('tasks')
    if(memoryTasks) {
      setToDos(JSON.parse(memoryTasks))
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const filterCompletedTasks = toDos.filter((toDo) => toDo.completed === true)
    setCompletedTasks(filterCompletedTasks)
  }, [toDos])

  useEffect(() => {
    const filterUncompletedTasks = toDos.filter((toDo) => toDo.completed === false)
    setUncompletedTasks(filterUncompletedTasks)
  }, [toDos])

  if (location.pathname === "/tarefas") {
    return (
      <main className='d-flex fd-column jc-center al-center'>
        <div className='margin-b margin-t tx-center'>
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
                  <p style={{ textDecoration: toDo.completed ? 'line-through' : 'none'}} className="item-title">{toDo.title}</p>
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
            onKeyPress={handleKeyPress}
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
  } else if (location.pathname === "/organizacao") {
    return (
      <main className='d-flex fd-column jc-center al-center'>
        <div className='margin-b margin-t tx-center'>
          <h1>Otimize seu tempo e se organize com o nosso Planejador Diário.</h1>
        </div>
        <section className="d-flex fd-row jc-center tasks-resume">
          {
            toDos.length == 0 
            ? (
            <h3>Você ainda não tem tarefas cadastradas!</h3>
          ) : (
            <>
              <div>
                <h3>Tarefas a fazer</h3>
                <ul>
                  {
                    uncompletedTasks.map((toDo) => (
                      <li>
                        <div key={toDo.id} className="d-flex al-center todo-item">
                          <p style={{ textDecoration: toDo.completed ? 'line-through' : 'none'}} className="item-title">{toDo.title}</p>
                          <div className="item-checkbox d-flex jc-center">
                            <img onClick={() => completeTask(toDo.id)} className="c-pointer" src={!toDo.completed ? Checkbox : CompletedCheckbox} alt="checkbox"/>
                          </div>
                        </div>
                      </li>
                    ))
                  }
                </ul>
              </div> 
              <div>
                <h3>Tarefas completas</h3>
                <ul>
                  {
                    completedTasks.map((toDo) => (
                      <li>
                        <div key={toDo.id} className="d-flex al-center todo-item">
                          <p style={{ textDecoration: toDo.completed ? 'line-through' : 'none'}} className="item-title">{toDo.title}</p>
                          <div className="item-checkbox d-flex jc-center">
                            <img onClick={() => completeTask(toDo.id)} className="c-pointer" src={!toDo.completed ? Checkbox : CompletedCheckbox} alt="checkbox"/>
                          </div>
                        </div>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </>
          )
          }
        </section>
      </main>
    )
  } 

}

export default ToDo