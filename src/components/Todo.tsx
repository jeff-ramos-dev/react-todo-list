import { Todo } from '../classes'
import editImg from '../assets/editImg.png'
import { useState } from 'react'

interface TodoCardProps {
    todo: Todo;
    handleEditClick: Function;
}


export default function TodoCard({ todo }: TodoCardProps) {
    const formElement = document.querySelector('.editForm');
    const editTitle = document.querySelector('.editTitle') as HTMLInputElement;
    const editDescription = document.querySelector('.editDescription') as HTMLInputElement;
    const editDueDate = document.querySelector('.editDueDate') as HTMLInputElement;
    const editComplete = document.querySelector('.editComplete') as HTMLInputElement;
    const editUrgent = document.querySelector('.editUrgent') as HTMLInputElement;
    const [currDate, setCurrDate] = useState(todo.dueDate);
    const [currCompleteStatus, setCurrCompleteStatus] = useState(todo.complete);
    const [currUrgentStatus, setCurrUrgentStatus] = useState(todo.urgent);

    return (
        <div 
            className={
                `todoContainer
                ${currUrgentStatus ? ' urgent' : ''}
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
            <p className="todoTitle">{todo.title}</p>
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
                    const form = formElement as HTMLElement
                    form.style.display = 'flex';
                    editTitle.value = todo.title;
                    editDescription.value = todo.description;
                    editDueDate.value = currDate.toISOString().slice(0,10);
                    editComplete.checked = todo.complete;
                    editUrgent.checked = todo.urgent;
                }}></img>
            </div>
        </div>
    )
}