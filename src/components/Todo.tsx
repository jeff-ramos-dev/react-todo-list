import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Todo } from '../classes'
import { useState } from 'react'
import { formatDate } from '../utils'
interface TodoCardProps {
    todo: Todo;
}

export default function TodoCard({ todo }: TodoCardProps) {
    const [currDate, setCurrDate] = useState(todo.dueDate)

    return (
        <div 
            className={`todoContainer ${todo.urgent ? 'urgent' : null} ${todo.complete ? 'complete' : null}`}
            key={todo.id}
        >
            <p className="todoTitle">{todo.title}</p>
            <div className="todoDetailsContainer">
                <DatePicker 
                    selected={currDate} 
                    onChange={(date: Date) => {
                        todo.updateDueDate(date)
                        setCurrDate(date);
                    }}
                />
                <p className="todoDetail">{formatDate(todo.dueDate)}</p>
            </div>
        </div>
    )
}