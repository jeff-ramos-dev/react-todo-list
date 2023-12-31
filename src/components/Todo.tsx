import { Todo, DeleteTypes } from '../classes'
import { formatDate } from '../utils'
import editImg from '../assets/editImg.png'
import trashImg from '../assets/small-trash-icon.png'

interface TodoCardProps {
    todo: Todo;
    setCurrTodo: React.Dispatch<React.SetStateAction<Todo>>;
    setIsEditMenuVisible: React.Dispatch<React.SetStateAction<boolean>>
    setIsConfirmVisible: React.Dispatch<React.SetStateAction<boolean>>
    setToBeDeleted: React.Dispatch<React.SetStateAction<DeleteTypes | null>>
    updateTodo: Function
}

export default function TodoCard({ todo, setCurrTodo, setIsEditMenuVisible, setIsConfirmVisible, setToBeDeleted, updateTodo }: TodoCardProps ) {

    function getUpdatedTodo() {
        const updatedTodo = new Todo({parentList: null})
        updatedTodo.title = todo.title
        updatedTodo.description = todo.description;
        updatedTodo.complete = todo.complete;
        updatedTodo.urgent = todo.urgent;
        updatedTodo.dueDate = todo.dueDate;
        updatedTodo.parentList = todo.parentList;
        updatedTodo.id = todo.id;
        return updatedTodo
    }

    return (
        <div 
            className={
                `todoContainer
                ${todo.urgent ? ' urgent' : ''}
                ${todo.complete ? ' complete' : ''}`
            }
            key={todo.id}
            onClick={(e) => {
                const target = e.target as HTMLDivElement
                if (target.classList.contains('picker') || target.classList.contains('edit') || target.classList.contains('delete')) {
                    return;
                }
                const updatedTodo = new Todo({parentList: null});
                updatedTodo.title = todo.title;
                updatedTodo.description = todo.description;
                updatedTodo.complete = !todo.complete;
                updatedTodo.urgent = todo.urgent;
                updatedTodo.dueDate = todo.dueDate;
                updatedTodo.parentList = todo.parentList;
                updatedTodo.id = todo.id;
                updateTodo(updatedTodo);
            }}
        >
            <div className="todoBottom">
                <div className="todoLeft">
                    <p className="day">{todo.dueDate.toDateString().slice(0,3)}</p>
                    <input
                        type="date" 
                        className="picker"
                        value={formatDate(todo.dueDate)}
                        onChange={(e) => {
                            const target = e.target as HTMLInputElement;
                            const value = target.value;
                            console.log(value);
                            const dateWithSlashes = value.replace(/[-]/g, '/');
                            const updatedTodo = getUpdatedTodo();
                            updatedTodo.dueDate = new Date(dateWithSlashes);
                            updateTodo(updatedTodo);
                        }}
                    />
                </div>
                <div className="todoRight">
                    <img src={editImg} className="edit" onClick={() => {
                        setCurrTodo(todo);
                        setIsEditMenuVisible(true);
                    }}></img>
                    <img src={trashImg} className="delete" onClick={() => {
                        setIsConfirmVisible(true);
                        setToBeDeleted({item: todo.id, type: "todo", title: todo.title});
                    }}></img>
                </div>
            </div>
                {todo.complete ? <p className="todoTitle strikethrough">{todo.title}</p> : <p className="todoTitle">{todo.title}</p> }
        </div>
    )
  }