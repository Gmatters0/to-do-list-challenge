import "./todoview.scss"
import ToDoItem from "../ToDoItem/ToDoItem"

function ToDo() {
  return (
    <main className='d-flex fd-column jc-center al-center'>
      <div className='margin-b margin-t'>
        <h1>Otimize seu tempo e se organize com o nosso Planejador Diário.</h1>
      </div>  
      <div className="todo-list">
        <div className='d-flex list-title jc-space-btw'>
          <h3 className='tarefas-column'>Tarefa</h3>
          <h3 className='status-column'>Status</h3>
          <h3 className='opcoes-column'>Opções</h3>
        </div>
      </div>
      <ToDoItem></ToDoItem>
    </main>
  )
}

export default ToDo