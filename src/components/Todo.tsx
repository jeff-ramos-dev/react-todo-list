import { Todo } from '../classes'
import editImg from '../assets/editImg.png'
import { useState } from 'react'

interface TodoCardProps {
    todo: Todo;
}


export default function TodoCard({ todo }: TodoCardProps) {
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
            onClick={() => {
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
                <img src={editImg} className="edit"></img>
            </div>
        </div>
    )
}