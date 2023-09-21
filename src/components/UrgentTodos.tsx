import TodoCard from './Todo'
import { Todo, TodoList } from '../classes'

interface TodoListProps {
    list: TodoList | undefined
}

export default function UrgentTodos({ list }: TodoListProps) {
    const todos: Todo[] = []
    list?.todos.forEach(todo => {
        if(todo.urgent) {
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
            {cards.length ? cards : "No Todos"}
        </>
    )
}