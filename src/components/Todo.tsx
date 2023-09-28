import { Todo } from '../classes'
import editImg from '../assets/editImg.png'
import { useState } from 'react'

interface TodoCardProps {
    todo: Todo;
    setCurrTodo: React.Dispatch<React.SetStateAction<Todo>>;
    setIsEditMenuVisible: React.Dispatch<React.SetStateAction<boolean>>
}


export default function TodoCard({ todo, setCurrTodo, setIsEditMenuVisible }: TodoCardProps ) {
    const [currDate, setCurrDate] = useState(todo.dueDate);
    const [currCompleteStatus, setCurrCompleteStatus] = useState(todo.complete);

    return (
        <div 
            className={
                `todoContainer
                ${todo.urgent ? ' urgent' : ''}
                ${currCompleteStatus ? ' complete' : ''}`
            }
            key={todo.id}
            onClick={(e) => {
                const target = e.target as HTMLElement 
                if (!target.classList.contains('todoContainer')) return
                todo.complete = !todo.complete
                setCurrCompleteStatus(todo.complete);
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
                    console.log('clicked')
                    setCurrTodo(todo);
                    setIsEditMenuVisible(true);
                }}></img>
            </div>
                {currCompleteStatus ? <del className="todoTitle strikethrough">{todo.title}</del> : <p className="todoTitle">{todo.title}</p> }
        </div>
    )
  }