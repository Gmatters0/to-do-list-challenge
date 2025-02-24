import Checkbox from "../../assets/checkbox.svg"
import EditIcon from "../../assets/editIcon.svg"
import DeleteIcon from "../../assets/deleteIcon.svg"
import "./todoitem.scss"

function ToDoItem() {
  return (
    <div className="d-flex jc-space-btw al-center todo-item">
      <p>Titulo Atividade</p>
      <img src={Checkbox}/>
      <div className="d-flex jc-flex-end option-itens">
        <img src={EditIcon}/>
        <img src={DeleteIcon}/>
      </div>
    </div>
  )
}

export default ToDoItem