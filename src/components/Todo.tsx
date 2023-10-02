import { Todo } from '../classes'
import editImg from '../assets/editImg.png'
import trashImg from '../assets/small-trash-icon.png'
import { useState } from 'react'

interface TodoCardProps {
    todo: Todo;
    setCurrTodo: React.Dispatch<React.SetStateAction<Todo>>;
    setIsEditMenuVisible: React.Dispatch<React.SetStateAction<boolean>>
    deleteTodo: Function
    updateTodo: Function
}

export default function TodoCard({ todo, setCurrTodo, setIsEditMenuVisible, deleteTodo, updateTodo }: TodoCardProps ) {
    const [currDate, setCurrDate] = useState(todo.dueDate);

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
            <div className="todoRight">
                <input
                    type="date" 
                    className="picker"
                    value={currDate.toISOString().slice(0,10)}
                    onChange={(e) => {
                        const target = e.target as HTMLInputElement
                        const value = target.value
                        todo.updateDueDate(new Date(value));
                        setCurrDate(new Date(value));
                }}
                />
                <img src={editImg} className="edit" onClick={() => {
                    setCurrTodo(todo);
                    setIsEditMenuVisible(true);
                }}></img>
                <img src={trashImg} className="delete" onClick={() => {
                    deleteTodo(todo.id);
                }}></img>
            </div>
                {todo.complete ? <del className="todoTitle strikethrough">{todo.title}</del> : <p className="todoTitle">{todo.title}</p> }
        </div>
    )
  }