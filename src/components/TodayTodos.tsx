import TodoCard from './Todo'
import { Todo, TodoList } from '../classes'
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'

interface TodoListProps {
    list: TodoList | undefined
}

export default function TodayTodos({ list }: TodoListProps) {
    const todos: Todo[] = []
    list?.todos.forEach(todo => {
        const today = new Date();
        if(differenceInCalendarDays(today, todo.dueDate) === 0) {
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