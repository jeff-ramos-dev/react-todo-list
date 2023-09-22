import { Todo } from '../classes'
import editImg from '../assets/editImg.png'
import { formatDate } from '../utils'
import { useState } from 'react'

interface TodoCardProps {
    todo: Todo;
    /*onUpdateDueDate: Function*/
}


export default function TodoCard({ todo, /*onUpdateDueDate*/ }: TodoCardProps) {
    const [currDate, setCurrDate] = useState(todo.dueDate);

/*
    const handleDueDateChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target) {
            const target = event.target as HTMLInputElement
            const newDueDate = new Date(target.value);
            onUpdateDueDate(todo.id, newDueDate)
        }
    }
*/

    return (
        <div 
            className={`todoContainer${todo.urgent ? ' urgent' : ''}${todo.complete ? ' complete' : ''}`}
            key={todo.id}
        >
            <p className="todoTitle">{todo.title}</p>
            <div className="todoRight">
                <input
                    type="date" 
                    className="picker"
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