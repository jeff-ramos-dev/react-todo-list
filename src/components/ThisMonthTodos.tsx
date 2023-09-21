import TodoCard from './Todo'
import { Todo, TodoList } from '../classes'
import differenceInCalendarMonths from 'date-fns/differenceInCalendarMonths'

interface TodoListProps {
    list: TodoList | undefined
}

export default function MonthTodos({ list }: TodoListProps) {
    const todos: Todo[] = []
    list?.todos.forEach(todo => {
        const today = new Date();
        if(differenceInCalendarMonths(today, todo.dueDate) === 0) {
            todos.push(todo);
        }
    })
    const cards = todos.map(todo => {
        return (
            <TodoCard
                key={todo.id}
                todo={todo} 
            />
        )
    })

    return (
        <>
            {cards}
        </>
    )
}