import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Todo } from '../classes'
import { useState } from 'react'
import editImg from '../assets/editImg.png'
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
            <div className="todoRight">
                <DatePicker 
                    className="picker"
                    selected={currDate} 
                    onChange={(date: Date) => {
                        todo.updateDueDate(date)
                        setCurrDate(date);
                    }}
                />
                <img src={editImg} className="edit"></img>
            </div>
        </div>
    )
}